# Calvin Liew - Portfolio Website

A modern, clean portfolio website built with Next.js 15, TypeScript, and Tailwind CSS showcasing product management, UI/UX design, and data analysis projects.

## Features

- **Modern Stack**: Next.js 15 with App Router, React Server Components, TypeScript
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Project Showcase**: Filterable projects by category (Product Management, UI/UX Design, Data Analysis, Development)
- **Blog System**: Markdown-based blog with full support for rich content
- **SEO Optimized**: Proper metadata, semantic HTML, and optimized performance
- **Accessible**: WCAG AA compliant with keyboard navigation and screen reader support

## Pages

- **Home** (`/`): Hero section, featured projects, skills overview, and contact
- **Profile** (`/profile`): About me, skills, work experience, education, and contact
- **Projects** (`/projects`): All projects with filtering capabilities
- **Project Detail** (`/projects/[id]`): Individual project pages with full details
- **Blog** (`/blog`): List of blog posts
- **Blog Post** (`/blog/[slug]`): Individual blog post pages

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd portfolio-site
```

2. Install dependencies (already installed):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio-site/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx          # Root layout with header/footer
│   │   ├── page.tsx            # Homepage
│   │   ├── profile/            # Profile page (about + experience)
│   │   ├── projects/           # Projects pages
│   │   └── blog/               # Blog pages
│   ├── components/
│   │   ├── layout/             # Header, Footer, Container, Section
│   │   ├── ui/                 # Reusable UI components
│   │   ├── sections/           # Homepage sections
│   │   ├── projects/           # Project components
│   │   ├── blog/               # Blog components
│   │   └── experience/         # Experience components
│   ├── data/                   # Static data files
│   │   ├── projects.ts         # All project data
│   │   ├── experience.ts       # Work experience data
│   │   ├── education.ts        # Education data
│   │   └── about.ts            # About data
│   ├── types/                  # TypeScript type definitions
│   ├── lib/                    # Utility functions
│   └── content/
│       └── blog/               # Markdown blog posts
└── public/                     # Static assets
```

## Customization

### Adding New Projects

Edit `src/data/projects.ts` and add a new project object following the `Project` type definition.

### Adding New Blog Posts

Create a new Markdown file in `src/content/blog/` with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2025-12-23"
excerpt: "Brief description of your post"
tags: ["Product Management", "Design"]
---

Your content here...
```

### Updating Personal Information

Edit the following files:
- `src/data/about.ts` - Personal info, intro, social links
- `src/data/experience.ts` - Work experience
- `src/data/education.ts` - Education details

### Customizing Design

The design system is configured in `src/app/globals.css`:
- Colors: `--primary`, `--secondary`, `--accent`, `--background`, `--surface`
- Spacing: `--spacing-18`, `--spacing-22`, `--spacing-26`
- Fonts: `--font-geist-sans`, `--font-geist-mono`

## Deployment

### Deploy to Netlify

#### Method 1: GitHub Integration (Recommended - Continuous Deployment)

1. Push your code to GitHub (see GitHub setup below)
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Netlify will auto-detect Next.js settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

**Automatic deployments**: Every push to `main` branch will trigger a new deployment.

Your site will be live at `https://your-site-name.netlify.app`

#### Method 2: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
```

Follow the prompts:
- Create & configure a new site
- Choose your team
- Site name: `calvin-liew-portfolio` (or your preference)
- Build command: `npm run build`
- Publish directory: `.next`

4. Deploy:
```bash
netlify deploy --prod
```

#### Method 3: Manual Deploy (Drag & Drop)

1. Build locally:
```bash
npm run build
```

2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `.next` folder

### Custom Domain

In Netlify dashboard:
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `calvinliew.com`)
4. Follow DNS configuration instructions:
   - Add CNAME record pointing to `your-site.netlify.app`
   - Or use Netlify DNS for automatic configuration

### Environment Variables

If you add environment variables later:
1. Go to Site settings → Environment variables
2. Add variables (e.g., `NEXT_PUBLIC_API_URL`)
3. Redeploy to apply changes

## Performance

The site is optimized for performance:
- Server-side rendering for fast initial loads
- Static generation for blog posts and project pages
- Optimized images with Next.js Image component
- Minimal JavaScript bundle size
- Code splitting and lazy loading

## License

© 2025 Calvin Liew. All rights reserved.

## Contact

- Email: calvin.liew@mail.utoronto.ca
- LinkedIn: [linkedin.com/in/calvinliew](https://www.linkedin.com/in/calvinliew/)
- GitHub: [github.com/calvinliew](https://github.com/calvinliew)
