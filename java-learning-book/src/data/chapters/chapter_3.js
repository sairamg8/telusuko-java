export default {
  id: 3,
  title: "Control Flow & Loops",
  range: "24-32",
  concepts: [
    {
      id: 24,
      title: "If Else",
      intro: "Decision making. Forking the path of execution.",
      explanation: "1. Syntax: `if (booleanCondition) { ... } else { ... }`\n2. The condition MUST evaluate to boolean — no 'truthy/falsy' like JS. `if (1)` is a compile error.\n3. The else block is optional — if absent, JVM skips to the next statement when condition is false.\n4. Braces `{}` are optional for single-line bodies but ALWAYS use them — omitting caused Apple's 'goto fail' security bug.\n5. Chains to else-if for multi-way decisions (covered next).",
      gotchas: [
        "In Java, conditions MUST evaluate to boolean. Unlike C++, `if (1)` or `if (count)` will fail to compile.",
        "Always use braces `{}` even for single-line if bodies. Writing `if (isAdmin) doAction();` on one line looks fine, but a second dev adding a line below it thinking it's inside the block causes a hard-to-find bug.",
        "Dangling else problem: `if (a) if (b) x(); else y();` — the else binds to the innermost if (b), not the outer if (a). Braces make intent explicit."
      ],
      interviewQuestions: [
        {
          question: "Will 'if(x = 5)' compile in Java if x is an integer?",
          answer: "No. The assignment operator '=' returns the value 5, which is an integer. Java requires a boolean in if-conditions, so this fails. (If x were boolean, e.g., 'if(x = true)', it would compile)."
        },
        {
          question: "What is the 'dangling else' problem?",
          answer: "When if statements are nested without braces, the else clause always binds to the nearest if, which can differ from programmer intent. Always use braces to eliminate ambiguity."
        },
        {
          question: "Can if-else be replaced with a Map in Java?",
          answer: "Yes, for dispatch patterns. Instead of if-else chains checking a string/enum and calling methods, you can store Runnable or Supplier references in a Map<String, Runnable> and call map.get(key).run(). This scales better and is more maintainable for many branches."
        }
      ],
      code: `int age = 18;
if (age >= 18) {
    System.out.println("Voter");
} else {
    System.out.println("Minor");
}`,
      visualizerType: "jvm"
    },
    {
      id: 25,
      title: "If-Else-If",
      intro: "Multiple options, chosen sequentially.",
      explanation: "1. Evaluates conditions TOP to BOTTOM — first match wins; rest are SKIPPED.\n2. Fundamentally different from multiple `if` blocks (which all evaluate independently).\n3. The final `else` at the bottom is a catch-all default — runs if NO condition matched.\n4. Classic use: grade bands (marks > 90 → A+, marks > 80 → A, etc.).\n5. More than 4-5 branches? Refactor to switch expression or a Map for cleaner code.",
      gotchas: [
        "Order matters! Put specific conditions at the top, and broad conditions below. If a broad condition matches first, the specific one is never reached.",
        "Each condition in an if-else-if chain is independent code, not a range restriction. Writing `if (x > 0) else if (x > 10)` means the second branch is dead code — x > 10 is already excluded by the first branch since x > 10 also satisfies x > 0.",
        "Unlike switch, if-else-if chains accept any boolean expression (ranges, method calls, complex logic), not just constant values."
      ],
      interviewQuestions: [
        {
          question: "Is there any performance penalty in deep if-else-if chains?",
          answer: "Yes, it evaluates sequentially (O(N)). For large numbers of constant options, a Switch statement or Map lookup is faster (O(1) compiled via tableswitch)."
        },
        {
          question: "What is the difference between chained if-else-if and multiple separate if statements?",
          answer: "In a chained if-else-if, only the FIRST matching branch executes and the rest are skipped. With separate if statements, each condition is evaluated independently — multiple blocks can run. Use if-else-if when conditions are mutually exclusive."
        }
      ],
      code: `int marks = 85;
if (marks > 90) {
    System.out.println("A+");
} else if (marks > 80) {
    System.out.println("A"); // Prints this, skips next
} else {
    System.out.println("B");
}`,
      visualizerType: "jvm"
    },
    {
      id: 26,
      title: "Ternary Operator",
      intro: "Shortest decision maker in town. One-liner if-else.",
      explanation: "Syntax: `condition ? expressionIfTrue : expressionIfFalse`\n1. It is an EXPRESSION (not a statement) — produces a value that can be assigned or passed as argument.\n2. Key advantage over if-else: can be used inline: `System.out.println(x > 0 ? \"pos\" : \"neg\")`.\n3. Only the matching branch evaluates — unused branch's method calls are skipped.\n4. Type promotion: if branches return different types (int vs double), JVM promotes to the wider type.\n5. Rule of thumb: one condition, two simple values → ternary. Multiple statements → if-else.",
      gotchas: [
        "Avoid nesting ternaries! Reading `a ? b ? c : d : e` will cause teammates to pull their hair out. Keep it simple.",
        "Type promotion: if the true-branch returns an int and the false-branch returns a double, the entire expression is promoted to double. This can cause subtle bugs when assigning to an int variable.",
        "The ternary operator is NOT a replacement for if-else when you have side effects or multiple statements. Use it only for selecting between two values, not for executing two different actions."
      ],
      interviewQuestions: [
        {
          question: "What is the type of a ternary operator result?",
          answer: "The JVM determines a common compatible type for both result expressions. If one is double and the other is int, the result type will be promoted to double."
        },
        {
          question: "What is the key difference between a ternary operator and an if-else statement?",
          answer: "A ternary operator is an expression that evaluates to a value and can be used inline (in assignments, method arguments). An if-else is a statement that cannot be used where a value is expected. Ternary is appropriate for value selection; if-else is appropriate for executing multiple statements."
        }
      ],
      code: `int time = 20;
String greeting = (time < 18) ? "Good day" : "Good evening";`,
      visualizerType: "jvm"
    },
    {
      id: 27,
      title: "Switch Statement",
      intro: "Clean alternative to deep if-else-if blocks.",
      explanation: "Matches a variable against multiple constant values. Java supports switch on primitives (byte, short, char, int), String, and Enums. In modern Java, switch expressions return values.",
      gotchas: [
        "Forgot `break`? Execution falls through to the next case automatically! Always check case terminations."
      ],
      interviewQuestions: [
        {
          question: "Does switch support float or double in Java?",
          answer: "No. Switch does not support float/double because floating-point precision issues make exact constant matching unreliable."
        }
      ],
      code: `int day = 2;
switch (day) {
    case 1 -> System.out.println("Monday");
    case 2 -> System.out.println("Tuesday"); // Modern syntax auto-breaks!
    default -> System.out.println("Other day");
}`,
      visualizerType: "jvm"
    },
    {
      id: 28,
      title: "Need for Loops",
      intro: "Don't repeat yourself. Let the CPU do the boring loops.",
      explanation: "Why loops exist — write once, repeat N times instead of copy-pasting:\n1. At CPU level: compiles to a conditional JUMP instruction (if counter < limit → jump back to start).\n2. Java's 3 loop types: `for` (known count), `while` (unknown count, check first), `do-while` (run first, check after).\n3. Real uses: iterate arrays, read files line-by-line, retry network calls, run game render frames.\n4. `break` → exits the loop immediately.\n5. `continue` → skips rest of current iteration, jumps to next check.",
      gotchas: [
        "Infinite loops can freeze your application, consume 100% CPU, and crash systems. Always define a clear terminating condition.",
        "`break` exits the loop immediately. `continue` skips the rest of the current iteration and jumps to the next. These are your tools for fine-grained loop control without restructuring the condition.",
        "Loops that perform heavy computation in each iteration can block the main thread, making applications feel frozen. For expensive iterations, use background threads or parallel streams."
      ],
      interviewQuestions: [
        {
          question: "How does CPU handle loops at assembly level?",
          answer: "It uses conditional jump instructions (like JMP, JZ) checking registers that decrement/increment values, repeating code segments."
        },
        {
          question: "What is the difference between break and continue in a loop?",
          answer: "`break` immediately terminates the loop and jumps to the first statement after the loop body. `continue` skips the remaining statements in the current iteration and jumps back to the loop's condition check (or increment step in a for loop). break exits; continue skips."
        }
      ],
      code: "// Loops automate repetitive tasks efficiently!",
      visualizerType: "jvm"
    },
    {
      id: 29,
      title: "While Loop",
      intro: "Runs while a condition remains true. Checked first.",
      explanation: "Syntax: `while (condition) { body }`\n1. PRE-TEST loop — condition checked BEFORE body. If false on first check, body never runs (0 iterations).\n2. Loop variable must be: initialized before loop, updated inside body.\n3. Best for: unknown iteration count — read input until 'quit', stream until EOF, poll queue until empty.\n4. Condition re-evaluates at the START of each iteration — mid-body changes take effect next iteration.\n5. `while (true)` + `break` is a valid pattern for complex exit conditions (game loops, servers).",
      gotchas: [
        "Ensure loop control variables are updated inside the loop body, otherwise the loop runs forever.",
        "The condition is re-evaluated at the START of each iteration after the body finishes. Changing a condition variable partway through the body does NOT immediately exit the loop — the current iteration still completes.",
        "Using a while loop where a for loop is more natural (e.g., iterating an array index from 0 to length) creates unnecessary boilerplate and risks forgetting the increment, causing infinite loops."
      ],
      interviewQuestions: [
        {
          question: "When should you prefer a while loop over a for loop?",
          answer: "Use while loop when the number of iterations is not known beforehand (e.g., reading a file line-by-line until end-of-file)."
        },
        {
          question: "What happens if the while loop condition is false from the start?",
          answer: "The loop body is never executed — not even once. The JVM evaluates the condition first, and since it is false immediately, execution skips directly to the statement after the closing brace. This makes while loops safe: they self-skip when there is nothing to do."
        },
        {
          question: "How do you safely break out of a while(true) infinite loop?",
          answer: "Use a break statement when the exit condition is met inside the body: `while(true) { if (done) break; }`. This pattern is common in game loops, server request handlers, and interactive CLIs where the exit condition is complex or comes from user input."
        }
      ],
      code: `int i = 0;
while (i < 5) {
    System.out.println(i);
    i++; // Don't forget this!
}`,
      visualizerType: "jvm"
    },
    {
      id: 30,
      title: "Do-While Loop",
      intro: "Act first, ask questions later. Guaranteed one execution.",
      explanation: "Syntax: `do { body } while (condition);`  ← semicolon is MANDATORY\n1. POST-TEST loop — body runs FIRST, condition checked AFTER. Guarantees at least 1 execution.\n2. Unique case: use when you ALWAYS need to run the action before knowing if you should repeat.\n3. Classic use cases: show a menu (display once, repeat if user doesn't exit); validate input (read once, re-ask if invalid).\n4. The semicolon after `while(condition)` is unique to do-while — forgetting it is a compile error.\n5. If there's ANY chance you want zero iterations, use while instead — do-while always runs once.",
      gotchas: [
        "Must end the while statement with a semicolon: `do { ... } while (condition);`.",
        "The body ALWAYS runs at least once regardless of the condition. If there is any chance you want zero iterations (nothing to process), use a while loop instead — do-while would incorrectly process even an empty list.",
        "The loop variable update must still happen inside the body. Forgetting it causes an infinite loop just like with while."
      ],
      interviewQuestions: [
        {
          question: "What is the key differentiator of do-while loop?",
          answer: "It executes the loop body first and checks the condition at the bottom, guaranteeing at least one execution."
        },
        {
          question: "Give a real-world use case where do-while is the best fit.",
          answer: "A console menu or an input validation loop. You always want to display the menu or prompt at least once before knowing whether to repeat. Example: `do { input = scanner.nextInt(); } while (input < 1 || input > 5);` — validates the range and re-prompts if invalid, but always reads input at least once first."
        }
      ],
      code: `int count = 10;
do {
    System.out.println("Count is: " + count);
    count++;
} while (count < 5); // runs once even though 10 is not < 5!`,
      visualizerType: "jvm"
    },
    {
      id: 31,
      title: "For Loop",
      intro: "Compact and powerful. Initialization, condition, and increment in one line.",
      explanation: "Syntax: `for (init; condition; update) { body }`\n1. Execution order: init (once) → check condition → body → update → check condition → repeat.\n2. If condition is false on first check, body NEVER runs.\n3. Loop variable declared in init is scoped to the loop only — not visible outside.\n4. All 3 parts optional: `for(;;)` is a valid infinite loop.\n5. Best for: known iteration count (array traversal, counting up/down).\n6. Off-by-one tip: use `i < arr.length` not `i <= arr.length` — valid indices are 0 to length-1.",
      gotchas: [
        "Declaring variables inside the initialization block limits their scope to the loop only. They can't be read outside.",
        "Off-by-one error: `for (int i = 0; i <= arr.length; i++)` accesses index `arr.length` which doesn't exist, causing ArrayIndexOutOfBoundsException. The correct bound is `i < arr.length`.",
        "Modifying the loop counter inside the body (e.g. `i += 2` when the update already does `i++`) makes the loop skip elements silently and is very hard to debug. Keep counter mutation in the update expression only."
      ],
      interviewQuestions: [
        {
          question: "Can we write multiple initializations or increments in a for loop?",
          answer: "Yes, separated by commas. E.g., 'for(int i=0, j=10; i<j; i++, j--)' is completely valid."
        },
        {
          question: "What is the execution order of a for loop's three header components?",
          answer: "Initialization runs exactly once before the loop starts. Then: condition is checked → if true, body runs → update runs → condition is checked again. If the condition is false on the very first check, the body never runs."
        },
        {
          question: "What is an off-by-one error in a for loop and how do you prevent it?",
          answer: "An off-by-one error is when you use <= instead of < (or vice versa) as the loop boundary, causing one extra or one fewer iteration than intended. For arrays, always use `i < array.length` (not `<=`) because valid indices run from 0 to length-1."
        }
      ],
      code: `for (int i = 0; i < 5; i++) {
    System.out.println("i: " + i);
}`,
      visualizerType: "jvm"
    },
    {
      id: 32,
      title: "Which Loop to Use",
      intro: "Right tool for the right job.",
      explanation: "Use **For Loop** when size/iterations is fixed (like array bounds). Use **While Loop** when looping until a condition is met (like network reading). Use **Do-While** when a menu options prompt must display once before checking selection.",
      gotchas: [
        "Using the wrong loop can lead to off-by-one errors (index out of bounds) or messy counter initializations."
      ],
      interviewQuestions: [
        {
          question: "Which loop is most performant in Java?",
          answer: "At bytecode level, there is minimal difference. The JVM compiles them similarly into conditional jumps. Choose for readability."
        }
      ],
      code: `// Iterate array: for loop.
// Read stream: while loop.
// Interactive CLI: do-while loop.`,
      visualizerType: "jvm"
    }
  ]
};
