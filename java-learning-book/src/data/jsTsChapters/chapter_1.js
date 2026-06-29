export default {
  "id": 1,
  "title": "Execution Context & Call Stack",
  "range": "1-10",
  "concepts": [
    {
      "id": 1,
      "title": "Global Execution Context & Global Object",
      "intro": "The default environment where JavaScript code executes first.",
      "explanation": "Before any JS code runs, the JS engine creates the Global Execution Context (GEC). It sets up two things: the global object (window in browsers, global in Node.js) and the special 'this' keyword pointing to that global object. GEC is unique; there is only one per JS file execution.",
      "gotchas": [
        "In the global context, using var attaches variables directly to the global object, whereas let and const do not, which can cause scope leakage."
      ],
      "interviewQuestions": [
        {
          "question": "What happens to the global object when you declare variables with let vs var?",
          "answer": "Declaring with var adds the property to the window/global object. let does not add it to the global object; instead, it is stored in a declarative environment record."
        }
      ],
      "code": "var globalVar = \"I am on window\";\nlet globalLet = \"I am local\";\nconsole.log(window.globalVar); // \"I am on window\"\nconsole.log(window.globalLet); // undefined",
      "visualizerType": null
    },
    {
      "id": 2,
      "title": "Function Execution Context & Call Stack",
      "intro": "The dynamic context created whenever a function is called, managed via a stack structure.",
      "explanation": "Whenever a function is invoked, the engine creates a new Function Execution Context (FEC). This context tracks local variables, arguments, and the outer environment scope. The JS engine manages these execution contexts using a LIFO (Last In, First Out) Call Stack. When a function finishes, its context is popped off the stack.",
      "gotchas": [
        "Recursion without a base case will continuously push new execution contexts onto the stack, exceeding the call stack limit and throwing a 'RangeError: Maximum call stack size exceeded' (stack overflow)."
      ],
      "interviewQuestions": [
        {
          "question": "Explain what the JavaScript Call Stack does.",
          "answer": "The Call Stack is a single-threaded stack mechanism that keeps track of the currently executing function contexts. It pushes contexts as calls are made and pops them as functions return."
        }
      ],
      "code": "function second() {\n  console.log(\"Executing second\");\n}\nfunction first() {\n  second();\n}\nfirst();\n// Stack state: GEC -> first() -> second() -> pop second() -> pop first()",
      "visualizerType": null
    },
    {
      "id": 3,
      "title": "Hoisting Mechanics",
      "intro": "JavaScript's behavior of allocating memory for variable and function declarations before code execution.",
      "explanation": "During the memory creation phase of an execution context, JS scans the code and stores variables (initialized to undefined for var) and function declarations in memory. Hoisting allows you to call function declarations before they are defined, but function expressions and variables declared with let/const behave differently.",
      "gotchas": [
        "Function declarations are hoisted completely, but function expressions declared with var are hoisted as undefined, making them throw a TypeError: xxx is not a function if invoked early."
      ],
      "interviewQuestions": [
        {
          "question": "Why does a hoisted var print undefined, while a hoisted function declaration runs successfully?",
          "answer": "During the creation phase, var variables are allocated memory and assigned a default value of undefined. Function declarations are registered with their complete body/reference."
        }
      ],
      "code": "hello(); // Runs successfully: \"Hello!\"\n// greet(); // TypeError: greet is not a function (it's undefined)\n\nfunction hello() {\n  console.log(\"Hello!\");\n}\nvar greet = function() {\n  console.log(\"Hi!\");\n};",
      "visualizerType": null
    },
    {
      "id": 4,
      "title": "Temporal Dead Zone (TDZ)",
      "intro": "The state of a let or const variable from the start of its block scope until it is initialized.",
      "explanation": "Let and const declarations are hoisted, but they are not initialized with undefined (unlike var). Instead, they remain uninitialized. The period between entering the scope and reaching the variable's declaration line is called the Temporal Dead Zone (TDZ). Accessing the variable in this zone throws a ReferenceError.",
      "gotchas": [
        "typeof is usually a safe operation, but using it on a variable in the TDZ will throw a ReferenceError."
      ],
      "interviewQuestions": [
        {
          "question": "What is the Temporal Dead Zone and why does it exist?",
          "answer": "TDZ is the phase during execution where block-scoped variables (let/const) are declared in memory but not yet initialized. It exists to catch reference errors early and enforce clean code practices."
        }
      ],
      "code": "{\n  // TDZ for myVar starts here\n  // console.log(myVar); // ReferenceError: Cannot access 'myVar' before initialization\n  let myVar = 42; // TDZ ends here\n  console.log(myVar); // 42\n}",
      "visualizerType": null
    },
    {
      "id": 5,
      "title": "Strict Mode ('use strict')",
      "intro": "An opt-in mode that enforces stricter parsing and error handling in JavaScript.",
      "explanation": "By adding the directive 'use strict' at the top of a file or function, you configure JS to execute in strict mode. It eliminates quiet errors, prevents accidental global variables, prohibits duplicate parameter names, and blocks dangerous syntax.",
      "gotchas": [
        "In strict mode, the default 'this' inside functions is undefined instead of the window/global object, which can break legacy object method bindings."
      ],
      "interviewQuestions": [
        {
          "question": "Name three differences that strict mode introduces.",
          "answer": "1. Disallows creating accidental global variables (e.g. x = 10 without declare). 2. Throws errors on read-only properties writes. 3. Sets 'this' inside non-method functions to undefined."
        }
      ],
      "code": "\"use strict\";\n// x = 10; // ReferenceError: x is not defined\n\nfunction showThis() {\n  return this;\n}\nconsole.log(showThis()); // undefined (would be window in non-strict)",
      "visualizerType": null
    },
    {
      "id": 6,
      "title": "Execution Phases: Creation vs Execution",
      "intro": "The two-step lifecycle of an execution context.",
      "explanation": "Any execution context goes through two phases: 1. Creation Phase: The scope chain is initialized, variable and function declarations are hoisted, and the 'this' value is bound. 2. Execution Phase: The engine reads the code line by line, assigns values to variables, and executes calls.",
      "gotchas": [
        "Code inside functions is skipped during the GEC creation phase; it is only parsed when that function context is pushed onto the stack."
      ],
      "interviewQuestions": [
        {
          "question": "What occurs during the creation phase of the Execution Context?",
          "answer": "Variable and function memory is allocated (hoisting), scope chain references are created, and the value of 'this' is determined."
        }
      ],
      "code": "// Creation Phase: name is allocated memory, set to undefined\n// Execution Phase: name is assigned \"DeepMind\"\nlet name = \"DeepMind\";\nconsole.log(name);",
      "visualizerType": null
    },
    {
      "id": 7,
      "title": "JS Engine & JIT Compiler",
      "intro": "How browsers translate source code into optimized machine instructions.",
      "explanation": "JavaScript is compiled at runtime using Just-In-Time (JIT) compilation. The engine (like V8 in Chrome/Node.js) parses code into an Abstract Syntax Tree (AST), compiles it to bytecode via an interpreter, and profiles running code to optimize hot paths into raw machine code.",
      "gotchas": [
        "Constantly changing the shape/types of properties in an object (e.g. changing dynamic properties) makes V8 deoptimize the machine code, slowing execution."
      ],
      "interviewQuestions": [
        {
          "question": "What is JIT compilation in JavaScript?",
          "answer": "JIT compilation combines interpreting bytecode (for fast startup) and compiling hot code segments into native machine code (for fast execution) at runtime."
        }
      ],
      "code": "const obj = { x: 1 }; // V8 creates a hidden class\nobj.y = 2; // Changes object shape, causing hidden class transition",
      "visualizerType": null
    },
    {
      "id": 8,
      "title": "Memory Heap vs Call Stack",
      "intro": "The two primary memory allocators in JavaScript.",
      "explanation": "JS uses two structures to manage memory. The Call Stack is a small, organized LIFO structure storing execution context frames and primitive local variables. The Memory Heap is a large, unstructured memory pool used to allocate dynamic data types like objects, arrays, and functions.",
      "gotchas": [
        "Variables on the stack are automatically popped off when their execution context terminates, but items in the heap must be garbage-collected, which can lead to memory leaks if references remain."
      ],
      "interviewQuestions": [
        {
          "question": "Where are objects and functions stored in memory?",
          "answer": "They are stored in the Memory Heap because their sizes are dynamic and variable. The stack only holds references (pointers) to their heap addresses."
        }
      ],
      "code": "let num = 10; // Stored directly on Call Stack\nlet obj = { val: 10 }; // obj reference on stack, content { val: 10 } in Memory Heap",
      "visualizerType": null
    },
    {
      "id": 9,
      "title": "Primitive vs Reference Types",
      "intro": "Understanding value copying vs reference copying behavior.",
      "explanation": "Primitives (Number, String, Boolean, null, undefined, Symbol, BigInt) are passed by value: editing a copy does not affect the original. Reference types (Object, Array, Function) are passed by reference: copying them duplicates the pointer, so modifying the copy alters the original object.",
      "gotchas": [
        "Comparing two objects with '==' or '===' compares their heap references, not their contents. Two identical-looking objects will return false if they are distinct instances."
      ],
      "interviewQuestions": [
        {
          "question": "Why does console.log({} === {}) print false?",
          "answer": "Objects are compared by reference, not structure. Since they represent two separate objects in the memory heap, their references are different."
        }
      ],
      "code": "let a = 1; let b = a; b = 2; // a is still 1\nlet obj1 = { val: 1 };\nlet obj2 = obj1;\nobj2.val = 2; \nconsole.log(obj1.val); // 2 (since they point to the same memory)",
      "visualizerType": null
    },
    {
      "id": 10,
      "title": "Garbage Collection & Mark-and-Sweep",
      "intro": "The automatic reclamation of unused memory in JavaScript.",
      "explanation": "JavaScript automatically cleans up unreferenced memory. The modern GC algorithm is Mark-and-Sweep. The garbage collector starts from the 'root' object (like window), marks all reachable objects, and sweeps away unmarked objects, freeing their memory.",
      "gotchas": [
        "Circular references (where object A points to B and B points to A) are handled correctly by Mark-and-Sweep, but old reference-counting algorithms would fail and leak them."
      ],
      "interviewQuestions": [
        {
          "question": "How does the Mark-and-Sweep garbage collection algorithm work?",
          "answer": "It builds a tree of reachable objects starting from root nodes. Any object that is unreachable from roots is marked for collection and swept out of memory."
        }
      ],
      "code": "let user = { name: \"Alex\" };\nuser = null; \n// The object { name: \"Alex\" } is no longer reachable from the global context\n// It will be swept during the next Garbage Collection pass.",
      "visualizerType": null
    }
  ]
}
