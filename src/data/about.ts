import { AboutData } from '@/types';

export const aboutData: AboutData = {
  name: 'Calvin Liew',
  title: 'Product Analyst & Designer',
  tagline: 'Building intelligent products at the intersection of technology, design, and business strategy',
  introduction: 'I\'m a Product Analyst and Designer passionate about creating user-centered solutions that drive meaningful impact. With experience spanning UI/UX design, data analysis, and product development, I bring a unique perspective to building products that solve real problems. Currently at Sanofi, I leverage AI and automation to optimize software operations and drive innovation.',
  email: 'calvin.liew@mail.utoronto.ca',
  socialLinks: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/calvin-liew-/',
      icon: 'linkedin'
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/Calvin-Liew',
      icon: 'github'
    },
    {
      platform: 'Email',
      url: 'mailto:calvin.liew@mail.utoronto.ca',
      icon: 'email'
    }
  ],
  skills: [
    {
      category: 'Product Management',
      items: [
        'Product Strategy',
        'Requirements Analysis',
        'User Research',
        'Agile/Scrum',
        'Roadmap Planning',
        'Stakeholder Management',
        'Product Analytics',
        'A/B Testing'
      ]
    },
    {
      category: 'Design',
      items: [
        'UI/UX Design',
        'Prototyping',
        'Figma',
        'User-Centered Design',
        'Wireframing',
        'Design Systems',
        'Usability Testing',
        'Interaction Design'
      ]
    },
    {
      category: 'Technical',
      items: [
        'Python',
        'JavaScript/TypeScript',
        'React/Next.js',
        'HTML/CSS',
        'SQL',
        'Git',
        'REST APIs',
        'Low-Code Platforms'
      ]
    },
    {
      category: 'Data & AI',
      items: [
        'Data Analysis',
        'Data Visualization',
        'D3.js',
        'Large Language Models',
        'Prompt Engineering',
        'Google Analytics',
        'Statistical Analysis',
        'Business Intelligence'
      ]
    }
  ]
};
