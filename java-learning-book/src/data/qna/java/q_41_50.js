export const q_41_50 = [
  {
    "id": 41,
    "category": "Concurrency",
    "level": "Advanced",
    "title": "Double-Checked Locking (DCL)",
    "companies": [
      "Microsoft",
      "Google"
    ],
    "question": "Why is volatile required in Double-Checked Locking implementation?",
    "answer": "Object creation is not atomic: it allocates memory, runs constructor, and assigns the reference. Without volatile, instruction reordering can cause a thread to read a non-null reference to a partially initialized object, raising NullPointerExceptions. Volatile introduces memory fences to prevent reordering.",
    "checklist": [
      "Memory allocation order",
      "Partial initialization risk",
      "Instruction reordering prevention"
    ]
  },
  {
    "id": 42,
    "category": "Concurrency",
    "level": "Advanced",
    "title": "ThreadLocal Memory Leak",
    "companies": [
      "Goldman Sachs",
      "Amazon"
    ],
    "question": "How do ThreadLocal variables cause memory leaks in Application Servers?",
    "answer": "ThreadLocal maps variables to the executing Thread. In app servers, threads are reused in thread pools. If a classloader loads a ThreadLocal value and the thread returns to the pool without calling remove(), the value and its classloader cannot be garbage collected, creating a Metaspace OOM.",
    "checklist": [
      "WeakReference keys in ThreadLocalMap",
      "Thread reuse in application pools",
      "Always invoke remove() in finally block"
    ]
  },
  {
    "id": 43,
    "category": "Concurrency",
    "level": "Advanced",
    "title": "ForkJoinPool & Work Stealing",
    "companies": [
      "Google",
      "Citadel"
    ],
    "question": "Explain the Work-Stealing algorithm in ForkJoinPool.",
    "answer": "ForkJoinPool uses a work-stealing algorithm. Every worker thread has its own double-ended queue (deque) of tasks. If a worker thread finishes its tasks, it steals tasks from the back of another busy thread's deque, minimizing thread idle time and optimizing multi-core utilization.",
    "checklist": [
      "Double-ended queues (deques)",
      "Stealing from queue tail",
      "Used by Parallel Streams under the hood"
    ]
  },
  {
    "id": 44,
    "category": "Concurrency",
    "level": "Advanced",
    "title": "ConcurrentHashMap Segmentation",
    "companies": [
      "JPMorgan",
      "eBay"
    ],
    "question": "How does ConcurrentHashMap achieve thread safety in Java 8?",
    "answer": "Java 8 ConcurrentHashMap uses node-level locking. It locks only the head node of a bucket during updates using synchronized or CAS. Readers can access bucket data without locks, minimizing contention compared to Java 7's Segment-locking model.",
    "checklist": [
      "Node-level locks (synchronized on bucket head)",
      "Lock-free reads",
      "CAS (Compare-and-Swap) updates"
    ]
  },
  {
    "id": 45,
    "category": "Concurrency",
    "level": "Advanced",
    "title": "ABA Problem in Concurrency",
    "companies": [
      "Citadel",
      "Goldman Sachs"
    ],
    "question": "What is the ABA problem in CAS operations, and how do you prevent it?",
    "answer": "The ABA problem occurs when a thread reads a value 'A', another thread changes it to 'B' and back to 'A', and the first thread's CAS operation succeeds because the value is still 'A', unaware of the intermediate state change. Prevention: Use StampReferences (e.g. AtomicStampedReference) containing version numbers.",
    "checklist": [
      "CAS value validation vulnerability",
      "Object state change omission",
      "AtomicStampedReference version tagging"
    ]
  },
  {
    "id": 46,
    "category": "Spring & JPA",
    "level": "Basic",
    "title": "Spring IoC Container",
    "companies": [
      "TCS",
      "Wipro"
    ],
    "question": "What is Spring IoC (Inversion of Control) and Dependency Injection?",
    "answer": "IoC is a design principle where the control of object creation, dependency management, and lifecycle is delegated to the framework (the IoC Container) rather than the application code. Dependency Injection (DI) is the pattern used to supply dependencies to a class at runtime.",
    "checklist": [
      "Delegation of object lifecycle",
      "Inversion of object creation control",
      "DI via Setter, Constructor, or Field"
    ]
  },
  {
    "id": 47,
    "category": "Spring & JPA",
    "level": "Basic",
    "title": "Spring Bean Scopes",
    "companies": [
      "Infosys",
      "Cognizant"
    ],
    "question": "What are the different bean scopes in Spring?",
    "answer": "1. Singleton (Default): One instance per IoC container.\n2. Prototype: New instance on every request.\n3. Request: One instance per HTTP request (Web context).\n4. Session: One instance per HTTP session.\n5. Application: One instance per ServletContext.",
    "checklist": [
      "Singleton vs Prototype",
      "Web scopes: request, session, application",
      "Scope inheritance limits"
    ]
  },
  {
    "id": 48,
    "category": "Spring & JPA",
    "level": "Basic",
    "title": "Autowired Annotation",
    "companies": [
      "Capgemini",
      "Accenture"
    ],
    "question": "What does @Autowired do in Spring, and what are its resolution modes?",
    "answer": "@Autowired instructs Spring to resolve and inject a matching bean into a field, setter, or constructor. Resolution modes: byType (default), byName (using @Qualifier if types overlap).",
    "checklist": [
      "Injects managed Spring bean",
      "Resolution by type, then name",
      "Required attribute options"
    ]
  },
  {
    "id": 49,
    "category": "Spring & JPA",
    "level": "Basic",
    "title": "Constructor vs Setter Injection",
    "companies": [
      "IBM",
      "Tech Mahindra"
    ],
    "question": "Why is Constructor Injection preferred over Field Injection?",
    "answer": "1. Immutability: Dependencies can be declared as final.\n2. Testability: Allows instantiating classes in unit tests without Spring context initialization.\n3. Safe Construction: Prevents NullPointerExceptions by ensuring dependencies are supplied at instantiation.",
    "checklist": [
      "Supports final fields",
      "No Spring context dependency in unit tests",
      "Prevents circular dependencies at startup"
    ]
  },
  {
    "id": 50,
    "category": "Spring & JPA",
    "level": "Basic",
    "title": "Spring Boot vs Spring Framework",
    "companies": [
      "TCS",
      "Infosys"
    ],
    "question": "What is the difference between Spring and Spring Boot?",
    "answer": "Spring Framework provides core infrastructure (IoC, AOP, MVC) but requires manual XML or Java configuration. Spring Boot is an opinionated extension that offers auto-configuration, starter POMs, and embedded servers (Tomcat), enabling rapid development.",
    "checklist": [
      "Core framework vs boot wrapper",
      "Starter POM dependencies",
      "Embedded application servers"
    ]
  }
];
export default q_41_50;
