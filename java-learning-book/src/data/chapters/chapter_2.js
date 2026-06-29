export default {
  id: 2,
  title: "Variables, Types & Operators",
  range: "17-23",
  concepts: [
    {
      id: 17,
      title: "Variables",
      intro: "Variables are named boxes in memory where we hold our data.",
      explanation: "In Java, every variable must have a declared Type (Java is statically typed). Syntactically: `dataType variableName = value;`. You cannot change a variable's type after declaration.",
      gotchas: [
        "Variables declared inside a method (local variables) must be initialized before use. They do NOT get default values like class instance fields!"
      ],
      interviewQuestions: [
        {
          question: "What is the difference between local variables and instance variables in memory initialization?",
          answer: "Instance variables get default values (e.g., 0, null, false) when the object is created on the heap. Local variables are created on the stack and must be explicitly initialized before reading, otherwise compilation fails."
        }
      ],
      code: `public class VarDemo {
    public static void main(String[] args) {
        int count; // declared
        // System.out.println(count); // ERROR: count not initialized!
        count = 10; 
        System.out.println(count); // OK
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 18,
      title: "Data Types",
      intro: "Primitives vs. References. The hardware layout of Java.",
      explanation: "Java has 8 primitive types: byte (1 byte), short (2), int (4), long (8), float (4), double (8), char (2, UTF-16), boolean. Reference types (Objects, Arrays, Strings) store references (pointers) pointing to the heap.",
      gotchas: [
        "Characters in Java are 2 bytes because they support Unicode (UTF-16), unlike C++ chars which are typically 1 byte (ASCII)."
      ],
      interviewQuestions: [
        {
          question: "Why does Java define precise byte sizes for primitive types?",
          answer: "To ensure platform independence. In other languages, sizes might depend on 32-bit or 64-bit architecture; Java guarantees an 'int' is always 32-bit on all systems."
        }
      ],
      code: `int num = 100_000_000; // Java allows underscores in literals for readability!
char letter = 'A';
boolean isJavaHard = false;`,
      visualizerType: "memory"
    },
    {
      id: 19,
      title: "Literals",
      intro: "Literals are constant values assigned directly to variables.",
      explanation: "Examples: `100` (int literal), `100L` (long literal), `3.14` (double literal), `3.14f` (float literal), `'A'` (char literal), \"Hello\" (String literal). We can represent integer literals in Hexadecimal (0x), Binary (0b), or Octal (0).",
      gotchas: [
        "Assigning `3.14` directly to float fails because decimal literals are default `double` (64-bit). You must append 'f' (e.g. `3.14f`)."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between float f = 3.14; and float f = 3.14f;?",
          answer: "The first statement will cause a compile-time error because 3.14 is treated as a double, and narrow conversion to float requires explicit casting or the 'f' suffix."
        }
      ],
      code: `float pi = 3.14f; // OK
double d = 3.14;
int hex = 0x1A; // Hexadecimal (26 decimal)
int bin = 0b1101; // Binary (13 decimal)`,
      visualizerType: "memory"
    },
    {
      id: 20,
      title: "Type Conversion",
      intro: "Casting values. Implicit widening vs. Explicit narrowing.",
      explanation: "Widening (Implicit): assigning small type to large type (e.g. byte to int). No data loss. Narrowing (Explicit/Casting): assigning large type to small type (e.g. double to int). Possible loss of precision.",
      gotchas: [
        "Narrowing casting truncation: casting 257 (int) to byte results in 1, because 257 in binary is 0001 0000 0001, and byte truncates to the last 8 bits (0000 0001 = 1)."
      ],
      interviewQuestions: [
        {
          question: "What is promotion of types in arithmetic expressions?",
          answer: "During operations, Java automatically promotes byte, short, char operands to 'int'. If one operand is long, float, or double, the entire expression is promoted to that type."
        }
      ],
      code: `byte b = 10;
int i = b; // Widening (Implicit)

double d = 9.78;
int castedInt = (int) d; // Narrowing (Explicit) -> castedInt is 9 (truncates decimals)`,
      visualizerType: "memory"
    },
    {
      id: 21,
      title: "Arithmetic Operators",
      intro: "Simple calculations: addition, subtraction, division, and modulo.",
      explanation: "Arithmetic operations (+, -, *, /, %). Modulo (%) returns the remainder of division. Division (/) with two integers yields an integer (e.g. 5/2 is 2). Make one operand double to get decimal results (5.0/2 is 2.5).",
      gotchas: [
        "Division by zero with integers throws ArithmeticException. Division by zero with float/double yields Infinity or NaN (Not a Number) without throwing exception!"
      ],
      interviewQuestions: [
        {
          question: "What is the result of 1.0 / 0.0 in Java?",
          answer: "It returns Double.POSITIVE_INFINITY. It does not throw an ArithmeticException because floating-point operations follow IEEE 754 standards."
        }
      ],
      code: `int x = 5 / 2; // x is 2
double y = 5.0 / 2; // y is 2.5

// System.out.println(10 / 0); // Throws ArithmeticException
System.out.println(10.0 / 0.0); // Prints: Infinity`,
      visualizerType: "jvm"
    },
    {
      id: 22,
      title: "Relational Operators",
      intro: "Comparing things: true or false.",
      explanation: "6 operators: == (equal), != (not equal), > (greater), < (less), >= (greater or equal), <= (less or equal).\n1. Always return boolean (true/false) — used directly in if, while, for conditions.\n2. On primitives (int, double): compare actual VALUES.\n3. On objects/references: == checks if both variables point to the SAME memory address, NOT the same content.\n4. Result can be stored: `boolean isAdult = age >= 18;` — keeps conditions readable and reusable.\n5. Floating-point equality with == is unreliable due to binary precision errors (0.1 + 0.2 ≠ 0.3).",
      gotchas: [
        "Never use == to compare Strings or Objects! == compares memory addresses (reference equality), not content value. Use .equals() instead.",
        "Comparing floating-point values with == is unreliable due to precision errors. Instead of `a == b`, use `Math.abs(a - b) < 1e-9` or use BigDecimal for exact comparisons.",
        "The result of a relational expression can be stored: `boolean isAdult = age >= 18;`. This makes complex conditions reusable and readable."
      ],
      interviewQuestions: [
        {
          question: "Explain the difference between == and .equals() in Java.",
          answer: "== is a binary operator that compares primitive values or reference addresses. .equals() is a method in Object class intended to compare values/contents of objects."
        },
        {
          question: "What does `new String(\"hello\") == new String(\"hello\")` return and why?",
          answer: "It returns false. Both 'new String()' calls create two separate objects on the heap at different memory addresses. == compares addresses, not content. Use .equals() to get true."
        },
        {
          question: "Why is comparing doubles with == a bad practice?",
          answer: "Floating-point arithmetic uses binary fractions that cannot represent all decimal values exactly. For example, 0.1 + 0.2 in binary is 0.30000000000000004, not 0.3. So `(0.1 + 0.2) == 0.3` returns false. Use BigDecimal or an epsilon tolerance check."
        }
      ],
      code: `int a = 10, b = 20;
System.out.println(a < b); // true

String s1 = new String("hi");
String s2 = new String("hi");
System.out.println(s1 == s2); // false (different objects in heap!)
System.out.println(s1.equals(s2)); // true (same letters!)`,
      visualizerType: "string-pool"
    },
    {
      id: 23,
      title: "Logical Operators",
      intro: "Combining conditions: AND, OR, NOT. Speed matters with Short-Circuiting.",
      explanation: "Operators: && (Short-circuit AND), || (Short-circuit OR), ! (NOT). Short-circuit means if the first operand determines the outcome, the second operand is not evaluated.",
      gotchas: [
        "Single & and | are bitwise or non-short-circuit logical operators. They evaluate both operands. Using them logically can cause NullPointerException if the second condition checks a null variable."
      ],
      interviewQuestions: [
        {
          question: "What is short-circuit evaluation and why is it useful?",
          answer: "It stops evaluating expression operands once the final truth value is known. && stops if first operand is false. || stops if first operand is true. Saves processing and guards against errors."
        }
      ],
      code: `String str = null;
// && guards against NullPointerException:
if (str != null && str.length() > 0) {
    System.out.println("Valid");
}

// Using single & would cause NullPointerException because str.length() runs even though str is null!
// if (str != null & str.length() > 0)`,
      visualizerType: "jvm"
    }
  ]
};
