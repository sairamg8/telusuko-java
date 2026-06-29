export default {
  id: 20,
  title: "Web Development with Servlets & JSP",
  range: "241-260",
  concepts: [
    {
      id: 241,
      title: "Servlet & JSP Source Code",
      intro: "Where servlet source files live and how they are structured.",
      explanation: "Java web application projects typically follow standard layout conventions: Java code resides in src/main/java, while static files (HTML, CSS) and JSP files are placed under src/main/webapp/ (inside WEB-INF or at the root).",
      gotchas: [
        "If files are placed directly inside the WEB-INF folder, they cannot be accessed directly by the client browser URL; they must be forwarded to via a Servlet or dispatcher."
      ],
      interviewQuestions: [
        {
          question: "Why are JSP files inside WEB-INF secure?",
          answer: "Because files inside WEB-INF cannot be directly requested by the client. They can only be accessed internally by request dispatchers."
        }
      ],
      code: `// Folder structure template:
// src/main/java (Servlets)
// src/main/webapp (JSP, CSS, images)
// src/main/webapp/WEB-INF (web.xml, protected views)`,
      visualizerType: "jvm"
    },
    {
      id: 242,
      title: "Introduction",
      intro: "Moving from console apps to web applications.",
      explanation: "Java isn't just for command line and desktop apps. With Java EE / Jakarta EE, Java has built-in APIs to process HTTP requests, build web endpoints, and serve dynamic web pages.",
      gotchas: [
        "Web applications run concurrently inside a multi-threaded servlet container. State management and concurrency control are crucial."
      ],
      interviewQuestions: [
        {
          question: "What is Jakarta EE?",
          answer: "It is the modernized, community-driven successor to Java EE (Enterprise Edition), offering standard APIs for web development, including Servlets and JSP."
        }
      ],
      code: `// Java web applications allow building server-side logic
// that listens to HTTP requests (GET, POST, etc.)`,
      visualizerType: "jvm"
    },
    {
      id: 243,
      title: "Fundamentals of Client - Server Architecture",
      intro: "Understanding HTTP request-response loops.",
      explanation: "Clients (browsers) request resources from servers using the HTTP protocol. The server processes the request and returns a response containing a status code (e.g. 200 OK, 404 Not Found), headers, and a body (HTML/JSON).",
      gotchas: [
        "HTTP is stateless. The server does not remember clients across multiple requests unless session tracking is explicitly configured."
      ],
      interviewQuestions: [
        {
          question: "What does HTTP being stateless mean?",
          answer: "It means each request is treated as independent. The server doesn't retain information about previous requests from the same client."
        }
      ],
      code: `/*
  Client (Browser) --------[ HTTP GET /index.html ]--------> Server (Tomcat)
  Client (Browser) <-------[ HTTP 200 OK (HTML) ]----------- Server (Tomcat)
*/`,
      visualizerType: "jvm"
    },
    {
      id: 244,
      title: "Static Response vs Dynamic Response",
      intro: "Fixed content vs generated content.",
      explanation: "A static response returns a pre-existing file on disk (like a static HTML file). A dynamic response is generated on the fly by executing code (e.g., fetching today's weather or querying user profiles from a database).",
      gotchas: [
        "Serving static files is highly performant and can be cached. Dynamic responses require CPU execution and DB lookups on every request."
      ],
      interviewQuestions: [
        {
          question: "Difference between static and dynamic web content?",
          answer: "Static content remains unchanged for every visitor unless manually edited. Dynamic content changes in response to user inputs, time, or database states."
        }
      ],
      code: `// Static: index.html on disk.
// Dynamic: Servlet querying database and formatting output:
// out.println("Hello, " + request.getParameter("name"));`,
      visualizerType: "jvm"
    },
    {
      id: 245,
      title: "Introduction to Servlet",
      intro: "Java classes that handle HTTP requests.",
      explanation: "A Servlet is a Java class that extends HttpServlet and runs inside a Servlet container. It receives HTTP requests, processes them using Java code, and writes responses back to the client.",
      gotchas: [
        "Servlets are singleton instances managed by the container. Since multiple client threads share a single servlet instance, you must avoid using mutable instance variables (which cause race conditions)."
      ],
      interviewQuestions: [
        {
          question: "Are Servlets thread-safe?",
          answer: "No, they are not thread-safe if they contain mutable instance variables because a single servlet instance processes concurrent requests in separate threads."
        }
      ],
      code: `import jakarta.servlet.http.*;
import java.io.IOException;

public class MyServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws IOException {
        resp.getWriter().println("Hello from Servlet!");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 246,
      title: "Install Apache Tomcat Server",
      intro: "Setting up the runtime environment for Servlets.",
      explanation: "Apache Tomcat is an open-source Servlet container (web server) that implements the Jakarta Servlet and JSP specifications. You download the zip, extract it, and start/stop it via scripts inside the bin/ directory.",
      gotchas: [
        "If port 8080 is already in use by another app (e.g., Jenkins, another Tomcat instance), Tomcat will fail to start. Edit conf/server.xml to change the connector port."
      ],
      interviewQuestions: [
        {
          question: "What is Apache Tomcat?",
          answer: "Tomcat is a servlet container and web server that compiles and runs Java web applications (Servlets and JSP)."
        }
      ],
      code: `# Starting Tomcat via terminal (Linux/Mac):
# ./bin/startup.sh
# Stopping Tomcat:
# ./bin/shutdown.sh`,
      visualizerType: "jvm"
    },
    {
      id: 247,
      title: "Configure Apache Tomcat in Eclipse IDE",
      intro: "Integrating Tomcat into your IDE workflow.",
      explanation: "In Eclipse, open the 'Servers' view, click 'New Server', select Apache -> Tomcat version, and point it to the directory where you extracted the Tomcat zip. This allows starting, stopping, and hot-deploying web applications from Eclipse.",
      gotchas: [
        "Sometimes Eclipse locks the server configuration. If changes aren't reflected, right-click the server and select 'Clean' to clear cached work directories."
      ],
      interviewQuestions: [
        {
          question: "Why do we configure Tomcat inside Eclipse?",
          answer: "To streamline development, run apps in debug mode, and deploy code changes automatically without manual packaging."
        }
      ],
      code: `// Eclipse uses Server Configurations to deploy dynamic web modules
// directly to Tomcat's webapps directory or temp workspace directory.`,
      visualizerType: "jvm"
    },
    {
      id: 248,
      title: "First Web App with Static Response",
      intro: "Setting up a basic web module with static files.",
      explanation: "Create a dynamic web project containing index.html inside src/main/webapp/. Access it by deploying the app and visiting http://localhost:8080/AppName/index.html.",
      gotchas: [
        "Ensure the file resides outside WEB-INF or else it won't be publicly accessible."
      ],
      interviewQuestions: [
        {
          question: "Where should static assets like CSS and image files be stored in a Java web project?",
          answer: "Directly inside the webapp folder, but outside the WEB-INF folder."
        }
      ],
      code: `<!DOCTYPE html>
<html>
<head><title>My Static Page</title></head>
<body>
    <h1>Welcome to Java Web Programming!</h1>
</body>
</html>`,
      visualizerType: "jvm"
    },
    {
      id: 249,
      title: "First Servlet Web App with Dynamic Response",
      intro: "Deploying your first functional Java servlet.",
      explanation: "Create a servlet class and map it to a URL using the @WebServlet(\"/hello\") annotation. Write dynamic HTML response strings back using response.getWriter().",
      gotchas: [
        "In older servlet specs (pre-3.0), mapping had to be declared in web.xml. Modern apps use simple annotations. Do not use both mappings for the same servlet."
      ],
      interviewQuestions: [
        {
          question: "How do you map a Servlet to a URL in modern Java web apps?",
          answer: "By using the @WebServlet annotation, e.g., @WebServlet(\"/endpoint\")."
        }
      ],
      code: `import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.*;

@WebServlet("/welcome")
public class WelcomeServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws IOException {
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<html><body><h2>Current Time: " + new java.util.Date() + "</h2></body></html>");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 250,
      title: "Servlet Life Cycle",
      intro: "The birth, life, and death of a servlet.",
      explanation: "The servlet lifecycle is managed entirely by the servlet container. It has three phases: 1. Initialization: container calls init() once. 2. Request Handling: container calls service() (which delegates to doGet(), doPost(), etc.) for every request. 3. Destruction: container calls destroy() once before shutting down or reloading.",
      gotchas: [
        "The init() and destroy() methods are called only once in the entire lifespan of a servlet, whereas service() is called repeatedly for each request."
      ],
      interviewQuestions: [
        {
          question: "Explain the servlet lifecycle methods.",
          answer: "init() initializes the servlet, service() handles client requests in a separate thread, and destroy() cleans up resources before unloading."
        }
      ],
      code: `import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class LifeCycleServlet extends HttpServlet {
    public void init() throws ServletException {
        System.out.println("init() called: Servlet initialized.");
    }
    
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {}
    
    public void destroy() {
        System.out.println("destroy() called: Servlet shutting down.");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 251,
      title: "Servlet doGet() vs doPost()",
      intro: "Reading data vs writing data.",
      explanation: "doGet() is invoked for GET requests (fetching data). Parameters are visible in the URL bar, and the request length is limited. doPost() is invoked for POST requests (submitting/creating data). Parameters are sent in the HTTP request body, which is secure and has no size restrictions.",
      gotchas: [
        "GET requests are idempotent and bookmarkable; POST requests are not. Never use GET to process state-modifying actions like deletes or checkouts."
      ],
      interviewQuestions: [
        {
          question: "When should you use doPost instead of doGet?",
          answer: "Use doPost for state-modifying actions (like submits, updates, deletions) or when sending sensitive data, to hide values from the URL and bypass size limits."
        }
      ],
      code: `protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
    // Read only: parameters inside query string
}

protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
    // Write/Submit: parameters inside request payload body
}`,
      visualizerType: "jvm"
    },
    {
      id: 252,
      title: "Redirecting Responses to JSP and HTML files",
      intro: "Navigating clients to new URL locations.",
      explanation: "1. `response.sendRedirect(\"target.jsp\")` sends HTTP 302 to the browser with a new Location URL. The browser then makes a fresh GET request to that URL — the address bar visibly changes.\n2. Key difference from RequestDispatcher.forward(): sendRedirect() is CLIENT-SIDE (browser makes new request, URL changes). forward() is SERVER-SIDE (server routes internally, URL stays the same, faster).\n3. Since redirect triggers a brand-new HTTP request, ALL request attributes set via request.setAttribute() are lost — the original request object is discarded after the redirect response is sent.\n4. To pass data across a redirect: use session attributes (session.setAttribute), URL query parameters (?key=value in the redirect URL), or the Flash scope pattern.\n5. Use sendRedirect() after handling POST form submissions — this implements the POST-REDIRECT-GET (PRG) pattern, which prevents duplicate form submissions if the user refreshes the confirmation page.",
      gotchas: [
        "Since redirection triggers a new HTTP request, any attributes stored in the original request object are lost."
      ],
      interviewQuestions: [
        {
          question: "Does sendRedirect keep request attributes?",
          answer: "No, because sendRedirect tells the client browser to make a brand-new request. The original request object is destroyed."
        }
      ],
      code: `protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws IOException {
    // Redirect client browser to a different URL
    resp.sendRedirect("success.html");
}`,
      visualizerType: "jvm"
    },
    {
      id: 253,
      title: "Request Dispatching and forward() vs include()",
      intro: "Internal page forwarding and inclusion.",
      explanation: "RequestDispatcher is used to delegate work internally on the server. forward(req, resp) passes the request completely to another resource (the client doesn't see the URL change). include(req, resp) embeds the target resource's response output directly into the current response.",
      gotchas: [
        "Unlike sendRedirect(), forwarding preserves the request and response objects, allowing you to pass request attributes."
      ],
      interviewQuestions: [
        {
          question: "Differentiate between forward() and sendRedirect().",
          answer: "forward() is executed server-side, URL doesn't change, is faster, and preserves request attributes. sendRedirect() is client-side, URL changes, triggers a new request, and loses attributes."
        }
      ],
      code: `protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
    req.setAttribute("message", "Hello from Servlet");
    RequestDispatcher rd = req.getRequestDispatcher("display.jsp");
    rd.forward(req, resp);
}`,
      visualizerType: "dispatch"
    },
    {
      id: 254,
      title: "HttpSession",
      intro: "Tracking conversational state across multiple requests.",
      explanation: "Because HTTP is stateless, the servlet container uses HttpSession to persist client-specific state. It generates a unique session ID (sent via a JSESSIONID cookie), allowing servers to store user data (e.g., shopping carts) across multiple pages.",
      gotchas: [
        "If the user disables cookies, session tracking will fail unless the application rewrites URLs to include the session ID (response.encodeURL())."
      ],
      interviewQuestions: [
        {
          question: "How does HttpSession work?",
          answer: "The server creates a session object and sends its ID back as a cookie. On subsequent requests, the browser sends the cookie back, allowing the server to identify the session."
        }
      ],
      code: `protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
    HttpSession session = req.getSession(); // Get or create session
    session.setAttribute("user", "Navin");
    
    // To retrieve later:
    // String user = (String) session.getAttribute("user");
}`,
      visualizerType: "jvm"
    },
    {
      id: 255,
      title: "Registration App using Servlet and JDBC",
      intro: "Connecting web frontends to database backends.",
      explanation: "A registration application takes user inputs from an HTML/JSP form, submits them via HTTP POST to a Servlet, which extracts the values and saves them into a database using JDBC.",
      gotchas: [
        "Always set request.setCharacterEncoding(\"UTF-8\") before reading parameters to avoid corrupted character displays for non-English inputs."
      ],
      interviewQuestions: [
        {
          question: "Why do we use doGet/doPost in registration forms?",
          answer: "We use doPost because registrations write new records to the database and transmit sensitive passwords, which must not be exposed in the URL."
        }
      ],
      code: `@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws IOException {
        String name = req.getParameter("name");
        int marks = Integer.parseInt(req.getParameter("marks"));
        
        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "pass");
             PreparedStatement pst = con.prepareStatement("INSERT INTO student (name, marks) VALUES (?, ?)")) {
            pst.setString(1, name);
            pst.setInt(2, marks);
            pst.executeUpdate();
            resp.getWriter().println("Registration Successful!");
        } catch (Exception e) {
            resp.getWriter().println("Error: " + e.getMessage());
        }
    }
}`,
      visualizerType: "exception"
    },
    {
      id: 256,
      title: "Introduction to JSP",
      intro: "Writing HTML-centric dynamic pages.",
      explanation: "JSP (JavaServer Pages) is a server-side technology that allows embedding Java code directly inside HTML pages. JSPs are automatically compiled into standard Servlets by the servlet container at runtime.",
      gotchas: [
        "Writing complex Java logic directly inside JSP files creates hard-to-maintain, spaghetti code. Keep Java logic in servlets and use JSP purely for presentation."
      ],
      interviewQuestions: [
        {
          question: "What is a JSP?",
          answer: "JSP is a presentation-layer technology built on top of Servlets. It compiles into a Servlet upon first request and simplifies designing dynamic HTML views."
        }
      ],
      code: `<!-- JSP file syntax example -->
<html>
<body>
    <h2>Hello, <%= request.getParameter("username") %></h2>
</body>
</html>`,
      visualizerType: "jvm"
    },
    {
      id: 257,
      title: "JSP Tags and Web App using JSP",
      intro: "JSP directives, scriptlets, declarations, and expressions.",
      explanation: "JSP uses tags to define behavior: 1. Directives (<%@ ... %> - imports, page settings). 2. Scriptlets (<% ... %> - block of Java code). 3. Expressions (<%= ... %> - print statements). 4. Declarations (<%! ... %> - declare fields and methods).",
      gotchas: [
        "Variables declared inside declarations (<%! %>) become Servlet instance variables (shared by all threads). Scriptlet variables become local variables inside _jspService() (thread-safe)."
      ],
      interviewQuestions: [
        {
          question: "Difference between JSP scriptlet and JSP declaration tag?",
          answer: "Scriptlet code goes into the local service method (thread-safe). Declaration code goes outside the service method as instance variables/methods (not thread-safe)."
        }
      ],
      code: `<%@ page import="java.util.Date" %>
<%! int visitorCount = 0; %> 
<% 
    visitorCount++; 
    Date today = new Date();
%>
<p>Visitor Number: <%= visitorCount %></p>
<p>Today is: <%= today %></p>`,
      visualizerType: "jvm"
    },
    {
      id: 258,
      title: "Servlet vs JSP",
      intro: "Logic vs Presentation.",
      explanation: "Servlets are Java classes containing embedded HTML (good for controller logic). JSPs are HTML documents containing embedded Java code (good for rendering views).",
      gotchas: [
        "JSPs compile into Servlets. Any performance differences are negligible after compile time, but using them correctly makes code cleaner."
      ],
      interviewQuestions: [
        {
          question: "Compare Servlet and JSP.",
          answer: "Servlets are Java files suited for backend control logic. JSP files are HTML-based and suited for UI layout. JSPs are compiled into Servlets under the hood."
        }
      ],
      code: `// Servlet:
// out.println("<h1>Hello Web</h1>");
// JSP:
// <h1>Hello Web</h1>`,
      visualizerType: "jvm"
    },
    {
      id: 259,
      title: "Introduction to MVC",
      intro: "Separating concerns for clean application architecture.",
      explanation: "MVC (Model-View-Controller) splits application logic into: 1. Model: Represents data and business logic (Java classes/DB queries). 2. View: User interface (JSP/HTML). 3. Controller: Intercepts requests, coordinates models and views (Servlets).",
      gotchas: [
        "The View should never talk directly to the Database. It should only display model data received from the Controller."
      ],
      interviewQuestions: [
        {
          question: "Explain the MVC design pattern.",
          answer: "It separates an application into Model (data/logic), View (presentation), and Controller (request flow controller) to achieve modularity and clean separation of concerns."
        }
      ],
      code: `// MVC Architecture Flow:
// Request -> Controller (Servlet) -> Model (Java Beans/DB) -> Controller -> View (JSP)`,
      visualizerType: "jvm"
    },
    {
      id: 260,
      title: "MVC Using Servlet, JSP and JDBC",
      intro: "Putting it all together.",
      explanation: "In a real-world MVC app, a Servlet acts as the controller. It parses input parameters, calls a JDBC class (Model) to fetch database entities, binds the result as a request attribute, and forwards to a JSP page (View) to render the response.",
      gotchas: [
        "Do not write database connection code inside JSP files. Keep connection logic encapsulated in a Model or DAO (Data Access Object) helper class."
      ],
      interviewQuestions: [
        {
          question: "Why is the controller servlet necessary in an MVC application?",
          answer: "It prevents spaghetti code by acting as the single point of entry, routing requests, handling validation, and binding model data to the correct view."
        }
      ],
      code: `// Controller: StudentServlet.java
@WebServlet("/getStudent")
public class StudentServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("id"));
        Student s = StudentDAO.getStudent(id); // Model call
        req.setAttribute("student", s);
        req.getRequestDispatcher("showStudent.jsp").forward(req, resp); // View forward
    }
}`,
      visualizerType: "dispatch"
    }
  ]
};
