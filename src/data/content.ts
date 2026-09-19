export const profile = {
  name: "Chandan Pandey",
  role: "All-Rounder (C++ Systems & Full-Stack AI)",
  debut: "Methodist High School, Kanpur",
  innings: "5th Sem B.Tech CSE (IoT & IS)",
  status: "🟢 Active at the crease // Available for SDE Internships",
  headline: "Hey, I'm Chandan. I break down systems, build practical web tools, and solve data structures.",
  bio: "Most days you'll find me analyzing cache eviction behavior in C++, shipping full-stack tools with Next.js & TypeScript, or working through core algorithmic patterns. When I'm not coding, I'm analyzing matches on the 22 yards.",
};

export const skills = {
  paceAttack: ["C++", "Java", "Multi-threading", "Memory Profiling"],
  strokeplay: ["TypeScript", "Next.js", "Node.js", "Tailwind CSS", "REST APIs"],
  hawkEye: ["Python", "SQL", "Schema Validation (Zod)", "Embedding Pipelines"],
};

export const cricketCSFundamentals = [
  {
    title: "Networks (Field Placements & Telemetry)",
    badge: "THE BASICS",
    badgeColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    hoverBorder: "hover:border-[#F59E0B]/40",
    points: [
      "TCP 3-way handshakes, sockets, DNS resolution, and HTTP/WebSocket transport dynamics."
    ]
  },
  {
    title: "Databases (The Scorebook & Integrity)",
    badge: "THE SCOREBOOK",
    badgeColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    hoverBorder: "hover:border-[#10B981]/40",
    points: [
      "3NF relational normalization, SQL schemas, B-Tree index lookups, and ACID compliance under concurrent updates."
    ]
  },
  {
    title: "Operating Systems (The Dugout Runtime)",
    badge: "THE DUGOUT",
    badgeColor: "text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20",
    hoverBorder: "hover:border-[#06B6D4]/40",
    points: [
      "Process scheduling, threads vs. processes, mutex locks, race conditions, and virtual memory paging."
    ]
  }
];

export const cricketAlgorithmicRigor = [
  {
    tier: "Powerplay (Easy)",
    tag: "OVERS 01–06",
    tagColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    hoverBorder: "hover:border-[#10B981]/40",
    title: "Solid defensive footwork",
    topics: "Array reversals, two-pointers, prefix sums, and boundary handling."
  },
  {
    tier: "Middle Overs (Medium)",
    tag: "OVERS 07–15",
    tagColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    hoverBorder: "hover:border-[#F59E0B]/40",
    title: "Rotating the strike",
    topics: "Sliding windows, monotonic queues/stacks (Next Greater Element), binary search over monotonic answer spaces, and tree BFS/DFS."
  },
  {
    tier: "Death Overs (Hard)",
    tag: "OVERS 16–20",
    tagColor: "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20",
    hoverBorder: "hover:border-[#EF4444]/40",
    title: "Pressure calculation",
    topics: "Dynamic programming state transitions and complex pointer manipulations."
  }
];

export const projects = [
  {
    slug: "career-copilot",
    title: "Career Co-Pilot (Full-Stack + Applied AI)",
    tag: "Applied AI / Video Analyst Engine",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Zod", "AI SDK / Vector Embeddings"],
    description: "A targeted interview prep tool built to solve my own problem: parsing messy resumes and matching them directly against target job descriptions.",
    points: [
      "Token extraction mapped to strict Zod schemas to eliminate model hallucinations.",
      "Hybrid scoring comparing exact technical requirements with contextual semantic relevance.",
      "Automated weekly study plan generation targeting identified skill gaps."
    ],
    links: [
      { label: "Live Web App", url: "#" },
      { label: "GitHub Repo", url: "#" }
    ]
  },
  {
    slug: "kv-store",
    title: "AetherKV — Key-Value Cache Eviction Research",
    tag: "Systems Research & Concurrency",
    stack: ["C++", "POSIX Threads", "Benchmarking"],
    description: "Undergrad research studying why traditional LRU caches suffer from cache pollution during sudden bursts of one-off queries.",
    points: [
      "Testing dynamic frequency-recency queue heuristics (inspired by SIEVE) against standard LRU.",
      "Thread-safe read/write operations using striped mutexes to minimize lock contention.",
      "Tracking hit-ratio improvements across synthetic skewed workloads."
    ],
    links: [
      { label: "View Implementation on GitHub", url: "#" },
      { label: "Read Lab Notes", url: "#" }
    ]
  }
];
