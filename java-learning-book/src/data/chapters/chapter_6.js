export default {
  id: 6,
  title: "Encapsulation & Construction",
  range: "49-58",
  concepts: [
    {
      id: 49,
      title: "Encapsulation",
      intro: "Don't let outsiders mess with your object's internal organs directly.",
      explanation: "1. **Encapsulation** means bundling an object's data (fields) and the methods that operate on that data into one unit (the class), and **hiding** the internal data from direct outside access.\n2. The mechanism: declare fields `private` so only the class itself can read/write them. Expose controlled access through `public` methods (getters/setters) that validate and mediate all changes.\n3. **Why it matters**: without encapsulation, any class in the entire codebase can set `account.balance = -99999`. With encapsulation, only `account.withdraw(amount)` can change balance — and it validates `amount > 0` first.\n4. Encapsulation is the backbone of every design principle: it's what makes classes reusable, testable, and safe to change internally without breaking callers.\n5. **Information hiding**: exposing only what callers need (minimal public API) allows you to refactor the internal implementation completely — rename fields, change data structures — without breaking any code that uses the class.\n6. In JS, there is no enforced access control (though `#privateField` was added in ES2022). Java has compile-time enforcement — the compiler rejects unauthorized access to private fields, not just at runtime.\n7. Encapsulation scales: a well-encapsulated `BankAccount` class can be dropped into a mobile app, a web service, or a CLI tool with zero changes — because callers interact only with the public API.",
      gotchas: [
        "Making fields `public` destroys encapsulation. Any class can set `person.age = -999` or `account.balance = 0` without validation. You lose control over object state integrity forever once a field is public.",
        "Encapsulation is NOT just 'add getters and setters'. A class that has `private int x` with `getX()` and `setX(int x) { this.x = x; }` (no validation) is barely better than `public int x` — anyone can still set any value. True encapsulation means the setter enforces business rules.",
        "Returning a direct reference to a mutable internal field (like `return this.items;` for a List) breaks encapsulation — callers can modify the list directly. Return a defensive copy: `return new ArrayList<>(this.items);`"
      ],
      interviewQuestions: [
        {
          question: "What is encapsulation and why is it one of the four OOP pillars?",
          answer: "Encapsulation is the bundling of data (fields) and behavior (methods) into a single unit (class) while restricting direct access to the internal data. It's a pillar because it protects state integrity, allows internal refactoring without breaking callers, and enables loose coupling — the foundation of maintainable software."
        },
        {
          question: "How does encapsulation promote data validation?",
          answer: "By making fields private and exposing only setter methods, you control every write to a field through one choke point. The setter validates the incoming value before accepting it: `if (age > 0 && age < 150) this.age = age; else throw new IllegalArgumentException(...)`. Without encapsulation, validation is impossible — fields can be set directly to any value."
        },
        {
          question: "What is the difference between encapsulation and data hiding?",
          answer: "They are related but not identical. Data hiding (making fields private) is the mechanism. Encapsulation is the broader principle of packaging data + methods together AND hiding internal details. You can have data hiding without full encapsulation (private fields with no coherent methods). True encapsulation means the class controls ALL access to its state through a well-designed public API."
        }
      ],
      code: `class BankAccount {
    private double balance; // hidden — no direct outside access
    private String owner;

    public BankAccount(String owner, double initial) {
        this.owner = owner;
        this.balance = initial >= 0 ? initial : 0; // validated on creation
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount; // enforced business rule
        else throw new IllegalArgumentException("Deposit must be positive");
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) { balance -= amount; return true; }
        return false; // insufficient funds — refused cleanly
    }

    public double getBalance() { return balance; } // read-only access
}`,
      visualizerType: "memory"
    },
    {
      id: 50,
      title: "Getters and Setters",
      intro: "The standard gatekeepers of private variables.",
      explanation: "1. **Getter**: a `public` method that reads and returns a private field. Naming convention: `getFieldName()` for non-boolean, `isFieldName()` for boolean fields.\n2. **Setter**: a `public` method that validates and updates a private field. Naming convention: `setFieldName(type value)`.\n3. **JavaBeans standard**: the `getX()`/`setX()` naming convention is required by frameworks (Spring, Hibernate, Jackson) that use reflection to discover and map fields. Violating it breaks framework magic.\n4. Getters give you a single place to add **computed logic**: `getFullName()` can concatenate `firstName + \" \" + lastName` — the internal storage format is hidden from callers.\n5. Setters give you a single **validation choke point**: if business rules change (age must now be < 120, not just > 0), you update one method — not every place that sets age across the codebase.\n6. In JS, you use `get` and `set` keywords as property descriptors: `get name() { return this._name; }` — same concept, different syntax. Java requires explicit method calls; JS allows property-style access.\n7. **When to skip setters**: immutable objects (like Java's `record` types) have no setters at all — all values set in constructor, never changed. Prefer immutable objects when the data shouldn't change after creation.",
      gotchas: [
        "Returning a direct reference to a mutable object field in a getter breaks encapsulation. `public Date getBirthday() { return birthday; }` — the caller can call `getBirthday().setYear(2099)` and mutate your internal state. Return a defensive copy: `return new Date(birthday.getTime());`",
        "IDEs auto-generate getters/setters — but auto-generated setters have NO validation. A getter/setter pair with no logic is barely better than a public field. Always ask: 'should this setter enforce any constraint?' If yes, add it.",
        "Boolean getters use `is` prefix, not `get`. `isActive()` not `getActive()`. Frameworks like Jackson and Hibernate use reflection to find boolean getters — using the wrong prefix means the framework won't find the field during serialization/deserialization."
      ],
      interviewQuestions: [
        {
          question: "Why use getters and setters instead of making fields public?",
          answer: "Getters/setters let you: (1) add validation in the setter before accepting a value, (2) add computed logic in the getter without changing the caller, (3) make a field read-only (getter with no setter), (4) change internal storage format later without breaking any callers. Public fields give callers direct unconstrained access — you lose all these benefits forever."
        },
        {
          question: "What is a defensive copy in a getter and when is it needed?",
          answer: "A defensive copy returns a new object with the same value rather than the actual internal reference. It's needed when the field is a mutable object (Date, List, array). Without it, the caller can modify the internal state through the returned reference: `account.getItems().clear()` would clear your internal list. With `return new ArrayList<>(this.items)`, the caller gets a copy — mutations don't reach the original."
        },
        {
          question: "What is the JavaBeans naming convention for getters and setters, and why does it matter?",
          answer: "Non-boolean fields: getFieldName() / setFieldName(type). Boolean fields: isFieldName() / setFieldName(boolean). This naming convention matters because frameworks like Spring (dependency injection), Hibernate (ORM mapping), and Jackson (JSON serialization) use reflection to discover fields by scanning for get/set/is methods. Non-standard names cause framework features to silently break."
        }
      ],
      code: `class Employee {
    private String name;
    private int age;
    private boolean active;
    private java.util.List<String> skills;

    // Standard getters:
    public String getName() { return name; }
    public int getAge()     { return age; }
    public boolean isActive() { return active; } // boolean uses "is"

    // Getter with defensive copy for mutable field:
    public java.util.List<String> getSkills() {
        return new java.util.ArrayList<>(skills); // copy, not reference!
    }

    // Setter with validation:
    public void setAge(int age) {
        if (age > 0 && age < 150) this.age = age;
        else throw new IllegalArgumentException("Invalid age: " + age);
    }

    public void setName(String name) {
        if (name != null && !name.isBlank()) this.name = name;
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 51,
      title: "this Keyword",
      intro: "A reference to the current object executing the code.",
      explanation: "1. `this` is a reference variable that points to the **current object** — the specific instance on which the method or constructor is being called.\n2. **Primary use — resolving shadowing**: when a method parameter and an instance field share the same name, `this.fieldName` refers to the field, while `fieldName` (without `this`) refers to the parameter.\n3. **Constructor chaining** with `this()`: one constructor can call another constructor in the same class using `this(args)`. This must be the FIRST statement in the constructor body. Used to avoid duplicating initialization logic.\n4. **Passing the current object**: `this` can be passed as an argument to another method: `eventBus.register(this)` — registers the current object as a listener.\n5. **Fluent builder pattern**: methods can `return this` to enable method chaining: `builder.setName(\"Alice\").setAge(25).build()`.\n6. In JS, `this` is notoriously context-dependent — it changes based on how a function is called (method vs standalone, arrow vs regular function). Java's `this` always refers to the current instance — unambiguous and consistent.\n7. `this` is implicitly available in all instance methods and constructors. It does NOT exist in static methods — there's no object instance in a static context.",
      gotchas: [
        "You CANNOT use `this` inside `static` methods. Static methods belong to the class, not to any object instance — there is no 'current object', so `this` has no meaning. Attempting it causes a compile error: 'cannot use this in static context'.",
        "`this()` constructor call MUST be the very FIRST statement in a constructor. You cannot execute any other code before calling `this()`. Also, a constructor cannot call itself (`this()` causing infinite recursion is a compile-time check in some cases but a runtime StackOverflowError in others).",
        "In anonymous inner classes and lambda expressions, `this` behaves differently. Inside an anonymous class, `this` refers to the anonymous class instance, not the outer class. Inside a lambda, `this` refers to the enclosing class. This is a common source of confusion."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of the 'this' keyword in Java?",
          answer: "Three uses: (1) Disambiguate shadowed fields — `this.name = name` where both the field and parameter are named 'name'. (2) Constructor chaining — `this(args)` calls another constructor in the same class, must be first statement. (3) Pass the current object as an argument — `someMethod(this)` or `return this` for method chaining."
        },
        {
          question: "Why can't 'this' be used in static context?",
          answer: "Static methods belong to the class itself, not to any object instance. They can be called as `ClassName.method()` without ever creating an object. Since no object exists, there is no 'current instance' for 'this' to refer to. The compiler rejects it with 'non-static variable this cannot be referenced from a static context'."
        },
        {
          question: "How does constructor chaining with this() work and why is it useful?",
          answer: "this() calls another constructor in the same class. It must be the first statement. It's useful to avoid duplicating initialization logic: a no-arg constructor can call `this(\"default\", 0)` to delegate to a parameterized constructor that does the real setup. If initialization logic changes, you update it in one place."
        }
      ],
      code: `class Student {
    private String name;
    private int grade;

    // No-arg constructor chains to parameterized one:
    Student() {
        this("Unknown", 0); // MUST be first statement
    }

    Student(String name, int grade) {
        this.name = name;   // 'this.name' = field, 'name' = parameter
        this.grade = grade;
    }

    // Fluent method — returns this for chaining:
    Student withGrade(int g) {
        this.grade = g;
        return this;
    }

    void register(EventBus bus) {
        bus.subscribe(this); // pass current object as listener
    }

    // static method — 'this' is unavailable here:
    static String className() { return "Student"; /* no this */ }
}`,
      visualizerType: "memory"
    },
    {
      id: 52,
      title: "Constructor",
      intro: "The initialization ritual of an object.",
      explanation: "1. A **constructor** is a special method that runs automatically when you use `new`. Its job: initialize the object's fields to valid starting values before any other code can use the object.\n2. **Defining characteristics**: no return type (not even `void`), name is IDENTICAL to the class name (case-sensitive), called automatically by `new`, can be overloaded (multiple constructors with different parameters).\n3. **Execution order**: memory for the object is allocated on the heap first, then all instance fields are set to defaults (0/null/false), then the constructor body runs to override defaults with real values.\n4. If you write NO constructor, the Java compiler provides a **default no-arg constructor** automatically. Once you write any constructor yourself, the compiler stops providing the default.\n5. Constructors enforce an **invariant** — a condition that must be true about an object at all times. A `Person` constructor can ensure `name != null` before any method runs.\n6. In JS, the `constructor()` method inside a class serves the same purpose and is syntactically similar. Java constructors cannot be `async`, `static`, or return values.\n7. Constructors run in a chain: a subclass constructor always calls the parent's constructor first (explicitly via `super()` or implicitly if not specified) before executing its own body.",
      gotchas: [
        "Writing a return type on a constructor makes it a REGULAR METHOD instead. `void Student()` compiles but is never called during `new Student()` — it's just a weirdly-named method. The compiler does NOT warn you about this.",
        "Once you write any constructor yourself, the compiler no longer provides the default no-arg constructor. If you write `Student(String name)` and then call `new Student()` somewhere, it's a compile error — unless you also explicitly write `Student() {}`.",
        "Constructors do NOT have to initialize every field. Un-initialized instance fields get their type defaults (0, null, false). But relying on defaults instead of explicit initialization makes code harder to read and invites bugs when defaults change."
      ],
      interviewQuestions: [
        {
          question: "What is a constructor and how is it different from a regular method?",
          answer: "A constructor has no return type (not even void), its name exactly matches the class name, and it's called automatically by the 'new' keyword — you cannot call it directly. A regular method has a return type, any name, and must be called explicitly. Constructors initialize object state; methods define behavior."
        },
        {
          question: "What happens if you don't write any constructor in a class?",
          answer: "The Java compiler automatically provides a default no-arg constructor that calls super() and sets all fields to their defaults. As soon as you write any constructor yourself, the compiler stops providing this default — any code calling new MyClass() with no arguments will fail to compile unless you explicitly define a no-arg constructor."
        },
        {
          question: "What is the execution order when 'new MyClass()' is called?",
          answer: "1. Heap memory is allocated for the object. 2. All instance fields are initialized to type defaults (0, null, false). 3. Instance initializer blocks run (if any). 4. The constructor body executes, assigning real values. 5. The reference to the newly created object is returned. The parent class constructor runs before the subclass constructor at each level."
        }
      ],
      code: `class Laptop {
    String brand;
    int ram;
    boolean isOn;

    // Constructor — same name as class, no return type:
    Laptop(String brand, int ram) {
        this.brand = brand;
        this.ram = ram;
        this.isOn = false; // explicit initialization — don't rely on defaults
        System.out.println(brand + " laptop created with " + ram + "GB RAM");
    }

    // Wrong — this is a METHOD named Laptop, not a constructor:
    // void Laptop() { ... } // compiles but NEVER called by 'new'!
}

Laptop mac = new Laptop("Apple", 16); // constructor runs automatically`,
      visualizerType: "memory"
    },
    {
      id: 53,
      title: "Default vs. Parameterized Constructor",
      intro: "Constructor overloading. Providing multiple initialization entryways.",
      explanation: "1. **Default (no-arg) constructor**: takes no parameters. Either provided by the compiler (if you write no constructors) or written explicitly. Used to create objects with default/empty state.\n2. **Parameterized constructor**: takes arguments to set fields during instantiation — `new Car(\"Toyota\", 2024)`. Allows creating fully-initialized objects in one line.\n3. **Constructor overloading**: multiple constructors in the same class, each with a different parameter signature. Java picks the right one based on the arguments you pass to `new`.\n4. A common pattern: the no-arg constructor delegates to the parameterized one using `this()`: `Car() { this(\"Unknown\", 0); }` — the real initialization logic lives in one place.\n5. **Builder pattern alternative**: when a class has many optional fields, dozens of constructor overloads become unmanageable. The Builder pattern solves this: `new Car.Builder().brand(\"Toyota\").year(2024).color(\"red\").build()`.\n6. In JS, a class has a single `constructor()` method — no overloading. You simulate it with default parameter values: `constructor(name = 'Unknown', age = 0)`. Java uses genuine method overloading.\n7. **Copy constructor**: a parameterized constructor that takes another instance of the same class and copies its fields — `Student(Student other) { this.name = other.name; this.grade = other.grade; }`. Useful for cloning objects.",
      gotchas: [
        "Once you define ANY parameterized constructor, the compiler's implicit no-arg constructor disappears. `new Student()` after defining `Student(String name)` is a compile error. Always explicitly write the no-arg constructor if you need both.",
        "Constructor chaining with `this()` must be the FIRST line. You cannot run any code before `this()` — not even a null check. If you need to validate before delegating, use a static factory method instead of a constructor.",
        "Be careful with constructor overloads that have similar signatures: `Person(String name, int age)` and `Person(int age, String name)`. Java resolves by position AND type — calling `new Person(\"Alice\", 25)` always picks the (String, int) version. Ambiguous? Use a Builder."
      ],
      interviewQuestions: [
        {
          question: "What happens if we define a parameterized constructor but forget to write a default constructor?",
          answer: "Any call to new MyClass() with no arguments fails to compile. The compiler provides the default no-arg constructor ONLY when you write zero constructors. Once you write any constructor (including parameterized), you own all constructors — including the no-arg one if needed."
        },
        {
          question: "What is constructor chaining and how does it help?",
          answer: "Constructor chaining is calling one constructor from another using this(args). It avoids duplicating initialization logic: a no-arg constructor can call this('default', 0) to delegate to the full parameterized constructor. If initialization logic changes, you update one place. The chain must start with this() as the very first statement."
        },
        {
          question: "When would you use a Builder pattern instead of constructor overloading?",
          answer: "When a class has many fields that are optional or can be set independently, constructor overloads become unmanageable — 10 fields produce up to 2^10 possible constructors. Builder pattern solves this: each field has its own setter-like method on the builder, you set only what you need, then call build(). It's more readable and safe — you can't accidentally pass arguments in wrong order."
        }
      ],
      code: `class Car {
    String brand;
    int year;
    String color;

    // No-arg constructor — delegates to parameterized one:
    Car() {
        this("Unknown", 2024, "White"); // chains to below
    }

    // Parameterized constructor — real initialization lives here:
    Car(String brand, int year, String color) {
        this.brand = brand;
        this.year = year;
        this.color = color;
    }

    // Copy constructor — clone another Car:
    Car(Car other) {
        this(other.brand, other.year, other.color);
    }
}

Car c1 = new Car();                        // uses no-arg → Unknown/2024/White
Car c2 = new Car("Toyota", 2023, "Blue"); // parameterized
Car c3 = new Car(c2);                     // copy constructor`,
      visualizerType: "memory"
    },
    {
      id: 54,
      title: "Static Variable",
      intro: "A variable shared by all objects. It belongs to the class.",
      explanation: "1. A **static variable** (also called a class variable) is declared with the `static` keyword. Only ONE copy exists in memory, shared by all instances of the class — it belongs to the CLASS, not to any individual object.\n2. **Where it lives**: static variables are stored as part of the Class object in the heap (Java 8+, in Metaspace for class metadata). NOT on individual object instances.\n3. **Access**: you can access a static variable via `ClassName.variableName` or via any instance, but the class name form makes it explicit that it's shared.\n4. **Classic use cases**: counters (how many objects have been created), constants (`static final double PI = 3.14159`), shared configuration, singleton references.\n5. Static variables are initialized when the class is first loaded by the ClassLoader — before any object is created. Class loading happens when first referenced.\n6. In JS, class-level state uses `static` keyword too: `static count = 0` inside a class. Same concept, same syntax.\n7. **Thread safety warning**: since static variables are shared across all threads, any write to a static variable from multiple threads is a race condition. Use `synchronized` or `AtomicInteger` for thread-safe counters.",
      gotchas: [
        "Modifying a static variable through one object instance changes it for ALL other instances and the class itself — there is only one copy. `obj1.count++` increments the same variable that `obj2.count` reads.",
        "Static variables are NOT part of object serialization by default. If you serialize an object with a `static` field, that field is NOT included in the serialized form. The next JVM that deserializes it will use its own class-loaded value.",
        "Accessing a static variable via an instance reference (`obj.staticVar`) generates a compiler warning because it looks like instance access. Always use `ClassName.staticVar` to make the shared nature explicit and avoid confusing readers."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between an instance variable and a static variable?",
          answer: "Instance variables: each object gets its own independent copy, live inside the heap object, exist only while the object exists. Static variables: one copy shared across all instances, belong to the Class object in Metaspace/heap, exist from class loading until class unloading. Changing a static variable affects all objects; changing an instance variable affects only that one object."
        },
        {
          question: "Where are static variables stored in Java 8 and above?",
          answer: "In Java 8+, static variables are stored in the heap as part of the Class object (the java.lang.Class instance for that class). Pre-Java 8, they were in PermGen. The move to the heap means static variables are subject to GC when a class is unloaded — which happens when the ClassLoader that loaded it is garbage-collected."
        },
        {
          question: "Are static variables thread-safe by default?",
          answer: "No. Since static variables are shared across all threads, concurrent reads and writes without synchronization cause race conditions. `count++` is NOT atomic — it's read-increment-write, and two threads can interleave these steps. Use AtomicInteger for thread-safe counters, or synchronize the methods that access the static variable."
        }
      ],
      code: `class Counter {
    static int totalCreated = 0; // shared across all Counter objects

    int id; // instance variable — each Counter gets its own

    Counter() {
        Counter.totalCreated++; // increments the ONE shared copy
        this.id = totalCreated; // unique id per object
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();
Counter c3 = new Counter();

System.out.println(Counter.totalCreated); // 3 — class-level access
System.out.println(c1.id);               // 1
System.out.println(c2.id);               // 2
System.out.println(c3.id);               // 3`,
      visualizerType: "memory"
    },
    {
      id: 55,
      title: "Static Method",
      intro: "Utility methods that run without needing an object instance.",
      explanation: "1. A **static method** belongs to the CLASS, not to any object instance. Declared with `static`, called using `ClassName.methodName()` — no `new` required.\n2. **What static methods CAN do**: access other static variables and call other static methods. They run in a class-level context.\n3. **What static methods CANNOT do**: access instance variables (fields without `static`), call instance methods, or use `this` or `super`. There's no object to provide instance state.\n4. **Classic use cases**: utility/helper methods that don't need object state (`Math.sqrt()`, `Arrays.sort()`, `Collections.shuffle()`), factory methods (`Integer.valueOf()`, `LocalDate.of()`), and the `main()` method entry point.\n5. Static methods are resolved at **compile time** (static binding). Calling `Animal.makeNoise()` always calls the `Animal` version — there is no runtime dispatch based on object type. This means static methods CANNOT be overridden (only hidden).\n6. In JS, `static` methods in a class work identically — class-level utility methods, called on the class: `MyClass.helper()`. Same concept.\n7. **Factory method pattern**: a common design where a static method creates and returns an instance: `User.createAdmin(\"Alice\")` — more readable than `new User(\"Alice\", Role.ADMIN)`.",
      gotchas: [
        "Attempting to access instance variables or call instance methods from inside a static method is a compile error: 'non-static variable cannot be referenced from a static context'. Static methods have no object — there are no instance fields to access.",
        "Calling `super` or `this` inside a static method is also a compile error. Both refer to object instances, which don't exist in a static context.",
        "Redefining a static method in a subclass is NOT overriding — it's **method hiding**. `Animal a = new Dog(); a.makeNoise()` on a static method calls `Animal.makeNoise()`, not `Dog.makeNoise()` — because static dispatch is based on the REFERENCE type (compile-time), not the object type (runtime)."
      ],
      interviewQuestions: [
        {
          question: "Can a static method access instance variables?",
          answer: "No. Instance variables belong to specific object instances on the heap. A static method runs at the class level with no associated object — there is no 'this', so there is no object to access instance fields from. The compiler rejects any attempt with 'non-static variable cannot be referenced from a static context'."
        },
        {
          question: "Can we override static methods in Java?",
          answer: "No. Static methods use static binding (resolved at compile time based on the reference type). Redefining a static method in a subclass hides the parent's version — it does NOT override it. If you call the method through a parent-type reference, the parent's version runs even if the actual object is the subclass. This is called method hiding, not overriding."
        },
        {
          question: "What is a static factory method and why is it preferred over public constructors?",
          answer: "A static factory method is a static method that returns an instance of the class. Advantages over constructors: (1) it has a descriptive name — `LocalDate.of(2024, 1, 15)` vs `new LocalDate(...)`, (2) it can return a cached/pooled instance (Integer.valueOf() returns cached -128 to 127), (3) it can return a subtype, (4) it can have validation and return null or throw on failure without polluting the constructor."
        }
      ],
      code: `class MathUtils {
    // Static utility — no instance needed:
    public static int square(int x) { return x * x; }
    public static int max(int a, int b) { return a > b ? a : b; }

    // Static factory method:
    public static MathUtils create() { return new MathUtils(); }

    // Instance variable — NOT accessible from static methods:
    private int lastResult;

    // Instance method — can access lastResult + static methods:
    public void compute(int x) {
        lastResult = square(x); // static method fine from instance context
    }
}

// Call without creating an object:
int sq = MathUtils.square(4); // 16
int m  = MathUtils.max(7, 3); // 7`,
      visualizerType: "jvm"
    },
    {
      id: 56,
      title: "Static Block",
      intro: "Initialization chamber for static variables.",
      explanation: "1. A **static block** (static initializer) is a block of code prefixed with `static { ... }` inside a class body. It runs exactly ONCE when the JVM first loads the class — before any constructor or `main()` method.\n2. **Execution timing**: triggered when the class is first referenced — either by instantiating it, accessing a static member, or calling a static method. The JVM ClassLoader loads the class and immediately runs all static blocks in declaration order.\n3. **Primary use**: initialize static variables that require complex logic (not possible in a single expression), load native libraries (`System.loadLibrary()`), register JDBC drivers, set up static caches.\n4. You can have **multiple static blocks** in one class — they all run in top-to-bottom order, all before the first constructor.\n5. A class's static blocks run before its subclass's static blocks — parent class is loaded and initialized first.\n6. In JS, there's no exact equivalent — static blocks were added to the JS spec in 2022 (`static { }` in class bodies) for exactly this purpose.\n7. **Contrast with instance initializers**: `{ ... }` (without `static`) is an instance initializer — runs every time a new object is created, just before the constructor body.",
      gotchas: [
        "If an exception is thrown inside a static block and not caught, the class fails to initialize with `ExceptionInInitializerError`. Every subsequent attempt to use that class throws `NoClassDefFoundError` — the class is permanently broken for the JVM's lifetime.",
        "Static blocks run at class-loading time — which can be much later (or earlier) than you expect. Class loading is lazy: a class is NOT loaded just because you import it; it's loaded on first use. This makes static block timing non-obvious.",
        "Static blocks cannot throw checked exceptions without catching them internally, because there's no try-catch outside a static block at the class level. If your initialization might throw a checked exception, catch and wrap it: `catch (IOException e) { throw new RuntimeException(e); }`"
      ],
      interviewQuestions: [
        {
          question: "When is a static block executed?",
          answer: "Exactly once, when the JVM's ClassLoader first loads the class into memory. This happens on first use of the class — when you first instantiate it, access a static field, or call a static method. Static blocks run before any constructor or instance initializer, in top-to-bottom order if multiple blocks exist."
        },
        {
          question: "What happens if a static block throws an unhandled exception?",
          answer: "The exception is wrapped in ExceptionInInitializerError, the class is marked as failed-to-initialize. Every subsequent attempt to use the class (in the same JVM run) throws NoClassDefFoundError — even if the original exception was a transient I/O issue. Static block initialization failure is permanent for the JVM's lifetime."
        },
        {
          question: "What is the difference between a static block and an instance initializer block?",
          answer: "Static block `static { }`: runs once when the class is first loaded, before any constructor, used for static variable setup. Instance initializer `{ }` (no static keyword): runs every time a new object is created, immediately before the constructor body, used for instance variable setup that's common across all constructors."
        }
      ],
      code: `class DatabaseConfig {
    static String url;
    static int poolSize;

    // Static block — runs once on class load:
    static {
        System.out.println("Class loading: initializing DB config...");
        url = System.getenv("DB_URL");
        if (url == null) url = "jdbc:h2:mem:test"; // default fallback
        poolSize = Integer.parseInt(
            System.getProperty("db.pool", "10")
        );
        System.out.println("Pool size: " + poolSize);
    }

    // Second static block runs right after:
    static {
        System.out.println("Second static block — also runs on load");
    }
}

// Static blocks run when class is first referenced:
DatabaseConfig cfg = new DatabaseConfig(); // triggers static blocks`,
      visualizerType: "jvm"
    },
    {
      id: 57,
      title: "Naming Conventions",
      intro: "Writing code that doesn't make your teammates cringe.",
      explanation: "1. **Classes and Interfaces**: `PascalCase` — each word capitalized, no underscores. `StudentCourse`, `PaymentService`, `Runnable`. Reflects that these are type names — a noun.\n2. **Methods and variables**: `camelCase` — first word lowercase, subsequent words capitalized. `studentAge`, `calculateTax()`, `getUserById(int id)`.\n3. **Constants** (`static final` fields): `UPPER_SNAKE_CASE` — all caps with underscores. `MAX_SPEED`, `PI`, `DEFAULT_TIMEOUT_MS`. Makes constants instantly recognizable in code.\n4. **Packages**: `lowercase.reverse.domain` — e.g., `com.telusuko.payment`. All lowercase to avoid conflicts on case-insensitive file systems (Windows). Reverse domain ensures global uniqueness.\n5. **Enums**: the enum TYPE is `PascalCase`, the constants are `UPPER_SNAKE_CASE`: `enum Status { PENDING, IN_PROGRESS, DONE }`. Enum constants are like static final fields.\n6. In JS, the community uses camelCase for functions/variables and PascalCase for classes — nearly identical to Java's convention. Constants use `UPPER_SNAKE_CASE` in both languages.\n7. **Why conventions matter beyond aesthetics**: tools and frameworks depend on naming. Spring scans for beans using class name patterns. Jackson uses `getX()`/`isX()` patterns. Lombok generates getters/setters following the convention. Violating conventions breaks tooling silently.",
      gotchas: [
        "Violating naming conventions never causes compile errors — Java doesn't enforce them. But it WILL fail static analysis tools (Checkstyle, SonarQube), code reviews, and framework auto-wiring. In enterprise codebases, a PR with `int MyVariable` will be rejected.",
        "Package names must be all lowercase AND match the directory structure exactly. If your package says `com.telusuko.utils` but the folder is `com/telusuko/Utils` (capital U), javac won't find the class on case-sensitive file systems (Linux servers).",
        "Boolean methods should start with `is`, `has`, or `can`: `isEmpty()`, `hasPermission()`, `canExecute()`. Never `getEmpty()` — it doesn't read naturally and breaks the JavaBeans convention that frameworks rely on."
      ],
      interviewQuestions: [
        {
          question: "What is the naming convention for classes, methods, variables, and constants in Java?",
          answer: "Classes/interfaces: PascalCase (CustomerOrder). Methods/variables: camelCase (calculateTotal). Constants (static final): UPPER_SNAKE_CASE (MAX_RETRY_COUNT). Packages: lowercase.reverse.domain (com.company.module). Enums: type is PascalCase, constants are UPPER_SNAKE_CASE."
        },
        {
          question: "Why should package names be in lowercase and reverse domain order?",
          answer: "Lowercase avoids conflicts on case-insensitive file systems (e.g., Windows treats 'com/Google' and 'com/google' as the same folder, but Linux treats them as different). Reverse domain order (com.google.search) ensures globally unique package names — no two organizations should have the same reverse domain, preventing class name collisions across JARs."
        },
        {
          question: "Why does naming convention matter beyond readability?",
          answer: "Frameworks use reflection and naming patterns as contracts. Spring discovers beans by class name suffix (-Service, -Repository, -Controller). Jackson finds fields via getX()/isX() method names. Lombok generates standard getters/setters. Static analysis tools (SonarQube, Checkstyle) enforce conventions and can block CI pipelines. Violating conventions causes silent framework failures, not just style complaints."
        }
      ],
      code: `// PascalCase — classes and interfaces:
public class PaymentService implements Processable { }

// camelCase — methods and variables:
public class OrderProcessor {
    private int orderId;
    private boolean isPaid;

    public void processOrder(int orderId) {
        this.orderId = orderId;
    }

    public boolean isPaid() { return isPaid; } // boolean uses "is"
}

// UPPER_SNAKE_CASE — constants:
public static final int MAX_RETRY_COUNT = 3;
public static final String BASE_URL = "https://api.example.com";

// Package: com.telusuko.payment (lowercase, reverse domain)
// Enum: enum PaymentStatus { PENDING, COMPLETED, FAILED }`,
      visualizerType: "jvm"
    },
    {
      id: 58,
      title: "Anonymous Object",
      intro: "Use once and throw away. Objects without names.",
      explanation: "1. An **anonymous object** is created with `new ClassName()` or `new ClassName(args)` but NOT assigned to any reference variable. It's used directly inline.\n2. The canonical use case: when you need to call exactly ONE method on a newly created object and never use the object again: `new Mailer().send(\"hello\");`\n3. **Memory lifecycle**: since no reference variable points to the object, it becomes eligible for Garbage Collection immediately after the statement completes — the next GC cycle reclaims it.\n4. You can pass anonymous objects directly as method arguments: `process(new Request(\"GET\", \"/users\"))` — no need to name the Request if it's used only once.\n5. Anonymous objects are stateless from the caller's perspective — you can't inspect what happened to them after the call, can't call a second method, can't pass them elsewhere.\n6. In JS, this is equivalent to passing an object literal directly: `doSomething({ type: 'GET', path: '/users' })` — same idea: created inline, used once, no name retained.\n7. **Not to be confused with anonymous inner classes** — those are entire class definitions without a name. An anonymous object is simply a named class instantiated without being stored in a variable.",
      gotchas: [
        "Since there's no reference variable, you CANNOT call a second method on the object after the first call. `new Dog().bark().wag()` only works if `bark()` returns `this` (fluent interface). Without that, `new Dog().bark()` is all you get.",
        "Anonymous objects make debugging harder — if the constructor or the called method throws an exception, the stack trace shows the line number but there's no variable name to inspect in a debugger. For complex objects, assign to a variable.",
        "Avoid using anonymous objects for objects that hold important state or results you need later. `new Calculator().add(5, 10)` throws away the Calculator immediately — if you need the result, assign it or use the return value: `int sum = new Calculator().add(5, 10);`"
      ],
      interviewQuestions: [
        {
          question: "What is an anonymous object and when should it be used?",
          answer: "An anonymous object is an instance created without assigning it to a reference variable. Use it when you need exactly one method call on a freshly created object and have no further use for it: `new EmailSender().send(message)`. It's GC-eligible immediately after the line completes. Avoid it when you need multiple interactions or need to inspect the object's state afterward."
        },
        {
          question: "What happens to an anonymous object in terms of garbage collection?",
          answer: "Since no reference variable holds the object, it has zero references pointing to it immediately after the statement executes. The JVM's GC marks it eligible for collection on the next GC cycle. The exact timing is non-deterministic — GC runs on its own schedule — but the memory will be reclaimed eventually."
        },
        {
          question: "Can you chain method calls on an anonymous object?",
          answer: "Only if the methods return 'this' (fluent/builder pattern). `new StringBuilder().append(\"Hello\").append(\"World\").toString()` works because each append() returns 'this'. But `new Dog().bark().wag()` fails if bark() returns void — you'd get a compile error trying to call .wag() on void."
        }
      ],
      code: `class Validator {
    boolean isValid(String email) {
        return email != null && email.contains("@");
    }
}

// Anonymous object — created, used once, immediately GC-eligible:
boolean valid = new Validator().isValid("user@example.com");

// As method argument — no need to store the object:
saveUser(new User("Alice", "alice@example.com"));

// Chaining works only if methods return 'this':
String result = new StringBuilder()
    .append("Hello ")
    .append("World")
    .toString(); // StringBuilder is anonymous but methods return 'this'

// Cannot reuse after the line:
// Validator v_ref = ???; — no reference was kept`,
      visualizerType: "memory"
    }
  ]
};
