export default {
  id: 5,
  title: "Arrays & Strings",
  range: "39-48",
  concepts: [
    {
      id: 39,
      title: "Need for an Array",
      intro: "Imagine storing 100 students' grades in individual variables. Nightmare, right?",
      explanation: "1. Without arrays, storing N values requires N separate variable declarations: `int g1, g2, g3…g100`. You can't loop over them, can't pass them together, and adding an 11th student breaks everything.\n2. An **array** is a single named container that stores multiple values of the SAME type in **contiguous (back-to-back) memory** locations. One variable, many values.\n3. **Why contiguous?** The computer can jump directly to any element using a formula: `address = base_address + (index × element_size)`. For an int array, index 4 is at `base + 4 × 4 bytes`. This gives **O(1) constant-time access** regardless of array size.\n4. Arrays are **zero-indexed** — the first element is at index 0, the last is at index `length - 1`. This maps directly to how memory addressing works (offset from base).\n5. Arrays enable **loops** — you write the processing logic once and let a loop handle all N elements. Without arrays, you'd need to manually call the same logic N times.\n6. In JS, arrays are dynamic objects that auto-resize and can hold mixed types (`[1, \"hello\", true]`). Java arrays are fixed-size and enforce a single type at compile time — you get safety and direct memory speed.\n7. Real-world use: storing database query results, pixel buffers in image processing, matrices in numerical computing, message queues in network I/O.",
      gotchas: [
        "Arrays have a **fixed size** set at creation. Once `new int[5]` is allocated, you cannot resize it. Need dynamic growth? Use `ArrayList` — which internally uses an array and copies to a 1.5× larger one when full.",
        "Array indices start at 0, not 1. The last valid index is `length - 1`. Accessing `arr[arr.length]` throws `ArrayIndexOutOfBoundsException` at runtime — the most common array bug in Java.",
        "Java arrays are objects — `int[] arr` is a reference variable on the stack pointing to the array object on the heap. Assigning `arr2 = arr1` copies the reference only. Both variables now point to the same array — modifying via `arr2` changes what `arr1` sees."
      ],
      interviewQuestions: [
        {
          question: "What is the time complexity of looking up an element in an array by its index?",
          answer: "O(1) constant time. The JVM calculates the exact memory address instantly: base_address + (index × element_size_in_bytes). No searching, no traversal — direct memory jump. This is why arrays are the fastest data structure for random access."
        },
        {
          question: "Why do array indices start at 0 in Java?",
          answer: "It's a memory-addressing convention from C. The index represents the OFFSET from the base address. Index 0 = 0 elements away from start = first element. Index 1 = 1 element offset = second. No subtraction is needed to compute the address, making it marginally more efficient."
        },
        {
          question: "What is the difference between an array and an ArrayList?",
          answer: "Array: fixed size, can store primitives or objects, no built-in add/remove, fastest raw access. ArrayList: dynamic size (copies to 1.5× array on overflow), stores only objects (autoboxing for primitives), has add/remove/contains/indexOf methods, slightly slower due to boxing overhead and potential resize copying."
        }
      ],
      code: `// Without array — impossible to scale:
// int g1=85, g2=90, g3=78 ... g100=91; // 100 variables!

// With array — one variable, N values, loop-ready:
int[] grades = new int[5]; // fixed at 5 elements
grades[0] = 85;
grades[4] = 91; // last valid index = length - 1

// Instant O(1) access — no loop:
System.out.println(grades[4]); // 91

// Process all with loop:
for (int g : grades) { System.out.println(g); }

// grades[5] → ArrayIndexOutOfBoundsException!`,
      visualizerType: "memory"
    },
    {
      id: 40,
      title: "Creation of an Array",
      intro: "Declaring, instantiating, and initializing arrays.",
      explanation: "1. **Declaration**: tells the compiler the variable type — `int[] nums;`. No heap memory allocated yet. The variable holds `null`.\n2. **Instantiation**: `nums = new int[5]` — allocates 5 × 4 bytes on the heap, initializes all slots to default values, stores the reference in `nums`.\n3. **Array literal shorthand**: `int[] nums = {1, 2, 3, 4, 5}` — declares, allocates, and fills in one step. Size is inferred from the number of values.\n4. **Default values on instantiation**: numeric types (`int`, `long`, `short`, `byte`) → `0`, `float`/`double` → `0.0`, `boolean` → `false`, `char` → `'\\u0000'` (null character), object references → `null`.\n5. `arr.length` is a **field**, not a method — no parentheses. It gives the total allocated size, NOT the number of values you've manually filled in.\n6. In JS, `new Array(5)` creates 5 empty slots that are actually `undefined`. Java's defaults are more predictable — every slot has a defined value immediately after `new`.\n7. Array type is enforced: you cannot store a `double` in an `int[]` without explicit casting — the compiler catches type mismatches before runtime.",
      gotchas: [
        "Declaring `int[] arr;` and then accessing `arr[0]` without instantiating first throws `NullPointerException` — the reference is null, there's no array to access.",
        "`arr.length` is a FIELD with no parentheses. `String.length()` is a METHOD with parentheses. Mixing this up — `arr.length()` — causes a compile error. This inconsistency trips up many beginners.",
        "Default values apply to instantiated array slots, NOT to uninitialized local variables. `int x;` inside a method followed by using `x` is a compile error. But `int[] arr = new int[5]; arr[0]` is fine — defaults to 0."
      ],
      interviewQuestions: [
        {
          question: "Are arrays objects in Java?",
          answer: "Yes. Arrays are heap-allocated objects that inherit from java.lang.Object. They have an instance field 'length', can be passed as Object parameters, and you can call .getClass() on them. The type descriptor for an int[] is '[I' (bracket = array, I = int)."
        },
        {
          question: "What are the default values stored in a newly created array?",
          answer: "Numeric types (int, long, short, byte) → 0. float/double → 0.0. boolean → false. char → '\\u0000' (null character, not a space). Object references (including String[]) → null. These defaults are set during heap allocation by the JVM before any user code runs."
        },
        {
          question: "What is the difference between array declaration and array instantiation?",
          answer: "Declaration (`int[] arr`) defines the variable name and type on the stack — no heap memory is allocated, the variable is null. Instantiation (`arr = new int[5]`) allocates memory on the heap and initializes default values. Both must happen before you can read or write array elements."
        }
      ],
      code: `// Declaration only — null reference, NO heap memory:
int[] nums;
// nums[0] = 5; → NullPointerException here!

// Instantiation — 5 ints on heap, all initialized to 0:
nums = new int[5];
System.out.println(nums[0]); // 0 (default)

// One-line shorthand — size inferred (3 elements):
int[] scores = {85, 90, 78};
System.out.println(scores.length); // 3 — field, NO parentheses!

// Wrong: scores.length() → compile error (not a method)`,
      visualizerType: "memory"
    },
    {
      id: 41,
      title: "Multidimensional Array",
      intro: "Arrays of arrays. Matrix representation.",
      explanation: "1. Java does NOT have true 2D arrays. Instead, `int[][] matrix` is an **array of arrays** — the outer array holds references to inner arrays, each a separate heap object.\n2. Syntax: `int[][] matrix = new int[3][4]` creates an outer array of 3 references, each pointing to an inner array of 4 ints. Total: 12 ints, but split across 4 heap objects.\n3. Memory layout: the outer array and each inner array are SEPARATE objects at different heap addresses. In C/C++, a 2D array is one contiguous block. Java's approach allows rows of different lengths (jagged arrays).\n4. Traversal: use nested loops — outer loop over rows using `matrix.length`, inner loop over columns using `matrix[i].length` (not a hardcoded number).\n5. Literal initialization: `int[][] grid = {{1,2,3},{4,5,6}};` — 2 rows of 3 columns each.\n6. In JS, `[[1,2],[3,4]]` is the same conceptually — an array of arrays. Java just enforces element types strictly across all levels.\n7. Practical use: representing a chessboard (8×8), image pixels, a spreadsheet grid, a graph adjacency matrix.",
      gotchas: [
        "Each row in a Java 2D array is a separate heap object at a different address — unlike C++ where all elements are contiguous. This means slightly slower element access due to pointer indirection (two memory lookups instead of one).",
        "Always use `matrix[i].length` for column count, not a hardcoded number. If rows have different lengths (jagged array), a hardcoded column bound will throw `ArrayIndexOutOfBoundsException` on shorter rows.",
        "Printing a 2D array with `System.out.println(matrix)` gives a type descriptor and hash code like `[[I@6d06d69c` — NOT the values. Use `Arrays.deepToString(matrix)` to get a human-readable `[[1, 2], [3, 4]]` output."
      ],
      interviewQuestions: [
        {
          question: "How is a 2D array different in Java compared to C++?",
          answer: "In C++, `int arr[3][4]` is a single contiguous block of 12 integers in memory — one allocation, cache-friendly. In Java, `int[][] arr = new int[3][4]` creates the outer array plus 3 separate inner array objects at different heap locations. Java's approach allows jagged arrays but adds pointer indirection overhead on each row access."
        },
        {
          question: "How do you iterate over a 2D array in Java?",
          answer: "Use nested loops: outer iterates rows with `matrix.length`, inner iterates columns with `matrix[i].length`. Always use `matrix[i].length` for the inner bound — using a hardcoded number breaks for jagged arrays where row lengths differ."
        },
        {
          question: "What does System.out.println(matrix) print for a 2D array?",
          answer: "It prints the Object's default toString() — a type descriptor and hash code like '[[I@6d06d69c' ('[' = array, '[I' = int[], second '[' = 2D). To print values, use Arrays.deepToString(matrix) for nested readable output like '[[1, 2], [3, 4]]'."
        }
      ],
      code: `// 3 rows × 4 columns — 4 separate heap objects:
int[][] matrix = new int[3][4];

// Literal initialization:
int[][] grid = {
    {1, 2, 3},
    {4, 5, 6}
};

// Safe nested traversal using each row's own length:
for (int i = 0; i < grid.length; i++) {
    for (int j = 0; j < grid[i].length; j++) {
        System.out.print(grid[i][j] + " ");
    }
}

import java.util.Arrays;
System.out.println(Arrays.deepToString(grid)); // [[1, 2, 3], [4, 5, 6]]`,
      visualizerType: "memory"
    },
    {
      id: 42,
      title: "Jagged and 3D Arrays",
      intro: "Row lengths don't have to match. Asymmetrical matrices.",
      explanation: "1. A **jagged array** is a 2D array where each row can have a DIFFERENT number of columns. This works because Java's 2D arrays are arrays of independent inner arrays — each row is its own heap object.\n2. Syntax: declare the outer array without column count, then manually instantiate each inner array: `int[][] j = new int[3][]; j[0] = new int[2]; j[1] = new int[5]; j[2] = new int[3];`\n3. **Memory advantage**: allocates exactly as much as each row needs. A rectangular `new int[5][100]` wastes space if most rows are short. Jagged saves memory by allocating per-row.\n4. **3D arrays**: `int[][][] cube = new int[2][3][4]` — array of 2D arrays. Access: `cube[x][y][z]`. Used in 3D voxel graphics, tensor operations, time-series matrices.\n5. Iteration over jagged: use `arr[i].length` (not a fixed value) for each row's column bound — rows differ in size.\n6. JS: `let jagged = [[1,2],[3,4,5,6]]` works naturally since arrays are dynamic. Java's explicit per-row instantiation achieves the same with type safety.\n7. Real use cases: adjacency list for a graph (each node has different neighbor counts), Pascal's triangle (row N has N+1 elements), storing variable-length student grade lists.",
      gotchas: [
        "Accessing a column of an uninstantiated row causes `NullPointerException` because `new int[3][]` initializes all 3 slots to `null` — no inner arrays exist yet. `j[0][0] = 5` when `j[0]` is null → NPE immediately.",
        "When iterating a jagged array, NEVER use a fixed column count — use `arr[i].length` per row. A fixed value will either throw `ArrayIndexOutOfBoundsException` on shorter rows or skip elements on longer ones.",
        "3D arrays have 3 levels of pointer indirection — three heap lookups per element access. For high-performance code (game engines, numeric computing), a flat 1D array with manual indexing `index = x*rows*cols + y*cols + z` is faster and more cache-friendly."
      ],
      interviewQuestions: [
        {
          question: "What is a jagged array and when would you use one?",
          answer: "A jagged array is a multi-dimensional array where each row is independently allocated and can have a different length. Use it when rows genuinely vary in size — adjacency lists (each node has different neighbor count), Pascal's triangle (row N has N+1 numbers), or per-student grade lists where class sizes differ. Saves memory vs a rectangular allocation."
        },
        {
          question: "How do you declare a jagged array with 3 rows of sizes 2, 4, and 3?",
          answer: "`int[][] arr = new int[3][];` then `arr[0] = new int[2]; arr[1] = new int[4]; arr[2] = new int[3];` The outer array specifies only the row count. Each inner array is explicitly instantiated with its own size. Accessing arr[0] before this instantiation returns null."
        },
        {
          question: "What is the memory advantage of a jagged array over a rectangular 2D array?",
          answer: "A rectangular array allocates rows × maxCols elements even if most rows are short. A jagged array allocates exactly what each row needs. For a triangle shape (rows of size 1,2,3,4,5), a rectangular 5×5 = 25 elements; a jagged array = 1+2+3+4+5 = 15 elements — 40% less memory."
        }
      ],
      code: `// Jagged array — rows have different lengths:
int[][] jagged = new int[3][];   // 3 null row slots
jagged[0] = new int[2];          // row 0: 2 cols
jagged[1] = new int[4];          // row 1: 4 cols
jagged[2] = new int[1];          // row 2: 1 col

// Safe iteration using each row's own length:
for (int i = 0; i < jagged.length; i++) {
    for (int j = 0; j < jagged[i].length; j++) { // NOT a fixed number
        System.out.print(jagged[i][j] + " ");
    }
    System.out.println();
}

// 3D array — x, y, z coordinates:
int[][][] cube = new int[3][3][3];
cube[0][1][2] = 42;`,
      visualizerType: "memory"
    },
    {
      id: 43,
      title: "Drawbacks of Arrays",
      intro: "Why arrays are raw and rarely used in enterprise logic without abstractions.",
      explanation: "1. **Fixed size**: `new int[N]` is permanently N elements. Adding an 11th item to a 10-slot array requires: allocate bigger array → copy all elements → insert new. That's O(N) work you must write manually.\n2. **Homogeneous type only**: an `int[]` can only hold ints. You cannot mix types in a primitive array. (An `Object[]` can hold mixed types but loses type safety.)\n3. **No built-in operations**: no built-in search, no sort method on the array object itself, no contains/indexOf. You must use `java.util.Arrays` utility class or Collection API.\n4. **Contiguous memory required**: allocating `new int[1_000_000]` needs 4MB of contiguous heap. On a fragmented heap, this can throw `OutOfMemoryError` even if total free memory exceeds 4MB.\n5. **Runtime bounds checking only**: accessing invalid indices throws `ArrayIndexOutOfBoundsException` at RUNTIME. The compiler does not catch it. Off-by-one bugs only surface when that code path executes.\n6. **Insertion/deletion is O(N)**: inserting in the middle requires shifting all subsequent elements. Java doesn't do this automatically — you must write the shift code or use a `LinkedList` / `ArrayList`.\n7. When arrays ARE the right choice: fixed-size performance-critical data (image pixel buffers, primitive int computation), when size is truly constant (12 months, 7 days), and internally in the JDK's own ArrayList/HashMap implementations.",
      gotchas: [
        "Arrays do NOT resize — `arr[arr.length] = x` is always `ArrayIndexOutOfBoundsException`. `ArrayList` auto-resizes by copying to a 1.5× larger array — use it when the element count varies.",
        "Calling `Arrays.sort(arr)` sorts IN-PLACE and returns void. If you need to preserve the original, copy first: `int[] copy = Arrays.copyOf(arr, arr.length); Arrays.sort(copy);`",
        "Two arrays with equal contents are NOT equal with `==` (reference comparison) or `.equals()` (also reference comparison — inherited from Object). Use `Arrays.equals(a, b)` for 1D and `Arrays.deepEquals(a, b)` for multi-dimensional."
      ],
      interviewQuestions: [
        {
          question: "Why is inserting an element in the middle of an array expensive?",
          answer: "Arrays are contiguous memory blocks. To insert at index i, every element from index i to the end must be shifted one position to the right — O(N) work. Then the new value is placed at index i. This is also why ArrayList.add(index, value) in the middle is O(N)."
        },
        {
          question: "What happens when an ArrayList's internal array runs out of space?",
          answer: "ArrayList allocates a new internal array of 1.5× the current capacity, copies all existing elements into it (O(N)), then adds the new element. The old array is garbage-collected. This amortizes to O(1) average per add — but individual resize operations are O(N). Pre-size with `new ArrayList<>(expectedSize)` to avoid resizes."
        },
        {
          question: "Can you create a generic array in Java, like new T[5]?",
          answer: "No — generic array creation is rejected at compile time due to type erasure. At runtime, T is erased to Object, so `new T[5]` would unsafely be `new Object[5]` with a T[] reference. The workaround is `(T[]) new Object[5]` with an unchecked cast warning — exactly what ArrayList does internally for its backing array."
        }
      ],
      code: `import java.util.Arrays;

int[] arr = {5, 3, 1, 4, 2};

// Sort in-place:
Arrays.sort(arr);
System.out.println(Arrays.toString(arr)); // [1, 2, 3, 4, 5]

// Binary search (array must be sorted first!):
int idx = Arrays.binarySearch(arr, 3); // returns 2

// Equality — MUST use Arrays.equals:
int[] a = {1, 2, 3}, b = {1, 2, 3};
System.out.println(a == b);             // false (refs)
System.out.println(Arrays.equals(a,b)); // true (values)

// Need dynamic size? Use ArrayList:
java.util.ArrayList<Integer> list = new java.util.ArrayList<>();
list.add(10); list.add(20); list.remove(0); // grows/shrinks freely`,
      visualizerType: "memory"
    },
    {
      id: 44,
      title: "Array of Objects",
      intro: "Holding complex models in arrays.",
      explanation: "1. You can create an array where each slot stores an object reference: `Student[] students = new Student[5]`.\n2. This allocates an array of **5 null reference slots** — NOT 5 Student objects. Each slot holds `null` until you assign a real Student to it.\n3. You must explicitly instantiate each element: `students[0] = new Student(\"Alice\", 90);` — this creates the Student on the heap and stores its address in slot 0.\n4. Internally, the array stores 5 memory addresses (references). The actual Student objects live elsewhere on the heap, pointed to by those addresses.\n5. Object arrays support **polymorphism**: an `Animal[]` can hold `Cat` and `Dog` references (both extend Animal). At runtime, the JVM dispatches method calls to the actual object type.\n6. In JS, `let arr = new Array(5)` creates 5 `undefined` slots — the same null placeholder concept. Java's null references are the typed equivalent.\n7. Common pattern: allocate the array, then fill it in a constructor loop: `for (int i = 0; i < students.length; i++) students[i] = new Student(i);`",
      gotchas: [
        "Calling any method on an uninstantiated slot — `students[0].getName()` when `students[0]` is still `null` — throws `NullPointerException`. Always instantiate each slot before using it.",
        "An `Animal[]` can hold `Dog` objects (valid upcast). But pulling an element back out with `(Dog) animals[0]` when that slot holds a `Cat` throws `ClassCastException` at runtime. Always use `instanceof` before downcasting.",
        "Printing an uninstantiated object array slot with `System.out.println(students[0])` prints `null` (if slot is unset) or a memory address like `Student@7852e922` (if set but toString() not overridden). Override `toString()` in your class for meaningful output."
      ],
      interviewQuestions: [
        {
          question: "What does 'Student[] students = new Student[3]' actually do in memory?",
          answer: "It allocates one array object on the heap containing 3 reference slots, each initialized to null. No Student objects are created. The array stores pointers/addresses, not the Student objects themselves. You must separately call 'new Student(...)' for each slot."
        },
        {
          question: "Can an Animal[] store objects of subclasses like Dog and Cat?",
          answer: "Yes — an array of a supertype can hold references to any subtype. This is called array covariance. Animal[] arr = {new Dog(), new Cat()} is valid. At runtime, each slot holds the actual subtype reference; polymorphic method calls dispatch to the actual overridden method."
        },
        {
          question: "What is array covariance and what problem does it cause?",
          answer: "Array covariance means String[] is treated as a subtype of Object[], so `Object[] arr = new String[]` compiles. The problem: you can then assign `arr[0] = new Integer(5)` which compiles but throws ArrayStoreException at runtime — the JVM type-checks every array store against the actual array type. Generic collections (List<String>) catch this at compile time instead, making them safer."
        }
      ],
      code: `class Student {
    String name; int grade;
    Student(String n, int g) { name = n; grade = g; }
    public String toString() { return name + ":" + grade; }
}

// Allocates 3 null reference slots — no Student objects yet:
Student[] roster = new Student[3];

// Must instantiate each slot explicitly:
roster[0] = new Student("Alice", 90);
roster[1] = new Student("Bob", 85);
// roster[2] is still null!

System.out.println(roster[0]); // Alice:90 (toString called)
// roster[2].grade → NullPointerException!`,
      visualizerType: "memory"
    },
    {
      id: 45,
      title: "Enhanced For Loop",
      intro: "Read-only syntax. Cleaner loops without counter boilerplate.",
      explanation: "1. Syntax: `for (Type element : arrayOrCollection) { body }` — gives you each element directly, no index counter to manage, no off-by-one risk.\n2. On arrays: the compiler translates this into a standard indexed for loop under the hood — `for (int i = 0; i < arr.length; i++)` with `element = arr[i]`.\n3. On Collections/Iterables: compiles to Iterator calls — `hasNext()` + `next()` are automatically called behind the scenes.\n4. Any class implementing `Iterable<T>` (all Java Collection types: List, Set, Queue, Deque) supports for-each. You can make your own class iterable by implementing `Iterable<T>` and providing an `iterator()` method.\n5. Trade-offs: **no index access** and **cannot safely modify the collection** during iteration — but eliminates boilerplate and reduces bugs.\n6. For primitive arrays, the loop variable is a COPY of the element value — assigning to it does NOT modify the original array element.\n7. In JS, `for...of` is the direct equivalent — iterates values of any iterable. Java's enhanced for loop predates `for...of` by years and inspired similar features across languages.",
      gotchas: [
        "For-each is read-only for arrays. `for (int n : nums) { n = 0; }` sets only the local copy — the original `nums` array is unchanged. Use an indexed `for` loop to modify array elements in-place.",
        "Modifying a collection (adding or removing elements) during for-each iteration throws `ConcurrentModificationException`. ArrayList tracks a modCount; the iterator checks it on each call to next(). Fix: use `Iterator.remove()`, `List.removeIf(predicate)`, or collect items to delete then remove after the loop.",
        "For-each cannot iterate backwards or skip elements. For reverse traversal (`i = arr.length-1; i >= 0; i--`) or every-other-element access, you need a classic indexed for loop."
      ],
      interviewQuestions: [
        {
          question: "Can we use an Enhanced For loop to delete elements from an ArrayList?",
          answer: "No — removing elements during for-each iteration throws ConcurrentModificationException. The ArrayList's modCount is checked on each iterator.next() call. Use Iterator.remove() for safe single-element deletion during traversal, or List.removeIf(predicate) for bulk conditional removal."
        },
        {
          question: "How does the enhanced for loop work internally for Collections?",
          answer: "The compiler translates `for (T item : collection)` into an Iterator-based loop: it calls collection.iterator() to get an Iterator, then loops calling iterator.hasNext() and iterator.next() until done. Any class implementing Iterable<T> — including custom classes — gets for-each support automatically."
        },
        {
          question: "When would you prefer a traditional indexed for loop over the enhanced for loop?",
          answer: "Use indexed for when: you need the index (comparing adjacent elements, modifying elements in-place), iterating two arrays in parallel with matching indices, iterating backwards (i = length-1 down to 0), or iterating only a subset (skip first N elements). Enhanced for-each is ideal for clean sequential read-only access to every element."
        }
      ],
      code: `int[] numbers = {10, 20, 30, 40};

// Enhanced for — clean read, no index management:
for (int val : numbers) {
    System.out.println(val);
    // val is a COPY — modifying it won't change numbers[]
}

// Common mistake — this does NOT modify the array:
for (int n : numbers) { n = 0; }
System.out.println(numbers[0]); // still 10!

// Need to modify? Use indexed for:
for (int i = 0; i < numbers.length; i++) { numbers[i] = 0; }

// Works on any Collection (Iterable):
java.util.List<String> names = java.util.List.of("Alice","Bob");
for (String name : names) { System.out.println(name); }`,
      visualizerType: "jvm"
    },
    {
      id: 46,
      title: "What Is a String?",
      intro: "Sequence of characters. The most important object in Java.",
      explanation: "1. In Java, `String` is a **class** in `java.lang` (not a primitive). Internally, a String object wraps a `byte[]` (Java 9+ compact strings) or `char[]` (pre-Java 9) plus metadata.\n2. String literals like `\"hello\"` are stored in the **String Constant Pool (SCP)** — a cache inside the JVM heap. Before creating a new pool entry, the JVM checks if that value already exists. If yes, it returns the existing reference.\n3. This pool behavior means: `String a = \"hello\"; String b = \"hello\"; a == b` is **true** — both point to the SAME pooled object. This is unique to literal-created Strings.\n4. `String s = new String(\"hello\")` bypasses the pool entirely — creates a brand new heap object every time, regardless of whether the pool already has it.\n5. `intern()` method manually pushes a String into the SCP and returns the pooled reference. Used when you get strings from external sources (files, network) and want pool reuse.\n6. In JS, strings are primitive values (`typeof \"hello\" === \"string\"`). In Java, strings are objects — but Java developers incorrectly use `==` (reference comparison) instead of `.equals()` (content comparison). This is the #1 Java beginner mistake.\n7. Strings are **immutable** — every method that appears to modify (`toUpperCase()`, `trim()`, `replace()`) actually returns a brand new String object. The original is untouched.",
      gotchas: [
        "NEVER compare Strings with `==`. `==` compares memory addresses. `\"hello\" == new String(\"hello\")` is `false` even though both contain the same letters. Always use `.equals()` or `.equalsIgnoreCase()` for content comparison.",
        "`new String(\"hello\")` creates TWO objects: one in the String Pool AND one in the regular heap. The variable points to the heap copy — the pool copy is wasted. Avoid `new String(...)` in production code.",
        "Calling `.equals()` on a null String variable throws `NullPointerException`. Safe pattern: put the known-non-null value on the LEFT — `\"expected\".equals(userInput)` — so even if `userInput` is null, no NPE is thrown."
      ],
      interviewQuestions: [
        {
          question: "What is the String Constant Pool (SCP) and how does it work?",
          answer: "The SCP is a cache in the JVM heap. When a String literal is evaluated, the JVM checks if that value already exists in the pool. If yes, it returns the existing reference (same object reused). If no, it creates a new entry. Two literal variables with the same value share one pooled object, which is why == returns true for same-content literals."
        },
        {
          question: "Why does 'new String(\"hello\") == \"hello\"' return false?",
          answer: "\"hello\" returns the SCP-pooled reference. new String(\"hello\") creates a brand new object in the regular heap, bypassing the pool entirely. The two variables point to different memory addresses, so == (reference comparison) returns false. Use .equals() for content comparison always."
        },
        {
          question: "Why should you put the known-non-null string on the LEFT in .equals() comparisons?",
          answer: "If your string variable is null and you call variable.equals(\"expected\"), Java throws NullPointerException — you're calling a method on null. Writing \"expected\".equals(variable) instead means the known literal is always the receiver — it's never null, so no NPE even if the variable is null. This is standard defensive null-safe comparison."
        }
      ],
      code: `// String literal → goes to String Constant Pool:
String s1 = "Java";
String s2 = "Java";
System.out.println(s1 == s2);      // true  — same pool reference!

// new String() → bypasses pool, creates heap object:
String s3 = new String("Java");
System.out.println(s1 == s3);      // false — different heap address!
System.out.println(s1.equals(s3)); // true  — same content ✓

// Safe null-tolerant comparison:
String input = null;
System.out.println("Java".equals(input)); // false — no NPE!
// System.out.println(input.equals("Java")); // NullPointerException!`,
      visualizerType: "string-pool"
    },
    {
      id: 47,
      title: "Mutable vs. Immutable Strings",
      intro: "Why modifying a String creates a new object and floods memory.",
      explanation: "1. **Immutability**: once a String object is created on the heap, its internal byte content **cannot be changed**. The internal byte array is `private final` — nothing can modify it after construction.\n2. When you write `s = s + \" World\"`, Java does NOT touch the original String. It creates a brand new String object with the concatenated content and reassigns `s` to point to it. The old String is now garbage.\n3. **Why immutable?** Three key reasons: (a) **Thread safety** — immutable objects need no synchronization, multiple threads can share the same String safely. (b) **Security** — database URLs, file paths, and credentials passed as Strings can't be silently altered mid-flight. (c) **SCP efficiency** — pooling requires that all references to a pooled String always see the same content; mutability would break this.\n4. **Performance trap**: concatenating in a loop with `+` creates one garbage String per iteration. 1,000 iterations = 1,000 temporary objects, O(N²) total character copies, GC pressure spikes.\n5. **Solution**: `StringBuilder` (single-threaded, fast) or `StringBuffer` (thread-safe, slower) — both use a mutable internal byte array that grows as needed.\n6. In JS, strings are also immutable — `\"hello\"[0] = 'H'` silently does nothing in non-strict mode. Both languages share the immutable string design for thread safety and caching.\n7. String methods like `concat()`, `toUpperCase()`, `trim()`, `replace()`, `substring()` ALL return new String objects. If you don't capture the return value, the result is immediately garbage-collected.",
      gotchas: [
        "`s.concat(\" World\")` returns a new String and does NOT modify `s`. This catches everyone: `s.toUpperCase(); System.out.println(s);` — s is UNCHANGED. You must reassign: `s = s.toUpperCase();`",
        "String concatenation inside a loop is O(N²). Each `result += item` creates a new String by copying ALL previous characters plus the new one. For 10,000 iterations, this is 50 million character copies. Use `StringBuilder.append()` in loops.",
        "`String.format()` and `String.valueOf()` create new String objects on every call. In high-frequency paths (logging in a tight loop, per-request serialization), replace them with a pre-allocated StringBuilder."
      ],
      interviewQuestions: [
        {
          question: "Why are String objects immutable in Java?",
          answer: "Three reasons: (1) Security — strings used as database URLs, file paths, and credentials can't be altered after passing to a method, preventing injection-style bugs. (2) Thread safety — immutable objects need no synchronization, safe to share across threads without locks. (3) String Pool efficiency — pooling only works if two references to the same value always see the same content; mutability would make it unsafe."
        },
        {
          question: "What is the performance problem with String concatenation in a loop?",
          answer: "Each `result += item` creates a new String object by copying all previous content (growing linearly). For N iterations with average item length L, total characters copied = 0+L+2L+...+(N-1)L = O(N²). With 10,000 iterations, that's ~50 million character copies and 10,000 garbage objects. Use StringBuilder.append() instead — O(N) total."
        },
        {
          question: "What is the difference between String, StringBuilder, and StringBuffer?",
          answer: "String: immutable, thread-safe by nature (no state changes), pooled. StringBuilder: mutable char array, NOT thread-safe, fastest — use for single-threaded building. StringBuffer: mutable, thread-safe via synchronized methods, slower — use only when threads share the same buffer. In practice: 95% of cases use StringBuilder."
        }
      ],
      code: `String s = "Hello";
s.concat(" World");       // returns new String — s unchanged!
System.out.println(s);   // "Hello"

s = s + " World";        // creates new String, reassigns s
System.out.println(s);   // "Hello World"

// Loop concatenation — O(N²), creates 1000 garbage Strings:
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i; // BAD: new String every iteration
}

// StringBuilder — O(N), one mutable buffer:
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i); // GOOD: modifies buffer in place
}
String finalResult = sb.toString(); // single String at the end`,
      visualizerType: "string-pool"
    },
    {
      id: 48,
      title: "StringBuffer and StringBuilder",
      intro: "The cure for String immutability performance hits.",
      explanation: "1. Both `StringBuilder` and `StringBuffer` provide **mutable sequences of characters** — you can append, insert, delete, and reverse content without creating garbage String objects.\n2. **Internal structure**: they use a resizable `char[]` buffer starting at capacity 16. When it fills, the buffer grows to `(current_capacity × 2) + 2` — the same doubling strategy as ArrayList.\n3. **StringBuilder** (Java 5+): NOT synchronized, no thread-safety overhead — fastest option for single-threaded use. Use this for all local method-level string building.\n4. **StringBuffer** (Java 1.0): every method is `synchronized` — thread-safe but adds locking overhead on every operation. Use ONLY when multiple threads share and mutate the SAME buffer object (rare).\n5. Key methods: `.append(x)` adds to end (accepts any type), `.insert(idx, x)` inserts at position, `.delete(start, end)` removes a range, `.reverse()` flips the content, `.toString()` creates the final immutable String.\n6. **Fluent chaining**: every method returns `this`, so you can chain: `sb.append(\"Hello\").append(\" \").append(\"World\").reverse();`\n7. Pre-sizing tip: `new StringBuilder(expectedSize)` avoids resize copies. If you know you'll build ~200 chars, use `new StringBuilder(200)` to skip the repeated doubling.",
      gotchas: [
        "Calling `sb.toString()` inside every iteration of a loop defeats the purpose — it creates a new immutable String every time. Call `toString()` ONCE at the very end after all appends are complete.",
        "StringBuffer's synchronization applies per method call, not across multiple calls. `sb.append(a); sb.append(b);` from two threads can still interleave — you need external synchronized blocks for compound operations.",
        "The Java compiler automatically uses a StringBuilder for `\"a\" + b + c` in a SINGLE expression. But inside a loop, it creates a NEW StringBuilder per iteration — it does NOT hoist it outside. For loop-based building, always manually declare the StringBuilder before the loop."
      ],
      interviewQuestions: [
        {
          question: "Differentiate between String, StringBuffer, and StringBuilder.",
          answer: "String: immutable, new object on every 'change'. StringBuffer: mutable, thread-safe via synchronized methods, slower. StringBuilder: mutable, NOT thread-safe, fastest. Rule: String for constants/literals, StringBuilder for single-threaded building, StringBuffer only when multiple threads share one mutable buffer — which is rare."
        },
        {
          question: "How does StringBuilder grow internally when its buffer fills up?",
          answer: "StringBuilder's internal char[] starts at capacity 16. When an append() would exceed current capacity, it allocates a new array of size (oldCapacity × 2) + 2, copies all existing content, then appends the new data. The old array is garbage-collected. Pre-sizing with `new StringBuilder(expectedSize)` avoids all resize copies."
        },
        {
          question: "Why doesn't the Java compiler automatically optimize String concatenation inside loops?",
          answer: "The compiler converts `a + b + c` in a single expression into one StringBuilder with multiple appends. But in a loop, each iteration looks syntactically independent — the compiler generates a new StringBuilder per iteration. To optimize, manually declare `StringBuilder sb = new StringBuilder()` OUTSIDE the loop and call sb.append() inside."
        }
      ],
      code: `// StringBuilder — single-threaded, fastest:
StringBuilder sb = new StringBuilder(64); // pre-size buffer
sb.append("Hello");
sb.append(", ").append("World"); // fluent chaining
sb.insert(5, "!");               // "Hello!, World"
sb.delete(5, 6);                 // "Hello, World"
sb.reverse();                    // "dlroW ,olleH"
System.out.println(sb.toString()); // call toString() ONCE at end

// Manual loop building (the right way):
StringBuilder csv = new StringBuilder();
String[] items = {"Alice", "Bob", "Charlie"};
for (String item : items) {
    if (csv.length() > 0) csv.append(",");
    csv.append(item);
}
System.out.println(csv); // Alice,Bob,Charlie`,
      visualizerType: "string-pool"
    }
  ]
};
