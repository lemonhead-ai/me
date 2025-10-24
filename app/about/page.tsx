'use client';

import { motion } from 'framer-motion';
import { 
  SourceCodeIcon, 
  BrowserIcon, 
  DatabaseIcon, 
  CloudIcon,
  CheckmarkCircle02Icon 
} from 'hugeicons-react';
import { ScrollReveal, StaggerContainer, StaggerItem, HoverScale } from '@/components/animations/AdvancedAnimations';

const skills = {
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  'Backend': ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'],
  'Tools': ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
  'Practices': ['Responsive Design', 'Performance Optimization', 'Testing', 'CI/CD'],
};

const experience = [
  {
    role: 'Junior Frontend Developer, Mobile Developer',
    company: 'Lemonlabs',
    period: '2023 - Present',
    description: 'Leading frontend development for enterprise applications',
  },
  {
    role: 'Full Stack Developer',
    company: 'Secure Chain Systems',
    period: '2025 - Present',
    description: 'Built and maintained multiple web applications',
  },
  {
    role: 'Mobile Developer',
    company: 'Secure Chain Systems',
    period: '2025 - Present',
    description: 'Developed mobile applications',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Passionate developer with a focus on creating exceptional digital experiences
            </p>
          </div>
        </ScrollReveal>

        {/* Bio Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-3xl font-bold mb-6">My Journey</h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  I&apos;m a software developer with a passion for building beautiful, performant, 
                  and user-friendly web applications. My journey in tech started over 5 years ago, 
                  and I&apos;ve been hooked ever since.
                </p>
                <p>
                  I specialize in modern JavaScript frameworks, with a particular focus on React 
                  and Next.js. I love the challenge of turning complex problems into simple, 
                  elegant solutions. i am also proficient in mobile development, creating seamless experiences across devices.
                </p>
                <p>
                  When I&apos;m not coding, you can find me contributing to open-source projects, 
                  writing technical blog posts, or exploring new technologies and frameworks.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Quick Facts</h3>
              <div className="space-y-4">
                {[
                  { label: 'Location', value: 'Nairobi, KE' },
                  { label: 'Experience', value: '3+ Years' },
                  { label: 'Projects', value: ' Completed' },
                  { label: 'Availability', value: 'Open to opportunities' },
                ].map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-between items-center pb-4 border-b border-border last:border-0"
                  >
                    <span className="text-muted">{fact.label}</span>
                    <span className="font-semibold text-foreground">{fact.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Skills Section */}
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-12">
            Skills & Technologies
          </h2>
        </ScrollReveal>

        <StaggerContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {Object.entries(skills).map(([category, items], i) => (
              <StaggerItem key={category}>
                <HoverScale>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold mb-4 text-primary">
                      {category}
                    </h3>
                    <ul className="space-y-2">
                      {items.map((skill) => (
                        <li key={skill} className="flex items-center gap-2 text-muted">
                          <CheckmarkCircle02Icon size={16} className="text-primary" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </HoverScale>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Experience Section */}
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-12">
            Experience
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <StaggerContainer>
            {experience.map((exp, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="glass rounded-2xl p-6 mb-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-muted mb-2">{exp.company}</p>
                  <p className="text-muted">{exp.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}