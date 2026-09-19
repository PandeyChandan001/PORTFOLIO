export const profile = {
  name: "Chandan Pandey",
  role: "All-Rounder in Java, C++, part-time Python, SQL, AI tools",
  debut: "Methodist High School, Kanpur",
  homeGround: "Manipal University Jaipur",
  innings: "B.Tech CSE (IoT & Intelligent Systems) — 5th Semester",
  status: "🟢 Match-Fit // Available for Software Engineer Intern Roles",
  bio: "Taking guard at the 22-yard crease of computer science. When the pitch offers green-top seam movement, I bowl tight 140+ km/h spells in C++ and Java—managing raw memory, locking down race conditions, and designing cache eviction heuristics under heavy load. When stepping out to bat, I punch through covers with clean Next.js architectures, Zod-guarded pipelines, and applied AI models. Whether it is grinding out high-pressure algorithmic spells or reviewing code with Hawk-Eye precision, I play every delivery on merit.",
};

export const skills = {
  pillar1: {
    title: "Pillar 1: Core Foundations & Backend Engineering",
    items: [
      { name: "Java, OOP & Design Patterns", desc: "Writing modular, maintainable code leveraging SOLID principles, clean inheritance, and interface-driven design. Applying algorithmic data structures to minimize runtime and memory footprints." },
      { name: "REST APIs & Communication", desc: "Building stateless RESTful endpoints with clean resource routing, appropriate HTTP status codes, defensive input validation, and predictable JSON payloads." },
      { name: "Git & GitHub Discipline", desc: "Clean version control hygiene with atomic conventional commits, isolated feature branches, and structured code reviews." }
    ]
  },
  pillar2: {
    title: "Pillar 2: Systems, Relational Data & Networks",
    items: [
      { name: "SQL & DBMS Internals", desc: "Designing normalized schemas (3NF) to preserve data integrity. Writing complex multi-table joins, subqueries, and indexing strategies (B-Trees) to avoid table scans under ACID transaction constraints." },
      { name: "Operating Systems Basics", desc: "Concurrency mechanics, thread lifecycles, race conditions, synchronization primitives (mutexes, semaphores), and memory management (stack vs. heap, virtual memory paging)." },
      { name: "Computer Networks (L4–L7)", desc: "Transport protocols (reliable TCP 3-way handshakes and flow control vs. low-latency UDP), socket lifecycles, HTTP/1.1 vs. HTTP/2 multiplexing, WebSockets, and DNS resolution paths." }
    ]
  },
  pillar3: {
    title: "Pillar 3: Applied AI & Intelligent Systems Pipeline",
    items: [
      { name: "Python & Numeric Foundations", desc: "Scripting automation pipelines and manipulating multi-dimensional numeric data using Python and NumPy for preprocessing and vector operations." },
      { name: "LLM Integrations & Structured Prompting", desc: "Interfacing with LLM APIs (Gemini, OpenAI) using typed schema enforcement to guarantee deterministic, machine-readable responses." },
      { name: "Vector Embeddings, Vector DBs & RAG", desc: "Contextual retrieval architectures: token chunking, semantic embedding generation, vector indexing, and cosine similarity search to augment LLM prompts with verified factual context." },
      { name: "Evaluation & Guardrails", desc: "Implementing evaluation checks to measure contextual relevance, groundedness, and latency trade-offs across end-to-end AI workflows." }
    ]
  }
};

export const cricketCSFundamentals = [
  {
    title: "Networks (Field Placements & Transport)",
    badge: "THE BASICS",
    badgeColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    hoverBorder: "hover:border-[#F59E0B]/40",
    points: [
      "Socket lifecycles, TCP/UDP transport dynamics, DNS resolution, and HTTP/WebSocket bidirectional pipelines."
    ]
  },
  {
    title: "Databases (Scorebook Integrity)",
    badge: "THE SCOREBOOK",
    badgeColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    hoverBorder: "hover:border-[#10B981]/40",
    points: [
      "3NF normalization, SQL query optimization, B-Tree index lookups, and ACID compliance under concurrent updates."
    ]
  },
  {
    title: "Operating Systems (The Dugout Runtime)",
    badge: "THE DUGOUT",
    badgeColor: "text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20",
    hoverBorder: "hover:border-[#06B6D4]/40",
    points: [
      "Process scheduling, POSIX threads, mutexes, race conditions, and virtual memory management."
    ]
  }
];

