// ── AI Sprint · Vibe Coding ────────────────────────────────────────────────────
// File: curriculum.ts | Repo: ai-vibe-coding
// Last updated: May 2026
// =============================================================================
// AI Sprint — Vibe Coding Course Curriculum
// VIBE CODING — BUILD SOFTWARE WITH AI — Basic & Advanced
// =============================================================================

// ── Level 1 categories (Basic)
export type CategoryL1 =
  | "Learn"
  | "Build"
  | "Apply"
  | "Sprint"
  | "Reflect"
  | "Secure"
  | "Optimize"
  | "Review";

// ── Level 2 categories (Advanced)
export type CategoryL2 =
  | "Architecture"
  | "Automation"
  | "AI Integration"
  | "Deploy"
  | "Product"
  | "Strategy"
  | "Review";

export type Category = CategoryL1 | CategoryL2;

export interface DayLesson {
  day: number;
  week: number;
  level: 1 | 2;
  title: string;
  category: Category;
  summary: string;
  task: string;
  tools: string[];
  whyItMatters: string;
  isMiniProject?: boolean;
}

export interface WeekOverview {
  week: number;
  level: 1 | 2;
  title: string;
  color: string;
  outcomes: string[];
}

export interface ToolkitItem {
  name: string;
  url: string;
  category: string;
  desc: string;
}

export interface PortfolioTarget {
  title: string;
  week: number;
  level: 1 | 2;
  desc: string;
}

// ─────────────────────────────────────────────
// WEEK OVERVIEWS — LEVEL 1 (Basic)
// ─────────────────────────────────────────────

export const weekOverviewsL1: WeekOverview[] = [
  {
    week: 1, level: 1,
    title: "The Vibe Coding Mindset",
    color: "#0d7c8a",
    outcomes: [
      "Understand the vibe coding philosophy: natural language → working software",
      "Write your first working script from a single prompt",
      "Read and review AI-generated code with confidence",
      "Master the 3-part prompt structure: Goal, Constraints, Format",
      "Set up your sandbox (Cursor, VS Code, or Replit) and survive your first bug",
    ],
  },
  {
    week: 2, level: 1,
    title: "Building Real Things",
    color: "#2f6fa8",
    outcomes: [
      "Extract data from PDFs and CSVs with AI-written scripts",
      "Build a web scraper that handles pagination and errors",
      "Create a local API endpoint with FastAPI",
      "Connect to external APIs and mash up two data sources",
      "Schedule automations to run hands-free",
    ],
  },
  {
    week: 3, level: 1,
    title: "Making It Yours",
    color: "#7a5fc0",
    outcomes: [
      "Wrap any script in a shareable UI with Streamlit or Gradio",
      "Store and query data persistently with SQLite",
      "Iterate and improve AI code with targeted follow-up prompts",
      "Secure your scripts — no hardcoded API keys ever",
      "Refactor messy generated code into clean, reusable modules",
    ],
  },
  {
    week: 4, level: 1,
    title: "Ship It — Portfolio and Graduation",
    color: "#2f8c5c",
    outcomes: [
      "Handle files like a pro: CSVs, JSON, and text pipelines",
      "Make scripts reusable with command-line arguments",
      "Organize and document your project library",
      "Package a tool so non-technical colleagues can run it",
      "Graduate with a 3-script automation suite and a demo recording",
    ],
  },
];

// ─────────────────────────────────────────────
// WEEK OVERVIEWS — LEVEL 2 (Advanced)
// ─────────────────────────────────────────────

export const weekOverviewsL2: WeekOverview[] = [
  {
    week: 1, level: 2,
    title: "Full-Stack AI App Architecture",
    color: "#e8820c",
    outcomes: [
      "Design multi-agent and RAG architectures for real products",
      "Build a full-stack app skeleton with AI front-to-back",
      "Integrate Claude or GPT-4o via API with streaming responses",
      "Design system prompts and context management strategies",
      "Ship a working AI-powered MVP by Day 7",
    ],
  },
  {
    week: 2, level: 2,
    title: "Agents, Automation, and MCP",
    color: "#c4620a",
    outcomes: [
      "Build autonomous agents that use tools, browse the web, and take actions",
      "Connect MCP servers to Claude for persistent memory and external tools",
      "Design multi-step pipelines that run end-to-end without human input",
      "Handle errors, retries, and edge cases in production AI systems",
      "Complete a working agent that solves a real business problem",
    ],
  },
  {
    week: 3, level: 2,
    title: "Ship to Production",
    color: "#a0510a",
    outcomes: [
      "Deploy a full-stack AI app to Vercel, Railway, or Fly.io",
      "Add authentication, rate limiting, and usage tracking",
      "Implement evals — testing that your AI outputs meet a quality bar",
      "Monitor, log, and debug live AI systems",
      "Build a CI/CD pipeline so your app ships when you push",
    ],
  },
  {
    week: 4, level: 2,
    title: "Product Thinking and Capstone",
    color: "#7a3e08",
    outcomes: [
      "Design the prompt architecture for a production AI product",
      "Build and ship a real tool that solves a problem for real users",
      "Write a technical spec and product brief for any AI build",
      "Prepare your Level 2 portfolio: 3 shipped projects with demos",
      "Graduate with a deployable SaaS-ready AI product",
    ],
  },
];

// Backwards-compat default export
export const weekOverviews = weekOverviewsL1;

// ─────────────────────────────────────────────
// CURRICULUM — LEVEL 1 (28 Days Basic)
// ─────────────────────────────────────────────

