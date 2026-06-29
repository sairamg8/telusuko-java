export default {
  "id": 2,
  "title": "Scope, Closures & Lexical Environment",
  "range": "11-20",
  "concepts": [
    {
      "id": 11,
      "title": "Lexical Environment & Scope Chain",
      "intro": "How JavaScript determines variable availability based on physical location in code.",
      "explanation": "Every execution context has a reference to its outer Lexical Environment. If a variable is not found in the current execution scope, JS searches the outer parent environment, and continues up until it reaches the global context. This hierarchical link of lexical references is the Scope Chain.",
      "gotchas": [
        "Variables lookup is unidirectional: parent environments cannot lookup variables inside child/nested scopes."
      ],
      "interviewQuestions": [
        {
          "question": "What is a Lexical Environment?",
          "answer": "A Lexical Environment is a structure that holds identifier-variable mapping and a reference to its parent lexical environment, representing the physical structure of where variables are written."
        }
      ],
      "code": "const outerVar = \"I am outer\";\nfunction outer() {\n  const midVar = \"I am mid\";\n  function inner() {\n    console.log(outerVar, midVar); // Accesses both via scope chain lookup\n  }\n  inner();\n}\nouter();",
      "visualizerType": null
    },
    {
      "id": 12,
      "title": "Scope Types: Global, Function, Block",
      "intro": "The boundary zones restricting variable access.",
      "explanation": "JS features three scopes: 1. Global Scope: accessible anywhere. 2. Function Scope: accessible only inside the declaring function. 3. Block Scope: introduced in ES6, variables declared with let and const are confined to block boundaries { ... } (like if statements or loops).",
      "gotchas": [
        "Variables declared with var ignore block boundaries (like if blocks) and bleed out, polluting the surrounding scope."
      ],
      "interviewQuestions": [
        {
          "question": "Does block scope apply to var declarations?",
          "answer": "No. var is function-scoped. It ignores blocks (like if/for blocks) and will leak into the surrounding function or global scope."
        }
      ],
      "code": "if (true) {\n  var blockVar = \"leaked\";\n  let blockLet = \"safe\";\n}\nconsole.log(blockVar); // \"leaked\"\n// console.log(blockLet); // ReferenceError: blockLet is not defined",
      "visualizerType": null
    },
    {
      "id": 13,
      "title": "var vs let vs const",
      "intro": "Comparing scope, declaration rules, and reassignment parameters.",
      "explanation": "1. var: Function-scoped, can be re-declared and reassigned, hoisted with undefined initialization. 2. let: Block-scoped, cannot be re-declared in same scope, can be reassigned, hoisted in TDZ. 3. const: Block-scoped, cannot be re-declared or reassigned, requires immediate value binding.",
      "gotchas": [
        "const variables are immutable regarding reassignment, but their internal properties (if they reference arrays or objects) can still be mutated."
      ],
      "interviewQuestions": [
        {
          "question": "Can you mutate properties of an object declared with const?",
          "answer": "Yes. const prevents reassignment of the variable identifier itself (re-binding the pointer), but it does not make the underlying object properties read-only."
        }
      ],
      "code": "const obj = { age: 20 };\nobj.age = 21; // Works perfectly!\n// obj = { age: 30 }; // TypeError: Assignment to constant variable.",
      "visualizerType": null
    },
    {
      "id": 14,
      "title": "Closure Definition & Mechanics",
      "intro": "The binding of a function along with its surrounding lexical state.",
      "explanation": "A closure is formed when a nested function retains access to variables declared in its outer scope even after that outer function has returned and popped off the call stack. The outer variables are persisted in heap storage for the inner function to execute.",
      "gotchas": [
        "Because variables closed over are not garbage collected immediately, excessive closures can keep massive allocations alive in heap memory, leading to leaks."
      ],
      "interviewQuestions": [
        {
          "question": "What is a closure in JavaScript?",
          "answer": "A closure is a function that remembers its outer lexical environment and variables, even when called outside of its original lexical nesting."
        }
      ],
      "code": "function makeCounter() {\n  let count = 0; // Stored in memory heap\n  return function() {\n    return ++count;\n  };\n}\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2",
      "visualizerType": null
    },
    {
      "id": 15,
      "title": "Data Encapsulation using Closures",
      "intro": "Using closures to emulate private properties and methods.",
      "explanation": "JavaScript historically lacked private class fields. Closures solved this by declaring local scope variables inside a factory function and returning setter/getter methods. The outer context cannot touch the variable except through these controlled functions.",
      "gotchas": [
        "Every instance created via factory function allocates independent closure scopes, consuming additional memory compared to prototype-shared methods."
      ],
      "interviewQuestions": [
        {
          "question": "How do you implement a private variable using closures?",
          "answer": "Declare a variable inside a function scope, and return an object with methods that refer to this variable. The variable cannot be accessed from the outside, only via the returned methods."
        }
      ],
      "code": "function BankAccount(initialBalance) {\n  let balance = initialBalance; // Private variable\n  return {\n    deposit: (amount) => { balance += amount; },\n    getBalance: () => balance\n  };\n}\nconst account = BankAccount(100);\naccount.deposit(50);\nconsole.log(account.getBalance()); // 150\nconsole.log(account.balance); // undefined",
      "visualizerType": null
    },
    {
      "id": 16,
      "title": "Function Currying",
      "intro": "Translating a multi-argument function into a sequence of single-argument functions.",
      "explanation": "Currying leverages closures to partially apply functions. An N-argument function is refactored into nested functions, where each step returns a new function taking a single parameter, retaining references to arguments passed previously.",
      "gotchas": [
        "Deep currying can make debugging stack traces harder to parse and read."
      ],
      "interviewQuestions": [
        {
          "question": "What is Currying and why is it useful?",
          "answer": "Currying is a functional design pattern where a function of multiple arguments is transformed into nested functions. It is useful for creating specialized configuration helpers and reusability."
        }
      ],
      "code": "const multiply = (a) => (b) => a * b;\nconst double = multiply(2);\nconsole.log(double(5)); // 10\nconsole.log(multiply(3)(4)); // 12",
      "visualizerType": null
    },
    {
      "id": 17,
      "title": "Closures in Loops",
      "intro": "Solving index reference binding bugs inside asynchronous loop executions.",
      "explanation": "When loops use var indices inside callbacks (like setTimeout), the callback captures the identical var reference. By the time it fires, the loop has completed, executing with the terminal loop index. Using let creates a brand new scope binding for each iteration, securing the current value.",
      "gotchas": [
        "Always use block-scoped let in for-loops containing setTimeout, event listeners, or promises to avoid scoping issues."
      ],
      "interviewQuestions": [
        {
          "question": "Why does a loop using var print final index repeatedly in setTimeout, and how does let resolve this?",
          "answer": "var is function scoped, so all timeouts share the same index variable which resolves to its final loop value. let creates a new block scope for each loop iteration, binding the exact index value for each iteration."
        }
      ],
      "code": "// Broken with var\nfor (var i = 1; i <= 3; i++) {\n  setTimeout(() => console.log(\"var:\", i), 50); // prints 4, 4, 4\n}\n// Solved with let\nfor (let j = 1; j <= 3; j++) {\n  setTimeout(() => console.log(\"let:\", j), 50); // prints 1, 2, 3\n}",
      "visualizerType": null
    },
    {
      "id": 18,
      "title": "Memory Leaks in Closures",
      "intro": "Understanding and avoiding unintentional retention of large data structures by closures.",
      "explanation": "Closures hold reference links to outer environments. If an inner function persists, the entire parent lexical scope remains in memory, even variables that the nested function never uses (in certain engine optimization limits) or variables that are no longer required.",
      "gotchas": [
        "Ensure event listeners or setInterval loops that close over heavy references are cleared/removed when no longer needed."
      ],
      "interviewQuestions": [
        {
          "question": "How can closures lead to memory leaks in JS?",
          "answer": "If a function with closures is kept alive (e.g. registered in an active event listener or interval) and references outer scope variables, those outer scope elements cannot be garbage collected, leaking memory."
        }
      ],
      "code": "function setupHandler() {\n  let massiveData = new Array(1000000).fill(\"data\");\n  return function() {\n    // closures holding onto resources\n    console.log(\"Handler running\");\n  };\n}",
      "visualizerType": null
    },
    {
      "id": 19,
      "title": "Lexical Scoping vs Dynamic Scoping",
      "intro": "Comparing compilation-time scoping with runtime execution-time scoping.",
      "explanation": "Lexical scoping (which JS implements) resolves variable scope based on the physical position of functions during code compilation. Dynamic scoping resolves scope based on the current stack of function invocations at runtime.",
      "gotchas": [
        "Do not confuse lexical variable lookup with 'this' lookup, because 'this' is resolved dynamically based on function call sites."
      ],
      "interviewQuestions": [
        {
          "question": "Does JavaScript support dynamic scoping?",
          "answer": "No. JavaScript uses lexical scoping, meaning scopes are determined at compile-time by where functions and blocks are nested in source code."
        }
      ],
      "code": "const x = 10;\nfunction foo() {\n  console.log(x); // Will print 10, not 20! Lexically looks to global scope.\n}\nfunction bar() {\n  const x = 20;\n  foo();\n}\nbar();",
      "visualizerType": null
    },
    {
      "id": 20,
      "title": "Immediately Invoked Function Expressions (IIFE)",
      "intro": "Executing functions instantly upon definition to isolate namespaces.",
      "explanation": "An IIFE is a function expression wrapped in parentheses and immediately executed using `()`. It was widely used before ES6 block scoping to isolate local variables, preventing global namespace clutter and conflicts.",
      "gotchas": [
        "IIFEs are less necessary in modern projects due to ES modules and block scope, but are still useful in scripts and library wrappers."
      ],
      "interviewQuestions": [
        {
          "question": "What is the primary syntax and purpose of an IIFE?",
          "answer": "Syntax: `(function(){ ... })();`. The purpose is to execute code immediately within private variables that do not pollute the global namespace."
        }
      ],
      "code": "(function() {\n  const tempKey = \"auth_secret\";\n  console.log(\"IIFE Active!\");\n})();\n// console.log(tempKey); // ReferenceError: tempKey is not defined",
      "visualizerType": null
    }
  ]
}
