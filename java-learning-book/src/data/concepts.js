export const chapters = [
  {
    id: 1,
    title: "Foundations & Environment Setup",
    range: "1-16",
    concepts: [
      {
        id: 1,
        title: "Course Introduction",
        intro: "So you hate Java, huh? Probably because someone told you it's 'too verbose' or 'old school'. Let's show you how Java runs the world's most lucrative backends.",
        explanation: "Welcome to the ultimate guide to mastering Java. Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Why should you learn it? Because high-paying roles (50+ LPA) at banks, enterprise systems, and massive cloud companies are built on Java. We will make it fun, fast, and visual.",
        gotchas: ["Don't think of Java as just a language; it is an entire ecosystem comprising the JVM, JDK, and JRE."],
        interviewQuestions: [
          {
            question: "Why does Java remain the backbone of large enterprise systems?",
            answer: "Java offers unmatched backward compatibility, robust memory management via Garbage Collection, a mature concurrency model, and high performance powered by the JIT (Just-In-Time) compiler. This guarantees system reliability at scale."
          }
        ],
        code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, future 50 LPA Engineer!");\n    }\n}`,
        visualizerType: "jvm"
      },
      {
        id: 2,
        title: "Use the Course Resources",
        intro: "Don't code in isolation. The Java ecosystem has millions of resources, libraries, and tools.",
        explanation: "To succeed, leverage documentation (JDK Javadocs) and community boards. Knowing how to read Javadocs is a super-power that separates senior engineers from juniors. It lists classes, methods, constructors, and parameter descriptions.",
        gotchas: ["StackOverflow answers for Java might use legacy syntax. Always look for modern Java 17+ or Java 21+ solutions."],
        interviewQuestions: [
          {
            question: "What is the difference between official Oracle JDK and OpenJDK?",
            answer: "OpenJDK is the open-source reference implementation of the Java SE platform. Oracle JDK is based on OpenJDK but has commercial support, some proprietary tools, and different licensing agreements."
          }
        ],
        code: `// Tip: Always refer to docs.oracle.com for official API signatures!`,
        visualizerType: "jvm"
      },
      {
        id: 3,
        title: "[Important] Access Source Code",
        intro: "You don't learn swimming by watching a video. You need to jump into the code.",
        explanation: "Access to clean source code helps you see patterns. In professional environments, code readability is valued over clever single-line hacks. Write clean, descriptive variable names and document complex logical blocks.",
        gotchas: ["Copy-pasting code without understanding classpaths or packages will lead to compilation errors like 'cannot find symbol'."],
        interviewQuestions: [
          {
            question: "What does compile-time error vs run-time error mean?",
            answer: "Compile-time errors (e.g., syntax errors, type mismatches) are caught by the compiler (javac) before execution. Run-time errors (e.g., NullPointerException, ArrayIndexOutOfBoundsException) occur while the JVM is executing the bytecode."
          }
        ],
        code: `// Avoid copy-pasting packages directly. Match directory structure!`,
        visualizerType: "jvm"
      },
      {
        id: 4,
        title: "Projects in the Course",
        intro: "We will build projects to cement concepts, like an interactive Quiz Game and database-driven REST apps.",
        explanation: "Projects force you to handle architectural layout, package separation, encapsulation, and error states. We will start with a console-based quiz project (Concept 73-77) and then scale up.",
        gotchas: ["Never write your entire logic inside the main() method. Separate concerns into controller, service, and domain classes."],
        interviewQuestions: [
          {
            question: "What is Separation of Concerns (SoC) in Java?",
            answer: "It is a design principle for separating a computer program into distinct sections, such as Model, View, and Controller (MVC), so that each section addresses a separate concern."
          }
        ],
        code: `// We will build a modular Question class and QuestionService class later!`,
        visualizerType: "jvm"
      },
      {
        id: 5,
        title: "Fundamentals of Programming",
        intro: "Programs are just recipes for computers. They take input, perform computations, and give output.",
        explanation: "Every program consists of Instructions, Variables, Expressions, and Flow Control. The CPU executes these instructions by fetching them from physical memory (RAM). Understanding physical memory is key to writing high-performance code.",
        gotchas: ["Computers work in binary. Floating-point numbers can lose precision during conversion (e.g., 0.1 + 0.2 != 0.3)."],
        interviewQuestions: [
          {
            question: "Why do we say floating-point numbers are imprecise in computing?",
            answer: "Binary representation cannot precisely represent fractions like 1/10. In Java, double/float shouldn't be used for currency; use BigDecimal instead."
          }
        ],
        code: `double val1 = 0.1;\ndouble val2 = 0.2;\nSystem.out.println(val1 + val2); // Outputs: 0.30000000000000004`,
        visualizerType: "jvm"
      },
      {
        id: 6,
        title: "Memory Unit in a Computer",
        intro: "How Java maps variables to physical silicon.",
        explanation: "Memory is divided into bytes (8 bits). Java defines fixed sizes for data types (like 32-bit int, 64-bit long) regardless of the host operating system. This makes Java code fully portable.",
        gotchas: ["Unlike C or C++, Java does not allow you to access memory addresses directly using pointers, protecting you from memory corruption."],
        interviewQuestions: [
          {
            question: "Why does Java not support direct pointer manipulation?",
            answer: "Security and simplicity. Direct pointer access can lead to memory leaks, buffer overflows, and unauthorized memory access. JVM handles memory safety."
          }
        ],
        code: `// C++: int* ptr = &x; // Allowed\n// Java: Not possible. Pointers are abstracted into safe object references.`,
        visualizerType: "memory"
      },
      {
        id: 7,
        title: "Platform & Platform Dependency",
        intro: "Why building software that only works on Windows is a recipe for career stagnation.",
        explanation: "Platform-dependent languages (like C/C++) compile source code directly into machine-specific assembly (Windows .exe, Mac Darwin, Linux ELF). If you run a Windows C++ binary on Linux, it crashes because the OS system calls and CPU instructions differ.",
        gotchas: ["Compiling on Windows doesn't guarantee execution on Mac unless your compiler targets that architecture or you use a VM."],
        interviewQuestions: [
          {
            question: "What makes C or C++ platform-dependent?",
            answer: "They compile directly to native machine code. The compiled binary uses OS-specific system APIs and CPU instruction sets, which cannot run on a different OS."
          }
        ],
        code: `// C/C++ builds target: my-app.exe (Windows) or my-app (Unix native binaries)`,
        visualizerType: "jvm"
      },
      {
        id: 8,
        title: "How Java Became Platform Independent (WORA)",
        intro: "WORA = Write Once, Run Anywhere. The secret sauce is the JVM.",
        explanation: "Java compiler (javac) compiles source code (.java) into intermediate bytecode (.class), NOT machine code. The Java Virtual Machine (JVM) interprets or compiles this bytecode into native machine instructions on the fly.",
        gotchas: ["Java bytecode is platform-independent, but the JVM itself is platform-dependent! You need a Windows JVM for Windows and a Linux JVM for Linux."],
        interviewQuestions: [
          {
            question: "How does Java achieve platform independence?",
            answer: "By compiling source code into bytecode (.class). Any platform with a compatible Java Virtual Machine (JVM) installed can execute this bytecode. Hence, the bytecode is universal."
          }
        ],
        code: `// compile: javac Main.java -> generates Main.class (Bytecode)\n// run: java Main -> JVM reads bytecode, executes native instructions`,
        visualizerType: "jvm"
      },
      {
        id: 9,
        title: "Introduction to Java",
        intro: "Created in 1995 by James Gosling at Sun Microsystems. Initially named 'Oak'.",
        explanation: "Java was designed with five primary goals: simplicity, object-orientation, network capability, robustness, and security. Today, it features modern enhancements like Records, Virtual Threads (Project Loom), and Pattern Matching.",
        gotchas: ["Java is NOT JavaSript! They are completely different languages with different compilation models and type systems."],
        interviewQuestions: [
          {
            question: "Is Java a purely object-oriented language?",
            answer: "No. Java is not purely object-oriented because it supports primitive data types (like int, char, boolean) which are not objects. (Using Wrapper classes, it can simulate a pure OOP environment, but primitives remain for speed)."
          }
        ],
        code: `int speed = 100; // Primitive, not an object.\nInteger objectSpeed = 100; // Object wrapper.`,
        visualizerType: "jvm"
      },
      {
        id: 10,
        title: "JDK and IDE Download",
        intro: "Let's gear up. To write Java, we need tools.",
        explanation: "The JDK (Java Development Kit) contains compilers, debuggers, and runtime tools. IDEs (Integrated Development Environments) provide auto-completion, refactoring, and debugging helpers.",
        gotchas: ["Don't install JRE (Java Runtime Environment) if you want to develop. The JRE only runs compiled apps; JDK is needed to compile."],
        interviewQuestions: [
          {
            question: "What is the difference between JDK, JRE, and JVM?",
            answer: "JVM executes bytecode. JRE contains JVM + core libraries to run apps. JDK contains JRE + development tools (compiler, debugger, etc.). JDK = JRE + Tools."
          }
        ],
        code: `// Command to check if JDK is installed and in path:\n// java -version\n// javac -version`,
        visualizerType: "jvm"
      },
      {
        id: 11,
        title: "JDK Installation",
        intro: "Setting up your PATH variable is the first hurdle. Get it right to avoid 'command not found'.",
        explanation: "Install JDK (OpenJDK 17 or 21 LTS are recommended). You must configure the `JAVA_HOME` environment variable pointing to the installation directory and add `%JAVA_HOME%/bin` (Windows) or `$JAVA_HOME/bin` (Linux/Mac) to your system path.",
        gotchas: ["If `javac` works but `java` runs an old version, check if another application (like Oracle DB or old software) has put its path earlier in the PATH environment variable."],
        interviewQuestions: [
          {
            question: "Why do we need to set the PATH variable during installation?",
            answer: "Setting PATH allows the operating system shell to find the Java executable tools (like java and javac) from any directory without typing their absolute paths."
          }
        ],
        code: `export JAVA_HOME=/usr/lib/jvm/java-17-openjdk\nexport PATH=$PATH:$JAVA_HOME/bin`,
        visualizerType: "jvm"
      },
      {
        id: 12,
        title: "VS Code Installation",
        intro: "VS Code is lightweight and powerful with Extension Packs.",
        explanation: "Install the 'Extension Pack for Java' by Microsoft in VS Code. It provides class outlines, Maven/Gradle project support, refactoring tools, and test runners.",
        gotchas: ["VS Code requires a separate JDK installed. Make sure settings.json points to the correct `java.jdt.ls.java.home` path."],
        interviewQuestions: [
          {
            question: "What language server does VS Code use for Java support?",
            answer: "It uses Eclipse JDT Language Server (Eclipse JDT LS) behind the scenes to provide compilation, analysis, and refactoring commands."
          }
        ],
        code: `// Settings.json configuration:\n// "java.jdt.ls.java.home": "/path/to/jdk"`,
        visualizerType: "jvm"
      },
      {
        id: 13,
        title: "IntelliJ IDEA Installation",
        intro: "The gold standard for enterprise Java developers.",
        explanation: "IntelliJ IDEA by JetBrains is the most popular IDE for Java. It offers powerful static code analysis, autocomplete, refactoring, and built-in database support. Community edition is free; Ultimate is paid.",
        gotchas: ["IntelliJ does compile-on-save differently than Eclipse. It uses a virtual file system and incremental compiler."],
        interviewQuestions: [
          {
            question: "What makes IntelliJ refactoring tools so powerful?",
            answer: "It builds an Abstract Syntax Tree (AST) of the code. This lets it analyze dependencies safely across the entire project before changing variable/class names."
          }
        ],
        code: `// Tip: Learn keyboard shortcuts like Alt+Enter for quick fixes and Ctrl+Shift+A to find actions.`,
        visualizerType: "jvm"
      },
      {
        id: 14,
        title: "Eclipse Installation",
        intro: "The classic, open-source veteran IDE.",
        explanation: "Eclipse has been around for decades. It uses an incremental compiler, meaning as soon as you save a file, it compiles it immediately. It's highly customizable via plugins.",
        gotchas: ["Eclipse workspace configurations can get corrupted. If the build breaks randomly, try clean-build ('Project -> Clean')."],
        interviewQuestions: [
          {
            question: "How does Eclipse's compiler differ from JDK's javac?",
            answer: "Eclipse uses its own built-in compiler (Eclipse Compiler for Java - ECJ). It can compile code even with minor syntax errors in other parts of the project, unlike javac."
          }
        ],
        code: `// Eclipse's ECJ allows running parts of programs containing compilation errors in unrelated classes!`,
        visualizerType: "jvm"
      },
      {
        id: 15,
        title: "First Code in Java",
        intro: "Let's dissect the ritual: public static void main...",
        explanation: "Every Java line of executable code must live inside a Class. The entry point is the main method: `public static void main(String[] args)`. Let's break it down: public (accessible anywhere), static (runs without instantiating class), void (returns nothing), main (method name), String[] args (command line arguments).",
        gotchas: ["Filenames MUST match the public class name. If class is `App`, filename must be `App.java`. Case sensitivity matters!"],
        interviewQuestions: [
          {
            question: "What happens if we remove 'static' from main method signature?",
            answer: "The JVM will compile the code, but at runtime, it will crash with a NoSuchMethodError because it expects a static main entry point without creating a class instance."
          }
        ],
        code: `public class MyFirstApp {\n    public static void main(String[] args) {\n        System.out.println("No more Java fear!");\n    }\n}`,
        visualizerType: "jvm"
      },
      {
        id: 16,
        title: "How Java Works",
        intro: "From text to running bytecode - the compilation journey.",
        explanation: "1. Developer writes code in `Source.java`.\n2. Compiler (`javac`) checks syntax and creates bytecode in `Source.class`.\n3. JVM loads bytecode into memory (ClassLoader).\n4. JVM Execution Engine interprets bytecode or compiles hot paths using JIT compiler to binary machine instructions.",
        gotchas: ["Bytecode is universal. If you distribute a compiled .class file, anyone with a JVM can run it, regardless of their OS version."],
        interviewQuestions: [
          {
            question: "What is JIT and how does it speed up execution?",
            answer: "Just-In-Time compiler compiles parts of bytecode that are run frequently ('hotspots') into native machine code at runtime, bypassing interpreter lag for performance."
          }
        ],
        code: `// java SourceCode.java (Since Java 11: compiles and runs in one step without generating explicit .class file, ideal for scripts!)`,
        visualizerType: "jvm"
      }
    ]
  },
  {
    id: 2,
    title: "Variables, Types & Operators",
    range: "17-23",
    concepts: [
      {
        id: 17,
        title: "Variables",
        intro: "Variables are named boxes in memory where we hold our data.",
        explanation: "In Java, every variable must have a declared Type (Java is statically typed). Syntactically: `dataType variableName = value;`. You cannot change a variable's type after declaration.",
        gotchas: ["Variables declared inside a method (local variables) must be initialized before use. They do NOT get default values like class instance fields!"],
        interviewQuestions: [
          {
            question: "What is the difference between local variables and instance variables in memory initialization?",
            answer: "Instance variables get default values (e.g., 0, null, false) when the object is created on the heap. Local variables are created on the stack and must be explicitly initialized before reading, otherwise compilation fails."
          }
        ],
        code: `public class VarDemo {\n    public static void main(String[] args) {\n        int count; // declared\n        // System.out.println(count); // ERROR: count not initialized!\n        count = 10; \n        System.out.println(count); // OK\n    }\n}`,
        visualizerType: "memory"
      },
      {
        id: 18,
        title: "Data Types",
        intro: "Primitives vs. References. The hardware layout of Java.",
        explanation: "Java has 8 primitive types: byte (1 byte), short (2), int (4), long (8), float (4), double (8), char (2, UTF-16), boolean. Reference types (Objects, Arrays, Strings) store references (pointers) pointing to the heap.",
        gotchas: ["Characters in Java are 2 bytes because they support Unicode (UTF-16), unlike C++ chars which are typically 1 byte (ASCII)."],
        interviewQuestions: [
          {
            question: "Why does Java define precise byte sizes for primitive types?",
            answer: "To ensure platform independence. In other languages, sizes might depend on 32-bit or 64-bit architecture; Java guarantees an 'int' is always 32-bit on all systems."
          }
        ],
        code: `int num = 100_000_000; // Java allows underscores in literals for readability!\nchar letter = 'A';\nboolean isJavaHard = false;`,
        visualizerType: "memory"
      },
      {
        id: 19,
        title: "Literals",
        intro: "Literals are constant values assigned directly to variables.",
        explanation: "Examples: `100` (int literal), `100L` (long literal), `3.14` (double literal), `3.14f` (float literal), `'A'` (char literal), \"Hello\" (String literal). We can represent integer literals in Hexadecimal (0x), Binary (0b), or Octal (0).",
        gotchas: ["Assigning `3.14` directly to float fails because decimal literals are default `double` (64-bit). You must append 'f' (e.g. `3.14f`)."],
        interviewQuestions: [
          {
            question: "What is the difference between float f = 3.14; and float f = 3.14f;?",
            answer: "The first statement will cause a compile-time error because 3.14 is treated as a double, and narrow conversion to float requires explicit casting or the 'f' suffix."
          }
        ],
        code: `float pi = 3.14f; // OK\ndouble d = 3.14;\nint hex = 0x1A; // Hexadecimal (26 decimal)\nint bin = 0b1101; // Binary (13 decimal)`,
        visualizerType: "memory"
      },
      {
        id: 20,
        title: "Type Conversion",
        intro: "Casting values. Implicit widening vs. Explicit narrowing.",
        explanation: "Widening (Implicit): assigning small type to large type (e.g. byte to int). No data loss. Narrowing (Explicit/Casting): assigning large type to small type (e.g. double to int). Possible loss of precision.",
        gotchas: ["Narrowing casting truncation: casting 257 (int) to byte results in 1, because 257 in binary is 0001 0000 0001, and byte truncates to the last 8 bits (0000 0001 = 1)."],
        interviewQuestions: [
          {
            question: "What is promotion of types in arithmetic expressions?",
            answer: "During operations, Java automatically promotes byte, short, char operands to 'int'. If one operand is long, float, or double, the entire expression is promoted to that type."
          }
        ],
        code: `byte b = 10;\nint i = b; // Widening (Implicit)\n\ndouble d = 9.78;\nint castedInt = (int) d; // Narrowing (Explicit) -> castedInt is 9 (truncates decimals)`,
        visualizerType: "memory"
      },
      {
        id: 21,
        title: "Arithmetic Operators",
        intro: "Simple calculations: addition, subtraction, division, and modulo.",
        explanation: "Arithmetic operations (+, -, *, /, %). Modulo (%) returns the remainder of division. Division (/) with two integers yields an integer (e.g. 5/2 is 2). Make one operand double to get decimal results (5.0/2 is 2.5).",
        gotchas: ["Division by zero with integers throws ArithmeticException. Division by zero with float/double yields Infinity or NaN (Not a Number) without throwing exception!"],
        interviewQuestions: [
          {
            question: "What is the result of 1.0 / 0.0 in Java?",
            answer: "It returns Double.POSITIVE_INFINITY. It does not throw an ArithmeticException because floating-point operations follow IEEE 754 standards."
          }
        ],
        code: `int x = 5 / 2; // x is 2\ndouble y = 5.0 / 2; // y is 2.5\n\n// System.out.println(10 / 0); // Throws ArithmeticException\nSystem.out.println(10.0 / 0.0); // Prints: Infinity`,
        visualizerType: "jvm"
      },
      {
        id: 22,
        title: "Relational Operators",
        intro: "Comparing things: true or false.",
        explanation: "Operators: ==, !=, >, <, >=, <=. Relational operators compare values and return a boolean.",
        gotchas: ["Never use == to compare Strings or Objects! == compares memory addresses (reference equality), not content value. Use .equals() instead."],
        interviewQuestions: [
          {
            question: "Explain the difference between == and .equals() in Java.",
            answer: "== is a binary operator that compares primitive values or reference addresses. .equals() is a method in Object class intended to compare values/contents of objects."
          }
        ],
        code: `int a = 10, b = 20;\nSystem.out.println(a < b); // true\n\nString s1 = new String("hi");\nString s2 = new String("hi");\nSystem.out.println(s1 == s2); // false (different objects in heap!)\nSystem.out.println(s1.equals(s2)); // true (same letters!)`,
        visualizerType: "string-pool"
      },
      {
        id: 23,
        title: "Logical Operators",
        intro: "Combining conditions: AND, OR, NOT. Speed matters with Short-Circuiting.",
        explanation: "Operators: && (Short-circuit AND), || (Short-circuit OR), ! (NOT). Short-circuit means if the first operand determines the outcome, the second operand is not evaluated.",
        gotchas: ["Single & and | are bitwise or non-short-circuit logical operators. They evaluate both operands. Using them logically can cause NullPointerException if the second condition checks a null variable."],
        interviewQuestions: [
          {
            question: "What is short-circuit evaluation and why is it useful?",
            answer: "It stops evaluating expression operands once the final truth value is known. && stops if first operand is false. || stops if first operand is true. Saves processing and guards against errors."
          }
        ],
        code: `String str = null;\n// && guards against NullPointerException:\nif (str != null && str.length() > 0) {\n    System.out.println("Valid");\n}\n\n// Using single & would cause NullPointerException because str.length() runs even though str is null!\n// if (str != null & str.length() > 0)`,
        visualizerType: "jvm"
      }
    ]
  },
  {
    id: 3,
    title: "Control Flow & Loops",
    range: "24-32",
    concepts: [
      {
        id: 24,
        title: "If Else",
        intro: "Decision making. Forking the path of execution.",
        explanation: "Executes a block of code if the condition is true, otherwise executes the else block. Syntax: `if (booleanCondition) { ... } else { ... }`.",
        gotchas: ["In Java, conditions MUST evaluate to boolean. Unlike C++, `if (1)` or `if (count)` will fail to compile."],
        interviewQuestions: [
          {
            question: "Will 'if(x = 5)' compile in Java if x is an integer?",
            answer: "No. The assignment operator '=' returns the value 5, which is an integer. Java requires a boolean in if-conditions, so this fails. (If x were boolean, e.g., 'if(x = true)', it would compile)."
          }
        ],
        code: `int age = 18;\nif (age >= 18) {\n    System.out.println("Voter");\n} else {\n    System.out.println("Minor");\n}`,
        visualizerType: "jvm"
      },
      {
        id: 25,
        title: "If-Else-If",
        intro: "Multiple options, chosen sequentially.",
        explanation: "Tests multiple conditions in order. Once a condition is true, its block is executed, and the rest of the chain is skipped.",
        gotchas: ["Order matters! Put specific conditions at the top, and broad conditions below. If a broad condition matches first, the specific one is never reached."],
        interviewQuestions: [
          {
            question: "Is there any performance penalty in deep if-else-if chains?",
            answer: "Yes, it evaluates sequentially (O(N)). For large numbers of constant options, a Switch statement or Map lookup is faster (O(1) compiled via tableswitch)."
          }
        ],
        code: `int marks = 85;\nif (marks > 90) {\n    System.out.println("A+");\n} else if (marks > 80) {\n    System.out.println("A"); // Prints this, skips next\n} else {\n    System.out.println("B");\n}`,
        visualizerType: "jvm"
      },
      {
        id: 26,
        title: "Ternary Operator",
        intro: "Shortest decision maker in town. One-liner if-else.",
        explanation: "Syntax: `condition ? expressionIfTrue : expressionIfFalse`. It evaluates to a value and can be assigned directly.",
        gotchas: ["Avoid nesting ternaries! Reading `a ? b ? c : d : e` will cause teammates to pull their hair out. Keep it simple."],
        interviewQuestions: [
          {
            question: "What is the type of a ternary operator result?",
            answer: "The JVM determines a common compatible type for both result expressions. If one is double and the other is int, the result type will be promoted to double."
          }
        ],
        code: `int time = 20;\nString greeting = (time < 18) ? "Good day" : "Good evening";`,
        visualizerType: "jvm"
      },
      {
        id: 27,
        title: "Switch Statement",
        intro: "Clean alternative to deep if-else-if blocks.",
        explanation: "Matches a variable against multiple constant values. Java supports switch on primitives (byte, short, char, int), String, and Enums. In modern Java, switch expressions return values.",
        gotchas: ["Forgot `break`? Execution falls through to the next case automatically! Always check case terminations."],
        interviewQuestions: [
          {
            question: "Does switch support float or double in Java?",
            answer: "No. Switch does not support float/double because floating-point precision issues make exact constant matching unreliable."
          }
        ],
        code: `int day = 2;\nswitch (day) {\n    case 1 -> System.out.println("Monday");\n    case 2 -> System.out.println("Tuesday"); // Modern syntax auto-breaks!\n    default -> System.out.println("Other day");\n}`,
        visualizerType: "jvm"
      },
      {
        id: 28,
        title: "Need for Loops",
        intro: "Don't repeat yourself. Let the CPU do the boring loops.",
        explanation: "Looping allows execution of a block of code repeatedly. Instead of copy-pasting code 100 times, write a loop that increments a counter.",
        gotchas: ["Infinite loops can freeze your application, consume 100% CPU, and crash systems. Always define a clear terminating condition."],
        interviewQuestions: [
          {
            question: "How does CPU handle loops at assembly level?",
            answer: "It uses conditional jump instructions (like JMP, JZ) checking registers that decrement/increment values, repeating code segments."
          }
        ],
        code: `// Loops automate repetitive tasks efficiently!`,
        visualizerType: "jvm"
      },
      {
        id: 29,
        title: "While Loop",
        intro: "Runs while a condition remains true. Checked first.",
        explanation: "Evaluates condition BEFORE entering loop body. If false initially, loop body runs zero times.",
        gotchas: ["Ensure loop control variables are updated inside the loop body, otherwise the loop runs forever."],
        interviewQuestions: [
          {
            question: "When should you prefer a while loop over a for loop?",
            answer: "Use while loop when the number of iterations is not known beforehand (e.g., reading a file line-by-line until end-of-file)."
          }
        ],
        code: `int i = 0;\nwhile (i < 5) {\n    System.out.println(i);\n    i++; // Don't forget this!\n}`,
        visualizerType: "jvm"
      },
      {
        id: 30,
        title: "Do-While Loop",
        intro: "Act first, ask questions later. Guaranteed one execution.",
        explanation: "Condition is evaluated AFTER executing the body. The body always runs at least once, even if the condition is false.",
        gotchas: ["Must end the while statement with a semicolon: `do { ... } while (condition);`."],
        interviewQuestions: [
          {
            question: "What is the key differentiator of do-while loop?",
            answer: "It executes the loop body first and checks the condition at the bottom, guaranteeing at least one execution."
          }
        ],
        code: `int count = 10;\ndo {\n    System.out.println("Count is: " + count);\n    count++;\n} while (count < 5); // runs once even though 10 is not < 5!`,
        visualizerType: "jvm"
      },
      {
        id: 31,
        title: "For Loop",
        intro: "Compact and powerful. Initialization, condition, and increment in one line.",
        explanation: "Syntax: `for (initialization; condition; update) { body }`. Executed in order: initialization, condition check, body, update, condition check again.",
        gotchas: ["Declaring variables inside the initialization block limits their scope to the loop only. They can't be read outside."],
        interviewQuestions: [
          {
            question: "Can we write multiple initializations or increments in a for loop?",
            answer: "Yes, separated by commas. E.g., 'for(int i=0, j=10; i<j; i++, j--)' is completely valid."
          }
        ],
        code: `for (int i = 0; i < 5; i++) {\n    System.out.println("i: " + i);\n}`,
        visualizerType: "jvm"
      },
      {
        id: 32,
        title: "Which Loop to Use",
        intro: "Right tool for the right job.",
        explanation: "Use **For Loop** when size/iterations is fixed (like array bounds). Use **While Loop** when looping until a condition is met (like network reading). Use **Do-While** when a menu options prompt must display once before checking selection.",
        gotchas: ["Using the wrong loop can lead to off-by-one errors (index out of bounds) or messy counter initializations."],
        interviewQuestions: [
          {
            question: "Which loop is most performant in Java?",
            answer: "At bytecode level, there is minimal difference. The JVM compiles them similarly into conditional jumps. Choose for readability."
          }
        ],
        code: `// Iterate array: for loop.\n// Read stream: while loop.\n// Interactive CLI: do-while loop.`,
        visualizerType: "jvm"
      }
    ]
  },
  {
    id: 4,
    title: "Objects, Memory & Methods",
    range: "33-38",
    concepts: [
      {
        id: 33,
        title: "Class and Object Theory",
        intro: "Classes are blueprints. Objects are actual physical structures created from them.",
        explanation: "A Class defines the template, state (fields), and behavior (methods). An Object is an instance of that class which lives in the computer heap memory. It occupies bytes of actual memory.",
        gotchas: ["Creating a class does not occupy memory for fields. Only instantiating it with `new` allocates heap memory."],
        interviewQuestions: [
          {
            question: "What is an instance variable vs static variable?",
            answer: "Instance variables belong to a specific object. Static variables belong to the Class itself and are shared among all instances."
          }
        ],
        code: `class Calculator {\n    int result; // Instance field\n}\n// Calc object:\nCalculator calc = new Calculator();`,
        visualizerType: "memory"
      },
      {
        id: 34,
        title: "Class and Object Practical",
        intro: "Instantiating classes and invoking methods.",
        explanation: "We instantiate objects using the `new` operator. This allocates memory for the instance fields on the heap and returns a reference. We use the dot operator (.) to access fields and methods.",
        gotchas: ["Assigning one object variable to another does NOT copy the object; it only copies the reference pointer to the same object!"],
        interviewQuestions: [
          {
            question: "If Object a = new Object(); Object b = a; b.name = 'x'; does a's name change?",
            answer: "Yes, because both variables 'a' and 'b' point to the exact same object in the heap memory."
          }
        ],
        code: `class Dog {\n    String name;\n}\nDog d1 = new Dog();\nd1.name = "Rocky";\nDog d2 = d1; // copies reference!\nd2.name = "Bruno"; // Changes Rocky to Bruno!`,
        visualizerType: "memory"
      },
      {
        id: 35,
        title: "JDK, JRE, and JVM",
        intro: "The Holy Trinity of Java execution.",
        explanation: "JVM (Java Virtual Machine) executes compiled bytecode. JRE (Java Runtime Environment) bundles JVM with core class libraries. JDK (Java Development Kit) has JRE, compiler (javac), packagers, and debugger. JDK is for writing; JRE is for running.",
        gotchas: ["You cannot run Java bytecode (.class) without JRE installed. JVM needs the class libraries to execute even basic commands."],
        interviewQuestions: [
          {
            question: "Is JVM platform independent?",
            answer: "No, JVM is platform-dependent because it must translate bytecode into the specific assembly language and system calls of the underlying OS."
          }
        ],
        code: `// JVM structure: Class Loader, JVM memory area (Stack/Heap/Method area), Execution Engine (JIT/Garbage Collector)`,
        visualizerType: "jvm"
      },
      {
        id: 36,
        title: "Methods",
        intro: "What objects do: behavior and logic capsules.",
        explanation: "Methods define the behavior of objects. Syntax: `accessModifier returnType name(parameters) { body }`. Java methods only receive arguments 'Pass-by-Value'.",
        gotchas: ["Passing an object reference passes a copy of the pointer address. You can modify the object's fields, but changing the parameter pointer to a new object won't affect the caller!"],
        interviewQuestions: [
          {
            question: "Does Java support Pass-by-Reference?",
            answer: "No, Java is strictly Pass-by-Value. For primitives, it passes a copy of the value. For objects, it passes a copy of the reference address."
          }
        ],
        code: `class Person {\n    void changeAge(int a) { a = 30; } // passes copy, original unmodified\n    void rename(Dog d) { d.name = "Max"; } // modifies heap object!\n}`,
        visualizerType: "memory"
      },
      {
        id: 37,
        title: "Method Overloading",
        intro: "Same name, different signatures. Compile-time polymorphism.",
        explanation: "Declaring multiple methods with the exact same name but different parameters (number of parameters, types, or sequence). Return type alone does NOT overload a method.",
        gotchas: ["Compiler resolves overloaded methods at compile-time based on reference types, not runtime types. This is compile-time polymorphism."],
        interviewQuestions: [
          {
            question: "Why does changing only the return type not overload a method?",
            answer: "Because the compiler wouldn't be able to determine which method to execute if called without assigning the result. E.g., 'calc(5, 10)' is ambiguous."
          }
        ],
        code: `class Adder {\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; } // Overloaded!\n}`,
        visualizerType: "jvm"
      },
      {
        id: 38,
        title: "Stack and Heap",
        intro: "The battleground of memory management.",
        explanation: "Stack memory holds method execution frames, local variables, and object references. Stack is fast and organized in LIFO. Heap memory holds actual instantiated objects and instance fields. Objects on the heap are managed by the Garbage Collector.",
        gotchas: ["If heap memory runs out, JVM throws OutOfMemoryError (OOM). If stack memory overflows due to deep recursion, JVM throws StackOverflowError."],
        interviewQuestions: [
          {
            question: "Compare Stack and Heap memory allocations.",
            answer: "Stack is block-allocated per thread, very fast, holds local primitive variables and object references. Heap is shared space, holds all objects, managed dynamically, slower, cleaned by GC."
          }
        ],
        code: `// Stack frame created for main method. \n// 'new' Allocates instance in Heap.\nMyClass obj = new MyClass(); `,
        visualizerType: "memory"
      }
    ]
  },
  {
    id: 5,
    title: "Arrays & Strings",
    range: "39-48",
    concepts: [
      {
        id: 39,
        title: "Need for an Array",
        intro: "Imagine storing 100 students' grades in individual variables. Nightmare, right?",
        explanation: "Arrays are contiguous blocks of memory that store multiple elements of the same data type. This provides instant retrieval of elements using index numbers (0-indexed).",
        gotchas: ["Arrays have a fixed size! Once created, you cannot increase or decrease their length. Use ArrayList if you need dynamic scaling."],
        interviewQuestions: [
          {
            question: "What is the time complexity of looking up an element in an array by its index?",
            answer: "O(1) constant time, because the memory offset is calculated instantly using the base address + (index * data size)."
          }
        ],
        code: `int[] grades = new int[5]; // Stores 5 integer grades`,
        visualizerType: "memory"
      },
      {
        id: 40,
        title: "Creation of an Array",
        intro: "Declaring, instantiating, and initializing arrays.",
        explanation: "Syntax: `int[] nums = new int[5];` or shorthand: `int[] nums = {1, 2, 3, 4, 5};`. When instantiated, arrays get default values: 0 for numeric types, false for boolean, and null for objects.",
        gotchas: ["Accessing an index >= array length throws a runtime `ArrayIndexOutOfBoundsException`."],
        interviewQuestions: [
          {
            question: "Are arrays objects in Java?",
            answer: "Yes. In Java, arrays are dynamically created objects and inherit from Object class. They have an instance field 'length'."
          }
        ],
        code: `int[] nums = {10, 20, 30};\nSystem.out.println(nums.length); // Prints 3`,
        visualizerType: "memory"
      },
      {
        id: 41,
        title: "Multidimensional Array",
        intro: "Arrays of arrays. Matrix representation.",
        explanation: "Java does not support true multidimensional arrays. Instead, it supports arrays of arrays. Syntactically: `int[][] matrix = new int[3][4];` representing 3 rows and 4 columns.",
        gotchas: ["Each row of a multidimensional array can live in a different memory location on the heap because they are separate array objects."],
        interviewQuestions: [
          {
            question: "How is a 2D array representation different in Java compared to C++?",
            answer: "In C++, a 2D array is a single contiguous block of memory. In Java, it's an array object containing references to other array objects in different heap locations."
          }
        ],
        code: `int[][] grid = {\n    {1, 2, 3},\n    {4, 5, 6}\n};`,
        visualizerType: "memory"
      },
      {
        id: 42,
        title: "Jagged and 3D Arrays",
        intro: "Row lengths don't have to match. Let's make asymmetrical matrices.",
        explanation: "Since multidimensional arrays are arrays of arrays, each row can have a different length. This is called a Jagged array. Syntax: define row size only, then instantiate each row manually.",
        gotchas: ["Accessing columns of an uninitialized row causes NullPointerException because the row reference is default null!"],
        interviewQuestions: [
          {
            question: "How do you declare a jagged array with 3 rows of variable sizes?",
            answer: "Declare int[][] arr = new int[3][]; and then instantiate individual rows: arr[0] = new int[2]; arr[1] = new int[5]; arr[2] = new int[3];"
          }
        ],
        code: `int[][] jagged = new int[2][];\njagged[0] = new int[3]; // Row 0 has 3 columns\njagged[1] = new int[5]; // Row 1 has 5 columns`,
        visualizerType: "memory"
      },
      {
        id: 43,
        title: "Drawbacks of Arrays",
        intro: "Why arrays are raw and rarely used in enterprise logic without abstractions.",
        explanation: "1. Fixed size: cannot resize.\n2. Homogeneous: stores only one data type.\n3. Contiguous memory requirement: hard to allocate large arrays on fragmented heaps.\n4. No built-in CRUD operations.",
        gotchas: ["If you need dynamic inserts or search utilities, write wrapper code or use Collection API (ArrayList)."],
        interviewQuestions: [
          {
            question: "Why is inserting an element in the middle of an array expensive?",
            answer: "Because arrays are contiguous, you must shift all subsequent elements to the right to clear the slot, which takes O(N) linear time."
          }
        ],
        code: `// Need: Dynamic list. Solution: ArrayList!`,
        visualizerType: "memory"
      },
      {
        id: 44,
        title: "Array of Objects",
        intro: "Holding complex models in arrays.",
        explanation: "You can create an array of class objects. Syntactically: `Student[] students = new Student[5];`. This array does NOT contain actual Student objects. It contains 5 null references.",
        gotchas: ["Calling methods on elements of a newly created Object array causes NullPointerException! You must instantiate each element object first."],
        interviewQuestions: [
          {
            question: "What does 'Student[] students = new Student[3]' do in memory?",
            answer: "It creates an array object on the heap containing 3 reference slots initialized to null. No Student object is instantiated yet."
          }
        ],
        code: `Student[] arr = new Student[2];\n// arr[0].study(); // NullPointerException!\narr[0] = new Student(); // Instantiate\narr[0].name = "Joy"; // OK`,
        visualizerType: "memory"
      },
      {
        id: 45,
        title: "Enhanced For Loop",
        intro: "Read-only syntax. Cleaner loops without counter boilerplate.",
        explanation: "Also called For-Each loop. Syntactically: `for(Type val : array/collection) { ... }`. Automatically iterates from index 0 to length-1.",
        gotchas: ["For-Each loop is read-only. You cannot use it to modify array elements or get the index value."],
        interviewQuestions: [
          {
            question: "Can we use an Enhanced For loop to delete elements from an ArrayList?",
            answer: "No, iterating over a collection and modifying it inside an enhanced loop throws a ConcurrentModificationException. Use an Iterator or removeIf instead."
          }
        ],
        code: `int[] numbers = {1, 2, 3};\nfor (int val : numbers) {\n    System.out.println(val);\n}`,
        visualizerType: "jvm"
      },
      {
        id: 46,
        title: "What Is a String?",
        intro: "Sequence of characters. The most important object in Java.",
        explanation: "In Java, a String is a class object, not a primitive char array. String objects are stored in a special segment of heap memory called the 'String Constant Pool' (SCP) to conserve memory.",
        gotchas: ["String literals are pooled. Creating strings with 'new' forces a new object creation in the general heap, bypassing the pool. Avoid 'new String()'."],
        interviewQuestions: [
          {
            question: "What is the String Constant Pool (SCP)?",
            answer: "SCP is a specialized area in JVM heap memory. When a String literal is created, the JVM check if the literal exists in the pool. If yes, it returns the reference; if not, it creates a new one in the pool."
          }
        ],
        code: `String s1 = "Java"; // SCP reference\nString s2 = "Java"; // Points to the same object!\nSystem.out.println(s1 == s2); // true (same reference)`,
        visualizerType: "string-pool"
      },
      {
        id: 47,
        title: "Mutable vs. Immutable Strings",
        intro: "Why modifying a String creates a new object and floods memory.",
        explanation: "Java Strings are immutable (unchangeable). Once created, their contents cannot be modified. If you concatenate strings, e.g. `s1 += \" World\"`, Java creates a brand new String object, leaving the old one orphaned.",
        gotchas: ["Concatenating strings inside loops creates thousands of junk objects in the heap, causing Garbage Collection stalls. Use StringBuilder instead!"],
        interviewQuestions: [
          {
            question: "Why are String objects immutable in Java?",
            answer: "1. Security: database connections, URLs, paths are passed as strings. 2. Thread Safety: multiple threads can share same string safely. 3. String Pool efficiency."
          }
        ],
        code: `String s = "Hello";\ns.concat(" World"); // concat returns new String!\nSystem.out.println(s); // prints "Hello" (unchanged!)`,
        visualizerType: "string-pool"
      },
      {
        id: 48,
        title: "StringBuffer and StringBuilder",
        intro: "The cure for String immutability performance hits.",
        explanation: "These classes provide mutable sequence of characters. They allow updates, inserts, and deletes without generating junk objects. StringBuilder is fast but not thread-safe. StringBuffer is synchronized and thread-safe.",
        gotchas: ["Always use StringBuilder for local variables or single-threaded operations. Synchronizing methods in StringBuffer causes overhead."],
        interviewQuestions: [
          {
            question: "Differentiate between String, StringBuffer, and StringBuilder.",
            answer: "String is immutable. StringBuffer is mutable and thread-safe (synchronized, slower). StringBuilder is mutable, non-thread-safe (unsynchronized, faster)."
          }
        ],
        code: `StringBuilder sb = new StringBuilder("Hello");\nfor(int i=0; i<5; i++) {\n    sb.append("!"); // Modifies the same object in place!\n}`,
        visualizerType: "string-pool"
      }
    ]
  },
  {
    id: 6,
    title: "Encapsulation & Construction",
    range: "49-58",
    concepts: [
      {
        id: 49,
        title: "Encapsulation",
        intro: "Don't let outsiders mess with your object's internal organs directly.",
        explanation: "Encapsulation is the practice of hiding an object's internal state (fields) and requiring all interaction to occur through public methods (getters and setters).",
        gotchas: ["Declaring variables public destroys encapsulation. Any class can alter variables without validation, leading to bugs."],
        interviewQuestions: [
          {
            question: "How does encapsulation promote data validation?",
            answer: "By making fields private and restricting access to setter methods, we can write validation logic (e.g. checking age is positive) before updating values."
          }
        ],
        code: `class BankAccount {\n    private double balance; // Hidden\n    public void deposit(double amt) {\n        if(amt > 0) balance += amt; // Guarded!\n    }\n}`,
        visualizerType: "memory"
      },
      {
        id: 50,
        title: "Getters and Setters",
        intro: "The standard gatekeepers of private variables.",
        explanation: "Getters retrieve the value of a private variable. Setters update the value of a private variable. By naming them `getX()` and `setX(type)`, you follow the JavaBeans standard.",
        gotchas: ["Returning direct references to mutable objects (like Date or arrays) in getters compromises encapsulation. Return defensive copies instead!"],
        interviewQuestions: [
          {
            question: "What is a defensive copy in getters?",
            answer: "If a getter returns a reference to a mutable internal object (e.g., an array), external code can change its contents. Returning a copy prevents this vulnerability."
          }
        ],
        code: `private String name;\npublic String getName() {\n    return name; \n}\npublic void setName(String name) {\n    this.name = name;\n}`,
        visualizerType: "memory"
      },
      {
        id: 51,
        title: "this Keyword",
        intro: "A reference to the current object executing the code.",
        explanation: "The `this` keyword is a reference variable that points to the current object. It is commonly used to resolve variable shadowing (when instance fields and method parameters have the same name).",
        gotchas: ["You cannot use `this` inside static methods because static methods run without any object instance context!"],
        interviewQuestions: [
          {
            question: "Why can't 'this' be used in static context?",
            answer: "Because static methods belong to the class rather than an object instance, and 'this' refers to the current object instance, which does not exist in a static call."
          }
        ],
        code: `class Student {\n    private String name;\n    public void setName(String name) {\n        this.name = name; // 'this.name' is field, 'name' is parameter\n    }\n}`,
        visualizerType: "memory"
      },
      {
        id: 52,
        title: "Constructor",
        intro: "The initialization ritual of an object.",
        explanation: "A constructor is a special block of code that is executed when an object is instantiated with `new`. It has no return type and its name matches the class name exactly.",
        gotchas: ["If you write a return type (even void) on a constructor, Java treats it as a standard method and will NOT call it during instantiation!"],
        interviewQuestions: [
          {
            question: "What is the primary purpose of a constructor?",
            answer: "To initialize the state (instance variables) of the object being created, ensuring the object starts in a valid state."
          }
        ],
        code: `class Laptop {\n    Laptop() {\n        System.out.println("Laptop object created!");\n    }\n}`,
        visualizerType: "memory"
      },
      {
        id: 53,
        title: "Default vs. Parameterized Constructor",
        intro: "Constructor overloading. Providing multiple initialization entryways.",
        explanation: "Default (no-argument) constructor is provided by the Java compiler ONLY if you write no constructors. Parameterized constructor allows passing values to initialize fields during instantiation.",
        gotchas: ["Once you write a parameterized constructor, the compiler will NOT generate the default no-arg constructor! Calling `new MyClass()` will throw compilation errors unless you write it manually."],
        interviewQuestions: [
          {
            question: "What happens if we define a parameterized constructor but forget to write a default constructor?",
            answer: "Any instantiation call without parameters, like 'new MyClass()', will fail to compile. You must explicitly define the no-argument constructor."
          }
        ],
        code: `class Car {\n    String model;\n    Car() {} // Default written manually\n    Car(String m) { this.model = m; } // Parameterized\n}`,
        visualizerType: "memory"
      },
      {
        id: 54,
        title: "Static Variable",
        intro: "A variable shared by all objects. It belongs to the class.",
        explanation: "Declared with the `static` keyword. Only one copy of a static variable is created and loaded into the Method area of JVM, shared by all objects of that class.",
        gotchas: ["Modifying a static variable via one object changes the value for all other objects since they point to the exact same reference copy."],
        interviewQuestions: [
          {
            question: "Where are static variables stored in Java 8 and above?",
            answer: "In Java 8+, static variables are stored in the JVM Heap area as part of the Class object configuration, not in PermGen (which was replaced by Metaspace)."
          }
        ],
        code: `class Counter {\n    static int count = 0; // shared\n    Counter() { count++; }\n}`,
        visualizerType: "memory"
      },
      {
        id: 55,
        title: "Static Method",
        intro: "Utility methods that run without needing an object instance.",
        explanation: "Declared with `static`. Can be invoked directly using class name: `ClassName.methodName()`. They can access static variables but cannot access instance variables or call non-static methods.",
        gotchas: ["Cannot call `super` or `this` inside static methods. Overriding static methods is not possible (called method hiding instead)."],
        interviewQuestions: [
          {
            question: "Can we override static methods in Java?",
            answer: "No. Static methods are resolved at compile-time (static binding) rather than runtime (dynamic binding). Redefining static method in subclass hides the superclass method; it is not dynamic overriding."
          }
        ],
        code: `class MathUtils {\n    public static int square(int x) { return x * x; }\n}\n// usage:\nint sq = MathUtils.square(4);`,
        visualizerType: "jvm"
      },
      {
        id: 56,
        title: "Static Block",
        intro: "Initialization chamber for static variables.",
        explanation: "A block of code prefixed with `static`. Executed only once when the JVM first loads the class into memory (ClassLoader). Runs before constructor and main method.",
        gotchas: ["If class loading fails inside static block (throws exception), class initialization fails with `NoClassDefFoundError` or `ExceptionInInitializerError`."],
        interviewQuestions: [
          {
            question: "When are static blocks executed?",
            answer: "They execute once when the JVM loads the class. It happens when the class is first referenced in code, either by instantiating or accessing a static member."
          }
        ],
        code: `class DBConnection {\n    static {\n        System.out.println("Static block: Driver loaded!");\n    }\n}`,
        visualizerType: "jvm"
      },
      {
        id: 57,
        title: "Naming Conventions",
        intro: "Writing code that doesn't make your teammates cringe.",
        explanation: "Follow Java naming standards: Classes in PascalCase (`StudentCourse`), methods and variables in camelCase (`studentAge`), constants in UPPER_CASE (`MAX_SPEED`), packages in lowercase (`com.telusuko`).",
        gotchas: ["Violating naming conventions won't cause compile errors, but it reduces code readability and will fail code quality gates in 50+ LPA enterprise roles."],
        interviewQuestions: [
          {
            question: "Why should package names be in lowercase and reverse domain order?",
            answer: "Reverse domain format (e.g., com.google.search) ensures uniqueness globally. Lowercase names avoid conflicts with class names on case-insensitive file systems."
          }
        ],
        code: `public class MySystemConfig { // PascalCase\n    public static final int MAX_COUNT = 100; // UPPER_CASE\n    private String dbUrl; // camelCase\n}`,
        visualizerType: "jvm"
      },
      {
        id: 58,
        title: "Anonymous Object",
        intro: "Use once and throw away. Objects without names.",
        explanation: "Created with `new MyClass()`, but not assigned to any reference variable. Useful when you only need to call a single method on a newly created object.",
        gotchas: ["Since there is no reference variable pointing to the object, it becomes eligible for Garbage Collection immediately after the line finishes execution."],
        interviewQuestions: [
          {
            question: "What is an anonymous object and when should it be used?",
            answer: "It is an object created without a reference reference variable. Use it for one-time operations (e.g., passing a temporary listener or showing a dialog)."
          }
        ],
        code: `new Calculator().add(5, 10); // created, used, eligible for GC!`,
        visualizerType: "memory"
      }
    ]
  },
  {
    id: 7,
    title: "Inheritance & Polymorphism",
    range: "59-72",
    concepts: [
      {
        id: 59,
        title: "Need for Inheritance",
        intro: "Don't copy-paste behaviors. Reuse logic to write DRY code.",
        explanation: "Imagine writing code for a `Manager` and a `Developer`. Both share fields like `name`, `id`, and `salary`. Instead of rewriting these fields, we create a parent class `Employee` to share common features.",
        gotchas: ["Using inheritance just to reuse variables can couple classes too tightly. Prefer composition (HAS-A) over inheritance (IS-A) where appropriate."],
        interviewQuestions: [
          {
            question: "Why is composition often preferred over inheritance?",
            answer: "Inheritance creates a tight compile-time coupling (IS-A). Composition (HAS-A) maintains encapsulation, makes code flexible, and allows dynamic swapping of dependencies at runtime."
          }
        ],
        code: `// Inheritance creates: class Developer extends Employee { ... }`,
        visualizerType: "dispatch"
      },
      {
        id: 60,
        title: "What Is Inheritance?",
        intro: "The IS-A relationship mechanism.",
        explanation: "One class (subclass/child) inherits properties and behaviors of another class (superclass/parent) using the `extends` keyword. Reusability at its peak.",
        gotchas: ["Private members of the superclass are inherited but cannot be accessed directly by child class methods. Use getters/setters or protected access modifier."],
        interviewQuestions: [
          {
            question: "Does subclass inherit private fields of superclass?",
            answer: "Yes, they are part of the subclass memory layout, but they cannot be accessed directly by subclass methods. Access must occur through inherited public/protected methods."
          }
        ],
        code: `class Animal {\n    void eat() { System.out.println("Eating..."); }\n}\nclass Cat extends Animal {\n    void meow() { System.out.println("Meow!"); }\n}`,
        visualizerType: "dispatch"
      },
      {
        id: 61,
        title: "Single and Multilevel Inheritance",
        intro: "Family chains. Dog inherits Animal (Single). Labrador inherits Dog (Multilevel).",
        explanation: "Single: one subclass extends one superclass. Multilevel: a subclass extends a class which itself is extending a superclass. Inheritance depth should not be too deep for readability.",
        gotchas: ["Deep multilevel inheritance chains (e.g. 5+ levels) make debugging and tracking bugs extremely hard due to overridden behaviors."],
        interviewQuestions: [
          {
            question: "What is the maximum depth of inheritance in Java?",
            answer: "There is no theoretical limit set by the JVM spec, but practical API design limits inheritance depth to 3-4 levels to prevent tight coupling."
          }
        ],
        code: `class A {}\nclass B extends A {} // Single\nclass C extends B {} // Multilevel`,
        visualizerType: "dispatch"
      },
      {
        id: 62,
        title: "Multiple Inheritance",
        intro: "The Diamond Problem. Why Java banned multiple inheritance with classes.",
        explanation: "If Class C extends Class A and Class B, and both A and B define a method `display()`, which one should C execute? This ambiguity is called the Diamond Problem. Java prevents this by allowing a class to extend only one class.",
        gotchas: ["Java does NOT support multiple class inheritance. However, you can achieve multiple interface inheritance because interfaces don't contain conflicting state fields."],
        interviewQuestions: [
          {
            question: "How does Java solve the Diamond Problem?",
            answer: "Java forbids a class from extending multiple classes. It allows implementing multiple interfaces. In case of conflicting default methods in interfaces, the compiler forces the programmer to override and resolve the conflict manually."
          }
        ],
        code: `// class Child extends Parent1, Parent2 // COMPILE ERROR!\n// Interface implementation provides safe alternative.`,
        visualizerType: "dispatch"
      },
      {
        id: 63,
        title: "this and super Methods",
        intro: "Constructor chaining. Invoking sibling and parent constructors.",
        explanation: "`super()` calls the constructor of the parent class. `this()` calls another constructor within the same class. Every subclass constructor implicitly calls `super()` as its very first statement.",
        gotchas: ["`super()` or `this()` must be the absolute FIRST line in a constructor. You cannot call both in the same constructor!"],
        interviewQuestions: [
          {
            question: "What happens if a parent class has no default (no-arg) constructor, and subclass constructor doesn't call super(args)?",
            answer: "Compilation fails. The compiler tries to inject 'super()' (default call) automatically, which doesn't exist in parent class. Subclass must explicitly call 'super(args)'."
          }
        ],
        code: `class Parent {\n    Parent(int x) {}\n}\nclass Child extends Parent {\n    Child() {\n        super(10); // Required! Compiler error if omitted.\n    }\n}`,
        visualizerType: "memory"
      },
      {
        id: 64,
        title: "Method Overriding",
        intro: "Redefining parent behavior in child. Runtime Polymorphism.",
        explanation: "Providing a specific implementation of a method in subclass that is already defined in superclass. Method name, parameter list, and return type must be exactly the same.",
        gotchas: ["Overriding methods cannot restrict access. If parent method is `public`, subclass overridden method must be `public`. Retricting it to `private` causes compile error."],
        interviewQuestions: [
          {
            question: "What is the purpose of @Override annotation?",
            answer: "It tells compiler to verify that the method is indeed overriding a superclass method. If you make typo in name or parameters, the compiler throws error rather than treating it as a new method."
          }
        ],
        code: `class Shape {\n    void draw() { System.out.println("Draw shape"); }\n}\nclass Circle extends Shape {\n    @Override\n    void draw() { System.out.println("Draw circle"); } // Overridden!\n}`,
        visualizerType: "dispatch"
      },
      {
        id: 65,
        title: "Packages",
        intro: "Directory folders for organizing files and avoiding naming clashes.",
        explanation: "Packages group related classes. Keywords: `package com.mycompany;` at top of file, and `import package.ClassName;` to use classes from other packages. Standard package prefix is reverse domain name.",
        gotchas: ["If you compile a class inside a package, you must compile from root directory using `javac -d . ClassName.java` to generate package folder structure."],
        interviewQuestions: [
          {
            question: "What is java.lang package?",
            answer: "It is the default package imported automatically into every Java class. It contains core classes like String, Object, Math, System, Exception, etc."
          }
        ],
        code: `package com.telusuko.quiz;\nimport java.util.ArrayList; // Importing external utility`,
        visualizerType: "jvm"
      },
      {
        id: 66,
        title: "Access Modifiers",
        intro: "Security gates. private, default, protected, and public.",
        explanation: "1. private: visible inside class only.\n2. default (no modifier): visible inside package only.\n3. protected: visible inside package and to subclasses in different packages.\n4. public: visible everywhere.",
        gotchas: ["Classes cannot be marked private or protected (unless nested). Top-level classes can only be public or default."],
        interviewQuestions: [
          {
            question: "Compare protected access modifier with default (package-private).",
            answer: "Default is visible only to classes in the same package. Protected is visible in the same package, but also accessible by subclasses in different packages."
          }
        ],
        code: `public class AccessDemo {\n    private int secret = 42; // only this class\n    protected int shared = 100; // package & subclasses\n    public int open = 999; // everyone\n}`,
        visualizerType: "jvm"
      },
      {
        id: 67,
        title: "Polymorphism",
        intro: "One interface, many implementations.",
        explanation: "Greek: 'Poly' (Many) + 'Morph' (Form). Ability of an entity to take different forms. Types: Compile-time polymorphism (Method Overloading) and Runtime polymorphism (Method Overriding).",
        gotchas: ["Polymorphism only applies to instance methods! Variables (fields) are NOT polymorphic in Java. They are resolved statically based on reference type."],
        interviewQuestions: [
          {
            question: "Are instance fields overridden in subclasses?",
            answer: "No, fields are not polymorphic. If a subclass redefines a field, it hides the superclass field. Access is resolved using compile-time reference type."
          }
        ],
        code: `Parent obj = new Child();\nSystem.out.println(obj.name); // accesses parent's field (No polymorphism for fields!)\nobj.show(); // calls child's method (Polymorphism in action!)`,
        visualizerType: "dispatch"
      },
      {
        id: 68,
        title: "Dynamic Method Dispatch",
        intro: "The magic engine of Java interfaces and design patterns.",
        explanation: "When an overridden method is called through a superclass reference variable, Java resolves which method version to execute at runtime. Reference type checks what methods are callable; the actual object type determines which implementation executes.",
        gotchas: ["You cannot call child-specific methods using a parent reference variable without casting, even if the actual object is a child!"],
        interviewQuestions: [
          {
            question: "How does Dynamic Method Dispatch work under the hood?",
            answer: "JVM uses virtual method tables (vtables) allocated for each class. vtable points to the resolved bytecode locations of methods. Overridden methods overwrite index references in vtable."
          }
        ],
        code: `class Computer {\n    void powerOn() { System.out.println("Beep"); }\n}\nclass Mac extends Computer {\n    void powerOn() { System.out.println("Chime"); }\n}\nComputer comp = new Mac();\ncomp.powerOn(); // Prints: Chime (Dynamic dispatch!)`,
        visualizerType: "dispatch"
      },
      {
        id: 69,
        title: "final Keyword",
        intro: "Make variables constant, prevent overriding, and ban inheritance.",
        explanation: "`final` variable: value cannot be modified. `final` method: cannot be overridden by subclasses. `final` class: cannot be extended (e.g. String is a final class).",
        gotchas: ["Making an object reference `final` means the variable cannot point to another object. However, you can still modify the internal fields of the referenced object!"],
        interviewQuestions: [
          {
            question: "What is a blank final variable?",
            answer: "A final variable declared without an initial value. It must be initialized in the class constructor, otherwise compilation fails."
          }
        ],
        code: `final int val = 10;\n// val = 20; // ERROR!\n\nfinal Circle c = new Circle();\nc.radius = 5.0; // OK! (Object state can change)\n// c = new Circle(); // ERROR! (Reference constant)`,
        visualizerType: "memory"
      },
      {
        id: 70,
        title: "Object Class: equals(), toString(), hashCode()",
        intro: "The grandparent of all Java classes. The universal base class.",
        explanation: "Every class in Java extends java.lang.Object implicitly. It contains essential methods: `toString()` (string representation), `hashCode()` (integer bucket index), and `equals()` (compares content references).",
        gotchas: ["If you override `equals()`, you MUST override `hashCode()`! Otherwise, hash-based collections (HashMap, HashSet) will fail to locate your objects, leading to duplicate entries."],
        interviewQuestions: [
          {
            question: "Explain the contract between equals() and hashCode() methods.",
            answer: "If two objects are equal according to equals() method, they must return the same hashCode value. If hashCode values differ, the objects must not be equal."
          }
        ],
        code: `class User {\n    String id;\n    @Override\n    public boolean equals(Object obj) {\n        return (obj instanceof User) && ((User)obj).id.equals(this.id);\n    }\n    @Override\n    public int hashCode() {\n        return id.hashCode();\n    }\n}`,
        visualizerType: "jvm"
      },
      {
        id: 71,
        title: "Upcasting and Downcasting",
        intro: "Climbing up and down the class hierarchy ladder.",
        explanation: "Upcasting: cast subclass to superclass (e.g. `Animal a = new Dog();`). Safe, done implicitly. Downcasting: cast superclass back to subclass (e.g. `Dog d = (Dog) a;`). Unsafe, must be explicit.",
        gotchas: ["Downcasting to a type that the object is not (e.g. casting Cat to Dog) throws `ClassCastException` at runtime. Check with `instanceof` first!"],
        interviewQuestions: [
          {
            question: "What is ClassCastException and how do we prevent it?",
            answer: "It occurs when downcasting an object to a class of which it is not an instance. Prevent it by using the 'instanceof' check before explicit casting."
          }
        ],
        code: `Animal animal = new Dog();\nif (animal instanceof Dog) {\n    Dog d = (Dog) animal; // Safe Downcast\n}`,
        visualizerType: "memory"
      },
      {
        id: 72,
        title: "Wrapper Class",
        intro: "Wrapping primitives inside objects for the Collection framework.",
        explanation: "Java collections only store Objects, not primitives. Wrapper classes (Integer, Double, Character, etc.) wrap primitives into object formats. Auto-boxing (primitive to wrapper) and Auto-unboxing (wrapper to primitive) occur automatically.",
        gotchas: ["Comparing wrapper objects using == compares references! Integer objects cached between -128 and 127 match ==, but numbers outside this range return false!"],
        interviewQuestions: [
          {
            question: "Explain the Integer Cache mechanism in Java.",
            answer: "JVM caches Integer objects with values from -128 to 127. If you create Integer objects within this range, they share the same reference, making == return true."
          }
        ],
        code: `Integer a = 127, b = 127;\nSystem.out.println(a == b); // true (cached!)\n\nInteger c = 128, d = 128;\nSystem.out.println(c == d); // false (different objects in heap!)\nSystem.out.println(c.equals(d)); // true (value compared)`,
        visualizerType: "memory"
      }
    ]
  },
  {
    id: 8,
    title: "Quiz Application Mini-Project",
    range: "73-77",
    concepts: [
      {
        id: 73,
        title: "Project 1 - Introduction",
        intro: "Applying OOP basics. Let's build a Quiz Game to test skills.",
        explanation: "In this mini-project, we design a console quiz system. We define a question object model and write helper service logic to load questions, display them to user, fetch console input, and calculate scores.",
        gotchas: ["Don't put display logic, scoring logic, and data arrays inside the same class. Split them into Question (Data Model) and QuestionService (Business Logic)."],
        interviewQuestions: [
          {
            question: "How does MVC architecture map to a simple CLI application?",
            answer: "The Question class represents Model. QuestionService is the Controller managing questions array. The CLI prompt (Scanner input) represents the View layer."
          }
        ],
        code: `// We will create Question.java and QuestionService.java.`,
        visualizerType: "jvm"
      },
      {
        id: 74,
        title: "Project 1 - Question & QuestionService",
        intro: "Designing the blueprint for questions.",
        explanation: "The `Question` class encapsulates: id, questionText, four options (opt1, opt2, opt3, opt4), and actualAnswer. Fields are private with getters/setters.",
        gotchas: ["Option choices should be kept clean, e.g. using arrays or numbered strings instead of messy variables where possible."],
        interviewQuestions: [
          {
            question: "Why should we use encapsulation for data transfer objects (DTO) like Question class?",
            answer: "It secures data integrity, prevents external classes from modifying the question texts or answers directly, and maintains readability."
          }
        ],
        code: `class Question {\n    private int id;\n    private String questionText;\n    private String opt1, opt2, opt3, opt4;\n    private String answer;\n    // getters, setters, constructors...\n}`,
        visualizerType: "memory"
      },
      {
        id: 75,
        title: "Project 1 - Hard Coded Questions",
        intro: "Loading questions into memory array.",
        explanation: "In the constructor of `QuestionService`, we initialize an array of `Question` objects, filling them with core Java questions (e.g. 'Size of double?', 'Default value of reference?').",
        gotchas: ["Using hardcoded arrays has limits. In real apps, we retrieve questions dynamically using JDBC from a MySQL database."],
        interviewQuestions: [
          {
            question: "What is the memory impact of loading many large objects into a static or service array?",
            answer: "They stay in memory for the lifetime of the service, which could lead to high memory consumption if data grows. Dynamic pagination is preferred."
          }
        ],
        code: `class QuestionService {\n    Question[] questions = new Question[5];\n    public QuestionService() {\n        questions[0] = new Question(1, "Size of int?", "2", "4", "8", "1", "4");\n    }\n}`,
        visualizerType: "memory"
      },
      {
        id: 76,
        title: "Project 1 - Play Quiz",
        intro: "Iterating questions and fetching user responses.",
        explanation: "We loop through the `questions` array. For each question, we print options to screen, use `Scanner` to receive input, and store the user's selected choice in an answers array.",
        gotchas: ["When using Scanner, calling `nextInt()` doesn't consume the newline character. Always execute `nextLine()` afterwards to avoid skipping prompts!"],
        interviewQuestions: [
          {
            question: "Why does Scanner.nextInt() skip the next line scan?",
            answer: "nextInt() only reads the integer token. The newline character '\\n' remains in the input buffer. When nextLine() runs, it reads that newline and exits immediately, skipping prompt."
          }
        ],
        code: `public void playQuiz() {\n    Scanner sc = new Scanner(System.in);\n    for(Question q : questions) {\n        System.out.println(q.getQuestionText());\n        String response = sc.nextLine(); // safe reading\n    }\n}`,
        visualizerType: "jvm"
      },
      {
        id: 77,
        title: "Project 1 - Calculate Score",
        intro: "Tallying answers and outputting performance results.",
        explanation: "Compare the user answers array against the `answer` field of each question in the questions array. For every match, increment a `score` counter. Print final result.",
        gotchas: ["Use `.equalsIgnoreCase()` when comparing text inputs to ignore cases (like 'A' and 'a')."],
        interviewQuestions: [
          {
            question: "What is the time complexity of scoring the quiz?",
            answer: "O(N) linear time, where N is the number of questions, as we iterate once through the questions array."
          }
        ],
        code: `int score = 0;\nfor(int i=0; i<questions.length; i++) {\n    if(userAnswers[i].equalsIgnoreCase(questions[i].getAnswer())) {\n        score++;\n    }\n}\nSystem.out.println("Final Score: " + score);`,
        visualizerType: "jvm"
      }
    ]
  },
  {
    id: 9,
    title: "Advanced OOP: Abstract, Interfaces & Lambdas",
    range: "78-92",
    concepts: [
      {
        id: 78,
        title: "Abstract Keyword",
        intro: "Incomplete classes. Enforcing rules for subclasses.",
        explanation: "An `abstract` class cannot be instantiated. It can contain abstract methods (methods without a body) which MUST be implemented by subclasses. It acts as a templates.",
        gotchas: ["An abstract class can contain constructors! They are called by subclasses using `super()` during instantiation."],
        interviewQuestions: [
          {
            question: "Can an abstract class be declared final?",
            answer: "No. Abstract classes rely on inheritance to be subclassed and implemented. Final forbids inheritance. This is a logical contradiction and fails compilation."
          }
        ],
        code: `abstract class Vehicle {\n    abstract void accelerate();\n    void stop() { System.out.println("Stopped"); }\n}`,
        visualizerType: "dispatch"
      },
      {
        id: 79,
        title: "Inner Class",
        intro: "Classes inside classes. Grouping classes logically.",
        explanation: "Java allows you to nest classes. Non-static nested class is called an Inner Class. It has access to all fields (including private) of the outer class.",
        gotchas: ["To instantiate a non-static inner class, you must first create an instance of the outer class: `Outer.Inner in = new Outer().new Inner();`."],
        interviewQuestions: [
          {
            question: "What is the difference between inner class and static nested class?",
            answer: "Inner class has an implicit reference to the outer class instance, occupying extra memory. Static nested class doesn't reference outer instance and behaves like a top-level class."
          }
        ],
        code: `class Outer {\n    class Inner {\n        void msg() { System.out.println("Inner class!"); }\n    }\n}`,
        visualizerType: "memory"
      },
      {
        id: 80,
        title: "Anonymous Inner Class",
        intro: "One-shot inline class implementation.",
        explanation: "A nested class declared without a name. It allows declaring and instantiating a class simultaneously. Ideal for overriding class methods or interface implementation on the fly.",
        gotchas: ["Anonymous inner classes cannot define constructors since they have no name. They can only access final or effectively final local variables of the outer scope."],
        interviewQuestions: [
          {
            question: "Why can anonymous inner classes only access 'final' or 'effectively final' local variables?",
            answer: "Because the inner class runs in a copy of the variable on the heap. If variables could change, the outer and inner copies would go out of sync. Java prevents this mismatch."
          }
        ],
        code: `Animal dog = new Animal() {\n    @Override\n    void makeNoise() { System.out.println("Woof"); }\n}; // Ends with semicolon!`,
        visualizerType: "memory"
      },
      {
        id: 81,
        title: "Abstract and Anonymous Inner Class",
        intro: "Creating inline instances of abstract definitions.",
        explanation: "You can implement abstract classes directly on the fly using Anonymous Inner Classes. This creates a subclass and instantiates it without writing a separate class file.",
        gotchas: ["Avoid writing complex logic inside anonymous classes. It clutters code readability. Use Lambda expressions instead if the abstract class has a single method."],
        interviewQuestions: [
          {
            question: "Does anonymous inner class compile to a separate file?",
            answer: "Yes, the compiler generates a class file with name 'OuterClass$1.class', where '1' is the anonymous index."
          }
        ],
        code: `abstract class Writer {\n    abstract void write();\n}\nWriter w = new Writer() {\n    void write() { System.out.println("Writing..."); }\n};`,
        visualizerType: "memory"
      },
      {
        id: 82,
        title: "What Is an Interface?",
        intro: "The ultimate API contract. A pure design blueprint.",
        explanation: "An interface is a collection of abstract methods. It specifies WHAT a class should do, but not HOW. All methods are implicitly `public abstract` (before Java 8). A class implements interfaces using `implements`.",
        gotchas: ["Interface variables are implicitly `public static final`. They are constants and cannot be reassigned."],
        interviewQuestions: [
          {
            question: "Can an interface have concrete methods?",
            answer: "Yes. Since Java 8, interfaces can have 'default' and 'static' methods. Since Java 9, they can also have 'private' methods to reuse logic."
          }
        ],
        code: `interface Animal {\n    void speak(); // public abstract\n    int LEGS = 4; // public static final\n}`,
        visualizerType: "dispatch"
      },
      {
        id: 83,
        title: "More on Interfaces",
        intro: "Multiple interfaces, inheritance between interfaces.",
        explanation: "Unlike classes, a class can implement multiple interfaces (`class A implements B, C`). Furthermore, an interface can extend another interface (`interface X extends Y`).",
        gotchas: ["If a class implements two interfaces that declare duplicate default methods, compilation fails due to conflict. Subclass must override and resolve manually."],
        interviewQuestions: [
          {
            question: "How do you call a specific interface default method in case of override conflict?",
            answer: "Use InterfaceName.super.methodName(). For example, 'ParentInterface.super.show();' inside the overriding method."
          }
        ],
        code: `interface Walkable {}\ninterface Runnable extends Walkable {}\nclass Athlete implements Walkable, Runnable {}`,
        visualizerType: "dispatch"
      },
      {
        id: 84,
        title: "Need for an Interface",
        intro: "Loose coupling. Designing plug-and-play architectures.",
        explanation: "Interfaces allow you to program to an abstraction, not an implementation. E.g., if code depends on `List` interface, you can swap `ArrayList` with `LinkedList` without breaking the application.",
        gotchas: ["Over-engineering: creating an interface for every single class is an anti-pattern. Create interfaces when you expect multiple implementations."],
        interviewQuestions: [
          {
            question: "How do interfaces support loose coupling in frameworks like Spring?",
            answer: "By injecting interface dependencies. At runtime, Spring injects any concrete implementation class, making testing easy (using Mock implementations)."
          }
        ],
        code: `// Loose coupling:\nList<String> list = new ArrayList<>(); // easily switchable to LinkedList`,
        visualizerType: "dispatch"
      },
      {
        id: 85,
        title: "What Is an Enum?",
        intro: "Typesafe enumerations. Restricting variables to fixed options.",
        explanation: "An Enum (enumeration) is a special class that represents a group of constants (like directions: EAST, WEST, NORTH, SOUTH). Restricts assignment to defined constants.",
        gotchas: ["Don't use integers or raw strings to represent options (e.g. status = 1). It is error-prone. Use Enums instead for compile-time safety."],
        interviewQuestions: [
          {
            question: "Are Enums classes in Java?",
            answer: "Yes, Enums compile to classes extending java.lang.Enum. They can have fields, constructors, and methods, and can implement interfaces."
          }
        ],
        code: `enum Status {\n    PENDING, RUNNING, COMPLETED;\n}`,
        visualizerType: "jvm"
      },
      {
        id: 86,
        title: "Enum with if and switch",
        intro: "Clean conditional checks on constants.",
        explanation: "Enums integrate with switch and if-else statements. Using Enums in switch makes code readable and compile-safe.",
        gotchas: ["When using Enums in switch cases, do NOT prefix cases with the Enum name! E.g. write 'case PENDING:', not 'case Status.PENDING:'."],
        interviewQuestions: [
          {
            question: "Can we use relational operators (==) to compare Enums?",
            answer: "Yes, Enums are singletons. == is safe and preferred over .equals() because it avoids NullPointerException if one variable is null."
          }
        ],
        code: `Status s = Status.PENDING;\nswitch(s) {\n    case PENDING -> System.out.println("Wait...");\n    case RUNNING -> System.out.println("Processing...");\n}`,
        visualizerType: "jvm"
      },
      {
        id: 87,
        title: "Enum Class",
        intro: "Constructors and parameters in Enums.",
        explanation: "Enums can have instance fields and constructors. Enum constructors are implicitly `private`. You can pass parameters to constants (like defining salaries for roles).",
        gotchas: ["Cannot instantiate Enums using `new`! Enum constants are initialized when the class is loaded by JVM."],
        interviewQuestions: [
          {
            question: "Why are Enum constructors private?",
            answer: "To prevent external code from creating new Enum constants at runtime, maintaining the fixed set of singleton instances."
          }
        ],
        code: `enum Laptop {\n    MAC(2000), DELL(1200);\n    private int price;\n    Laptop(int p) { this.price = p; }\n    public int getPrice() { return price; }\n}`,
        visualizerType: "memory"
      },
      {
        id: 88,
        title: "What Is an Annotation?",
        intro: "Metadata: markers that give instructions to the compiler or framework.",
        explanation: "Annotations start with `@` (e.g., `@Override`, `@Deprecated`, `@SuppressWarnings`). They do not change code logic directly but provide clues to compilers, analyzers, or frameworks (like Spring/Hibernate) at runtime.",
        gotchas: ["Custom annotations require meta-annotations like `@Retention` and `@Target` to define when and where they can be read."],
        interviewQuestions: [
          {
            question: "What is the difference between source-level annotations and runtime-level annotations?",
            answer: "Source annotations (e.g., @Override) are discarded by compiler. Runtime annotations (e.g., @Autowired in Spring) are retained in .class files and parsed via Reflection at runtime."
          }
        ],
        code: `@Override\npublic String toString() {\n    return "MyObject";\n}`,
        visualizerType: "jvm"
      },
      {
        id: 89,
        title: "Types of Interface",
        intro: "Marker, Normal, and Functional interfaces.",
        explanation: "1. Normal: multiple methods.\n2. Marker: zero methods, used to mark capability (e.g. `Serializable`, `Cloneable`).\n3. Functional: exactly one abstract method (can have multiple defaults), supports Lambdas.",
        gotchas: ["If you add another abstract method to a functional interface, it is no longer functional and breaks any lambda expressions using it!"],
        interviewQuestions: [
          {
            question: "What is a Marker Interface?",
            answer: "An interface with no methods or constants. It delivers metadata instructions to the JVM or compiler (e.g., Serializable indicates JVM can write class state)."
          }
        ],
        code: `// Serializable has no methods. It is a marker interface!\nclass Data implements java.io.Serializable {}`,
        visualizerType: "jvm"
      },
      {
        id: 90,
        title: "Functional Interface",
        intro: "Single abstract method interfaces. The gateway to Lambdas.",
        explanation: "Marked optionally with `@FunctionalInterface`. This annotation makes compiler verify that the interface has exactly one abstract method.",
        gotchas: ["Default and static methods do NOT count against the single abstract method rule in functional interfaces."],
        interviewQuestions: [
          {
            question: "Why was FunctionalInterface introduced in Java 8?",
            answer: "To enable functional programming features by allowing single-method interfaces to be instantiated compactly using Lambda expressions."
          }
        ],
        code: `@FunctionalInterface\ninterface Printer {\n    void print(String msg);\n}`,
        visualizerType: "jvm"
      },
      {
        id: 91,
        title: "Lambda Expression",
        intro: "Say goodbye to verbose anonymous classes. Write functions in one line.",
        explanation: "Syntax: `(parameters) -> { body }`. Allows treating functionality as method argument, or passing code as data.",
        gotchas: ["Lambdas can only implement Functional Interfaces! You cannot use lambdas to instantiate classes with multiple abstract methods or abstract classes."],
        interviewQuestions: [
          {
            question: "Are lambdas just syntax sugar for anonymous inner classes?",
            answer: "No. Anonymous inner classes compile to separate classes ($1.class) and create object instances. Lambdas compile via 'invokedynamic' instruction, which is faster and avoids generating class files."
          }
        ],
        code: `Printer p = msg -> System.out.println("Printing: " + msg);\np.print("Hello Lambdas!");`,
        visualizerType: "jvm"
      },
      {
        id: 92,
        title: "Lambda Expression with Return",
        intro: "Returning values from compact functions.",
        explanation: "If lambda has a single expression, compiler auto-returns the result. If body uses curly braces, you must write `return` explicitly.",
        gotchas: ["Keep lambda bodies short (1-3 lines). If it grows larger, extract it to a helper method or use a standard class method reference."],
        interviewQuestions: [
          {
            question: "Translate this anonymous class to a lambda: Comparator<Integer> comp = new Comparator<Integer>() { public int compare(Integer a, Integer b) { return a.compareTo(b); } };",
            answer: "Comparator<Integer> comp = (a, b) -> a.compareTo(b);"
          }
        ],
        code: `// Single expression: auto-returns!\nMathOp add = (a, b) -> a + b;\n\n// Block body: requires 'return'!\nMathOp sub = (a, b) -> {\n    return a - b;\n};`,
        visualizerType: "jvm"
      }
    ]
  },
  {
    id: 10,
    title: "Exceptions, Input & Resources",
    range: "93-100",
    concepts: [
      {
        id: 93,
        title: "What Is an Exception?",
        intro: "An unwanted event that disrupts normal execution flow.",
        explanation: "Exceptions represent error events. If not handled, the program terminates abruptly. The JVM creates an exception object (holding stack trace) and throws it.",
        gotchas: ["Do not ignore exceptions! Empty catch blocks (`catch(Exception e) {}`) lead to silent failures, making debugging impossible."],
        interviewQuestions: [
          {
            question: "What happens if an exception is not caught anywhere in the call stack?",
            answer: "The JVM's default exception handler takes over, prints the stack trace to System.err, and terminates the active thread."
          }
        ],
        code: `// System.out.println(10/0); // Throws ArithmeticException at runtime!`,
        visualizerType: "exception"
      },
      {
        id: 94,
        title: "Exception Handling Using try-catch",
        intro: "Creating safety nets for risky operations.",
        explanation: "Surround risky code with `try`. If an exception occurs, execution jumps to the corresponding `catch` block where recovery or log actions are taken.",
        gotchas: ["Once an exception is thrown inside a try block, the remaining lines inside that try block are skipped. Execution transfers to the catch block immediately."],
        interviewQuestions: [
          {
            question: "Does the program terminate after a catch block completes?",
            answer: "No. The catch block intercepts the exception and handles it, allowing the program to continue executing subsequent statements normally."
          }
        ],
        code: `try {\n    int data = 50 / 0; // Throws error\n} catch (ArithmeticException e) {\n    System.out.println("Don't divide by zero!"); // Recovers\n}`,
        visualizerType: "exception"
      },
      {
        id: 95,
        title: "try with Multiple catch Blocks",
        intro: "Catching specific errors individually.",
        explanation: "A single try block can have multiple catch blocks to handle different exceptions (e.g. NullPointer, Arithmetic, IndexOutOfBounds).",
        gotchas: ["Order of catch blocks matters! Subclass exceptions must come BEFORE superclass exceptions. Catching `Exception` first will catch all errors, making specific catches unreachable (compilation fails)."],
        interviewQuestions: [
          {
            question: "How do you catch multiple unrelated exceptions in a single catch block?",
            answer: "Use multi-catch block: catch (ArithmeticException | NullPointerException e) { ... } (introduced in Java 7)."
          }
        ],
        code: `try {\n    int[] arr = new int[5];\n    arr[10] = 50;\n} catch (NullPointerException e) {\n    System.out.println("Null!");\n} catch (ArrayIndexOutOfBoundsException e) {\n    System.out.println("Index out of bound!"); // Runs this!\n} catch (Exception e) {\n    System.out.println("General error");\n}`,
        visualizerType: "exception"
      },
      {
        id: 96,
        title: "Exception Hierarchy",
        intro: "The ancestral tree of Java errors: Throwable, Error, Exception.",
        explanation: "At the top is `Throwable`. It splits into: 1. `Error` (severe system issues like OutOfMemoryError, which applications shouldn't catch). 2. `Exception` (further divided into Checked Exceptions, which compiler forces you to handle, and Unchecked RuntimeExceptions, which are caused by logical bugs).",
        gotchas: ["Checked exceptions (like IOException, SQLException) must be caught or declared, or code won't compile. Unchecked exceptions (like NullPointerException) do not have this requirement."],
        interviewQuestions: [
          {
            question: "Differentiate between Checked and Unchecked exceptions.",
            answer: "Checked exceptions inherit from Exception directly (excluding RuntimeException) and are verified at compile-time. Unchecked exceptions inherit from RuntimeException and occur at runtime."
          }
        ],
        code: `// Checked: FileNotFoundException (Forces try-catch)\n// Unchecked: ArithmeticException (No compile-time warning)`,
        visualizerType: "exception"
      },
      {
        id: 97,
        title: "throw Keyword",
        intro: "Throwing exceptions manually when rules are violated.",
        explanation: "Use `throw` to explicitly throw an exception object. Syntactically: `throw new MyException(\"Message\");`. Used to enforce business rules.",
        gotchas: ["Any code written directly after a `throw` statement inside a block is unreachable and triggers compilation error."],
        interviewQuestions: [
          {
            question: "What is the difference between 'throw' and 'throws'?",
            answer: "'throw' is a keyword used inside methods to manually instantiate and throw a specific exception object. 'throws' is a method signature keyword declaring that a method might propagate checked exceptions."
          }
        ],
        code: `int balance = 100;\nif (withdrawAmount > balance) {\n    throw new ArithmeticException("Insufficient Balance");\n}`,
        visualizerType: "exception"
      },
      {
        id: 98,
        title: "Custom Exception",
        intro: "Defining errors matching business domains (like InsufficientFundsException).",
        explanation: "Create your own exception class by extending `Exception` (for checked custom exceptions) or `RuntimeException` (for unchecked custom exceptions).",
        gotchas: ["Always provide constructors that accept String messages and pass them to `super(msg)` so that exception stack traces show clear descriptions."],
        interviewQuestions: [
          {
            question: "Why should we prefer Custom RuntimeExceptions in modern REST APIs?",
            answer: "Because Checked exceptions clutter code with try-catch blocks. Spring Controllers use Global Exception Handlers (@ControllerAdvice) to catch RuntimeExceptions and translate them to HTTP status codes cleanly."
          }
        ],
        code: `class HaterException extends RuntimeException {\n    HaterException(String msg) {\n        super(msg);\n    }\n}`,
        visualizerType: "exception"
      },
      {
        id: 99,
        title: "Ducking Exceptions Using throws",
        intro: "Passing the buck to the caller.",
        explanation: "If a method throws a checked exception, it can duck handling it by declaring it in its signature: `void myMethod() throws IOException`. The caller method must now handle it or duck it.",
        gotchas: ["Ducking exceptions all the way to `main` method causes the JVM default handler to print it and exit, failing the application. Handle exceptions at boundaries!"],
        interviewQuestions: [
          {
            question: "Can an overridden method declare more checked exceptions in its throws clause than the superclass method?",
            answer: "No. An overriding method in subclass cannot throw broader or new checked exceptions. It can only throw narrower exceptions or none at all (co-variant exception rule)."
          }
        ],
        code: `void readFile() throws java.io.FileNotFoundException {\n    java.io.FileReader fr = new java.io.FileReader("notes.txt");\n}`,
        visualizerType: "exception"
      },
      {
        id: 100,
        title: "User Input: BufferedReader & Scanner",
        intro: "Interacting with users via Console.",
        explanation: "Scanner: easy to parse tokens (int, words) using regex, slow. BufferedReader: buffered stream reader, reads fast, reads only strings (needs parsing, e.g. `Integer.parseInt()`).",
        gotchas: ["BufferedReader must be closed! It throws checked IOException, unlike Scanner which handles exceptions internally."],
        interviewQuestions: [
          {
            question: "Why is BufferedReader faster than Scanner?",
            answer: "BufferedReader has a larger default buffer (8KB) and simply reads characters sequentially. Scanner parses inputs using regular expressions, which consumes more CPU cycles."
          }
        ],
        code: `// Scanner:\njava.util.Scanner sc = new java.util.Scanner(System.in);\nString input = sc.nextLine();\n\n// BufferedReader:\njava.io.BufferedReader br = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));\nString val = br.readLine();`,
        visualizerType: "jvm"
      }
    ]
  }
];
