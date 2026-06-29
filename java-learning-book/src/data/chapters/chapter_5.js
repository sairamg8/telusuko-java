export default {
  id: 5,
  title: "Arrays & Strings",
  range: "39-48",
  concepts: [
    {
      id: 39,
      title: "Need for an Array",
      intro: "Imagine storing 100 students' grades in individual variables. Nightmare, right?",
      explanation: "Arrays are contiguous blocks of memory that store multiple elements of the same data type. This provides instant retrieval of elements using index numbers (0-indexed).",
      gotchas: [
        "Arrays have a fixed size! Once created, you cannot increase or decrease their length. Use ArrayList if you need dynamic scaling."
      ],
      interviewQuestions: [
        {
          question: "What is the time complexity of looking up an element in an array by its index?",
          answer: "O(1) constant time, because the memory offset is calculated instantly using the base address + (index * data size)."
        }
      ],
      code: "int[] grades = new int[5]; // Stores 5 integer grades",
      visualizerType: "memory"
    },
    {
      id: 40,
      title: "Creation of an Array",
      intro: "Declaring, instantiating, and initializing arrays.",
      explanation: "Syntax: `int[] nums = new int[5];` or shorthand: `int[] nums = {1, 2, 3, 4, 5};`. When instantiated, arrays get default values: 0 for numeric types, false for boolean, and null for objects.",
      gotchas: [
        "Accessing an index >= array length throws a runtime `ArrayIndexOutOfBoundsException`."
      ],
      interviewQuestions: [
        {
          question: "Are arrays objects in Java?",
          answer: "Yes. In Java, arrays are dynamically created objects and inherit from Object class. They have an instance field 'length'."
        }
      ],
      code: `int[] nums = {10, 20, 30};
System.out.println(nums.length); // Prints 3`,
      visualizerType: "memory"
    },
    {
      id: 41,
      title: "Multidimensional Array",
      intro: "Arrays of arrays. Matrix representation.",
      explanation: "Java does not support true multidimensional arrays. Instead, it supports arrays of arrays. Syntactically: `int[][] matrix = new int[3][4];` representing 3 rows and 4 columns.",
      gotchas: [
        "Each row of a multidimensional array can live in a different memory location on the heap because they are separate array objects."
      ],
      interviewQuestions: [
        {
          question: "How is a 2D array representation different in Java compared to C++?",
          answer: "In C++, a 2D array is a single contiguous block of memory. In Java, it's an array object containing references to other array objects in different heap locations."
        }
      ],
      code: `int[][] grid = {
    {1, 2, 3},
    {4, 5, 6}
};`,
      visualizerType: "memory"
    },
    {
      id: 42,
      title: "Jagged and 3D Arrays",
      intro: "Row lengths don't have to match. Let's make asymmetrical matrices.",
      explanation: "Since multidimensional arrays are arrays of arrays, each row can have a different length. This is called a Jagged array. Syntax: define row size only, then instantiate each row manually.",
      gotchas: [
        "Accessing columns of an uninitialized row causes NullPointerException because the row reference is default null!"
      ],
      interviewQuestions: [
        {
          question: "How do you declare a jagged array with 3 rows of variable sizes?",
          answer: "Declare int[][] arr = new int[3][]; and then instantiate individual rows: arr[0] = new int[2]; arr[1] = new int[5]; arr[2] = new int[3];"
        }
      ],
      code: `int[][] jagged = new int[2][];
jagged[0] = new int[3]; // Row 0 has 3 columns
jagged[1] = new int[5]; // Row 1 has 5 columns`,
      visualizerType: "memory"
    },
    {
      id: 43,
      title: "Drawbacks of Arrays",
      intro: "Why arrays are raw and rarely used in enterprise logic without abstractions.",
      explanation: `1. Fixed size: cannot resize.
2. Homogeneous: stores only one data type.
3. Contiguous memory requirement: hard to allocate large arrays on fragmented heaps.
4. No built-in CRUD operations.`,
      gotchas: [
        "If you need dynamic inserts or search utilities, write wrapper code or use Collection API (ArrayList)."
      ],
      interviewQuestions: [
        {
          question: "Why is inserting an element in the middle of an array expensive?",
          answer: "Because arrays are contiguous, you must shift all subsequent elements to the right to clear the slot, which takes O(N) linear time."
        }
      ],
      code: "// Need: Dynamic list. Solution: ArrayList!",
      visualizerType: "memory"
    },
    {
      id: 44,
      title: "Array of Objects",
      intro: "Holding complex models in arrays.",
      explanation: "You can create an array of class objects. Syntactically: `Student[] students = new Student[5];`. This array does NOT contain actual Student objects. It contains 5 null references.",
      gotchas: [
        "Calling methods on elements of a newly created Object array causes NullPointerException! You must instantiate each element object first."
      ],
      interviewQuestions: [
        {
          question: "What does 'Student[] students = new Student[3]' do in memory?",
          answer: "It creates an array object on the heap containing 3 reference slots initialized to null. No Student object is instantiated yet."
        }
      ],
      code: `Student[] arr = new Student[2];
// arr[0].study(); // NullPointerException!
arr[0] = new Student(); // Instantiate
arr[0].name = "Joy"; // OK`,
      visualizerType: "memory"
    },
    {
      id: 45,
      title: "Enhanced For Loop",
      intro: "Read-only syntax. Cleaner loops without counter boilerplate.",
      explanation: "Syntax: `for (Type element : arrayOrCollection) { body }`\n1. Gives you each element directly — no index counter to manage.\n2. On arrays: compiles to a standard indexed for loop under the hood.\n3. On Collections/Iterables: compiles to Iterator calls — `hasNext()` + `next()` automatically.\n4. Any class implementing `Iterable<T>` can be used with for-each (custom classes too).\n5. Trade-off: cleaner syntax but NO index access and NO safe in-place modification.",
      gotchas: [
        "For-Each loop is read-only. You cannot use it to modify array elements or get the index value.",
        "Modifying a collection (adding/removing elements) while iterating with for-each throws ConcurrentModificationException. Use `Iterator.remove()`, `List.removeIf()`, or iterate a copy instead.",
        "For primitive arrays, the loop variable is a COPY of the element value. Assigning to it does NOT modify the original array. Example: `for (int n : nums) { n = 0; }` leaves the array unchanged."
      ],
      interviewQuestions: [
        {
          question: "Can we use an Enhanced For loop to delete elements from an ArrayList?",
          answer: "No, iterating over a collection and modifying it inside an enhanced loop throws a ConcurrentModificationException. Use an Iterator or removeIf instead."
        },
        {
          question: "How does the enhanced for loop work internally for Collections?",
          answer: "The compiler translates `for (T item : collection)` into an Iterator-based loop: it calls collection.iterator() to get an Iterator, then loops with hasNext() and next(). Any class implementing Iterable<T> can be used in a for-each loop."
        },
        {
          question: "When would you prefer a traditional indexed for loop over the enhanced for loop?",
          answer: "When you need the index (e.g., comparing adjacent elements, updating elements in-place, iterating two arrays simultaneously, or iterating backwards). The enhanced for loop is ideal when you only need to read each element sequentially."
        }
      ],
      code: `int[] numbers = {1, 2, 3};
for (int val : numbers) {
    System.out.println(val);
}`,
      visualizerType: "jvm"
    },
    {
      id: 46,
      title: "What Is a String?",
      intro: "Sequence of characters. The most important object in Java.",
      explanation: "In Java, a String is a class object, not a primitive char array. String objects are stored in a special segment of heap memory called the 'String Constant Pool' (SCP) to conserve memory.",
      gotchas: [
        "String literals are pooled. Creating strings with 'new' forces a new object creation in the general heap, bypassing the pool. Avoid 'new String()'."
      ],
      interviewQuestions: [
        {
          question: "What is the String Constant Pool (SCP)?",
          answer: "SCP is a specialized area in JVM heap memory. When a String literal is created, the JVM check if the literal exists in the pool. If yes, it returns the reference; if not, it creates a new one in the pool."
        }
      ],
      code: `String s1 = "Java"; // SCP reference
String s2 = "Java"; // Points to the same object!
System.out.println(s1 == s2); // true (same reference)`,
      visualizerType: "string-pool"
    },
    {
      id: 47,
      title: "Mutable vs. Immutable Strings",
      intro: "Why modifying a String creates a new object and floods memory.",
      explanation: "Java Strings are immutable (unchangeable). Once created, their contents cannot be modified. If you concatenate strings, e.g. `s1 += \" World\"`, Java creates a brand new String object, leaving the old one orphaned.",
      gotchas: [
        "Concatenating strings inside loops creates thousands of junk objects in the heap, causing Garbage Collection stalls. Use StringBuilder instead!"
      ],
      interviewQuestions: [
        {
          question: "Why are String objects immutable in Java?",
          answer: "1. Security: database connections, URLs, paths are passed as strings. 2. Thread Safety: multiple threads can share same string safely. 3. String Pool efficiency."
        }
      ],
      code: `String s = "Hello";
s.concat(" World"); // concat returns new String!
System.out.println(s); // prints "Hello" (unchanged!)`,
      visualizerType: "string-pool"
    },
    {
      id: 48,
      title: "StringBuffer and StringBuilder",
      intro: "The cure for String immutability performance hits.",
      explanation: "These classes provide mutable sequence of characters. They allow updates, inserts, and deletes without generating junk objects. StringBuilder is fast but not thread-safe. StringBuffer is synchronized and thread-safe.",
      gotchas: [
        "Always use StringBuilder for local variables or single-threaded operations. Synchronizing methods in StringBuffer causes overhead."
      ],
      interviewQuestions: [
        {
          question: "Differentiate between String, StringBuffer, and StringBuilder.",
          answer: "String is immutable. StringBuffer is mutable and thread-safe (synchronized, slower). StringBuilder is mutable, non-thread-safe (unsynchronized, faster)."
        }
      ],
      code: `StringBuilder sb = new StringBuilder("Hello");
for(int i=0; i<5; i++) {
    sb.append("!"); // Modifies the same object in place!
}`,
      visualizerType: "string-pool"
    }
  ]
};
