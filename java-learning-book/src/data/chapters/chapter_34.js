export default {
  id: 34,
  title: "Microservices Architecture",
  range: "589-619",
  concepts: [
    {
      id: 589,
      title: "Microservice Source Code",
      intro: "Accessing and organizing files within distributed multi-service repositories.",
      explanation: "A microservices application consists of multiple independent service projects. Developers organize these as a multi-module Maven parent project (with subdirectories for each service) or as completely separate Git repositories. Each microservice manages its own pom.xml, database scripts, and configurations, ensuring they compile and package independently.",
      gotchas: [
        "Avoid copying entity classes directly between microservices. If sharing code is necessary, package shared models in a common library module."
      ],
      interviewQuestions: [
        {
          question: "How do you organize source code repositories for a microservices system?",
          answer: "Developers use two main structures: 1. Monorepo (all services reside as subprojects in a single repository, easing dependency syncing). 2. Polyrepo (each service has its own dedicated repository, allowing independent permissions and CI/CD pipelines)."
        }
      ],
      code: `# Multi-Module Maven structure:
# parent-project/pom.xml (declares <modules>)
# ├── question-service/pom.xml
# ├── quiz-service/pom.xml
# └── registry-server/pom.xml`,
      visualizerType: "null"
    },
    {
      id: 590,
      title: "What Are Microservices?",
      intro: "Decomposing a large application into a suite of small, independent services.",
      explanation: "Microservices architecture structures an application as a collection of loose, modular services. Each service is built around a specific business domain, runs in its own process, manages its own private database, and communicates via lightweight network APIs (like HTTP REST or message queues). This enables independent scaling, technology stack freedom, and faster deployments.",
      gotchas: [
        "Microservices introduce distributed system complexities: network latency, network partitions, service discovery needs, and distributed transactions (ACID is hard to enforce; Saga pattern is needed)."
      ],
      interviewQuestions: [
        {
          question: "Compare monolithic and microservices architectures.",
          answer: "Monoliths compile all features into a single deployable artifact and share one database, making scaling difficult. Microservices deploy each feature as a separate service with its own database, communicating over APIs, allowing modular scaling and updates."
        }
      ],
      code: `# Monolith: User -> [Monolithic App (User, Order, Catalog Logic)] -> [Single DB]
# Microservices: User -> [Gateway] -> [UserService (DB1)], [OrderService (DB2)], [CatalogService (DB3)]`,
      visualizerType: "null"
    },
    {
      id: 591,
      title: "Cloud Computing",
      intro: "Leveraging cloud elasticity to deploy and scale individual microservices.",
      explanation: "Microservices require cloud hosting to achieve full scaling potential. In cloud environments (like AWS or GCP), services can be containerized and run on-demand. When the shopping-cart service gets high traffic, the cloud auto-scaler provisions more instances of just that service, without scaling unrelated modules like the billing service.",
      gotchas: [
        "Deploying dozens of microservices on separate cloud machines raises costs. Leverage container orchestration and serverless execution (Fargate) to manage cost."
      ],
      interviewQuestions: [
        {
          question: "How does cloud computing enable microservices scalability?",
          answer: "Cloud platforms provide dynamic resource allocation (auto-scaling) and container management. Microservices can scale horizontally, launching extra instances of high-traffic services instantly without scaling the entire application."
        }
      ],
      code: `# Cloud scaling directive
# Scale service instances dynamically:
# docker-compose scale question-service=3`,
      visualizerType: "null"
    },
    {
      id: 592,
      title: "Blue Green Deployment",
      intro: "Ensuring zero-downtime releases using two identical production environments.",
      explanation: "Blue-Green deployment is a technique that minimizes release risk. You maintain two identical production environments: Blue (active, serving traffic) and Green (idle). You deploy the new code version to the idle Green environment, run integration tests, and then switch the router/load balancer traffic instantly to Green. Blue then becomes the idle standby.",
      gotchas: [
        "If the new version changes the database schema, it must be backward-compatible with the old version in case you need to roll back traffic from Green to Blue."
      ],
      interviewQuestions: [
        {
          question: "Explain Blue-Green deployment and its key benefit.",
          answer: "It is a deployment strategy where two identical environments (Blue and Green) are maintained. It provides zero-downtime releases and near-instant rollback capabilities by switching load balancer routing."
        }
      ],
      code: `# Deployment Flow:
# 1. Router -> Blue (active v1.0)
# 2. Deploy v2.0 to Green (idle)
# 3. Switch Router -> Green (active v2.0)
# 4. Blue becomes idle standby`,
      visualizerType: "null"
    },
    {
      id: 593,
      title: "Cloud Native",
      intro: "Designing software explicitly to harness cloud infrastructure benefits.",
      explanation: "Cloud-native is an approach to building and running applications that exploits the advantages of the cloud computing model. It relies on: containerization (Docker), microservices architecture, declarative APIs, DevOps automation, and dynamic orchestration (Kubernetes). Configuration is kept separate from code (external environment properties).",
      gotchas: [
        "Simply taking a monolithic legacy app and running it on a cloud virtual machine is 'cloud-hosted', not 'cloud-native'. It lacks dynamic scaling and resilience configurations."
      ],
      interviewQuestions: [
        {
          question: "What are the core pillars of a cloud-native application?",
          answer: "Microservices, Containerization, Continuous Delivery (CI/CD), and DevOps/Infrastructure automation."
        }
      ],
      code: `# Config in Cloud Native (12-Factor App rule):
# Load configuration properties from environment variables, not properties files.
export DB_HOST="database-service-dns"`,
      visualizerType: "null"
    },
    {
      id: 594,
      title: "Quiz App Project Setup 1",
      intro: "Creating the monolithic base: Setting up the Question entity.",
      explanation: "We start by building a monolithic Quiz application to understand the domain before splitting it. First, create a Spring Boot project and define the 'Question' entity class to store question options, titles, categories, and difficulty levels in PostgreSQL.",
      gotchas: [
        "Ensure the generation strategy for primary key is set to GenerationType.IDENTITY for PostgreSQL compatibility."
      ],
      interviewQuestions: [
        {
          question: "What does the @Entity annotation mean in Spring Boot?",
          answer: "It specifies that the Java class is a JPA entity, mapping it to a relational table in the database."
        }
      ],
      code: `@Entity
@Data
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String questionTitle;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String rightAnswer;
    private String category;
    private String difficultyLevel;
}`,
      visualizerType: "jvm"
    },
    {
      id: 595,
      title: "Quiz App Project Setup 2",
      intro: "Creating the QuestionRepository and writing category filter queries.",
      explanation: "Define the Repository layer by creating a 'QuestionRepository' interface extending 'JpaRepository'. We add a custom finder method 'findByCategory()' which Spring Data JPA automatically implements based on the method name DSL.",
      gotchas: [
        "The method name must match the property name casing (e.g. findByCategory, not findBycategory) to avoid property mapping parsing errors."
      ],
      interviewQuestions: [
        {
          question: "How does Spring Data JPA know how to write query logic for custom interface methods?",
          answer: "It parses the method name according to its query creation rules (e.g., matching findBy with property names like Category) and dynamically generates the SQL query at runtime."
        }
      ],
      code: `@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByCategory(String category);
}`,
      visualizerType: "jvm"
    },
    {
      id: 596,
      title: "Quiz App Project Setup 3",
      intro: "Building the QuestionController to expose data endpoints.",
      explanation: "Create the controller layer 'QuestionController' annotated with @RestController. Expose endpoints like '/allQuestions' and '/category/{category}' to handle incoming client request mappings.",
      gotchas: [
        "Make sure to annotate parameters with @PathVariable if reading variables embedded directly inside the request URL path."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between @RestController and @Controller?",
          answer: "@RestController combines @Controller and @ResponseBody, meaning it automatically serializes the returned objects directly into the HTTP response body as JSON, rather than looking for a template view."
        }
      ],
      code: `@RestController
@RequestMapping("question")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @GetMapping("allQuestions")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 597,
      title: "ResponseEntity and Exception Handling in Quiz App",
      intro: "Managing REST responses with dynamic HTTP status codes and errors.",
      explanation: "Using ResponseEntity allows returning appropriate HTTP status codes (200 OK, 201 Created, 400 Bad Request, 500 Internal Error) alongside payload objects. This is standard REST behavior.",
      gotchas: [
        "Do not return bare lists or nulls directly from controllers; wrap them in ResponseEntity to control client headers and statuses."
      ],
      interviewQuestions: [
        {
          question: "Why should you use ResponseEntity in Spring Boot controllers?",
          answer: "It provides full control over the HTTP response, including status codes, custom headers, and the response body payload."
        }
      ],
      code: `@GetMapping("category/{category}")
public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category) {
    try {
        List<Question> list = questionService.getQuestionsByCategory(category);
        return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }
}`,
      visualizerType: "exception"
    },
    {
      id: 598,
      title: "Quiz Service Part 1",
      intro: "Designing the Quiz entity with relational question collections.",
      explanation: "We define a 'Quiz' entity. Since a Quiz contains multiple Questions, and a single Question can be part of multiple Quizzes, we declare a @ManyToMany relationship between the Quiz and Question entities.",
      gotchas: [
        "ManyToMany relationships will automatically generate a join/junction table in the schema to maintain database relationship mappings."
      ],
      interviewQuestions: [
        {
          question: "Explain @ManyToMany relationship mapping in JPA.",
          answer: "It maps a many-to-many relationship between two entities. In the database, this relationship is supported by a third junction table containing foreign key columns mapping to the primary keys of both entity tables."
        }
      ],
      code: `@Entity
@Data
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    @ManyToMany
    private List<Question> questions;
}`,
      visualizerType: "jvm"
    },
    {
      id: 599,
      title: "Quiz Service Part 2",
      intro: "Creating the QuizRepository for database updates.",
      explanation: "1. In the Quiz microservice, Part 2 typically involves connecting the Quiz service to the Question service via Feign Client or RestTemplate — the Quiz service delegates question-fetching to the Question service instead of owning the question data itself.\n2. Feign Client setup: add @FeignClient(name='QUESTION-SERVICE') and declare interface methods matching the Question service's endpoints. Spring Cloud generates the HTTP client implementation automatically.\n3. The quiz creation flow: client sends POST /quiz/create with {category, numQ, title} → Quiz service calls Question service to get random questions of that category → stores the question IDs list in Quiz table (not the question content).\n4. Service discovery integration: Feign Client uses Eureka service name ('QUESTION-SERVICE') to find the actual host:port dynamically. No hardcoded URLs — if the Question service moves or scales, Feign resolves the new instances automatically.\n5. Load balancing: Spring Cloud LoadBalancer (or Ribbon in older versions) automatically distributes Feign calls across multiple Question service instances — enabling horizontal scaling of the Question microservice.",
      gotchas: [
        "Ensure your package imports are correct (org.springframework.data.jpa.repository.JpaRepository)."
      ],
      interviewQuestions: [
        {
          question: "Which interface should repositories extend to get pagination and sorting support?",
          answer: "PagingAndSortingRepository (which JpaRepository extends indirectly)."
        }
      ],
      code: `@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {
    // Inherits standard database methods
}`,
      visualizerType: "jvm"
    },
    {
      id: 600,
      title: "Quiz Service Part 3",
      intro: "Writing logic to generate quizzes with random questions.",
      explanation: "Write the logic in QuizService to generate a quiz. Define a custom native query in the QuestionRepository that selects a random set of questions under a specific category and saves them to a new Quiz record.",
      gotchas: [
        "Native SQL ordering for random entries is database-dependent. Postgres uses 'RANDOM()', MySQL uses 'RAND()', and Oracle uses 'DBMS_RANDOM.VALUE'."
      ],
      interviewQuestions: [
        {
          question: "How do you execute native SQL queries in Spring Data JPA repositories?",
          answer: "By using the @Query annotation and setting the parameter 'nativeQuery = true'."
        }
      ],
      code: `// In QuestionRepository:
