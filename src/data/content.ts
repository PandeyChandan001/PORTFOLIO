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

export const invariants = [
  {
    title: "Monotonic Queues & Stacks",
    description: "Maintaining order for O(1) sliding window extremes and next greater elements."
  },
  {
    title: "Two-Pointer & Sliding Window",
    description: "Reducing nested loops from O(N²) to O(N) (e.g., 3Sum, substring containment)."
  },
  {
    title: "Binary Search Predicates",
    description: "Space reduction over monotonic predicates and rotated arrays."
  },
  {
    title: "Dynamic Trees, Heaps & Linked Structures",
    description: "Cycle detection, pointer mutation, and heap top-k orderings."
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
