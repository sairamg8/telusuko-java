export default {
  id: 27,
  title: "Spring Data JPA & E-Commerce REST App",
  range: "401-436",
  concepts: [
    {
      id: 401,
      title: "Spring Data JPA Introduction",
      intro: "Simplify database access layers down to zero-boilerplate Java interfaces.",
      explanation: "Spring Data JPA is part of the larger Spring Data umbrella. It completely removes the need to write repository implementation boilerplate. By simply extending JpaRepository, Spring automatically generates CRUD operations, custom query methods, and pagination capabilities at runtime.",
      gotchas: [
        "Spring Data JPA uses reflection under the hood to generate proxy implementation classes on startup, which adds a tiny overhead to application initialization."
      ],
      interviewQuestions: [
        {
          question: "What is Spring Data JPA?",
          answer: "It is a framework that adds a layer on top of a JPA provider (like Hibernate) to abstract data access logic, providing automatic implementations of Repository interfaces with standard CRUD operations."
        }
      ],
      code: `@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // CRUD methods like save(), findById(), deleteById() are automatically available!
}`,
      visualizerType: "jvm"
    },
    {
      id: 402,
      title: "What Is ORM and JPA?",
      intro: "Map database tables directly to Java classes without writing SQL queries.",
      explanation: "ORM (Object-Relational Mapping) is a technique for converting data between relational databases and object-oriented programming languages. JPA (Jakarta Persistence API) is the standard specification for ORM in Java, and Hibernate is the most popular runtime implementation of this specification.",
      gotchas: [
        "JPA is just a specification (set of interfaces and guidelines). You cannot execute JPA alone; you need an ORM implementation provider like Hibernate."
      ],
      interviewQuestions: [
        {
          question: "Explain the difference between JPA and Hibernate.",
          answer: "JPA is the specification (standard interface) defining ORM behavior in Java. Hibernate is a concrete implementation of that JPA specification."
        }
      ],
      code: `// Entity Mapping Example
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
}`,
      visualizerType: "jvm"
    },
    {
      id: 403,
      title: "Creating Tables and Inserting Data",
      intro: "Configure Hibernate to automatically generate database schemas based on your entity definitions.",
      explanation: "Using properties like spring.jpa.hibernate.ddl-auto, Hibernate can automatically create, update, or validate your SQL tables on startup based on Java classes annotated with @Entity. Valid options include create, create-drop, update, and validate.",
      gotchas: [
        "Using 'create' or 'create-drop' in production is highly dangerous, as it drops existing tables and deletes data every time the server boots up."
      ],
      interviewQuestions: [
        {
          question: "What does the ddl-auto value 'update' do in Hibernate?",
          answer: "It updates the existing database schema to match the changes made to Entity classes without dropping the tables. However, it cannot drop columns or modify constraints that already exist."
        }
      ],
      code: `# application.properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true`,
      visualizerType: "null"
    },
    {
      id: 404,
      title: "findAll()",
      intro: "Retrieve all records from a table in a single method call.",
      explanation: "The findAll() method is provided by JpaRepository. It returns a List of all entities in the database table. Behind the scenes, the JPA provider generates and runs a SELECT * query and maps each row back to an entity object.",
      gotchas: [
        "Calling findAll() on a table containing millions of rows will cause out-of-memory errors because Spring will attempt to load all records into RAM at once. Use pagination instead."
      ],
      interviewQuestions: [
        {
          question: "What is the return type of the findAll() method in JpaRepository?",
          answer: "It returns a List<T>, where T is the type of the Entity managed by the repository."
        }
      ],
      code: `@Autowired
private ProductRepository repo;

public List<Product> getAllProducts() {
    return repo.findAll(); // Generates: SELECT * FROM product;
}`,
      visualizerType: "jvm"
    },
    {
      id: 405,
      title: "findById()",
      intro: "Fetch a single record by its primary key with built-in null safety.",
      explanation: "findById(ID id) retrieves a single entity by its primary key. It returns an Optional<T>, which forces the developer to handle the case where the record might not exist, reducing NullPointerExceptions.",
      gotchas: [
        "Never call optional.get() directly without calling optional.isPresent() or using orElseThrow(), as it can throw NoSuchElementException if the value is missing."
      ],
      interviewQuestions: [
        {
          question: "Why does findById() return an Optional in Spring Data JPA?",
          answer: "To provide null-safety. It forces callers to explicitly handle cases where no record exists for the given ID, avoiding NullPointerException."
        }
      ],
      code: `public Product getProduct(int id) {
    return repo.findById(id)
               .orElseThrow(() -> new RuntimeException("Product not found"));
}`,
      visualizerType: "jvm"
    },
    {
      id: 406,
      title: "Query DSL",
      intro: "Generate complex SQL queries simply by declaring method names in your repository interface.",
      explanation: "Spring Data JPA parses repository method names using Query DSL rules. It automatically generates queries based on keywords like findBy, And, Or, Containing, GreaterThan, etc. This eliminates writing manual SQL query strings.",
      gotchas: [
        "If you misspell a property name in the method definition (e.g. findByProoductName instead of findByProductName), the application context will fail to start."
      ],
      interviewQuestions: [
        {
          question: "How does Spring Data JPA create SQL queries from interface method names?",
          answer: "It uses a query creator mechanism that parses the method name by splitting it into subject and predicate components (e.g., 'findByCategoryAndPriceGreaterThan')."
        }
      ],
      code: `@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(String category);
    List<Product> findByPriceGreaterThan(double price);
}`,
      visualizerType: "jvm"
    },
    {
      id: 407,
      title: "Update And Delete",
      intro: "Update records and remove them from your database table.",
      explanation: "To update an entity, fetch it, modify its fields, and call save(). To delete, call deleteById(ID id) or delete(T entity). Spring Data JPA handles the transactions and statement execution.",
      gotchas: [
        "JPA updates require an active transaction. Methods should be marked with @Transactional if updating or deleting programmatically outside simple repository calls."
      ],
      interviewQuestions: [
        {
          question: "How does JpaRepository differentiate between saving a new record and updating an existing one?",
          answer: "By checking the Entity's primary key. If the primary key is null or does not exist in the database, it performs an INSERT. If it exists, it performs an UPDATE."
        }
      ],
      code: `// Update operation
Product prod = repo.findById(1).orElseThrow();
prod.setPrice(499.0);
repo.save(prod); // Performs UPDATE because ID is present

// Delete operation
repo.deleteById(1); // Performs DELETE`,
      visualizerType: "jvm"
    },
    {
      id: 408,
      title: "JPA In Job App",
      intro: "Migrate our memory-based Job Application repository to Spring Data JPA.",
      explanation: "In our Job Webapp, we originally saved jobs to an in-memory list. To implement JPA, we annotate our JobPost model with @Entity and @Id, and convert our JobRepo class into an interface that extends JpaRepository.",
      gotchas: [
        "When changing repository from class to interface, make sure to delete custom methods that don't match the new interface layout or write custom Query DSL methods."
      ],
      interviewQuestions: [
        {
          question: "What steps are required to convert an in-memory repository to a JPA repository?",
          answer: "1. Annotate domain class with @Entity and define an @Id. 2. Change the repository class into an interface. 3. Extend JpaRepository<T, ID>."
        }
      ],
      code: `@Repository
public interface JobRepo extends JpaRepository<JobPost, Integer> {
    // Legacy in-memory implementation deleted!
}`,
      visualizerType: "jvm"
    },
    {
      id: 409,
      title: "Loading Data and Entities",
      intro: "Pre-load database tables with mock job roles during application bootstrap.",
      explanation: "Using CommandLineRunner, we can execute database seeds immediately after the Spring application context has fully loaded. This is useful for populating initial JobPost records for verification.",
      gotchas: [
        "If CommandLineRunner code throws an exception during startup, the entire application will crash and stop running."
      ],
      interviewQuestions: [
        {
          question: "What is CommandLineRunner used for in Spring Boot?",
          answer: "It is an interface used to indicate that a bean should run when it is contained within a SpringApplication. It executes immediately after startup."
        }
      ],
      code: `@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private JobRepo repo;

    @Override
    public void run(String... args) throws Exception {
        repo.save(new JobPost(1, "React Dev", "Frontend developer", 2, List.of("React", "CSS")));
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 410,
      title: "Search By Keyword",
      intro: "Search across multiple fields (profile, description) using custom SQL query bindings.",
      explanation: "When searching for job postings, users supply a text keyword. We write a custom JPQL (Java Persistence Query Language) query using the @Query annotation to find postings where the title or description matches the keyword.",
      gotchas: [
        "Use lower() and '%keyword%' to ensure search is case-insensitive and matches partial words."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between JPQL and native SQL queries in @Query?",
          answer: "JPQL targets entity names and property names defined in Java classes. Native SQL queries target the physical database table names and column names directly."
        }
      ],
      code: `@Repository
public interface JobRepo extends JpaRepository<JobPost, Integer> {
    @Query("SELECT j FROM JobPost j WHERE LOWER(j.postProfile) LIKE LOWER(CONCAT('%', :key, '%')) OR LOWER(j.postDesc) LIKE LOWER(CONCAT('%', :key, '%'))")
    List<JobPost> searchByKeyword(@Param("key") String keyword);
}`,
      visualizerType: "jvm"
    },
    {
      id: 411,
      title: "React UI For Search",
      intro: "Connect the search input field in React to make API queries in real time.",
      explanation: "The React search input triggers a state change on key presses. It calls an API function that triggers an HTTP GET to `/api/jobs/search?keyword=java` to dynamically display matching jobs.",
      gotchas: [
        "To avoid hitting the server with dozens of requests while the user is typing, implement a debounce logic in the frontend."
      ],
      interviewQuestions: [
        {
          question: "How do you pass query parameters from React to a Spring Boot REST API?",
          answer: "By appending query strings to the request URL (e.g. '/api/jobs/search?keyword=' + searchVal) and capturing it with @RequestParam in the Controller."
        }
      ],
      code: `// React Search Fetch
const handleSearch = (e) => {
  fetch(\`http://localhost:8080/api/jobs/search?keyword=\${e.target.value}\`)
    .then(res => res.json())
    .then(data => setJobs(data));
};`,
      visualizerType: "null"
    },
    {
      id: 412,
      title: "React UI For Update And Delete",
      intro: "Build edit forms and delete buttons in your frontend and hook them to PUT/DELETE APIs.",
      explanation: "React components handle updating by displaying form modal filled with existing state. Clicking update sends a PUT request with updated JSON. Clicking delete fires a DELETE request to remove the object.",
      gotchas: [
        "After successfully updating or deleting, remember to update the React local state array, otherwise the layout will continue showing stale data."
      ],
      interviewQuestions: [
        {
          question: "Why should we update the local React state after an API delete request?",
          answer: "To trigger a re-render. Since React is reactive, removing the item from local state refreshes the UI immediately without requiring a full page reload."
        }
      ],
      code: `// React Delete Handler
const deleteJob = (id) => {
  axios.delete(\`http://localhost:8080/api/jobs/\${id}\`)
    .then(() => setJobs(jobs.filter(job => job.id !== id)));
};`,
      visualizerType: "null"
    },
    {
      id: 413,
      title: "Project Introduction",
      intro: "Kickstart our complete E-Commerce application with dynamic product catalogs and orders.",
      explanation: "We will build an E-Commerce Backend API featuring Product listing, image uploads, category sorting, search functionality, and checkout orders. We will integrate a PostgreSQL database and write custom controllers.",
      gotchas: [
        "Uploading files (product images) requires handling multi-part form data which is processed differently than simple JSON payloads."
      ],
      interviewQuestions: [
        {
          question: "What is the primary challenge when mixing files (binary) and metadata (JSON) in REST requests?",
          answer: "JSON uses application/json content-type, while file uploads use multipart/form-data. We must map the request using MultipartFile to parse files correctly."
        }
      ],
      code: `// Core Modules:
// 1. Product Controller (handles catalog and image CRUD)
// 2. Order Controller (handles cart checkout logic)
// 3. Database (PostgreSQL storage)`,
      visualizerType: "null"
    },
    {
      id: 414,
      title: "Running and Understanding the React UI Code",
      intro: "Inspect the structure of the E-Commerce single-page client application.",
      explanation: "The E-Commerce React UI is structured into pages (Home, ProductDetails, Checkout) and components (Navbar, ProductCard). It communicates with endpoints like `/api/products` and `/api/products/{id}/image`.",
      gotchas: [
        "Make sure the React frontend server is pointing to the correct API base URL (e.g. http://localhost:8080/api)."
      ],
      interviewQuestions: [
        {
          question: "What is the standard port React runs on when bootstrapped with Vite?",
          answer: "Port 5173, whereas the legacy Create-React-App template uses port 3000."
        }
      ],
      code: `// API config in React (App.js)
const API_URL = "http://localhost:8080/api";`,
      visualizerType: "null"
    },
    {
      id: 415,
      title: "Spring Boot Project Setup",
      intro: "Create the E-Commerce Maven structure and add PostgreSQL and Lombok starters.",
      explanation: "Generate a Spring Boot project. Include: Spring Web, Spring Data JPA, PostgreSQL Driver, and Lombok. Configure application.properties with database credentials.",
      gotchas: [
        "Double-check your PostgreSQL port is 5432 and database name matches your local setup."
      ],
      interviewQuestions: [
        {
          question: "Which dependency provides automatic getter and setter generation?",
          answer: "Lombok, which uses compile-time annotation processing to inject getters, setters, constructors, and builders into bytecode."
        }
      ],
      code: `# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecom_db
spring.datasource.username=postgres
spring.datasource.password=admin
spring.jpa.hibernate.ddl-auto=update`,
      visualizerType: "null"
    },
    {
      id: 416,
      title: "Creating Product Model and Table",
      intro: "Define the Product Entity class with description, pricing, and binary fields.",
      explanation: "Create the Product entity. We use Lombok annotations like @Data, @AllArgsConstructor, and @NoArgsConstructor. We map the product image using a byte array (@Lob byte[] imageDate) to store files directly in the database.",
      gotchas: [
        "Large Objects (@Lob) can degrade database performance if fetched eagerly. Keep images separate or fetch them lazily if performance issues occur."
      ],
      interviewQuestions: [
        {
          question: "What does the @Lob annotation mean in JPA?",
          answer: "@Lob specifies that the annotated property should be stored as a Large Object (CLOB for text, BLOB for binary data) in the database."
        }
      ],
      code: `@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private double price;
    private String category;
    
    @Lob
    private byte[] imageData;
    private String imageName;
    private String imageType;
}`,
      visualizerType: "jvm"
    },
    {
      id: 417,
      title: "Fetching All Products from DB",
      intro: "Build the primary retrieval endpoint for listing the store catalog.",
      explanation: "Write the GET handler `/api/products` in ProductController. It delegates to ProductService, which calls the ProductRepository's findAll() to retrieve all store products.",
      gotchas: [
        "To load products faster, you should exclude the large imageData fields from the default catalog list response using a projection or DTO."
      ],
      interviewQuestions: [
        {
          question: "Why should we avoid loading file byte arrays in bulk entity GET queries?",
          answer: "Loading megabytes of image binary arrays for 100 products in a single list response wastes heap memory and consumes massive network bandwidth."
        }
      ],
      code: `@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService service;

    @GetMapping("/products")
    public List<Product> getProducts() {
        return service.getAllProducts();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 418,
      title: "ResponseEntity",
      intro: "Gain complete control over HTTP status codes, headers, and response payloads.",
      explanation: "ResponseEntity is a class in Spring that represents the entire HTTP response. You can configure the status code (e.g. 200 OK, 404 Not Found), response headers, and the response body dynamically based on logic.",
      gotchas: [
        "Do not return null if a resource is missing. Return ResponseEntity.notFound().build() to communicate the error semantically."
      ],
      interviewQuestions: [
        {
          question: "What is ResponseEntity and why do we use it in REST Controllers?",
          answer: "ResponseEntity represents the entire HTTP response (headers, body, and status). We use it to programmatically control and return appropriate status codes (like 201 Created or 404 Not Found)."
        }
      ],
      code: `@GetMapping("/products/{id}")
public ResponseEntity<Product> getProductById(@PathVariable int id) {
    Product prod = service.getProductById(id);
    if (prod != null) {
        return new ResponseEntity<>(prod, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 419,
      title: "Fetch Product by ID",
      intro: "Implement the endpoint to retrieve detailed information for a single product.",
      explanation: "In our controller, write a GetMapping('/product/{id}') returning ResponseEntity<Product>. If the item is present, return OK (200), otherwise return NOT_FOUND (404).",
      gotchas: [
        "Make sure to catch potential TypeMismatchException if clients pass non-numeric values as the ID parameter."
      ],
      interviewQuestions: [
        {
          question: "How do you return a 404 status code if an entity is not found by ID?",
          answer: "By returning ResponseEntity.status(HttpStatus.NOT_FOUND).build() inside your controller check block."
        }
      ],
      code: `@GetMapping("/product/{id}")
public ResponseEntity<Product> getProduct(@PathVariable int id) {
    Product p = service.getProductById(id);
    return p != null ? ResponseEntity.ok(p) : ResponseEntity.notFound().build();
}`,
      visualizerType: "jvm"
    },
    {
      id: 420,
      title: "Add Product With Image",
      intro: "Upload a binary image along with product properties using Multipart requests.",
      explanation: "To upload products with an image, we accept the product properties as a JSON-like string or form fields, alongside a MultipartFile parameter. The controller converts file bytes and stores them inside the entity.",
      gotchas: [
        "Standard JSON requests cannot carry files directly. We must accept the request as @RequestPart or parse MultipartFile arguments manually."
      ],
      interviewQuestions: [
        {
          question: "What class is used in Spring to handle uploaded file parameters?",
          answer: "org.springframework.web.multipart.MultipartFile, which allows access to file name, content-type, and bytes."
        }
      ],
      code: `@PostMapping("/product")
public ResponseEntity<?> addProduct(
        @RequestPart Product product,
        @RequestPart MultipartFile imageFile) {
    try {
        Product saved = service.addProduct(product, imageFile);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    } catch (Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 421,
      title: "Fetch Product Image",
      intro: "Serve binary image files back to web browsers with correct media headers.",
      explanation: "To display the image in a browser, we create an endpoint `/product/{id}/image`. The service fetches the entity's byte array, and the controller returns the byte array with the 'Content-Type' header set to the product's image type (e.g. image/png).",
      gotchas: [
        "Failing to set the correct Media Type headers will cause browsers to download the file as a raw binary blob instead of rendering it on screen."
      ],
      interviewQuestions: [
        {
          question: "How do you serve binary image bytes so that browsers render them directly?",
          answer: "By returning a ResponseEntity<byte[]> and setting the HttpHeaders.CONTENT_TYPE header to the exact image format (e.g., MediaType.IMAGE_JPEG_VALUE)."
        }
      ],
      code: `@GetMapping("/product/{id}/image")
public ResponseEntity<byte[]> getProductImage(@PathVariable int id) {
    Product p = service.getProductById(id);
    byte[] image = p.getImageData();
    return ResponseEntity.ok()
                         .contentType(MediaType.parseMediaType(p.getImageType()))
                         .body(image);
}`,
      visualizerType: "jvm"
    },
    {
      id: 422,
      title: "Update and Delete Product",
      intro: "Modify product attributes, replace images, and delete entries.",
      explanation: "1. REST convention: PUT /product/{id} receives updated data (JSON + optional file) and overwrites the existing record. DELETE /product/{id} removes the record by its primary key.\n2. Update flow: fetch entity by ID → set new field values → save via repository. If the request includes a new image file, delete old file from disk before saving the new one.\n3. DELETE must check that the record exists first. Return 404 if not found, 200 OK with a message on success — use ResponseEntity for control over HTTP status codes.\n4. Cascade behavior: if Product has child records (e.g. OrderItems), you must either cascade the delete or manually delete children first to avoid foreign key constraint violations.\n5. PUT vs PATCH: PUT replaces the full resource; PATCH updates only provided fields. Most Spring tutorials use PUT for simplicity, but PATCH is more efficient when only one field changes.",
      gotchas: [
        "When deleting a product, make sure to delete or cascade all child objects to avoid database constraint violations."
      ],
      interviewQuestions: [
        {
          question: "Can we send files using HTTP PUT requests?",
          answer: "Yes, PUT requests can accept multipart form-data just like POST, allowing files to be sent to update existing database resources."
        }
      ],
      code: `@DeleteMapping("/product/{id}")
public ResponseEntity<String> deleteProduct(@PathVariable int id) {
    Product p = service.getProductById(id);
    if(p != null) {
        service.deleteProduct(id);
        return ResponseEntity.ok("Deleted");
    }
    return ResponseEntity.notFound().build();
}`,
      visualizerType: "jvm"
    },
    {
      id: 423,
      title: "Search",
      intro: "Allow customers to search catalog items by title, brand, or category.",
      explanation: "Implement search REST API. Route `/products/search?keyword=phone` targets a repository method searchProducts(String key) querying matches in multiple fields.",
      gotchas: [
        "If keyword is empty, return either all products or an empty array to prevent throwing database query errors."
      ],
      interviewQuestions: [
        {
          question: "How do you build a multi-column search in JPA?",
          answer: "By creating a custom @Query containing OR clauses checking each target column using SQL LIKE operators."
        }
      ],
      code: `@GetMapping("/products/search")
public ResponseEntity<List<Product>> search(@RequestParam String keyword) {
    List<Product> products = service.search(keyword);
    return ResponseEntity.ok(products);
}`,
      visualizerType: "jvm"
    },
    {
      id: 424,
      title: "Order Checkout Walkthrough",
      intro: "Examine the checkout process where customer items turn into placed orders.",
      explanation: "Checkout requires converting cart items to a stored Order object, decrementing inventory, computing total tax/shipping, and saving transactions across multiple tables.",
      gotchas: [
        "Checkout is a multi-step database action. If any step fails, the entire transaction must roll back to avoid phantom payments or incorrect inventories."
      ],
      interviewQuestions: [
        {
          question: "What annotation ensures a multi-step checkout operates atomically?",
          answer: "The @Transactional annotation. If any runtime exception is thrown, all queries executed within the transaction are rolled back."
        }
      ],
      code: `// Business flow:
// 1. Validate stock availability
// 2. Compute final pricing
// 3. Save Order & OrderItems
// 4. Reduce product stock`,
      visualizerType: "null"
    },
    {
      id: 425,
      title: "Diagram For The Project",
      intro: "Understand the visual data flow during the E-Commerce lifecycle.",
      explanation: "The architecture maps: React UI -> REST Controller -> Service Layer -> Transaction Boundary -> Repository -> Database Tables (Product, Order, OrderItem).",
      gotchas: [
        "Ensure database foreign keys match entity mappings, otherwise database integrity checks will reject operations."
      ],
      interviewQuestions: [
        {
          question: "What is the role of JPA mappings like @OneToMany in database tables?",
          answer: "They define relationships. @OneToMany instructs Hibernate to configure foreign keys linking child rows to parent rows."
        }
      ],
      code: `// React Client (Port 5173) ---> GET/POST ---> REST Controller (Port 8080)
//        |---> Service (Transactional) ---> JPA Repository ---> PostgreSQL`,
      visualizerType: "null"
    },
    {
      id: 426,
      title: "Running The Application Before Getting Started",
      intro: "Verify local database connection status before testing your endpoint code.",
      explanation: "1. Before coding order features, verify the baseline works: start PostgreSQL, run the Spring Boot app, and confirm the /products endpoint returns data without errors.\n2. Check Hibernate DDL: with spring.jpa.hibernate.ddl-auto=update, Hibernate auto-creates/updates tables. Look in startup logs for 'CREATE TABLE' or 'ALTER TABLE' statements to confirm schema sync.\n3. Use pgAdmin or psql to inspect actual table columns: `psql -U postgres -d ecom_db -c '\\d product'`. Verify column names match your entity field names (Hibernate maps camelCase to snake_case by default).\n4. Test with curl or Postman before writing new code — isolate whether bugs are in code or DB configuration. A clean baseline saves debugging hours.\n5. If you get ConnectionRefusedException at startup, PostgreSQL isn't running. Start it: `sudo service postgresql start` (Linux) or via pgAdmin on Windows.",
      gotchas: [
        "Failing to start local Postgres server yields ConnectionRefused exceptions at startup."
      ],
      interviewQuestions: [
        {
          question: "How do you verify if Hibernate has successfully created tables on PostgreSQL?",
          answer: "By using pgAdmin, psql CLI, or checking startup logs to confirm table creation statements: 'CREATE TABLE ...'."
        }
      ],
      code: `# Run database check using psql command
psql -U postgres -d ecom_db -c "\\dt"`,
      visualizerType: "null"
    },
    {
      id: 427,
      title: "Creating DTOs for Order",
      intro: "Define data transfer objects to capture cart item structures from requests.",
      explanation: "1. A DTO (Data Transfer Object) is a plain Java class with fields and getters/setters. It captures what the client sends in an HTTP request body — decoupled from the actual JPA entity.\n2. OrderRequest DTO example: contains a List<CartItem> where each CartItem has productId (int) and quantity (int). This maps directly to the JSON the React frontend sends.\n3. Why NOT use Entity classes as @RequestBody? Entities have database metadata (@Id, @GeneratedValue, relationships) that don't make sense on the request side. DTOs only carry what the client needs to send.\n4. Use @Data (Lombok) on DTOs to auto-generate getters, setters, toString, and equals — this eliminates 40+ lines of boilerplate per DTO class.\n5. Benefits of DTOs: (1) Prevent mass-assignment attacks (clients can't accidentally set audit fields); (2) Avoid circular reference serialization errors with bidirectional JPA relationships; (3) Independent API versioning.",
      gotchas: [
        "Do not use database Entity classes directly as request body parameters for complex requests. DTOs insulate entities from REST changes."
      ],
      interviewQuestions: [
        {
          question: "Why should you use DTOs instead of entity classes for HTTP requests?",
          answer: "DTOs decouple REST APIs from database models, prevent circular reference serialization errors, and hide confidential database structures."
        }
      ],
      code: `@Data
public class OrderRequest {
    private String customerEmail;
    private List<CartItemDto> items;
}

@Data
class CartItemDto {
    private int productId;
    private int quantity;
}`,
      visualizerType: "jvm"
    },
    {
      id: 428,
      title: "Creating Models For Order",
      intro: "Define Order and OrderItem entities with relational foreign keys.",
      explanation: "Map Order and OrderItem entities. Order contains fields like orderId, customerEmail, and orderDate. OrderItem represents items in the order, referencing Product and Order.",
      gotchas: [
        "Use FetchType.LAZY on relationships to prevent loading entire child data recursively which causes N+1 query problem."
      ],
      interviewQuestions: [
        {
          question: "What is the N+1 query problem in ORM?",
          answer: "It occurs when the ORM executes 1 query to fetch a list of parent rows, and then executes N additional queries to fetch child data for each individual row."
        }
      ],
      code: `@Entity
@Table(name = "customer_orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String customerEmail;
    private Date orderDate;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}`,
      visualizerType: "jvm"
    },
    {
      id: 429,
      title: "Creating Order Controller",
      intro: "Expose HTTP POST endpoints to process incoming checkouts.",
      explanation: "1. The Order Controller exposes REST endpoints for creating and fetching orders. It sits in the web layer — it receives HTTP requests, delegates to the service, and returns HTTP responses.\n2. POST /order accepts an OrderRequest DTO as @RequestBody. The controller calls orderService.placeOrder(request) and returns the created Order or a success response with HTTP 200 or 201.\n3. Extract the customer username from the security context, NOT from the request body: `SecurityContextHolder.getContext().getAuthentication().getName()`. Never trust client-sent user IDs for authorization.\n4. @RestController = @Controller + @ResponseBody. All method return values are serialized to JSON automatically. Combined with @RequestMapping, it handles the routing.\n5. Best practice: Controllers should contain zero business logic. Calculations, stock checks, and transactions all go in the service layer. Controllers only: (a) parse input, (b) call service, (c) return response.",
      gotchas: [
        "Include validation on DTO inputs to ensure emails are valid and quantities are positive."
      ],
      interviewQuestions: [
        {
          question: "What annotation registers a class to handle REST web endpoints?",
          answer: "@RestController annotation, which enables serialization of outputs directly into response bodies."
        }
      ],
      code: `@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 430,
      title: "Place Order In Service Part 1",
      intro: "Implement stock checks and order instantiation logic in the service.",
      explanation: "OrderService verifies that all items inside the OrderRequest are valid. It fetches products, validates if available quantities satisfy the requests, and returns error responses otherwise.",
      gotchas: [
        "Throw custom runtime exceptions if stock is insufficient to halt executions and trigger transaction rollbacks automatically."
      ],
      interviewQuestions: [
        {
          question: "Why should service methods throw RuntimeExceptions instead of Checked Exceptions to roll back transactions?",
          answer: "By default, Spring transactions roll back automatically only for unchecked (RuntimeException) exceptions. Checked exceptions require explicit rollback configuration."
        }
      ],
      code: `public Order createOrder(OrderRequest request) {
    Order order = new Order();
    order.setCustomerEmail(request.getCustomerEmail());
    order.setOrderDate(new Date());
    // Processing items next...
    return order;
}`,
      visualizerType: "jvm"
    },
    {
      id: 431,
      title: "Place Order In Service Part 2",
      intro: "Calculate order totals, decrement stock inventory, and persist data.",
      explanation: "Complete the transaction logic: calculate line items, decrement product stock by requested quantities, link items with the parent Order, and save both.",
      gotchas: [
        "Always execute updates through service layers annotated with @Transactional to ensure modifications occur atomically."
      ],
      interviewQuestions: [
        {
          question: "What does the cascade = CascadeType.ALL property do in mappings?",
          answer: "It propagates all entity lifecycle operations (persist, merge, remove) from parent entity to associated child entities automatically."
        }
      ],
      code: `@Transactional
public Order createOrder(OrderRequest request) {
    Order order = new Order();
    // Validate stock, decrement quantity, link and save order
    return orderRepository.save(order);
}`,
      visualizerType: "jvm"
    },
    {
      id: 432,
      title: "Get All Orders",
      intro: "Implement endpoints to fetch history of placed store orders.",
      explanation: "1. GET /orders (admin) or GET /orders/user (current user) returns a list of all orders. The controller calls orderService.getAllOrders() and returns List<Order> as JSON.\n2. For user-specific orders, extract the authenticated username from Spring Security context and filter: orderRepo.findByUsername(username) — only return the logged-in user's orders.\n3. Lazy loading trap: Order has @OneToMany to OrderItems. When Hibernate lazily loads, accessing orderItems outside a session throws LazyInitializationException. Fix: use @Transactional on service method, or use FETCH JOIN in JPQL, or switch to EAGER fetch.\n4. For large datasets, add pagination: return Page<Order> and accept Pageable as a parameter. Spring Data JPA handles LIMIT/OFFSET automatically.\n5. Use DTOs or @JsonIgnore to prevent circular JSON serialization — Order → OrderItem → Order creates an infinite loop that crashes the Jackson serializer.",
      gotchas: [
        "Because orders reference order items which reference products, avoid serialization loops by using @JsonManagedReference and @JsonBackReference annotations."
      ],
      interviewQuestions: [
        {
          question: "How do you prevent circular dependency loops during JSON serialization in JPA?",
          answer: "By using @JsonIgnore, @JsonManagedReference/@JsonBackReference annotations, or mapping entities to clean DTOs before return."
        }
      ],
      code: `@GetMapping
public List<Order> getAllOrders() {
    return orderService.getOrders();
}`,
      visualizerType: "jvm"
    },
    {
      id: 433,
      title: "Spring Data Rest Introduction",
      intro: "Expose complete REST endpoints for entities instantly without writing controllers or services.",
      explanation: "Spring Data REST is a framework built on top of Spring Data repositories. It automatically exposes HATEOAS-compliant REST endpoints directly from repository definitions, completely bypassing Controller code creation.",
      gotchas: [
        "Exposing repositories directly via Spring Data REST can be dangerous as it exposes raw database structures to the network without validation layers."
      ],
      interviewQuestions: [
        {
          question: "What is Spring Data REST?",
          answer: "It is a module that automatically analyzes repository interfaces and exposes HTTP endpoints (GET, POST, PUT, DELETE) representing those resources without requiring controllers."
        }
      ],
      code: `// Spring Data REST automatically exposes '/products' based on repository interface!`,
      visualizerType: "null"
    },
    {
      id: 434,
      title: "Creating a Spring Data REST Project",
      intro: "Bootstrap automatic REST systems using Initializr dependencies.",
      explanation: "1. Spring Data REST is a Spring Boot module that automatically exposes JPA repository methods as RESTful HAL-JSON endpoints — zero controller code needed for basic CRUD.\n2. Add dependency: spring-boot-starter-data-rest. Spring Boot auto-configures REST endpoints for every JpaRepository found in the classpath.\n3. Auto-generated endpoints: GET /entities (list all), GET /entities/{id} (find one), POST /entities (create), PUT /entities/{id} (update), DELETE /entities/{id} (delete). Pagination and sorting built in via ?page=0&size=10&sort=name.\n4. HAL (Hypertext Application Language) format: responses include _links fields that point to related resources. This is HATEOAS — clients navigate the API via links, not hardcoded URLs.\n5. Downside: Spring Data REST is great for prototyping but exposes too much by default in production. Customize with @RepositoryRestResource(exported=false) to hide endpoints, and use projections to control what fields are returned.",
      gotchas: [
        "Do not add custom controller routes mapping the same paths exposed by Spring Data REST, otherwise conflicts occur."
      ],
      interviewQuestions: [
        {
          question: "What starter dependency is needed for Spring Data REST?",
          answer: "The 'spring-boot-starter-data-rest' dependency."
        }
      ],
      code: `<!-- Maven dependency -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-rest</artifactId>
</dependency>`,
      visualizerType: "jvm"
    },
    {
      id: 435,
      title: "Running the Project",
      intro: "Inspect the generated HAL-Explorer and endpoints exposed by Spring Data REST.",
      explanation: "1. Start the Spring Data REST project: `mvn spring-boot:run`. No extra configuration — Spring Boot auto-detects repositories and wires REST endpoints at application startup.\n2. Verify endpoints: open browser or Postman to `http://localhost:8080/` — Spring Data REST returns a HAL explorer page listing all exposed entity collections.\n3. Test a collection: GET `http://localhost:8080/products` returns a paged list of products in HAL+JSON format with _embedded, _links, and page metadata.\n4. Check application.properties: set `spring.data.rest.base-path=/api` to prefix all endpoints as /api/products, /api/orders, etc. — good practice to namespace REST APIs.\n5. Use the HAL Browser (add spring-data-rest-hal-explorer dependency) for an interactive browser-based UI to explore and test all auto-generated endpoints during development.",
      gotchas: [
        "Spring Data REST automatically pluralizes entity names (e.g. Product -> products). Be aware of the pluralization rules when requesting routes."
      ],
      interviewQuestions: [
        {
          question: "What format does Spring Data REST use to return resource links?",
          answer: "HAL (Hypertext Application Language), which includes '_links' metadata allowing clients to navigate the API dynamically."
        }
      ],
      code: `@RepositoryRestResource(collectionResourceRel = "items", path = "items")
public interface ItemRepository extends JpaRepository<Item, Integer> {
}`,
      visualizerType: "jvm"
    },
    {
      id: 436,
      title: "Update and Delete Operations",
      intro: "Perform modifications on Spring Data REST endpoints using standard HTTP methods.",
      explanation: "1. Spring Data REST auto-generates PUT /entities/{id} for full updates and PATCH /entities/{id} for partial updates. DELETE /entities/{id} removes the record — no controller code required.\n2. PUT sends the full resource body; fields not included are set to null. PATCH sends only the fields to change — the rest stay unchanged. Use PATCH for typical 'edit one field' scenarios.\n3. DELETE returns 204 No Content on success. If the entity doesn't exist, it returns 404. Cascade settings on your JPA entity determine whether child records are also deleted.\n4. Customize behavior: override the default with a @RepositoryRestController that takes precedence over auto-generated methods while still using Spring Data REST infrastructure.\n5. Security tip: In production, restrict DELETE and PUT with method-level security: @PreAuthorize('hasRole(ADMIN)') on the repository or use HttpSecurity to protect specific patterns.",
      gotchas: [
        "Any client with access to endpoints can perform writes/deletes. You must secure these endpoints using Spring Security configurations."
      ],
      interviewQuestions: [
        {
          question: "How do you disable specific HTTP operations in Spring Data REST?",
          answer: "By overriding configuration settings or using @RestResource(exported = false) on specific methods or repository interfaces."
        }
      ],
      code: `// Disabling DELETE endpoint
@Override
@RestResource(exported = false)
void deleteById(Integer id);`,
      visualizerType: "jvm"
    }
  ]
};
