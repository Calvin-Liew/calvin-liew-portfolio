import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'sanofi-product-analyst',
    title: 'AI Workflows Product Analyst',
    company: 'Sanofi',
    location: 'Toronto, Ontario, Canada (Hybrid)',
    dates: 'Sep 2025 - Present',
    type: 'Contract Part-time',
    description: [
      'Led development of SupRM Intelligence, an enterprise AI assistant supporting decisions across 61 strategic suppliers and 34 Key Supplier Managers; reached 80 unique production users and 572 conversations in its first six months.',
      'Created an evaluation framework spanning 18 business scenarios and 25 deterministic checks, achieving a 97.9% production evaluation pass rate and 100% tool compliance while shortening representative responses by 65%.',
      'Built reusable agent tools and orchestration capabilities used by 6+ AI products across budgeting, risk, compliance, procurement, and supplier management.',
      'Built supplier performance reporting across weekly, monthly, quarterly, and annual workflows, reconciling 1,822 historical metric records and backfilling 211 missing reporting periods without duplicates.',
      'Piloted a document-to-action workflow that lets people confirm, revise, or dismiss proposed actions before they are created.'
    ],
    skills: [
      'AI Agent Development',
      'LLM Orchestration',
      'Snowflake',
      'API Integration',
      'Data Visualization',
      'Product Management',
      'Stakeholder Management',
      'Dashboard Design',
      'Supplier Risk Management'
    ]
  },
  {
    id: 'sanofi-product-analyst-intern',
    title: 'Digital Strategy and Operations Intern',
    company: 'Sanofi',
    location: 'Toronto, Ontario, Canada (Hybrid)',
    dates: 'Sep 2024 - Aug 2025',
    type: 'Co-op',
    description: [
      'Led the redesign of License Patrol for 500+ applications, contributing to a shared €15M+ software-optimization savings effort.',
      'Defined stakeholder requirements, mapped processes, and aligned features with Finance, Procurement, and Software Asset Management teams.',
      'Built low-code AI integrations to support governance workflows.',
      'Delivered 5+ demos, gathered stakeholder feedback, and used it to refine the product.'
    ],
    skills: [
      'LLM',
      'Prompt Engineering',
      'Low-Code Platforms',
      'Product Management',
      'Requirements Analysis',
      'Process Flow Diagrams',
      'Software Asset Management',
      'Stakeholder Management',
      'Workflow Automation'
    ]
  },
  {
    id: 'uoft-project-lead',
    title: 'Project Development Lead',
    company: 'Authentic Learning Lab — University of Toronto',
    location: 'Toronto, Ontario, Canada (Remote)',
    dates: 'May 2024 - Aug 2024',
    type: 'Contract Part-time',
    description: [
      'Directed a cross-functional team of 5+ to design The Game of Social Life, a youth learning simulation showcased at the 2025 Human Flourishing symposium.',
      'Developed accessible, engaging front-end in HTML/CSS/JS and conducted user studies to refine mechanics and improve usability.'
    ],
    skills: [
      'Agile Scrum',
      'Sprint Planning',
      'Product Management',
      'Frontend Development',
      'HTML/CSS/JavaScript',
      'UI/UX Design',
      'User Research',
      'Accessibility',
      'Team Leadership'
    ]
  },
  {
    id: 'tmg-digital-strategy',
    title: 'Director of Digital Strategy',
    company: 'The Marketing Group',
    location: 'Toronto, Ontario, Canada',
    dates: 'Apr 2025 - Present',
    type: 'Volunteer',
    description: [
      'Led a mobile-first UX/UI redesign for a student organization website, improving navigation, visual hierarchy, and conversion paths across core journeys like About, Events, and Join.',
      'Transformed a high-bounce Wix experience into a task-oriented product journey, reducing bounce rate from 62% to approximately 23% through clearer information architecture and stronger calls to action.',
      'Applied Google Analytics and behavioral insights to refine content structure and interaction patterns, reaching an average session duration of 3m 36s and supporting a 67% rise in site sessions.',
      'Reframed the website as a product with distinct user journeys for students, applicants, and sponsors, making the experience easier to scan, navigate, and act on.',
      'Strengthened the brand experience by aligning UI components, content hierarchy, and responsive layouts into a cohesive system that better supported mobile users.'
    ],
    skills: [
      'UX Design',
      'Information Architecture',
      'Google Analytics',
      'Mobile-First Design',
      'Content Strategy',
      'Wix',
      'Design Systems',
      'Performance Monitoring',
      'Conversion Optimization'
    ]
  }
];
