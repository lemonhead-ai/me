import { getBlogBySlug, getBlogSlugs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ScrollReveal } from '@/components/animations/AdvancedAnimations';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { ArrowLeft01Icon, LockKeyIcon } from 'hugeicons-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { SignInButton } from '@clerk/nextjs';
import { AdBanner } from '@/components/ads/AdBanner';

// Add Custom MDX Components here
const components = {
  AdBanner,
};

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const blog = getBlogBySlug(params.slug);
  if (!blog) return { title: 'Not Found' };

  return {
    title: `${blog.meta.title} - Martin Mwai`,
    description: blog.meta.description,
    openGraph: {
      title: blog.meta.title,
      description: blog.meta.description,
      type: 'article',
      publishedTime: blog.meta.date,
      authors: [blog.meta.author || 'Martin Mwai'],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.meta.title,
      description: blog.meta.description,
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  // Authentication and Paywall Logic
  const { userId, sessionClaims } = await auth();
  
  // Check if blog is premium
  const isPremium = blog.meta.isPremium;
  
  // A user has access if it's free OR if they are logged in and their public metadata says they unlocked it
  // sessionClaims.publicMetadata could store an array of unlocked slugs.
  let hasAccess = !isPremium;
  
  if (isPremium && userId) {
    const publicMetadata = sessionClaims?.metadata as any;
    const unlockedBlogs = publicMetadata?.unlocked_blogs || [];
    if (unlockedBlogs.includes(blog.meta.slug)) {
      hasAccess = true;
    }
  }

  return (
    <article className="min-h-screen py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8 transition-colors font-medium"
          >
            <ArrowLeft01Icon size={20} />
            Back to blogs
          </Link>

          <header className="mb-12 border-b border-white/10 pb-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
              {isPremium && (
                <span className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent font-medium flex items-center gap-1">
                  <LockKeyIcon size={14} /> Premium
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {blog.meta.title}
            </h1>

            <div className="flex items-center text-muted gap-4 text-sm">
              <span className="font-medium text-foreground">{blog.meta.author || 'Martin Mwai'}</span>
              <span>•</span>
              <time dateTime={blog.meta.date}>
                {new Date(blog.meta.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="md:col-span-10">
            {!hasAccess ? (
              <div className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border border-accent/20 bg-accent/5">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6">
                  <LockKeyIcon size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Premium Article</h2>
                <p className="text-muted text-lg mb-8 max-w-md">
                  This article is exclusive to premium members. 
                  {userId ? " Unlock it now to keep reading." : " Sign in and unlock to keep reading."}
                </p>
                
                {!userId ? (
                  <SignInButton mode="modal">
                    <button className="px-8 py-4 bg-primary hover:bg-primary-dark text-blue rounded-lg font-semibold transition-colors">
                      Sign in to Unlock
                    </button>
                  </SignInButton>
                ) : (
                  <form action={`/api/checkout`} method="POST">
                    <input type="hidden" name="slug" value={blog.meta.slug} />
                    <input type="hidden" name="price" value={blog.meta.price || 5} />
                    <button type="submit" className="px-8 py-4 bg-accent hover:bg-accent/80 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-accent/20">
                      Unlock for ${blog.meta.price || 5}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="prose prose-invert prose-primary max-w-none">
                <MDXRemote source={blog.content} components={components} />
              </div>
            )}
          </div>

          {/* Sidebar / Share Buttons */}
          <div className="md:col-span-2 relative">
            <div className="sticky top-32">
              <ShareButtons title={blog.meta.title} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
