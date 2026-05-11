export type ProjectCategory = 'Product Management' | 'UI/UX Design' | 'Data Analysis' | 'Development';

export type LinkType = 'live' | 'github' | 'figma' | 'demo' | 'devpost';

export interface ProjectLink {
  type: LinkType;
  url: string;
  label?: string;
}

export interface CaseStudy {
  fileName: string;
  title?: string;
  fileSize?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  contact: string;
}

export interface ContentSection {
  title: string;
  content: string;
}

export interface Dataset {
  name: string;
  description: string;
  records: string;
}

export interface MethodologyStep {
  phase: string;
  description: string;
}

export interface Methodology {
  title: string;
  steps: MethodologyStep[];
}

export interface KeyFinding {
  title: string;
  description: string;
  /** Optional headline stat shown big and terracotta above the title */
  stat?: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Visualization {
  title: string;
  description: string;
  insight: string;
  image?: string;
  /**
   * How the image should fit inside its container.
   * - 'cover' (default): fills the box, anchored top — best for wide charts/timelines
   * - 'contain': whole image visible with letterbox — best for scatter plots and radar charts
   */
  imageFit?: 'cover' | 'contain';
}

export interface Tool {
  name: string;
  purpose: string;
}

export interface PipelineStage {
  label: string;
  detail?: string;
}

export interface PythonSourceFile {
  name: string;
  purpose: string;
}

export interface PythonPipeline {
  /** Vertical flow diagram stages, top → bottom */
  flow?: PipelineStage[];
  /** The key Python files in the project */
  sourceFiles?: PythonSourceFile[];
  /** A sample JSON object the AI returns — shown as a code block */
  sampleJson?: string;
  /** Optional caption above the sample JSON */
  sampleJsonCaption?: string;
}

export interface ExtendedContent {
  team?: TeamMember[];
  overview?: ContentSection;
  motivation?: ContentSection;
  datasets?: Dataset[];
  methodology?: Methodology;
  /** Visual Python pipeline section — diagram + source files + sample output */
  pythonPipeline?: PythonPipeline;
  keyFindings?: KeyFinding[];
  visualizations?: Visualization[];
  features?: Visualization[];
  tools?: Tool[];
  impact?: ContentSection;
  /** Honest caveats / known limitations — shown as bullets near the end */
  limitations?: {
    title?: string;
    items: string[];
  };
  /** Big-number stats shown as a strip near the top */
  stats?: ProjectStat[];
  /** Standout magazine-style pull quote rendered between sections */
  pullQuote?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  dates: string;
  organization: string;
  courseCode?: string;
  description: string;
  skills: string[];
  links?: ProjectLink[];
  image?: string;
  featured?: boolean;
  caseStudy?: CaseStudy;
  extendedContent?: ExtendedContent;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  type?: string;
  description: string[];
  skills: string[];
  logo?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  dates: string;
  gpa?: string;
  honors?: string[];
  focusAreas?: string[];
  coursework?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  readTime?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface AboutData {
  name: string;
  title: string;
  tagline: string;
  introduction: string;
  email: string;
  socialLinks: SocialLink[];
  skills: {
    category: string;
    items: string[];
  }[];
}
