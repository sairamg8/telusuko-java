export const q_91_100 = [
  {
    "id": 91,
    "category": "Core Java",
    "level": "Expert",
    "title": "Low-Latency GC Tuning: ZGC Barriers",
    "companies": [
      "Citadel",
      "Bloomberg"
    ],
    "question": "How does ZGC achieve concurrent relocation without Stop-the-World pauses?",
    "answer": "ZGC uses Colored Pointers (encoding metadata in the reference address) and Load Barriers. When application code reads a reference, the Load Barrier checks its metadata. If the object is being relocated, the barrier locates the new copy, updates the reference, and returns the object, keeping relocations concurrent.",
    "checklist": [
      "Colored Pointers metadata bits",
      "Load Barrier reference redirection",
      "Relocation without thread suspension"
    ]
  },
  {
    "id": 92,
    "category": "Concurrency",
    "level": "Expert",
    "title": "Project Loom Carrier Pinning",
    "companies": [
      "Netflix",
      "Spotify"
    ],
    "question": "Explain the stack frame unmounting flow in Virtual Threads and how synchronized blocks break it.",
    "answer": "When a virtual thread executes blocking IO, the JVM unmounts its stack frames from the carrier OS thread, saving them to the heap. If execution is within a synchronized block or JNI call, the carrier thread is pinned and blocked, defeating Loom's scaling. ReentrantLock is required to avoid pinning.",
    "checklist": [
      "ForkJoinPool scheduling",
      "Stack frame migration to Heap",
      "Thread Pinning: synchronized and JNI"
    ]
  },
  {
    "id": 93,
    "category": "Concurrency",
    "level": "Expert",
    "title": "Memory Barriers & Instruction Reordering Assembly",
    "companies": [
      "Google",
      "Intel"
    ],
    "question": "How do CPU-level memory barriers implement Java volatile variables in x86 architectures?",
    "answer": "In x86 CPUs, writes are not reordered with other writes, so StoreStore/LoadStore barriers are free. To enforce the happens-before relationship, x86 compilers implement volatile writes by appending a `lock addl` instruction. This flushes the processor's store buffers, serving as a StoreLoad barrier.",
    "checklist": [
      "x86 memory model bounds",
      "lock addl assembly instruction",
      "Store buffer flushing"
    ]
  },
  {
    "id": 94,
    "category": "Core Java",
    "level": "Expert",
    "title": "Unsafe Class Memory Manipulations",
    "companies": [
      "Oracle",
      "Goldman Sachs"
    ],
    "question": "What is sun.misc.Unsafe and what are its low-level applications?",
    "answer": "Unsafe provides low-level, unsafe memory operations: allocating off-heap memory, modifying private fields directly using memory offsets, and executing CAS instructions. It is used by high-performance libraries like LMAX Disruptor and Netty to bypass JVM memory overhead.",
    "checklist": [
      "Direct off-heap memory allocation",
      "Memory offset field modifications",
      "Used in high-throughput network libraries"
    ]
  },
  {
    "id": 95,
    "category": "Concurrency",
    "level": "Expert",
    "title": "LMAX Disruptor sequencer bitmasks",
    "companies": [
      "Goldman Sachs",
      "Citadel"
    ],
    "question": "How does LMAX Disruptor implement lock-free sequence reading?",
    "answer": "The RingBuffer uses a sequence counter. Consumers read sequence states using volatile reads. If a consumer is slower than a producer, it blocks using a WaitStrategy (e.g. Yielding, BusySpin) without sleeping the thread, achieving sub-microsecond latencies.",
    "checklist": [
      "Sequence counter volatile reads",
      "WaitStrategy options",
      "Sub-microsecond latency thread spins"
    ]
  },
  {
    "id": 96,
    "category": "Core Java",
    "level": "Expert",
    "title": "Escape Analysis & Stack Allocation",
    "companies": [
      "Google",
      "Oracle"
    ],
    "question": "What is Escape Analysis in HotSpot JVM and how does it optimize objects?",
    "answer": "Escape Analysis checks if an object reference 'escapes' the scope of its declaring method. If not, HotSpot optimizes allocation by: 1. Stack Allocation: allocating fields directly on the execution stack. 2. Scalar Replacement: decomposing the object into primitive variables. 3. Lock Elision: removing synchronization locks.",
    "checklist": [
      "Scope escape checks",
      "Stack allocation of objects",
      "Scalar replacement and lock removal"
    ]
  },
  {
    "id": 97,
    "category": "System Design",
    "level": "Intermediate",
    "title": "Distributed Lock with Redis",
    "companies": [
      "Airbnb",
      "Stripe"
    ],
    "question": "How do you implement a distributed lock using Redis?",
    "answer": "Use `SET lock_key unique_value NX PX 30000` (NX: set if not exists, PX: set expiry). The unique value ensures that a thread only releases the lock it holds by executing a Lua script to compare and delete key atomicly.",
    "checklist": [
      "SET NX PX command",
      "Automatic expiry to prevent deadlocks",
      "Lua script for atomic release checks"
    ]
  },
  {
    "id": 98,
    "category": "System Design",
    "level": "Intermediate",
    "title": "Rate Limiting Algorithms",
    "companies": [
      "Stripe",
      "Uber"
    ],
    "question": "Name 3 rate limiting algorithms and explain Token Bucket.",
    "answer": "Algorithms: Token Bucket, Leaking Bucket, Fixed Window, Sliding Window.\nToken Bucket: Tokens accumulate in a bucket up to capacity. Each incoming request consumes a token. If the bucket is empty, requests are rejected. Allows handling brief bursts of traffic.",
    "checklist": [
      "Token Bucket: handles traffic bursts",
      "Leaking Bucket: enforces constant outflow rate",
      "Sliding Window Log: memory intensive"
    ]
  },
  {
    "id": 99,
    "category": "System Design",
    "level": "Intermediate",
    "title": "Message Queue: Pull vs Push",
    "companies": [
      "Kafka",
      "Linkedin"
    ],
    "question": "Compare Push vs Pull models in Message Brokers with examples.",
    "answer": "- Push (e.g. RabbitMQ): Broker pushes messages to connected consumers as fast as possible. Risk: Overwhelming slow consumers.\n- Pull (e.g. Kafka): Consumers request messages from broker at their own pace, enabling consumer scalability and batch processing.",
    "checklist": [
      "Broker-pushed load (RabbitMQ)",
      "Consumer-pulled batches (Kafka)",
      "Consumer backpressure management"
    ]
  },
  {
    "id": 100,
    "category": "System Design",
    "level": "Advanced",
    "title": "Designing for idempotency",
    "companies": [
      "Uber",
      "Stripe"
    ],
    "question": "How do you design a high-throughput API to guarantee idempotency?",
    "answer": "1. Unique Idempotency Key: Clients send a unique request ID in headers.\n2. Store Execution State: Record the request key, status (processing/completed), and response payload in a database with unique constraints.\n3. Atomic Check-and-Insert: If key exists and is 'processing', reject; if 'completed', return cached response.",
    "checklist": [
      "Unique idempotency constraint",
      "Distributed lock on request key",
      "Cached response storage"
    ]
  }
];
export default q_91_100;
