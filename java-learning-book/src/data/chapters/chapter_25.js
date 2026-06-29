export default {
  id: 25,
  title: "Spring MVC & Web Applications",
  range: "355-389",
  concepts: [
    {
      id: 355,
      title: "Web App Introduction",
      intro: "How the client-server model keeps the internet connected, and how Java fits into the picture.",
      explanation: "A web application is a software application that runs on a remote server and is accessed by users through a web browser. The client sends a request (usually HTTP), the web server processes it (running business logic and fetching DB data), and returns a response (usually HTML, CSS, JS, or JSON). Java has historically dominated the backend side of this architecture.",
      gotchas: [
        "Web browsers only understand HTML, CSS, and JavaScript. Your server-side Java code must compile or render its outputs into these formats, or send pure JSON data."
      ],
      interviewQuestions: [
        {
          question: "Explain the basic request-response lifecycle of a web application.",
          answer: "A client initiates an HTTP request by typing a URL or interacting with a page. The request travels to the server, which runs container code (like Servlets) to process logic. The server constructs an HTTP response containing headers and a body (HTML/JSON) and sends it back to the client."
        }
      ],
      code: `// Conceptual Flow:
// Client (Browser) ---> HTTP GET Request ---> Web Server (Java Runtime)
// Client (Browser) <--- HTTP Response (HTML/JSON) <--- Web Server`,
      visualizerType: "null"
    },
    {
      id: 356,
      title: "Creating A Servlet Project",
      intro: "Servlets are the foundational building blocks of Java web applications.",
      explanation: "A Servlet is a Java class that extends HttpServlet and runs inside a Servlet container (like Apache Tomcat). It listens for requests, processes them, and returns responses. To create a servlet project, you need a Maven webapp archetype, adding the 'servlet-api' dependency.",
      gotchas: [
        "Ensure the servlet-api dependency scope is set to 'provided', because the servlet container (Tomcat) already includes these libraries at runtime."
      ],
      interviewQuestions: [
        {
          question: "What is a Servlet in Java?",
          answer: "A Servlet is a Java class used to extend the capabilities of servers that host applications accessed by means of a request-response programming model (typically HTTP). Classes inherit from HttpServlet."
        }
      ],
      code: `import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class MyServlet extends HttpServlet {
    // Servlet lifecycle methods go here
}`,
      visualizerType: "jvm"
    },
    {
      id: 357,
      title: "Running Tomcat",
      intro: "A servlet container is the runtime engine that manages servlets and listens to HTTP ports.",
      explanation: "Apache Tomcat is a web server and servlet container. To run Tomcat, you deploy your Web Application Archive (.war file) to the 'webapps' folder and start the server using startup.sh (Linux/Mac) or startup.bat (Windows). Tomcat listens by default on port 8080.",
      gotchas: [
        "If port 8080 is already in use by another application, Tomcat will fail to start. You can change the port in conf/server.xml."
      ],
      interviewQuestions: [
        {
          question: "What is Apache Tomcat's role in a Java Web application?",
          answer: "Tomcat acts as the Servlet Container. It listens to HTTP requests, routes them to correct servlets, manages servlet lifecycles, and sends response packets back to clients."
        }
      ],
      code: `# Starting Tomcat manually from command line
cd apache-tomcat/bin
./startup.sh`,
      visualizerType: "null"
    },
    {
      id: 358,
      title: "Servlet Mapping",
      intro: "Connect incoming URL patterns to specific Java Servlet classes.",
      explanation: "Servlet mapping tells the servlet container which servlet should handle a specific request URL. This can be configured in the deployment descriptor (web.xml) using <servlet-mapping> or via the modern @WebServlet annotation directly on the class.",
      gotchas: [
        "If you map two different servlets to the exact same URL pattern, the container will throw a deployment exception and fail to start."
      ],
      interviewQuestions: [
        {
          question: "How do you map a URL to a Servlet in modern Java?",
          answer: "By using the @WebServlet(\"/urlPath\") annotation on top of the servlet class, replacing the legacy XML configurations in web.xml."
        }
      ],
      code: `@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    // URL localhost:8080/hello will target this servlet
}`,
      visualizerType: "jvm"
    },
    {
      id: 359,
      title: "Responding to the Client",
      intro: "Write HTML dynamically from a Java servlet to display in the browser.",
      explanation: "To send a response to the client, obtain the PrintWriter object from the HttpServletResponse parameter using response.getWriter(). You can then use print() or println() to write HTML tags directly into the response stream.",
      gotchas: [
        "Always set the Content-Type header (e.g., 'text/html') before writing any content to response.getWriter() so the browser knows how to parse it."
      ],
      interviewQuestions: [
        {
          question: "How does a Servlet write dynamic content to the client?",
          answer: "By setting response.setContentType(\"text/html\") and obtaining the PrintWriter object using response.getWriter() to write the HTML payload."
        }
      ],
      code: `protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    resp.setContentType("text/html");
    PrintWriter out = resp.getWriter();
    out.println("<h1>Hello from Servlet!</h1>");
}`,
      visualizerType: "jvm"
    },
    {
      id: 360,
      title: "Introduction to MVC",
      intro: "Keep your frontend code out of your backend database queries.",
      explanation: "Model-View-Controller (MVC) is a design pattern that divides an application into three interconnected parts: Model (data/state), View (user interface), and Controller (processes input and updates Model/View). It keeps application layers independent and highly maintainable.",
      gotchas: [
        "Do not write database queries inside JSPs (Views) or HTML templates. That completely violates the MVC pattern."
      ],
      interviewQuestions: [
        {
          question: "What are the components of the MVC architectural pattern?",
          answer: "Model: Represents the application data and business rules. View: Represents the visual output (UI) shown to the user. Controller: Handles user requests, interacts with the model, and selects the view to render."
        }
      ],
      code: `// Model: Class holding data (e.g., Student)
// View: JSP/Thymeleaf/React page displaying fields
// Controller: Java controller managing navigation`,
      visualizerType: "null"
    },
    {
      id: 361,
      title: "Creating a Spring Boot Web App Project",
      intro: "Build modern web apps faster without the hassle of setting up Tomcat servers manually.",
      explanation: "Spring Boot Web starter (spring-boot-starter-web) comes with an embedded Tomcat server. It auto-configures Spring MVC support, Jackson JSON rendering, and local static resource folders, meaning your app is immediately ready to run as a standard executable jar.",
      gotchas: [
        "By default, Spring Boot Web looks for static files (HTML, CSS) in src/main/resources/static. JSP pages need special configuration and a parser dependency."
      ],
      interviewQuestions: [
        {
          question: "Does Spring Boot require an external Tomcat server to run web applications?",
          answer: "No. Spring Boot includes an embedded Tomcat container by default, allowing you to run web apps as standalone executable jar files."
        }
      ],
      code: `<!-- Spring Boot Web Starter in pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>`,
      visualizerType: "jvm"
    },
    {
      id: 362,
      title: "Creating a JSP Page",
      intro: "JavaServer Pages (JSP) allow you to embed Java code inside HTML templates.",
      explanation: "JSP is a server-side technology used to create dynamic web pages. The extension is .jsp. Spring Boot doesn't support JSP natively out-of-the-box in standalone jars, so you must include 'tomcat-embed-jasper' dependency for JSP compilation.",
      gotchas: [
        "JSPs must be placed in a very specific folder path: src/main/webapp/WEB-INF/views/ (or similar) to prevent clients from downloading source files directly."
      ],
      interviewQuestions: [
        {
          question: "Why is tomcat-embed-jasper dependency required when using JSPs in Spring Boot?",
          answer: "Tomcat-embed-jasper is the engine responsible for compiling JSP files (.jsp) into executable Java servlets at runtime."
        }
      ],
      code: `<!-- JSP Example file (index.jsp) -->
<html>
<body>
    <h2>Welcome to Java Book Portal! Current Time: <%= new java.util.Date() %></h2>
</body>
</html>`,
      visualizerType: "null"
    },
    {
      id: 363,
      title: "Creating a Controller",
      intro: "Map incoming HTTP requests to specific Java methods using controllers.",
      explanation: "A Controller is a component in Spring MVC. An ordinary Java class annotated with @Controller marks it as a web handler. Spring registers this class in its context, routing client requests based on mapping configurations.",
      gotchas: [
        "If you use @Controller, your handler methods must return a String representing the view name (like 'home' to render home.jsp) unless annotated with @ResponseBody."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between @Controller and @RestController in Spring Boot?",
          answer: "@Controller is used for traditional MVC views (returns view names for JSP/Thymeleaf). @RestController is a combination of @Controller and @ResponseBody, used to return serialized JSON/XML directly."
        }
      ],
      code: `@Controller
public class HomeController {
    @RequestMapping("/")
    public String home() {
        return "index"; // renders index.jsp or index.html
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 364,
      title: "RequestMapping",
      intro: "Route paths, request parameters, and HTTP verbs to appropriate handler methods.",
      explanation: "@RequestMapping is used to map web requests to handler classes or handler methods. It supports mapping by URL paths, HTTP methods (GET, POST, etc.), headers, and query parameters.",
      gotchas: [
        "Using @RequestMapping without specifying the method parameter makes it match all HTTP methods (GET, POST, PUT, DELETE, etc.) which can be a security vulnerability."
      ],
      interviewQuestions: [
        {
          question: "What are the shorthand annotations for @RequestMapping in Spring?",
          answer: "@GetMapping, @PostMapping, @PutMapping, @DeleteMapping, and @PatchMapping."
        }
      ],
      code: `@Controller
public class JobController {
    @RequestMapping(value = "/addJob", method = RequestMethod.POST)
    public String addJob() {
        return "success";
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 365,
      title: "Sending data to Controller",
      intro: "Pass inputs from HTML input fields and forms back to your Spring backend.",
      explanation: "When a user submits an HTML form, data is sent as query parameters (GET) or form URL-encoded payload (POST). Spring MVC provides multiple ways to capture this data, starting from native Servlet requests to automated binding.",
      gotchas: [
        "Make sure the 'name' attribute of your HTML form inputs matches the parameter names in your Controller methods, otherwise the values will resolve to null."
      ],
      interviewQuestions: [
        {
          question: "How does a web browser send form data to a Spring MVC controller?",
          answer: "By using an HTML form with an action attribute pointing to the controller endpoint and input tags having unique 'name' attributes."
        }
      ],
      code: `<!-- HTML Form -->
<form action="addStudent" method="post">
    <input type="text" name="studentName">
    <input type="submit" value="Submit">
</form>`,
      visualizerType: "null"
    },
    {
      id: 366,
      title: "Accepting Data the Servlet Way",
      intro: "Use the raw HttpServletRequest API to fetch form parameters.",
      explanation: "Before advanced binding, developers injected HttpServletRequest directly into controller method parameters. You then call request.getParameter(\"fieldName\") to read individual string values sent by the client.",
      gotchas: [
        "All values fetched via getParameter() are Strings. You must manually parse them into numeric types (e.g. Integer.parseInt()) which can trigger NumberFormatException."
      ],
      interviewQuestions: [
        {
          question: "Is it possible to access raw Servlet API classes in Spring MVC controllers?",
          answer: "Yes, you can declare HttpServletRequest or HttpServletResponse directly as arguments in your handler methods, and Spring will inject them."
        }
      ],
      code: `@RequestMapping("/add")
public String add(HttpServletRequest request) {
    String num1 = request.getParameter("num1");
    String num2 = request.getParameter("num2");
    // Manual computation or parsing
    return "result";
}`,
      visualizerType: "jvm"
    },
    {
      id: 367,
      title: "Display Data on Result Page",
      intro: "Render backend variables dynamically inside your view pages.",
      explanation: "To display backend variables inside a JSP view, we set attributes in the request scope. The JSP then uses Expression Language (EL) syntax like \${attributeName} to print out values.",
      gotchas: [
        "Ensure the JSP page is configured to support Expression Language. If EL expressions are printed literally as '\${variable}', add isELIgnored='false' in the JSP page directive."
      ],
      interviewQuestions: [
        {
          question: "How do you display a servlet request attribute in a JSP page?",
          answer: "By setting the attribute in Java using request.setAttribute(\"key\", value) and reading it in JSP using expression language: \${key}."
        }
      ],
      code: `// Controller/Servlet
request.setAttribute("result", 45);

<!-- JSP Page -->
<h3>The Result is: \${result}</h3>`,
      visualizerType: "null"
    },
    {
      id: 368,
      title: "RequestParam",
      intro: "Map individual HTTP request parameters directly to method arguments.",
      explanation: "The @RequestParam annotation binds query parameters or form fields directly to controller method arguments. It handles type conversion (e.g., converting a String parameter to an int) automatically.",
      gotchas: [
        "By default, @RequestParam makes the parameter mandatory. If the parameter is missing in the request URL, Spring will throw an HTTP 400 Bad Request error."
      ],
      interviewQuestions: [
        {
          question: "How do you make a @RequestParam optional in Spring MVC?",
          answer: "By setting the 'required' attribute to false, e.g., @RequestParam(name = \"id\", required = false) or by using java.util.Optional."
        }
      ],
      code: `@RequestMapping("/sum")
public String sum(@RequestParam("num1") int n1, @RequestParam("num2") int n2, Model m) {
    int result = n1 + n2;
    m.addAttribute("result", result);
    return "result";
}`,
      visualizerType: "jvm"
    },
    {
      id: 369,
      title: "Model Object",
      intro: "A dedicated container to pass UI-bound attributes from controller to views.",
      explanation: "The Model interface is a container that holds application data for the view. Instead of using raw HttpServletRequest to store view attributes, Spring recommends using the Model parameter. Attributes added to the Model are exposed to the view engine.",
      gotchas: [
        "Model attributes are only available during the current request lifecycle. If you redirect the request, the model attributes are lost."
      ],
      interviewQuestions: [
        {
          question: "What is the role of the Model interface in Spring MVC?",
          answer: "It defines a holder for model attributes and is primarily designed for adding attributes to the model. Spring converts these into request-scope attributes for view rendering."
        }
      ],
      code: `@RequestMapping("/greet")
public String greet(@RequestParam("name") String name, Model model) {
    model.addAttribute("username", name);
    return "welcome";
}`,
      visualizerType: "jvm"
    },
    {
      id: 370,
      title: "Setting Prefix and Suffix",
      intro: "Clean up your return views by abstracting directory locations and file extensions.",
      explanation: "Instead of returning the complete path like '/WEB-INF/views/index.jsp', we configure a view resolver prefix and suffix in application.properties. This allows us to return simple logical view names like 'index'.",
      gotchas: [
        "If you set prefix and suffix properties, returning static files (like redirecting to external sites or custom paths) might fail if they get appended incorrectly."
      ],
      interviewQuestions: [
        {
          question: "How do you configure the prefix and suffix for JSP view resolution in Spring Boot?",
          answer: "By defining spring.mvc.view.prefix=/WEB-INF/views/ and spring.mvc.view.suffix=.jsp in application.properties."
        }
      ],
      code: `# application.properties
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp`,
      visualizerType: "null"
    },
    {
      id: 371,
      title: "ModelAndView",
      intro: "Combine your Model data and View name into a single returned container object.",
      explanation: "ModelAndView is a single holder object that contains both the view name and the model attributes. Methods can return ModelAndView as a single return value, giving the developer complete programmatic control over both.",
      gotchas: [
        "Ensure you instantiate ModelAndView correctly before adding attributes to it, otherwise you will get a NullPointerException."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between returning String and ModelAndView in Spring MVC?",
          answer: "Returning String returns only the view name (requiring Model to be passed as a method parameter). Returning ModelAndView wraps both the view name and data in a single return object."
        }
      ],
      code: `@RequestMapping("/result")
public ModelAndView getResult() {
    ModelAndView mv = new ModelAndView();
    mv.setViewName("result");
    mv.addObject("score", 99);
    return mv;
}`,
      visualizerType: "jvm"
    },
    {
      id: 372,
      title: "Need for ModelAttribute",
      intro: "Avoid manually creating and populating Java beans from dozens of request params.",
      explanation: "If you have a form with 10 fields (like name, age, city, zip, email, etc.), mapping them individually using @RequestParam is tedious and makes code messy. We need a way to auto-bind all matching request attributes directly into a Java object.",
      gotchas: [
        "If the setter names in your Java object do not match the input parameter names from the HTML form, Spring will skip those fields and leave them null."
      ],
      interviewQuestions: [
        {
          question: "Why do we use @ModelAttribute in Spring MVC handler methods?",
          answer: "To bind request parameters (from forms or query strings) directly to a domain object or DTO, avoiding manual construction and individual mapping of parameters."
        }
      ],
      code: `// Manual mapping (bad approach for large forms):
// public String save(String name, int age, String email, String address...) { ... }

// Solution: Bind directly into a model object using @ModelAttribute!`,
      visualizerType: "jvm"
    },
    {
      id: 373,
      title: "Using ModelAttribute",
      intro: "Bind incoming form parameters to a Java object with a single annotation.",
      explanation: "@ModelAttribute binds a method parameter or method return value to a named model attribute, exposing it to the web view. When applied to a method parameter, it populates the object fields with matching request parameters.",
      gotchas: [
        "Spring automatically instantiates and binds the object even if you omit @ModelAttribute, but explicitly writing it makes code self-documenting and readable."
      ],
      interviewQuestions: [
        {
          question: "How does @ModelAttribute work under the hood?",
          answer: "Spring inspects the request parameters, instantiates the target object using its default constructor, matches parameter names with object fields, and invokes setters to bind the values."
        }
      ],
      code: `@PostMapping("/register")
public String registerUser(@ModelAttribute("user") User user) {
    // User fields (username, password, email) are auto-populated from form!
    return "profile";
}`,
      visualizerType: "jvm"
    },
    {
      id: 374,
      title: "Spring MVC Introduction",
      intro: "Explore the core architecture of Spring's Web MVC framework.",
      explanation: "Spring Web MVC is a request-driven framework built around a central DispatcherServlet that handles all HTTP request routing, processing, and rendering tasks. It integrates cleanly with the Spring IOC container.",
      gotchas: [
        "Do not confuse Spring MVC with raw Spring. Spring MVC is specifically the web framework module designed for building web-based projects."
      ],
      interviewQuestions: [
        {
          question: "What is Spring MVC?",
          answer: "Spring MVC is a Java framework used to build web applications based on the Model-View-Controller design pattern. It centers around a front controller named DispatcherServlet."
        }
      ],
      code: `// Core Components:
// 1. DispatcherServlet (Front Controller)
// 2. HandlerMapping (Maps request to controller)
// 3. Controller (Processes logic)
// 4. ViewResolver (Finds view templates)`,
      visualizerType: "null"
    },
    {
      id: 375,
      title: "Creating a Spring MVC Project (Part 1)",
      intro: "Set up a standard non-Spring Boot legacy Spring MVC project using web.xml.",
      explanation: "Before Spring Boot, setting up Spring MVC required declaring the DispatcherServlet in WEB-INF/web.xml and configuring context loaders and component-scanning in spring-servlet.xml manually.",
      gotchas: [
        "Ensure all configuration files are placed in correct paths inside WEB-INF. Tomcat won't boot if spring-servlet.xml contains syntax or schema errors."
      ],
      interviewQuestions: [
        {
          question: "How did we bootstrap Spring MVC in Java web projects before Spring Boot?",
          answer: "By configuring DispatcherServlet in web.xml and defining view resolvers, mapping, and scan packages in a spring-servlet.xml context file."
        }
      ],
      code: `<!-- Legacy web.xml snippet -->
<servlet>
    <servlet-name>dispatcher</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
</servlet>`,
      visualizerType: "null"
    },
    {
      id: 376,
      title: "Running Tomcat in Eclipse",
      intro: "Integrate Apache Tomcat directly with your IDE for rapid local debugging.",
      explanation: "In traditional Java EE development, servers like Tomcat are configured in Eclipse or IntelliJ using plugins. The IDE compiles resources on the fly, deploys them to the server container, and auto-refreshes static resources.",
      gotchas: [
        "Sometimes files get stuck in server cache. Run 'Clean Tomcat Work Directory' in Eclipse if layout changes do not reflect in the browser."
      ],
      interviewQuestions: [
        {
          question: "Why do we map Tomcat inside Eclipse?",
          answer: "For seamless integration, allowing quick redeployment, hot-swapping code, and step-by-step debugging of controllers and services."
        }
      ],
      code: `# Server configuration step in IDE:
# 1. Open Servers View
# 2. Add New Server -> Apache Tomcat
# 3. Browse Tomcat install path & configure JDK`,
      visualizerType: "null"
    },
    {
      id: 377,
      title: "DispatcherServlet",
      intro: "Meet the gatekeeper of every single request in a Spring MVC app.",
      explanation: "DispatcherServlet acts as the Front Controller. It receives every incoming request, consults the HandlerMapping to find the appropriate controller, executes it, sends output to the ViewResolver, and renders the view.",
      gotchas: [
        "If DispatcherServlet is misconfigured (e.g. url-pattern is not '/'), it may fail to intercept requests, leading to 404 resource errors."
      ],
      interviewQuestions: [
        {
          question: "Explain the role of DispatcherServlet in Spring MVC.",
          answer: "It acts as the Front Controller pattern implementation, centralizing request handling and delegating duties to other components (HandlerMapping, Controllers, ViewResolvers)."
        }
      ],
      code: `// DispatcherServlet Flow Diagram:
// Client Request -> DispatcherServlet -> HandlerMapping (Resolves Controller)
//                -> Controller (Runs business logic) -> Returns ModelAndView
//                -> DispatcherServlet -> ViewResolver (Renders HTML) -> Client`,
      visualizerType: "dispatch"
    },
    {
      id: 378,
      title: "Configuring the DispatcherServlet",
      intro: "Tell Tomcat to route all web requests through Spring's front controller.",
      explanation: "In modern Spring, DispatcherServlet can be configured programmatically using WebApplicationInitializer instead of web.xml. We map the servlet to target root path ('/') to handle all requests.",
      gotchas: [
        "Mapping DispatcherServlet to default path '/' intercepts static files (CSS, JS) too. You must configure resources handler to ignore them."
      ],
      interviewQuestions: [
        {
          question: "How do you configure DispatcherServlet in modern Spring without XML files?",
          answer: "By implementing the WebApplicationInitializer interface or extending AbstractAnnotationConfigDispatcherServletInitializer."
        }
      ],
      code: `public class MyWebInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() { return null; }
    @Override
    protected Class<?>[] getServletConfigClasses() { return new Class[]{WebConfig.class}; }
    @Override
    protected String[] getServletMappings() { return new String[]{"/"}; }
}`,
      visualizerType: "jvm"
    },
    {
      id: 379,
      title: "Internal Resource View Resolver",
      intro: "A dedicated helper bean that resolves JSP names to actual files.",
      explanation: "InternalResourceViewResolver is the default view resolver implementation. It automatically prefixes and suffixes controller returned view names to find actual resources under WEB-INF.",
      gotchas: [
        "If you return a redirect (e.g., 'redirect:/home'), the ViewResolver is bypassed, and a client redirect is triggered."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of InternalResourceViewResolver?",
          answer: "It maps logical view names returned by controllers (e.g., 'home') to physical view resources under WebApp directory (e.g., '/WEB-INF/views/home.jsp')."
        }
      ],
      code: `@Bean
public ViewResolver viewResolver() {
    InternalResourceViewResolver resolver = new InternalResourceViewResolver();
    resolver.setPrefix("/WEB-INF/views/");
    resolver.setSuffix(".jsp");
    return resolver;
}`,
      visualizerType: "jvm"
    },
    {
      id: 380,
      title: "Summary",
      intro: "Let's summarize the core concepts of Spring Web MVC architecture.",
      explanation: "You now understand how the request moves from the Client to Tomcat, gets intercepted by the DispatcherServlet, processed by Controller classes, maps dynamic variables using Model, and resolves files using InternalResourceViewResolver.",
      gotchas: [
        "Always ensure your dependencies are correct. Starter Web includes Tomcat, but does not include JSP parsing engines."
      ],
      interviewQuestions: [
        {
          question: "Summarize the flow of a request in Spring MVC.",
          answer: "Request hits DispatcherServlet -> delegates to HandlerMapping -> targets Controller method -> executes logic -> returns view name -> ViewResolver maps file -> dynamic data is injected -> HTML rendered to client."
        }
      ],
      code: `// Everything is wired up: WebInitializer -> WebConfig -> ViewResolver -> Controller`,
      visualizerType: "null"
    },
    {
      id: 381,
      title: "Job App Source Code",
      intro: "We will build a complete 'Job App' portal to match jobs with potential applicants.",
      explanation: "The Job App project is a web app where users can view available job openings and submit new job posts. We will divide this project into clean packages: model, repo, service, and controller.",
      gotchas: [
        "Ensure all class files are stored in subpackages of your main App package so that Spring's @SpringBootApplication component scan detects them."
      ],
      interviewQuestions: [
        {
          question: "What is the role of a DTO (Data Transfer Object) in web applications?",
          answer: "A DTO is an object that carries data between processes. It is used to encapsulate data and prevent database entities from exposing internal details to client layers directly."
        }
      ],
      code: `// Project Structure:
// com.telusko.jobapp
//  ├── controller/ (JobController)
//  ├── model/      (JobPost)
//  ├── repo/       (JobRepo)
//  └── service/    (JobService)`,
      visualizerType: "null"
    },
    {
      id: 382,
      title: "Building Job App",
      intro: "Design the requirements and model definition for our Job Application.",
      explanation: "First, define the core domain object, JobPost, with fields like postId, postProfile, postDesc, reqExperience, and postTechStack. This class serves as the Model in our MVC pattern.",
      gotchas: [
        "Provide getters, setters, and a default constructor for your model class. Spring needs them for binding form data."
      ],
      interviewQuestions: [
        {
          question: "Why does Spring need a default constructor in Model classes?",
          answer: "During form binding or JSON deserialization, Spring instantiates objects using their default (no-argument) constructors before populating fields via setter methods."
        }
      ],
      code: `public class JobPost {
    private int postId;
    private String postProfile;
    private String postDesc;
    private int reqExperience;
    private List<String> postTechStack;

    // Constructors, Getters, and Setters
}`,
      visualizerType: "jvm"
    },
    {
      id: 383,
      title: "Creating a Project",
      intro: "Set up the Spring Boot initializer configuration for the Job Application project.",
      explanation: "Create the project using Maven. Add dependencies: Spring Web, Thymeleaf or JSP dependencies, and Lombok (to reduce boilerplate getters/setters). Run the application class containing @SpringBootApplication.",
      gotchas: [
        "When using Lombok, make sure the Lombok plugin is installed in your IDE, or you will get compile errors for missing getters and setters."
      ],
      interviewQuestions: [
        {
          question: "What does the @SpringBootApplication annotation do?",
          answer: "It is a convenience annotation that combines @Configuration, @EnableAutoConfiguration, and @ComponentScan on the main application class."
        }
      ],
      code: `@SpringBootApplication
public class JobAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(JobAppApplication.class, args);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 384,
      title: "Understanding Views",
      intro: "Design view files to render job data in a user-friendly layout.",
      explanation: "For the front-end views, we create JSP or HTML templates inside the designated views folder. We build pages like 'home.jsp', 'addjob.jsp', and 'viewalljobs.jsp' using standard form bindings.",
      gotchas: [
        "Ensure styling stylesheets and frameworks (like Bootstrap) are referenced using absolute context paths so they load correctly from any route."
      ],
      interviewQuestions: [
        {
          question: "How do views retrieve data sent from controllers?",
          answer: "Views fetch controller-supplied data by using expression tags (like JSP's \${modelAttr}) linked to attributes defined in the Model map."
        }
      ],
      code: `<!-- home.jsp -->
<html>
<body>
    <h1>Welcome to Job Portal</h1>
    <a href="addjob">Post a new job</a>
    <a href="viewalljobs">View current listings</a>
</body>
</html>`,
      visualizerType: "null"
    },
    {
      id: 385,
      title: "Home and Add Job Controller",
      intro: "Add navigation routes to handle displaying home and job creation pages.",
      explanation: "The JobController class maps requests for navigation. The root path returns 'home', '/addjob' returns the form template, and a POST mapping processes the job submission.",
      gotchas: [
        "Do not name controller methods after views directly. Name them based on actions to maintain readability."
      ],
      interviewQuestions: [
        {
          question: "How do you handle GET and POST mappings for the same URL path?",
          answer: "By defining separate methods with @GetMapping(\"/path\") and @PostMapping(\"/path\") within your @Controller class."
        }
      ],
      code: `@Controller
public class JobController {
    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/addjob")
    public String addJobForm() {
        return "addjob";
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 386,
      title: "Handling Forms",
      intro: "Capture form-submitted jobs and bind them into a JobPost model.",
      explanation: "When a user fills the job details form and clicks submit, the data is posted. We use @ModelAttribute to automatically map the fields of the form into a JobPost object.",
      gotchas: [
        "If a field value is empty or not matching the type (e.g. writing letters in a number input), Spring will throw a MethodArgumentTypeMismatchException."
      ],
      interviewQuestions: [
        {
          question: "How does Spring MVC bind forms containing collections (like tech stack list)?",
          answer: "Spring MVC maps multiple fields or comma-separated values matching the parameter name (e.g. 'postTechStack') directly into a List<String> or array."
        }
      ],
      code: `@PostMapping("/handleForm")
public String handleForm(@ModelAttribute JobPost jobPost) {
    // jobPost is filled with form data
    return "success";
}`,
      visualizerType: "jvm"
    },
    {
      id: 387,
      title: "Working with Layers",
      intro: "Integrate JobService and JobRepo layers to persist your new jobs.",
      explanation: "Instead of printing or ignoring submitted data, pass the JobPost object to JobService. The Service performs any validations or rules, then delegates persistence to JobRepo which stores it in memory or a database.",
      gotchas: [
        "Avoid using static fields inside repository classes to store data in multi-threaded environments, as they can cause data race issues. Use concurrent collections."
      ],
      interviewQuestions: [
        {
          question: "What annotation marks a Spring class as a business layer?",
          answer: "The @Service annotation, which is a specialization of the generic @Component stereotype."
        }
      ],
      code: `@Service
public class JobService {
    @Autowired
    private JobRepo repo;

    public void addJob(JobPost job) {
        repo.save(job);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 388,
      title: "View Data",
      intro: "Retrieve the list of jobs and display them inside a tabular layout.",
      explanation: "To view all jobs, define a route '/viewalljobs'. The handler method fetches the complete job list via the Service layer, attaches it to the Model, and passes the view name to render the elements.",
      gotchas: [
        "If the list is empty, handle the state gracefully in the view instead of rendering empty table structures."
      ],
      interviewQuestions: [
        {
          question: "How do you render a list of objects in JSP?",
          answer: "By importing the JSTL core library (<%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %>) and iterating over the list using the <c:forEach> tag."
        }
      ],
      code: `@GetMapping("/viewalljobs")
public String viewJobs(Model m) {
    List<JobPost> jobs = service.getAllJobs();
    m.addAttribute("jobList", jobs);
    return "viewalljobs";
}`,
      visualizerType: "jvm"
    },
    {
      id: 389,
      title: "Summary for Job Webapp",
      intro: "Recap the key architectural takeaways from our first complete Spring MVC project.",
      explanation: "We successfully built a complete layered web app: Front-end views, Controller handling routing, Service executing business flows, and Repository storing job posts. This foundation prepares you for database integration and REST configurations.",
      gotchas: [
        "Keep controller methods lean. Delegating heavy code flows to services is standard architectural practice."
      ],
      interviewQuestions: [
        {
          question: "Explain why controllers should remain lightweight.",
          answer: "Controllers should only be responsible for handling requests, routing, parameter binding, and choosing views. Keeping them light keeps business code reusable and testable."
        }
      ],
      code: `// Job Web App Completed. Ready to migrate to Spring Boot REST APIs!`,
      visualizerType: "null"
    }
  ]
};
