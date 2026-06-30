export default {
  id: 7,
  title: "Inheritance & Polymorphism",
  range: "59-72",
  concepts: [
    {
      id: 59,
      title: "Need for Inheritance",
      intro: "Don't copy-paste behaviors. Reuse logic to write DRY code.",
      explanation: "1. Without inheritance, if `Manager` and `Developer` both need `name`, `id`, `salary`, and `applyLeave()`, you write those TWICE — two copies to keep in sync forever. One bug fix means two places to update.\n2. **Inheritance solves this**: extract the shared state and behavior into a base class `Employee`. `Manager` and `Developer` inherit it — they get all fields and methods for free, plus add their own specifics.\n3. The relationship inheritance models is called **IS-A**: `Manager IS-A Employee`, `Dog IS-A Animal`. The subclass is a specialized version of the superclass.\n4. **Code reuse benefit**: change `applyLeave()` logic in `Employee` once — every subclass automatically gets the fix. No hunting across files.\n5. **Inheritance vs. Composition**: inheritance is for TRUE IS-A relationships. If you're tempted to inherit just to reuse a method (like a `Car` extending `Engine` to reuse engine logic), use **composition** (HAS-A) instead — `Car` HAS-A `Engine` field. Misusing inheritance creates fragile, tightly-coupled hierarchies.\n6. In JS, inheritance works via prototype chains (`class Dog extends Animal`). Java's inheritance is class-based, enforced at compile time with `extends`, and resolves more predictably than prototype chains.\n7. Java only supports **single class inheritance** — a class can extend exactly ONE class. Multiple inheritance is achieved through interfaces.",
      gotchas: [
        "Inheritance creates a tight **compile-time coupling** between parent and child. Changing the parent class — adding a method, changing a signature — can break all subclasses. Deep hierarchies amplify this. Prefer composition when reuse doesn't require IS-A semantics.",
        "The Liskov Substitution Principle (LSP): a subclass should be usable wherever the parent is expected, without surprising behavior. If `Square extends Rectangle` but `setWidth()` also changes height, substituting Square breaks code that assumes width and height are independent. LSP violations make inheritance a liability.",
        "Inheriting from a class whose constructor throws checked exceptions forces all subclasses to handle or declare those exceptions in their own constructors — even if they don't care about the cause. Deep hierarchies can propagate constructor complexity painfully."
      ],
      interviewQuestions: [
        {
          question: "What problem does inheritance solve in OOP?",
          answer: "Inheritance eliminates code duplication by allowing shared state (fields) and behavior (methods) to be defined once in a base class and reused by all subclasses. Without it, common logic must be copy-pasted across classes — one bug fix requires N identical changes. Inheritance centralizes common logic while letting subclasses specialize."
        },
        {
          question: "Why is composition often preferred over inheritance?",
          answer: "Inheritance creates tight compile-time coupling — subclasses are fragile when the superclass changes. Composition (HAS-A) maintains encapsulation: the composing class depends only on the composed class's public API. Composition is flexible at runtime (swap the component), works across class hierarchies, and avoids breaking the Liskov Substitution Principle. 'Favor composition over inheritance' is a core GoF design principle."
        },
        {
          question: "What is the Liskov Substitution Principle in the context of inheritance?",
          answer: "LSP states that any code using a superclass reference should work correctly if a subclass object is substituted — no surprises, no broken behavior. Violating LSP (e.g., a subclass that throws where the parent doesn't, or changes post-conditions) means the inheritance is wrong — composition or a different design should be used instead."
        }
      ],
      code: `// Without inheritance — duplicate fields and methods in every class:
// class Manager { String name; double salary; void applyLeave() {...} }
// class Developer { String name; double salary; void applyLeave() {...} }

// With inheritance — shared logic in ONE place:
class Employee {
    String name;
    double salary;
    String department;

    void applyLeave(int days) {
        System.out.println(name + " applied for " + days + " days leave");
    }
}

class Manager extends Employee {
    int teamSize; // Manager-specific only
    void conductReview() { System.out.println("Reviewing team of " + teamSize); }
}

class Developer extends Employee {
    String techStack; // Developer-specific only
    void writeCode() { System.out.println(name + " coding in " + techStack); }
}`,
      visualizerType: "dispatch"
    },
    {
      id: 60,
      title: "What Is Inheritance?",
      intro: "The IS-A relationship mechanism.",
      explanation: "1. **Inheritance**: a class (child/subclass) acquires the fields and methods of another class (parent/superclass) using the `extends` keyword. The child class IS-A type of the parent class.\n2. The child class inherits everything that is `public` or `protected` from the parent. Private members are inherited (part of the memory layout) but inaccessible directly — you go through inherited public/protected methods.\n3. The child class can: (a) USE inherited methods as-is, (b) OVERRIDE inherited methods to provide specialized behavior, (c) ADD new fields and methods not in the parent.\n4. **Constructor behavior**: constructors are NOT inherited. Every class defines its own constructors. But the first line of every subclass constructor implicitly calls `super()` — which requires the parent to have a no-arg constructor.\n5. `java.lang.Object` is the root of every class hierarchy — every class in Java ultimately extends `Object`, even if you don't write `extends Object` explicitly.\n6. In JS, `class Dog extends Animal` works the same way. Both languages require calling `super()` in the subclass constructor before accessing `this`. Java enforces this at compile time.\n7. **Access summary**: `public` members — fully inherited and accessible everywhere. `protected` members — inherited and accessible in subclass + same package. `private` members — inherited (in memory) but not directly accessible in subclass code.",
      gotchas: [
        "Private members of the superclass ARE inherited — they occupy memory in the subclass object. But the subclass CANNOT access them directly by name. Access must go through inherited public/protected methods (getters/setters). Don't confuse 'inherited' with 'accessible'.",
        "Every subclass constructor implicitly calls `super()` as its first line if you don't write an explicit super() call. If the parent class has NO no-arg constructor (because you wrote only a parameterized one), you MUST explicitly call `super(args)` in the subclass — or it fails to compile.",
        "A subclass reference can hold only subclass (or further derived) objects, but a superclass reference can hold any subclass object (upcasting). `Animal a = new Dog()` is valid. `Dog d = new Animal()` is a compile error."
      ],
      interviewQuestions: [
        {
          question: "Does a subclass inherit private fields of the superclass?",
          answer: "Yes — private fields are part of the subclass object's memory layout and ARE inherited in the sense that they exist in the object. But the subclass CANNOT access them by name in its code. Access must happen through inherited public/protected accessor methods. 'Inherited' does not mean 'directly accessible'."
        },
        {
          question: "What is the root of Java's class hierarchy?",
          answer: "java.lang.Object. Every class in Java implicitly extends Object if no explicit parent is specified. Object provides fundamental methods: toString(), equals(), hashCode(), getClass(), clone(), wait(), notify(), notifyAll(). This is why you can assign any object to an Object reference variable."
        },
        {
          question: "What is the difference between 'extends' and 'implements' in Java?",
          answer: "'extends' is used for class-to-class inheritance (single parent only) — inherits fields and methods with implementations. 'implements' is used for class-to-interface relationships (multiple interfaces allowed) — commits the class to providing implementations for the interface's abstract methods. A class can do both: `class Dog extends Animal implements Trainable, Walkable`."
        }
      ],
      code: `class Animal {
    String name;
    // protected — accessible in Animal and all subclasses:
    protected int age;
    // private — exists in subclass memory but NOT accessible directly:
    private String dna;

    void eat() { System.out.println(name + " is eating"); }

    protected String getDna() { return dna; } // subclass accesses via this
}

class Dog extends Animal {
    String breed;

    void bark() { System.out.println(name + " barks!"); }

    void info() {
        System.out.println(name); // inherited public field
        System.out.println(age);  // inherited protected field
        // System.out.println(dna); // compile error! private
        System.out.println(getDna()); // OK — via inherited method
    }
}`,
      visualizerType: "dispatch"
    },
    {
      id: 61,
      title: "Single and Multilevel Inheritance",
      intro: "Family chains. Dog inherits Animal (Single). Labrador inherits Dog (Multilevel).",
      explanation: "1. **Single Inheritance**: one class extends exactly one other class. `Dog extends Animal` — Dog inherits all non-private members of Animal and adds its own.\n2. **Multilevel Inheritance**: a chain of inheritance — `Animal → Dog → Labrador`. Labrador inherits from Dog (which inherits from Animal). Labrador gets everything from both Animal and Dog.\n3. In multilevel inheritance, the chain is searched bottom-up for method resolution: if Labrador doesn't override `eat()`, Java looks at Dog; if Dog doesn't override it, Java looks at Animal.\n4. **Object is always at the top**: every class, regardless of how deep the hierarchy goes, ultimately extends `java.lang.Object`. So `Animal` technically extends `Object`, making the chain `Object → Animal → Dog → Labrador`.\n5. Constructor execution order in multilevel: `Object()` → `Animal()` → `Dog()` → `Labrador()` — top down. Each constructor completes before the next one starts. The chain is triggered by `super()` calls.\n6. In JS, prototype chains work the same way — method lookup traverses up the chain until found or `null` is reached. Java's class hierarchy is the compile-time equivalent.\n7. **Depth guideline**: most real-world hierarchies should stay at 2-3 levels. Beyond that, behavior becomes hard to trace — a bug in `eat()` could live anywhere in a 5-level chain.",
      gotchas: [
        "Deep multilevel hierarchies (5+ levels) make debugging nightmarish. When `Labrador.eat()` produces wrong output, the implementation could be in `Labrador`, `Dog`, or `Animal`. Each level adds a place to look. Keep hierarchies shallow — prefer flat structures with interfaces.",
        "In multilevel inheritance, ALL parent constructors MUST be callable. If `Animal` has only a parameterized constructor and `Dog` doesn't explicitly call `super(args)`, the `Dog` constructor silently tries `super()` (no-arg) — which doesn't exist — and fails to compile. Every level of the chain must explicitly handle constructor requirements.",
        "Method resolution in multilevel inheritance goes bottom-up: the JVM looks for the method in the most-derived class first (Labrador), then Dog, then Animal, then Object. The FIRST matching implementation wins. This can be surprising if an intermediate class partially overrides a method."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between single and multilevel inheritance?",
          answer: "Single inheritance: one class extends one class (A extends B). Multilevel inheritance: a chain where each class extends the one above it (A extends B, B extends C). Multilevel creates a hierarchy — the most-derived class inherits from all ancestors. Java limits single inheritance to classes (one parent only) but allows multilevel chains of any depth."
        },
        {
          question: "What is the order of constructor execution in multilevel inheritance?",
          answer: "Top-down: the topmost parent constructor runs first. For a chain Object → Animal → Dog → Labrador, constructing a Labrador runs: Object() → Animal() → Dog() → Labrador() in that order. Each super() call triggers the parent constructor before the child's body executes. This guarantees parent state is initialized before the child accesses it."
        },
        {
          question: "What is the maximum depth of inheritance allowed in Java?",
          answer: "The JVM specification imposes no hard limit on inheritance depth. Practically, deep hierarchies (5+ levels) are strongly discouraged in design reviews because they create tight coupling, make debugging difficult, and violate the principle of least surprise. The real-world guideline is 2-3 levels maximum for class hierarchies."
        }
      ],
      code: `// Single inheritance:
class Animal {
    void breathe() { System.out.println("Breathing..."); }
}

class Dog extends Animal { // Single: Dog IS-A Animal
    void bark() { System.out.println("Woof!"); }
}

// Multilevel inheritance:
class Labrador extends Dog { // Multilevel: Labrador IS-A Dog IS-A Animal
    void fetch() { System.out.println("Fetching the ball!"); }
}

Labrador lab = new Labrador();
lab.fetch();   // own method
lab.bark();    // inherited from Dog
lab.breathe(); // inherited from Animal (through Dog)

// Constructor chain — all 4 constructors run top-down:
// Object() → Animal() → Dog() → Labrador()`,
      visualizerType: "dispatch"
    },
    {
      id: 62,
      title: "Multiple Inheritance",
      intro: "The Diamond Problem. Why Java banned multiple inheritance with classes.",
      explanation: "1. **Multiple inheritance** means one class extending two or more classes simultaneously: `class C extends A, B`. Java does NOT allow this for classes.\n2. **The Diamond Problem**: if class A and class B both define a method `display()`, and class C extends both, which `display()` should C call? The compiler can't resolve this ambiguity automatically — two competing implementations with no clear winner.\n3. Java's solution: **forbid multiple class inheritance**. A class can extend only ONE class. This eliminates the Diamond Problem entirely for classes.\n4. **Interfaces as the alternative**: Java DOES allow implementing multiple interfaces: `class C implements A, B`. Since interfaces (before Java 8) had no method bodies, there's nothing to conflict — C must provide its own implementation.\n5. **Java 8 default methods brought the problem back partially**: if two interfaces both define the same `default` method, a class implementing both must override that method to resolve the conflict. The compiler forces you to make the choice explicit.\n6. In JS, prototype-based inheritance is single-chain — each object has one prototype. JS mixins or Object.assign() are used to simulate multiple inheritance, but with the same diamond ambiguity risk.\n7. **C++ allows multiple inheritance** and uses explicit resolution via virtual base classes and scope operators — it's complex and error-prone. Java's designers explicitly avoided this complexity.",
      gotchas: [
        "Java forbids `class C extends A, B` — this is a compile error. The only way to get behavior from multiple sources is through implementing multiple interfaces or using composition (a class having references to both A and B objects).",
        "When a class implements two interfaces that both have a default method with the same signature, Java FORCES you to override it in the implementing class. If you don't, it's a compile error. Inside the override, you can explicitly choose one: `A.super.display()` or `B.super.display()`.",
        "The Diamond Problem still exists subtly with interfaces: if `A extends C` and `B extends C`, and all provide `display()`, and you implement both A and B — Java uses specificity rules: the most specific override wins. If still ambiguous, the compiler requires an explicit override."
      ],
      interviewQuestions: [
        {
          question: "Why does Java not support multiple class inheritance?",
          answer: "The Diamond Problem: if class C extends A and B, and both A and B have a method `display()`, the compiler can't determine which implementation C should inherit. Rather than introducing complex resolution rules (like C++ virtual base classes), Java's designers banned multiple class inheritance entirely. Multiple interface implementation is allowed because interfaces (traditionally) have no implementation to conflict."
        },
        {
          question: "How does Java solve the Diamond Problem for interfaces with default methods?",
          answer: "If a class implements two interfaces with conflicting default methods, Java requires the implementing class to EXPLICITLY override the method. The compiler rejects compilation with 'class inherits unrelated defaults' error. Inside the override, you can delegate to a specific interface: `InterfaceName.super.methodName()`. The developer, not the compiler, makes the resolution decision."
        },
        {
          question: "How can you achieve multiple inheritance behavior in Java?",
          answer: "Two ways: (1) Implement multiple interfaces — a class can implement as many interfaces as needed, gaining type compatibility with all of them and providing its own implementation of each method. (2) Composition — instead of extending A and B, the class has fields of type A and B, and delegates calls. Composition is more flexible and avoids coupling entirely."
        }
      ],
      code: `// ILLEGAL in Java — compile error:
// class Child extends Parent1, Parent2 { }

// Interface conflict with default methods:
interface A { default void display() { System.out.println("A"); } }
interface B { default void display() { System.out.println("B"); } }

class C implements A, B {
    @Override
    public void display() {
        A.super.display(); // explicitly choose A's version
        // or B.super.display() for B's version
        // or write entirely new logic
    }
}

// Safe multiple behavior via composition:
class C2 {
    private A a = new A() {}; // implement inline
    private B b = new B() {};
    public void doA() { a.display(); }
    public void doB() { b.display(); }
}`,
      visualizerType: "dispatch"
    },
    {
      id: 63,
      title: "this and super Methods",
      intro: "Constructor chaining. Invoking sibling and parent constructors.",
      explanation: "1. **`super()` in constructors**: calls the parent class's constructor. Must be the FIRST statement in the subclass constructor. Every subclass constructor implicitly calls `super()` if no explicit `super()` or `this()` call is present.\n2. **`this()` in constructors**: calls another constructor in the SAME class. Also must be the FIRST statement. Used for constructor chaining within the same class.\n3. **`super.methodName()` in methods**: calls the parent class's version of an overridden method from inside the subclass. Used when the subclass wants to extend (not completely replace) the parent's behavior.\n4. **`this.fieldName` in methods**: refers to the current object's field, disambiguating from same-named local variables or parameters.\n5. Execution order when using `super()`: the parent constructor body completes FIRST, then the subclass constructor body runs. This guarantees parent initialization happens before child initialization.\n6. In JS, `super()` in a subclass `constructor()` must also be called before accessing `this`. Same rule, same reason — parent must initialize its state before the child can use it.\n7. You cannot call both `super()` and `this()` in the same constructor — the compiler rejects it. Both must be first; you can only have one first statement.",
      gotchas: [
        "`super()` or `this()` MUST be the absolute FIRST line in a constructor. You cannot execute any other code before them — not even a variable declaration. This is a compile-time rule, not a runtime convention.",
        "You CANNOT call both `super()` AND `this()` in the same constructor — they both require being the first statement, and there can only be one. Choose: delegate to a sibling constructor (`this()`) or initialize via parent constructor (`super()`).",
        "If the parent class has no no-arg constructor (because you wrote a parameterized one), every subclass constructor MUST explicitly call `super(args)` with the required arguments. The implicit auto-inserted `super()` (no-arg) will fail to compile."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between super() and super.methodName() in Java?",
          answer: "super() calls the parent's constructor — used only in constructor bodies, must be the first statement, triggers parent class initialization. super.methodName() calls the parent's overridden method from inside a subclass method — used in any instance method body, used to extend (not replace) parent behavior. They have completely different purposes."
        },
        {
          question: "What happens if a parent class has no default no-arg constructor and the subclass constructor doesn't call super(args)?",
          answer: "Compilation fails. If you don't write an explicit super() or this() call, the compiler inserts `super()` automatically as the first line. If the parent has no no-arg constructor (because you defined parameterized constructors), the auto-inserted `super()` can't be resolved — compile error. Fix: explicitly call super(requiredArgs) in every subclass constructor."
        },
        {
          question: "What is constructor chaining and when would you use it?",
          answer: "Constructor chaining means one constructor delegating to another — either super() to the parent or this(args) to a sibling. Use it to avoid duplicating initialization logic: the no-arg constructor calls this('default', 0) to delegate to the full constructor. If initialization logic changes, update it in one place. This() is also how you avoid code duplication when you have many overloaded constructors."
        }
      ],
      code: `class Animal {
    String name;
    Animal(String name) { // no default no-arg constructor!
        this.name = name;
        System.out.println("Animal created: " + name);
    }
    void eat() { System.out.println(name + " eats"); }
}

class Dog extends Animal {
    String breed;

    Dog(String name) {
        this(name, "Mixed"); // chains to parameterized Dog constructor
    }

    Dog(String name, String breed) {
        super(name);   // MUST be first — parent has no no-arg constructor
        this.breed = breed;
        System.out.println("Dog created: " + breed);
    }

    @Override
    void eat() {
        super.eat();  // call parent's eat() first
        System.out.println("...with extra enthusiasm!"); // then add to it
    }
}

Dog d = new Dog("Max");
// Output: Animal created: Max → Dog created: Mixed`,
      visualizerType: "memory"
    },
    {
      id: 64,
      title: "Method Overriding",
      intro: "Redefining parent behavior in child. Runtime Polymorphism.",
      explanation: "1. **Method overriding** means a subclass provides its OWN implementation of a method already defined in the superclass. The method name, parameter list, and return type must be IDENTICAL.\n2. The `@Override` annotation is optional but strongly recommended — the compiler verifies that you are actually overriding an existing method. A typo in the name or wrong parameters becomes a compile error instead of silently creating a new method.\n3. **Access modifier rule**: the overriding method CANNOT be more restrictive than the parent method. If parent is `public`, child must be `public`. You can broaden access (protected → public) but not restrict it (public → private fails).\n4. **Return type**: the overriding method can return the SAME type or a **covariant** return type (a subtype). If parent returns `Animal`, override can return `Dog` (since Dog IS-A Animal).\n5. **Runtime polymorphism**: when an overridden method is called through a parent-type reference (`Animal a = new Dog()`), the JVM decides which implementation to run at RUNTIME based on the actual object type — Dog's version runs, not Animal's.\n6. In JS, method overriding works the same — redefine a method in the subclass and it shadows the parent's version. Call `super.method()` to invoke the parent.\n7. **Checked exception rule**: an overriding method cannot throw NEW or BROADER checked exceptions. It can throw fewer or narrower exceptions. This preserves the contract callers expect based on the parent's signature.",
      gotchas: [
        "Forgetting `@Override` means a typo in the method name silently creates a NEW method instead of overriding the parent's. `void eat()` in parent vs `void Eat()` in child — different methods! The parent's `eat()` still exists and won't be overridden. Always use `@Override`.",
        "Making an overriding method MORE restrictive fails to compile. If the parent defines `public void eat()` and the child writes `private void eat()`, Java rejects it — callers hold a parent reference and expect public access; allowing private access would violate the contract.",
        "Static methods cannot be overridden — they can only be HIDDEN. If both parent and child define `static void print()`, calling it through a parent-type reference calls the parent's version. No runtime dispatch. This is fundamentally different from instance method overriding."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of the @Override annotation?",
          answer: "It instructs the compiler to verify that the annotated method actually overrides a superclass or interface method. Without it, a typo in the method name would silently create a new method instead of overriding. With @Override, any mismatch (wrong name, wrong parameters, return type incompatibility) becomes a compile error rather than a subtle runtime bug."
        },
        {
          question: "Can an overriding method in a subclass declare more checked exceptions than the superclass method?",
          answer: "No. An overriding method can throw FEWER or NARROWER checked exceptions, or none at all — but not new or broader ones. This preserves the Liskov Substitution Principle: callers who wrote a try-catch for the parent's declared exceptions should work correctly when a subclass object is substituted. Broader exceptions would require callers to add new catch blocks."
        },
        {
          question: "What is a covariant return type in method overriding?",
          answer: "Java allows an overriding method to return a subtype of the parent method's return type. If the parent returns Animal, the child can return Dog (since Dog IS-A Animal). This is covariant return type. It's useful in fluent APIs and clone() patterns where the subclass return type is more specific and callers don't need to downcast."
        }
      ],
      code: `class Shape {
    String color;
    double area() { return 0.0; } // default implementation
    void describe() { System.out.println("Shape with area: " + area()); }
}

class Circle extends Shape {
    double radius;
    Circle(double r, String color) { this.radius = r; this.color = color; }

    @Override
    double area() {             // must match: same name, params, return type
        return Math.PI * radius * radius;
    }
    // @Override void Area() → compile error: 'Area' doesn't exist in parent
}

class Square extends Shape {
    double side;
    @Override
    double area() { return side * side; } // covariant: same type here, but sub ok too
}

Shape s = new Circle(5, "Red"); // parent reference, child object
System.out.println(s.area());   // calls Circle.area() at runtime — polymorphism!`,
      visualizerType: "dispatch"
    },
    {
      id: 65,
      title: "Packages",
      intro: "Directory folders for organizing files and avoiding naming clashes.",
      explanation: "1. A **package** is a namespace that groups related classes and interfaces. Syntactically, it maps to a folder structure on disk. `com.telusuko.payment` → `com/telusuko/payment/` directory.\n2. **Declaring a package**: first line of a Java file (before any import): `package com.telusuko.payment;`. The file MUST live in the matching folder structure.\n3. **Importing**: to use a class from another package, import it: `import java.util.ArrayList;` or use the full name inline: `java.util.ArrayList<String> list = ...`\n4. **`java.lang` is special**: always auto-imported. `String`, `System`, `Object`, `Math`, `Integer`, `Thread` — no import needed.\n5. **Access control + packages**: the `default` (package-private) access modifier means a class or member is visible only to other classes in the SAME package. This is a powerful encapsulation boundary beyond single classes.\n6. **Convention**: `com.companyname.module` using reverse internet domain order. Globally unique — no two companies share the same domain, so no two companies share the same package name.\n7. **Compiling with packages**: `javac -d . MyClass.java` — the `-d .` flag tells javac to create the folder structure matching the package declaration.",
      gotchas: [
        "If your file declares `package com.telusuko.utils;` but the file is physically located in `com/telusuko/` (missing the `utils/` folder), javac will NOT find it when another class imports it. The physical path and the package declaration MUST match exactly.",
        "Importing a class with `import java.util.*;` (wildcard) does NOT import sub-packages. `import java.util.*` does NOT give you `java.util.concurrent.ConcurrentHashMap` — you must import that explicitly. Wildcards only cover classes directly in that one package.",
        "You cannot use `import` to import a class from the default (unnamed) package into a named package. The default package (no `package` declaration) is isolated — it's for quick test files only, not production code."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of packages in Java?",
          answer: "Packages serve three purposes: (1) Namespace management — two classes with the same name can coexist if they're in different packages (e.g., java.util.Date vs java.sql.Date). (2) Access control — package-private (default) access limits visibility to the package, enabling encapsulation at module level. (3) Organization — groups related classes, making large codebases navigable."
        },
        {
          question: "What is java.lang package and why doesn't it need to be imported?",
          answer: "java.lang is the core Java language package containing fundamental classes: String, Object, System, Math, Integer, Thread, Exception, Enum, etc. It's automatically imported into every Java file by the compiler. Without it, you'd need `import java.lang.String;` before every file — it's imported universally to avoid this boilerplate."
        },
        {
          question: "What is the difference between 'import java.util.ArrayList' and 'import java.util.*'?",
          answer: "import java.util.ArrayList imports that specific class only. import java.util.* imports ALL classes directly in java.util (ArrayList, HashMap, List, Set, etc.) — but NOT sub-packages like java.util.concurrent. Wildcard imports have no runtime performance impact — the compiler resolves specific class references at compile time regardless of how they were imported."
        }
      ],
      code: `// File: src/com/telusuko/payment/PaymentService.java
package com.telusuko.payment; // must match folder: com/telusuko/payment/

import java.util.ArrayList;      // specific import
import java.util.List;

// java.lang.String, java.lang.System — auto-imported, no 'import' needed

public class PaymentService {
    private List<String> transactions = new ArrayList<>();

    public void process(String txId) {
        transactions.add(txId);
        System.out.println("Processed: " + txId); // System from java.lang
    }
}

// Compile with folder structure preservation:
// javac -d . src/com/telusuko/payment/PaymentService.java`,
      visualizerType: "jvm"
    },
    {
      id: 66,
      title: "Access Modifiers",
      intro: "Security gates. private, default, protected, and public.",
      explanation: "1. Java has four access levels, from most restrictive to least: `private` → default (package-private) → `protected` → `public`.\n2. **`private`**: visible ONLY within the declaring class. Not visible to subclasses, not to same-package classes. Use for internal fields and implementation details.\n3. **default (no keyword)**: visible to ALL classes in the SAME package. Invisible to classes outside the package. The implicit level if you write nothing.\n4. **`protected`**: visible in the same package PLUS to subclasses in OTHER packages. Specifically designed for inheritance — parent exposes internals to its children even across packages.\n5. **`public`**: visible everywhere — any class in any package. Use for the public API of your class.\n6. **On classes**: top-level classes can only be `public` or default (package-private). `private` or `protected` on a top-level class is a compile error. Nested classes can be all four.\n7. In JS, `#privateField` (ES2022) is the only enforced access control — everything else is convention (`_privateLike`). Java's access modifiers are compile-time enforced — the compiler rejects unauthorized access, not just at runtime.",
      gotchas: [
        "Top-level (non-nested) classes can ONLY be `public` or default (package-private). Writing `private class MyClass` or `protected class MyClass` at the top level is a compile error. These modifiers are only valid on nested/inner classes.",
        "`protected` is often misunderstood: it's NOT just 'visible to subclasses everywhere'. It's 'visible to subclasses' AND 'visible to same-package classes'. A subclass in a DIFFERENT package can access `protected` members through inheritance (i.e., `this.protectedMethod()`) but CANNOT access them through an instance of the parent class.",
        "Access modifiers on local variables (inside method bodies) are not allowed — only `final` is permitted. Access modifiers only apply to class members (fields, methods, nested classes) and top-level/nested class declarations."
      ],
      interviewQuestions: [
        {
          question: "What are the four access modifiers in Java and their visibility scopes?",
          answer: "private: class only. default (no keyword): same package only. protected: same package + subclasses in any package. public: everywhere. The key insight: protected extends default by granting subclass access across packages — which is specifically designed to support inheritance hierarchies."
        },
        {
          question: "Compare protected access modifier with default (package-private).",
          answer: "Default: visible to ALL classes in the same package, but INVISIBLE to anything outside the package — even subclasses in other packages. Protected: same package visibility PLUS subclasses in different packages can access it through inheritance. Protected is a superset of default, extended specifically for inheritance across package boundaries."
        },
        {
          question: "Can a class be declared private in Java?",
          answer: "A top-level class cannot be private or protected — only public or default. These restrictions make no semantic sense at the top level (who would a private top-level class be private FROM?). However, a nested (inner or static nested) class CAN be declared private, protecting it so only the outer class can instantiate or reference it."
        }
      ],
      code: `package com.example;

public class AccessDemo {
    private   int secret   = 1; // class only
              int pkg      = 2; // default — same package only
    protected int extended = 3; // package + subclasses everywhere
    public    int open     = 4; // everywhere

    private void doInternal() { /* class only */ }
    public  void doPublic()   { /* everyone */ }
}

// In same package — com.example:
class SamePackage {
    void test(AccessDemo d) {
        // d.secret → compile error (private)
        System.out.println(d.pkg);      // OK (default)
        System.out.println(d.extended); // OK (protected — same package)
        System.out.println(d.open);     // OK (public)
    }
}

// In different package — com.other — as a subclass:
// class Child extends AccessDemo {
//     void test() {
//         System.out.println(extended); // OK — inherited protected via 'this'
//         // System.out.println(pkg);  // compile error — different package
//     }
// }`,
      visualizerType: "jvm"
    },
    {
      id: 67,
      title: "Polymorphism",
      intro: "One interface, many implementations.",
      explanation: "1. **Polymorphism** (Greek: poly = many, morph = form): the ability of a single reference type to represent objects of different types, and for method calls through that reference to produce different behavior based on the actual object.\n2. **Two types**: **Compile-time polymorphism** (static binding) = method overloading — resolved at compile time based on argument types. **Runtime polymorphism** (dynamic binding) = method overriding — resolved at runtime based on the actual object type.\n3. **Runtime polymorphism in action**: `Animal a = new Dog(); a.makeSound();` — the compiler sees `Animal` and allows `makeSound()` (Animal defines it). At runtime, the JVM sees the actual object is `Dog` and calls `Dog.makeSound()`.\n4. **Why it matters**: you can write code that operates on the ABSTRACT type — a method that accepts `Shape` works for `Circle`, `Rectangle`, and `Triangle` without knowing which one. Add a new shape → zero changes to existing code. This is the Open/Closed Principle.\n5. **Fields are NOT polymorphic**: only methods are. If both parent and child declare a field with the same name, access is based on the REFERENCE type (compile time), not the object type. Only method calls use runtime dispatch.\n6. In JS, all method calls are dynamically dispatched by default — there is no compile-time type to resolve against. Java's runtime polymorphism is explicit and requires inheritance or interface relationships.\n7. Polymorphism is the mechanism behind design patterns like Strategy, Factory, and Command — all depend on calling overridden methods through abstract type references.",
      gotchas: [
        "Polymorphism only applies to INSTANCE methods, not fields. If both `Animal` and `Dog` declare `String type`, then `Animal a = new Dog(); System.out.println(a.type)` prints Animal's value — field access is resolved at compile time based on the reference type.",
        "The reference type determines what methods you CAN CALL (compile-time check). The actual object type determines which implementation RUNS (runtime dispatch). `Animal a = new Dog();` — `a.fetchBall()` is a compile error even if Dog has that method, because Animal doesn't declare it.",
        "Calling a static method through a parent-type reference does NOT use polymorphism. `Animal.sound()` always calls Animal's version — static methods are resolved at compile time and are never dynamically dispatched, even when called through an instance reference."
      ],
      interviewQuestions: [
        {
          question: "What is runtime polymorphism and how does it work?",
          answer: "Runtime polymorphism (dynamic method dispatch) means the actual method executed is determined at runtime based on the actual type of the object, not the declared type of the reference variable. When you write `Animal a = new Dog(); a.sound()`, the compiler verifies 'sound()' exists on Animal. At runtime, the JVM checks the actual object (Dog) and calls Dog's overridden sound(). This requires inheritance and method overriding."
        },
        {
          question: "Are instance fields overridden in subclasses?",
          answer: "No — fields are not polymorphic. If a subclass declares a field with the same name as the parent, the subclass field HIDES the parent field (not overrides). Access is determined by the REFERENCE type at compile time: `Animal a = new Dog(); a.name` accesses Animal's name field, not Dog's — even if the actual object is Dog. Use methods (which ARE polymorphic) to expose fields."
        },
        {
          question: "What is the difference between compile-time and runtime polymorphism?",
          answer: "Compile-time (static binding): the method to call is resolved at compile time based on reference type and argument types — achieved through method overloading. Runtime (dynamic binding): the method implementation to call is resolved at runtime based on actual object type — achieved through method overriding. Overloading is determined before the program runs; overriding is determined while it runs."
        }
      ],
      code: `class Animal {
    String type = "Animal"; // field — NOT polymorphic
    void sound() { System.out.println("..."); }
}

class Dog extends Animal {
    String type = "Dog";    // hides Animal's field, does NOT override
    @Override
    void sound() { System.out.println("Woof!"); }
}

class Cat extends Animal {
    @Override
    void sound() { System.out.println("Meow!"); }
}

// Runtime polymorphism — one method, many behaviors:
Animal[] animals = { new Dog(), new Cat(), new Dog() };
for (Animal a : animals) {
    a.sound(); // JVM dispatches to Dog.sound() or Cat.sound() at runtime
}

// Field access uses REFERENCE type (not polymorphic):
Animal a = new Dog();
System.out.println(a.type); // "Animal" — reference type wins for fields
System.out.println(((Dog)a).type); // "Dog" — downcast to access Dog's field`,
      visualizerType: "dispatch"
    },
    {
      id: 68,
      title: "Dynamic Method Dispatch",
      intro: "The magic engine of Java interfaces and design patterns.",
      explanation: "1. **Dynamic Method Dispatch** (DMD) is the mechanism by which Java resolves, at RUNTIME, which overridden method implementation to call when a superclass/interface reference is used.\n2. **Two-step process**: at compile time, the compiler uses the REFERENCE TYPE to verify the method exists and is accessible. At runtime, the JVM uses the ACTUAL OBJECT TYPE to find and call the most specific overriding implementation.\n3. **How the JVM does it**: every class has a **virtual method table (vtable)** — an array of method pointers. When `Dog` overrides `sound()`, Dog's vtable entry for `sound` points to Dog's implementation, not Animal's. The JVM follows the vtable of the actual object, not the reference type.\n4. **Practical consequence**: `Animal a = new Dog(); a.sound()` → compiler sees Animal's vtable slot for `sound`. JVM follows Dog's object → Dog's vtable → calls `Dog.sound()`. The reference type is irrelevant at runtime for method dispatch.\n5. **Interface dispatch**: the same applies to interface references. `Drawable d = new Circle(); d.draw()` calls `Circle.draw()` at runtime, regardless of `d`'s declared type being `Drawable`.\n6. In JS, all method calls are dynamically dispatched through the prototype chain — DMD is the default, always. Java has explicit compile-time type checking first, then runtime dispatch. This makes Java safer (catch wrong method calls at compile time) while still flexible (right implementation at runtime).\n7. **DMD is what makes design patterns like Strategy, Observer, and Factory work**: you code to interfaces, and DMD ensures the right concrete implementation runs at runtime without the calling code needing to know the concrete type.",
      gotchas: [
        "You CANNOT call child-specific methods through a parent reference, even if the actual object is the child. `Animal a = new Dog(); a.fetchBall()` is a compile error if `fetchBall()` is only in `Dog`. The compiler only knows about `Animal`'s API — it doesn't look ahead at the runtime type.",
        "Dynamic dispatch applies ONLY to overriding instance methods. Static methods, constructors, and private methods do NOT go through vtable lookup — they use static binding at compile time. Calling a static method via an instance reference still calls the reference type's version.",
        "Downcasting allows calling child-specific methods: `((Dog) a).fetchBall()` compiles and works — but if `a` actually holds a `Cat`, you get a `ClassCastException` at runtime. Always check with `instanceof` before downcasting: `if (a instanceof Dog d) { d.fetchBall(); }`"
      ],
      interviewQuestions: [
        {
          question: "How does Dynamic Method Dispatch work under the hood in the JVM?",
          answer: "The JVM uses virtual method tables (vtables). Each class has a vtable — an array indexed by method slot number. When a class overrides a method, its vtable entry for that slot points to its own implementation. At runtime, calling a method through a reference looks up the actual object's vtable entry — Dog's vtable gives Dog's sound(), even through an Animal reference. This is O(1) dispatch."
        },
        {
          question: "Why can't you call child-specific methods through a parent reference without casting?",
          answer: "The compiler only knows the reference type at compile time — Animal in `Animal a = new Dog()`. Since Animal doesn't declare fetchBall(), the compiler has no way to verify correctness and rejects the call. You need to downcast: `((Dog)a).fetchBall()`. The JVM then verifies the actual type matches Dog at runtime, throwing ClassCastException if not."
        },
        {
          question: "What is the difference between static binding and dynamic binding in Java?",
          answer: "Static binding (compile-time): the method/field to call is resolved at compile time — applies to static methods, private methods, final methods, and field access. Dynamic binding (runtime): the method implementation is resolved at runtime based on actual object type — applies to all non-static, non-private, non-final instance methods. Dynamic binding is what enables polymorphism; static binding is faster but inflexible."
        }
      ],
      code: `class Payment {
    void process() { System.out.println("Generic payment"); }
}
class CreditCard extends Payment {
    @Override void process() { System.out.println("Credit card charged"); }
    void printStatement() { System.out.println("Card statement..."); }
}
class UPI extends Payment {
    @Override void process() { System.out.println("UPI transferred"); }
}

// Dynamic dispatch — reference type is Payment, actual types vary:
Payment[] payments = { new CreditCard(), new UPI(), new CreditCard() };
for (Payment p : payments) {
    p.process(); // JVM follows each object's vtable at runtime
}

// Compile error — compiler only knows Payment reference:
// payments[0].printStatement(); // CreditCard-specific, invisible from Payment ref

// Fix: downcast with instanceof:
if (payments[0] instanceof CreditCard cc) {
    cc.printStatement(); // safe — Java 16+ pattern matching instanceof
}`,
      visualizerType: "dispatch"
    },
    {
      id: 69,
      title: "final Keyword",
      intro: "Make variables constant, prevent overriding, and ban inheritance.",
      explanation: "1. `final` has three contexts, each with a distinct meaning:\n   - **`final` variable**: value cannot be reassigned after initial assignment. Makes it a constant.\n   - **`final` method**: cannot be overridden by any subclass. The implementation is locked.\n   - **`final` class**: cannot be extended (subclassed) at all. E.g., `String`, `Integer`, `System` are all final.\n2. **`final` instance fields** must be initialized EITHER at declaration OR in EVERY constructor path. The compiler verifies this — a final field left uninitialized by any constructor path is a compile error.\n3. **`final` reference variables**: the REFERENCE cannot be reassigned (you can't point it to a different object), but the OBJECT it points to is still mutable. `final List<String> list = new ArrayList<>(); list.add(\"x\");` is valid — you're mutating the object, not the reference.\n4. **`static final` fields** = true constants. Convention: `UPPER_SNAKE_CASE`. Computed once at class load and never change: `static final double PI = Math.PI;`\n5. `final` methods are slightly faster because the JVM can inline them — no vtable lookup needed for a method that can never be overridden.\n6. In JS, `const` is the closest equivalent — the binding is constant (can't reassign) but the value (object) can mutate. Same semantic as Java's `final` reference.\n7. **Blank final**: a `final` field declared without an initial value. MUST be initialized in the constructor. Useful for fields whose value isn't known until construction time.",
      gotchas: [
        "Making an object reference `final` does NOT make the object immutable. `final Circle c = new Circle(); c.radius = 10;` is fine — you mutated the object, not the reference. To make the object truly immutable, you need to make all its fields final and private too.",
        "`final` methods are a performance hint to the JVM — it can devirtualize (inline) the call. But do NOT add `final` to methods just for performance — it prevents legitimate subclass customization. Only use `final` when the method behavior genuinely must not change.",
        "A `final` class cannot be extended — this is enforced at compile time. If you try to `extends String`, the compiler refuses. This is used to prevent subclasses from breaking invariants (String's immutability would be compromised by a mutable subclass)."
      ],
      interviewQuestions: [
        {
          question: "What are the three uses of the final keyword in Java?",
          answer: "1. final variable: cannot be reassigned after initial assignment — for primitives, the value is constant; for objects, the reference is constant (object can still mutate). 2. final method: cannot be overridden in any subclass — locks the implementation. 3. final class: cannot be subclassed at all — String, Integer, and System are final. Each use locks a different thing: value, behavior, or hierarchy."
        },
        {
          question: "What is a blank final variable?",
          answer: "A final variable declared without an initial value. It must be assigned exactly once, and that assignment must happen in the constructor (for instance fields) before the object is usable. If any constructor path exists that doesn't initialize the blank final, the compiler rejects it. Blank finals are useful for values not known until construction time, like an ID assigned from a database."
        },
        {
          question: "Why is String declared as a final class?",
          answer: "String's immutability guarantee depends on no subclass being able to override its methods and introduce mutation. If String weren't final, a malicious or buggy subclass could override charAt() or length() to behave differently, breaking the String Pool (pool relies on content never changing) and security guarantees (credentials passed as String could be mutated post-validation). final prevents this."
        }
      ],
      code: `// final variable — primitive: value locked
final int MAX = 100;
// MAX = 200; // compile error

// final reference — object still mutable!
final java.util.List<String> items = new java.util.ArrayList<>();
items.add("hello"); // OK — mutating the object, not the reference
// items = new java.util.ArrayList<>(); // compile error — reassigning reference

// final instance field (blank final — must init in constructor):
class Order {
    final String orderId;
    Order(String id) { this.orderId = id; } // must assign in EVERY constructor
}

// final method — subclass cannot override:
class Base { final void secure() { System.out.println("Cannot override this"); } }

// final class — cannot be extended:
final class ImmutablePoint { final int x, y; ImmutablePoint(int x, int y) { this.x=x; this.y=y; } }
// class SubPoint extends ImmutablePoint {} // compile error!`,
      visualizerType: "memory"
    },
    {
      id: 70,
      title: "Object Class: equals(), toString(), hashCode()",
      intro: "The grandparent of all Java classes. The universal base class.",
      explanation: "1. `java.lang.Object` is the root of every class hierarchy. Every class implicitly extends `Object` (even if you write no `extends`). Every object can be assigned to `Object obj = anything;`.\n2. **`toString()`**: called automatically by `System.out.println()`, string concatenation, and loggers. Default implementation returns `getClass().getName() + '@' + Integer.toHexString(hashCode())` — e.g. `Student@7852e922`. Override it to return something meaningful: `return \"Student{name=\" + name + \"}\"`.\n3. **`equals(Object o)`**: default implementation uses `==` — reference equality (same heap address). Override to compare object CONTENT: two Student objects with the same ID should be equal even if they're different heap objects.\n4. **`hashCode()`**: returns an integer used by hash-based collections (HashMap, HashSet) to determine which bucket an object goes into. Default implementation returns the memory address-based value (varies per run).\n5. **The equals-hashCode contract** (critical): if `a.equals(b)` is true, then `a.hashCode()` MUST equal `b.hashCode()`. The reverse is NOT required — hash collisions are allowed. Violating this contract silently breaks HashMap/HashSet behavior.\n6. In JS, `==` is content-aware for primitives but identity-based for objects. Java's `==` is ALWAYS identity-based for objects. Java explicitly requires you to override `equals()` for value semantics.\n7. Other Object methods: `getClass()` — returns the runtime class. `clone()` — shallow copy (must implement Cloneable). `wait()/notify()/notifyAll()` — low-level thread coordination. `finalize()` — deprecated (GC hook, avoid).",
      gotchas: [
        "If you override `equals()`, you MUST override `hashCode()`. Failing to do so means two objects that are equal by your `equals()` have DIFFERENT hash codes — HashMap/HashSet will put them in different buckets and never find one when looking up the other. Silent, catastrophic bug.",
        "The default `hashCode()` is based on object identity (essentially the memory address, though not guaranteed). Two `new Student(\"Alice\", 1)` objects have DIFFERENT default hash codes and DIFFERENT default equals results, even with identical field values. Always override both for entity classes.",
        "`hashCode()` must be consistent: calling it multiple times on the same object must return the same value within one JVM execution. It does NOT need to return the same value across different JVM runs (though it often does for simple int-based calculations)."
      ],
      interviewQuestions: [
        {
          question: "Why must you override hashCode() when you override equals()?",
          answer: "The equals-hashCode contract: if two objects are equal (equals() returns true), they MUST have the same hashCode(). HashMap and HashSet first find the bucket using hashCode(), then use equals() within that bucket. If equal objects have different hash codes, they land in different buckets — HashSet shows duplicates, HashMap.get() returns null for a key you just put in. This is a silent, hard-to-debug corruption."
        },
        {
          question: "What does the default toString() implementation return, and why should you override it?",
          answer: "Default: className@hexHashCode — e.g., 'Student@7852e922'. This is useless for debugging. Override to return a human-readable representation of the object's state: 'Student{id=1, name=Alice}'. This appears in logs, debug output, and println — a meaningful toString() is invaluable during development and debugging."
        },
        {
          question: "Explain the contract between equals() and hashCode() methods.",
          answer: "Contract: if a.equals(b) returns true, then a.hashCode() MUST equal b.hashCode(). If a.hashCode() != b.hashCode(), then a.equals(b) MUST return false (they can't be equal). But if a.hashCode() == b.hashCode(), equals() can still return false (hash collision is allowed). In short: equal objects → same hash; different hash → unequal objects; same hash → may or may not be equal."
        }
      ],
      code: `class Student {
    int id;
    String name;

    Student(int id, String name) { this.id = id; this.name = name; }

    @Override
    public String toString() {
        return "Student{id=" + id + ", name=" + name + "}";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;           // same reference shortcut
        if (!(obj instanceof Student)) return false; // type check
        Student other = (Student) obj;
        return this.id == other.id;             // compare by ID
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id); // MUST be consistent with equals()
    }
}

Student s1 = new Student(1, "Alice");
Student s2 = new Student(1, "Alice");
System.out.println(s1.equals(s2));   // true — same id
System.out.println(s1.hashCode() == s2.hashCode()); // true — contract kept
System.out.println(s1);              // Student{id=1, name=Alice}`,
      visualizerType: "jvm"
    },
    {
      id: 71,
      title: "Upcasting and Downcasting",
      intro: "Climbing up and down the class hierarchy ladder.",
      explanation: "1. **Upcasting**: assigning a subclass object to a superclass reference — `Animal a = new Dog()`. This is IMPLICIT and SAFE — a Dog IS-A Animal, always. No cast syntax needed.\n2. **Downcasting**: casting a superclass reference back to a subclass type — `Dog d = (Dog) a`. This is EXPLICIT and potentially UNSAFE — the actual object must be a Dog (not a Cat) or you get a `ClassCastException` at runtime.\n3. After upcasting, you can ONLY call methods that exist on the reference type (Animal). Dog-specific methods like `fetchBall()` are invisible through an Animal reference — you must downcast first.\n4. After a safe downcast, you have full access to the subclass's methods and fields.\n5. **`instanceof` operator**: always check before downcasting — `if (a instanceof Dog d)` (Java 16+ pattern matching) or `if (a instanceof Dog) { Dog d = (Dog) a; }`. Prevents ClassCastException.\n6. In JS, there's no enforced type system at runtime — you can call any method on any object and get undefined/TypeError only at the call site. Java catches type incompatibility before the call, not during.\n7. **Why upcasting is useful**: you can write methods that accept `Animal` parameters and they work for any subclass — `void processAnimal(Animal a) { a.eat(); }` handles Dog, Cat, and Bird uniformly.",
      gotchas: [
        "Downcasting to a type that the actual object is NOT throws `ClassCastException` at runtime — not a compile error. `Animal a = new Cat(); Dog d = (Dog) a;` compiles but crashes at runtime. Always use `instanceof` before downcasting.",
        "After upcasting, you LOSE access to subclass-specific members through the reference. `Animal a = new Dog(); a.fetchBall()` is a compile error — Animal doesn't declare fetchBall. The dog's methods still exist on the heap object, but the compiler won't let you call them through an Animal reference.",
        "Java 16+ pattern matching instanceof combines the type check and cast in one: `if (a instanceof Dog d) { d.fetchBall(); }`. The variable `d` is only in scope inside the if block. This eliminates the verbose two-step check-then-cast pattern and is the modern preferred approach."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between upcasting and downcasting in Java?",
          answer: "Upcasting: subclass object assigned to superclass reference (Dog → Animal). Always safe and implicit — no cast syntax needed. You lose access to subclass-specific methods. Downcasting: superclass reference explicitly cast to subclass type ((Dog) animalRef). Potentially unsafe — throws ClassCastException at runtime if the actual object isn't that subclass. Always check with instanceof first."
        },
        {
          question: "What is ClassCastException and how do we prevent it?",
          answer: "ClassCastException occurs when you try to cast an object to a class it is NOT an instance of — e.g., casting a Cat object to Dog at runtime. It's a runtime exception, not a compile error. Prevention: use the instanceof operator before casting: `if (a instanceof Dog) { Dog d = (Dog) a; d.fetchBall(); }`. Java 16+ pattern matching: `if (a instanceof Dog d) { d.fetchBall(); }` — cleaner and safer."
        },
        {
          question: "Why would you upcast an object and then downcast it back?",
          answer: "Upcasting enables polymorphism — you can store mixed types in a single array/collection of the parent type and process them uniformly. When you need subclass-specific behavior for a specific element, you downcast back. Example: storing Dog and Cat in Animal[], iterating to call eat() on all, then downcasting specific elements to Dog to call fetchBall(). This is the polymorphism + specific behavior combo."
        }
      ],
      code: `class Animal { void eat() { System.out.println("Eating"); } }
class Dog extends Animal {
    void fetchBall() { System.out.println("Fetching!"); }
}
class Cat extends Animal {
    void purr() { System.out.println("Purring..."); }
}

// Upcasting — implicit, safe, no cast syntax:
Animal a = new Dog();   // Dog IS-A Animal
a.eat();                // OK — Animal method
// a.fetchBall();       // compile error — Animal doesn't declare fetchBall

// Downcasting — explicit, risky:
if (a instanceof Dog d) { // Java 16+ pattern matching instanceof
    d.fetchBall();         // safe — JVM verified it's a Dog
}

// Dangerous downcast — compiles but crashes at runtime:
Animal cat = new Cat();
// Dog d2 = (Dog) cat; // ClassCastException at runtime!

// Store mixed types, process uniformly:
Animal[] animals = { new Dog(), new Cat(), new Dog() };
for (Animal animal : animals) {
    animal.eat(); // polymorphism — eat() dispatched to correct type
    if (animal instanceof Dog dog) dog.fetchBall(); // type-specific behavior
}`,
      visualizerType: "memory"
    },
    {
      id: 72,
      title: "Wrapper Class",
      intro: "Wrapping primitives inside objects for the Collection framework.",
      explanation: "1. Java's Collection framework (ArrayList, HashMap, HashSet…) only stores **objects**, not primitives. `ArrayList<int>` is illegal — the type parameter must be an object type.\n2. **Wrapper classes** solve this: each primitive has a corresponding object class — `int → Integer`, `double → Double`, `boolean → Boolean`, `char → Character`, `long → Long`, `float → Float`, `byte → Byte`, `short → Short`.\n3. **Autoboxing**: Java automatically converts a primitive to its wrapper when needed — `Integer i = 5;` Java inserts `Integer.valueOf(5)` behind the scenes.\n4. **Auto-unboxing**: the reverse — wrapper to primitive — `int x = new Integer(10);` Java inserts `.intValue()` automatically.\n5. **Utility methods**: wrapper classes expose useful static methods: `Integer.parseInt(\"42\")`, `Double.parseDouble(\"3.14\")`, `Integer.MAX_VALUE`, `Integer.toBinaryString(255)`, `Integer.compare(a, b)`.\n6. In JS, there are no primitives-vs-objects at the collection level — arrays hold anything. Java's separation of primitive and object types is a performance design: primitives (int, double) use less memory than objects. Wrappers add object overhead — use them only when you need an object.\n7. **Integer Cache**: the JVM caches Integer objects with values -128 to 127. `Integer.valueOf(100) == Integer.valueOf(100)` is `true` (same cached object). `Integer.valueOf(1000) == Integer.valueOf(1000)` is `false` (two different heap objects).",
      gotchas: [
        "Comparing wrapper objects with `==` compares REFERENCES, not values. `Integer a = 200; Integer b = 200; a == b` is **false** because 200 is outside the cache range (-128 to 127), so two separate heap objects are created. ALWAYS use `.equals()` for wrapper comparison.",
        "Auto-unboxing a null wrapper throws `NullPointerException`. `Integer count = null; int x = count;` — Java tries to call `count.intValue()` on null → NPE. Always null-check before unboxing, especially when working with map lookups that might return null.",
        "Autoboxing in tight loops creates massive GC pressure. `for (int i = 0; i < 1_000_000; i++) { list.add(i); }` — each `i` is boxed to an `Integer` object. One million Integer allocations. If performance matters, use `IntStream` or a primitive array instead of `ArrayList<Integer>`."
      ],
      interviewQuestions: [
        {
          question: "Why do we need wrapper classes in Java?",
          answer: "Java's generic collections (ArrayList, HashMap, HashSet) can only store object references — not primitive values. Wrapper classes (Integer, Double, Boolean, etc.) box primitives into objects so they can be stored in collections. They also provide utility methods (parseInt, max, compare) and constants (MAX_VALUE, MIN_VALUE) that primitives lack."
        },
        {
          question: "Explain the Integer Cache mechanism in Java.",
          answer: "The JVM pre-creates and caches Integer objects for values -128 to 127 (inclusive). Integer.valueOf(100) always returns the same cached object — == comparison returns true for values in this range. For values outside the range (e.g., 128, 200), valueOf() creates a new object each time — == returns false. This is why == on Integer objects is unreliable; use equals() always."
        },
        {
          question: "What is the difference between autoboxing and auto-unboxing, and what are their dangers?",
          answer: "Autoboxing: primitive → wrapper, done automatically by compiler (int 5 → Integer.valueOf(5)). Auto-unboxing: wrapper → primitive (Integer obj → obj.intValue()). Dangers: (1) Auto-unboxing null throws NullPointerException — `int x = (Integer) null` crashes. (2) Autoboxing in loops allocates many wrapper objects — GC pressure and slower execution. (3) == comparison between autoboxed Integers depends on the cache range — inconsistent behavior."
        }
      ],
      code: `// Primitive not allowed in generics:
// ArrayList<int> list = new ArrayList<>(); // compile error!

// Wrapper class allows it:
java.util.ArrayList<Integer> nums = new java.util.ArrayList<>();
nums.add(10);  // autoboxing: 10 (int) → Integer.valueOf(10)
int x = nums.get(0); // auto-unboxing: Integer → int

// Integer Cache (-128 to 127):
Integer a = 100, b = 100;
System.out.println(a == b); // true  — same cached object!

Integer c = 200, d = 200;
System.out.println(c == d); // false — outside cache range, new objects
System.out.println(c.equals(d)); // true  — use equals() always!

// Utility methods:
int parsed = Integer.parseInt("42");       // String → int
String binary = Integer.toBinaryString(9); // "1001"
int max = Integer.MAX_VALUE;               // 2,147,483,647

// NullPointerException trap:
Integer count = null;
// int total = count; // NPE — auto-unboxing null!`,
      visualizerType: "memory"
    }
  ]
};
