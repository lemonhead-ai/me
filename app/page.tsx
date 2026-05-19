'use client';

import { m } from "framer-motion";
import Link from "next/link";
import dynamic from 'next/dynamic';

import {
  ArrowUpRight01Icon,
  MessageProgrammingIcon,
  Mouse01Icon,
  ArrowDown01Icon,
  SourceCodeIcon,
  Rocket01Icon,
  SparklesIcon,
  Linkedin02Icon,
  Github01Icon,
  InstagramIcon,
  SmartPhone01Icon,
  ServiceIcon,
  ApiIcon,
} from "hugeicons-react";
import {
  ScrollReveal,
  TextReveal,
  FloatingElement,
  HoverScale,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/AdvancedAnimations";

// Dynamic import for Lanyard (prevents SSR issues)
const Lanyard = dynamic(() => import('@/components/3d/lanyard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-muted text-sm"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <span>Loading 3D experience...</span>
        </div>
      </m.div>
    </div>
  ),
});



export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Responsive Lanyard Container anchored to the bottom of the navbar */}
        <div className="absolute top-1 md:-top-1 left-10 md:left-auto right-0 lg:w-[35%] xl:w-[30%] h-[420px] sm:h-[500px] lg:h-[calc(100vh-80px)] pointer-events-none z-10">
          <div className="w-full h-full pointer-events-auto">
            <Lanyard 
              position={[0, 0, 25]} 
              gravity={[0, -40, 0]} 
              fov={20}
              transparent={true}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* MOBILE LAYOUT */}
          <div className="lg:hidden flex flex-col items-center gap-4 py-8">
            {/* Lanyard + social icons side by side */}
            <div className="w-full flex items-center gap-2 px-2">
              {/* Social icons — left column */}
              <div className="flex flex-col -mt-35 space-y-2 shrink-0 -translate-y-10">
                <HoverScale>
                  <a
                    href="https://www.linkedin.com/in/martinmwai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin02Icon size={20} />
                  </a>
                </HoverScale>

                <HoverScale>
                  <a
                    href="https://www.instagram.com/its._lemonhead/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={20} />
                  </a>
                </HoverScale>

                <HoverScale>
                  <a
                    href="https://github.com/lemonhead-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                    aria-label="GitHub"
                  >
                    <Github01Icon size={20} />
                  </a>
                </HoverScale>
              </div>

              {/* Lanyard layout spacer */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative flex-1 h-[420px] sm:h-[500px]"
              />
            </div>

            {/* Text below on mobile */}
            <div className="w-full px-4 sm:px-6">
              <div className="text-center -mt-45">
                <h1 className="text-2xl md:text-3xl font-bold mb-3">
                  <TextReveal text="Hi, I'm " delay={0.2} />
                  <span className="gradient-text">
                    <TextReveal text="Martin Mwai" delay={0.6} />
                  </span>
                </h1>

                <m.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-xl text-primary mb-4 font-medium"
                >
                  SWE, Cybersecurity Engineer, DevOps, AI/ML Apprentice
                </m.h2>

                <p className="text-base md:text-lg text-muted mb-2 max-w-xl mx-auto leading-relaxed">
                  An indie developer with a background in Computer Science, specializing in building
                  efficient, user-focused systems.Skilled in fullstack development, with a flair for web design and UI/UX.<br />
                  Explore my portfolio for innovative solutions that exceed expectations.
                </p>

                <div className="flex justify-center">
                  <HoverScale>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 px-6 py-3 bg-primary hover:bg-primary-dark text-orange-600/80 rounded-full font-semibold transition-colors"
                    >
                      Get in Touch
                      <MessageProgrammingIcon size={18} />
                    </Link>
                  </HoverScale>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-screen">
            {/* Social Icons - Left Side */}
            <div className="col-span-1 flex flex-col items-center lg:items-start space-y-6">
              <m.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col space-y-4"
              >
                <HoverScale>
                  <a
                    href="https://www.linkedin.com/in/martinmwai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin02Icon size={24} />
                  </a>
                </HoverScale>

                <HoverScale>
                  <a
                    href="https://www.instagram.com/its._lemonhead/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={24} />
                  </a>
                </HoverScale>

                <HoverScale>
                  <a
                    href="https://github.com/lemonhead-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                    aria-label="GitHub"
                  >
                    <Github01Icon size={24} />
                  </a>
                </HoverScale>
              </m.div>
            </div>

            {/* Main Content - Center */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-left lg:text-left"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                  <TextReveal text="Hi, I'm " delay={0.2} />
                  <m.span
                    className="gradient-text inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    Martin Mwai
                  </m.span>
                </h1>

                <m.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-2xl text-primary mb-6 font-medium"
                >
                  SWE, Cybersecurity Engineer, DevOps, AI/ML Apprentice
                </m.h2>

                <m.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="text-lg text-muted mb-12 max-w-2xl leading-relaxed"
                >
                  An indie developer with a background in Computer Science, specializing in building
                  efficient, user-focused systems.Skilled in fullstack development, with a flair for web design and UI/UX.<br />
                  Explore my portfolio for innovative solutions that exceed expectations.
                </m.p>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <HoverScale>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-primary-dark/80 text-orange-600/80 rounded-lg font-semibold transition-colors"
                    >
                      Get in Touch
                      <MessageProgrammingIcon size={20} />
                    </Link>
                  </HoverScale>
                </m.div>
              </m.div>
            </div>

            {/* 3D Lanyard - Right Side Layout Spacer */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="relative w-full h-[600px]"
              >
                {/* Floating decorative elements */}
                <FloatingElement>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-4xl pointer-events-none" />
                </FloatingElement>
                <FloatingElement>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl pointer-events-none" />
                </FloatingElement>
              </m.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-18 left-1/2 transform -translate-x-1/2"
          >
            <m.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link href="#about" className="flex flex-col items-center gap-1 text-muted hover:text-primary transition-colors">
                <Mouse01Icon size={24} />
                <span className="text-sm"></span>
                <ArrowDown01Icon size={24} className="animate-bounce" />
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              What I <span className="gradient-text">Do</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: SourceCodeIcon,
                  title: "Web Development",
                  description: "Building responsive and performant web applications with modern frameworks",
                },
                {
                  icon: Rocket01Icon,
                  title: "Performance",
                  description: "Optimizing applications for speed and efficiency across all devices",
                },
                {
                  icon: SparklesIcon,
                  title: "UI/UX Design",
                  description: "Creating beautiful and intuitive user interfaces with attention to detail",
                },
                {
                  icon: SmartPhone01Icon,
                  title: "Mobile Development",
                  description:
                    "Designing mobile-first applications that provide seamless user experiences on all screen sizes, across various platforms.",
                },
                {
                  icon: ApiIcon,
                  title: "API Integration",
                  description:
                    "Integrating third-party services and APIs to enhance application functionality and user experience.",
                },
                {
                  icon: ServiceIcon,
                  title: "Saas Solutions",
                  description:
                    "Crafting scalable and reliable SaaS applications. Concept to deployment, delivering solutions that drive success.",
                },

              ].map((skill, i) => (
                <StaggerItem key={i}>
                  <HoverScale>
                    <m.div whileHover={{ y: -5 }} className="glass rounded-3xl p-8 h-full">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                        <skill.icon size={32} className="text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{skill.title}</h3>
                      <p className="text-muted">{skill.description}</p>
                    </m.div>
                  </HoverScale>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-accent/10 to-primary/10" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-xl text-muted mb-8">I&apos;m always open to discussing new projects and opportunities</p>
            <HoverScale>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-orange-700/80 rounded-lg font-semibold transition-colors"
              >
                Start a Convo!
                <ArrowUpRight01Icon size={25} />
              </Link>
            </HoverScale>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