@Query(value = "SELECT * FROM question q WHERE q.category=:category ORDER BY RANDOM() LIMIT :numQ", nativeQuery = true)
List<Question> findRandomQuestionsByCategory(String category, int numQ);

// In QuizService:
public ResponseEntity<String> createQuiz(String category, int numQ, String title) {
    List<Question> questions = questionRepo.findRandomQuestionsByCategory(category, numQ);
    Quiz quiz = new Quiz();
    quiz.setTitle(title);
    quiz.setQuestions(questions);
    quizRepo.save(quiz);
    return new ResponseEntity<>("Success", HttpStatus.CREATED);
}`,
      visualizerType: "jvm"
    },
    {
      id: 601,
      title: "Quiz App Submit",
      intro: "Processing user answers and scoring quiz submissions.",
      explanation: "Create an endpoint to accept answers. The client submits a list of responses containing question IDs and user answers. The service iterates through the quiz questions, compares the answers, and returns the calculated score.",
      gotchas: [
        "Always use a wrapper or DTO to send questions to clients so the 'rightAnswer' field is not sent in the JSON payload."
      ],
      interviewQuestions: [
        {
          question: "What is a DTO and why is it used when sending questions to a browser?",
          answer: "Data Transfer Object (DTO). It packages only the required fields (like question text and options), hiding sensitive fields (like rightAnswer) to prevent users from inspecting the payload to cheat."
        }
      ],
      code: `public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
    Quiz quiz = quizRepository.findById(id).orElseThrow();
    List<Question> questions = quiz.getQuestions();
    int score = 0;
    for (int i = 0; i < responses.size(); i++) {
        if (responses.get(i).getResponse().equals(questions.get(i).getRightAnswer())) {
            score++;
        }
    }
    return new ResponseEntity<>(score, HttpStatus.OK);
}`,
      visualizerType: "jvm"
    },
    {
      id: 602,
      title: "Building Microservices Introduction",
      intro: "Planning the split of our monolithic Quiz application into standalone services.",
      explanation: "To convert the application to microservices, we divide it into two services: 1. Question Service (manages questions, queries categories, generates random sets). 2. Quiz Service (manages quizzes, calls the Question Service via HTTP to build and grade quizzes). Each service will have its own database to enforce isolation.",
      gotchas: [
        "Direct foreign key connections between services are lost. Relationships must be managed programmatically using entity IDs."
      ],
      interviewQuestions: [
        {
          question: "What is the Database-per-Service design rule?",
          answer: "It mandates that each microservice must own its database. Direct database cross-joins are forbidden; data must be requested only via API endpoints."
        }
      ],
      code: `# Microservice separation strategy:
