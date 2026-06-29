export default {
  id: 1,
  title: "Foundations & Environment Setup",
  range: "1-16",
  concepts: [
    {
      id: 1,
      title: "Course Introduction",
      intro: "So you hate Java, huh? Probably because someone told you it's 'too verbose' or 'old school'. Let's show you how Java runs the world's most lucrative backends.",
      explanation: "Welcome to the ultimate guide to mastering Java. Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Why should you learn it? Because high-paying roles (50+ LPA) at banks, enterprise systems, and massive cloud companies are built on Java. We will make it fun, fast, and visual.",
      gotchas: [
        "Don't think of Java as just a language; it is an entire ecosystem comprising the JVM, JDK, and JRE."
      ],
      interviewQuestions: [
        {
          question: "Why does Java remain the backbone of large enterprise systems?",
          answer: "Java offers unmatched backward compatibility, robust memory management via Garbage Collection, a mature concurrency model, and high performance powered by the JIT (Just-In-Time) compiler. This guarantees system reliability at scale."
        }
      ],
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, future 50 LPA Engineer!");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 2,
      title: "Use the Course Resources",
      intro: "Don't code in isolation. The Java ecosystem has millions of resources, libraries, and tools.",
      explanation: "To succeed, leverage documentation (JDK Javadocs) and community boards. Knowing how to read Javadocs is a super-power that separates senior engineers from juniors. It lists classes, methods, constructors, and parameter descriptions.",
      gotchas: [
        "StackOverflow answers for Java might use legacy syntax. Always look for modern Java 17+ or Java 21+ solutions."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between official Oracle JDK and OpenJDK?",
          answer: "OpenJDK is the open-source reference implementation of the Java SE platform. Oracle JDK is based on OpenJDK but has commercial support, some proprietary tools, and different licensing agreements."
        }
      ],
      code: "// Tip: Always refer to docs.oracle.com for official API signatures!",
      visualizerType: "jvm"
    },
    {
      id: 3,
      title: "[Important] Access Source Code",
      intro: "You don't learn swimming by watching a video. You need to jump into the code.",
      explanation: "Access to clean source code helps you see patterns. In professional environments, code readability is valued over clever single-line hacks. Write clean, descriptive variable names and document complex logical blocks.",
      gotchas: [
        "Copy-pasting code without understanding classpaths or packages will lead to compilation errors like 'cannot find symbol'."
      ],
      interviewQuestions: [
        {
          question: "What does compile-time error vs run-time error mean?",
          answer: "Compile-time errors (e.g., syntax errors, type mismatches) are caught by the compiler (javac) before execution. Run-time errors (e.g., NullPointerException, ArrayIndexOutOfBoundsException) occur while the JVM is executing the bytecode."
        }
      ],
      code: "// Avoid copy-pasting packages directly. Match directory structure!",
      visualizerType: "jvm"
    },
    {
      id: 4,
      title: "Projects in the Course",
      intro: "We will build projects to cement concepts, like an interactive Quiz Game and database-driven REST apps.",
      explanation: "Projects force you to handle architectural layout, package separation, encapsulation, and error states. We will start with a console-based quiz project (Concept 73-77) and then scale up.",
      gotchas: [
        "Never write your entire logic inside the main() method. Separate concerns into controller, service, and domain classes."
      ],
      interviewQuestions: [
        {
          question: "What is Separation of Concerns (SoC) in Java?",
          answer: "It is a design principle for separating a computer program into distinct sections, such as Model, View, and Controller (MVC), so that each section addresses a separate concern."
        }
      ],
      code: "// We will build a modular Question class and QuestionService class later!",
      visualizerType: "jvm"
    },
    {
      id: 5,
      title: "Fundamentals of Programming",
      intro: "Programs are just recipes for computers. They take input, perform computations, and give output.",
      explanation: "Every program consists of Instructions, Variables, Expressions, and Flow Control. The CPU executes these instructions by fetching them from physical memory (RAM). Understanding physical memory is key to writing high-performance code.",
      gotchas: [
        "Computers work in binary. Floating-point numbers can lose precision during conversion (e.g., 0.1 + 0.2 != 0.3)."
      ],
      interviewQuestions: [
        {
          question: "Why do we say floating-point numbers are imprecise in computing?",
          answer: "Binary representation cannot precisely represent fractions like 1/10. In Java, double/float shouldn't be used for currency; use BigDecimal instead."
        }
      ],
      code: `double val1 = 0.1;
double val2 = 0.2;
System.out.println(val1 + val2); // Outputs: 0.30000000000000004`,
      visualizerType: "jvm"
    },
    {
      id: 6,
      title: "Memory Unit in a Computer",
      intro: "How Java maps variables to physical silicon.",
      explanation: "Memory is divided into bytes (8 bits). Java defines fixed sizes for data types (like 32-bit int, 64-bit long) regardless of the host operating system. This makes Java code fully portable.",
      gotchas: [
        "Unlike C or C++, Java does not allow you to access memory addresses directly using pointers, protecting you from memory corruption."
      ],
      interviewQuestions: [
        {
          question: "Why does Java not support direct pointer manipulation?",
          answer: "Security and simplicity. Direct pointer access can lead to memory leaks, buffer overflows, and unauthorized memory access. JVM handles memory safety."
        }
      ],
      code: `// C++: int* ptr = &x; // Allowed
// Java: Not possible. Pointers are abstracted into safe object references.`,
      visualizerType: "memory"
    },
    {
      id: 7,
      title: "Platform & Platform Dependency",
      intro: "Why building software that only works on Windows is a recipe for career stagnation.",
      explanation: "Platform-dependent languages (like C/C++) compile source code directly into machine-specific assembly (Windows .exe, Mac Darwin, Linux ELF). If you run a Windows C++ binary on Linux, it crashes because the OS system calls and CPU instructions differ.",
      gotchas: [
        "Compiling on Windows doesn't guarantee execution on Mac unless your compiler targets that architecture or you use a VM."
      ],
      interviewQuestions: [
        {
          question: "What makes C or C++ platform-dependent?",
          answer: "They compile directly to native machine code. The compiled binary uses OS-specific system APIs and CPU instruction sets, which cannot run on a different OS."
        }
      ],
      code: "// C/C++ builds target: my-app.exe (Windows) or my-app (Unix native binaries)",
      visualizerType: "jvm"
    },
    {
      id: 8,
      title: "How Java Became Platform Independent (WORA)",
      intro: "WORA = Write Once, Run Anywhere. The secret sauce is the JVM.",
      explanation: "Java compiler (javac) compiles source code (.java) into intermediate bytecode (.class), NOT machine code. The Java Virtual Machine (JVM) interprets or compiles this bytecode into native machine instructions on the fly.",
      gotchas: [
        "Java bytecode is platform-independent, but the JVM itself is platform-dependent! You need a Windows JVM for Windows and a Linux JVM for Linux."
      ],
      interviewQuestions: [
        {
          question: "How does Java achieve platform independence?",
          answer: "By compiling source code into bytecode (.class). Any platform with a compatible Java Virtual Machine (JVM) installed can execute this bytecode. Hence, the bytecode is universal."
        }
      ],
      code: `// compile: javac Main.java -> generates Main.class (Bytecode)
// run: java Main -> JVM reads bytecode, executes native instructions`,
      visualizerType: "jvm"
    },
    {
      id: 9,
      title: "Introduction to Java",
      intro: "Created in 1995 by James Gosling at Sun Microsystems. Initially named 'Oak'.",
      explanation: "Java was designed with five primary goals: simplicity, object-orientation, network capability, robustness, and security. Today, it features modern enhancements like Records, Virtual Threads (Project Loom), and Pattern Matching.",
      gotchas: [
        "Java is NOT JavaSript! They are completely different languages with different compilation models and type systems."
      ],
      interviewQuestions: [
        {
          question: "Is Java a purely object-oriented language?",
          answer: "No. Java is not purely object-oriented because it supports primitive data types (like int, char, boolean) which are not objects. (Using Wrapper classes, it can simulate a pure OOP environment, but primitives remain for speed)."
        }
      ],
      code: `int speed = 100; // Primitive, not an object.
Integer objectSpeed = 100; // Object wrapper.`,
      visualizerType: "jvm"
    },
    {
      id: 10,
      title: "JDK and IDE Download",
      intro: "Let's gear up. To write Java, we need tools.",
      explanation: "The JDK (Java Development Kit) contains compilers, debuggers, and runtime tools. IDEs (Integrated Development Environments) provide auto-completion, refactoring, and debugging helpers.",
      gotchas: [
        "Don't install JRE (Java Runtime Environment) if you want to develop. The JRE only runs compiled apps; JDK is needed to compile."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between JDK, JRE, and JVM?",
          answer: "JVM executes bytecode. JRE contains JVM + core libraries to run apps. JDK contains JRE + development tools (compiler, debugger, etc.). JDK = JRE + Tools."
        }
      ],
      code: `// Command to check if JDK is installed and in path:
// java -version
// javac -version`,
      visualizerType: "jvm"
    },
    {
      id: 11,
      title: "JDK Installation",
      intro: "Setting up your PATH variable is the first hurdle. Get it right to avoid 'command not found'.",
      explanation: "Install JDK (OpenJDK 17 or 21 LTS are recommended). You must configure the `JAVA_HOME` environment variable pointing to the installation directory and add `%JAVA_HOME%/bin` (Windows) or `$JAVA_HOME/bin` (Linux/Mac) to your system path.",
      gotchas: [
        "If `javac` works but `java` runs an old version, check if another application (like Oracle DB or old software) has put its path earlier in the PATH environment variable."
      ],
      interviewQuestions: [
        {
          question: "Why do we need to set the PATH variable during installation?",
          answer: "Setting PATH allows the operating system shell to find the Java executable tools (like java and javac) from any directory without typing their absolute paths."
        }
      ],
      code: `export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$PATH:$JAVA_HOME/bin`,
      visualizerType: "jvm"
    },
    {
      id: 12,
      title: "VS Code Installation",
      intro: "VS Code is lightweight and powerful with Extension Packs.",
      explanation: "Install the 'Extension Pack for Java' by Microsoft in VS Code. It provides class outlines, Maven/Gradle project support, refactoring tools, and test runners.",
      gotchas: [
        "VS Code requires a separate JDK installed. Make sure settings.json points to the correct `java.jdt.ls.java.home` path."
      ],
      interviewQuestions: [
        {
          question: "What language server does VS Code use for Java support?",
          answer: "It uses Eclipse JDT Language Server (Eclipse JDT LS) behind the scenes to provide compilation, analysis, and refactoring commands."
        }
      ],
      code: `// Settings.json configuration:
// "java.jdt.ls.java.home": "/path/to/jdk"`,
      visualizerType: "jvm"
    },
    {
      id: 13,
      title: "IntelliJ IDEA Installation",
      intro: "The gold standard for enterprise Java developers.",
      explanation: "IntelliJ IDEA by JetBrains is the most popular IDE for Java. It offers powerful static code analysis, autocomplete, refactoring, and built-in database support. Community edition is free; Ultimate is paid.",
      gotchas: [
        "IntelliJ does compile-on-save differently than Eclipse. It uses a virtual file system and incremental compiler."
      ],
      interviewQuestions: [
        {
          question: "What makes IntelliJ refactoring tools so powerful?",
          answer: "It builds an Abstract Syntax Tree (AST) of the code. This lets it analyze dependencies safely across the entire project before changing variable/class names."
        }
      ],
      code: "// Tip: Learn keyboard shortcuts like Alt+Enter for quick fixes and Ctrl+Shift+A to find actions.",
      visualizerType: "jvm"
    },
    {
      id: 14,
      title: "Eclipse Installation",
      intro: "The classic, open-source veteran IDE.",
      explanation: "Eclipse has been around for decades. It uses an incremental compiler, meaning as soon as you save a file, it compiles it immediately. It's highly customizable via plugins.",
      gotchas: [
        "Eclipse workspace configurations can get corrupted. If the build breaks randomly, try clean-build ('Project -> Clean')."
      ],
      interviewQuestions: [
        {
          question: "How does Eclipse's compiler differ from JDK's javac?",
          answer: "Eclipse uses its own built-in compiler (Eclipse Compiler for Java - ECJ). It can compile code even with minor syntax errors in other parts of the project, unlike javac."
        }
      ],
      code: "// Eclipse's ECJ allows running parts of programs containing compilation errors in unrelated classes!",
      visualizerType: "jvm"
    },
    {
      id: 15,
      title: "First Code in Java",
      intro: "Let's dissect the ritual: public static void main...",
      explanation: "Every Java line of executable code must live inside a Class. The entry point is the main method: `public static void main(String[] args)`. Let's break it down: public (accessible anywhere), static (runs without instantiating class), void (returns nothing), main (method name), String[] args (command line arguments).",
      gotchas: [
        "Filenames MUST match the public class name. If class is `App`, filename must be `App.java`. Case sensitivity matters!"
      ],
      interviewQuestions: [
        {
          question: "What happens if we remove 'static' from main method signature?",
          answer: "The JVM will compile the code, but at runtime, it will crash with a NoSuchMethodError because it expects a static main entry point without creating a class instance."
        }
      ],
      code: `public class MyFirstApp {
    public static void main(String[] args) {
        System.out.println("No more Java fear!");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 16,
      title: "How Java Works",
      intro: "From text to running bytecode - the compilation journey.",
      explanation: `1. Developer writes code in \`Source.java\`.
2. Compiler (\`javac\`) checks syntax and creates bytecode in \`Source.class\`.
3. JVM loads bytecode into memory (ClassLoader).
4. JVM Execution Engine interprets bytecode or compiles hot paths using JIT compiler to binary machine instructions.`,
      gotchas: [
        "Bytecode is universal. If you distribute a compiled .class file, anyone with a JVM can run it, regardless of their OS version."
      ],
      interviewQuestions: [
        {
          question: "What is JIT and how does it speed up execution?",
          answer: "Just-In-Time compiler compiles parts of bytecode that are run frequently ('hotspots') into native machine code at runtime, bypassing interpreter lag for performance."
        }
      ],
      code: "// java SourceCode.java (Since Java 11: compiles and runs in one step without generating explicit .class file, ideal for scripts!)",
      visualizerType: "jvm"
    }
  ]
};