export const curriculumL1: DayLesson[] = [

  // ── WEEK 1: THE VIBE CODING MINDSET (Days 1–7) ─────────────────────────────
  {
    day: 1,
    week: 1,
    level: 1,
    title: "What Is Vibe Coding? (AI as Partner, Not Search)",
    category: "Learn",
    summary:
      "Understand the philosophy: using natural language to produce working software. AI writes, you direct, review, and refine. In 2026, this is a professional superpower — not a shortcut.",
    task:
      "Write a 2-sentence explanation of vibe coding to a skeptical colleague. No jargon. Then write a 3-sentence version of what you want to build by the end of this course.",
    whyItMatters:
      "Most people still think coding is for engineers. Vibe coding changes that permanently — your ideas, your rules, AI as your engine.",
    tools: ["Claude", "ChatGPT"],
  },
  {
    day: 2,
    week: 1,
    level: 1,
    title: "Your First Working Script — From One Prompt",
    category: "Apply",
    summary:
      "Write a single structured prompt that generates a working Python script. Run it. See it work. The moment it works, something shifts in you.",
    task:
      "Prompt: \"Write a Python script that renames all files in a folder to sequential numbers. Include error handling if the folder is empty.\" Run on a test folder. Confirm it works.",
    whyItMatters:
      "Your first working script is a threshold moment. After today, you'll never not believe it's possible.",
    tools: ["Claude", "Python", "Cursor"],
  },
  {
    day: 3,
    week: 1,
    level: 1,
    title: "Reading AI Code — You Don't Write, You Review",
    category: "Learn",
    summary:
      "Learn to read AI-generated code well enough to spot errors, understand flow, and request precise changes. This is 80% of the skill.",
    task:
      "Take the script from Day 2. Read every line. Write a paragraph explaining what it does in plain English. Then ask Claude: \"What would break this script?\" Apply one of the answers as a test.",
    whyItMatters:
      "You don't need to write code from scratch. You need to be a good reviewer — that's the real craft of vibe coding in 2026.",
    tools: ["Claude", "Python"],
  },
  {
    day: 4,
    week: 1,
    level: 1,
    title: "The 3-Part Vibe Prompt — Goal, Constraints, Format",
    category: "Learn",
    summary:
      "Master the prompt structure that consistently produces working code: what you want, what limits it, and how you want it returned. This structure works for every model, every task.",
    task:
      "Rewrite your Day 2 prompt using the 3-part structure. Compare outputs side-by-side and document exactly what improved and why.",
    whyItMatters:
      "Vague prompts produce broken code. Structured prompts produce working code. This single pattern is worth the entire course.",
    tools: ["Claude", "ChatGPT"],
  },
  {
    day: 5,
    week: 1,
    level: 1,
    title: "Setting Up Your Sandbox — Cursor, VS Code, or Replit",
    category: "Apply",
    summary:
      "Choose and configure your development environment. In 2026, Cursor is the leading AI-native IDE. VS Code + Claude Code is the power-user setup. Replit is the fastest no-install start.",
    task:
      "Install Cursor (recommended) or set up VS Code with the Claude Code extension. Run a \"Hello World\" Python script. Confirm it works. Explore one AI feature in your editor.",
    whyItMatters:
      "A working sandbox removes friction. Your IDE is where you spend 90% of your time — it should feel like a collaboration, not a tool.",
    tools: ["Cursor", "VS Code", "Claude Code", "Replit"],
  },
  {
    day: 6,
    week: 1,
    level: 1,
    title: "Error Handling — The AI Made a Bug, Now What?",
    category: "Apply",
    summary:
      "Learn the debugging loop: paste the full error back to AI, ask for a fix with explanation, understand what changed, iterate. Speed here is everything.",
    task:
      "Introduce a deliberate bug into your Day 2 script. Paste the full error message to Claude. Apply the fix. Document in 3 bullet points what changed and why.",
    whyItMatters:
      "Bugs are not failures — they're feedback. The skill is not avoiding bugs, it's resolving them in 60 seconds.",
    tools: ["Claude", "Python", "Cursor"],
  },
  {
    day: 7,
    week: 1,
    level: 1,
    title: "Sprint — Build a Working Automation",
    category: "Sprint",
    isMiniProject: true,
    summary:
      "Apply everything from Week 1 to build a real automation that solves a problem you actually have. Ship it. Test it. Keep it.",
    task:
      "Build one working automation: file organizer, email scraper, CSV cleaner, text summarizer, or an idea of your own. Test it on real data. Document the prompt chain and save your script.",
    whyItMatters:
      "Your first real automation is proof of competence — to yourself and to anyone you show it to. This is your Week 1 portfolio piece.",
    tools: ["Claude", "Python", "Cursor"],
  },

  // ── WEEK 2: BUILDING REAL THINGS (Days 8–14) ───────────────────────────────
  {
    day: 8,
    week: 2,
    level: 1,
    title: "Data Extraction — PDF/CSV with AI",
    category: "Build",
    summary:
      "Use AI to write a script that extracts tabular data from PDFs and saves it as CSV — no manual copying, no copy-paste pain.",
    task:
      "Find a PDF with a table. Prompt AI to extract it to CSV using pdfplumber. Run it. Verify every row against the original.",
    whyItMatters:
      "Data extraction is the most common unsexy automation. Master this and you save teams hours every single week.",
    tools: ["Claude", "Python", "pdfplumber", "pandas"],
  },
  {
    day: 9,
    week: 2,
    level: 1,
    title: "Web Scraping with AI Help",
    category: "Build",
    summary:
      "Build a scraper that pulls structured data from a public website, with AI writing the selectors and handling pagination for you.",
    task:
      "Prompt AI to scrape a list of 10 items from any public website. Run it. Then handle one error yourself — no AI. Document what you figured out.",
    whyItMatters:
      "Web scraping unlocks competitor monitoring, price tracking, and research automation at zero cost. It's a core vibe coding superpower.",
    tools: ["Claude", "Python", "requests", "BeautifulSoup"],
  },
  {
    day: 10,
    week: 2,
    level: 1,
    title: "Building a Simple API Endpoint",
    category: "Build",
    summary:
      "Create a local API that returns data when you hit a URL — the foundation of every web application. Demystify backends permanently.",
    task:
      "Prompt AI to build a FastAPI endpoint that returns a JSON response at `/hello`. Run it, visit the URL in your browser, then add a second endpoint that accepts a query parameter.",
    whyItMatters:
      "APIs are how programs talk to each other. Building one from scratch demystifies the entire backend of every app you've ever used.",
    tools: ["Claude", "Python", "FastAPI", "uvicorn"],
  },
  {
    day: 11,
    week: 2,
    level: 1,
    title: "Connecting to External APIs — Weather, News, or Finance",
    category: "Build",
    summary:
      "Build a tool that calls an external API and formats the response into something useful. The pattern here works for any API in the world.",
    task:
      "Build a \"weather anywhere\" script: user inputs a city, script returns temperature, condition, and a one-sentence summary generated by Claude.",
    whyItMatters:
      "Most valuable tools are API mashups. Once you can call any API, you can build almost anything that exists on the internet.",
    tools: ["Claude", "Python", "requests", "OpenWeatherMap API"],
  },
  {
    day: 12,
    week: 2,
    level: 1,
    title: "Scheduling Tasks — Cron Jobs and GitHub Actions",
    category: "Build",
    summary:
      "Schedule your scripts to run automatically — daily reports, hourly checks, weekly summaries — without touching your computer.",
    task:
      "Schedule your weather script to run every morning at 8am using GitHub Actions. Save output to a log file. Confirm it runs without you.",
    whyItMatters:
      "Automation isn't automation if you have to run it manually. Scheduling turns a script into infrastructure.",
    tools: ["Claude", "GitHub Actions", "cron", "Python"],
  },
  {
    day: 13,
    week: 2,
    level: 1,
    title: "Reflecting on Your Vibe Workflow",
    category: "Reflect",
    summary:
      "Audit how you're using AI to build. What's working? What's inefficient? Where do you still get stuck most often?",
    task:
      "Write a 3-paragraph reflection on your vibe coding process so far. Identify one prompt pattern that's working and one habit to change next week.",
    whyItMatters:
      "Reflection turns practice into mastery. The best vibe coders constantly refine their human-AI collaboration style.",
    tools: ["Claude", "Notion"],
  },
  {
    day: 14,
    week: 2,
    level: 1,
    title: "Sprint — Build an Internal Tool for Your Team",
    category: "Sprint",
    isMiniProject: true,
    summary:
      "Build something useful for colleagues — a report generator, data cleaner, link checker, or notification system. Solve a real friction.",
    task:
      "Build one tool that solves a real problem for your team or yourself. Document it with a one-paragraph README and share it with one person for feedback.",
    whyItMatters:
      "Internal tools are high-visibility wins. This sprint builds your reputation as someone who actually ships.",
    tools: ["Claude", "Python", "Streamlit", "Gradio"],
  },

  // ── WEEK 3: MAKING IT YOURS (Days 15–21) ───────────────────────────────────
  {
    day: 15,
    week: 3,
    level: 1,
    title: "Adding a User Interface — Streamlit or Gradio",
    category: "Build",
    summary:
      "Turn your script into an app with buttons, inputs, and outputs — no frontend experience required. Ship something people can actually click.",
    task:
      "Take any previous script. Wrap it in a Streamlit UI with at least one text input, one button, and one output display. Run it locally and share the link.",
    whyItMatters:
      "A script is useful. An app is shareable. UIs are the last mile between a working automation and a tool anyone can use.",
    tools: ["Claude", "Streamlit", "Gradio", "Python"],
  },
  {
    day: 16,
    week: 3,
    level: 1,
    title: "Local Databases — SQLite with AI-Generated Queries",
    category: "Build",
    summary:
      "Store and query data persistently using SQLite, with AI writing your SQL. Data persistence turns one-off scripts into long-term assets.",
    task:
      "Build a script that saves user inputs to a SQLite database, retrieves them on command, and displays a summary count. No raw SQL memorization required.",
    whyItMatters:
      "Databases are where serious tools live. This is the boundary between a toy and a product.",
    tools: ["Claude", "Python", "SQLite", "sqlite3"],
  },
  {
    day: 17,
    week: 3,
    level: 1,
    title: "Iterative Improvement — Make It Better Prompts",
    category: "Apply",
    summary:
      "Learn to ask AI for targeted improvements: add error handling, improve messages, add logging, increase robustness — building on working code without rewriting it.",
    task:
      "Take your Day 15 UI app. Ask AI to add: (1) error handling with a user-friendly message, (2) a loading spinner, (3) input validation. Apply them one by one and test each.",
    whyItMatters:
      "First drafts are never final. Targeted iteration is the difference between a prototype and something production-ready.",
    tools: ["Claude", "Cursor"],
  },
  {
    day: 18,
    week: 3,
    level: 1,
    title: "Reading Documentation with AI Help",
    category: "Learn",
    summary:
      "When AI uses a library you don't know, ask it to explain the relevant parts of the docs in plain English. Never read a full library reference again.",
    task:
      "Take a script with an unfamiliar library. Ask Claude: \"Explain what line X does and what I need to know from the docs to change it.\" Save the explanation to your reference guide.",
    whyItMatters:
      "You don't need to read all the docs. You need AI to extract the 5% that's relevant to your exact problem.",
    tools: ["Claude", "Perplexity AI"],
  },
  {
    day: 19,
    week: 3,
    level: 1,
    title: "Environment Variables — No Hardcoded Keys, Ever",
    category: "Secure",
    summary:
      "Store API keys and secrets outside your code using `.env` files. This is the minimum viable security practice — and the difference between amateur and professional.",
    task:
      "Take any script with an API key hardcoded. Move it to a `.env` file. Update the script to read from `os.environ`. Confirm it still works. Add `.env` to `.gitignore`.",
    whyItMatters:
      "Hardcoded secrets in code cause real breaches. This single habit makes your code deployable and professional from day one.",
    tools: ["Claude", "python-dotenv", ".env", "Git"],
  },
  {
    day: 20,
    week: 3,
    level: 1,
    title: "Refactoring with AI — Cleaning Up Messy Code",
    category: "Optimize",
    summary:
      "Ask AI to reorganize, rename, and simplify its own generated code — making it readable, testable, and maintainable without rewriting from scratch.",
    task:
      "Take your messiest generated script. Ask AI: \"Refactor this into clean functions with clear names and a docstring for each.\" Compare before and after. What would have been hard to debug in the original?",
    whyItMatters:
      "Generated code works but messy code is a debt. Refactoring is the polish layer that makes your builds last.",
    tools: ["Claude", "Cursor"],
  },
  {
    day: 21,
    week: 3,
    level: 1,
    title: "Sprint — Personal Automation Dashboard",
    category: "Sprint",
    isMiniProject: true,
    summary:
      "Build a personal dashboard that pulls from at least two data sources and displays live information you actually care about.",
    task:
      "Build a Streamlit dashboard showing: a chart from a CSV, a live data feed from an API, and one custom metric. Entirely AI-generated. Run it locally.",
    whyItMatters:
      "A dashboard is a portfolio piece — it shows data handling, UI design, and API integration all in one. Pure vibe coding.",
    tools: ["Claude", "Streamlit", "pandas", "requests", "Python"],
  },

  // ── WEEK 4: SHIP IT (Days 22–28) ───────────────────────────────────────────
  {
    day: 22,
    week: 4,
    level: 1,
    title: "File I/O — Reading and Writing Files Like a Pro",
    category: "Learn",
    summary:
      "Master the patterns for reading CSVs, JSON, and text files — then writing processed results back to disk. Most business data lives in files.",
    task:
      "Build a script that reads a CSV, filters rows based on a user-defined condition, writes a new filtered CSV, and prints a one-line summary of what was removed.",
    whyItMatters:
      "File processing is the backbone of business automation. Get this pattern right once and you'll reuse it forever.",
    tools: ["Claude", "Python", "csv", "pandas"],
  },
  {
    day: 23,
    week: 4,
    level: 1,
    title: "Command-Line Arguments — Make Your Scripts Reusable",
    category: "Build",
    summary:
      "Add command-line arguments so your scripts accept inputs without editing the source code — the difference between personal tools and shared tools.",
    task:
      "Modify your CSV filter script to accept input filename, output filename, and filter condition as command-line arguments. Test with three different inputs.",
    whyItMatters:
      "Hardcoded scripts are for you. Scripts with arguments are for everyone. This is professionalization.",
    tools: ["Claude", "Python", "argparse"],
  },
  {
    day: 24,
    week: 4,
    level: 1,
    title: "Organizing Your Vibe-Coded Projects",
    category: "Reflect",
    summary:
      "Create a folder structure, naming convention, and README habit so you can find, share, and reuse every project you've built.",
    task:
      "Organize all your scripts from the past 3 weeks into a logical folder structure. Write a one-sentence description for each. Add a top-level README that explains what each does.",
    whyItMatters:
      "Disorganized scripts are lost scripts. Organization compounds value — each new build adds to an asset library you can return to for years.",
    tools: ["VS Code", "Cursor", "Terminal", "Git"],
  },
  {
    day: 25,
    week: 4,
    level: 1,
    title: "Sharing Scripts with Non-Technical Colleagues",
    category: "Apply",
    summary:
      "Package your script so a non-technical colleague can run it — with clear instructions, a dependency list, and error messages that make sense to a normal human.",
    task:
      "Take one script. Write a one-page run guide for someone who has never used a terminal. Test it with someone who doesn't code. Fix every point of confusion they hit.",
    whyItMatters:
      "The best tool is useless if no one else can run it. Packaging is the final mile of value delivery.",
    tools: ["Claude", "README.md", "requirements.txt"],
  },
  {
    day: 26,
    week: 4,
    level: 1,
    title: "Your Vibe Coding Reference Guide — Build It Now",
    category: "Reflect",
    summary:
      "Build your personal reference: the prompt patterns, debugging steps, and code snippets you'll reuse in every project for the next year.",
    task:
      "Create a Notion page or markdown file with: your top 10 prompts, your 5-step debugging process, and 3 code snippet patterns you've used more than once.",
    whyItMatters:
      "A reference guide speeds up every future build by 3×. Build it once, use it forever. This is your competitive advantage.",
    tools: ["Claude", "Notion", "Markdown"],
  },
  {
    day: 27,
    week: 4,
    level: 1,
    title: "Peer Review — Stress-Test a Colleague's Script",
    category: "Review",
    summary:
      "Trade scripts with a peer. Run theirs. Try to break it. Help them fix it. Learn from each other's approaches and prompt styles.",
    task:
      "Find a peer in the program. Exchange one script. Run theirs, document 3 issues or edge cases, and suggest one concrete improvement with a revised prompt.",
    whyItMatters:
      "Reading other people's vibe-coded builds — even AI-generated — teaches patterns you'd never discover working alone.",
    tools: ["Claude", "Python", "Cursor"],
  },
  {
    day: 28,
    week: 4,
    level: 1,
    title: "Sprint — Level 1 Graduation: Your Local Automation Suite",
    category: "Sprint",
    isMiniProject: true,
    summary:
      "Assemble your three best scripts into a cohesive automation suite with shared utilities, documentation, and a 2-minute demo. Your Level 1 portfolio is done.",
    task:
      "Create a folder with 3 working scripts, a `requirements.txt`, a README explaining each, and a Loom or screen-recorded 2-minute demo. Share it publicly or with your cohort.",
    whyItMatters:
      "This suite is your Level 1 portfolio — proof you can build real, working things with AI, no engineering degree required. Keep it. Show it. Build on it.",
    tools: ["Claude", "Python", "Git", "Loom", "Cursor"],
  },
];

