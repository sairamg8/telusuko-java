export const q_1_10 = [
  {
    "id": 1,
    "category": "Core Java",
    "level": "Basic",
    "title": "Stack vs Heap Memory",
    "companies": [
      "TCS",
      "Infosys",
      "Cognizant"
    ],
    "question": "What is the difference between Stack and Heap memory in Java?",
    "answer": "Stack memory is used for static memory allocation and execution of threads. It contains local primitive variables and references to objects on the heap. Allocation is LIFO (Last-In-First-Out) and extremely fast.\n\nHeap memory is used for dynamic memory allocation of Java objects and JRE classes at runtime. All objects created via the 'new' keyword reside in the Heap. It is shared across all threads and managed by the Garbage Collector.",
    "checklist": [
      "Stack stores primitives & references",
      "Heap stores objects",
      "Stack is thread-isolated",
      "Heap is thread-shared"
    ]
  },
  {
    "id": 2,
    "category": "Core Java",
    "level": "Basic",
    "title": "Why String is Immutable",
    "companies": [
      "Wipro",
      "Capgemini",
      "Accenture"
    ],
    "question": "Why is String immutable in Java?",
    "answer": "1. String Pool: Allows multiple string references to share the same memory slot, saving heap space.\n2. Security: Strings are commonly used for database URLs, network connections, and file paths. If mutable, attackers could change connection destinations.\n3. Thread Safety: Immutable objects are naturally thread-safe without synchronization locks.\n4. HashCode Caching: Strings cache their hashCode, making them optimal keys for HashMaps.",
    "checklist": [
      "String Pool sharing",
      "Security parameters protection",
      "Thread safety",
      "HashCode caching optimization"
    ]
  },
  {
    "id": 3,
    "category": "Core Java",
    "level": "Basic",
    "title": "Equals vs Double Equals (==)",
    "companies": [
      "HCL",
      "Tech Mahindra"
    ],
    "question": "What is the difference between equals() method and == operator?",
    "answer": "The '==' operator checks reference equality (are they the same object in memory). The 'equals()' method checks value equality (do they have the same content). By default, Object.equals() behaves like '==', so custom classes must override equals() to compare property values.",
    "checklist": [
      "== checks reference address",
      "equals() checks logical content",
      "Requires overriding hashCode() if equals() is overridden"
    ]
  },
  {
    "id": 4,
    "category": "Core Java",
    "level": "Basic",
    "title": "Final, Finally, and Finalize",
    "companies": [
      "Cognizant",
      "Mindtree"
    ],
    "question": "Explain the differences between final, finally, and finalize.",
    "answer": "- final: A keyword to define constants (variables cannot be reassigned, classes cannot be extended, methods cannot be overridden).\n- finally: A block used with try-catch to execute cleanup code (always runs even if an exception is thrown).\n- finalize: A deprecated method in the Object class called by the GC right before reclamation (never rely on it).",
    "checklist": [
      "final for immutability",
      "finally for resource cleanup",
      "finalize is deprecated & unpredictable"
    ]
  },
  {
    "id": 5,
    "category": "Core Java",
    "level": "Basic",
    "title": "Method Overloading vs Overriding",
    "companies": [
      "TCS",
      "IBM"
    ],
    "question": "What is the difference between method overloading and method overriding?",
    "answer": "Overloading (Compile-time polymorphism) occurs when two methods in the same class have the same name but different signatures (different parameters). \n\nOverriding (Runtime polymorphism) occurs when a subclass provides a specific implementation for a method declared in its superclass (same name, parameters, and return type).",
    "checklist": [
      "Overloading signature difference",
      "Overriding inheritance dependency",
      "Compile-time vs Runtime resolution"
    ]
  },
  {
    "id": 6,
    "category": "Core Java",
    "level": "Basic",
    "title": "Wrapper Classes & Autoboxing",
    "companies": [
      "Infosys",
      "Oracle"
    ],
    "question": "What is Autoboxing and Unboxing in Java?",
    "answer": "Autoboxing is the automatic conversion that the Java compiler makes between primitive types and their corresponding object wrapper classes (e.g., int to Integer). Unboxing is the reverse conversion (e.g., Integer to int). Beware of NullPointerExceptions when unboxing null wrappers.",
    "checklist": [
      "Primitive to Wrapper (Autoboxing)",
      "Wrapper to Primitive (Unboxing)",
      "Risk of NullPointerException on null objects"
    ]
  },
  {
    "id": 7,
    "category": "Core Java",
    "level": "Basic",
    "title": "Abstract Class vs Interface",
    "companies": [
      "Accenture",
      "LTI"
    ],
    "question": "Compare Abstract Classes and Interfaces in Java 8 and beyond.",
    "answer": "An abstract class can hold instance states (fields) and constructors. A class can extend only one abstract class. \n\nAn interface cannot hold instance states (only static final variables). Interfaces can have default and static methods (Java 8+) and private methods (Java 9+). A class can implement multiple interfaces.",
    "checklist": [
      "Single inheritance (Abstract) vs Multiple inheritance (Interface)",
      "Instance fields allowed in Abstract classes",
      "Default/static methods in Interfaces"
    ]
  },
  {
    "id": 8,
    "category": "Core Java",
    "level": "Basic",
    "title": "Checked vs Unchecked Exceptions",
    "companies": [
      "Wipro",
      "DXC"
    ],
    "question": "What is the difference between Checked and Unchecked Exceptions?",
    "answer": "Checked exceptions (e.g., IOException, SQLException) inherit from Exception and must be declared in method signatures or handled inside a try-catch block at compile time. \n\nUnchecked exceptions (e.g., NullPointerException, ArithmeticException) inherit from RuntimeException and do not require compile-time handling.",
    "checklist": [
      "Compile-time requirement (Checked)",
      "Runtime-only check (Unchecked)",
      "Exception hierarchy roots"
    ]
  },
  {
    "id": 9,
    "category": "Core Java",
    "level": "Basic",
    "title": "Array vs ArrayList",
    "companies": [
      "TCS",
      "Cognizant"
    ],
    "question": "How does an Array differ from an ArrayList?",
    "answer": "Arrays are fixed-size structures containing primitives or objects. ArrayLists are dynamic resizable collections built on top of arrays. When an ArrayList fills up, it creates a new larger array (typically 1.5x) and copies the elements.",
    "checklist": [
      "Fixed size vs Dynamic sizing",
      "Primitive support (Arrays only) vs Object wrapper references",
      "Resize penalty overhead"
    ]
  },
  {
    "id": 10,
    "category": "Core Java",
    "level": "Basic",
    "title": "Static Keyword",
    "companies": [
      "Capgemini",
      "L&T"
    ],
    "question": "What does the static keyword do in Java?",
    "answer": "The 'static' keyword binds variables, methods, blocks, or nested classes to the class context rather than instance contexts. A static member is allocated memory once at class load time and shared among all instances.",
    "checklist": [
      "Binds member to Class memory",
      "Shared among all objects",
      "Initialized at class-load time"
    ]
  }
];
export default q_1_10;
