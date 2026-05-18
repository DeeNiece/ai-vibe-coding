// ── AI Sprint · Vibe Coding ────────────────────────────────────────────────────
// File: curriculum.ts | Repo: ai-vibe-coding
// Last updated: May 2026
// =============================================================================
// AI Sprint — Vibe Coding Course Curriculum
// VIBE CODING & IOP — BUILD SOFTWARE WITH AI — Crafter & Composer
// Updated May 2026: Claude Code, Bolt.new, Firecrawl, Cursor Rules,
// Vercel AI SDK, computer use, intent-oriented programming added
// =============================================================================

// ── Level 1 categories (Crafter)
export type CategoryL1 =
  | "Learn"
  | "Build"
  | "Apply"
  | "Sprint"
  | "Reflect"
  | "Secure"
  | "Optimize"
  | "Review";

// ── Level 2 categories (Composer)
export type CategoryL2 =
  | "Architecture"
  | "Automation"
  | "AI Integration"
  | "Deploy"
  | "Product"
  | "Strategy"
  | "Claude Code"
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
// WEEK OVERVIEWS — LEVEL 1 (Crafter)
// ─────────────────────────────────────────────

export const weekOverviewsL1: WeekOverview[] = [
  {
    week: 1, level: 1,
    title: "The Crafter Mindset — Vibe Coding & IOP",
    color: "#0d7c8a",
    outcomes: [
      "Understand the vibe coding philosophy: natural language → working software",
      "Write your first working script from a single prompt",
      "Read and review AI-generated code with confidence",
      "Master the 3-part prompt structure: Goal, Constraints, Format",
      "Set up your sandbox (Cursor or Bolt.new) and survive your first bug",
    ],
  },
  {
    week: 2, level: 1,
    title: "Building Real Things",
    color: "#2f6fa8",
    outcomes: [
      "Extract data from PDFs and CSVs with AI-written scripts",
      "Build a web scraper using Firecrawl — no selector writing required",
      "Create a local API endpoint with FastAPI",
      "Connect to external APIs and mash up two data sources",
      "Schedule automations to run hands-free with GitHub Actions",
    ],
  },
  {
    week: 3, level: 1,
    title: "Making It Yours",
    color: "#7a5fc0",
    outcomes: [
      "Wrap any script in a shareable UI with Streamlit or a v0-generated interface",
      "Store and query data persistently with SQLite",
      "Iterate and improve AI code with targeted follow-up prompts",
      "Secure your scripts — no hardcoded API keys, ever",
      "Refactor messy generated code into clean, reusable modules",
    ],
  },
  {
    week: 4, level: 1,
    title: "Ship It — Crafter Portfolio and Graduation",
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
// WEEK OVERVIEWS — LEVEL 2 (Composer)
// ─────────────────────────────────────────────

export const weekOverviewsL2: WeekOverview[] = [
  {
    week: 1, level: 2,
    title: "Full-Stack AI App Architecture",
    color: "#e8820c",
    outcomes: [
      "Design multi-agent and RAG architectures for real products",
      "Build a full-stack app skeleton with Vercel AI SDK + Claude streaming",
      "Master Claude Code as your agentic development environment",
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
      "Write Cursor Rules that encode your architecture into every AI suggestion",
      "Design multi-step pipelines that run end-to-end without human input",
      "Complete a working agent that solves a real business problem",
    ],
  },
  {
    week: 3, level: 2,
    title: "Ship to Production",
    color: "#a0510a",
    outcomes: [
      "Deploy a full-stack AI app to Vercel + Railway with CI/CD",
      "Add authentication, rate limiting, and usage tracking",
      "Implement evals — testing that your AI outputs meet a quality bar",
      "Monitor, log, and debug live AI systems",
      "Use computer use / browser automation for tasks no API can reach",
    ],
  },
  {
    week: 4, level: 2,
    title: "Composer Capstone — Ship a Production AI Product",
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
// CURRICULUM — LEVEL 1 (28 Days — Crafter)
// ─────────────────────────────────────────────

export const curriculumL1: DayLesson[] = [

  // ── WEEK 1: THE VIBE CODING MINDSET (Days 1–7) ─────────────────────────────
  {
    day: 1, week: 1, level: 1, category: "Learn",
    title: "What Is Vibe Coding? Intent-Oriented Programming in 2026",
    summary:
      "Understand the philosophy: you bring the intent, AI brings the implementation. Vibe coding in 2026 is not about shortcuts — it's a new mental model where your job is to think clearly, direct precisely, and review intelligently. AI is your engine, not your replacement.",
    task:
      "Write a 2-sentence explanation of vibe coding to a skeptical colleague. No jargon. Then write a 3-sentence version of what you want to build by the end of this course. Save both. You'll revisit them on Day 28.",
    whyItMatters:
      "Most people still think coding is for engineers. Vibe coding — and intent-oriented programming — permanently changes that. Your ideas, your rules, AI as your execution layer.",
    tools: ["Claude", "ChatGPT"],
  },
  {
    day: 2, week: 1, level: 1, category: "Apply",
    title: "Your First Working Script — From One Prompt",
    summary:
      "Write a single structured prompt that generates a working Python script. Run it. See it work. The moment it works, something shifts permanently.",
    task:
      "Prompt: \"Write a Python script that renames all files in a folder to sequential numbers. Include error handling if the folder is empty.\" Run it on a test folder. Confirm it works. Screenshot the output.",
    whyItMatters:
      "Your first working script is a threshold moment. After today, you will never not believe it's possible.",
    tools: ["Claude", "Python", "Cursor"],
  },
  {
    day: 3, week: 1, level: 1, category: "Learn",
    title: "Reading AI Code — You Direct, You Review",
    summary:
      "Learn to read AI-generated code well enough to spot errors, understand flow, and request precise changes. In 2026, code literacy is more valuable than code authorship — you need to review, not rewrite.",
    task:
      "Take the script from Day 2. Read every line. Write a paragraph in plain English explaining what it does. Then ask Claude: \"What would break this script?\" Apply one fix as a test and confirm it's robust.",
    whyItMatters:
      "You don't need to write code from scratch. You need to be a great reviewer. That's the real craft of vibe coding — directing intent, not typing syntax.",
    tools: ["Claude", "Python"],
  },
  {
    day: 4, week: 1, level: 1, category: "Learn",
    title: "The 3-Part Vibe Prompt — Goal, Constraints, Format",
    summary:
      "Master the prompt structure that consistently produces working code: what you want, what limits it, and how you want it returned. This pattern works for every model, every task, every language.",
    task:
      "Rewrite your Day 2 prompt using the 3-part structure. Compare outputs side-by-side. Document exactly what improved and why. Save this as Prompt Pattern #1 in your reference guide.",
    whyItMatters:
      "Vague prompts produce broken code. Structured prompts produce working code. This single pattern is worth the entire course.",
    tools: ["Claude", "ChatGPT"],
  },
  {
    day: 5, week: 1, level: 1, category: "Apply",
    title: "Your Sandbox — Cursor, Bolt.new, or Claude Code",
    summary:
      "Choose and configure your AI-native development environment. In 2026: Cursor is the leading IDE for serious vibe coders. Bolt.new is the fastest browser-based app builder — no install, zero config, ship in minutes. Claude Code is for power users who want agentic terminal access.",
    task:
      "Install Cursor (recommended for most learners). As a bonus: open Bolt.new and build a simple to-do app from a single sentence prompt. Compare the two experiences and write 3 sentences on the difference.",
    whyItMatters:
      "Your tools shape your thinking. In 2026, an AI-native environment doesn't just autocomplete — it understands your whole project and makes suggestions at the architectural level.",
    tools: ["Cursor", "Bolt.new", "Claude Code", "VS Code"],
  },
  {
    day: 6, week: 1, level: 1, category: "Apply",
    title: "The Debugging Loop — AI Made a Bug, Now What?",
    summary:
      "Learn the debugging loop: paste the full error back to AI, ask for a fix with explanation, understand what changed, confirm it's fixed. Master this and bugs become 60-second interruptions, not hour-long blocks.",
    task:
      "Introduce a deliberate bug into your Day 2 script. Paste the full error message to Claude with context. Apply the fix. Document in 3 bullets what changed and why. Repeat with a second bug.",
    whyItMatters:
      "Bugs are not failures — they're feedback. The skill is not avoiding bugs, it's resolving them fast. This loop is the core of vibe coding fluency.",
    tools: ["Claude", "Python", "Cursor"],
  },
  {
    day: 7, week: 1, level: 1, category: "Sprint", isMiniProject: true,
    title: "Sprint — Build a Working Automation",
    summary:
      "Apply everything from Week 1 to build a real automation that solves a problem you actually have. Ship it. Test it. Keep it.",
    task:
      "Build one working automation: file organizer, email parser, CSV cleaner, text summarizer, or an idea of your own. Test on real data. Document the prompt chain and save your script. This is Portfolio Piece #1.",
    whyItMatters:
      "Your first real automation is proof of competence — to yourself and to anyone you show it to. One working thing beats ten half-finished ones.",
    tools: ["Claude", "Python", "Cursor", "Bolt.new"],
  },

  // ── WEEK 2: BUILDING REAL THINGS (Days 8–14) ───────────────────────────────
  {
    day: 8, week: 2, level: 1, category: "Build",
    title: "Data Extraction — PDF and CSV with AI",
    summary:
      "Use AI to write a script that extracts tabular data from PDFs and saves it as CSV — no manual copying, no copy-paste pain, no formatting effort.",
    task:
      "Find a PDF with a table. Prompt AI to extract it to CSV using pdfplumber. Run it. Verify every row against the original. Then add a second script that merges two CSVs by a shared column.",
    whyItMatters:
      "Data extraction is the most common unsexy automation. Master this and you save teams hours every single week — it's the highest ROI skill in Level 1.",
    tools: ["Claude", "Python", "pdfplumber", "pandas"],
  },
  {
    day: 9, week: 2, level: 1, category: "Build",
    title: "Web Scraping with Firecrawl — No Selectors Required",
    summary:
      "Use Firecrawl to scrape structured data from any public website in plain English — no CSS selectors, no XPath, no browser inspection. This is how professionals scrape in 2026.",
    task:
      "Use Firecrawl's API (or Python SDK) to scrape a list of 10 items from any public website. Clean the output with AI. Then scrape a second page and merge both into one CSV. Total time should be under 20 minutes.",
    whyItMatters:
      "Traditional scraping with BeautifulSoup is a skill. Firecrawl is a superpower. Describe what you want in plain English and get structured data back — no selector debugging ever.",
    tools: ["Claude", "Python", "Firecrawl", "requests"],
  },
  {
    day: 10, week: 2, level: 1, category: "Build",
    title: "Building a Simple API Endpoint with FastAPI",
    summary:
      "Create a local API that returns data when you hit a URL — the foundation of every web application. Demystify backends permanently in under an hour.",
    task:
      "Prompt AI to build a FastAPI endpoint at `/hello` returning JSON. Run it, visit the URL. Add a second endpoint that accepts a query parameter and returns a customized response.",
    whyItMatters:
      "APIs are how programs talk to each other. Building one from scratch demystifies the entire backend of every app you've ever used — and opens the door to every integration.",
    tools: ["Claude", "Python", "FastAPI", "uvicorn"],
  },
  {
    day: 11, week: 2, level: 1, category: "Build",
    title: "Connecting to External APIs — Weather, News, or Finance",
    summary:
      "Build a tool that calls an external API and formats the response into something useful. The pattern here works for any API in the world — once you know it, everything's an integration.",
    task:
      "Build a 'weather anywhere' script: user inputs a city, script returns temperature, condition, and a one-sentence plain-English summary generated by Claude. Test with 5 different cities.",
    whyItMatters:
      "Most valuable tools are API mashups. Once you can call any API, you can build almost anything that exists on the internet.",
    tools: ["Claude", "Python", "requests", "OpenWeatherMap API"],
  },
  {
    day: 12, week: 2, level: 1, category: "Build",
    title: "Scheduling Tasks — Cron Jobs and GitHub Actions",
    summary:
      "Schedule your scripts to run automatically — daily reports, hourly checks, weekly summaries — without touching your computer. Automation that requires manual triggering is just a script.",
    task:
      "Schedule your weather script to run every morning at 8am using GitHub Actions. Save output to a log file. Confirm it runs twice successfully without you.",
    whyItMatters:
      "Automation isn't automation if you have to run it manually. Scheduling turns a script into infrastructure that works while you sleep.",
    tools: ["Claude", "GitHub Actions", "cron", "Python"],
  },
  {
    day: 13, week: 2, level: 1, category: "Reflect",
    title: "Reflect — Audit Your Vibe Coding Workflow",
    summary:
      "Step back and examine how you're actually using AI to build. What prompts are producing the best results? Where do you still get stuck? What's your current Time to Working Code?",
    task:
      "Write a 3-paragraph reflection: one prompt pattern that's working, one habit to change, and one thing you couldn't have built a month ago. Update your reference guide with 2 new prompt patterns.",
    whyItMatters:
      "Reflection turns practice into mastery. The best vibe coders iterate on their prompting style the same way developers iterate on their code.",
    tools: ["Claude", "Notion"],
  },
  {
    day: 14, week: 2, level: 1, category: "Sprint", isMiniProject: true,
    title: "Sprint — Build an Internal Tool for Your Team",
    summary:
      "Build something useful for a real colleague — a report generator, data cleaner, link checker, or notification system. Solve a friction that actually exists.",
    task:
      "Build one tool that solves a real problem for your team or yourself. Write a one-paragraph README. Share it with one person and watch them use it. Fix the first thing they get confused by.",
    whyItMatters:
      "Internal tools are high-visibility wins. Watching a colleague use something you built in 15 minutes is one of the most motivating experiences in this course.",
    tools: ["Claude", "Python", "Streamlit", "Bolt.new"],
  },

  // ── WEEK 3: MAKING IT YOURS (Days 15–21) ───────────────────────────────────
  {
    day: 15, week: 3, level: 1, category: "Build",
    title: "Adding a UI — Streamlit, v0, or Bolt.new",
    summary:
      "Turn your script into an app with buttons, inputs, and outputs. In 2026 you have three paths: Streamlit (Python-native, fastest for data tools), v0 (generate polished React components from a prompt), or Bolt.new (generate a full app from a sentence). Choose based on your audience.",
    task:
      "Take any previous script. Wrap it in a Streamlit UI with one text input, one button, and one output. Then open v0.dev and generate the same UI in React with a single description. Compare both experiences.",
    whyItMatters:
      "A script is useful. An app is shareable. UIs are the last mile between a working automation and a tool anyone can use without instructions.",
    tools: ["Claude", "Streamlit", "v0", "Bolt.new", "Python"],
  },
  {
    day: 16, week: 3, level: 1, category: "Build",
    title: "Local Databases — SQLite with AI-Generated Queries",
    summary:
      "Store and query data persistently using SQLite, with AI writing every SQL query. Data persistence is the boundary between a toy and a product.",
    task:
      "Build a script that saves user inputs to a SQLite database, retrieves them on command, and displays a summary count. Ask AI to write every SQL query. Understand each one before moving on.",
    whyItMatters:
      "Databases are where serious tools live. Everything you build from here on benefits from knowing how to persist data — this single session unlocks product-grade thinking.",
    tools: ["Claude", "Python", "SQLite", "sqlite3"],
  },
  {
    day: 17, week: 3, level: 1, category: "Apply",
    title: "Iterative Improvement — The 'Make It Better' Prompt Chain",
    summary:
      "Learn to ask AI for targeted improvements: add error handling, improve UX messages, add logging, increase robustness — building on working code without rewriting it from scratch.",
    task:
      "Take your Day 15 UI app. Ask AI to add: (1) user-friendly error messages, (2) a loading indicator, (3) input validation that prevents empty submissions. Apply each one separately and test after each.",
    whyItMatters:
      "First drafts are never final. Targeted iteration is the difference between a prototype and something production-ready — and the skill that separates good vibe coders from great ones.",
    tools: ["Claude", "Cursor"],
  },
  {
    day: 18, week: 3, level: 1, category: "Learn",
    title: "Reading Documentation with AI Help",
    summary:
      "When AI uses a library you don't know, ask it to explain the relevant parts in plain English. In 2026 you don't read docs — you ask AI to surface exactly what you need from them.",
    task:
      "Take a script with an unfamiliar library. Ask Claude: \"Explain what this line does and what I need from the docs to modify it.\" Apply one modification based on the explanation. Save the pattern.",
    whyItMatters:
      "You don't need to read all the docs. You need AI to extract the 5% relevant to your exact problem. This is the research pattern of every efficient vibe coder in 2026.",
    tools: ["Claude", "Perplexity AI"],
  },
  {
    day: 19, week: 3, level: 1, category: "Secure",
    title: "Environment Variables — No Hardcoded Keys, Ever",
    summary:
      "Store API keys and secrets outside your code using `.env` files. This is the minimum viable security practice — and the single habit that separates amateur from professional.",
    task:
      "Take any script with a hardcoded key. Move it to `.env`. Update the script to read from `os.environ`. Add `.env` to `.gitignore`. Confirm it works. Verify it's not in your Git history.",
    whyItMatters:
      "Hardcoded secrets in code cause real breaches. This single habit makes your code deployable, shareable, and professional from day one.",
    tools: ["Claude", "python-dotenv", ".env", "Git"],
  },
  {
    day: 20, week: 3, level: 1, category: "Optimize",
    title: "Refactoring with AI — Clean Up Messy Generated Code",
    summary:
      "Ask AI to reorganize, rename, and simplify its own generated code — making it readable, testable, and maintainable without you rewriting a single line manually.",
    task:
      "Take your messiest generated script. Ask AI: \"Refactor this into clean functions with clear names and a docstring for each.\" Compare before and after. What would have been hard to debug in the original?",
    whyItMatters:
      "Generated code works — messy code is a debt. Refactoring is the polish layer that makes your builds last beyond the first run.",
    tools: ["Claude", "Cursor"],
  },
  {
    day: 21, week: 3, level: 1, category: "Sprint", isMiniProject: true,
    title: "Sprint — Personal Automation Dashboard",
    summary:
      "Build a personal dashboard that pulls from at least two data sources and displays live information you actually care about. Entirely AI-generated.",
    task:
      "Build a dashboard showing: a chart from a CSV, a live data feed from an API, and one custom metric you defined. Use Streamlit or v0. Run it locally. This is Portfolio Piece #3.",
    whyItMatters:
      "A dashboard is a portfolio centrepiece — it demonstrates data handling, UI design, and API integration in one artifact. Pure vibe coding.",
    tools: ["Claude", "Streamlit", "v0", "pandas", "requests", "Python"],
  },

  // ── WEEK 4: SHIP IT (Days 22–28) ───────────────────────────────────────────
  {
    day: 22, week: 4, level: 1, category: "Learn",
    title: "File I/O — Reading and Writing Files Like a Pro",
    summary:
      "Master the patterns for reading CSVs, JSON, and text files — then writing processed results back to disk. Most real-world business data lives in files, not databases.",
    task:
      "Build a script that reads a CSV, filters rows by a user-defined condition, writes a new filtered CSV, and prints a one-line summary of what changed. Test with 3 different filter conditions.",
    whyItMatters:
      "File processing is the backbone of business automation. Get this pattern right once and you will reuse it in every project you ever build.",
    tools: ["Claude", "Python", "csv", "pandas"],
  },
  {
    day: 23, week: 4, level: 1, category: "Build",
    title: "Command-Line Arguments — Make Scripts Reusable",
    summary:
      "Add command-line arguments so your scripts accept inputs without editing source code — the difference between a personal tool and a shared tool.",
    task:
      "Modify your CSV filter script to accept input filename, output filename, and filter condition as CLI arguments. Test with three different input combinations and confirm it works for someone else running it cold.",
    whyItMatters:
      "Hardcoded scripts are for you. Scripts with arguments are for everyone. This is the simplest step from personal tool to professional tool.",
    tools: ["Claude", "Python", "argparse"],
  },
  {
    day: 24, week: 4, level: 1, category: "Reflect",
    title: "Organise Your Vibe-Coded Projects",
    summary:
      "Create a folder structure, naming convention, and README habit so you can find, share, and reuse every project you've built — now and in 2 years.",
    task:
      "Organise all scripts from the past 3 weeks into a logical folder structure. Write a one-sentence description for each. Add a top-level README explaining what each does. Push to GitHub.",
    whyItMatters:
      "Disorganised scripts are lost scripts. Organisation compounds value — each new build adds to an asset library you return to for years, not weeks.",
    tools: ["VS Code", "Cursor", "Terminal", "Git"],
  },
  {
    day: 25, week: 4, level: 1, category: "Apply",
    title: "Share Your Tools — Packaging for Non-Technical Users",
    summary:
      "Package your script so a non-technical colleague can run it — clear instructions, dependency list, and error messages that make sense to a normal human.",
    task:
      "Take one script. Write a one-page run guide for someone who has never used a terminal. Test it with a real non-technical person. Fix every single point of confusion they hit. Don't help them — watch.",
    whyItMatters:
      "The best tool is useless if no one else can run it. User-testing your own work is the single fastest way to make it better.",
    tools: ["Claude", "README.md", "requirements.txt"],
  },
  {
    day: 26, week: 4, level: 1, category: "Reflect",
    title: "Your Vibe Coding Reference Guide — Build It Now",
    summary:
      "Build your personal reference: the prompt patterns, debugging steps, and code snippets you'll reuse in every project for the next year. This is your competitive moat.",
    task:
      "Create a Notion page or markdown file with: your top 10 prompts, your 5-step debugging process, 3 reusable code patterns, and the tools you'd recommend to a friend starting today.",
    whyItMatters:
      "A reference guide speeds every future build by 3×. Build it once, use it forever. In 6 months you will thank yourself for building this today.",
    tools: ["Claude", "Notion", "Markdown"],
  },
  {
    day: 27, week: 4, level: 1, category: "Review",
    title: "Peer Review — Stress-Test a Colleague's Script",
    summary:
      "Trade scripts with a peer. Run theirs. Try to break it. Document what you find. Learn from each other's prompting styles and architectural choices.",
    task:
      "Exchange one script with a peer. Run theirs, document 3 issues or edge cases, suggest one concrete improvement with a revised prompt. Write 2 sentences on what their approach taught you.",
    whyItMatters:
      "Reading other people's vibe-coded builds teaches patterns you'd never discover working alone. Your blind spots are their defaults.",
    tools: ["Claude", "Python", "Cursor"],
  },
  {
    day: 28, week: 4, level: 1, category: "Sprint", isMiniProject: true,
    title: "Graduation — Your Level 1 Automation Suite",
    summary:
      "Assemble your three best scripts into a cohesive automation suite with shared utilities, full documentation, and a 2-minute demo recording. Your Level 1 portfolio is complete.",
    task:
      "Create a repo with 3 working scripts, a `requirements.txt`, a README explaining each, and a Loom 2-minute demo. Share it publicly or with your cohort. Revisit your Day 1 description — did you build what you intended?",
    whyItMatters:
      "This suite is your Level 1 portfolio — proof you can build real, working things with AI, no engineering degree required. Keep it. Show it. Build on it.",
    tools: ["Claude", "Python", "Git", "Loom", "Cursor"],
  },
];

// ─────────────────────────────────────────────
// CURRICULUM — LEVEL 2 (28 Days — Composer)
// ─────────────────────────────────────────────

export const curriculumL2: DayLesson[] = [

  // ── WEEK 1: FULL-STACK AI APP ARCHITECTURE (Days 1–7) ──────────────────────
  {
    day: 1, week: 1, level: 2, category: "Architecture",
    title: "The 2026 AI App Stack — From Intent to Production",
    summary:
      "Survey the full modern AI product stack: LLM APIs, vector stores, agents, MCP servers, Vercel AI SDK, and deployment platforms. Understand where vibe coding ends and software engineering begins — and decide exactly how much of that gap you need to close for what you want to build.",
    task:
      "Produce a one-page architecture map for the type of AI app you want to build. Label each layer: frontend, backend, AI model, memory/storage, agent tools, and deployment. Identify your 2 biggest knowledge gaps.",
    whyItMatters:
      "Strategy starts with understanding the terrain. This map becomes your north star for the next 28 days and your blueprint for every AI project that follows.",
    tools: ["Claude", "Miro", "Cursor"],
  },
  {
    day: 2, week: 1, level: 2, category: "Claude Code",
    title: "Claude Code — Agentic Development as Your Primary Workflow",
    summary:
      "Claude Code is not a plugin — it's a new way of working. Learn to use it as your primary development environment: give it high-level tasks, let it read your codebase, write multi-file changes, run tests, and fix its own errors. This is intent-oriented programming at the IDE level.",
    task:
      "Install Claude Code (CLI or VS Code extension). Open an existing project or create a new one. Give Claude Code 3 multi-file tasks: (1) scaffold a FastAPI project structure, (2) add a route, (3) write a test for it. Observe what it reads, what it changes, and what it asks you to confirm.",
    whyItMatters:
      "Claude Code is the single biggest shift in vibe coding since Cursor launched. Developers who work with it daily ship 2–4× faster than those who don't. This is your new default environment.",
    tools: ["Claude Code", "VS Code", "Python", "Git"],
  },
  {
    day: 3, week: 1, level: 2, category: "AI Integration",
    title: "Calling Claude via API — Streaming with Vercel AI SDK",
    summary:
      "Move beyond the chat UI. Use the Vercel AI SDK to call Claude with streaming responses in a Next.js app — the 2026 standard for AI-powered web products. The SDK handles streaming, tool calls, and multi-step generation in a way that raw fetch never could.",
    task:
      "Build a Next.js app with a chat interface using the Vercel AI SDK and Claude. Messages must stream token-by-token. Add a system prompt that makes the assistant reply in a specific persona. Deploy to Vercel.",
    whyItMatters:
      "Vercel AI SDK is the standard for AI streaming in Next.js in 2026. If you're building web products with Claude, this is how professionals do it — not raw fetch, not polling.",
    tools: ["Vercel AI SDK", "Next.js", "Claude API", "Vercel", "Cursor"],
  },
  {
    day: 4, week: 1, level: 2, category: "Architecture",
    title: "System Prompts — The Hidden Engine of Every AI Product",
    summary:
      "Design system prompts that produce consistent, high-quality output across hundreds of interactions. Cover persona, task scope, output format, edge cases, and refusal logic — the craft that separates good AI products from great ones.",
    task:
      "Write 3 system prompts for 3 different AI product roles (e.g., document analyst, code reviewer, customer support agent). Test each with 5 edge-case inputs. Document what breaks and fix it. Rate each prompt 1–5.",
    whyItMatters:
      "System prompts are the product. Everyone with API access has the same model — your system prompt is your proprietary advantage. This craft is worth more than your frontend.",
    tools: ["Claude", "ChatGPT", "Cursor"],
  },
  {
    day: 5, week: 1, level: 2, category: "Architecture",
    title: "RAG — Retrieval-Augmented Generation from Scratch",
    summary:
      "Build a simple RAG pipeline: chunk documents, embed them, store in a vector store, retrieve by semantic similarity, and pass context to the LLM. Understand when RAG beats fine-tuning and when it doesn't.",
    task:
      "Build a working RAG prototype: load 3 text documents, chunk them, embed with OpenAI or Cohere, store in ChromaDB, and answer 5 natural language questions using retrieved context. Measure quality before and after adding context.",
    whyItMatters:
      "RAG is the most deployed AI pattern in production in 2026. Every enterprise AI product uses some form of it. Building one from scratch demystifies the entire category — and makes you dangerous in a good way.",
    tools: ["Claude API", "ChromaDB", "Python", "Cursor", "OpenAI Embeddings"],
  },
  {
    day: 6, week: 1, level: 2, category: "Architecture",
    title: "Context Management — Memory, History, and Token Budgets",
    summary:
      "Design context management strategies for AI apps: conversation history windowing, summary compression, user memory injection, and token budget control. The difference between an AI app that feels smart and one that forgets everything.",
    task:
      "Add conversation history to your Day 3 app with a 10-message sliding window. Add a compression step that summarises older messages when the limit is hit. Test a 20-message conversation. Confirm it stays coherent.",
    whyItMatters:
      "Context is the fundamental constraint of every LLM. Managing it well is the difference between a demo and a product that actually works for real users.",
    tools: ["Claude API", "Vercel AI SDK", "Python", "Cursor"],
  },
  {
    day: 7, week: 1, level: 2, category: "AI Integration", isMiniProject: true,
    title: "Mini-Project — Working AI-Powered MVP",
    summary:
      "Ship a working AI-powered MVP that solves one real problem. Combines your API integration, system prompt design, and app skeleton into something a real user can try today — live URL, no local-only demos.",
    task:
      "Define one problem. Build one working product: a document Q&A tool, an AI email drafter, a code reviewer, or a problem of your own. It must be deployed and usable by someone who wasn't in the room.",
    whyItMatters:
      "Week 1 ends with something real. Not a tutorial project — a working MVP that demonstrates full-stack AI capability from prompt to deployed product.",
    tools: ["Claude API", "Vercel AI SDK", "Next.js", "Vercel", "Cursor"],
  },

  // ── WEEK 2: AGENTS, AUTOMATION, AND MCP (Days 8–14) ───────────────────────
  {
    day: 8, week: 2, level: 2, category: "Automation",
    title: "Agents 101 — Tools, Planning, and Execution Loops",
    summary:
      "Understand the anatomy of an AI agent: tools the model can call, a planning step, an execution loop, and a stopping condition. Build the simplest possible agent that actually does something useful — not a chatbot, a doer.",
    task:
      "Build a minimal agent using Claude with tool use. Give it 2 tools: a web search function and a file writer. Give it the task: \"Research X and save a 3-bullet summary to a file.\" Confirm it completes autonomously without you touching it.",
    whyItMatters:
      "Agents are the defining capability of AI in 2026. Understanding the architecture at the code level means you can build and debug them — not just prompt them.",
    tools: ["Claude API", "Anthropic SDK", "Python", "Cursor"],
  },
  {
    day: 9, week: 2, level: 2, category: "Automation",
    title: "Tool Use — Give Claude Hands",
    summary:
      "Design and implement custom tool functions that Claude can call: calculators, API callers, file system access, database queries, and web scrapers. Master the tool-calling pattern that works with any model.",
    task:
      "Build 3 custom tools: (1) a calculator, (2) a Firecrawl web fetcher, (3) a CSV reader. Test Claude calling all 3 in a single conversation to answer a research question that requires all three tools.",
    whyItMatters:
      "Tool use is what turns an LLM into a capable system. Every agent, every automation, every AI product that does real-world actions runs on this pattern.",
    tools: ["Claude API", "Anthropic SDK", "Firecrawl", "Python", "Cursor"],
  },
  {
    day: 10, week: 2, level: 2, category: "Claude Code",
    title: "Cursor Rules — Encoding Your Architecture into Every Suggestion",
    summary:
      "Cursor Rules (`.cursor/rules` or project rules files) let you encode your stack, conventions, and constraints directly into your AI IDE. Every suggestion Cursor makes will respect your architecture — your coding standards, file patterns, naming conventions, and forbidden patterns. This is intent-oriented programming at the project level.",
    task:
      "Write a Cursor Rules file for your current project. Include: stack (e.g. Next.js + FastAPI + Claude), naming conventions, import style, error handling patterns, and 3 things Claude should never do (e.g. never hardcode keys, never use `any` type). Observe how Cursor's suggestions change immediately.",
    whyItMatters:
      "Cursor Rules are one of the highest-leverage things a serious vibe coder can set up. You write the rules once and every AI suggestion in your project respects them — it's like onboarding a developer who never forgets your standards.",
    tools: ["Cursor", "Claude Code", "VS Code"],
  },
  {
    day: 11, week: 2, level: 2, category: "AI Integration",
    title: "MCP — Model Context Protocol in Practice",
    summary:
      "Connect Claude to MCP servers for persistent memory, external tool access, and context augmentation. Understand what MCP is, why it became the standard, and how to build and connect a custom MCP server that extends Claude's capabilities.",
    task:
      "Connect Claude to 2 MCP servers: one for file system access and one of your choice from the MCP registry. Then build a simple custom MCP server that exposes one useful tool — a database query, an API wrapper, or a file processor.",
    whyItMatters:
      "MCP is the standard protocol for AI-tool connectivity in 2026. Building with it now puts you ahead of developers who are still wiring tools manually. It's how Claude connects to the world.",
    tools: ["Claude", "MCP SDK", "Python", "Cursor"],
  },
  {
    day: 12, week: 2, level: 2, category: "Automation",
    title: "Multi-Step Pipelines — Chains of Specialized Agents",
    summary:
      "Design multi-agent pipelines where specialised agents hand off tasks: a researcher, a writer, and a reviewer working in sequence. Understand orchestration, state passing, and failure recovery at each handoff.",
    task:
      "Build a 3-agent pipeline: Agent 1 researches a topic via Firecrawl. Agent 2 writes a structured summary. Agent 3 reviews and scores it 1–5 with specific feedback. Output is a final document with a quality score.",
    whyItMatters:
      "Single agents are powerful. Pipelines of specialised agents are transformative. This pattern is how production AI systems at scale actually work in 2026.",
    tools: ["Claude API", "Firecrawl", "Python", "Cursor"],
  },
  {
    day: 13, week: 2, level: 2, category: "Automation",
    title: "Error Handling in Production AI Systems",
    summary:
      "Design robust error handling for AI-powered automations: retries with exponential backoff, fallback models, output validation, and graceful degradation when the model fails, refuses, or returns malformed output.",
    task:
      "Take your Day 12 pipeline. Add: (1) retry logic with 3 attempts, (2) Pydantic output schema validation that rejects malformed responses, (3) a fallback that returns a partial result if any agent fails. Deliberately break each agent and confirm the fallbacks work.",
    whyItMatters:
      "AI systems fail in ways traditional software doesn't — hallucinations, refusals, malformed JSON, rate limits. Production-grade error handling is the line between a demo and a deployable system.",
    tools: ["Claude API", "Python", "Pydantic", "Cursor"],
  },
  {
    day: 14, week: 2, level: 2, category: "Automation", isMiniProject: true,
    title: "Mini-Project — A Working Agent That Solves a Real Problem",
    summary:
      "Build and deploy an autonomous agent that solves one real-world problem from start to finish — research to output — with no human in the loop after the trigger.",
    task:
      "Define one repeating task in your life or work. Build an agent that completes it autonomously on a schedule. It must run 3 consecutive times successfully with no manual intervention.",
    whyItMatters:
      "A running agent is your most impressive portfolio piece from the Composer track. It's proof of capability that no portfolio PDF or tutorial screenshot can match.",
    tools: ["Claude API", "Python", "GitHub Actions", "Cursor"],
  },

  // ── WEEK 3: SHIP TO PRODUCTION (Days 15–21) ────────────────────────────────
  {
    day: 15, week: 3, level: 2, category: "Deploy",
    title: "Deployment — Vercel, Railway, and Fly.io",
    summary:
      "Deploy your AI app to the public internet. Cover environment variable management in production, HTTPS, domain setup, and the CI/CD pipeline that gets your app live in under 30 minutes from a `git push`.",
    task:
      "Deploy your Day 7 MVP to Vercel (frontend) and Railway (backend). Set all secrets via environment variables. Share the live URL. Confirm it works for someone who has never seen the code.",
    whyItMatters:
      "An app that runs locally is a prototype. An app on the public internet is a product. This step is where your work becomes real.",
    tools: ["Vercel", "Railway", "Fly.io", "Cursor", "GitHub"],
  },
  {
    day: 16, week: 3, level: 2, category: "Deploy",
    title: "Authentication — Protecting Your AI App",
    summary:
      "Add user authentication to your AI app using Clerk. Protect API endpoints, associate usage with users, and prevent anyone from burning your Claude API budget anonymously.",
    task:
      "Add Clerk authentication to your app. Users must sign in to use it. All Claude API calls are only allowed for authenticated sessions. Test that unauthenticated requests are rejected with a clear error.",
    whyItMatters:
      "An AI app without auth burns your API budget on anyone who finds the URL. Auth is the first step from toy to product — and it takes less than an hour with Clerk.",
    tools: ["Clerk", "Next.js", "FastAPI", "Cursor"],
  },
  {
    day: 17, week: 3, level: 2, category: "Deploy",
    title: "Rate Limiting and Usage Tracking",
    summary:
      "Add rate limiting to prevent abuse, track token usage per user, and build a usage dashboard that shows you exactly what your app is doing and what it's costing — in real time.",
    task:
      "Add rate limiting (10 requests/hour per user) to your API. Log each request: user ID, token count, model, and timestamp to a database. Build a 5-row summary table showing top users and estimated cost.",
    whyItMatters:
      "AI API costs are real and can spike without warning. Usage tracking is how you run a profitable AI product instead of an expensive hobby project.",
    tools: ["Redis", "Supabase", "FastAPI", "Python", "Cursor"],
  },
  {
    day: 18, week: 3, level: 2, category: "AI Integration",
    title: "Evals — Testing That Your AI Actually Works",
    summary:
      "Build an evaluation framework for your AI app: define a test set of inputs and expected outputs, run automated evals, and measure quality score across model versions and prompt changes.",
    task:
      "Write 10 test cases for your AI app (input + expected output). Build a script that runs all 10 and scores each response (pass/fail or 1–5). Run it before and after a prompt change. Document what moved.",
    whyItMatters:
      "Without evals, every prompt change is a guess. With evals, every change is measured. This is how professional AI teams ship with confidence — and how you catch regressions before your users do.",
    tools: ["Claude API", "Python", "Braintrust", "Cursor"],
  },
  {
    day: 19, week: 3, level: 2, category: "Claude Code",
    title: "Computer Use — Browser Automation for Tasks No API Can Reach",
    summary:
      "Use Anthropic's computer use API or Browserbase to automate tasks that have no API: logging into portals, filling forms, downloading reports, navigating legacy interfaces. This is the automation frontier in 2026.",
    task:
      "Build a computer use script that opens a browser, navigates to a public website, extracts specific data from a page, and saves it to a file. Use Browserbase or the Anthropic computer use API. Confirm it runs headlessly.",
    whyItMatters:
      "Most enterprise software has no API. Computer use unlocks automation for everything that doesn't — legacy CRMs, government portals, internal dashboards, anything a human can see. This is a rare and commercially valuable skill.",
    tools: ["Anthropic Computer Use API", "Browserbase", "Python", "Cursor"],
  },
  {
    day: 20, week: 3, level: 2, category: "Deploy",
    title: "Logging, Monitoring, and Debugging Live AI Systems",
    summary:
      "Instrument your AI app with structured logging, error alerting, and response monitoring. Know when your app is failing, why it's failing, and which requests are producing bad outputs — before your users tell you.",
    task:
      "Add structured logging to your app: every AI request and response with timestamp, user, model, tokens, and a quality flag. Set up a simple alert that fires when error rate exceeds 5% in 1 hour.",
    whyItMatters:
      "Production AI systems fail silently. Logging and monitoring is the difference between finding out about problems from your users and finding out before they do.",
    tools: ["Logfire", "Sentry", "Python logging", "Railway", "Cursor"],
  },
  {
    day: 21, week: 3, level: 2, category: "Deploy", isMiniProject: true,
    title: "Mini-Project — Fully Deployed, Auth-Protected AI App",
    summary:
      "Polish and finalise your deployed app: auth working, rate limiting in place, evals green, logs flowing. This is production-ready by any reasonable definition.",
    task:
      "Deploy a complete AI app with all production requirements: authentication, rate limiting, eval suite, structured logging, and CI/CD. Share the live URL and confirm 3 people can use it without your help.",
    whyItMatters:
      "Production-ready is a bar, not a feeling. This mini-project is the moment your app earns that label — and your portfolio earns a live link.",
    tools: ["Vercel", "Railway", "Clerk", "GitHub Actions", "Cursor"],
  },

  // ── WEEK 4: PRODUCT THINKING AND CAPSTONE (Days 22–28) ─────────────────────
  {
    day: 22, week: 4, level: 2, category: "Product",
    title: "Prompt Architecture — Designing for Scale and Quality",
    summary:
      "Design a production prompt architecture: separate system prompts per user role, dynamic context injection, few-shot examples, and Pydantic output validation schemas. The craft that keeps AI quality consistent as your product scales.",
    task:
      "Redesign your app's prompt system. Create 3 role-specific system prompts, add 2 few-shot examples per prompt, define a Pydantic output schema that validates every response. Run your eval suite against the new architecture.",
    whyItMatters:
      "A prompt that works in a demo sometimes fails at scale. A prompt architecture that works at scale is a product asset — and a rare skill even among experienced developers in 2026.",
    tools: ["Claude API", "Pydantic", "Python", "Cursor"],
  },
  {
    day: 23, week: 4, level: 2, category: "Product",
    title: "Using Bolt.new, v0, and Lovable for Rapid Product Iteration",
    summary:
      "Generate production-quality full apps and UI components from plain-English descriptions using Bolt.new (full-stack apps), v0 (React components), and Lovable (Supabase-integrated products). In 2026, UI iteration is measured in minutes.",
    task:
      "Take your current app's weakest UI screen. Regenerate it from scratch using v0 or Bolt.new with a single prompt. Integrate it. Deploy it. Time yourself: from idea to deployed improvement in under 45 minutes.",
    whyItMatters:
      "In 2026, UI is no longer a bottleneck. The constraint is imagination and product judgment. These tools remove the last technical barrier between idea and shipped feature — permanently.",
    tools: ["Bolt.new", "v0", "Lovable", "Next.js", "Cursor", "Vercel"],
  },
  {
    day: 24, week: 4, level: 2, category: "Deploy",
    title: "CI/CD — Ship When You Push",
    summary:
      "Set up a CI/CD pipeline so your app automatically tests and deploys when you push to main. This is how professional teams work — and it works equally well for vibe-coded apps.",
    task:
      "Create a GitHub Actions workflow that: runs your eval suite on every PR, blocks merge if evals fail, and auto-deploys to Railway on push to main. Test by pushing a breaking change and confirming it's caught.",
    whyItMatters:
      "Manual deployment is slow and error-prone. CI/CD means every push is tested and shipped automatically — the last step from hobbyist to professional.",
    tools: ["GitHub Actions", "Railway", "Vercel", "Python", "Cursor"],
  },
  {
    day: 25, week: 4, level: 2, category: "Product",
    title: "Productising Your Vibe-Coded Tool — Pricing and Positioning",
    summary:
      "Turn your AI tool into something others will pay for: define the user, the value proposition, the pricing model, and the landing page. Understand how AI tools are being packaged and sold in 2026.",
    task:
      "Write a one-page product brief: target user, core value proposition, pricing model (freemium/subscription/one-time), and 3-sentence landing page headline + subhead. Show it to one potential user and get honest feedback.",
    whyItMatters:
      "Every skill in this course has monetary value. Productising your work is how you turn 28 days of learning into income — consulting, SaaS, or the first product in your own company.",
    tools: ["Claude", "Notion", "Carrd", "Framer"],
  },
  {
    day: 26, week: 4, level: 2, category: "Strategy",
    title: "Writing a Technical Spec for an AI Build",
    summary:
      "Write the technical specification for an AI product: user problem, solution architecture, data flow, prompt design, eval criteria, and launch requirements. The document that aligns teams and survives scope creep.",
    task:
      "Write a 2-page technical spec for a new AI product idea. Must include: problem statement, architecture diagram, prompt design summary, eval criteria, and 3 launch requirements. Use Claude to critique it.",
    whyItMatters:
      "The gap between a prototype and a fundable product is usually a well-written spec. This document is how you communicate ideas to teammates, investors, and future-you.",
    tools: ["Claude", "Google Docs", "Miro"],
  },
  {
    day: 27, week: 4, level: 2, category: "Product",
    title: "Portfolio Assembly — Three Projects, One Story",
    summary:
      "Assemble your Level 2 portfolio: 3 shipped projects with live links, technical write-ups, and demo recordings. Build the GitHub profile and Notion portfolio page that tells your story in under 60 seconds.",
    task:
      "Finalise 3 projects: live URL, 2-minute Loom demo, and a 3-sentence technical write-up for each. Publish to GitHub with READMEs. Share the portfolio link with your cohort and get feedback.",
    whyItMatters:
      "Three working AI products with live links are more powerful than any resume, certification, or bootcamp credential. Portfolios close opportunities.",
    tools: ["GitHub", "Loom", "Notion", "Framer", "Cursor"],
  },
  {
    day: 28, week: 4, level: 2, category: "Strategy", isMiniProject: true,
    title: "Final Capstone — Ship Something Real",
    summary:
      "Build and ship your capstone: a complete, deployed AI product that solves a real problem for real users. Combines full-stack architecture, agent or RAG design, production deployment, and product positioning.",
    task:
      "Ship a complete AI product: (1) real problem solved, (2) live URL, (3) at least 3 people who have used it, (4) eval suite with >80% pass rate, (5) 5-minute recorded demo, (6) one-page product brief. Present to your cohort.",
    whyItMatters:
      "This capstone is the line between someone who learned about AI and someone who builds with it. The product you ship today is the first entry in a body of work that compounds for the rest of your career.",
    tools: ["Claude API", "Vercel AI SDK", "Vercel", "Railway", "GitHub Actions", "Claude Code", "Loom"],
  },
];

// Backwards-compat default
export const curriculum = curriculumL1;

// ─────────────────────────────────────────────
// SYSTEMS SUMMARY
// ─────────────────────────────────────────────

export const systemsSummaryL1 = [
  { week:1, title:"The Vibe Coding Mindset", systems:["3-part prompt structure: Goal / Constraints / Format","Debugging loop: paste error → get fix → understand → iterate","Cursor or Bolt.new sandbox — working, AI-native, first session done","First working automation: tested, documented, saved","Week 1 prompt library: 5+ reusable patterns saved to reference guide"] },
  { week:2, title:"Building Real Things", systems:["PDF and CSV extraction SOP using pdfplumber + pandas","Firecrawl scraping pattern: plain-English data extraction, no selectors","FastAPI local server with one working endpoint","External API integration pattern: weather, news, or finance data","GitHub Actions scheduled cron job running autonomously twice"] },
  { week:3, title:"Making It Yours", systems:["Streamlit or v0 UI wrapper pattern: any script → shareable app","SQLite persistence pattern: store → retrieve → summarise","`.env` security standard applied to all scripts + .gitignore confirmed","Refactoring SOP: from messy generated code to clean named functions","Personal dashboard: 2+ data sources, live, all AI-generated"] },
  { week:4, title:"Ship It — Portfolio and Graduation", systems:["File I/O pipeline: read → filter → write → summarise","CLI argument pattern: argparse for reusable, shareable scripts","Project folder structure with README for every script, pushed to GitHub","Non-technical run guide: tested by a real non-coder, all confusion fixed","Level 1 portfolio: 3 scripts, requirements.txt, README, Loom demo"] },
];

export const systemsSummaryL2 = [
  { week:1, title:"Full-Stack AI App Architecture", systems:["Claude Code workflow: multi-file agentic tasks running to completion","Vercel AI SDK streaming chat: Next.js + Claude, live URL","System prompt library: 3 roles, tested against 5 edge cases each","RAG pipeline: chunk → embed → store → retrieve → respond","Context management: 10-message sliding window + compression"] },
  { week:2, title:"Agents, Automation, and MCP", systems:["Minimal agent: 2+ tools, runs to completion without intervention","Cursor Rules file encoding stack + conventions into every suggestion","MCP server connection + custom MCP server with 1 tool","3-agent pipeline: Firecrawl researcher → writer → scored reviewer","Production error handling: retries + Pydantic validation + fallback"] },
  { week:3, title:"Ship to Production", systems:["Deployed app: Vercel frontend + Railway backend, live URL","Clerk authentication protecting all Claude API endpoints","Rate limiting (per-user) + usage log (user / tokens / cost)","Computer use script: headless browser automation, no API required","Eval suite: 10 test cases, automated scoring, CI-gated on every PR"] },
  { week:4, title:"Product Thinking and Capstone", systems:["Production prompt architecture: role prompts + few-shot + Pydantic schema","Bolt.new or v0 UI regenerated and deployed in under 45 minutes","CI/CD pipeline: auto-test on PR, auto-deploy on merge to main","Personal positioning statement: what you build, for whom, next 3 steps","Level 2 portfolio: 3 live projects, Loom demos, technical write-ups"] },
];

export const systemsSummary = systemsSummaryL1;

// ─────────────────────────────────────────────
// STARTER TOOLKIT (combined)
// ─────────────────────────────────────────────

export const starterToolkit: ToolkitItem[] = [
  { name:"Claude", url:"https://claude.ai", category:"AI Assistant", desc:"Primary AI partner for code generation, debugging, architecture design, and prompt engineering. Claude Sonnet 4 is the recommended model for vibe coding in 2026 — best balance of speed, quality, and cost." },
  { name:"Claude Code", url:"https://docs.anthropic.com/claude-code", category:"Agentic IDE", desc:"Anthropic's agentic coding CLI and VS Code/JetBrains extension. Claude Code reads your entire codebase, makes multi-file changes, runs tests, and fixes its own errors. The most powerful vibe coding environment for Composer track students." },
  { name:"Cursor", url:"https://cursor.sh", category:"IDE", desc:"The leading AI-native code editor in 2026. Vibe coding's default home base for Level 1. Autocomplete, inline chat, Cursor Rules, and multi-file edit powered by Claude and GPT-4o. Highly recommended." },
  { name:"Bolt.new", url:"https://bolt.new", category:"App Builder", desc:"Build full-stack apps from a single sentence prompt — React, Node, databases, all wired up and running in the browser instantly. No install, zero config. The fastest way to go from idea to working app in 2026." },
  { name:"v0", url:"https://v0.dev", category:"UI Generation", desc:"Vercel's AI UI generator. Describe a component or page in plain English and get production-quality React/Tailwind code instantly. The standard for rapid UI generation in 2026." },
  { name:"Lovable", url:"https://lovable.dev", category:"App Builder", desc:"Full-app AI builder with native Supabase and Stripe integration. Best for quickly prototyping product ideas with a database backend, without touching any infrastructure config." },
  { name:"Firecrawl", url:"https://firecrawl.dev", category:"Data", desc:"Scrape any public website in plain English — no selectors, no XPath, no browser inspection. Describe what you want, get structured data back. The 2026 standard for web data extraction." },
  { name:"Vercel AI SDK", url:"https://sdk.vercel.ai", category:"AI Framework", desc:"The standard for streaming AI responses in Next.js apps. Handles streaming, tool calls, multi-step generation, and provider switching with a single unified API. Essential for Level 2 web product builders." },
  { name:"ChatGPT / GPT-4o", url:"https://chat.openai.com", category:"AI Assistant", desc:"Strong alternative for code generation. Useful for comparing approaches and second opinions. Note: geo-blocked in some regions — use Claude or Gemini instead." },
  { name:"Perplexity AI", url:"https://perplexity.ai", category:"AI Research", desc:"AI research with real-time source citations. Best for looking up libraries, APIs, and finding documentation fast. Saves hours of search time." },
  { name:"GitHub Actions", url:"https://github.com/features/actions", category:"Automation", desc:"Free CI/CD and cron scheduling. Run scripts on a schedule, auto-test on every push, auto-deploy to production. The backbone of every automated pipeline in this course." },
  { name:"Railway", url:"https://railway.app", category:"Deployment", desc:"The easiest way to deploy Python backends, FastAPI apps, and scheduled jobs. Connects directly to GitHub for auto-deploy. Recommended backend deployment platform." },
  { name:"Vercel", url:"https://vercel.com", category:"Deployment", desc:"Best-in-class frontend deployment for Next.js and React apps. Auto-deploys from GitHub on every push. The standard platform for AI product frontends in 2026." },
  { name:"Streamlit", url:"https://streamlit.io", category:"UI", desc:"Turn any Python script into a shareable web app in minutes. No frontend knowledge required. The fastest UI layer for Level 1 automations and data tools." },
  { name:"Browserbase", url:"https://browserbase.com", category:"Browser Automation", desc:"Cloud browser automation platform for computer use and headless scraping. Run browser sessions in the cloud — no local Chrome, no infrastructure setup. Works with Anthropic's computer use API." },
  { name:"ChromaDB", url:"https://trychroma.com", category:"Vector Store", desc:"Open-source vector database for RAG pipelines. Store embeddings locally or in the cloud. The easiest way to add semantic search to any AI app." },
  { name:"Clerk", url:"https://clerk.com", category:"Auth", desc:"Drop-in authentication for Next.js and React. Add sign-in, sign-up, and user management to your AI app in under an hour. The standard for AI product auth in 2026." },
  { name:"Notion", url:"https://notion.so", category:"Productivity", desc:"Build your prompt library, document your scripts, and maintain your vibe coding reference guide. Essential personal knowledge system." },
  { name:"Loom", url:"https://loom.com", category:"Productivity", desc:"Record 2-minute screen demos for every portfolio project. The fastest way to show what you built without writing a word." },
];

// ─────────────────────────────────────────────
// PORTFOLIO TARGETS
// ─────────────────────────────────────────────

export const portfolioTargets: PortfolioTarget[] = [
  // Level 1
  { title:"Working Automation #1", week:1, level:1, desc:"A working Python script that solves a real problem — file organiser, data cleaner, or text summariser. Tested, documented, and saved with a prompt chain." },
  { title:"Internal Team Tool", week:2, level:1, desc:"A practical tool built for a real colleague — report generator, data cleaner, or link checker — with a one-paragraph README and one real user who tested it." },
  { title:"Personal Dashboard", week:3, level:1, desc:"A Streamlit or v0 dashboard pulling from 2+ data sources with a chart, live data feed, and one custom metric. Entirely AI-generated." },
  { title:"Level 1 Automation Suite", week:4, level:1, desc:"3 working scripts with a requirements.txt, full README, and a 2-minute Loom demo recording. Your complete Level 1 portfolio, pushed to GitHub." },
  // Level 2
  { title:"AI-Powered MVP", week:1, level:2, desc:"A working, deployed AI product with a system prompt, Vercel AI SDK streaming integration, and a live URL. Usable by someone who wasn't in the room." },
  { title:"Autonomous Agent", week:2, level:2, desc:"A deployed agent that runs on a schedule, completes a multi-step task with no human input, and has run 3 consecutive times successfully." },
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
    tier: 1, level: 1,
    name: "Script Automation Build",
    description: "A custom Python script that automates one specific repetitive task — file processing, data extraction, report generation, or scheduled alerts.",
    price: "$150–400",
    examples: [
      "File organiser, renamer, or deduplicator",
      "PDF or CSV data extractor with Firecrawl",
      "Scheduled report or digest email via GitHub Actions",
      "Simple API integration pulling data to a spreadsheet",
    ],
  },
  {
    tier: 2, level: 1,
    name: "Internal Tool with UI",
    description: "A web-based internal tool built with Streamlit or a v0-generated interface — a script wrapped in a clickable UI that any non-technical colleague can use.",
    price: "$300–700",
    examples: [
      "Data cleaner with upload and download",
      "Report generator from a template",
      "Text summariser or document Q&A tool",
      "Simple dashboard for a specific dataset",
    ],
  },
  {
    tier: 3, level: 1,
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
    tier: 4, level: 1,
    name: "Prompt Library Build",
    description: "A custom prompt library for a specific team or use case — 15+ tested prompts across core workflows with a usage guide and worked examples.",
    price: "$400–800",
    examples: [
      "15+ prompts organised by workflow type",
      "Tested against real inputs with example outputs",
      "Usage guide written for non-technical staff",
      "One 60-minute walkthrough session included",
    ],
  },

  // ── Level 2 Services ──────────────────────────────────────────────────────
  {
    tier: 5, level: 2,
    name: "AI-Powered MVP Build",
    description: "A production-ready AI-powered application — full-stack, deployed, with authentication and a real user-facing UI. Built with Vercel AI SDK + Claude. Solves one well-defined problem.",
    price: "$1,500–4,000",
    examples: [
      "Document Q&A tool with RAG backend and streaming UI",
      "AI-assisted workflow tool deployed to Vercel + Railway",
      "Internal AI assistant for a specific team function",
      "Auth-protected app with Clerk and usage tracking",
    ],
  },
  {
    tier: 6, level: 2,
    name: "Autonomous Agent Build",
    description: "Design and deployment of an autonomous AI agent that completes a multi-step task on a schedule — research, data processing, report generation, or monitoring.",
    price: "$2,000–5,000",
    examples: [
      "Daily research agent that summarises and emails a digest",
      "Data monitoring agent with anomaly alerting",
      "Automated report generation from live data sources",
      "Multi-step pipeline with Pydantic validation and fallback handling",
    ],
  },
  {
    tier: 7, level: 2,
    name: "AI Integration Into Existing Product",
    description: "Integration of Claude into an existing product or workflow — adding AI features without rebuilding from scratch. Includes Vercel AI SDK streaming, system prompt design, and eval setup.",
    price: "$2,500–6,000",
    examples: [
      "Streaming AI feature added to an existing Next.js product",
      "Document analysis layer added to existing tool",
      "Prompt architecture design + Vercel AI SDK integration",
      "Eval suite and monitoring setup for existing AI features",
    ],
  },
  {
    tier: 8, level: 2,
    name: "AI Product Build — SaaS-Ready",
    description: "A complete, commercially deployable AI product — built with Claude Code, tested, and packaged for launch. Includes architecture design, production deployment, eval framework, and product brief.",
    price: "$5,000–15,000",
    examples: [
      "Full-stack AI SaaS with Clerk auth, rate limiting, and billing",
      "Eval suite ensuring production quality at scale",
      "CI/CD pipeline for ongoing development via GitHub Actions",
      "Technical spec and product brief for investor or team use",
    ],
  },
  {
    tier: 9, level: "both",
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
  { metric:"Time to Working Code", why:"Measure time from problem description to working, tested script. This is your personal productivity curve — watch it drop week over week." },
  { metric:"Bug Resolution Speed", why:"Track how quickly you resolve errors — from paste-to-Claude to confirmed fix. Faster resolution means better debugging instincts, not just better prompts." },
  { metric:"Prompt Library Size", why:"Count your saved, reusable prompts. Each one is a problem you've systematised. Target 10 by Day 14, 25+ by Day 28." },
  { metric:"Projects Shipped", why:"Count projects that are running, tested, and usable by someone other than you. Shipped beats polished. Aim for 1 per week minimum." },
  { metric:"Portfolio Live Links", why:"Count public-facing deployed projects with live URLs. These are your most powerful credential — more than any certification or course completion." },
  { metric:"Cursor Rules Coverage", why:"(Level 2) Count the rules in your .cursor/rules file. A well-written rules file with 10+ entries means every AI suggestion respects your architecture automatically." },
  { metric:"Eval Pass Rate", why:"(Level 2) Track the pass rate of your automated eval suite. Target 80%+ before shipping any prompt change to production." },
];