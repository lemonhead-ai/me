import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Project {
  meta: ProjectMeta;
  content: string;
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  return fs.readdirSync(projectsDirectory).filter(file => file.endsWith('.mdx'));
}

export function getProjectBySlug(slug: string): Project {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug: realSlug,
      ...(data as Omit<ProjectMeta, 'slug'>),
    },
    content,
  };
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .sort((a, b) => {
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.meta.featured);
}

// ================= BLOGS =================

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  author?: string;
  isPremium?: boolean;
  price?: number;
}

export interface Blog {
  meta: BlogMeta;
  content: string;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }
  return fs.readdirSync(blogsDirectory).filter(file => file.endsWith('.mdx'));
}

export function getBlogBySlug(slug: string): Blog | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(blogsDirectory, `${realSlug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      meta: {
        slug: realSlug,
        ...(data as Omit<BlogMeta, 'slug'>),
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading blog ${slug}:`, error);
    return null;
  }
}

export function getAllBlogs(): Blog[] {
  const slugs = getBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is Blog => blog !== null)
    .sort((a, b) => {
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });
  return blogs;
}