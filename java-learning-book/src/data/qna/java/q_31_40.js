export const q_31_40 = [
  {
    "id": 31,
    "category": "Concurrency",
    "level": "Intermediate",
    "title": "Thread Safety & Synchronization",
    "companies": [
      "JPMorgan",
      "Morgan Stanley"
    ],
    "question": "What is thread safety, and how does 'synchronized' achieve it?",
    "answer": "Thread safety means code executes correctly when accessed by multiple threads simultaneously. The 'synchronized' keyword establishes mutual exclusion. It acquires a monitor lock on an object instance (or class class object for static methods), forcing concurrent threads to execute the block sequentially.",
    "checklist": [
      "Mutual exclusion using monitor lock",
      "Instance lock vs Class-level lock",
      "Guarantees thread synchronization"
    ]
  },
  {
    "id": 32,
    "category": "Concurrency",
    "level": "Intermediate",
    "title": "Volatile Variable Visibility",
    "companies": [
      "Goldman Sachs",
      "Cisco"
    ],
    "question": "What does the volatile keyword do in Java concurrency?",
    "answer": "Volatile guarantees visibility of changes to variables across threads. It instructs the JVM to write updates directly to Main Memory, flushing local CPU caches. It also prevents compiler/CPU instruction reordering, establishing a 'happens-before' relationship.",
    "checklist": [
      "Visibility: flushes CPU caches",
      "Prevents instruction reordering",
      "No atomic compound operations (like count++)"
    ]
  },
  {
    "id": 33,
    "category": "Concurrency",
    "level": "Intermediate",
    "title": "Deadlock Conditions & Prevention",
    "companies": [
      "Amazon",
      "Adobe"
    ],
    "question": "What is a Deadlock? Name the 4 Coffman conditions and how to prevent it.",
    "answer": "A Deadlock occurs when threads block indefinitely, waiting for locks held by each other. Coffman conditions:\n1. Mutual Exclusion: resources are non-sharable.\n2. Hold and Wait: threads holding locks wait for new locks.\n3. No Preemption: locks cannot be taken away.\n4. Circular Wait: locks form a cyclic chain.\nPrevention: Always acquire locks in a globally consistent order.",
    "checklist": [
      "Define Coffman conditions",
      "Acquire locks in consistent order",
      "Use tryLock() timeouts"
    ]
  },
  {
    "id": 34,
    "category": "Concurrency",
    "level": "Intermediate",
    "title": "ExecutorService & ThreadPools",
    "companies": [
      "JPMorgan",
      "Wells Fargo"
    ],
    "question": "Why use ExecutorService over manually spawning threads? Name the key thread pools.",
    "answer": "Spawning threads manually is expensive (1MB stack allocation). ExecutorService uses Thread Pools to reuse threads, reducing overhead and limiting concurrent threads. Key pools: FixedThreadPool (fixed size), CachedThreadPool (dynamic scaling), ScheduledThreadPool (delayed tasks), SingleThreadExecutor.",
    "checklist": [
      "Avoids thread spawning overhead",
      "Reuses worker threads",
      "Controls pool limits & task queues"
    ]
  },
  {
    "id": 35,
    "category": "Concurrency",
    "level": "Intermediate",
    "title": "Callable vs Runnable",
    "companies": [
      "Visa",
      "American Express"
    ],
    "question": "What is the difference between Runnable and Callable?",
    "answer": "- Runnable: run() returns void, cannot throw checked exceptions.\n- Callable: call() returns a Future value, can throw checked exceptions.\nCallable is typically executed inside ExecutorServices using submit(), returning a Future reference.",
    "checklist": [
      "Runnable: void, no checked exceptions",
      "Callable: returns Future, throws exceptions",
      "Callable requires submit() execution"
    ]
  },
  {
    "id": 36,
    "category": "Concurrency",
    "level": "Intermediate",
    "title": "ThreadPool Executor Parameters",
    "companies": [
      "Amazon",
      "Uber"
    ],
    "question": "Explain the core parameters of ThreadPoolExecutor.",
    "answer": "1. corePoolSize: Active threads kept in pool.\n2. maximumPoolSize: Max threads allowed.\n3. keepAliveTime: Timeout for idle surplus threads.\n4. workQueue: Queue holding tasks (e.g. LinkedBlockingQueue).\n5. handler: Rejection policy (AbortPolicy, CallerRunsPolicy).",
    "checklist": [
      "corePoolSize vs maximumPoolSize",
      "Task queue buffering",
      "RejectedExecutionHandler triggers"
    ]
  },
  {
    "id": 37,
    "category": "Concurrency",
    "level": "Intermediate",
    "title": "ReentrantLock vs Synchronized",
    "companies": [
      "Goldman Sachs",
      "Citadel"
    ],
    "question": "Compare ReentrantLock and Synchronized.",
    "answer": "ReentrantLock offers advanced features over synchronized:\n1. Lock Interruptibility: lockInterruptibly().\n2. Non-blocking locking: tryLock() with timeouts.\n3. Fair locking: guarantees order to longest-waiting thread.\n4. Multiple Condition variables.",
    "checklist": [
      "tryLock() prevents deadlock",
      "Fairness policy settings",
      "Requires explicit unlock() in finally block"
    ]
  },
  {
    "id": 38,
    "category": "Concurrency",
    "level": "Intermediate",
    "title": "Atomic Variables & CAS",
    "companies": [
      "Morgan Stanley",
      "Google"
    ],
    "question": "How do atomic variables (e.g., AtomicInteger) achieve lock-free thread safety?",
    "answer": "Atomic classes use CAS (Compare-And-Swap) instructions supported by CPU hardware, bypassing operating system locks. A thread updates a value by verifying it matches the expected old value; if not, it retries in a loop, avoiding thread suspension.",
    "checklist": [
      "Lock-free synchronization",
      "CAS (Compare-and-Swap) loop",
      "Mitigates context-switching overhead"
    ]
  },
  {
    "id": 39,
    "category": "Concurrency",
    "level": "Intermediate",
    "title": "CountDownLatch vs CyclicBarrier",
    "companies": [
      "Barclays",
      "JPMorgan"
    ],
    "question": "What is the difference between CountDownLatch and CyclicBarrier?",
    "answer": "- CountDownLatch: One-time helper. One or more threads wait until a counter reaches zero. Cannot be reset.\n- CyclicBarrier: Reusable synchronization point. Multiple threads wait for each other at a barrier before proceeding together. Can be reset for recurring phases.",
    "checklist": [
      "Latch count cannot be reset",
      "CyclicBarrier count is resettable",
      "CyclicBarrier awaits on all threads"
    ]
  },
  {
    "id": 40,
    "category": "Concurrency",
    "level": "Intermediate",
    "title": "CompletableFuture Futures",
    "companies": [
      "Netflix",
      "Amazon"
    ],
    "question": "Why use CompletableFuture over Java's standard Future?",
    "answer": "Standard Future requires blocking calls (.get()) or polling to retrieve results. CompletableFuture supports non-blocking callback chains (thenApply, thenAccept), combining multiple futures, and async exception handling, enabling reactive programming paradigms.",
    "checklist": [
      "Non-blocking callback handlers",
      "Pipeline transformations: thenApply, thenCompose",
      "Asynchronous exception handling"
    ]
  }
];
export default q_31_40;
