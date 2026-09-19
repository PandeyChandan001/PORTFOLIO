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

export const csFundamentals = [
  {
    title: "Computer Networks & Protocols",
    subheader: "Layer 4–7 Architecture & Transport",
    points: [
      "TCP/UDP socket lifecycles, 3-way handshake, congestion control, and flow window sizing.",
      "HTTP/1.1 vs. HTTP/2 multiplexing, WebSocket bidirectional streaming, and DNS resolution paths.",
      "IP addressing, subnetting, and foundational routing principles."
    ]
  },
  {
    title: "SQL & Relational Database Internals",
    subheader: "ACID, Indexing & Query Optimizations",
    points: [
      "Relational modeling, 3NF schema normalization, and ER diagram design.",
      "Indexing mechanics: B-Trees vs. Hash indices, explain plans, and avoiding table scans.",
      "Transaction isolation levels (Read Committed, Repeatable Read, Serializable) and concurrency locks."
    ]
  },
  {
    title: "Operating Systems & Runtime Mechanics",
    subheader: "Concurrency, Memory & Process Scheduling",
    points: [
      "Thread concurrency, race conditions, mutex locks, and deadlock avoidance.",
      "Virtual memory layout, page replacement policies, and kernel vs. user space transitions.",
      "POSIX signals, file descriptor management, and I/O multiplexing."
    ]
  }
];

export const algorithmicRigor = [
  {
    tier: "Easy",
    tag: "FOUNDATIONAL PATTERNS",
    tagColor: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20",
    title: "Invariants & Edge Case Discipline",
    focus: "Zero/single-element bounds, off-by-one prevention, and linear complexity baselines.",
    topics: "Two-pointer array reversals, frequency maps, prefix sums, and basic linked list traversals."
  },
  {
    tier: "Medium",
    tag: "SYSTEM PATTERNS",
    tagColor: "text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20",
    title: "Core Analytical Patterns",
    focus: "Eliminating redundant O(N²) loops, maintaining state across dynamic windows.",
    topics: "Monotonic stacks/queues (Next Greater Element), Sliding Window maximums, Binary Search over monotonic answer spaces, Tree DFS/BFS orderings, and Top-K Heaps."
  },
  {
    tier: "Hard",
    tag: "ADVANCED RIGOR",
    tagColor: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    title: "Multi-State Optimization & Advanced Traversal",
    focus: "Subproblem memoization, optimal substructure, and non-trivial graph pathfinding.",
    topics: "Dynamic Programming state transitions, Disjoint Set Union (DSU), Shortest path variants (Dijkstra), and complex pointer manipulations."
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
