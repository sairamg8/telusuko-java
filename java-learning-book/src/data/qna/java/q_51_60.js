export const q_51_60 = [
  {
    "id": 51,
    "category": "Spring & JPA",
    "level": "Basic",
    "title": "Component Stereotype Annotations",
    "companies": [
      "Wipro",
      "Cognizant"
    ],
    "question": "Differentiate between @Component, @Service, @Repository, and @Controller.",
    "answer": "- @Component: Generic stereotype for any Spring-managed bean.\n- @Service: Represents business logic.\n- @Repository: Handles database access (translates JDBC/database exceptions).\n- @Controller: Defines MVC controllers handling client requests.",
    "checklist": [
      "Component is base stereotype",
      "Service is business layer",
      "Repository translates database exceptions"
    ]
  },
  {
    "id": 52,
    "category": "Spring & JPA",
    "level": "Basic",
    "title": "Spring Boot Starter POMs",
    "companies": [
      "Tech Mahindra",
      "Mindtree"
    ],
    "question": "What are Spring Boot Starters?",
    "answer": "Starters are convenience dependency descriptors that group related library imports into a single artifact (e.g. spring-boot-starter-web), resolving dependency compatibility issues.",
    "checklist": [
      "Groups transitive dependencies",
      "Resolves version conflicts",
      "Examples: web, data-jpa, security"
    ]
  },
  {
    "id": 53,
    "category": "Spring & JPA",
    "level": "Basic",
    "title": "JPA vs Hibernate",
    "companies": [
      "Cognizant",
      "LTI"
    ],
    "question": "What is the difference between JPA and Hibernate?",
    "answer": "JPA (Java Persistence API) is a specification containing interfaces and metadata rules. Hibernate is a concrete Object-Relational Mapping (ORM) library that implements the JPA specification.",
    "checklist": [
      "Specification (JPA) vs Implementation (Hibernate)",
      "JPA contains EntityManager",
      "Hibernate contains SessionFactory"
    ]
  },
  {
    "id": 54,
    "category": "Spring & JPA",
    "level": "Basic",
    "title": "Spring Boot application.properties",
    "companies": [
      "Wipro",
      "TCS"
    ],
    "question": "What is the purpose of application.properties or application.yml?",
    "answer": "These files define application configuration settings (port, database credentials, logging levels, active profiles), separating runtime configurations from the compiled code.",
    "checklist": [
      "Runtime configuration settings",
      "YAML vs Properties syntax",
      "Supports environment variable injection"
    ]
  },
  {
    "id": 55,
    "category": "Spring & JPA",
    "level": "Basic",
    "title": "Spring profiles",
    "companies": [
      "Infosys",
      "IBM"
    ],
    "question": "What are Spring Profiles, and how do you use them?",
    "answer": "Profiles allow segregating configurations for different environments (e.g. dev, test, prod). You load specific properties using: `spring.profiles.active=prod`.",
    "checklist": [
      "Environment segregation",
      "Conditional bean loading: @Profile",
      "Properties suffix matching: application-dev.properties"
    ]
  },
  {
    "id": 56,
    "category": "Spring & JPA",
    "level": "Intermediate",
    "title": "Bean Lifecycle Steps",
    "companies": [
      "VMware",
      "Expedia"
    ],
    "question": "Explain the Spring Bean lifecycle phases.",
    "answer": "1. Instantiation (Constructor execution).\n2. Populate Properties (Dependency Injection).\n3. Aware Interfaces: BeanNameAware, BeanFactoryAware.\n4. BeanPostProcessor: postProcessBeforeInitialization().\n5. Initialization: @PostConstruct or afterPropertiesSet().\n6. BeanPostProcessor: postProcessAfterInitialization() (Proxy wraps occur here).\n7. Ready for use.\n8. Destruction: @PreDestroy or destroy().",
    "checklist": [
      "Instantiation -> Injection -> Initialization -> Destruction",
      "BeanPostProcessor hook points",
      "Aware interface calls"
    ]
  },
  {
    "id": 57,
    "category": "Spring & JPA",
    "level": "Intermediate",
    "title": "Dynamic Proxy: JDK vs CGLIB",
    "companies": [
      "Amazon",
      "Goldman Sachs"
    ],
    "question": "How does Spring generate proxies for target beans?",
    "answer": "- JDK Dynamic Proxy: Used if target class implements interfaces. Uses reflection to create runtime proxies.\n- CGLIB Proxy: Used if target class has no interfaces. Uses subclassing (ASM bytecode generation) to override methods at runtime.",
    "checklist": [
      "JDK Dynamic Proxy: interface required",
      "CGLIB Proxy: subclassing based",
      "cglib is default in Spring Boot 2+"
    ]
  },
  {
    "id": 58,
    "category": "Spring & JPA",
    "level": "Intermediate",
    "title": "Hibernate First vs Second Level Cache",
    "companies": [
      "JPMorgan",
      "Barclays"
    ],
    "question": "Explain the differences between First and Second Level caches in Hibernate.",
    "answer": "- First Level Cache: Session-scoped (default). Stores persistent objects within the current Hibernate transaction Session.\n- Second Level Cache: SessionFactory-scoped (optional). Shared across sessions, typically backed by EhCache or Redis to avoid database hits for static read data.",
    "checklist": [
      "First Level: Session scope, non-disableable",
      "Second Level: SessionFactory scope, shared",
      "Invalidation issues on batch writes"
    ]
  },
  {
    "id": 59,
    "category": "Spring & JPA",
    "level": "Intermediate",
    "title": "LazyInitializationException Diagnosis",
    "companies": [
      "Microsoft",
      "Oracle"
    ],
    "question": "Why does LazyInitializationException occur, and how do you resolve it?",
    "answer": "It occurs when the application accesses a lazy-loaded association (e.g. client.getOrders()) after the Hibernate Session has closed. Resolution: Use JOIN FETCH in queries, define EntityGraphs, or keep transactions active using @Transactional.",
    "checklist": [
      "Accessing association on detached entity",
      "Closed persistence context Session",
      "JOIN FETCH or EntityGraph resolution"
    ]
  },
  {
    "id": 60,
    "category": "Spring & JPA",
    "level": "Intermediate",
    "title": "Spring AOP Concepts",
    "companies": [
      "Visa",
      "Citi"
    ],
    "question": "Define Advice, Aspect, Pointcut, and JoinPoint in Spring AOP.",
    "answer": "- Aspect: Module containing cross-cutting concerns (e.g., logging).\n- JoinPoint: Execution point in application (e.g., method execution).\n- Pointcut: Expression matching target JoinPoints.\n- Advice: Action taken at a JoinPoint (Before, After, Around).",
    "checklist": [
      "Aspect = Pointcut + Advice",
      "JoinPoint represents target runtime hook",
      "Pointcut syntax matching"
    ]
  }
];
export default q_51_60;
