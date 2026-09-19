export const profile = {
  name: "Chandan Pandey",
  positioning: "Systems & Full-Stack SDE (Low-Level Systems + Applied AI)",
  academic: "B.Tech in Computer Science & Engineering (Specialization: IoT & Information Security), 5th Semester",
  schooling: "Methodist High School, Kanpur",
  status: "Available for SDE / Systems / AI Roles",
  headline: "Engineering High-Throughput In-Memory Systems & Applied AI Engines.",
  bio: "5th-semester B.Tech CSE (IoT & IS) engineer focused on low-latency data structures, cache eviction research, and end-to-end intelligent developer tools.",
};

export const skills = {
  lowLevel: ["C++", "Java", "Concurrency", "POSIX Multi-threading", "Memory Profiling", "Cache Eviction"],
  fullStack: ["TypeScript", "Next.js (App Router)", "Tailwind CSS", "Node.js", "REST APIs", "WebSockets"],
  dataInt: ["Python", "SQL", "Schema Validation (Zod)", "Vector Similarity", "Embedding Pipelines"],
  coreCS: ["Data Structures & Algorithms", "Computer Networks (CCNA foundations)", "IoT & Information Security fundamentals"]
};

export const cricketCSFundamentals = [
  {
    title: "Computer Networks: Field Placements & Ball Flight",
    badge: "LAYER 4–7 TELEMETRY",
    badgeColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    hoverBorder: "hover:border-[#F59E0B]/40",
    concept: "Reliable communication lines between keeper, slips, and boundary.",
    points: [
      "Handshakes & Transport: TCP 3-way synchronization, flow control, and UDP low-latency spin.",
      "WebSockets & Streaming: Live ball-by-ball telemetry, HTTP/2 multiplexed commentary feeds, and DNS resolution.",
      "Subnetting & Network Topologies: Securing the inner ring and perimeter field boundaries."
    ]
  },
  {
    title: "SQL & DBMS: Scorebook & Invariant Ledger",
    badge: "ACID & SCOREBOOK INTEGRITY",
    badgeColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    hoverBorder: "hover:border-[#10B981]/40",
    concept: "Flawless record-keeping where no run is dropped and concurrency is strictly locked.",
    points: [
      "Relational Schema Normalization: 3NF scorebook design, player stat modeling, and strict foreign keys.",
      "Indexing & Execution Plans: B-Tree lookup for strike rates, eliminating full-table scans when querying run chases.",
      "Transaction Isolation: Handling concurrent score updates without race conditions or dirty reads."
    ]
  },
  {
    title: "Operating Systems: The Dugout & Pavilion Runtime",
    badge: "CONCURRENCY & ROTATION",
    badgeColor: "text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20",
    hoverBorder: "hover:border-[#06B6D4]/40",
    concept: "Thread scheduling and bowler rotation under strict pitch-clock constraints.",
    points: [
      "Multi-threading & Mutexes: Clean strike rotation, eliminating race conditions at the non-striker's end.",
      "Memory Management: Heap allocations, buffer paging, and fast dugout context switches.",
      "I/O Multiplexing: Handling simultaneous broadcast, camera, and Hawk-Eye tracking inputs."
    ]
  }
];

export const cricketAlgorithmicRigor = [
  {
    tier: "Powerplay (Easy)",
    tag: "OVERS 01–06 // SOLID DEFENSE",
    tagColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    hoverBorder: "hover:border-[#10B981]/40",
    title: "Crease Discipline & Basics",
    mindset: "Solid footwork, leaving the dangerous balls, and protecting the wickets.",
    topics: "Two-pointer array reversals, boundary checks, prefix run rates, and linear frequency maps."
  },
  {
    tier: "Middle Overs (Medium)",
    tag: "OVERS 07–15 // BUILDING THE CHASE",
    tagColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    hoverBorder: "hover:border-[#F59E0B]/40",
    title: "Strike Rotation & Pattern Mastery",
    mindset: "Piercing the gaps, controlling the required run rate, and maintaining state.",
    topics: "Monotonic stacks/queues (Next Greater Element / Peak Run Rates), Sliding Window strike-rate caps, Binary Search over required targets, and Heap top-k run-scorers."
  },
  {
    tier: "Death Overs (Hard)",
    tag: "OVERS 16–20 // HIGH-STAKE FINISH",
    tagColor: "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20",
    hoverBorder: "hover:border-[#EF4444]/40",
    title: "Boundary Execution & Dynamic Optimization",
    mindset: "Maximum calculation under high-pressure constraints; zero margin for error.",
    topics: "Dynamic Programming knapsacks (maximizing total score under over/ball limits), Graph state traversals, and non-trivial pointer manipulations."
  }
];

export const projects = [
  {
    slug: "kv-store",
    title: "High-Throughput In-Memory Key-Value Store with Adaptive Eviction",
    role: "Systems & Concurrency Research Project",
    stack: ["C++", "POSIX Threads", "Cache Benchmarking", "Memory Profiling"],
    architecture: "Implements modern SIEVE / dynamic frequency eviction queue to prevent cache pollution caused by transient batch reads under skewed access traces. Concurrency design using striped mutexes to eliminate head-of-line blocking under multi-threaded read/write workloads.",
    benchmarks: "Benchmarked against traditional LRU doubly linked lists across 100K+ synthetic keys, showing up to 15% hit-ratio improvement under high skew.",
    tradeoffs: "Striped mutexes provide excellent concurrent read throughput but can cause slight overhead during massive sequential writes compared to thread-local caching.",
    type: "systems"
  },
  {
    slug: "career-copilot",
    title: "Career Co-Pilot: Intelligent ATS Engine & Preparation Architect",
    role: "Full-Stack & Applied AI System",
    stack: ["TypeScript", "Next.js 15", "Tailwind CSS", "Zod", "Google Gemini API", "Vector Embeddings"],
    architecture: "Multi-stage pipeline: extracts raw PDF resume tokens and validates them against strict Zod schemas to eliminate hallucination. Hybrid scoring engine combines deterministic keyword matching with vector cosine similarity.",
    benchmarks: "Automated preparation architect generates targeted, multi-week algorithmic and technical study plans in under 3 seconds.",
    tradeoffs: "Relying on external LLM APIs introduces latency spikes, mitigated by optimistic UI updates and heavy prompt caching.",
    type: "ai"
  }
];
