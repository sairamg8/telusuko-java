export default {
  id: 22,
  title: "Hibernate ORM Framework",
  range: "281-311",
  concepts: [
    {
      id: 281,
      title: "Hibernate Source Code",
      intro: "The organization of entities and config files.",
      explanation: "In Hibernate projects, entity classes (Java classes annotated with @Entity) reside in source packages (e.g., com.telusuko.model), and configurations (like hibernate.cfg.xml) reside in src/main/resources/.",
      gotchas: [
        "If hibernate.cfg.xml is placed outside the classpath root (not in resources), Hibernate's standard bootloader won't find it automatically."
      ],
      interviewQuestions: [
        {
          question: "Where is hibernate.cfg.xml located in a standard Maven project?",
          answer: "It is located in the src/main/resources directory so it is placed in the classpath root during packaging."
        }
      ],
      code: `// Folder structure details:
// src/main/java/com/telusuko/entity/Student.java (Entity Class)
// src/main/resources/hibernate.cfg.xml (Configuration File)`,
      visualizerType: "jvm"
    },
    {
      id: 282,
      title: "Hibernate Introduction",
      intro: "Unifying Object-Oriented Java with Relational Databases.",
      explanation: "Hibernate is an Object-Relational Mapping (ORM) framework for Java. It maps Java classes to database tables and Java data types to SQL data types, automating data persistence and reducing SQL queries coding overhead.",
      gotchas: [
        "Hibernate doesn't replace SQL completely; under the hood, it generates and executes standard SQL commands."
      ],
      interviewQuestions: [
        {
          question: "What is Hibernate?",
          answer: "Hibernate is an open-source object-relational mapping (ORM) framework that simplifies Java database application development by mapping Java objects directly to database tables."
        }
      ],
      code: `import org.hibernate.Session;
import org.hibernate.SessionFactory;
// Core framework classes for managing database sessions`,
      visualizerType: "jvm"
    },
    {
      id: 283,
      title: "Fundamentals Before Hibernate",
      intro: "Understanding data impedance mismatch.",
      explanation: "Java uses object-oriented models (inheritance, polymorphism, references, encapsulation). Relational databases use relations (tables, rows, foreign keys, normalization). This difference in representation is called Object-Relational Impedance Mismatch.",
      gotchas: [
        "A Java reference can point to another object, but in a database, this is represented by integer-based primary/foreign key connections."
      ],
      interviewQuestions: [
        {
          question: "What is the Object-Relational Impedance Mismatch?",
          answer: "It refers to the differences and difficulties that arise when mapping object-oriented models (classes, inheritance, objects) to relational databases (tables, columns, primary/foreign keys)."
        }
      ],
      code: `// OOP: class Student { Laptop laptop; }
// RDBMS: STUDENT table linked to LAPTOP table via LAPTOP_ID foreign key.`,
      visualizerType: "jvm"
    },
    {
      id: 284,
      title: "Limitations of JDBC and Need of Hibernate",
      intro: "Moving past boilerplate code and manual column mappings.",
      explanation: "JDBC requires writing a lot of boilerplate code (opening/closing connections, statements, mapping result set columns manually to object fields, handling DB exceptions). It is also highly dependent on SQL dialects. Hibernate automates resource management, handles dirty checking, maps columns dynamically, and provides dialect-independence.",
      gotchas: [
        "Although JDBC requires more code, it runs slightly faster for custom batch write operations because it has no mapping framework overhead."
      ],
      interviewQuestions: [
        {
          question: "Why use Hibernate over JDBC?",
          answer: "Hibernate eliminates boilerplate code, handles database-specific SQL dialect translation automatically, supports object caching, and maps query results directly to Java objects."
        }
      ],
      code: `// JDBC: rs.getString("name"); student.setName(name);
// Hibernate: Student s = session.get(Student.class, 1);`,
      visualizerType: "jvm"
    },
    {
      id: 285,
      title: "JPA and Hibernate as an ORM Framework",
      intro: "The specification vs the implementation.",
      explanation: "JPA (Java Persistence API, now Jakarta Persistence) is the specification defining rules for ORM frameworks. Hibernate is a concrete ORM framework that implements the JPA standard interfaces.",
      gotchas: [
        "It is best practice to write applications using JPA annotations (jakarta.persistence.*) rather than Hibernate-specific annotations (org.hibernate.annotations.*) to allow switching the underlying provider (e.g., to EclipseLink or OpenJPA) easily."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between JPA and Hibernate?",
          answer: "JPA is a specification (standard guidelines/interfaces), while Hibernate is a concrete implementation of that specification."
        }
      ],
      code: `import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Student {
    @Id
    private int id;
}`,
      visualizerType: "jvm"
    },
    {
      id: 286,
      title: "Hibernate Architecture",
      intro: "Decoupling session factories and sessions.",
      explanation: "Hibernate architecture contains key components: Configuration (configures database settings), SessionFactory (heavyweight, thread-safe factory created once per database lifecycle), Session (lightweight, single-threaded connection object representing a unit of work), and Transaction (defines transactional boundaries).",
      gotchas: [
        "SessionFactory is very expensive to create. Do not create a new SessionFactory for every database transaction."
      ],
      interviewQuestions: [
        {
          question: "Is SessionFactory thread-safe? Is Session thread-safe?",
          answer: "Yes, SessionFactory is thread-safe and shared across the entire application. No, Session is not thread-safe and must be opened and closed per request/thread."
        }
      ],
      code: `// Architecture setup:
// Configuration -> SessionFactory -> Session -> Transaction`,
      visualizerType: "jvm"
    },
    {
      id: 287,
      title: "Hibernate Project Setup",
      intro: "Adding dependency modules in Maven.",
      explanation: "Setting up a Hibernate application requires importing the core Hibernate core jar (hibernate-core) and your database driver (e.g., mysql-connector-j) in pom.xml.",
      gotchas: [
        "Version mismatches between Hibernate and Jakarta/Java EE specifications can lead to compilation or runtime errors (e.g., using javax.persistence instead of jakarta.persistence)."
      ],
      interviewQuestions: [
        {
          question: "What coordinates are required for Hibernate in Maven?",
          answer: "The dependency group 'org.hibernate.orm' with artifact 'hibernate-core'."
        }
      ],
      code: `<dependency>
    <groupId>org.hibernate.orm</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>6.4.1.Final</version>
</dependency>`,
      visualizerType: "jvm"
    },
    {
      id: 288,
      title: "Hibernate Project Setup Architecture",
      intro: "Layering database and application logic.",
      explanation: "A clean Hibernate project is structured into three layers: 1. Configuration (hibernate.cfg.xml holding dialect, URL, credentials). 2. Entity/Model classes (decorated with annotations). 3. Persistence layer (helper classes encapsulating SessionFactory creation).",
      gotchas: [
        "Make sure to list all Entity classes in the <mapping class=\"...\"/> tag inside your hibernate.cfg.xml config if not using auto-scanning."
      ],
      interviewQuestions: [
        {
          question: "Why must we register entity classes in hibernate.cfg.xml?",
          answer: "So that Hibernate can scan, parse the mappings, and create/verify matching database tables on startup."
        }
      ],
      code: `<!-- Registry tag in hibernate.cfg.xml -->
<mapping class="com.telusuko.model.Student"/>`,
      visualizerType: "jvm"
    },
    {
      id: 289,
      title: "Install Hibernate Helper Plugin",
      intro: "Easing configuration using IDE plugins.",
      explanation: "Plugins (like 'JBoss Tools' or 'Hibernate Code Generation' in Eclipse and IntelliJ) provide wizard menus to automatically generate entity mappings, reverse-engineer database schemas into Java code, and format XML configuration files.",
      gotchas: [
        "Relying too heavily on auto-generated mappings can produce inefficient structures (e.g., wrong column size constraints or missing cascade settings)."
      ],
      interviewQuestions: [
        {
          question: "How do database reverse engineering tools help in Hibernate?",
          answer: "They connect to an existing database schema and auto-generate entity classes with appropriate mapping annotations, saving development time."
        }
      ],
      code: `// Tool generated attributes:
// @Column(name="student_name", length=50)`,
      visualizerType: "jvm"
    },
    {
      id: 290,
      title: "First Hibernate Application",
      intro: "Building the entry config and booting Hibernate.",
      explanation: "Initialize standard configurations by building a hibernate.cfg.xml specifying database connections, loading configuration, building SessionFactory, opening a Session, starting a Transaction, saving an entity object, and committing the transaction.",
      gotchas: [
        "You must call transaction.commit() to write changes; otherwise, SQL updates will be rolled back by default when the session closes."
      ],
      interviewQuestions: [
        {
          question: "What happens if you save an entity without starting a transaction?",
          answer: "In non-transactional contexts, the entity changes are not flushed or saved to the database. Hibernate forces modifications to occur within active transactions."
        }
      ],
      code: `<!-- hibernate.cfg.xml example -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
        <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/demo</property>
        <property name="hibernate.connection.username">root</property>
        <property name="hibernate.connection.password">password</property>
        <property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>
        <property name="hibernate.hbm2ddl.auto">update</property>
        <mapping class="com.telusuko.Student"/>
    </session-factory>
</hibernate-configuration>`,
      visualizerType: "jvm"
    },
    {
      id: 291,
      title: "Entity Insertion with persist() Method",
      intro: "Storing a transient object in the database.",
      explanation: "Create a new entity instance (in transient state). Call session.persist(entity). This transitions the entity state to persistent, attaching it to the current Session. When the transaction commits, Hibernate flushes the SQL INSERT query.",
      gotchas: [
        "The persist() method returns void and does not guarantee database identifier assignment immediately, whereas save() returns the generated identifier."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between persist() and save() in Hibernate?",
          answer: "save() returns the serializable primary key identifier immediately and works outside transactions in legacy Hibernate. persist() returns void, conforms strictly to JPA specs, and only schedules insertion within a transaction."
        }
      ],
      code: `import org.hibernate.cfg.Configuration;
// Execution:
try (SessionFactory factory = new Configuration().configure().buildSessionFactory();
     Session session = factory.openSession()) {
    
    session.beginTransaction();
    Student student = new Student();
    student.setId(101);
    student.setName("Kiran");
    student.setMarks(89);
    
    session.persist(student);
    session.getTransaction().commit();
}`,
      visualizerType: "jvm"
    },
    {
      id: 292,
      title: "Updating the Data",
      intro: "Modifying persistent entity values.",
      explanation: "Retrieve a record using session.get(). Modifying its attributes using standard setter methods (e.g., student.setName(\"New Name\")) will automatically sync modifications with the database during transaction commit. This is called dirty checking.",
      gotchas: [
        "If an entity is detached (outside a session context), changes won't be saved unless you call session.merge(detachedEntity)."
      ],
      interviewQuestions: [
        {
          question: "What is Hibernate Dirty Checking?",
          answer: "Hibernate automatically detects modifications made to persistent entities during a transaction and writes those updates to the database when the transaction commits, without requiring explicit update calls."
        }
      ],
      code: `session.beginTransaction();
Student student = session.get(Student.class, 101);
if (student != null) {
    student.setMarks(95); // Dirty checking automatically updates DB
}
session.getTransaction().commit();`,
      visualizerType: "jvm"
    },
    {
      id: 293,
      title: "Deleting Records in a Table Using delete() and remove()",
      intro: "Removing persistent records from the database.",
      explanation: "1. To delete a record using Hibernate: load the entity into the persistence context with session.get(), then call session.remove(entity). Hibernate generates and executes the DELETE SQL on transaction commit.\n2. session.remove() is the JPA-standard method (preferred in modern code). session.delete() is the legacy Hibernate-specific equivalent — both do the same thing but remove() is part of the JPA spec and is forward-compatible.\n3. Entity state matters: the object must be in 'persistent' state (attached to the current session). Passing a 'detached' object (loaded in a different session) throws an exception — re-attach first with session.merge().\n4. For bulk deletes across many rows, use HQL DELETE instead of loading-then-removing each entity in a loop: `session.createMutationQuery(\"DELETE FROM Student WHERE marks < 35\").executeUpdate()` — far more efficient.\n5. After session.remove(), the entity is in 'removed' state — it still exists in memory until the transaction commits. If the transaction rolls back, the entity returns to 'persistent'. The DELETE SQL only executes at flush time before commit.",
      gotchas: [
        "The object must be in a persistent or merged state. Trying to delete a transient object with only an ID set can fail or raise exceptions."
      ],
      interviewQuestions: [
        {
          question: "Differentiate between delete() and remove() in Hibernate.",
          answer: "delete() is a legacy Hibernate-specific method. remove() is the standard JPA-compliant equivalent, preferred in modern projects."
        }
      ],
      code: `session.beginTransaction();
Student student = session.get(Student.class, 101);
if (student != null) {
    session.remove(student); // Schedules DELETE SQL
}
session.getTransaction().commit();`,
      visualizerType: "jvm"
    },
    {
      id: 294,
      title: "Maven Project Update",
      intro: "Syncing Maven configurations.",
      explanation: "After adding dependencies or changing versions in pom.xml, update the Maven project in your IDE. This downloads libraries and refreshes the project's internal classpaths.",
      gotchas: [
        "Ensure your IDE is using the correct JDK version after a project update, as build tools sometimes reset configuration defaults."
      ],
      interviewQuestions: [
        {
          question: "What is the command to force Maven to update snapshots and dependencies from the terminal?",
          answer: "mvn clean install -U"
        }
      ],
      code: `# Command line update:
# mvn clean install -U`,
      visualizerType: "jvm"
    },
    {
      id: 295,
      title: "Selective Insertion with @Transient Annotation",
      intro: "Omitting Java attributes from database tables.",
      explanation: "If you have an attribute in your Java entity class that you do not want to persist in the database (e.g., a calculated field or a temporary token), annotate it with @Transient. Hibernate will ignore this field during DDL generation and CRUD operations.",
      gotchas: [
        "Do not confuse jakarta.persistence.Transient with the Java keyword transient (which is used for Java object serialization, not database persistence)."
      ],
      interviewQuestions: [
        {
          question: "What is the role of @Transient in JPA?",
          answer: "It instructs the ORM engine to ignore the annotated field, meaning no corresponding database table column will be generated or mapped for it."
        }
      ],
      code: `import jakarta.persistence.Transient;

@Entity
public class Student {
    @Id
    private int id;
    private int marks;
    
    @Transient
    private String grade; // calculated at runtime, not stored in DB
}`,
      visualizerType: "jvm"
    },
    {
      id: 296,
      title: "Data Retrieval with get() Method",
      intro: "Fetching records by their primary key identifier.",
      explanation: "Retrieve an entity using session.get(ClassName.class, primaryKey). This executes an SQL SELECT statement immediately and returns the mapped Java object.",
      gotchas: [
        "If the record is not found in the database, get() returns null. Contrast this with load() or getReference(), which throw an ObjectNotFoundException."
      ],
      interviewQuestions: [
        {
          question: "What happens if get() does not find the requested record in Hibernate?",
          answer: "It returns null."
        }
      ],
      code: `Student student = session.get(Student.class, 101);
if (student != null) {
    System.out.println("Student Name: " + student.getName());
}`,
      visualizerType: "jvm"
    },
    {
      id: 297,
      title: "Lazy Loading vs Eager Loading in Hibernate",
      intro: "Optimizing database fetches for associated objects.",
      explanation: "1. Eager Loading (FetchType.EAGER): Fetches the main entity and its associated objects in a single joint query immediately. 2. Lazy Loading (FetchType.LAZY): Fetches the main entity immediately, but returns a dynamic proxy object for associated entities. It only executes a database query to fetch the association if/when you explicitly call a getter on it.",
      gotchas: [
        "Accessing lazy associations after the Hibernate Session is closed throws the infamous LazyInitializationException."
      ],
      interviewQuestions: [
        {
          question: "What causes a LazyInitializationException?",
          answer: "Accessing a lazily loaded associated collection or object after the database Session that fetched the parent object has already been closed."
        }
      ],
      code: `@OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
private List<Laptop> laptops;`,
      visualizerType: "exception"
    },
    {
      id: 298,
      title: "Level 1 Cache in Hibernate",
      intro: "Session-scoped persistence caching.",
      explanation: "Level 1 Cache (L1 Cache) is enabled by default and operates at the Session scope. If you query the same entity twice within the same Session, Hibernate retrieves it from the database on the first query, caches it internally, and returns the cached instance on the second query without querying the DB again.",
      gotchas: [
        "L1 cache cannot be disabled. It is cleared automatically when the Session is closed or manually using session.clear()."
      ],
      interviewQuestions: [
        {
          question: "How do you disable Level 1 caching in Hibernate?",
          answer: "You cannot disable it; L1 cache is mandatory and integral to Hibernate's session state and dirty checking mechanisms."
        }
      ],
      code: `Student s1 = session.get(Student.class, 101); // Hits Database
Student s2 = session.get(Student.class, 101); // Hits L1 Cache (No SQL query)`,
      visualizerType: "memory"
    },
    {
      id: 299,
      title: "Level 2 Cache in Hibernate (EhCache)",
      intro: "SessionFactory-scoped caching across sessions.",
      explanation: "Level 2 Cache (L2 Cache) is an optional, pluggable cache that operates at the SessionFactory scope. Entities cached in L2 can be shared across multiple sessions. EhCache is a popular provider for L2 caching in Hibernate.",
      gotchas: [
        "To use L2 Cache, you must explicitly enable it in hibernate.cfg.xml and mark entities with @Cacheable and @Cache annotations."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between L1 and L2 cache in Hibernate?",
          answer: "L1 cache is session-scoped, enabled by default, and cannot be shared. L2 cache is SessionFactory-scoped, optional, and shared across all sessions."
        }
      ],
      code: `<!-- Enable L2 cache in hibernate.cfg.xml -->
<property name="hibernate.cache.use_second_level_cache">true</property>
<property name="hibernate.cache.region.factory_class">org.hibernate.cache.ehcache.internal.EhcacheRegionFactory</property>`,
      visualizerType: "jvm"
    },
    {
      id: 300,
      title: "Hibernate Configuration Using Java Without XML",
      intro: "Configuring Hibernate programmatically.",
      explanation: "Instead of hibernate.cfg.xml, you can set properties programmatically using Hibernate's StandardServiceRegistryBuilder and a Metadata compiler context.",
      gotchas: [
        "This approach requires recompiling Java code to change database configurations, whereas XML properties can be updated without recompiling."
      ],
      interviewQuestions: [
        {
          question: "How do you configure Hibernate without XML?",
          answer: "By instantiating a Properties object, applying connection keys, registering it with a ServiceRegistry, and adding entity classes dynamically."
        }
      ],
      code: `import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import java.util.Properties;

Properties prop = new Properties();
prop.put("hibernate.connection.url", "jdbc:mysql://localhost:3306/demo");
prop.put("hibernate.connection.username", "root");
prop.put("hibernate.connection.password", "password");

StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
        .applySettings(prop).build();
SessionFactory factory = new MetadataSources(registry)
        .addAnnotatedClass(Student.class).buildMetadata().buildSessionFactory();`,
      visualizerType: "jvm"
    },
    {
      id: 301,
      title: "Hibernate Configuration Using hibernate.properties File",
      intro: "Flat file properties configuration.",
      explanation: "You can place connection parameters inside a simple key-value hibernate.properties file in your classpath root. Hibernate automatically detects it on startup.",
      gotchas: [
        "Unlike XML configurations, property files cannot declare mappings; you must still declare entity mappings programmatically in your Java code."
      ],
      interviewQuestions: [
        {
          question: "Can we configure mappings inside hibernate.properties?",
          answer: "No, mappings cannot be defined in a properties file. They must be registered programmatically."
        }
      ],
      code: `# hibernate.properties
hibernate.connection.driver_class=com.mysql.cj.jdbc.Driver
hibernate.connection.url=jdbc:mysql://localhost:3306/demo
hibernate.connection.username=root
hibernate.connection.password=password`,
      visualizerType: "jvm"
    },
    {
      id: 302,
      title: "Exploring @GeneratedValue and @SequenceGenerator",
      intro: "Automating primary key generation strategies.",
      explanation: "The @GeneratedValue annotation specifies how primary key identifiers are created. Common strategies: IDENTITY (database auto-increment), SEQUENCE (uses database sequences via @SequenceGenerator), TABLE (maintains a key counter table), and AUTO (delegates selection to Hibernate).",
      gotchas: [
        "IDENTITY generation disables Hibernate's batch insert optimizations because it requires executing the INSERT statement immediately to resolve the primary key value."
      ],
      interviewQuestions: [
        {
          question: "Why does IDENTITY strategy affect batch processing performance in Hibernate?",
          answer: "It forces immediate query execution on persist() to retrieve the database-generated ID, preventing Hibernate from pooling and batching insertions."
        }
      ],
      code: `import jakarta.persistence.*;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int empId;
}`,
      visualizerType: "jvm"
    },
    {
      id: 303,
      title: "Introduction to Hibernate Association Mapping",
      intro: "Translating entity relationships to database tables.",
      explanation: "Association mapping maps relationships between entities: One-to-One, One-to-Many, Many-to-One, and Many-to-Many. Annotations manage matching tables, foreign keys, and join tables.",
      gotchas: [
        "Without specifying cascade styles, operations like saving a parent entity won't automatically propagate to child entities."
      ],
      interviewQuestions: [
        {
          question: "List the core types of association mappings in Hibernate.",
          answer: "OneToOne, OneToMany, ManyToOne, and ManyToMany."
        }
      ],
      code: `// Mappings are declared using annotations:
// @OneToOne, @OneToMany, @ManyToOne, @ManyToMany`,
      visualizerType: "jvm"
    },
    {
      id: 304,
      title: "Hibernate One-to-One Mapping (Unidirectional and Bidirectional)",
      intro: "Linking single entities together.",
      explanation: "Connects one entity to another. In unidirectional mapping, only one entity has a @OneToOne reference containing a @JoinColumn pointing to the foreign key. In bidirectional mapping, both entities reference each other, using the mappedBy attribute on the inverse side to define ownership.",
      gotchas: [
        "Forgetting to specify mappedBy in a bidirectional mapping causes Hibernate to create duplicate foreign key columns in both tables."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of the mappedBy attribute?",
          answer: "It indicates the non-owning (inverse) side of a bidirectional relationship, pointing to the field name in the owning entity that manages the relationship."
        }
      ],
      code: `// Owning Side
@Entity
public class Student {
    @Id
    private int id;
    @OneToOne
    @JoinColumn(name = "laptop_id")
    private Laptop laptop;
}

// Inverse Side
@Entity
public class Laptop {
    @Id
    private int lid;
    @OneToOne(mappedBy = "laptop")
    private Student student;
}`,
      visualizerType: "jvm"
    },
    {
      id: 305,
      title: "Hibernate One-to-Many and Many-to-One Mapping",
      intro: "Mapping parent-child structures.",
      explanation: "A @ManyToOne mapping maps a child entity back to its parent (the child table holds the foreign key). A @OneToMany mapping maps a parent entity to a list of children. When bidirectional, always declare mappedBy on the @OneToMany side.",
      gotchas: [
        "When inserting records, you must set references on both sides of the bidirectional relationship before saving."
      ],
      interviewQuestions: [
        {
          question: "Which side is the owning side in a One-to-Many bidirectional association?",
          answer: "The Many-to-One side (the child entity containing the foreign key) is the owning side."
        }
      ],
      code: `@Entity
public class Department {
    @Id
    private int id;
    @OneToMany(mappedBy = "dept")
    private List<Employee> employees;
}

@Entity
public class Employee {
    @Id
    private int id;
    @ManyToOne
    @JoinColumn(name = "dept_id")
    private Department dept;
}`,
      visualizerType: "jvm"
    },
    {
      id: 306,
      title: "Hibernate ManyToMany Association Mapping",
      intro: "Connecting collections of entities through join tables.",
      explanation: "Maps a many-to-many relationship using @ManyToMany. Under the hood, this requires a junction table (join table) that references the primary keys of both entities. This is configured using @JoinTable.",
      gotchas: [
        "In Many-to-Many, one side must be declared as the owner, and the other side must declare mappedBy to prevent Hibernate from generating two redundant join tables."
      ],
      interviewQuestions: [
        {
          question: "How is a Many-to-Many relationship represented in a relational database?",
          answer: "Using a Join Table (junction table) containing foreign keys pointing to the primary keys of both participating tables."
        }
      ],
      code: `@Entity
public class Project {
    @Id
    private int id;
    @ManyToMany(mappedBy = "projects")
    private List<Employee> employees;
}

@Entity
public class Employee {
    @Id
    private int id;
    @ManyToMany
    @JoinTable(
        name = "emp_project",
        joinColumns = @JoinColumn(name = "emp_id"),
        inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private List<Project> projects;
}`,
      visualizerType: "jvm"
    },
    {
      id: 307,
      title: "Working with LOBs (Image and text file)",
      intro: "Storing large binary objects and large character sets.",
      explanation: "LOBs (Large Objects) store large data payloads. Use @Lob to declare them. Use byte[] or java.sql.Blob for Binary Large Objects (BLOBs, e.g. images) and String or java.sql.Clob for Character Large Objects (CLOBs, e.g. large text files).",
      gotchas: [
        "Loading large LOBs into memory eagerly can cause out-of-memory issues. Consider lazy loading LOB fields."
      ],
      interviewQuestions: [
        {
          question: "What annotations are used to map large binary/character datasets in Hibernate?",
          answer: "The @Lob annotation combined with type-specific fields like byte[] (BLOB) or String (CLOB)."
        }
      ],
      code: `import jakarta.persistence.Lob;

@Entity
public class UserProfile {
    @Id
    private int id;
    
    @Lob
    private byte[] profilePic; // Maps to BLOB in database
    
    @Lob
    private String bio; // Maps to CLOB/TEXT in database
}`,
      visualizerType: "jvm"
    },
    {
      id: 308,
      title: "Introduction to HQL (JPQL) and Bulk Operations in Hibernate",
      intro: "Querying databases using object-oriented syntax.",
      explanation: "HQL (Hibernate Query Language) is an object-oriented extension of SQL. Instead of querying tables and columns, HQL queries Java entity classes and their fields. It translates HQL queries into appropriate SQL queries for the configured database dialect.",
      gotchas: [
        "Class and property names are case-sensitive in HQL (because they must match Java symbols), whereas SQL keywords are case-insensitive."
      ],
      interviewQuestions: [
        {
          question: "What is HQL?",
          answer: "Hibernate Query Language (HQL) is an object-oriented query language that queries entities and their fields rather than database tables and columns."
        }
      ],
      code: `// Standard HQL representation:
// SELECT s FROM Student s WHERE s.marks > 80`,
      visualizerType: "jvm"
    },
    {
      id: 309,
      title: "Data Retrieval with HQL",
      intro: "Executing basic object-oriented queries.",
      explanation: "1. HQL (Hibernate Query Language) targets entity CLASS names and field names, NOT table/column names. Example: `FROM Student WHERE marks > 80` — Student is the class, not the DB table name.\n2. Execute with `session.createQuery(hqlString, ResultClass.class)`. Fetch all: `.getResultList()` returns `List<T>`. Fetch one: `.getSingleResult()` returns `T`.\n3. getSingleResult() is strict — if zero rows match it throws `NoResultException`; if multiple match it throws `NonUniqueResultException`. Use `.setMaxResults(1).getResultList().stream().findFirst()` to safely get 0 or 1 result.\n4. HQL supports JOIN across entity associations: `FROM Student s JOIN s.address a WHERE a.city = 'Hyderabad'`. The `s.address` refers to the Java field on Student — no SQL ON clause needed.\n5. HQL supports ORDER BY, DISTINCT, COUNT/SUM/AVG/MAX/MIN aggregates, GROUP BY, and pagination via `.setFirstResult(offset).setMaxResults(limit)` — which Hibernate translates to database-specific LIMIT/OFFSET.",
      gotchas: [
        "If getSingleResult() is called but zero rows match, it throws a NoResultException. If multiple rows match, it throws a NonUniqueResultException."
      ],
      interviewQuestions: [
        {
          question: "Difference between getResultList() and getSingleResult()?",
          answer: "getResultList() returns a List (empty if no matches). getSingleResult() returns a single object and throws exceptions if no matches or multiple matches are found."
        }
      ],
      code: `String hql = "FROM Student WHERE marks > 80";
List<Student> students = session.createQuery(hql, Student.class).getResultList();
for(Student s : students) {
    System.out.println(s.getName());
}`,
      visualizerType: "jvm"
    },
    {
      id: 310,
      title: "More on Data Retrieval with HQL",
      intro: "Projections and parameterized queries in HQL.",
      explanation: "1. Projections in HQL select specific fields instead of whole entities: `SELECT s.name, s.marks FROM Student s` returns `List<Object[]>` where each array holds the selected values in order.\n2. Named parameters use `:paramName` syntax and bind with `.setParameter('paramName', value)` — the correct approach to prevent SQL injection and handle type conversion automatically.\n3. Positional parameters (`?1`, `?2`) also exist but named parameters are preferred for readability, especially with multiple parameters.\n4. To project directly into a DTO constructor: `SELECT new com.app.dto.StudentDTO(s.name, s.marks) FROM Student s` — returns `List<StudentDTO>` instead of `List<Object[]>`, which is far cleaner to work with.\n5. Named queries (reusable HQL): annotate the entity with `@NamedQuery(name = 'Student.findByMarks', query = 'FROM Student WHERE marks > :min')`. Execute with `session.createNamedQuery('Student.findByMarks', Student.class).setParameter('min', 80)` — avoids scattering HQL strings across service methods.",
      gotchas: [
        "When selecting specific columns (e.g. name, marks), the result list contains Object[] arrays, not entity instances."
      ],
      interviewQuestions: [
        {
          question: "How do you pass parameters securely in HQL?",
          answer: "Using named parameters (e.g. :minMarks) and binding them with query.setParameter('minMarks', value)."
        }
      ],
      code: `String hql = "SELECT s.name, s.marks FROM Student s WHERE s.id = :studentId";
Object[] result = session.createQuery(hql, Object[].class)
    .setParameter("studentId", 101)
    .getSingleResult();
System.out.println("Name: " + result[0] + ", Marks: " + result[1]);`,
      visualizerType: "jvm"
    },
    {
      id: 311,
      title: "Updating and Deleting Data with HQL",
      intro: "Running bulk update and delete queries in HQL.",
      explanation: "1. Bulk HQL UPDATE and DELETE bypass the normal entity lifecycle — they run directly as SQL without loading entities into the persistence context. Example: `UPDATE Student SET marks = marks + 5 WHERE marks < 50`.\n2. Execute with `session.createMutationQuery(hqlString).executeUpdate()`. Returns the number of affected rows (int). Must be inside an active transaction or Spring throws TransactionRequiredException.\n3. Bulk UPDATE vs entity merge: entity merge triggers lifecycle callbacks (@PreUpdate, @PostUpdate) and updates L1/L2 cache. Bulk HQL UPDATE bypasses all of these — much faster for large datasets, but cache stays stale.\n4. After a bulk HQL UPDATE or DELETE, the L1 (session-level) cache is NOT refreshed — entities already cached in memory have wrong data. Clear the cache: `session.clear()` to force fresh reloads on next access.\n5. Restriction: HQL UPDATE cannot join multiple tables. For cross-table updates, use native SQL via `session.createNativeQuery()` — but lose database portability.",
      gotchas: [
        "Bulk operations bypass L1 cache updates. Entities already cached in memory won't reflect bulk database changes."
      ],
      interviewQuestions: [
        {
          question: "Why should you be careful when executing bulk HQL updates?",
          answer: "Because bulk updates bypass the persistence context (Level 1 cache), potentially leading to data inconsistencies in currently active sessions."
        }
      ],
      code: `session.beginTransaction();
String hql = "UPDATE Student SET marks = marks + 5 WHERE marks < 50";
int updated = session.createMutationQuery(hql).executeUpdate();
System.out.println("Rows updated: " + updated);
session.getTransaction().commit();`,
      visualizerType: "jvm"
    }
  ]
};
