# Portfolio Website

A modern, performant portfolio built with Next.js 15, Framer Motion, and Tailwind CSS.

## 🚀 Features

- ⚡ **Ultra-fast performance** - Optimized for speed and low data mode
- 🎨 **6 theme combinations** - Dark/Light mode with Purple/Blue/Green accents
- ✨ **World-class animations** - Powered by Framer Motion
- 📱 **Fully responsive** - Perfect on all devices
- 🎯 **MDX support** - Easy project management
- 🎭 **Hugeicons integration** - Beautiful icon library
- 🔍 **SEO optimized** - Meta tags and Open Graph support

## 📦 Installation

1. **Create Next.js project:**
```bash
npx create-next-app@latest portfolio --typescript --tailwind --app
cd portfolio
```

2. **Install dependencies:**
```bash
npm install framer-motion next-mdx-remote gray-matter hugeicons-react react-intersection-observer
```

3. **Copy all files** from the artifacts into your project structure

4. **Create content directory:**
```bash
mkdir -p content/projects
```

5. **Add your project MDX files** to `content/projects/`

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── projects/
│   │   ├── page.tsx            # Projects listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual project page
│   └── contact/
│       └── page.tsx            # Contact page
├── components/
│   ├── animations/
│   │   └── AdvancedAnimations.tsx    # All animation components
│   ├── layout/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Footer component
│   │   └── ThemeSwitcher.tsx   # Theme controls
│   ├── projects/
│   │   └── ProjectCard.tsx     # Project card component
│   └── providers/
│       └── ThemeProvider.tsx   # Theme context provider
├── content/
│   └── projects/
│       ├── project-1.mdx       # Project content files
│       └── project-2.mdx
├── lib/
│   ├── mdx.ts                  # MDX utilities
│   └── themes.ts               # Theme definitions
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Theme System

The portfolio includes 6 pre-configured themes:

### Dark Themes
- Dark + Purple accent
- Dark + Blue accent  
- Dark + Green accent

### Light Themes
- Light + Purple accent
- Light + Blue accent
- Light + Green accent

Users can switch themes using the theme switcher in the header.

## ✨ Animation Components

Available animation components in `components/animations/AdvancedAnimations.tsx`:

- `PageTransition` - Smooth page transitions
- `ScrollReveal` - Reveal elements on scroll
- `MagneticButton` - Magnetic hover effect
- `ParallaxSection` - Parallax scrolling
- `ScrollProgress` - Page scroll progress bar
- `StaggerContainer/StaggerItem` - Staggered animations
- `TextReveal` - Animated text reveal
- `FloatingElement` - Floating animation
- `HoverScale` - Scale on hover
- `MouseFollower` - Custom cursor follower
- `TiltCard` - 3D tilt effect on hover

## 📝 Adding Projects

Create MDX files in `content/projects/`:

```mdx
---
title: "Project Title"
description: "Brief description"
date: "2024-10-22"
tags: ["React", "Next.js", "TypeScript"]
image: "/projects/image.jpg"
github: "https://github.com/username/repo"
demo: "https://demo.com"
featured: true
---

## Project content goes here

Write your project details using Markdown...
```

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Performance Features

- Server-side rendering
- Image optimization
- Code splitting
- Lazy loading
- Reduced motion support
- Low data mode optimization
- Aggressive caching

## 🌐 Deployment

Deploy to Vercel (recommended):

```bash
npm install -g vercel
vercel
```

Or use the Vercel GitHub integration for automatic deployments.

## ⚙️ Customization

### Update Personal Info

1. **Name & Bio**: Edit `app/page.tsx`, `app/about/page.tsx`
2. **Social Links**: Update in `components/layout/Footer.tsx` and `app/contact/page.tsx`
3. **Email**: Change in `app/contact/page.tsx`
4. **Meta Tags**: Update in `app/layout.tsx`

### Add Custom Themes

Edit `lib/themes.ts` to add new color schemes:

```typescript
'custom-theme': {
  mode: 'dark',
  accent: 'purple',
  style: 'default',
  colors: {
    background: '#your-color',
    // ... other colors
  },
}
```

### Modify Animations

All animations are in `components/animations/AdvancedAnimations.tsx`. Adjust:
- Duration
- Easing functions
- Delay
- Transition types

## 📱 Routes

- `/` - Home page with hero section
- `/about` - About page with skills and experience
- `/projects` - Projects listing
- `/projects/[slug]` - Individual project details
- `/contact` - Contact form and social links

## 🛠️ Technologies

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Content**: MDX
- **Icons**: Hugeicons
- **Language**: TypeScript
- **Font**: Inter

## 📄 License

MIT License - Feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)
- Website: [yourwebsite.com](https://yourwebsite.com)

---

Made with ❤️ using Next.js and Framer Motion