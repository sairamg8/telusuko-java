export default {
  id: 24,
  title: "Spring Data & JDBC",
  range: "348-354",
  concepts: [
    {
      id: 348,
      title: "Spring JDBC Introduction",
      intro: "Bid farewell to database boilerplate. Spring JDBC abstracts away the pain of manual connections, statement preparation, and resource cleanup.",
      explanation: "In traditional Java Database Connectivity (JDBC), developers write repetitive code to open connections, handle exceptions, manage transactions, and close resources (Connection, Statement, ResultSet). Spring JDBC solves this by handling the resource lifecycle and exception translation. You only focus on defining SQL queries and mapping results.",
      gotchas: [
        "Spring JDBC translates vendor-specific SQL exceptions into Spring's database-agnostic DataAccessException hierarchy, meaning you no longer catch SQLException."
      ],
      interviewQuestions: [
        {
          question: "How does Spring JDBC improve upon traditional JDBC?",
          answer: "It eliminates boilerplate code (opening/closing connections, handling statements), automatically manages transactions, and translates low-level SQLExceptions into a cleaner, runtime DataAccessException hierarchy."
        }
      ],
      code: `// Traditional JDBC Boilerplate:
// Connection conn = null;
// try { conn = dataSource.getConnection(); ... } finally { if (conn != null) conn.close(); }

// Spring JDBC approach:
// Just inject JdbcTemplate and call methods!`,
      visualizerType: "jvm"
    },
    {
      id: 349,
      title: "Creating a Spring JDBC Project",
      intro: "Bootstrap your database-enabled Spring Boot application in seconds using Spring Initializr.",
      explanation: "To create a Spring JDBC project, add the 'Spring JDBC' (spring-boot-starter-jdbc) dependency and a database driver (like H2 for in-memory or PostgreSQL/MySQL). Spring Boot auto-configures a DataSource and a JdbcTemplate bean based on the properties defined in application.properties.",
      gotchas: [
        "If you include the JDBC starter without configuring database credentials or using an in-memory database like H2, Spring Boot will throw an ApplicationFailedException at startup."
      ],
      interviewQuestions: [
        {
          question: "Which starter dependency is required for Spring JDBC in Spring Boot?",
          answer: "The 'spring-boot-starter-jdbc' dependency, which transitively includes HikariCP (the default connection pool) and the core Spring JDBC libraries."
        }
      ],
      code: `<!-- Maven Dependency in pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>`,
      visualizerType: "jvm"
    },
    {
      id: 350,
      title: "Student Service and Repository",
      intro: "Separate business logic from database access using the Service-Repository pattern.",
      explanation: "In layered architectures, business operations go into the Service layer (marked with @Service), and data access operations go into the Repository layer (marked with @Repository). The Service interacts with the Repository, keeping the database operations clean and decoupled from business logic.",
      gotchas: [
        "Do not write business calculations or validation logic in Repository classes. Repositories should strictly read and write data."
      ],
      interviewQuestions: [
        {
          question: "Why do we separate our application into Service and Repository layers?",
          answer: "Separation of concerns. The Service layer contains business rules and transactions, whereas the Repository layer abstracts physical data access details, making the code testable and maintainable."
        }
      ],
      code: `@Repository
public class StudentRepository {
    // DB interactions here
}

@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;
    
    public void addStudent(Student s) {
        repo.save(s);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 351,
      title: "JdbcTemplate",
      intro: "The Swiss Army knife of database querying in Spring.",
      explanation: "JdbcTemplate is the central class in Spring JDBC. It simplifies execution of SQL queries, updates, and stored procedure calls. It uses methods like update() for INSERT, UPDATE, and DELETE operations, and query() or queryForObject() for SELECT statements.",
      gotchas: [
        "Make sure to use placeholders (?) in your SQL statements to prevent SQL Injection vulnerability instead of concatenating strings directly."
      ],
      interviewQuestions: [
        {
          question: "What is JdbcTemplate and how do you execute an insert statement with it?",
          answer: "JdbcTemplate is a template class that simplifies SQL operations. An insert is executed using the template.update(String sql, Object... args) method."
        }
      ],
      code: `@Repository
public class StudentRepository {
    @Autowired
    private JdbcTemplate template;

    public void save(Student s) {
        String sql = "INSERT INTO student (id, name, marks) VALUES (?, ?, ?)";
        template.update(sql, s.getId(), s.getName(), s.getMarks());
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 352,
      title: "Schema and Data Files",
      intro: "Automatically initialize your database structure and initial records on startup.",
      explanation: "Spring Boot can automatically run SQL scripts found in the classpath. A file named schema.sql is executed to create/modify tables, and data.sql is executed to populate tables. This is highly useful for local development and in-memory testing.",
      gotchas: [
        "By default, schema.sql and data.sql run only for embedded databases. To enable them for external databases, you must set spring.sql.init.mode=always."
      ],
      interviewQuestions: [
        {
          question: "How do you automatically populate initial database records on application startup in Spring Boot?",
          answer: "By creating a data.sql file inside the src/main/resources folder. Spring Boot will execute it automatically on startup."
        }
      ],
      code: `-- src/main/resources/schema.sql
CREATE TABLE student (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    marks INT
);

-- src/main/resources/data.sql
INSERT INTO student (id, name, marks) VALUES (101, 'Kiran', 85);`,
      visualizerType: "jvm"
    },
    {
      id: 353,
      title: "RowMapper",
      intro: "Bridge the gap between relational database rows and Java objects.",
      explanation: "When fetching data using SELECT queries, database rows are returned as a ResultSet. A RowMapper is an interface used by JdbcTemplate to map each row of the ResultSet into a Java Object on a 1-to-1 basis.",
      gotchas: [
        "If you map a column name that does not exist in the SQL result set, RowMapper will throw a SQLException wrapped inside BadSqlGrammarException."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of RowMapper in Spring JDBC?",
          answer: "It maps database result set rows to custom Java domain objects. The mapRow(ResultSet rs, int rowNum) method is called for each row returned."
        }
      ],
      code: `// Custom RowMapper implementation
RowMapper<Student> mapper = new RowMapper<Student>() {
    @Override
    public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
        Student s = new Student();
        s.setId(rs.getInt("id"));
        s.setName(rs.getString("name"));
        s.setMarks(rs.getInt("marks"));
        return s;
    }
};

List<Student> students = template.query("SELECT * FROM student", mapper);`,
      visualizerType: "jvm"
    },
    {
      id: 354,
      title: "Spring JDBC with PostgreSQL",
      intro: "Migrate from in-memory prototyping to a robust, production-grade PostgreSQL database.",
      explanation: "To switch to PostgreSQL, add the postgresql driver dependency. In application.properties, define the spring.datasource.url, spring.datasource.username, and spring.datasource.password. Spring Boot will automatically swap H2 with the PostgreSQL connection.",
      gotchas: [
        "Ensure the PostgreSQL database exists on your server before starting the Spring Boot application, as Spring JDBC will not automatically create the database itself."
      ],
      interviewQuestions: [
        {
          question: "What properties do you need to configure in application.properties to connect Spring Boot to PostgreSQL?",
          answer: "spring.datasource.url, spring.datasource.username, spring.datasource.password, and optionally spring.datasource.driver-class-name."
        }
      ],
      code: `# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/students_db
spring.datasource.username=postgres
spring.datasource.password=admin123
spring.datasource.driver-class-name=org.postgresql.Driver`,
      visualizerType: "jvm"
    }
  ]
};
