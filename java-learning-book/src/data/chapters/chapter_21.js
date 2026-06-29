export default {
  id: 21,
  title: "Build Automation with Maven",
  range: "261-280",
  concepts: [
    {
      id: 261,
      title: "What is a Build Tool & Why Do We Need It",
      intro: "Moving beyond manual compilation.",
      explanation: "In small projects, compiling using javac and running using java is easy. But in large enterprise applications with hundreds of classes and external library dependencies (JARs), manual compilation, running tests, resolving dependencies, and packaging become impossible to manage manually. A Build Tool automates these tasks.",
      gotchas: [
        "Build tools do not compile code themselves; they coordinate compilers, test runners, and packaging tools."
      ],
      interviewQuestions: [
        {
          question: "Why do we need a build tool like Maven or Gradle?",
          answer: "To automate compile, test, package, and deployment workflows, and to resolve transitive external dependencies automatically."
        }
      ],
      code: `# Without a build tool, manual compilation is tedious:
# javac -cp lib/a.jar:lib/b.jar src/com/app/*.java`,
      visualizerType: "jvm"
    },
    {
      id: 262,
      title: "What is Maven & What It Does",
      intro: "Apache's standard build and project management tool.",
      explanation: "Maven is a build automation tool based on the concept of a Project Object Model (POM). It uses a declarative XML file (pom.xml) to describe the project configuration, build plugins, and external dependencies. Maven's core strength is its standard directory layout and automatic transitive dependency resolution.",
      gotchas: [
        "Maven is highly opinionated. If you do not follow its default directory structure (e.g. putting Java code in src/main/java), you will have to write complex XML configurations to override it."
      ],
      interviewQuestions: [
        {
          question: "What is Maven?",
          answer: "Maven is a build automation and dependency management tool based on the Project Object Model (POM) concept, providing standard build lifecycles and structured directory layouts."
        }
      ],
      code: `<!-- Maven uses pom.xml to describe projects -->
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.telusuko</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0-SNAPSHOT</version>
</project>`,
      visualizerType: "jvm"
    },
    {
      id: 263,
      title: "Maven Installation Guide and Setup Preview",
      intro: "Preparing for Maven configuration.",
      explanation: "Installing Maven requires downloading the binary zip from the official Apache website, extracting it, and adding the path of the bin/ directory to the system environment variables (PATH).",
      gotchas: [
        "Maven requires a valid Java Development Kit (JDK) installation to be present on the machine; a JRE (Java Runtime Environment) is not sufficient since Maven needs the compiler."
      ],
      interviewQuestions: [
        {
          question: "What environment variable must be set before installing Maven?",
          answer: "JAVA_HOME must be set pointing to a valid JDK installation directory."
        }
      ],
      code: `# Command to verify Maven installation details:
# mvn -version`,
      visualizerType: "jvm"
    },
    {
      id: 264,
      title: "Maven & Java Installation on Windows",
      intro: "Setting up development environments on Windows systems.",
      explanation: "1. Download JDK and Maven zip. 2. Extract both to directories like C:\\Program Files. 3. Set Environment Variables: JAVA_HOME to JDK folder, M2_HOME to Maven folder. 4. Append %JAVA_HOME%\\bin and %M2_HOME%\\bin to the Path variable.",
      gotchas: [
        "If paths are set incorrectly or use trailing slashes, commands in Command Prompt or PowerShell might throw 'mvn is not recognized' errors."
      ],
      interviewQuestions: [
        {
          question: "How do you check if Maven environment variables are configured correctly on Windows?",
          answer: "Open cmd and type 'echo %M2_HOME%' and 'mvn -version' to verify the path resolution."
        }
      ],
      code: `:: Windows CMD variables setup check:
:: set JAVA_HOME=C:\\Program Files\\Java\\jdk-17
:: set Path=%Path%;C:\\maven\\apache-maven-3.9.0\\bin`,
      visualizerType: "jvm"
    },
    {
      id: 265,
      title: "Maven Installation on AWS EC2 Instance",
      intro: "Setting up cloud build environments.",
      explanation: "Deploying applications in the cloud requires setting up Maven on headless Linux servers. On Amazon Linux / Ubuntu EC2 instances, this is done using package managers like yum or apt, or by downloading and extracting tarball files.",
      gotchas: [
        "Running sudo apt install maven might install an older version. For the latest features, manually download the tar.gz from Apache."
      ],
      interviewQuestions: [
        {
          question: "How do you install Java and Maven on an Ubuntu EC2 instance?",
          answer: "By running: sudo apt update && sudo apt install -y openjdk-17-jdk maven"
        }
      ],
      code: `# EC2 setup commands:
# sudo yum update -y
# sudo yum install -y java-17-amazon-corretto-devel maven`,
      visualizerType: "jvm"
    },
    {
      id: 266,
      title: "Creating a Maven Java Project on Windows (Local Setup)",
      intro: "Generating Maven projects from templates.",
      explanation: "Use the mvn archetype:generate command to quickly bootstrap a project conforming to Maven's standard folder structure. Alternatively, create directories manually or let your IDE initialize it.",
      gotchas: [
        "Running archetype:generate in interactive mode prompts for inputs; use -B (Batch mode) to run it non-interactively with defaults."
      ],
      interviewQuestions: [
        {
          question: "What is a Maven Archetype?",
          answer: "An archetype is a Maven project templating toolkit that creates a skeleton project structure with default configurations."
        }
      ],
      code: `# Create project in batch mode:
# mvn archetype:generate -DgroupId=com.telusuko -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false`,
      visualizerType: "jvm"
    },
    {
      id: 267,
      title: "Maven Java Project on Linux EC2 (Cloud Setup)",
      intro: "Bootstrapping a maven project on a cloud server.",
      explanation: "1. On a headless Linux EC2 server, Maven is used entirely from the terminal (no GUI IDE). Steps: install Java + Maven, generate project, compile, test, and package via command line.\n2. Install on Amazon Linux: `sudo yum install java-11-openjdk maven`. On Ubuntu: `sudo apt install openjdk-11-jdk maven`. Verify: `java -version && mvn -version`.\n3. Generate a project archetype: `mvn archetype:generate -DgroupId=com.myapp -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false`\n4. On first run, Maven downloads all plugins and dependencies from Maven Central into the local repository at ~/.m2/repository. Without internet access, set up a Nexus/Artifactory mirror in settings.xml.\n5. EC2 security groups must allow outbound TCP port 443 (HTTPS) for Maven to reach Maven Central. Forgetting to open this outbound rule is a very common mistake that causes confusing timeout errors on first build.",
      gotchas: [
        "Ensure your security groups allow outbound traffic so Maven can connect to Maven Central to download plugin dependencies on the first run."
      ],
      interviewQuestions: [
        {
          question: "Why does the first Maven build on EC2 take longer?",
          answer: "Because Maven has to download all compiler plugins, lifecycle plugins, and project dependencies from the Central Repository to the local server cache."
        }
      ],
      code: `# Generate and build on Linux shell:
# mvn archetype:generate -DgroupId=com.cloud.app -DartifactId=cloud-app -DinteractiveMode=false
# cd cloud-app && mvn package`,
      visualizerType: "jvm"
    },
    {
      id: 268,
      title: "Understanding Key Maven Terms",
      intro: "Demystifying Maven terminology.",
      explanation: "Key terms: 1. GroupId: Unique identifier of the organization/group (e.g. com.company). 2. ArtifactId: Unique name of the project jar (e.g. user-service). 3. Version: Current release version (e.g., 1.0.0-SNAPSHOT). 4. Packaging: The final file format (jar, war, pom).",
      gotchas: [
        "SNAPSHOT versions are mutable development builds. Release versions are immutable production builds."
      ],
      interviewQuestions: [
        {
          question: "What is a SNAPSHOT version in Maven?",
          answer: "A SNAPSHOT represents a work-in-progress version. Unlike standard releases, Maven updates SNAPSHOT dependencies dynamically from repositories without changing the version number."
        }
      ],
      code: `<!-- Coordinate definition in pom.xml -->
<groupId>com.telusuko</groupId>
<artifactId>quiz-console</artifactId>
<version>1.0-SNAPSHOT</version>
<packaging>jar</packaging>`,
      visualizerType: "jvm"
    },
    {
      id: 269,
      title: "Hands-On Maven Compile, Test, and Package Goals",
      intro: "Executing basic build phases.",
      explanation: "1. mvn compile: Compiles source code from src/main/java and puts classes in target/classes. 2. mvn test: Runs unit tests in src/test/java. 3. mvn package: Bundles compiled classes into a jar/war file in the target/ directory.",
      gotchas: [
        "Executing a phase also runs all preceding phases in the lifecycle. Running mvn package automatically compiles and tests the code first."
      ],
      interviewQuestions: [
        {
          question: "If you execute mvn package, does it run unit tests?",
          answer: "Yes, because the 'test' phase occurs before the 'package' phase in the default build lifecycle."
        }
      ],
      code: `# Clean target folder and build package:
# mvn clean package`,
      visualizerType: "jvm"
    },
    {
      id: 270,
      title: "Maven Java Web App Setup (WAR Project)",
      intro: "Structuring web applications for deployment.",
      explanation: "To build a web app, set <packaging>war</packaging>. This tells Maven to package the output as a Web Application Archive (WAR), which contains compiled classes, libraries, and web assets like HTML/JSP inside a standard layout.",
      gotchas: [
        "Missing src/main/webapp/WEB-INF/web.xml in older Maven configurations could fail the build unless configured with failOnMissingWebXml set to false."
      ],
      interviewQuestions: [
        {
          question: "What packaging type is used to bundle Java web applications?",
          answer: "war (Web Application Archive)."
        }
      ],
      code: `<!-- Packaging element set to war -->
<packaging>war</packaging>`,
      visualizerType: "jvm"
    },
    {
      id: 271,
      title: "Maven Dependencies",
      intro: "Declaring external libraries.",
      explanation: "Instead of downloading JARs and committing them to git, you declare dependencies in pom.xml. Maven downloads them from repositories and adds them to the classpath.",
      gotchas: [
        "Watch out for dependency version conflicts (multiple libraries requesting different versions of the same transitive dependency)."
      ],
      interviewQuestions: [
        {
          question: "What are transitive dependencies?",
          answer: "If your project depends on Library A, and Library A depends on Library B, Maven automatically resolves and downloads Library B as a transitive dependency."
        }
      ],
      code: `<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
        <scope>runtime</scope>
    </dependency>
</dependencies>`,
      visualizerType: "jvm"
    },
    {
      id: 272,
      title: "Maven Repositories (Local, Central, Remote)",
      intro: "The three tiers of library storage.",
      explanation: "1. Local Repository: Cache folder on your local machine (~/.m2/repository). 2. Central Repository: Public online community library managed by Sonatype/Apache. 3. Remote Repository: Custom organization-wide private libraries (e.g., Nexus or Artifactory).",
      gotchas: [
        "If you delete the ~/.m2/repository folder, Maven will re-download all libraries from scratch on the next build."
      ],
      interviewQuestions: [
        {
          question: "In what order does Maven search for dependencies?",
          answer: "First in the Local Repository. If not found, it checks Central. If still not found and custom remote repositories are defined, it queries them."
        }
      ],
      code: `# Location of local repository:
# Linux: ~/.m2/repository
# Windows: C:\\Users\\Username\\.m2\\repository`,
      visualizerType: "jvm"
    },
    {
      id: 273,
      title: "The pom.xml File",
      intro: "The configuration heart of every Maven project.",
      explanation: "POM stands for Project Object Model. It is an XML file containing project details, build plugins, dependencies, repositories, properties, and build profiles.",
      gotchas: [
        "Invalid XML tags or syntax errors in pom.xml will crash Maven command-line operations instantly."
      ],
      interviewQuestions: [
        {
          question: "What is the role of pom.xml?",
          answer: "It is the central configuration file for Maven, defining project dependencies, coordinates, plugins, and build lifecycle configurations."
        }
      ],
      code: `<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.telusuko</groupId>
    <artifactId>app</artifactId>
    <version>1.0</version>
</project>`,
      visualizerType: "jvm"
    },
    {
      id: 274,
      title: "Maven in IntelliJ IDEA IDE",
      intro: "Native IDE integration.",
      explanation: "IntelliJ has out-of-the-box Maven support. You can import projects by selecting the pom.xml file, view dependency hierarchies in the Maven tool window, and execute lifecycle goals with a single click.",
      gotchas: [
        "If IntelliJ fails to resolve newly added dependencies, click the 'Reload All Maven Projects' sync icon."
      ],
      interviewQuestions: [
        {
          question: "How do you reload Maven dependencies in IntelliJ?",
          answer: "By clicking the Maven Sync/Refresh button located in the top-left of the Maven tool window."
        }
      ],
      code: `// IntelliJ automatically scans pom.xml and adds dependencies
// to the external libraries folder of the project structure.`,
      visualizerType: "jvm"
    },
    {
      id: 275,
      title: "Effective pom.xml File",
      intro: "Understanding the complete merged configuration.",
      explanation: "Maven uses inheritance. Every project inherits defaults from a 'Super POM' defined inside the Maven installation directory. The 'Effective POM' is the final merged result of your custom pom.xml and the Super POM.",
      gotchas: [
        "Features like default compiler plug-in configurations and repository settings are inherited from the Super POM."
      ],
      interviewQuestions: [
        {
          question: "How do you view the full configuration that Maven uses including inherited settings?",
          answer: "By running the command: mvn help:effective-pom"
        }
      ],
      code: `# Command to view the merged configurations:
# mvn help:effective-pom`,
      visualizerType: "jvm"
    },
    {
      id: 276,
      title: "Maven Project Setup in Eclipse IDE",
      intro: "Running Maven in the Eclipse ecosystem.",
      explanation: "1. Import an existing Maven project: File → Import → Maven → Existing Maven Projects → Browse to the folder containing pom.xml. Eclipse reads pom.xml and sets up source folders and dependency JARs automatically.\n2. M2Eclipse (official Maven-Eclipse plugin) comes bundled with recent Eclipse distributions. Verify it's active: Help → About Eclipse → Installation Details — look for 'm2e'.\n3. After editing pom.xml (adding/changing dependencies), right-click project → Maven → Update Project (Alt+F5) to force Eclipse to re-resolve and download new JARs.\n4. Common problem: Eclipse shows 'missing artifact' errors after fresh import. Fix: in Maven → Update Project, check 'Force Update of Snapshots/Releases' to clear local cache inconsistencies.\n5. To run Maven lifecycle phases from Eclipse: right-click pom.xml → Run As → Maven Build → type the goal (e.g. `clean package`) in Goals field — no terminal needed.",
      gotchas: [
        "If the Eclipse workspace gets out of sync with filesystem changes, run Maven -> Update Project (Alt+F5)."
      ],
      interviewQuestions: [
        {
          question: "What is M2Eclipse?",
          answer: "It is the official plugin that provides integration for Apache Maven inside the Eclipse IDE."
        }
      ],
      code: `// Eclipse uses the Maven Integration plugin to map pom.xml dependencies
// directly to the Eclipse project Java Build Path.`,
      visualizerType: "jvm"
    },
    {
      id: 277,
      title: "Maven Build Lifecycle (Clean, Compile, Test, Package, Install, Deploy)",
      intro: "Understanding build phase progressions.",
      explanation: "Maven has three built-in lifecycles: default, clean, and site. The default lifecycle contains stages: validate, compile, test, package, verify, install (copies jar to local repo), and deploy (copies jar to remote repo).",
      gotchas: [
        "Executing a later stage automatically triggers all preceding stages in that specific lifecycle."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between install and deploy?",
          answer: "mvn install copies the packaged artifact to the local repository (~/.m2). mvn deploy copies it to a remote shared repository (like Nexus) for other developers to use."
        }
      ],
      code: `# Run a clean build and copy the artifact to your local ~/.m2/repository:
# mvn clean install`,
      visualizerType: "jvm"
    },
    {
      id: 278,
      title: "Hands-On Java Unit Testing with Maven",
      intro: "Automating test executions via Surefire.",
      explanation: "Maven uses the maven-surefire-plugin to run unit tests during the test phase. Test files must follow standard names (e.g. *Test.java, Test*.java) and reside in src/test/java.",
      gotchas: [
        "If any unit test fails, the build phase fails and stops compilation. You can skip tests using -DskipTests, but this is highly discouraged for production builds."
      ],
      interviewQuestions: [
        {
          question: "How do you skip running unit tests during a Maven build?",
          answer: "By appending -DskipTests to the mvn command: e.g., mvn package -DskipTests."
        }
      ],
      code: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalcTest {
    @Test
    public void testAdd() {
        assertEquals(5, 2 + 3);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 279,
      title: "Maven with Spring Boot Application (Demo)",
      intro: "Bootstrapping modern Spring applications with Maven.",
      explanation: "Spring Boot relies heavily on Maven to bundle configurations. The Spring Boot Parent POM (spring-boot-starter-parent) manages dependency versions, and the spring-boot-maven-plugin repackages the application into an executable fat JAR containing an embedded Tomcat server.",
      gotchas: [
        "Adding dependencies without specifying versions is encouraged in Spring Boot because the parent POM manages matching, compatible versions automatically."
      ],
      interviewQuestions: [
        {
          question: "What is the role of spring-boot-starter-parent in a Spring Boot Maven project?",
          answer: "It provides default configurations, plugin management, and version management for Spring Boot dependencies."
        }
      ],
      code: `<!-- Standard Spring Boot Maven layout -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.2</version>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>`,
      visualizerType: "jvm"
    },
    {
      id: 280,
      title: "You’re Ready to Use Maven",
      intro: "Summarizing the build automation toolkit.",
      explanation: "You now have a complete understanding of dependency management, lifecycles, configuration, and repository systems. Use Maven to organize, build, test, and distribute Java applications efficiently.",
      gotchas: [
        "Keep the pom.xml clean and structured. Avoid manually adding JARs to the classpath to maintain build reproducibility."
      ],
      interviewQuestions: [
        {
          question: "Why is a reproducible build important?",
          answer: "It ensures that code builds identically on any machine (developer laptop, CI/CD pipeline, cloud server) without manual modifications."
        }
      ],
      code: `# Ready to build clean, maintainable enterprise projects!
# mvn clean package`,
      visualizerType: "jvm"
    }
  ]
};