// ─────────────────────────────────────────────
// CURRICULUM — LEVEL 2 (28 Days Advanced)
// ─────────────────────────────────────────────

export const curriculumL2: DayLesson[] = [

  // ── WEEK 1: FULL-STACK AI APP ARCHITECTURE (Days 1–7) ──────────────────────
  { day:1, week:1, level:2, category:"Architecture",
    title:"The 2026 AI App Stack — From Vibe to Production",
    summary:"Survey the full modern AI product stack: LLM APIs, vector stores, agents, MCP servers, and deployment platforms. Map where vibe coding stops and software engineering begins — then decide how much of that gap you need to close.",
    task:"Produce a one-page architecture map for the type of AI app you want to build. Label each layer: frontend, backend, AI model, memory/storage, agent tools, and deployment. Identify your 2 biggest knowledge gaps.",
    whyItMatters:"Strategy starts with understanding the terrain. This map becomes your north star for the next 28 days — and your blueprint for every AI project that follows." },

  { day:2, week:1, level:2, category:"AI Integration",
    title:"Calling Claude and GPT-4o via API — With Streaming",
    summary:"Move beyond the chat UI. Call Claude and GPT-4o directly via API, handle streaming responses, manage token limits, and build the API wrapper pattern you'll reuse in every project.",
    task:"Build a Python module that wraps the Anthropic API with streaming. Accept a system prompt, user message, and max tokens. Stream the output token-by-token to the terminal. Then swap models — same interface, different model.",
    tools:["Claude API", "Anthropic SDK", "Python", "Cursor"],
    whyItMatters:"Every serious AI product calls a model API directly. Streaming responses are the standard in 2026 — users expect real-time output, not a loading spinner." },

  { day:3, week:1, level:2, category:"Architecture",
    title:"System Prompts — The Hidden Engine of Every AI Product",
    summary:"Design system prompts that produce consistent, high-quality output across hundreds of interactions. Cover persona, task scope, output format, edge cases, and refusal logic — the craft that separates good AI products from great ones.",
    task:"Write 3 system prompts for 3 different AI product roles (e.g., document analyst, code reviewer, customer support agent). Test each with 5 edge-case inputs. Document what breaks and fix it.",
    tools:["Claude", "ChatGPT", "Cursor"],
    whyItMatters:"System prompts are the product. Everyone with API access has the same model — your system prompt is your proprietary advantage." },

  { day:4, week:1, level:2, category:"Architecture",
    title:"RAG — Retrieval-Augmented Generation from Scratch",
    summary:"Build a simple RAG pipeline: chunk documents, embed them, store in a vector store, retrieve by semantic similarity, and pass context to the LLM. Understand why RAG exists and when to use it vs fine-tuning.",
    task:"Build a working RAG prototype: load 3 text documents, chunk them, embed with OpenAI or Cohere, store in ChromaDB, and answer 5 natural language questions using retrieved context. Measure answer quality.",
    tools:["Claude API", "ChromaDB", "Python", "Cursor", "OpenAI Embeddings"],
    whyItMatters:"RAG is the most deployed AI pattern in production in 2026. Every enterprise AI product uses some form of it. Building one from scratch demystifies the entire category." },

  { day:5, week:1, level:2, category:"AI Integration",
    title:"Full-Stack App Skeleton — Next.js + FastAPI + Claude",
    summary:"Scaffold a full-stack AI application: Next.js frontend, FastAPI backend, Claude integration, and a chat interface. Use v0 or Lovable to generate the UI, AI to generate the backend, and wire it all together.",
    task:"Build an app skeleton where a user types a message, it hits a FastAPI endpoint, Claude responds with streaming, and the response appears in the UI. No placeholder — real streaming end-to-end.",
    tools:["Claude API", "FastAPI", "Next.js", "v0", "Vercel", "Cursor"],
    whyItMatters:"This skeleton is the foundation of every AI app you'll ever build. Get it running once and every future project starts at step 5, not step 1." },

  { day:6, week:1, level:2, category:"Architecture",
    title:"Context Management — Memory, History, and Token Budgets",
    summary:"Design context management strategies for AI apps: conversation history windowing, summary compression, user memory injection, and token budget control. The difference between an AI app that feels smart and one that forgets everything.",
    task:"Add conversation history to your Day 5 app with a 10-message sliding window. Then add a compression step that summarizes older messages when the limit is hit. Test a 20-message conversation.",
    tools:["Claude API", "Python", "Cursor"],
    whyItMatters:"Context is the fundamental constraint of every LLM. Managing it well is the difference between a demo and a product." },

  { day:7, week:1, level:2, category:"AI Integration", isMiniProject:true,
    title:"Mini-Project: Working AI-Powered MVP",
    summary:"Ship a working AI-powered MVP that solves one real problem. Combines your API integration, system prompt design, and app skeleton into something a real user can try today.",
    task:"Define one problem. Build one working product: a document Q&A tool, an AI email drafter, a code reviewer, or a problem of your own. It must be runnable by someone who wasn't in the room when you built it.",
    tools:["Claude API", "FastAPI", "Streamlit or Next.js", "Cursor"],
    whyItMatters:"Week 1 ends with something real. Not a tutorial project — a working MVP that demonstrates full-stack AI capability from prompt to UI." },

  // ── WEEK 2: AGENTS, AUTOMATION, AND MCP (Days 8–14) ───────────────────────
  { day:8, week:2, level:2, category:"Automation",
    title:"Agents 101 — Tools, Planning, and Execution Loops",
    summary:"Understand the anatomy of an AI agent: tools the model can call, a planning step, an execution loop, and a stopping condition. Build the simplest possible agent that actually does something useful.",
    task:"Build a minimal agent using Claude with tool use. Give it 2 tools: a web search function and a file writer. Give it the task: \"Research X and save a 3-bullet summary to a file.\" Confirm it completes autonomously.",
    tools:["Claude API", "Anthropic SDK", "Python", "Cursor"],
    whyItMatters:"Agents are the defining capability of AI in 2026. Understanding the architecture at the code level means you can build and debug them — not just prompt them." },

  { day:9, week:2, level:2, category:"Automation",
    title:"Tool Use — Give Claude Hands",
    summary:"Design and implement custom tool functions that Claude can call: calculators, API callers, file system access, database queries, and web scrapers. Master the tool-calling pattern that works with any model.",
    task:"Build 3 custom tools for Claude: (1) a calculator that evaluates math expressions, (2) a web fetcher that returns page text, (3) a CSV reader. Test Claude calling all 3 in a single conversation.",
    tools:["Claude API", "Anthropic SDK", "Python", "Cursor"],
    whyItMatters:"Tool use is what turns an LLM into a capable system. Every agent, every automation, every AI product that does real-world actions runs on this pattern." },

  { day:10, week:2, level:2, category:"AI Integration",
    title:"MCP — Model Context Protocol in Practice",
    summary:"Connect Claude to MCP servers for persistent memory, external tool access, and context augmentation. Understand what MCP is, why it exists, and how to build and connect a custom MCP server.",
    task:"Connect Claude Desktop or your app to 2 MCP servers: one for file system access and one of your choice from the MCP registry. Build a simple custom MCP server that exposes one tool.",
    tools:["Claude", "MCP SDK", "Python", "Cursor"],
    whyItMatters:"MCP is the emerging standard for AI-tool connectivity in 2026. Building with it now puts you ahead of the majority of AI developers who are still using raw tool calls." },

  { day:11, week:2, level:2, category:"Automation",
    title:"Multi-Step Pipelines — Chain of Agents",
    summary:"Design multi-agent pipelines where specialized agents hand off tasks: a researcher, a writer, and a reviewer working in sequence. Understand orchestration, state passing, and failure recovery.",
    task:"Build a 3-agent pipeline: Agent 1 researches a topic from the web. Agent 2 writes a structured summary. Agent 3 reviews and scores it. The output is a final document with a quality score.",
    tools:["Claude API", "Python", "Cursor"],
    whyItMatters:"Single agents are powerful. Pipelines of specialized agents are transformative. This pattern is how production AI systems at scale actually work in 2026." },

  { day:12, week:2, level:2, category:"Automation",
    title:"Error Handling in Production AI Systems",
    summary:"Design robust error handling for AI-powered automations: retries with exponential backoff, fallback models, output validation, and graceful degradation when the model fails or refuses.",
    task:"Take your Day 11 pipeline. Add: (1) retry logic with 3 attempts, (2) output schema validation that rejects malformed responses, (3) a fallback that returns a partial result if any agent fails. Test by deliberately breaking each agent.",
    tools:["Claude API", "Python", "Pydantic", "Cursor"],
    whyItMatters:"AI systems fail in ways traditional software doesn't — hallucinations, refusals, malformed JSON, rate limits. Production-grade error handling is the line between a demo and a deployable system." },

  { day:13, week:2, level:2, category:"Automation",
    title:"Scheduling and Running Agents Autonomously",
    summary:"Deploy your agent or pipeline to run on a schedule — daily summaries, hourly monitors, weekly reports — using GitHub Actions, Railway, or a cron job. True automation: runs while you sleep.",
    task:"Deploy one of your agents to run on a daily schedule using GitHub Actions. It should: fetch data, process with Claude, and save output to a file or send a notification. Confirm it runs without you.",
    tools:["GitHub Actions", "Railway", "Python", "Claude API"],
    whyItMatters:"An agent you run manually is a script. An agent that runs on a schedule is infrastructure. This is the step that makes your AI work for you 24/7." },

  { day:14, week:2, level:2, category:"Automation", isMiniProject:true,
    title:"Mini-Project: A Working Agent That Solves a Real Problem",
    summary:"Build and deploy an autonomous agent that solves one real-world problem from start to finish — research to output — with no human in the loop after the trigger.",
    task:"Define one repeating task in your life or work. Build an agent that completes it autonomously, on a schedule. It must run 3 consecutive times successfully with no manual intervention.",
    tools:["Claude API", "Python", "GitHub Actions", "Cursor"],
    whyItMatters:"This agent is your most impressive portfolio piece from the Advanced track. A running agent is proof of capability that no portfolio PDF can match." },

  // ── WEEK 3: SHIP TO PRODUCTION (Days 15–21) ────────────────────────────────
  { day:15, week:3, level:2, category:"Deploy",
    title:"Deployment — Vercel, Railway, and Fly.io",
    summary:"Deploy your AI app to the public internet. Cover environment variable management in production, HTTPS, domain setup, and the deployment pipeline that gets your app live in under 30 minutes.",
    task:"Deploy your Day 5 (or Day 7) app to Vercel (frontend) and Railway (backend). Set all secrets via environment variables. Share the live URL. Confirm it works for someone who isn't you.",
    tools:["Vercel", "Railway", "Fly.io", "Cursor", "GitHub"],
    whyItMatters:"An app that runs locally is a prototype. An app on the public internet is a product. This step is where your work becomes real." },

  { day:16, week:3, level:2, category:"Deploy",
    title:"Authentication — Protecting Your AI App",
    summary:"Add user authentication to your AI app using Clerk or Supabase Auth. Protect API endpoints, associate usage with users, and prevent unauthorized access to your Claude API key.",
    task:"Add Clerk authentication to your app. Users must sign in to use it. API calls are only allowed for authenticated sessions. Test that unauthenticated requests are rejected.",
    tools:["Clerk", "Supabase", "FastAPI", "Cursor"],
    whyItMatters:"An AI app without auth burns your API budget on anyone who finds the URL. Auth is the first step from toy to product." },

  { day:17, week:3, level:2, category:"Deploy",
    title:"Rate Limiting and Usage Tracking",
    summary:"Add rate limiting to prevent abuse, track token usage per user, and build a usage dashboard that shows you exactly what your app is doing and what it's costing.",
    task:"Add rate limiting (10 requests/hour per user) to your API. Log each request: user ID, token count, model, and timestamp to a database. Build a 5-row summary table that shows top users and total cost.",
    tools:["Redis", "Supabase", "FastAPI", "Python", "Cursor"],
    whyItMatters:"AI API costs are real and can spike without warning. Usage tracking is how you run a profitable AI product instead of an expensive hobby." },

  { day:18, week:3, level:2, category:"AI Integration",
    title:"Evals — Testing That Your AI Actually Works",
    summary:"Build an evaluation framework for your AI app: define a test set of inputs and expected outputs, run automated evals, and measure quality score across model versions and prompt changes.",
    task:"Write 10 test cases for your AI app (input + expected output). Build a script that runs all 10 and scores each response (pass/fail or 1–5). Run it before and after a prompt change. Document what moved.",
    tools:["Claude API", "Python", "Braintrust or custom eval script", "Cursor"],
    whyItMatters:"Without evals, every prompt change is a guess. With evals, every change is measured. This is how professional AI teams ship with confidence." },

  { day:19, week:3, level:2, category:"Deploy",
    title:"Logging, Monitoring, and Debugging Live AI Systems",
    summary:"Instrument your AI app with structured logging, error alerting, and response monitoring. Know when your app is failing, why it's failing, and which requests are producing bad outputs.",
    task:"Add structured logging to your app: log every AI request and response with timestamp, user, model, tokens, and a quality flag. Set up a simple alert that triggers when error rate exceeds 5% in 1 hour.",
    tools:["Logfire", "Sentry", "Python logging", "Railway", "Cursor"],
    whyItMatters:"Production AI systems fail silently. Logging and monitoring is the difference between finding out about problems from your users and finding out before they do." },

  { day:20, week:3, level:2, category:"Deploy",
    title:"CI/CD — Ship When You Push",
    summary:"Set up a CI/CD pipeline so your app automatically tests and deploys when you push to main. This is the workflow of every professional engineering team and it works for vibe-coded apps too.",
    task:"Create a GitHub Actions workflow that: runs your eval suite on every PR, blocks merge if evals fail, and auto-deploys to Railway on push to main. Test by pushing a breaking change.",
    tools:["GitHub Actions", "Railway", "Vercel", "Python", "Cursor"],
    whyItMatters:"Manual deployment is slow and error-prone. CI/CD means every push is tested and shipped automatically — the final step from hobbyist to professional." },

  { day:21, week:3, level:2, category:"Deploy", isMiniProject:true,
    title:"Mini-Project: Fully Deployed, Auth-Protected AI App",
    summary:"Polish and finalize your deployed app: auth working, rate limiting in place, evals green, logs flowing, CI/CD shipping automatically. This is production-ready.",
    task:"Deploy a complete AI app with all production requirements: authentication, rate limiting, eval suite, structured logging, and CI/CD. Share the live URL and confirm 3 people can use it without your help.",
    tools:["Vercel", "Railway", "Clerk", "GitHub Actions", "Cursor"],
    whyItMatters:"Production-ready is a bar, not a feeling. This mini-project is the moment your app earns that label — and your portfolio earns a live link." },

  // ── WEEK 4: PRODUCT THINKING AND CAPSTONE (Days 22–28) ─────────────────────
  { day:22, week:4, level:2, category:"Product",
    title:"Prompt Architecture — Designing for Scale and Quality",
    summary:"Design a production prompt architecture: separate system prompts per user role, dynamic context injection, few-shot examples, and output validation schemas. The craft that keeps AI quality consistent at scale.",
    task:"Redesign your app's prompt system. Create 3 role-specific system prompts, add 2 few-shot examples per prompt, and define a Pydantic output schema that validates every response. Run your eval suite against the new architecture.",
    tools:["Claude API", "Pydantic", "Python", "Cursor"],
    whyItMatters:"A prompt that works in a demo sometimes fails at scale. A prompt architecture that works at scale is a product asset — and a rare skill in 2026." },

  { day:23, week:4, level:2, category:"Product",
    title:"Using v0 and Lovable for Rapid UI Generation",
    summary:"Generate production-quality UI components and full pages using v0 (Vercel) and Lovable — then integrate them into your existing app. Go from idea to deployed UI in under an hour.",
    task:"Design and generate a new page for your app using v0 or Lovable. Integrate it with your existing backend. Deploy it. The UI should be something you're proud to show in a portfolio.",
    tools:["v0", "Lovable", "Next.js", "Cursor", "Vercel"],
    whyItMatters:"In 2026, UI is no longer a bottleneck. The constraint is imagination and product judgment, not CSS knowledge. This session removes the last technical barrier between idea and shipped feature." },

  { day:24, week:4, level:2, category:"Product",
    title:"Writing a Technical Spec for an AI Build",
    summary:"Write the technical specification for an AI product: user problem, solution architecture, data flow, prompt design, eval criteria, and launch requirements. The document that aligns teams and survives scope creep.",
    task:"Write a 2-page technical spec for a new AI product idea (yours or a chosen prompt). It must include: problem statement, architecture diagram, prompt design summary, eval criteria, and 3 launch requirements.",
    tools:["Claude", "Google Docs", "Miro"],
    whyItMatters:"The gap between a prototype and a funded product is usually a well-written spec. This document is how you communicate ideas to teammates, investors, and future-you." },

  { day:25, week:4, level:2, category:"Product",
    title:"Productizing Your Vibe-Coded Tool — Pricing and Positioning",
    summary:"Turn your AI tool into something others will pay for: define the user, the value proposition, the pricing model, and the landing page. Learn how AI tools are being packaged and sold in 2026.",
    task:"Write a one-page product brief for your best tool: target user, core value proposition, pricing model (freemium/subscription/one-time), and 3-sentence landing page headline + subhead. Show it to one potential user.",
    tools:["Claude", "Notion", "Carrd or Framer"],
    whyItMatters:"Every skill in this course has monetary value. Productizing your work is how you turn 28 days of learning into income — consulting, SaaS, or your own company." },

  { day:26, week:4, level:2, category:"Strategy",
    title:"The AI Developer Landscape — Where to Go from Here",
    summary:"Map the paths from vibe coder to AI product builder: freelance, internal tooling, SaaS, AI agency, or founding. Understand which skills compound and which employers and clients are hiring for in 2026.",
    task:"Write a 1-page personal positioning statement: what you can now build, who you can build it for, what differentiates you, and your next 3 steps. Use Claude to pressure-test your positioning.",
    tools:["Claude", "Perplexity AI", "Notion"],
    whyItMatters:"Skills without a plan evaporate. A positioning statement turns your capability into a direction — and a direction into opportunities." },

  { day:27, week:4, level:2, category:"Product",
    title:"Portfolio Assembly — Three Projects, One Story",
    summary:"Assemble your Level 2 portfolio: 3 shipped projects with live links, technical write-ups, and demo recordings. Build the GitHub profile, Notion portfolio page, or website that tells your story in under 60 seconds.",
    task:"Finalize 3 projects: live URL, 2-minute Loom demo, and a 3-sentence technical write-up for each. Publish to GitHub (with READMEs) and a portfolio page. Share the link with your cohort.",
    tools:["GitHub", "Loom", "Notion or Framer", "Cursor"],
    whyItMatters:"Portfolios close opportunities. Three working AI products with live links are more powerful than any resume, certification, or bootcamp credential." },

  { day:28, week:4, level:2, category:"Strategy", isMiniProject:true,
    title:"Final Capstone — Ship Something Real",
    summary:"Build and ship your capstone: a complete, deployed AI product that solves a real problem for real users. Combines full-stack architecture, agent or RAG design, production deployment, and product positioning.",
    task:"Ship a complete AI product: (1) real problem solved, (2) live URL, (3) at least 3 people who have used it, (4) eval suite with >80% pass rate, (5) 5-minute recorded demo, (6) one-page product brief. Present to your cohort.",
    tools:["Claude API", "Vercel", "Railway", "GitHub Actions", "Cursor", "Loom"],
    whyItMatters:"This capstone is the line between someone who learned about AI and someone who builds with it. The product you ship today is the first entry in a body of work that compounds for the rest of your career." },
];

