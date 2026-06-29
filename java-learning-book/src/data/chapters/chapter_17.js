export default {
  id: 17,
  title: "Database Basics & MySQL",
  range: "190-200",
  concepts: [
    {
      id: 190,
      title: "Introduction to Databases",
      intro: "Why files and memory fail for persistent business data.",
      explanation: "While variables hold data in RAM (volatile) and file systems can write to disk, files lack concurrent write support, transactional integrity (ACID properties), efficient indexing, and security controls. Databases solve these challenges.",
      gotchas: [
        "A database is not just a storage file; it runs as an active server process managing file locking, caching, and concurrent query processing."
      ],
      interviewQuestions: [
        {
          question: "Why do we use databases instead of storing data in raw text files?",
          answer: "Databases provide structured query support (SQL), concurrent access protection, data safety guarantees (ACID), indexes for quick search, and robust security permissions."
        }
      ],
      code: `-- Databases run as background service processes (e.g., mysqld)`,
      visualizerType: "jvm"
    },
    {
      id: 191,
      title: "Data vs Database vs DBMS",
      intro: "Defining the terms: Information, Container, and Manager.",
      explanation: "1. Data: raw facts (numbers, text). 2. Database: organized collection of related data. 3. DBMS (Database Management System): the software engine (like MySQL, PostgreSQL) used to create, manage, and query databases.",
      gotchas: [
        "A DBMS is the software itself. A database is the actual data files managed by that DBMS software."
      ],
      interviewQuestions: [
        {
          question: "What is a DBMS?",
          answer: "Database Management System (DBMS) is a software package designed to define, manipulate, retrieve, and manage data within a database."
        }
      ],
      code: `-- DBMS examples: Oracle, MySQL, SQL Server, PostgreSQL`,
      visualizerType: "jvm"
    },
    {
      id: 192,
      title: "RDBMS vs DBMS",
      intro: "The power of tabular relationships.",
      explanation: "A Relational Database Management System (RDBMS) is a subset of DBMS that structures data in tables (relations) containing rows and columns. It enforces mathematical integrity constraints (keys) and links tables using relationships.",
      gotchas: [
        "All RDBMS are DBMS, but not all DBMS are RDBMS (e.g., file-based databases or NoSQL document databases are DBMS but not relational)."
      ],
      interviewQuestions: [
        {
          question: "What makes an RDBMS different from a standard DBMS?",
          answer: "RDBMS stores data in tables linked by relationships (primary/foreign keys) and enforces relational algebra rules and normalization guidelines."
        }
      ],
      code: `-- RDBMS model: Customer Table linked to Orders Table via Customer_ID.`,
      visualizerType: "jvm"
    },
    {
      id: 193,
      title: "Introduction to SQL and MySQL",
      intro: "The standard query language and the most popular open-source RDBMS.",
      explanation: "SQL (Structured Query Language) is the universal language used to communicate with relational databases. MySQL is a highly popular, open-source RDBMS developed by Oracle, powering massive web platforms (like WordPress, Facebook).",
      gotchas: [
        "SQL is the query language standard. MySQL is the software database product implementing that language (with some product-specific extensions)."
      ],
      interviewQuestions: [
        {
          question: "Is SQL case sensitive?",
          answer: "SQL keywords (like SELECT, INSERT) are case-insensitive. However, database/table names can be case-sensitive depending on the hosting operating system configuration (e.g., Linux vs Windows)."
        }
      ],
      code: `-- Standard SQL Query:
SELECT name, price FROM products WHERE price > 100;`,
      visualizerType: "jvm"
    },
    {
      id: 194,
      title: "Database Components",
      intro: "Tables, Fields, Records, and Schemas.",
      explanation: "1. Table (Relation): grid storing entity data. 2. Columns (Fields/Attributes): define data properties and types. 3. Rows (Records/Tuples): individual data entries. 4. Schema: logical mapping and grouping of tables.",
      gotchas: [
        "Every row in a table must conform to the defined columns and data types. You cannot dynamically add columns to a single row without altering the whole table structure."
      ],
      interviewQuestions: [
        {
          question: "What is a database schema?",
          answer: "A schema is the logical configuration defining the database structure, including tables, columns, data types, constraints, and relationships."
        }
      ],
      code: `-- Schema representation:
-- PRODUCTS (id: INT, name: VARCHAR, price: DECIMAL)`,
      visualizerType: "jvm"
    },
    {
      id: 195,
      title: "MySQL Installation",
      intro: "Setting up MySQL server on Windows/Mac/Linux.",
      explanation: "To develop database apps, install the MySQL Community Server. On Windows, use the MySQL Installer to set up both the Server and MySQL Workbench (the official graphical client interface). Configure the default port (3306) and set a strong root password.",
      gotchas: [
        "If port 3306 is already in use by another software or old installation, the MySQL service will fail to start. Resolve conflicts or change ports."
      ],
      interviewQuestions: [
        {
          question: "What is the default port number for MySQL database server?",
          answer: "Port 3306."
        }
      ],
      code: `# Command to start MySQL service on Linux:
# sudo systemctl start mysql`,
      visualizerType: "jvm"
    },
    {
      id: 196,
      title: "MySQL Workbench and CLI Client",
      intro: "Interfacing with the database: graphical UI vs terminal CLI.",
      explanation: "1. MySQL Workbench: graphical IDE to run SQL queries, design database models, and manage server states. 2. CLI Client: lightweight command-line tool. You login using: `mysql -u root -p` and run raw queries directly.",
      gotchas: [
        "Workbench query tabs require you to choose a default database first (by double-clicking it or using the `USE` statement), otherwise queries throw 'no database selected' errors."
      ],
      interviewQuestions: [
        {
          question: "How do you log into the MySQL command line client?",
          answer: "By typing: mysql -u <username> -p and entering the password when prompted."
        }
      ],
      code: `# Terminal login:
# mysql -u root -p`,
      visualizerType: "jvm"
    },
    {
      id: 197,
      title: "Creating and Deleting Databases",
      intro: "Creating and destroying schema containers.",
      explanation: "In MySQL, you initialize database containers using `CREATE DATABASE database_name;`. To remove a database and delete all its tables and data files forever, execute `DROP DATABASE database_name;`.",
      gotchas: [
        "DROP DATABASE is destructive and immediate! It does not prompt a confirmation check and deletes all data irreversibly."
      ],
      interviewQuestions: [
        {
          question: "What is the SQL query to create a database only if it doesn't already exist?",
          answer: "CREATE DATABASE IF NOT EXISTS db_name;"
        }
      ],
      code: `CREATE DATABASE telusuko_db;
USE telusuko_db;
-- To delete:
-- DROP DATABASE telusuko_db;`,
      visualizerType: "jvm"
    },
    {
      id: 198,
      title: "MySQL Data Types",
      intro: "Numbers, Strings, and Dates in MySQL.",
      explanation: "MySQL defines precise datatypes: 1. Numeric: INT, BIGINT, FLOAT, DECIMAL(p,s) (precise decimals). 2. String: CHAR(n) (fixed size), VARCHAR(n) (variable size up to n chars), TEXT. 3. Date/Time: DATE, TIME, DATETIME, TIMESTAMP.",
      gotchas: [
        "Use VARCHAR instead of CHAR for strings of variable lengths. CHAR pads values with spaces to match fixed size, consuming extra storage."
      ],
      interviewQuestions: [
        {
          question: "Differentiate between CHAR and VARCHAR data types.",
          answer: "CHAR(n) is fixed-length, padding values up to n characters. VARCHAR(n) is variable-length, consuming only the space of the actual string characters stored."
        }
      ],
      code: `-- Column definitions using matching datatypes:
-- age INT, name VARCHAR(50), price DECIMAL(10, 2)`,
      visualizerType: "jvm"
    },
    {
      id: 199,
      title: "Creating Tables",
      intro: "Defining structures for data records.",
      explanation: "1. `CREATE TABLE table_name (col_name DATA_TYPE CONSTRAINTS, ...)` defines the schema — column names, data types, and validation rules for a new database table.\n2. Core SQL data types: INT (integer), VARCHAR(n) (variable-length string up to n chars), DATE (calendar date), BOOLEAN (true/false), DECIMAL(p,s) (precise decimal with p total digits, s after the decimal point).\n3. Key constraints: PRIMARY KEY (uniquely identifies each row, auto-indexed), NOT NULL (value required), UNIQUE (no duplicate values), DEFAULT value (fallback if no value provided), FOREIGN KEY REFERENCES other_table(col) (enforces referential integrity).\n4. Use `CREATE TABLE IF NOT EXISTS` to prevent script failures when re-running setup SQL on a DB that already has the table.\n5. Gotcha: using INT when you need large IDs (over 2 billion) — use BIGINT. For auto-incrementing PKs: `id INT AUTO_INCREMENT PRIMARY KEY` in MySQL, or `id SERIAL PRIMARY KEY` in PostgreSQL.",
      gotchas: [
        "If you try to create a table that already exists in the selected database, the query fails. Use `CREATE TABLE IF NOT EXISTS` to avoid script breaks."
      ],
      interviewQuestions: [
        {
          question: "Write an SQL statement to create a simple 'student' table with fields id and name.",
          answer: "CREATE TABLE student (id INT PRIMARY KEY, name VARCHAR(100) NOT NULL);"
        }
      ],
      code: `CREATE TABLE student (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    marks INT
);`,
      visualizerType: "jvm"
    },
    {
      id: 200,
      title: "Inserting Data into Tables",
      intro: "Adding rows to your relational structures.",
      explanation: "`INSERT INTO table_name (col1, col2) VALUES (val1, val2);` adds a new row of data. String and Date values must be wrapped in single quotes in SQL commands.",
      gotchas: [
        "If you do not specify the columns list, your VALUES list must match every column in the table structure in their exact order. This is a fragile coding practice; always declare columns."
      ],
      interviewQuestions: [
        {
          question: "Write SQL query to insert a student with id 1, name 'Kiran', marks 85.",
          answer: "INSERT INTO student (id, name, marks) VALUES (1, 'Kiran', 85);"
        }
      ],
      code: `INSERT INTO student (id, name, marks) 
VALUES (1, 'Navin', 90);`,
      visualizerType: "jvm"
    }
  ]
};
