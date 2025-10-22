import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getProjectSlugs } from '@/lib/mdx';
import { Github01Icon, Link01Icon, Calendar03Icon, ArrowLeft01Icon } from 'hugeicons-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animations/AdvancedAnimations';

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const project = getProjectBySlug(params.slug);
    return {
      title: `${project.meta.title} - Projects`,
      description: project.meta.description,
    };
  } catch {
    return {
      title: 'Project Not Found',
    };
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  let project;
  
  try {
    project = getProjectBySlug(params.slug);
  } catch {
    notFound();
  }

  const { meta, content } = project;

  return (
    <div className="min-h-screen py-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <ScrollReveal direction="left">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors mb-8"
          >
            <ArrowLeft01Icon size={20} />
            Back to Projects
          </Link>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal>
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {meta.title}
            </h1>
            <p className="text-xl text-muted mb-6">{meta.description}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Calendar03Icon size={18} />
                {new Date(meta.date).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </div>

              {meta.github && (
                <a
                  href={meta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Github01Icon size={18} />
                  View Code
                </a>
              )}

              {meta.demo && (
                <a
                  href={meta.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Link01Icon size={18} />
                  Live Demo
                </a>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </ScrollReveal>

        {/* Featured Image */}
        {meta.image && (
          <ScrollReveal>
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img
                src={meta.image}
                alt={meta.title}
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>
        )}

        {/* Content */}
        <ScrollReveal>
          <div className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-p:text-muted prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-light
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-primary prose-code:bg-secondary prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-card prose-pre:border prose-pre:border-border
            prose-ul:text-muted prose-ol:text-muted
            prose-li:marker:text-primary
          ">
            <MDXRemote source={content} />
          </div>
        </ScrollReveal>
      </article>
    </div>
  );
}