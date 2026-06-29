export const lpaQuestions = [
  // --- CORE JAVA (BASIC) ---
  {
    id: 1,
    category: "Core Java",
    level: "Basic",
    title: "Stack vs Heap Memory",
    companies: ["TCS", "Infosys", "Cognizant"],
    question: "What is the difference between Stack and Heap memory in Java?",
    answer: "Stack memory is used for static memory allocation and execution of threads. It contains local primitive variables and references to objects on the heap. Allocation is LIFO (Last-In-First-Out) and extremely fast.\n\nHeap memory is used for dynamic memory allocation of Java objects and JRE classes at runtime. All objects created via the 'new' keyword reside in the Heap. It is shared across all threads and managed by the Garbage Collector.",
    checklist: ["Stack stores primitives & references", "Heap stores objects", "Stack is thread-isolated", "Heap is thread-shared"]
  },
  {
    id: 2,
    category: "Core Java",
    level: "Basic",
    title: "Why String is Immutable",
    companies: ["Wipro", "Capgemini", "Accenture"],
    question: "Why is String immutable in Java?",
    answer: "1. String Pool: Allows multiple string references to share the same memory slot, saving heap space.\n2. Security: Strings are commonly used for database URLs, network connections, and file paths. If mutable, attackers could change connection destinations.\n3. Thread Safety: Immutable objects are naturally thread-safe without synchronization locks.\n4. HashCode Caching: Strings cache their hashCode, making them optimal keys for HashMaps.",
    checklist: ["String Pool sharing", "Security parameters protection", "Thread safety", "HashCode caching optimization"]
  },
  {
    id: 3,
    category: "Core Java",
    level: "Basic",
    title: "Equals vs Double Equals (==)",
    companies: ["HCL", "Tech Mahindra"],
    question: "What is the difference between equals() method and == operator?",
    answer: "The '==' operator checks reference equality (are they the same object in memory). The 'equals()' method checks value equality (do they have the same content). By default, Object.equals() behaves like '==', so custom classes must override equals() to compare property values.",
    checklist: ["== checks reference address", "equals() checks logical content", "Requires overriding hashCode() if equals() is overridden"]
  },
  {
    id: 4,
    category: "Core Java",
    level: "Basic",
    title: "Final, Finally, and Finalize",
    companies: ["Cognizant", "Mindtree"],
    question: "Explain the differences between final, finally, and finalize.",
    answer: "- final: A keyword to define constants (variables cannot be reassigned, classes cannot be extended, methods cannot be overridden).\n- finally: A block used with try-catch to execute cleanup code (always runs even if an exception is thrown).\n- finalize: A deprecated method in the Object class called by the GC right before reclamation (never rely on it).",
    checklist: ["final for immutability", "finally for resource cleanup", "finalize is deprecated & unpredictable"]
  },
  {
    id: 5,
    category: "Core Java",
    level: "Basic",
    title: "Method Overloading vs Overriding",
    companies: ["TCS", "IBM"],
    question: "What is the difference between method overloading and method overriding?",
    answer: "Overloading (Compile-time polymorphism) occurs when two methods in the same class have the same name but different signatures (different parameters). \n\nOverriding (Runtime polymorphism) occurs when a subclass provides a specific implementation for a method declared in its superclass (same name, parameters, and return type).",
    checklist: ["Overloading signature difference", "Overriding inheritance dependency", "Compile-time vs Runtime resolution"]
  },
  {
    id: 6,
    category: "Core Java",
    level: "Basic",
    title: "Wrapper Classes & Autoboxing",
    companies: ["Infosys", "Oracle"],
    question: "What is Autoboxing and Unboxing in Java?",
    answer: "Autoboxing is the automatic conversion that the Java compiler makes between primitive types and their corresponding object wrapper classes (e.g., int to Integer). Unboxing is the reverse conversion (e.g., Integer to int). Beware of NullPointerExceptions when unboxing null wrappers.",
    checklist: ["Primitive to Wrapper (Autoboxing)", "Wrapper to Primitive (Unboxing)", "Risk of NullPointerException on null objects"]
  },
  {
    id: 7,
    category: "Core Java",
    level: "Basic",
    title: "Abstract Class vs Interface",
    companies: ["Accenture", "LTI"],
    question: "Compare Abstract Classes and Interfaces in Java 8 and beyond.",
    answer: "An abstract class can hold instance states (fields) and constructors. A class can extend only one abstract class. \n\nAn interface cannot hold instance states (only static final variables). Interfaces can have default and static methods (Java 8+) and private methods (Java 9+). A class can implement multiple interfaces.",
    checklist: ["Single inheritance (Abstract) vs Multiple inheritance (Interface)", "Instance fields allowed in Abstract classes", "Default/static methods in Interfaces"]
  },
  {
    id: 8,
    category: "Core Java",
    level: "Basic",
    title: "Checked vs Unchecked Exceptions",
    companies: ["Wipro", "DXC"],
    question: "What is the difference between Checked and Unchecked Exceptions?",
    answer: "Checked exceptions (e.g., IOException, SQLException) inherit from Exception and must be declared in method signatures or handled inside a try-catch block at compile time. \n\nUnchecked exceptions (e.g., NullPointerException, ArithmeticException) inherit from RuntimeException and do not require compile-time handling.",
    checklist: ["Compile-time requirement (Checked)", "Runtime-only check (Unchecked)", "Exception hierarchy roots"]
  },
  {
    id: 9,
    category: "Core Java",
    level: "Basic",
    title: "Array vs ArrayList",
    companies: ["TCS", "Cognizant"],
    question: "How does an Array differ from an ArrayList?",
    answer: "Arrays are fixed-size structures containing primitives or objects. ArrayLists are dynamic resizable collections built on top of arrays. When an ArrayList fills up, it creates a new larger array (typically 1.5x) and copies the elements.",
    checklist: ["Fixed size vs Dynamic sizing", "Primitive support (Arrays only) vs Object wrapper references", "Resize penalty overhead"]
  },
  {
    id: 10,
    category: "Core Java",
    level: "Basic",
    title: "Static Keyword",
    companies: ["Capgemini", "L&T"],
    question: "What does the static keyword do in Java?",
    answer: "The 'static' keyword binds variables, methods, blocks, or nested classes to the class context rather than instance contexts. A static member is allocated memory once at class load time and shared among all instances.",
    checklist: ["Binds member to Class memory", "Shared among all objects", "Initialized at class-load time"]
  },

  // --- CORE JAVA (INTERMEDIATE) ---
  {
    id: 11,
    category: "Core Java",
    level: "Intermediate",
    title: "HashCode and Equals Contract",
    companies: ["Goldman Sachs", "JPMorgan", "Amazon"],
    question: "What is the contract between equals() and hashCode() in Java?",
    answer: "If two objects are equal according to equals(Object) method, their hashCode() must return the same integer value. If two objects return the same hashCode, they are NOT guaranteed to be equal (hash collision). Breaking this contract causes memory leaks and unpredictable behavior in Hash-based collections (HashMap, HashSet).",
    checklist: ["Equals true implies same HashCode", "Same HashCode does NOT imply equals true", "Required for HashMaps/HashSets"]
  },
  {
    id: 12,
    category: "Core Java",
    level: "Intermediate",
    title: "Java Generics & Type Erasure",
    companies: ["Oracle", "Microsoft", "Google"],
    question: "What is Type Erasure in Java Generics?",
    answer: "Type Erasure is the compiler process where generic type parameters are replaced with their bounds (e.g. Object or class type) during compilation. Consequently, generic type information is omitted at runtime, ensuring backward compatibility with older JVM versions.",
    checklist: ["Generic checks exist only at compile time", "Type parameters replaced by Object/Bounds", "Forces bytecode compatibility"]
  },
  {
    id: 13,
    category: "Core Java",
    level: "Intermediate",
    title: "Comparable vs Comparator",
    companies: ["Morgan Stanley", "Visa"],
    question: "What is the difference between Comparable and Comparator?",
    answer: "- Comparable: Implements default sorting logic for a class via compareTo(Object) method (internal sorting).\n- Comparator: Implements custom sorting configurations in external classes via compare(Object, Object) method (external sorting, allowing multiple sorting criteria).",
    checklist: ["Comparable = compareTo (internal)", "Comparator = compare (external)", "Default order vs custom runtime layouts"]
  },
  {
    id: 14,
    category: "Core Java",
    level: "Intermediate",
    title: "Fail-Fast vs Fail-Safe Iterators",
    companies: ["Goldman Sachs", "Barclays"],
    question: "Compare Fail-Fast and Fail-Safe Iterators with examples.",
    answer: "Fail-Fast iterators (e.g. ArrayList, HashMap iterators) work directly on the collection data. If structural modifications are made during iteration, they throw ConcurrentModificationException using a modCount check.\n\nFail-Safe (or Weakly Consistent) iterators (e.g. CopyOnWriteArrayList, ConcurrentHashMap iterators) work on a cloned copy of the collection, permitting modifications without raising exceptions.",
    checklist: ["Fail-Fast operates on main data", "Fail-Safe operates on clones/segments", "ConcurrentModificationException triggers"]
  },
  {
    id: 15,
    category: "Core Java",
    level: "Intermediate",
    title: "Java 8 Functional Interfaces & Lambdas",
    companies: ["Amazon", "Cisco"],
    question: "What is a Functional Interface, and how do Lambda expressions interact with them?",
    answer: "A functional interface has exactly one abstract method (annotated with @FunctionalInterface). Lambda expressions provide inline implementations for this abstract method, eliminating boilerplate anonymous classes. Core types: Predicate (boolean test), Consumer (accepts input, returns void), Function (maps T to R), Supplier (returns T).",
    checklist: ["Single Abstract Method constraint", "Lambda acts as anonymous function instance", "Functional interface target types"]
  },
  {
    id: 16,
    category: "Core Java",
    level: "Intermediate",
    title: "Stream API Intermediate vs Terminal Operations",
    companies: ["JPMorgan", "Citi"],
    question: "Explain the difference between Intermediate and Terminal operations in Streams.",
    answer: "Intermediate operations (e.g., filter, map, flatMap) are lazy. They return another Stream and do not execute until a terminal operation is called.\n\nTerminal operations (e.g., collect, forEach, reduce) trigger the stream pipeline processing and close the stream, returning concrete data types or side-effects.",
    checklist: ["Intermediate is lazy & returns Stream", "Terminal triggers execution & closes pipeline", "Pipelines process elements elements individually"]
  },
  {
    id: 17,
    category: "Core Java",
    level: "Intermediate",
    title: "Exception Handling: Try-With-Resources",
    companies: ["Expedia", "Deutsche Bank"],
    question: "How does Try-With-Resources work, and what interface must resources implement?",
    answer: "Try-with-resources (Java 7+) declares resources that should be closed automatically after the execution block completes. Resources must implement the 'AutoCloseable' or 'Closeable' interfaces. This eliminates manual nested finally-blocks.",
    checklist: ["Requires AutoCloseable interface", "Implicitly calls close() method", "Prevents resource/connection leaks"]
  },
  {
    id: 18,
    category: "Core Java",
    level: "Intermediate",
    title: "Java Serialization & transient Keyword",
    companies: ["Visa", "American Express"],
    question: "What is Java Serialization, and what does the 'transient' keyword do?",
    answer: "Serialization converts object states into byte streams for storage or network transport. Deserialization restores objects from byte streams. Marking a field as 'transient' excludes it from serialization, preventing sensitive variables (like passwords) from being written to stream.",
    checklist: ["Requires Serializable interface", "transient fields skipped", "serialVersionUID mismatch raises exceptions"]
  },
  {
    id: 19,
    category: "Core Java",
    level: "Intermediate",
    title: "Shallow Copy vs Deep Copy",
    companies: ["PayPal", "Walmart"],
    question: "What is the difference between a shallow copy and a deep copy?",
    answer: "Shallow copy creates a new object instance but copies references of internal objects (both objects point to the same child objects).\n\nDeep copy duplicates everything, creating new instances of the root object and all nested child objects, making them fully independent.",
    checklist: ["Shallow copies reference pointers", "Deep duplicates nested memory blocks", "Cloneable default is shallow"]
  },
  {
    id: 20,
    category: "Core Java",
    level: "Intermediate",
    title: "Optional Class usage",
    companies: ["Intuit", "Paytm"],
    question: "Why was the Optional class introduced in Java 8, and how should it be used?",
    answer: "Optional is a container object designed to represent the presence or absence of a value, reducing explicit 'null' checks and avoiding NullPointerExceptions. It should be used primarily as a method return type, not as method parameters or class fields.",
    checklist: ["Avoids explicit null validations", "Should be used as return type only", "Optional methods: map, filter, orElseGet"]
  },

  // --- CORE JAVA (ADVANCED) ---
  {
    id: 21,
    category: "Core Java",
    level: "Advanced",
    title: "JVM Memory Spaces: Metaspace vs PermGen",
    companies: ["Google", "Citadel"],
    question: "Explain the transition from PermGen to Metaspace in Java 8.",
    answer: "PermGen (Permanent Generation) was a fixed-size heap space storing class metadata, prone to OutOfMemoryErrors (OutOfMemoryError: PermGen space). \n\nIn Java 8, PermGen was replaced by Metaspace, which resides in off-heap native memory. It dynamically expands to fit available system RAM by default, mitigating classloader memory exhaustion issues.",
    checklist: ["PermGen resided in Heap", "Metaspace resides in Off-Heap Native Memory", "Limits controlled by MaxMetaspaceSize"]
  },
  {
    id: 22,
    category: "Core Java",
    level: "Advanced",
    title: "Reflection API & Security Risks",
    companies: ["Oracle", "Goldman Sachs"],
    question: "What is the Reflection API, and what are its performance and security implications?",
    answer: "Reflection allows Java applications to inspect and modify classes, interfaces, constructors, methods, and fields at runtime. \n\nPerformance: Bypasses JIT optimizations and compiler checks, slowing execution.\nSecurity: Can modify private variables (using setAccessible(true)), bypassing standard encapsulation rules.",
    checklist: ["Inspects bytecode at runtime", "Breaks private encapsulation", "Bypasses JIT optimization loops"]
  },
  {
    id: 23,
    category: "Core Java",
    level: "Advanced",
    title: "Garbage Collection algorithms: G1GC",
    companies: ["Morgan Stanley", "Citi", "Wells Fargo"],
    question: "How does the G1 Garbage Collector work under the hood?",
    answer: "G1 (Garbage-First) divides the JVM heap into equal-sized regions. It tracks live objects across regions concurrently, prioritizing compaction in regions with the most garbage (garbage-first). G1 uses a Stop-The-World (STW) pause target to yield predictable pause times.",
    checklist: ["Divides heap into independent regions", "Concurrent marking phase", "Compaction of garbage-first regions"]
  },
  {
    id: 24,
    category: "Core Java",
    level: "Advanced",
    title: "Java Reference Types: Weak, Soft, Phantom",
    companies: ["Google", "Linkedin"],
    question: "Differentiate between Strong, Soft, Weak, and Phantom references.",
    answer: "- Strong: Default reference. Object is never collected while reference exists.\n- Soft: Collected only when JVM runs out of heap memory (useful for caches).\n- Weak: Collected during any GC cycle if no strong reference exists.\n- Phantom: Used to track post-mortem object disposals via ReferenceQueues.",
    checklist: ["Strong: never collected", "Soft: collected on memory pressure", "Weak: collected immediately on GC run"]
  },
  {
    id: 25,
    category: "Core Java",
    level: "Advanced",
    title: "Custom ClassLoaders & Metaspace Leak",
    companies: ["Oracle", "Netflix"],
    question: "How do custom ClassLoaders cause Metaspace OutOfMemoryError?",
    answer: "ClassLoaders maintain references to all classes they load, and those classes hold references back to their loader. If a custom ClassLoader loads classes and is then dereferenced, but one of its loaded classes remains cached in a ThreadLocal or static variable, the ClassLoader and all loaded metadata cannot be collected, causing a Metaspace OOM.",
    checklist: ["ClassLoader/Class cyclic references", "Metaspace stores loaded class metadata", "ClassLoader memory leak diagnosis"]
  },

  // --- CONCURRENCY (BASIC) ---
  {
    id: 26,
    category: "Concurrency",
    level: "Basic",
    title: "Process vs Thread",
    companies: ["TCS", "Accenture"],
    question: "What is the difference between a Process and a Thread?",
    answer: "A process represents a program execution context with its own private memory address space. Processes are isolated from each other. \n\nA thread is a lightweight unit of execution within a process. Threads share the parent process's memory space, enabling fast communication but requiring synchronization to avoid data corruption.",
    checklist: ["Process has private memory", "Threads share Process memory", "Context switching is faster in Threads"]
  },
  {
    id: 27,
    category: "Concurrency",
    level: "Basic",
    title: "Creating Threads: Thread vs Runnable",
    companies: ["Cognizant", "Wipro"],
    question: "What are the ways to create a thread in Java, and which is preferred?",
    answer: "1. Extending Thread class.\n2. Implementing Runnable interface.\nImplementing Runnable is preferred because Java supports single inheritance only; implementing an interface leaves the class free to extend another base class. It also decouples task logic from execution mechanics.",
    checklist: ["Extend Thread class", "Implement Runnable interface", "Runnable allows multiple inheritance"]
  },
  {
    id: 28,
    category: "Concurrency",
    level: "Basic",
    title: "Thread Lifecycle States",
    companies: ["Infosys", "IBM"],
    question: "What are the different states in a Java Thread's lifecycle?",
    answer: "Thread states (defined in Thread.State enum):\n1. NEW: Created but start() not called.\n2. RUNNABLE: Executing in JVM (or waiting for OS CPU scheduling).\n3. BLOCKED: Waiting to acquire a monitor lock.\n4. WAITING: Waiting indefinitely for another thread notification.\n5. TIMED_WAITING: Waiting for a specified time.\n6. TERMINATED: Finished execution.",
    checklist: ["NEW, RUNNABLE, BLOCKED", "WAITING, TIMED_WAITING", "TERMINATED state transition rules"]
  },
  {
    id: 29,
    category: "Concurrency",
    level: "Basic",
    title: "Thread.start() vs Thread.run()",
    companies: ["Accenture", "Tech Mahindra"],
    question: "Why should you call start() instead of run() to begin thread execution?",
    answer: "Calling start() registers the thread with the OS scheduler, allocates resource stacks, and executes run() asynchronously in a new thread context. Calling run() executes the method synchronously inside the caller thread like any regular Java method.",
    checklist: ["start() triggers new thread execution context", "run() executes synchronously inside caller thread", "start() cannot be called twice"]
  },
  {
    id: 30,
    category: "Concurrency",
    level: "Basic",
    title: "Thread Sleep vs Yield",
    companies: ["TCS", "HCL"],
    question: "What is the difference between Thread.sleep() and Thread.yield()?",
    answer: "Thread.sleep() blocks the current thread for a specified duration, moving it to TIMED_WAITING state. It does not release monitor locks.\n\nThread.yield() signals the OS scheduler that the thread is willing to give up its remaining CPU time slice, but the scheduler may ignore this hint.",
    checklist: ["sleep() guarantees pause duration", "yield() is a scheduling hint", "Locks are retained in both"]
  },

  // --- CONCURRENCY (INTERMEDIATE) ---
  {
    id: 31,
    category: "Concurrency",
    level: "Intermediate",
    title: "Thread Safety & Synchronization",
    companies: ["JPMorgan", "Morgan Stanley"],
    question: "What is thread safety, and how does 'synchronized' achieve it?",
    answer: "Thread safety means code executes correctly when accessed by multiple threads simultaneously. The 'synchronized' keyword establishes mutual exclusion. It acquires a monitor lock on an object instance (or class class object for static methods), forcing concurrent threads to execute the block sequentially.",
    checklist: ["Mutual exclusion using monitor lock", "Instance lock vs Class-level lock", "Guarantees thread synchronization"]
  },
  {
    id: 32,
    category: "Concurrency",
    level: "Intermediate",
    title: "Volatile Variable Visibility",
    companies: ["Goldman Sachs", "Cisco"],
    question: "What does the volatile keyword do in Java concurrency?",
    answer: "Volatile guarantees visibility of changes to variables across threads. It instructs the JVM to write updates directly to Main Memory, flushing local CPU caches. It also prevents compiler/CPU instruction reordering, establishing a 'happens-before' relationship.",
    checklist: ["Visibility: flushes CPU caches", "Prevents instruction reordering", "No atomic compound operations (like count++)"]
  },
  {
    id: 33,
    category: "Concurrency",
    level: "Intermediate",
    title: "Deadlock Conditions & Prevention",
    companies: ["Amazon", "Adobe"],
    question: "What is a Deadlock? Name the 4 Coffman conditions and how to prevent it.",
    answer: "A Deadlock occurs when threads block indefinitely, waiting for locks held by each other. Coffman conditions:\n1. Mutual Exclusion: resources are non-sharable.\n2. Hold and Wait: threads holding locks wait for new locks.\n3. No Preemption: locks cannot be taken away.\n4. Circular Wait: locks form a cyclic chain.\nPrevention: Always acquire locks in a globally consistent order.",
    checklist: ["Define Coffman conditions", "Acquire locks in consistent order", "Use tryLock() timeouts"]
  },
  {
    id: 34,
    category: "Concurrency",
    level: "Intermediate",
    title: "ExecutorService & ThreadPools",
    companies: ["JPMorgan", "Wells Fargo"],
    question: "Why use ExecutorService over manually spawning threads? Name the key thread pools.",
    answer: "Spawning threads manually is expensive (1MB stack allocation). ExecutorService uses Thread Pools to reuse threads, reducing overhead and limiting concurrent threads. Key pools: FixedThreadPool (fixed size), CachedThreadPool (dynamic scaling), ScheduledThreadPool (delayed tasks), SingleThreadExecutor.",
    checklist: ["Avoids thread spawning overhead", "Reuses worker threads", "Controls pool limits & task queues"]
  },
  {
    id: 35,
    category: "Concurrency",
    level: "Intermediate",
    title: "Callable vs Runnable",
    companies: ["Visa", "American Express"],
    question: "What is the difference between Runnable and Callable?",
    answer: "- Runnable: run() returns void, cannot throw checked exceptions.\n- Callable: call() returns a Future value, can throw checked exceptions.\nCallable is typically executed inside ExecutorServices using submit(), returning a Future reference.",
    checklist: ["Runnable: void, no checked exceptions", "Callable: returns Future, throws exceptions", "Callable requires submit() execution"]
  },
  {
    id: 36,
    category: "Concurrency",
    level: "Intermediate",
    title: "ThreadPool Executor Parameters",
    companies: ["Amazon", "Uber"],
    question: "Explain the core parameters of ThreadPoolExecutor.",
    answer: "1. corePoolSize: Active threads kept in pool.\n2. maximumPoolSize: Max threads allowed.\n3. keepAliveTime: Timeout for idle surplus threads.\n4. workQueue: Queue holding tasks (e.g. LinkedBlockingQueue).\n5. handler: Rejection policy (AbortPolicy, CallerRunsPolicy).",
    checklist: ["corePoolSize vs maximumPoolSize", "Task queue buffering", "RejectedExecutionHandler triggers"]
  },
  {
    id: 37,
    category: "Concurrency",
    level: "Intermediate",
    title: "ReentrantLock vs Synchronized",
    companies: ["Goldman Sachs", "Citadel"],
    question: "Compare ReentrantLock and Synchronized.",
    answer: "ReentrantLock offers advanced features over synchronized:\n1. Lock Interruptibility: lockInterruptibly().\n2. Non-blocking locking: tryLock() with timeouts.\n3. Fair locking: guarantees order to longest-waiting thread.\n4. Multiple Condition variables.",
    checklist: ["tryLock() prevents deadlock", "Fairness policy settings", "Requires explicit unlock() in finally block"]
  },
  {
    id: 38,
    category: "Concurrency",
    level: "Intermediate",
    title: "Atomic Variables & CAS",
    companies: ["Morgan Stanley", "Google"],
    question: "How do atomic variables (e.g., AtomicInteger) achieve lock-free thread safety?",
    answer: "Atomic classes use CAS (Compare-And-Swap) instructions supported by CPU hardware, bypassing operating system locks. A thread updates a value by verifying it matches the expected old value; if not, it retries in a loop, avoiding thread suspension.",
    checklist: ["Lock-free synchronization", "CAS (Compare-and-Swap) loop", "Mitigates context-switching overhead"]
  },
  {
    id: 39,
    category: "Concurrency",
    level: "Intermediate",
    title: "CountDownLatch vs CyclicBarrier",
    companies: ["Barclays", "JPMorgan"],
    question: "What is the difference between CountDownLatch and CyclicBarrier?",
    answer: "- CountDownLatch: One-time helper. One or more threads wait until a counter reaches zero. Cannot be reset.\n- CyclicBarrier: Reusable synchronization point. Multiple threads wait for each other at a barrier before proceeding together. Can be reset for recurring phases.",
    checklist: ["Latch count cannot be reset", "CyclicBarrier count is resettable", "CyclicBarrier awaits on all threads"]
  },
  {
    id: 40,
    category: "Concurrency",
    level: "Intermediate",
    title: "CompletableFuture Futures",
    companies: ["Netflix", "Amazon"],
    question: "Why use CompletableFuture over Java's standard Future?",
    answer: "Standard Future requires blocking calls (.get()) or polling to retrieve results. CompletableFuture supports non-blocking callback chains (thenApply, thenAccept), combining multiple futures, and async exception handling, enabling reactive programming paradigms.",
    checklist: ["Non-blocking callback handlers", "Pipeline transformations: thenApply, thenCompose", "Asynchronous exception handling"]
  },

  // --- CONCURRENCY (ADVANCED) ---
  {
    id: 41,
    category: "Concurrency",
    level: "Advanced",
    title: "Double-Checked Locking (DCL)",
    companies: ["Microsoft", "Google"],
    question: "Why is volatile required in Double-Checked Locking implementation?",
    answer: "Object creation is not atomic: it allocates memory, runs constructor, and assigns the reference. Without volatile, instruction reordering can cause a thread to read a non-null reference to a partially initialized object, raising NullPointerExceptions. Volatile introduces memory fences to prevent reordering.",
    checklist: ["Memory allocation order", "Partial initialization risk", "Instruction reordering prevention"]
  },
  {
    id: 42,
    category: "Concurrency",
    level: "Advanced",
    title: "ThreadLocal Memory Leak",
    companies: ["Goldman Sachs", "Amazon"],
    question: "How do ThreadLocal variables cause memory leaks in Application Servers?",
    answer: "ThreadLocal maps variables to the executing Thread. In app servers, threads are reused in thread pools. If a classloader loads a ThreadLocal value and the thread returns to the pool without calling remove(), the value and its classloader cannot be garbage collected, creating a Metaspace OOM.",
    checklist: ["WeakReference keys in ThreadLocalMap", "Thread reuse in application pools", "Always invoke remove() in finally block"]
  },
  {
    id: 43,
    category: "Concurrency",
    level: "Advanced",
    title: "ForkJoinPool & Work Stealing",
    companies: ["Google", "Citadel"],
    question: "Explain the Work-Stealing algorithm in ForkJoinPool.",
    answer: "ForkJoinPool uses a work-stealing algorithm. Every worker thread has its own double-ended queue (deque) of tasks. If a worker thread finishes its tasks, it steals tasks from the back of another busy thread's deque, minimizing thread idle time and optimizing multi-core utilization.",
    checklist: ["Double-ended queues (deques)", "Stealing from queue tail", "Used by Parallel Streams under the hood"]
  },
  {
    id: 44,
    category: "Concurrency",
    level: "Advanced",
    title: "ConcurrentHashMap Segmentation",
    companies: ["JPMorgan", "eBay"],
    question: "How does ConcurrentHashMap achieve thread safety in Java 8?",
    answer: "Java 8 ConcurrentHashMap uses node-level locking. It locks only the head node of a bucket during updates using synchronized or CAS. Readers can access bucket data without locks, minimizing contention compared to Java 7's Segment-locking model.",
    checklist: ["Node-level locks (synchronized on bucket head)", "Lock-free reads", "CAS (Compare-and-Swap) updates"]
  },
  {
    id: 45,
    category: "Concurrency",
    level: "Advanced",
    title: "ABA Problem in Concurrency",
    companies: ["Citadel", "Goldman Sachs"],
    question: "What is the ABA problem in CAS operations, and how do you prevent it?",
    answer: "The ABA problem occurs when a thread reads a value 'A', another thread changes it to 'B' and back to 'A', and the first thread's CAS operation succeeds because the value is still 'A', unaware of the intermediate state change. Prevention: Use StampReferences (e.g. AtomicStampedReference) containing version numbers.",
    checklist: ["CAS value validation vulnerability", "Object state change omission", "AtomicStampedReference version tagging"]
  },

  // --- SPRING & JPA (BASIC) ---
  {
    id: 46,
    category: "Spring & JPA",
    level: "Basic",
    title: "Spring IoC Container",
    companies: ["TCS", "Wipro"],
    question: "What is Spring IoC (Inversion of Control) and Dependency Injection?",
    answer: "IoC is a design principle where the control of object creation, dependency management, and lifecycle is delegated to the framework (the IoC Container) rather than the application code. Dependency Injection (DI) is the pattern used to supply dependencies to a class at runtime.",
    checklist: ["Delegation of object lifecycle", "Inversion of object creation control", "DI via Setter, Constructor, or Field"]
  },
  {
    id: 47,
    category: "Spring & JPA",
    level: "Basic",
    title: "Spring Bean Scopes",
    companies: ["Infosys", "Cognizant"],
    question: "What are the different bean scopes in Spring?",
    answer: "1. Singleton (Default): One instance per IoC container.\n2. Prototype: New instance on every request.\n3. Request: One instance per HTTP request (Web context).\n4. Session: One instance per HTTP session.\n5. Application: One instance per ServletContext.",
    checklist: ["Singleton vs Prototype", "Web scopes: request, session, application", "Scope inheritance limits"]
  },
  {
    id: 48,
    category: "Spring & JPA",
    level: "Basic",
    title: "Autowired Annotation",
    companies: ["Capgemini", "Accenture"],
    question: "What does @Autowired do in Spring, and what are its resolution modes?",
    answer: "@Autowired instructs Spring to resolve and inject a matching bean into a field, setter, or constructor. Resolution modes: byType (default), byName (using @Qualifier if types overlap).",
    checklist: ["Injects managed Spring bean", "Resolution by type, then name", "Required attribute options"]
  },
  {
    id: 49,
    category: "Spring & JPA",
    level: "Basic",
    title: "Constructor vs Setter Injection",
    companies: ["IBM", "Tech Mahindra"],
    question: "Why is Constructor Injection preferred over Field Injection?",
    answer: "1. Immutability: Dependencies can be declared as final.\n2. Testability: Allows instantiating classes in unit tests without Spring context initialization.\n3. Safe Construction: Prevents NullPointerExceptions by ensuring dependencies are supplied at instantiation.",
    checklist: ["Supports final fields", "No Spring context dependency in unit tests", "Prevents circular dependencies at startup"]
  },
  {
    id: 50,
    category: "Spring & JPA",
    level: "Basic",
    title: "Spring Boot vs Spring Framework",
    companies: ["TCS", "Infosys"],
    question: "What is the difference between Spring and Spring Boot?",
    answer: "Spring Framework provides core infrastructure (IoC, AOP, MVC) but requires manual XML or Java configuration. Spring Boot is an opinionated extension that offers auto-configuration, starter POMs, and embedded servers (Tomcat), enabling rapid development.",
    checklist: ["Core framework vs boot wrapper", "Starter POM dependencies", "Embedded application servers"]
  },
  {
    id: 51,
    category: "Spring & JPA",
    level: "Basic",
    title: "Component Stereotype Annotations",
    companies: ["Wipro", "Cognizant"],
    question: "Differentiate between @Component, @Service, @Repository, and @Controller.",
    answer: "- @Component: Generic stereotype for any Spring-managed bean.\n- @Service: Represents business logic.\n- @Repository: Handles database access (translates JDBC/database exceptions).\n- @Controller: Defines MVC controllers handling client requests.",
    checklist: ["Component is base stereotype", "Service is business layer", "Repository translates database exceptions"]
  },
  {
    id: 52,
    category: "Spring & JPA",
    level: "Basic",
    title: "Spring Boot Starter POMs",
    companies: ["Tech Mahindra", "Mindtree"],
    question: "What are Spring Boot Starters?",
    answer: "Starters are convenience dependency descriptors that group related library imports into a single artifact (e.g. spring-boot-starter-web), resolving dependency compatibility issues.",
    checklist: ["Groups transitive dependencies", "Resolves version conflicts", "Examples: web, data-jpa, security"]
  },
  {
    id: 53,
    category: "Spring & JPA",
    level: "Basic",
    title: "JPA vs Hibernate",
    companies: ["Cognizant", "LTI"],
    question: "What is the difference between JPA and Hibernate?",
    answer: "JPA (Java Persistence API) is a specification containing interfaces and metadata rules. Hibernate is a concrete Object-Relational Mapping (ORM) library that implements the JPA specification.",
    checklist: ["Specification (JPA) vs Implementation (Hibernate)", "JPA contains EntityManager", "Hibernate contains SessionFactory"]
  },
  {
    id: 54,
    category: "Spring & JPA",
    level: "Basic",
    title: "Spring Boot application.properties",
    companies: ["Wipro", "TCS"],
    question: "What is the purpose of application.properties or application.yml?",
    answer: "These files define application configuration settings (port, database credentials, logging levels, active profiles), separating runtime configurations from the compiled code.",
    checklist: ["Runtime configuration settings", "YAML vs Properties syntax", "Supports environment variable injection"]
  },
  {
    id: 55,
    category: "Spring & JPA",
    level: "Basic",
    title: "Spring profiles",
    companies: ["Infosys", "IBM"],
    question: "What are Spring Profiles, and how do you use them?",
    answer: "Profiles allow segregating configurations for different environments (e.g. dev, test, prod). You load specific properties using: `spring.profiles.active=prod`.",
    checklist: ["Environment segregation", "Conditional bean loading: @Profile", "Properties suffix matching: application-dev.properties"]
  },

  // --- SPRING & JPA (INTERMEDIATE) ---
  {
    id: 56,
    category: "Spring & JPA",
    level: "Intermediate",
    title: "Bean Lifecycle Steps",
    companies: ["VMware", "Expedia"],
    question: "Explain the Spring Bean lifecycle phases.",
    answer: "1. Instantiation (Constructor execution).\n2. Populate Properties (Dependency Injection).\n3. Aware Interfaces: BeanNameAware, BeanFactoryAware.\n4. BeanPostProcessor: postProcessBeforeInitialization().\n5. Initialization: @PostConstruct or afterPropertiesSet().\n6. BeanPostProcessor: postProcessAfterInitialization() (Proxy wraps occur here).\n7. Ready for use.\n8. Destruction: @PreDestroy or destroy().",
    checklist: ["Instantiation -> Injection -> Initialization -> Destruction", "BeanPostProcessor hook points", "Aware interface calls"]
  },
  {
    id: 57,
    category: "Spring & JPA",
    level: "Intermediate",
    title: "Dynamic Proxy: JDK vs CGLIB",
    companies: ["Amazon", "Goldman Sachs"],
    question: "How does Spring generate proxies for target beans?",
    answer: "- JDK Dynamic Proxy: Used if target class implements interfaces. Uses reflection to create runtime proxies.\n- CGLIB Proxy: Used if target class has no interfaces. Uses subclassing (ASM bytecode generation) to override methods at runtime.",
    checklist: ["JDK Dynamic Proxy: interface required", "CGLIB Proxy: subclassing based", "cglib is default in Spring Boot 2+"]
  },
  {
    id: 58,
    category: "Spring & JPA",
    level: "Intermediate",
    title: "Hibernate First vs Second Level Cache",
    companies: ["JPMorgan", "Barclays"],
    question: "Explain the differences between First and Second Level caches in Hibernate.",
    answer: "- First Level Cache: Session-scoped (default). Stores persistent objects within the current Hibernate transaction Session.\n- Second Level Cache: SessionFactory-scoped (optional). Shared across sessions, typically backed by EhCache or Redis to avoid database hits for static read data.",
    checklist: ["First Level: Session scope, non-disableable", "Second Level: SessionFactory scope, shared", "Invalidation issues on batch writes"]
  },
  {
    id: 59,
    category: "Spring & JPA",
    level: "Intermediate",
    title: "LazyInitializationException Diagnosis",
    companies: ["Microsoft", "Oracle"],
    question: "Why does LazyInitializationException occur, and how do you resolve it?",
    answer: "It occurs when the application accesses a lazy-loaded association (e.g. client.getOrders()) after the Hibernate Session has closed. Resolution: Use JOIN FETCH in queries, define EntityGraphs, or keep transactions active using @Transactional.",
    checklist: ["Accessing association on detached entity", "Closed persistence context Session", "JOIN FETCH or EntityGraph resolution"]
  },
  {
    id: 60,
    category: "Spring & JPA",
    level: "Intermediate",
    title: "Spring AOP Concepts",
    companies: ["Visa", "Citi"],
    question: "Define Advice, Aspect, Pointcut, and JoinPoint in Spring AOP.",
    answer: "- Aspect: Module containing cross-cutting concerns (e.g., logging).\n- JoinPoint: Execution point in application (e.g., method execution).\n- Pointcut: Expression matching target JoinPoints.\n- Advice: Action taken at a JoinPoint (Before, After, Around).",
    checklist: ["Aspect = Pointcut + Advice", "JoinPoint represents target runtime hook", "Pointcut syntax matching"]
  },
  {
    id: 61,
    category: "Spring & JPA",
    level: "Intermediate",
    title: "Transactional Propagation Types",
    companies: ["JPMorgan", "Wells Fargo"],
    question: "What are the common propagation behaviors in @Transactional?",
    answer: "- REQUIRED (Default): Joins current transaction or creates a new one.\n- REQUIRES_NEW: Suspends current transaction and creates a new one.\n- NESTED: Executes inside a nested transaction using savepoints.\n- MANDATORY: Requires an active transaction, otherwise throws exception.",
    checklist: ["REQUIRED vs REQUIRES_NEW", "NESTED savepoint rollback behavior", "MANDATORY exception handling"]
  },
  {
    id: 62,
    category: "Spring & JPA",
    level: "Intermediate",
    title: "Spring Security Authentication Flow",
    companies: ["Amazon", "PayPal"],
    question: "How does Spring Security filter requests?",
    answer: "Spring Security uses a chain of servlet Filters (FilterChainProxy). Key steps: DelegatingFilterProxy intercepts HTTP request, forwards to SecurityFilterChain, extracts credentials using UsernamePasswordAuthenticationFilter, delegates to AuthenticationManager, and verifies via UserDetailsService.",
    checklist: ["DelegatingFilterProxy servlet registration", "SecurityContextHolder thread storage", "AuthenticationProvider validation"]
  },
  {
    id: 63,
    category: "Spring & JPA",
    level: "Intermediate",
    title: "JPA Entity States",
    companies: ["Walmart", "Stripe"],
    question: "What are Transient, Persistent, Detached, and Removed entity states in JPA?",
    answer: "- Transient: New entity, no DB row, not managed by EntityManager.\n- Persistent: Has DB row, managed by active EntityManager. Changes sync on commit.\n- Detached: Has DB row, but EntityManager session has closed.\n- Removed: Scheduled for deletion from DB on session commit.",
    checklist: ["Transient: not managed, no ID", "Persistent: managed, dirty checks apply", "Detached: requires merge() to re-attach"]
  },
  {
    id: 64,
    category: "Spring & JPA",
    level: "Intermediate",
    title: "Dirty Checking in Hibernate",
    companies: ["eBay", "Cisco"],
    question: "What is Dirty Checking in Hibernate?",
    answer: "Dirty Checking is the process where Hibernate automatically detects changes on managed (Persistent) entities during a transaction. During session flush, it compares the current state with the initial snapshot and runs SQL updates without requiring explicit save() calls.",
    checklist: ["Applies only to Persistent state entities", "Automatic snapshot comparison", "Fires SQL update on flush/commit"]
  },
  {
    id: 65,
    category: "Spring & JPA",
    level: "Intermediate",
    title: "Spring Boot Actuator",
    companies: ["Netflix", "Salesforce"],
    question: "What is Spring Boot Actuator and why is it used?",
    answer: "Actuator adds production-ready monitoring capabilities to application services. It exposes REST endpoints (e.g. /actuator/health, /actuator/metrics, /actuator/env) to track application health, database connectivity, and CPU memory usage.",
    checklist: ["Production monitoring endpoints", "Health, metrics, thread dumps", "Integration with Prometheus/Grafana"]
  },

  // --- SPRING & JPA (ADVANCED) ---
  {
    id: 66,
    category: "Spring & JPA",
    level: "Advanced",
    title: "@Transactional Self-Invocation",
    companies: ["Amazon", "Uber"],
    question: "Why does @Transactional fail when calling a transactional method internally from the same class?",
    answer: "Spring uses AOP proxies to intercept calls and manage transactions. Self-invocation (method A calling method B in the same class) bypasses the proxy container, calling 'this' reference directly. The transaction aspect is never executed. Fix: Split logic into separate service beans or inject the bean proxy.",
    checklist: ["Proxy bypass on internal calls", "JDK Dynamic Proxy/CGLIB wrapper limitations", "Self-injection lazy resolution"]
  },
  {
    id: 67,
    category: "Spring & JPA",
    level: "Advanced",
    title: "Transactional Isolation Levels",
    companies: ["Goldman Sachs", "Citadel"],
    question: "Explain the Isolation Levels in @Transactional and their database concurrency trade-offs.",
    answer: "- READ_UNCOMMITTED: Dirty reads allowed.\n- READ_COMMITTED: Prevents dirty reads (default in most DBs).\n- REPEATABLE_READ: Prevents non-repeatable reads (uses shared locks).\n- SERIALIZABLE: Full isolation, locks rows, prevents phantom reads, blocks concurrency.",
    checklist: ["Dirty reads vs Non-Repeatable reads vs Phantom reads", "Optimistic concurrency vs row locks", "Serializable throughput penalties"]
  },
  {
    id: 68,
    category: "Spring & JPA",
    level: "Advanced",
    title: "Hibernate N+1 Query Problem",
    companies: ["JPMorgan", "Microsoft"],
    question: "How do you diagnose and resolve the Hibernate N+1 select query problem?",
    answer: "Diagnosis: Enable SQL log generation; look for repeated queries. \nResolution:\n1. JOIN FETCH: Load parent and children in 1 query using JOIN FETCH.\n2. EntityGraph: Declare graph templates on repositories.\n3. Batch Fetching: @BatchSize configuration on associations.",
    checklist: ["Repeated database roundtrips", "JOIN FETCH query syntax", "EntityGraph mapping properties"]
  },
  {
    id: 69,
    category: "Spring & JPA",
    level: "Advanced",
    title: "Custom BeanPostProcessor",
    companies: ["Goldman Sachs", "VMware"],
    question: "How do you write a custom BeanPostProcessor and when would you use it?",
    answer: "Implement the BeanPostProcessor interface overriding postProcessBeforeInitialization() or postProcessAfterInitialization(). Used to build custom annotations (e.g. metric track, audit logs) by returning dynamic proxies wrapping target beans.",
    checklist: ["Implement BeanPostProcessor", "Interception of bean initialization", "Dynamic proxy generation hooks"]
  },
  {
    id: 70,
    category: "Spring & JPA",
    level: "Advanced",
    title: "Cache Stampede In Spring Cache",
    companies: ["Netflix", "Salesforce"],
    question: "How does Spring Cache handle cache stampede (thundering herd)?",
    answer: "Set the `sync = true` parameter inside `@Cacheable`. This serializes concurrent requests on a cache miss by locking the thread. The first thread queries the DB and populates the cache; subsequent threads wait and read from cache, protecting database connection pools.",
    checklist: ["sync = true attribute logic", "Prevents database request surges on cache expiry", "Locks thread executing DB query"]
  },

  // --- MICROSERVICES (BASIC) ---
  {
    id: 71,
    category: "Microservices",
    level: "Basic",
    title: "Monolith vs Microservices",
    companies: ["TCS", "Infosys"],
    question: "What is the difference between monolithic and microservice architectures?",
    answer: "A Monolithic application houses all business components, databases, and UI configurations in a single deployable code package. \n\nMicroservices decouple business components into separate, lightweight services that communicate over APIs, allowing independent scaling, deployment, and localized database management.",
    checklist: ["Single deployment package (Monolith)", "Decoupled independent domains (Microservices)", "Network latency trade-offs"]
  },
  {
    id: 72,
    category: "Microservices",
    level: "Basic",
    title: "Service Discovery Need",
    companies: ["Wipro", "Cognizant"],
    question: "Why do we need a Service Registry (like Eureka) in microservices?",
    answer: "In cloud environments, microservice instances scale dynamically, changing IP addresses and port numbers. A Service Registry acts as a database tracking active instances. Services query the registry to discover and route requests to available peers dynamically.",
    checklist: ["Dynamic IP/Port mapping", "Registration on startup", "Discovery during runtime routing"]
  },
  {
    id: 73,
    category: "Microservices",
    level: "Basic",
    title: "API Gateway Purpose",
    companies: ["Capgemini", "Accenture"],
    question: "What is the role of an API Gateway in microservices?",
    answer: "An API Gateway acts as the single entry point for all client requests. It handles routing to downstream microservices, protocol translation, authentication/authorization, rate limiting, and SSL termination, shielding internal network layouts.",
    checklist: ["Single point of entry", "Handles routing, auth, SSL", "Cross-cutting concern consolidation"]
  },
  {
    id: 74,
    category: "Microservices",
    level: "Basic",
    title: "Feign Client",
    companies: ["Tech Mahindra", "Mindtree"],
    question: "What is Feign Client in Spring Cloud?",
    answer: "Feign is a declarative web service client. It simplifies writing REST clients in Spring by allowing developers to define interfaces annotated with Spring MVC annotations, abstracting manual HTTP request execution.",
    checklist: ["Declarative HTTP client", "Interface annotations based", "Integrates with load balancers (Ribbon/LoadBalancer)"]
  },
  {
    id: 75,
    category: "Microservices",
    level: "Basic",
    title: "Docker containerization",
    companies: ["TCS", "Accenture"],
    question: "What is Docker and why is it used in microservices?",
    answer: "Docker packages microservices, runtimes, and dependencies into isolated container images. This ensures consistency across environments (development, staging, production) and simplifies container deployment and scaling.",
    checklist: ["Container isolation", "Eliminates environment drift", "Lightweight compared to VMs"]
  },
  {
    id: 76,
    category: "Microservices",
    level: "Basic",
    title: "Horizontal vs Vertical Scaling",
    companies: ["Infosys", "IBM"],
    question: "Explain the difference between Horizontal and Vertical scaling.",
    answer: "- Vertical Scaling (Scale Up): Adding resources (CPU, RAM) to a single server instance. Bounded by hardware limits.\n- Horizontal Scaling (Scale Out): Adding more server nodes to a cluster, distributing load using load balancers (highly elastic).",
    checklist: ["Scale up (add resource) vs scale out (add instances)", "Hardware limitation bounds", "Distributed state management challenges"]
  },
  {
    id: 77,
    category: "Microservices",
    level: "Basic",
    title: "Spring Cloud Config Server",
    companies: ["Cognizant", "LTI"],
    question: "What is Spring Cloud Config Server?",
    answer: "Config Server provides centralized configuration management for microservice architectures. It stores environment properties in a Git repository or database and serves them to client microservices at startup.",
    checklist: ["Centralized configurations", "Version-controlled (Git) properties", "Hot reload updates using /actuator/refresh"]
  },
  {
    id: 78,
    category: "Microservices",
    level: "Basic",
    title: "Container vs Virtual Machine",
    companies: ["Wipro", "DXC"],
    question: "How does a Docker Container differ from a Virtual Machine (VM)?",
    answer: "VMs run a full Guest OS on top of a hypervisor, consuming significant resources. Containers share the host OS kernel and isolate user space using cgroups and namespaces, resulting in rapid startup and minimal resource usage.",
    checklist: ["Hypervisor and Guest OS overhead (VM)", "Host kernel sharing (Container)", "Fast boot times & resource efficiency"]
  },
  {
    id: 79,
    category: "Microservices",
    level: "Basic",
    title: "Docker Compose",
    companies: ["TCS", "L&T"],
    question: "What is Docker Compose?",
    answer: "Docker Compose is a tool for defining and running multi-container Docker applications. It uses YAML files to configure application services, networks, and volumes, launching all containers with a single command.",
    checklist: ["YAML multi-container definition", "Single-command deployment: docker-compose up", "Simplifies local development environments"]
  },
  {
    id: 80,
    category: "Microservices",
    level: "Basic",
    title: "Docker Volumes",
    companies: ["Capgemini", "Infosys"],
    question: "Why do we need Docker Volumes?",
    answer: "Docker containers are ephemeral (data is lost when container stops). Volumes map container directories to the host filesystem, persisting database records and application files outside the container lifecycle.",
    checklist: ["Data persistence across container cycles", "Host filesystem mapping", "Volume sharing among containers"]
  },

  // --- MICROSERVICES (INTERMEDIATE) ---
  {
    id: 81,
    category: "Microservices",
    level: "Intermediate",
    title: "Circuit Breaker Pattern",
    companies: ["Netflix", "Amazon", "Uber"],
    question: "Explain the Circuit Breaker pattern and its states.",
    answer: "The Circuit Breaker pattern prevents cascading failures. States:\n1. CLOSED: Normal operation. Requests route to destination.\n2. OPEN: Errors exceed threshold. Requests fail immediately, routing to fallbacks.\n3. HALF-OPEN: Periodically sends probe requests to check service health; closes circuit if successful, opens if failed.",
    checklist: ["Prevents cascading failures", "States: CLOSED, OPEN, HALF-OPEN", "Resilience4j implementation in Spring"]
  },
  {
    id: 82,
    category: "Microservices",
    level: "Intermediate",
    title: "Asynchronous Message Broker",
    companies: ["Walmart", "LinkedIn"],
    question: "Why use Message Brokers (Kafka/RabbitMQ) in microservices?",
    answer: "Message Brokers enable asynchronous communication. Instead of blocking HTTP calls, services publish events to queues/topics. This decouples services, buffers spikes in traffic, and improves availability (consumers process messages at their own pace).",
    checklist: ["Asynchronous communication", "Loose coupling of systems", "Traffic spike buffering"]
  },
  {
    id: 83,
    category: "Microservices",
    level: "Intermediate",
    title: "Idempotency in Distributed Systems",
    companies: ["Stripe", "PayPal"],
    question: "What is idempotency and why is it critical in distributed payments?",
    answer: "An operation is idempotent if executing it multiple times yields the same result. In distributed systems, network timeouts can cause clients to retry requests. Payment services verify idempotency using request keys (e.g. UUIDs) to prevent duplicate charges.",
    checklist: ["Multiple execution safety", "Idempotency keys matching", "Critical for API retries and payment pipelines"]
  },
  {
    id: 84,
    category: "Microservices",
    level: "Intermediate",
    title: "Database-Per-Service Pattern",
    companies: ["Amazon", "Netflix"],
    question: "What is the Database-Per-Service pattern and what are its challenges?",
    answer: "Each microservice manages its own private database. This ensures loose coupling and allows services to choose optimal databases (e.g. SQL for orders, NoSQL for catalog). Challenges: Handling joins across services and managing distributed transactions.",
    checklist: ["No shared databases", "Polyglot persistence support", "Distributed joins & transaction challenges"]
  },
  {
    id: 85,
    category: "Microservices",
    level: "Intermediate",
    title: "Docker Image Layering",
    companies: ["Google", "RedHat"],
    question: "How does Docker Image layering work and how do you optimize it?",
    answer: "Dockerfiles compile layer-by-layer. Each instruction (RUN, COPY) creates a read-only layer. Docker caches layers during builds. Optimization: Place frequently changing instructions (like COPY code) at the bottom, and static configurations (like JDK setup) at the top.",
    checklist: ["Read-only image layers", "Build cache utilization", "Multi-stage builds to reduce image size"]
  },

  // --- MICROSERVICES (ADVANCED) ---
  {
    id: 86,
    category: "Microservices",
    level: "Advanced",
    title: "Saga Pattern Distributed Transactions",
    companies: ["Uber", "Amazon"],
    question: "Explain the Saga Pattern and contrast Orchestration vs Choreography.",
    answer: "A Saga coordinates distributed transactions across services. Each service commits locally. If a downstream step fails, Saga runs Compensating Transactions in reverse order.\n- Choreography: Event-driven. Services listen and publish events asynchronously.\n- Orchestration: Centralized. A controller maps and routes execution steps.",
    checklist: ["Compensating transaction rollbacks", "Event-driven Choreography", "Orchestrated coordinator workflows"]
  },
  {
    id: 87,
    category: "Microservices",
    level: "Advanced",
    title: "CQRS Pattern",
    companies: ["Netflix", "Microsoft"],
    question: "What is CQRS (Command Query Responsibility Segregation)?",
    answer: "CQRS splits write operations (Commands: inserts, updates) from read operations (Queries: SELECTs). They run on separate database instances. Command writes sync to read databases asynchronously using message queues, optimizing read/write throughput.",
    checklist: ["Segregation of read/write databases", "High read-throughput optimization", "Eventually consistent updates via event streams"]
  },
  {
    id: 88,
    category: "Microservices",
    level: "Advanced",
    title: "Event Sourcing",
    companies: ["Stripe", "Uber"],
    question: "What is Event Sourcing?",
    answer: "Instead of storing current state, Event Sourcing records all state modifications as an immutable sequence of events in an Event Store. The current application state is reconstructed by replaying the events from the beginning of the sequence.",
    checklist: ["Immutable event sequence log", "Audit log and history generation", "Replay mechanism for state recovery"]
  },
  {
    id: 89,
    category: "Microservices",
    level: "Advanced",
    title: "Distributed Tracing: Sleuth & Zipkin",
    companies: ["Amazon", "Uber"],
    question: "How do you trace client requests across multiple microservices?",
    answer: "Use Distributed Tracing (e.g. Spring Cloud Sleuth, Zipkin, OpenTelemetry). The API Gateway injects trace IDs and span IDs into HTTP/Kafka headers. Downstream services propagate these IDs in logs, allowing tracing tools to map call latency across services.",
    checklist: ["Trace ID vs Span ID", "Propagation via HTTP headers", "Zipkin latency tracking graphs"]
  },
  {
    id: 90,
    category: "Microservices",
    level: "Advanced",
    title: "Outbox Pattern for Event Publishing",
    companies: ["Uber", "Salesforce"],
    question: "What is the Transactional Outbox pattern and what problem does it solve?",
    answer: "When updating a database and publishing Kafka events, a network error during event publishing can lead to data inconsistency. Outbox solves this by writing the event directly to an 'Outbox' table in the same database transaction. A separate process polls this table and publishes events asynchronously.",
    checklist: ["Database and event queue consistency", "Atomic local transactions", "Debezium/CDC polling configurations"]
  },

  // --- SYSTEM DESIGN (BASIC) ---
  {
    id: 91,
    category: "System Design",
    level: "Basic",
    title: "Load Balancer Purpose",
    companies: ["TCS", "Accenture"],
    question: "What is a Load Balancer and where does it sit in an architecture?",
    answer: "A Load Balancer distributes incoming network traffic across multiple backend servers to prevent server overload and ensure high availability. It sits between the client and the web servers.",
    checklist: ["Distributes application traffic", "Sits between client and servers", "Implements round-robin or least-connections routing"]
  },
  {
    id: 92,
    category: "System Design",
    level: "Basic",
    title: "Cache Concept",
    companies: ["Infosys", "Wipro"],
    question: "What is Caching and why is it used?",
    answer: "Caching stores copies of frequently accessed data in fast memory (e.g., RAM) to reduce data retrieval latency. It avoids repeating expensive operations (like database queries or API calls).",
    checklist: ["Fast access memory store", "Reduces server load", "Implements eviction policies (LRU)"]
  },
  {
    id: 93,
    category: "System Design",
    level: "Basic",
    title: "SQL vs NoSQL Databases",
    companies: ["Cognizant", "Capgemini"],
    question: "What are the key differences between SQL and NoSQL databases?",
    answer: "SQL databases are relational, table-based, schemas-bound, and support ACID transactions. They scale vertically. \nNoSQL databases are non-relational, document/key-value based, schema-less, eventually consistent (BASE), and scale horizontally.",
    checklist: ["Structured tables (SQL) vs Document/Key-Value (NoSQL)", "Strict schema vs Dynamic schema", "Vertical scaling vs Horizontal scaling"]
  },
  {
    id: 94,
    category: "System Design",
    level: "Basic",
    title: "DNS Purpose",
    companies: ["Accenture", "IBM"],
    question: "What is DNS (Domain Name System)?",
    answer: "DNS acts as the phonebook of the internet. It translates human-readable domain names (e.g. google.com) into machine-readable IP addresses (e.g. 142.250.190.46) so browsers can load internet resources.",
    checklist: ["Translates domain names to IP addresses", "Hierarchical database structure", "Implements DNS caching"]
  },
  {
    id: 95,
    category: "System Design",
    level: "Basic",
    title: "CDN (Content Delivery Network)",
    companies: ["TCS", "Wipro"],
    question: "What is a CDN and what does it store?",
    answer: "A CDN is a geographically distributed network of proxy servers. It caches static assets (images, CSS, JS, videos) close to user locations, reducing page load latency and saving server bandwidth.",
    checklist: ["Geographically distributed servers", "Caches static web assets", "Reduces load on origin servers"]
  },
  {
    id: 96,
    category: "System Design",
    level: "Basic",
    title: "Monolithic Database Bottleneck",
    companies: ["Cognizant", "Infosys"],
    question: "Why does a shared database bottleneck microservice architectures?",
    answer: "A shared database creates a single point of failure and tightly couples services. If one service locks tables or runs heavy queries, it blocks other services, defeating the purpose of service isolation.",
    checklist: ["Single point of failure", "Tightly couples data models", "Database connection pool exhaustion risk"]
  },
  {
    id: 97,
    category: "System Design",
    level: "Basic",
    title: "Vertical Scaling CPU Limit",
    companies: ["HCL", "TCS"],
    question: "What is the hardware limitation of vertical scaling?",
    answer: "Vertical scaling is limited by physical hardware bounds (maximum CPU sockets, RAM slots, motherboard bus speeds). Once reached, the server cannot scale further, and cost scales non-linearly.",
    checklist: ["Physical hardware boundaries", "Non-linear pricing model", "No high availability redundancy"]
  },
  {
    id: 98,
    category: "System Design",
    level: "Basic",
    title: "REST APIs vs SOAP",
    companies: ["Wipro", "Infosys"],
    question: "Compare REST and SOAP API protocols.",
    answer: "REST is architectural, lightweight, resource-based, and supports multiple formats (JSON, XML). SOAP is an XML-based protocol with strict WSDL contracts and built-in security standards (WS-Security).",
    checklist: ["JSON/XML support (REST) vs XML-only (SOAP)", "Stateless resource mapping vs RPC contracts", "SOAP has built-in transaction safety"]
  },
  {
    id: 99,
    category: "System Design",
    level: "Basic",
    title: "Session Affinity (Sticky Sessions)",
    companies: ["Accenture", "Cognizant"],
    question: "What are Sticky Sessions in load balancing?",
    answer: "Sticky Sessions route all client requests to the same backend server instance for the duration of a session, typically using session cookies. It simplifies session management but complicates load distribution.",
    checklist: ["Binds user session to one server", "Maintains local session states", "Unbalanced load distribution risk"]
  },
  {
    id: 100,
    category: "System Design",
    level: "Basic",
    title: "Stateful vs Stateless Services",
    companies: ["Infosys", "IBM"],
    question: "Why are stateless services preferred in cloud architectures?",
    answer: "Stateless services do not store client session data locally. Every request contains all necessary data. This allows load balancers to route requests to any instance, enabling elastic scaling.",
    checklist: ["No local session storage", "Requests are self-contained", "Enables rapid horizontal scaling"]
  },

  // --- SYSTEM DESIGN (INTERMEDIATE) ---
  {
    id: 101,
    category: "System Design",
    level: "Intermediate",
    title: "CAP Theorem Trade-Offs",
    companies: ["Goldman Sachs", "Amazon", "Microsoft"],
    question: "Explain the CAP Theorem and its application in system design.",
    answer: "The CAP Theorem states that a distributed system can guarantee at most two of: Consistency (all nodes read same data), Availability (every request receives non-error response), and Partition Tolerance (system runs despite network failures). Since network partitions are inevitable in real-world systems, systems must choose between AP (eventual consistency) or CP (strict consistency).",
    checklist: ["Consistency, Availability, Partition Tolerance", "CP database choices (RDBMS, HBase)", "AP database choices (Cassandra, DynamoDB)"]
  },
  {
    id: 102,
    category: "System Design",
    level: "Intermediate",
    title: "Database Indexing: B-Tree vs Hash",
    companies: ["Google", "Oracle"],
    question: "How do database indexes speed up lookups? Contrast B-Tree and Hash indexes.",
    answer: "- B-Tree Index: Balanced tree structure. Speeds up range searches (e.g. salary > 50000) and sorting by maintaining sorted data keys in logarithmic search depth.\n- Hash Index: Uses a hash map lookup. Speeds up exact equality lookups (e.g. id = 5) in O(1) time but does not support range scans.",
    checklist: ["B-Tree supports range queries", "Hash index handles exact matches", "Indexing write penalty overhead"]
  },
  {
    id: 103,
    category: "System Design",
    level: "Intermediate",
    title: "Distributed Caching: Redis vs Memcached",
    companies: ["Netflix", "Amazon"],
    question: "Compare Redis and Memcached for caching.",
    answer: "Memcached is simple, multi-threaded, and optimal for caching static key-value strings. \n\nRedis is single-threaded, supports rich data structures (lists, hashes, sets, sorted sets), offers disk persistence, replication, and transactional scripting, making it suitable for caching and messaging.",
    checklist: ["Data structures: simple strings (Memcached) vs collections (Redis)", "Multi-threaded (Memcached) vs Single-threaded event loop (Redis)", "Redis persistence and replication support"]
  },
  {
    id: 104,
    category: "System Design",
    level: "Intermediate",
    title: "Optimistic vs Pessimistic Database Locking",
    companies: ["Stripe", "PayPal"],
    question: "When do you select Optimistic locking over Pessimistic locking?",
    answer: "- Optimistic Locking: Uses version fields. Best for low-conflict, read-heavy applications to avoid lock overhead.\n- Pessimistic Locking: Uses database-level locks (SELECT FOR UPDATE). Best for high-conflict write operations (e.g. bank account balance adjustments) to prevent update anomalies.",
    checklist: ["Version attribute comparisons (Optimistic)", "Database row locks (Pessimistic)", "ACID isolation boundaries"]
  },
  {
    id: 105,
    category: "System Design",
    level: "Intermediate",
    title: "Consistent Hashing",
    companies: ["Uber", "Amazon"],
    question: "What is Consistent Hashing and why is it used in distributed caches?",
    answer: "Consistent Hashing maps data keys and server nodes to a virtual ring. When a server node is added or removed, it minimizes rehashing by relocating only a fraction of the keys ($K/N$) rather than remapping the entire keyspace.",
    checklist: ["Virtual hashing ring mapping", "Minimizes key movement on node scaling", "Virtual nodes to prevent hot spots"]
  },
  {
    id: 106,
    category: "System Design",
    level: "Intermediate",
    title: "Sharding vs Partitioning",
    companies: ["Facebook", "Twitter"],
    question: "What is the difference between horizontal partitioning and database sharding?",
    answer: "Horizontal partitioning splits rows of a table across multiple tables within the same database instance. \n\nSharding distributes table rows across multiple independent database servers (different physical machines), isolating resources and scale bounds.",
    checklist: ["Partitioning: local instance division", "Sharding: distributed instance allocation", "Sharding lookup key routing"]
  },
  {
    id: 107,
    category: "System Design",
    level: "Intermediate",
    title: "Distributed Lock with Redis",
    companies: ["Airbnb", "Stripe"],
    question: "How do you implement a distributed lock using Redis?",
    answer: "Use `SET lock_key unique_value NX PX 30000` (NX: set if not exists, PX: set expiry). The unique value ensures that a thread only releases the lock it holds by executing a Lua script to compare and delete key atomicly.",
    checklist: ["SET NX PX command", "Automatic expiry to prevent deadlocks", "Lua script for atomic release checks"]
  },
  {
    id: 108,
    category: "System Design",
    level: "Intermediate",
    title: "Rate Limiting Algorithms",
    companies: ["Stripe", "Uber"],
    question: "Name 3 rate limiting algorithms and explain Token Bucket.",
    answer: "Algorithms: Token Bucket, Leaking Bucket, Fixed Window, Sliding Window.\nToken Bucket: Tokens accumulate in a bucket up to capacity. Each incoming request consumes a token. If the bucket is empty, requests are rejected. Allows handling brief bursts of traffic.",
    checklist: ["Token Bucket: handles traffic bursts", "Leaking Bucket: enforces constant outflow rate", "Sliding Window Log: memory intensive"]
  },
  {
    id: 109,
    category: "System Design",
    level: "Intermediate",
    title: "Message Queue: Pull vs Push",
    companies: ["Kafka", "Linkedin"],
    question: "Compare Push vs Pull models in Message Brokers with examples.",
    answer: "- Push (e.g. RabbitMQ): Broker pushes messages to connected consumers as fast as possible. Risk: Overwhelming slow consumers.\n- Pull (e.g. Kafka): Consumers request messages from broker at their own pace, enabling consumer scalability and batch processing.",
    checklist: ["Broker-pushed load (RabbitMQ)", "Consumer-pulled batches (Kafka)", "Consumer backpressure management"]
  },
  {
    id: 110,
    category: "System Design",
    level: "Intermediate",
    title: "Elasticsearch vs RDBMS Search",
    companies: ["Elastic", "Amazon"],
    question: "Why use Elasticsearch instead of SQL LIKE queries for full-text search?",
    answer: "SQL LIKE '%word%' forces full-table scans, degrading performance. Elasticsearch uses an Inverted Index (mapping words to documents), supporting fast full-text searching, fuzzy matches, and relevance scoring.",
    checklist: ["Inverted Index structures", "Tokenization and text analysis", "Fuzzy matching relevance scores"]
  },

  // --- SYSTEM DESIGN (ADVANCED) ---
  {
    id: 111,
    category: "System Design",
    level: "Advanced",
    title: "Designing for idempotency",
    companies: ["Uber", "Stripe"],
    question: "How do you design a high-throughput API to guarantee idempotency?",
    answer: "1. Unique Idempotency Key: Clients send a unique request ID in headers.\n2. Store Execution State: Record the request key, status (processing/completed), and response payload in a database with unique constraints.\n3. Atomic Check-and-Insert: If key exists and is 'processing', reject; if 'completed', return cached response.",
    checklist: ["Unique idempotency constraint", "Distributed lock on request key", "Cached response storage"]
  },
  {
    id: 112,
    category: "System Design",
    level: "Advanced",
    title: "Saga Pattern Compensation",
    companies: ["Amazon", "Netflix"],
    question: "How do you handle compensating transaction failures in a Saga?",
    answer: "If a compensating (rollback) transaction fails, the Saga cannot roll back state automatically. Resolving this requires: 1. Retry loops with exponential backoff. 2. Dead Letter Queues (DLQ) for alerting. 3. Manual intervention/audit dashboards.",
    checklist: ["Idempotent compensation methods", "Retry policies & Dead Letter Queues", "System reconciliation scripts"]
  },
  {
    id: 113,
    category: "System Design",
    level: "Advanced",
    title: "Cache Invalidation Strategies",
    companies: ["Netflix", "Facebook"],
    question: "Explain Cache-Aside, Write-Through, and Write-Behind invalidation strategies.",
    answer: "- Cache-Aside: Application queries cache; on miss, queries DB and updates cache. Writes update DB directly and delete cache keys.\n- Write-Through: Application writes to cache; cache synchronously writes to DB.\n- Write-Behind: Application writes to cache; cache asynchronously writes to DB in batches.",
    checklist: ["Write-Through consistency vs write latency", "Write-Behind batch performance", "Cache-Aside read-miss workflow"]
  },
  {
    id: 114,
    category: "System Design",
    level: "Advanced",
    title: "Microservices Distributed Joins",
    companies: ["Amazon", "Uber"],
    question: "How do you join data across microservices with independent databases?",
    answer: "1. API Composition: Query services separately and join data in memory (API Gateway). Good for small datasets.\n2. CQRS: Aggregate data into a read database via event streaming. Best for high-performance dashboards.",
    checklist: ["API Gateway data stitching", "CQRS denormalized read stores", "Kafka event-driven synchronization"]
  },
  {
    id: 115,
    category: "System Design",
    level: "Advanced",
    title: "Metaspace Leak in Spring Apps",
    companies: ["LinkedIn", "Google"],
    question: "How do dynamic proxy libraries generate Metaspace OOMs in Spring Boot?",
    answer: "Spring features like AOP, @Async, and @Cacheable generate proxy classes dynamically. If code registers custom ClassLoaders repeatedly (e.g. loading configurations dynamically) without garbage collecting discarded loaders, Metaspace native memory gets exhausted, raising OOM.",
    checklist: ["Dynamic proxy subclass registration", "ClassLoader retention leaks", "Metaspace sizing constraints"]
  },

  // --- DSA & PERFORMANCE (BASIC) ---
  {
    id: 116,
    category: "DSA & Collections",
    level: "Basic",
    title: "Big O Notation Concept",
    companies: ["TCS", "Cognizant"],
    question: "What is Big O notation and why is it important?",
    answer: "Big O notation measures algorithm efficiency by describing how execution time or memory usage scales with input size (N) in the worst-case scenario (e.g. O(1), O(log N), O(N), O(N log N), O(N2)).",
    checklist: ["Measures scale efficiency", "Analyzes worst-case scenarios", "Time vs Space complexity metrics"]
  },
  {
    id: 117,
    category: "DSA & Collections",
    level: "Basic",
    title: "Binary Search Time Complexity",
    companies: ["Wipro", "Infosys"],
    question: "What is the time complexity of Binary Search and what is its prerequisite?",
    answer: "Binary Search time complexity is O(log N). Prerequisite: The input array must be sorted. It works by dividing the search range in half on each step.",
    checklist: ["Time complexity O(log N)", "Prerequisite: sorted array", "Divide and conquer iteration"]
  },
  {
    id: 118,
    category: "DSA & Collections",
    level: "Basic",
    title: "LinkedList vs ArrayList",
    companies: ["Capgemini", "Accenture"],
    question: "Compare ArrayList and LinkedList.",
    answer: "ArrayList uses a dynamic array, supporting O(1) random access but incurring O(N) insertion/deletion costs. LinkedList uses node chains, supporting O(1) insert/delete at node references but requiring O(N) search times.",
    checklist: ["ArrayList: O(1) read, O(N) shift write", "LinkedList: O(N) read, O(1) pointer write", "LinkedList node pointer memory overhead"]
  },
  {
    id: 119,
    category: "DSA & Collections",
    level: "Basic",
    title: "Stack vs Queue Data Structures",
    companies: ["TCS", "Cognizant"],
    question: "What is the difference between a Stack and a Queue?",
    answer: "A Stack is LIFO (Last-In-First-Out) where elements are added (push) and removed (pop) from the top.\nA Queue is FIFO (First-In-First-Out) where elements are added (enqueue) at the tail and removed (dequeue) from the head.",
    checklist: ["LIFO (Stack) vs FIFO (Queue)", "Stack operations: push, pop, peek", "Queue operations: offer, poll, peek"]
  },
  {
    id: 120,
    category: "DSA & Collections",
    level: "Basic",
    title: "Binary Tree vs Binary Search Tree",
    companies: ["Infosys", "Wipro"],
    question: "What is the difference between a Binary Tree and a Binary Search Tree (BST)?",
    answer: "A Binary Tree is a tree where each node has at most two children. \nA Binary Search Tree (BST) adds the ordering constraint: for every node, left child values are smaller than parent, and right child values are larger.",
    checklist: ["Node child limit (2)", "BST ordering constraint", "BST average search time O(log N)"]
  },

  // --- DSA & PERFORMANCE (INTERMEDIATE) ---
  {
    id: 121,
    category: "DSA & Collections",
    level: "Intermediate",
    title: "HashMap Internal Structures",
    companies: ["Google", "Microsoft", "Amazon"],
    question: "What happens during a hash collision in a HashMap, and how did Java 8 optimize it?",
    answer: "HashMap handles collisions using bucket lists. Pre-Java 8: Collided keys were appended to a singly-linked list. Search time degraded to O(N).\nJava 8+: If list size exceeds 8 (TREEIFY_THRESHOLD) and map capacity is at least 64, the list converts into a balanced Red-Black Tree, improving lookup times to O(log N).",
    checklist: ["Bucket linked lists", "Treeification threshold (8)", "Red-Black Tree conversion"]
  },
  {
    id: 122,
    category: "DSA & Collections",
    level: "Intermediate",
    title: "Detecting Cycle in LinkedList",
    companies: ["Amazon", "Adobe"],
    question: "How do you detect a cycle in a LinkedList?",
    answer: "Use Floyd's Cycle-Finding Algorithm (Two Pointers). Initialize a slow pointer (moves 1 step) and a fast pointer (moves 2 steps). If there is a cycle, the fast pointer will eventually catch up and meet the slow pointer.",
    checklist: ["Floyd's Cycle algorithm", "Slow and fast pointer movements", "O(N) time, O(1) space complexity"]
  },
  {
    id: 123,
    category: "DSA & Collections",
    level: "Intermediate",
    title: "Quick Sort vs Merge Sort",
    companies: ["Morgan Stanley", "Cisco"],
    question: "Compare Quick Sort and Merge Sort.",
    answer: "- Quick Sort: In-place, average O(N log N) time, worst O(N2) if pivot choices are poor. Uses little extra memory.\n- Merge Sort: Out-of-place, guaranteed O(N log N) time, but requires O(N) helper memory to merge sub-arrays. Stable sorting.",
    checklist: ["In-place (Quick) vs helper memory (Merge)", "Time complexities", "Stable vs unstable sort properties"]
  },
  {
    id: 124,
    category: "DSA & Collections",
    level: "Intermediate",
    title: "BST Balance & AVL Trees",
    companies: ["Oracle", "Goldman Sachs"],
    question: "Why do we need balanced trees (like AVL or Red-Black trees)?",
    answer: "Standard BSTs degrade to O(N) linked lists if keys are inserted in sorted order. Balanced trees automatically rotate nodes during insertions to maintain a tree height of O(log N), guaranteeing O(log N) searches.",
    checklist: ["BST degradation risk", "Self-balancing rotation rules", "AVL balance factor (-1, 0, 1)"]
  },
  {
    id: 125,
    category: "DSA & Collections",
    level: "Intermediate",
    title: "LRU Cache Design",
    companies: ["Goldman Sachs", "Citadel"],
    question: "How do you design a Least Recently Used (LRU) Cache?",
    answer: "Combine a HashMap and a Doubly LinkedList. The HashMap supports O(1) element lookups. The Doubly LinkedList keeps track of usage order: when a key is read/updated, move it to the head. Evict from the tail on capacity overload.",
    checklist: ["HashMap lookup O(1)", "Doubly LinkedList ordering O(1)", "Head insertion, tail eviction"]
  },

  // --- DSA & PERFORMANCE (ADVANCED) ---
  {
    id: 126,
    category: "DSA & Collections",
    level: "Advanced",
    title: "Object Layout Heap Footprint",
    companies: ["Google", "Citadel"],
    question: "How is a Java Object laid out in memory?",
    answer: "Java objects consist of: 1. Object Header (Mark Word + Klass Word). 2. Instance fields (actual data). 3. Padding (aligned to multiples of 8 bytes). 64-bit JVM uses Compressed OOPs (Ordinary Object Pointers) to shrink references from 64 bits to 32 bits under 32GB heaps.",
    checklist: ["Mark Word (64-bit lock/GC metadata)", "Klass Word (metaspace class pointer)", "Compressed OOPs heap alignment limits"]
  },
  {
    id: 127,
    category: "DSA & Collections",
    level: "Advanced",
    title: "Disruptor RingBuffer Cache Lines",
    companies: ["Goldman Sachs", "Citadel"],
    question: "Why does LMAX Disruptor outperform standard BlockingQueues?",
    answer: "Standard queues use locks/CAS, causing CPU cache line bouncing (false sharing). Disruptor uses a pre-allocated RingBuffer with a single sequence counter. It adds 64-byte padding around sequence fields to isolate CPU cache lines, achieving lock-free O(1) operations.",
    checklist: ["CPU Cache line sharing (64 bytes)", "RingBuffer pre-allocation", "Sequence Counter padding to prevent false sharing"]
  },
  {
    id: 128,
    category: "DSA & Collections",
    level: "Advanced",
    title: "Treeify Threshold Selection",
    companies: ["Google", "JPMorgan"],
    question: "Why is TREEIFY_THRESHOLD chosen as 8 in Java HashMap?",
    answer: "Under uniform hash distribution, bucket sizes follow a Poisson distribution. The probability of a bucket size reaching 8 is extremely low ($10^{-8}$). Java chooses 8 to minimize tree conversions while defending against hash DOS collision attacks.",
    checklist: ["Poisson distribution probability", "Treeify at 8, untreeify at 6", "HashMap DOS protection"]
  },
  {
    id: 129,
    category: "DSA & Collections",
    level: "Advanced",
    title: "B-Tree vs B+ Tree",
    companies: ["Uber", "Oracle"],
    question: "Why do databases use B+ Trees instead of standard B-Trees?",
    answer: "In a B+ Tree, data records are stored only in leaf nodes; internal nodes store routing keys. Leaf nodes are linked in a list. This allows leaf range scans without tree traversals, and maximizes keys per internal node, reducing tree depth.",
    checklist: ["Leaf nodes contain all data records", "Leaf-node linked list range scans", "Maximized branching factor"]
  },
  {
    id: 130,
    category: "DSA & Collections",
    level: "Advanced",
    title: "Time complexity of Heap Operations",
    companies: ["Goldman Sachs", "Amazon"],
    question: "What is the time complexity of Heap operations (insert, extract-min)?",
    answer: "In a Binary Heap (PriorityQueue): \n- Insertion is O(log N) as elements bubble up.\n- Extracting the min/max element is O(log N) as the root is replaced and bubbled down.\n- Peeking is O(1).",
    checklist: ["Binary Heap time complexity", "Insert bubble-up O(log N)", "Extract root heapify-down O(log N)"]
  },

  // --- EXPERT QUESTIONS ---
  {
    id: 131,
    category: "Core Java",
    level: "Expert",
    title: "Low-Latency GC Tuning: ZGC Barriers",
    companies: ["Citadel", "Bloomberg"],
    question: "How does ZGC achieve concurrent relocation without Stop-the-World pauses?",
    answer: "ZGC uses Colored Pointers (encoding metadata in the reference address) and Load Barriers. When application code reads a reference, the Load Barrier checks its metadata. If the object is being relocated, the barrier locates the new copy, updates the reference, and returns the object, keeping relocations concurrent.",
    checklist: ["Colored Pointers metadata bits", "Load Barrier reference redirection", "Relocation without thread suspension"]
  },
  {
    id: 132,
    category: "Concurrency",
    level: "Expert",
    title: "Project Loom Carrier Pinning",
    companies: ["Netflix", "Spotify"],
    question: "Explain the stack frame unmounting flow in Virtual Threads and how synchronized blocks break it.",
    answer: "When a virtual thread executes blocking IO, the JVM unmounts its stack frames from the carrier OS thread, saving them to the heap. If execution is within a synchronized block or JNI call, the carrier thread is pinned and blocked, defeating Loom's scaling. ReentrantLock is required to avoid pinning.",
    checklist: ["ForkJoinPool scheduling", "Stack frame migration to Heap", "Thread Pinning: synchronized and JNI"]
  },
  {
    id: 133,
    category: "System Design",
    level: "Expert",
    title: "Saga Choreography Out-of-Order Events",
    companies: ["Uber", "Amazon"],
    question: "How do you handle out-of-order event arrivals in Choreographed Sagas?",
    answer: "Under network latency, a transaction completion event can arrive before its creation event. Solutions:\n1. State Machine checking: Ignore updates that bypass states.\n2. Versioning: Each entity update increments a version; updates are discarded if version requirements are unmet.\n3. Event store query: Check if creation exists.",
    checklist: ["Out-of-order delivery", "Idempotence and transaction state mappings", "Versioning constraints"]
  },
  {
    id: 134,
    category: "Concurrency",
    level: "Expert",
    title: "Memory Barriers & Instruction Reordering Assembly",
    companies: ["Google", "Intel"],
    question: "How do CPU-level memory barriers implement Java volatile variables in x86 architectures?",
    answer: "In x86 CPUs, writes are not reordered with other writes, so StoreStore/LoadStore barriers are free. To enforce the happens-before relationship, x86 compilers implement volatile writes by appending a `lock addl` instruction. This flushes the processor's store buffers, serving as a StoreLoad barrier.",
    checklist: ["x86 memory model bounds", "lock addl assembly instruction", "Store buffer flushing"]
  },
  {
    id: 135,
    category: "System Design",
    level: "Expert",
    title: "Distributed Transaction: Saga vs 2PC Latency",
    companies: ["Citadel", "Uber"],
    question: "Why is 2PC avoided in modern high-throughput architectures?",
    answer: "2PC requires all participating database nodes to lock resources (records/tables) during the prepare phase, holding locks until the final commit. In high-concurrency systems, this synchronous blocking causes lock contention, deadlocks, and limits scalability.",
    checklist: ["Prepare and Commit locks", "Lock hold duration latency", "Cascading failure vulnerability"]
  },
  {
    id: 136,
    category: "Core Java",
    level: "Expert",
    title: "Unsafe Class Memory Manipulations",
    companies: ["Oracle", "Goldman Sachs"],
    question: "What is sun.misc.Unsafe and what are its low-level applications?",
    answer: "Unsafe provides low-level, unsafe memory operations: allocating off-heap memory, modifying private fields directly using memory offsets, and executing CAS instructions. It is used by high-performance libraries like LMAX Disruptor and Netty to bypass JVM memory overhead.",
    checklist: ["Direct off-heap memory allocation", "Memory offset field modifications", "Used in high-throughput network libraries"]
  },
  {
    id: 137,
    category: "System Design",
    level: "Expert",
    title: "Dynamic ClassLoading Leak Diagnosis",
    companies: ["Amazon", "LinkedIn"],
    question: "How do you diagnose a ClassLoader leak from a heap dump?",
    answer: "Generate a heap dump using `jmap`. Open it in Eclipse MAT. Group instances by class loader. Look for class loaders containing multiple loaded classes but marked with zero active references. Inspect the path to GC roots to identify referencing static fields or ThreadLocals.",
    checklist: ["GC root path tracing", "ClassLoader instance counts", "MAT group class loader diagnostics"]
  },
  {
    id: 138,
    category: "System Design",
    level: "Expert",
    title: "Distributed Lock Split-Brain",
    companies: ["Stripe", "Airbnb"],
    question: "What is a Split-Brain scenario in Redis Redlock distributed locks?",
    answer: "Under network partitioning, a client could acquire locks from a subset of Redis master nodes. If another client acquires locks from the remaining nodes due to clock drift or connection drops, both clients believe they hold the lock. Resolution: Use Raft/ZooKeeper consensus locks.",
    checklist: ["Redlock cluster partitioning", "Clock drift synchronization issues", "ZooKeeper ephemeral node alternatives"]
  },
  {
    id: 139,
    category: "System Design",
    level: "Expert",
    title: "Cache Stampede Probabilistic Early Expiry",
    companies: ["Netflix", "Amazon"],
    question: "Explain the XFetch algorithm for preventing Cache Stampede.",
    answer: "XFetch prevents cache stampede probabilistically. Instead of waiting for cache expiration, concurrent threads calculate an early expiration probability based on read speed and DB query time. A random check triggers a background cache update before the key expires.",
    checklist: ["Probabilistic key invalidation", "Background database fetch scheduling", "Prevents thundering herd locks"]
  },
  {
    id: 140,
    category: "DSA & Collections",
    level: "Expert",
    title: "Cache Line False Sharing in Multi-Core CPUs",
    companies: ["Citadel", "Goldman Sachs"],
    question: "What is False Sharing and how is it resolved in Java 8?",
    answer: "False Sharing occurs when two threads modify independent variables residing on the same CPU cache line (64 bytes). The CPU invalidates the cache line for the other core, causing performance drops. Java 8 resolves this with the `@Contended` annotation, adding padding bytes to align variables on separate cache lines.",
    checklist: ["CPU cache line invalidation loops", "64-byte boundary spacing", "@Contended compiler flags"]
  },
  {
    id: 141,
    category: "System Design",
    level: "Expert",
    title: "Double-Checked locking instruction pipeline",
    companies: ["Google", "Intel"],
    question: "Trace x86 CPU memory barriers generated for Java volatile writes.",
    answer: "A volatile write generates a StoreStore barrier (empty on x86) and a StoreLoad barrier. The x86 compiler outputs `lock addl $0, (%esp)` or `mfence`. This flushes the processor's store buffers and invalidates other core caches, enforcing consistency.",
    checklist: ["mfence and sfence instructions", "Store buffer drain execution", "x86 processor bus locks"]
  },
  {
    id: 142,
    category: "System Design",
    level: "Expert",
    title: "Saga Pattern Semantic Locks",
    companies: ["Uber", "Airbnb"],
    question: "How do Saga patterns handle lack of isolation (ACID)?",
    answer: "Sagas commit changes locally, making updates visible to other transactions before the Saga completes (lack of isolation). Solution: Use Semantic Locks (marking records as 'pending-checkout'), enabling application code to reject modifications until Saga finishes.",
    checklist: ["Lack of transaction isolation", "Semantic state flags", "Application-level locking rules"]
  },
  {
    id: 143,
    category: "Concurrency",
    level: "Expert",
    title: "LMAX Disruptor sequencer bitmasks",
    companies: ["Goldman Sachs", "Citadel"],
    question: "How does LMAX Disruptor implement lock-free sequence reading?",
    answer: "The RingBuffer uses a sequence counter. Consumers read sequence states using volatile reads. If a consumer is slower than a producer, it blocks using a WaitStrategy (e.g. Yielding, BusySpin) without sleeping the thread, achieving sub-microsecond latencies.",
    checklist: ["Sequence counter volatile reads", "WaitStrategy options", "Sub-microsecond latency thread spins"]
  },
  {
    id: 144,
    category: "System Design",
    level: "Expert",
    title: "B+ Tree Disk Page Alignments",
    companies: ["Oracle", "Citadel"],
    question: "How do database engines align B+ Trees to SSD disk sectors?",
    answer: "B+ Tree node sizes are matched to physical disk pages (typically 4KB, 8KB, or 16KB). This ensures that a node lookup loads exactly one disk page, minimizing disk read operations.",
    checklist: ["Disk sector sizes", "Single disk read alignments", "Node size configuration settings"]
  },
  {
    id: 145,
    category: "Core Java",
    level: "Expert",
    title: "Escape Analysis & Stack Allocation",
    companies: ["Google", "Oracle"],
    question: "What is Escape Analysis in HotSpot JVM and how does it optimize objects?",
    answer: "Escape Analysis checks if an object reference 'escapes' the scope of its declaring method. If not, HotSpot optimizes allocation by: 1. Stack Allocation: allocating fields directly on the execution stack. 2. Scalar Replacement: decomposing the object into primitive variables. 3. Lock Elision: removing synchronization locks.",
    checklist: ["Scope escape checks", "Stack allocation of objects", "Scalar replacement and lock removal"]
  },
  {
    id: 146,
    category: "System Design",
    level: "Expert",
    title: "Saga Orchestrator Single Point of Failure",
    companies: ["Amazon", "Netflix"],
    question: "How do you make a Saga Orchestrator highly available?",
    answer: "Run the Orchestrator as a stateless service that persists execution state in a highly available, distributed database (e.g., Cassandra). If an orchestrator node crashes, another instance reads the state and resumes the workflow.",
    checklist: ["Stateless orchestrator scaling", "Distributed state storage database", "Event-driven workflow execution resume"]
  },
  {
    id: 147,
    category: "System Design",
    level: "Expert",
    title: "Raft Consensus vs Paxos",
    companies: ["Google", "HashiCorp"],
    question: "Explain the difference between Raft and Paxos consensus protocols.",
    answer: "Raft is leader-centric (decouples leader election, log replication, and safety). It enforces a strict flow direction: logs only flow from leader to followers, making it easier to implement than Paxos, which uses a symmetric peer-to-peer voting model.",
    checklist: ["Leader-centric logs (Raft)", "Multi-phase consensus rounds (Paxos)", "Leader election, replication, and safety phases"]
  },
  {
    id: 148,
    category: "System Design",
    level: "Expert",
    title: "Distributed Caching Write-Behind Inconsistencies",
    companies: ["Facebook", "Netflix"],
    question: "How do you handle database write failures in a Write-Behind cache?",
    answer: "Write-Behind write failures leave cache and database states inconsistent. Solutions: 1. Keep a transaction retry log in the cache. 2. Push write failures to a Dead Letter Queue (DLQ). 3. Fall back to read-through to overwrite cached data.",
    checklist: ["Cache-to-DB sync failures", "Retry logging in cache store", "DLQ alerting and reconciliation"]
  },
  {
    id: 149,
    category: "System Design",
    level: "Expert",
    title: "CAP Theorem Consistency Proofs",
    companies: ["Google", "Citadel"],
    question: "Why is an AP database chosen over a CP database for high-availability systems?",
    answer: "Under network partitioning, a CP database rejects reads/writes to ensure consistency, reducing availability. An AP database accepts requests to ensure availability, resolving conflicts asynchronously (eventual consistency) using protocols like vector clocks.",
    checklist: ["Strict Consistency (CP) vs High Availability (AP)", "Network partitioning behavior", "Asynchronous conflict resolution"]
  },
  {
    id: 150,
    category: "DSA & Collections",
    level: "Expert",
    title: "Red-Black Tree balance rotation proofs",
    companies: ["Google", "Oracle"],
    question: "How do Red-Black Trees guarantee O(log N) search times?",
    answer: "A Red-Black Tree enforces balance properties: 1. Every node is red or black. 2. Root is black. 3. Red nodes cannot have red children. 4. Every path from root to leaves contains the same number of black nodes. This guarantees that the longest path is at most twice the length of the shortest path, keeping search times logarithmic.",
    checklist: ["Red-Black balancing rules", "Restructuring and recoloring", "Longest-to-shortest path ratios"]
  }
];
export default lpaQuestions;
