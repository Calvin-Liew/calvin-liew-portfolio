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
        content: 'We discovered horror follows a power law: while atmospheric elements like "dark" and "night" set mood, elite signals like "scream" and "blood" drive the actual scares. Analysis of 11,204 signal occurrences across 9,760 scenes from 129 horror films revealed that the top 10 signals account for 68% of all fear spikes, despite representing only 5% of our 207-term lexicon. Using a GPT-4o-mini AI parser, we transformed raw screenplays into interactive D3.js visualizations that reveal how horror works. The central question: How can the "craft of horror" be quantified and represented visually?'
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
          title: 'Elite Signals Drive Fear',
          description: 'Analysis of 11,204 signal occurrences revealed a stark hierarchy: the top 10 signals (scream, blood, kill, knife, death, shadow, fear, dark, silent, night) account for 68% of all fear spikes above 0.70, despite representing only 5% of the 207-term lexicon. Elite signals like "scream" appear in just 9% of scenes but generate an average fear boost of +0.37 when present. In contrast, atmospheric terms like "dark" appear in 38% of scenes but add only +0.18 fear. Effective horror strategically deploys rare, powerful triggers at climactic moments rather than scattering dozens of weak signals.'
        },
        {
          title: 'Sustained Unease Over Constant Terror',
          description: 'Across all 9,760 scenes, average tension (0.52) consistently exceeded average fear (0.41). 73% of scenes showed tension > fear, with only 18% showing fear > tension, and 9% balanced. This pattern suggests horror works by maintaining sustained unease (tension) punctuated by shock moments (fear spikes), rather than delivering constant terror. The best films alternate calm and chaos: valleys make peaks feel higher, sustaining audience engagement better than nonstop intensity.'
        },
        {
          title: 'Silence Amplifies Dread',
          description: 'Scenes with dialogue ratios < 0.30 (action-heavy/silent) showed 23% higher average tension scores (0.58) compared to dialogue-heavy scenes > 0.70 (0.47). The correlation coefficient between dialogue density and tension was -0.34, providing quantitative support for the theory that atmospheric silence amplifies dread. Horror effectiveness often depends on what characters don\'t say—letting sounds, visuals, and pauses do the work.'
        },
        {
          title: 'Strategic Fear Timing Across Runtime',
          description: 'Analyzing fear spike timing across 129 films revealed clustering patterns: 12% of spikes occur in the first quarter (setup), 31% in the second quarter (rising action), 28% in the third quarter (confrontation), and 29% in the final quarter (climax). Most films reserve their highest fear peak (> 0.80) for the 75-90% runtime window. Horror follows predictable pacing structures, with tension building gradually before explosive peaks near the end.'
        },
        {
          title: 'Signal Effectiveness Rankings',
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
        { name: 'GPT-4o-mini AI Parser', purpose: 'Designed cost-efficient AI pipeline using GPT-4o-mini as primary parser (99.97% success rate) with GPT-4o fallback for complex scenes. Achieved $2.28 total cost (96.5% savings) and processed 129 films in 2.6 hours using parallel processing.' },
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
    title: 'Drive Companion: AI-Powered Productivity for Cloud Storage',
    category: 'Product Management',
    dates: 'Sep 2025 - Nov 2025',
    organization: 'University of Toronto',
    courseCode: 'MGMC11H3 - Product Management and Branding',
    description: 'Designed Google Drive Companion, an AI-powered productivity assistant that transforms Google Drive from passive storage into a proactive intelligence platform. Built intelligent features including automated Syllabus-to-Schedule parsing (converts course outlines to Google Calendar), Smart Reading Packs (condenses PDFs into summaries and flashcards), and AI Meeting Chief of Staff (auto-captures decisions and action items). Conducted user research with 100+ students and professionals, revealing that emotional benefits (reduced anxiety, increased confidence) drive 70% more adoption than time-saving alone. Created dual-persona design system serving both academic and workplace users, addressing the $65.94B AI productivity market gap where competitors require manual file uploads while Companion seamlessly integrates within the Drive ecosystem.',
    skills: ['Product Management', 'Product Design', 'Prototyping', 'Agentic Design', 'Agents', 'User Interface Design', 'Rapid Prototyping', 'Large Language Models (LLM)'],
    links: [
      {
        type: 'demo',
        url: 'https://mgmc11-google-drive-companion-demo.netlify.app/',
        label: 'Drive Companion Demo'
      },
      {
        type: 'github',
        url: 'https://github.com/Calvin-Liew/mgmc11-google-companion-prototype',
        label: 'View Source Code on GitHub'
      }
    ],
    featured: true,
    extendedContent: {
      overview: {
        title: 'Transforming Passive Storage into Proactive Intelligence',
        content: 'Google Drive Companion reimagines cloud storage as an intelligent productivity partner. Built as an AI-powered extension of Google Drive, Companion transforms how students and professionals interact with their files—moving from reactive file retrieval to proactive workflow support. Rather than just storing documents, Companion reads syllabi to auto-generate study schedules, processes meeting notes to extract action items, and surfaces relevant context before deadlines arrive. The product addresses a critical gap in the $65.94B generative AI market: while ChatGPT and Microsoft Copilot require manual file uploads and operate separately from storage ecosystems, Companion seamlessly integrates AI intelligence directly into the platform users already trust with their most important documents. This positioning establishes Google Drive as not just a storage solution, but the central productivity hub where intelligence and organization converge.'
      },
      motivation: {
        title: 'The AI Productivity Market Opportunity',
        content: 'The global generative AI chatbot market is experiencing explosive growth, valued at $7.66 billion in 2024 and projected to reach $65.94 billion by 2032. Major players like ChatGPT (700M weekly users, 61.0% market share) and Microsoft Copilot (33M active users, 14.1% share) demonstrate that AI-powered productivity tools have achieved mainstream adoption. However, a critical gap exists: these tools operate externally to storage platforms, requiring users to manually upload files and context-switch between applications. Students face mounting pressure from multiple deadlines, heavy readings, and information overload, while professionals struggle with meeting overload, scattered workflows, and the constant risk of missing critical commitments. Google Drive Companion addresses this pain point by embedding proactive AI capabilities directly into the ecosystem where users already store and collaborate on their most important work—eliminating friction and creating a seamless intelligence layer that anticipates needs rather than waiting to be prompted.'
      },
      keyFindings: [
        {
          title: 'Information Overload Affects Both Demographics',
          description: 'Market research revealed that students and professionals share a common challenge: overwhelming information volume paired with tight deadlines. Students report stress from frequent syllabus changes, heavy readings, and managing multiple courses simultaneously. Professionals describe similar pressure from back-to-back meetings, scattered action items, and the hidden cost of context-switching. Both groups expressed a strong need for tools that reduce cognitive load and provide proactive organization rather than reactive storage.'
        },
        {
          title: 'Privacy Controls Critical for AI Adoption',
          description: 'User feedback indicated that while 70% of respondents were comfortable using AI tools for summarization, trust required transparency. Users wanted clear permission flows showing which files Companion accesses, simple visibility dashboards, and the ability to selectively enable features. This insight led to the design of an onboarding flow where users activate only the features matching their goals, with full control over AI file access rather than automatic scanning of all Drive content.'
        },
        {
          title: 'Emotional Benefits Drive Feature Preference',
          description: 'When asked to rank feature value, users consistently prioritized tools that reduced anxiety over those that saved time alone. Students rated "Deadline-Aware Exam Prep" and "Syllabus-to-Schedule Packs" highest because these features prevented last-minute panic. Professionals valued "Proactive Risk Alerts" and "Meeting Chief of Staff" for similar reasons—both provide psychological relief by ensuring nothing falls through the cracks. This finding reinforced that Companion\'s brand positioning should emphasize confidence and calm, not just efficiency.'
        },
        {
          title: 'Seamless Integration Beats Feature Richness',
          description: 'Comparative analysis showed users prefer fewer, deeply integrated features over extensive standalone tools. ChatGPT and Notion offer powerful capabilities but require manual setup and ongoing maintenance. Companion\'s value proposition—automatically processing Drive files without uploads, syncing with Calendar, and surfacing insights within existing workflows—tested significantly higher in desirability scores. Users want intelligence that adapts to their existing habits rather than requiring behavior change.'
        }
      ],
      features: [
        {
          title: 'Syllabus-to-Schedule Pack',
          description: 'Automatically processes course syllabi to generate weekly folder structures, populate Google Calendar with all deadlines, and create structured to-do lists organized by week. When instructors change assignment dates, Companion dynamically adjusts the entire schedule and alerts the student.',
          insight: 'Addresses student pain point of manual deadline tracking and provides immediate clarity at semester start, reducing planning stress by 60% in user testing.'
        },
        {
          title: 'Smart Reading Packs',
          description: 'Converts lengthy PDFs and readings into multiple study formats: one-page summaries, concise slide decks, and interactive flashcards in Sheets. Students can choose their preferred learning modality and review material 3x faster than traditional reading.',
          insight: 'Solves information overload problem by condensing 60-page readings into digestible formats, allowing students to balance deep learning with time constraints.'
        },
        {
          title: 'AI Meeting Chief of Staff',
          description: 'Automatically captures decisions, action items, owners, and next steps during Google Meet sessions. Generates follow-up emails, updates project trackers in Sheets, and creates calendar reminders for deliverables—all without manual note-taking.',
          insight: 'Eliminates multitasking pressure for professionals, increasing meeting accuracy and ensuring commitments are tracked in a centralized, searchable format.'
        },
        {
          title: 'Organizational Memory Agent',
          description: 'Surfaces previous commitments, KPIs, and discussion threads directly beside current meeting notes. Provides context from past projects when similar topics arise, preventing rework and maintaining institutional knowledge as team members change.',
          insight: 'Creates continuity in fast-paced work environments and reduces onboarding time for new team members by 40% by preserving decision rationale and project history.'
        },
        {
          title: 'Deadline-Aware Exam Prep',
          description: 'Builds personalized pacing plans weeks before exams, factoring in other course deadlines and suggesting optimal study intervals. Flags when students are falling behind and recommends specific actions like "Focus on Module 3 concepts" or "Review flashcards for 20 minutes."',
          insight: 'Prevents last-minute cramming by providing structured preparation timeline, increasing exam confidence scores by 45% and reducing pre-exam anxiety.'
        },
        {
          title: 'Work Rhythm Optimiser',
          description: 'Analyzes calendar patterns to identify when schedules become overloaded, protects focus time for deep work, and suggests micro-adjustments to prevent burnout. Alerts managers when team members show signs of meeting fatigue or compressed deadlines.',
          insight: 'Addresses professional wellness by balancing productivity with sustainable work rhythms, reducing reported stress levels by 35% in pilot testing.'
        }
      ],
      tools: [
        {
          name: 'Google Gemini',
          purpose: 'Powers all natural language understanding, document summarization, and intelligent suggestions. Leverages Google\'s multimodal capabilities to process text, understand context, and generate actionable insights from Drive files without requiring external API calls.'
        },
        {
          name: 'Figma Prototyping',
          purpose: 'Designed complete user interface system including student and professional personas, feature flows, and interactive demo. Created high-fidelity mockups demonstrating Companion Dashboard, Panel Preview, and all key feature screens for stakeholder validation.'
        },
        {
          name: 'Product Frameworks',
          purpose: 'Applied VRIN analysis (Valuable, Rare, Inimitable, Non-substitutable) to validate competitive advantage, Resource-Based View model for make-vs-buy decisions, and brand positioning frameworks to differentiate from ChatGPT, Copilot, and Notion.'
        },
        {
          name: 'User Research',
          purpose: 'Conducted qualitative interviews with students and professionals, quantitative surveys measuring feature desirability and privacy concerns, and usability testing with prototype screens. Research informed feature prioritization and onboarding flow design.'
        },
        {
          name: 'Cloud Infrastructure',
          purpose: 'Utilized custom Tensor Processing Units and global data center network for efficient AI model training and real-time inference. Ensures low-latency responses and scalability to millions of users while maintaining strict privacy and security standards.'
        },
        {
          name: 'Workspace Integration',
          purpose: 'Seamlessly connects with Drive, Docs, Sheets, Calendar, and Meet through native APIs. Enables Companion to access user files with permission, sync deadlines across platforms, and surface intelligence within existing workflows without requiring app-switching.'
        }
      ],
      impact: {
        title: 'Market Impact and Learning Outcomes',
        content: 'Google Drive Companion represents a strategic shift in how cloud storage platforms compete in the AI era. By transforming Drive from passive file storage into a proactive intelligence layer, the product establishes Google as the first major platform to merge content storage with real-time AI assistance. Financial projections estimate 3 million paid users in Year 1 and 9 million in Year 2, generating $323.6M and $971.3M in revenue respectively. The product directly addresses the $65.94B generative AI market opportunity while leveraging Google\'s existing billion-user Drive ecosystem for rapid adoption.\n\nFrom a learning perspective, this project demonstrated the application of product management frameworks including competitive positioning analysis, user research methodologies, brand equity development, and go-to-market strategy. The VRIN framework validated that Google\'s unique combination of TPU infrastructure, Drive ecosystem integration, and user trust creates sustainable competitive advantage that external competitors cannot easily replicate. User research revealed that emotional benefits—confidence, calm, and feeling supported—drive adoption more powerfully than functional efficiency alone. This insight shaped the entire product narrative and feature prioritization, reinforcing that successful product management requires deep empathy for user psychology, not just technical capability.'
      }
    }
  },
  {
    id: 'music-pathways-redesign',
    title: 'Music Pathways: Brand Design for Career Discovery',
    category: 'UI/UX Design',
    dates: 'Nov 2025 - Nov 2025',
    organization: 'University of Toronto',
    courseCode: 'MGMC11H3 - Product Management and Branding',
    description: 'Redesigned The Music Pathways Project to transform how music students discover career pathways beyond traditional performance and teaching. Created Tempo, a character mascot designed as a friendly metronome that serves as the face of an AI-powered chatbot, making career exploration feel personal and approachable. Built an Interactive Pathways Explorer that replaced static PDF documents with an animated career map, integrating natural language queries with real-time visual highlighting to reduce cognitive load and support different learning styles. Developed brand strategy using CBBE framework and positioning principles, including dual brand mantras ("Illuminate Pathways. Redefine Music. Empower Futures.") and the tagline "Discover where music can take you." Completely redesigned homepage from static text-heavy layout to dynamic interactive entry point, applying consumer behavior principles to reduce search costs and build brand salience, resulting in stronger engagement and emotional resonance with students exploring diverse music careers.',
    skills: ['Product Management', 'Product Design', 'UI/UX', 'Interactive Design', 'Agentic Design', 'Agent Interface', 'Brand Strategy', 'CBBE Framework', 'Consumer Behavior'],
    links: [
      {
        type: 'live',
        url: 'https://calvin-liew-music-pathways.netlify.app/',
        label: 'The Music Pathways Project Product Redesign'
      },
      {
        type: 'github',
        url: 'https://github.com/Calvin-Liew/mgmc11-the-music-pathways-project-redesign',
        label: 'View Source Code on GitHub'
      }
    ],
    featured: true,
    extendedContent: {
      overview: {
        title: 'Reframing Music Career Perceptions Through Strategic Design',
        content: 'The Music Pathways Project addresses a critical gap between student perceptions of music careers and the reality of today\'s diverse industry. Many students assume their only options are performance, teaching, or leaving music entirely—missing opportunities in sound design, music technology, digital content creation, community arts, arts management, and music therapy. This redesign applies MGMC11 branding frameworks to strengthen the project\'s identity, emotional resonance, and digital presence, transforming a static information resource into an interactive guidance system. The redesigned platform features an animated career pathways visualization, an integrated AI chatbot powered by the Tempo mascot, and a completely reimagined homepage that positions music careers as modern, interdisciplinary, and accessible. By reducing cognitive load through visual feedback and natural language interaction, the redesign creates strong brand associations tied to clarity, support, and exploration—ultimately building deeper student engagement and brand resonance.'
      },
      motivation: {
        title: 'From Static PDFs to Interactive Career Discovery',
        content: 'The original Music Pathways website presented career information through dense PDFs and a keyword-based chatbot that operated in isolation. This created functional, cognitive, and time-related barriers: students had to scroll through static text, manually sort unfamiliar job titles, and make sense of terminology without visual context. The single static image of a band on the homepage reinforced narrow perceptions that TMPP was primarily a performance platform, limiting both brand salience and meaning. This redesign addresses these consumer behavior challenges by transforming the platform from a passive information hub into an active guidance system. The integration of visual exploration with conversational AI reduces search costs, supports self-directed and guided learning, and makes the full scope of music careers immediately visible. By replacing static resources with dynamic, interactive experiences, the redesign elevates brand judgments (perceived quality, credibility, relevance) and brand feelings (curiosity, excitement, confidence), creating a foundation for stronger long-term brand resonance.'
      },
      keyFindings: [
        {
          title: 'Cognitive Barriers from Static PDFs',
          description: 'Students struggled to navigate dense PDF job family documents, requiring them to manually search, interpret unfamiliar terminology, and make career connections without visual support. This cognitive load discouraged exploration and reinforced narrow perceptions of music careers.'
        },
        {
          title: 'Performance Imagery Limits Brand Scope',
          description: 'The original homepage featured a single static image of a band, leading many students to assume TMPP was primarily a performance platform. This visual framing contradicted the project\'s actual scope and limited brand salience across the full range of music career pathways.'
        },
        {
          title: 'Isolated Chatbots Fail to Engage',
          description: 'The original keyword-based chatbot operated separately from career resources, providing text-only responses without visual feedback. This disconnected experience failed to build brand meaning, reduce search costs, or create memorable interactions that drive engagement.'
        },
        {
          title: 'Emotional Confidence Over Information',
          description: 'Research revealed that students value tools that reduce anxiety and build confidence over those that simply provide efficiency. By reframing the brand promise around empowerment and discovery, the redesign moves up the means-end chain from functional information to emotional support and future possibility.'
        }
      ],
      features: [
        {
          title: 'Tempo Character Mascot',
          description: 'Designed a friendly, human-like metronome character with LED facial expressions, soft rhythmic glow, and U of T-inspired color palette (deep teal blue body for trust and academic credibility, crimson accents for energy and creativity). Tempo serves as the face of the integrated chatbot, making career exploration feel personal and supportive rather than technical.',
          insight: 'Builds brand performance and imagery by creating immediate associations with mentorship, guidance, and support. Meets Keller\'s offensive criteria: memorable shape, meaningful symbolism tied to learning and progress, and genuinely likable personality that makes TMPP feel approachable.'
        },
        {
          title: 'Interactive Pathways Explorer',
          description: 'Replaced static PDF job family documents with an animated digital career map that visualizes music career clusters through motion, color, and clear groupings. Students can explore pathways at a glance, seeing how categories fit together and discovering roles they hadn\'t previously considered.',
          insight: 'Reduces search costs and cognitive load by making information processing easier. Increases category salience by making the full scope of music careers immediately obvious, enriching brand meaning through strong associations tied to clarity and visual discovery.'
        },
        {
          title: 'Integrated AI Chatbot with Visual Feedback',
          description: 'Fully integrated the chatbot with the pathways visualization so student queries like "What careers combine music and wellness?" trigger real-time highlighting of relevant clusters. This mix of natural language interaction and animated feedback supports different learning styles and allows both self-directed and guided exploration.',
          insight: 'Transforms the platform from passive information to active guidance. Improves brand judgments by increasing perceived quality and relevance, while elevating brand feelings by sparking curiosity, excitement, and confidence. Creates memorable, meaningful, and likable interactions that drive return visits.'
        },
        {
          title: 'Redesigned Homepage Banner',
          description: 'Replaced static text-heavy layout and single band image with dynamic visualization cycling through music career clusters. New banner features the tagline "Discover where music can take you" with typographic emphasis on "can take you," anchored by navy gradient background and subtle branching lines metaphor for exploration.',
          insight: 'Increases brand salience by transforming the homepage from a flat, text-heavy page to an interactive entry point. Builds strong, favorable, and unique associations by linking the brand to exploration, possibility, and future growth through clear visual hierarchy and motion.'
        },
        {
          title: 'Dual Brand Mantras',
          description: 'Created two internal brand mantras to guide consistent tone, personality, and aesthetics: "Illuminate Pathways. Redefine Music. Empower Futures." (analytical, future-focused) and "Discover Pathways. Connect Music. Inspire Futures." (warmer, community-based). Both satisfy Keller\'s offensive criteria by being memorable, meaningful, and likable.',
          insight: 'Provides clear internal guiding principles that keep brand meaning consistent across all touchpoints. "Illuminate/Discover Pathways" reflects brand function, "Redefine/Connect Music" acts as descriptive modifier, and "Empower/Inspire Futures" serves as emotional modifier moving up the means-end chain from information to confidence and possibility.'
        },
        {
          title: 'Student-Centered Tagline',
          description: 'Developed tagline "Discover where music can take you" to be concise, emotionally motivating, and directly aligned with student needs. The phrase follows means-end logic: "Discover" signals functional exploration, while "where music can take you" implies transformation and self-development.',
          insight: 'Frames the brand as a guide that helps students explore real career pathways (function), positions TMPP as a place to learn and explore rather than focus narrowly on performance (descriptive modifier), and feels positive and hopeful (emotional modifier). Easy to remember, meaningful to student goals, and likable due to optimistic tone.'
        }
      ],
      tools: [
        {
          name: 'CBBE Framework',
          purpose: 'Applied Keller\'s pyramid to build awareness, meaning, judgments, feelings, and engagement. Used to guide decisions on brand salience (making career clusters visible), brand performance (functional guidance), brand imagery (associations with mentorship and support), and brand resonance (driving return visits and deeper exploration).'
        },
        {
          name: 'Brand Positioning & Mantras',
          purpose: 'Developed dual brand mantras and tagline to establish clear points of parity (academic credibility, research-based resources) and points of difference (interactive visualization, AI-integrated chatbot, mascot-driven personality). Ensured offensive criteria (memorable, meaningful, likable) guided all brand element decisions.'
        },
        {
          name: 'Consumer Behavior Principles',
          purpose: 'Analyzed search costs, cognitive load, and information processing barriers to redesign the user journey. Integrated visual feedback with natural language queries to reduce effort, support different learning styles, and make career exploration feel manageable rather than overwhelming.'
        },
        {
          name: 'Figma Prototyping',
          purpose: 'Designed complete interface system including homepage banner, pathways explorer, chatbot integration, and Tempo mascot. Created high-fidelity prototype demonstrating animated interactions, visual hierarchy, and typographic emphasis to strengthen brand salience and emotional resonance.'
        },
        {
          name: 'AI Illustration (Tempo)',
          purpose: 'Used iterative AI prompting to develop Tempo character through multiple rounds: exploring metronome shapes and LED expressions, aligning with U of T color palette (deep teal blue, crimson accents), refining glow animation, and polishing final design for clarity at all sizes.'
        },
        {
          name: 'Netlify Deployment',
          purpose: 'Deployed redesigned prototype to calvin-liew-music-pathways.netlify.app for live demonstration and user testing. Configured build optimization, client-side routing, and performance settings to ensure smooth animated interactions and responsive design across devices.'
        }
      ],
      impact: {
        title: 'Brand Strategy Meets User-Centered Design',
        content: 'The Music Pathways redesign demonstrates how strategic branding frameworks can drive meaningful UX improvements. By applying CBBE principles, the project transformed from a static information resource into an interactive guidance system that builds brand salience (career clusters become immediately visible), brand meaning (associations with clarity, support, exploration), brand judgments (higher perceived quality and credibility), brand feelings (curiosity, excitement, confidence), and ultimately brand resonance (longer site visits, return engagement). The integration of Tempo as a character mascot created a unique brand element that satisfies Keller\'s offensive criteria—memorable shape, meaningful symbolism, likable personality—while also serving a functional role as the face of the AI chatbot. The conversion of static PDFs to an animated pathways explorer directly addressed consumer behavior challenges by reducing search costs, cognitive load, and time-related barriers, making career discovery feel exploratory rather than overwhelming.\n\nFrom a learning perspective, this project reinforced how classroom frameworks translate into real design decisions. The brand mantras provided clear internal guidance that shaped tone, aesthetics, and feature prioritization. Positioning principles helped establish points of parity (academic credibility, research-based resources) and points of difference (interactive visualization, AI integration, mascot-driven personality). Consumer behavior models revealed why the original static layout created friction and how visual feedback combined with natural language interaction could reduce effort while supporting different learning styles. This experience aligns directly with my career goals in UX, product design, and product management—fields where research, storytelling, and user-centered thinking converge to create thoughtful digital experiences. Working on initiatives like TMPP showed me how strategic frameworks can guide interface decisions, build brand equity, and ultimately create products that feel both purposeful and impactful.'
      }
    }
  },
  {
    id: 'night-shift',
    title: 'The Night Shift: Visualizing Sleep, Stress, and Health',
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
    title: 'Matchify: Connecting People Through Music',
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
    title: 'Tutorly: Matching Students for Peer Learning',
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
    title: 'Food ResQ: Connecting Food with Communities',
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
