export default {
  id: 15,
  title: "Unit Testing with JUnit 5",
  range: "140-166",
  concepts: [
    {
      id: 140,
      title: "Welcome to the JUnit 5 Course",
      intro: "Introduction to the industry-standard Java testing framework.",
      explanation: "JUnit 5 is the modern evolution of Java unit testing. It is divided into three components: 1. JUnit Platform (the launcher engine), 2. JUnit Jupiter (the modern programming model/annotations), 3. JUnit Vintage (compatibility engine for older JUnit 3/4 versions).",
      gotchas: [
        "Annotations in JUnit 5 reside in `org.junit.jupiter.api` rather than `org.junit` (JUnit 4). Mismatching imports will cause tests to be skipped by the runner."
      ],
      interviewQuestions: [
        {
          question: "Explain the architecture of JUnit 5.",
          answer: "JUnit 5 is composed of JUnit Platform (core launching engine), JUnit Jupiter (new annotations and API), and JUnit Vintage (backward compatibility for JUnit 3 and 4)."
        }
      ],
      code: `// JUnit 5 Annotation imports:
import org.junit.jupiter.api.Test;`,
      visualizerType: "jvm"
    },
    {
      id: 141,
      title: "Understanding Unit Testing",
      intro: "Testing code modules in isolation. Automation replacing manual reviews.",
      explanation: "Unit testing focuses on testing the smallest testable parts (methods/classes) in absolute isolation. It validates that code behaves correctly under varying conditions, preventing regression errors as systems grow.",
      gotchas: [
        "If your test relies on live database connections or external API calls, it is an Integration Test, not a Unit Test. Use Mocks to isolate external systems."
      ],
      interviewQuestions: [
        {
          question: "What is unit testing and why is it essential?",
          answer: "It is testing individual software units (methods/classes) in isolation. It prevents regressions, verifies logic correctness, and documents how code behaves."
        }
      ],
      code: `// Unit Test: Tests mathematical logic of subtract() method in isolation.`,
      visualizerType: "jvm"
    },
    {
      id: 142,
      title: "Testing Without JUnit 5",
      intro: "Why testing using main() methods and print statements fails at scale.",
      explanation: "Testing without frameworks involves creating dummy runner classes containing `main()` methods, executing logic, and manually reading console prints. This process cannot be automated in CI/CD build scripts.",
      gotchas: [
        "Console print tests require constant manual inspections. They waste developer time and lack true pass/fail assertions."
      ],
      interviewQuestions: [
        {
          question: "Why should we avoid using main methods for testing?",
          answer: "Because they require manual output verification, cannot run in parallel easily, lack unified reporting, and cannot integrate with automated CI pipelines."
        }
      ],
      code: `// Legacy manual check:
if (calc.add(2, 2) != 4) {
    System.out.println("TEST FAILED");
}`,
      visualizerType: "jvm"
    },
    {
      id: 143,
      title: "JUnit 5 Without Maven",
      intro: "Running tests manually by configuring the JAR path.",
      explanation: "JUnit can be executed directly by downloading its JAR files (such as junit-platform-console-standalone) and referencing them on the compiler and execution classpaths via CLI commands.",
      gotchas: [
        "Managing JAR dependencies manually via command-line arguments is complex and error-prone. Use build tools like Maven or Gradle."
      ],
      interviewQuestions: [
        {
          question: "Can we run JUnit tests without any build tool?",
          answer: "Yes, by adding the JUnit standalone runner JAR file directly to the compiler class path (-cp) and running it via Java CLI."
        }
      ],
      code: `// CLI run command:
// java -jar junit-platform-console-standalone.jar --class-path bin --select-class MyTestClass`,
      visualizerType: "jvm"
    },
    {
      id: 144,
      title: "@Test in Action: JUnit 5 Basics",
      intro: "Marking methods as test cases.",
      explanation: "Marking a method with the `@Test` annotation informs the JUnit platform that the method is a test case. The framework instantiates the class and executes these methods. Test methods should not return values (void).",
      gotchas: [
        "In JUnit 5, test classes and test methods do not need to be marked public! Package-private (default) visibility is sufficient."
      ],
      interviewQuestions: [
        {
          question: "What is the return type of a JUnit test method?",
          answer: "Always void. JUnit ignores return values since it evaluates test outcomes via assertion frameworks rather than returned values."
        }
      ],
      code: `import org.junit.jupiter.api.Test;

class CalcTest {
    @Test
    void testAddition() {
        // test code here
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 145,
      title: "Understanding Assertion Fundamentals",
      intro: "Failing vs passing. Setting up the truth assertions.",
      explanation: "Assertions compare expected results against actual values produced by code. The `org.junit.jupiter.api.Assertions` class provides static methods like `assertEquals`, `assertTrue`, and `assertNotNull` to validate states.",
      gotchas: [
        "If an assertion fails, the test method halts immediately. Remaining lines within that test method are skipped, but other test methods still run."
      ],
      interviewQuestions: [
        {
          question: "What happens when an assertion fails inside a JUnit test?",
          answer: "It throws an AssertionFailedError. JUnit catches it, marks that specific test as failed, and proceeds to the next test method."
        }
      ],
      code: `import static org.junit.jupiter.api.Assertions.assertEquals;

class Demo {
    void verify() {
        assertEquals(10, 5 + 5); // passes
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 146,
      title: "Maven Setup for JUnit 5",
      intro: "Adding dependencies inside pom.xml file.",
      explanation: "To integrate JUnit 5 in Maven, add the `junit-jupiter` dependency (which bundles platform, engine, and api) inside the `<dependencies>` section of the project's `pom.xml` configuration.",
      gotchas: [
        "Set the dependency `<scope>` to `test`. This ensures testing JAR files are excluded when packaging the production JAR/WAR build."
      ],
      interviewQuestions: [
        {
          question: "Why should JUnit dependencies have test scope in pom.xml?",
          answer: "It keeps the production bundle clean. Test scope guarantees test classes and test libraries are excluded during final production builds."
        }
      ],
      code: `<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
</dependency>`,
      visualizerType: "jvm"
    },
    {
      id: 147,
      title: "Maven Test directories",
      intro: "Structuring source directories under Maven standards.",
      explanation: "Maven enforces strict directory layouts: 1. Production code resides in `src/main/java`. 2. Test code resides in `src/test/java`. This separation prevents test classes from shipping in production releases.",
      gotchas: [
        "Ensure your test class package name matches your production package name. This permits testing package-private classes directly."
      ],
      interviewQuestions: [
        {
          question: "Where should test classes reside in a standard Maven project?",
          answer: "Under the 'src/test/java' directory, reflecting the same package package hierarchy as the source class."
        }
      ],
      code: `// Project layout:
// src/main/java/com/app/Calculator.java
// src/test/java/com/app/CalculatorTest.java`,
      visualizerType: "jvm"
    },
    {
      id: 148,
      title: "Writing Multiple Test Cases",
      intro: "Covering edge cases, happy paths, and error scenarios.",
      explanation: "A single class can contain dozens of test methods. We write separate tests for various scenarios: normal bounds, invalid entries, boundary checks, and empty limits.",
      gotchas: [
        "Avoid writing single massive test methods containing multiple assertions. Split them into granular, focused methods for clearer reports."
      ],
      interviewQuestions: [
        {
          question: "Why should we write multiple small tests instead of one large test?",
          answer: "Because if one assertion fails in a large test, we cannot know if subsequent assertions would pass or fail. Smaller tests give precise diagnostics."
        }
      ],
      code: `class CalculatorTest {
    @Test void testAddPositive() { /* ... */ }
    @Test void testAddNegative() { /* ... */ }
}`,
      visualizerType: "jvm"
    },
    {
      id: 149,
      title: "TDD in Action",
      intro: "Red, Green, Refactor. Writing tests before writing production code.",
      explanation: "Test-Driven Development (TDD) reverses classic coding patterns: 1. Write a failing test matching requested functionality (RED). 2. Write the minimal code needed to pass the test (GREEN). 3. Clean up and optimize the implementation (REFACTOR).",
      gotchas: [
        "TDD requires self-discipline. Writing mock expectations and test signatures before writing business classes might feel slow initially but prevents design flaws."
      ],
      interviewQuestions: [
        {
          question: "Explain the three phases of TDD.",
          answer: "Red: write a test that fails. Green: write minimal code to make it pass. Refactor: clean up the code while keeping tests green."
        }
      ],
      code: `// TDD workflow:
// 1. Write testSub() -> Fails compile
// 2. Define empty sub() method -> Red test
// 3. Implement subtract logic -> Green test`,
      visualizerType: "jvm"
    },
    {
      id: 150,
      title: "Maven Surefire Plugin",
      intro: "Automating test runs during project builds.",
      explanation: "The `maven-surefire-plugin` executes unit tests during the `test` phase of the Maven lifecycle. It generates test reports in XML and TXT formats inside the `target/surefire-reports` folder.",
      gotchas: [
        "By default, Surefire scans for classes ending with `Test`, `Tests`, or `TestCase`. Classes without these suffixes will be ignored by Maven."
      ],
      interviewQuestions: [
        {
          question: "What is the role of the maven-surefire-plugin?",
          answer: "To run unit tests during the test phase of the Maven build lifecycle and generate detailed reports of the testing outcomes."
        }
      ],
      code: `<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.1.2</version>
</plugin>`,
      visualizerType: "jvm"
    },
    {
      id: 151,
      title: "assertEquals Method",
      intro: "Comparing expectations against real outputs.",
      explanation: "`assertEquals(expected, actual)` checks if two values are equal. It handles object comparisons using the object's `equals()` method. You can optionally pass a descriptive error message as the third parameter.",
      gotchas: [
        "Do not swap expected and actual arguments! Mismatching them will result in confusing failure messages (e.g., 'Expected: 42, but actual: 0')."
      ],
      interviewQuestions: [
        {
          question: "How does assertEquals evaluate object equality?",
          answer: "By calling the expected object's equals() method: expected.equals(actual). If the expected object is null, it checks for double null."
        }
      ],
      code: `// assertEquals(expected, actual, message)
org.junit.jupiter.api.Assertions.assertEquals(4, calc.add(2, 2), "2+2 should equal 4");`,
      visualizerType: "jvm"
    },
    {
      id: 152,
      title: "assertNotEquals Method",
      intro: "Ensuring values differ for uniqueness checks.",
      explanation: "`assertNotEquals(unexpected, actual)` verifies that the actual output differs from the unexpected value. Used for validating state mutations or uniqueness generators.",
      gotchas: [
        "Like assertEquals, it uses equals() internally. Ensure your classes define accurate equals() behavior."
      ],
      interviewQuestions: [
        {
          question: "When should we use assertNotEquals?",
          answer: "When verifying that operations mutate states (e.g., ensuring updated timestamps differ from initial times) or when testing random generators."
        }
      ],
      code: `org.junit.jupiter.api.Assertions.assertNotEquals("default_pass", user.getPassword());`,
      visualizerType: "jvm"
    },
    {
      id: 153,
      title: "assertTrue & assertFalse",
      intro: "Asserting boolean flags and conditions.",
      explanation: "1. `assertTrue(condition)` → PASSES if expression is true; FAILS otherwise.\n2. `assertFalse(condition)` → PASSES if expression is false; FAILS otherwise.\n3. Both accept an optional message: `assertTrue(result, \"Expected result to be true but was false\")`.\n4. Failure message difference:\n   • `assertTrue(x == 5)` fails → shows only 'expected: true but was: false' — no clue what x was.\n   • `assertEquals(5, x)` fails → shows 'expected: 5 but was: 3' — immediately tells you the values.\n5. Use assertTrue/assertFalse for: boolean flags, isEmpty(), contains(), isPresent() — NOT for value equality.",
      gotchas: [
        "Avoid using assertTrue with equals comparisons (e.g. `assertTrue(val == 5)`). Use `assertEquals(5, val)` instead — it gives cleaner failure messages with expected vs actual values.",
        "assertTrue with object references uses ==, not .equals(). `assertTrue(obj1 == obj2)` checks address equality. For value equality on objects, use assertEquals which calls .equals().",
        "Don't write `assertTrue(true)` — a test that always passes is meaningless and gives false confidence."
      ],
      interviewQuestions: [
        {
          question: "Why is assertEquals(expected, actual) preferred over assertTrue(expected == actual)?",
          answer: "assertTrue only reports 'expected: true but was: false' — no diagnostic info. assertEquals reports 'expected: 5 but was: 3', immediately showing what went wrong without a debugger."
        },
        {
          question: "What is the correct order of arguments in assertEquals()?",
          answer: "assertEquals(expected, actual) — expected value FIRST, actual value SECOND. Reversing them doesn't affect pass/fail, but it reverses the failure message ('expected: 7 but was: 5' vs 'expected: 5 but was: 7'), which confuses debugging."
        }
      ],
      code: `org.junit.jupiter.api.Assertions.assertTrue(list.isEmpty());`,
      visualizerType: "jvm"
    },
    {
      id: 154,
      title: "Assertions on Arrays",
      intro: "Comparing arrays element by element.",
      explanation: "1. `assertArrayEquals(expected, actual)` → checks same length, same element types, same values at every index.\n2. Works for primitive arrays (int[], double[]) and Object arrays (String[], Integer[]).\n3. For 2D arrays: checks dimensions AND each nested element recursively.\n4. On failure → tells you exactly WHICH index mismatched and what the values were.\n5. Optional message: `assertArrayEquals(expected, actual, \"Sorted output doesn't match\")`.",
      gotchas: [
        "Comparing arrays using `assertEquals` will FAIL — arrays in Java don't override equals(), so it compares memory addresses. Always use assertArrayEquals for arrays.",
        "Order matters — `assertArrayEquals({1,2,3}, {3,2,1})` FAILS even though both contain the same elements. For order-independent checking, sort both arrays first.",
        "For floating-point arrays, use the overload with a delta: `assertArrayEquals(expected, actual, 0.001)` to allow small precision differences."
      ],
      interviewQuestions: [
        {
          question: "Why will assertEquals(array1, array2) fail even if they contain the same values?",
          answer: "Arrays in Java do not override the equals() method. assertEquals calls .equals() which compares memory addresses (reference equality), not element values. Use assertArrayEquals which explicitly compares element-by-element."
        },
        {
          question: "How do you test a method that returns a sorted array in JUnit 5?",
          answer: "Use assertArrayEquals(expectedSortedArray, actualArray). Define expected as the known-correct sorted order and pass the actual result. assertArrayEquals checks length, element types, and values at each index position."
        }
      ],
      code: `int[] expected = {1, 2, 3};
int[] actual = {1, 2, 3};
org.junit.jupiter.api.Assertions.assertArrayEquals(expected, actual);`,
      visualizerType: "jvm"
    },
    {
      id: 155,
      title: "Testing Expected Exceptions",
      intro: "Verifying that bad inputs fail correctly.",
      explanation: "Use `assertThrows(ExpectedException.class, executable)` to verify that a block throws a specific error. It returns the thrown exception instance, allowing you to validate error message strings.",
      gotchas: [
        "If no exception is thrown, or if a completely different exception type is thrown, the test fails."
      ],
      interviewQuestions: [
        {
          question: "How do you test that a method throws an IllegalArgumentException in JUnit 5?",
          answer: "Use assertThrows: Exception ex = assertThrows(IllegalArgumentException.class, () -> myMethod(-1));"
        }
      ],
      code: `Throwable exception = org.junit.jupiter.api.Assertions.assertThrows(
    ArithmeticException.class, 
    () -> { int val = 10 / 0; }
);
org.junit.jupiter.api.Assertions.assertEquals("/ by zero", exception.getMessage());`,
      visualizerType: "exception"
    },
    {
      id: 156,
      title: "assertTimeout Method",
      intro: "Setting execution time limits.",
      explanation: "`assertTimeout(Duration, Executable)` validates that code completes within a specified limit. `assertTimeoutPreemptively` runs execution in a separate thread and terminates it immediately if it exceeds the timeout threshold.",
      gotchas: [
        "Using assertTimeoutPreemptively can be dangerous if the tested code relies on ThreadLocals, as it executes in a separate sub-thread."
      ],
      interviewQuestions: [
        {
          question: "How does assertTimeout differ from assertTimeoutPreemptively?",
          answer: "assertTimeout runs code in the same thread and checks time after completion. assertTimeoutPreemptively runs in a separate thread and halts execution immediately at timeout."
        }
      ],
      code: `import static org.junit.jupiter.api.Assertions.assertTimeout;
import java.time.Duration;

assertTimeout(Duration.ofMillis(100), () -> {
    // some computation
});`,
      visualizerType: "jvm"
    },
    {
      id: 157,
      title: "Selective & Readable Tests",
      intro: "Using @DisplayName and @Disabled.",
      explanation: "`@DisplayName(\"Custom Title\")` replaces ugly method names in IDE test reports with friendly text names. `@Disabled(\"Reason\")` skips a test without failing the build.",
      gotchas: [
        "Avoid comment-out testing blocks to skip them. Use `@Disabled` so the runner reports the test as skipped, keeping track of ignored tests."
      ],
      interviewQuestions: [
        {
          question: "How do you temporarily ignore a test in JUnit 5?",
          answer: "By annotating the test method or test class with @Disabled, optionally adding a string description detailing why it's skipped."
        }
      ],
      code: `import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;

@DisplayName("User Validation Suite")
class UserTest {
    @Disabled("API key expired")
    @Test void testApi() {}
}`,
      visualizerType: "jvm"
    },
    {
      id: 158,
      title: "@BeforeEach and @AfterEach",
      intro: "Setup and cleanup steps for individual test runs.",
      explanation: "Methods marked with `@BeforeEach` run before *every* test method. Methods marked with `@AfterEach` run after *every* test. Useful for refreshing instance variables or cleaning mock databases.",
      gotchas: [
        "JUnit 5 creates a fresh instance of the test class for each test method run. Fields mutated in Test A do not carry over to Test B."
      ],
      interviewQuestions: [
        {
          question: "What is the execution order of @BeforeEach, @Test, and @AfterEach?",
          answer: "@BeforeEach runs, then @Test executes, then @AfterEach runs. This repeats for every test method in the class."
        }
      ],
      code: `import org.junit.jupiter.api.BeforeEach;

class DBTest {
    @BeforeEach
    void setup() {
        System.out.println("Refreshing DB Connection...");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 159,
      title: "@BeforeAll and @AfterAll",
      intro: "Heavyweight setup tasks executed once per class.",
      explanation: "Methods annotated with `@BeforeAll` and `@AfterAll` execute once before any test runs and once after all tests finish. They are typically used for heavy setups (e.g. launching Docker containers or DB servers).",
      gotchas: [
        "In default lifecycles, @BeforeAll and @AfterAll methods MUST be declared static! Otherwise, compilation fails."
      ],
      interviewQuestions: [
        {
          question: "Why must @BeforeAll methods be static in JUnit 5?",
          answer: "Because JUnit creates a new test instance for each test method. A static method runs before any instances are instantiated, on the class-level."
        }
      ],
      code: `import org.junit.jupiter.api.BeforeAll;

class SetupAll {
    @BeforeAll
    static void initGlobalSystem() {
        System.out.println("Initializing global server...");
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 160,
      title: "Test Instance Lifecycle",
      intro: "Modifying test instance creation settings.",
      explanation: "By default, JUnit creates a new class instance for each test method (PER_METHOD). You can configure it to create one single instance for the entire class using `@TestInstance(Lifecycle.PER_CLASS)`.",
      gotchas: [
        "If you use PER_CLASS, `@BeforeAll` and `@AfterAll` methods do not need to be static anymore! However, beware of cross-test state leakage."
      ],
      interviewQuestions: [
        {
          question: "What is the benefit of @TestInstance(Lifecycle.PER_CLASS)?",
          answer: "It allows declaring @BeforeAll/@AfterAll on non-static methods and shares state between test methods within the same class instance."
        }
      ],
      code: `import org.junit.jupiter.api.TestInstance;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class DemoTest {
    @BeforeAll void init() {} // No static keyword required!
}`,
      visualizerType: "jvm"
    },
    {
      id: 161,
      title: "Conditional Test Execution",
      intro: "Running tests selectively on certain OS, JRE, or System properties.",
      explanation: "JUnit 5 supports conditional annotation checks: `@EnabledOnOs(OS.LINUX)`, `@EnabledOnJre(JRE.JAVA_17)`, `@EnabledIfSystemProperty` to skip tests in incompatible runtime environments.",
      gotchas: [
        "Conditional tests are reported as 'skipped' rather than 'failed' if conditions are not met, keeping build pipelines clean."
      ],
      interviewQuestions: [
        {
          question: "How do you run a unit test only when executing on a Windows platform?",
          answer: "Annotate the test method with the @EnabledOnOs(OS.WINDOWS) annotation."
        }
      ],
      code: `import org.junit.jupiter.api.condition.EnabledOnOs;
import org.junit.jupiter.api.condition.OS;

@EnabledOnOs(OS.LINUX)
@Test void runOnlyOnLinux() {}`,
      visualizerType: "jvm"
    },
    {
      id: 162,
      title: "Skipping Tests with Assumptions",
      intro: "Dynamic run conditions evaluated inside test blocks.",
      explanation: "Unlike annotations, `Assumptions` evaluate conditions *during* execution. If `Assumptions.assumeTrue(condition)` fails, execution of the current test halts, and it is marked as skipped.",
      gotchas: [
        "Assumptions do not fail a test; they merely abort it, marking it as skipped in reporting metrics."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between an Assertion and an Assumption?",
          answer: "A failed Assertion fails the test. A failed Assumption aborts the test early and marks it as skipped without failing the build."
        }
      ],
      code: `import org.junit.jupiter.api.Assumptions;

@Test void testRemoteDb() {
    Assumptions.assumeTrue("PROD".equals(System.getenv("ENV")));
    // rest of test code runs only in PROD
}`,
      visualizerType: "jvm"
    },
    {
      id: 163,
      title: "Nested Tests",
      intro: "Creating hierachical groups of tests.",
      explanation: "Annotating inner classes with `@Nested` allows organizing tests in hierarchies. It groups related scenarios under a single outer test class, making reports cleaner.",
      gotchas: [
        "By default, nested inner classes cannot have static methods like @BeforeAll unless the nested class is configured with PER_CLASS instance lifecycle."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of @Nested classes in JUnit 5?",
          answer: "To group related test scenarios hierarchically, allowing shared initialization blocks inside nested levels for clean grouping."
        }
      ],
      code: `import org.junit.jupiter.api.Nested;

class AccountTest {
    @Nested
    class WhenNew {
        @Test void testBalance() {}
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 164,
      title: "@RepeatedTest Annotation",
      intro: "Executing a test multiple times automatically.",
      explanation: "Annotate methods with `@RepeatedTest(count)` instead of `@Test`. Useful for validating non-deterministic tasks, random behaviors, or concurrency safety over repetitions.",
      gotchas: [
        "Do not use @Test alongside @RepeatedTest on the same method, or the method will execute one extra time as a normal test."
      ],
      interviewQuestions: [
        {
          question: "How do you repeat a unit test 10 times in JUnit 5?",
          answer: "By annotating the test method with @RepeatedTest(10) instead of using the standard @Test annotation."
        }
      ],
      code: `import org.junit.jupiter.api.RepeatedTest;

@RepeatedTest(5)
void testRandomGeneration() {
    // runs 5 times automatically
}`,
      visualizerType: "jvm"
    },
    {
      id: 165,
      title: "Parameterized Tests with @ValueSource",
      intro: "Running the same test logic with varying inputs.",
      explanation: "Parameterized tests run a test method multiple times with different arguments. Annotate the method with `@ParameterizedTest` and supply values using `@ValueSource` (arrays of primitives or strings).",
      gotchas: [
        "@ValueSource only supports single parameters. You cannot pass multiple arguments to test methods using it."
      ],
      interviewQuestions: [
        {
          question: "How do parameterized tests help write cleaner code?",
          answer: "They eliminate duplicate test methods that share identical assertion logic but use different inputs. A single method handles all cases."
        }
      ],
      code: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@ParameterizedTest
@ValueSource(ints = {2, 4, 6})
void testEvenNumbers(int val) {
    org.junit.jupiter.api.Assertions.assertEquals(0, val % 2);
}`,
      visualizerType: "jvm"
    },
    {
      id: 166,
      title: "Parameterized Tests with @CsvSource",
      intro: "Tabular parameter test inputs.",
      explanation: "`@CsvSource` allows passing multiple parameters matching comma-separated rows. It can pass combinations of inputs and expected outputs to a single test method.",
      gotchas: [
        "Ensure the CSV values match the data types of your method parameters. The framework automatically parses them but throws errors on mismatches."
      ],
      interviewQuestions: [
        {
          question: "How can you feed tabular parameters (inputs and expected results) into a parameterized test?",
          answer: "By using the @CsvSource annotation, providing rows of strings with comma-separated values matching test method parameters."
        }
      ],
      code: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

@ParameterizedTest
@CsvSource({
    "1, 2, 3",
    "10, 20, 30"
})
void testAdd(int num1, int num2, int expected) {
    org.junit.jupiter.api.Assertions.assertEquals(expected, num1 + num2);
}`,
      visualizerType: "jvm"
    }
  ]
};
