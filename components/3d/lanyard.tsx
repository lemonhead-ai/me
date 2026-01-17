'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber'; // ← extend was missing!
import { useGLTF, useTexture, Environment, Lightformer, Preload } from '@react-three/drei';
import {
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { BallCollider, CuboidCollider } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// ← THIS LINE WAS MISSING IN MY PREVIOUS MESSAGE
extend({ MeshLineGeometry, MeshLineMaterial });

// Preload assets
useGLTF.preload('/lanyard/card.glb');
useTexture.preload('/lanyard/lanyard.jpeg');

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

function BandInner() {
  const { nodes, materials } = useGLTF('/lanyard/card.glb') as any;
  const texture = useTexture('/lanyard/lanyard.jpeg');

  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 16;
  texture.rotation = Math.PI; // 180 degrees
  texture.center.set(0.5, 0.5); // Rotate around center
  // Scale and position the image to fit the card properly
  texture.repeat.set(1, 1.5); // Scale up slightly to cover the card
  texture.offset.set(0, -0.25); // Center the image
  texture.needsUpdate = true;

  const band = useRef<THREE.Mesh>(null!);
  const fixed = useRef<any>(null!);
  const j1 = useRef<any>(null!);
  const j2 = useRef<any>(null!);
  const j3 = useRef<any>(null!);
  const card = useRef<any>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = 'chordal'; // ← correct way (setType doesn't exist)
    return c;
  });

  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const update = () => setIsSmall(window.innerWidth < 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Joints
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) document.body.style.cursor = dragged ? 'grabbing' : 'grab';
    return () => void (document.body.style.cursor = 'auto');
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      card.current.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }

    [j1, j2].forEach((ref) => {
      if (!ref.current) return;
      const body: any = ref.current;
      if (!body.lerped) body.lerped = new THREE.Vector3().copy(body.translation());
      const lerped = body.lerped;
      const distance = Math.max(0.1, Math.min(1, lerped.distanceTo(body.translation())));
      lerped.lerp(body.translation(), delta * (10 + distance * 40));
    });

    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy((j2.current as any).lerped);
      curve.points[2].copy((j1.current as any).lerped);
      curve.points[3].copy(fixed.current.translation());

      // @ts-ignore – meshline doesn't have types
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  return (
    <>
      <group position={[0, 8, 0]}>
        <RigidBody ref={fixed} type="fixed" colliders={false} />

        <RigidBody position={[0.5, 0, 0]} ref={j1} colliders={false} canSleep angularDamping={4} linearDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} colliders={false} canSleep angularDamping={4} linearDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} colliders={false} canSleep angularDamping={4} linearDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          colliders={false}
          canSleep
          angularDamping={4}
          linearDamping={4}
        >
          <CuboidCollider args={[0.067, 0.125, 0.01]} />

          <group
            scale={3.5}
            position={[0, -2.7, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerDown={(e: any) => {
              e.stopPropagation();
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(card.current.translation()));
            }}
            onPointerUp={(e: any) => {
              e.stopPropagation();
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              drag(false);
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={texture}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal}>
              <meshStandardMaterial roughness={0.3} metalness={1} />
            </mesh>
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      {/* @ts-ignore because meshline has no JSX types */}
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          transparent
          depthTest={false}
          lineWidth={1}
          color="white"
          useMap
          map={texture}
          repeat={[-4, 1]}
          resolution={isSmall ? [window.innerWidth, window.innerHeight] : [1000, 1000]}
        />
      </mesh>
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 3, 0.1]} />
      <meshBasicMaterial color="#111" />
    </mesh>
  );
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 30,
  transparent = true,
}: LanyardProps) {
  return (
    <div className="relative z-0 w-full h-full overflow-hidden">
      <Canvas camera={{ position, fov }} gl={{ alpha: transparent }} dpr={[1, 2]}>
        <ambientLight intensity={Math.PI} />

        <Suspense fallback={<LoadingFallback />}>
          <Physics gravity={gravity}>
            <BandInner />
          </Physics>
        </Suspense>

        <Environment blur={0.75}>
          <Lightformer intensity={2} position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>

        <Preload all />
      </Canvas>
    </div>
  );
}