// Backwards-compat default
export const curriculum = curriculumL1;

// ─────────────────────────────────────────────
// SYSTEMS SUMMARY
// ─────────────────────────────────────────────

export const systemsSummaryL1 = [
  { week:1, title:"The Vibe Coding Mindset", systems:["3-part prompt structure: Goal / Constraints / Format","Debugging loop: paste error → get fix → understand → iterate","Cursor or VS Code AI-native setup with working sandbox","First working automation: tested, documented, saved","Week 1 prompt library: 5+ reusable patterns"] },
  { week:2, title:"Building Real Things", systems:["PDF and CSV extraction SOP with pdfplumber + pandas","Web scraping pattern: requests + BeautifulSoup + pagination","FastAPI local server with one working endpoint","External API integration pattern: weather, news, or finance","GitHub Actions scheduled cron job running autonomously"] },
  { week:3, title:"Making It Yours", systems:["Streamlit UI wrapper pattern: any script → shareable app","SQLite persistence pattern: store → retrieve → summarize","`.env` security standard applied to all scripts","Refactoring SOP: from messy generated code to clean functions","Personal dashboard: 2+ data sources, live, all AI-generated"] },
  { week:4, title:"Ship It — Portfolio and Graduation", systems:["File I/O pipeline: read → filter → write → summarize","CLI argument pattern: argparse for reusable scripts","Project folder structure with README for every script","Non-technical run guide: tested by a real non-coder","Level 1 portfolio: 3 scripts, requirements.txt, README, demo"] },
];

