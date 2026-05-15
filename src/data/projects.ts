import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'saas-scout',
    title: 'SaaSScout: A Grounded RAG Copilot for SaaS Evaluation',
    category: 'Development',
    dates: 'Mar 2026 - May 2026',
    organization: 'Independent Project',
    description: 'A production RAG copilot for SaaS evaluation. Indexes 335 products and 4,899 review chunks into four partitioned Chroma vector collections, ranks retrieval candidates across six signals (feature-fit, pricing, review sentiment, provenance trust, query alignment, category overlap), then generates grounded recommendations via a provider-neutral LLM layer — Groq Qwen 32B online, Ollama Qwen 2.5 local, or a deterministic grounded template when both are unavailable. The architecture ensures the LLM never invents a fact the retrieval layer did not supply.',
    skills: ['RAG', 'FastAPI', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Chroma', 'Vector Search', 'LLM Integration', 'Groq', 'Ollama', 'Production Deployment', 'Netlify', 'Render', 'Data Engineering'],
    image: '/projects/saas-scout/00-hero.png',
    links: [
      {
        type: 'live',
        url: 'https://saas-intelligence-copilot-calvi.netlify.app',
        label: 'Live RAG demo',
      },
      {
        type: 'github',
        url: 'https://github.com/Calvin-Liew/saas-intelligence-copilot',
        label: 'Source on GitHub',
      },
    ],
    featured: true,
    extendedContent: {
      stats: [
        { value: '335', label: 'products indexed' },
        { value: '4,899', label: 'review chunks in Chroma' },
        { value: '6-signal', label: 'retrieval ranking' },
        { value: '3-tier', label: 'LLM fallback chain' },
      ],
      pullQuote: 'RAG is not a feature — it is an architectural commitment: every answer is grounded in retrieved evidence, every gap is labeled, and the LLM never invents what the data does not support.',
      overview: {
        title: 'A five-phase RAG pipeline for procurement-grade answers',
        content: 'SaaSScout is built around a retrieval-augmented generation (RAG) pipeline that turns a natural-language SaaS query into a grounded, evidence-backed recommendation. The pipeline runs in five phases. (1) Ingestion: five data sources are normalized, canonically joined on product names, and partitioned into separate Chroma vector collections by trust level. (2) Indexing: each collection is embedded using Chroma\'s default embedding model; a TF-IDF fallback index is pre-built for when the vector store is cold or unavailable. (3) Retrieval: incoming queries hit all four evidence lanes in parallel, each lane returning its top-k matches by cosine similarity, filtered by category and metadata constraints. (4) Ranking: retrieved candidates are scored across six signals before the LLM sees anything — feature-fit coverage, pricing match, review sentiment, provenance trust, query-keyword alignment, and category overlap. The six-signal composite score determines which evidence surfaces in the LLM prompt and which tools lead the comparison. (5) Generation: ranked evidence is assembled into a structured prompt and passed to Groq Qwen 32B (online), Ollama Qwen 2.5 1.5B (local), or a deterministic grounded template if both are unavailable. The LLM role is assembly and narration — it formats evidence it was handed, never supplements with training-set guesses.',
      },
      motivation: {
        title: 'Why procurement is the worst use case for generic chat — and the best for RAG',
        content: 'SaaS evaluation is a research task: analysts open ten browser tabs, cross-reference feature pages against pricing plans, scan review sites for recurring pain points, and summarize into a recommendation. Generic ChatGPT-style chat collapses that into one confident-sounding answer where the citations are usually invented and there is no way to tell which features were verified versus fabricated. The procurement-specific failure mode is expensive: a team selects the wrong tool, spends a quarter integrating it, then finds that the "enterprise SSO" the chatbot confirmed does not exist in the pricing tier they bought.\n\nRAG solves this by separating knowledge from generation. The retrieval layer owns the facts — 335 real products, 4,899 review chunks, FactGrid enterprise metadata, Wikidata vendor data, OpenAlternative open-source discovery. The generation layer only assembles and narrates what the retrieval layer hands it. The LLM never touches a query without already having ranked, sourced evidence in the prompt. That constraint is what makes the output auditable: every claim traces to a retrieved row, every gap is labeled as a gap, every recommendation cites the composite score that drove it. SaaSScout is a working argument that AI for high-stakes work must be built on evidence architecture — not on prompt engineering around an LLM\'s stale training data.',
      },
      decisions: [
        {
          decision: 'Index real product knowledge instead of prompting around ignorance',
          framework: 'Retrieval-Augmented Generation (RAG)',
          reasoning: 'A vanilla LLM prompt for "compare Zendesk and Freshdesk" produces a plausible-sounding feature matrix drawn from training data that may be months or years stale. SaaSScout\'s answer is to not ask the LLM about products at all. Instead, 335 real product records are ingested, canonically normalized, and embedded into Chroma before any user query arrives. The LLM receives a prompt that already contains retrieved, ranked evidence — its role is to assemble readable output, not to recall facts. If the data does not support a claim, the claim does not appear. The RAG constraint is the product\'s entire trust argument.',
        },
        {
          decision: 'Partition embeddings into separate Chroma collections by source trust',
          framework: 'Evidence lane architecture',
          reasoning: 'The default RAG approach drops all documents into one vector collection and lets semantic search surface the best match. The problem is that user reviews, enterprise metadata, and vendor-reported features have very different trust profiles: Capterra reviews are subjective but reveal real pain points; FactGrid metadata is verified but narrow; Wikidata vendor facts are CC0 and reliable but sparse; OpenAlternative surfaces open-source options that commercial indexes miss. Merging them into one corpus lets high-volume review text dominate cosine similarity, drowning out the structured metadata signals. SaaSScout keeps four separate Chroma collections — one per lane — so retrieval is independently tuned per source and output is labeled by origin. A TF-IDF fallback index mirrors each collection so retrieval degrades gracefully when the vector store is cold.',
        },
        {
          decision: 'Score six signals before the LLM sees a single candidate',
          framework: 'Multi-signal pre-generation ranking',
          reasoning: 'Semantic similarity alone is a weak procurement ranking signal. A tool can embed close to the query keyword "enterprise ticketing" while failing on pricing, missing required features, or carrying uniformly negative reviews. SaaSScout scores every retrieval candidate across six dimensions before assembling the LLM prompt: feature-fit coverage (what fraction of required features are confirmed), pricing match (distance from the stated budget), review sentiment (aggregated Capterra rating), provenance trust (FactGrid weighted highest, then Wikidata, then reviews, then alternatives), query-keyword alignment (TF-IDF overlap with the raw query string), and category overlap (primary category match). The composite score governs prompt slot assignment — higher-ranked tools get more evidence real estate — so the generation step is biased toward the strongest candidates before any text is written.',
        },
        {
          decision: 'Treat missing evidence as a procurement finding, not a model failure',
          framework: 'Epistemic honesty in output design',
          reasoning: 'When the retrieval layer returns no Wikidata record for a vendor, or no pricing data for an enterprise tier, the typical AI response is to either hallucinate a placeholder or silently omit the row. Both are wrong for procurement. SaaSScout renders missing evidence as an explicit cell in the evidence table, tagged with the lane it came from. A blank pricing cell is a procurement red flag — it usually signals "contact sales" or a non-public tier — and surfacing it as a gap gives the analyst the right signal: this is something you must verify before buying. The design rule is that absence of evidence is itself evidence, and the product makes it visible rather than papering over it.',
        },
        {
          decision: 'Provider-neutral LLM layer: Groq Qwen 32B → Ollama Qwen 2.5 1.5B → deterministic template',
          reasoning: 'Tying a RAG pipeline to one LLM provider is a reliability risk. Groq\'s hosted Qwen 32B is fast — sub-2-second inference on the structured prompt — but rate-limited under demo traffic. Ollama\'s local Qwen 2.5 1.5B is available offline and avoids API costs, but slower and quantized. The pipeline checks availability in order: Groq first, Ollama second, deterministic grounded template last. The template fallback is not a degraded mode: it uses the same six-signal ranking and the same retrieved evidence, formats them into the same scorecard and recommendation memo, and delivers a procurement-ready output without any LLM call. Because the LLM is positioned as an assembler and narrator rather than a knowledge source, the fallback degrades in fluency but never in factual grounding.',
        },
        {
          decision: 'Packaged artifact, same-origin proxy, and scheduled smoke monitor for zero-dollar reliability',
          reasoning: 'Three infrastructure decisions compound into production reliability on a free-tier stack. The processed Chroma index and normalized data are packaged as a versioned zip in a GitHub Release and pulled at backend startup via DATA_ARTIFACT_URL — dropping cold-start rebuild time from 5 minutes (Kaggle re-download plus Chroma rebuild) to roughly 30 seconds. Frontend API calls route through a Netlify /api/* edge proxy instead of cross-origin requests, collapsing CORS preflight latency and enabling same-origin caching. A scheduled GitHub Actions workflow hits /health, /api/status, and a low-cost template /api/analyze to keep the Render dyno warm during business hours and reports the first failing layer — Netlify, Render, Chroma, enrichment, or analyze — on failure. The combination delivers observable, warm, reproducible infrastructure at $0.',
        },
      ],
      keyFindings: [
        {
          stat: '6-signal',
          title: 'Pre-generation ranking',
          description: 'Every retrieval candidate is scored across feature-fit coverage, pricing match, review sentiment, provenance trust, query-keyword alignment, and category overlap before the LLM prompt is assembled. The ranking is deterministic and inspectable — no black-box confidence number, just a composite score derived from labeled, retrieved evidence.',
        },
        {
          stat: '4 collections',
          title: 'Partitioned vector indexing',
          description: 'Capterra reviews, FactGrid enterprise metadata, Wikidata vendor facts, and OpenAlternative open-source discovery each live in their own Chroma collection with their own TF-IDF fallback index. Separate indexing means separate trust profiles, independent retrieval tuning, and source-labeled output the user can audit lane by lane.',
        },
        {
          stat: '3 tiers',
          title: 'LLM fallback chain',
          description: 'Groq Qwen 32B online → Ollama Qwen 2.5 1.5B local → deterministic grounded template. Each tier consumes the same six-signal ranked evidence from the retrieval layer. The template fallback produces a full procurement scorecard with no LLM call — output that degrades in fluency but never in factual grounding.',
        },
        {
          stat: '0',
          title: 'Hallucinated citations in any output mode',
          description: 'The LLM never sees a request without pre-ranked, sourced evidence already in the prompt context. It cannot fabricate a feature not in the retrieved data because the prompt architecture leaves no room for it. Missing evidence surfaces as explicit labeled gaps, not as model-generated placeholders.',
        },
      ],
      features: [
        {
          title: 'Configure-then-run dashboard',
          description: 'The single-pane workspace where evaluations happen. Pick a scenario (Support desk review risk, CRM under $30, PM automation shortlist, CRM vendor comparison), set required features and pricing constraints, choose tools to compare, and run. Demo presets seed reasonable defaults so a first-time user can fire a useful query in three clicks.',
          insight: 'Resists the temptation to be a generic chat box. Every input is structured (scenario, category, budget, required features, tools to compare) so the retrieval can rank with confidence before the LLM ever sees the query.',
          image: '/projects/saas-scout/00-hero.png',
          imageFit: 'contain',
        },
        {
          title: 'Side-by-side comparison + scorecard',
          description: 'The output surface for a compare-three-tools query: confidence rating (Low / Medium / High), aligned-features count, feature scorecard per tool, pricing summary, review-derived pain points, recommendation memo, and a list of follow-up procurement checks. Everything grouped so the user can scan one tool top-to-bottom or compare across tools.',
          insight: 'The recommendation memo at the end is what makes the output portable. Analysts can paste it into a Slack thread or a procurement deck without rewriting; the format matches what they would have written by hand.',
          image: '/projects/saas-scout/01-comparison.png',
          imageFit: 'contain',
        },
        {
          title: 'Evidence lanes panel',
          description: 'Behind every claim is a sourced row. The Evidence panel exposes the FactGrid Enterprise Metadata table (vendor verification, pricing cross-checks, SLA notes, audit dates), Wikidata Vendor Facts (entity type, official website, country, parent organization, stock ticker), and the underlying review snippets. "Missing" cells are rendered as cells, not hidden, so absent evidence reads as a real finding.',
          insight: 'Showing the data tables is the opposite of magic-AI marketing. The app earns trust by showing exactly what it knows and what it does not, including the URL each fact came from.',
          image: '/projects/saas-scout/02-evidence.png',
          imageFit: 'contain',
        },
        {
          title: 'Mobile responsive workspace',
          description: 'The full evaluation flow stacks cleanly on phones: data status header, query box, scenario controls, feature checklist, comparison set, and run settings. Same components, same evidence lanes, same template fallback path; just laid out vertically with touch-sized targets.',
          insight: 'Mobile parity matters for analysts who do quick sanity checks on the train. One set of components and one set of typography across viewports, not a stripped-down mobile variant.',
          image: '/projects/saas-scout/03-mobile.png',
          imageFit: 'contain',
          phoneFrame: true,
        },
      ],
      tools: [
        {
          name: 'React + TypeScript + Vite + Tailwind',
          purpose: 'Frontend dashboard, scenario presets, evidence tabs, loading states, template-mode retry, responsive grid. Same component library across desktop and mobile.',
        },
        {
          name: 'FastAPI',
          purpose: 'Backend service with routes for health, status, options, and analysis. Bootstraps the production artifact on startup and caches expensive status checks.',
        },
        {
          name: 'Chroma',
          purpose: 'Vector store for four separate evidence collections (products, Capterra reviews, FactGrid metadata, OpenAlternative). Each collection is indexed independently with its own embedding space and a pre-built TF-IDF fallback. Queries hit all lanes in parallel via cosine similarity, with metadata filtering for category and source. The partitioned design lets retrieval be tuned per trust level and lets the UI label every result by its origin collection.',
        },
        {
          name: 'Groq + Ollama (Qwen)',
          purpose: 'Provider-neutral LLM assembly layer. Groq\'s hosted Qwen 32B handles online inference at sub-2-second latency; Ollama\'s local Qwen 2.5 1.5B covers offline and zero-API-cost scenarios. A deterministic grounded-template path activates when both providers are unavailable, producing a full procurement scorecard from the same ranked retrieval output — no LLM call required, no hallucinations possible.',
        },
        {
          name: 'Netlify + Render',
          purpose: 'Frontend deploy with same-origin /api/* proxy to the Render-hosted FastAPI backend. Both free-tier; cold-start handling lives in the monitor and the packaged artifact.',
        },
        {
          name: 'GitHub Actions',
          purpose: 'Scheduled production monitor that hits /health, /api/status, and a low-cost template /api/analyze. Reports the first failing layer (Netlify, Render, Chroma, enrichment, or analyze) on failure.',
        },
        {
          name: 'Multi-source data ingest',
          purpose: 'CompareEdge SaaS Market Data (Kaggle), Capterra Ticketsystem reviews, FactGrid enterprise metadata (CC BY 4.0), Wikidata vendor facts (CC0), and OpenAlternative open-source discovery (CC0).',
        },
        {
          name: 'Python data pipeline',
          purpose: 'Schema discovery, canonical product-name normalization, product / pricing / feature / review joins, unmatched-record QA, and evidence enrichment.',
        },
      ],
      impact: {
        title: 'The business case for building on RAG instead of prompts',
        content: 'SaaSScout is a working argument that the right architecture for high-stakes AI work is not a smarter prompt — it is a retrieval layer that owns the facts so the generation layer never has to guess. Generic LLMs fail procurement tasks not because the models are bad but because the task requires grounded, auditable, source-traceable output that training data alone cannot provide. RAG delivers that by design: the pipeline retrieves before it generates, ranks before it narrates, and labels every output with the lane and row it came from.\n\nThe product value of this architecture is measurable. Analysts get a recommendation memo they can drop directly into a Slack thread or procurement deck. Every feature claim cites a source. Every pricing gap is flagged rather than papered over. The fallback chain means the app delivers a useful output even when the LLM provider is rate-limited or offline. That reliability is not incidental — it is the product.\n\nBuilding SaaSScout sharpened a conviction I now apply to every AI product decision: the expensive part is not the model. It is the data pipeline, the evidence partitioning, the ranking heuristics, and the fallback architecture. Models are a commodity. Grounded retrieval infrastructure is the moat. Any team that skips RAG in favor of prompt engineering is trading short-term simplicity for long-term hallucination debt.',
      },
      limitations: {
        title: 'Honest caveats',
        items: [
          'Demo data is Kaggle\'s CompareEdge 2026 SaaS market snapshot, not live vendor pricing. Real procurement use would need a refresh cadence and pricing-API hooks.',
          'Many enterprise tools list pricing as "contact sales" rather than a number. Those quotes appear as gaps in the pricing table, which is honest but means budget-aware ranking is limited for higher tiers.',
          'Render\'s free tier has cold starts. The scheduled monitor mitigates but does not eliminate the first-of-day delay.',
          'LLM rate limits during demo spikes fall back to the deterministic template, which is grounded but reads less naturally than the LLM output.',
          'No user accounts, saved evaluations, or team sharing yet. Each session is stateless.',
          'The four evidence lanes are the curated v1 set. Adding G2, TrustRadius, and vendor-direct feature pages is the obvious v2 priority.',
        ],
      },
    },
  },
  {
    id: 'pantry-pilot',
    title: 'PantryPilot: Know What Will Spoil, Cook What You Have',
    category: 'Entrepreneurship',
    dates: 'Jan 2026 - Apr 2026',
    organization: 'University of Toronto',
    courseCode: 'MGSD24 - New Venture Creation and Planning',
    description: 'A new venture concept and working UX prototype for a smart pantry management app. PantryPilot connects inventory risk, recipe matching, and grocery planning into one system to help households cut the average $1,300+ in avoidable food waste per year. Validated through a 50-person primary research survey, a 24-month financial model projecting break-even at Month 17, and a React 18 + TypeScript prototype deployed on Netlify.',
    skills: ['Product Strategy', 'Market Research', 'Financial Modeling', 'User Research', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'UX Design', 'Entrepreneurship'],
    image: '/projects/pantry-pilot/00-dashboard.png',
    links: [
      {
        type: 'live',
        url: 'https://pantry-pilot-demo.netlify.app',
        label: 'Live prototype',
      },
      {
        type: 'github',
        url: 'https://github.com/Calvin-Liew/pantry-wise-pilot',
        label: 'Source on GitHub',
      },
    ],
    extendedContent: {
      stats: [
        { value: '50', label: 'survey respondents' },
        { value: '$1,300+', label: 'avg household food waste/yr' },
        { value: '90%', label: 'found logging easy' },
        { value: 'M17', label: 'projected break-even' },
      ],
      pullQuote: 'Know what will spoil, cook what you have, save what you spend. The problem is not willpower — it is the absence of a system that connects what you have, what is expiring, and what you can cook, in one place.',
      overview: {
        title: 'A food waste venture built on real user pain, not a feature list',
        content: 'PantryPilot is a new venture project that combines primary market research, a 24-month financial model, and a working UX prototype into one argument: households need a unified food management system, not three disconnected apps. The average Canadian household wastes more than $1,300 worth of edible food every year — 63% of what gets thrown out could have been eaten. Existing solutions each fix one piece: recipe apps ignore expiry dates, inventory trackers do not recommend meals, and grocery list tools do not connect to what is already in the fridge.\n\nThe concept addresses all three layers in one flow: scan groceries in, receive Use-Next alerts as items approach expiry, get recipe suggestions that prioritize at-risk ingredients, confirm cooking in one tap, and receive smart restock suggestions for the next grocery run. The prototype is built in React 18 + TypeScript with Zustand for state, Recharts for savings visualization, and Framer Motion for micro-interactions. It uses intentional mock data rather than a live backend — a deliberate choice to validate the full UX flow before committing to infrastructure investment.',
      },
      motivation: {
        title: 'The $21.9B household food waste problem that apps have not solved',
        content: 'Food waste in Canada is documented and financially significant. Second Harvest estimates 46.5% of all food produced in Canada is wasted, with an avoidable cost of $58 billion per year. At the household level, Love Food Hate Waste Canada puts the average annual cost at over $1,300 per household — nearly equivalent to a month of rent for many urban renters. Statistics Canada reports that 23% of avoidable waste is driven by best-before date confusion, which directly maps to the Use-Next and expiry-risk prioritization features in PantryPilot.\n\nThe 50-person survey conducted for this project confirmed that existing apps do not solve the planning problem where most waste actually happens. 74% of respondents rely on instinct to manage groceries, 16% use nothing at all, and 68% identified food planning — not the grocery run itself — as their biggest pain point. The strategic insight: the problem is not memory or willpower. It is the absence of a system that connects what you have, what is about to expire, and what you can cook, in one place, in under 30 seconds.',
      },
      decisions: [
        {
          decision: 'Sort everything by expiry risk, not recency or category',
          framework: 'Jobs-to-be-done: eliminate "what do I cook tonight" friction',
          reasoning: 'Most inventory apps organize items by when they were added or by food category. PantryPilot sorts by expiry risk by default across every surface: the inventory list, the recipe ranking, the at-risk queue, and the grocery suggestions. The Today dashboard leads with a "rescue priority" card naming the single highest-risk item and surfacing a recipe that uses it. This was a product positioning decision as much as a UX one: the app\'s core job is to make cooking the at-risk food the path of least resistance, and every sort order and default encodes that value.',
        },
        {
          decision: 'Connect inventory status to recipe output directly',
          reasoning: 'Survey data showed that users do not struggle to find recipes — they struggle to know which recipes are actually cookable right now. PantryPilot\'s recipe engine ranks by the intersection of expiry risk and ingredient coverage simultaneously: a recipe that uses three at-risk items and needs only one missing ingredient scores higher than one with full ingredient coverage but no urgent items. The ingredient coverage bar (3/5, 5/5) gives users an immediate read on cookability without reading a full list.',
        },
        {
          decision: 'Cook Mode as the inventory update mechanism',
          reasoning: 'The hardest UX problem in pantry apps is keeping inventory accurate after cooking. PantryPilot makes cooking the trigger for inventory updates: tapping "Cook" shows the ingredient quantities that will be deducted, the user confirms or adjusts, and the app subtracts automatically. Leftover tracking with AI-suggested expiry windows closes the loop. This removes the manual update step that kills long-term retention in competing apps — accuracy is maintained as a side effect of cooking, not as an extra chore.',
        },
        {
          decision: 'Show savings in dollars, not weight or "meals saved"',
          reasoning: 'Survey feedback showed users trust the app most when they can see concrete financial outcomes. The Insights dashboard shows total rescued value, items at financial risk, monthly savings goal progress, and a spending breakdown in dollars. The decision to show dollar amounts rather than environmental metrics was deliberate: budget-conscious users in the core segment, students and young professionals in Toronto, respond to money saved more than CO2 equivalent. A user who sees "$65 rescued this month" has a quantified, personal reason to keep logging.',
        },
        {
          decision: 'Build a mock-data prototype before any backend investment',
          reasoning: 'The first version of PantryPilot does not call a real API. Barcode scanning, price lookups, recipe intelligence, and savings calculations are all simulated. This was a deliberate architecture decision: the venture-stage risk is whether users understand and want the UX, not whether a backend can scale. Building a full API before validating the use-next → recipe → cook → restock loop would have inverted the risk. The prototype showed the complete flow to 50 survey respondents and achieved 90% task-completion ease on the core logging action, validating UX before a dollar was spent on infrastructure.',
        },
        {
          decision: 'Freemium model with premium features tied to power-user behaviour',
          reasoning: 'The financial model started with one question: what do free users need, and what will power users pay for? The free tier covers the core loop — inventory tracking, Use-Next alerts, and basic recipe suggestions. Premium adds budget tracking, savings analytics, advanced recipe filtering, family sharing, and smarter restock suggestions. The $4.99/month price point sits below the cost of one wasted grocery item, making the value proposition legible: one rescued item per month covers the subscription. The model projects 5% paid conversion starting Month 4 and cash-flow break-even at Month 17.',
        },
      ],
      keyFindings: [
        {
          stat: '68%',
          title: 'Planning is the pain point, not shopping',
          description: '68% of survey respondents identified food planning as their biggest friction point — not the grocery run itself. This shifted the product framing from "inventory tracker" to "decision-support tool": the job is not cataloguing what you have, it is answering "what do I cook tonight with what is about to expire."',
        },
        {
          stat: '74%',
          title: 'Instinct-only food management',
          description: '74% of respondents manage groceries by instinct alone, and 16% use nothing at all. Only 10% use any structured system. This is the market gap: a large majority of households make daily food decisions with no system, and the cost is over $1,300 per year in avoidable waste.',
        },
        {
          stat: '90%',
          title: 'Core logging rated Easy or Very Easy',
          description: '90% of respondents rated the primary logging action as Easy or Very Easy — the most critical retention metric in a habit-forming app. The barcode-first, smart-defaults entry flow (storage location auto-selected, shelf life estimated when expiry is missing) kept the task under 10 seconds per item.',
        },
        {
          stat: '62%',
          title: 'Return intent after first session',
          description: '62% said they would likely or definitely return the following week. For a first-session prototype with mock data, this suggests the core value proposition — see what will expire, cook it, track what you saved — was clear enough to motivate repeat use intent before any real data was in the system.',
        },
      ],
      features: [
        {
          title: 'Today dashboard',
          description: 'The command center: pantry health score, food-at-risk dollar value, total saved, ready recipe count, weekly budget tracker, a rescue priority card naming the highest-risk item with a direct Cook path, and the full at-risk queue sorted by days remaining. Everything a user needs to know about their pantry in one scroll, oriented around one question: what should I do right now?',
          insight: 'The rescue priority card was the most-clicked element in usability testing. Naming one specific item ("Baby Spinach — 1 day left — $3.99 at risk") converts abstract waste anxiety into a concrete, actionable task. The dashboard is designed to make that the first thing a user sees.',
          image: '/projects/pantry-pilot/00-dashboard.png',
          imageFit: 'contain',
        },
        {
          title: 'Use-Next: expiry-first triage queue',
          description: 'Every item nearing or past its safe-use window, surfaced in one view sorted by urgency. Each row shows days remaining, risk level (High / Medium), and the estimated dollar value at risk. Three inline actions — Cook with this, Used it, Tossed — resolve the item without leaving the view. The total at-risk dollar figure ($36.43 in the demo) sits at the top as the motivating number, broken into "3 Today" and "4 This Week" groupings for prioritization.',
          insight: 'The decision to show dollar value at risk rather than item count came from survey feedback. Users who saw "$36 at risk" acted faster than those who saw "7 items expiring." Money is a more urgent signal than a count.',
          image: '/projects/pantry-pilot/06-use-next.png',
          imageFit: 'contain',
        },
        {
          title: 'Recipe matching by coverage and expiry risk',
          description: 'Recipes ranked by the intersection of ingredient coverage and expiry urgency. The coverage bar (5/5 for One-Pot Garlic Spinach Pasta) shows what fraction of ingredients are already in the pantry. The "Use soon" badge flags recipes that consume at-risk items. Filter tabs (Ready to cook, Quick, Healthy, Budget, Breakfast, Dinner) let users narrow further. Ingredient count, cook time, calories, and difficulty are all visible on the card without clicking through.',
          insight: 'The ingredient coverage bar was the highest-rated UI element in the survey. Users said it answered "can I actually cook this?" at a glance, without reading a full ingredient list — which is the decision they were trying to make quickly.',
          image: '/projects/pantry-pilot/02-recipes.png',
          imageFit: 'contain',
        },
        {
          title: 'Smart grocery suggestions',
          description: 'AI-assisted restock recommendations based on three signals: low-quantity items currently in the pantry, ingredients needed to complete near-ready recipes, and pantry staples flagged as running low. Each suggestion shows the estimated price and days of shelf life remaining. Items can be added to a shopping list in one tap, with duplicate warnings when the item is already tracked in inventory.',
          insight: 'The grocery tab closes the loop: the app tracks what you have, tells you what to use, and then tells you what to buy next. Without the restock recommendation, users would still need a second app for their shopping list — which breaks the single-system value proposition.',
          image: '/projects/pantry-pilot/04-grocery.png',
          imageFit: 'contain',
        },
        {
          title: 'Savings and pantry health insights',
          description: 'The Insights page closes the feedback loop: total rescued versus wasted, monthly savings goal with progress bar and "goal reached" confirmation, pantry health score (out of 100), and a weekly/monthly spending breakdown. The Rescue CTA at the bottom of the savings card links directly back to the Use-Next queue, connecting the tracking surface to the action surface in one tap.',
          insight: 'Savings data is the stickiest content in the app. Users who see a number they contributed to — "$65 rescued" — want to see it increase. Personalizing the monthly goal (user-set) gives the app a reason to be opened even on days with no urgent expiry, which is the retention pattern the freemium model depends on.',
          image: '/projects/pantry-pilot/03-insights.png',
          imageFit: 'contain',
        },
        {
          title: 'Mobile-first layout',
          description: 'The full PantryPilot flow on a phone: quick-access CTAs (View Inventory, Add Items, Meal Plan) above the fold, pantry health and food-at-risk metrics in a two-column card grid, rescue priority card immediately visible, and a bottom tab bar for Today / Inventory / Use Next / Recipes / Grocery / Insights. No content behind hamburger menus or nested drawers.',
          insight: 'The mobile layout enforced information hierarchy discipline that helped improve the desktop too. Every section on Today had to earn its above-the-fold position when constrained to a 390px viewport — two desktop sections that users were not scrolling to were cut as a result.',
          image: '/projects/pantry-pilot/05-mobile.png',
          imageFit: 'contain',
          phoneFrame: true,
        },
      ],
      tools: [
        {
          name: 'React 18 + TypeScript + Vite',
          purpose: 'Frontend application framework. Vite\'s fast HMR made iterating on the UX prototype rapid; TypeScript enforced data shape consistency across the mock inventory, recipe, and savings models.',
        },
        {
          name: 'Tailwind CSS + shadcn-style UI primitives',
          purpose: 'Design system. Tailwind utility classes plus shadcn-inspired components for cards, badges, progress bars, and tabs. Consistent use of green as the primary action color reinforces the "fresh / safe" visual language throughout.',
        },
        {
          name: 'Zustand',
          purpose: 'State management for pantry inventory, recipe list, use-next queue, and savings totals. Minimal API made the mock data layer easy to update — simulating a Cook action is a single store mutation with automatic inventory subtraction.',
        },
        {
          name: 'Recharts + Framer Motion',
          purpose: 'Recharts powers the savings and spending charts in Insights. Framer Motion handles micro-animations on card entries, use-next item resolution (Cook / Used / Tossed), and page transitions — kept subtle so animation signals state change without slowing the task flow.',
        },
        {
          name: 'Primary research survey (Google Forms)',
          purpose: '50-respondent structured survey covering current food management behaviour, prototype usability, and willingness to pay. Both closed-ended (Likert, multiple choice) and open-ended questions, analyzed to validate the core value proposition and surface product improvement priorities.',
        },
        {
          name: '24-month financial model',
          purpose: 'Cash flow model with production/sales forecast, freemium conversion assumptions (5% → 6% → 7% across three periods), 4% monthly churn, two-stage funding ($20K founder seed at M1 + $25K angel at M7), and dual valuation (3.5× revenue multiple + 20% discount DCF). Projects $8,895 net income in Year 2 and $959K firm value at Year 5.',
        },
      ],
      impact: {
        title: 'What the venture proved — and what remains to be validated',
        content: 'PantryPilot validated the core product hypothesis: users understand and want a unified food management system, find the logging flow easy enough to form a habit, and respond to savings data as a retention mechanism. The 50-person survey confirmed that food planning — not shopping — is where the pain is concentrated. This reoriented the product from an inventory tracker to a decision-support tool, which changed the information hierarchy, the recipe ranking algorithm, and the dashboard design.\n\nThe financial model showed a credible path: $45,000 in two-stage funding supports a free-tier soft launch, premium conversion at 5% begins Month 4, and the business reaches cash-flow break-even at Month 17-18 with $8,895 net income in Year 2 as the active paid subscriber base crosses 1,500 users. At $4.99/month, one rescued grocery item per month more than covers the subscription against a $1,300+ annual waste baseline — the value proposition is legible before a user even opens the app.\n\nThe honest remaining unknown is retention. Survey return intent is not the same as showing up the following Tuesday when the fridge is full and logging feels like friction. The next validation gate is a multi-week closed beta with real barcode scanning, live pricing, and observed usage data before any marketing spend.',
      },
      limitations: {
        title: 'Honest caveats',
        items: [
          'The prototype uses mock data throughout. Barcode scanning, price lookups, recipe intelligence, and savings calculations are all simulated. Production would require a barcode API, a recipe database with ingredient-to-inventory matching, and a live pricing feed.',
          'Retention is unvalidated. 62% return intent from a survey is a stated preference, not observed behavior. Multi-week usage testing is needed to confirm whether the logging habit forms and holds after the initial novelty wears off.',
          'The Insights section tested as "somewhat difficult to understand at first glance" for 60% of respondents. The savings breakdown and pantry health score need clearer labeling and fewer competing data points to reduce cognitive load.',
          'Price recommendation credibility was mixed: roughly half of respondents found the grocery suggestion pricing credible, but trust dropped when prices could not be verified against real store data. A live pricing feed is a prerequisite before that feature can be monetized.',
          '30% of respondents encountered at least one irrelevant recipe recommendation, pointing to the need for user preference personalization (dietary restrictions, time constraints, skill level) before scaling the recipe engine to a production dataset.',
          'This was a 5-person course project with a semester timeline. A production venture would sequence research, modeling, and building more deliberately rather than running them in parallel under an academic deadline.',
        ],
      },
    },
  },

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
        content: 'The interesting question is not how big the AI productivity market is. It is what the existing players keep getting wrong. ChatGPT lives in a different tab from your files. Copilot is anchored to a single document at a time. Notion offers tools but asks you to maintain them. Across all three, the user is the one wiring up the connection between the AI and the work. Companion\'s product bet is that the next surface for AI is not "another tool you call when you need it" but "an assistant that lives inside the place your work already lives." Everything that follows (the persona model, the consent flow, the six scenarios, the in-Drive surface) comes from that single product premise.'
      },
      decisions: [
        {
          decision: 'Build in-house, not buy or partner',
          framework: 'Resource-Based View · VRIN',
          reasoning: 'Run through VRIN, Google\'s combination of custom TPU infrastructure, deep Workspace integration, DeepMind/Google Research, and existing user trust is valuable, rare, inimitable, and non-substitutable in combination. Any external partner has one or two of those legs, never all four. An integration deal would also hand the same structural advantage to whichever competitor signed the next quarter. The make decision is not about cost; it is about which moat compounds.'
        },
        {
          decision: 'People-centric, not file-centric',
          reasoning: 'Copilot anchors to documents. ChatGPT anchors to prompts. Both leave the user wiring up the connection between their work and the AI. Companion anchors to what the user is actually trying to accomplish (survive a semester, run a project, prep for a meeting) and pulls the relevant files in from that intent. Same kind of AI work, but the entry point is a person, not a file. Every scenario in the prototype (Syllabus-to-Schedule, Meeting Chief of Staff, Work Rhythm Optimiser) starts from a goal, not a file selection.'
        },
        {
          decision: 'Permission-first onboarding',
          reasoning: 'User research showed 70% comfort with AI summarization, conditional on transparency. So Companion activates one scenario at a time during onboarding with explicit per-folder consent, and a visibility dashboard shows current access at any time. The slower start hurts day-one activation metrics, but on a product where trust is the long-run constraint, retention beats activation. Blanket scanning of all Drive content was on the table and would have been faster to implement. It would also have killed the product on the first privacy headline.'
        },
        {
          decision: 'Single product, dual persona',
          reasoning: 'A "Companion for Education" and a "Companion for Work" were both on the table. The catch: many users move between personas. A graduating student becomes a professional in twelve months; an exec takes an online course in the spring. Splitting the product would force a migration at exactly the moment the user is already context-switching. One product with persona detection (student / professional) retains the user across the transition and keeps a single codebase to evolve.'
        },
        {
          decision: 'Embedded in Drive, not a standalone app',
          reasoning: 'A separate "Drive Companion" app on iOS and Android was the easy default. But the entire pitch is that Companion lives where the files already do. The moment it becomes a separate app, it inherits the upload chore that defines ChatGPT and Copilot. Embedded means Companion shows up inside the Dashboard, the doc preview, the sheet sidebar, the meeting summary card. Mobile happens because Drive happens on mobile, not because Companion ships a new app.'
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
        content: 'TMPP\'s research showed a gap between how students picture music careers and how the industry actually works today. Sound design, music technology, digital content, community arts, arts management, music therapy: none of it surfaced clearly in the old site. The redesign turns that information into something students can actually navigate: a confident hero that names the reframe out loud, an 8-pathway preview that cycles through the full scope on first load, dual entry points for students and educators, and a 3-step discovery flow that gets people from "I don\'t know my options" to "here\'s what to do next."'
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
          reasoning: 'The original mascot was Jay, a blue jay character. Friendly, but a blue jay doesn\'t actually say "music." The mascot also had to read as music without forcing one culture\'s notation system on a multicultural Canadian student body. A treble clef or piano keys would have quietly excluded students from non-Western musical traditions. A metronome is universal across genres and cultures, and it just means time and pace. Tempo\'s LED-faced design plus the U of T navy + crimson palette satisfies Keller\'s offensive criteria (memorable, meaningful, likable) and finally gives the chatbot a face that\'s on-brief.'
        },
        {
          decision: 'Interactive map as the primary surface, chatbot as the supporting voice',
          reasoning: 'The original led with a keyword chatbot that operated in isolation from the resources. Students had to phrase questions correctly to get answers, and the answers were text-only with no visual context. The redesign inverts that hierarchy: the interactive pathway map is the primary way to explore, and the chatbot exists alongside it to highlight clusters that match a student\'s plain-language interest. The map gives students agency; the chatbot gives them help. Neither alone would have replaced the PDFs.'
        },
        {
          decision: 'One site, two self-routing audiences',
          reasoning: 'Students need to discover unfamiliar roles. Educators need resources they can hand to a class. Building two separate sites would have doubled the maintenance and split the brand. Instead, the homepage offers a clear two-card split (For Students and For Educators) that lets each audience self-route after the shared hero. Same brand, same content backbone, audience-specific copy and CTAs from the moment of choice forward.'
        },
        {
          decision: 'Lightweight prototype chatbot, not a production AI build',
          reasoning: 'A full LLM-backed chatbot would have meant API costs, content safety review, and weeks of evaluation work for a course-scope prototype. The build uses keyword matching that triggers the same visual highlighting the production version would do. It demonstrates the intended UX (student types interest, map responds, Tempo speaks) without the infrastructure overhead. The right move when the goal is to validate the experience design, not to ship to thousands of users on day one.'
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
            note: 'The mobile experience gets the same reframe end-to-end (same hero, same pathway preview, same tagline emphasis), responsive across screen sizes instead of a different IA on phone.',
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
          description: 'Research kept surfacing that students value tools that build confidence over tools that save time. The redesign moves up Keller\'s means-end chain from "find the right document" to "feel supported deciding what to explore next". The brand promise is calm and possibility, not just information.'
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
          description: 'Research-Informed, Curriculum-Connected, Student-Centered: three cards positioned next to the "What Is The Music Pathways Project?" paragraph. Each pillar gets a meaningful icon, a one-line label, and a sentence of substantiation.',
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
        content: 'The original TMPP site was correct but invisible. The information was research-informed, the careers were real, the support resources existed, but students would not have known any of that from the homepage. The redesign\'s job was not to invent content, it was to make the brand legible: the moment a student lands, they see the reframe ("more than perform, teach, or quit"), see the evidence (30+ pathways, 100% research-informed), and see the next step (explore, connect to programs, plan).\n\nApplying CBBE meant treating every section as one rung of the pyramid: salience in the hero, performance and imagery in the pillars, judgments in the stats strip, feelings in the dual-audience care, resonance in the discovery flow. Consumer behavior principles meant lowering search costs at every turn: visual instead of textual, grouped instead of listed, guided instead of open.\n\nFor my own product instincts, this project drove home that great branding is not decorative work. It is structural work: it decides which 8 things land in the first viewport, which audiences self-route without friction, and which sentence gets repeated across hero, explorer, and CTA so the brand promise is felt rather than declared.'
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
    id: 'tmg-website',
    title: 'TMG Website Redesign: From Static Brochure to Task-Oriented Experience',
    category: 'UI/UX Design',
    dates: 'Apr 2025 - Aug 2025',
    organization: 'The Marketing Group (TMG) — University of Toronto Scarborough',
    description: 'A 90-day mobile-first redesign of the UTSC Marketing Group\'s website that cut bounce rate from 62% to 23%, grew sessions by 67%, and increased average session duration by 30% to 3m 36s. Rebuilt the information architecture around five distinct user journeys — students, event attendees, applicants, sponsors, and social visitors — and applied a full suite of HCI principles (Nielsen heuristics, Shneiderman\'s golden rules, Fitts\'s Law, Hick\'s Law, Gestalt) across every page.',
    skills: ['UX Design', 'Information Architecture', 'Wix', 'Responsive Design', 'Google Analytics', 'Visual Hierarchy', 'HCI Principles', 'Conversion Optimization', 'UX Research', 'Design Systems'],
    image: '/projects/tmg-website/new-home-desktop-viewport.png',
    links: [
      {
        type: 'live',
        url: 'https://www.utsctmg.ca/',
        label: 'Live site',
      },
      {
        type: 'github',
        url: 'https://calvin-liew.github.io/TMGWebsite/',
        label: 'Case study',
      },
    ],
    extendedContent: {
      stats: [
        { value: '+67%', label: 'total site sessions' },
        { value: '62%→23%', label: 'bounce rate reduction' },
        { value: '+45%', label: 'unique visitors' },
        { value: '3m 36s', label: 'avg session duration (+30%)' },
      ],
      pullQuote: 'The site was not redesigned to look newer. It was redesigned so that students, applicants, and sponsors could each find their path in under ten seconds.',
      overview: {
        title: 'A product-minded UX overhaul of a student organization web presence',
        content: 'The Marketing Group (TMG) at the University of Toronto Scarborough had a Wix-hosted website that communicated brand identity but generated significant engagement friction: a 62% bounce rate, weak mobile usability, shallow navigation, and conversion paths that required users to search for next actions. The 90-day redesign treated the website as a product with measurable user journeys rather than a digital brochure with pages.\n\nThe outcome was a mobile-first, task-oriented experience structured around five distinct audience jobs: students discovering TMG, event attendees finding what to attend, applicants evaluating whether to join, sponsors evaluating partnership, and social visitors looking for the Linktree. Each page was rebuilt with a clear information hierarchy, specific CTAs, and a design system — brand pink, navigation navy, Raleway headings, Wix Madefor Text body, 1180px desktop content width — that creates consistency across every surface. Analytics confirmed the shift: sessions up 67%, unique visitors up 45%, bounce rate dropped to 23%, and average session duration up 30% to 3m 36s.',
      },
      motivation: {
        title: 'Six original UX problems that analytics confirmed were real',
        content: 'The redesign was not driven by aesthetic preference. Google Analytics data pointed to specific engagement problems that traced to identifiable UX failures in the original Wix site.\n\nMobile usability: the old layout did not reliably adapt to a phone viewport — navigation compressed, section spacing broke, and interaction targets were too small for mobile students. Mobile traffic was the largest segment, so every user on a phone was hitting a degraded experience.\n\nInformation architecture: the old four-item navigation did not expose the user tasks that mattered most — events, joining, sponsorship, organizational structure. Visitors with a clear goal (apply, sponsor, find a specific event) had no efficient entry point.\n\nCognitive load: large photo compositions with overlapping content regions, mission copy over a busy team photograph, and sparse whitespace forced users to infer page purpose and next steps. The visual hierarchy competing with decorative imagery meant important content did not read as important.\n\nWeak conversion paths: the joining path, event discovery, and sponsor engagement all required users to locate the relevant action. CTAs were present but buried beneath content that did not orient them.\n\nInconsistent hierarchy: important content competed with decorative imagery, blank space, and a Wix platform banner. The brand was visible; the actions were not.\n\nLimited orientation: the site gave users little sense of where they were in the experience. Navigation did not reflect active states, footer was sparse, and section structure did not sequence the experience from awareness to action.',
      },
      decisions: [
        {
          decision: 'Redesign navigation around user jobs-to-be-done, not internal page structure',
          framework: 'Hick\'s Law + information architecture',
          reasoning: 'The old navigation had four items that mapped to internal TMG structure rather than student intent. The new navigation exposes six destinations — Home, About, Events, Sponsors, Join Our Team, Linktree — organized to answer the questions real visitors arrive with: "What is TMG?", "What events can I attend?", "How do I join?", "Should we sponsor?". Hick\'s Law predicts that adding choices increases decision time; the redesign counters this by grouping related decisions (event sub-pages under Events, department sub-pages under About) so the top-level choice set stays small while depth is available for committed users. The active state and grouped dropdowns keep users oriented rather than requiring them to remember where they are.',
        },
        {
          decision: 'Mobile-first layout as the design constraint, not a responsive afterthought',
          framework: 'Universal usability + Fitts\'s Law',
          reasoning: 'The student audience discovers events, clubs, and applications from phones. Starting the redesign from a 390px mobile viewport forced information hierarchy decisions that improved the desktop too. Every section on the homepage had to earn its above-the-fold position when constrained to a single column — two sections that were not being scrolled to on desktop were cut as a result. Fitts\'s Law drove specific decisions on mobile: pill CTAs were sized and padded to be comfortable thumb targets, action buttons were placed below relevant content (not floating at page edges), and the bottom navigation on the events page kept tab switching within reach. The result was not a stripped-down mobile variant but a layout that happened to also work at 1180px.',
        },
        {
          decision: 'Apply Gestalt proximity and similarity to organize team and event content',
          framework: 'Gestalt grouping + cognitive load reduction',
          reasoning: 'The old About page displayed team members in a large undifferentiated grid. Users had no way to quickly understand organizational structure, department responsibilities, or which team was relevant to their goal. The redesign grouped team members by function — leadership, business development, events, marketing, operations — with a clear visual break between departments. Gestalt proximity (items close together are read as a group) and similarity (consistent portrait style, role label, and LinkedIn affordance per card) do the work of communicating structure without explicit labels for every relationship. The same principle was applied to event cards: title, date, description, image, and CTA repeat in the same spatial relationship across every event so users learn to scan the pattern after the first card.',
        },
        {
          decision: 'Separate sponsor and CBA applicant paths into dedicated audience experiences',
          framework: 'Audience segmentation + Nielsen\'s user control',
          reasoning: 'The original site mixed sponsor information into general student content. A potential corporate sponsor landing on the homepage found student-facing event content before finding any partner-relevant information. The redesign created a dedicated Sponsors page with a partner-specific first impression, an explicit "Why Sponsor TMG" section (talent pipeline, brand exposure, industry insights, past partner credibility), and a sponsor contact path independent of the student membership flow. The same separation was applied to the CBA Applications route: instead of a centered information card, the new page uses community photography, a role-specific headline, and a "Why Become a CBA?" benefits section that turns a passive information page into a conversion surface. Both pages follow Nielsen\'s match-between-system-and-real-world: the copy, imagery, and CTAs match what each audience is actually evaluating.',
        },
        {
          decision: 'End every page section with closure and a clear next action',
          framework: 'Shneiderman\'s golden rules + conversion design',
          reasoning: 'Shneiderman\'s rule "design dialogs to yield closure" guided the page-level structure. Every major section ends with an action: the homepage hero with "Join The Herd" and "Follow Us", the events section with "View All Events", the about section with "Meet the Team", the sponsor section with "Become a Sponsor", the CBA page with a direct application CTA. This is not just aesthetic — it is functional. Users who finish reading a content block and find no next step bounce or navigate to an unrelated destination. By anchoring every section to an action, the design turns awareness into engagement and engagement into conversion. The footer was also redesigned from a closing brand element into a recovery and wayfinding surface with grouped menu links, contact, address, and social destinations — so users who scroll past what they need can reorient without using the browser back button.',
        },
        {
          decision: 'Document every design decision against specific HCI principles for institutional knowledge',
          framework: 'Nielsen heuristics + Shneiderman\'s golden rules',
          reasoning: 'A redesign that cannot articulate its rationale is vulnerable to being undone by whoever maintains the site next. Every page-level UX decision in this project was mapped to a specific heuristic or principle: recognition over recall (navigation labels reflect user goals, not internal naming), consistency and standards (buttons, cards, section headings repeat across pages), error prevention (clear navigation and footer links reduce wrong turns), reduced short-term memory load (options stay visible rather than requiring users to remember where to find them). Maintaining a documented case study alongside the live site gives future maintainers a design rationale to refer to when they are tempted to add a feature or rearrange a section. The design system — color tokens, typography scale, card anatomy, CTA variants — is documented in the same case study so future contributors work from the same visual language.',
        },
      ],
      beforeAfter: {
        title: 'Before and after',
        intro: 'Seven surface-level comparisons from the same viewport dimensions. The old site had personality and brand energy — the challenge was not to replace that, but to give students, applicants, and sponsors a clearer path through it.',
        pairs: [
          {
            label: 'Homepage',
            before: '/projects/tmg-website/old-home-desktop-viewport.png',
            after: '/projects/tmg-website/new-home-desktop-viewport.png',
            note: 'The old homepage led with a pink photo overlay, centered logo stack, and overlapping About copy — strong brand energy, but the first screen made users infer what to do next. The new homepage sequences the experience: navigation → brand identity → value proposition → two primary CTAs → event cards. Each zone does one job before passing to the next.',
          },
          {
            label: 'Navigation',
            before: '/projects/tmg-website/old-navigation-dropdown-viewport.png',
            after: '/projects/tmg-website/new-navigation-dropdown-viewport.png',
            note: 'The old nav compressed brand logo, menu items, event links, and social icons into one compact strip. The new navigation groups destinations by user intent — About, Events, Sponsors, Join Our Team — with dropdown depth available for committed users, an active state, and the Linktree as a top-level destination. Hick\'s Law at the nav level: same number of decisions, organized so each one maps to a real job.',
          },
          {
            label: 'Events page',
            before: '/projects/tmg-website/old-events-desktop-viewport.png',
            after: '/projects/tmg-website/new-events-desktop-viewport.png',
            note: 'The old events page read as a promotional banner — strong pink composition, event name, broad summary. The new page opens with a full-width audience photo, a direct "Our Events" headline, and a short participation prompt that explains why students should attend. Event entries below follow a repeatable card pattern: title, date, description, image proof, outcomes, CTA. The shift is from announcement to persuasion.',
          },
          {
            label: 'About page',
            before: '/projects/tmg-website/old-about-desktop-viewport.png',
            after: '/projects/tmg-website/new-about-desktop-viewport.png',
            note: 'The old About page placed the mission copy as a white card over a large team photo — readable, but the background competed with the message. The new layout separates them: mission in its own two-column content zone, team members grouped by department below. Gestalt proximity does the organizational work — no explicit labels needed to see where leadership ends and marketing begins.',
          },
          {
            label: 'CBA Applications',
            before: '/projects/tmg-website/old-cba-applications-viewport.png',
            after: '/projects/tmg-website/new-cba-applications-viewport.png',
            note: 'The old CBA page was informational — a centered white card explaining what a Campus Brand Ambassador is. The new page is a conversion surface: community photography, the value line "Represent. Connect. Grow.", and a "Why Become a CBA?" section with concrete benefit framing before the application path. Students were not asking what a CBA is — they were asking why they should become one.',
          },
          {
            label: 'Sponsor path vs. archive',
            before: '/projects/tmg-website/old-archive-desktop-viewport.png',
            after: '/projects/tmg-website/new-sponsors-desktop-viewport.png',
            note: 'The old site mixed sponsor information into general student content; what remains is an archive-style page. The new Sponsors page is a dedicated partner experience: audience-specific hero, a "Why Sponsor TMG" section with four explicit benefit categories (talent pipeline, brand exposure, industry insights, past-partner credibility), and a direct contact CTA. Audience segmentation as an IA decision, not just a visual one.',
          },
          {
            label: 'Mobile homepage',
            before: '/projects/tmg-website/old-home-mobile-viewport.png',
            after: '/projects/tmg-website/new-home-mobile-viewport.png',
            note: 'The old site did not adapt reliably to a 390px viewport — navigation compressed, section spacing broke, and tap targets were undersized for mobile students. The new mobile layout is the canonical starting point: single-column flow, oversized headline and CTAs, stacked event cards, and a footer with grouped navigation links. Because it was designed mobile-first, the hierarchy holds cleanly at every breakpoint rather than stretching a desktop layout.',
          },
        ],
      },
      designSystem: {
        title: 'Design system',
        intro: 'The redesign uses a documented visual language so future maintainers can work from consistent tokens rather than guessing. Pink remains the primary brand signal; navy grounds actions and navigation.',
        palette: [
          {
            name: 'Brand pink',
            hex: '#E83E8C',
            role: 'Primary brand color — hero headlines, primary CTA fills, accent borders, and tab indicators throughout the site.',
          },
          {
            name: 'Deep pink',
            hex: '#C2185B',
            role: 'Hover and active state for pink elements. Provides sufficient contrast shift to signal interactivity without leaving the brand palette.',
          },
          {
            name: 'Navigation navy',
            hex: '#1A2744',
            role: 'Navigation background, footer background, and dark CTA fills. Navy grounds the high-energy pink brand color and creates clear figure-ground separation for white text.',
          },
          {
            name: 'Body ink',
            hex: '#1F2937',
            role: 'Primary body text and section headings on light backgrounds. Near-black rather than true black for softer reading across long-form content sections.',
          },
          {
            name: 'Soft surface',
            hex: '#FFF5F8',
            role: 'Section backgrounds and card fills on pages with heavy content. Warm white with a faint pink cast keeps the brand palette present without saturating the page.',
          },
          {
            name: 'Divider line',
            hex: '#EDD5E0',
            role: 'Section dividers, card borders, and horizontal rules. Muted pink-grey separates content zones without creating harsh visual breaks.',
          },
        ],
        type: [
          {
            name: 'Display heading',
            spec: 'Raleway 700, 40–56px / 1.1, white or navy',
            example: 'The Marketing Group',
            exampleClass: 'text-4xl font-bold text-ink',
          },
          {
            name: 'Section heading',
            spec: 'Raleway 600, 28–36px / 1.2',
            example: 'Our Events',
            exampleClass: 'text-3xl font-semibold text-ink',
          },
          {
            name: 'CTA label',
            spec: 'Raleway 600, 14–16px / 1.0, uppercase tracked',
            example: 'JOIN THE HERD',
            exampleClass: 'text-sm font-semibold tracking-widest text-ink uppercase',
          },
          {
            name: 'Body copy',
            spec: 'Wix Madefor Text 400, 16–18px / 1.6',
            example: 'Connect with like-minded students and build real marketing experience.',
            exampleClass: 'text-base text-ink-soft leading-relaxed',
          },
          {
            name: 'Supporting / metadata',
            spec: 'Wix Madefor Text 400, 13–14px / 1.5, muted',
            example: 'Event · April 2025 · UTSC',
            exampleClass: 'text-sm text-muted',
          },
        ],
        components: [
          {
            name: 'Pill navigation',
            purpose: 'Rounded nav links with dropdown affordance. Active state uses a pink underline or fill. Groups Home, About, Events, Sponsors, Join, and Linktree at the top level with sub-pages in dropdown menus.',
          },
          {
            name: 'Primary CTA',
            purpose: 'White or pink pill button with navy label. Used at hero moments — "Join The Herd", "Follow Us", "Become a Sponsor". Standardized padding and radius across all pages.',
          },
          {
            name: 'Secondary CTA',
            purpose: 'Transparent pill with a pink or white border. Used for secondary actions adjacent to primary CTAs — "Learn More", "View Events". Same sizing as primary so CTAs align naturally in rows.',
          },
          {
            name: 'Event card',
            purpose: 'Repeatable content pattern: title, date, one-line description, event image, outcome statement, and CTA. The same card structure appears on the homepage events section and the Events page, so students learn to scan it after the first instance.',
          },
          {
            name: 'Team member card',
            purpose: 'Portrait photo, name, role label, and LinkedIn link in a fixed-size card. Cards group into department rows using Gestalt proximity — a visual break between leadership and operations without an explicit divider element.',
          },
          {
            name: 'Footer wayfinding',
            purpose: 'Dark navy footer with grouped navigation columns (About, Events, Connect), contact info, address, and social links. Designed as a recovery surface: users who scroll past a CTA can reorient without the browser back button.',
          },
        ],
      },
      keyFindings: [
        {
          stat: '+67%',
          title: 'Total site sessions',
          description: 'Sessions grew 67% in the 90 days following the redesign. The combination of clearer navigation, stronger event discovery, and dedicated audience paths (student, sponsor, applicant) gave each visitor segment more reasons to explore the site rather than exit after a single page.',
        },
        {
          stat: '62%→23%',
          title: 'Bounce rate',
          description: 'Bounce rate fell from 62% to approximately 23% — a 39-point reduction. The most significant driver was mobile layout: once the first screen gave students a clear read on TMG\'s value and a visible next action, the proportion of single-page exits dropped sharply. A 23% bounce rate is strong for a student organization site.',
        },
        {
          stat: '3m 36s',
          title: 'Average session duration (+30%)',
          description: 'Average session duration grew 30% to 3m 36s. Longer sessions indicate that users were navigating between pages — moving from the homepage into events, from events into specific event pages, from about into team departments — rather than reading one section and leaving. The repeatable event card pattern and grouped team content made deeper exploration feel worth the effort.',
        },
        {
          stat: '+45%',
          title: 'Unique visitors',
          description: '45% more unique visitors in the post-redesign period. Some of this reflects word-of-mouth and social promotion, but the retention improvement (lower bounce, longer sessions) also means repeat visits contributed more unique-visitor counts than in the previous period. A site that users return to for event updates and application deadlines compounds its visitor count over a semester.',
        },
      ],
      features: [
        {
          title: 'Homepage redesign',
          description: 'The new homepage gives users a clear first scan: navigation, organization identity statement, supporting copy, Pink Sheep mascot, and two primary CTAs above the fold. Upcoming events surface as scannable cards immediately below the hero. The section ends with social follow and Linktree actions. On mobile, the same content collapses into a single-column flow that preserves reading order and keeps the primary CTA reachable without scrolling.',
          insight: 'The hero composition does one job at a time: navigation, then identity, then value proposition, then actions. The old homepage put all of these in competition. The redesign sequences them so each element reads after the previous one rather than competing for the same attention.',
          image: '/projects/tmg-website/new-home-desktop-viewport.png',
          imageFit: 'contain',
        },
        {
          title: 'Events page',
          description: 'The events page opens with a full-width audience photo, a direct "Our Events" headline, and a short participation prompt that explains why students should attend, not just that events exist. Below, event entries follow a repeatable pattern: title, date, description, image proof, outcomes, and CTA. A supporting "Other Events" module shows the breadth of TMG programming. The page ends with a social follow action that keeps the community connection visible after event content is consumed.',
          insight: 'Event content that shows community proof (audience photos, outcome statements) outperforms content that only describes what the event is. Students evaluating whether to attend need to see that other students attended and found value — that is the job the imagery and outcome language do.',
          image: '/projects/tmg-website/new-events-desktop-viewport.png',
          imageFit: 'contain',
        },
        {
          title: 'About page and team structure',
          description: 'The About page separates mission copy from the team photo into a two-column desktop layout, resolving the figure-ground clarity issue of the old design (white mission card over a busy team image). Team members are organized by department — leadership, business development, events, marketing, operations — using Gestalt proximity to make organizational structure immediately recognizable. Each card shows portrait, name, role, and a LinkedIn link. The mobile view gives each department section a clear vertical order.',
          insight: 'Potential members and sponsors evaluate the About page to assess organizational credibility. Seeing departments with named leads — not just an alphabetical grid of portraits — communicates that TMG is structured and accountable. That credibility is the conversion driver on the About page, not the mission copy.',
          image: '/projects/tmg-website/new-about-desktop-viewport.png',
          imageFit: 'contain',
        },
        {
          title: 'Sponsors page',
          description: 'The sponsors page is a dedicated audience experience for external partners, separate from student-facing content. It opens with a partner-specific hero, then presents an explicit "Why Sponsor TMG" section with four benefit categories: talent pipeline access, brand exposure at student events, industry insights, and past partner credibility (with partner logos). The page ends with a direct "Become a Sponsor" CTA. Sponsors arrive with a specific evaluation question — is this a credible, valuable partnership? — and the page answers that question before asking for contact.',
          insight: 'Mixing sponsor content into student-facing pages makes the site harder for both audiences. Corporate partners evaluating a student sponsorship need a professional, partner-specific experience — not a page designed to recruit members. Separation by audience is an information architecture decision that also serves brand credibility.',
          image: '/projects/tmg-website/new-sponsors-desktop-viewport.png',
          imageFit: 'contain',
        },
        {
          title: 'CBA Applications page',
          description: 'The Campus Brand Ambassador recruitment page uses community imagery, a role-specific "Campus Brand Ambassador" headline, and the value line "Represent. Connect. Grow." to communicate the opportunity before explaining it. The supporting "Why Become a CBA?" section converts the application page from a passive information destination into a conversion surface with concrete benefit framing: leadership development, networking opportunities, and marketing experience. The application path feels current, visible, and connected to student identity.',
          insight: 'Application pages that front-load benefit framing outperform pages that front-load process information. Students are not asking "what is a CBA?" — they are asking "why should I become one?" The new page answers the second question first, then supports it with process details for committed applicants.',
          image: '/projects/tmg-website/new-cba-applications-viewport.png',
          imageFit: 'contain',
        },
        {
          title: 'Mobile layout',
          description: 'The full redesigned experience on a 390px phone viewport: compact header with navigation controls, single-column hero with primary CTAs, stacked event cards with readable type, and a bottom-anchored footer with grouped navigation links and social destinations. Tap targets throughout are sized for thumb interaction. The mobile layout is not a stripped-down variant — it is the canonical layout from which the desktop was derived, which is why the hierarchy choices hold at every breakpoint.',
          insight: 'Designing mobile-first forced every content decision to be justified by user value, not by the visual affordance of a wide canvas. Two sections present on the desktop homepage were removed during the mobile-first pass because they did not earn their space at 390px — those cuts also improved the desktop layout.',
          image: '/projects/tmg-website/new-home-mobile-viewport.png',
          imageFit: 'contain',
          phoneFrame: true,
        },
      ],
      tools: [
        {
          name: 'Wix Studio',
          purpose: 'Design and development environment for the live UTSC TMG website. Wix\'s visual editor enabled rapid iteration on layout, component styling, navigation structure, and responsive breakpoints without a custom code deployment pipeline. Design system tokens (colors, type scale, spacing) were maintained across pages via Wix\'s global styles panel.',
        },
        {
          name: 'Google Analytics',
          purpose: 'Primary measurement tool. Session volume, unique visitors, bounce rate, and average session duration were tracked before and after the redesign to validate UX hypotheses with behavioral data rather than qualitative feedback alone. Analytics data was also used to diagnose the original UX problems: a 62% bounce rate and shorter sessions confirmed that first-impression clarity and navigation depth were the highest-priority fixes.',
        },
        {
          name: 'HCI frameworks (Nielsen, Shneiderman, Fitts, Hick, Gestalt)',
          purpose: 'Design rationale. Every page-level decision was mapped to a specific principle: recognition over recall drove navigation label choices, Hick\'s Law shaped the dropdown grouping strategy, Fitts\'s Law set CTA sizing and placement on mobile, Gestalt proximity and similarity organized team and event card layouts, and Shneiderman\'s closure rule governed section endings. Mapping decisions to principles also produced the case study documentation that gives future site maintainers a rationale to work from.',
        },
        {
          name: 'Viewport capture and visual documentation',
          purpose: 'Screenshot evidence for before/after comparison across desktop and mobile viewports. Captures were normalized within each comparison so visual differences come from the websites, not mismatched case-study containers. Captures include homepage, navigation dropdown, events, about, sponsors, CBA applications, and the full mobile layout across multiple pages.',
        },
        {
          name: 'Information architecture mapping',
          purpose: 'Navigation restructuring from a four-item flat menu to a six-destination grouped navigation organized by user intent: Home, About (with department sub-pages), Events (with event sub-pages and CBA), Sponsors, Join Our Team, and Linktree. IA mapping preceded visual design to ensure each page had a clear audience, job-to-be-done, and conversion moment before any component was placed.',
        },
      ],
      impact: {
        title: 'What a 90-day UX redesign actually moves — and what it does not',
        content: 'The analytics results are the most legible part of the outcome: 67% more sessions, 45% more unique visitors, bounce rate from 62% to 23%, session duration up 30% to 3m 36s. Those numbers confirm that the redesign moved the metrics it was optimizing for — first-impression clarity, mobile usability, navigation depth, and conversion path strength.\n\nThe less visible outcome is the design system. A Wix site without documented design principles drifts: well-meaning maintainers add a section here, change a CTA color there, and six months later the visual language is inconsistent. The case study paired with the live site gives future contributors a documented rationale: here is why the navigation is structured this way, here is the color system, here is what "Hick\'s Law" meant for how we grouped the dropdown items. That documentation is the difference between a redesign that lasts and one that gets gradually overwritten.\n\nThe remaining UX opportunity is conversion measurement beyond sessions. Sessions and duration tell you that users are engaging more; they do not tell you how many joined TMG, applied to become a CBA, or reached out as a sponsor as a result. Wiring analytics events to every CTA click and tracking the event-page-to-registration path would close that loop and give the next redesign cycle a behavioral basis for prioritization rather than an analytics-and-judgment one.',
      },
      limitations: {
        title: 'Honest caveats',
        items: [
          'Wix\'s editor constraints limit what is achievable in custom animation, advanced data binding, and performance optimization. A Next.js or SvelteKit build would offer more control over Core Web Vitals and interaction patterns, at the cost of a deployment pipeline the organization may not be able to maintain.',
          'Analytics coverage does not yet include CTA-level event tracking. Session and duration metrics confirm engagement improved, but conversion rates for specific actions (join form submissions, sponsor contact clicks, CBA applications) are not yet measured separately.',
          'A formal accessibility audit has not been completed. The redesign improves contrast, readability, and responsive layout, but keyboard navigation, screen reader heading order, focus states, and ARIA labels require a Lighthouse or axe audit to validate.',
          'The 90-day measurement window may include confounding variables: increased event activity, social media campaigns, and seasonal student engagement patterns can all shift session volume independently of the redesign. A longer measurement period would increase confidence in the attribution.',
          'Content lifecycle management — archiving past events, updating application deadlines, refreshing sponsor lists — is not systematized. Without a content governance plan, the site will accumulate stale content that reduces credibility with returning visitors.',
        ],
      },
    },
  },
  {
    id: 'matchify',
    title: 'Matchify: A Visual System for Music-First Social',
    category: 'UI/UX Design',
    dates: 'Jun 2024 - Aug 2024',
    organization: 'Independent Project',
    description: 'A mobile concept where the visual identity is the product. Dark canvas as the brand floor, one Spotify-aligned green used surgically, profile rings as the universal identity marker, and a content design call that treats every Friend suggestion as a sentence explaining the match. Designed end-to-end in Figma across Spotify-authenticated onboarding, the multi-section home feed, the Friends discovery surface, and the Events tab. Selected for ARIA 2024, the University of Toronto\'s annual research and innovation showcase.',
    skills: ['Visual Design', 'Brand Systems', 'Dark Mode Design', 'Mobile Design', 'UI/UX Design', 'Figma', 'Prototyping', 'Design Tokens', 'Wireframing', 'Design Systems'],
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
        { value: '5', label: 'designed surfaces' },
        { value: '1', label: 'dark canvas' },
        { value: '1', label: 'brand green' },
        { value: 'ARIA \'24', label: 'UofT showcase' },
      ],
      pullQuote: 'Other apps show you who matches. Matchify tells you why: a shared love of Kendrick, the same Imagine Dragons concert, top tracks in the same EDM playlist. The reason is the introduction.',
      overview: {
        title: 'The visual language',
        content: 'Matchify is a music-first social network designed around three commitments: a dark canvas that lets album art, concert photography, and profile photos carry the visual energy; a single Spotify-aligned green used only for brand moments and primary CTAs so it never collapses into wallpaper; and a content design call that treats every Friend suggestion as a sentence ("Shared interest in EDM with favorite tracks by top DJs") rather than a percentage similarity score. The full prototype covers Spotify-authenticated onboarding, the multi-section home feed, the match-reason Friends discovery surface, and an Events tab that overlays attending-friends avatars onto concert cards.'
      },
      motivation: {
        title: 'Why the visual identity does the heavy lifting',
        content: 'Most music-social products lead with photos and personality and use music data as a secondary filter. Matchify inverts the priority. The dark canvas removes the daytime-app feeling and signals the product belongs in the same context users actually listen in: commutes, concerts, late-night sessions. The Spotify-green accent does brand recognition work that words and logos would otherwise have to do. The profile-ring treatment turns every avatar into a Matchify object, which is what binds four otherwise unrelated surfaces (splash, home, Friends, Events) into one product visually.'
      },
      decisions: [
        {
          decision: 'Dark canvas as the brand floor',
          reasoning: 'Light mode would have made Matchify look like every other social network. Dark mode is functional too: album art, concert photography, and profile photos all sit better on dark backgrounds. The decision was not "add dark mode," it was "design only for dark, then decide later whether a light theme is worth the engineering cost." Every other visual call (type weight, color saturation, ring contrast) is downstream of this one.'
        },
        {
          decision: 'One green, used surgically',
          framework: 'Restrained brand palette',
          reasoning: 'Matchify green is the most expensive color in the system because it does brand recognition work that text and logo would otherwise have to do. The discipline: green is reserved for the wordmark, the Matchify logomark inside the green badge, primary CTAs ("Continue With Spotify", "Next"), tab-active states, and the profile-ring identity marker. Everything else (section headers, body, secondary CTAs like "Request") is monochrome or a deliberately different blue. Using green everywhere would have made the product feel like a Spotify clone.'
        },
        {
          decision: 'Profile rings as universal identity',
          reasoning: 'Every Matchify avatar (Friends Listening cards, the nav profile chip, attending-friends overlays on event cards, the Create Profile upload state) is wrapped in a green ring. The ring is small visually but it does load-bearing work: it tells the user "this is a Matchify profile" before they read the name. Without the ring, profile photos lose their product association and start looking like generic stock images. The ring is the atom of the visual system.'
        },
        {
          decision: 'Match reason as content, not metadata',
          reasoning: 'The most expensive single design call. Every Friend suggestion explains itself in one sentence: "Shared interest in EDM with favorite tracks by top DJs." "Similar Indie Rock playlists with favorites like Mr. Brightside." "Attended the same Imagine Dragons concert in June \'24." Stating the match reason in plain language replaces the percentage-match number most social apps use, and the gain is doubled: the reason is also a conversation starter, so the suggestion answers "why" before the user even has to ask.'
        },
        {
          decision: 'Layout-by-content-type, not by IA convention',
          reasoning: 'Three layout patterns sit in the home feed: horizontal carousels for discovery surfaces (Friends Listening, Friends\' Playlists, Events in Toronto), a vertical list for activity (Friends Activity), and stacked cards for the main canvas (Events tab). The IA picks layout based on what the content wants the user to do, not on a convention. Horizontal swiping says "browse." Vertical scroll says "catch up." Stacked cards say "commit." Three signals in one screen without making the screen feel busy.'
        },
        {
          decision: 'Four tabs. No kebab menus. No fifth tab',
          reasoning: 'Home / Events / Friends / Messages. Everything that does not fit into those four got cut from the surface and pushed inside the relevant tab. Settings, profile detail, search, filters: all live inside one of the four tabs, not in an overflow menu or a hamburger drawer. Four tabs is the smallest IA that still supports a credible music-social product, and it is the largest IA the user can hold in working memory while listening to music.'
        }
      ],
      designSystem: {
        title: 'Design system',
        intro: 'The actual kit behind the screens: five colors, five type roles, six reusable components. Everything in the prototype is built from this kit, and most of the visual discipline comes from refusing to add to it.',
        palette: [
          {
            name: 'Canvas',
            hex: '#1A1D21',
            role: 'The dark floor on every screen. Sets the brand mood and lets photography and album art carry the color.',
          },
          {
            name: 'Matchify green',
            hex: '#1DB954',
            role: 'Brand mark, primary CTAs, tab-active state, profile ring. Used surgically so it never collapses into wallpaper.',
          },
          {
            name: 'Social blue',
            hex: '#1B95E0',
            role: 'Secondary social actions only. The Request button on Friends cards lives here so it does not compete with the green primary CTAs.',
          },
          {
            name: 'On-canvas white',
            hex: '#FFFFFF',
            role: 'Display headers, body copy, and card titles. The contrast workhorse against the dark canvas.',
          },
          {
            name: 'Soft gray',
            hex: '#B0B3B8',
            role: 'Secondary text, captions, inactive tab labels, search placeholder copy. Drops below white to create reading hierarchy without adding color.',
          },
        ],
        type: [
          {
            name: 'Display',
            spec: 'Sans 700 / 32-36px / Matchify green',
            example: 'Home',
            exampleClass: 'text-3xl sm:text-4xl font-display font-extrabold tracking-tight',
          },
          {
            name: 'Section heading',
            spec: 'Sans 700 / 18-20px / white',
            example: "Your Friends' Playlists",
            exampleClass: 'text-lg sm:text-xl font-display font-bold text-ink',
          },
          {
            name: 'Card title',
            spec: 'Sans 600 / 16px / white',
            example: 'Mei Wang',
            exampleClass: 'text-base font-display font-semibold text-ink',
          },
          {
            name: 'Body',
            spec: 'Sans 400 / 14px / soft gray',
            example: 'Shared interest in EDM with favorite tracks by top DJs.',
            exampleClass: 'text-sm text-ink-soft leading-relaxed',
          },
          {
            name: 'Caption',
            spec: 'Sans 500 / 12px / soft gray',
            example: 'September 10, 2024 · Toronto',
            exampleClass: 'text-xs text-ink-soft font-medium tracking-wide',
          },
        ],
        components: [
          {
            name: 'Profile ring',
            purpose: 'A two-pixel green ring around every avatar. The smallest reusable element in the system, and the one that brands a photo as a Matchify profile across every surface.',
          },
          {
            name: 'Card',
            purpose: 'Dark surface, rounded corners, 16px interior padding. Used for friend suggestions, friends-listening tiles, playlists, and event cards. One container shape for the whole product.',
          },
          {
            name: 'Primary CTA',
            purpose: 'Full-width pill button in Matchify green with a white sans-700 label. Reserved for Continue With Spotify, Next, and other forward-motion actions.',
          },
          {
            name: 'Secondary CTA',
            purpose: 'Pill button in social blue with a white label. Used only for Request and similar social actions so they stay distinct from forward-motion primaries.',
          },
          {
            name: 'Section header',
            purpose: 'Sans 700 white text, left-aligned, with horizontal-scroll content directly below. The pattern that organizes the dense home feed into readable sections.',
          },
          {
            name: 'Bottom nav (four-tab)',
            purpose: 'Icon plus label per tab, green active state, never more than four entries. The structural commitment that keeps the IA readable at a glance.',
          },
        ],
      },
      keyFindings: [
        {
          stat: '1 canvas',
          title: 'Dark mode is the brand floor',
          description: 'Designing for dark first changed every other call: album art reads warmer, type weight needs to step down, and accent colors carry twice the visual weight they would in light mode. The brand could not have read this confident in light mode without a much louder palette.'
        },
        {
          stat: '1 green',
          title: 'One color does the recognition work',
          description: 'Matchify green only appears on brand moments and primary CTAs. Everywhere else is monochrome or a deliberately different blue for social actions. The constraint is what makes the green register as identity instead of decoration. Using it everywhere would have collapsed it into background noise.'
        },
        {
          stat: '"why"',
          title: 'Match reason as content, not metadata',
          description: 'Stating the match reason in a sentence ("Shared interest in EDM with favorite tracks by top DJs") replaces percentage-match noise and turns the suggestion into a conversation starter on the same screen. The reason does double duty: it explains the match and it gives the user something to say.'
        },
        {
          stat: '4 tabs',
          title: 'Bottom-nav IA, no escapes',
          description: 'Resisting a fifth tab was the brand decision that kept the surface readable. Home, Events, Friends, Messages. Everything else lives inside one of those four. The IA fits inside the visual scan a user does in the first second of opening the app.'
        }
      ],
      features: [
        {
          title: 'Splash: the brand thesis in 200 pixels',
          description: 'Dark concert backdrop with stage lights, the green Matchify logomark with music notes inside, the white Matchify wordmark, and a one-sentence pitch ("Meet new people and attend events based on your music tastes using your Spotify profile!"). The "Continue With Spotify" CTA borrows Spotify\'s own green so the OAuth handoff feels native, not third-party.',
          insight: 'The splash states the brand thesis without saying it. Concert photography sets the mood, the green logomark plants the identity, and the Spotify-styled CTA tells the user "this is a trusted integration, not a sign-up wall." Three brand decisions in one screen, before the user has tapped anything.',
          image: '/projects/matchify/00-hero.png',
          imageFit: 'contain',
          phoneFrame: true
        },
        {
          title: 'Create Profile: inherit the environment',
          description: 'The same dark concert backdrop, the same green primary CTA, and a focused form: profile picture upload (a green plus sign inside the profile ring), First Name, Last Name, Email. Three fields plus an avatar. The Next button is full-width so the path forward is the most prominent element on screen.',
          insight: 'Onboarding inherits the brand environment instead of resetting to a generic form. The user moves from splash to profile creation without losing visual context, which keeps the brand promise from feeling like marketing-bait-and-switch.',
          image: '/projects/matchify/01-create-profile.png',
          imageFit: 'contain',
          phoneFrame: true
        },
        {
          title: 'Home: a dense multi-section dark feed',
          description: 'Four sections stacked into one canvas. Friends Listening (horizontal scroll, currently-playing track names under each friend), Your Friends\' Playlists (horizontal scroll, playlist-mosaic art with curator credit), Events in Toronto (horizontal cards, attending-friends avatar stack), and Friends Activity (vertical list of social events: saved a track, saved a playlist, attending a show). Bottom nav anchors the surface.',
          insight: 'Three layout patterns in one screen, each picked because of what the content wants to do. The dense-but-readable composition is the showpiece of the system, and proves the dark canvas + restrained palette can carry visual information without collapsing into noise.',
          image: '/projects/matchify/02-home.png',
          imageFit: 'contain',
          phoneFrame: true
        },
        {
          title: 'Friends: match reason as the content',
          description: 'Tab toggle (Matchify Suggestions / Current Friends), a search field, and a vertical list of suggestion cards. Each card shows the friend\'s photo (with the green ring), their name, and a one-sentence match reason. Blue Request CTAs sit deliberately outside the green system as a secondary color for social actions.',
          insight: 'The match reason replaces a similarity percentage with a sentence the user can actually use. It is the design call that makes Matchify feel different from generic match-based products, and it is the only place in the system where the visual identity steps back to let copy do the work.',
          image: '/projects/matchify/03-friends.png',
          imageFit: 'contain',
          phoneFrame: true
        },
        {
          title: 'Events: social proof inside the card',
          description: 'Search field plus filter chips (Attending, Location, Date, Artist), then a vertical stack of concert cards (Travis Scott, Gracie Adams, Lil Yachty). Each card uses artist art as the background, lays the date and city over the bottom, and ends with a tiny "X and Y others are attending this event" overlay showing friends going.',
          insight: 'Social proof lives inside the card, not below it. Seeing two friends already attending before reading the artist name is what converts browsing into ticket-buying intent. The card uses the full visual hierarchy: brand at the top, content in the middle, social signal at the bottom.',
          image: '/projects/matchify/04-events.png',
          imageFit: 'contain',
          phoneFrame: true
        },
        {
          title: 'The visual atom: profile ring + brand green',
          description: 'Every avatar in the product is wrapped in a green ring. Friends Listening cards, Friends Activity feed, attending-friends overlays on event cards, the nav profile chip, the Create Profile upload state. The ring is the smallest piece of the visual system and it appears on every screen except the splash.',
          insight: 'A two-pixel border does brand-recognition work that a logo on every screen could not. The ring is what makes a profile photo unmistakably a Matchify profile across four otherwise unrelated surfaces. Most design systems forget that the smallest reusable element is often the most expensive to get right.'
        }
      ],
      figmaEmbed: {
        url: 'https://www.figma.com/design/nkmVIyQnZzKT01rF20G9n1/Matchify-Project--Copy-',
        title: 'Explore the design file',
        intro: 'The Figma file the screens were exported from. Zoom and pan around the canvas to see component variants, the dark-mode color tokens, and the layout grids behind each screen.',
        height: 720,
      },
      tools: [
        {
          name: 'Figma',
          purpose: 'Screen design, component library, prototype linking. Dark-first style sheet (color tokens, type ramp, ring component, card components for friends-listening, playlists, events) with light-mode never designed because dark was the brand floor.'
        },
        {
          name: 'Spotify Web API',
          purpose: 'OAuth, top artists, top tracks, listening history, and playlist metadata. The data shape drove which screens existed at all: Friends Listening, Friends\' Playlists, and the match-reason copy all assume the API returns rich enough listening data per user.'
        },
        {
          name: 'Dark-first design fundamentals',
          purpose: 'Lowered type weights for body, raised contrast on accents, increased card padding versus a light-mode equivalent, and re-balanced photography (concert images, album art) so they read correctly on near-black canvases without washing out.'
        },
        {
          name: 'Mobile design conventions',
          purpose: 'Four-tab bottom nav (iOS / Android convention), horizontal carousels for browse intent, vertical lists for feed intent, full-width primary CTAs at the bottom of forms. Conventions used where they help comprehension, broken where they would have hurt the brand.'
        }
      ],
      impact: {
        title: 'What the project argues from a visual-design angle',
        content: 'Matchify\'s thesis is structural: the visual identity is the product. The brand green, the dark canvas, the profile ring, and the match-reason copy together do work that a percentage match or a profile-only feed could not. Without those four moves, the app would be a worse version of a dozen products that already exist. With them, it has a position no other music-social product currently occupies.\n\nSelection for ARIA 2024 validated that the framing held up against research-led projects across disciplines. The interesting thing was that the visual choices were treated as the thesis, not the dressing. The dark canvas was a brand decision, not an aesthetic preference, and the match-reason copy was a content-design call, not a UX writing afterthought.\n\nFor my own design instincts, this is the project that taught me that the cheapest-looking element in a system (a two-pixel ring around an avatar) is often the most expensive to get right, and that brand discipline (one color, one canvas, one IA) is what produces a product that reads confident at a glance.'
      },
      limitations: {
        title: 'What this visual system is, and what it isn\'t',
        items: [
          'High-fidelity Figma prototype, not a shipped iOS or Android app. The component library is implicit (visible in the file, not exported as production design tokens or a code library).',
          'Only dark mode designed. A real ship would need a light theme, accessibility-mode high-contrast variants, and a documented decision rule about when each is used.',
          'Spotify dependency is a visual-system dependency, not just a data one. Matchify green sits next to Spotify green; the OAuth CTA borrows Spotify\'s pattern. If the integration changed, the visual system would have to be re-justified.',
          'Motion and micro-interactions are implied (cards swipe, tabs animate, the avatar ring pulses on now-playing) but not specified frame-by-frame. A production build would need Lottie files or platform-native motion specs.',
          'Match-reason copy is hand-written examples in the prototype. A production version would need a generation system (rules + LLM + style guide) that can produce that voice at scale across millions of suggestion cards without sounding mechanical.',
          'Empty states, error states, loading skeletons, and onboarding edge cases (no friends yet, no Spotify history, denied permissions) are out of scope. The prototype assumes the happy path.',
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
