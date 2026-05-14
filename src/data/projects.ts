import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'anatomy-of-fear',
    title: 'The Anatomy of Fear: Quantifying Horror',
    category: 'Data Analysis',
    dates: 'Sep 2025 - Dec 2025',
    organization: 'University of Toronto',
    courseCode: 'CSC316H1 - Data Visualization and Advanced Programming',
    description: 'An interactive data visualization study of how horror films generate fear. Analyzed 129 horror screenplays across 9,760 scenes and 11,204 horror signals using a GPT-4o-mini + GPT-4o pipeline (99.97% success rate, $2.28 total cost), then built nine custom D3.js visualizations into a scrollytelling site that reveals horror\'s power law: a tiny set of elite signals like scream and blood drive most of the actual scares.',
    skills: ['Large Language Models (LLM)', 'Generative AI', 'D3.js', 'Python (Programming Language)', 'Data Science', 'Data Visualization', 'Prompt Engineering'],
    image: '/projects/anatomy-of-fear/00-hero.png',
    links: [
      {
        type: 'live',
        url: 'https://calvin-liew.github.io/data-explorers-fear-analytics/',
        label: 'Live site'
      },
      {
        type: 'github',
        url: 'https://github.com/Calvin-Liew/data-explorers-fear-analytics',
        label: 'Source on GitHub'
      }
    ],
    extendedContent: {
      stats: [
        { value: '129', label: 'screenplays' },
        { value: '9,760', label: 'scenes' },
        { value: '11,204', label: 'horror signals' },
        { value: '$2.28', label: 'total LLM cost' },
      ],
      pullQuote: 'The top 10 signals account for 68% of fear spikes, despite making up just 5% of the 207-term lexicon.',
      overview: {
        title: 'The Power Law of Horror',
        content: 'Horror follows a power law. Atmospheric elements like "dark" and "night" set the mood, but a handful of elite signals (scream, blood, kill, knife, death) drive most of the actual scares. Across 11,204 signal occurrences in 9,760 scenes, the top 10 signals accounted for 68% of all fear spikes, despite making up just 5% of our 207-term lexicon. The site turns that finding into nine interactive D3.js visualizations.'
      },
      motivation: {
        title: 'Why Horror?',
        content: 'Horror is uniquely suited to data analysis because its effectiveness lives in mood, pacing, and signal rather than plot logic. Streaming platforms make billion-dollar decisions on what scares people, and yet most analysis is qualitative. We wanted to see if you could quantify the craft of horror (which words, beats, and structures actually work) and present that visually for screenwriters, directors, and curious viewers.'
      },
      pythonPipeline: {
        flow: [
          { label: 'Raw screenplay .txt files', detail: '129 IMSDb scripts' },
          { label: 'Scene segmentation', detail: 'regex on INT./EXT./FADE markers' },
          { label: 'Scene chunking', detail: '4 scenes per call · ~2k-token budget' },
          { label: 'GPT-4o-mini → GPT-4o → fallback', detail: 'three-tier hybrid extraction' },
          { label: 'JSON schema validation', detail: 'jsonschema, 0 to 1 scores, required fields' },
          { label: 'Flatten to CSV', detail: 'flatten_scene_row(), 5 master tables' },
          { label: 'D3 visualization datasets', detail: '6 viz-ready files in cleaner_datasets/' },
        ],
        sourceFiles: [
          {
            name: 'hybrid_horror_parser.py',
            purpose: 'Core AI parser. OpenAI calls, JSON validation, fallback logic, scene flattening, and CSV export.'
          },
          {
            name: 'run_full_analysis.py',
            purpose: 'Production wrapper. Points the parser at data/horror_screenplays/ and writes timestamped outputs.'
          },
          {
            name: 'requirements.txt',
            purpose: 'Python dependencies (openai, pandas, jsonschema, etc.).'
          },
          {
            name: 'config.env.example',
            purpose: 'Safe local API-key template. The actual key sits in config.env (gitignored).'
          },
        ],
        sampleJsonCaption: 'What the AI returns per scene',
        sampleJson: `{
  "scene_index": 0,
  "heading": "INT. BASEMENT - NIGHT",
  "location": "BASEMENT",
  "time_of_day": "NIGHT",
  "characters": ["LAURIE", "MICHAEL"],
  "dialogue_stats": {
    "lines": 12,
    "words": 140,
    "question_rate": 0.25,
    "exclamation_rate": 0.08,
    "avg_line_words": 11.7
  },
  "action_stats": {
    "words": 210,
    "stage_directions": 9
  },
  "horror_signals": {
    "night": 1,
    "dark": 2,
    "blood": 0,
    "scream": 1
  },
  "tension_score": 0.82,
  "fear_emotion": 0.74,
  "sentiment": -0.63,
  "scene_summary": "A character moves through a dark basement while a threat closes in."
}`,
      },
      methodology: {
        title: 'The Python Pipeline',
        steps: [
          {
            phase: 'Why AI here?',
            description: 'Hand-coding 129 screenplays scene by scene (recording location, time of day, characters, dialogue/action mix, horror vocabulary, emotional tone) is consistent at small scale but slow and unrepeatable at corpus scale. The pipeline uses an LLM to produce structured computational annotations across all 9,760 scenes with the same prompt, then validates each response against a strict JSON schema so the data downstream looks the same whether it came from gpt-4o-mini, gpt-4o, or a conservative fallback row.'
          },
          {
            phase: 'Screenplay ingestion + scene segmentation',
            description: 'Walked the input directory to collect 129 .txt screenplays (skipping the `downloaded_files.json` metadata file). The `split_scenes_heuristic()` parser normalizes line endings and scans for screenplay markers (INT./EXT., FADE IN/OUT, CUT TO, DISSOLVE TO, numbered scene dividers, CONTINUED), filters anything under 50 words to remove fragments and page artifacts, and truncates scenes above 2,000 words before model batching. Result: 9,760 cleanly-bounded scenes ready for AI analysis.'
          },
          {
            phase: 'Hybrid AI strategy: three-tier fallback',
            description: 'Tier 1: GPT-4o-mini with temperature 0, max_tokens 1500, response_format JSON object, handling 99.965% of scenes. Tier 2: GPT-4o fallback only after Tier 1 fails twice on retry, picking up the remaining edge cases. Tier 3: a conservative fallback record (Unknown location/time, zeroed signals, tension/fear=0.5, sentiment=0) preserves row structure when both models fail. Real-world fallback rate: 0.035% across 9,760 scenes.'
          },
          {
            phase: 'Parallel processing for throughput',
            description: 'ThreadPoolExecutor at the script level (max_workers=6) plus a second ThreadPoolExecutor inside each script for chunks (max_workers=3). Scenes are batched at up to 4 per chunk with a ~2,000-token budget per request, estimated at one token per four characters. Full 129-film corpus processes in under three hours for $2.28 total, 96.5% cheaper than running GPT-4o on everything.'
          },
          {
            phase: 'Prompt engineering + JSON validation',
            description: 'The prompt builder injects film title, scene indices, and raw text (each scene truncated to 300 words inside the prompt) alongside a compact example object and a hard instruction: "Return ONLY valid JSON. No explanations, no markdown, no extra text." Post-call cleanup trims whitespace, strips anything before the first `{` and after the last `}`, then runs `json.loads()`. A `jsonschema` validator enforces required fields, integer scene indices, string-array characters, non-negative dialogue/action counts, fear/tension in 0–1, sentiment in −1 to 1, and no extra top-level fields. Same-model retry up to twice before advancing tiers.'
          },
          {
            phase: 'Horror signal detection: 6-family lexicon',
            description: 'Each scene is scored against a fixed lexicon of 207 horror terms collapsing to 187 unique hs_* columns across six families: Atmosphere & Setting (night, dark, fog, basement, cabin, woods, cemetery, abandoned), Sound & Voice (scream, whisper, moan, gasp, shriek, howl, heartbeat, footsteps), Threats & Violence (blood, knife, gun, weapon, blade, chainsaw, stab, brutal, death), Supernatural (ghost, demon, possessed, spirit, witch, curse, haunted), Psychological (fear, panic, dread, paranoid, disturbed, terrifying), and Movement (chase, run, stalk, pursue, hide, escape, trapped). Top signals by raw count: night 3,694, blood 1,460, death 1,213, scream 1,187. Top by fear impact: scream +0.691, blood +0.562, death +0.438, night +0.297.'
          },
          {
            phase: 'Emotional scoring on calibrated 0–1 scales',
            description: 'Tension is rubric-anchored: 0–0.2 calm, 0.3–0.5 unease, 0.6–0.8 high, 0.9–1.0 extreme suspense. Fear follows the same rubric (little/none → intense terror). Sentiment runs −1 to +1. API temperature is held at 0 throughout, since this is an extraction task: consistency matters more than creative variation. Production averages across all 129 films: tension 0.436, fear 0.310.'
          },
          {
            phase: 'Dialogue + action structural analysis',
            description: 'Alongside emotion, the model estimates structural metrics per scene: dialogue lines, dialogue words, question rate, exclamation rate, average line length, action words, and stage-direction count. Lets us separate talk-heavy scenes from action-heavy ones and powers the "silence amplifies dread" correlation later in the analysis (−0.34 between dialogue density and tension).'
          },
          {
            phase: 'Flattening + visualization-ready datasets',
            description: '`flatten_scene_row()` converts the nested JSON into flat CSV columns (`dialogue_stats.lines` → `dialogue_lines`, `horror_signals.blood` → `hs_blood`, character arrays joined by pipes). Five master CSVs come out: scenes_detailed (9,760×204), horror_signals (9,760×190), emotional_analysis (9,760×7), dialogue_analysis (9,760×8), and a 1-row analysis_summary with run totals. These get cleaned into six viz-ready files (viz1_horror_signals_by_film, viz2a_tension_journey, viz2b_fear_journey, viz3_horror_effectiveness, viz4_film_comparison, viz5_horror_categories) for D3 consumption.'
          },
          {
            phase: 'IMDb metadata integration',
            description: 'Joined screenplay data with IMDb ratings, votes, cast, and duration using a standardized "title + year" join key. Powers the Rating Constellation correlation between horror craft and audience reception, exposing the −0.245 correlation that says technical horror chops don\'t guarantee a high IMDb score.'
          }
        ]
      },
      keyFindings: [
        {
          stat: '68%',
          title: 'Elite signals drive fear',
          description: 'The top 10 signals (scream, blood, kill, knife, death, shadow, fear, dark, silent, night) account for 68% of fear spikes above 0.70, yet make up only 5% of the lexicon. "Scream" appears in 9% of scenes but adds +0.37 fear. "Dark" appears in 38% but adds only +0.18. Strategic deployment beats scattering.'
        },
        {
          stat: '73%',
          title: 'Sustained unease beats constant terror',
          description: 'Average tension (0.52) consistently exceeds average fear (0.41). 73% of scenes lead with tension over fear. Effective horror maintains baseline unease and punctuates it with shock moments. Valleys make peaks feel higher.'
        },
        {
          stat: '−0.34',
          title: 'Silence amplifies dread',
          description: 'Scenes with low dialogue ratios (< 0.30) showed 23% higher tension than dialogue-heavy scenes (> 0.70). Correlation: −0.34. Letting sounds, visuals, and pauses do the work outperforms exposition.'
        },
        {
          stat: '75–90%',
          title: 'Fear clusters toward the climax',
          description: 'Across 129 films, 28% of fear spikes happen in the third quarter and 29% in the final quarter. Most films reserve their highest fear peak (> 0.80) for the 75–90% runtime window. Horror follows surprisingly consistent pacing.'
        }
      ],
      visualizations: [
        {
          title: 'Blood Flow of Horror',
          description: 'Sankey diagram tracing how the six signal families (Audio, Visual, Pace, Threat, Setting, Psyche) branch into individual horror terms. Stream thickness encodes frequency; node brightness encodes fear impact.',
          insight: 'Visualizes the power law on first glance: atmospheric signals flood the screen while elite ones thread through narrowly.',
          image: '/projects/anatomy-of-fear/01-blood-flow.png',
          imageFit: 'contain'
        },
        {
          title: 'Heartbeat of Terror',
          description: 'Fear progression across normalized film runtime, animated as a live BPM monitor. Skull markers flag peak terror moments (fear > 0.70).',
          insight: 'Most films hover at moderate fear (0.3–0.5) with rare spikes near the climax. Pacing beats intensity.',
          image: '/projects/anatomy-of-fear/02-fear-journey.png',
          imageFit: 'contain'
        },
        {
          title: 'Mapping the Spikes',
          description: 'Multi-film timeline with tombstone markers for fear spikes and lantern markers for tension spikes. Compare any subset of films side by side.',
          insight: 'Lanterns clustered around tombstones create the best scares; jump scares without buildup fade fast.',
          image: '/projects/anatomy-of-fear/03-spikes.png',
          imageFit: 'contain'
        },
        {
          title: 'The Ladder of Fear',
          description: '3×3 Markov transition matrix between Calm, Unease, and Panic states. Cell darkness encodes transition probability.',
          insight: 'Horror prefers gradual climbs (Calm → Unease → Panic) over sudden jumps. Once a scene reaches Panic, it tends to stay there.',
          image: '/projects/anatomy-of-fear/04-state-machine.png',
          imageFit: 'contain'
        },
        {
          title: 'What Actually Works',
          description: 'Bubble chart plotting signal frequency against emotional impact. Color encodes shock-heavy (red) vs tension-heavy (blue).',
          insight: 'A clear split between common atmospheric signals and rare-but-powerful elites, and any bubble unlocks a full dossier on its signal.',
          image: '/projects/anatomy-of-fear/05-effectiveness.png',
          imageFit: 'contain'
        },
        {
          title: 'Impact Dripline',
          description: 'Ranked bar chart sorting all 207 signals by combined fear + tension impact. The steep drop-off curve makes the power law impossible to miss.',
          insight: 'Horror impact follows a power law, not a normal distribution: a small head, a long tail.',
          image: '/projects/anatomy-of-fear/06-dripline.png',
          imageFit: 'contain'
        },
        {
          title: 'Does Scary Equal Good?',
          description: 'Scatter of horror impact score against IMDb rating across all 129 films, with correlation line and rating-range filters.',
          insight: 'Technical horror craft does not guarantee audience acclaim (correlation: −0.245). Story and character carry more weight than craft alone.',
          image: '/projects/anatomy-of-fear/07-rating-impact.png',
          imageFit: 'contain'
        },
        {
          title: 'Horror Fingerprint',
          description: '6-axis radar comparing each film\'s balance across the six signal families. Slider-driven recommender suggests films matching your preferred horror mix.',
          insight: 'No single recipe wins. Supernatural films lean Psyche/Setting; slashers lean Pace/Threat. Specialists and generalists both succeed.',
          image: '/projects/anatomy-of-fear/08-radar.png',
          imageFit: 'contain'
        },
        {
          title: 'Film Dossiers',
          description: 'Browsable gallery of every analyzed film with quick access to its full breakdown: runtime fear curve, top signals, family balance, IMDb context.',
          insight: 'A jumping-off point for deep dives: sort, filter, and compare across the whole corpus.',
          image: '/projects/anatomy-of-fear/09-movie-gallery.png',
          imageFit: 'contain'
        }
      ],
      tools: [
        { name: 'D3.js v7', purpose: 'Custom interactive visualizations: Sankey, radar, live BPM animation, all responsive across desktop and mobile.' },
        { name: 'GPT-4o-mini + GPT-4o', purpose: 'Hybrid LLM pipeline. Primary parser at 99.97% success; fallback only on the hardest 0.035% of scenes. Total cost $2.28.' },
        { name: 'Python (pandas, NumPy)', purpose: 'End-to-end data pipeline: deduplication, scene boundary detection, signal counting, validation, IMDb joins.' },
        { name: 'Observable Framework', purpose: 'Scrollytelling narrative wrapping the nine visualization scenes with client-side data caching.' },
        { name: 'Playwright', purpose: 'Automated screenshot capture for documentation and the visualization gallery.' }
      ],
      impact: {
        title: 'Real-World Applications',
        content: 'For screenwriters and directors: a quantitative reference for how to deploy elite signals at climactic moments and what fear-pacing structures actually land.\n\nFor film students and researchers: the nine scenes turn qualitative film theory into something you can interact with. Compare slashers to psychological horror, study how 1980s pacing differs from 2010s, see where outliers sit.\n\nFor streaming platforms: a template for correlating craft signals with audience reception, identifying underserved horror recipes, and surfacing films with unique signal fingerprints.\n\nMethodologically: the project demonstrates a reusable LLM screenplay-analysis pipeline (prompt templates, lexicon, emotion scoring framework) that scaled to 129 films and 10K scenes for under three dollars.'
      },
      limitations: {
        title: 'What this is, and what it isn\'t',
        items: [
          'AI-generated scores are computational annotations, not human-coded ground truth. Treat them as comparative signals, not exact measurements.',
          'Different model versions of gpt-4o-mini / gpt-4o can produce slightly different outputs for the same scene. The committed CSVs are pinned to one production run.',
          'OCR errors and inconsistent screenplay formatting affect scene splitting; some scenes break in non-ideal places.',
          'Signal counting is lexical, so a word like "dark" gets a hit whether it\'s literal, metaphorical, or atmospheric. Context is approximated, not understood.',
          'Fear and tension are inherently subjective. The 0–1 rubrics were calibrated against samples, but reasonable raters could still disagree on edge cases.',
          'The corpus is 129 horror screenplays from one source (IMSDb). Findings are descriptive of this collection, not the genre in full.',
        ]
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
    description: 'A high-fidelity prototype reimagining Google Drive as a proactive AI partner instead of passive storage. Six signature scenarios (Syllabus-to-Schedule, Smart Reading Pack, Living Concept Maps, AI Meeting Chief of Staff, Executive Briefs, Work Rhythm Optimiser) demonstrate how an embedded AI layer can replace the manual-upload chore that defines ChatGPT and Copilot. User research with 100+ students and professionals exposed the real lever: emotional benefits (anxiety down, confidence up) lift adoption far more than time savings alone.',
    skills: ['Product Management', 'Product Design', 'Prototyping', 'Agentic Design', 'Agents', 'User Interface Design', 'Rapid Prototyping', 'Large Language Models (LLM)'],
    image: '/projects/drive-companion/00-hero.png',
    links: [
      {
        type: 'demo',
        url: 'https://mgmc11-google-drive-companion-demo.netlify.app/',
        label: 'Live prototype'
      },
      {
        type: 'github',
        url: 'https://github.com/Calvin-Liew/mgmc11-google-companion-prototype',
        label: 'Source on GitHub'
      }
    ],
    featured: true,
    extendedContent: {
      stats: [
        { value: '6', label: 'signature scenarios' },
        { value: '100+', label: 'users researched' },
        { value: '$65.94B', label: 'AI market by 2032' },
        { value: '2', label: 'personas served' },
      ],
      pullQuote: 'Microsoft Copilot is file-centric. ChatGPT is prompt-centric. Companion is people-centric.',
      overview: {
        title: 'Passive storage, made proactive',
        content: 'Google Drive Companion treats the Drive ecosystem as the substrate for AI, not a separate destination. Instead of asking users to upload files into ChatGPT or Copilot, Companion lives where the files already are: reading syllabi to schedule the semester, condensing PDFs into study packs, stitching meeting notes into action items, and surfacing context before deadlines arrive. The prototype is a full interactive demo across two personas (student, professional) and six core scenarios, designed to test whether an AI layer embedded inside Drive feels more natural than the upload-first competition.'
      },
      motivation: {
        title: 'The product gap, not the market gap',
        content: 'The interesting question is not how big the AI productivity market is. It is what the existing players keep getting wrong. ChatGPT lives in a different tab from your files. Copilot is anchored to a single document at a time. Notion offers tools but asks you to maintain them. Across all three, the user is the one wiring up the connection between the AI and the work. Companion\'s product bet is that the next surface for AI is not "another tool you call when you need it" but "an assistant that lives inside the place your work already lives." Everything that follows — the persona model, the consent flow, the six scenarios, the in-Drive surface — comes from that single product premise.'
      },
      decisions: [
        {
          decision: 'Build in-house, not buy or partner',
          framework: 'Resource-Based View · VRIN',
          reasoning: 'Run through VRIN, Google\'s combination of custom TPU infrastructure, deep Workspace integration, DeepMind/Google Research, and existing user trust is valuable, rare, inimitable, and non-substitutable in combination. Any external partner has one or two of those legs, never all four. An integration deal would also hand the same structural advantage to whichever competitor signed the next quarter. The make decision is not about cost; it is about which moat compounds.'
        },
        {
          decision: 'People-centric, not file-centric',
          reasoning: 'Copilot anchors to documents. ChatGPT anchors to prompts. Both leave the user wiring up the connection between their work and the AI. Companion anchors to what the user is actually trying to accomplish — survive a semester, run a project, prep for a meeting — and pulls the relevant files in from that intent. Same kind of AI work, but the entry point is a person, not a file. Every scenario in the prototype (Syllabus-to-Schedule, Meeting Chief of Staff, Work Rhythm Optimiser) starts from a goal, not a file selection.'
        },
        {
          decision: 'Permission-first onboarding',
          reasoning: 'User research showed 70% comfort with AI summarization, conditional on transparency. So Companion activates one scenario at a time during onboarding with explicit per-folder consent, and a visibility dashboard shows current access at any time. The slower start hurts day-one activation metrics, but on a product where trust is the long-run constraint, retention beats activation. Blanket scanning of all Drive content was on the table and would have been faster to implement — and would have killed the product on the first privacy headline.'
        },
        {
          decision: 'Single product, dual persona',
          reasoning: 'A "Companion for Education" and a "Companion for Work" were both on the table. The catch: many users move between personas. A graduating student becomes a professional in twelve months; an exec takes an online course in the spring. Splitting the product would force a migration at exactly the moment the user is already context-switching. One product with persona detection (student / professional) retains the user across the transition and keeps a single codebase to evolve.'
        },
        {
          decision: 'Embedded in Drive, not a standalone app',
          reasoning: 'A separate "Drive Companion" app on iOS and Android was the easy default. But the entire pitch is that Companion lives where the files already do — the moment it becomes a separate app, it inherits the upload chore that defines ChatGPT and Copilot. Embedded means Companion shows up inside the Dashboard, the doc preview, the sheet sidebar, the meeting summary card. Mobile happens because Drive happens on mobile, not because Companion ships a new app.'
        },
        {
          decision: 'Three-tier pricing with a free trial',
          framework: 'Mirrors Google One tiers',
          reasoning: 'Basic at $4.99 makes student adoption frictionless and matches the price point students already pay for Spotify, YouTube Premium, etc. Plus at $9.99 unlocks the multimodal study features (reading packs, flashcards, deadline-aware prep) that justify the upgrade once a student feels the workload. Pro at $19.99 reserves the AI Meeting Chief of Staff, dashboard generation, and risk alerts for professionals where the ROI clearly absorbs the price. A 1-month free trial across all tiers lowers the risk of paying for something the user has not learned to trust yet.'
        }
      ],
      keyFindings: [
        {
          stat: '70%',
          title: 'Privacy gates the entire AI relationship',
          description: '70% of respondents were comfortable letting AI summarize their files, but only with explicit consent. Trust required clear permission flows, a simple visibility dashboard, and per-feature opt-in. This shaped the onboarding: users activate only the scenarios matching their goals, with file-by-file scope control instead of blanket Drive access.'
        },
        {
          stat: '2 personas',
          title: 'Students and pros share the same pain',
          description: 'Information overload + tight deadlines is the universal complaint. Students stress over syllabus shifts, multi-course juggling, and unfamiliar reading volume. Professionals report meeting overload, scattered action items, and the hidden cost of context switching. The remedy is identical: proactive organization, not reactive search.'
        },
        {
          stat: 'Emotion',
          title: 'Anxiety reduction beats efficiency every time',
          description: 'When ranking feature value, users consistently picked the scenarios that prevented last-minute panic over the ones that promised speed. Deadline-Aware Exam Prep and Meeting Chief of Staff topped both lists, not because they save more minutes, but because they remove the worry that something will fall through the cracks. The brand position is calm and confidence, not just productivity.'
        },
        {
          stat: '0 uploads',
          title: 'Embedded beats standalone',
          description: 'ChatGPT and Notion offer more raw capability but require manual setup and ongoing care. Companion\'s "no uploads required, runs where your files already live" pitch tested significantly higher than feature-rich rivals in desirability scoring. Users want intelligence that adapts to existing habits, not a new app to maintain.'
        }
      ],
      features: [
        {
          title: 'Syllabus-to-Schedule Pack',
          description: 'Parses a course syllabus and generates a week-by-week folder structure, populates Google Calendar with every deadline, and stages a structured to-do list. If the instructor shifts a date, Companion rebalances the entire semester and notifies the student.',
          insight: 'Solves the "first week of the semester" overwhelm. Reduced planning stress by 60% in user testing.',
          image: '/projects/drive-companion/01-syllabus-to-schedule.png',
          imageFit: 'contain'
        },
        {
          title: 'Smart Reading Pack',
          description: 'Converts dense PDFs into the format the student actually wants: a one-page summary, a slide deck for skim review, or a flashcard set staged in Sheets. Pick a modality; Companion stages it inside the same folder.',
          insight: 'Cuts a 60-page reading into something digestible without losing the source. Reading-prep time drops 3x in pilots.',
          image: '/projects/drive-companion/02-smart-reading.png',
          imageFit: 'contain'
        },
        {
          title: 'Living Concept Maps',
          description: 'Stitches lecture notes, readings, and lab outputs across a course into a single living concept map. Updates automatically as new files land in the course folder, so the map reflects the most recent understanding.',
          insight: 'Mirrors how students actually study: connecting concepts across sources instead of memorizing in isolation.',
          image: '/projects/drive-companion/03-concept-maps.png',
          imageFit: 'contain'
        },
        {
          title: 'AI Meeting Chief of Staff',
          description: 'During and after a meeting, Companion captures decisions, action items, owners, and next steps; drafts the follow-up email; updates the project tracker in Sheets; and schedules deliverable reminders. The user reviews, edits, sends.',
          insight: 'Removes the multitasking penalty: leaders can stay present in the room instead of typing notes.',
          image: '/projects/drive-companion/04-meeting-chief.png',
          imageFit: 'contain'
        },
        {
          title: 'Executive Briefs',
          description: 'Takes scattered slide decks, status docs, and KPI sheets and distills them into a leadership-ready brief. Companion summarizes risks, surfaces decisions needed, and pre-drafts the talking points before the next exec review.',
          insight: 'Closes the gap between "doing the work" and "telling leadership about the work" without a separate prep meeting.',
          image: '/projects/drive-companion/05-executive-briefs.png',
          imageFit: 'contain'
        },
        {
          title: 'Work Rhythm Optimiser',
          description: 'Reads calendar patterns to find overloaded days, blocks protected focus time for deep work, and suggests micro-shifts before burnout shows up. Flags compressed deadlines and meeting fatigue to managers as a signal, not an interruption.',
          insight: 'Treats sustainable rhythm as a first-class product surface. Pilot users reported 35% lower stress.',
          image: '/projects/drive-companion/06-work-rhythm.png',
          imageFit: 'contain'
        }
      ],
      tools: [
        {
          name: 'Google Gemini',
          purpose: 'Powers summarization, structured extraction, and natural-language interactions. Multimodal context across Docs, Sheets, Slides, and Calendar without leaving the Workspace surface.'
        },
        {
          name: 'Figma + Vite prototype',
          purpose: 'Two-stage design: Figma high-fidelity flows for stakeholder validation, then a React + TypeScript + Vite interactive prototype that handles persona toggling, scenario walkthroughs, and the live demo.'
        },
        {
          name: 'Product frameworks',
          purpose: 'VRIN (Valuable, Rare, Inimitable, Non-substitutable) for competitive advantage, Resource-Based View for build-vs-buy, and Keller\'s CBBE for brand positioning vs ChatGPT, Copilot, and Notion.'
        },
        {
          name: 'User research',
          purpose: 'Qualitative interviews with students and professionals, quantitative surveys on feature desirability and privacy posture, plus usability sessions on the prototype. Findings drove feature prioritization and the consent-first onboarding flow.'
        },
        {
          name: 'Workspace integrations',
          purpose: 'Native APIs into Drive, Docs, Sheets, Calendar, and Meet. Permissioned file access, deadline sync across products, and inline insights inside the surfaces users already work in.'
        }
      ],
      impact: {
        title: 'Where the product lands strategically',
        content: 'Drive Companion proposes a strategic shift: cloud storage stops being a passive vault and becomes the active surface for AI productivity. By embedding intelligence inside the platform that already holds a billion users\' most important documents, Google removes the upload chore that defines its competitors and locks in a structural advantage the standalone AI players cannot replicate.\n\nProjections in the deck estimate 3M paid users in Year 1 (≈$324M revenue) and 9M in Year 2 (≈$971M), built on the existing Drive base rather than a cold-start audience. The VRIN analysis ratified the moat: TPU infrastructure, deep Workspace integration, and existing user trust are the three legs of a defensible position.\n\nThe project also rewired my own product instincts. User research showed that emotional benefits, feeling calm, supported, and unworried, drive adoption far more reliably than functional efficiency. That re-framed every downstream choice: feature priority, scenario copy, onboarding language, and the brand voice itself.'
      },
      limitations: {
        title: 'What this prototype is, and what it isn\'t',
        items: [
          'High-fidelity interactive prototype, not a production product. Scenarios are scripted demos, not live AI calls against real user files.',
          'User research was qualitative-leaning (100+ participants across surveys and interviews), not a representative panel. Findings indicate direction, not population-level truth.',
          'Financial projections in the deck are modelled estimates based on Drive\'s existing scale and analogues like Copilot, not committed forecasts.',
          'Privacy and consent UX is designed but not security-audited. Production would need formal review for data residency, retention, and per-file ACL semantics.',
          'The prototype assumes Drive-native deployment. A standalone version would need to solve the upload problem differently and would lose much of Companion\'s structural advantage.',
        ]
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
    description: 'A brand and UX redesign of The Music Pathways Project (TMPP), a UofT Scarborough initiative that helps high-school and post-secondary students see music careers as more than "perform, teach, or quit." Replaced static PDFs and a generic band photo with a confident homepage, an 8-pathway interactive preview, dual audience entry points for students and educators, and a 3-step discovery flow. Built on CBBE branding theory and consumer behavior principles to reduce cognitive load and reframe the brand around possibility.',
    skills: ['Product Management', 'Product Design', 'UI/UX', 'Interactive Design', 'Brand Strategy', 'CBBE Framework', 'Consumer Behavior'],
    image: '/projects/music-pathways/00-hero.png',
    links: [
      {
        type: 'live',
        url: 'https://calvin-liew-music-pathways.netlify.app/',
        label: 'Live prototype'
      },
      {
        type: 'github',
        url: 'https://github.com/Calvin-Liew/mgmc11-the-music-pathways-project-redesign',
        label: 'Source on GitHub'
      }
    ],
    featured: true,
    extendedContent: {
      stats: [
        { value: '8', label: 'career pathways' },
        { value: '30+', label: 'example roles surfaced' },
        { value: '100%', label: 'research-informed' },
        { value: '2', label: 'audience entry points' },
      ],
      pullQuote: 'Most students think their options are perform, teach, or quit. The redesign starts by saying out loud that the industry is much bigger than that.',
      overview: {
        title: 'Reframing what a music career can look like',
        content: 'TMPP\'s research showed a gap between how students picture music careers and how the industry actually works today. Sound design, music technology, digital content, community arts, arts management, music therapy — none of it surfaced clearly in the old site. The redesign turns that information into something students can actually navigate: a confident hero that names the reframe out loud, an 8-pathway preview that cycles through the full scope on first load, dual entry points for students and educators, and a 3-step discovery flow that gets people from "I don\'t know my options" to "here\'s what to do next."'
      },
      motivation: {
        title: 'From PDFs to a guided discovery experience',
        content: 'The original site put career information behind dense PDFs and an isolated keyword chatbot. Students had to scroll, decode unfamiliar job titles, and make their own connections. The homepage led with a single band photo, which quietly reinforced the misperception that TMPP was a performance platform. This redesign applies Keller\'s CBBE pyramid and core consumer behavior principles to lower the cognitive load: visual hierarchy that surfaces the full pathway set instantly, dual audience tracks so students and educators self-route, and a step-by-step structure that builds confidence rather than overwhelm.'
      },
      decisions: [
        {
          decision: 'Show all 8 pathways in the first viewport',
          reasoning: 'The original homepage led with a band photo. Students who saw it assumed TMPP was a performance platform and never scrolled past. The redesigned hero cycles through all eight career clusters (performance, education, business, production, publishing, health sciences, entertainment law, media) as the auto-rotating preview card. By the time the user has finished reading the tagline, they have already seen the reframe in motion. The breadth is not described, it is demonstrated.'
        },
        {
          decision: 'Tempo (a metronome) replaces Jay (a blue jay)',
          framework: 'Keller\'s offensive brand element criteria',
          reasoning: 'The original mascot was Jay, a blue jay character. Friendly, but a blue jay doesn\'t actually say "music." The mascot also had to read as music without forcing one culture\'s notation system on a multicultural Canadian student body — a treble clef or piano keys would have quietly excluded students from non-Western musical traditions. A metronome is universal across genres and cultures, and it just means time and pace. Tempo\'s LED-faced design plus the U of T navy + crimson palette satisfies Keller\'s offensive criteria (memorable, meaningful, likable) and finally gives the chatbot a face that\'s on-brief.'
        },
        {
          decision: 'Interactive map as the primary surface, chatbot as the supporting voice',
          reasoning: 'The original led with a keyword chatbot that operated in isolation from the resources. Students had to phrase questions correctly to get answers, and the answers were text-only with no visual context. The redesign inverts that hierarchy: the interactive pathway map is the primary way to explore, and the chatbot exists alongside it to highlight clusters that match a student\'s plain-language interest. The map gives students agency; the chatbot gives them help. Neither alone would have replaced the PDFs.'
        },
        {
          decision: 'One site, two self-routing audiences',
          reasoning: 'Students need to discover unfamiliar roles. Educators need resources they can hand to a class. Building two separate sites would have doubled the maintenance and split the brand. Instead, the homepage offers a clear two-card split — For Students and For Educators — that lets each audience self-route after the shared hero. Same brand, same content backbone, audience-specific copy and CTAs from the moment of choice forward.'
        },
        {
          decision: 'Lightweight prototype chatbot, not a production AI build',
          reasoning: 'A full LLM-backed chatbot would have meant API costs, content safety review, and weeks of evaluation work for a course-scope prototype. The build uses keyword matching that triggers the same visual highlighting the production version would do. It demonstrates the intended UX — student types interest, map responds, Tempo speaks — without the infrastructure overhead. The right move when the goal is to validate the experience design, not to ship to thousands of users on day one.'
        },
        {
          decision: 'CBBE pyramid as the page structure',
          framework: 'Keller\'s Customer-Based Brand Equity',
          reasoning: 'The page sections aren\'t arranged by convention; they\'re arranged by CBBE rung. Salience in the hero (full pathway set visible immediately). Performance + imagery in the three pillars (Research-Informed, Curriculum-Connected, Student-Centered). Judgments in the stats strip (30+ pathways, 100% research-informed). Feelings in the dual-audience care. Resonance in the 3-step discovery flow that drives return visits. Every section earns its place by doing brand-equity work, not by checking a layout box.'
        }
      ],
      beforeAfter: {
        title: 'Before and after',
        intro: 'Captured from the live original site at musicpathways.ca, paired side-by-side with the redesigned screens to show the actual delta on the same surfaces.',
        pairs: [
          {
            label: 'Homepage',
            note: 'A static band photo plus a paragraph block becomes an animated 8-pathway preview, a confident tagline that names the reframe ("Discover where music can take you"), and a clear path into the explorer.',
            before: '/projects/music-pathways/before-after/original-homepage.png',
            after: '/projects/music-pathways/before-after/homepage-hero.png',
          },
          {
            label: 'Chatbot and explorer',
            note: 'A standalone "Welcome — I\'m Jay!" chatbot modal becomes Tempo the metronome, sitting alongside an interactive pathways map that visualizes career clusters and surfaces example careers per cluster.',
            before: '/projects/music-pathways/before-after/original-chatbot.png',
            after: '/projects/music-pathways/before-after/pathways-explorer.png',
          },
          {
            label: 'Mobile homepage',
            note: 'The mobile experience gets the same reframe end-to-end — same hero, same pathway preview, same tagline emphasis — responsive across screen sizes instead of a different IA on phone.',
            before: '/projects/music-pathways/before-after/original-mobile-home.png',
            after: '/projects/music-pathways/before-after/mobile-home.png',
          },
          {
            label: 'Mobile chatbot / explorer',
            note: 'Jay\'s welcome modal on mobile becomes Tempo plus a touch-friendly version of the pathways map, scaling the desktop interaction model down without losing functionality.',
            before: '/projects/music-pathways/before-after/original-mobile-chatbot.png',
            after: '/projects/music-pathways/before-after/mobile-pathways-explorer.png',
          },
        ],
      },
      keyFindings: [
        {
          stat: '8 pathways',
          title: 'The reframe has to happen on first load',
          description: 'If students only see "Performance" they assume the rest of the platform follows. The rotating 8-pathway preview in the hero exists to break that assumption before they scroll, by making the scope of music careers visible inside the first viewport.'
        },
        {
          stat: '0 PDFs',
          title: 'Static documents kill exploration',
          description: 'Dense PDFs and unfamiliar terminology raise search costs and discourage browsing. Replacing them with grouped, visual pathways turns a research task into something closer to a guided tour, supporting both self-directed and structured exploration.'
        },
        {
          stat: '2 audiences',
          title: 'One funnel doesn\'t fit students and educators',
          description: 'Students need to discover unfamiliar roles. Educators need ready-to-share resources for their classrooms. Splitting the entry point reduces friction for both and signals the brand serves more than one stakeholder, deepening category salience.'
        },
        {
          stat: 'Confidence',
          title: 'Reduce anxiety, not just steps',
          description: 'Research kept surfacing that students value tools that build confidence over tools that save time. The redesign moves up Keller\'s means-end chain from "find the right document" to "feel supported deciding what to explore next" — the brand promise is calm and possibility, not just information.'
        }
      ],
      features: [
        {
          title: 'Redesigned homepage banner',
          description: 'Confident navy gradient hero with the tagline "Discover where music can take you," typographic emphasis on "can take you," and a side-by-side rotating pathway preview that auto-cycles through all 8 career clusters. Replaces the static band photo that had been quietly defining the brand as a performance platform.',
          insight: 'Brand salience: the homepage finally communicates the full scope of music careers in the first viewport, instead of three scrolls later. CBBE brand performance + imagery in one move.',
          image: '/projects/music-pathways/00-hero.png',
          imageFit: 'contain'
        },
        {
          title: 'Stats + credibility strip',
          description: 'A clean three-stat band right under the hero: 30+ Career Pathways · 100% Research-Informed · Curriculum-Aligned. Anchors the brand promise in evidence before students even read the explanatory section underneath.',
          insight: 'Brand judgments: pre-loads credibility (research + curriculum alignment) so the rest of the page is read with trust, not skepticism. Built to satisfy both student and parent audiences.',
          image: '/projects/music-pathways/01-stats.png',
          imageFit: 'contain'
        },
        {
          title: 'Three pillars of the brand',
          description: 'Research-Informed, Curriculum-Connected, Student-Centered — three cards positioned next to the "What Is The Music Pathways Project?" paragraph. Each pillar gets a meaningful icon, a one-line label, and a sentence of substantiation.',
          insight: 'Brand meaning: makes the abstract "research-informed UofT initiative" tangible by attaching it to three concrete commitments students and educators can verify on their own.',
          image: '/projects/music-pathways/02-pillars.png',
          imageFit: 'contain'
        },
        {
          title: 'Pathways explorer entry point',
          description: 'A standalone CTA section: "Explore Music Career Pathways" with the subtitle "More than \'perform, teach, or quit.\'" Direct invitation to dive into the explorer, anchored by the navy theme that ties back to the hero.',
          insight: 'Functions as a brand mantra in UI form: states the reframe in plain language so the marketing line and the actual UX entry point reinforce each other.',
          image: '/projects/music-pathways/03-pathways-cta.png',
          imageFit: 'contain'
        },
        {
          title: 'Dual-audience onboarding',
          description: 'Two-card split: "For Students" with a book icon and a graduation-focused message, and "For Educators" with a briefcase icon framing TMPP as a classroom resource. Each card has its own CTA so the two audiences never have to share a funnel.',
          insight: 'Lets the brand serve students and educators without compromise. Students get exploration; educators get curriculum tools. Both walk away feeling the site was made for them.',
          image: '/projects/music-pathways/04-audiences.png',
          imageFit: 'contain'
        },
        {
          title: 'Three-step discovery flow',
          description: '"How It Works" stripped to three numbered steps: Explore Pathways → Connect to Programs → Plan Next Steps. Each step has a one-line description that turns "career discovery" into a concrete, repeatable process.',
          insight: 'Brand resonance: turns an open-ended question (what should I do with music?) into a structured experience. Students leave with a felt sense of "I know what to do next," which is the strongest driver of return visits.',
          image: '/projects/music-pathways/05-how-it-works.png',
          imageFit: 'contain'
        }
      ],
      tools: [
        {
          name: 'CBBE Framework',
          purpose: 'Keller\'s pyramid drove every design decision: salience (full pathway set in the hero), performance + imagery (visual hierarchy and pillar cards), judgments + feelings (research credibility, calm tone, dual-audience care), resonance (3-step structure that drives return visits).'
        },
        {
          name: 'Brand positioning + mantras',
          purpose: 'Internal mantras "Illuminate Pathways. Redefine Music. Empower Futures." and "Discover Pathways. Connect Music. Inspire Futures." kept tone consistent across copy. External tagline "Discover where music can take you" sits in the hero and recurs in the explorer CTA.'
        },
        {
          name: 'Consumer behavior principles',
          purpose: 'Reduced search costs (visual cluster preview replaces PDF hunting), cognitive load (3 pillars + 3 steps instead of one wall of text), and audience friction (split funnel so students and educators never have to share an onboarding).'
        },
        {
          name: 'Figma + React prototype',
          purpose: 'Designed in Figma for stakeholder review, then built as a Vite + React + Tailwind prototype deployed on Netlify so the interaction (rotating cards, animated branching lines, audience split) could be tested in-browser, not just on a still mockup.'
        },
        {
          name: 'AI illustration iterations',
          purpose: 'Used iterative AI prompting to develop the rotating pathway preview cards and visual styling for the explorer, aligning with TMPP\'s navy + crimson palette and the UofT brand context.'
        }
      ],
      impact: {
        title: 'What the redesign actually moves',
        content: 'The original TMPP site was correct but invisible. The information was research-informed, the careers were real, the support resources existed, but students would not have known any of that from the homepage. The redesign\'s job was not to invent content, it was to make the brand legible: the moment a student lands, they see the reframe ("more than perform, teach, or quit"), see the evidence (30+ pathways, 100% research-informed), and see the next step (explore, connect to programs, plan).\n\nApplying CBBE meant treating every section as one rung of the pyramid: salience in the hero, performance and imagery in the pillars, judgments in the stats strip, feelings in the dual-audience care, resonance in the discovery flow. Consumer behavior principles meant lowering search costs at every turn — visual instead of textual, grouped instead of listed, guided instead of open.\n\nFor my own product instincts, this project drove home that great branding is not decorative work. It is structural work: it decides which 8 things land in the first viewport, which audiences self-route without friction, and which sentence gets repeated across hero, explorer, and CTA so the brand promise is felt rather than declared.'
      },
      limitations: {
        title: 'What this redesign is, and what it isn\'t',
        items: [
          'High-fidelity prototype, not a fully production-replacement website. The live build covers the homepage, dual-audience entry, and the discovery flow; deeper pages (full explorer, chatbot, resource pages) are designed but not all fully implemented.',
          'The Tempo mascot and integrated AI chatbot are part of the design system and concept, but the public live build focuses on the brand and navigation reframe rather than the chatbot integration.',
          'User research informed feature priority and copy direction, but is qualitative-leaning at this scope (interviews + framework review). A larger panel would be needed before claiming statistical conclusions.',
          'Brand mantras and the dual-audience funnel reflect this brief; if TMPP adopted them, they would need stakeholder buy-in across the university and a longer review with the original team.',
        ]
      }
    }
  },
  {
    id: 'night-shift',
    title: 'The Night Shift: Visualizing Sleep, Stress, and Health',
    category: 'Data Analysis',
    dates: 'Oct 2025 - Nov 2025',
    organization: 'University of Toronto',
    description: 'An interactive D3.js data story that pushes back on a simple assumption: that your job is what determines your sleep. Three visualizations, one dataset of 374 people across 11 occupations, and a guided narrative that argues individual behavior and health context matter more than profession. A bubble landscape exposes stress variance within the same job. A Sankey diagram traces the path from physical activity to sleep quality. The Dream Lab animates BMI, heart rate, and sleep disorders with dots that pulse at each individual\'s resting heart rate.',
    skills: ['D3.js', 'JavaScript', 'HTML5', 'GitHub', 'Interaction Design', 'Data Visualization', 'Statistical Analysis'],
    image: '/projects/night-shift/00-hero.png',
    links: [
      {
        type: 'live',
        url: 'https://calvin-liew.github.io/a4-sleep-analytics/',
        label: 'Live data story'
      },
      {
        type: 'github',
        url: 'https://github.com/Calvin-Liew/a4-sleep-analytics',
        label: 'Source on GitHub'
      }
    ],
    featured: true,
    extendedContent: {
      stats: [
        { value: '374', label: 'people in the dataset' },
        { value: '11', label: 'occupations compared' },
        { value: '3', label: 'visualization scenes' },
        { value: '32.2pp', label: 'high vs low activity sleep gap' },
      ],
      pullQuote: 'Your job title does not define your sleep. Individual behavior and health context matter more than profession.',
      overview: {
        title: 'Reframing a familiar question',
        content: 'Every night, millions of us close our eyes hoping for rest, and a lot of us miss it. The easy story is that some jobs sleep well and other jobs do not. The data tells a more interesting one. The Night Shift walks through three perspectives, profession and stress, activity and sleep quality, and physiological health, and lets the user see that the strongest signals are not job titles at all. They are physical activity level, BMI category, resting heart rate, and sleep disorder status. The piece is built to be read like a magazine essay and explored like a tool.'
      },
      motivation: {
        title: 'From ranking jobs to reading individuals',
        content: 'A typical sleep dashboard ranks occupations and stops there. That framing is comforting (your job is the problem) but it is also wrong, or at least incomplete. The same profession can stretch across two hours of sleep duration and five full stress points. The redesign of the narrative was the most important design decision: instead of asking "which job sleeps best," the story asks "what actually moves your sleep," and then shows that movement, body composition, and heart rate explain more than the label on a business card. Every chart and every annotation is in service of that reframe.'
      },
      decisions: [
        {
          decision: 'Lead with the reframe, not a ranking',
          reasoning: 'The default move with an occupation-coded dataset is to sort professions by average sleep and call it a story. That framing flatters the dataset but lies to the user, because within-profession variance is enormous. The Night Shift opens with the question "does your job define your sleep?" and answers no on the very first scene. The whole reading experience is shaped by that bet: the bubble chart is structured so the user notices spread first and averages second.'
        },
        {
          decision: 'Three chart types for three different arguments',
          reasoning: 'Most data stories pick one chart family and stretch it. Each scene here makes a different kind of claim and gets a chart suited to that claim. The bubble landscape argues about variance, so it shows distribution. The Sankey argues about flow, so it shows where activity levels actually land in sleep buckets. The Dream Lab argues about physiology, so it animates individuals as living, pulsing dots. Using one chart for all three would have collapsed three arguments into one shape.'
        },
        {
          decision: 'Pulse-sync the Dream Lab dots to resting heart rate',
          reasoning: 'A scatter plot of BMI vs heart rate vs sleep disorder is informative but cold. Pulsing each dot at the individual\'s resting heart rate (64-86 bpm) reframes the chart from a statistical surface to a room full of bodies. It is a small piece of motion design that does outsized narrative work: the user feels that these are people, not points, and they remember the chart hours later. The animation also encodes data, faster pulse means higher resting heart rate, so it is not just decoration.'
        },
        {
          decision: 'Drill from occupation to individual on click',
          reasoning: 'The bubble landscape shows averages by profession, which is the storytelling problem we are trying to fight. Clicking a bubble breaks it open into the individual records inside, so the user sees with their own eyes that Nurse contains both 5.9 hour and 8.2 hour sleepers. The interaction makes the variance argument unavoidable. Removing the click would have left the chart vulnerable to the same misread we are trying to correct.'
        },
        {
          decision: 'Compute the narration from the dataset, not hardcode it',
          reasoning: 'Numbers in the captions (54.9% high activity to good sleep, 22.7% for low, 32.2pp gap, Nurse spans 2.3h) are computed at load time from the CSV. If a teammate later swaps the dataset or tweaks the bucket thresholds, the prose stays honest. It is a small engineering choice with a large editorial benefit, the story can never quietly diverge from the data.'
        },
        {
          decision: 'Filters and effect toggles on the Dream Lab, not on everything',
          reasoning: 'Letting the user filter every chart turns a guided story into a generic dashboard. The first two scenes are deliberately fixed so the argument lands. The Dream Lab earns its filters and toggles (sleep disorder type, heart rate range, BMI, pulse animation, motion trails, density aura, deep sleep mode) because by that point the user understands the framing and is ready to test their own hypothesis. Interactivity is a reward for getting through the argument.'
        }
      ],
      datasets: [
        {
          name: 'Sleep Health and Lifestyle Dataset',
          description: 'Public Kaggle dataset of sleep duration, sleep quality, daily steps, physical activity level, stress level, BMI category, blood pressure, resting heart rate, occupation, and sleep disorder status. Loaded directly in the browser as CSV and parsed with D3.',
          records: '374 individuals · 11 occupations · 13 columns'
        }
      ],
      methodology: {
        title: 'Three chapters, one through-line',
        steps: [
          {
            phase: 'Chapter I: the dataset',
            description: 'Set the scope before the argument: 374 people across 11 occupations, with an average of 7.1 hours of sleep, an average stress level of 5.4, sleep ranging 5.8 to 8.5 hours, and stress ranging 3 to 8. Showing the spread up front primes the user for the variance argument that follows.'
          },
          {
            phase: 'Chapter II: jobs and stress (bubble landscape)',
            description: 'Interactive bubble chart with sleep duration on the x-axis and stress on the y-axis. Bubble size encodes the number of people in the occupation, color encodes stress intensity (blue calm, gray neutral, orange tense). Hover surfaces the average, click opens the cluster of individual records so within-profession spread becomes visible.'
          },
          {
            phase: 'Chapter III: activity to rest (Sankey diagram)',
            description: 'Sankey diagram flowing physical activity level (Low, Medium, High) into sleep quality buckets (Poor 5-6h, Average 7h, Good 8-10h). Flow width is the number of people on each path. The headline number, 54.9% of high-activity individuals reach good sleep versus 22.7% of low-activity, falls out of the geometry of the diagram itself.'
          },
          {
            phase: 'Chapter IV: the Dream Lab',
            description: 'Animated scatter plot of BMI category by resting heart rate, colored by sleep disorder status. Each dot pulses at its individual\'s heart rate. Filters and visual toggles let the user test patterns themselves, motion trails, density aura, constellations, and a deep-sleep mode that dims everything but the cluster being studied.'
          }
        ]
      },
      keyFindings: [
        {
          stat: '2.3h',
          title: 'Same job, very different sleep',
          description: 'Nurse, with 73 people in the dataset, spans 5.9 to 8.2 hours of sleep and 3.0 to 8.0 on the stress scale. The bubble landscape makes that spread visible by clicking the bubble open. The lesson is structural: occupation averages hide the people inside them, and the design has to actively show the spread or the user will read past it.'
        },
        {
          stat: '32.2pp',
          title: 'Movement creates a measurable path to better sleep',
          description: 'High-activity individuals reach good sleep quality 54.9% of the time (39 of 71). For low-activity individuals the rate is 22.7% (34 of 150). The 32.2 percentage point gap is the largest cross-group effect in the dataset, larger than any single occupation contrast, and the Sankey makes it visible as flow width without needing a callout.'
        },
        {
          stat: '10+ bpm',
          title: 'Heart rate plus BMI flag sleep disorder risk',
          description: 'In the Dream Lab, people with no sleep disorder cluster in Normal BMI at the lowest resting heart rates (68-70 bpm). Insomnia spreads through Normal and Overweight at 3-5 bpm higher. Sleep apnea clusters in Obese at 10+ bpm above the none baseline. Disorder status is a stronger separator than BMI alone, which gives a practical screening read on a noisy chart.'
        },
        {
          stat: '1 reframe',
          title: 'The narrative is the visualization',
          description: 'The strongest finding is not a number, it is that the framing of the question changes what the data appears to say. Ranking professions makes the dataset sound like a workplace story. Asking what actually moves sleep makes it a behavior and physiology story. The visualization choices and the story choices are the same choice.'
        }
      ],
      visualizations: [
        {
          title: 'Bubble landscape, jobs and stress',
          description: 'Sleep duration on the x-axis (5.8 to 8.6h), stress on the y-axis (3.0 to 8.0). Each occupation is a bubble sized by population and colored by stress intensity. Hover surfaces the average, click breaks the bubble into the individual records inside so within-profession spread is visible at a glance.',
          insight: 'The drill-down is the argument. The same job stretches across the chart instead of sitting in one zone, which immediately undermines the "your job sleeps well or it doesn\'t" framing.',
          image: '/projects/night-shift/jobs-stress-bubbles.png',
          imageFit: 'contain'
        },
        {
          title: 'Activity to sleep Sankey',
          description: 'Three activity bands (Low 150, Medium 153, High 71) flow into three sleep quality buckets (Poor 117, Average 77, Good 180). Flow width is the count on each path, so the relationship between movement and sleep is encoded directly in the geometry, not in a caption.',
          insight: 'The 32.2pp gap between high-activity and low-activity routes to good sleep is the strongest cross-group effect in the dataset, and the Sankey lets the user see the size of that gap without reading a number.',
          image: '/projects/night-shift/activity-sleep-flow.png',
          imageFit: 'contain'
        },
        {
          title: 'The Dream Lab',
          description: 'BMI category on the x-axis, resting heart rate (64-86 bpm) on the y-axis, color encodes sleep disorder status (None, Insomnia, Sleep Apnea). Each dot pulses at the individual\'s resting heart rate. Filters and effect toggles (motion trails, density aura, constellations, deep sleep mode) let users test their own hypotheses.',
          insight: 'Sleep apnea pulls toward Obese BMI plus high heart rate, 10+ bpm above the no-disorder baseline. The animation reframes the scatter plot from a statistical surface to a room full of bodies, which is the entire point.',
          image: '/projects/night-shift/dream-lab.png',
          imageFit: 'contain'
        }
      ],
      tools: [
        {
          name: 'D3.js',
          purpose: 'Powered all three scenes: bubble landscape with sized and colored bubbles, Sankey flow with computed link widths, and the animated Dream Lab scatter with per-dot pulse rates synced to resting heart rate.'
        },
        {
          name: 'd3-sankey',
          purpose: 'Handled the flow geometry for the activity-to-sleep diagram. Lets the layout do the storytelling: flow width is the count, so the 32.2pp gap shows up visually instead of as a caption number.'
        },
        {
          name: 'Vanilla JavaScript + CSV',
          purpose: 'CSV loaded directly in the browser, no build step. Filter logic, hover tooltips, drill-down clicks, and Dream Lab effect toggles are plain DOM handlers, which keeps the project small and easy to fork.'
        },
        {
          name: 'GitHub Pages',
          purpose: 'Static hosting at calvin-liew.github.io/a4-sleep-analytics. The whole project is HTML, CSS, JS, and a CSV file, so deploys are git push and done.'
        }
      ],
      impact: {
        title: 'What the piece actually argues',
        content: 'The Night Shift is a small data story with one strong opinion: the framing you bring to a dataset decides what the dataset appears to say. Rank professions and you get a workplace narrative. Ask what actually moves sleep and you get a behavior and physiology narrative. The numbers do not change, but the lesson the reader walks away with changes completely.\n\nTechnically, the project taught me to treat chart type as part of the argument, not part of the decoration. The bubble landscape is about variance, so it shows distribution. The Sankey is about flow, so it shows where activity levels land. The Dream Lab is about people, so it animates them. Trying to force a single chart family on all three would have weakened every claim.\n\nNarratively, computing the captions from the dataset rather than hardcoding them was the choice I am proudest of. The prose can never silently diverge from the data, which is the failure mode for almost every dashboard-style story I have read.'
      },
      limitations: {
        title: 'Honest caveats',
        items: [
          'Sample size is 374 individuals from a single Kaggle dataset. Strong enough to argue framing and within-profession variance, not strong enough to make population-level health claims.',
          'The data is observational and cross-sectional. Activity, BMI, heart rate, and sleep are correlated, not proven to cause each other; the piece is careful to use language like "creates pathways to" rather than "causes."',
          'Sleep quality is bucketed (Poor 5-6h, Average 7h, Good 8-10h) for the Sankey diagram. Cleaner storytelling, lossier than the underlying continuous values.',
          'Occupation labels in the dataset are coarse (Doctor, Nurse, Engineer, etc.), which masks specialty differences (ER nurse vs. clinic nurse) that almost certainly matter for sleep and stress.',
          'No longitudinal signal. The dataset is a snapshot, so day-to-day variance and seasonal effects are invisible.',
        ]
      }
    }
  },
  {
    id: 'matchify',
    title: 'Matchify: Connecting People Through Music',
    category: 'UI/UX Design',
    dates: 'Jun 2024 - Aug 2024',
    organization: 'Independent Project',
    description: 'A mobile social app that treats your listening data as identity, not metadata. Matchify uses Spotify OAuth to build a user profile out of artists, genres, and listening patterns, then matches people on a blend of similarity (shared favorites) and complementarity (compatible but different tastes). Designed end-to-end in Figma as a high-fidelity prototype across onboarding, profile, matching, messaging, and privacy. Selected for ARIA 2024, the University of Toronto\'s annual research and innovation showcase.',
    skills: ['Navigation Design', 'Mobile Design', 'UI/UX Design', 'Experience Design', 'Figma', 'Prototyping', 'Mobile App Design', 'User-centered Design', 'Wireframing', 'Design Systems'],
    links: [
      {
        type: 'figma',
        url: 'https://www.figma.com/design/nkmVIyQnZzKT01rF20G9n1/Matchify-Project--Copy-?node-id=0-1&p=f&t=qmd4JXc07v1CpX4R-0',
        label: 'Open the Matchify Figma file'
      }
    ],
    caseStudy: {
      fileName: 'matchify.pdf',
      title: 'Matchify case study',
      fileSize: '11 MB'
    },
    extendedContent: {
      stats: [
        { value: 'ARIA \'24', label: 'UofT research showcase' },
        { value: '6', label: 'core mobile flows' },
        { value: '4', label: 'bottom-tab sections' },
        { value: '1', label: 'Spotify-powered identity' },
      ],
      pullQuote: 'Music reveals who you are. Matchify treats listening data as identity, not metadata.',
      overview: {
        title: 'A social app where taste is the profile',
        content: 'Matchify reimagines social connection by making music the primary signal rather than photos, bios, or location. The app pulls authentic listening data through Spotify OAuth (top artists, favorite genres, recently played, listening intensity) and turns it into a visually rich identity card that does the introductions for you. The pitch is simple: shared taste is one of the lowest-friction ways two strangers can find common ground, and the app is engineered to keep music in the center of the experience from onboarding through chat.'
      },
      motivation: {
        title: 'Photos sort by attraction, taste sorts by personality',
        content: 'Traditional social and dating platforms sort people by where they live or how they look in a photo, which produces the matches you would expect from those signals. Music is a more honest filter. Your library says something about your mood patterns, your cultural touchstones, what you reach for at 3 a.m., and what you would never put on a playlist for a first date. Matchify was designed around the premise that letting people lead with that signal produces conversations that do not stall at "hey" and matches that feel earned, not random.'
      },
      decisions: [
        {
          decision: 'Music is the primary match signal, not a side filter',
          reasoning: 'Most social apps treat music as a profile decoration: a "songs I like" field below age and height. Matchify inverts that. Spotify data is the profile, and photos, bios, and location are secondary. Leading with taste is the entire point of difference, so the design refuses to bury it under conventional dating-app patterns. Discover, profile, and matching screens are all organized around artists, genres, and listening intensity first.'
        },
        {
          decision: 'Spotify OAuth replaces the taste questionnaire',
          reasoning: 'A manual "pick five favorite artists" questionnaire is friction theater: users overthink it, pick whatever feels coolest, and the resulting profile lies. OAuth pulls the real signal in seconds. The tradeoff is that we are dependent on Spotify\'s permissions UX and a network of users who actually use Spotify, but the gain in profile authenticity is worth the platform dependency for the prototype.'
        },
        {
          decision: 'Match on similarity plus complementarity, not overlap alone',
          framework: 'Recommendation system design',
          reasoning: 'A pure overlap algorithm ("you both like Taylor Swift") collapses everyone into the same cluster, which is exactly the failure mode of mainstream music recommenders. Matchify blends similarity (shared favorites) with complementarity (adjacent but different genres, compatible listening intensity, niche-artist appreciation). It produces a broader, more interesting set of matches and gives users something new to discover, not just confirmation of what they already know.'
        },
        {
          decision: 'Privacy controls are granular, by default, not an afterthought',
          reasoning: 'Music taste is more personal than most users realize, sometimes more personal than the photos they post. Showing a stranger that you have listened to a specific breakup album on repeat for two weeks is genuinely vulnerable data. The settings dashboard supports hiding specific artists or genres, private-mode listening sessions that do not affect matching, and contact-initiation controls. The pattern is: opt-in to exposure, not opt-out, because trust has to be the on-ramp.'
        },
        {
          decision: 'Music-anchored messaging instead of generic chat',
          reasoning: 'A blank chat box is where most match-based apps lose users. Matchify\'s messaging surface is built around the shared interest itself: inline Spotify link previews, collaborative playlist creation, concert planning, and music trivia icebreakers. Conversations have a natural fallback when small talk runs dry, which is the moment most threads die. Keeping the topic anchored is a retention play disguised as a feature.'
        },
        {
          decision: 'Four bottom tabs, not six. Resist the feature creep',
          reasoning: 'Discover, Messages, Profile, Explore. That is the entire IA. Every other "delight" feature (concert finder, trending artists, playlist challenges) lives nested inside Explore so the primary navigation stays readable at a glance. Mobile prototypes lose to feature sprawl more often than to missing features, so the design holds the line at four tabs even when stakeholders ask for a fifth.'
        }
      ],
      keyFindings: [
        {
          stat: '~0 sec',
          title: 'OAuth eliminates the taste-questionnaire problem',
          description: 'The entire "tell us about your music" step collapses into a single Spotify authorize screen. Users review their imported identity rather than constructing one from scratch, which means the profile that goes live is the profile they actually live with, not the one they would have curated for a stranger.'
        },
        {
          stat: 'ARIA \'24',
          title: 'External validation as a UX bet',
          description: 'Selection for ARIA 2024 confirmed the framing held up against academic projects across disciplines. The signal was less "the design is pretty" and more "leading with listening data, not photos, is a defensible positioning move for a music-first social product."'
        },
        {
          stat: '2 axes',
          title: 'Similarity alone produces bad matches',
          description: 'Overlap-only matching collapses everyone into the most popular cluster. Blending similarity with complementarity (compatible but different) produced a more interesting match set in prototype testing, and gave users something to discover on each new match rather than confirming what they already knew.'
        },
        {
          stat: 'Trust',
          title: 'Privacy is the on-ramp, not the exit',
          description: 'Music taste is more revealing than most users realize. Putting granular controls (hide artists, private-mode listening, who-can-initiate) on the first-run path rather than five settings menus deep was the move that let users opt into authentic exposure instead of curating safe, cool, fake taste.'
        }
      ],
      features: [
        {
          title: 'Spotify-powered onboarding',
          description: 'OAuth flow that connects a Spotify account in seconds and imports top artists, favorite genres, recently played, and listening intensity. Users review and customize the imported identity before going live, so the profile that hits the matching pool is honest by construction.',
          insight: 'The manual "build your music profile" step disappears. The first thing the user sees in the app is themselves, accurately represented, which is the strongest possible hook for the next session.'
        },
        {
          title: 'Musical identity profiles',
          description: 'Visually dense profiles that surface artist grids, genre breakdowns, top tracks, and listening statistics. Both current favorites and all-time classics are shown so taste evolution is visible. Privacy controls govern what is public vs. match-only.',
          insight: 'Profiles work as conversation starters, not comparison charts. The design emphasizes discovery of difference, not confirmation of overlap, which broadens the match graph.'
        },
        {
          title: 'Similarity + complementarity matching',
          description: 'Recommendation engine that scores artist overlap, genre compatibility, listening intensity, and niche-artist exposure. Filters let users adjust by music preference, location, or activity interest. Designed to produce diverse, surprising matches rather than only obvious ones.',
          insight: 'The matching layer is the product\'s real intellectual property. It is also where most prototypes hand-wave; making it explicit (and showing the user what it is doing) is what earns trust.'
        },
        {
          title: 'Music-anchored messaging',
          description: 'Chat surface with inline Spotify link previews, collaborative playlist creation, concert planning tools, and music trivia icebreakers. Designed to keep the conversation tied to the shared interest that produced the match in the first place.',
          insight: 'The blank-message-box failure mode is the biggest churn driver in match apps. Anchoring the chat to music gives every conversation a default topic and a graceful pivot when small talk dies.'
        },
        {
          title: 'Granular privacy settings',
          description: 'Settings dashboard covering listening history visibility, location, profile fields, and online status. Hide specific artists or genres, run private-mode listening sessions that do not affect matching, and control who can initiate contact. Data usage is explained in plain language.',
          insight: 'Music taste is more vulnerable than most users expect. Putting these controls on the first-run path, not deep in settings, is how the app earns the right to ask for authentic exposure.'
        },
        {
          title: 'Four-tab navigation',
          description: 'Discover (match browsing), Messages (conversations), Profile (your identity), Explore (concerts, trending artists, playlist challenges). Music-inspired iconography (waveforms, vinyl, equalizers) for personality without sacrificing legibility.',
          insight: 'Resisting the urge to add a fifth tab was the design decision that kept the app readable. Sprawl is the failure mode for social prototypes; this one keeps the primary surface flat and the deeper features nested inside Explore.'
        }
      ],
      tools: [
        {
          name: 'Figma',
          purpose: 'Designed the complete mobile system: onboarding, profile templates, match browsing, messaging, settings. High-fidelity prototype with Spotify auth, swipe gestures, and animated transitions between states.'
        },
        {
          name: 'Spotify Web API',
          purpose: 'OAuth, top artists, top tracks, genre data, listening history, and playlist management. Designed the mapping from Spotify\'s JSON shape into visual profile elements (artist grids, genre breakdowns, intensity meters).'
        },
        {
          name: 'User research',
          purpose: 'Interviews with music enthusiasts about discovery habits, music-based friendships, and pain points with existing social platforms. Findings shaped feature priority and the "lead with taste, not photos" positioning.'
        },
        {
          name: 'Mobile design patterns',
          purpose: 'iOS and Android conventions for gesture-based interactions (swipe to match/pass), bottom sheets (profile detail), tab bars, and notifications. Platform-appropriate without splintering brand identity.'
        }
      ],
      impact: {
        title: 'What the project actually argues',
        content: 'Matchify\'s thesis is positioning: there is a defensible product wedge in social apps that treat music as the primary signal rather than the third or fourth one. Selection for ARIA 2024 validated that the framing was strong enough to stand next to research-led work across disciplines, not just decorative interaction design.\n\nFor my own product instincts, the project drove home that an API integration is a positioning decision, not a checklist item. Choosing Spotify OAuth over a taste questionnaire was not laziness, it was a bet that authentic data beats curated data every time. The matching engine being a blend of similarity and complementarity, not pure overlap, was a bet that interesting matches matter more than safe ones. The privacy-first defaults were a bet that trust is what unlocks honest taste in the first place.\n\nIf I shipped Matchify v2, the work would be less about new features and more about making those three bets even more visible to the user from the first session.'
      },
      limitations: {
        title: 'What this project is, and what it isn\'t',
        items: [
          'High-fidelity Figma prototype, not a shipped iOS or Android app. The matching engine, OAuth flow, and chat surface are designed and demonstrated but not production-implemented.',
          'Spotify dependency is a strategic vulnerability. Apple Music, YouTube Music, and offline-only listeners are not addressable until a multi-provider strategy is designed.',
          'User research was qualitative-leaning at this scope (interviews, not large-panel surveys). A bigger panel would be needed before claiming statistical conclusions about match quality or retention.',
          'Privacy-first defaults are designed but not stress-tested against real adversarial behavior (harassment, doxxing, stalking via music habits). A production build would need a trust and safety pass beyond what a class prototype can do.',
          'The "complementarity" axis of the matching engine is conceptual in the prototype, not a trained model. A real implementation would require listening-data scale and ongoing tuning.',
        ]
      }
    },
    featured: false
  },
  {
    id: 'tutorly',
    title: 'Tutorly: Peer Tutoring for UofT Students',
    category: 'UI/UX Design',
    dates: 'May 2024 - Aug 2024',
    organization: 'University of Toronto',
    courseCode: 'CSCC10 - Human-Computer Interaction',
    description: 'A four-phase HCI research project (CSCC10, Summer 2024) by a team of six University of Toronto students. The output is a high-fidelity mobile prototype for peer-to-peer tutoring grounded in five cited studies on peer tutoring efficacy, student mental health, and online versus in-person learning. The work covers low-fidelity exploration, a 30-response survey plus two unstructured interviews, a high-fidelity Figma prototype, and a 13-participant asynchronous usability study evaluated against Nielsen\'s 10 heuristics with emphasis on H1 (visibility), H3 (user control), and H6 (recognition).',
    skills: ['Mobile Design', 'Usability Testing', 'Experience Design', 'Prototyping', 'User-centered Design', 'User Experience Design (UED)', 'User Personas', 'Figma', 'Wireframing', 'UX Research', 'Design Thinking'],
    links: [
      {
        type: 'figma',
        url: 'https://www.figma.com/design/ssRCJVnGktqLf6BZCVj1ph/Tutorly-Project?t=Mx5ibMOFH3m6BehJ-0',
        label: 'Open the Tutorly Figma file'
      }
    ],
    caseStudy: {
      fileName: 'tutorly.pdf',
      title: 'Tutorly case study',
      fileSize: '16 MB'
    },
    extendedContent: {
      team: [
        { name: 'Joshua Daniel', role: 'Co-designer / researcher', contact: 'j.daniel@mail.utoronto.ca' },
        { name: 'Matthew Iannantuono', role: 'Co-designer / researcher', contact: 'matthew.iannantuono@mail.utoronto.ca' },
        { name: 'Alex Motor', role: 'Co-designer / researcher', contact: 'alex.motor@mail.utoronto.ca' },
        { name: 'Calvin Liew', role: 'Co-designer / researcher', contact: 'calvin.liew@mail.utoronto.ca' },
        { name: 'Brian Yu', role: 'Co-designer / researcher', contact: 'br.yu@mail.utoronto.ca' },
        { name: 'William Zhu', role: 'Co-designer / researcher', contact: 'williambo.zhu@mail.utoronto.ca' },
      ],
      stats: [
        { value: '6', label: 'student team' },
        { value: '30', label: 'survey responses' },
        { value: '13', label: 'usability participants' },
        { value: '3', label: 'tasks evaluated' },
      ],
      pullQuote: 'An inactive social life and poor academics are intertwined. Tutorly was designed to address both at once.',
      overview: {
        title: 'Abstract',
        content: 'This paper summarizes the design process and methodology behind Tutorly, a peer-to-peer tutoring platform aimed at enhancing academic support and student well-being for University of Toronto students. The team followed a four-phase HCI process: a low-fidelity exploration phase (personas, scenarios, hierarchical task analyses), a requirements-gathering phase (a 30-response survey distributed on r/UTSC and r/UTM plus two unstructured interviews with non-CS students), a high-fidelity Figma prototype, and a remote asynchronous usability study with 13 participants. The work is grounded in five cited studies covering peer tutoring efficacy, student mental health, online versus in-person learning, and post-graduate career readiness. Findings are reported below, organized by the three core tasks evaluated: searching and requesting a tutor, signup and onboarding, and joining a peer tutor session.'
      },
      motivation: {
        title: 'Problem statement',
        content: 'The team started from a shared observation that their campus had a declining social life and that the decline was tangled up with academic struggle, a pattern the literature backs up (Moghimi et al., 2023; Collier, 2021). Peer tutoring kept showing up in the research as one of the few interventions that addresses both at once: it improves academic performance regardless of competence or time spent (Bowman-Perrott et al., 2013) and is just as effective online as in person (Gehreke et al., 2024). The two problems, an inactive social life and poor academics, were treated as one design problem: build a tool that makes peer tutoring easy to start, safe to participate in, and structured enough that students stick with it.'
      },
      literatureReview: {
        title: 'Literature review',
        intro: 'Five studies grounded the design. Each citation is paired with the specific design or product decision it informed, so the connection between the research and the prototype is auditable.',
        studies: [
          {
            citation: 'Bowman-Perrott et al. (2013)',
            venue: 'School Psychology Review',
            finding: 'A meta-analytic review of single-case research finds peer tutoring is an effective tool for improving academic ability regardless of one\'s competence, health, or time spent.',
            application: 'Corroborated the team\'s anecdotal evidence that peer tutoring works across student demographics. Justified building a general-audience platform instead of a niche-major one.',
          },
          {
            citation: 'Collier (2021)',
            venue: 'Metropolitan Universities',
            finding: 'First-generation, lower-income, and newer students face heightened difficulty forming social connections and succeeding academically. Peer tutoring is the primary suggested intervention.',
            application: 'Shaped the equity framing: features like accommodations-aware matching and clear, jargon-light copy are aimed at students who do not already have an academic network.',
          },
          {
            citation: 'Gehreke et al. (2024)',
            venue: 'Review of Education',
            finding: 'Online peer tutoring is as effective as in-person tutoring. A hybrid approach may outperform either mode alone by giving students flexibility.',
            application: 'Directly drove the decision to support both in-person and virtual sessions as a first-class choice in the booking flow, not a secondary preference.',
          },
          {
            citation: 'Brown (2024)',
            venue: 'LendEDU / College Pulse survey',
            finding: 'Only 29% of surveyed students feel prepared for employment after graduation.',
            application: 'Reframed Tutorly as a career-skill builder, not only an academic tool: tutoring builds soft skills for the tutor (teaching, communication) and hard skills for the tutee.',
          },
          {
            citation: 'Moghimi et al. (2023)',
            venue: 'BMC Public Health',
            finding: 'Cross-sectional mixed-methods study finds a widespread mental health decline among post-secondary students, intensified by the COVID-19 pandemic.',
            application: 'Established urgency: the design treats social isolation as part of the academic-support problem rather than a separate concern, which is why the chat surface and review system live alongside booking.',
          },
        ],
      },
      decisions: [
        {
          decision: 'UofT-only sign-up via verified university email',
          reasoning: 'The requirements survey surfaced that 31% of students were concerned or very concerned about meeting strangers through the app and 65.5% were neutral on it. Trust was the bottleneck, not features. Restricting sign-up to verified UofT email addresses (with 2FA and profile-visibility controls layered on top) was the move that let the rest of the product exist. Without that constraint, every other interaction would have been read through a safety filter.'
        },
        {
          decision: 'Support both in-person and virtual sessions, not one mode',
          framework: 'Gehreke et al. (2024) on hybrid peer mentoring',
          reasoning: 'A hybrid approach outperformed either mode alone in the cited literature. Forcing students into "virtual only" would have made the app feel like a Zoom alternative; forcing "in-person only" would have lost commuter students and post-pandemic remote learners. The booking flow treats meeting type as a first-class field so the product fits the way students actually study.'
        },
        {
          decision: 'Multistep onboarding instead of a single long form',
          reasoning: 'Survey results showed wide variance in study habits (31% evening, 28% afternoon, 21% morning, 14% night) and locations (library, common areas, classrooms, outdoors), plus a strong demand for accommodations (anxiety, dyslexia were the test-case examples). One long sign-up form would have buried that signal. Breaking onboarding into personal info, profile picture, credentials, academic info, and study habits made each step short enough that users finished it, and gave the matching layer the structured input it needed.'
        },
        {
          decision: 'Filter-rich matchmaking that the user controls',
          reasoning: 'The matching section of the requirements analysis kept landing on the same word: control. Students did not want a black-box recommender deciding who they study with. The design defaults filters to the onboarding inputs (subject, accommodations, location) so first-run feels effortless, but every filter is visible and editable. The match list is the surface where the user has the most agency, not the least.'
        },
        {
          decision: 'Evaluate against Nielsen heuristics H1, H3, and H6',
          framework: 'Nielsen\'s 10 usability heuristics',
          reasoning: 'Rather than evaluating the prototype against a generic "is this usable" rubric, the team picked three heuristics that matched the product\'s risks: H1 (visibility of system status) for booking and cancellation flows, H3 (user control and freedom) for the matching filters and cancel-meeting paths, and H6 (recognition rather than recall) for the multistep onboarding. Naming the heuristics up front made the usability study scoreable, not subjective.'
        },
        {
          decision: 'Asynchronous Figma + Google Form usability study',
          reasoning: 'For 13 participants across schedules and locations, moderated testing would have collapsed the sample size. The team used Figma for prototype interaction and Google Forms for per-task multiple-choice plus short-answer questions, run remotely and asynchronously. The tradeoff is that the team could not guarantee participants navigated the Figma file correctly, which is one of the limitations the paper calls out honestly.'
        }
      ],
      keyFindings: [
        {
          stat: '83%',
          title: 'Demand is real and currently unmet',
          description: 'Survey results showed 83% of respondents were not currently using any tutoring services and 75.9% believed a support network would help them academically. The opportunity is not "build a better tutoring service," it is "build the first one most of these students will actually use."'
        },
        {
          stat: '31%',
          title: 'Trust is the bottleneck, not features',
          description: 'A full 31% of survey respondents were concerned or very concerned about meeting strangers through the app, with another 65.5% neutral. UofT-email-only sign-up plus 2FA and profile-visibility controls were not optional add-ons; they were the price of admission for the rest of the product to function.'
        },
        {
          stat: '92.3%',
          title: 'The subject filter and booking flow held up',
          description: 'In the usability study, 92.3% of 13 participants found subject filtering at least easy to use, and the same 92.3% confirmed the onboarding confirmation step provided all the information they expected. The core booking journey did not need restructuring; only the calendar interface and confirmation copy needed iteration.'
        },
        {
          stat: '100%',
          title: 'Star ratings landed without rework',
          description: 'Every one of the 13 participants rated the session-rating layout at least clear. Not every screen tested clean, the academic-info labels, the email-error message, and the meeting banners all surfaced refinements, but the review system landed on the first pass and locked in as-is.'
        }
      ],
      usabilityResults: {
        title: 'Usability study results',
        sampleSize: '13 participants',
        intro: 'Asynchronous remote study via Figma + Google Forms. Participants completed each task while answering multiple-choice and short-answer questions per subtask. Results below are organized by the three tested tasks, with the specific subtask context noted where relevant.',
        tasks: [
          {
            number: '01',
            task: 'Search and request a peer tutor session',
            context: 'Participants opened the Find Peers tab, applied a subject filter for computer science, selected a tutor, and booked a virtual meeting for July 17 at 2 PM.',
            results: [
              { metric: '92.3%', statement: 'found subject filtering at least easy to use.' },
              { metric: '15.4%', statement: 'found switching from default to custom subject sets unclear (flagged for iteration).' },
              { metric: '70%', statement: 'rated tutor profile information at least clear (30% neutral, also flagged).' },
              { metric: '23.1%', statement: 'rated the calendar interface only neutral, the highest-priority polish target in this task.' },
              { metric: '84.6%', statement: 'confirmed the booking confirmation alert provided all expected information.' },
              { metric: '84.7%', statement: 'were satisfied with the overall search-and-book journey.' },
            ],
          },
          {
            number: '02',
            task: 'Signup and onboarding as a student',
            context: 'Participants registered a new student account: personal info, profile picture, email + password, academic info (campus, major, subjects, year), and study habits including accommodations.',
            results: [
              { metric: '100%', statement: 'completed the personal info step without issue.' },
              { metric: '100%', statement: 'found profile picture upload easy.' },
              { metric: '76.9%', statement: 'rated the email error message at least clear (15.4% neutral, 7.7% very unclear).' },
              { metric: '76.9%', statement: 'rated academic info labels and placeholders at least clear (23.1% neutral).' },
              { metric: '69.2%', statement: 'found entering study habits and accommodations at least easy (23.1% neutral, 7.7% difficult).' },
              { metric: '92.3%', statement: 'confirmed the final confirmation step provided expected information.' },
              { metric: '76.9%', statement: 'were satisfied with the overall signup journey.' },
            ],
          },
          {
            number: '03',
            task: 'Join a peer tutor session',
            context: 'Participants viewed an upcoming meeting banner, opened cancel-meeting flow then backed out, joined a meeting, toggled camera, used in-meeting chat and file sharing, ended the meeting, left a star rating, and submitted a review.',
            results: [
              { metric: '84.6%', statement: 'found upcoming-meeting banners at least clear (15.4% neutral).' },
              { metric: '92.3%', statement: 'found the Cancel Meeting button easy to locate.' },
              { metric: '84.7%', statement: 'rated the cancel-meeting alert clear (7.7% unclear, flagged).' },
              { metric: '92.3%', statement: 'rated in-meeting chat box clarity at least clear.' },
              { metric: '76.9%', statement: 'found chat file sharing easy or very easy (23.1% neutral).' },
              { metric: '100%', statement: 'rated the star-rating layout at least clear, the only feature that needed no iteration.' },
              { metric: '84.7%', statement: 'found going back to view the conversation easy or very easy.' },
            ],
          },
        ],
      },
      features: [
        {
          title: 'UofT-verified signup + multistep onboarding',
          description: 'Sign-up gated to verified UofT email addresses. Onboarding broken into four short steps: full name, account details (profile picture, password), academic info (campus, major, subject interests, year), and study habits (preferred times, locations, accommodations). Each step is its own screen so the form never feels like a wall, and a top-of-screen progress indicator keeps users oriented.',
          insight: 'The university-email gate (with inline "already registered" validation) is what makes the rest of the product feel safe to use. The multistep structure is what makes the form long enough to drive good matching without bleeding users at signup.',
          image: '/projects/tutorly/01-signup-onboarding.png',
          imageFit: 'contain',
          phoneFrame: true
        },
        {
          title: 'Find Peers with filter-rich matchmaking',
          description: 'Search and filter surface where students choose subject (CS, math, business, etc.), default vs. custom subject sets, and additional filters anchored to the onboarding inputs. Tutor results are scannable profile cards with name, subject expertise, star rating, and a teaser bio.',
          insight: 'Defaulting filters to the user\'s onboarding answers makes the first match feel personalized without making them work for it. Keeping every filter chip visible and editable keeps users in control of the match.',
          image: '/projects/tutorly/02-find-peers.png',
          imageFit: 'contain',
          phoneFrame: true
        },
        {
          title: 'Tutor profile + meeting booking flow',
          description: 'Tutor profile view shows accommodation tags (ADHD, Dyslexia, Autism, Anxiety, In-person, Virtual), past reviews, and a Book meeting CTA. Booking asks for meeting type (Virtual or In-person), then a calendar date, then a 30-minute time slot, then a confirmation alert.',
          insight: 'Usability testing showed 23.1% of participants found the calendar interface only "neutral" to use. The flow is structurally sound (no participants found it difficult), but the calendar component is the highest-priority polish target if the team picks it back up.',
          image: '/projects/tutorly/03-tutor-profile-booking.png',
          imageFit: 'contain',
          phoneFrame: true
        },
        {
          title: 'Home dashboard with upcoming meeting banners',
          description: 'Home tab surfaces Recent tutors at the top and Upcoming meetings below, each banner showing the session title, day or date, time, and a tap target. The current day\'s session is highlighted in the brand green so the next thing to do is impossible to miss.',
          insight: 'H1 (visibility of system status) in action. The banner answers "what is next" without the user asking, which scored well in usability testing: 84.6% of participants found the banners clear or very clear.',
          image: '/projects/tutorly/04-meeting-banners.png',
          imageFit: 'contain',
          phoneFrame: true
        },
        {
          title: 'In-meeting surface with chat, file sharing, and camera',
          description: 'Virtual meeting view with mute, camera toggle, and leave controls over a video feed plus picture-in-picture self-view. The chat thread sits directly below the call, with inline file attachments (e.g., a TA sharing `psych_midterm.pdf`) and a green-tinted self message bubble.',
          insight: 'Chat box file sharing scored 76.9% positive (easy or very easy), with 23.1% neutral. The function works; the affordance for "send a file" is the iteration target. The post-session review path scored 100% clear in testing.',
          image: '/projects/tutorly/05-in-meeting-chat.png',
          imageFit: 'contain',
          phoneFrame: true
        },
        {
          title: 'Reviews + finished-meeting history',
          description: 'After a session ends, users tag tutor qualities (Knowledgeable, Great Teacher, Friendly, Engaging) and write a longer comment. The modal sits on top of the dimmed Meeting Finished screen so the review feels lightweight, not bureaucratic, and the conversation thread remains reachable.',
          insight: 'This was the cleanest-testing surface in the study. Star rating layout was 100% clear, comment placeholders were 76.9% clear or very clear, and going back to view the conversation was 84.7% easy or very easy.',
          image: '/projects/tutorly/06-review.png',
          imageFit: 'contain',
          phoneFrame: true
        }
      ],
      figmaEmbed: {
        url: 'https://www.figma.com/design/ssRCJVnGktqLf6BZCVj1ph/Tutorly-Project',
        title: 'Try the prototype',
        intro: 'The same Figma file the 13-participant usability study ran against. Zoom, pan, and click through the three tested flows: searching and requesting a tutor session, signup and onboarding, and joining a peer tutor session.',
        height: 720,
      },
      tools: [
        {
          name: 'Figma',
          purpose: 'The high-fidelity prototype: multistep onboarding, Find Peers, tutor profiles, calendar booking, upcoming meeting banners, in-meeting interface, and reviews. The same Figma file was the artifact participants interacted with during the asynchronous usability study.'
        },
        {
          name: 'Surveys + unstructured interviews',
          purpose: 'Requirements gathering: a 30-response survey distributed via r/UTSC and r/UTM on Reddit, plus two unstructured interviews with non-CS students to fill demographic gaps. Findings organized into five categories: study habits, matchmaking, privacy and security, usability, and motivation.'
        },
        {
          name: 'Nielsen\'s 10 heuristics + Google Forms',
          purpose: 'Evaluation framework: H1 (visibility of system status), H3 (user control and freedom), H6 (recognition rather than recall). Thirteen participants completed remote Google Form questionnaires while interacting with the Figma prototype across three tasks: searching/requesting a tutor session, signup and onboarding, and joining a peer tutor session.'
        },
        {
          name: 'Personas, scenarios, HTA',
          purpose: 'Two personas (a potential tutor and a potential tutee) captured the user base with minimum overhead. Scenarios fleshed out signup, scheduling, messaging, and virtual meeting tasks. A hierarchical task analysis broke each main task into subtasks and informed the structure of the prototype.'
        }
      ],
      impact: {
        title: 'What the project actually argues',
        content: 'Tutorly\'s thesis is that peer tutoring is one of the rare interventions that improves both academic and social outcomes for university students at once, and that the design problem is making it easy to start, safe to participate in, and structured enough that students stay. The research process backed the thesis with four cited studies (Bowman-Perrott 2013, Collier 2021, Gehreke 2024, Moghimi 2023), a 30-response survey, two interviews, and a 13-participant usability study evaluated against Nielsen\'s 10 heuristics.\n\nFor my own product instincts, the project drove home that user research is what changes a design, not stylistic iteration. The UofT-only sign-up, the multistep onboarding structure, the calendar-interface refinement priority, and the emphasis on user-controlled matching all came directly out of the survey and usability data. The Nielsen H1/H3/H6 framing was what made the evaluation scoreable rather than vibes-based.\n\nIt was also a six-person team project for CSCC10 (HCI), and that collaboration shaped the work as much as the research did. Building a design system, splitting feature areas, and reaching consensus on what counted as "done" inside a 16-week course was its own product skill.'
      },
      limitations: {
        title: 'Honest caveats (from the team\'s own analysis)',
        items: [
          'High-fidelity Figma prototype, not a shipped iOS or Android app. The matching engine, meeting surface, and chat are designed and demonstrated, not production-implemented.',
          'Usability study sample size is 13 participants. Adequate for design direction across the three tested tasks, but small relative to the target user base of all UofT students.',
          'Survey demographics skewed STEM. Reddit distribution on r/UTSC and r/UTM pulled mostly computer science respondents, so subject demand (math, CS, business) likely under-represents arts and life-sciences students.',
          'Asynchronous Figma + Google Form testing means the team could not guarantee participants navigated the prototype correctly. Detailed instructions mitigated, did not eliminate, the risk.',
          'Some prototype limitations bled into results: star ratings did not update visually in Figma, which the participants flagged as "unclear" even though the issue was the tool, not the design.',
          'Course scope, sixteen weeks. Future work the team explicitly named: larger and more diverse panels, responsive design across device sizes, a desktop companion, Fitts\' Law-driven button sizing, and A/B testing on the Find Peers task.',
        ]
      },
      references: {
        title: 'References',
        intro: 'The five studies cited in the literature review and problem statement, in APA format. All sources are peer-reviewed except Brown (2024), which is industry survey reporting.',
        entries: [
          {
            citation: 'Bowman-Perrott, L., Davis, H., Vannest, K., Williams, L., Greenwood, C., & Parker, R. (2013). Academic benefits of peer tutoring: A meta-analytic review of single-case research. School Psychology Review, 42(1), 39-55.',
            url: 'https://doi.org/10.1080/02796015.2013.12087490',
          },
          {
            citation: 'Brown, M. (2024, April 11). College students lack confidence in their post-grad careers. LendEDU.',
            url: 'https://lendedu.com/blog/are-college-students-prepared-for-career/',
          },
          {
            citation: 'Collier, P. (2021). How peer mentoring can help universities promote student success in a post-COVID-19 pandemic world. Metropolitan Universities, 32(3), 37-54.',
            url: 'https://doi.org/10.18060/25222',
          },
          {
            citation: 'Gehreke, L., Schilling, H., & Kauffeld, S. (2024). Effectiveness of peer mentoring in the study entry phase: A systematic review. Review of Education, 12(1).',
            url: 'https://doi.org/10.1002/rev3.3462',
          },
          {
            citation: 'Moghimi, E., Stephenson, C., Gutierrez, G., Jagayat, J., Layzell, G., Patel, C., McCart, A., Gibney, C., Langstaff, C., Ayonrinde, O., Khalid-Khan, S., Milev, R., Snelgrove-Clarke, E., Soares, C., Omrani, M., & Alavi, N. (2023). Mental health challenges, treatment experiences, and care needs of post-secondary students: A cross-sectional mixed-methods study. BMC Public Health, 23(1).',
            url: 'https://doi.org/10.1186/s12889-023-15452-x',
          },
        ],
      },
    },
    featured: false
  },
];
