export default {
  id: 7,
  title: "Inheritance & Polymorphism",
  range: "59-72",
  concepts: [
    {
      id: 59,
      title: "Need for Inheritance",
      intro: "Don't copy-paste behaviors. Reuse logic to write DRY code.",
      explanation: "Imagine writing code for a `Manager` and a `Developer`. Both share fields like `name`, `id`, and `salary`. Instead of rewriting these fields, we create a parent class `Employee` to share common features.",
      gotchas: [
        "Using inheritance just to reuse variables can couple classes too tightly. Prefer composition (HAS-A) over inheritance (IS-A) where appropriate."
      ],
      interviewQuestions: [
        {
          question: "Why is composition often preferred over inheritance?",
          answer: "Inheritance creates a tight compile-time coupling (IS-A). Composition (HAS-A) maintains encapsulation, makes code flexible, and allows dynamic swapping of dependencies at runtime."
        }
      ],
      code: "// Inheritance creates: class Developer extends Employee { ... }",
      visualizerType: "dispatch"
    },
    {
      id: 60,
      title: "What Is Inheritance?",
      intro: "The IS-A relationship mechanism.",
      explanation: "One class (subclass/child) inherits properties and behaviors of another class (superclass/parent) using the `extends` keyword. Reusability at its peak.",
      gotchas: [
        "Private members of the superclass are inherited but cannot be accessed directly by child class methods. Use getters/setters or protected access modifier."
      ],
      interviewQuestions: [
        {
          question: "Does subclass inherit private fields of superclass?",
          answer: "Yes, they are part of the subclass memory layout, but they cannot be accessed directly by subclass methods. Access must occur through inherited public/protected methods."
        }
      ],
      code: `class Animal {
    void eat() { System.out.println("Eating..."); }
}
class Cat extends Animal {
    void meow() { System.out.println("Meow!"); }
}`,
      visualizerType: "dispatch"
    },
    {
      id: 61,
      title: "Single and Multilevel Inheritance",
      intro: "Family chains. Dog inherits Animal (Single). Labrador inherits Dog (Multilevel).",
      explanation: "Single: one subclass extends one superclass. Multilevel: a subclass extends a class which itself is extending a superclass. Inheritance depth should not be too deep for readability.",
      gotchas: [
        "Deep multilevel inheritance chains (e.g. 5+ levels) make debugging and tracking bugs extremely hard due to overridden behaviors."
      ],
      interviewQuestions: [
        {
          question: "What is the maximum depth of inheritance in Java?",
          answer: "There is no theoretical limit set by the JVM spec, but practical API design limits inheritance depth to 3-4 levels to prevent tight coupling."
        }
      ],
      code: `class A {}
class B extends A {} // Single
class C extends B {} // Multilevel`,
      visualizerType: "dispatch"
    },
    {
      id: 62,
      title: "Multiple Inheritance",
      intro: "The Diamond Problem. Why Java banned multiple inheritance with classes.",
      explanation: "If Class C extends Class A and Class B, and both A and B define a method `display()`, which one should C execute? This ambiguity is called the Diamond Problem. Java prevents this by allowing a class to extend only one class.",
      gotchas: [
        "Java does NOT support multiple class inheritance. However, you can achieve multiple interface inheritance because interfaces don't contain conflicting state fields."
      ],
      interviewQuestions: [
        {
          question: "How does Java solve the Diamond Problem?",
          answer: "Java forbids a class from extending multiple classes. It allows implementing multiple interfaces. In case of conflicting default methods in interfaces, the compiler forces the programmer to override and resolve the conflict manually."
        }
      ],
      code: `// class Child extends Parent1, Parent2 // COMPILE ERROR!
// Interface implementation provides safe alternative.`,
      visualizerType: "dispatch"
    },
    {
      id: 63,
      title: "this and super Methods",
      intro: "Constructor chaining. Invoking sibling and parent constructors.",
      explanation: "`super()` calls the constructor of the parent class. `this()` calls another constructor within the same class. Every subclass constructor implicitly calls `super()` as its very first statement.",
      gotchas: [
        "`super()` or `this()` must be the absolute FIRST line in a constructor. You cannot call both in the same constructor!"
      ],
      interviewQuestions: [
        {
          question: "What happens if a parent class has no default (no-arg) constructor, and subclass constructor doesn't call super(args)?",
          answer: "Compilation fails. The compiler tries to inject 'super()' (default call) automatically, which doesn't exist in parent class. Subclass must explicitly call 'super(args)'."
        }
      ],
      code: `class Parent {
    Parent(int x) {}
}
class Child extends Parent {
    Child() {
        super(10); // Required! Compiler error if omitted.
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 64,
      title: "Method Overriding",
      intro: "Redefining parent behavior in child. Runtime Polymorphism.",
      explanation: "Providing a specific implementation of a method in subclass that is already defined in superclass. Method name, parameter list, and return type must be exactly the same.",
      gotchas: [
        "Overriding methods cannot restrict access. If parent method is `public`, subclass overridden method must be `public`. Retricting it to `private` causes compile error."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of @Override annotation?",
          answer: "It tells compiler to verify that the method is indeed overriding a superclass method. If you make typo in name or parameters, the compiler throws error rather than treating it as a new method."
        }
      ],
      code: `class Shape {
    void draw() { System.out.println("Draw shape"); }
}
class Circle extends Shape {
    @Override
    void draw() { System.out.println("Draw circle"); } // Overridden!
}`,
      visualizerType: "dispatch"
    },
    {
      id: 65,
      title: "Packages",
      intro: "Directory folders for organizing files and avoiding naming clashes.",
      explanation: "Packages group related classes. Keywords: `package com.mycompany;` at top of file, and `import package.ClassName;` to use classes from other packages. Standard package prefix is reverse domain name.",
      gotchas: [
        "If you compile a class inside a package, you must compile from root directory using `javac -d . ClassName.java` to generate package folder structure."
      ],
      interviewQuestions: [
        {
          question: "What is java.lang package?",
          answer: "It is the default package imported automatically into every Java class. It contains core classes like String, Object, Math, System, Exception, etc."
        }
      ],
      code: `package com.telusuko.quiz;
import java.util.ArrayList; // Importing external utility`,
      visualizerType: "jvm"
    },
    {
      id: 66,
      title: "Access Modifiers",
      intro: "Security gates. private, default, protected, and public.",
      explanation: `1. private: visible inside class only.
2. default (no modifier): visible inside package only.
3. protected: visible inside package and to subclasses in different packages.
4. public: visible everywhere.`,
      gotchas: [
        "Classes cannot be marked private or protected (unless nested). Top-level classes can only be public or default."
      ],
      interviewQuestions: [
        {
          question: "Compare protected access modifier with default (package-private).",
          answer: "Default is visible only to classes in the same package. Protected is visible in the same package, but also accessible by subclasses in different packages."
        }
      ],
      code: `public class AccessDemo {
    private int secret = 42; // only this class
    protected int shared = 100; // package & subclasses
    public int open = 999; // everyone
}`,
      visualizerType: "jvm"
    },
    {
      id: 67,
      title: "Polymorphism",
      intro: "One interface, many implementations.",
      explanation: "Greek: 'Poly' (Many) + 'Morph' (Form). Ability of an entity to take different forms. Types: Compile-time polymorphism (Method Overloading) and Runtime polymorphism (Method Overriding).",
      gotchas: [
        "Polymorphism only applies to instance methods! Variables (fields) are NOT polymorphic in Java. They are resolved statically based on reference type."
      ],
      interviewQuestions: [
        {
          question: "Are instance fields overridden in subclasses?",
          answer: "No, fields are not polymorphic. If a subclass redefines a field, it hides the superclass field. Access is resolved using compile-time reference type."
        }
      ],
      code: `Parent obj = new Child();
System.out.println(obj.name); // accesses parent's field (No polymorphism for fields!)
obj.show(); // calls child's method (Polymorphism in action!)`,
      visualizerType: "dispatch"
    },
    {
      id: 68,
      title: "Dynamic Method Dispatch",
      intro: "The magic engine of Java interfaces and design patterns.",
      explanation: "When an overridden method is called through a superclass reference variable, Java resolves which method version to execute at runtime. Reference type checks what methods are callable; the actual object type determines which implementation executes.",
      gotchas: [
        "You cannot call child-specific methods using a parent reference variable without casting, even if the actual object is a child!"
      ],
      interviewQuestions: [
        {
          question: "How does Dynamic Method Dispatch work under the hood?",
          answer: "JVM uses virtual method tables (vtables) allocated for each class. vtable points to the resolved bytecode locations of methods. Overridden methods overwrite index references in vtable."
        }
      ],
      code: `class Computer {
    void powerOn() { System.out.println("Beep"); }
}
class Mac extends Computer {
    void powerOn() { System.out.println("Chime"); }
}
Computer comp = new Mac();
comp.powerOn(); // Prints: Chime (Dynamic dispatch!)`,
      visualizerType: "dispatch"
    },
    {
      id: 69,
      title: "final Keyword",
      intro: "Make variables constant, prevent overriding, and ban inheritance.",
      explanation: "`final` variable: value cannot be modified. `final` method: cannot be overridden by subclasses. `final` class: cannot be extended (e.g. String is a final class).",
      gotchas: [
        "Making an object reference `final` means the variable cannot point to another object. However, you can still modify the internal fields of the referenced object!"
      ],
      interviewQuestions: [
        {
          question: "What is a blank final variable?",
          answer: "A final variable declared without an initial value. It must be initialized in the class constructor, otherwise compilation fails."
        }
      ],
      code: `final int val = 10;
// val = 20; // ERROR!

final Circle c = new Circle();
c.radius = 5.0; // OK! (Object state can change)
// c = new Circle(); // ERROR! (Reference constant)`,
      visualizerType: "memory"
    },
    {
      id: 70,
      title: "Object Class: equals(), toString(), hashCode()",
      intro: "The grandparent of all Java classes. The universal base class.",
      explanation: "Every class in Java extends java.lang.Object implicitly. It contains essential methods: `toString()` (string representation), `hashCode()` (integer bucket index), and `equals()` (compares content references).",
      gotchas: [
        "If you override `equals()`, you MUST override `hashCode()`! Otherwise, hash-based collections (HashMap, HashSet) will fail to locate your objects, leading to duplicate entries."
      ],
      interviewQuestions: [
        {
          question: "Explain the contract between equals() and hashCode() methods.",
          answer: "If two objects are equal according to equals() method, they must return the same hashCode value. If hashCode values differ, the objects must not be equal."
        }
      ],
      code: `class User {
    String id;
    @Override
    public boolean equals(Object obj) {
        return (obj instanceof User) && ((User)obj).id.equals(this.id);
    }
    @Override
    public int hashCode() {
        return id.hashCode();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 71,
      title: "Upcasting and Downcasting",
      intro: "Climbing up and down the class hierarchy ladder.",
      explanation: "Upcasting: cast subclass to superclass (e.g. `Animal a = new Dog();`). Safe, done implicitly. Downcasting: cast superclass back to subclass (e.g. `Dog d = (Dog) a;`). Unsafe, must be explicit.",
      gotchas: [
        "Downcasting to a type that the object is not (e.g. casting Cat to Dog) throws `ClassCastException` at runtime. Check with `instanceof` first!"
      ],
      interviewQuestions: [
        {
          question: "What is ClassCastException and how do we prevent it?",
          answer: "It occurs when downcasting an object to a class of which it is not an instance. Prevent it by using the 'instanceof' check before explicit casting."
        }
      ],
      code: `Animal animal = new Dog();
if (animal instanceof Dog) {
    Dog d = (Dog) animal; // Safe Downcast
}`,
      visualizerType: "memory"
    },
    {
      id: 72,
      title: "Wrapper Class",
      intro: "Wrapping primitives inside objects for the Collection framework.",
      explanation: "Java collections only store Objects, not primitives. Wrapper classes (Integer, Double, Character, etc.) wrap primitives into object formats. Auto-boxing (primitive to wrapper) and Auto-unboxing (wrapper to primitive) occur automatically.",
      gotchas: [
        "Comparing wrapper objects using == compares references! Integer objects cached between -128 and 127 match ==, but numbers outside this range return false!"
      ],
      interviewQuestions: [
        {
          question: "Explain the Integer Cache mechanism in Java.",
          answer: "JVM caches Integer objects with values from -128 to 127. If you create Integer objects within this range, they share the same reference, making == return true."
        }
      ],
      code: `Integer a = 127, b = 127;
System.out.println(a == b); // true (cached!)

Integer c = 128, d = 128;
System.out.println(c == d); // false (different objects in heap!)
System.out.println(c.equals(d)); // true (value compared)`,
      visualizerType: "memory"
    }
  ]
};
