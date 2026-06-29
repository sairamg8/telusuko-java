export default {
  id: 12,
  title: "Collections & Generics",
  range: "108-117",
  concepts: [
    {
      id: 108,
      title: "Collection API",
      intro: "Standardizing data structures in Java. List, Set, and Queue interfaces.",
      explanation: "The Collections Framework is a unified architecture representing data structures (lists, sets, maps). The `Collection` interface resides at the root of the hierarchy (excluding Map), providing standard methods like add(), remove(), size(), and iterator().",
      gotchas: [
        "Collection is an interface, whereas Collections (with an 's') is a utility class containing static helper methods (like sort, shuffle, reverse)."
      ],
      interviewQuestions: [
        {
          question: "Why does Map not extend Collection interface?",
          answer: "Map handles key-value pairs (mappings) which require different method signatures (like put, get, keyset) compared to single-element collections (like add, remove)."
        }
      ],
      code: `// Collections utility class sorting:
java.util.List<String> items = new java.util.ArrayList<>();
java.util.Collections.sort(items);`,
      visualizerType: "jvm"
    },
    {
      id: 109,
      title: "ArrayList",
      intro: "The dynamic array. Resizeable memory storage.",
      explanation: "An `ArrayList` wraps a standard array, automatically doubling its size when capacity is exceeded. It guarantees O(1) random read access because elements reside contiguously in memory.",
      gotchas: [
        "Inserting or deleting elements from the middle of an ArrayList is slow (O(N)) because all trailing elements must be shifted in memory. Use LinkedList for frequent middle modifications."
      ],
      interviewQuestions: [
        {
          question: "How does ArrayList handle resizing under the hood?",
          answer: "When full, it allocates a new array that is roughly 1.5 times the size of the old array, copies all original elements using System.arraycopy(), and discards the old array."
        }
      ],
      code: `java.util.ArrayList<Integer> numbers = new java.util.ArrayList<>();
numbers.add(10); // inserts at end
numbers.get(0); // O(1) read`,
      visualizerType: "memory"
    },
    {
      id: 110,
      title: "Set",
      intro: "Enforcing uniqueness. Eliminating duplicate data.",
      explanation: "A `Set` is a collection containing no duplicate elements. Common implementations: 1. `HashSet` (uses hashing, unordered, fast O(1)), 2. `LinkedHashSet` (maintains insertion order), 3. `TreeSet` (sorted order, internally red-black tree, O(log N)).",
      gotchas: [
        "HashSet relies on `hashCode()` and `equals()` to check duplicates. If you store custom objects without overriding these methods, duplicate entries will occur."
      ],
      interviewQuestions: [
        {
          question: "What is the differences between HashSet, LinkedHashSet and TreeSet?",
          answer: "HashSet has no order guarantees and O(1) lookup. LinkedHashSet maintains insertion order using a doubly-linked list. TreeSet keeps elements sorted but has O(log N) lookup."
        }
      ],
      code: `java.util.Set<String> names = new java.util.HashSet<>();
names.add("Alice");
names.add("Alice"); // Ignored! Set size is still 1.`,
      visualizerType: "memory"
    },
    {
      id: 111,
      title: "Map",
      intro: "Fast key-value associations. The core of caching and lookup tables.",
      explanation: "A `Map` maps unique keys to values. `HashMap` works by calculating hash values of keys, grouping them into bucket slots. When different keys yield the same bucket index, hash collisions are resolved using linked lists or balanced trees.",
      gotchas: [
        "Never use mutable keys in HashMap! If key fields change after insertion, their hashCode changes, preventing the Map from locating the entry, causing memory leaks."
      ],
      interviewQuestions: [
        {
          question: "How does HashMap resolve hash collisions in Java 8?",
          answer: "It uses a linked list for the bucket. If the bucket size exceeds a threshold (8) and Map capacity is at least 64, it converts the list into a self-balancing red-black tree, improving search time from O(N) to O(log N)."
        }
      ],
      code: `java.util.Map<String, Integer> scores = new java.util.HashMap<>();
scores.put("John", 95);
int val = scores.get("John"); // O(1) lookup`,
      visualizerType: "memory"
    },
    {
      id: 112,
      title: "Comparator vs Comparable",
      intro: "Sorting rules: natural vs custom.",
      explanation: "`Comparable` defines the natural sorting rule of a class, implementing the `compareTo()` method. `Comparator` defines custom sorting rules externally using the `compare()` method, which can be passed to sorting calls.",
      gotchas: [
        "compareTo() returning 0 indicates equality. Consistent comparisons should match equals() logic, otherwise sorted collections like TreeSet behave unexpectedly."
      ],
      interviewQuestions: [
        {
          question: "Compare Comparable and Comparator interfaces.",
          answer: "Comparable is implemented inside the domain class (natural sort, single rule). Comparator is an external class or lambda (custom sort, multiple rules possible)."
        }
      ],
      code: `// Comparator sorting using lambda:
java.util.List<String> list = java.util.Arrays.asList("Banana", "Apple", "Cherry");
list.sort((s1, s2) -> s2.compareTo(s1)); // custom reverse sort`,
      visualizerType: "jvm"
    },
    {
      id: 113,
      title: "Need for Generics in Java",
      intro: "Compile-time checks replacing risky runtime casts.",
      explanation: "Prior to Java 5, collections stored everything as raw `Object` instances, requiring developers to perform downcasting. This resulted in frequent `ClassCastException` at runtime. Generics enforce type checks at compile-time.",
      gotchas: [
        "Generics only exist at compile time! The compiler removes all type parameter metadata during compilation, replacing them with Object/upper bounds. This is known as Type Erasure."
      ],
      interviewQuestions: [
        {
          question: "What is Type Erasure in Java?",
          answer: "It is the process where the compiler removes generic type information (e.g., changing List<String> to raw List) to preserve backward compatibility with pre-Java 5 JVM versions."
        }
      ],
      code: `// Pre-Java 5:
java.util.ArrayList list = new java.util.ArrayList();
list.add("Hello");
String s = (String) list.get(0); // Risky manual cast!`,
      visualizerType: "jvm"
    },
    {
      id: 114,
      title: "Syntax and Usage of Generics",
      intro: "Type parameters and the diamond operator.",
      explanation: "Use `<T>` or similar parameters to denote type variables. When initializing, use concrete classes. The diamond operator `<>` (since Java 7) infers the parameters automatically.",
      gotchas: [
        "You cannot use primitive types as generic parameters! E.g. `List<int>` is invalid; you must use wrapper class `List<Integer>` instead."
      ],
      interviewQuestions: [
        {
          question: "Why cannot primitives be used in Generics?",
          answer: "Because of Type Erasure. The compiler replaces generic parameters with 'Object'. Since primitives do not inherit from Object, they cannot be stored in object references."
        }
      ],
      code: `// Diamond operator inference:
java.util.List<String> list = new java.util.ArrayList<>();`,
      visualizerType: "jvm"
    },
    {
      id: 115,
      title: "Creating a Generic Class",
      intro: "Writing reusable, type-safe custom containers.",
      explanation: "By defining a class with `<T>`, we can design components (like custom caches, stacks, or wrapper envelopes) that operate safely on any specified object type.",
      gotchas: [
        "You cannot instantiate generic types directly (`new T()`) or create generic arrays (`new T[10]`) because the type is erased at runtime."
      ],
      interviewQuestions: [
        {
          question: "How do you instantiate a generic array inside a generic class?",
          answer: "You cannot write 'new T[size]'. You must instantiate a raw Object array and cast it, or use Array.newInstance(Class<T>, size) via reflection."
        }
      ],
      code: `class Box<T> {
    private T item;
    public void set(T val) { this.item = val; }
    public T get() { return item; }
}`,
      visualizerType: "memory"
    },
    {
      id: 116,
      title: "Using Wildcard Types in Generics",
      intro: "Handling unknowns. The flexible question mark parameter.",
      explanation: "The wildcard character `?` represents an unknown type in generic signatures. It allows methods to accept collections of varying parameters, solving covariance limitations.",
      gotchas: [
        "A collection using an unbounded wildcard `List<?>` is read-only for writes! You cannot add elements to it (except null) because the specific type is unknown."
      ],
      interviewQuestions: [
        {
          question: "What is List<?> and how does it differ from List<Object>?",
          answer: "List<Object> can accept elements of any class but a method accepting List<Object> cannot accept List<String> (invariant). List<?> can accept any parameterized List (covariant)."
        }
      ],
      code: `// Prints list elements of any type:
void printList(java.util.List<?> list) {
    for (Object obj : list) System.out.println(obj);
}`,
      visualizerType: "jvm"
    },
    {
      id: 117,
      title: "Upper and Lower Bounds in Generics",
      intro: "Limiting wildcards with 'extends' and 'super'. The PECS design guideline.",
      explanation: "1. Upper bound (`? extends T`): accepts subclass collections of T. Safe for reading. 2. Lower bound (`? super T`): accepts superclass collections of T. Safe for writing. PECS: Producer Extends, Consumer Super.",
      gotchas: [
        "If your method reads from a generic structure, use `extends`. If it writes to a generic structure, use `super`."
      ],
      interviewQuestions: [
        {
          question: "Explain the PECS rule in Java Generics.",
          answer: "PECS stands for Producer Extends, Consumer Super. Use '? extends T' if your collection produces values (reads). Use '? super T' if your collection consumes values (writes)."
        }
      ],
      code: `// Producer: reads numbers from list
double sum(java.util.List<? extends Number> list) {
    double s = 0.0;
    for (Number n : list) s += n.doubleValue();
    return s;
}`,
      visualizerType: "jvm"
    }
  ]
};
