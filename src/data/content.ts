export const profile = {
  name: "Chandan Pandey",
  positioning: "CS Undergrad",
  status: "🟢 5th Sem CS Undergrad // Actively Seeking Summer 2027 SDE Internships",
  headline: "Hey, I'm Chandan. I break down systems, build practical web tools, and solve data structures.",
  bio: "Currently in my 5th semester studying CS (IoT & Information Security). Most days you'll find me experimenting with cache eviction algorithms in C++, building full-stack apps with Next.js & TypeScript, or grinding through algorithmic patterns.",
  background: "Schooling from Methodist High School, Kanpur → Now exploring low-level memory and full-stack AI.",
};

export const skills = {
  lowLevel: ["C++", "Java", "Concurrency", "POSIX Multi-threading", "Memory Profiling", "Cache Eviction"],
  fullStack: ["TypeScript", "Next.js (App Router)", "Tailwind CSS", "Node.js", "REST APIs", "WebSockets"],
  dataInt: ["Python", "SQL", "Schema Validation (Zod)", "Vector Similarity", "Embedding Pipelines"],
  coreCS: ["Data Structures & Algorithms", "Computer Networks (CCNA foundations)", "IoT & Information Security fundamentals"]
};

export const cricketCSFundamentals = [
  {
    title: "Networks: Fielding & Communication",
    badge: "THE BASICS",
    badgeColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    hoverBorder: "hover:border-[#F59E0B]/40",
    points: [
      "TCP 3-way handshakes, sockets, DNS lookups, and how data actually travels across wire/Wi-Fi."
    ]
  },
  {
    title: "Databases: The Scorebook",
    badge: "THE SCOREBOOK",
    badgeColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    hoverBorder: "hover:border-[#10B981]/40",
    points: [
      "SQL schema design, normalization, B-Tree index lookups, and keeping data consistent with ACID."
    ]
  },
  {
    title: "Operating Systems: The Dugout",
    badge: "THE DUGOUT",
    badgeColor: "text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20",
    hoverBorder: "hover:border-[#06B6D4]/40",
    points: [
      "Threads, race conditions, memory stacks vs. heaps, and process scheduling."
    ]
  }
];

export const cricketAlgorithmicRigor = [
  {
    tier: "Powerplay (Easy Problems)",
    tag: "OVERS 01–06",
    tagColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    hoverBorder: "hover:border-[#10B981]/40",
    title: "Building solid footwork",
    topics: "Array two-pointers, string reversals, prefix sums, and avoiding basic boundary mistakes."
  },
  {
    tier: "Middle Overs (Medium Problems)",
    tag: "OVERS 07–15",
    tagColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    hoverBorder: "hover:border-[#F59E0B]/40",
    title: "Rotating the strike",
    topics: "Sliding windows, monotonic stacks/queues (Next Greater Element), binary search over answers, and tree traversals."
  },
  {
    tier: "Death Overs (Hard Problems)",
    tag: "OVERS 16–20",
    tagColor: "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20",
    hoverBorder: "hover:border-[#EF4444]/40",
    title: "Executing under pressure",
    topics: "Dynamic programming subproblems, graph DFS/BFS, and complex pointer problems."
  }
];

export const projects = [
  {
    slug: "career-copilot",
    title: "Career Co-Pilot (Full-Stack + AI)",
    tag: "PERSONAL PROJECT // NEXT.JS + AI SDK",
    stack: ["TypeScript", "Next.js", "Zod", "AI SDK"],
    description: "A targeted prep tool I built to solve my own problem: matching resumes against job descriptions.",
    points: [
      "Extracts resume text and validates it against structured Zod schemas to stop messy LLM formatting.",
      "Compares required skills against candidate experience to highlight missing technical keywords.",
      "Generates a custom weekly prep roadmap targeting the exact topics you're weak on."
    ],
    links: [
      { label: "GitHub Code", url: "#" },
      { label: "Live Web App", url: "#" }
    ]
  },
  {
    slug: "kv-store",
    title: "Key-Value Cache Research (Low-Level Systems)",
    tag: "UNDERGRAD RESEARCH // C++ EXPERIMENT",
    stack: ["C++", "Threads", "Mutexes"],
    description: "Studying how cache eviction policies behave under real-world access patterns.",
    points: [
      "Testing why standard LRU struggles when hit by sudden batches of one-off queries (cache pollution).",
      "Building and testing a prototype cache using frequency-recency ideas (like SIEVE) in C++ to see how much we can bump the hit ratio.",
      "Experimenting with thread-safe reads and writes using mutex locks."
    ],
    links: [
      { label: "View Implementation on GitHub", url: "#" },
      { label: "Read Notes", url: "#" }
    ]
  }
];
