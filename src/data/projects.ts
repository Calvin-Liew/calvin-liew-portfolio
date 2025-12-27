import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'anatomy-of-fear',
    title: 'The Anatomy of Fear: Quantifying Dread in Horror Screenplays',
    category: 'Data Analysis',
    dates: 'Sep 2025 - Dec 2025',
    organization: 'University of Toronto',
    courseCode: 'CSC316H1 - Data Visualization and Advanced Programming',
    description: 'Built an interactive data visualization project analyzing 129 horror film screenplays to discover the "power law of horror" using AI and statistical analysis. Developed a hybrid GPT-4o-mini/GPT-4o parsing pipeline that processed 10,000 scenes to extract 11,204 horror signals, achieving 99.97% success rate while reducing costs by 96.5%. Created 8 custom D3.js visualizations including a real-time Fear Monitor with BPM animation, Sankey flow diagrams for signal analysis, Markov chain transition matrices for pacing patterns, and interactive bubble charts revealing that elite signals like "scream" and "blood" drive 68% of fear responses despite representing only 5% of detected elements. Demonstrated advanced skills in AI prompt engineering, parallel processing with Python, data pipeline architecture, and responsive visualization design.',
    skills: ['Large Language Models (LLM)', 'Generative AI', 'D3.js', 'Agile Methodologies', 'Python (Programming Language)', 'Data Science', 'Data Visualization'],
    links: [
      {
        type: 'live',
        url: 'https://calvin-liew.github.io/data-explorers-fear-analytics/',
        label: 'The Anatomy of Fear: How Horror Films Terrify Us'
      },
      {
        type: 'github',
        url: 'https://github.com/Calvin-Liew/data-explorers-fear-analytics',
        label: 'View Source Code on GitHub'
      }
    ],
    extendedContent: {
      overview: {
        title: 'The Power Law of Horror',
        content: 'We discovered horror follows a power law: while atmospheric elements like "dark" and "night" set mood, elite signals like "scream" and "blood" drive the actual scares. Analysis of 11,204 signal occurrences across 9,760 scenes from 129 horror films revealed that the top 10 signals account for 68% of all fear spikes, despite representing only 5% of our 207-term lexicon. Using a hybrid AI parser (GPT-4o-mini + GPT-4o fallback), we transformed raw screenplays into interactive D3.js visualizations that reveal how horror works. The central question: How can the "craft of horror" be quantified and represented visually?'
      },
      motivation: {
        title: 'Why Horror? Why Now?',
        content: 'Horror films are uniquely suited to data analysis because their effectiveness depends on mood, emotion, and suspense rather than narrative logic. Unlike other genres, horror success can be measured through quantifiable signals: darkness, screams, blood, and psychological dread. In an era where streaming platforms like Netflix and Prime Video make data-driven production decisions worth billions, understanding what actually scares audiences has never more valuable. Our visualizations contribute to both academic film studies and the practical question facing studios: what patterns separate horror classics from forgettable entries?'
      },
      datasets: [
        {
          name: 'scenes_detailed.csv',
          description: 'Master dataset (5.8MB) with full scene breakdowns: film_title, scene_index, heading, location, time_of_day, characters, dialogue/action statistics, 207 binary horror signal columns, and AI-generated emotion scores (tension, fear, sentiment). Used for cross-film scene-level analysis and correlation studies.',
          records: '9,760 scenes'
        },
        {
          name: 'horror_signals.csv',
          description: 'Signal detection results (4.0MB) tracking 207 horror terms organized into 6 families (Audio, Visual, Pace, Threat, Setting, Psyche). Schema: film_title, scene_index, signal_family, signal_term, frequency. Used for lexicon effectiveness analysis and validating the power law discovery.',
          records: '11,204 signals detected'
        },
        {
          name: 'emotional_analysis.csv',
          description: 'AI-generated emotional profiles (1.7MB) for every scene with normalized scores: tension (0-1), fear (0-1), sentiment (-1 to +1), plus scene summaries. 99.97% coverage across all scenes. Used for fear journey tracking, BPM calculations in the Vital Signs visualization, and identifying peak terror moments.',
          records: '9,760 assessments'
        },
        {
          name: 'dialogue_analysis.csv',
          description: 'Linguistic structure analysis (845KB) measuring dialogue density, action-to-dialogue ratios, question rates, and exclamation rates for pacing studies. Reveals the negative correlation (-0.34) between dialogue and tension that supports the "silence amplifies dread" hypothesis.',
          records: '129 films analyzed'
        },
        {
          name: 'imdb_179_horror.csv',
          description: 'IMDb metadata (306B) with standardized film titles (punctuation removed, lowercase conversion), ratings, votes, metascores, director, cast, genre, and duration. Film title alignment uses "standardized title + year" format. Used for the Rating Constellation visualization correlating horror metrics with audience reception.',
          records: '179 films'
        }
      ],
      methodology: {
        title: 'Hybrid AI Analysis Pipeline',
        steps: [
          {
            phase: 'Screenplay Acquisition & Quality Control',
            description: 'Sourced 129 horror screenplays from the Internet Movie Script Database (IMSDb). Applied deduplication using difflib similarity scoring to remove alternate versions and drafts. Performed scene boundary validation and content integrity checks to ensure proper screenplay formatting. Final corpus: 129 deduplicated, QC-validated screenplays ready for parsing.'
          },
          {
            phase: 'Heuristic Scene Segmentation',
            description: 'Developed multi-pattern regex detection for scene boundaries (INT./EXT., FADE IN/OUT, SCENE NUM, CONTINUED). Enforced maximum scene length (1,200 words) with smart continuation handling. Applied minimum length requirements to filter noise. Robust parsing handled different screenplay formatting conventions. Result: 9,760 scenes extracted with proper boundary detection.'
          },
          {
            phase: 'Hybrid AI Content Analysis',
            description: 'Deployed GPT-4o-mini as primary model (33x cheaper input, 25x cheaper output) with GPT-4o fallback for complex scenes. Achieved 99.97% success rate across all scenes with only 0.035% requiring fallback. Total processing cost: $2.28 (96.5% savings vs. GPT-4o-only). Processing time: ~2.6 hours for full corpus. Used parallel processing via ThreadPoolExecutor (3 workers) with chunk-based processing (4 scenes per API call) and retry mechanisms with exponential backoff.'
          },
          {
            phase: 'Structured Data Extraction',
            description: 'Engineered custom prompts for consistent structured JSON output including scene headings, locations, time of day, characters, dialogue/action statistics, horror signal counts from 207-term lexicon, and emotional scores (tension 0-1, fear 0-1, sentiment -1 to +1). Applied JSON validation against predefined schema with automatic fallback data generation for rare parsing failures.'
          },
          {
            phase: 'Horror Signal Detection',
            description: 'Applied fixed lexicon of 207 horror-related terms organized into 6 signal families: Audio (scream, silence, music, whisper), Visual (blood, shadow, dark, mirror), Pace (sudden, rapid, chase, running), Threat (knife, danger, monster, killer), Setting (night, isolated, abandoned, forest), and Psyche (dread, trapped, panic, paranoid). Used case-insensitive matching with variation recognition and context-aware counting to avoid false positives. Result: 11,204 horror signals detected across all scenes.'
          },
          {
            phase: 'Emotional Scoring & Normalization',
            description: 'Generated AI-estimated scores for tension (slow-burning suspense), fear (sudden shocks), and sentiment (emotional valence) on normalized 0-1 scales. Applied cross-validation with manual scene analysis samples, statistical validation of score distributions, and outlier detection for unreasonably high/low scores to ensure data quality.'
          },
          {
            phase: 'Data Validation & Quality Assurance',
            description: 'Performed cross-film consistency checks for scene numbering, signal frequency validation against raw text, and manual spot-checks on random scene samples. Implemented progress tracking with success rate monitoring (99.97% achieved). Final missing data rate: 0.035% (minimal fallback needed), demonstrating pipeline robustness.'
          },
          {
            phase: 'IMDb Metadata Integration',
            description: 'Merged screenplay data with IMDb ratings, votes, reviews, cast, and duration. Standardized film titles by removing punctuation, converting to lowercase, and stripping subtitles. Aligned datasets using "standardized title + year" format. Conducted correlation analysis between horror metrics and audience reception for the Rating Constellation visualization.'
          }
        ]
      },
      keyFindings: [
        {
          title: 'The Power Law: Elite Signals Drive Fear',
          description: 'Analysis of 11,204 signal occurrences revealed a stark hierarchy: the top 10 signals (scream, blood, kill, knife, death, shadow, fear, dark, silent, night) account for 68% of all fear spikes above 0.70, despite representing only 5% of the 207-term lexicon. Elite signals like "scream" appear in just 9% of scenes but generate an average fear boost of +0.37 when present. In contrast, atmospheric terms like "dark" appear in 38% of scenes but add only +0.18 fear. Effective horror strategically deploys rare, powerful triggers at climactic moments rather than scattering dozens of weak signals.'
        },
        {
          title: 'Tension Exceeds Fear: Sustained Unease Over Constant Terror',
          description: 'Across all 9,760 scenes, average tension (0.52) consistently exceeded average fear (0.41). 73% of scenes showed tension > fear, with only 18% showing fear > tension, and 9% balanced. This pattern suggests horror works by maintaining sustained unease (tension) punctuated by shock moments (fear spikes), rather than delivering constant terror. The best films alternate calm and chaos: valleys make peaks feel higher, sustaining audience engagement better than nonstop intensity.'
        },
        {
          title: 'Silence Amplifies Dread: The Dialogue-Tension Correlation',
          description: 'Scenes with dialogue ratios < 0.30 (action-heavy/silent) showed 23% higher average tension scores (0.58) compared to dialogue-heavy scenes > 0.70 (0.47). The correlation coefficient between dialogue density and tension was -0.34, providing quantitative support for the theory that atmospheric silence amplifies dread. Horror effectiveness often depends on what characters don\'t say—letting sounds, visuals, and pauses do the work.'
        },
        {
          title: 'Fear Peak Architecture: Strategic Timing Across Runtime',
          description: 'Analyzing fear spike timing across 129 films revealed clustering patterns: 12% of spikes occur in the first quarter (setup), 31% in the second quarter (rising action), 28% in the third quarter (confrontation), and 29% in the final quarter (climax). Most films reserve their highest fear peak (> 0.80) for the 75-90% runtime window. Horror follows predictable pacing structures, with tension building gradually before explosive peaks near the end.'
        },
        {
          title: 'Signal Effectiveness Rankings: What Actually Works',
          description: 'Quantified impact scores for top signals: Scream (+0.37 fear, +0.31 tension) | Kill (+0.34 fear, +0.26 tension) | Blood (+0.29 fear, +0.28 tension) | Knife (+0.28 fear, +0.27 tension) | Death (+0.23 fear, +0.24 tension). These measurements reveal which specific words and moments generate the strongest emotional responses, providing actionable insights for screenwriters and directors about where to deploy their most powerful horror elements.'
        }
      ],
      visualizations: [
        {
          title: 'Scene 1: Signal Intake (Sankey Flow Diagram)',
          description: 'Custom Sankey implementation showing how signal families (Audio, Visual, Pace, Threat, Setting, Psyche) branch into individual terms. Stream thickness represents frequency across all films; node brightness shows fear impact. Interactive threshold slider filters signals by frequency.',
          insight: 'Visualizes the power law: atmospheric signals like "night" appear frequently but generate low fear per occurrence, while elite signals like "scream" are rare but create strong fear spikes'
        },
        {
          title: 'Scene 2: Vital Signs Monitor (Fear Journey with BPM)',
          description: 'Real-time BPM counter converts fear intensity to simulated heartbeat (pulse rate). Skull markers highlight peak terror moments (fear > 0.70). Film comparison dropdown allows viewing individual films or average patterns. Line chart tracks fear evolution scene by scene.',
          insight: 'Strategic pacing beats constant terror—most films hover at moderate fear levels (0.3-0.5) with occasional spikes, especially near the end. Effective horror alternates calm and chaos'
        },
        {
          title: 'Scene 3: The Graveyard (Spike Timeline)',
          description: 'Multi-film timeline with tombstone markers for fear spikes (> 0.40) and lantern markers for tension spikes (> 0.40). Dynamic film addition/removal controls and fear vs. tension toggle. Each film gets its own row showing when terror hits.',
          insight: 'Best scares combine tension buildup + fear spike: lanterns surrounding or preceding tombstones create maximum impact. Jump scares alone (tombstones without lanterns) fade fast'
        },
        {
          title: 'Scene 4: Fear Transition Matrix (Markov Chain)',
          description: '3x3 probability matrix showing transitions between Calm, Unease, and Panic states. Cell darkness indicates transition likelihood. Diagonal shows staying in same state; off-diagonal shows state changes. Reveals the "grammar" of horror pacing.',
          insight: 'Horror prefers gradual climbs (Calm→Unease→Panic) over sudden jumps. Once scenes reach Panic, they tend to stay there. This pattern of careful ramp-up followed by sustained intensity creates more effective scares'
        },
        {
          title: 'Scene 5: Signal Autopsy (Bubble Chart)',
          description: 'Interactive bubble chart where position shows impact (fear/tension delta when signal present vs. absent), size shows frequency, and color shows shock vs. tension profile (red = shock-heavy, blue = tension-heavy). Click bubbles for detailed signal dossiers.',
          insight: 'Elite signals are rare but potent: "scream" appears in 9% of scenes but adds +0.37 fear. Common atmospheric signals like "dark" appear in 38% but add only +0.18. Strategic deployment wins over scattered usage'
        },
        {
          title: 'Scene 6: Impact Dripline (Ranked Bar Chart)',
          description: 'Ranked visualization sorting all signals by combined fear + tension impact. Sharp drop-off curve reveals the power law structure. Dropdown allows sorting by impact or alphabetically.',
          insight: 'Top 10 signals drive majority of fear despite being only 5% of the lexicon. The steep curve shows horror follows a power law, not a normal distribution'
        },
        {
          title: 'Scene 7: Rating Constellation (Scatter Plot)',
          description: 'X-axis shows horror impact score (signal effectiveness, fear transitions, peak fear); Y-axis shows IMDb rating (0-10). Point size indicates higher ratings. Correlation line and filtering by year/rating range. Identifies outliers and patterns.',
          insight: 'Technical horror craftsmanship doesn\'t guarantee audience acclaim (correlation: -0.245). Many highly rated films succeed despite low technical scores, proving story and character matter as much as craft'
        },
        {
          title: 'Scene 8: Horror Recipe Cards (Radar Chart)',
          description: '6-axis radar showing each film\'s unique balance across signal families (Audio, Visual, Pace, Threat, Setting, Psyche). User preference sliders allow setting ideal horror mix, then system recommends matching films. Reveals specialist vs. generalist approaches.',
          insight: 'No single recipe wins—diversity thrives. Supernatural films lean on Psyche/Setting; Slashers lean on Pace/Threat. Spiky shapes indicate specialist approach, round shapes indicate generalist. Both can succeed'
        }
      ],
      tools: [
        { name: 'D3.js v7', purpose: 'Built custom interactive visualizations including Sankey diagrams for signal flow analysis, real-time BPM animations for the fear monitor, and responsive charts that work seamlessly across desktop and mobile devices.' },
        { name: 'Hybrid AI Parser (GPT-4o-mini + GPT-4o)', purpose: 'Designed cost-efficient AI pipeline using GPT-4o-mini as primary parser (99.97% success rate) with GPT-4o fallback for complex scenes. Achieved $2.28 total cost (96.5% savings) and processed 129 films in 2.6 hours using parallel processing.' },
        { name: 'Python Data Pipeline', purpose: 'Built end-to-end data processing pipeline with Pandas for data aggregation, NumPy for statistical analysis, and custom validation scripts. Implemented screenplay deduplication, scene boundary detection, and quality monitoring throughout the pipeline.' },
        { name: 'Observable Framework', purpose: 'Created interactive scrollytelling narrative with 8 distinct visualization scenes. Implemented client-side data caching for performance optimization and ensured responsive design across all device sizes for accessible data exploration.' },
        { name: 'Vega-Lite', purpose: 'Prototyped declarative visualization specifications for rapid iteration and testing. Converted successful designs to production-ready D3.js implementations, including radar charts for horror recipe analysis and scatter plots for rating correlations.' },
        { name: 'ColorBrewer & Chroma.js', purpose: 'Applied perceptually uniform color scales for data encoding (red for shock signals, blue for tension). Ensured all visualizations meet accessibility standards with colorblind-safe palettes while maintaining the cosmic purple/cyan brand theme.' }
      ],
      impact: {
        title: 'Real-World Applications',
        content: 'For film students and researchers: use the 8 interactive scenes to study pacing strategies of iconic films, compare horror recipes across decades (1980s slashers vs. 2010s psychological horror), and quantify narrative patterns previously described only qualitatively.\n\nFor screenwriters and directors: leverage the power law by using atmospheric signals to maintain baseline tension, then deploy elite signals at climactic moments; study the fear transition matrix to understand effective pacing (gradual climbs vs. sudden jumps); use the recipe radar to position your film within or against genre conventions.\n\nFor streaming platforms and studios: correlate horror metrics with audience ratings to predict reception, identify underserved horror recipes (gaps in the radar chart patterns), and enable data-driven marketing by highlighting films with unique signal profiles.\n\nAcademic contribution: demonstrates AI-powered screenplay analysis at scale (129 films, 10K scenes), provides reusable pipeline (prompt templates, lexicon, emotion scoring framework), and shows how interactive D3.js visualizations transform text data into explorable insights.'
      }
    },
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
