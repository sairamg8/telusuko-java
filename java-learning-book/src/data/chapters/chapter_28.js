export default {
  id: 28,
  title: "Spring AOP (Aspect Oriented Programming)",
  range: "437-444",
  concepts: [
    {
      id: 437,
      title: "Spring AOP Introduction",
      intro: "Separate secondary concerns like security, transactions, and logging from your primary business logic.",
      explanation: "Aspect-Oriented Programming (AOP) complements Object-Oriented Programming (OOP) by providing another way of thinking about program structure. The key unit of modularity in OOP is the class, whereas in AOP it is the aspect. Aspects enable the modularization of cross-cutting concerns (like transaction management, logging, security) that cut across multiple types and objects.",
      gotchas: [
        "Spring AOP is proxy-based. If a method inside a service calls another method within the same service class directly, the AOP aspect is bypassed!"
      ],
      interviewQuestions: [
        {
          question: "What is a cross-cutting concern in AOP?",
          answer: "A cross-cutting concern is a feature or logic that affects multiple parts of an application (e.g. logging, auditing, security, transaction management) rather than being confined to a single class."
        }
      ],
      code: `// Traditional approach: Manual logging polluted inside business methods.
// AOP approach: Business method has clean logic, logger runs externally!`,
      visualizerType: "jvm"
    },
    {
      id: 438,
      title: "Logging the Calls",
      intro: "Automatically track method entries, arguments, and return values without polluting your business code.",
      explanation: "A common use case for AOP is logging. Instead of writing logger.info() statements at the start and end of every service method, we write a single Aspect class that intercepts method calls and logs details dynamically.",
      gotchas: [
        "Logging heavy data structures can slow down executions. Ensure logs only output identifiers or are set to debug levels."
      ],
      interviewQuestions: [
        {
          question: "How do you enable AOP support in Spring Boot?",
          answer: "By adding the 'spring-boot-starter-aop' dependency. Under the hood, Spring Boot auto-enables @EnableAspectJAutoProxy."
        }
      ],
      code: `<!-- pom.xml Dependency -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>`,
      visualizerType: "jvm"
    },
    {
      id: 439,
      title: "AOP Concepts",
      intro: "Learn the core vocabulary of AOP: Aspect, Join Point, Pointcut, and Advice.",
      explanation: "Understanding AOP requires learning its terminology: 1. Aspect: A modularization of a concern (represented as a class). 2. Join Point: A point during execution (e.g. method call). 3. Pointcut: A predicate that matches join points (which methods to intercept). 4. Advice: Action taken by an aspect at a join point (Before, After, Around).",
      gotchas: [
        "Pointcuts can use wildcards. A poorly written Pointcut expression can intercept unexpected methods, causing side effects or performance bugs."
      ],
      interviewQuestions: [
        {
          question: "Define Aspect, Pointcut, and Advice.",
          answer: "Aspect: The class containing cross-cutting logic. Pointcut: The expression defining which methods to target. Advice: The actual code block that runs (before, after, or around the target method execution)."
        }
      ],
      code: `// Pointcut Syntax Example:
// execution(* com.telusko.service.JobService.*(..))
// matches all methods of JobService class.`,
      visualizerType: "null"
    },
    {
      id: 440,
      title: "Before Advice",
      intro: "Execute code blocks immediately before your target methods begin execution.",
      explanation: "Before advice (annotated with @Before) runs before a join point execution starts. It is typically used for security checks, parameter validation, or auditing method access.",
      gotchas: [
        "Before advice cannot stop the execution of the target method unless it throws an exception."
      ],
      interviewQuestions: [
        {
          question: "What is @Before advice in Spring AOP?",
          answer: "An advice that runs before the execution of the matched target method. It is declared using the @Before annotation containing a pointcut expression."
        }
      ],
      code: `@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.telusko.service.JobService.getJob(..))")
    public void logBefore() {
        System.out.println("Method getJob() is starting execution...");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 441,
      title: "Join Point",
      intro: "Access metadata about the method currently intercepted by your aspect.",
      explanation: "The JoinPoint object can be declared as an argument in your advice methods. It gives you access to the intercepted method's name, class, arguments, and target object details.",
      gotchas: [
        "Accessing JoinPoint details via reflection adds a small execution overhead. Use it only when method parameters or signatures need to be evaluated."
      ],
      interviewQuestions: [
        {
          question: "What is the use of the JoinPoint argument in Spring AOP advice?",
          answer: "It allows advice code to reflectively inspect the target method details, such as parameter values (joinPoint.getArgs()) or name (joinPoint.getSignature().getName())."
        }
      ],
      code: `@Before("execution(* com.telusko.service.JobService.*(..))")
public void logMethodDetails(JoinPoint jp) {
    String methodName = jp.getSignature().getName();
    Object[] args = jp.getArgs();
    System.out.println("Method " + methodName + " called with arg count: " + args.length);
}`,
      visualizerType: "jvm"
    },
    {
      id: 442,
      title: "After Advice",
      intro: "Run cleanup or logging code after a method finishes, regardless of success or failure.",
      explanation: "AOP provides multiple types of after-advices: 1. @After (runs after execution completes, whether successful or throwing exception). 2. @AfterReturning (runs only if target completes normally). 3. @AfterThrowing (runs only if method throws an exception).",
      gotchas: [
        "If you need access to the returned value, use @AfterReturning instead of generic @After."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between @After and @AfterReturning advice?",
          answer: "@After runs unconditionally after method execution (like a finally block). @AfterReturning runs only if the method completes successfully without throwing an exception."
        }
      ],
      code: `@AfterReturning(pointcut = "execution(* com.telusko.service.JobService.getJob(..))", returning = "result")
public void logSuccess(Object result) {
    System.out.println("Method completed successfully. Returned value: " + result);
}

@AfterThrowing(pointcut = "execution(* com.telusko.service.*(..))", throwing = "ex")
public void logError(Exception ex) {
    System.out.println("Exception caught: " + ex.getMessage());
}`,
      visualizerType: "jvm"
    },
    {
      id: 443,
      title: "Performance Monitoring Using Around Advice",
      intro: "Measure method execution time precisely by wrapping target methods entirely.",
      explanation: "Around advice (@Around) is the most powerful advice type. It surrounds the join point execution. It takes a ProceedingJoinPoint argument and decides when and whether to execute the target method by calling proceed(). This allows measuring exact time taken.",
      gotchas: [
        "If your @Around advice method forgets to call proceedingJoinPoint.proceed(), the target method will never be executed, freezing application flow."
      ],
      interviewQuestions: [
        {
          question: "How do you calculate execution time of a method using Spring AOP?",
          answer: "By using @Around advice. Capture start time, call proceedingJoinPoint.proceed() to execute the method, capture end time, and compute the difference."
        }
      ],
      code: `@Around("execution(* com.telusko.service.JobService.*(..))")
public Object monitorPerformance(ProceedingJoinPoint jp) throws Throwable {
    long start = System.currentTimeMillis();
    
    Object result = jp.proceed(); // Executes target method
    
    long end = System.currentTimeMillis();
    System.out.println(jp.getSignature().getName() + " took " + (end - start) + " ms");
    return result;
}`,
      visualizerType: "jvm"
    },
    {
      id: 444,
      title: "Validating Input Using Around Advice",
      intro: "Intercept and inspect method parameters, modifying or rejecting inputs before execution.",
      explanation: "Around advice can analyze method parameters. If input fails validation constraints, the advice can throw an exception directly without calling proceed(), preventing execution of the service block.",
      gotchas: [
        "Modifying inputs inside aspects can make debugging difficult for other developers, as arguments change implicitly."
      ],
      interviewQuestions: [
        {
          question: "Can an aspect modify the arguments passed to a target method?",
          answer: "Yes, using @Around advice, you can retrieve arguments, modify them, and pass the updated values array to the proceed(Object[] args) call."
        }
      ],
      code: `@Around("execution(* com.telusko.service.JobService.addJob(..))")
public Object validateArgs(ProceedingJoinPoint jp) throws Throwable {
    Object[] args = jp.getArgs();
    int jobId = (Integer) args[0];
    if (jobId < 0) {
        throw new IllegalArgumentException("Job ID cannot be negative!");
    }
    return jp.proceed();
}`,
      visualizerType: "jvm"
    }
  ]
};
