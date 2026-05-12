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
      pullQuote: 'Users consistently prioritized tools that reduced anxiety over tools that just saved time.',
      overview: {
        title: 'Passive storage, made proactive',
        content: 'Google Drive Companion treats the Drive ecosystem as the substrate for AI, not a separate destination. Instead of asking users to upload files into ChatGPT or Copilot, Companion lives where the files already are: reading syllabi to schedule the semester, condensing PDFs into study packs, stitching meeting notes into action items, and surfacing context before deadlines arrive. The prototype is a full interactive demo across two personas (student, professional) and six core scenarios, designed to test whether an AI layer embedded inside Drive feels more natural than the upload-first competition.'
      },
      motivation: {
        title: 'The gap competitors are leaving open',
        content: 'The generative AI productivity market grows from $7.66B in 2024 to a projected $65.94B by 2032. ChatGPT (700M weekly users, 61% share) and Microsoft Copilot (33M actives, 14% share) dominate the standalone AI tool category. But none of them live where the files do. Every interaction starts with manual upload, context loss, and an app switch. Students get crushed by deadline shifts, dense readings, and course juggling; professionals drown in meetings, scattered action items, and decisions that fall through the cracks. Companion bets that the winning AI productivity surface is inside the storage layer users already trust.'
      },
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
          description: 'Complete UI design prioritizing mobile experience where students naturally seek help, on the bus, between classes, late-night study sessions. Design system includes reusable components: subject tag pills (color-coded by discipline), availability calendars (optimized for small screens), tutor profile cards (scannable at a glance), and session booking flows (three taps maximum). Maintains consistency across iOS and Android while respecting platform conventions for gestures and navigation patterns.',
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
