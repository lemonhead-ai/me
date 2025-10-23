'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github01Icon, Link01Icon, Calendar03Icon, Tag01Icon } from 'hugeicons-react';
import { ProjectMeta } from '@/lib/mdx';
import { TiltCard, HoverScale } from '../animations/AdvancedAnimations';

interface ProjectCardProps {
  project: ProjectMeta;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <TiltCard>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass rounded-2xl overflow-hidden h-full flex flex-col group"
      >
        {/* Project Image */}
        {project.image && (
          <div className="relative h-48 overflow-hidden bg-secondary">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-muted mb-4 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1"
                >
                  <Tag01Icon size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted">
              <Calendar03Icon size={16} />
              {new Date(project.date).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </div>

            {/* Links */}
            <div className="flex gap-2">
              {project.github && (
                <HoverScale>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github01Icon size={18} className="text-primary" />
                  </a>
                </HoverScale>
              )}
              {project.demo && (
                <HoverScale>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
                    aria-label="View demo"
                  >
                    <Link01Icon size={18} className="text-primary" />
                  </a>
                </HoverScale>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}