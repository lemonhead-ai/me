import { getAllBlogs } from '@/lib/mdx';
import { BlogCard } from '@/components/blog/BlogCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/AdvancedAnimations';

export const metadata = {
  title: 'Blog - Martin Mwai',
  description: 'Thoughts on software development, tech trends, and my journey.',
};

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              My <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Thoughts on software development, web technologies, and my journey as a developer.
            </p>
          </div>
        </ScrollReveal>

        {blogs.length > 0 ? (
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <StaggerItem key={blog.meta.slug}>
                  <BlogCard blog={blog.meta} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
