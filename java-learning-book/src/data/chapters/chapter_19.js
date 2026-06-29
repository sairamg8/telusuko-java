export default {
  id: 19,
  title: "JDBC - Java Database Connectivity",
  range: "221-240",
  concepts: [
    {
      id: 221,
      title: "Introduction",
      intro: "Standardizing Java database access.",
      explanation: "JDBC (Java Database Connectivity) is a core Java standard API (contained within the java.sql and javax.sql packages) that defines how a Java application connects to, queries, and updates a database. It serves as an abstraction layer between Java applications and specific database implementations.",
      gotchas: [
        "JDBC is just a collection of interfaces. By itself, it cannot talk to a database without a vendor-provided driver jar implementing these interfaces."
      ],
      interviewQuestions: [
        {
          question: "What is JDBC?",
          answer: "JDBC is a Java API that provides standard interfaces for connecting a Java application to various relational databases, allowing database-independent development."
        }
      ],
      code: `import java.sql.Connection;
import java.sql.DriverManager;
// Foundation of all Java database communication`,
      visualizerType: "jvm"
    },
    {
      id: 222,
      title: "Need for JDBC",
      intro: "Avoiding database vendor lock-in.",
      explanation: "Before JDBC, developers had to write database-specific native code (such as C/C++ libraries). If the database changed from Oracle to MySQL, the entire application codebase had to be rewritten. JDBC provides a unified interface, allowing code to remain database-independent while only changing the driver class and connection URL.",
      gotchas: [
        "Although the JDBC interfaces are identical, SQL dialects still vary across databases (e.g., MySQL's LIMIT vs Oracle's ROWNUM), which can prevent complete schema and code portability."
      ],
      interviewQuestions: [
        {
          question: "Why do we need JDBC?",
          answer: "To provide a database-agnostic interface so Java developers write database-independent code, programming to interfaces rather than proprietary vendor APIs."
        }
      ],
      code: `// JDBC allows switching databases with minimal config changes:
String mysqlUrl = "jdbc:mysql://localhost:3306/db";
String postgresUrl = "jdbc:postgresql://localhost:5432/db";`,
      visualizerType: "jvm"
    },
    {
      id: 223,
      title: "Need for a Database-Specific JAR in a JDBC App",
      intro: "Bridging interfaces and concrete implementations.",
      explanation: "JDBC contains interfaces (like Connection, Statement, ResultSet). The actual implementation classes (e.g., JDBC4Connection, MySQLStatement) are provided by database vendors inside a driver JAR (like mysql-connector-j). Without this JAR, the DriverManager won't know how to translate JDBC method calls into database network packets.",
      gotchas: [
        "Forgetting to add the driver JAR to the project's classpath is the main cause of ClassNotFoundException or SQLException: 'No suitable driver found'."
      ],
      interviewQuestions: [
        {
          question: "What is a JDBC Driver?",
          answer: "A software component that implements the JDBC API interfaces for a specific database engine, converting Java calls into the database's native protocol."
        }
      ],
      code: `<!-- Maven Dependency for MySQL Connector -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.3.0</version>
</dependency>`,
      visualizerType: "jvm"
    },
    {
      id: 224,
      title: "Steps Involved in Developing a JDBC App (Theory)",
      intro: "The 7-step blueprint for JDBC connectivity.",
      explanation: "Developing a JDBC application involves seven core phases: 1. Import SQL packages. 2. Load and Register the database driver. 3. Establish the connection via DriverManager. 4. Create a Statement object. 5. Execute SQL queries. 6. Process the query results from ResultSet. 7. Close connections and statements to release database resources.",
      gotchas: [
        "Skipping step 7 (closing resources) will exhaust database connection pools, leading to application hangs or database crashes under high traffic."
      ],
      interviewQuestions: [
        {
          question: "List the 7 steps to connect a Java application to a database via JDBC.",
          answer: "Import packages, Load/Register driver, Establish Connection, Create Statement, Execute Query, Process Results, and Close Resources."
        }
      ],
      code: `// Conceptual flow:
// Import -> Register -> Connect -> Create Statement -> Execute -> Process -> Close`,
      visualizerType: "jvm"
    },
    {
      id: 225,
      title: "Setting Up JDBC Development Environment",
      intro: "Preparing your tools for database integration.",
      explanation: "To build database-driven Java apps, install the database server (e.g., MySQL), set up an IDE, and include the vendor-specific database driver jar in the project libraries (either manually or via build tool dependency declarations).",
      gotchas: [
        "Ensure the driver major version matches the database server version (e.g., driver version 8.x for MySQL server 8.x) to prevent protocol errors."
      ],
      interviewQuestions: [
        {
          question: "How do you add the MySQL JDBC Driver to a non-Maven Java project?",
          answer: "By downloading the mysql-connector-j JAR file and adding it to the project's Build Path libraries under the Classpath category."
        }
      ],
      code: `// Verification check:
try {
    Class.forName("com.mysql.cj.jdbc.Driver");
    System.out.println("Driver loaded successfully!");
} catch (ClassNotFoundException e) {
    System.out.println("Driver JAR missing in classpath!");
}`,
      visualizerType: "jvm"
    },
    {
      id: 226,
      title: "Setting Up the Database",
      intro: "Initializing database structures for connection testing.",
      explanation: "Before executing database code in Java, establish a database schema and verify that the target tables are created, and user privileges are correctly configured.",
      gotchas: [
        "Ensure the database server is running as an active background service on port 3306 before running your Java test program."
      ],
      interviewQuestions: [
        {
          question: "Why does JDBC throw 'Access denied for user'?",
          answer: "Due to incorrect credentials, invalid database host permissions, or lack of permissions granted to the database user."
        }
      ],
      code: `CREATE DATABASE IF NOT EXISTS demo;
USE demo;
CREATE TABLE IF NOT EXISTS student (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    marks INT
);`,
      visualizerType: "jvm"
    },
    {
      id: 227,
      title: "Steps Involved in a JDBC App (Practical)",
      intro: "Implementing a complete, functional JDBC connection.",
      explanation: "Complete JDBC connection steps in practice:\n1. `DriverManager.getConnection(url, user, pass)` → establishes the socket connection to the database.\n2. URL format: `jdbc:mysql://host:port/databaseName` — varies per database vendor.\n3. Create a `Statement` with `con.createStatement()`.\n4. Run queries: `executeQuery()` for SELECT → returns ResultSet; `executeUpdate()` for INSERT/UPDATE/DELETE → returns row count.\n5. Iterate ResultSet: cursor starts BEFORE row 1 — call `rs.next()` to advance.\n6. ALWAYS close resources in reverse order: ResultSet → Statement → Connection (or use try-with-resources).",
      gotchas: [
        "The connection URL format is highly specific and changes per database driver (e.g., jdbc:mysql://localhost:3306/db_name)."
      ],
      interviewQuestions: [
        {
          question: "What parameters are required to establish a Connection?",
          answer: "The connection URL (specifying host, port, and schema name), the username, and the password."
        }
      ],
      code: `import java.sql.*;

public class JdbcDemo {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/demo";
        String user = "root";
        String pass = "password";
        
        Connection con = DriverManager.getConnection(url, user, pass);
        System.out.println("Connection established: " + con);
        con.close();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 228,
      title: "Usage of Class.forName() in JDBC",
      intro: "Dynamically loading database driver classes.",
      explanation: "Class.forName(\"className\") loads the class into memory, executing its static block. In older JDBC versions, this static block registered the driver with the DriverManager. Since JDBC 4.0, drivers are auto-registered, making Class.forName optional but still popular for code backwards compatibility.",
      gotchas: [
        "In some web application servers, auto-registration might fail due to classloader hierarchies. Using Class.forName() provides a safe explicit registration fallback."
      ],
      interviewQuestions: [
        {
          question: "Is Class.forName() required in modern JDBC?",
          answer: "No. Since JDBC 4.0, drivers are auto-discovered from the META-INF/services/java.sql.Driver file in the JAR."
        }
      ],
      code: `// Legacy registration (pre-JDBC 4.0):
Class.forName("com.mysql.cj.jdbc.Driver");`,
      visualizerType: "jvm"
    },
    {
      id: 229,
      title: "Inserting Data into the Database",
      intro: "Executing DML commands from Java.",
      explanation: "To write data, create a Statement object using Connection.createStatement() and execute the statement using executeUpdate(sql). This method returns the number of rows inserted or updated.",
      gotchas: [
        "If your SQL string includes unescaped single quotes (e.g., O'Brian), the database parser will crash, throwing a SQL syntax error."
      ],
      interviewQuestions: [
        {
          question: "What does executeUpdate() return for insert statements?",
          answer: "It returns an integer representing the count of rows successfully inserted."
        }
      ],
      code: `Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "password");
Statement st = con.createStatement();
String sql = "INSERT INTO student VALUES (5, 'Navin', 90)";
int rowsAffected = st.executeUpdate(sql);
System.out.println(rowsAffected + " row(s) inserted.");
st.close();
con.close();`,
      visualizerType: "jvm"
    },
    {
      id: 230,
      title: "Updating Records in the Database",
      intro: "Modifying database rows dynamically from Java.",
      explanation: "1. Use `Statement.executeUpdate(sql)` with an UPDATE SQL string.\n2. Method returns int = number of rows affected (0 = nothing matched WHERE clause).\n3. Missing WHERE clause → updates EVERY row in the table — silent disaster.\n4. Plain Statement concatenates values as strings: `\"UPDATE student SET marks=\" + marks` — vulnerable to SQL injection.\n5. Best practice: always use PreparedStatement with `?` placeholders for dynamic values (covered next).\n6. Resources: close Statement and Connection in finally or use try-with-resources.",
      gotchas: [
        "If you do not specify a WHERE clause in your SQL statement, all records in the database table will be overwritten."
      ],
      interviewQuestions: [
        {
          question: "Which method is used to run an UPDATE query in JDBC?",
          answer: "The executeUpdate() method of Statement or PreparedStatement."
        }
      ],
      code: `Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "password");
Statement st = con.createStatement();
String sql = "UPDATE student SET marks = 95 WHERE id = 5";
int rows = st.executeUpdate(sql);
System.out.println(rows + " record updated.");
st.close();
con.close();`,
      visualizerType: "jvm"
    },
    {
      id: 231,
      title: "Retrieving Records from the Database",
      intro: "Querying and iterating over query results using ResultSet.",
      explanation: "To read data, execute a query using executeQuery(sql). This returns a ResultSet. Iterate through the ResultSet using a while loop with rs.next() and fetch values via getters like rs.getInt() or rs.getString().",
      gotchas: [
        "The ResultSet cursor starts BEFORE the first row. Calling rs.next() is required to advance to the first record before reading values."
      ],
      interviewQuestions: [
        {
          question: "Explain the purpose of ResultSet.next().",
          answer: "It advances the cursor to the next row and returns true if there is a record, or false when the end of the query results is reached."
        }
      ],
      code: `Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "password");
Statement st = con.createStatement();
ResultSet rs = st.executeQuery("SELECT * FROM student");
while(rs.next()) {
    System.out.println(rs.getInt("id") + " : " + rs.getString("name") + " : " + rs.getInt("marks"));
}
rs.close();
st.close();
con.close();`,
      visualizerType: "jvm"
    },
    {
      id: 232,
      title: "Deleting Records from the Database",
      intro: "Purging database records programmatically.",
      explanation: "1. Use `Statement.executeUpdate(sql)` with a DELETE FROM SQL string.\n2. Returns int = number of rows deleted (0 = row not found — no exception thrown).\n3. Missing WHERE clause = deletes ALL rows — table becomes empty but structure remains.\n4. Difference: DELETE (row-by-row, transactional, can ROLLBACK) vs TRUNCATE (bulk, faster, cannot ROLLBACK).\n5. Foreign key check: if the row is a parent referenced by another table, delete throws a FK constraint violation.\n6. Use PreparedStatement with `?` for the WHERE value to prevent SQL injection.",
      gotchas: [
        "If the targeted ID is not found, executeUpdate() returns 0; it does not throw an exception."
      ],
      interviewQuestions: [
        {
          question: "What is the return value of executeUpdate() when deleting non-existent rows?",
          answer: "It returns 0, indicating zero records were affected by the operation."
        }
      ],
      code: `Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "password");
Statement st = con.createStatement();
int rows = st.executeUpdate("DELETE FROM student WHERE id = 5");
System.out.println(rows + " record deleted.");
st.close();
con.close();`,
      visualizerType: "jvm"
    },
    {
      id: 233,
      title: "CRUD Operations with a Single execute() Method",
      intro: "A multi-purpose method for executing arbitrary SQL statements.",
      explanation: "The execute(sql) method returns a boolean indicating output types. It returns true if the statement returns a ResultSet (SELECT queries). It returns false if the statement performs updates or returns no result (INSERT, UPDATE, DELETE).",
      gotchas: [
        "A return value of false does not mean the query failed; it simply implies no ResultSet was generated by the operation."
      ],
      interviewQuestions: [
        {
          question: "When does Statement.execute() return true?",
          answer: "It returns true if the query execution produces a ResultSet (like SELECT queries)."
        }
      ],
      code: `Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "password");
Statement st = con.createStatement();
boolean isSelect = st.execute("SELECT * FROM student");
if(isSelect) {
    ResultSet rs = st.getResultSet();
    // read result set
} else {
    int updateCount = st.getUpdateCount();
    // process update count
}`,
      visualizerType: "jvm"
    },
    {
      id: 234,
      title: "Handling Exceptions and Writing Better Code",
      intro: "Ensuring database resources are always cleaned up safely.",
      explanation: "Database connections are heavy socket connections that must be closed. Use Java 7's try-with-resources statement to auto-close Connection, Statement, and ResultSet objects to prevent connection leaks.",
      gotchas: [
        "Manually closing resources in a finally block is error-prone. If closing one resource throws an exception, subsequent closes will be skipped."
      ],
      interviewQuestions: [
        {
          question: "Why is try-with-resources preferred over standard try-catch-finally in JDBC?",
          answer: "It eliminates boilerplate code and guarantees that all AutoCloseable database resources are closed in reverse order of creation, even if exceptions are thrown."
        }
      ],
      code: `String url = "jdbc:mysql://localhost:3306/demo";
try (Connection con = DriverManager.getConnection(url, "root", "password");
     Statement st = con.createStatement();
     ResultSet rs = st.executeQuery("SELECT * FROM student")) {
     
    while(rs.next()) {
        System.out.println(rs.getString("name"));
    }
} catch (SQLException e) {
    e.printStackTrace();
}`,
      visualizerType: "exception"
    },
    {
      id: 235,
      title: "Inserting Data with PreparedStatement",
      intro: "Writing parameterizable insert statements.",
      explanation: "PreparedStatement extends Statement to accept dynamic placeholder parameters (?). Set parameters using index-based setter methods (e.g., setInt(), setString()). Indexing starts at 1.",
      gotchas: [
        "Binding a value to index 0 results in a ParameterIndexOutOfBounds exception. In JDBC, indices are 1-based."
      ],
      interviewQuestions: [
        {
          question: "What index does the first parameter placeholder start with in a PreparedStatement?",
          answer: "The index is 1."
        }
      ],
      code: `String sql = "INSERT INTO student (id, name, marks) VALUES (?, ?, ?)";
try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "password");
     PreparedStatement pst = con.prepareStatement(sql)) {
     
    pst.setInt(1, 6);
    pst.setString(2, "Harsh");
    pst.setInt(3, 82);
    pst.executeUpdate();
}`,
      visualizerType: "jvm"
    },
    {
      id: 236,
      title: "Statement vs PreparedStatement",
      intro: "Comparing static SQL execution with pre-compiled execution.",
      explanation: "Statement compile and parse the query upon each execution. PreparedStatement pre-compiles the query template, caching it. This makes PreparedStatement much faster for multiple executions and inherently safe from SQL Injection attacks.",
      gotchas: [
        "Using string concatenation inside a PreparedStatement defeats its purpose and exposes the query to SQL injection."
      ],
      interviewQuestions: [
        {
          question: "Why does PreparedStatement protect against SQL Injection?",
          answer: "Because it separates query structure from the data. Input parameters are treated strictly as literals rather than executable SQL code, regardless of their content."
        }
      ],
      code: `// Safe dynamic query representation:
String query = "SELECT * FROM student WHERE name = ? AND marks > ?";
PreparedStatement pst = con.prepareStatement(query);
pst.setString(1, "Navin");
pst.setInt(2, 75);`,
      visualizerType: "jvm"
    },
    {
      id: 237,
      title: "Updating Data with PreparedStatement",
      intro: "Dynamic records modification with parameterized inputs.",
      explanation: "PreparedStatement UPDATE flow:\n1. Write SQL with `?` for each dynamic value: `\"UPDATE student SET marks=? WHERE id=?\"`\n2. Set values by index (1-based): `pst.setInt(1, 95)` → marks, `pst.setInt(2, 3)` → id\n3. Call `pst.executeUpdate()` → returns rows affected\n4. Advantage over Statement: DB pre-compiles query once → re-executes with different values efficiently\n5. Column type in DB must match setter: int column → setInt(), varchar → setString()\n6. Can reuse the PreparedStatement in a loop — change parameters, call executeUpdate() each iteration",
      gotchas: [
        "Ensure the column types in your database match the types defined in the PreparedStatement setter methods (e.g. setInt vs setString)."
      ],
      interviewQuestions: [
        {
          question: "What happens if you fail to set a placeholder parameter before calling executeUpdate()?",
          answer: "It throws an SQLException stating that not all parameters were set."
        }
      ],
      code: `String sql = "UPDATE student SET name = ?, marks = ? WHERE id = ?";
try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "password");
     PreparedStatement pst = con.prepareStatement(sql)) {
     
    pst.setString(1, "Kiran Updated");
    pst.setInt(2, 92);
    pst.setInt(3, 6);
    pst.executeUpdate();
}`,
      visualizerType: "jvm"
    },
    {
      id: 238,
      title: "Deleting Data with PreparedStatement",
      intro: "Safe parameterized row deletion.",
      explanation: "PreparedStatement DELETE flow:\n1. SQL: `\"DELETE FROM student WHERE id=?\"`\n2. Bind the ID: `pst.setInt(1, targetId)`\n3. `pst.executeUpdate()` → returns number of deleted rows (0 = not found)\n4. No exception is thrown for 0 rows — always check the return value to confirm deletion.\n5. WHERE clause binding via `?` prevents SQL injection — never concatenate user input directly.\n6. For bulk deletes in a loop, use `addBatch()` + `executeBatch()` instead of individual executeUpdate() calls.",
      gotchas: [
        "Make sure your WHERE clause is fully satisfied before executing to prevent deleting accidental rows."
      ],
      interviewQuestions: [
        {
          question: "Write code to delete a student by ID using PreparedStatement.",
          answer: "pst = con.prepareStatement('DELETE FROM student WHERE id = ?'); pst.setInt(1, id); pst.executeUpdate();"
        }
      ],
      code: `String sql = "DELETE FROM student WHERE id = ?";
try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "password");
     PreparedStatement pst = con.prepareStatement(sql)) {
     
    pst.setInt(1, 6);
    int affected = pst.executeUpdate();
    System.out.println(affected + " row(s) deleted.");
}`,
      visualizerType: "jvm"
    },
    {
      id: 239,
      title: "Retrieving Data with PreparedStatement",
      intro: "Parameterized query retrieval.",
      explanation: "PreparedStatement SELECT flow:\n1. SQL: `\"SELECT * FROM student WHERE marks > ?\"`\n2. Bind the value: `pst.setInt(1, 80)`\n3. `pst.executeQuery()` → returns a ResultSet\n4. Iterate ResultSet: `while(rs.next())` → `rs.getString(\"name\")`, `rs.getInt(\"marks\")`\n5. Cannot change the query structure after preparation — only `?` placeholder values can change.\n6. For repeated searches with different values, reuse the PreparedStatement (change params, call executeQuery again).",
      gotchas: [
        "You cannot change the query layout after preparing the statement. You can only assign values to placeholders."
      ],
      interviewQuestions: [
        {
          question: "How do you fetch a result set using PreparedStatement?",
          answer: "By setting the required parameter placeholders and then calling the executeQuery() method (which takes no arguments)."
        }
      ],
      code: `String sql = "SELECT * FROM student WHERE marks > ?";
try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "password");
     PreparedStatement pst = con.prepareStatement(sql)) {
     
    pst.setInt(1, 80);
    try (ResultSet rs = pst.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getString("name"));
        }
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 240,
      title: "Batch Update",
      intro: "Executing multiple SQL updates in a single roundtrip batch.",
      explanation: "Group multiple database update operations into a single batch execution to avoid multiple network roundtrips. Queue operations with addBatch() and run them together with executeBatch().",
      gotchas: [
        "Disable auto-commit (setAutoCommit(false)) before running batch updates to ensure the entire batch runs under a single transaction block."
      ],
      interviewQuestions: [
        {
          question: "What does executeBatch() return?",
          answer: "An array of integers where each element represents the update count for the corresponding command in the batch."
        }
      ],
      code: `String sql = "INSERT INTO student (id, name, marks) VALUES (?, ?, ?)";
try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "password");
     PreparedStatement pst = con.prepareStatement(sql)) {
     
    con.setAutoCommit(false); // Optimize transaction boundary
    
    pst.setInt(1, 10); pst.setString(2, "User A"); pst.setInt(3, 70); pst.addBatch();
    pst.setInt(1, 11); pst.setString(2, "User B"); pst.setInt(3, 85); pst.addBatch();
    
    int[] results = pst.executeBatch();
    con.commit();
    System.out.println("Batch executed. Elements modified: " + results.length);
}`,
      visualizerType: "jvm"
    }
  ]
};
