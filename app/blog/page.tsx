import { getAllBlogs } from '@/lib/mdx';
import { BlogCard } from '@/components/blog/BlogCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/AdvancedAnimations';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Blog - Martin Mwai',
  description: 'Thoughts on software development, tech trends, and my journey.',
};

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Everyday <span className="gradient-text">Blogs</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Thoughts on everything tech, a journal as a developer.
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
