export default {
  id: 30,
  title: "Java & Spring Boot Logging (Log4j)",
  range: "491-496",
  concepts: [
    {
      id: 491,
      title: "Introduction to Logging with Log4j",
      intro: "Why system output print statements fail in production and why we need formal logging.",
      explanation: "In production applications, using 'System.out.println()' is bad practice. Print statements write synchronously to the console, blocking the thread, creating a bottleneck under heavy traffic. Furthermore, you cannot dynamically enable/disable them, group them by severity, or easily route them to multiple destinations (like rolling log files, external log engines, or emails). Logging frameworks solve these problems by providing asynchronous logging, message severities, and flexible routing mechanisms. Log4j is one of the pioneer logging libraries in Java.",
      gotchas: [
        "Never use System.out.println for application-level logs in production code because it slows down the thread execution and lacks severity filters."
      ],
      interviewQuestions: [
        {
          question: "Why is using System.out.println discouraged in enterprise Java applications?",
          answer: "System.out.println is synchronous and blocks the executing thread, degrading application performance. It also cannot be configured to filter messages by severity, nor can it redirect logs to different destinations without rebuilding the code."
        }
      ],
      code: `// Avoid this in production:
System.out.println("Processing transaction: " + txId);

// Use a logging framework instead:
logger.info("Processing transaction: {}", txId);`,
      visualizerType: "jvm"
    },
    {
      id: 492,
      title: "Introduction to Logging with Log4J",
      intro: "Understanding the three structural pillars of Log4j: Loggers, Appenders, and Layouts.",
      explanation: "Log4j's architecture is based on three core components: Loggers, Appenders, and Layouts. Loggers are responsible for capturing the logging messages along with their severity level. Appenders are responsible for publishing the logging messages to different destinations (e.g., ConsoleAppender, FileAppender, RollingFileAppender, SocketAppender). Layouts format the message in a desired style (e.g., PatternLayout, JSONLayout, XMLLayout) before it is published by the Appender.",
      gotchas: [
        "If you define a Logger but do not bind an Appender to it, your log messages will not be printed or stored anywhere, and Log4j might issue a startup warning."
      ],
      interviewQuestions: [
        {
          question: "Explain the roles of Logger, Appender, and Layout in Log4j.",
          answer: "Logger captures the logging information and checks if it meets the severity threshold. Appender delivers the log event to its final destination (e.g., console or file). Layout defines the formatting structure of the log message."
        }
      ],
      code: `// Log4j Core components relationship:
// Logger (Captures) -> Appender (Routes) -> Layout (Formats)`,
      visualizerType: "jvm"
    },
    {
      id: 493,
      title: "More on Fundamentals of Log4J",
      intro: "Logging levels, hierarchy, and log propagation (additivity).",
      explanation: "Log4j defines standard logging levels to filter logs: TRACE < DEBUG < INFO < WARN < ERROR < FATAL. When a logger is configured with a specific level, it records messages of that level and any higher level. Loggers are hierarchical; they inherit properties from their parent packages. Logs printed by a logger propagate up to the appenders of its parent loggers unless 'additivity' is explicitly set to false on the child logger.",
      gotchas: [
        "Default additivity is set to true. If you attach a console appender to both the root logger and a package-specific logger, the messages from that package will print twice."
      ],
      interviewQuestions: [
        {
          question: "What is Log4j Logger Additivity and how do you disable it?",
          answer: "Additivity is the propagation of log events to the appenders of parent loggers. It can be disabled by setting the 'additivity' attribute to 'false' in the logger configuration in log4j2.xml."
        }
      ],
      code: `<!-- log4j2.xml Logger configuration showing levels and additivity -->
<Loggers>
    <Logger name="com.telusuko.service" level="debug" additivity="false">
        <AppenderRef ref="ConsoleAppender"/>
    </Logger>
    <Root level="info">
        <AppenderRef ref="ConsoleAppender"/>
    </Root>
</Loggers>`,
      visualizerType: "jvm"
    },
    {
      id: 494,
      title: "Log4J Implementation Simple Project Setup",
      intro: "Setting up Log4j2 in a Maven project using the correct dependencies.",
      explanation: "To implement Log4j2 in a raw Java project using Maven, you must include two core dependencies in your pom.xml file: 'log4j-api' (which contains the interface classes and facade) and 'log4j-core' (the actual implementation engine). You must also add a configuration file like 'log4j2.xml' in the 'src/main/resources' folder of your project to define your appenders and loggers.",
      gotchas: [
        "Do not mix Log4j 1.x and Log4j 2.x libraries. They are not binary-compatible and use entirely different configuration file names and packaging (org.apache.log4j vs org.apache.logging.log4j)."
      ],
      interviewQuestions: [
        {
          question: "Why does Log4j2 require two separate JAR dependencies (log4j-api and log4j-core)?",
          answer: "This separation follows the api-implementation pattern. log4j-api provides the logging interface that applications compile against, while log4j-core contains the concrete implementation, allowing developers to switch implementations without rewriting code."
        }
      ],
      code: `<!-- Add these dependencies to your Maven pom.xml -->
<dependencies>
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <version>2.20.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.20.0</version>
    </dependency>
</dependencies>`,
      visualizerType: "jvm"
    },
    {
      id: 495,
      title: "Log4j Implementation in Java",
      intro: "Writing Java code to instantiate Loggers and output logs with arguments.",
      explanation: "In Java code, obtain a Logger instance using 'LogManager.getLogger(ClassName.class)'. You write log messages using level methods like 'logger.info()' or 'logger.error()'. To prevent expensive string concatenations when a log level is disabled, Log4j supports parameterized logging using curly braces '{}' placeholders. If an exception occurs, you can pass the Throwable object as the last argument to print the complete stack trace.",
      gotchas: [
        "Avoid string concatenation like logger.debug(\"Data: \" + value) because the concatenation occurs even if the debug level is disabled, wasting CPU cycles and memory. Use logger.debug(\"Data: {}\", value) instead."
      ],
      interviewQuestions: [
        {
          question: "How does using placeholder syntax {} optimize performance in logging frameworks?",
          answer: "The logging framework first checks if the specified log level is enabled. If it is disabled, the placeholder string substitution is never executed, avoiding the performance and memory overhead of string concatenation."
        }
      ],
      code: `package com.telusuko;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LogDemo {
    private static final Logger logger = LogManager.getLogger(LogDemo.class);

    public void processData(String name, int age) {
        logger.info("Starting processing for user: {} with age: {}", name, age);
        try {
            int result = 100 / age;
            logger.debug("Division result is: {}", result);
        } catch (ArithmeticException e) {
            logger.error("Failed to divide by zero: {}", e.getMessage(), e);
        }
    }
}`,
      visualizerType: "exception"
    },
    {
      id: 496,
      title: "Logging with Spring Boot",
      intro: "Configuring application logging in Spring Boot using properties.",
      explanation: "Spring Boot uses SLF4J (Simple Logging Facade for Java) with Logback as its default logging provider. Spring Boot configures console output and file logging automatically based on settings in 'application.properties'. You can define logging levels globally or per package using the prefix 'logging.level.<package_name>=<level>'. To switch from Logback to Log4j2, you exclude the default 'spring-boot-starter-logging' starter and include 'spring-boot-starter-log4j2'.",
      gotchas: [
        "If you configure both logging.file.name and logging.file.path, Spring Boot might ignore one of them. Prefer using logging.file.name to specify both path and filename explicitly."
      ],
      interviewQuestions: [
        {
          question: "How do you change log levels dynamically in Spring Boot without writing code?",
          answer: "By setting properties in application.properties or application.yml using the 'logging.level.<package-name>=<LEVEL>' syntax (e.g., logging.level.org.hibernate=SQL)."
        }
      ],
      code: `# application.properties logging configurations
logging.level.root=INFO
logging.level.com.telusuko=DEBUG

# Save logs to file
logging.file.name=logs/springboot_app.log

# Custom Console logging format
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n`,
      visualizerType: "jvm"
    }
  ]
};
