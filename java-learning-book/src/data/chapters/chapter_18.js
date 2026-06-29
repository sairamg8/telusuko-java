export default {
  id: 18,
  title: "SQL Constraints & Querying",
  range: "201-220",
  concepts: [
    {
      id: 201,
      title: "Inserting Multiple Rows",
      intro: "How to insert multiple records into a table using a single INSERT statement.",
      explanation: "Instead of executing multiple INSERT statements (which incurs network roundtrip overhead and multiple transactional boundary checkpoints), SQL allows comma-separated value lists in a single INSERT INTO command. This is highly optimized and standard across relational databases.",
      gotchas: [
        "If even one row in the batch violates a constraint (such as a duplicate primary key or null value in a non-nullable column), the entire multi-row insertion statement fails in a transactional context."
      ],
      interviewQuestions: [
        {
          question: "Why is inserting multiple rows in a single statement faster than separate inserts?",
          answer: "It reduces database server parsing overhead, network roundtrips, and transaction commit write operations."
        }
      ],
      code: `INSERT INTO student (id, name, marks) VALUES
(2, 'Rahul', 88),
(3, 'Priya', 95),
(4, 'Amit', 76);`,
      visualizerType: "jvm"
    },
    {
      id: 202,
      title: "Primary Key Constraint",
      intro: "Uniquely identifying every row in a table.",
      explanation: "A primary key consists of one or more columns that uniquely identify each row. It implicitly enforces two constraints: the column cannot contain NULL values, and all values must be unique. Only one primary key can exist per table.",
      gotchas: [
        "You cannot modify a primary key column's value if it is referenced as a foreign key in another table (violating referential integrity) unless the relationship is configured with ON UPDATE CASCADE."
      ],
      interviewQuestions: [
        {
          question: "Can a primary key contain null values? Can a table have multiple primary keys?",
          answer: "No, primary keys cannot contain NULL. No, a table can only have one primary key (though it can be a composite key consisting of multiple columns)."
        }
      ],
      code: `CREATE TABLE employee (
    emp_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL
);`,
      visualizerType: "jvm"
    },
    {
      id: 203,
      title: "SQL Constraints",
      intro: "Safeguarding data integrity at the database level.",
      explanation: "Constraints are rules applied to columns to restrict the data entering the database. Standard constraints include: NOT NULL (forces non-empty values), UNIQUE (ensures unique values but allows NULL), DEFAULT (provides a default value if omitted), and CHECK (ensures values meet a specific condition, e.g., age >= 18).",
      gotchas: [
        "In older MySQL versions (prior to 8.0.16), CHECK constraints were parsed but ignored. Ensure your database engine supports and actively enforces them."
      ],
      interviewQuestions: [
        {
          question: "Difference between UNIQUE and PRIMARY KEY constraints?",
          answer: "Both enforce uniqueness. However, a table can have only one Primary Key, which cannot accept NULLs. A table can have multiple UNIQUE constraints, which can accept NULL values."
        }
      ],
      code: `CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    age INT CHECK (age >= 18),
    status VARCHAR(20) DEFAULT 'ACTIVE'
);`,
      visualizerType: "jvm"
    },
    {
      id: 204,
      title: "Select Command",
      intro: "Querying and retrieving data from tables.",
      explanation: "The SELECT command is the foundational DQL (Data Query Language) statement used to retrieve records from one or more tables. You can select specific columns or use * to fetch all columns.",
      gotchas: [
        "Avoid using SELECT * in production applications. It retrieves unnecessary columns, increases network payload, and can break application bindings if columns are added or reordered."
      ],
      interviewQuestions: [
        {
          question: "Why is SELECT * discouraged in production code?",
          answer: "It leads to performance overhead due to transferring unused data and increases vulnerability to schema changes."
        }
      ],
      code: `SELECT name, marks FROM student;`,
      visualizerType: "jvm"
    },
    {
      id: 205,
      title: "SELECT with WHERE Clause",
      intro: "Filtering table rows based on specific conditions.",
      explanation: "1. WHERE filters rows BEFORE they are returned — only matching rows are processed.\n2. Works with SELECT, UPDATE, and DELETE statements.\n3. Supported operators: = (equal), <> or != (not equal), >, <, >=, <=.\n4. Can combine conditions: `WHERE marks > 80 AND city = 'Delhi'`.\n5. Without WHERE → SELECT returns ALL rows; UPDATE/DELETE affects ALL rows (dangerous!).\n6. Database executes WHERE against each row — if column is not indexed, it full-scans the entire table.",
      gotchas: [
        "If the filtered column is not indexed, the database will perform a full-table scan, which is very slow for large datasets."
      ],
      interviewQuestions: [
        {
          question: "What is the role of the WHERE clause?",
          answer: "It filters rows before they are selected or modified. It accepts comparison operators like =, <, >, <=, >=, and <> (not equal)."
        }
      ],
      code: `SELECT * FROM student WHERE marks > 80;`,
      visualizerType: "jvm"
    },
    {
      id: 206,
      title: "AND, OR, NOT Operators",
      intro: "Combining multiple search filters.",
      explanation: "These logical operators combine conditions in a WHERE clause. AND requires both conditions to be true; OR requires at least one; NOT negates a condition.",
      gotchas: [
        "Operator precedence matters: NOT is evaluated first, then AND, and finally OR. Use parentheses to group conditions explicitly to avoid logical bugs."
      ],
      interviewQuestions: [
        {
          question: "What is the order of precedence for logical operators in SQL?",
          answer: "NOT is evaluated first, then AND, and finally OR. Use parentheses to override or clarify precedence."
        }
      ],
      code: `SELECT * FROM student 
WHERE marks > 75 AND (name = 'Navin' OR NOT marks = 100);`,
      visualizerType: "jvm"
    },
    {
      id: 207,
      title: "IN Operator",
      intro: "Matching column values against a discrete list of possibilities.",
      explanation: "1. IN is shorthand for multiple OR conditions — cleaner and faster to read.\n2. Syntax: `WHERE column IN (val1, val2, val3)` — matches ANY value in the list.\n3. Works with subqueries: `WHERE id IN (SELECT student_id FROM enrolled)` — dynamic filter.\n4. NOT IN: returns rows where column matches NONE of the listed values.\n5. Empty IN list `IN ()` → syntax error.\n6. If the list contains NULL → NOT IN returns empty results (three-valued SQL logic).",
      gotchas: [
        "Passing an empty list to IN () results in a syntax error. Also, if the list contains NULL, NOT IN will return empty result sets due to three-valued logic."
      ],
      interviewQuestions: [
        {
          question: "How is the IN operator different from multiple OR operators?",
          answer: "The IN operator is cleaner, easier to write, and often optimized better by the database engine."
        }
      ],
      code: `SELECT * FROM student WHERE id IN (1, 3, 5);`,
      visualizerType: "jvm"
    },
    {
      id: 208,
      title: "BETWEEN and NOT BETWEEN Operators",
      intro: "Selecting values within a continuous range.",
      explanation: "The BETWEEN operator selects values within a range (inclusive of both boundaries). It works on numbers, text, and dates. NOT BETWEEN selects values outside that range.",
      gotchas: [
        "BETWEEN is always inclusive. If you do BETWEEN 10 AND 20, it matches both 10 and 20."
      ],
      interviewQuestions: [
        {
          question: "Is the BETWEEN operator inclusive or exclusive?",
          answer: "It is inclusive of both boundary values (start and end)."
        }
      ],
      code: `SELECT * FROM student WHERE marks BETWEEN 80 AND 95;`,
      visualizerType: "jvm"
    },
    {
      id: 209,
      title: "SELECT with ORDER BY",
      intro: "Sorting query result sets.",
      explanation: "1. ORDER BY sorts the final result set — always the LAST clause in a SELECT statement.\n2. `ASC` = ascending (A→Z, 0→9) — this is the DEFAULT if you omit it.\n3. `DESC` = descending (Z→A, 9→0).\n4. Multi-column sort: `ORDER BY marks DESC, name ASC` — sorts by marks first; ties broken alphabetically by name.\n5. Can sort by column position: `ORDER BY 2 DESC` means sort by the 2nd column in SELECT.\n6. Sorting large unindexed columns triggers a filesort operation — expensive on big tables.",
      gotchas: [
        "Sorting large result sets on non-indexed columns forces the database to perform a file sort ('filesort'), which degrades performance. Use indexes to optimize sorting."
      ],
      interviewQuestions: [
        {
          question: "How do you sort in descending order based on one column and ascending based on another?",
          answer: "By specifying both in ORDER BY: e.g., ORDER BY marks DESC, name ASC."
        }
      ],
      code: `SELECT * FROM student ORDER BY marks DESC, name ASC;`,
      visualizerType: "jvm"
    },
    {
      id: 210,
      title: "DISTINCT Keyword",
      intro: "Eliminating duplicate rows in search results.",
      explanation: "1. DISTINCT goes directly after SELECT: `SELECT DISTINCT column`.\n2. Removes DUPLICATE rows from the result — only unique combinations are returned.\n3. Applies to the COMBINATION of all selected columns — not just one.\n4. Example: `SELECT DISTINCT city, country` removes rows where BOTH city AND country are the same.\n5. DISTINCT has a performance cost — database must sort or hash all rows to find duplicates.\n6. Alternative: GROUP BY can also deduplicate while allowing aggregation (COUNT, SUM, etc.).",
      gotchas: [
        "DISTINCT applies to the combination of all selected columns, not just the first one listed."
      ],
      interviewQuestions: [
        {
          question: "Does DISTINCT apply to a single column or all columns in the SELECT clause?",
          answer: "It applies to the combination of all columns listed in the SELECT statement."
        }
      ],
      code: `SELECT DISTINCT marks FROM student;`,
      visualizerType: "jvm"
    },
    {
      id: 211,
      title: "Updating Records",
      intro: "Modifying existing row values.",
      explanation: "Syntax: `UPDATE table SET col1=val1, col2=val2 WHERE condition`\n1. SET specifies which columns to change and their new values.\n2. WHERE targets specific rows — WITHOUT it, EVERY row in the table gets updated.\n3. Update multiple columns in one statement: `SET name='Raj', marks=90`.\n4. Can use arithmetic: `SET marks = marks + 5` — adds 5 to the existing value.\n5. Returns affected row count — 0 rows updated means WHERE matched nothing.\n6. Always test your WHERE clause with a SELECT first before running UPDATE in production.",
      gotchas: [
        "If you omit the WHERE clause in an UPDATE statement, all rows in the entire table will be updated."
      ],
      interviewQuestions: [
        {
          question: "What happens if you run an UPDATE query without a WHERE clause?",
          answer: "It will update the specified columns for every single record in the table."
        }
      ],
      code: `UPDATE student 
SET marks = 95 
WHERE id = 1;`,
      visualizerType: "jvm"
    },
    {
      id: 212,
      title: "Deleting Records",
      intro: "Removing rows from a table.",
      explanation: "Syntax: `DELETE FROM table WHERE condition`\n1. Removes rows that match the WHERE condition — table STRUCTURE stays intact.\n2. Without WHERE → deletes EVERY row in the table (table becomes empty).\n3. DELETE vs TRUNCATE: DELETE is transactional (can ROLLBACK); TRUNCATE is faster but cannot be rolled back.\n4. DELETE vs DROP: DELETE removes rows; DROP removes the entire table including its structure.\n5. Returns the count of deleted rows — 0 means WHERE condition matched nothing.\n6. Foreign key check: if the row is referenced by a child table, delete fails unless ON DELETE CASCADE is set.",
      gotchas: [
        "Omitting the WHERE clause deletes all rows in the table, but keeps the table structure intact."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between DELETE and DROP?",
          answer: "DELETE removes specific rows (or all rows if WHERE is omitted) but keeps the table structure. DROP deletes the entire table structure along with its data."
        }
      ],
      code: `DELETE FROM student WHERE id = 4;`,
      visualizerType: "jvm"
    },
    {
      id: 213,
      title: "COMMIT and ROLLBACK Commands",
      intro: "Managing transactional boundaries and data safety.",
      explanation: "Relational databases use transactions (grouped SQL statements). COMMIT permanently saves all pending changes to the database. ROLLBACK undoes all changes made in the current transaction block.",
      gotchas: [
        "In MySQL, DDL statements (like CREATE, ALTER, DROP) trigger an implicit commit; they cannot be rolled back."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of ROLLBACK?",
          answer: "It reverts all modifications made within the current uncommitted transaction, returning the database to its previous stable state."
        }
      ],
      code: `START TRANSACTION;
UPDATE student SET marks = 100 WHERE id = 1;
-- If something goes wrong:
ROLLBACK;
-- If everything is fine:
-- COMMIT;`,
      visualizerType: "jvm"
    },
    {
      id: 214,
      title: "PRIMARY KEY and FOREIGN KEY Constraints",
      intro: "Establishing and enforcing relationships between tables.",
      explanation: "A FOREIGN KEY in a child table references a PRIMARY KEY (or UNIQUE key) in a parent table. It enforces referential integrity, ensuring child rows must point to valid parent rows.",
      gotchas: [
        "You cannot delete a parent row if corresponding child rows exist, unless you configured ON DELETE CASCADE or ON DELETE SET NULL on the foreign key."
      ],
      interviewQuestions: [
        {
          question: "What is referential integrity?",
          answer: "A rule set that ensures relationships between tables remain consistent. A foreign key value must either match an existing primary key value in the parent table or be NULL."
        }
      ],
      code: `CREATE TABLE laptop (
    lid INT PRIMARY KEY,
    brand VARCHAR(50),
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE
);`,
      visualizerType: "jvm"
    },
    {
      id: 215,
      title: "INNER JOIN",
      intro: "Matching rows between tables.",
      explanation: "INNER JOIN returns records that have matching values in both tables. If a row in the left table doesn't have a matching key in the right table, it is excluded.",
      gotchas: [
        "If join condition keys have duplicate values, it will produce a cartesian product of those matching keys."
      ],
      interviewQuestions: [
        {
          question: "What does INNER JOIN do?",
          answer: "It returns only the rows where there is a match in both joined tables based on the join predicate."
        }
      ],
      code: `SELECT student.name, laptop.brand 
FROM student 
INNER JOIN laptop ON student.id = laptop.student_id;`,
      visualizerType: "jvm"
    },
    {
      id: 216,
      title: "LEFT JOIN",
      intro: "Keeping all left-side records even if no match exists.",
      explanation: "LEFT JOIN (or LEFT OUTER JOIN) returns all rows from the left table, and the matched rows from the right table. If no match is found, NULL values are returned for the right table's columns.",
      gotchas: [
        "Column filters on the right table should be placed inside the ON clause, not the WHERE clause, otherwise it behaves like an INNER JOIN."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between INNER JOIN and LEFT JOIN?",
          answer: "INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table, and matching rows from the right, filling missing matches with NULL."
        }
      ],
      code: `SELECT student.name, laptop.brand 
FROM student 
LEFT JOIN laptop ON student.id = laptop.student_id;`,
      visualizerType: "jvm"
    },
    {
      id: 217,
      title: "RIGHT JOIN",
      intro: "Keeping all right-side records.",
      explanation: "RIGHT JOIN returns all rows from the right table, and matched rows from the left table. If no match is found, NULL values are returned for the left table's columns.",
      gotchas: [
        "Most developers prefer LEFT JOIN for readability as it reads left-to-right. RIGHT JOIN can always be rewritten as a LEFT JOIN by swapping table positions."
      ],
      interviewQuestions: [
        {
          question: "Can every RIGHT JOIN be written as a LEFT JOIN?",
          answer: "Yes, by swapping the order of the tables in the FROM and JOIN clauses."
        }
      ],
      code: `SELECT student.name, laptop.brand 
FROM student 
RIGHT JOIN laptop ON student.id = laptop.student_id;`,
      visualizerType: "jvm"
    },
    {
      id: 218,
      title: "CROSS JOIN",
      intro: "Creating a cartesian product of two tables.",
      explanation: "1. CROSS JOIN pairs EVERY row from Table A with EVERY row from Table B.\n2. Result size: rows in A × rows in B (cartesian product — no filter needed).\n3. No ON condition required — it matches everything with everything.\n4. Practical use: generate combination grids (e.g. all size × color combinations for a product).\n5. Danger: 1,000 rows × 1,000 rows = 1,000,000 result rows — can crash the database.\n6. An accidental CROSS JOIN happens when you JOIN two tables and forget the ON clause.",
      gotchas: [
        "Be extremely careful! If Table A has 10,000 rows and Table B has 10,000 rows, a CROSS JOIN will produce 100,000,000 rows, potentially running out of memory or locking the database."
      ],
      interviewQuestions: [
        {
          question: "What is a Cartesian Product in SQL?",
          answer: "It is the result of joining two tables without any matching condition (CROSS JOIN), where every row of the first table is paired with every row of the second."
        }
      ],
      code: `SELECT student.name, laptop.brand FROM student CROSS JOIN laptop;`,
      visualizerType: "jvm"
    },
    {
      id: 219,
      title: "ALTER Command",
      intro: "Modifying table schema structures.",
      explanation: "ALTER TABLE modifies an existing table's STRUCTURE without touching data (DDL command).\n1. ADD column: `ALTER TABLE t ADD email VARCHAR(100);` — new column added with NULL for existing rows.\n2. MODIFY column: `ALTER TABLE t MODIFY COLUMN email VARCHAR(150);` — change data type or size.\n3. DROP column: `ALTER TABLE t DROP COLUMN email;` — permanently removes column and its data.\n4. ADD constraint: `ALTER TABLE t ADD CONSTRAINT UNIQUE(email);`\n5. RENAME table: `ALTER TABLE old_name RENAME TO new_name;`\n6. Production warning: ALTER on large tables (millions of rows) locks the table — use online schema tools in production.",
      gotchas: [
        "Running ALTER TABLE on huge tables (millions of rows) can lock the table and block incoming queries, potentially causing downtime. Use online schema change tools in production."
      ],
      interviewQuestions: [
        {
          question: "How do you add a new column to an existing table?",
          answer: "Using ALTER TABLE table_name ADD column_name datatype;"
        }
      ],
      code: `ALTER TABLE student ADD email VARCHAR(100);
-- To modify:
-- ALTER TABLE student MODIFY COLUMN email VARCHAR(150);
-- To drop:
-- ALTER TABLE student DROP COLUMN email;`,
      visualizerType: "jvm"
    },
    {
      id: 220,
      title: "DROP and TRUNCATE Commands",
      intro: "Destroying tables and purging all data.",
      explanation: "DROP TABLE deletes the table definition, data, constraints, and indexes permanently. TRUNCATE TABLE deletes all rows inside a table but keeps its structure. It is faster than DELETE because it deallocates data pages instead of logging individual row deletions.",
      gotchas: [
        "Neither TRUNCATE nor DROP can be rolled back in standard SQL transactions because they are DDL operations."
      ],
      interviewQuestions: [
        {
          question: "Differentiate between DELETE and TRUNCATE.",
          answer: "DELETE is DML, slow, logs each row removal, filters with WHERE, and can be rolled back. TRUNCATE is DDL, fast, doesn't support WHERE, resets auto-increment counters, and cannot be rolled back."
        }
      ],
      code: `-- Remove all data but keep structure:
TRUNCATE TABLE student;
-- Completely delete table structure and data:
-- DROP TABLE student;`,
      visualizerType: "jvm"
    }
  ]
};