export const cricketAlgorithmicRigor = [
  {
    tier: "Powerplay (Easy Problems — Defensive Footwork)",
    tag: "OVERS 01–06",
    tagColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    hoverBorder: "hover:border-[#10B981]/40",
    title: "Defensive discipline",
    topics: "Array reversals, two-pointer boundaries, prefix sums, and edge-case handling."
  },
  {
    tier: "Middle Overs (Medium Problems — Rotating the Strike)",
    tag: "OVERS 07–15",
    tagColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    hoverBorder: "hover:border-[#F59E0B]/40",
    title: "Rotating the strike",
    topics: "Sliding windows, monotonic stacks/queues (Next Greater Element), binary search over monotonic predicate spaces, and tree BFS/DFS traversals."
  },
  {
    tier: "Death Overs (Hard Problems — High-Pressure Execution)",
    tag: "OVERS 16–20",
    tagColor: "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20",
    hoverBorder: "hover:border-[#EF4444]/40",
    title: "Pressure execution",
    topics: "Dynamic programming state transitions, memoization, and complex pointer manipulations under tight space-time constraints."
  }
];

export const projects = [
  {
    slug: "career-copilot",
    title: "Career Co-Pilot — ATS Audit & Interview Preparation Engine",
    tag: "FLAGSHIP INNINGS 01 // HAWK-EYE ATS ANALYST",
    stack: ["Next.js 15 (App Router)", "TypeScript", "Tailwind CSS", "OpenRouter (DeepSeek)", "Prisma ORM", "PostgreSQL (Neon)", "Clerk Auth", "Zod"],
    description: "Engineered a full-stack ATS audit and career preparation platform executing real-time semantic gap analysis, role-specific readiness scoring, and structured interview roadmap generation between resumes and target job descriptions.",
    points: [
      "Architected a resilient AI orchestration pipeline utilizing DeepSeek models via OpenRouter, implementing custom prompt constraints, regex markdown sanitization, and Zod schema validation to completely eliminate JSON parsing exceptions.",
      "Decoupled LLM inference from persistence layers using isolated asynchronous transaction wrappers, guaranteeing sub-second client delivery even during database throttling.",
      "Built an interactive Next.js dashboard featuring dynamic ATS compatibility gauges, a missing keyword matrix with one-click contextual copy actions, a 3-week sprint remediation plan, and an automated STAR-method interview scenario simulator.",
      "Designed a native client-side PDF export engine with custom @media print styling, enabling single-click downloads of tailored preparation guides while stripping application navigation state."
    ],
    deepDive: {
      overview: "Career Co-Pilot is an end-to-end career enablement suite designed to eliminate the guesswork of ATS screening. Unlike typical wrapper tools that offer generic feedback, Career Co-Pilot performs deterministic keyword matching, semantic skill gap identification, and generates role-specific interview preparation kits using high-reasoning LLMs.",
      highlights: [
        {
          title: "Strict Type-Safe Schema Validation",
          desc: "Integrated Zod to strictly validate complex AI JSON responses (match scores, skill categorizations, action plans). Built fallback normalization routines that gracefully handle type coercions (e.g., stringified numerics) to prevent UI hydration or render-phase crashes."
        },
        {
          title: "Resilient Multi-Stage Pipeline",
          desc: "Engineered an asynchronous orchestration layer using an OpenAI-compatible interface via OpenRouter. Implemented defensive database save routines where database persistence failures fail silently in the background rather than blocking the real-time presentation of AI audit results to the user."
        },
        {
          title: "Jobscan-Style Gap Matrix & STAR Interview Simulator",
          desc: "Developed modular React UI components that categorize skills into actionable groups (hard skills, tools, required vs. preferred) and dynamically construct tailored STAR (Situation, Task, Action, Result) interview scripts tailored to the candidate's exact identified gaps."
        },
        {
          title: "Client-Side Export Pipeline",
          desc: "Engineered zero-overhead document export utilizing targeted CSS print media rules, providing instant, styled PDF report generation without introducing heavy server-side headless browser dependencies."
        }
      ]
    },
    links: [
      { label: "Live Demo", url: "#" },
      { label: "Source Code", url: "#" }
    ]
  },
  {
    slug: "kv-store",
    title: "Inning 02: AetherKV — Key-Value Cache Eviction Research",
    tag: "Systems Research & Concurrency Engine",
    stack: ["C++", "POSIX Threads", "Cache Benchmarking Tools"],
    description: "Undergrad systems research examining why traditional LRU caches suffer from cache pollution during sudden bursts of one-off queries.",
    points: [
      "Implements frequency-recency queue heuristics (inspired by the modern SIEVE algorithm) to preserve hot cache keys.",
      "Thread-safe read/write operations using striped mutexes to minimize lock contention across multi-threaded workloads.",
      "Benchmarked hit-ratio gains and tail latency against classical LRU across skewed Zipfian access traces."
    ],
    links: [
      { label: "View Implementation on GitHub", url: "#" },
      { label: "Read Research Notes", url: "#" }
    ]
  }
];
