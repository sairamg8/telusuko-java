export default {
  id: 8,
  title: "Quiz Application Mini-Project",
  range: "73-77",
  concepts: [
    {
      id: 73,
      title: "Project 1 - Introduction",
      intro: "Applying OOP basics. Let's build a Quiz Game to test skills.",
      explanation: "In this mini-project, we design a console quiz system. We define a question object model and write helper service logic to load questions, display them to user, fetch console input, and calculate scores.",
      gotchas: [
        "Don't put display logic, scoring logic, and data arrays inside the same class. Split them into Question (Data Model) and QuestionService (Business Logic)."
      ],
      interviewQuestions: [
        {
          question: "How does MVC architecture map to a simple CLI application?",
          answer: "The Question class represents Model. QuestionService is the Controller managing questions array. The CLI prompt (Scanner input) represents the View layer."
        }
      ],
      code: "// We will create Question.java and QuestionService.java.",
      visualizerType: "jvm"
    },
    {
      id: 74,
      title: "Project 1 - Question & QuestionService",
      intro: "Designing the blueprint for questions.",
      explanation: "The `Question` class encapsulates: id, questionText, four options (opt1, opt2, opt3, opt4), and actualAnswer. Fields are private with getters/setters.",
      gotchas: [
        "Option choices should be kept clean, e.g. using arrays or numbered strings instead of messy variables where possible."
      ],
      interviewQuestions: [
        {
          question: "Why should we use encapsulation for data transfer objects (DTO) like Question class?",
          answer: "It secures data integrity, prevents external classes from modifying the question texts or answers directly, and maintains readability."
        }
      ],
      code: `class Question {
    private int id;
    private String questionText;
    private String opt1, opt2, opt3, opt4;
    private String answer;
    // getters, setters, constructors...
}`,
      visualizerType: "memory"
    },
    {
      id: 75,
      title: "Project 1 - Hard Coded Questions",
      intro: "Loading questions into memory array.",
      explanation: "In the constructor of `QuestionService`, we initialize an array of `Question` objects, filling them with core Java questions (e.g. 'Size of double?', 'Default value of reference?').",
      gotchas: [
        "Using hardcoded arrays has limits. In real apps, we retrieve questions dynamically using JDBC from a MySQL database."
      ],
      interviewQuestions: [
        {
          question: "What is the memory impact of loading many large objects into a static or service array?",
          answer: "They stay in memory for the lifetime of the service, which could lead to high memory consumption if data grows. Dynamic pagination is preferred."
        }
      ],
      code: `class QuestionService {
    Question[] questions = new Question[5];
    public QuestionService() {
        questions[0] = new Question(1, "Size of int?", "2", "4", "8", "1", "4");
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 76,
      title: "Project 1 - Play Quiz",
      intro: "Iterating questions and fetching user responses.",
      explanation: "We loop through the `questions` array. For each question, we print options to screen, use `Scanner` to receive input, and store the user's selected choice in an answers array.",
      gotchas: [
        "When using Scanner, calling `nextInt()` doesn't consume the newline character. Always execute `nextLine()` afterwards to avoid skipping prompts!"
      ],
      interviewQuestions: [
        {
          question: "Why does Scanner.nextInt() skip the next line scan?",
          answer: "nextInt() only reads the integer token. The newline character '\\n' remains in the input buffer. When nextLine() runs, it reads that newline and exits immediately, skipping prompt."
        }
      ],
      code: `public void playQuiz() {
    Scanner sc = new Scanner(System.in);
    for(Question q : questions) {
        System.out.println(q.getQuestionText());
        String response = sc.nextLine(); // safe reading
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 77,
      title: "Project 1 - Calculate Score",
      intro: "Tallying answers and outputting performance results.",
      explanation: "Compare the user answers array against the `answer` field of each question in the questions array. For every match, increment a `score` counter. Print final result.",
      gotchas: [
        "Use `.equalsIgnoreCase()` when comparing text inputs to ignore cases (like 'A' and 'a')."
      ],
      interviewQuestions: [
        {
          question: "What is the time complexity of scoring the quiz?",
          answer: "O(N) linear time, where N is the number of questions, as we iterate once through the questions array."
        }
      ],
      code: `int score = 0;
for(int i=0; i<questions.length; i++) {
    if(userAnswers[i].equalsIgnoreCase(questions[i].getAnswer())) {
        score++;
    }
}
System.out.println("Final Score: " + score);`,
      visualizerType: "jvm"
    }
  ]
};
