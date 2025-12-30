import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'anatomy-of-fear',
    title: 'The Anatomy of Fear: Quantifying Horror',
    category: 'Data Analysis',
    dates: 'Sep 2025 - Dec 2025',
    organization: 'University of Toronto',
    courseCode: 'CSC316H1 - Data Visualization and Advanced Programming',
    description: 'Built an interactive data visualization project analyzing 129 horror film screenplays to discover the "power law of horror" using AI and statistical analysis. Developed a hybrid GPT-4o-mini/GPT-4o parsing pipeline that processed 10,000 scenes to extract 11,204 horror signals, achieving 99.97% success rate while reducing costs by 96.5%. Created 8 custom D3.js visualizations including a real-time Fear Monitor with BPM animation, Sankey flow diagrams for signal analysis, Markov chain transition matrices for pacing patterns, and interactive bubble charts revealing that elite signals like "scream" and "blood" drive 68% of fear responses despite representing only 5% of detected elements. Demonstrated advanced skills in AI prompt engineering, parallel processing with Python, data pipeline architecture, and responsive visualization design.',
    image: '/projects/anatomy-of-fear/thumbnail.png',
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
          description: 'Scenes with dialogue ratios < 0.30 (action-heavy/silent) showed 23% higher average tension scores (0.58) compared to dialogue-heavy scenes > 0.70 (0.47). The correlation coefficient between dialogue density and tension was -0.34, providing quantitative support for the theory that atmospheric silence amplifies dread. Horror effectiveness often depends on what characters don\'t say. Letting sounds, visuals, and pauses do the work.'
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
          insight: 'Strategic pacing beats constant terror. Most films hover at moderate fear levels (0.3-0.5) with occasional spikes, especially near the end. Effective horror alternates calm and chaos'
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
          insight: 'No single recipe wins. Diversity thrives. Supernatural films lean on Psyche/Setting; Slashers lean on Pace/Threat. Spiky shapes indicate specialist approach, round shapes indicate generalist. Both can succeed'
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
    title: 'Drive Companion: AI-Powered Cloud Intelligence',
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
        content: 'Google Drive Companion reimagines cloud storage as an intelligent productivity partner. Built as an AI-powered extension of Google Drive, Companion transforms how students and professionals interact with their files, moving from reactive file retrieval to proactive workflow support. Rather than just storing documents, Companion reads syllabi to auto-generate study schedules, processes meeting notes to extract action items, and surfaces relevant context before deadlines arrive. The product addresses a critical gap in the $65.94B generative AI market: while ChatGPT and Microsoft Copilot require manual file uploads and operate separately from storage ecosystems, Companion seamlessly integrates AI intelligence directly into the platform users already trust with their most important documents. This positioning establishes Google Drive as not just a storage solution, but the central productivity hub where intelligence and organization converge.'
      },
      motivation: {
        title: 'The AI Productivity Market Opportunity',
        content: 'The global generative AI chatbot market is experiencing explosive growth, valued at $7.66 billion in 2024 and projected to reach $65.94 billion by 2032. Major players like ChatGPT (700M weekly users, 61.0% market share) and Microsoft Copilot (33M active users, 14.1% share) demonstrate that AI-powered productivity tools have achieved mainstream adoption. However, a critical gap exists: these tools operate externally to storage platforms, requiring users to manually upload files and context-switch between applications. Students face mounting pressure from multiple deadlines, heavy readings, and information overload, while professionals struggle with meeting overload, scattered workflows, and the constant risk of missing critical commitments. Google Drive Companion addresses this pain point by embedding proactive AI capabilities directly into the ecosystem where users already store and collaborate on their most important work, eliminating friction and creating a seamless intelligence layer that anticipates needs rather than waiting to be prompted.'
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
          description: 'When asked to rank feature value, users consistently prioritized tools that reduced anxiety over those that saved time alone. Students rated "Deadline-Aware Exam Prep" and "Syllabus-to-Schedule Packs" highest because these features prevented last-minute panic. Professionals valued "Proactive Risk Alerts" and "Meeting Chief of Staff" for similar reasons. Both provide psychological relief by ensuring nothing falls through the cracks. This finding reinforced that Companion\'s brand positioning should emphasize confidence and calm, not just efficiency.'
        },
        {
          title: 'Seamless Integration Beats Feature Richness',
          description: 'Comparative analysis showed users prefer fewer, deeply integrated features over extensive standalone tools. ChatGPT and Notion offer powerful capabilities but require manual setup and ongoing maintenance. Companion\'s value proposition (automatically processing Drive files without uploads, syncing with Calendar, and surfacing insights within existing workflows) tested significantly higher in desirability scores. Users want intelligence that adapts to their existing habits rather than requiring behavior change.'
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
          description: 'Automatically captures decisions, action items, owners, and next steps during Google Meet sessions. Generates follow-up emails, updates project trackers in Sheets, and creates calendar reminders for deliverables, all without manual note-taking.',
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
        content: 'Google Drive Companion represents a strategic shift in how cloud storage platforms compete in the AI era. By transforming Drive from passive file storage into a proactive intelligence layer, the product establishes Google as the first major platform to merge content storage with real-time AI assistance. Financial projections estimate 3 million paid users in Year 1 and 9 million in Year 2, generating $323.6M and $971.3M in revenue respectively. The product directly addresses the $65.94B generative AI market opportunity while leveraging Google\'s existing billion-user Drive ecosystem for rapid adoption.\n\nFrom a learning perspective, this project demonstrated the application of product management frameworks including competitive positioning analysis, user research methodologies, brand equity development, and go-to-market strategy. The VRIN framework validated that Google\'s unique combination of TPU infrastructure, Drive ecosystem integration, and user trust creates sustainable competitive advantage that external competitors cannot easily replicate. User research revealed that emotional benefits (confidence, calm, and feeling supported) drive adoption more powerfully than functional efficiency alone. This insight shaped the entire product narrative and feature prioritization, reinforcing that successful product management requires deep empathy for user psychology, not just technical capability.'
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
        content: 'The Music Pathways Project addresses a critical gap between student perceptions of music careers and the reality of today\'s diverse industry. Many students assume their only options are performance, teaching, or leaving music entirely, missing opportunities in sound design, music technology, digital content creation, community arts, arts management, and music therapy. This redesign applies MGMC11 branding frameworks to strengthen the project\'s identity, emotional resonance, and digital presence, transforming a static information resource into an interactive guidance system. The redesigned platform features an animated career pathways visualization, an integrated AI chatbot powered by the Tempo mascot, and a completely reimagined homepage that positions music careers as modern, interdisciplinary, and accessible. By reducing cognitive load through visual feedback and natural language interaction, the redesign creates strong brand associations tied to clarity, support, and exploration, ultimately building deeper student engagement and brand resonance.'
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
        content: 'The Music Pathways redesign demonstrates how strategic branding frameworks can drive meaningful UX improvements. By applying CBBE principles, the project transformed from a static information resource into an interactive guidance system that builds brand salience (career clusters become immediately visible), brand meaning (associations with clarity, support, exploration), brand judgments (higher perceived quality and credibility), brand feelings (curiosity, excitement, confidence), and ultimately brand resonance (longer site visits, return engagement). The integration of Tempo as a character mascot created a unique brand element that satisfies Keller\'s offensive criteria (memorable shape, meaningful symbolism, likable personality) while also serving a functional role as the face of the AI chatbot. The conversion of static PDFs to an animated pathways explorer directly addressed consumer behavior challenges by reducing search costs, cognitive load, and time-related barriers, making career discovery feel exploratory rather than overwhelming.\n\nFrom a learning perspective, this project reinforced how classroom frameworks translate into real design decisions. The brand mantras provided clear internal guidance that shaped tone, aesthetics, and feature prioritization. Positioning principles helped establish points of parity (academic credibility, research-based resources) and points of difference (interactive visualization, AI integration, mascot-driven personality). Consumer behavior models revealed why the original static layout created friction and how visual feedback combined with natural language interaction could reduce effort while supporting different learning styles. This experience aligns directly with my career goals in UX, product design, and product management (fields where research, storytelling, and user-centered thinking converge to create thoughtful digital experiences). Working on initiatives like TMPP showed me how strategic frameworks can guide interface decisions, build brand equity, and ultimately create products that feel both purposeful and impactful.'
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
      },
      {
        type: 'github',
        url: 'https://github.com/Calvin-Liew/a4-sleep-analytics',
        label: 'View Source Code on GitHub'
      }
    ],
    extendedContent: {
      overview: {
        title: 'Why Your Job Doesn\'t Define Your Sleep',
        content: 'Every night, millions of us close our eyes hoping for rest, yet sleep remains frustratingly out of reach for so many. What determines whether we wake refreshed or exhausted? This story explores three powerful forces shaping our sleep. First, we examine how our careers and the stress they bring follow us into our bedrooms. Then, we trace the surprising pathways between our daily movement and the quality of our dreams. Finally, we dive into the intimate relationship between our bodies, our beating hearts, and the disorders that steal our sleep. Together, these perspectives reveal a fundamental truth: your job title does not define your sleep quality. Individual lifestyle choices, physical activity, and health factors matter far more than your profession when it comes to rest.'
      },
      datasets: [
        {
          name: 'Sleep Health Dataset',
          description: 'Real-world data capturing the lived experiences of individuals across diverse professions, including sleep duration, stress levels, physical activity, BMI categories, heart rate measurements, and sleep disorder classifications.',
          records: '374 individuals'
        }
      ],
      methodology: {
        title: 'Three-Chapter Visual Story',
        steps: [
          {
            phase: 'Chapter I: The Dataset',
            description: 'Established the scope of investigation with 374 people studied across 11 occupations. Calculated key statistics: 7.1h average sleep, 5.4 average stress level, sleep range of 5.8h to 8.5h, and stress range of 3 to 8. Provided foundational context for understanding data patterns before diving into specific analyses.'
          },
          {
            phase: 'Chapter II: Jobs & Stress (Bubble Landscape)',
            description: 'Built interactive bubble chart plotting sleep duration (x-axis) vs stress levels (y-axis) for each occupation. Bubble size represents number of people, color indicates stress intensity (blue = calm, gray = neutral, orange = tense). Enabled hover and click interactions to reveal individual experiences within professions, demonstrating within-profession variance.'
          },
          {
            phase: 'Chapter III: The Flow of Activity to Rest (Sankey Diagram)',
            description: 'Created Sankey diagram showing flows from physical activity levels (Low, Medium, High) to sleep quality outcomes (Poor 5-6h, Average 7h, Good 8-10h). Flow width represents number of people following each path. Revealed that 54.9% of high activity individuals achieve good sleep vs 22.7% of low activity individuals.'
          },
          {
            phase: 'Chapter IV: The Dream Lab',
            description: 'Engineered interactive physiological mapping tool exploring relationships between BMI categories, heart rate, and sleep disorders. Each dot represents an individual, pulsing in sync with their resting heart rate (64-86 bpm range). Included filters for sleep disorder types, heart rate range, BMI categories, plus animation controls for speed, heartbeat pulse, motion trails, constellations, density aura, and deep sleep mode.'
          }
        ]
      },
      keyFindings: [
        {
          title: 'The Individual Matters Most',
          description: 'Your profession does not define your sleep. The bubble chart shows that Nurse spans from 5.9 to 8.2 hours of sleep despite being the same profession (a 2.3 hour span with stress levels varying 5.0 points from 3.0 to 8.0). The Sankey diagram reveals that even high activity flows to multiple sleep outcomes. The Dream Lab demonstrates that BMI categories cannot predict individual disorders. Focus on personal lifestyle choices over workplace labels.'
        },
        {
          title: 'Physical Activity Creates Pathways to Better Sleep',
          description: 'The Sankey diagram reveals a strong connection between movement and rest. High activity individuals achieve good sleep quality 54.9% of the time (39 out of 71 people), compared to just 22.7% for those with low activity (34 out of 150 people). This 32.2 percentage point difference demonstrates that regular physical activity creates measurable pathways to better sleep quality regardless of profession.'
        },
        {
          title: 'Heart Rate and BMI Predict Sleep Disorders',
          description: 'The Dream Lab reveals that most people with no sleep disorder sit in Normal BMI with lowest heart rates (68-70 bpm). Insomnia spreads across Normal and Overweight with 3-5 bpm higher rates. Sleep apnea clusters in Obese BMI with highest heart rates, often 10+ bpm above the none group. Heart rate rises with BMI, but disorder status is the stronger separator, creating a practical screening flag.'
        }
      ],
      visualizations: [
        {
          title: 'Bubble Landscape (Jobs & Stress)',
          description: 'Interactive scatter plot with sleep duration on x-axis (5.8-8.6h) and stress level on y-axis (3.0-8.0). Each occupation represented as a bubble where size = number of people and color = stress intensity (blue to orange gradient). Includes hover tooltips and click interactions to reveal individual data points within professions.',
          insight: 'Demonstrated within-profession variation is substantial: Nurse (73 people) shows 2.3h sleep span and 5.0 point stress span, proving the same job title can span from restful to high-stress zones based on individual circumstances.'
        },
        {
          title: 'Activity-to-Sleep Sankey Diagram',
          description: 'Flow diagram connecting three activity levels (Low: 150 people, Medium: 153 people, High: 71 people) to three sleep quality buckets (Poor 5-6h: 117 people, Average 7h: 77 people, Good 8-10h: 180 people). Flow width visually represents the number of people following each pathway from activity to sleep outcome.',
          insight: 'High activity individuals show 54.9% good sleep rate vs 22.7% for low activity, a clear visual demonstration that movement creates stronger pathways to quality rest.'
        },
        {
          title: 'The Dream Lab (Physiological Mapping)',
          description: 'Animated scatter plot with BMI categories (Normal, Overweight, Obese) on x-axis and heart rate (64-86 bpm) on y-axis. Each dot represents an individual and pulses at their resting heart rate speed. Color-coded by sleep disorder: None (blue), Insomnia (orange), Sleep Apnea (red). Interactive filters and animation controls (speed, pulse, trails, constellations, density aura, deep sleep mode).',
          insight: 'Sleep apnea dominated the high BMI + high heart rate corner (Obese + 10+ bpm above baseline), creating a practical screening flag that body composition and cardiovascular health strongly correlate with sleep disorder risk.'
        }
      ],
      tools: [
        {
          name: 'D3.js',
          purpose: 'Built all three interactive visualizations: bubble chart with dynamic sizing and color encoding, Sankey diagram with flowing pathways, and animated physiological scatter plot with pulsing heartbeat effects synchronized to individual resting heart rates.'
        },
        {
          name: 'JavaScript',
          purpose: 'Implemented interaction logic for hover tooltips, click events to drill down into occupation data, filter controls for Dream Lab (sleep disorder, heart rate range, BMI), and animation toggles for visual effects (motion trails, constellations, density aura).'
        },
        {
          name: 'Statistical Analysis',
          purpose: 'Calculated key metrics: average sleep (7.1h), average stress (5.4), within-profession variance (Nurse: 2.3h sleep span, 5.0 stress span), activity-to-sleep flow percentages (54.9% high activity → good sleep vs 22.7% low activity), and heart rate differences across BMI and disorder groups.'
        },
        {
          name: 'GitHub Pages',
          purpose: 'Deployed interactive three-chapter data story to calvin-liew.github.io/a4-sleep-analytics for live demonstration. Configured static hosting for D3.js visualizations with smooth animations and responsive interactions across devices.'
        }
      ],
      impact: {
        title: 'Three Truths from the Data',
        content: 'When we examine the patterns across all three perspectives (profession, activity flow, and physiological health), three distinct narratives emerge that reveal the hidden forces shaping our sleep.\n\n01 • The Individual Matters Most: Your profession does not define your sleep. The bubble chart shows that Nurse spans from 5.9 to 8.2 hours despite being the same profession. Focus on personal lifestyle choices over workplace labels. Individual habits matter more than job titles.\n\n02 • The Body Tells the Story: Physical activity directly improves sleep quality. The Sankey diagram shows high activity creates stronger pathways to good sleep (54.9% vs 22.7%). The Dream Lab reveals how heart rate and body composition correlate with sleep disorders. Increase daily movement, manage weight, and monitor cardiovascular health for measurable sleep improvements.\n\n03 • The Path Forward: Take control through evidence-based choices. Start with small changes: walk more each day, prioritize stress management, and consult healthcare providers about sleep conditions. The data shows these actions create real differences regardless of profession. Behind every bubble, every flow, and every pulse lies a real person navigating the universal challenge of finding rest in a restless world.'
      }
    },
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
    extendedContent: {
      overview: {
        title: 'Connecting People Through Musical Identity',
        content: 'Matchify reimagines social connection by placing music at the center of human relationships. Rather than relying on geographic proximity or mutual friends, Matchify connects users through their authentic musical identity: the artists they love, the genres that move them, and the listening habits that define their daily lives. By integrating seamlessly with Spotify, the platform transforms passive listening data into active social discovery, helping users find friends, collaborators, and communities who truly understand their musical perspective. This project explores how music can serve as both a conversation starter and a foundation for meaningful connection in an increasingly digital world.'
      },
      motivation: {
        title: 'Why Music-Based Social Discovery?',
        content: 'Traditional social platforms prioritize who you already know or where you live, but music reveals who you are. Your Spotify Wrapped isn\'t just data. It\'s a window into your personality, your mood patterns, your cultural identity. Matchify was born from the recognition that shared musical taste creates instant common ground and authentic conversation. In a world where meeting new people often feels forced or superficial, music offers a natural, judgment-free entry point for connection. Whether you\'re looking for concert buddies, jam session partners, or simply people who "get" your playlist, Matchify makes those discoveries feel organic and exciting.'
      },
      features: [
        {
          title: 'Spotify-Powered Onboarding',
          description: 'Streamlined authentication flow that connects users\' Spotify accounts in seconds. The system instantly imports top artists, favorite genres, recently played tracks, and listening patterns to build a comprehensive musical profile without requiring manual data entry. Users can review and customize their imported data before going live.',
          insight: 'Reduces onboarding friction by 90% compared to manual profile creation. Users skip tedious form-filling and immediately see their musical identity visualized, creating instant engagement and personalization from the first interaction.'
        },
        {
          title: 'Musical Identity Profiles',
          description: 'Visually rich user profiles that showcase musical personality through artist grids, genre breakdowns, top tracks, and listening statistics. Profiles display both current favorites and all-time classics, giving potential matches a complete picture of musical taste evolution over time. Customizable privacy controls let users choose what to share publicly vs. with matches only.',
          insight: 'Transforms abstract listening data into concrete conversation starters. The visual design emphasizes discovery over comparison, encouraging users to explore differences in taste rather than only seeking perfect matches, broadening potential connections.'
        },
        {
          title: 'Smart Matching Algorithm',
          description: 'Recommendation engine that analyzes artist overlap, genre compatibility, listening intensity patterns, and discovery behaviors to suggest potential matches. The algorithm balances similarity (shared favorites) with complementarity (compatible but different tastes) to create diverse, interesting connections. Users can filter matches by music preferences, location, or activity interests.',
          insight: 'Goes beyond simple "you both like Taylor Swift" matching by considering listening context, niche artist appreciation, and genre exploration patterns. Creates matches that feel serendipitous yet meaningful, like meeting someone at a concert you both traveled across the city to attend.'
        },
        {
          title: 'Integrated Messaging Interface',
          description: 'In-app chat system designed specifically for music-centered conversations. Features include sharing Spotify links with inline previews, collaborative playlist creation, concert planning tools, and music trivia icebreakers. Messages can include song recommendations, artist deep dives, or genre exploration challenges to keep conversations engaging and music-focused.',
          insight: 'Keeps conversations anchored to the shared interest that brought users together. The music-specific features prevent conversations from stalling and provide natural conversation pivots when topics run dry, increasing message response rates and connection quality.'
        },
        {
          title: 'Granular Privacy Settings',
          description: 'Comprehensive privacy controls allowing users to manage visibility of listening history, location data, profile information, and online status. Options include hiding specific artists or genres, creating "private mode" listening sessions that don\'t affect matching, and controlling who can initiate contact. Settings dashboard explains data usage transparently.',
          insight: 'Addresses the vulnerability users feel when sharing music taste (arguably more personal than photos). By giving users control over their musical exposure, the platform builds trust and encourages authentic self-presentation rather than curated "cool" personas.'
        },
        {
          title: 'Intuitive Navigation System',
          description: 'Bottom tab navigation with four core sections: Discover (match browsing), Messages (conversations), Profile (your musical identity), and Explore (community features like local concerts, trending artists, playlist challenges). Each section uses music-inspired visual metaphors (waveforms, vinyl records, equalizers) to create cohesive brand identity while maintaining clarity.',
          insight: 'Balances feature complexity with ease of use. Users can quickly jump between discovering new matches, maintaining existing conversations, and refining their profile without getting lost in nested menus. The music-themed UI feels playful without sacrificing usability.'
        }
      ],
      tools: [
        {
          name: 'Figma',
          purpose: 'Designed complete mobile interface system including onboarding flows, profile templates, match browsing screens, messaging interface, and settings dashboard. Created high-fidelity prototype demonstrating Spotify authentication, swipe gestures, and animated transitions between states.'
        },
        {
          name: 'Spotify API Integration',
          purpose: 'Leveraged Spotify Web API for OAuth authentication, user profile data retrieval (top artists, tracks, genres), listening history analysis, and playlist management. Designed data mapping strategy to transform Spotify\'s JSON responses into meaningful visual profile elements.'
        },
        {
          name: 'User Research',
          purpose: 'Conducted interviews with music enthusiasts to understand how they discover new music, form music-based friendships, and use existing social platforms. Identified pain points around superficial connections and desire for music-centered communities, informing core feature prioritization.'
        },
        {
          name: 'Mobile Design Patterns',
          purpose: 'Applied iOS and Android design conventions for gesture-based navigation (swipe to match/pass), bottom sheet modals (profile details), tab bars (primary navigation), and notification systems. Ensured platform-appropriate interactions while maintaining consistent brand identity.'
        }
      ],
      impact: {
        title: 'Recognition and Learning',
        content: 'Matchify was selected to be showcased at ARIA 2024 (Academic Research and Innovation Affair), University of Toronto\'s premier research and innovation event, where it was presented alongside cutting-edge academic projects from across disciplines. This recognition validated the project\'s innovation in combining social connection with music technology, demonstrating that leveraging existing APIs like Spotify can create novel user experiences without reinventing the wheel.\n\nFrom a design learning perspective, Matchify taught critical lessons about balancing personalization with privacy, feature richness with simplicity, and algorithmic matching with serendipitous discovery. The project reinforced that successful social platforms must solve a genuine human need (in this case, the desire to connect over shared passions) rather than simply implementing trendy features. The Spotify integration showcased how thoughtful API usage can bootstrap complex functionality, allowing designers to focus on unique value propositions rather than rebuilding basic infrastructure.\n\nThis project directly applies to product design and UX careers where understanding user motivation, designing for trust and vulnerability, and creating delightful interactions are paramount. Matchify demonstrates the ability to research user needs, translate insights into features, and prototype complete mobile experiences that balance technical feasibility with emotional resonance.'
      }
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
    extendedContent: {
      overview: {
        title: 'Bridging Students Through Personalized Peer Learning',
        content: 'Tutorly reimagines academic support by connecting students directly with peers who excel in subjects where they struggle. Rather than relying on expensive professional tutors or impersonal study groups, Tutorly creates personalized one-on-one learning relationships based on academic strengths, learning styles, and scheduling compatibility. The platform transforms peer tutoring from an ad-hoc arrangement into a structured, trackable, and rewarding experience for both tutors and learners. By empowering students to teach and learn from each other, Tutorly builds academic communities where knowledge flows freely, confidence grows mutually, and success becomes collaborative rather than competitive.'
      },
      motivation: {
        title: 'Why Peer-to-Peer Learning?',
        content: 'Students often understand their peers\' struggles better than professional instructors because they recently overcame the same challenges. A classmate who aced calculus last semester remembers exactly where the confusion happens and can explain concepts in relatable language without academic jargon. Yet finding the right peer tutor is frustratingly difficult. You might not know who\'s strong in organic chemistry, when they\'re available, or if they even want to help. Tutorly was born from recognizing this matching problem as a design challenge. By creating a platform where students can advertise their strengths, discover learning opportunities, and track progress together, Tutorly makes peer tutoring accessible, reliable, and mutually beneficial. It transforms "Can you help me with this?" from a awkward ask into a structured learning relationship that benefits both parties.'
      },
      features: [
        {
          title: 'Personalized Recommendation System',
          description: 'Matching algorithm that analyzes student profiles (courses taken, grades, tutoring preferences, learning styles) to suggest ideal tutor-learner pairings. The system considers subject expertise depth, teaching experience, availability overlap, campus proximity, and personality compatibility indicators. Recommendations prioritize quality matches over quantity, presenting 3-5 high-fit suggestions rather than overwhelming users with options.',
          insight: 'Reduces the friction of finding the "right" tutor from hours of searching to seconds of browsing. By considering both academic fit and interpersonal compatibility, the algorithm creates matches that feel personalized and thoughtful, increasing the likelihood of successful long-term tutoring relationships.'
        },
        {
          title: 'Integrated Messaging Interface',
          description: 'In-app chat system designed specifically for academic communication. Features include sharing course materials (PDFs, images, links), scheduling session times with calendar integration, setting learning goals collaboratively, and asking quick questions between sessions. Message threads are organized by subject to keep conversations focused and searchable.',
          insight: 'Keeps all tutoring-related communication in one place, preventing messages from getting lost in crowded personal inboxes or group chats. The academic focus encourages productive conversations and reduces social awkwardness around asking for help, making students more likely to reach out when stuck.'
        },
        {
          title: 'Progress Tracking Dashboard',
          description: 'Visual analytics showing completed sessions, hours tutored/learned, subjects covered, and performance trends over time. Tutors can log session notes, attach practice problems, and mark concept mastery milestones. Learners see their growth trajectory visualized through charts tracking topic confidence before and after sessions. Both parties can export progress reports for academic portfolios or resume building.',
          insight: 'Transforms informal study help into trackable achievements. Tutors gain tangible evidence of teaching impact (useful for resumes, grad school applications), while learners can monitor improvement and identify persistent weak spots. The data-driven approach adds legitimacy and motivation to peer tutoring relationships.'
        },
        {
          title: 'User Research-Driven Personas',
          description: 'Developed through comprehensive interviews with both struggling students and high-achieving peers willing to tutor. Created detailed personas representing different user motivations: "The Struggling Learner" (needs affordable, patient help), "The Altruistic Tutor" (wants to give back to community), "The Resume Builder" (seeks teaching experience for career goals), and "The Subject Enthusiast" (loves their major and enjoys explaining it). Each persona informed specific design decisions around messaging tone, feature prioritization, and incentive structures.',
          insight: 'Ensured the platform serves both sides of the marketplace equally. By understanding diverse motivations (some tutors want money, others want experience, some want social connection), the design accommodates multiple use cases without forcing a single rigid model of peer tutoring.'
        },
        {
          title: 'Iterative Usability Testing',
          description: 'Conducted multiple rounds of testing with University of Toronto students using progressively refined prototypes. Early tests revealed navigation confusion around "Find a Tutor" vs "Become a Tutor" entry points, leading to redesigned onboarding that asks user intent upfront. Later tests identified need for "Quick Question" feature allowing brief help requests without committing to full tutoring relationships. Final testing validated simplified messaging interface and progress dashboard clarity.',
          insight: 'User feedback directly shaped core functionality. Students needed lower-commitment options before diving into formal tutoring, leading to tiered engagement model (quick questions → trial session → ongoing relationship). Testing also revealed students value tutor profiles showing personality and approachability, not just academic credentials, informing profile template design.'
        },
        {
          title: 'Mobile-First Design System',
          description: 'Complete UI design prioritizing mobile experience where students naturally seek help—on the bus, between classes, late-night study sessions. Design system includes reusable components: subject tag pills (color-coded by discipline), availability calendars (optimized for small screens), tutor profile cards (scannable at a glance), and session booking flows (three taps maximum). Maintains consistency across iOS and Android while respecting platform conventions for gestures and navigation patterns.',
          insight: 'Recognized that students won\'t open laptops to ask quick tutoring questions. They pull out their phones. The mobile-first approach ensures Tutorly fits naturally into student workflows, making it as easy to book a tutoring session as ordering food delivery, reducing barriers to seeking academic help.'
        }
      ],
      tools: [
        {
          name: 'Figma',
          purpose: 'Designed complete mobile application including dual onboarding flows (tutor vs learner), personalized match browsing screens, detailed tutor profiles, integrated messaging interface, session booking calendar, and progress tracking dashboard. Created interactive prototype demonstrating full user journeys from signup to completed tutoring relationship.'
        },
        {
          name: 'User Research Methods',
          purpose: 'Conducted semi-structured interviews with 15+ students across different academic disciplines and performance levels. Used affinity mapping to synthesize pain points, created user journey maps highlighting emotional highs and lows of seeking tutoring help, and developed personas representing diverse student motivations and needs.'
        },
        {
          name: 'Usability Testing',
          purpose: 'Ran moderated usability tests with 8 participants across 3 testing rounds. Used think-aloud protocol to identify navigation confusion, friction points in booking flow, and unclear messaging. Iterated designs based on feedback, measuring task completion rates and time-on-task improvements between versions.'
        },
        {
          name: 'Wireframing',
          purpose: 'Started with low-fidelity sketches to explore multiple layout options for key screens (match browsing, tutor profiles, messaging). Progressed to mid-fidelity wireframes for testing information architecture and interaction patterns before committing to visual design. Used rapid iteration to test 5+ navigation structures before selecting final approach.'
        }
      ],
      impact: {
        title: 'Academic Recognition and Career Relevance',
        content: 'Tutorly achieved a final evaluation score above 85% in the UX design course and was selected for showcase at the University of Toronto Scarborough Undergraduate Research Symposium 2024, where it was presented to faculty, students, and industry professionals. This recognition validated the project\'s user-centered approach, demonstrating that thorough research, iterative testing, and thoughtful design can solve real student pain points in measurable ways.\n\nFrom a learning perspective, Tutorly taught critical lessons about designing for two-sided marketplaces where both user groups (tutors and learners) must find value simultaneously. The project reinforced that successful platforms require deep empathy for users\' emotional states (seeking academic help is vulnerable and anxiety-inducing, while offering to tutor risks rejection or imposter syndrome). Designing for these sensitivities meant crafting encouraging copy, low-commitment entry points, and features that celebrate small wins to reduce stigma around struggling academically.\n\nThis project directly applies to UX and product design careers where conducting user research, translating insights into features, and iterating based on feedback are core skills. Tutorly demonstrates the ability to navigate complex user needs, design intuitive mobile experiences, and create systems that foster meaningful human connections (all critical competencies for building products that genuinely improve users\' lives). The peer tutoring domain also showcases understanding of education technology, a rapidly growing field where thoughtful design can democratize access to learning support.'
      }
    },
    featured: false
  },
  {
    id: 'food-resq',
    title: 'Food ResQ: Smart Recipes from Fridge Scraps',
    category: 'Product Management',
    dates: 'Oct 2023 - Oct 2023',
    organization: 'Hack The Valley 8',
    description: 'Led the product design and UI/UX for Food ResQ, an AI-powered fridge management app developed during Hack The Valley 8 to combat household food waste. Designed complete user experience for tracking fridge inventory via MongoDB database and generating flexible recipe recommendations using ChatGPT. Created intuitive interface for quickly adding ingredients (even unmeasured or unknown foods), built using React.js and Bootstrap frontend with Flask backend. Managed API integration with OpenAI for consistent recipe generation and wrote detailed prompts to retrieve formatted cooking instructions. Secured 6th place overall and won Best Use of MongoDB Atlas, demonstrating ability to deliver polished demo under 36-hour hackathon constraints.',
    skills: ['React.js', 'Flask', 'MongoDB', 'OpenAI API', 'Prompt Engineering', 'UI/UX Design', 'Figma', 'Bootstrap', 'Product Management', 'Hackathon'],
    links: [
      {
        type: 'devpost',
        url: 'https://devpost.com/software/food-resq-ai-recommended-recipes-to-reduce-food-waste',
        label: 'View Devpost Submission'
      },
      {
        type: 'demo',
        url: 'https://www.youtube.com/watch?v=W53-djMHqHI',
        label: 'Watch Demo Video'
      }
    ],
    extendedContent: {
      overview: {
        title: 'AI-Powered Recipe Recommendations to Reduce Food Waste',
        content: 'Food ResQ uses a MongoDB database to track ingredients in your fridge and generates flexible, delicious recipes using ChatGPT to help you finish leftover food before it spoils. Built in 36 hours during Hack The Valley 8, the platform leverages AI to transform neglected ingredients (like half a carrot, half an onion, or a quarter pound of ground pork) into creative meal ideas. The app excels at handling unknown foods and ingredients you\'re too lazy to measure precisely, using LLM flexibility to generate practical recipes with step-by-step instructions. Users can input their fridge contents, and the AI recommends recipes that prioritize ingredients closer to expiry, ensuring nothing goes to waste. This project demonstrates how combining databases, AI APIs, and thoughtful UX design can solve real household sustainability challenges.'
      },
      motivation: {
        title: 'From Personal Frustration to Solution',
        content: 'I was cooking at home one day and kept noticing we had half a carrot, half an onion, and like a quarter pound of ground pork lying around all the time. More often than not it was from me cooking a fun dish that my mother would have to somehow clean up over the week. So I wanted to create an app that would help me use those ingredients I had neglected, so that even if both my mother and I forgot about them, we would not contribute to food waste. This personal frustration became the spark for Food ResQ. In Canada, over 58% of food produced is wasted (35.5 million tonnes annually, worth $49 billion), while 1 in 7 Canadians experiences food insecurity. What started as a solution to finish leftover ingredients in my fridge evolved into a platform that tackles food waste at both household and community levels through AI recipe recommendations and food redistribution.'
      },
      features: [
        {
          title: 'Fridge Inventory Database',
          description: 'MongoDB database stores user fridge contents with flexible schema supporting varied ingredient types, quantities, and expiry dates. Users can quickly add ingredients without precise measurements ("half a carrot", "some ground pork") or even unknown foods. The database tracks what\'s in your fridge over time, providing the foundation for smart recipe recommendations.',
          insight: 'Built with flexibility in mind because home cooking is messy. Users don\'t want to weigh every ingredient or look up exact names. The loose schema accommodates real-world fridge chaos while still enabling intelligent recipe matching.'
        },
        {
          title: 'ChatGPT-Powered Recipe Generation',
          description: 'OpenAI API integration generates creative, practical recipes using whatever ingredients you have on hand. Detailed prompt engineering ensures recipes include step-by-step instructions, cooking times, and substitution suggestions. The AI handles inconsistent ingredient data gracefully, turning "half an onion" and "quarter pound pork" into delicious meal ideas.',
          insight: 'LLM flexibility is the killer feature. Traditional recipe databases require exact ingredient matches, but ChatGPT improvises brilliantly with partial ingredients, unknown quantities, and unusual combinations. This makes the app genuinely useful for real kitchens.'
        },
        {
          title: 'Expiry Priority Algorithm',
          description: 'Smart recommendation system prioritizes ingredients closer to expiry, ensuring older food gets used first. When generating recipes, the AI receives expiry context and weights suggestions toward ingredients about to spoil. Future feature: automated notifications reminding users to cook specific ingredients before they go bad.',
          insight: 'Prevents the "out of sight, out of mind" problem. Users forget what\'s buried in their fridge, but the app remembers and actively suggests recipes before ingredients spoil. This proactive approach drives higher engagement and real waste reduction.'
        },
        {
          title: 'Receipt Scanning Vision (Planned)',
          description: 'Planned feature to automatically add ingredients via receipt scanning, eliminating manual data entry. Users snap a photo of their grocery receipt, and computer vision extracts item names and quantities to populate the fridge database. Makes onboarding frictionless and encourages consistent inventory tracking.',
          insight: 'Manual ingredient entry is the biggest friction point. Receipt scanning removes this barrier entirely, making the app as easy as "take a photo after shopping." Planned for next iteration to drive adoption and daily usage.'
        },
        {
          title: 'React + Flask Architecture',
          description: 'Clean separation between React.js/Bootstrap frontend and Flask Python backend. Frontend handles user interactions and recipe display, while backend manages MongoDB operations, OpenAI API calls, and prompt engineering. Professional dev-ops practices with Kanban board planning and detailed API documentation prevented refactor headaches during the 36-hour sprint.',
          insight: 'Good architecture saved the hackathon. After an initial database schema mistake, the modular design allowed complete refactor without breaking everything. Documented APIs and clear separation of concerns meant the team could parallelize work efficiently.'
        }
      ],
      tools: [
        {
          name: 'React.js & Bootstrap',
          purpose: 'Built responsive frontend with modern component architecture. React handled state management for fridge inventory and recipe display, while Bootstrap provided mobile-friendly styling and UI components. Team had to relearn React during the hackathon, making solid component design critical for staying on schedule.'
        },
        {
          name: 'Flask (Python Backend)',
          purpose: 'Python Flask server managed API routes, MongoDB database operations, and OpenAI integration. Chose Flask for rapid prototyping speed and Python\'s excellent library ecosystem for data handling. Backend refactor mid-hackathon tested Flask\'s flexibility and modular design principles.'
        },
        {
          name: 'MongoDB Atlas',
          purpose: 'NoSQL database stored user fridge inventories with flexible schema supporting varied ingredient formats. Won "Best Use of MongoDB Atlas" prize for demonstrating how document database flexibility enables real-world messy data (unmeasured quantities, unknown foods, partial ingredients) without rigid schemas.'
        },
        {
          name: 'OpenAI API (ChatGPT)',
          purpose: 'Core feature powering recipe generation. Engineered detailed prompts to retrieve formatted recipe data including ingredients, steps, cooking times, and substitutions. Learned nuances of writing prompts for consistent LLM outputs and handling API inconsistency challenges during testing.'
        },
        {
          name: 'Figma',
          purpose: 'Designed complete UI/UX for fridge inventory management, ingredient addition flow, and recipe recommendation display. Created high-fidelity mockups to align team vision before development, preventing feature creep and ensuring focused 36-hour execution.'
        },
        {
          name: 'Kanban Board & Documentation',
          purpose: 'Professional dev-ops practices with task planning board and detailed API documentation. After initial database schema failure, the team stopped, documented everything, and planned properly. This saved countless hours debugging and enabled efficient parallel development.'
        }
      ],
      impact: {
        title: 'Hackathon Success and Technical Learnings',
        content: 'Food ResQ secured 6th place overall at Hack The Valley 8 and won Best Use of MongoDB Atlas for demonstrating how NoSQL flexibility handles real-world messy data. The judges praised our polished demo, professional presentation, and practical approach to household sustainability. Submitting for Best AI Hack and Best Sustainability Hack themes positioned the project at the intersection of emerging technology and environmental impact.\n\nFrom a technical perspective, Food ResQ taught critical lessons about good API design and planning. We messed up our database schema early on, requiring a complete refactor mid-hackathon. This failure forced the team to drop immediate work, think through solutions together, and document everything properly. The experience reinforced that upfront planning saves massive headaches during implementation. We also learned the nuances of CORS technology when connecting frontend to backend, and discovered how to write detailed prompts for retrieving consistently formatted data from LLMs despite API inconsistency challenges.\n\nThe team\'s professional dev-ops practices made the difference. Our Kanban board saved hours during task planning and implementation. After the initial failure, we documented APIs thoroughly and maintained clear separation between React frontend and Flask backend, allowing parallel development without stepping on each other\'s toes. The accomplishment we\'re most proud of: we finished a stunning demo that actually works. Future plans include receipt scanning for automatic ingredient entry, expiry-based notifications, and freemium monetization with premium LLM access for less than a coffee per month. This project demonstrates ability to rapidly prototype AI-powered solutions, recover from technical setbacks, and deliver polished products under extreme time constraints.'
      }
    },
    featured: false
  }
];
