export const q_81_90 = [
  {
    "id": 81,
    "category": "Microservices",
    "level": "Intermediate",
    "title": "Circuit Breaker Pattern",
    "companies": [
      "Netflix",
      "Amazon",
      "Uber"
    ],
    "question": "Explain the Circuit Breaker pattern and its states.",
    "answer": "The Circuit Breaker pattern prevents cascading failures. States:\n1. CLOSED: Normal operation. Requests route to destination.\n2. OPEN: Errors exceed threshold. Requests fail immediately, routing to fallbacks.\n3. HALF-OPEN: Periodically sends probe requests to check service health; closes circuit if successful, opens if failed.",
    "checklist": [
      "Prevents cascading failures",
      "States: CLOSED, OPEN, HALF-OPEN",
      "Resilience4j implementation in Spring"
    ]
  },
  {
    "id": 82,
    "category": "Microservices",
    "level": "Intermediate",
    "title": "Asynchronous Message Broker",
    "companies": [
      "Walmart",
      "LinkedIn"
    ],
    "question": "Why use Message Brokers (Kafka/RabbitMQ) in microservices?",
    "answer": "Message Brokers enable asynchronous communication. Instead of blocking HTTP calls, services publish events to queues/topics. This decouples services, buffers spikes in traffic, and improves availability (consumers process messages at their own pace).",
    "checklist": [
      "Asynchronous communication",
      "Loose coupling of systems",
      "Traffic spike buffering"
    ]
  },
  {
    "id": 83,
    "category": "Microservices",
    "level": "Intermediate",
    "title": "Idempotency in Distributed Systems",
    "companies": [
      "Stripe",
      "PayPal"
    ],
    "question": "What is idempotency and why is it critical in distributed payments?",
    "answer": "An operation is idempotent if executing it multiple times yields the same result. In distributed systems, network timeouts can cause clients to retry requests. Payment services verify idempotency using request keys (e.g. UUIDs) to prevent duplicate charges.",
    "checklist": [
      "Multiple execution safety",
      "Idempotency keys matching",
      "Critical for API retries and payment pipelines"
    ]
  },
  {
    "id": 84,
    "category": "Microservices",
    "level": "Intermediate",
    "title": "Database-Per-Service Pattern",
    "companies": [
      "Amazon",
      "Netflix"
    ],
    "question": "What is the Database-Per-Service pattern and what are its challenges?",
    "answer": "Each microservice manages its own private database. This ensures loose coupling and allows services to choose optimal databases (e.g. SQL for orders, NoSQL for catalog). Challenges: Handling joins across services and managing distributed transactions.",
    "checklist": [
      "No shared databases",
      "Polyglot persistence support",
      "Distributed joins & transaction challenges"
    ]
  },
  {
    "id": 85,
    "category": "Microservices",
    "level": "Intermediate",
    "title": "Docker Image Layering",
    "companies": [
      "Google",
      "RedHat"
    ],
    "question": "How does Docker Image layering work and how do you optimize it?",
    "answer": "Dockerfiles compile layer-by-layer. Each instruction (RUN, COPY) creates a read-only layer. Docker caches layers during builds. Optimization: Place frequently changing instructions (like COPY code) at the bottom, and static configurations (like JDK setup) at the top.",
    "checklist": [
      "Read-only image layers",
      "Build cache utilization",
      "Multi-stage builds to reduce image size"
    ]
  },
  {
    "id": 86,
    "category": "Microservices",
    "level": "Advanced",
    "title": "Saga Pattern Distributed Transactions",
    "companies": [
      "Uber",
      "Amazon"
    ],
    "question": "Explain the Saga Pattern and contrast Orchestration vs Choreography.",
    "answer": "A Saga coordinates distributed transactions across services. Each service commits locally. If a downstream step fails, Saga runs Compensating Transactions in reverse order.\n- Choreography: Event-driven. Services listen and publish events asynchronously.\n- Orchestration: Centralized. A controller maps and routes execution steps.",
    "checklist": [
      "Compensating transaction rollbacks",
      "Event-driven Choreography",
      "Orchestrated coordinator workflows"
    ]
  },
  {
    "id": 87,
    "category": "Microservices",
    "level": "Advanced",
    "title": "CQRS Pattern",
    "companies": [
      "Netflix",
      "Microsoft"
    ],
    "question": "What is CQRS (Command Query Responsibility Segregation)?",
    "answer": "CQRS splits write operations (Commands: inserts, updates) from read operations (Queries: SELECTs). They run on separate database instances. Command writes sync to read databases asynchronously using message queues, optimizing read/write throughput.",
    "checklist": [
      "Segregation of read/write databases",
      "High read-throughput optimization",
      "Eventually consistent updates via event streams"
    ]
  },
  {
    "id": 88,
    "category": "Microservices",
    "level": "Advanced",
    "title": "Event Sourcing",
    "companies": [
      "Stripe",
      "Uber"
    ],
    "question": "What is Event Sourcing?",
    "answer": "Instead of storing current state, Event Sourcing records all state modifications as an immutable sequence of events in an Event Store. The current application state is reconstructed by replaying the events from the beginning of the sequence.",
    "checklist": [
      "Immutable event sequence log",
      "Audit log and history generation",
      "Replay mechanism for state recovery"
    ]
  },
  {
    "id": 89,
    "category": "Microservices",
    "level": "Advanced",
    "title": "Distributed Tracing: Sleuth & Zipkin",
    "companies": [
      "Amazon",
      "Uber"
    ],
    "question": "How do you trace client requests across multiple microservices?",
    "answer": "Use Distributed Tracing (e.g. Spring Cloud Sleuth, Zipkin, OpenTelemetry). The API Gateway injects trace IDs and span IDs into HTTP/Kafka headers. Downstream services propagate these IDs in logs, allowing tracing tools to map call latency across services.",
    "checklist": [
      "Trace ID vs Span ID",
      "Propagation via HTTP headers",
      "Zipkin latency tracking graphs"
    ]
  },
  {
    "id": 90,
    "category": "Microservices",
    "level": "Advanced",
    "title": "Outbox Pattern for Event Publishing",
    "companies": [
      "Uber",
      "Salesforce"
    ],
    "question": "What is the Transactional Outbox pattern and what problem does it solve?",
    "answer": "When updating a database and publishing Kafka events, a network error during event publishing can lead to data inconsistency. Outbox solves this by writing the event directly to an 'Outbox' table in the same database transaction. A separate process polls this table and publishes events asynchronously.",
    "checklist": [
      "Database and event queue consistency",
      "Atomic local transactions",
      "Debezium/CDC polling configurations"
    ]
  }
];
export default q_81_90;