export const systemsSummaryL2 = [
  { week:1, title:"Full-Stack AI App Architecture", systems:["Anthropic API wrapper with streaming response handling","System prompt library: 3 roles, tested against edge cases","RAG pipeline: chunk → embed → store → retrieve → respond","Full-stack app skeleton: Next.js + FastAPI + Claude (live)","Context management: sliding window + compression strategy"] },
  { week:2, title:"Agents, Automation, and MCP", systems:["Minimal agent with 2+ tools running to completion autonomously","Tool-use pattern: 3 custom tools wired to Claude","MCP server connection + custom MCP server with 1 tool","3-agent pipeline: researcher → writer → reviewer","Production error handling: retries + validation + fallback"] },
  { week:3, title:"Ship to Production", systems:["Deployed app: Vercel frontend + Railway backend, live URL","Clerk authentication protecting all API endpoints","Rate limiting (per-user) + usage log (user / tokens / cost)","Eval suite: 10 test cases, automated scoring, CI-gated","CI/CD pipeline: auto-test on PR, auto-deploy on merge"] },
  { week:4, title:"Product Thinking and Capstone", systems:["Production prompt architecture: role prompts + few-shot + schema","v0 or Lovable generated UI integrated into live app","2-page technical spec: architecture + prompts + evals + launch","Personal positioning statement: what you build, for whom, next steps","Level 2 portfolio: 3 live projects with demos and technical write-ups"] },
];

