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
      explanation: "1. Switch matches a single variable against multiple constant values and jumps to the matching `case` — far cleaner than a chain of `if-else-if` when testing one variable against many values.\n2. **Supported types**: `byte`, `short`, `char`, `int`, `String` (since Java 7), `Enum`, and wrapper types (`Integer`, `Character`). NOT supported: `float`, `double`, `long`, `boolean`.\n3. **Classic switch (pre-Java 14)**: uses `case X:` + `break`. Forgetting `break` causes fall-through — execution continues into the next case body automatically.\n4. **Modern switch expression (Java 14+)**: uses `case X ->` arrow syntax. No fall-through possible; each arm is isolated. Can also return a value: `int result = switch(x) { case 1 -> 10; default -> 0; };`.\n5. **`default` case**: optional but strongly recommended — runs when no case matches, like the `else` of a switch. Without it, unmatched values silently do nothing.\n6. In JS, `switch` has identical fall-through behavior — same bug risk. Both old Java and JS devs forget `break` for the same reason. Java's modern arrow syntax solves this; JS has no equivalent fix yet.\n7. Performance: classic switch compiles to a `tableswitch` JVM instruction (O(1) jump table) for dense integer cases — faster than an equivalent if-else-if chain which is O(N).",
      gotchas: [
        "Forgetting `break` in classic switch causes **fall-through** — execution continues into the NEXT case body even if it doesn't match. This is the #1 switch bug. The modern `->` arrow syntax eliminates fall-through entirely.",
        "Switch does NOT support `float`, `double`, or `long`. Float/double are excluded because floating-point comparisons are imprecise (0.1 + 0.2 ≠ 0.3), making exact constant matching unreliable. Long is excluded by design.",
        "When switching on `String`, Java calls `.equals()` internally — but if the variable is `null`, you get a `NullPointerException`. Always null-check before a String switch."
      ],
      interviewQuestions: [
        {
          question: "Does switch support float or double in Java?",
          answer: "No. Float/double are excluded because floating-point arithmetic is imprecise — exact constant matching is unreliable (e.g. 0.1+0.2 ≠ 0.3 in binary). Long is also unsupported. Supported types: byte, short, char, int, String (Java 7+), Enum, and their wrappers."
        },
        {
          question: "What is fall-through in a switch statement and how do you prevent it?",
          answer: "Fall-through means when a matching case executes and there's no 'break', execution continues into the next case body regardless of whether that case matches. It causes silent bugs. Prevention options: always add 'break' at the end of each case (classic style), or use the Java 14+ arrow syntax `case X ->` which auto-breaks."
        },
        {
          question: "What is the difference between a switch statement and a switch expression in Java?",
          answer: "A switch statement executes code for a matching case (side effects). A switch expression (Java 14+) evaluates to a value that can be assigned: `int x = switch(day) { case MON -> 1; default -> 0; };`. Switch expressions use arrow syntax with no fall-through and must be exhaustive — every possible value must be covered or a default must exist."
        }
      ],
      code: `// Classic switch — needs 'break' to stop fall-through:
int day = 2;
switch (day) {
    case 1: System.out.println("Monday"); break;
    case 2: System.out.println("Tuesday"); break; // break prevents fall-through
    default: System.out.println("Other");
}

// Modern switch expression (Java 14+) — arrow syntax, no fall-through, returns value:
String label = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    default -> "Other";
};`,
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
      explanation: "1. **For loop** — use when the number of iterations is known before the loop starts. Classic use: traversing arrays, running a fixed count of retries, generating a sequence of numbers. The `init; condition; update` header keeps all loop control in one line.\n2. **While loop** — use when the number of iterations is unknown and you check the exit condition FIRST. Classic use: reading from a stream until EOF, polling a queue, waiting for a user to type 'quit'. If the condition is false immediately, the body never runs (0 iterations).\n3. **Do-while loop** — use when you need to run the body AT LEAST once before checking the exit condition. Classic use: displaying a menu (must show once), validating user input (must read once before re-prompting).\n4. **Enhanced for-each** — use for read-only iteration over arrays or any `Iterable` (List, Set, etc.). Cleanest syntax when you don't need the index. Compiles to iterator calls under the hood.\n5. **Decision guide**: Is count known? → `for`. Is count unknown, check first? → `while`. Must run once? → `do-while`. Just reading a collection? → `for-each`.\n6. In JS, you have `for`, `while`, `do-while`, `for...of` (like Java for-each), and `for...in` (for object keys — no direct Java equivalent). Java's `for-each` maps exactly to JS `for...of`.\n7. At bytecode level, all loops compile to the same conditional jump instructions (`ifeq`, `goto`). There is no runtime performance difference — choose based on readability and intent.",
      gotchas: [
        "Using `for` when a `while` is more natural leads to awkward counter initializations or dummy variables. If you can't fill all three `for` header parts naturally, switch to a `while`.",
        "Using `do-while` when there's any chance you want zero iterations (empty list, null input) causes a bug — the body always runs once. For any 'might skip entirely' scenario, use `while` instead.",
        "Using `for-each` when you need the index forces you to maintain a separate counter variable manually, which is error-prone. Use a classic indexed `for` loop when the index matters."
      ],
      interviewQuestions: [
        {
          question: "Which loop is most performant in Java?",
          answer: "At bytecode level, there is no meaningful difference — all loops compile to conditional jump instructions (ifeq/goto). The JVM JIT compiler optimizes them identically. Choose based on readability and which matches the use case: known count → for, unknown count → while, guaranteed once → do-while."
        },
        {
          question: "When would you use a do-while loop instead of a while loop?",
          answer: "When the loop body must execute at least once before the exit condition is checked. Classic examples: reading and validating user input (must read once to have something to validate), displaying an interactive menu (must show once before asking to repeat). If there's any chance of zero iterations, use while instead."
        },
        {
          question: "Can you always replace a while loop with a for loop?",
          answer: "Syntactically yes — `for(; condition; )` is equivalent to `while(condition)`. But readability suffers when the iteration variable isn't managed in the for header. Use for when all three header parts (init, condition, update) are naturally present. Use while when the update logic is buried inside a complex body or doesn't exist as a simple increment."
        }
      ],
      code: `int[] arr = {10, 20, 30, 40};

// FOR — index known, fixed count:
for (int i = 0; i < arr.length; i++) { System.out.println(arr[i]); }

// WHILE — unknown count (read until sentinel):
Scanner sc = new Scanner(System.in);
String input = "";
while (!input.equals("quit")) { input = sc.nextLine(); }

// DO-WHILE — must display menu at least once:
int choice;
do {
    System.out.println("1. Play  2. Quit");
    choice = sc.nextInt();
} while (choice != 2);

// FOR-EACH — read-only iteration, cleanest syntax:
for (int val : arr) { System.out.println(val); }`,
      visualizerType: "jvm"
    }
  ]
};