# Question Service -> Port 8081 (DB: question_db)
# Quiz Service     -> Port 8082 (DB: quiz_db)`,
      visualizerType: "null"
    },
    {
      id: 603,
      title: "Creating a Question Service 1",
      intro: "Initializing the Question Service microservice and port settings.",
      explanation: "Create a new Spring Boot application. Configure 'server.port=8081' and define its service name as 'question-service' in the configuration properties, connecting it to its own database.",
      gotchas: [
        "If you do not configure server.port, both services will try to use the default 8080 and clash."
      ],
      interviewQuestions: [
        {
          question: "How do you name a microservice in Spring Boot?",
          answer: "By setting the property 'spring.application.name=service-name' in application.properties or application.yml."
        }
      ],
      code: `# question-service application.properties
server.port=8081
spring.application.name=question-service
spring.datasource.url=jdbc:postgresql://localhost:5432/question_db
spring.datasource.username=postgres
spring.datasource.password=root`,
      visualizerType: "null"
    },
    {
      id: 604,
      title: "Creating a Question Service 2",
      intro: "Exposing endpoints to generate lists of quiz question IDs.",
      explanation: "Create a '/generate' endpoint in the Question Service. The Quiz Service calls this endpoint, passing the category and count, and receives a List of integers representing random question IDs.",
      gotchas: [
        "Return only a List of Integer IDs, not full question objects, to keep network traffic minimal."
      ],
      interviewQuestions: [
        {
          question: "Why does the Quiz Service request IDs instead of full question objects?",
          answer: "To reduce payload sizes over the network and allow the Quiz Service to choose how and when to load detailed question wrappers."
        }
      ],
      code: `@GetMapping("generate")
public ResponseEntity<List<Integer>> getQuestionsForQuiz(
        @RequestParam String categoryName, @RequestParam Integer numQuestions) {
    return questionService.getQuestionsForQuiz(categoryName, numQuestions);
}`,
      visualizerType: "jvm"
    },
    {
      id: 605,
      title: "Creating a Question Service 3",
      intro: "Adding endpoints to fetch DTO wrappers and calculate scores.",
      explanation: "Add two endpoints to Question Service: '/getQuestions' (POST, accepts list of IDs, returns clean question details without answers) and '/getScore' (POST, accepts responses, returns score).",
      gotchas: [
        "Use POST endpoints when passing a list of IDs in the request body to avoid URL length limit restrictions of GET requests."
      ],
      interviewQuestions: [
        {
          question: "Why is POST preferred over GET when passing a list of IDs to a service?",
          answer: "GET requests pass data in query parameters, which have character length limits on web servers. POST passes data in the request body, supporting large payloads."
        }
      ],
      code: `@PostMapping("getQuestions")
public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(@RequestBody List<Integer> questionIds) {
    return questionService.getQuestionsFromId(questionIds);
}

@PostMapping("getScore")
public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses) {
    return questionService.getScore(responses);
}`,
      visualizerType: "jvm"
    },
    {
      id: 606,
      title: "Creating a Quiz Service",
      intro: "Defining the Quiz entity to store only question IDs.",
      explanation: "In the Quiz Service, define the Quiz entity. Since the database is isolated, we cannot link to a Question entity. Instead, use an @ElementCollection to store the question IDs as a list of integers.",
      gotchas: [
        "You must manually execute network calls to get details for these IDs when a client requests the quiz."
      ],
      interviewQuestions: [
        {
          question: "How do you represent a collection of basic types like integers in a JPA Entity?",
          answer: "Using the @ElementCollection annotation, which maps them to a separate child table linked by the parent's ID."
        }
      ],
      code: `@Entity
@Data
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    
    @ElementCollection
    private List<Integer> questionIds; // List of foreign IDs
}`,
      visualizerType: "jvm"
    },
    {
      id: 607,
      title: "Need of Service Discovery",
      intro: "Solving the problem of dynamic IP routing in microservices environments.",
      explanation: "In cloud environments, containers scale up and down, and their IP addresses change. Hardcoding service host URLs in code is impossible. Service Discovery provides a lookup server where services register their locations dynamically at startup.",
      gotchas: [
        "Ensure client services query the registry using logical names rather than caching outdated IP addresses."
      ],
      interviewQuestions: [
        {
          question: "What is Service Discovery and why is it needed?",
          answer: "It is a lookup service. In cloud microservices, IP addresses change constantly. Service discovery allows services to find and communicate with each other dynamically using service names."
        }
      ],
      code: `# Hardcoded URL (Bad): http://192.168.10.45:8081/question/generate
# Logical Service Name Lookup (Good): http://QUESTION-SERVICE/question/generate`,
      visualizerType: "null"
    },
    {
      id: 608,
      title: "Creating a Service Registry",
      intro: "Building a Eureka Service Discovery Server in Spring Cloud.",
      explanation: "Spring Cloud uses Netflix Eureka as its service registry. Create a new Spring Boot app, add 'spring-cloud-starter-netflix-eureka-server', and annotate the main class with @EnableEurekaServer.",
      gotchas: [
        "In application.properties, disable self-registration properties to prevent Eureka from trying to register with itself."
      ],
      interviewQuestions: [
        {
          question: "Which annotation enables a Eureka Service Registry?",
          answer: "@EnableEurekaServer."
        }
      ],
      code: `@SpringBootApplication
@EnableEurekaServer
public class RegistryServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(RegistryServerApplication.class, args);
    }
}

# application.properties settings
# server.port=8761
# eureka.client.register-with-eureka=false
# eureka.client.fetch-registry=false`,
      visualizerType: "jvm"
    },
    {
      id: 609,
      title: "Working with Feign",
      intro: "Writing declarative REST client interfaces in Spring Boot.",
      explanation: "Spring Cloud OpenFeign is a declarative HTTP client. Instead of writing RestTemplate code, you define a Java interface, annotate it with @FeignClient, and write method signatures matching the target service. Spring generates the API client code dynamically.",
      gotchas: [
        "The request mappings, annotations, path variables, and request body types in the Feign interface must match the target controller signatures exactly."
      ],
      interviewQuestions: [
        {
          question: "What is the benefit of OpenFeign over RestTemplate?",
          answer: "OpenFeign is declarative. It eliminates boilerplate code, allowing developers to make remote REST calls simply by defining a Java interface."
        }
      ],
      code: `@FeignClient(name = "QUESTION-SERVICE")
public interface QuizFeignClient {
    @GetMapping("question/generate")
    ResponseEntity<List<Integer>> getQuestionsForQuiz(
        @RequestParam String categoryName, 
        @RequestParam Integer numQuestions
    );
}`,
      visualizerType: "jvm"
    },
    {
      id: 610,
      title: "Microservice Calling Another Microservice",
      intro: "Injecting Feign clients and registering as Eureka discovery clients.",
      explanation: "Add '@EnableFeignClients' and '@EnableDiscoveryClient' annotations to your client service (Quiz Service). You can now inject the Feign client bean and invoke methods directly. The call is automatically routed via Eureka.",
      gotchas: [
        "The service name in @FeignClient(name = 'QUESTION-SERVICE') must match the spring.application.name property configured in the target service."
      ],
      interviewQuestions: [
        {
          question: "How does OpenFeign resolve the actual URL of a microservice?",
          answer: "It queries Eureka for the registered instances of the service name specified in @FeignClient, retrieves their host:port, and executes the HTTP call."
        }
      ],
      code: `@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class QuizServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(QuizServiceApplication.class, args);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 611,
      title: "Completing the 2 Microservices",
      intro: "Finalizing the Quiz Service logic by orchestrating Feign requests.",
      explanation: "In QuizService, inject your Feign interface. Modify 'createQuiz()' to call the Question Service to get random IDs. Modify 'getQuiz()' to fetch DTO question details from the Question Service via Feign, and build the return payload.",
      gotchas: [
        "If the Question Service is offline, Feign calls will throw Exceptions. Set up proper fallback handling."
      ],
      interviewQuestions: [
        {
          question: "How do you coordinate data fetching in a microservices system?",
          answer: "By calling dependent services using Feign client interfaces, storing references (like IDs), and aggregating the returned DTO responses."
        }
      ],
      code: `@Service
public class QuizService {
    @Autowired
    private QuizFeignClient feignClient;
    @Autowired
    private QuizRepository quizRepository;

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow();
        List<Integer> ids = quiz.getQuestionIds();
        // Load details via Feign call
        List<QuestionWrapper> wrappers = feignClient.getQuestionsFromId(ids).getBody();
        return new ResponseEntity<>(wrappers, HttpStatus.OK);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 612,
      title: "Load Balancing",
      intro: "Distributing network load across multiple active service instances.",
      explanation: "Spring Cloud LoadBalancer is integrated automatically when using Eureka and Feign. If you start multiple instances of 'question-service' on different ports, the load balancer distributes Feign client requests across them in a round-robin fashion.",
      gotchas: [
        "Ensure instances do not share local state files, as requests from the same client can land on different instances."
      ],
      interviewQuestions: [
        {
          question: "How do you start multiple instances of a Spring Boot app on your local machine?",
          answer: "By executing the package run command with different server ports, e.g., mvn spring-boot:run -Dspring-boot.run.arguments='--server.port=8083'."
        }
      ],
      code: `# Feign client automatically routes calls across multiple instances of QUESTION-SERVICE.
# Round-robin: Call 1 -> Port 8081, Call 2 -> Port 8083, Call 3 -> Port 8081`,
      visualizerType: "null"
    },
    {
      id: 613,
      title: "API Gateway",
      intro: "Exposing a unified interface to clients using Spring Cloud Gateway.",
      explanation: "An API Gateway is the entry point for all clients. Create a Spring Boot app, add 'spring-cloud-starter-gateway', register it with Eureka, and define routing rules in application.yml. Clients call the gateway, which routes the request based on path predicates.",
      gotchas: [
        "Do not include web starter ('spring-boot-starter-web') in your gateway; Spring Cloud Gateway runs on Netty and is incompatible with Tomcat starter."
      ],
      interviewQuestions: [
        {
          question: "What is an API Gateway?",
          answer: "It is a routing service that acts as a single entry point for all client requests, forwarding them to backend microservices, handling routing, security, and load balancing."
        }
      ],
      code: `# application.yml config for routing requests
spring:
  cloud:
    gateway:
      routes:
        - id: quiz-service
          uri: lb://QUIZ-SERVICE
          predicates:
            - Path=/quiz/**`,
      visualizerType: "null"
    },
    {
      id: 614,
      title: "Continuing Our Microservices Journey",
      intro: "Advancing to config servers, distributed tracing, and fault tolerance.",
      explanation: "Production microservices architectures require: Spring Cloud Config Server (centralized application property configurations), Zipkin & Sleuth/Micrometer (distributed request tracing across services), and Resilience4j (circuit breaker protection to stop cascading errors).",
      gotchas: [
        "Adding these services increases architectural complexity. Deploy them only as system scale grows."
      ],
      interviewQuestions: [
        {
          question: "What is a Circuit Breaker in microservices?",
          answer: "It is a pattern that monitors for service failures. If a service call fails repeatedly, the circuit opens, immediately failing subsequent calls with a fallback response to prevent system resources from hanging."
        }
      ],
      code: `# Architectural roadmap:
# Config Server -> Eureka Server -> API Gateway -> Services (Eureka Client + Feign + Resilience4j)`,
      visualizerType: "null"
    },
    {
      id: 615,
      title: "Blueprint for our Next Project",
      intro: "Designing a stock system with StockPrice and StockCalc services.",
      explanation: "We design a stock portfolio application: 1. StockPrice Service (stores stock tickers and prices). 2. StockCalc Service (calculates portfolio values by calling StockPrice service via Feign).",
      gotchas: [
        "Separate the database schemas completely; StockCalc should have no direct connection to the StockPrice database."
      ],
      interviewQuestions: [
        {
          question: "How do you coordinate calculations that depend on another microservice's data?",
          answer: "By creating Feign client requests to fetch the dependency data, and then performing the business calculations locally in the service layer."
        }
      ],
      code: `# Architecture Flow:
# Client -> StockCalc (8085) --[Feign Request]--> StockPrice (8086) -> Return Ticker Price`,
      visualizerType: "null"
    },
    {
      id: 616,
      title: "Creating a Service Registry - Project 2",
      intro: "Setting up Eureka registry for our stock tracking cluster.",
      explanation: "1. A Service Registry (Eureka Server) is the central directory of all running microservice instances. Each service registers itself on startup with its host, port, and health metadata — other services query the registry to find each other.\n2. Setup: create a new Spring Boot project with spring-cloud-starter-netflix-eureka-server. Add @EnableEurekaServer on the main class. In application.properties: set server.port=8761, eureka.client.register-with-eureka=false, eureka.client.fetch-registry=false.\n3. Eureka dashboard: navigate to http://localhost:8761 in a browser to see all registered service instances with their status (UP/DOWN), last heartbeat, and IP:port.\n4. Client registration: all microservices (Gateway, Quiz, Question) add spring-cloud-starter-netflix-eureka-client dependency and eureka.client.service-url.defaultZone=http://localhost:8761/eureka/ in their properties. They register automatically on startup.\n5. High availability: in production, run 2+ Eureka Server instances and point each at the others (peer-to-peer replication). If one registry goes down, clients use cached registry data — services keep working for a configurable grace period.",
      gotchas: [
        "If you run multiple Eureka registries locally, configure different ports to prevent port allocation clashes."
      ],
      interviewQuestions: [
        {
          question: "Which port does Eureka Server run on by default?",
          answer: "Port 8761."
        }
      ],
      code: `# application.properties configurations
server.port=8761
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false`,
      visualizerType: "null"
    },
    {
      id: 617,
      title: "Creating StockPrice Service 1",
      intro: "Writing entities and repository setups for stock values.",
      explanation: "Create the StockPrice service on port 8086. Define the StockPrice entity containing stock symbol and price fields, and register it with Eureka using @EnableDiscoveryClient.",
      gotchas: [
        "Always use BigDecimal instead of Double for currency fields to prevent floating-point accuracy errors."
      ],
      interviewQuestions: [
        {
          question: "Why should you use @EnableDiscoveryClient?",
          answer: "It allows the application to register itself as a client in the Eureka Service Registry, making it discoverable by other services."
        }
      ],
      code: `@Entity
@Data
public class StockPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String symbol;
    private BigDecimal price;
}`,
      visualizerType: "jvm"
    },
    {
      id: 618,
      title: "Implementing Global Exception Handler in Microservice",
      intro: "Intercepting controller errors globally using RestControllerAdvice.",
      explanation: "Create a class annotated with @RestControllerAdvice. Write handler methods annotated with @ExceptionHandler to intercept database exceptions or missing record errors, returning clean JSON messages.",
      gotchas: [
        "If you do not specify a global exception handler, microservice internal error traces will leak to clients, exposing system details."
      ],
      interviewQuestions: [
        {
          question: "How do you intercept specific exceptions globally in Spring?",
          answer: "Use @RestControllerAdvice and annotate methods inside it with @ExceptionHandler(ExceptionType.class)."
        }
      ],
      code: `@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(StockNotFoundException.class)
    public ResponseEntity<String> handleStockNotFound(StockNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}`,
      visualizerType: "exception"
    },
    {
      id: 619,
      title: "Developing Microservice Enabling Feign Client",
      intro: "Setting up StockCalc service with Feign calls to StockPrice API.",
      explanation: "Create the StockCalc service on port 8085. Enable Feign clients using @EnableFeignClients. Declare the StockPriceClient Feign interface to retrieve stock prices from the stock-price-service dynamically.",
      gotchas: [
        "Verify service names match exactly or Feign will fail to resolve the host details."
      ],
      interviewQuestions: [
        {
          question: "What happens if a Feign client returns a ResponseEntity wrapper?",
          answer: "Spring Cloud Feign automatically deserializes the response body and preserves the response status, allowing you to check the status using response.getStatusCode()."
        }
      ],
      code: `@FeignClient(name = "STOCK-PRICE-SERVICE")
public interface StockPriceClient {
    @GetMapping("/stocks/{symbol}")
    ResponseEntity<BigDecimal> getStockPrice(@PathVariable String symbol);
}

// In StockCalcService:
public BigDecimal calculatePortfolio(String symbol, int quantity) {
    BigDecimal price = priceClient.getStockPrice(symbol).getBody();
    return price.multiply(BigDecimal.valueOf(quantity));
}`,
      visualizerType: "jvm"
    }
  ]
};