export const systemsSummary = systemsSummaryL1;

// ─────────────────────────────────────────────
// STARTER TOOLKIT (combined)
// ─────────────────────────────────────────────

export const starterToolkit: ToolkitItem[] = [
  { name:"Claude", url:"https://claude.ai", category:"AI Assistant", desc:"Primary AI partner for code generation, debugging, architecture design, and prompt engineering. Claude 4 (Sonnet/Opus) is the recommended model for vibe coding in 2026 — best for structured code and long context." },
  { name:"ChatGPT / GPT-4o", url:"https://chat.openai.com", category:"AI Assistant", desc:"Strong alternative for code generation and explaining concepts. Useful for comparing approaches. Note: geo-blocked in some regions — use Claude or Gemini instead." },
  { name:"Gemini", url:"https://gemini.google.com", category:"AI Assistant", desc:"Google's AI — built into Google Docs and Sheets. Recommended for users in regions where ChatGPT is blocked. Strong for research and document tasks." },
  { name:"Perplexity AI", url:"https://perplexity.ai", category:"AI Assistant", desc:"AI research with real-time source citations. Best for looking up libraries, frameworks, APIs, and finding documentation fast. Saves hours of search time." },
  { name:"Cursor", url:"https://cursor.sh", category:"IDE", desc:"The leading AI-native code editor in 2026. Vibe coding's home base. Autocomplete, inline chat, and multi-file edit powered by Claude and GPT-4o. Highly recommended over VS Code for beginners." },
  { name:"Claude Code", url:"https://claude.ai/code", category:"IDE Extension", desc:"Anthropic's agentic coding CLI and VS Code/JetBrains extension. For advanced vibe coders who want Claude with full codebase context and terminal access." },
  { name:"v0", url:"https://v0.dev", category:"UI Generation", desc:"Vercel's AI UI generator. Describe a component or page in plain English and get production-quality React/Tailwind code instantly. The fastest way to build UIs in 2026." },
  { name:"Lovable", url:"https://lovable.dev", category:"UI Generation", desc:"Full-app AI builder — generate complete React apps from a prompt. Integrates with Supabase and Stripe. Best for quickly prototyping product ideas without touching a frontend framework." },
  { name:"Replit", url:"https://replit.com", category:"Sandbox", desc:"Browser-based coding environment — no install required. Best for beginners who want to run code immediately. Includes Replit Agent for AI-assisted building." },
  { name:"GitHub Actions", url:"https://github.com/features/actions", category:"Automation", desc:"Free CI/CD and cron scheduling. Run your scripts on a schedule, auto-test on every push, and auto-deploy to production. The backbone of every automated pipeline in this course." },
  { name:"Railway", url:"https://railway.app", category:"Deployment", desc:"The easiest way to deploy Python backends, FastAPI apps, and scheduled jobs. Free tier for small projects. Connects directly to GitHub for auto-deploy." },
  { name:"Vercel", url:"https://vercel.com", category:"Deployment", desc:"Best-in-class frontend deployment for Next.js and React apps. Free tier. Auto-deploys from GitHub on every push. The standard platform for AI product frontends in 2026." },
  { name:"Streamlit", url:"https://streamlit.io", category:"UI", desc:"Turn any Python script into a shareable web app in minutes. No frontend knowledge required. The fastest way to add a UI to your automation." },
  { name:"Notion", url:"https://notion.so", category:"Productivity", desc:"Build your prompt library, document your scripts, and maintain your vibe coding reference guide. Essential personal knowledge system for every vibe coder." },
  { name:"Loom", url:"https://loom.com", category:"Productivity", desc:"Record 2-minute screen demos for every portfolio project. The fastest way to show what you built without writing a word." },
];

