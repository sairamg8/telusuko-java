export const q_21_30 = [
  {
    "id": 21,
    "category": "Core Java",
    "level": "Advanced",
    "title": "JVM Memory Spaces: Metaspace vs PermGen",
    "companies": [
      "Google",
      "Citadel"
    ],
    "question": "Explain the transition from PermGen to Metaspace in Java 8.",
    "answer": "PermGen (Permanent Generation) was a fixed-size heap space storing class metadata, prone to OutOfMemoryErrors (OutOfMemoryError: PermGen space). \n\nIn Java 8, PermGen was replaced by Metaspace, which resides in off-heap native memory. It dynamically expands to fit available system RAM by default, mitigating classloader memory exhaustion issues.",
    "checklist": [
      "PermGen resided in Heap",
      "Metaspace resides in Off-Heap Native Memory",
      "Limits controlled by MaxMetaspaceSize"
    ]
  },
  {
    "id": 22,
    "category": "Core Java",
    "level": "Advanced",
    "title": "Reflection API & Security Risks",
    "companies": [
      "Oracle",
      "Goldman Sachs"
    ],
    "question": "What is the Reflection API, and what are its performance and security implications?",
    "answer": "Reflection allows Java applications to inspect and modify classes, interfaces, constructors, methods, and fields at runtime. \n\nPerformance: Bypasses JIT optimizations and compiler checks, slowing execution.\nSecurity: Can modify private variables (using setAccessible(true)), bypassing standard encapsulation rules.",
    "checklist": [
      "Inspects bytecode at runtime",
      "Breaks private encapsulation",
      "Bypasses JIT optimization loops"
    ]
  },
  {
    "id": 23,
    "category": "Core Java",
    "level": "Advanced",
    "title": "Garbage Collection algorithms: G1GC",
    "companies": [
      "Morgan Stanley",
      "Citi",
      "Wells Fargo"
    ],
    "question": "How does the G1 Garbage Collector work under the hood?",
    "answer": "G1 (Garbage-First) divides the JVM heap into equal-sized regions. It tracks live objects across regions concurrently, prioritizing compaction in regions with the most garbage (garbage-first). G1 uses a Stop-The-World (STW) pause target to yield predictable pause times.",
    "checklist": [
      "Divides heap into independent regions",
      "Concurrent marking phase",
      "Compaction of garbage-first regions"
    ]
  },
  {
    "id": 24,
    "category": "Core Java",
    "level": "Advanced",
    "title": "Java Reference Types: Weak, Soft, Phantom",
    "companies": [
      "Google",
      "Linkedin"
    ],
    "question": "Differentiate between Strong, Soft, Weak, and Phantom references.",
    "answer": "- Strong: Default reference. Object is never collected while reference exists.\n- Soft: Collected only when JVM runs out of heap memory (useful for caches).\n- Weak: Collected during any GC cycle if no strong reference exists.\n- Phantom: Used to track post-mortem object disposals via ReferenceQueues.",
    "checklist": [
      "Strong: never collected",
      "Soft: collected on memory pressure",
      "Weak: collected immediately on GC run"
    ]
  },
  {
    "id": 25,
    "category": "Core Java",
    "level": "Advanced",
    "title": "Custom ClassLoaders & Metaspace Leak",
    "companies": [
      "Oracle",
      "Netflix"
    ],
    "question": "How do custom ClassLoaders cause Metaspace OutOfMemoryError?",
    "answer": "ClassLoaders maintain references to all classes they load, and those classes hold references back to their loader. If a custom ClassLoader loads classes and is then dereferenced, but one of its loaded classes remains cached in a ThreadLocal or static variable, the ClassLoader and all loaded metadata cannot be collected, causing a Metaspace OOM.",
    "checklist": [
      "ClassLoader/Class cyclic references",
      "Metaspace stores loaded class metadata",
      "ClassLoader memory leak diagnosis"
    ]
  },
  {
    "id": 26,
    "category": "Concurrency",
    "level": "Basic",
    "title": "Process vs Thread",
    "companies": [
      "TCS",
      "Accenture"
    ],
    "question": "What is the difference between a Process and a Thread?",
    "answer": "A process represents a program execution context with its own private memory address space. Processes are isolated from each other. \n\nA thread is a lightweight unit of execution within a process. Threads share the parent process's memory space, enabling fast communication but requiring synchronization to avoid data corruption.",
    "checklist": [
      "Process has private memory",
      "Threads share Process memory",
      "Context switching is faster in Threads"
    ]
  },
  {
    "id": 27,
    "category": "Concurrency",
    "level": "Basic",
    "title": "Creating Threads: Thread vs Runnable",
    "companies": [
      "Cognizant",
      "Wipro"
    ],
    "question": "What are the ways to create a thread in Java, and which is preferred?",
    "answer": "1. Extending Thread class.\n2. Implementing Runnable interface.\nImplementing Runnable is preferred because Java supports single inheritance only; implementing an interface leaves the class free to extend another base class. It also decouples task logic from execution mechanics.",
    "checklist": [
      "Extend Thread class",
      "Implement Runnable interface",
      "Runnable allows multiple inheritance"
    ]
  },
  {
    "id": 28,
    "category": "Concurrency",
    "level": "Basic",
    "title": "Thread Lifecycle States",
    "companies": [
      "Infosys",
      "IBM"
    ],
    "question": "What are the different states in a Java Thread's lifecycle?",
    "answer": "Thread states (defined in Thread.State enum):\n1. NEW: Created but start() not called.\n2. RUNNABLE: Executing in JVM (or waiting for OS CPU scheduling).\n3. BLOCKED: Waiting to acquire a monitor lock.\n4. WAITING: Waiting indefinitely for another thread notification.\n5. TIMED_WAITING: Waiting for a specified time.\n6. TERMINATED: Finished execution.",
    "checklist": [
      "NEW, RUNNABLE, BLOCKED",
      "WAITING, TIMED_WAITING",
      "TERMINATED state transition rules"
    ]
  },
  {
    "id": 29,
    "category": "Concurrency",
    "level": "Basic",
    "title": "Thread.start() vs Thread.run()",
    "companies": [
      "Accenture",
      "Tech Mahindra"
    ],
    "question": "Why should you call start() instead of run() to begin thread execution?",
    "answer": "Calling start() registers the thread with the OS scheduler, allocates resource stacks, and executes run() asynchronously in a new thread context. Calling run() executes the method synchronously inside the caller thread like any regular Java method.",
    "checklist": [
      "start() triggers new thread execution context",
      "run() executes synchronously inside caller thread",
      "start() cannot be called twice"
    ]
  },
  {
    "id": 30,
    "category": "Concurrency",
    "level": "Basic",
    "title": "Thread Sleep vs Yield",
    "companies": [
      "TCS",
      "HCL"
    ],
    "question": "What is the difference between Thread.sleep() and Thread.yield()?",
    "answer": "Thread.sleep() blocks the current thread for a specified duration, moving it to TIMED_WAITING state. It does not release monitor locks.\n\nThread.yield() signals the OS scheduler that the thread is willing to give up its remaining CPU time slice, but the scheduler may ignore this hint.",
    "checklist": [
      "sleep() guarantees pause duration",
      "yield() is a scheduling hint",
      "Locks are retained in both"
    ]
  }
];
export default q_21_30;
