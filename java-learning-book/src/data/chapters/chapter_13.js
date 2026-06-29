export default {
  id: 13,
  title: "Date-Time & Stream API",
  range: "118-127",
  concepts: [
    {
      id: 118,
      title: "Introduction to Date and Time",
      intro: "Why the legacy java.util.Date and Calendar APIs are a software engineering nightmare.",
      explanation: "Prior to Java 8, date operations relied on `java.util.Date` and `java.util.Calendar`. They were mutable (creating thread-safety issues), had confusing 0-indexed months (January was 0), and lacked clear offset/timezone capabilities.",
      gotchas: [
        "Legacy Date objects are mutable! If you pass a Date object to another class, that class can alter its time, leading to security flaws."
      ],
      interviewQuestions: [
        {
          question: "Why was the old Date/Calendar API replaced in Java 8?",
          answer: "Due to mutability (not thread-safe), poor API design (0-indexed months, year offset), lack of timezone support, and overall verbosity."
        }
      ],
      code: `// Legacy way (Not recommended!):
java.util.Date now = new java.util.Date();
System.out.println("Month: " + now.getMonth()); // Deprecated!`,
      visualizerType: "jvm"
    },
    {
      id: 119,
      title: "New Date and Time API",
      intro: "Modern, immutable, and thread-safe temporal classes.",
      explanation: "Java 8 introduced the `java.time` package (inspired by Joda-Time). All classes are immutable and thread-safe. Key classes: `LocalDate` (date only), `LocalTime` (time only), `LocalDateTime` (combined), `ZonedDateTime` (with zone offset), `Duration` (seconds/nanos), and `Period` (years/months/days).",
      gotchas: [
        "Since these classes are immutable, modifying calls (like plusDays) do not alter the current object; they return a brand new instance. Save the returned value!"
      ],
      interviewQuestions: [
        {
          question: "What is the difference between Period and Duration?",
          answer: "Period measures date-based time (days, months, years). Duration measures time-based time (seconds, nanoseconds, minutes)."
        }
      ],
      code: `java.time.LocalDate today = java.time.LocalDate.now();
java.time.LocalDate nextWeek = today.plusDays(7); // returns new instance!`,
      visualizerType: "jvm"
    },
    {
      id: 120,
      title: "Need for the Stream API",
      intro: "Replacing index loops with functional pipelines.",
      explanation: "Iterating collections using loops involves writing boilerplate code ('external iteration'). Stream API enables declarative processing ('internal iteration'), letting you express *what* to do with data, rather than *how* to do it.",
      gotchas: [
        "A stream does not store data! It is a wrapper pipeline that processes elements on the fly from a backing source (like a List or Set)."
      ],
      interviewQuestions: [
        {
          question: "How do streams differ from collections?",
          answer: "Collections store data in memory and allow modification. Streams do not store data, are functional in nature, and are designed for computation pipelines."
        }
      ],
      code: `// Declarative stream processing:
java.util.List<Integer> list = java.util.Arrays.asList(1, 2, 3);
long count = list.stream().filter(x -> x > 1).count();`,
      visualizerType: "jvm"
    },
    {
      id: 121,
      title: "forEach Method",
      intro: "Shorthand internal iteration of collections.",
      explanation: "The `forEach` method (introduced in Java 8) accepts a functional consumer interface. It iterates internally through elements, eliminating loop control indices and boilerplate code.",
      gotchas: [
        "You cannot break or return out of a forEach loop using standard keywords like 'break' or 'continue'. It executes fully."
      ],
      interviewQuestions: [
        {
          question: "How does forEach differ from traditional for-in loops?",
          answer: "Traditional loop uses external iteration where the programmer controls the pointer. forEach uses internal iteration managed by the library."
        }
      ],
      code: `java.util.List<String> names = java.util.Arrays.asList("A", "B", "C");
names.forEach(name -> System.out.println(name));`,
      visualizerType: "jvm"
    },
    {
      id: 122,
      title: "Stream API Fundamentals",
      intro: "Intermediate vs Terminal operations.",
      explanation: "Stream operations form pipelines. They split into: 1. Intermediate operations (like filter, map, sorted) which are lazy and return another stream. 2. Terminal operations (like collect, count, findFirst) which consume the stream and yield a result.",
      gotchas: [
        "A stream cannot be reused! Once a terminal operation is called on a stream, the stream is closed, and any further operations throw an IllegalStateException."
      ],
      interviewQuestions: [
        {
          question: "What does 'lazy evaluation' mean in Stream API?",
          answer: "Intermediate operations are not executed until a terminal operation is invoked. If the terminal operation doesn't need all elements, some are never evaluated."
        }
      ],
      code: `java.util.List<String> list = java.util.Arrays.asList("a", "b", "c");
// Stream created, filtered, mapped, and collected!
java.util.List<String> res = list.stream()
                                 .filter(x -> !x.isEmpty())
                                 .map(String::toUpperCase)
                                 .toList();`,
      visualizerType: "jvm"
    },
    {
      id: 123,
      title: "map(), filter(), reduce(), and sorted()",
      intro: "The core functional operators.",
      explanation: "1. `filter()`: filters elements matching predicate. 2. `map()`: transforms each element to another value. 3. `sorted()`: sorts elements. 4. `reduce()`: combines elements into a single result (e.g. sum or concat).",
      gotchas: [
        "map() preserves element counts but can change types. filter() preserves types but can reduce element counts."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of the reduce() operation?",
          answer: "To aggregate all stream elements into a single value (like finding sum, max, min, or joining strings) using an associative accumulator."
        }
      ],
      code: `int sum = java.util.Arrays.asList(1, 2, 3, 4)
                            .stream()
                            .filter(n -> n % 2 == 0) // 2, 4
                            .map(n -> n * 10)       // 20, 40
                            .reduce(0, Integer::sum); // 60`,
      visualizerType: "jvm"
    },
    {
      id: 124,
      title: "Parallel Stream",
      intro: "Splitting work across cores automatically.",
      explanation: "By calling `parallelStream()`, Java splits collections into sub-parts and processes them concurrently using a shared `ForkJoinPool.commonPool()`. Highly effective for massive datasets.",
      gotchas: [
        "Do not use parallel streams if elements are stateful or order-dependent, or if processing logic has side-effects (like modifying shared collections)."
      ],
      interviewQuestions: [
        {
          question: "Does parallelStream always run faster than normal stream?",
          answer: "No. Splitting tasks and context-switching has overhead. It can be slower for small lists or operations that require synchronization/blocking."
        }
      ],
      code: `java.util.Arrays.asList(1, 2, 3, 4)
           .parallelStream()
           .forEach(n -> System.out.println(n + " by " + Thread.currentThread().getName()));`,
      visualizerType: "jvm"
    },
    {
      id: 125,
      title: "Optional Class",
      intro: "A container object designed to eradicate NullPointerException.",
      explanation: "Optional encapsulates a value that may or may not be null. Instead of returning `null` (which caller might read without checks), return `Optional<T>`. Methods: `isPresent()`, `ifPresent()`, `orElse()`, `orElseThrow()`.",
      gotchas: [
        "Do not use Optional as class fields or method arguments; it is designed only as a method return type to prevent calling methods on null returns."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between Optional.of() and Optional.ofNullable()?",
          answer: "Optional.of(val) throws NullPointerException immediately if the value is null. Optional.ofNullable(val) handles null values safely, returning an empty Optional."
        }
      ],
      code: `java.util.Optional<String> name = java.util.Optional.ofNullable(null);
String result = name.orElse("Unknown"); // safe fallback`,
      visualizerType: "jvm"
    },
    {
      id: 126,
      title: "Method Reference",
      intro: "Double colon syntax. Ultra-compact lambda representation.",
      explanation: "Method references are shorthand representations of lambdas that simply execute a single method. Syntax uses double colons `::`. Forms: `Class::staticMethod`, `instance::instanceMethod`, `Class::instanceMethod`.",
      gotchas: [
        "Method references do not accept parameters in their call. They are only applicable if the method parameters match the lambda signature."
      ],
      interviewQuestions: [
        {
          question: "Convert this lambda to a method reference: name -> System.out.println(name).",
          answer: "System.out::println"
        }
      ],
      code: `java.util.List<String> list = java.util.Arrays.asList("apple", "orange");
list.forEach(System.out::println); // Shorthand method reference`,
      visualizerType: "jvm"
    },
    {
      id: 127,
      title: "Constructor Reference",
      intro: "Double colon syntax targeting constructors.",
      explanation: "You can refer to a class constructor using `ClassName::new`. Useful when streaming collections of identifiers and converting them into instantiated objects.",
      gotchas: [
        "Constructor references automatically match the signature of the functional interface, invoking parameterized constructors if required."
      ],
      interviewQuestions: [
        {
          question: "Write a lambda expression for instantiating a User class and its equivalent constructor reference.",
          answer: "Lambda: name -> new User(name); Constructor Reference: User::new"
        }
      ],
      code: `interface UserFactory {
    User create(String name);
}
class User {
    User(String name) {}
}
// reference constructor:
UserFactory factory = User::new;
User u = factory.create("Max");`,
      visualizerType: "jvm"
    }
  ]
};
