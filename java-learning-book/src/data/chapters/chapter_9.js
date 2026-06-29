export default {
  id: 9,
  title: "Advanced OOP: Abstract, Interfaces & Lambdas",
  range: "78-92",
  concepts: [
    {
      id: 78,
      title: "Abstract Keyword",
      intro: "Incomplete classes. Enforcing rules for subclasses.",
      explanation: "An `abstract` class cannot be instantiated. It can contain abstract methods (methods without a body) which MUST be implemented by subclasses. It acts as a templates.",
      gotchas: [
        "An abstract class can contain constructors! They are called by subclasses using `super()` during instantiation."
      ],
      interviewQuestions: [
        {
          question: "Can an abstract class be declared final?",
          answer: "No. Abstract classes rely on inheritance to be subclassed and implemented. Final forbids inheritance. This is a logical contradiction and fails compilation."
        }
      ],
      code: `abstract class Vehicle {
    abstract void accelerate();
    void stop() { System.out.println("Stopped"); }
}`,
      visualizerType: "dispatch"
    },
    {
      id: 79,
      title: "Inner Class",
      intro: "Classes inside classes. Grouping classes logically.",
      explanation: "Java allows you to nest classes. Non-static nested class is called an Inner Class. It has access to all fields (including private) of the outer class.",
      gotchas: [
        "To instantiate a non-static inner class, you must first create an instance of the outer class: `Outer.Inner in = new Outer().new Inner();`."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between inner class and static nested class?",
          answer: "Inner class has an implicit reference to the outer class instance, occupying extra memory. Static nested class doesn't reference outer instance and behaves like a top-level class."
        }
      ],
      code: `class Outer {
    class Inner {
        void msg() { System.out.println("Inner class!"); }
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 80,
      title: "Anonymous Inner Class",
      intro: "One-shot inline class implementation.",
      explanation: "A nested class declared without a name. It allows declaring and instantiating a class simultaneously. Ideal for overriding class methods or interface implementation on the fly.",
      gotchas: [
        "Anonymous inner classes cannot define constructors since they have no name. They can only access final or effectively final local variables of the outer scope."
      ],
      interviewQuestions: [
        {
          question: "Why can anonymous inner classes only access 'final' or 'effectively final' local variables?",
          answer: "Because the inner class runs in a copy of the variable on the heap. If variables could change, the outer and inner copies would go out of sync. Java prevents this mismatch."
        }
      ],
      code: `Animal dog = new Animal() {
    @Override
    void makeNoise() { System.out.println("Woof"); }
}; // Ends with semicolon!`,
      visualizerType: "memory"
    },
    {
      id: 81,
      title: "Abstract and Anonymous Inner Class",
      intro: "Creating inline instances of abstract definitions.",
      explanation: "You can implement abstract classes directly on the fly using Anonymous Inner Classes. This creates a subclass and instantiates it without writing a separate class file.",
      gotchas: [
        "Avoid writing complex logic inside anonymous classes. It clutters code readability. Use Lambda expressions instead if the abstract class has a single method."
      ],
      interviewQuestions: [
        {
          question: "Does anonymous inner class compile to a separate file?",
          answer: "Yes, the compiler generates a class file with name 'OuterClass$1.class', where '1' is the anonymous index."
        }
      ],
      code: `abstract class Writer {
    abstract void write();
}
Writer w = new Writer() {
    void write() { System.out.println("Writing..."); }
};`,
      visualizerType: "memory"
    },
    {
      id: 82,
      title: "What Is an Interface?",
      intro: "The ultimate API contract. A pure design blueprint.",
      explanation: "An interface is a collection of abstract methods. It specifies WHAT a class should do, but not HOW. All methods are implicitly `public abstract` (before Java 8). A class implements interfaces using `implements`.",
      gotchas: [
        "Interface variables are implicitly `public static final`. They are constants and cannot be reassigned."
      ],
      interviewQuestions: [
        {
          question: "Can an interface have concrete methods?",
          answer: "Yes. Since Java 8, interfaces can have 'default' and 'static' methods. Since Java 9, they can also have 'private' methods to reuse logic."
        }
      ],
      code: `interface Animal {
    void speak(); // public abstract
    int LEGS = 4; // public static final
}`,
      visualizerType: "dispatch"
    },
    {
      id: 83,
      title: "More on Interfaces",
      intro: "Multiple interfaces, inheritance between interfaces.",
      explanation: "Unlike classes, a class can implement multiple interfaces (`class A implements B, C`). Furthermore, an interface can extend another interface (`interface X extends Y`).",
      gotchas: [
        "If a class implements two interfaces that declare duplicate default methods, compilation fails due to conflict. Subclass must override and resolve manually."
      ],
      interviewQuestions: [
        {
          question: "How do you call a specific interface default method in case of override conflict?",
          answer: "Use InterfaceName.super.methodName(). For example, 'ParentInterface.super.show();' inside the overriding method."
        }
      ],
      code: `interface Walkable {}
interface Runnable extends Walkable {}
class Athlete implements Walkable, Runnable {}`,
      visualizerType: "dispatch"
    },
    {
      id: 84,
      title: "Need for an Interface",
      intro: "Loose coupling. Designing plug-and-play architectures.",
      explanation: "Interfaces allow you to program to an abstraction, not an implementation. E.g., if code depends on `List` interface, you can swap `ArrayList` with `LinkedList` without breaking the application.",
      gotchas: [
        "Over-engineering: creating an interface for every single class is an anti-pattern. Create interfaces when you expect multiple implementations."
      ],
      interviewQuestions: [
        {
          question: "How do interfaces support loose coupling in frameworks like Spring?",
          answer: "By injecting interface dependencies. At runtime, Spring injects any concrete implementation class, making testing easy (using Mock implementations)."
        }
      ],
      code: `// Loose coupling:
List<String> list = new ArrayList<>(); // easily switchable to LinkedList`,
      visualizerType: "dispatch"
    },
    {
      id: 85,
      title: "What Is an Enum?",
      intro: "Typesafe enumerations. Restricting variables to fixed options.",
      explanation: "An Enum (enumeration) is a special class that represents a group of constants (like directions: EAST, WEST, NORTH, SOUTH). Restricts assignment to defined constants.",
      gotchas: [
        "Don't use integers or raw strings to represent options (e.g. status = 1). It is error-prone. Use Enums instead for compile-time safety."
      ],
      interviewQuestions: [
        {
          question: "Are Enums classes in Java?",
          answer: "Yes, Enums compile to classes extending java.lang.Enum. They can have fields, constructors, and methods, and can implement interfaces."
        }
      ],
      code: `enum Status {
    PENDING, RUNNING, COMPLETED;
}`,
      visualizerType: "jvm"
    },
    {
      id: 86,
      title: "Enum with if and switch",
      intro: "Clean conditional checks on constants.",
      explanation: "1. if-else with Enum: `if (status == Status.PENDING) { ... }` — use == (safe, Enums are singletons).\n2. Classic switch: `switch(status) { case PENDING: ... break; }` — no Enum prefix in case labels.\n3. Modern switch (Java 14+): `switch(status) { case PENDING -> handle(); }` — arrow syntax, no fall-through risk.\n4. IDE/compiler exhaustiveness: adding a new Enum constant without a matching case triggers a warning.\n5. == is preferred over .equals() for Enum comparison — avoids NullPointerException.",
      gotchas: [
        "When using Enums in switch cases, do NOT prefix cases with the Enum name! E.g. write 'case PENDING:', not 'case Status.PENDING:'.",
        "Using == to compare Enums is safe (and preferred) because each Enum constant is a singleton. But comparing a null Enum variable with == is safe; calling .equals() on null throws NullPointerException.",
        "If you use the classic switch without arrow syntax, forgetting `break` causes fall-through — the next case executes accidentally. The modern arrow `->` syntax eliminates this problem entirely."
      ],
      interviewQuestions: [
        {
          question: "Can we use relational operators (==) to compare Enums?",
          answer: "Yes, Enums are singletons. == is safe and preferred over .equals() because it avoids NullPointerException if one variable is null."
        },
        {
          question: "Why is using an Enum in a switch statement better than using an int or String?",
          answer: "Enums provide compile-time type safety — you can only write valid Enum constants in the cases. With int or String, you can write any value without compiler error, including typos. Enums also enable exhaustiveness checking in modern switch expressions, catching missing cases at compile time."
        }
      ],
      code: `Status s = Status.PENDING;
switch(s) {
    case PENDING -> System.out.println("Wait...");
    case RUNNING -> System.out.println("Processing...");
}`,
      visualizerType: "jvm"
    },
    {
      id: 87,
      title: "Enum Class",
      intro: "Constructors and parameters in Enums.",
      explanation: "Enums can have instance fields and constructors. Enum constructors are implicitly `private`. You can pass parameters to constants (like defining salaries for roles).",
      gotchas: [
        "Cannot instantiate Enums using `new`! Enum constants are initialized when the class is loaded by JVM."
      ],
      interviewQuestions: [
        {
          question: "Why are Enum constructors private?",
          answer: "To prevent external code from creating new Enum constants at runtime, maintaining the fixed set of singleton instances."
        }
      ],
      code: `enum Laptop {
    MAC(2000), DELL(1200);
    private int price;
    Laptop(int p) { this.price = p; }
    public int getPrice() { return price; }
}`,
      visualizerType: "memory"
    },
    {
      id: 88,
      title: "What Is an Annotation?",
      intro: "Metadata: markers that give instructions to the compiler or framework.",
      explanation: "Annotations start with `@` (e.g., `@Override`, `@Deprecated`, `@SuppressWarnings`). They do not change code logic directly but provide clues to compilers, analyzers, or frameworks (like Spring/Hibernate) at runtime.",
      gotchas: [
        "Custom annotations require meta-annotations like `@Retention` and `@Target` to define when and where they can be read."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between source-level annotations and runtime-level annotations?",
          answer: "Source annotations (e.g., @Override) are discarded by compiler. Runtime annotations (e.g., @Autowired in Spring) are retained in .class files and parsed via Reflection at runtime."
        }
      ],
      code: `@Override
public String toString() {
    return "MyObject";
}`,
      visualizerType: "jvm"
    },
    {
      id: 89,
      title: "Types of Interface",
      intro: "Marker, Normal, and Functional interfaces.",
      explanation: `1. Normal: multiple methods.
2. Marker: zero methods, used to mark capability (e.g. \`Serializable\`, \`Cloneable\`).
3. Functional: exactly one abstract method (can have multiple defaults), supports Lambdas.`,
      gotchas: [
        "If you add another abstract method to a functional interface, it is no longer functional and breaks any lambda expressions using it!"
      ],
      interviewQuestions: [
        {
          question: "What is a Marker Interface?",
          answer: "An interface with no methods or constants. It delivers metadata instructions to the JVM or compiler (e.g., Serializable indicates JVM can write class state)."
        }
      ],
      code: `// Serializable has no methods. It is a marker interface!
class Data implements java.io.Serializable {}`,
      visualizerType: "jvm"
    },
    {
      id: 90,
      title: "Functional Interface",
      intro: "Single abstract method interfaces. The gateway to Lambdas.",
      explanation: "Definition: exactly ONE abstract method (SAM = Single Abstract Method).\n1. `@FunctionalInterface` annotation → optional but recommended: compiler enforces the 1-method rule.\n2. Default and static methods do NOT count toward the limit.\n3. Built-in functional interfaces in `java.util.function`:\n   • Predicate<T>   → T → boolean\n   • Function<T,R>  → T → R\n   • Consumer<T>    → T → void\n   • Supplier<T>    → () → T\n   • BiFunction<T,U,R> → (T,U) → R\n4. Use built-ins first — they compose with Stream API and Optional out of the box.\n5. Create custom ones only when no built-in fits the exact signature.",
      gotchas: [
        "Default and static methods do NOT count against the single abstract method rule in functional interfaces.",
        "Inherited abstract methods from Object (like equals, hashCode, toString) also do NOT count toward the SAM rule, so an interface declaring only `boolean equals(Object o)` is not a valid functional interface.",
        "Missing @FunctionalInterface means another developer can add a second abstract method later and silently break all lambdas using it. Always annotate your functional interfaces."
      ],
      interviewQuestions: [
        {
          question: "Why was FunctionalInterface introduced in Java 8?",
          answer: "To enable functional programming features by allowing single-method interfaces to be instantiated compactly using Lambda expressions."
        },
        {
          question: "Name five built-in functional interfaces in java.util.function and their signatures.",
          answer: "Predicate<T>: T → boolean. Function<T,R>: T → R. Consumer<T>: T → void. Supplier<T>: () → T. BiFunction<T,U,R>: (T,U) → R. These are the core building blocks of the Stream API and Optional."
        },
        {
          question: "Can a functional interface have multiple default methods?",
          answer: "Yes, a functional interface can have any number of default and static methods. Only the count of abstract methods is restricted to exactly one. Default methods are concrete implementations and do not break the SAM constraint."
        }
      ],
      code: `@FunctionalInterface
interface Printer {
    void print(String msg);
}`,
      visualizerType: "jvm"
    },
    {
      id: 91,
      title: "Lambda Expression",
      intro: "Say goodbye to verbose anonymous classes. Write functions in one line.",
      explanation: "Syntax: `(params) -> expression` or `(params) -> { statements; }`\n1. Pass behavior as data — no need to write a full anonymous class.\n2. Compiler infers the target functional interface from context automatically.\n3. Variable capture rules:\n   • Local variables → must be final or effectively final (never reassigned).\n   • Instance fields / static fields → freely readable AND writable.\n4. WHY effectively final? Lambdas may run after the enclosing method returns — JVM needs a stable copy.\n5. `this` inside lambda = the ENCLOSING class (unlike anonymous inner class where `this` = itself).",
      gotchas: [
        "Lambdas can only implement Functional Interfaces! You cannot use lambdas to instantiate classes with multiple abstract methods or abstract classes.",
        "A lambda captures local variables by value (a copy), not by reference. Reassigning the captured variable after the lambda is created will not update the lambda's copy — and Java prevents reassignment anyway (effectively final rule).",
        "Lambdas do NOT introduce a new scope for `this`. Inside a lambda, `this` refers to the enclosing class instance, unlike an anonymous inner class where `this` refers to the anonymous class itself."
      ],
      interviewQuestions: [
        {
          question: "Are lambdas just syntax sugar for anonymous inner classes?",
          answer: "No. Anonymous inner classes compile to separate classes ($1.class) and create object instances. Lambdas compile via 'invokedynamic' instruction, which is faster and avoids generating class files."
        },
        {
          question: "What does 'effectively final' mean in the context of lambdas?",
          answer: "A variable is effectively final if it is never reassigned after its initial assignment, even without the 'final' keyword. Lambdas can capture such variables. If you try to reassign the variable anywhere after the lambda captures it, the compiler rejects it with 'local variables referenced from a lambda expression must be final or effectively final'."
        },
        {
          question: "How does `this` behave differently inside a lambda vs an anonymous inner class?",
          answer: "Inside a lambda, `this` refers to the enclosing class instance. Inside an anonymous inner class, `this` refers to the anonymous class itself. To access the outer class from an anonymous inner class you must use OuterClass.this."
        }
      ],
      code: `Printer p = msg -> System.out.println("Printing: " + msg);
p.print("Hello Lambdas!");`,
      visualizerType: "jvm"
    },
    {
      id: 92,
      title: "Lambda Expression with Return",
      intro: "Returning values from compact functions.",
      explanation: "Two styles of lambda body:\n1. Expression lambda: `(a, b) -> a + b`\n   • No braces, no `return` — expression result is returned automatically.\n2. Block lambda: `(a, b) -> { int sum = a + b; return sum; }`\n   • Braces required → explicit `return` required in every code path.\n3. Single parameter → parentheses optional: `x -> x * 2`\n4. Parameter types → omit them; compiler infers from functional interface signature.\n5. Body is just a method call? Replace with method reference: `x -> System.out.println(x)` → `System.out::println`",
      gotchas: [
        "Keep lambda bodies short (1-3 lines). If it grows larger, extract it to a helper method or use a standard class method reference.",
        "In a block lambda (with braces), every code path MUST return a value. A missing return in one branch causes a compilation error just like in a regular method.",
        "Mixing expression and block syntax causes compilation errors. `(a, b) -> { a + b }` is invalid — curly braces require an explicit return. Write either `(a, b) -> a + b` or `(a, b) -> { return a + b; }`."
      ],
      interviewQuestions: [
        {
          question: "Translate this anonymous class to a lambda: Comparator<Integer> comp = new Comparator<Integer>() { public int compare(Integer a, Integer b) { return a.compareTo(b); } };",
          answer: "Comparator<Integer> comp = (a, b) -> a.compareTo(b);"
        },
        {
          question: "What is the difference between an expression lambda and a block lambda?",
          answer: "An expression lambda has no braces and the single expression is implicitly returned: `x -> x * 2`. A block lambda uses braces and requires an explicit return statement: `x -> { return x * 2; }`. Expression lambdas are more concise; block lambdas allow multiple statements."
        },
        {
          question: "When should you replace a lambda with a method reference?",
          answer: "When the lambda body just calls an existing method without transforming its arguments. Examples: `x -> System.out.println(x)` → `System.out::println`; `s -> s.toUpperCase()` → `String::toUpperCase`. Method references are more readable and avoid the overhead of wrapping a call in another call."
        }
      ],
      code: `// Single expression: auto-returns!
MathOp add = (a, b) -> a + b;

// Block body: requires 'return'!
MathOp sub = (a, b) -> {
    return a - b;
};`,
      visualizerType: "jvm"
    }
  ]
};
