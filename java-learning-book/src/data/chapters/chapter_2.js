export default {
  id: 2,
  title: "Variables, Types & Operators",
  range: "17-23",
  concepts: [
    {
      id: 17,
      title: "Variables",
      intro: "A named memory slot with a type locked at compile time. Java forces you to commit — no dynamic surprises like JavaScript.",
      explanation: "1. A variable is a named container that holds a value with a **fixed type** that never changes. Java is **statically typed** — types are checked at compile time, not runtime. `int age = 28;` means `age` is bound to `int` forever. Trying `age = \"twenty-eight\";` later is a compile error, not a runtime surprise.\n2. **Declaration vs Initialization are separate steps.** `int age;` (declaration) reserves memory. `age = 28;` (initialization) stores a value. You can combine: `int age = 28;` — but the compiler tracks them independently.\n3. **Local variables (inside methods) have NO default value.** If you declare `int age;` and try to read it before assigning, the compiler refuses: \"variable age might not have been initialized.\" This is deliberate — Java catches this class of bugs at compile time.\n4. **Instance variables (inside a class, outside methods) DO get defaults** — numbers default to 0, `boolean` to `false`, objects to `null`. Each object gets its own copy. Instance variables live on the heap inside the object.\n5. **Static variables belong to the class itself** — shared across every instance. `Employee.company` is one variable regardless of how many Employee objects you create. Also get automatic defaults.\n6. Naming: camelCase by convention, must start with a letter/`_`/`$`. Case-sensitive: `age` and `Age` are different variables. The `final` keyword makes a variable a constant — once assigned, it can never be reassigned.",
      gotchas: [
        "Local variables have no defaults and the compiler enforces this — reading before assigning is a compile error, not a runtime crash. Instance and static variables DO get defaults. This difference trips people coming from JavaScript where variables are simply `undefined`.",
        "`final double PI = 3.14159;` — once assigned, any later `PI = 3.14;` is a compile error. Final variables are constants. Use UPPER_SNAKE_CASE by convention: `final int MAX_SIZE = 100;`.",
        "Scope is strictly block-based. A variable declared inside a for-loop `{ }` does NOT exist outside that block, even inside the same method. This is tighter scoping than JavaScript's `var`."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between local, instance, and static variables in Java?",
          answer: "Local variables live on the stack, tied to a method call, no default value — must initialize before use. Instance variables live on the heap inside each object, get automatic defaults, each object has its own copy. Static variables live in the method area, shared by all objects of the class, also get defaults."
        },
        {
          question: "Why doesn't Java allow reading an uninitialized local variable?",
          answer: "Java performs definite assignment analysis at compile time — it traces every possible code path and rejects code where a variable might be read before it's written. This prevents the undefined behavior you'd get in C/C++ where reading an uninitialized var gives garbage values. The cost is a compile error; the benefit is eliminating a whole class of runtime bugs."
        },
        {
          question: "Can a static variable be accessed through an object reference?",
          answer: "Yes, but it's bad practice. `employee.company` works but misleads the reader into thinking it's instance-specific. Always access static variables through the class: `Employee.company`. Most IDEs warn about accessing static members via instance references."
        }
      ],
      code: `public class VariableDemo {
    static String company = "NatWest"; // static: one copy, shared by all objects
    String name;    // instance: each object gets its own, defaults to null
    int salary;     // instance: defaults to 0

    public void show() {
        int localAge;               // local: no default!
        // System.out.println(localAge); // COMPILE ERROR — not initialized
        localAge = 28;
        System.out.println(localAge);  // 28
        System.out.println(name);      // null (instance default)
        System.out.println(company);   // "NatWest" (static)

        final int MAX_RETRIES = 3;
        // MAX_RETRIES = 5; // COMPILE ERROR — final can't be reassigned
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 18,
      title: "Data Types",
      intro: "Eight primitives and everything else. Primitives hold values directly; reference types hold memory addresses. This split defines how Java uses memory.",
      explanation: "1. Java has exactly **8 primitive types** — they hold their value directly in memory. Everything else (String, arrays, objects, custom classes) is a **reference type** that stores a memory address (pointer) on the stack, pointing to the actual data on the heap.\n2. **Integer primitives (4 sizes):** `byte` (1 byte, -128 to 127), `short` (2 bytes, ±32,767), `int` (4 bytes, ±2.1 billion — the everyday default), `long` (8 bytes, ±9.2 quintillion). Use `int` by default; reach for `long` only when your number exceeds int range.\n3. **Floating-point (2 sizes):** `double` (8 bytes, ~15 decimal digits precision — the default for decimals), `float` (4 bytes, ~7 digits precision — rarely used, requires `f` suffix). Always use `double` unless memory is critically constrained.\n4. `char` is **2 bytes** (not 1!) because Java uses UTF-16 encoding to support all Unicode characters worldwide. C/C++ chars are 1 byte (ASCII only). `'A'` is stored as its Unicode code point 65. `char` is unsigned: range is 0 to 65,535.\n5. `boolean` holds only `true` or `false`. Its JVM memory size is undefined by the spec — implementations typically use 1 byte or 4 bytes. Never assume a size for boolean.\n6. Reference types store an address on the stack; the object lives on the heap. Two reference variables can point to the same object — this is why you can have shared mutable state and aliasing bugs. Default value for any reference type is `null`.",
      gotchas: [
        "Java's `int` is ALWAYS 32 bits regardless of the host machine (32-bit or 64-bit). Unlike C/C++ where `int` size varies by platform, Java guarantees fixed sizes for platform independence — a core design goal.",
        "`char` is unsigned in Java — range 0 to 65,535, not -128 to 127. You can do arithmetic: `'A' + 1` gives 66 (an int), and `(char)('A' + 1)` gives `'B'`. This surprises C developers.",
        "Widening from large `int`/`long` to `float`/`double` can silently lose precision even though float is 'wider' in bit count. `float f = 16_777_217;` stores `16_777_216.0` because float only has ~24 bits of mantissa. Never use float for financial calculations."
      ],
      interviewQuestions: [
        {
          question: "Why does Java have 8 primitive types instead of making everything an object?",
          answer: "Performance and memory. A primitive `int` costs 4 bytes with zero overhead. An `Integer` object costs ~16 bytes for the object header plus 4 bytes for the value, plus GC involvement. For arrays or repeated arithmetic, the difference is enormous. Java 5+ added autoboxing to bridge primitives and their wrapper classes."
        },
        {
          question: "What is the default value of each primitive type when declared as an instance variable?",
          answer: "Numeric types default to zero in their form: 0 for byte/short/int, 0L for long, 0.0f for float, 0.0 for double. char defaults to '\\u0000' (the null character). boolean defaults to false. Reference types default to null. Local variables get no default and must be explicitly initialized."
        },
        {
          question: "Why is char 2 bytes in Java but 1 byte in C?",
          answer: "Java uses UTF-16 encoding internally to represent Unicode characters. The Basic Multilingual Plane (most characters worldwide) requires up to 2 bytes. C traditionally used ASCII (128 characters, fits in 1 byte). Java made Unicode support a first-class feature from day one, at the cost of double the memory per character."
        }
      ],
      code: `// Primitives — value stored directly
byte temperature = -5;       // -128 to 127
short port = 8080;           // ±32,767
int population = 1_400_000_000; // underscores for readability (Java 7+)
long nationalDebt = 33_000_000_000_000L; // needs L suffix!
float rate = 3.5f;           // needs f suffix — otherwise it's a double
double pi = 3.14159265358979; // default for decimals, no suffix needed
char grade = 'A';            // Unicode code point 65
boolean isActive = true;

// Reference types — store address, actual object on heap
String name = "Sairam";      // name holds a memory address
int[] scores = {90, 85, 92}; // scores holds address of array on heap
String empty = null;         // reference pointing to nothing`,
      visualizerType: "memory"
    },
    {
      id: 19,
      title: "Literals",
      intro: "A literal is a value written directly in code — the compiler reads it and knows the type immediately. Getting the suffix wrong causes compile errors that confuse beginners.",
      explanation: "1. A **literal** is a fixed, hard-coded value written directly in source code: `42`, `3.14`, `'A'`, `\"Hello\"`, `true`. The compiler determines the type from the syntax. You can use literals directly in expressions without variables: `int x = 5 * 2 + 1;`.\n2. **Integer literals are `int` by default** (up to ±2.1 billion). For larger values, add `L` suffix: `long pop = 8_100_000_000L;`. Without `L`, that number exceeds int range and the compiler rejects the literal — not because of the variable type, but because the literal itself can't be represented as int.\n3. **Integer literals in different bases:** decimal (normal), hexadecimal `0x1A` (=26, useful for colors/flags), binary `0b1010` (=10, clear for bit operations), octal `017` (=15, starts with zero — avoid it). Hex and binary are common in systems/network code.\n4. **Decimal literals are `double` by default.** `3.14` is a double (8 bytes). Assigning to `float` requires `f` suffix: `float x = 3.14f;`. Without it: compile error \"possible lossy conversion from double to float.\" You can't implicitly narrow.\n5. **`char` literals use single quotes.** `'A'` is a char. `\"A\"` is a String object — completely different type. Single-char strings and char literals are NOT interchangeable: `char c = \"A\";` is a compile error.\n6. **Underscore separators** in numeric literals (`1_000_000`) are purely cosmetic — added in Java 7. The compiler strips them. Rules: can't start/end with underscore, can't be adjacent to decimal point. `1_0_0` is valid but absurd; `_100` is a compile error.",
      gotchas: [
        "`float f = 3.14;` is a compile error — not a runtime conversion. The literal `3.14` is a double; assigning to float narrows it and Java refuses without explicit permission. Fix: `float f = 3.14f;` or `float f = (float) 3.14;`.",
        "`long l = 3_000_000_000;` is also a compile error. The literal `3000000000` exceeds int range (max ~2.1B), so the compiler can't even create it as an int to then widen. You must add L FIRST: `long l = 3_000_000_000L;`.",
        "Octal trap: `int x = 010;` is 8, not 10. Any integer literal starting with `0` followed by digits is octal. This silently gives wrong values. Avoid leading zeros on integer literals unless you explicitly mean hex (`0x`) or binary (`0b`)."
      ],
      interviewQuestions: [
        {
          question: "Why does `float f = 3.14;` fail to compile?",
          answer: "The literal `3.14` is always a double (64-bit). Assigning it to float (32-bit) is a narrowing conversion — possible precision loss. Java's compiler rejects implicit narrowing. You must either add the `f` suffix (`3.14f`) or use an explicit cast (`(float) 3.14`)."
        },
        {
          question: "What is the difference between `'A'` and `\"A\"` in Java?",
          answer: "`'A'` is a char primitive — a single Unicode character in 2 bytes, stored by value. `\"A\"` is a String object — a full object on the heap with header overhead, even for one character. You cannot assign one to the other without explicit conversion. They're fundamentally different types."
        },
        {
          question: "What does the underscore in `1_000_000` do?",
          answer: "Nothing — it's purely a readability feature added in Java 7. The compiler strips all underscores from numeric literals. It's equivalent to `1000000`. Rules: cannot appear at the start, end, or adjacent to a decimal point or type suffix."
        }
      ],
      code: `// Integer literals
long population = 8_100_000_000L; // L required — exceeds int range
int hex = 0xFF;         // 255 in hexadecimal
int binary = 0b1010_0101; // 165 in binary with underscore grouping
// int octal = 010;     // 8 in octal — avoid this!

// Floating-point literals
double precise = 3.14159265358979; // double by default
float rough = 3.14f;               // f suffix required for float
// float bad = 3.14;               // COMPILE ERROR: double → float not implicit

// Long literal trap
// long big = 3_000_000_000;       // COMPILE ERROR: literal too big for int
long big = 3_000_000_000L;         // OK with L suffix

// Char vs String
char letter = 'Z';       // char: single quotes, primitive
String word = "Zebra";   // String: double quotes, object
// char bad = "Z";        // COMPILE ERROR: String is not char`,
      visualizerType: "memory"
    },
    {
      id: 20,
      title: "Type Conversion",
      intro: "Java never silently loses your data — widening (safe) is automatic; narrowing (risky) demands an explicit cast. The compiler enforces this.",
      explanation: "1. **Widening conversion** (implicit, automatic): assign a smaller type to a larger container. The promotion ladder: `byte → short → int → long → float → double`. Always safe for integers. No data loss, no cast needed. `int i = 42; long l = i;` just works.\n2. **Narrowing conversion** (explicit, requires cast): assign a larger type to a smaller container. `double d = 9.78; int i = (int) d;` — the `(int)` cast is your written acknowledgment that you understand data may be lost.\n3. **Narrowing truncates — it does NOT round.** `(int) 9.99` gives `9`, not `10`. `(int) -9.99` gives `-9`. The decimal part is simply discarded. This surprises people who expect mathematical rounding.\n4. **Integer narrowing discards high bits.** `(byte) 257` gives `1` — because 257 in binary is `0000 0001 0000 0001`; keeping only the last 8 bits gives `0000 0001 = 1`. `(byte) 200` gives `-56` because the high bit signals negative in signed byte representation.\n5. **Arithmetic promotion:** in expressions, Java auto-promotes smaller types. `byte + byte` gives `int`. If any operand is `long`, the expression is `long`. If any operand is `double`, the expression is `double`. This prevents overflow in intermediate calculations.\n6. **String is NOT part of the numeric type hierarchy** — you can't cast between String and numbers. Use parsing methods: `Integer.parseInt(\"42\")`, `Double.parseDouble(\"3.14\")`, `String.valueOf(42)`. Casting `(int)\"42\"` is a compile error.",
      gotchas: [
        "`(byte) 200` gives `-56`, not 200. Byte range is -128 to 127. 200 in binary is `11001000` — the leading 1 means negative in signed representation. The JVM silently wraps. No exception. Always know your target type's range before narrowing.",
        "Widening from `int`/`long` to `float`/`double` can lose precision even though it's 'safe' widening. `float f = 16_777_217;` stores `16_777_216.0` — off by one. Float only has ~24 bits for the number; large integers exceed its precision. Never use float/double for money — use `BigDecimal`.",
        "`byte b = 10; b += 5;` works but `byte b = 10; b = b + 5;` is a compile error. `b + 5` promotes to `int` during arithmetic, and assigning `int` back to `byte` without a cast fails. The compound `+=` operator includes an implicit cast; the expanded form does not."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between widening and narrowing conversions?",
          answer: "Widening goes from a smaller type to a larger type (byte→int→double) — always safe, always automatic, no cast needed. Narrowing goes from a larger type to a smaller type (double→int) — possible data loss, requires explicit cast syntax like `(int)`. The compiler forces you to acknowledge the risk explicitly."
        },
        {
          question: "What is arithmetic promotion and why does Java do it?",
          answer: "Before performing arithmetic, Java promotes operands to a common type. `byte + byte` computes as `int` to avoid overflow (byte range is only -128 to 127; adding two bytes could exceed it). If any operand is double, the whole expression becomes double. This automatic promotion prevents subtle overflow bugs in calculations."
        },
        {
          question: "Why can widening from int to float actually lose data?",
          answer: "They're both 4 bytes but represent different things. `int` uses all 32 bits for the integer value. `float` uses IEEE 754 format: 1 sign bit, 8 exponent bits, 23 mantissa bits — leaving only ~24 bits for precision. Integers above 16,777,216 (2^24) can't be represented exactly in float. This is why financial code must use `BigDecimal`, not float/double."
        }
      ],
      code: `// Widening — automatic, no cast needed
byte b = 42;
int i = b;        // byte → int: safe
long l = i;       // int → long: safe
double d = l;     // long → double: safe (but precision can differ for large longs)

// Narrowing — explicit cast required
double price = 9.99;
int dollars = (int) price;  // 9 — NOT 10! truncates, doesn't round
System.out.println(dollars); // 9

int big = 257;
byte wrapped = (byte) big;   // 1 — high bits discarded! (257 % 256 = 1)
System.out.println(wrapped); // 1

// Arithmetic promotion
byte x = 10, y = 20;
// byte result = x + y; // COMPILE ERROR: x+y promotes to int
int result = x + y;     // OK

// String conversion — NOT casting
int num = Integer.parseInt("123");  // String → int
String str = String.valueOf(456);   // int → String`,
      visualizerType: "memory"
    },
    {
      id: 21,
      title: "Arithmetic Operators",
      intro: "Five math operators plus increment/decrement. Integer division and the prefix vs postfix ++ trap are where most beginners silently get wrong answers.",
      explanation: "1. Five core operators: `+` (add), `-` (subtract), `*` (multiply), `/` (divide), `%` (modulo/remainder). On `String`, `+` is overloaded to mean concatenation: `\"Score: \" + 95` gives `\"Score: 95\"`. This is the only operator overloading in Java.\n2. **Integer division always truncates toward zero** — it drops the decimal entirely. `5 / 2 = 2`, not 2.5. `7 / 4 = 1`. To get decimal results, make at least one operand a double: `5.0 / 2` or `(double) 5 / 2`.\n3. **Modulo `%` gives the remainder.** `10 % 3 = 1` (because 10 = 3×3 + 1). Classic uses: even/odd check (`n % 2 == 0`), wrapping array indices, checking divisibility. On negatives, the sign follows the dividend: `-7 % 3 = -1` in Java.\n4. **Pre-increment `++i`** increments first, then returns the new value. **Post-increment `i++`** returns the current value first, then increments. In a standalone line they're identical. The difference only matters inside larger expressions: `int j = i++;` vs `int j = ++i;`.\n5. **Compound assignment operators** (`+=`, `-=`, `*=`, `/=`, `%=`) combine operation with assignment and include an implicit cast for byte/short/char. `x += 5` is equivalent to `x = (type) (x + 5)` — the hidden cast is why `byte b = 0; b += 1;` compiles but `b = b + 1;` doesn't.\n6. **Division by zero differs by type:** `int / 0` throws `ArithmeticException` at runtime. `double / 0.0` follows IEEE 754: returns `Infinity` for non-zero numerators, `NaN` for `0.0 / 0.0`. No exception for floating point.",
      gotchas: [
        "`int result = 1 / 3;` is 0, not 0.333. Integer division silently truncates. This produces wrong answers in percentage calculations, averages, and ratios — without any error or warning. Always cast or use a double literal: `(double) 1 / 3` or `1.0 / 3`.",
        "Avoid `i++` or `++i` embedded inside larger expressions. `int j = i++ + i;` has defined but confusing behavior. The value of `i++` is read before increment; then `i` is already incremented for the second use. Use `++`/`--` on their own line for clarity.",
        "`byte b = 10; b += 5;` compiles fine. `byte b = 10; b = b + 5;` is a compile error — `b + 5` promotes to `int`, and Java won't assign `int` back to `byte` without a cast. The compound `+=` operator includes an implicit narrowing cast. The full form does not."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between `i++` and `++i`?",
          answer: "Both increment `i` by 1. `i++` (post-increment) returns the current value THEN increments. `++i` (pre-increment) increments FIRST then returns the new value. In standalone statements like `i++;` they are identical. The difference only matters when used inside larger expressions like `int j = i++;`."
        },
        {
          question: "What does `10 / 3` return in Java, and how do you get a decimal result?",
          answer: "It returns 3 — integer division truncates the fractional part. To get 3.333..., promote at least one operand to double: `(double) 10 / 3`, or `10.0 / 3`. Note: `(double)(10 / 3)` still gives 3.0 because the division happens before the cast."
        },
        {
          question: "What happens with division by zero for int vs double in Java?",
          answer: "`int x = 5 / 0;` throws `ArithmeticException: / by zero` at runtime — it crashes. `double x = 5.0 / 0.0;` returns `Infinity` per the IEEE 754 floating-point standard — no exception. `0.0 / 0.0` returns `NaN` (Not a Number). You can check with `Double.isInfinite(x)` and `Double.isNaN(x)`."
        }
      ],
      code: `// Integer division — truncates, no rounding
System.out.println(7 / 2);       // 3 (not 3.5!)
System.out.println(7.0 / 2);     // 3.5 — double operand changes result
System.out.println((double) 7 / 2); // 3.5 — explicit cast before division

// Modulo
System.out.println(10 % 3);   // 1 (remainder)
System.out.println(-7 % 3);   // -1 (sign follows dividend in Java)
boolean isEven = (42 % 2 == 0); // classic even/odd check

// Pre vs post increment
int i = 5;
System.out.println(i++); // 5 — prints THEN increments
System.out.println(i);   // 6
System.out.println(++i); // 7 — increments THEN prints
System.out.println(i);   // 7

// Division by zero
// System.out.println(5 / 0);     // ArithmeticException — crash!
System.out.println(5.0 / 0.0);    // Infinity — no crash
System.out.println(0.0 / 0.0);    // NaN`,
      visualizerType: "jvm"
    },
    {
      id: 22,
      title: "Relational Operators",
      intro: "Six operators that compare values and always return boolean. The `==` vs `.equals()` distinction is one of Java's most common beginner traps.",
      explanation: "1. Six relational operators: `==` (equal), `!=` (not equal), `>` (greater), `<` (less), `>=` (greater or equal), `<=` (less or equal). They always return `boolean` (`true` or `false`). Used directly in `if`, `while`, `for` conditions, or stored: `boolean isAdult = age >= 18;`.\n2. **On primitives**, `==` compares actual values. `5 == 5` is `true`. This works exactly as you'd expect for numbers and `char`.\n3. **On reference types (objects, Strings)**, `==` compares **memory addresses**, NOT content. Two `String` objects with identical text can return `false` for `==` if they're different objects on the heap. Use `.equals()` to compare content.\n4. **String pool exception:** string literals (`\"hello\"`) are interned — Java reuses the same object for identical literals. So `\"hello\" == \"hello\"` may return `true`. But `new String(\"hello\") == new String(\"hello\")` always returns `false`. Never rely on this — always use `.equals()`.\n5. **Floating-point equality with `==` is unreliable** due to binary precision. `0.1 + 0.2 == 0.3` is `false` in Java (and every IEEE 754 language). Instead, check within a tolerance: `Math.abs(a - b) < 1e-9`. For exact decimal arithmetic, use `BigDecimal`.\n6. Relational expressions can be stored in variables or passed as arguments: `boolean eligible = age >= 18 && salary > 50000;`. This improves readability by naming the condition.",
      gotchas: [
        "Never use `==` to compare String content. `new String(\"hello\") == new String(\"hello\")` returns `false` — they're two separate heap objects at different addresses. Always use `s1.equals(s2)`. If either could be null, use `Objects.equals(s1, s2)` to avoid NullPointerException.",
        "`(0.1 + 0.2) == 0.3` is `false` in Java. Binary floating-point can't represent 0.1 or 0.2 exactly — 0.1 + 0.2 computes to `0.30000000000000004`. Use `Math.abs(a - b) < 1e-9` for floating-point comparison or `BigDecimal` for exact decimal math.",
        "Comparing `Integer` objects (boxed int) with `==` only works reliably for values -128 to 127 due to the Integer cache. `Integer a = 127; Integer b = 127; a == b;` is `true` (same cached object). `Integer a = 128; Integer b = 128; a == b;` is `false` (different heap objects). Use `.equals()` for Integer comparisons."
      ],
      interviewQuestions: [
        {
          question: "Explain the difference between `==` and `.equals()` in Java.",
          answer: "`==` is an operator that compares primitive values OR reference addresses (memory locations) for objects. `.equals()` is a method inherited from Object class, intended to compare the logical content/value of objects. For String, `==` asks 'same object?' and `.equals()` asks 'same characters?'."
        },
        {
          question: "What does `new String(\"hello\") == new String(\"hello\")` return and why?",
          answer: "It returns `false`. Both `new String()` calls create two separate objects on the heap at different memory addresses. `==` on objects compares addresses, not content — so they're different. Use `.equals()` to get `true`, which compares the actual character sequences."
        },
        {
          question: "Why is comparing doubles with `==` unreliable, and what's the correct approach?",
          answer: "Floating-point arithmetic uses binary fractions that can't represent most decimal values exactly. `0.1 + 0.2` in binary is `0.30000000000000004`, not `0.3`. So `(0.1 + 0.2) == 0.3` returns `false`. Use a tolerance check: `Math.abs(a - b) < 1e-9` for approximate equality, or `BigDecimal` for exact decimal arithmetic (financial code)."
        }
      ],
      code: `int a = 10, b = 20;
System.out.println(a < b);   // true
System.out.println(a == b);  // false

// Primitives: == compares values — correct
int x = 5, y = 5;
System.out.println(x == y);  // true

// Objects: == compares addresses — trap!
String s1 = new String("Java");
String s2 = new String("Java");
System.out.println(s1 == s2);      // FALSE — different heap objects
System.out.println(s1.equals(s2)); // TRUE — same content

// String literals may share object (interning) — don't rely on it
String lit1 = "Java";
String lit2 = "Java";
System.out.println(lit1 == lit2);  // true (same interned object — unreliable!)

// Floating-point equality trap
System.out.println((0.1 + 0.2) == 0.3);  // FALSE!
System.out.println(Math.abs((0.1 + 0.2) - 0.3) < 1e-9); // TRUE — correct way`,
      visualizerType: "string-pool"
    },
    {
      id: 23,
      title: "Logical Operators",
      intro: "Combine boolean conditions. The && and || operators short-circuit — they stop evaluating once the result is known — and this makes them essential for null safety.",
      explanation: "1. Three logical operators: `&&` (AND — true only if BOTH are true), `||` (OR — true if EITHER is true), `!` (NOT — flips the boolean). They only accept boolean operands. Unlike JavaScript, `if (someObject)` or `if (1)` is a compile error — the condition must be a boolean expression.\n2. **Short-circuit AND (`&&`):** if the LEFT operand is `false`, the right operand is NEVER evaluated. Result is already `false`. Use this to guard operations: `if (list != null && list.size() > 0)` — if list is null, `.size()` is never called, preventing NullPointerException.\n3. **Short-circuit OR (`||`):** if the LEFT operand is `true`, the right operand is NEVER evaluated. Result is already `true`. Pattern: `if (user.isAdmin() || user.hasPermission(\"edit\"))` — no expensive permission check needed if they're an admin.\n4. **`!` (NOT)** flips a boolean. `!true = false`. Best used with named conditions: `if (!list.isEmpty())` reads more naturally than `if (list.size() != 0)`. Double negation `!!x` is always `x` — remove it.\n5. **Single `&` and `|`** are non-short-circuit logical operators — they ALWAYS evaluate BOTH operands. This is their bitwise use case; for boolean logic they're almost never correct. Using `&` instead of `&&` in a null guard causes NullPointerException even when the guard condition is false.\n6. **De Morgan's Laws:** `!(A && B)` equals `(!A || !B)`, and `!(A || B)` equals `(!A && !B)`. Useful for simplifying inverted conditions in code reviews.",
      gotchas: [
        "Using `&` instead of `&&` for null guards is a classic bug. `if (str != null & str.length() > 0)` — when str is null, BOTH sides evaluate regardless. `str.length()` throws NullPointerException. Always use `&&` for conditional boolean logic; `&` is for bitwise operations.",
        "`||` short-circuit can hide bugs in methods with side effects. `if (methodA() || methodB())` — if methodA() returns true, methodB() is never called. If methodB() had important side effects (logging, counting, writing), they're silently skipped. Be aware of side effects in boolean expressions.",
        "XOR (`^`) also exists for booleans: `true ^ true = false`, `true ^ false = true`. It does NOT short-circuit. Rarely used in business logic but appears in cryptography and toggle operations."
      ],
      interviewQuestions: [
        {
          question: "What is short-circuit evaluation and why is it important?",
          answer: "`&&` stops evaluating when the first operand is false; `||` stops when the first is true. This prevents unnecessary computation AND prevents errors — the most common pattern is null-checking before calling a method: `if (obj != null && obj.method())`. Without short-circuit, the method call would execute even when obj is null."
        },
        {
          question: "What is the difference between `&&` and `&` in Java?",
          answer: "`&&` is short-circuit AND — evaluates the right operand only if the left is true. `&` is non-short-circuit AND — always evaluates both operands, then applies AND. For boolean logic, always use `&&`. Using `&` in null guards causes NullPointerException. The `&` operator's main role is bitwise operations on integers."
        },
        {
          question: "How would you evaluate the expression `false && someExpensiveMethod()`?",
          answer: "`someExpensiveMethod()` is NEVER called. Short-circuit AND sees `false` on the left and immediately returns `false` without evaluating the right side. This is the correct pattern for guarding expensive or risky operations — the guard check goes LEFT, the expensive call goes RIGHT."
        }
      ],
      code: `String input = null;

// SAFE: && short-circuits when input is null — .length() never called
if (input != null && input.length() > 0) {
    System.out.println("Has content");
}

// UNSAFE: & evaluates both sides — NullPointerException!
// if (input != null & input.length() > 0) // crash!

// || short-circuit: skips expensive check if first is true
boolean hasCachedAccess = true;
if (hasCachedAccess || loadPermissionsFromDB()) {
    System.out.println("Granted"); // loadPermissionsFromDB() never called
}

// NOT operator
boolean isEmpty = true;
if (!isEmpty) System.out.println("Not empty");

// De Morgan's: !(A && B) == (!A || !B)
boolean a = true, b = false;
System.out.println(!(a && b));   // true
System.out.println(!a || !b);    // true — identical result`,
      visualizerType: "jvm"
    }
  ]
};
