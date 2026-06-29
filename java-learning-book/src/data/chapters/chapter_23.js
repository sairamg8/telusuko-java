export default {
  id: 23,
  title: "Spring Framework Core",
  range: "312-347",
  concepts: [
    {
      id: 312,
      title: "Introduction to Spring",
      intro: "The most popular Java enterprise application framework.",
      explanation: "Spring is a lightweight, open-source framework designed to simplify the development of complex enterprise Java applications. It provides comprehensive infrastructure support, enabling developers to focus on writing clean business logic rather than dealing with system configurations.",
      gotchas: [
        "Because Spring is modular, it is easy to get overwhelmed by the number of sub-projects (Spring Security, Spring Data, Spring MVC, etc.). Focus on learning Spring Core fundamentals first."
      ],
      interviewQuestions: [
        {
          question: "What is Spring Framework?",
          answer: "Spring is a Java enterprise application framework that provides comprehensive infrastructure support, notably Dependency Injection and Aspect-Oriented Programming, to build loosely coupled systems."
        }
      ],
      code: `import org.springframework.context.ApplicationContext;
// The core container interface of Spring`,
      visualizerType: "jvm"
    },
    {
      id: 313,
      title: "Spring Docs",
      intro: "Navigating the official reference documentation.",
      explanation: "The official Spring Documentation (docs.spring.io) is the single source of truth for all Spring libraries. It includes detailed guides, reference docs, and complete Javadoc details.",
      gotchas: [
        "Spring evolves quickly. Make sure you read the documentation corresponding to the exact version of Spring you are using in your application."
      ],
      interviewQuestions: [
        {
          question: "Where can you find official reference guides for Spring?",
          answer: "At docs.spring.io."
        }
      ],
      code: `// Official reference portal: https://docs.spring.io/spring-framework/reference/`,
      visualizerType: "jvm"
    },
    {
      id: 314,
      title: "Prerequisites",
      intro: "Core competencies required before diving into Spring.",
      explanation: "To understand Spring, you should have solid command of: Core Java (OOP, Collections, Interfaces), basic JDBC, Servlet/JSP concepts, and design patterns (Factory, Singleton, Proxy).",
      gotchas: [
        "Jumping into Spring without understanding interface-based programming will make dependency injection concepts very confusing."
      ],
      interviewQuestions: [
        {
          question: "Why is a strong understanding of interfaces important for learning Spring?",
          answer: "Because Spring's core philosophy is to program to interfaces, which allows loose coupling and dynamic proxy creation under the hood."
        }
      ],
      code: `public interface Laptop {
    void compile();
}
// Loose coupling starts with interfaces!`,
      visualizerType: "jvm"
    },
    {
      id: 315,
      title: "IDE for Spring",
      intro: "Choosing the right development workspace.",
      explanation: "Developers use IDEs like Spring Tool Suite (STS - Eclipse built for Spring), IntelliJ IDEA (Community or Ultimate), or Eclipse. IntelliJ IDEA Ultimate offers advanced Spring inspections and auto-completions.",
      gotchas: [
        "Make sure to install the Spring Boot extension pack if using VS Code or Eclipse to enable code completion for application properties."
      ],
      interviewQuestions: [
        {
          question: "What is Spring Tool Suite?",
          answer: "STS is a customized Eclipse-based development environment optimized for developing Spring and Spring Boot applications."
        }
      ],
      code: `// Spring tools optimize resource scanning and autocomplete configuration tags.`,
      visualizerType: "jvm"
    },
    {
      id: 316,
      title: "IoC and DI",
      intro: "Inverting control and injecting dependencies.",
      explanation: "1. Inversion of Control (IoC): The design pattern where control of object creation and lifecycle management is taken away from the application code and delegated to a container (the Spring IoC Container). 2. Dependency Injection (DI): The concrete mechanism where the container automatically provides (injects) dependent objects to a class, removing the need for manual new instantiation.",
      gotchas: [
        "With IoC, you no longer use new ClassName() inside your services. If you instantiate objects manually, Spring cannot manage or inject dependencies into them."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between IoC and DI?",
          answer: "IoC is the architectural design pattern of delegating control to a container. DI is the concrete implementation method used to inject dependencies into an object."
        }
      ],
      code: `// Traditional coding (Tight Coupling):
// Computer comp = new Laptop();

// IoC/DI coding (Loose Coupling):
// @Autowired Computer comp;`,
      visualizerType: "jvm"
    },
    {
      id: 317,
      title: "Spring vs Spring Boot",
      intro: "Comparing the framework engine with the configuration accelerator.",
      explanation: "Spring is the core framework. It requires writing a lot of configuration (XML or JavaConfig) to set up databases, web servers, etc. Spring Boot is an extension of Spring that provides 'opinionated defaults' (auto-configuration, starter POMs, embedded Tomcat) to build and run production-ready Spring applications quickly.",
      gotchas: [
        "Spring Boot is NOT a replacement for the Spring Framework; it is a tool built on top of Spring to make using Spring faster and easier."
      ],
      interviewQuestions: [
        {
          question: "Is Spring Boot a replacement for Spring Framework?",
          answer: "No, Spring Boot is an extension built on top of Spring to simplify and accelerate configuration and bootstrapping."
        }
      ],
      code: `// Spring: Requires servlet configuration, dispatcher, Tomcat setup.
// Spring Boot: Runs out-of-the-box with a simple main method using @SpringBootApplication.`,
      visualizerType: "jvm"
    },
    {
      id: 318,
      title: "First Spring Boot App",
      intro: "Bootstrapping a runnable Spring application.",
      explanation: "Create a Maven project containing the Spring Boot starter parent and web dependencies. Write a class containing a main method annotated with @SpringBootApplication and execute it.",
      gotchas: [
        "The main application class must be in the parent package of all your components so that Spring can scan and register them."
      ],
      interviewQuestions: [
        {
          question: "What does @SpringBootApplication do?",
          answer: "It is a convenience annotation that combines @Configuration (defines bean sources), @EnableAutoConfiguration (enables auto-configs), and @ComponentScan (scans packages for beans)."
        }
      ],
      code: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 319,
      title: "DI Using Spring Boot",
      intro: "Automatic dependency management in Action.",
      explanation: "Annotate your classes with stereotype annotations (like @Component). Spring automatically instantiates these classes and caches them as Spring beans, ready to be injected.",
      gotchas: [
        "If a class is not annotated with a stereotype (or registered in a configuration), Spring will not know about it and will throw a NoSuchBeanDefinitionException if you try to fetch it."
      ],
      interviewQuestions: [
        {
          question: "How do you register a class as a Spring bean?",
          answer: "By annotating it with @Component or another stereotype annotation like @Service or @Repository."
        }
      ],
      code: `import org.springframework.stereotype.Component;

@Component
public class Desktop {
    public void compile() {
        System.out.println("Compiling code fast on Desktop...");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 320,
      title: "Autowiring in Spring Boot",
      intro: "Binding beans automatically.",
      explanation: "The @Autowired annotation instructs the Spring container to locate a matching bean type and inject it into the annotated field, constructor, or setter.",
      gotchas: [
        "If multiple beans of the same type exist, Spring will fail on startup unless you clarify which one to inject."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of @Autowired?",
          answer: "It marks a dependency to be automatically injected by Spring's dependency injection container."
        }
      ],
      code: `import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Developer {
    @Autowired
    private Desktop desktop; // Spring injects the Desktop bean here
    
    public void code() {
        desktop.compile();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 321,
      title: "Spring First Project",
      intro: "Setting up a raw Spring Core (non-Boot) project.",
      explanation: "A pure Spring project uses standard Maven dependencies like spring-context. We declare beans either in an XML configuration file or inside a Java Configuration class.",
      gotchas: [
        "Unlike Spring Boot, you must manually instantiate the Spring ApplicationContext container class."
      ],
      interviewQuestions: [
        {
          question: "What dependency is required for a basic Spring Core project?",
          answer: "The spring-context dependency."
        }
      ],
      code: `<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.1.3</version>
</dependency>`,
      visualizerType: "jvm"
    },
    {
      id: 322,
      title: "Spring Bean Xml Config",
      intro: "The legacy declarative configuration style.",
      explanation: "Historically, Spring beans were declared in an XML file (often spring.xml). The XML declares <bean id=\"...\" class=\"...\"/> tags specifying class types and names.",
      gotchas: [
        "Class names inside XML tags must be fully qualified (include package names), and errors are only caught at runtime, not compile time."
      ],
      interviewQuestions: [
        {
          question: "How are beans defined in Spring XML configuration?",
          answer: "Using the <bean> tag with 'id' and 'class' attributes."
        }
      ],
      code: `<!-- spring.xml configuration -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="laptop" class="com.telusuko.Laptop"/>
</beans>`,
      visualizerType: "jvm"
    },
    {
      id: 323,
      title: "Object Creation",
      intro: "Verifying the lifecycle boundary of Spring Beans.",
      explanation: "When the Spring container (ApplicationContext) loads the configuration file on startup, it eagerly instantiates all singleton scope beans immediately.",
      gotchas: [
        "Beans are created even if you never call context.getBean()."
      ],
      interviewQuestions: [
        {
          question: "When does Spring create bean instances for singleton scope?",
          answer: "During the initialization of the ApplicationContext container on application startup."
        }
      ],
      code: `import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {
    public static void main(String[] args) {
        // This instantiation line will call Laptop constructor:
        var context = new ClassPathXmlApplicationContext("spring.xml");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 324,
      title: "Scopes",
      intro: "Controlling bean instance counts.",
      explanation: "Spring defines bean scopes: 1. Singleton (default): Container creates only one instance of the bean per container. 2. Prototype: Container creates a brand new instance every time the bean is requested.",
      gotchas: [
        "Prototype beans are initialized lazily (only when requested), and Spring does not execute their destruction lifecycle callbacks."
      ],
      interviewQuestions: [
        {
          question: "Differentiate between Singleton and Prototype scopes.",
          answer: "Singleton creates a single instance per container, initialized eagerly. Prototype creates a new instance on every request/fetch, initialized lazily."
        }
      ],
      code: `<!-- Define prototype bean scope -->
<bean id="laptop" class="com.telusuko.Laptop" scope="prototype"/>`,
      visualizerType: "memory"
    },
    {
      id: 325,
      title: "Setter Injection",
      intro: "Injecting dependencies via properties.",
      explanation: "Inject values or reference objects through standard setter methods. In XML, this is configured using the <property> tag, which maps to corresponding setter methods inside the Java class.",
      gotchas: [
        "Spring calls setter methods matching the name attribute in the XML. Ensure your Java class follows standard getter/setter naming conventions."
      ],
      interviewQuestions: [
        {
          question: "How is setter injection configured in Spring XML?",
          answer: "Using the <property> tag inside the <bean> tag."
        }
      ],
      code: `<!-- Sets the 'age' property via setAge(25) -->
<bean id="dev" class="com.telusuko.Developer">
    <property name="age" value="25"/>
</bean>`,
      visualizerType: "jvm"
    },
    {
      id: 326,
      title: "Ref Attribute",
      intro: "Injecting reference objects.",
      explanation: "In Spring XML configuration, injecting a bean REFERENCE into another bean:\n1. `value` attribute → injects literal data (String, int): `<property name=\"age\" value=\"25\"/>`\n2. `ref` attribute → injects a REFERENCE to another Spring bean: `<property name=\"laptop\" ref=\"laptopBean\"/>`\n3. `ref` tells Spring: look up the bean with this ID in the container and inject it.\n4. The target class field type must match the type of the referenced bean.\n5. Using `value` when a bean reference is expected throws a TypeMismatchException at startup.",
      gotchas: [
        "Using value instead of ref when injecting objects will cause a bean initialization type mismatch exception."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between value and ref attributes in Spring XML?",
          answer: "value is used to inject literal data values (strings, numbers). ref is used to inject references to other Spring-managed beans."
        }
      ],
      code: `<bean id="laptop" class="com.telusuko.Laptop"/>
<bean id="dev" class="com.telusuko.Developer">
    <property name="laptop" ref="laptop"/>
</bean>`,
      visualizerType: "jvm"
    },
    {
      id: 327,
      title: "Constructor Injection",
      intro: "Injecting dependencies via constructors.",
      explanation: "Constructor Injection: Spring calls the class constructor and passes dependencies as arguments.\n1. XML tag: `<constructor-arg value=\"25\"/>` for primitives, `<constructor-arg ref=\"laptop\"/>` for beans.\n2. Matching by index (0-based), type, or name attribute.\n3. WHY prefer constructor injection:\n   • Mandatory dependencies are guaranteed at object creation time.\n   • Makes the bean immutable (fields can be final).\n   • Easier to unit test — just call `new MyClass(mock)` without Spring.\n4. If all dependencies are optional, setter injection is more flexible.",
      gotchas: [
        "If the constructor arguments order changes or types match incorrectly, XML parsing can fail. Constructor injection enforces mandatory dependencies."
      ],
      interviewQuestions: [
        {
          question: "Why is constructor injection preferred over setter injection?",
          answer: "It guarantees that target beans are constructed with all mandatory dependencies initialized, making the class immutable and thread-safe."
        }
      ],
      code: `<bean id="dev" class="com.telusuko.Developer">
    <constructor-arg value="25"/>
    <constructor-arg ref="laptop"/>
</bean>`,
      visualizerType: "jvm"
    },
    {
      id: 328,
      title: "Creating Interface",
      intro: "Decoupling classes using abstract interfaces.",
      explanation: "Create interfaces (e.g. Computer) implemented by concrete classes (e.g., Laptop, Desktop). This allows injecting any implementation without changing the client code.",
      gotchas: [
        "Programming to interfaces is a prerequisite for Spring's JDK dynamic proxy features."
      ],
      interviewQuestions: [
        {
          question: "Why is interface-based dependency injection recommended?",
          answer: "It facilitates loose coupling. You can swap implementations (e.g., Laptop for Desktop) in configuration without modifying the developer class code."
        }
      ],
      code: `public interface Computer {
    void compile();
}

public class Laptop implements Computer {
    public void compile() { System.out.println("Laptop compiles..."); }
}`,
      visualizerType: "jvm"
    },
    {
      id: 329,
      title: "Autowiring",
      intro: "Automated reference resolution in XML configurations.",
      explanation: "XML configuration supports autowiring by setting the autowire attribute. Strategies: byName (looks for a bean with the same name as the property), byType (looks for a bean matching the property class type), and constructor.",
      gotchas: [
        "If using byType and multiple beans of that type exist, it will throw an exception."
      ],
      interviewQuestions: [
        {
          question: "What are the autowiring modes in Spring XML?",
          answer: "no, byName, byType, and constructor."
        }
      ],
      code: `<!-- Autowires 'computer' property by type matching -->
<bean id="dev" class="com.telusuko.Developer" autowire="byType"/>`,
      visualizerType: "jvm"
    },
    {
      id: 330,
      title: "Primary Bean",
      intro: "Setting a default candidate.",
      explanation: "If multiple beans of the same type are registered, mark one of them as primary using <bean primary=\"true\"/> in XML, or @Primary in Java config. This tells Spring to pick it by default.",
      gotchas: [
        "If multiple beans are marked as primary for the same type, Spring will still throw a conflict exception."
      ],
      interviewQuestions: [
        {
          question: "What does primary attribute do?",
          answer: "It designates a bean as the default candidate for autowiring when multiple beans of the same type are available."
        }
      ],
      code: `<bean id="laptop" class="com.telusuko.Laptop" primary="true"/>
<bean id="desktop" class="com.telusuko.Desktop"/>`,
      visualizerType: "jvm"
    },
    {
      id: 331,
      title: "Lazy Init Bean",
      intro: "Delaying bean creation.",
      explanation: "By default, singleton beans are created eagerly. Setting lazy-init=\"true\" (or @Lazy) tells Spring to create the bean instance only when it is requested for the first time.",
      gotchas: [
        "If an eager bean depends on a lazy bean, the lazy bean will still be initialized on startup."
      ],
      interviewQuestions: [
        {
          question: "Explain lazy-init attribute in Spring.",
          answer: "It prevents the eager initialization of singleton beans during container startup, delaying creation until the bean is requested."
        }
      ],
      code: `<bean id="laptop" class="com.telusuko.Laptop" lazy-init="true"/>`,
      visualizerType: "jvm"
    },
    {
      id: 332,
      title: "getBean() by Type",
      intro: "Retrieving beans safely.",
      explanation: "Two ways to retrieve beans from ApplicationContext:\n1. By ID (String): `context.getBean(\"laptopBean\")` → returns Object, requires explicit cast.\n2. By Type: `context.getBean(Laptop.class)` → type-safe, no cast needed.\n3. By ID + Type: `context.getBean(\"laptopBean\", Laptop.class)` → safest, validates both.\n4. RISK with by-type: if multiple beans of the same type exist → throws `NoUniqueBeanDefinitionException`.\n5. Fix: use `@Primary` on one bean, or `@Qualifier(\"name\")` when injecting, to resolve ambiguity.",
      gotchas: [
        "If multiple beans of the same type exist, this call will throw a NoUniqueBeanDefinitionException."
      ],
      interviewQuestions: [
        {
          question: "What is the advantage of getBean(Class<T> requiredType)?",
          answer: "It is type-safe and avoids explicit casting, but can fail if multiple beans of that type exist."
        }
      ],
      code: `Laptop laptop = context.getBean(Laptop.class);`,
      visualizerType: "jvm"
    },
    {
      id: 333,
      title: "Inner Bean",
      intro: "Defining private, nested beans.",
      explanation: "An inner bean is a bean defined INSIDE another bean's `<property>` or `<constructor-arg>` tag:\n1. Has NO id — cannot be retrieved with context.getBean().\n2. Scoped to its enclosing bean — not shared, not reusable by other beans.\n3. Use when: the dependency is exclusively owned by one bean and makes no sense elsewhere.\n4. Alternative: just define the bean with an id at the top level and reference it with `ref`.\n5. Inner beans are always treated as prototype-scoped — a new instance per enclosing bean creation.",
      gotchas: [
        "Inner beans cannot be reused by other beans since they are completely private to their enclosing bean definition."
      ],
      interviewQuestions: [
        {
          question: "What is an inner bean in Spring?",
          answer: "A bean defined inside another bean's property or constructor configuration, which cannot be accessed directly by getBean() calls."
        }
      ],
      code: `<bean id="dev" class="com.telusuko.Developer">
    <property name="laptop">
        <bean class="com.telusuko.Laptop"/> <!-- Inner Bean -->
    </property>
</bean>`,
      visualizerType: "jvm"
    },
    {
      id: 334,
      title: "Java-Based Configuration",
      intro: "Replacing XML configurations with pure Java code.",
      explanation: "Java-based config replaces XML entirely with type-safe Java code:\n1. `@Configuration` on a class → marks it as a Spring configuration source (equivalent to beans.xml).\n2. `@Bean` on a method → return value is registered as a Spring-managed bean.\n3. Default bean ID = method name (e.g. `public Laptop laptop()` registers bean with id \"laptop\").\n4. Load config: `new AnnotationConfigApplicationContext(AppConfig.class)` instead of ClassPathXmlApplicationContext.\n5. Advantages over XML: refactor-safe (rename is a code rename), compile-time checks, IDE autocomplete.",
      gotchas: [
        "Java-based config is fully type-safe and refactor-friendly, but requires code changes to alter configs."
      ],
      interviewQuestions: [
        {
          question: "How do you define a Java Configuration class in Spring?",
          answer: "By annotating the class with @Configuration and using @Bean on methods returning bean instances."
        }
      ],
      code: `import org.springframework.context.annotation.*;

@Configuration
public class AppConfig {
    @Bean
    public Laptop laptop() {
        return new Laptop();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 335,
      title: "Bean Name",
      intro: "Customizing bean identifiers in Java configuration.",
      explanation: "By default, the bean name is the method name in the configuration class. You can customize this by providing a name parameter: @Bean(name = \"myLaptop\") or @Bean({\"myLaptop\", \"backupLaptop\"}).",
      gotchas: [
        "If you override the bean name, using the original method name to retrieve the bean will fail."
      ],
      interviewQuestions: [
        {
          question: "What is the default name of a bean defined using @Bean?",
          answer: "The name of the method annotated with @Bean."
        }
      ],
      code: `@Bean(name = "desktopMachine")
public Desktop desktop() {
    return new Desktop();
}`,
      visualizerType: "jvm"
    },
    {
      id: 336,
      title: "Scope Annotation",
      intro: "Customizing scopes in Java configuration.",
      explanation: "1. @Scope controls how many instances of a bean Spring creates. 'singleton' (default) = one shared instance per ApplicationContext. 'prototype' = a brand-new instance every time the bean is requested.\n2. Common scope values: 'singleton', 'prototype', 'request' (one per HTTP request), 'session' (one per HTTP session). Request/session scopes require a web-aware ApplicationContext.\n3. Use prototype scope when your bean holds mutable state that must not be shared — e.g., a form-backing model object or a stateful processor.\n4. Use type-safe constants instead of raw strings to avoid typos: @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE) is safer than @Scope(\"prototype\").\n5. A singleton bean that injects a prototype dependency only gets ONE prototype instance at injection time. To get a fresh prototype on each call, inject ObjectFactory<T> or use lookup method injection.",
      gotchas: [
        "Using string literals inside @Scope is prone to typos. Use Constants: @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)."
      ],
      interviewQuestions: [
        {
          question: "How do you specify a bean scope in Java Config?",
          answer: "By placing the @Scope annotation over the @Bean method."
        }
      ],
      code: `import org.springframework.context.annotation.Scope;

@Bean
@Scope("prototype")
public Laptop laptop() {
    return new Laptop();
}`,
      visualizerType: "memory"
    },
    {
      id: 337,
      title: "Autowiring",
      intro: "Injecting dependencies in Java-based configs.",
      explanation: "1. In Java @Configuration classes, wire beans in two ways: (a) Call another @Bean method directly — Spring intercepts via CGLIB and returns the singleton; (b) Declare the dependency as a method parameter — Spring auto-resolves it from the context.\n2. CGLIB proxy magic: @Configuration classes are subclassed at runtime. Every @Bean method call goes through the proxy to maintain singleton semantics, even if called 10 times in code.\n3. Prefer parameter injection over direct method calls — it's cleaner, testable, and works inside @Component classes (which are NOT CGLIB-proxied).\n4. 'Lite mode' vs 'full mode': @Bean inside a plain @Component does NOT get CGLIB interception — each direct method call creates a new instance. Only @Configuration gives full proxy semantics.\n5. Interview trap: Why does @Configuration use CGLIB but @Component does not? Because @Component beans are not proxied for @Bean methods — understanding this separates mid-level from senior Spring developers.",
      gotchas: [
        "If you call a @Bean method multiple times in a @Configuration class, Spring intercepts the call to ensure only a single shared bean instance is returned (via CGLIB proxy), maintaining singleton behavior."
      ],
      interviewQuestions: [
        {
          question: "How does Spring ensure singletons are preserved when calling @Bean methods inside @Configuration classes?",
          answer: "Spring uses CGLIB dynamic proxies to intercept method calls. If the bean already exists in the container context, it returns the cached instance."
        }
      ],
      code: `@Configuration
public class AppConfig {
    @Bean
    public Laptop laptop() { return new Laptop(); }
    
    @Bean
    public Developer developer(Laptop laptop) { // Autowired via method parameters
        Developer dev = new Developer();
        dev.setLaptop(laptop);
        return dev;
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 338,
      title: "@Primary and @Qualifier",
      intro: "Resolving autowiring conflicts in Java-based configs.",
      explanation: "When multiple beans of the same type exist, use @Primary to set a default candidate. Alternatively, use @Qualifier(\"beanName\") alongside @Autowired or method parameters to target a specific bean by name.",
      gotchas: [
        "@Qualifier has higher precedence than @Primary. If both are present, @Qualifier wins."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between @Primary and @Qualifier?",
          answer: "@Primary designates a default bean for a type. @Qualifier targets a specific bean name to resolve ambiguity."
        }
      ],
      code: `@Bean
@Primary
public Laptop laptop() { return new Laptop(); }

@Bean
public Desktop desktop() { return new Desktop(); }

// Injection target:
// @Autowired @Qualifier("desktop") Computer comp;`,
      visualizerType: "jvm"
    },
    {
      id: 339,
      title: "Component Stereotype Annotation",
      intro: "Scanning components automatically.",
      explanation: "Stereotypes include @Component (generic component), @Service (business logic), @Repository (data access/DAO), and @Controller (web controller). Marking classes with these allows Spring to discover them using component scanning.",
      gotchas: [
        "Stereotype annotations are parsed only if component scanning is explicitly enabled via @ComponentScan or XML <context:component-scan>."
      ],
      interviewQuestions: [
        {
          question: "What are stereotype annotations in Spring?",
          answer: "Specialized @Component annotations (like @Service, @Repository, @Controller) that define class roles and enable automatic discovery via classpath scanning."
        }
      ],
      code: `import org.springframework.stereotype.Service;

@Service
public class CalcService {
    public int add(int a, int b) { return a + b; }
}`,
      visualizerType: "jvm"
    },
    {
      id: 340,
      title: "Autowire Field, Constructor, Setter",
      intro: "Choosing an injection style.",
      explanation: "1. Field Injection: @Autowired placed directly on a field (uses reflection, clean but hard to unit test). 2. Constructor Injection: @Autowired on a constructor (highly recommended, enforces mandatory dependencies). 3. Setter Injection: @Autowired on a setter (good for optional dependencies).",
      gotchas: [
        "Field injection prevents instantiating the class manually in unit tests without using reflection libraries (like Mockito)."
      ],
      interviewQuestions: [
        {
          question: "Why is constructor injection preferred over field injection?",
          answer: "It allows injecting final fields, ensures dependencies are not null, and facilitates unit testing without mocking frameworks."
        }
      ],
      code: `// Constructor Injection:
@Component
public class Dev {
    private final Computer comp;
    
    public Dev(Computer comp) {
        this.comp = comp;
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 341,
      title: "@Primary Annotation",
      intro: "Prioritizing autowiring candidates.",
      explanation: "When two classes implement the same interface and are both annotated with @Component, place @Primary on one of the classes to resolve autowiring conflicts.",
      gotchas: [
        "Make sure to place @Primary on the class level, not the injection field level."
      ],
      interviewQuestions: [
        {
          question: "How do you resolve autowiring conflicts when multiple components implement the same interface?",
          answer: "By marking one of the component classes with @Primary, or specifying @Qualifier at the injection point."
        }
      ],
      code: `@Component
@Primary
public class Laptop implements Computer {
    public void compile() { System.out.println("Laptop compiling..."); }
}`,
      visualizerType: "jvm"
    },
    {
      id: 342,
      title: "@Scope and @Value Annotations",
      intro: "Specifying scopes and injecting property values.",
      explanation: "@Scope(\"prototype\") configures component instance counts. @Value(\"literal\") or @Value(\"${property.name}\") injects configuration properties or literal values into bean fields.",
      gotchas: [
        "If the property name in ${property.name} is not defined in any properties file, Spring will fail to start."
      ],
      interviewQuestions: [
        {
          question: "How do you inject a property value from application.properties in Spring?",
          answer: "Using the @Value annotation with the ${property.name} placeholder syntax."
        }
      ],
      code: `@Component
@Scope("prototype")
public class Client {
    @Value("John Doe")
    private String name;
    
    @Value("\${server.port}")
    private String port;
}`,
      visualizerType: "jvm"
    },
    {
      id: 343,
      title: "From Spring to Spring Boot",
      intro: "The migration to zero XML configuration.",
      explanation: "Spring Boot simplifies Spring applications by replacing manual configuration, XML beans registry, Tomcat deployment, and dependency version management with Auto-Configuration, starter POMs, and embedded containers.",
      gotchas: [
        "Auto-configuration operates based on classes present on the classpath. If you import a library, Spring Boot will configure it automatically."
      ],
      interviewQuestions: [
        {
          question: "How does Spring Boot differ from Spring?",
          answer: "Spring Boot is an opinionated packaging wrapper over Spring, automating configurations, dependency coordinates, and server runtimes."
        }
      ],
      code: `// Spring Boot automates all boilerplates under:
// @SpringBootApplication`,
      visualizerType: "jvm"
    },
    {
      id: 344,
      title: "Using Annotations in Spring Boot",
      intro: "Combining annotations for rapid backend development.",
      explanation: "Spring Boot apps rely entirely on annotation-driven programming. Stereotypes define layers, autowiring establishes links, and properties configure external resources.",
      gotchas: [
        "Overuse of annotations can make code flow harder to trace during runtime debugging."
      ],
      interviewQuestions: [
        {
          question: "What annotation is used to tell Spring Boot to scan packages?",
          answer: "@ComponentScan, which is implicitly included in @SpringBootApplication."
        }
      ],
      code: `@RestController
public class MyController {
    @Autowired
    private CalcService service;
}`,
      visualizerType: "jvm"
    },
    {
      id: 345,
      title: "Different Layers",
      intro: "Designing standard three-tier enterprise architectures.",
      explanation: "Enterprise applications are divided into: 1. Presentation/Controller Layer (@Controller / @RestController - handles HTTP/User interactions). 2. Business/Service Layer (@Service - processes calculations and orchestrating workflows). 3. Data Access/Repository Layer (@Repository - communicates with databases).",
      gotchas: [
        "Never mix layers. A Controller should never execute SQL queries directly; a Repository should never handle HTTP headers."
      ],
      interviewQuestions: [
        {
          question: "What is the standard three-tier architecture in Spring?",
          answer: "Controller Layer (presentation), Service Layer (business logic), and Repository Layer (data access)."
        }
      ],
      code: `// Layer Flow:
// HTTP Request -> Controller -> Service -> Repository -> Database`,
      visualizerType: "jvm"
    },
    {
      id: 346,
      title: "Service Class",
      intro: "The hub of business rules.",
      explanation: "1. @Service marks a class in the business/service layer — it holds business rules, calculations, and orchestration logic. It is a specialization of @Component and is auto-detected by Spring's classpath scanner.\n2. The service layer sits between Controller (HTTP) and Repository (DB). Controllers should delegate all business decisions to services — never implement logic inline in controllers.\n3. @Transactional is typically placed on service methods: it opens a DB transaction before the method, commits on success, and rolls back on RuntimeException automatically.\n4. Best practice: service classes should depend on interfaces of repositories — this enables mocking in unit tests without spinning up a real database.\n5. Common trap: calling one @Transactional method from another method within the SAME class bypasses the Spring proxy — the inner method's transaction annotation is ignored. Use a separate bean or Propagation.REQUIRES_NEW to force a new transaction.",
      gotchas: [
        "If an exception is thrown inside a @Transactional service, Spring automatically triggers a transaction rollback."
      ],
      interviewQuestions: [
        {
          question: "What stereotype annotation marks a class in the business layer?",
          answer: "The @Service annotation."
        }
      ],
      code: `@Service
public class StudentService {
    @Autowired
    private StudentRepo repo;
    
    public void register(Student s) {
        // Business logic check
        if (s.getMarks() >= 35) {
            repo.save(s);
        }
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 347,
      title: "Repository Layer",
      intro: "Interfacing with the persistent store.",
      explanation: "Classes annotated with @Repository manage database operations (CRUD queries). They translate database-specific exceptions into Spring's unified DataAccessException hierarchy.",
      gotchas: [
        "Make sure class declarations conform to Spring Data expectations if using Spring Data JPA."
      ],
      interviewQuestions: [
        {
          question: "What is the role of the @Repository annotation?",
          answer: "It indicates that the class is responsible for data storage operations and enables exception translation for database-related errors."
        }
      ],
      code: `@Repository
public class StudentRepo {
    public void save(Student s) {
        System.out.println("Saving student " + s.getName() + " to DB...");
    }
}`,
      visualizerType: "jvm"
    }
  ]
};
