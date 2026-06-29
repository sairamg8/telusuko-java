export default {
  id: 6,
  title: "Encapsulation & Construction",
  range: "49-58",
  concepts: [
    {
      id: 49,
      title: "Encapsulation",
      intro: "Don't let outsiders mess with your object's internal organs directly.",
      explanation: "Encapsulation is the practice of hiding an object's internal state (fields) and requiring all interaction to occur through public methods (getters and setters).",
      gotchas: [
        "Declaring variables public destroys encapsulation. Any class can alter variables without validation, leading to bugs."
      ],
      interviewQuestions: [
        {
          question: "How does encapsulation promote data validation?",
          answer: "By making fields private and restricting access to setter methods, we can write validation logic (e.g. checking age is positive) before updating values."
        }
      ],
      code: `class BankAccount {
    private double balance; // Hidden
    public void deposit(double amt) {
        if(amt > 0) balance += amt; // Guarded!
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 50,
      title: "Getters and Setters",
      intro: "The standard gatekeepers of private variables.",
      explanation: "Getters retrieve the value of a private variable. Setters update the value of a private variable. By naming them `getX()` and `setX(type)`, you follow the JavaBeans standard.",
      gotchas: [
        "Returning direct references to mutable objects (like Date or arrays) in getters compromises encapsulation. Return defensive copies instead!"
      ],
      interviewQuestions: [
        {
          question: "What is a defensive copy in getters?",
          answer: "If a getter returns a reference to a mutable internal object (e.g., an array), external code can change its contents. Returning a copy prevents this vulnerability."
        }
      ],
      code: `private String name;
public String getName() {
    return name; 
}
public void setName(String name) {
    this.name = name;
}`,
      visualizerType: "memory"
    },
    {
      id: 51,
      title: "this Keyword",
      intro: "A reference to the current object executing the code.",
      explanation: "The `this` keyword is a reference variable that points to the current object. It is commonly used to resolve variable shadowing (when instance fields and method parameters have the same name).",
      gotchas: [
        "You cannot use `this` inside static methods because static methods run without any object instance context!"
      ],
      interviewQuestions: [
        {
          question: "Why can't 'this' be used in static context?",
          answer: "Because static methods belong to the class rather than an object instance, and 'this' refers to the current object instance, which does not exist in a static call."
        }
      ],
      code: `class Student {
    private String name;
    public void setName(String name) {
        this.name = name; // 'this.name' is field, 'name' is parameter
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 52,
      title: "Constructor",
      intro: "The initialization ritual of an object.",
      explanation: "A constructor is a special block of code that is executed when an object is instantiated with `new`. It has no return type and its name matches the class name exactly.",
      gotchas: [
        "If you write a return type (even void) on a constructor, Java treats it as a standard method and will NOT call it during instantiation!"
      ],
      interviewQuestions: [
        {
          question: "What is the primary purpose of a constructor?",
          answer: "To initialize the state (instance variables) of the object being created, ensuring the object starts in a valid state."
        }
      ],
      code: `class Laptop {
    Laptop() {
        System.out.println("Laptop object created!");
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 53,
      title: "Default vs. Parameterized Constructor",
      intro: "Constructor overloading. Providing multiple initialization entryways.",
      explanation: "Default (no-argument) constructor is provided by the Java compiler ONLY if you write no constructors. Parameterized constructor allows passing values to initialize fields during instantiation.",
      gotchas: [
        "Once you write a parameterized constructor, the compiler will NOT generate the default no-arg constructor! Calling `new MyClass()` will throw compilation errors unless you write it manually."
      ],
      interviewQuestions: [
        {
          question: "What happens if we define a parameterized constructor but forget to write a default constructor?",
          answer: "Any instantiation call without parameters, like 'new MyClass()', will fail to compile. You must explicitly define the no-argument constructor."
        }
      ],
      code: `class Car {
    String model;
    Car() {} // Default written manually
    Car(String m) { this.model = m; } // Parameterized
}`,
      visualizerType: "memory"
    },
    {
      id: 54,
      title: "Static Variable",
      intro: "A variable shared by all objects. It belongs to the class.",
      explanation: "Declared with the `static` keyword. Only one copy of a static variable is created and loaded into the Method area of JVM, shared by all objects of that class.",
      gotchas: [
        "Modifying a static variable via one object changes the value for all other objects since they point to the exact same reference copy."
      ],
      interviewQuestions: [
        {
          question: "Where are static variables stored in Java 8 and above?",
          answer: "In Java 8+, static variables are stored in the JVM Heap area as part of the Class object configuration, not in PermGen (which was replaced by Metaspace)."
        }
      ],
      code: `class Counter {
    static int count = 0; // shared
    Counter() { count++; }
}`,
      visualizerType: "memory"
    },
    {
      id: 55,
      title: "Static Method",
      intro: "Utility methods that run without needing an object instance.",
      explanation: "Declared with `static`. Can be invoked directly using class name: `ClassName.methodName()`. They can access static variables but cannot access instance variables or call non-static methods.",
      gotchas: [
        "Cannot call `super` or `this` inside static methods. Overriding static methods is not possible (called method hiding instead)."
      ],
      interviewQuestions: [
        {
          question: "Can we override static methods in Java?",
          answer: "No. Static methods are resolved at compile-time (static binding) rather than runtime (dynamic binding). Redefining static method in subclass hides the superclass method; it is not dynamic overriding."
        }
      ],
      code: `class MathUtils {
    public static int square(int x) { return x * x; }
}
// usage:
int sq = MathUtils.square(4);`,
      visualizerType: "jvm"
    },
    {
      id: 56,
      title: "Static Block",
      intro: "Initialization chamber for static variables.",
      explanation: "A block of code prefixed with `static`. Executed only once when the JVM first loads the class into memory (ClassLoader). Runs before constructor and main method.",
      gotchas: [
        "If class loading fails inside static block (throws exception), class initialization fails with `NoClassDefFoundError` or `ExceptionInInitializerError`."
      ],
      interviewQuestions: [
        {
          question: "When are static blocks executed?",
          answer: "They execute once when the JVM loads the class. It happens when the class is first referenced in code, either by instantiating or accessing a static member."
        }
      ],
      code: `class DBConnection {
    static {
        System.out.println("Static block: Driver loaded!");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 57,
      title: "Naming Conventions",
      intro: "Writing code that doesn't make your teammates cringe.",
      explanation: "Follow Java naming standards: Classes in PascalCase (`StudentCourse`), methods and variables in camelCase (`studentAge`), constants in UPPER_CASE (`MAX_SPEED`), packages in lowercase (`com.telusuko`).",
      gotchas: [
        "Violating naming conventions won't cause compile errors, but it reduces code readability and will fail code quality gates in 50+ LPA enterprise roles."
      ],
      interviewQuestions: [
        {
          question: "Why should package names be in lowercase and reverse domain order?",
          answer: "Reverse domain format (e.g., com.google.search) ensures uniqueness globally. Lowercase names avoid conflicts with class names on case-insensitive file systems."
        }
      ],
      code: `public class MySystemConfig { // PascalCase
    public static final int MAX_COUNT = 100; // UPPER_CASE
    private String dbUrl; // camelCase
}`,
      visualizerType: "jvm"
    },
    {
      id: 58,
      title: "Anonymous Object",
      intro: "Use once and throw away. Objects without names.",
      explanation: "Created with `new MyClass()`, but not assigned to any reference variable. Useful when you only need to call a single method on a newly created object.",
      gotchas: [
        "Since there is no reference variable pointing to the object, it becomes eligible for Garbage Collection immediately after the line finishes execution."
      ],
      interviewQuestions: [
        {
          question: "What is an anonymous object and when should it be used?",
          answer: "It is an object created without a reference reference variable. Use it for one-time operations (e.g., passing a temporary listener or showing a dialog)."
        }
      ],
      code: "new Calculator().add(5, 10); // created, used, eligible for GC!",
      visualizerType: "memory"
    }
  ]
};
