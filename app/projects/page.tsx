import { getAllProjects } from '@/lib/mdx';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/AdvancedAnimations';

export const metadata = {
  title: 'Projects - Martin Mwai',
  description: 'Explore my portfolio of diverse projects',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              A collection of projects I&apos;ve worked on, showcasing my skills and passion for development
            </p>
          </div>
        </ScrollReveal>

        {projects.length > 0 ? (
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <StaggerItem key={project.meta.slug}>
                  <ProjectCard project={project.meta} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted text-lg">
              No projects yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}