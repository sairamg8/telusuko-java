export default {
  id: 10,
  title: "Exceptions, Input & Resources",
  range: "93-101",
  concepts: [
    {
      id: 93,
      title: "What Is an Exception?",
      intro: "An unwanted event that disrupts normal execution flow.",
      explanation: "Exceptions represent error events. If not handled, the program terminates abruptly. The JVM creates an exception object (holding stack trace) and throws it.",
      gotchas: [
        "Do not ignore exceptions! Empty catch blocks (`catch(Exception e) {}`) lead to silent failures, making debugging impossible."
      ],
      interviewQuestions: [
        {
          question: "What happens if an exception is not caught anywhere in the call stack?",
          answer: "The JVM's default exception handler takes over, prints the stack trace to System.err, and terminates the active thread."
        }
      ],
      code: "// System.out.println(10/0); // Throws ArithmeticException at runtime!",
      visualizerType: "exception"
    },
    {
      id: 94,
      title: "Exception Handling Using try-catch",
      intro: "Creating safety nets for risky operations.",
      explanation: "Syntax: `try { risky code } catch (ExceptionType e) { handle }`\n1. When exception is thrown in try → remaining try lines SKIPPED, jumps to matching catch.\n2. After catch runs → program continues normally with next statement after try-catch.\n3. `finally { }` block runs ALWAYS (exception or not) — right place to release resources (DB connections, files).\n4. `try` can exist without catch if it has `finally` — but exception still propagates up.\n5. Never write an empty catch — `catch (Exception e) {}` silently swallows errors. At minimum: `e.printStackTrace()`.",
      gotchas: [
        "Once an exception is thrown inside a try block, the remaining lines inside that try block are skipped. Execution transfers to the catch block immediately.",
        "Never write an empty catch block — `catch (Exception e) {}`. This silences the error completely with no trace of what went wrong. At minimum, log the exception: `e.printStackTrace()` or use a logger.",
        "Catching `Exception` (the broad superclass) hides specific problems. A `FileNotFoundException` and a `NullPointerException` are very different failures — handle them separately so your response is appropriate to the actual cause."
      ],
      interviewQuestions: [
        {
          question: "Does the program terminate after a catch block completes?",
          answer: "No. The catch block intercepts the exception and handles it, allowing the program to continue executing subsequent statements normally."
        },
        {
          question: "What is the role of the finally block in try-catch-finally?",
          answer: "The finally block always executes after the try and catch blocks complete, regardless of whether an exception was thrown or caught. It is typically used to release resources (close files, database connections) that must be cleaned up in all cases. Since Java 7, try-with-resources is preferred for resource cleanup."
        },
        {
          question: "Can a try block exist without a catch block?",
          answer: "Yes, but only if it has a finally block. `try { } finally { }` is valid — it runs the code and always executes finally, but it does NOT handle the exception (it propagates up the call stack). For exception handling you need at least one catch or use try-with-resources."
        }
      ],
      code: `try {
    int data = 50 / 0; // Throws error
} catch (ArithmeticException e) {
    System.out.println("Don't divide by zero!"); // Recovers
}`,
      visualizerType: "exception"
    },
    {
      id: 95,
      title: "try with Multiple catch Blocks",
      intro: "Catching specific errors individually.",
      explanation: "One try block, multiple catch blocks — JVM checks top-to-bottom, first match wins:\n1. ORDER matters: specific (subclass) exceptions FIRST, general (superclass) LAST.\n2. Putting `catch (Exception e)` first makes all catches below it unreachable → compile error.\n3. Multi-catch (Java 7+): `catch (IOException | SQLException e)` — handle two unrelated exceptions identically.\n4. In multi-catch, `e` is implicitly final — cannot reassign it.\n5. Exception chaining: `throw new ServiceException(\"DB failed\", originalException)` — preserves root cause in stack trace for debugging.",
      gotchas: [
        "Order of catch blocks matters! Subclass exceptions must come BEFORE superclass exceptions. Catching `Exception` first will catch all errors, making specific catches unreachable (compilation fails).",
        "In a multi-catch block `catch (A | B e)`, the types A and B must NOT be in an inheritance relationship. Catching `catch (Exception | IOException e)` fails compilation because IOException is already a subtype of Exception.",
        "When catching exceptions, always log the original exception object (not just e.getMessage()). The full stack trace includes the line number, file, and call chain — getMessage() alone gives you almost nothing useful for debugging."
      ],
      interviewQuestions: [
        {
          question: "How do you catch multiple unrelated exceptions in a single catch block?",
          answer: "Use multi-catch block: catch (ArithmeticException | NullPointerException e) { ... } (introduced in Java 7)."
        },
        {
          question: "Why must more specific exceptions come before more general ones in a multi-catch chain?",
          answer: "The JVM matches the first catch block whose type is a supertype of the thrown exception. If Exception (the parent) comes first, it matches everything, making any specific catch blocks below it unreachable dead code. Java's compiler detects this and reports a compilation error: 'Exception is already caught'."
        },
        {
          question: "What is exception chaining and why is it important?",
          answer: "Exception chaining wraps a caught exception inside a new exception to add context while preserving the original cause: `throw new ServiceException(\"Payment failed\", e)`. The original exception `e` is stored as the cause and printed in the full stack trace. Without chaining, catching and re-throwing a new exception loses the root cause completely, making production debugging much harder."
        }
      ],
      code: `try {
    int[] arr = new int[5];
    arr[10] = 50;
} catch (NullPointerException e) {
    System.out.println("Null!");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Index out of bound!"); // Runs this!
} catch (Exception e) {
    System.out.println("General error");
}`,
      visualizerType: "exception"
    },
    {
      id: 96,
      title: "Exception Hierarchy",
      intro: "The ancestral tree of Java errors: Throwable, Error, Exception.",
      explanation: "At the top is `Throwable`. It splits into: 1. `Error` (severe system issues like OutOfMemoryError, which applications shouldn't catch). 2. `Exception` (further divided into Checked Exceptions, which compiler forces you to handle, and Unchecked RuntimeExceptions, which are caused by logical bugs).",
      gotchas: [
        "Checked exceptions (like IOException, SQLException) must be caught or declared, or code won't compile. Unchecked exceptions (like NullPointerException) do not have this requirement."
      ],
      interviewQuestions: [
        {
          question: "Differentiate between Checked and Unchecked exceptions.",
          answer: "Checked exceptions inherit from Exception directly (excluding RuntimeException) and are verified at compile-time. Unchecked exceptions inherit from RuntimeException and occur at runtime."
        }
      ],
      code: `// Checked: FileNotFoundException (Forces try-catch)
// Unchecked: ArithmeticException (No compile-time warning)`,
      visualizerType: "exception"
    },
    {
      id: 97,
      title: "throw Keyword",
      intro: "Throwing exceptions manually when rules are violated.",
      explanation: "Syntax: `throw new SomeException(\"message\");`\n1. `throw` manually triggers an exception object — used to enforce business rules (e.g. 'balance cannot be negative').\n2. You can throw ANY Throwable subclass — checked (IOException) or unchecked (RuntimeException).\n3. After `throw`, execution stops immediately — subsequent lines in the same block are unreachable (compile error).\n4. `throw` vs `throws`:\n   • `throw` → inside method body, creates and fires the exception NOW.\n   • `throws` → in method signature, declares what checked exceptions callers must handle.\n5. Modern APIs prefer throwing RuntimeException subclasses so callers are not forced to wrap every call in try-catch.",
      gotchas: [
        "Any code written directly after a `throw` statement inside a block is unreachable and triggers a compilation error.",
        "You must pass a meaningful message to the exception constructor — `throw new IllegalArgumentException()` with no message is useless in production logs.",
        "`throw` is a statement, not an expression. You cannot write `return throw new Exception()` — but you CAN write a helper method that does it for null checks: `Objects.requireNonNull(value, 'must not be null')`."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between 'throw' and 'throws'?",
          answer: "'throw' is a keyword used inside a method body to manually instantiate and fire a specific exception object. 'throws' is used in the method signature to declare that a method may propagate checked exceptions to its caller."
        },
        {
          question: "Can you throw a checked exception from inside a lambda?",
          answer: "Not directly, unless the functional interface's method declares the checked exception in its throws clause. The standard java.util.function interfaces (Predicate, Function, etc.) do not declare checked exceptions, so you must either catch inside the lambda or create a custom functional interface that does declare the exception."
        },
        {
          question: "What happens when `throw` is used inside a finally block?",
          answer: "The exception from the finally block replaces (suppresses) any exception that was already propagating from the try or catch block. The original exception is completely lost. This is a critical bug pattern — avoid throwing from finally unless intentional."
        }
      ],
      code: `int balance = 100;
if (withdrawAmount > balance) {
    throw new ArithmeticException("Insufficient Balance");
}`,
      visualizerType: "exception"
    },
    {
      id: 98,
      title: "Custom Exception",
      intro: "Defining errors matching business domains (like InsufficientFundsException).",
      explanation: "Two types of custom exceptions:\n1. Checked custom: extend `Exception` → caller is FORCED to handle with try-catch or throws.\n2. Unchecked custom: extend `RuntimeException` → caller is NOT forced to handle (preferred in modern APIs).\n3. Always provide at minimum two constructors:\n   • `CustomException(String message)` → calls `super(message)`\n   • `CustomException(String message, Throwable cause)` → preserves original root cause\n4. Name them clearly after the business rule violated: `InsufficientFundsException`, `OrderNotFoundException`.\n5. In Spring: throw `RuntimeException` subclasses and catch them in `@ControllerAdvice` → maps to HTTP status codes without polluting service code with try-catch.",
      gotchas: [
        "Always provide constructors that accept String messages and pass them to `super(msg)` so that exception stack traces show clear descriptions.",
        "Without the `(String message, Throwable cause)` constructor, you lose the root cause when re-throwing. Production debugging becomes nearly impossible without the original stack trace.",
        "Don't create a single generic `AppException` for everything. Use specific names — `PaymentFailedException`, `UserNotFoundException` — so catch blocks and @ControllerAdvice can map each to the correct HTTP response code."
      ],
      interviewQuestions: [
        {
          question: "Why should we prefer Custom RuntimeExceptions in modern REST APIs?",
          answer: "Checked exceptions clutter code with try-catch blocks everywhere. Spring's @ControllerAdvice can catch RuntimeException subclasses globally and map them to HTTP status codes (404, 400, 500) cleanly, keeping service and controller code free of boilerplate."
        },
        {
          question: "When would you choose a checked custom exception over an unchecked one?",
          answer: "When the caller MUST handle the failure to work correctly — e.g. a method that reads a config file where missing config makes the app unrunnable. Use checked to force the caller to address it at compile time. If recovery is optional or unlikely, unchecked is cleaner."
        },
        {
          question: "What is the minimum implementation for a well-designed custom exception?",
          answer: "Extend RuntimeException (or Exception), provide a message constructor calling super(message), and a cause constructor calling super(message, cause). The cause constructor ensures root cause is preserved in the stack trace when the exception wraps another exception."
        }
      ],
      code: `class HaterException extends RuntimeException {
    HaterException(String msg) {
        super(msg);
    }
}`,
      visualizerType: "exception"
    },
    {
      id: 99,
      title: "Ducking Exceptions Using throws",
      intro: "Passing the buck to the caller.",
      explanation: "If a method throws a checked exception, it can duck handling it by declaring it in its signature: `void myMethod() throws IOException`. The caller method must now handle it or duck it.",
      gotchas: [
        "Ducking exceptions all the way to `main` method causes the JVM default handler to print it and exit, failing the application. Handle exceptions at boundaries!"
      ],
      interviewQuestions: [
        {
          question: "Can an overridden method declare more checked exceptions in its throws clause than the superclass method?",
          answer: "No. An overriding method in subclass cannot throw broader or new checked exceptions. It can only throw narrower exceptions or none at all (co-variant exception rule)."
        }
      ],
      code: `void readFile() throws java.io.FileNotFoundException {
    java.io.FileReader fr = new java.io.FileReader("notes.txt");
}`,
      visualizerType: "exception"
    },
    {
      id: 100,
      title: "User Input: BufferedReader & Scanner",
      intro: "Interacting with users via Console.",
      explanation: "Scanner: easy to parse tokens (int, words) using regex, slow. BufferedReader: buffered stream reader, reads fast, reads only strings (needs parsing, e.g. `Integer.parseInt()`).",
      gotchas: [
        "BufferedReader must be closed! It throws checked IOException, unlike Scanner which handles exceptions internally."
      ],
      interviewQuestions: [
        {
          question: "Why is BufferedReader faster than Scanner?",
          answer: "BufferedReader has a larger default buffer (8KB) and simply reads characters sequentially. Scanner parses inputs using regular expressions, which consumes more CPU cycles."
        }
      ],
      code: `// Scanner:
java.util.Scanner sc = new java.util.Scanner(System.in);
String input = sc.nextLine();

// BufferedReader:
java.io.BufferedReader br = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));
String val = br.readLine();`,
      visualizerType: "jvm"
    },
    {
      id: 101,
      title: "try-with-resources",
      intro: "Automatic resource management. Say goodbye to manual finally blocks.",
      explanation: "Introduced in Java 7, try-with-resources statement ensures that each resource is closed at the end of the statement. Any object that implements `java.lang.AutoCloseable` or `java.io.Closeable` can be used as a resource.",
      gotchas: [
        "Resources are closed in the reverse order of their declaration.",
        "If an exception is thrown in the try block and during close(), the close() exception is suppressed but can be retrieved using e.getSuppressed()."
      ],
      interviewQuestions: [
        {
          question: "What is a suppressed exception in try-with-resources?",
          answer: "If the try block throws an exception and the close() method also throws an exception, the try block exception is thrown to the caller, and the close() exception is suppressed, accessible via getSuppressed()."
        }
      ],
      code: `try (java.io.BufferedReader br = new java.io.BufferedReader(new java.io.FileReader("test.txt"))) {\n    System.out.println(br.readLine());\n} catch (java.io.IOException e) {\n    e.printStackTrace();\n}`,
      visualizerType: "exception"
    }
  ]
};
