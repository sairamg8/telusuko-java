export const q_71_80 = [
  {
    "id": 71,
    "category": "Microservices",
    "level": "Basic",
    "title": "Monolith vs Microservices",
    "companies": [
      "TCS",
      "Infosys"
    ],
    "question": "What is the difference between monolithic and microservice architectures?",
    "answer": "A Monolithic application houses all business components, databases, and UI configurations in a single deployable code package. \n\nMicroservices decouple business components into separate, lightweight services that communicate over APIs, allowing independent scaling, deployment, and localized database management.",
    "checklist": [
      "Single deployment package (Monolith)",
      "Decoupled independent domains (Microservices)",
      "Network latency trade-offs"
    ]
  },
  {
    "id": 72,
    "category": "Microservices",
    "level": "Basic",
    "title": "Service Discovery Need",
    "companies": [
      "Wipro",
      "Cognizant"
    ],
    "question": "Why do we need a Service Registry (like Eureka) in microservices?",
    "answer": "In cloud environments, microservice instances scale dynamically, changing IP addresses and port numbers. A Service Registry acts as a database tracking active instances. Services query the registry to discover and route requests to available peers dynamically.",
    "checklist": [
      "Dynamic IP/Port mapping",
      "Registration on startup",
      "Discovery during runtime routing"
    ]
  },
  {
    "id": 73,
    "category": "Microservices",
    "level": "Basic",
    "title": "API Gateway Purpose",
    "companies": [
      "Capgemini",
      "Accenture"
    ],
    "question": "What is the role of an API Gateway in microservices?",
    "answer": "An API Gateway acts as the single entry point for all client requests. It handles routing to downstream microservices, protocol translation, authentication/authorization, rate limiting, and SSL termination, shielding internal network layouts.",
    "checklist": [
      "Single point of entry",
      "Handles routing, auth, SSL",
      "Cross-cutting concern consolidation"
    ]
  },
  {
    "id": 74,
    "category": "Microservices",
    "level": "Basic",
    "title": "Feign Client",
    "companies": [
      "Tech Mahindra",
      "Mindtree"
    ],
    "question": "What is Feign Client in Spring Cloud?",
    "answer": "Feign is a declarative web service client. It simplifies writing REST clients in Spring by allowing developers to define interfaces annotated with Spring MVC annotations, abstracting manual HTTP request execution.",
    "checklist": [
      "Declarative HTTP client",
      "Interface annotations based",
      "Integrates with load balancers (Ribbon/LoadBalancer)"
    ]
  },
  {
    "id": 75,
    "category": "Microservices",
    "level": "Basic",
    "title": "Docker containerization",
    "companies": [
      "TCS",
      "Accenture"
    ],
    "question": "What is Docker and why is it used in microservices?",
    "answer": "Docker packages microservices, runtimes, and dependencies into isolated container images. This ensures consistency across environments (development, staging, production) and simplifies container deployment and scaling.",
    "checklist": [
      "Container isolation",
      "Eliminates environment drift",
      "Lightweight compared to VMs"
    ]
  },
  {
    "id": 76,
    "category": "Microservices",
    "level": "Basic",
    "title": "Horizontal vs Vertical Scaling",
    "companies": [
      "Infosys",
      "IBM"
    ],
    "question": "Explain the difference between Horizontal and Vertical scaling.",
    "answer": "- Vertical Scaling (Scale Up): Adding resources (CPU, RAM) to a single server instance. Bounded by hardware limits.\n- Horizontal Scaling (Scale Out): Adding more server nodes to a cluster, distributing load using load balancers (highly elastic).",
    "checklist": [
      "Scale up (add resource) vs scale out (add instances)",
      "Hardware limitation bounds",
      "Distributed state management challenges"
    ]
  },
  {
    "id": 77,
    "category": "Microservices",
    "level": "Basic",
    "title": "Spring Cloud Config Server",
    "companies": [
      "Cognizant",
      "LTI"
    ],
    "question": "What is Spring Cloud Config Server?",
    "answer": "Config Server provides centralized configuration management for microservice architectures. It stores environment properties in a Git repository or database and serves them to client microservices at startup.",
    "checklist": [
      "Centralized configurations",
      "Version-controlled (Git) properties",
      "Hot reload updates using /actuator/refresh"
    ]
  },
  {
    "id": 78,
    "category": "Microservices",
    "level": "Basic",
    "title": "Container vs Virtual Machine",
    "companies": [
      "Wipro",
      "DXC"
    ],
    "question": "How does a Docker Container differ from a Virtual Machine (VM)?",
    "answer": "VMs run a full Guest OS on top of a hypervisor, consuming significant resources. Containers share the host OS kernel and isolate user space using cgroups and namespaces, resulting in rapid startup and minimal resource usage.",
    "checklist": [
      "Hypervisor and Guest OS overhead (VM)",
      "Host kernel sharing (Container)",
      "Fast boot times & resource efficiency"
    ]
  },
  {
    "id": 79,
    "category": "Microservices",
    "level": "Basic",
    "title": "Docker Compose",
    "companies": [
      "TCS",
      "L&T"
    ],
    "question": "What is Docker Compose?",
    "answer": "Docker Compose is a tool for defining and running multi-container Docker applications. It uses YAML files to configure application services, networks, and volumes, launching all containers with a single command.",
    "checklist": [
      "YAML multi-container definition",
      "Single-command deployment: docker-compose up",
      "Simplifies local development environments"
    ]
  },
  {
    "id": 80,
    "category": "Microservices",
    "level": "Basic",
    "title": "Docker Volumes",
    "companies": [
      "Capgemini",
      "Infosys"
    ],
    "question": "Why do we need Docker Volumes?",
    "answer": "Docker containers are ephemeral (data is lost when container stops). Volumes map container directories to the host filesystem, persisting database records and application files outside the container lifecycle.",
    "checklist": [
      "Data persistence across container cycles",
      "Host filesystem mapping",
      "Volume sharing among containers"
    ]
  }
];
export default q_71_80;
