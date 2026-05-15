export type ProjectCategory = 'AI & Data' | 'Product' | 'Design';

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
  /**
   * When true, render the image inside a constrained phone-frame container
   * (max ~320px wide, centered). For portrait mobile screenshots that would
   * otherwise dominate the magazine spread at native size.
   */
  phoneFrame?: boolean;
}

/** A single cited study in a literature review chapter */
export interface CitedStudy {
  /** APA-style author + year, e.g. "Bowman-Perrott et al. (2013)" */
  citation: string;
  /** The headline finding from the paper, in a sentence */
  finding: string;
  /** How the finding shaped the project's design decisions */
  application: string;
  /** Optional venue or journal name */
  venue?: string;
}

/** Literature review chapter — grounds the project in cited research */
export interface LiteratureReview {
  title?: string;
  intro?: string;
  studies: CitedStudy[];
}

/** A single usability result line — a metric + what it says */
export interface UsabilityResult {
  /** The percentage or numeric stat, e.g. "92.3%" or "100%" */
  metric: string;
  /** What that metric means, in a sentence */
  statement: string;
}

/** One task block from a usability study — task name, what was tested, the numbers */
export interface UsabilityTaskBlock {
  /** Display number, e.g. "01" or "Task 1" */
  number: string;
  /** Task name, e.g. "Search and request peer tutor session" */
  task: string;
  /** Optional one-line context for what participants were asked to do */
  context?: string;
  /** The measured results for this task */
  results: UsabilityResult[];
}

/** Usability results chapter — task-by-task quantitative results */
export interface UsabilityResults {
  title?: string;
  intro?: string;
  /** Sample size used across all tasks (e.g. "13 participants") */
  sampleSize?: string;
  tasks: UsabilityTaskBlock[];
}

/** A single reference entry for a references chapter */
export interface ReferenceEntry {
  /** Full APA citation as one string */
  citation: string;
  /** Optional DOI or article URL */
  url?: string;
}

/** References chapter — formal citation list for the cited research */
export interface ResearchReferences {
  title?: string;
  intro?: string;
  entries: ReferenceEntry[];
}

/** A single color token in a design system palette */
export interface ColorToken {
  /** Display name, e.g. "Matchify green" or "Canvas" */
  name: string;
  /** Hex value, e.g. "#1DB954" */
  hex: string;
  /** What the color is used for, e.g. "Brand + primary CTAs" */
  role: string;
}

/** A single entry in a typography ramp */
export interface TypeStyle {
  /** Display name, e.g. "Display", "Section heading", "Body" */
  name: string;
  /** Spec line, e.g. "Sans 700, 32 / 40, white" */
  spec: string;
  /** Optional sample text rendered in the style preview */
  example?: string;
  /** Optional Tailwind classes that approximate the type style for the live sample */
  exampleClass?: string;
}

/** A named component in the design system */
export interface DesignSystemComponent {
  /** Display name, e.g. "Profile ring" */
  name: string;
  /** What the component does or where it's used */
  purpose: string;
}

/** Design system chapter — palette, type ramp, named components */
export interface DesignSystem {
  /** Chapter title, defaults to "Design system" */
  title?: string;
  /** Optional intro paragraph above the system */
  intro?: string;
  /** Color tokens with hex + role */
  palette?: ColorToken[];
  /** Typography ramp */
  type?: TypeStyle[];
  /** Named reusable components in the system */
  components?: DesignSystemComponent[];
}

/** Embedded Figma file or prototype shown as an interactive iframe in the case study */
export interface FigmaEmbed {
  /** Full Figma file/proto URL — will be wrapped with figma.com/embed?embed_host=share&url=... */
  url: string;
  /** Optional chapter title override (defaults to "Try the prototype") */
  title?: string;
  /** Optional intro paragraph above the embed */
  intro?: string;
  /** Optional iframe height in pixels (defaults to 720). Min 400. */
  height?: number;
}

export interface Tool {
  name: string;
  purpose: string;
}

/** A product-strategy decision and the reasoning behind it */
export interface ProductDecision {
  /** The decision itself, as a short headline */
  decision: string;
  /** The case for that decision — typically 2–4 sentences */
  reasoning: string;
  /** Optional framework or model cited (e.g. "VRIN", "RBV", "Jobs-to-be-Done") */
  framework?: string;
}

/** A side-by-side comparison of an original UI surface and its redesign */
export interface BeforeAfterPair {
  /** Short label identifying the surface (e.g. "Homepage", "Mobile") */
  label: string;
  /** Optional caption explaining what changed between the two */
  note?: string;
  /** Public path to the "before" image */
  before: string;
  /** Public path to the "after" image */
  after: string;
}

export interface BeforeAfter {
  /** Optional override for the chapter heading (defaults to "Before / after") */
  title?: string;
  /** Optional intro paragraph above the comparison pairs */
  intro?: string;
  pairs: BeforeAfterPair[];
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
  /** Strategic product decisions with reasoning — magazine "the decisions" chapter */
  decisions?: ProductDecision[];
  /** Optional before / after gallery comparing original surfaces with the redesign */
  beforeAfter?: BeforeAfter;
  /** Optional embedded Figma file or prototype shown as an interactive iframe */
  figmaEmbed?: FigmaEmbed;
  /** Optional design system chapter — palette, type ramp, named components */
  designSystem?: DesignSystem;
  /** Optional literature review — cited studies that grounded the project */
  literatureReview?: LiteratureReview;
  /** Optional task-by-task quantitative results from a usability study */
  usabilityResults?: UsabilityResults;
  /** Optional formal references / citations list at the end of the page */
  references?: ResearchReferences;
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
  /** High-level topic tags shared with blog posts — enables cross-linking */
  tags?: string[];
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
