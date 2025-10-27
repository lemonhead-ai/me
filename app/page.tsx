'use client';

import { motion } from "framer-motion";
import Link from "next/link";

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
  DribbbleIcon,
  SmartPhone01Icon,
} from "hugeicons-react";
import {
  ScrollReveal,
  TextReveal,
  FloatingElement,
  HoverScale,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/AdvancedAnimations";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Responsive: mobile layout (icons + blob row, text below) and desktop grid */}
      <section className="relative min-h-screen flex items-center  justify-center overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* ===== MOBILE LAYOUT: icons on left of blob, text below (only visible on <lg) ===== */}
          <div className="lg:hidden flex flex-col -mt-20 items-center gap-8 py-8">
            <div className="w-full flex items-start gap-6 px-4">
              {/* Social icons (mobile) */}
              <div className="flex flex-col space-y-4">
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
                    href="https://dribbble.com/sacredlemon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                    aria-label="Dribbble"
                  >
                    <DribbbleIcon size={20} />
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

              {/* Blob + profile (mobile) */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 ml-4 flex-shrink-0">
                {/* Mobile SVG: background blob shape */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="blob-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgb(124, 58, 237)' }} />
                      <stop offset="50%" style={{ stopColor: 'rgb(6, 182, 212)' }} />
                      <stop offset="100%" style={{ stopColor: 'rgb(147, 51, 234)' }} />
                    </linearGradient>

                    <clipPath id="blob-clip-mobile" clipPathUnits="objectBoundingBox" transform="scale(0.005, 0.005)">
                      <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                          130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                          97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                          0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
                    </clipPath>
                  </defs>

                  <path
                    d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                          130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                          97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                          0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                    fill="url(#blob-gradient-mobile)"
                  />
                </svg>

                {/* Clipped image - perfectly sized to match container */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    clipPath: "url(#blob-clip-mobile)",
                    WebkitClipPath: "url(#blob-clip-mobile)",
                  }}
                >
                  <img
                    src="/profile.png"
                    alt="Martin Mwai"
                    className="w-full h-full object-cover object-center scale-110"
                  />
                </div>
              </div>
            </div>

            {/* Text below on mobile */}
            <div className="w-full px-4 sm:px-6">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  <TextReveal text="Hi, I'm " delay={0.2} />
                  <span className="text">
                    <TextReveal text="Martin Mwai" delay={0.6} />
                  </span>
                </h1>

                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-xl text-primary mb-4 font-medium"
                >
                  Full Stack Developer
                </motion.h2>

                <p className="text-base md:text-lg text-muted mb-6 max-w-xl mx-auto leading-relaxed">
                  A full stack developer with a flair for web design and a commitment to top-tier work.
                  Explore my portfolio for innovative solutions that exceed expectations. Welcome to a realm
                  where design meets precision.
                </p>

                <div className="flex justify-center">
                  <HoverScale>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-blue rounded-full font-semibold transition-colors"
                    >
                      Get in Touch
                      <MessageProgrammingIcon size={18} />
                    </Link>
                  </HoverScale>
                </div>
              </div>
            </div>
          </div>
          {/* ===== end mobile layout ===== */}


          {/* ===== DESKTOP / LARGE LAYOUT (lg and up): original grid behavior ===== */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-screen">
            {/* Social Icons - Left Side (desktop) */}
            <div className="col-span-1 flex flex-col items-center lg:items-start space-y-6">
              <motion.div
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
                    href="https://dribbble.com/sacredlemon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary-dark transition-colors"
                    aria-label="Dribbble"
                  >
                    <DribbbleIcon size={24} />
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
              </motion.div>
            </div>

            {/* Main Content - Center (desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-left lg:text-left"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                  <TextReveal text="Hi, I'm " delay={0.2} />
                  <span className="gradient-text">
                    <TextReveal text="Martin Mwai" delay={0.6} />
                  </span>
                </h1>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-2xl text-primary mb-6 font-medium"
                >
                  Full Stack Developer
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="text-lg text-muted mb-8 max-w-2xl leading-relaxed"
                >
                  A full stack developer with a flair for web design and a commitment to top-tier work. 
                  Explore my portfolio for innovative solutions that exceed expectations. Welcome to a realm 
                  where design meets precision.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <HoverScale>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-blue rounded-lg font-semibold transition-colors"
                    >
                      Get in Touch
                      <MessageProgrammingIcon size={20} />
                    </Link>
                  </HoverScale>
                </motion.div>
              </motion.div>
            </div>

            {/* Profile Image with Blob Shape - Right Side (desktop) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.5 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="relative w-90 h-90 lg:w-80 lg:h-80"
              >
                {/* Desktop-specific clipPath + gradient id */}
                <svg
                  className="absolute inset-0 w-50 h-48 pointer-events-none"
                  viewBox="0 0 200 -179"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="blob-gradient-desktop" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgb(124, 58, 237)' }} />
                      <stop offset="50%" style={{ stopColor: 'rgb(6, 182, 212)' }} />
                      <stop offset="100%" style={{ stopColor: 'rgb(147, 51, 234)' }} />
                    </linearGradient>
                    <clipPath id="blob-clip-desktop">
                      <path
                        d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                      />
                    </clipPath>
                  </defs>

                  <path
                    d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                    fill="url(#blob-gradient-desktop)"
                  />
                </svg>

                <div
                  className="relative w-50 h-48 overflow-hidden"
                  style={{
                    clipPath: "url(#blob-clip-desktop)",
                    WebkitClipPath: "url(#blob-clip-desktop)",
                  }}
                >
                  <img
                    src="/profile.png"
                    alt="Martin Mwai"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) (fallback as HTMLElement).style.display = "flex";
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center backdrop-blur-sm"
                    style={{ display: "none" }}
                  >
                    <span className="text-6xl font-bold text-primary">African Giant</span>
                  </div>
                </div>

                {/* Floating decoration */}
                <FloatingElement>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-4xl" />
                </FloatingElement>
                <FloatingElement>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
                </FloatingElement>
              </motion.div>
            </div>
          </div>
          {/* ===== end desktop layout ===== */}

          {/* Scroll Indicator - Bottom (shared) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-18 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link href="#about" className="flex flex-col items-center gap-1 text-muted hover:text-primary transition-colors">
                <Mouse01Icon size={24} />
                <span className="text-sm"></span>
                <ArrowDown01Icon size={24} className="animate-bounce" />
              </Link>
            </motion.div>
          </motion.div>
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
            <div className="grid md:grid-cols-3 gap-8">
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
                    "Designing mobile-first applications that provide seamless user experiences on all screen sizes, acrooss various platforms.",
                },
              ].map((skill, i) => (
                <StaggerItem key={i}>
                  <HoverScale>
                    <motion.div whileHover={{ y: -5 }} className="glass rounded-2xl p-8 h-full">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <skill.icon size={32} className="text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{skill.title}</h3>
                      <p className="text-muted">{skill.description}</p>
                    </motion.div>
                  </HoverScale>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-xl text-muted mb-8">I&apos;m always open to discussing new projects and opportunities</p>
            <HoverScale>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-blue rounded-lg font-semibold transition-colors"
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