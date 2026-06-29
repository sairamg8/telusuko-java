export default {
  id: 26,
  title: "Building RESTful APIs with Spring Boot",
  range: "390-400",
  concepts: [
    {
      id: 390,
      title: "REST Using Spring Boot: Introduction",
      intro: "Transition from server-side page templates to modern, stateless API architectures.",
      explanation: "In traditional MVC webapps, the server returns complete rendered HTML/JSP pages. In RESTful systems, the server serves raw data (usually JSON) which can be consumed by multiple client types, such as single-page web applications (React, Angular), mobile apps (Android, iOS), or other backend services.",
      gotchas: [
        "A REST Controller does not return HTML views. Returning a string from a REST method returns raw text/JSON directly, not a file template."
      ],
      interviewQuestions: [
        {
          question: "Why has REST become standard in modern application development?",
          answer: "It decouples the frontend from the backend. The server becomes completely stateless, serving raw data (JSON), which allows the same backend to power web, mobile, and third-party integrations."
        }
      ],
      code: `// REST Controller returns serializable data structures:
@RestController
public class JobRestController {
    @GetMapping("/jobs")
    public List<JobPost> getAllJobs() {
        return service.getAllJobs(); // Auto-serialized to JSON!
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 391,
      title: "What Is REST?",
      intro: "Representational State Transfer (REST) is an architectural style for design.",
      explanation: "REST relies on resources (nouns) identified by unique URIs. It is stateless (no session state stored on the server), uses standard HTTP methods, and can represent data in formats like JSON, XML, or Text. It enforces a uniform interface.",
      gotchas: [
        "REST is not a protocol, it's an architectural style. You don't 'install' REST; you follow its architectural constraints."
      ],
      interviewQuestions: [
        {
          question: "Name 4 key architectural constraints of REST.",
          answer: "1. Statelessness, 2. Client-Server separation, 3. Cacheability, 4. Uniform Interface (using URIs and standard HTTP methods)."
        }
      ],
      code: `// REST Resource URL Convention:
// GET    http://api.example.com/v1/jobs      - Fetch all jobs
// GET    http://api.example.com/v1/jobs/101  - Fetch job with ID 101`,
      visualizerType: "null"
    },
    {
      id: 392,
      title: "HTTP Methods",
      intro: "Use HTTP verbs to specify the exact actions you want to perform on a resource.",
      explanation: "HTTP methods describe the CRUD operation: GET (Retrieve), POST (Create), PUT (Update entire resource), DELETE (Remove), and PATCH (Partial update). GET and PUT should be idempotent, meaning multiple identical requests yield the same outcome.",
      gotchas: [
        "POST is not idempotent; sending the same POST request multiple times will result in multiple resource creations."
      ],
      interviewQuestions: [
        {
          question: "What is an idempotent HTTP method?",
          answer: "An idempotent method is one where multiple identical requests produce the same database/application state. GET, PUT, and DELETE are idempotent; POST is not."
        }
      ],
      code: `// Mapping CRUD to HTTP methods:
// Create  -> POST
// Read    -> GET
// Update  -> PUT / PATCH
// Delete  -> DELETE`,
      visualizerType: "null"
    },
    {
      id: 393,
      title: "Understanding the React UI",
      intro: "Understand how frontend applications consume JSON data from our Spring Boot REST services.",
      explanation: "A React user interface handles its own routing and layout in the browser. It triggers network requests (using fetch or axios) to contact our Spring backend, retrieves JSON objects, parses them, and updates its local virtual DOM to display lists or forms dynamically.",
      gotchas: [
        "React applications run on a different port (e.g. 5173). Connecting them triggers CORS (Cross-Origin Resource Sharing) blockages unless configured on Spring Boot."
      ],
      interviewQuestions: [
        {
          question: "How does React render list data fetched from a backend?",
          answer: "By calling an HTTP request inside a useEffect hook, storing the returned array in component state using useState, and rendering elements using the map() function."
        }
      ],
      code: `// React Fetch Example
useEffect(() => {
  fetch('http://localhost:8080/jobs')
    .then(response => response.json())
    .then(data => setJobs(data));
}, []);`,
      visualizerType: "null"
    },
    {
      id: 394,
      title: "Working with Postman",
      intro: "Test and debug your REST endpoints without writing a single line of frontend code.",
      explanation: "Postman is an API client tool used to send HTTP requests to servers and verify responses. Developers use it to specify headers, URL paths, query variables, and request body payloads (JSON) and inspect HTTP status codes (200 OK, 201 Created, 404 Not Found, etc.).",
      gotchas: [
        "Ensure your POST request body content type in Postman is set to 'raw' and format is selected as 'JSON (application/json)' or your server will reject the payload."
      ],
      interviewQuestions: [
        {
          question: "What is the importance of HTTP status codes in REST APIs?",
          answer: "They communicate the outcome of the request. 2xx indicates success, 4xx indicates client-side errors (bad parameters, missingauth), and 5xx indicates server-side bugs."
        }
      ],
      code: `# Postman Request configuration:
# Method: POST
# URL: http://localhost:8080/jobs
# Body -> raw -> JSON: { "postId": 105, "postProfile": "DevOps" }`,
      visualizerType: "null"
    },
    {
      id: 395,
      title: "Creating a REST Controller",
      intro: "Decorate classes with @RestController to automatically serialize outputs to JSON.",
      explanation: "@RestController is a convenience annotation that combines @Controller and @ResponseBody. It tells Spring MVC that every handler method inside this class will write its returned data directly to the HTTP response body as JSON.",
      gotchas: [
        "Do not return String view names from a REST Controller unless you explicitly intend to return that string as raw text data."
      ],
      interviewQuestions: [
        {
          question: "How does @RestController serialize Java objects into JSON?",
          answer: "By default, Spring Boot uses the Jackson JSON library (ObjectMapper) registered in the HTTP message converters to serialize returned Java beans into JSON structures."
        }
      ],
      code: `@RestController
@RequestMapping("/api")
public class JobRestController {
    @GetMapping("/jobs")
    public List<JobPost> getJobs() {
        return List.of(new JobPost(1, "Dev", "Java Developer"));
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 396,
      title: "Connecting React and Spring",
      intro: "Enable Cross-Origin resource sharing so different ports can talk to each other.",
      explanation: "Browsers enforce Same-Origin Policy. To allow a React app running on port 3000/5173 to fetch data from a Spring Boot app on port 8080, we add the @CrossOrigin annotation to the Spring controller to whitelist the frontend domain.",
      gotchas: [
        "Never use @CrossOrigin(\"*\") in production environments. It is a major security flaw allowing any external site to read data. Always specify explicit origins."
      ],
      interviewQuestions: [
        {
          question: "What is CORS and how do you resolve it in Spring Boot?",
          answer: "CORS stands for Cross-Origin Resource Sharing. It is resolved by annotating Controller classes with @CrossOrigin(origins = \"http://yourfrontend.com\") or using global WebMvcConfigurer configurations."
        }
      ],
      code: `@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class JobRestController {
    // API endpoints go here
}`,
      visualizerType: "jvm"
    },
    {
      id: 397,
      title: "PathVariable",
      intro: "Extract variable parameters directly from the URL path.",
      explanation: "@PathVariable is used to bind placeholder variables in the request URI to method parameters. This is highly useful for locating specific resources by ID.",
      gotchas: [
        "If the name of the template placeholder (e.g. {id}) does not match the method argument name, you must specify the name parameter in @PathVariable(\"id\")."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between @RequestParam and @PathVariable?",
          answer: "@RequestParam extracts values from query parameters (e.g., /jobs?id=5). @PathVariable extracts values directly from the URL path structure (e.g., /jobs/5)."
        }
      ],
      code: `@GetMapping("/jobs/{id}")
public JobPost getJobById(@PathVariable("id") int id) {
    return service.getJob(id);
}`,
      visualizerType: "jvm"
    },
    {
      id: 398,
      title: "Sending Data and RequestBody",
      intro: "Deserialize incoming client-sent JSON data directly into Java domain objects.",
      explanation: "To receive objects from the client (like a new JobPost), the client sends a POST request with a JSON body. The @RequestBody annotation indicates that the method parameter should be bound to the body of the web request, mapped by Jackson converters.",
      gotchas: [
        "Ensure your client request headers include 'Content-Type: application/json', or Spring will fail with an HTTP 415 Unsupported Media Type error."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of @RequestBody in Spring REST?",
          answer: "It tells Spring to read the HTTP request body payload (JSON/XML) and automatically deserialize it into the annotated Java object."
        }
      ],
      code: `@PostMapping("/jobs")
public JobPost addJob(@RequestBody JobPost jobPost) {
    service.addJob(jobPost);
    return jobPost;
}`,
      visualizerType: "jvm"
    },
    {
      id: 399,
      title: "PUT and DELETE Mapping",
      intro: "Implement the Update and Delete endpoints of your REST resources.",
      explanation: "@PutMapping is used to handle HTTP PUT requests, representing updating an existing resource. @DeleteMapping handles HTTP DELETE requests, representing removing a resource from our database.",
      gotchas: [
        "Make sure to verify if the resource exists before attempting a PUT or DELETE, throwing a 404 status if the entity is missing."
      ],
      interviewQuestions: [
        {
          question: "What is the semantic difference between PUT and PATCH in REST?",
          answer: "PUT replaces the entire resource with the updated payload. PATCH performs a partial update, modifying only the fields supplied in the request body."
        }
      ],
      code: `@PutMapping("/jobs")
public JobPost updateJob(@RequestBody JobPost jobPost) {
    service.updateJob(jobPost);
    return jobPost;
}

@DeleteMapping("/jobs/{id}")
public String deleteJob(@PathVariable int id) {
    service.deleteJob(id);
    return "Deleted successfully";
}`,
      visualizerType: "jvm"
    },
    {
      id: 400,
      title: "Content Negotiation",
      intro: "Allow clients to request data in either JSON or XML formats dynamically.",
      explanation: "Content Negotiation is the mechanism where the client specifies the format of the response it wants (via the HTTP 'Accept' header), and the server delivers data in that format. To support XML output, add the jackson-dataformat-xml dependency.",
      gotchas: [
        "If a client requests a format (e.g., application/xml) and the server doesn't have the appropriate converter dependency registered, it will return HTTP 406 Not Acceptable."
      ],
      interviewQuestions: [
        {
          question: "How does a client specify the desired content format in REST?",
          answer: "By setting the 'Accept' header in the HTTP request (e.g., Accept: application/json or Accept: application/xml)."
        }
      ],
      code: `<!-- Maven dependency to enable XML response formatting -->
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
</dependency>`,
      visualizerType: "null"
    }
  ]
};
