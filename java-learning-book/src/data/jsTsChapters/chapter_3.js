export default {
  "id": 3,
  "title": "Object-Oriented JS & Prototypes",
  "range": "21-30",
  "concepts": [
    {
      "id": 21,
      "title": "Constructor Functions",
      "intro": "Generating objects with shared blueprints before ES6 classes.",
      "explanation": "In JavaScript, constructor functions are regular functions invoked with the 'new' operator. 'new' does four things: 1. Creates a blank JS object. 2. Binds 'this' to the new object. 3. Sets the constructor function's prototype as the new object's prototype. 4. Returns the object (unless a non-primitive is returned explicitly).",
      "gotchas": [
        "If you invoke a constructor function without the 'new' operator, 'this' defaults to the window/global object (or undefined in strict mode), leading to silent bugs."
      ],
      "interviewQuestions": [
        {
          "question": "What four steps does the 'new' keyword execute?",
          "answer": "1. Creates a new empty object. 2. Sets the __proto__ link to the constructor's prototype. 3. Binds 'this' to the new object inside the constructor body. 4. Returns the new object."
        }
      ],
      "code": "function User(name) {\n  this.name = name;\n}\nconst user1 = new User(\"Bob\");\nconsole.log(user1.name); // \"Bob\"",
      "visualizerType": null
    },
    {
      "id": 22,
      "title": "Prototype Object & [[Prototype]] Linkage",
      "intro": "The engine mechanism for sharing properties across instances.",
      "explanation": "Every JS function has a special property called 'prototype'. When you construct instances using 'new', the engine links the instances' internal [[Prototype]] link (accessible via Object.getPrototypeOf(obj) or __proto__) to that constructor function's prototype object.",
      "gotchas": [
        "Do not confuse a function's prototype property (which is only used to set prototype linkage for newly instantiated objects) with an object instance's __proto__ linkage."
      ],
      "interviewQuestions": [
        {
          "question": "What is the relationship between a constructor's prototype and an instance's prototype linkage?",
          "answer": "An instance's __proto__ (or internal [[Prototype]]) points directly to the constructor function's prototype object, enabling shared prototype attributes and methods."
        }
      ],
      "code": "function Dog() {}\nDog.prototype.bark = () => \"Woof!\";\nconst sparky = new Dog();\nconsole.log(Object.getPrototypeOf(sparky) === Dog.prototype); // true",
      "visualizerType": null
    },
    {
      "id": 23,
      "title": "Prototype Chain & Property Lookup",
      "intro": "How JavaScript resolves property access through prototype inheritance links.",
      "explanation": "When accessing an object property, JS checks the object itself first. If missing, it traverses the [[Prototype]] reference to check the parent prototype. This traversal continues up the Prototype Chain until the property is found or the search hits null (at the top: Object.prototype.__proto__ === null).",
      "gotchas": [
        "Writing a property onto an instance shadows/hides matching prototype properties, instead of editing the parent prototype directly."
      ],
      "interviewQuestions": [
        {
          "question": "What happens when you look up a non-existent property on a JavaScript object?",
          "answer": "The JS engine traverses the prototype chain up to Object.prototype. If not found, it returns undefined rather than throwing an error."
        }
      ],
      "code": "const animal = { eats: true };\nconst rabbit = Object.create(animal); // links rabbit -> animal\nconsole.log(rabbit.eats); // true (resolved from animal)\nrabbit.eats = false; // Shadows the prototype property on the local object\nconsole.log(animal.eats); // true (original is untouched)",
      "visualizerType": null
    },
    {
      "id": 24,
      "title": "Prototypal Inheritance",
      "intro": "Implementing classless inheritance using Object.create().",
      "explanation": "Object.create(proto) creates a new object with its internal [[Prototype]] linked directly to the specified argument object. This is a powerful way to implement inheritance without classes or constructors, defining behavior as parent-child object layers.",
      "gotchas": [
        "Objects created with Object.create(null) have no prototype at all, meaning they lack helper methods like toString(), hasOwnProperty(), etc."
      ],
      "interviewQuestions": [
        {
          "question": "What is the purpose of Object.create(null)?",
          "answer": "It creates a pure dictionary object with absolutely no prototype properties or methods, avoiding lookup pollutions."
        }
      ],
      "code": "const human = { speak() { return \"Hello\"; } };\nconst student = Object.create(human);\nconsole.log(student.speak()); // \"Hello\"\nconsole.log(Object.getPrototypeOf(student) === human); // true",
      "visualizerType": null
    },
    {
      "id": 25,
      "title": "Classes in ES6",
      "intro": "A modernized, cleaner syntax for prototypes and constructor functions.",
      "explanation": "ES6 classes are syntactic sugar over constructor functions and prototypal inheritance. They introduce keywords like class, constructor, static, and extends, which look object-oriented but operate using prototype chain mechanisms behind the scenes.",
      "gotchas": [
        "Unlike function declarations, class declarations are not hoisted. Accessing a class before its declaration line throws a ReferenceError."
      ],
      "interviewQuestions": [
        {
          "question": "Are ES6 classes a brand new inheritance engine in JavaScript?",
          "answer": "No. They are syntactic sugar. Under the hood, they compile down to standard prototypal inheritance, constructor functions, and prototype chain lookups."
        }
      ],
      "code": "class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return `Hi ${this.name}`;\n  }\n}\nconst p = new Person(\"Alice\");\nconsole.log(typeof Person); // \"function\"",
      "visualizerType": null
    },
    {
      "id": 26,
      "title": "super Keyword & Subclasses",
      "intro": "Invoking parent constructors and methods inside derived classes.",
      "explanation": "In derived classes (subclasses using extends), you must call super() inside the constructor before accessing the 'this' keyword. super() executes the parent constructor, initializing the object reference.",
      "gotchas": [
        "Forgetting to call super() in a child class constructor causes a ReferenceError when the engine tries to resolve 'this'."
      ],
      "interviewQuestions": [
        {
          "question": "Why must you call super() before accessing 'this' in a subclass constructor?",
          "answer": "In derived classes, the instance is constructed by the parent class constructor first. super() instantiates it. Without calling super(), 'this' remains uninitialized."
        }
      ],
      "code": "class Animal {\n  constructor(name) { this.name = name; }\n}\nclass Cat extends Animal {\n  constructor(name, breed) {\n    super(name); // Must be called first!\n    this.breed = breed;\n  }\n}\nconst cat = new Cat(\"Whiskers\", \"Siamese\");",
      "visualizerType": null
    },
    {
      "id": 27,
      "title": "Private Members in Classes",
      "intro": "Protecting internal class state using modern private syntax (#).",
      "explanation": "Modern JavaScript supports private class fields and methods prefixed with `#`. Private members are parsed and enforced by the runtime; trying to reference them outside class scope throws a SyntaxError.",
      "gotchas": [
        "Private variables cannot be declared dynamically on class instances; they must be declared ahead of time inside the class body."
      ],
      "interviewQuestions": [
        {
          "question": "How do you define private variables in modern ES6+ classes?",
          "answer": "By prefixing the class property or method name with `#`, e.g. `#secretBalance = 100;` inside the class body."
        }
      ],
      "code": "class Bank {\n  #balance = 1000; // Private field\n  getBalance() { return this.#balance; }\n}\nconst b = new Bank();\n// console.log(b.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class",
      "visualizerType": null
    },
    {
      "id": 28,
      "title": "this Keyword Rules",
      "intro": "The dynamic context reference based on function call sites.",
      "explanation": "The value of 'this' is resolved dynamically using four binding rules: 1. Default Binding: window (global) or undefined in strict mode. 2. Implicit Binding: the object preceding the call dot (obj.func()). 3. Explicit Binding: call(), apply(), or bind() overrides. 4. New Binding: the newly created object instance.",
      "gotchas": [
        "If you extract an implicit object method and execute it as a standalone callback, it loses its connection, defaulting to global or undefined binding."
      ],
      "interviewQuestions": [
        {
          "question": "What is 'this' bound to when calling a callback function inside setTimeout?",
          "answer": "In regular functions, setTimeout executes in the global context, binding 'this' to the global window/global object. Arrow functions inherit 'this' lexically."
        }
      ],
      "code": "const obj = {\n  name: \"AI\",\n  log() {\n    console.log(this.name);\n  }\n};\nsetTimeout(obj.log, 100); // Prints undefined! Lost context.\nsetTimeout(() => obj.log(), 100); // Prints \"AI\"! Lexical scope lookup.",
      "visualizerType": null
    },
    {
      "id": 29,
      "title": "call(), apply(), and bind()",
      "intro": "Explicitly control function 'this' context bindings.",
      "explanation": "1. call(): invokes function immediately, accepts arguments individually. 2. apply(): invokes function immediately, accepts arguments as an array. 3. bind(): returns a new function copy with 'this' locked permanently, ready to be called later.",
      "gotchas": [
        "Once a function is bound using bind(), calling call() or apply() later cannot override the bound 'this' context anymore."
      ],
      "interviewQuestions": [
        {
          "question": "What is the difference between call and apply?",
          "answer": "Both invoke a function explicitly binding 'this'. The difference is that call takes arguments individually (comma-separated), while apply takes arguments as a single array."
        }
      ],
      "code": "function greet(greeting, punctuation) {\n  return `${greeting}, I am ${this.user}${punctuation}`;\n}\nconst ctx = { user: \"Agent\" };\nconsole.log(greet.call(ctx, \"Hello\", \"!\")); // \"Hello, I am Agent!\"\nconsole.log(greet.apply(ctx, [\"Hi\", \".\"])); // \"Hi, I am Agent.\"\nconst bound = greet.bind(ctx);\nconsole.log(bound(\"Hey\", \"?\")); // \"Hey, I am Agent?\"",
      "visualizerType": null
    },
    {
      "id": 30,
      "title": "Prototype Mutations & Performance",
      "intro": "Why editing active prototype allocations is highly discouraged.",
      "explanation": "Object.setPrototypeOf(obj, prototype) dynamically alters an object's [[Prototype]]. Changing prototype trees at runtime forces modern engines to discard internal object shape optimizations (like hidden classes) across all related code, degrading performance.",
      "gotchas": [
        "Mutating __proto__ or using setPrototypeOf is extremely slow. Use Object.create() to link the prototype tree at instantiation time instead."
      ],
      "interviewQuestions": [
        {
          "question": "Why should you avoid mutating an object's prototype at runtime?",
          "answer": "Mutating prototype trees forces the JS engine to deoptimize properties lookup (invalidating inline caches and hidden shapes), which causes significant execution delays."
        }
      ],
      "code": "const shape = { type: \"shape\" };\nconst circle = { radius: 10 };\nObject.setPrototypeOf(circle, shape); // Avoid doing this if performance is critical!",
      "visualizerType": null
    }
  ]
}
