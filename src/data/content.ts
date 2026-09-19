export const profile = {
  name: "Chandan Pandey",
  role: "All-Rounder in Java, C++, part-time Python, SQL, AI tools",
  debut: "Methodist High School, Kanpur",
  homeGround: "Manipal University Jaipur",
  innings: "B.Tech CSE (IoT & Intelligent Systems) — 5th Semester",
  status: "🟢 Match-Fit // Available for SDE & AI Internships",
  bio: "Taking guard at the 22-yard crease of computer science. When the pitch offers green-top seam movement, I bowl tight 140+ km/h spells in C++ and Java—managing raw memory, locking down race conditions, and designing cache eviction heuristics under heavy load. When stepping out to bat, I punch through covers with clean Next.js architectures, Zod-guarded pipelines, and applied AI models. Whether it is grinding out 50+ high-pressure algorithmic spells or reviewing code with Hawk-Eye precision, I play every delivery on merit.",
};

export const skills = {
  paceAttack: ["Java", "C++", "Python", "TypeScript", "SQL"],
  strokeplay: ["Next.js", "Applied AI (LLMs/Embeddings)", "Data Structures & Algorithms"],
  hawkEye: [],
};

export const cricketCSFundamentals = [
  {
    title: "Networks (Field Placements & Transport)",
    badge: "THE BASICS",
    badgeColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    hoverBorder: "hover:border-[#F59E0B]/40",
    points: [
      "TCP 3-way handshakes, sockets, DNS resolution, and HTTP/WebSocket bidirectional pipelines."
    ]
  },
  {
    title: "Databases (Scorebook Integrity)",
    badge: "THE SCOREBOOK",
    badgeColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    hoverBorder: "hover:border-[#10B981]/40",
    points: [
      "3NF relational normalization, SQL schemas, B-Tree index lookups, and ACID compliance under concurrent score updates."
    ]
  },
  {
    title: "Operating Systems (The Dugout Runtime)",
    badge: "THE DUGOUT",
    badgeColor: "text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20",
    hoverBorder: "hover:border-[#06B6D4]/40",
    points: [
      "Process scheduling, POSIX threads, mutexes, race conditions, and virtual memory paging."
    ]
  }
];

export const cricketAlgorithmicRigor = [
  {
    tier: "Powerplay (Easy)",
    tag: "OVERS 01–06",
    tagColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    hoverBorder: "hover:border-[#10B981]/40",
    title: "Defensive discipline",
    topics: "Two-pointer reversals, prefix sums, and boundary handling."
  },
  {
    tier: "Middle Overs (Medium)",
    tag: "OVERS 07–15",
    tagColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    hoverBorder: "hover:border-[#F59E0B]/40",
    title: "Rotating the strike",
    topics: "Sliding windows, monotonic stacks/queues (Next Greater Element), binary search over monotonic predicates, and tree BFS/DFS."
  },
  {
    tier: "Death Overs (Hard)",
    tag: "OVERS 16–20",
    tagColor: "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20",
    hoverBorder: "hover:border-[#EF4444]/40",
    title: "Pressure execution",
    topics: "Dynamic programming state transitions and complex pointer manipulations."
  }
];

export const projects = [
  {
    slug: "career-copilot",
    title: "Career Co-Pilot — Real-Time ATS Intelligence Engine",
    tag: "Applied AI / Hawk-Eye Document Analyst",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Zod", "AI SDK / Vector Embeddings"],
    description: "An automated preparation platform designed to parse arbitrary PDF resumes and cross-examine them against live job descriptions.",
    points: [
      "Token extraction mapped to strict Zod schemas to eliminate LLM hallucinations.",
      "Hybrid scoring system combining deterministic token extraction with contextual vector embeddings.",
      "Generates targeted, weekly algorithmic and system-design study plans based on identified candidate gaps."
    ],
    links: [
      { label: "View Live Deployment", url: "#" },
      { label: "Inspect Code on GitHub", url: "#" }
    ]
  },
  {
    slug: "kv-store",
    title: "AetherKV — Key-Value Cache Eviction Research",
    tag: "Low-Level Systems & Concurrency Research",
    stack: ["C++", "POSIX Threads", "Cache Benchmarking"],
    description: "Undergraduate research exploring why classical LRU suffers from cache pollution during sudden bursts of one-off queries.",
    points: [
      "Testing dynamic frequency-recency queue heuristics (inspired by SIEVE) against standard LRU.",
      "Thread-safe read/write operations using striped mutexes to minimize lock contention under parallel access.",
      "Benchmarking hit-ratio recovery curves across skewed Zipfian access distributions."
    ],
    links: [
      { label: "View Implementation on GitHub", url: "#" },
      { label: "Read Research Notes", url: "#" }
    ]
  }
];
