import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'anatomy-of-fear',
    title: 'The Anatomy of Fear: Quantifying Dread in Horror Screenplays',
    category: 'Data Analysis',
    dates: 'Sep 2025 - Dec 2025',
    organization: 'University of Toronto',
    description: 'Led a team of six to build The Anatomy of Fear, an interactive data project that reveals the hidden patterns behind how horror movies scare us. Using GPT-4o, we built an AI pipeline to read 129 famous horror screenplays and parsed nearly 10,000 scenes to detect 11,000 horror signals. Directed the development of a Markov-chain transition matrix to map the ladder of fear and created a Vital Signs monitor that converts intensity into simulated heartbeat (BPM). Discovered a power law in horror: while elements like darkness set mood, elite signals like "scream" or "blood" drive the actual scares.',
    skills: ['Large Language Models (LLM)', 'Generative AI', 'D3.js', 'Agile Methodologies', 'Python (Programming Language)', 'Data Science', 'Data Visualization'],
    links: [
      {
        type: 'live',
        url: 'https://calvin-liew.github.io/data-explorers-fear-analytics/',
        label: 'The Anatomy of Fear: How Horror Films Terrify Us'
      }
    ],
    featured: true
  },
  {
    id: 'google-drive-companion',
    title: 'Google Drive Companion: Transitioning Storage from Passive to Proactive',
    category: 'Product Management',
    dates: 'Sep 2025 - Nov 2025',
    organization: 'University of Toronto',
    description: 'Led the product strategy and high-fidelity prototype for Google Drive Companion, an AI-driven extension designed to transform Google Drive from a reactive storage solution into a proactive intelligence platform. Applied Product Management frameworks like VRIN analysis and Resource-Based View to justify in-house development. Engineered a context-aware design system featuring "Welcome Dashboard" and "Panel Preview" UI. Designed high-impact features like the Syllabus-to-Schedule Pack using NLP to parse course outlines and auto-populate Google Calendar. Built proactive logic including Risk and Deadline Alerts to create an automated "Work Rhythm Optimizer".',
    skills: ['Product Management', 'Product Design', 'Prototyping', 'Agentic Design', 'Agents', 'User Interface Design', 'Rapid Prototyping', 'Large Language Models (LLM)'],
    links: [
      {
        type: 'demo',
        url: 'https://mgmc11-google-drive-companion-demo.netlify.app/',
        label: 'Drive Companion Demo'
      }
    ],
    featured: true
  },
  {
    id: 'music-pathways-redesign',
    title: 'The Music Pathways Product Redesign',
    category: 'UI/UX Design',
    dates: 'Nov 2025 - Nov 2025',
    organization: 'University of Toronto',
    description: 'Completed a solo product redesign for The Music Pathways Project to address critical accessibility gaps for music students. Designed an Interactive Pathways Explorer to replace traditional job family documents with an animated digital map. Developed Tempo, an AI-assisted mascot serving as a functional UI guide. Integrated a natural language chatbot with visual interface where user queries trigger real-time visual feedback within the career map. Complete overhaul of the homepage from static banner to interactive entry point, demonstrating ability to apply product strategy and user-centered design to solve complex information architecture challenges.',
    skills: ['Product Management', 'Product Design', 'UI/UX', 'Interactive Design', 'Agentic Design', 'Agent Interface'],
    links: [
      {
        type: 'live',
        url: 'https://calvin-liew-music-pathways.netlify.app/',
        label: 'The Music Pathways Project Product Redesign'
      }
    ],
    featured: true
  },
  {
    id: 'night-shift',
    title: 'The Night Shift: An Interactive Exploration of Sleep, Stress, and Health',
    category: 'Data Analysis',
    dates: 'Oct 2025 - Nov 2025',
    organization: 'University of Toronto',
    description: 'Led a team to develop The Night Shift, an interactive three-chapter data story challenging the assumption that job titles primarily drive sleep quality. Analyzed a dataset of 374 individuals exploring how personal lifestyle choices and physiological markers often outweigh professional roles. Using D3.js, built a series of multivariate visualizations including a Bubble Landscape examining stress variance within professions and a Sankey Diagram revealing pathways between physical activity levels and sleep outcomes. Engineered The Dream Lab, a physiological mapping tool where data points pulse in sync with resting heart rates.',
    skills: ['D3.js', 'JavaScript', 'HTML5', 'GitHub', 'Interaction Design', 'Data Visualization', 'Statistical Analysis'],
    links: [
      {
        type: 'live',
        url: 'https://calvin-liew.github.io/a4-sleep-analytics/',
        label: "The Night Shift: Why Your Job Doesn't Define Your Sleep"
      }
    ],
    featured: true
  },
  {
    id: 'matchify',
    title: 'Matchify - Music-Based Social Media App',
    category: 'UI/UX Design',
    dates: 'Jun 2024 - Aug 2024',
    organization: 'Independent Project',
    description: 'Designed the UI for Matchify, a music-driven social application that connects users through their listening habits. Developed an intuitive navigation system and customizable user profiles prioritizing visual identity and musical taste. Created streamlined onboarding process leveraging Spotify API integration to instantly personalize user journey. Designed comprehensive settings suite with granular privacy options. High-fidelity prototype was selected to be showcased at ARIA 2024, University of Toronto\'s premier research and innovation event.',
    skills: ['Navigation Design', 'Mobile Design', 'UI/UX Design', 'Experience Design', 'Figma', 'Prototyping', 'Mobile App Design', 'User-centered Design', 'Wireframing', 'Design Systems'],
    links: [
      {
        type: 'figma',
        url: 'https://www.figma.com/design/nkmVIyQnZzKT01rF20G9n1/Matchify-Project--Copy-?node-id=0-1&p=f&t=qmd4JXc07v1CpX4R-0',
        label: 'Matchify Figma Design Project'
      }
    ],
    caseStudy: {
      fileName: 'matchify.pdf',
      title: 'Matchify Case Study',
      fileSize: '11 MB'
    },
    featured: false
  },
  {
    id: 'tutorly',
    title: 'Tutorly - Match-Based Peer Tutoring Platform',
    category: 'UI/UX Design',
    dates: 'May 2024 - Aug 2024',
    organization: 'University of Toronto',
    description: 'Led the UX design for Tutorly, a peer tutoring platform built to bridge the gap between students through personalized academic support. Directed end-to-end design process starting with comprehensive user research and detailed persona creation. Designed core functional suite including personalized recommendation system for finding matches, integrated messaging interface, and data-driven progress tracking dashboard. Conducted iterative usability testing using student feedback to refine navigation and feature set. Project achieved final evaluation score above 85% and was selected for showcase at University of Toronto Scarborough Undergraduate Research Symposium 2024.',
    skills: ['Mobile Design', 'Usability Testing', 'Experience Design', 'Prototyping', 'User-centered Design', 'User Experience Design (UED)', 'User Personas', 'Figma', 'Wireframing', 'UX Research', 'Design Thinking'],
    links: [
      {
        type: 'figma',
        url: 'https://www.figma.com/design/ssRCJVnGktqLf6BZCVj1ph/Tutorly-Project?t=Mx5ibMOFH3m6BehJ-0',
        label: 'Tutorly Figma Design Project'
      }
    ],
    caseStudy: {
      fileName: 'tutorly.pdf',
      title: 'Tutorly Case Study',
      fileSize: '16 MB'
    },
    featured: false
  },
  {
    id: 'food-resq',
    title: 'Food ResQ App',
    category: 'Product Management',
    dates: 'Oct 2023 - Oct 2023',
    organization: 'Hack The Valley 8',
    description: 'Led the product design of Food ResQ, a web application developed during Hack The Valley 8 to combat local food waste. Led the business pitch which earned full marks for strategic vision, and designed entire UI/UX to ensure fast, accessible experience for both donors and recipients. Supported development process and managed backend planning to ensure technical architecture met core user needs. Bridged gap between business logic and technical execution, ensuring product was both feasible and impactful. Secured 6th place overall out of dozens of competing teams, demonstrating ability to build functional, high-stakes solution under intense time constraints.',
    skills: ['User Interface Design', 'Project Management', 'Product Management', 'Software Design', 'Figma', 'User Experience (UX)', 'Large Language Models (LLM)', 'Generative AI', 'Hackathon'],
    links: [
      {
        type: 'devpost',
        url: 'https://devpost.com/software/food-resq',
        label: 'Food ResQ: AI Recommended Recipes To Reduce Food Waste'
      },
      {
        type: 'demo',
        url: 'https://www.youtube.com/watch?v=W53-djMHqHI',
        label: 'Food ResQ Demo for Hack the Valley 8'
      }
    ],
    featured: false
  }
];
