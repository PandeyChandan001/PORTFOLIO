export const profile = {
  name: "Chandan Pandey",
  role: "All-Rounder in Java, C++, Python, part-time SQL, AI tools",
  debut: "Methodist High School, Kanpur",
  innings: "5th Sem B.Tech CSE (IoT & IS)",
  status: "AVAILABLE FOR INTERNSHIPS",
  headline: "Hey, I'm Chandan. I break down systems, build practical web tools, and solve data structures.",
  bio: "Most days you'll find me analyzing cache eviction behavior in C++, shipping full-stack tools with Next.js & TypeScript, or working through core algorithmic patterns.",
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
      "3NF relational normalization, SQL schemas, B-Tree index lookups, and ACID compliance under concurrent updates."
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
    title: "Career Co-Pilot (Full-Stack + Applied AI)",
    tag: "Applied AI / Document Intelligence Engine",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Zod", "AI SDK / Vector Embeddings"],
    description: "Built to automate candidate preparation by comparing unstructured PDF resumes against real job descriptions.",
    points: [
      "Extracts and parses resume tokens into strict Zod schemas, eliminating LLM formatting errors.",
      "Hybrid scoring system combining exact skill token matches with contextual semantic embeddings.",
      "Generates targeted, weekly algorithmic and system-design study plans based on identified skill gaps."
    ],
    links: [
      { label: "Live App", url: "#" },
      { label: "GitHub Repo", url: "#" }
    ]
  },
  {
    slug: "kv-store",
    title: "AetherKV — Key-Value Cache Eviction Research",
    tag: "Low-Level Systems & Concurrency Research",
    stack: ["C++", "POSIX Threads", "Benchmarking"],
    description: "Undergrad research analyzing why classical LRU suffers from cache pollution during sudden bursts of one-off queries.",
    points: [
      "Implements frequency-recency queue heuristics (inspired by SIEVE) to preserve hot entries.",
      "Thread-safe reads and writes using striped mutexes to minimize lock contention.",
      "Benchmarked hit-ratio gains across skewed Zipfian access distributions."
    ],
    links: [
      { label: "Implementation on GitHub", url: "#" },
      { label: "Lab Notes", url: "#" }
    ]
  }
];
