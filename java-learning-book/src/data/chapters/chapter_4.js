export default {
  id: 4,
  title: "Objects, Memory & Methods",
  range: "33-38",
  concepts: [
    {
      id: 33,
      title: "Class and Object Theory",
      intro: "Classes are blueprints. Objects are actual physical structures created from them.",
      explanation: "1. A **Class** is a blueprint — it defines what data (fields) and behavior (methods) its objects will have. No memory is allocated for fields when you write the class.\n2. An **Object** is an instance of a class — created with `new`, it occupies actual bytes on the heap. Each object gets its own copy of instance fields.\n3. JVM memory split: the **heap** stores all objects and their field values; the **stack** stores local variable references that point to those heap objects.\n4. Two objects of the same class are completely independent — changing one never affects the other, even though they share the same blueprint.\n5. Java is 100% object-oriented (except primitives). Every string, array, and collection you use is a class instance living on the heap.\n6. In JS, objects are plain dictionaries `{}` created at runtime with no enforced blueprint. Java classes are stricter — you declare the structure first, then the compiler enforces it at every usage.\n7. Classes enable **modeling the real world**: a `BankAccount` class has `balance` field + `deposit()` method — the blueprint mirrors how the real thing works.",
      gotchas: [
        "Writing `class Dog {}` does NOT allocate any memory. Memory is only allocated when you write `new Dog()`. Confusing declaration with instantiation is a common early mistake.",
        "Assigning one object variable to another copies the *reference* (the arrow/pointer), not the object itself. `Dog d2 = d1;` means both variables point to the same heap object — changing d2.name also changes d1.name.",
        "Instance fields have automatic default values (0, false, null) once instantiated. But local variables inside methods do NOT get defaults — using one uninitialized causes a compile error."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between a class and an object in Java?",
          answer: "A class is a compile-time blueprint that defines fields and methods — it takes no heap memory itself. An object is a runtime instance created with 'new' that occupies actual heap memory and holds its own copy of instance field values."
        },
        {
          question: "Where are objects and their fields stored in JVM memory?",
          answer: "Objects (and their instance fields) are stored on the heap. Stack frames store local variables and object references — those references are just addresses pointing to the actual heap objects. Primitives declared as local variables live on the stack directly."
        },
        {
          question: "What is the difference between an instance variable and a static variable?",
          answer: "Instance variables belong to each object — every 'new' creates a separate copy. Static variables belong to the class itself — one copy shared across all instances. Changing a static variable through any object changes it for everyone."
        }
      ],
      code: `class Dog {
    String name;    // instance field — each Dog gets its own
    int age;

    void bark() {
        System.out.println(name + " says: Woof!");
    }
}

Dog d1 = new Dog();   // allocates heap memory
d1.name = "Rocky";
Dog d2 = d1;          // copies reference, NOT the object
d2.name = "Bruno";
System.out.println(d1.name); // Bruno! Same object.`,
      visualizerType: "memory"
    },
    {
      id: 34,
      title: "Class and Object Practical",
      intro: "Instantiating classes and invoking methods.",
      explanation: "1. The `new` keyword triggers the constructor, allocates heap memory for all instance fields, and returns a **reference** to that memory location.\n2. The **dot operator** (`.`) lets you navigate from a reference to the object's fields or methods: `dog.name`, `dog.bark()`.\n3. Each call to `new` creates a *separate* object — `new Dog()` twice gives you two independent heap objects.\n4. If you never store the returned reference (`new Dog();` alone), the object is immediately eligible for Garbage Collection.\n5. You can pass object references to methods — inside the method you can modify the object's fields, but reassigning the parameter variable to a new object won't affect the caller's reference.\n6. In JS, you can add properties to any object dynamically (`dog.color = 'brown'` works anywhere). Java won't compile a field access unless that field is declared in the class — the structure is fixed at compile time.\n7. Best practice: group related fields + methods in one class. `Car` owns `speed` field and `accelerate()` method — not split across separate classes.",
      gotchas: [
        "Forgetting `new` gives you a `null` reference, not an object. Calling any method or field on `null` throws `NullPointerException` at runtime — Java's most common crash.",
        "Passing an object reference into a method gives the method a COPY of the reference address. It can modify the object's fields via that copy (heap mutation), but reassigning the parameter to `new Dog()` inside the method does nothing to the original caller variable.",
        "Two object variables are equal with `==` only if they point to the SAME heap address. For value equality (same name, same age), you must override `equals()`. This trips up JS developers who expect `==` to compare content."
      ],
      interviewQuestions: [
        {
          question: "What does the 'new' keyword do in Java?",
          answer: "It allocates memory on the heap for a new object, initializes all instance fields to their default values, runs the constructor body, and returns a reference to the allocated memory. Without 'new', you only have a null reference."
        },
        {
          question: "If Dog b = a; and then b is reassigned to new Dog() — does 'a' change?",
          answer: "No. Reassigning 'b' to a new object only changes where the local variable 'b' points — it does not affect 'a'. 'a' still points to the original heap object. Only modifying fields through 'b' while both point to the same object would affect 'a'."
        },
        {
          question: "Is Java pass-by-value or pass-by-reference for objects?",
          answer: "Java is strictly pass-by-value. For objects, the VALUE passed is a copy of the reference (memory address). The method can use that copied address to modify the heap object's fields, which the caller sees. But reassigning the parameter variable to a new object inside the method does NOT change the caller's variable."
        }
      ],
      code: `class Calculator {
    int result = 0;

    void add(int n) { result += n; }
}

Calculator c1 = new Calculator();
Calculator c2 = new Calculator(); // separate object

c1.add(10);
c2.add(99);

System.out.println(c1.result); // 10
System.out.println(c2.result); // 99 — completely independent`,
      visualizerType: "memory"
    },
    {
      id: 35,
      title: "JDK, JRE, and JVM",
      intro: "The Holy Trinity of Java execution.",
      explanation: "1. **JVM (Java Virtual Machine)** — the runtime engine. Takes compiled `.class` bytecode and executes it. It is platform-dependent (different JVM for Windows/Mac/Linux), which is what makes *bytecode* platform-independent.\n2. **JRE (Java Runtime Environment)** = JVM + core class libraries (java.lang, java.util, java.io…). All you need to *run* Java programs. Deployed on servers that run but don't compile Java.\n3. **JDK (Java Development Kit)** = JRE + `javac` compiler + `jar` packager + `jdb` debugger + `javadoc` generator. Everything you need to *write and compile* Java code.\n4. Compilation flow: `.java` source → `javac` → `.class` bytecode → JVM reads bytecode → JIT compiler converts hot paths to native machine code at runtime.\n5. **JIT (Just-In-Time) compiler** is inside the JVM — it identifies frequently-run bytecode ('hot spots') and compiles them to native CPU instructions for massive speed gains.\n6. In JS: code runs in the V8 engine (Node/Chrome) directly. No separate compile step; V8 JITs the JS source. Java has an explicit compile step first (`javac`), then JIT inside the JVM at runtime.\n7. Java 11+ ships **JRE-less** — you bundle only the modules you need using `jlink`, producing a custom minimal runtime.",
      gotchas: [
        "JVM is platform-DEPENDENT — each OS needs its own JVM build. What's platform-INDEPENDENT is the bytecode (.class files). 'Write once, run anywhere' means the bytecode runs on any JVM, not that the JVM itself is universal.",
        "If a machine has only JRE (not JDK), users can run compiled Java programs but cannot compile .java source files. Installing JDK automatically includes JRE — but JRE alone does not include javac.",
        "PermGen memory (Java 7 and below) stored class metadata and static variables. Java 8 replaced PermGen with Metaspace, which grows dynamically in native memory and eliminates OutOfMemoryError: PermGen space errors. Interviewers ask this."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between JDK, JRE, and JVM?",
          answer: "JVM executes bytecode and is platform-dependent. JRE = JVM + class libraries needed to run Java apps. JDK = JRE + compiler (javac) + dev tools needed to build Java apps. JDK contains JRE which contains JVM."
        },
        {
          question: "Is JVM platform independent?",
          answer: "No — JVM itself is platform-dependent. A different JVM binary exists for Windows, macOS, and Linux. What is platform-independent is the bytecode (.class files) — the same bytecode runs on any JVM on any OS. This is the core 'Write Once, Run Anywhere' promise."
        },
        {
          question: "What is JIT compilation and why does it matter for performance?",
          answer: "JIT (Just-In-Time) is a component inside the JVM that monitors which bytecode methods run frequently ('hot spots') and compiles them to native machine code at runtime. Subsequent calls execute native code directly — far faster than interpreting bytecode line by line. This is why Java performance rivals C++ for long-running server applications."
        }
      ],
      code: `// Compilation + execution flow:
// 1. Write:   Hello.java  (source code)
// 2. Compile: javac Hello.java  → Hello.class (bytecode)
// 3. Run:     java Hello        → JVM loads + JIT-compiles hot paths

// JDK tools:
//   javac    — compiler (.java → .class)
//   java     — JVM launcher (runs .class)
//   jar      — packages classes into .jar archives
//   jdb      — debugger
//   javadoc  — generates HTML API docs`,
      visualizerType: "jvm"
    },
    {
      id: 36,
      title: "Methods",
      intro: "What objects do: behavior and logic capsules.",
      explanation: "1. A **method** is a named block of code that performs a task. It encapsulates behavior so you can call it by name instead of copy-pasting logic.\n2. Syntax: `accessModifier returnType methodName(paramType paramName, ...) { body }`\n3. **Return type**: `void` means nothing is returned. Any other type means the method MUST return that type via a `return` statement — the compiler enforces this on every code path.\n4. **Parameters vs Arguments**: parameters are the variable names in the method definition (`int a`); arguments are the actual values passed when calling (`add(5, 10)`).\n5. **Pass-by-value for primitives**: a copy of the value is passed. Changes inside the method do NOT affect the caller's variable.\n6. **Pass-by-value for objects**: a copy of the reference address is passed. The method CAN modify the object's internal fields (caller sees changes), but reassigning the parameter to `new Dog()` does NOT affect the caller's variable.\n7. In JS, functions are first-class citizens and can be passed anywhere. In Java, methods belong to classes — you can't detach them. Java 8 lambda expressions are the closest equivalent to passing functions as data.",
      gotchas: [
        "Java is strictly pass-by-value. For primitives: `void setAge(int a) { a = 30; }` — changing `a` inside the method does nothing to the caller's variable.",
        "For object references: `void rename(Dog d) { d.name = \"Max\"; }` modifies the heap object — caller SEES the change. But `void replace(Dog d) { d = new Dog(); }` does NOT affect the caller — you only changed your local copy of the reference.",
        "A method with a non-void return type must return a value on EVERY code path. If an `if` branch doesn't return, the compiler throws 'missing return statement'. Add an `else` branch or a final return after the condition."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between parameters and arguments in Java?",
          answer: "Parameters are the variable names declared in the method signature — they are placeholders. Arguments are the actual values or expressions passed when calling the method. In `void add(int a, int b)`, 'a' and 'b' are parameters. In `add(5, 10)`, 5 and 10 are arguments."
        },
        {
          question: "Does Java support pass-by-reference?",
          answer: "No, Java is strictly pass-by-value. For primitives, the value itself is copied. For objects, a copy of the reference (memory address) is passed. The method can modify the object's fields using that copy, but cannot change what the caller's variable points to."
        },
        {
          question: "Can a method return multiple values in Java?",
          answer: "Not directly — a method has one return type. Common workarounds: return an array or List, return a custom object or record holding multiple fields, or use a Map.Entry pair. For simple cases, a small record or array is cleanest."
        }
      ],
      code: `class MathUtils {
    int add(int a, int b) { // a, b are parameters
        return a + b;       // must return int on all paths
    }

    void printDouble(int x) {
        System.out.println(x * 2); // void = no return needed
    }
}

MathUtils m = new MathUtils();
int result = m.add(5, 10); // 5, 10 are arguments → result = 15`,
      visualizerType: "memory"
    },
    {
      id: 37,
      title: "Method Overloading",
      intro: "Same name, different signatures. Compile-time polymorphism.",
      explanation: "1. **Method overloading** = defining multiple methods with the same name but different parameter lists (number of params, types, or order of types).\n2. The compiler picks the right method at **compile time** based on the argument types you pass — this is called **static binding** or **compile-time polymorphism**.\n3. **What creates a valid overload**: changing parameter count, changing parameter types, changing parameter order.\n4. **What does NOT create a valid overload**: changing only the return type. `int add(int a)` vs `double add(int a)` is a compile error — the compiler can't distinguish calls that ignore the return value.\n5. Java performs **widening promotion** when no exact match exists: calling `print(5)` where only `print(double d)` exists will auto-promote `5` (int) to 5.0 (double).\n6. JS functions accept any number of arguments with no enforced signature. Java enforces exact signature matching at compile time, making API contracts explicit and self-documenting.\n7. Overloading is how Java provides convenience APIs: `System.out.println(int)`, `println(String)`, `println(double)` — same name, different input types, right behavior each time.",
      gotchas: [
        "Changing ONLY the return type does NOT overload a method — it is a compile error. The compiler cannot distinguish `int calc(int x)` from `double calc(int x)` when you write `calc(5)` without using the result.",
        "Widening promotion can cause unexpected method selection. If you have `print(int)` and `print(long)`, calling `print(5)` selects `print(int)` (exact). But calling `print(5L)` selects `print(long)`. Mixing int and long arguments in one call may force promotion to double if no exact match exists.",
        "Overloading resolution happens at compile time based on the REFERENCE TYPE, not the runtime object type. `Animal a = new Dog(); call(a)` selects `call(Animal)` even if `call(Dog)` exists — unlike overriding, which is resolved at runtime."
      ],
      interviewQuestions: [
        {
          question: "Why does changing only the return type not overload a method?",
          answer: "The compiler resolves overloads at the call site based on argument types. If you call `calc(5)` without using the result, the compiler cannot know which return type you intended. This ambiguity means return-type-only differences are rejected as a compile error."
        },
        {
          question: "What is the difference between method overloading and method overriding?",
          answer: "Overloading: same class, same name, different parameter list — resolved at compile time (static binding). Overriding: subclass redefines a parent's method with identical signature — resolved at runtime (dynamic binding). Overloading is compile-time polymorphism; overriding is runtime polymorphism."
        },
        {
          question: "What happens if you call an overloaded method with arguments that don't exactly match any signature?",
          answer: "Java applies widening type promotion to find the nearest compatible overload: byte→short→int→long→float→double. If still ambiguous (two overloads are equally close), the compiler throws an ambiguous method call error. No implicit narrowing is applied."
        }
      ],
      code: `class Printer {
    void print(String s)  { System.out.println("String: " + s); }
    void print(int n)     { System.out.println("Int: " + n); }
    void print(double d)  { System.out.println("Double: " + d); }

    // INVALID — return type alone does not overload:
    // double print(int n) { return n; } // compile error!
}

Printer p = new Printer();
p.print("Hello"); // → String: Hello
p.print(42);      // → Int: 42
p.print(3.14);    // → Double: 3.14`,
      visualizerType: "jvm"
    },
    {
      id: 38,
      title: "Stack and Heap",
      intro: "The battleground of memory management.",
      explanation: "1. **Stack**: holds method execution frames. Each method call pushes a frame containing local variables + the return address. When the method returns, the frame is popped and memory freed instantly. LIFO order. Stack size is fixed per thread (~512KB–1MB by default).\n2. **Heap**: stores all objects created with `new`. Shared across all threads. Managed by the Garbage Collector — objects live until no references point to them.\n3. **What lives where**: primitive local variables → stack. Object references (variables like `Dog d`) → stack. The actual object (`new Dog()`) → heap. Instance fields inside an object → heap (they live inside the heap object).\n4. **Garbage Collection** automatically frees heap objects with no live references. You cannot manually free memory in Java (unlike C++ `delete`). GC pauses are the main source of Java latency spikes.\n5. **StackOverflowError** happens when recursion goes too deep — the call stack runs out of space. **OutOfMemoryError: Java heap space** happens when the heap is exhausted (too many live objects).\n6. In JS, the V8 engine also has a call stack and heap with GC — the model is essentially the same. Key difference: Java's GC is more tunable (G1, ZGC, Shenandoah) for high-throughput server workloads.\n7. Practical rule: keep methods shallow (less stack pressure) and avoid holding large objects in long-lived fields (reduces heap pressure and GC work).",
      gotchas: [
        "Object references (variables like `Dog d`) live on the stack. But the actual OBJECT (`new Dog()`) always lives on the heap. 'Where is this variable?' and 'where is this object?' have different answers.",
        "Deep recursion causes StackOverflowError even with plenty of heap space. Each recursive call adds a frame to the stack. With default stack size ~512KB, you can overflow in ~5,000–10,000 frames depending on local variable count.",
        "String literals live in the String Constant Pool — a special region of the heap (since Java 7+; it was in PermGen before). This is NOT the regular heap allocation done by 'new'. Two literals with the same content share one pooled object, which is why `\"hello\" == \"hello\"` returns true."
      ],
      interviewQuestions: [
        {
          question: "Compare Stack and Heap memory in Java.",
          answer: "Stack: per-thread, LIFO, holds method frames and local variables, automatically freed when method returns, fixed size, very fast. Heap: shared across threads, holds all objects, managed by GC, grows dynamically, slower allocation. A reference variable lives on the stack; the object it points to lives on the heap."
        },
        {
          question: "What is the difference between StackOverflowError and OutOfMemoryError?",
          answer: "StackOverflowError: the call stack depth exceeded its fixed limit — typically caused by infinite or very deep recursion. OutOfMemoryError: the heap cannot allocate a new object because all available heap space is consumed by live references. One is a stack issue; the other is a heap issue."
        },
        {
          question: "Can a Java program run out of stack space but still have plenty of heap?",
          answer: "Yes. Stack and heap are independent memory regions with separate size limits. Unbounded recursion exhausts the stack (StackOverflowError) even if gigabytes of heap remain. Configure independently: -Xss controls stack size per thread; -Xmx controls max heap size."
        }
      ],
      code: `void example() {
    int x = 5;            // x lives on the STACK (primitive local)
    Dog d = new Dog();    // reference 'd' on stack; Dog object on HEAP
    d.name = "Max";       // 'name' field lives inside the heap object
}   // method returns → frame popped → x and 'd' freed; Dog GC-eligible

// Deep recursion → StackOverflowError even with 8GB heap:
void recurse() { recurse(); } // each call adds a frame — stack fills`,
      visualizerType: "memory"
    }
  ]
};
