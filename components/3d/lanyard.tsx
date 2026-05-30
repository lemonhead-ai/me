
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { images } from '@/lib/images';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-full overflow-hidden">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Physics
          gravity={gravity}
          timeStep={isMobile ? 1 / 30 : 1 / 60}
        >
          <Band isMobile={isMobile} cameraPosition={position} fov={fov} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

// Helpers to draw textures onto the combined canvas
function drawImageCover(ctx: CanvasRenderingContext2D, img: any, x: number, y: number, w: number, h: number) {
  const physicalAspect = 1.6 / 2.25; // Aspect ratio of the physical card (width / height)
  const imgW = img.width || w;
  const imgH = img.height || h;
  const imgAspect = imgW / imgH;
  
  let sx = 0, sy = 0, sWidth = imgW, sHeight = imgH;
  
  if (imgAspect > physicalAspect) {
    sWidth = imgH * physicalAspect;
    sx = (imgW - sWidth) / 2;
  } else {
    sHeight = imgW / physicalAspect;
    sy = (imgH - sHeight) / 2;
  }
  
  ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
}

function drawImageLinkedIn(ctx: CanvasRenderingContext2D, img: any, x: number, y: number, w: number, h: number) {
  const physicalAspect = 1.6 / 2.25;
  const imgW = img.width || w;
  const imgH = img.height || h;
  
  const sWidth = imgW;
  const sHeight = Math.min(imgH, imgW / physicalAspect);
  
  const coveredFraction = sHeight / (imgW / physicalAspect);
  const dHeight = h * coveredFraction;
  
  ctx.drawImage(img, 0, 0, sWidth, sHeight, x, y, w, dHeight);
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  cameraPosition: [number, number, number];
  fov: number;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  cameraPosition,
  fov,
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(images.lanyardModel) as any;
  const texture = useTexture(images.lanyardTexture);
  const cardTexture = useTexture(images.profilePhoto);
  const linkedinTexture = useTexture(images.linkedinScreenshot);

  // Combine textures side-by-side: profile photo on the left, LinkedIn on the right
  const combinedTexture = useMemo(() => {
    if (!cardTexture.image || !linkedinTexture.image) return null;

    const canvas = document.createElement('canvas');
    const size = 2048;
    canvas.width = size * 2;
    canvas.height = size;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Front: Profile Cover
      drawImageCover(ctx, cardTexture.image, 0, 0, size, size);
      // Back: LinkedIn Top-Fit
      drawImageLinkedIn(ctx, linkedinTexture.image, size, 0, size, size);
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.flipY = false;
    tex.needsUpdate = true;
    return tex;
  }, [cardTexture, linkedinTexture]);

  // Sizing and scaling calculations for a larger/responsive card
  const cardScale = isMobile ? 3.6 : 4.2;
  const scaleRatio = cardScale / 2.25;

  const colliderArgs = useMemo(() => {
    return [0.8 * scaleRatio, 1.125 * scaleRatio, 0.015 * scaleRatio] as const;
  }, [scaleRatio]);

  const jointOffset = 1.45 * scaleRatio;
  const groupPosY = -1.2 * scaleRatio;

  const topAnchorY = useMemo(() => {
    const cameraZ = cameraPosition[2] ?? 20;
    const fovRad = (fov * Math.PI) / 180;
    // top edge of the frustum plus a slight overlap so it sits nicely behind the navbar
    return cameraZ * Math.tan(fovRad / 2) + (isMobile ? 1.5 : 0.15);
  }, [cameraPosition, fov, isMobile]);

  const [curve] = useState(
    () => {
      const c = new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
      c.curveType = 'chordal';
      return c;
    }
  );

  useEffect(() => {
    if (texture) {
      // eslint-disable-next-line react-hooks/immutability
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      // eslint-disable-next-line react-hooks/immutability
      texture.needsUpdate = true;
    }
  }, [texture]);
  const [dragged, drag] = useState<false | THREE.Vector3>(false);

  const [hovered, hover] = useState(false);

  const autoRotatePhase = useRef<'idle' | 'rotating'>('idle');
  const autoRotateTimer = useRef<number | null>(null);
  const autoRotateElapsed = useRef(0);
  const autoRotateSpeed = useMemo(() => (2 * Math.PI) / 30, []);

  const clearAutoRotateTimer = useCallback((): void => {
    if (autoRotateTimer.current !== null) {
      window.clearTimeout(autoRotateTimer.current);
      autoRotateTimer.current = null;
    }
  }, []);

  const scheduleAutoRotate = useCallback((): void => {
    clearAutoRotateTimer();
    autoRotateTimer.current = window.setTimeout(() => {
      autoRotatePhase.current = 'rotating';
      autoRotateElapsed.current = 0;
      autoRotateTimer.current = null;
    }, 10000);
  }, [clearAutoRotateTimer]);

  const resetAutoRotate = useCallback((): void => {
    autoRotatePhase.current = 'idle';
    autoRotateElapsed.current = 0;
    scheduleAutoRotate();
  }, [scheduleAutoRotate]);

  const ropeLen = isMobile ? 0.8 : 1;
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ropeLen]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ropeLen]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ropeLen]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, jointOffset, 0],
  ]);

  useEffect(() => {
    if (nodes?.card?.geometry) {
      const geometry = nodes.card.geometry;
      geometry.computeBoundingBox();
      const bbox = geometry.boundingBox;
      
      const width = bbox.max.x - bbox.min.x;
      const height = bbox.max.y - bbox.min.y;
      
      const posAttribute = geometry.attributes.position;
      const uvAttribute = geometry.attributes.uv;
      
      const zCenter = (bbox.max.z + bbox.min.z) / 2;
      
      for (let i = 0; i < posAttribute.count; i++) {
        const x = posAttribute.getX(i);
        const y = posAttribute.getY(i);
        const z = posAttribute.getZ(i);
        
        const uRatio = (x - bbox.min.x) / width;
        const v = 1 - ((y - bbox.min.y) / height);
        
        let u = 0;
        // Vertices on the front side map to left half [0, 0.5]
        if (z > zCenter) {
          u = (1 - uRatio) * 0.5;
        } else {
          // Vertices on the back side map to right half [0.5, 1.0]
          // Flip back side so it is not mirrored
          u = 0.5 + (1 - uRatio) * 0.5;
        }
        
        uvAttribute.setXY(i, u, v);
      }
      // eslint-disable-next-line react-hooks/immutability
      uvAttribute.needsUpdate = true;
    }
  }, [nodes]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useEffect(() => {
    resetAutoRotate();
    return clearAutoRotateTimer;
  }, [resetAutoRotate, clearAutoRotateTimer]);

  useEffect(() => {
    if (dragged) {
      autoRotatePhase.current = 'idle';
      autoRotateElapsed.current = 0;
      clearAutoRotateTimer();
    } else if (autoRotatePhase.current === 'idle' && autoRotateTimer.current === null) {
      scheduleAutoRotate();
    }
  }, [dragged, clearAutoRotateTimer, scheduleAutoRotate]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      // Wake up all bodies so dragging is responsive
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (autoRotatePhase.current === 'rotating' && !dragged) {
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      autoRotateElapsed.current += delta;
      if (autoRotateElapsed.current >= 30) {
        autoRotatePhase.current = 'idle';
        autoRotateElapsed.current = 0;
        scheduleAutoRotate();
      }
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(
        curve.getPoints(isMobile ? 16 : 32)
      );
      ang.copy(card.current.angvel());
      const rotQuat = card.current.rotation();
      const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(
        new THREE.Quaternion(rotQuat.x, rotQuat.y, rotQuat.z, rotQuat.w)
      );
      const theta = Math.atan2(forward.x, forward.z); // wraps to [-PI, PI]
      card.current.setAngvel({
        x: ang.x,
        y:
          autoRotatePhase.current === 'rotating' && !dragged
            ? autoRotateSpeed
            : ang.y - theta * 0.2,
        z: ang.z,
      });
    }
  });

  return (
    <>
      <group position={[0, topAnchorY, 0]}>
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type={'fixed' as RigidBodyProps['type']}
        />
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          {...segmentProps}
          type={'dynamic' as RigidBodyProps['type']}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          {...segmentProps}
          type={'dynamic' as RigidBodyProps['type']}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          {...segmentProps}
          type={'dynamic' as RigidBodyProps['type']}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? ('kinematicPosition' as RigidBodyProps['type'])
              : ('dynamic' as RigidBodyProps['type'])
          }
        >
          <CuboidCollider args={colliderArgs as any} />
          <group
            scale={cardScale}
            position={[0, groupPosY, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={combinedTexture || cardTexture}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.85}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh
              geometry={nodes.clamp.geometry}
              material={materials.metal}
            />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}