// ─────────────────────────────────────────────
// PORTFOLIO TARGETS
// ─────────────────────────────────────────────

export const portfolioTargets: PortfolioTarget[] = [
  // Level 1
  { title:"Working Automation #1", week:1, level:1, desc:"A working Python script that solves a real problem — file organizer, data cleaner, or text summarizer. Tested, documented, and saved." },
  { title:"Internal Team Tool", week:2, level:1, desc:"A practical tool built for a real colleague — report generator, data cleaner, or link checker — with a one-paragraph README." },
  { title:"Personal Dashboard", week:3, level:1, desc:"A Streamlit dashboard pulling from 2+ data sources with a chart, live data feed, and one custom metric. All AI-generated." },
  { title:"Level 1 Automation Suite", week:4, level:1, desc:"3 working scripts with a requirements.txt, full README, and a 2-minute Loom demo recording. Your complete Level 1 portfolio." },
  // Level 2
  { title:"AI-Powered MVP", week:1, level:2, desc:"A working, runnable AI product with a system prompt, streaming Claude API integration, and a UI. Solvable by a real user who wasn't in the room." },
  { title:"Autonomous Agent", week:2, level:2, desc:"A deployed agent that runs on a schedule, completes a multi-step task with no human input, and has run successfully 3+ times." },
  { title:"Deployed Production App", week:3, level:2, desc:"A live AI app with authentication, rate limiting, eval suite, structured logging, and CI/CD. Shareable URL. Used by real people." },
  { title:"Level 2 Capstone — Shipped AI Product", week:4, level:2, desc:"A complete AI product: live URL, 3+ real users, 80%+ eval pass rate, 5-minute recorded demo, and a one-page product brief. Your flagship portfolio piece." },
];

