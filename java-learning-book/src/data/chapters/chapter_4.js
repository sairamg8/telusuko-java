export default {
  id: 4,
  title: "Objects, Memory & Methods",
  range: "33-38",
  concepts: [
    {
      id: 33,
      title: "Class and Object Theory",
      intro: "Classes are blueprints. Objects are actual physical structures created from them.",
      explanation: "A Class defines the template, state (fields), and behavior (methods). An Object is an instance of that class which lives in the computer heap memory. It occupies bytes of actual memory.",
      gotchas: [
        "Creating a class does not occupy memory for fields. Only instantiating it with `new` allocates heap memory."
      ],
      interviewQuestions: [
        {
          question: "What is an instance variable vs static variable?",
          answer: "Instance variables belong to a specific object. Static variables belong to the Class itself and are shared among all instances."
        }
      ],
      code: `class Calculator {
    int result; // Instance field
}
// Calc object:
Calculator calc = new Calculator();`,
      visualizerType: "memory"
    },
    {
      id: 34,
      title: "Class and Object Practical",
      intro: "Instantiating classes and invoking methods.",
      explanation: "We instantiate objects using the `new` operator. This allocates memory for the instance fields on the heap and returns a reference. We use the dot operator (.) to access fields and methods.",
      gotchas: [
        "Assigning one object variable to another does NOT copy the object; it only copies the reference pointer to the same object!"
      ],
      interviewQuestions: [
        {
          question: "If Object a = new Object(); Object b = a; b.name = 'x'; does a's name change?",
          answer: "Yes, because both variables 'a' and 'b' point to the exact same object in the heap memory."
        }
      ],
      code: `class Dog {
    String name;
}
Dog d1 = new Dog();
d1.name = "Rocky";
Dog d2 = d1; // copies reference!
d2.name = "Bruno"; // Changes Rocky to Bruno!`,
      visualizerType: "memory"
    },
    {
      id: 35,
      title: "JDK, JRE, and JVM",
      intro: "The Holy Trinity of Java execution.",
      explanation: "JVM (Java Virtual Machine) executes compiled bytecode. JRE (Java Runtime Environment) bundles JVM with core class libraries. JDK (Java Development Kit) has JRE, compiler (javac), packagers, and debugger. JDK is for writing; JRE is for running.",
      gotchas: [
        "You cannot run Java bytecode (.class) without JRE installed. JVM needs the class libraries to execute even basic commands."
      ],
      interviewQuestions: [
        {
          question: "Is JVM platform independent?",
          answer: "No, JVM is platform-dependent because it must translate bytecode into the specific assembly language and system calls of the underlying OS."
        }
      ],
      code: "// JVM structure: Class Loader, JVM memory area (Stack/Heap/Method area), Execution Engine (JIT/Garbage Collector)",
      visualizerType: "jvm"
    },
    {
      id: 36,
      title: "Methods",
      intro: "What objects do: behavior and logic capsules.",
      explanation: "Methods define the behavior of objects. Syntax: `accessModifier returnType name(parameters) { body }`. Java methods only receive arguments 'Pass-by-Value'.",
      gotchas: [
        "Passing an object reference passes a copy of the pointer address. You can modify the object's fields, but changing the parameter pointer to a new object won't affect the caller!"
      ],
      interviewQuestions: [
        {
          question: "Does Java support Pass-by-Reference?",
          answer: "No, Java is strictly Pass-by-Value. For primitives, it passes a copy of the value. For objects, it passes a copy of the reference address."
        }
      ],
      code: `class Person {
    void changeAge(int a) { a = 30; } // passes copy, original unmodified
    void rename(Dog d) { d.name = "Max"; } // modifies heap object!
}`,
      visualizerType: "memory"
    },
    {
      id: 37,
      title: "Method Overloading",
      intro: "Same name, different signatures. Compile-time polymorphism.",
      explanation: "Declaring multiple methods with the exact same name but different parameters (number of parameters, types, or sequence). Return type alone does NOT overload a method.",
      gotchas: [
        "Compiler resolves overloaded methods at compile-time based on reference types, not runtime types. This is compile-time polymorphism."
      ],
      interviewQuestions: [
        {
          question: "Why does changing only the return type not overload a method?",
          answer: "Because the compiler wouldn't be able to determine which method to execute if called without assigning the result. E.g., 'calc(5, 10)' is ambiguous."
        }
      ],
      code: `class Adder {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; } // Overloaded!
}`,
      visualizerType: "jvm"
    },
    {
      id: 38,
      title: "Stack and Heap",
      intro: "The battleground of memory management.",
      explanation: "Stack memory holds method execution frames, local variables, and object references. Stack is fast and organized in LIFO. Heap memory holds actual instantiated objects and instance fields. Objects on the heap are managed by the Garbage Collector.",
      gotchas: [
        "If heap memory runs out, JVM throws OutOfMemoryError (OOM). If stack memory overflows due to deep recursion, JVM throws StackOverflowError."
      ],
      interviewQuestions: [
        {
          question: "Compare Stack and Heap memory allocations.",
          answer: "Stack is block-allocated per thread, very fast, holds local primitive variables and object references. Heap is shared space, holds all objects, managed dynamically, slower, cleaned by GC."
        }
      ],
      code: `// Stack frame created for main method. 
// 'new' Allocates instance in Heap.
MyClass obj = new MyClass(); `,
      visualizerType: "memory"
    }
  ]
};
