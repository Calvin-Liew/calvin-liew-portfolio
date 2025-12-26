import { AboutData } from '@/types';

export const aboutData: AboutData = {
  name: 'Calvin Liew',
  title: 'Product Manager & Designer',
  tagline: 'Building intelligent products at the intersection of technology, design, and business strategy',
  introduction: 'I\'m a Product Manager and Designer passionate about creating user-centered solutions that drive meaningful impact. With experience spanning product management, UI/UX design, and data analysis, I bring a unique perspective to building products that solve real problems. Currently at Sanofi, I leverage AI and automation to optimize software operations and drive innovation.',
  email: 'calvin.liew@mail.utoronto.ca',
  socialLinks: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/calvinliew/',
      icon: 'linkedin'
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/calvinliew/calvin-liew-portfolio',
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
