export const q_61_70 = [
  {
    "id": 61,
    "category": "Spring & JPA",
    "level": "Intermediate",
    "title": "Transactional Propagation Types",
    "companies": [
      "JPMorgan",
      "Wells Fargo"
    ],
    "question": "What are the common propagation behaviors in @Transactional?",
    "answer": "- REQUIRED (Default): Joins current transaction or creates a new one.\n- REQUIRES_NEW: Suspends current transaction and creates a new one.\n- NESTED: Executes inside a nested transaction using savepoints.\n- MANDATORY: Requires an active transaction, otherwise throws exception.",
    "checklist": [
      "REQUIRED vs REQUIRES_NEW",
      "NESTED savepoint rollback behavior",
      "MANDATORY exception handling"
    ]
  },
  {
    "id": 62,
    "category": "Spring & JPA",
    "level": "Intermediate",
    "title": "Spring Security Authentication Flow",
    "companies": [
      "Amazon",
      "PayPal"
    ],
    "question": "How does Spring Security filter requests?",
    "answer": "Spring Security uses a chain of servlet Filters (FilterChainProxy). Key steps: DelegatingFilterProxy intercepts HTTP request, forwards to SecurityFilterChain, extracts credentials using UsernamePasswordAuthenticationFilter, delegates to AuthenticationManager, and verifies via UserDetailsService.",
    "checklist": [
      "DelegatingFilterProxy servlet registration",
      "SecurityContextHolder thread storage",
      "AuthenticationProvider validation"
    ]
  },
  {
    "id": 63,
    "category": "Spring & JPA",
    "level": "Intermediate",
    "title": "JPA Entity States",
    "companies": [
      "Walmart",
      "Stripe"
    ],
    "question": "What are Transient, Persistent, Detached, and Removed entity states in JPA?",
    "answer": "- Transient: New entity, no DB row, not managed by EntityManager.\n- Persistent: Has DB row, managed by active EntityManager. Changes sync on commit.\n- Detached: Has DB row, but EntityManager session has closed.\n- Removed: Scheduled for deletion from DB on session commit.",
    "checklist": [
      "Transient: not managed, no ID",
      "Persistent: managed, dirty checks apply",
      "Detached: requires merge() to re-attach"
    ]
  },
  {
    "id": 64,
    "category": "Spring & JPA",
    "level": "Intermediate",
    "title": "Dirty Checking in Hibernate",
    "companies": [
      "eBay",
      "Cisco"
    ],
    "question": "What is Dirty Checking in Hibernate?",
    "answer": "Dirty Checking is the process where Hibernate automatically detects changes on managed (Persistent) entities during a transaction. During session flush, it compares the current state with the initial snapshot and runs SQL updates without requiring explicit save() calls.",
    "checklist": [
      "Applies only to Persistent state entities",
      "Automatic snapshot comparison",
      "Fires SQL update on flush/commit"
    ]
  },
  {
    "id": 65,
    "category": "Spring & JPA",
    "level": "Intermediate",
    "title": "Spring Boot Actuator",
    "companies": [
      "Netflix",
      "Salesforce"
    ],
    "question": "What is Spring Boot Actuator and why is it used?",
    "answer": "Actuator adds production-ready monitoring capabilities to application services. It exposes REST endpoints (e.g. /actuator/health, /actuator/metrics, /actuator/env) to track application health, database connectivity, and CPU memory usage.",
    "checklist": [
      "Production monitoring endpoints",
      "Health, metrics, thread dumps",
      "Integration with Prometheus/Grafana"
    ]
  },
  {
    "id": 66,
    "category": "Spring & JPA",
    "level": "Advanced",
    "title": "@Transactional Self-Invocation",
    "companies": [
      "Amazon",
      "Uber"
    ],
    "question": "Why does @Transactional fail when calling a transactional method internally from the same class?",
    "answer": "Spring uses AOP proxies to intercept calls and manage transactions. Self-invocation (method A calling method B in the same class) bypasses the proxy container, calling 'this' reference directly. The transaction aspect is never executed. Fix: Split logic into separate service beans or inject the bean proxy.",
    "checklist": [
      "Proxy bypass on internal calls",
      "JDK Dynamic Proxy/CGLIB wrapper limitations",
      "Self-injection lazy resolution"
    ]
  },
  {
    "id": 67,
    "category": "Spring & JPA",
    "level": "Advanced",
    "title": "Transactional Isolation Levels",
    "companies": [
      "Goldman Sachs",
      "Citadel"
    ],
    "question": "Explain the Isolation Levels in @Transactional and their database concurrency trade-offs.",
    "answer": "- READ_UNCOMMITTED: Dirty reads allowed.\n- READ_COMMITTED: Prevents dirty reads (default in most DBs).\n- REPEATABLE_READ: Prevents non-repeatable reads (uses shared locks).\n- SERIALIZABLE: Full isolation, locks rows, prevents phantom reads, blocks concurrency.",
    "checklist": [
      "Dirty reads vs Non-Repeatable reads vs Phantom reads",
      "Optimistic concurrency vs row locks",
      "Serializable throughput penalties"
    ]
  },
  {
    "id": 68,
    "category": "Spring & JPA",
    "level": "Advanced",
    "title": "Hibernate N+1 Query Problem",
    "companies": [
      "JPMorgan",
      "Microsoft"
    ],
    "question": "How do you diagnose and resolve the Hibernate N+1 select query problem?",
    "answer": "Diagnosis: Enable SQL log generation; look for repeated queries. \nResolution:\n1. JOIN FETCH: Load parent and children in 1 query using JOIN FETCH.\n2. EntityGraph: Declare graph templates on repositories.\n3. Batch Fetching: @BatchSize configuration on associations.",
    "checklist": [
      "Repeated database roundtrips",
      "JOIN FETCH query syntax",
      "EntityGraph mapping properties"
    ]
  },
  {
    "id": 69,
    "category": "Spring & JPA",
    "level": "Advanced",
    "title": "Custom BeanPostProcessor",
    "companies": [
      "Goldman Sachs",
      "VMware"
    ],
    "question": "How do you write a custom BeanPostProcessor and when would you use it?",
    "answer": "Implement the BeanPostProcessor interface overriding postProcessBeforeInitialization() or postProcessAfterInitialization(). Used to build custom annotations (e.g. metric track, audit logs) by returning dynamic proxies wrapping target beans.",
    "checklist": [
      "Implement BeanPostProcessor",
      "Interception of bean initialization",
      "Dynamic proxy generation hooks"
    ]
  },
  {
    "id": 70,
    "category": "Spring & JPA",
    "level": "Advanced",
    "title": "Cache Stampede In Spring Cache",
    "companies": [
      "Netflix",
      "Salesforce"
    ],
    "question": "How does Spring Cache handle cache stampede (thundering herd)?",
    "answer": "Set the `sync = true` parameter inside `@Cacheable`. This serializes concurrent requests on a cache miss by locking the thread. The first thread queries the DB and populates the cache; subsequent threads wait and read from cache, protecting database connection pools.",
    "checklist": [
      "sync = true attribute logic",
      "Prevents database request surges on cache expiry",
      "Locks thread executing DB query"
    ]
  }
];
export default q_61_70;
