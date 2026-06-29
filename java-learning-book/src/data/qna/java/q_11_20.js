export const q_11_20 = [
  {
    "id": 11,
    "category": "Core Java",
    "level": "Intermediate",
    "title": "HashCode and Equals Contract",
    "companies": [
      "Goldman Sachs",
      "JPMorgan",
      "Amazon"
    ],
    "question": "What is the contract between equals() and hashCode() in Java?",
    "answer": "If two objects are equal according to equals(Object) method, their hashCode() must return the same integer value. If two objects return the same hashCode, they are NOT guaranteed to be equal (hash collision). Breaking this contract causes memory leaks and unpredictable behavior in Hash-based collections (HashMap, HashSet).",
    "checklist": [
      "Equals true implies same HashCode",
      "Same HashCode does NOT imply equals true",
      "Required for HashMaps/HashSets"
    ]
  },
  {
    "id": 12,
    "category": "Core Java",
    "level": "Intermediate",
    "title": "Java Generics & Type Erasure",
    "companies": [
      "Oracle",
      "Microsoft",
      "Google"
    ],
    "question": "What is Type Erasure in Java Generics?",
    "answer": "Type Erasure is the compiler process where generic type parameters are replaced with their bounds (e.g. Object or class type) during compilation. Consequently, generic type information is omitted at runtime, ensuring backward compatibility with older JVM versions.",
    "checklist": [
      "Generic checks exist only at compile time",
      "Type parameters replaced by Object/Bounds",
      "Forces bytecode compatibility"
    ]
  },
  {
    "id": 13,
    "category": "Core Java",
    "level": "Intermediate",
    "title": "Comparable vs Comparator",
    "companies": [
      "Morgan Stanley",
      "Visa"
    ],
    "question": "What is the difference between Comparable and Comparator?",
    "answer": "- Comparable: Implements default sorting logic for a class via compareTo(Object) method (internal sorting).\n- Comparator: Implements custom sorting configurations in external classes via compare(Object, Object) method (external sorting, allowing multiple sorting criteria).",
    "checklist": [
      "Comparable = compareTo (internal)",
      "Comparator = compare (external)",
      "Default order vs custom runtime layouts"
    ]
  },
  {
    "id": 14,
    "category": "Core Java",
    "level": "Intermediate",
    "title": "Fail-Fast vs Fail-Safe Iterators",
    "companies": [
      "Goldman Sachs",
      "Barclays"
    ],
    "question": "Compare Fail-Fast and Fail-Safe Iterators with examples.",
    "answer": "Fail-Fast iterators (e.g. ArrayList, HashMap iterators) work directly on the collection data. If structural modifications are made during iteration, they throw ConcurrentModificationException using a modCount check.\n\nFail-Safe (or Weakly Consistent) iterators (e.g. CopyOnWriteArrayList, ConcurrentHashMap iterators) work on a cloned copy of the collection, permitting modifications without raising exceptions.",
    "checklist": [
      "Fail-Fast operates on main data",
      "Fail-Safe operates on clones/segments",
      "ConcurrentModificationException triggers"
    ]
  },
  {
    "id": 15,
    "category": "Core Java",
    "level": "Intermediate",
    "title": "Java 8 Functional Interfaces & Lambdas",
    "companies": [
      "Amazon",
      "Cisco"
    ],
    "question": "What is a Functional Interface, and how do Lambda expressions interact with them?",
    "answer": "A functional interface has exactly one abstract method (annotated with @FunctionalInterface). Lambda expressions provide inline implementations for this abstract method, eliminating boilerplate anonymous classes. Core types: Predicate (boolean test), Consumer (accepts input, returns void), Function (maps T to R), Supplier (returns T).",
    "checklist": [
      "Single Abstract Method constraint",
      "Lambda acts as anonymous function instance",
      "Functional interface target types"
    ]
  },
  {
    "id": 16,
    "category": "Core Java",
    "level": "Intermediate",
    "title": "Stream API Intermediate vs Terminal Operations",
    "companies": [
      "JPMorgan",
      "Citi"
    ],
    "question": "Explain the difference between Intermediate and Terminal operations in Streams.",
    "answer": "Intermediate operations (e.g., filter, map, flatMap) are lazy. They return another Stream and do not execute until a terminal operation is called.\n\nTerminal operations (e.g., collect, forEach, reduce) trigger the stream pipeline processing and close the stream, returning concrete data types or side-effects.",
    "checklist": [
      "Intermediate is lazy & returns Stream",
      "Terminal triggers execution & closes pipeline",
      "Pipelines process elements elements individually"
    ]
  },
  {
    "id": 17,
    "category": "Core Java",
    "level": "Intermediate",
    "title": "Exception Handling: Try-With-Resources",
    "companies": [
      "Expedia",
      "Deutsche Bank"
    ],
    "question": "How does Try-With-Resources work, and what interface must resources implement?",
    "answer": "Try-with-resources (Java 7+) declares resources that should be closed automatically after the execution block completes. Resources must implement the 'AutoCloseable' or 'Closeable' interfaces. This eliminates manual nested finally-blocks.",
    "checklist": [
      "Requires AutoCloseable interface",
      "Implicitly calls close() method",
      "Prevents resource/connection leaks"
    ]
  },
  {
    "id": 18,
    "category": "Core Java",
    "level": "Intermediate",
    "title": "Java Serialization & transient Keyword",
    "companies": [
      "Visa",
      "American Express"
    ],
    "question": "What is Java Serialization, and what does the 'transient' keyword do?",
    "answer": "Serialization converts object states into byte streams for storage or network transport. Deserialization restores objects from byte streams. Marking a field as 'transient' excludes it from serialization, preventing sensitive variables (like passwords) from being written to stream.",
    "checklist": [
      "Requires Serializable interface",
      "transient fields skipped",
      "serialVersionUID mismatch raises exceptions"
    ]
  },
  {
    "id": 19,
    "category": "Core Java",
    "level": "Intermediate",
    "title": "Shallow Copy vs Deep Copy",
    "companies": [
      "PayPal",
      "Walmart"
    ],
    "question": "What is the difference between a shallow copy and a deep copy?",
    "answer": "Shallow copy creates a new object instance but copies references of internal objects (both objects point to the same child objects).\n\nDeep copy duplicates everything, creating new instances of the root object and all nested child objects, making them fully independent.",
    "checklist": [
      "Shallow copies reference pointers",
      "Deep duplicates nested memory blocks",
      "Cloneable default is shallow"
    ]
  },
  {
    "id": 20,
    "category": "Core Java",
    "level": "Intermediate",
    "title": "Optional Class usage",
    "companies": [
      "Intuit",
      "Paytm"
    ],
    "question": "Why was the Optional class introduced in Java 8, and how should it be used?",
    "answer": "Optional is a container object designed to represent the presence or absence of a value, reducing explicit 'null' checks and avoiding NullPointerExceptions. It should be used primarily as a method return type, not as method parameters or class fields.",
    "checklist": [
      "Avoids explicit null validations",
      "Should be used as return type only",
      "Optional methods: map, filter, orElseGet"
    ]
  }
];
export default q_11_20;