// ─────────────────────────────────────────────
// SERVICE LADDER
// ─────────────────────────────────────────────

export interface ServiceTier {
  tier: number;
  name: string;
  description: string;
  price: string;
  level: 1 | 2 | "both";
  examples: string[];
}

export const serviceLadder: ServiceTier[] = [

  // ── Level 1 Services ──────────────────────────────────────────────────────
  {
    tier: 1,
    level: 1,
    name: "Script Automation Build",
    description: "A custom Python script that automates one specific repetitive task — file processing, data extraction, report generation, or scheduled alerts.",
    price: "$150–400",
    examples: [
      "File organizer, renamer, or deduplicator",
      "PDF or CSV data extractor",
      "Scheduled report or digest email",
      "Simple API integration pulling data to a spreadsheet",
    ],
  },
  {
    tier: 2,
    level: 1,
    name: "Internal Tool with UI",
    description: "A web-based internal tool built with Streamlit or Gradio — a script wrapped in a clickable UI that any non-technical colleague can use.",
    price: "$300–700",
    examples: [
      "Data cleaner with upload and download",
      "Report generator from a template",
      "Text summarizer or document Q&A tool",
      "Simple dashboard for a specific dataset",
    ],
  },
  {
    tier: 3,
    level: 1,
    name: "Automation Audit and Opportunity Map",
    description: "A structured review of a client's manual workflows — identifying the top 5 automation opportunities with effort/impact ratings and a recommended build order.",
    price: "$300–600",
    examples: [
      "Workflow interview and process mapping",
      "Top 5 automation opportunities scored by effort and ROI",
      "Recommended tool stack for each opportunity",
      "Written report formatted for a non-technical owner",
    ],
  },
  {
    tier: 4,
    level: 1,
    name: "Prompt Library Build",
    description: "A custom prompt library for a specific team or use case — 15+ tested prompts across core workflows with a usage guide and worked examples.",
    price: "$400–800",
    examples: [
      "15+ prompts organized by workflow type",
      "Tested against real inputs with example outputs",
      "Usage guide written for non-technical staff",
      "One 60-minute walkthrough session included",
    ],
  },

  // ── Level 2 Services ──────────────────────────────────────────────────────
  {
    tier: 5,
    level: 2,
    name: "AI-Powered MVP Build",
    description: "A production-ready AI-powered application — full-stack, deployed, with authentication and a real user-facing UI. Solves one well-defined problem.",
    price: "$1,500–4,000",
    examples: [
      "Document Q&A tool with RAG backend",
      "AI-assisted workflow tool with streaming UI",
      "Internal AI assistant for a specific team function",
      "Deployed to Vercel + Railway with auth and rate limiting",
    ],
  },
  {
    tier: 6,
    level: 2,
    name: "Autonomous Agent Build",
    description: "Design and deployment of an autonomous AI agent that completes a multi-step task on a schedule — research, data processing, report generation, or monitoring.",
    price: "$2,000–5,000",
    examples: [
      "Daily research agent that summarizes and emails a digest",
      "Data monitoring agent with anomaly alerting",
      "Automated report generation from live data sources",
      "Multi-step pipeline with error handling and logging",
    ],
  },
  {
    tier: 7,
    level: 2,
    name: "AI Integration Into Existing Product",
    description: "Integration of Claude or GPT-4o into an existing product or workflow — adding AI features without rebuilding from scratch.",
    price: "$2,500–6,000",
    examples: [
      "AI-powered feature added to an existing SaaS product",
      "Document analysis layer added to existing tool",
      "Prompt architecture design + API integration",
      "Eval suite and monitoring setup for existing AI features",
    ],
  },
  {
    tier: 8,
    level: 2,
    name: "AI Product Build — SaaS-Ready",
    description: "A complete, commercially deployable AI product — built, tested, and packaged for launch. Includes architecture design, production deployment, eval framework, and product brief.",
    price: "$5,000–15,000",
    examples: [
      "Full-stack AI SaaS with auth, billing, and rate limiting",
      "Eval suite ensuring production quality at scale",
      "CI/CD pipeline for ongoing development",
      "Technical spec and product brief for investor or team use",
    ],
  },
  {
    tier: 9,
    level: "both",
    name: "Monthly AI Build Retainer",
    description: "Ongoing vibe coding and AI development support — building, iterating, and maintaining AI tools and automations on a monthly engagement.",
    price: "$500–3,000/month",
    examples: [
      "2–4 new automation or AI features per month",
      "Ongoing maintenance and iteration on live tools",
      "Prompt library updates as models and requirements evolve",
      "Monthly review call and priority planning",
    ],
  },
];

// ─────────────────────────────────────────────
// METRICS TO TRACK
// ─────────────────────────────────────────────

export const metricsToTrack = [
  { metric:"Prompt Quality Score", why:"Track how often your first prompt produces usable output without heavy editing. Target: 70%+ usable on first attempt by Week 4." },
  { metric:"Time to Working Code", why:"Measure how long from problem description to working, tested script. This is your personal productivity curve. Watch it drop week over week." },
  { metric:"Bug Resolution Speed", why:"Track how quickly you resolve errors — from paste-to-Claude to confirmed fix. Faster resolution means better debugging instincts, not just better prompts." },
  { metric:"Prompt Library Size", why:"Count your saved, reusable prompts. Each one is a problem you've systematized. Target 10 by Day 14, 25+ by Day 28." },
  { metric:"Projects Shipped", why:"Count projects that are running, tested, and usable by someone other than you. Shipped beats polished. Aim for 1 per week." },
  { metric:"Portfolio Live Links", why:"Count public-facing deployed projects with live URLs. These are your most powerful credential — more than any certification or course completion." },
];

