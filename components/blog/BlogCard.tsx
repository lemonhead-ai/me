import Link from 'next/link';
import { BlogMeta } from '@/lib/mdx';
import { ArrowUpRight01Icon, LockKeyIcon, ViewIcon } from 'hugeicons-react';
import { HoverScale } from '@/components/animations/AdvancedAnimations';

export function BlogCard({ blog }: { blog: BlogMeta }) {
  return (
    <HoverScale>
      <Link href={`/blog/${blog.slug}`} className="block h-full">
        <div className="glass rounded-2xl p-6 h-full flex flex-col transition-colors hover:border-primary/50 relative overflow-hidden group">
          
          {/* Premium Badge */}
          {blog.isPremium && (
            <div className="absolute top-4 right-4 bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-md">
              <LockKeyIcon size={14} />
              Premium
            </div>
          )}

          <div className="flex-1">
            <div className="flex justify-between items-start mb-4 mt-2">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors pr-8">
                {blog.title}
              </h3>
            </div>

            <p className="text-muted line-clamp-3 mb-6">
              {blog.description}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">
                {new Date(blog.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="text-primary flex items-center gap-1 text-sm font-medium">
                {blog.isPremium ? 'Unlock to Read' : 'Read Article'} 
                {blog.isPremium ? <LockKeyIcon size={16} /> : <ArrowUpRight01Icon size={16} />}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </HoverScale>
  );
}
