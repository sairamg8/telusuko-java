export default {
  id: 14,
  title: "File IO & Serialization",
  range: "128-139",
  concepts: [
    {
      id: 128,
      title: "Fundamentals Before IO Operation",
      intro: "Understanding Streams, Bytes, and Characters.",
      explanation: "Java handles Input/Output operations using Streams (sequences of data). 1. Byte Streams (InputStream/OutputStream) read/write raw binary data (1 byte at a time, e.g., images). 2. Character Streams (Reader/Writer) handle character text data using encoding (2 bytes at a time, e.g., text files).",
      gotchas: [
        "Do not use Byte Streams for text files containing special symbols, as it might read half characters, corrupting character encoding."
      ],
      interviewQuestions: [
        {
          question: "Differentiate between Byte Streams and Character Streams.",
          answer: "Byte Streams handle 8-bit bytes (InputStream/OutputStream). Character Streams handle 16-bit characters (Reader/Writer) and automatically handle unicode encoding."
        }
      ],
      code: `// InputStream: reads raw bytes
// Reader: reads Unicode characters`,
      visualizerType: "jvm"
    },
    {
      id: 129,
      title: "Creating Files and Directories",
      intro: "Getting references and spawning files in storage.",
      explanation: "The `java.io.File` class represents system file and directory pathnames. Note: creating a File object does NOT create a physical file on disk. You must call `f.createNewFile()` or `f.mkdir()` to initialize them physically.",
      gotchas: [
        "Paths can be absolute or relative. Relative paths resolve starting from the directory where the JVM process was launched (project root)."
      ],
      interviewQuestions: [
        {
          question: "Does 'new File(\"data.txt\")' create a file on disk?",
          answer: "No. It only creates a File object representation in heap memory. To create the actual file on disk, you must invoke the createNewFile() method."
        }
      ],
      code: `java.io.File file = new java.io.File("sample.txt");
if (!file.exists()) {
    file.createNewFile(); // creates on disk
}`,
      visualizerType: "jvm"
    },
    {
      id: 130,
      title: "More on the File Class",
      intro: "Querying metadata: sizes, absolute paths, and lists.",
      explanation: "The File class provides methods to query file systems: `length()` (size in bytes), `getAbsolutePath()`, `canWrite()`, `isDirectory()`, and `list()` (to fetch files inside a directory).",
      gotchas: [
        "File.length() returns 0 if the file does not exist, or if it is a directory. Verify exists() and isFile() first."
      ],
      interviewQuestions: [
        {
          question: "How do you list all files inside a directory in Java?",
          answer: "Use the list() method of File class which returns a String[], or listFiles() which returns a File[] containing children."
        }
      ],
      code: `java.io.File dir = new java.io.File("src");
if (dir.isDirectory()) {
    String[] files = dir.list();
}`,
      visualizerType: "jvm"
    },
    {
      id: 131,
      title: "Writing Data Using FileWriter",
      intro: "Outputting text to storage files.",
      explanation: "`FileWriter` writes character streams. Syntactically: `new FileWriter(file, append)`. Setting `append = true` adds content at the end of the file rather than clearing previous data.",
      gotchas: [
        "FileWriter writes characters directly. It doesn't buffer writes, resulting in frequent disk writes which can slow down execution."
      ],
      interviewQuestions: [
        {
          question: "How do you append data to an existing file using FileWriter?",
          answer: "By passing a second boolean argument set to true in the FileWriter constructor: new FileWriter(\"test.txt\", true)."
        }
      ],
      code: `try (java.io.FileWriter fw = new java.io.FileWriter("notes.txt", true)) {
    fw.write("Writing text data\\n");
} catch (java.io.IOException e) {
    e.printStackTrace();
}`,
      visualizerType: "jvm"
    },
    {
      id: 132,
      title: "Reading Data Using FileReader",
      intro: "Ingesting text files character by character.",
      explanation: "`FileReader` reads character files. Calling `read()` retrieves one character value as an integer. It returns `-1` once the end of file (EOF) is reached.",
      gotchas: [
        "FileReader.read() returns an int! You must cast it to `char` (e.g. `(char) data`) to print or store it as text."
      ],
      interviewQuestions: [
        {
          question: "What does FileReader.read() return when it reaches the end of the file?",
          answer: "It returns -1, indicating there are no more characters to read from the stream."
        }
      ],
      code: `try (java.io.FileReader fr = new java.io.FileReader("notes.txt")) {
    int val;
    while ((val = fr.read()) != -1) {
        System.out.print((char) val);
    }
} catch (java.io.IOException e) {
    e.printStackTrace();
}`,
      visualizerType: "jvm"
    },
    {
      id: 133,
      title: "BufferedWriter and FileWriter",
      intro: "Buffering character outputs for speed.",
      explanation: "`BufferedWriter` buffers character output, storing characters in a memory array (default 8KB) and writing them to disk in single batches. It minimizes CPU-disk context switches.",
      gotchas: [
        "Always call `flush()` or `close()` on your BufferedWriter, otherwise the buffered data might remain in memory and never be written to disk."
      ],
      interviewQuestions: [
        {
          question: "Why should we use BufferedWriter instead of FileWriter directly?",
          answer: "Because writing directly to disk using FileWriter has high overhead. BufferedWriter stores characters in memory and writes them in batches, improving performance."
        }
      ],
      code: `java.io.FileWriter fw = new java.io.FileWriter("notes.txt");
java.io.BufferedWriter bw = new java.io.BufferedWriter(fw);
bw.write("Buffered data line.");
bw.newLine(); // OS-independent newline
bw.close(); // flushes and closes`,
      visualizerType: "jvm"
    },
    {
      id: 134,
      title: "BufferedReader and FileReader",
      intro: "Reading text files efficiently line by line.",
      explanation: "`BufferedReader` wraps around FileReader. It reads chunks of text from disk into a memory buffer and provides the extremely useful method `readLine()`, which reads a complete text line at a time.",
      gotchas: [
        "readLine() returns `null` once it reaches the end of the file (unlike FileReader.read() which returns -1)."
      ],
      interviewQuestions: [
        {
          question: "What method does BufferedReader provide to read full lines of text?",
          answer: "The readLine() method, which returns a String containing the line contents without the line-termination characters, or null if EOF is reached."
        }
      ],
      code: `try (java.io.BufferedReader br = new java.io.BufferedReader(new java.io.FileReader("notes.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (java.io.IOException e) {
    e.printStackTrace();
}`,
      visualizerType: "jvm"
    },
    {
      id: 135,
      title: "Write Operation with PrintWriter",
      intro: "Formatted string writes inside file streams.",
      explanation: "`PrintWriter` is the most convenient text writer. It provides helper methods (like print, println, and format/printf) matching `System.out` formatting capabilities.",
      gotchas: [
        "PrintWriter suppresses checked IOExceptions internally. You must call `checkError()` to verify if writing has failed."
      ],
      interviewQuestions: [
        {
          question: "Does PrintWriter throw IOException?",
          answer: "No. PrintWriter handles checked IOExceptions internally. To check if an error occurred, you must call checkError()."
        }
      ],
      code: `try (java.io.PrintWriter pw = new java.io.PrintWriter(new java.io.FileWriter("log.txt"))) {
    pw.printf("Error Code: %d, Message: %s\\n", 500, "Failed");
}`,
      visualizerType: "jvm"
    },
    {
      id: 136,
      title: "Serialization & Deserialization Introduction",
      intro: "Preserving object states across network boundaries and shutdowns.",
      explanation: "Serialization is the mechanism of converting the state of an object into a byte stream. Deserialization is the reverse process, recreating the object in JVM memory. It permits saving states or sending objects over networks.",
      gotchas: [
        "Only objects of classes implementing the `java.io.Serializable` marker interface can be serialized. Implementing it does not require writing methods."
      ],
      interviewQuestions: [
        {
          question: "What is serialization in Java?",
          answer: "It is the process of converting an object's heap state into a binary byte stream so it can be saved to disk, database, or sent over a network."
        }
      ],
      code: `// To make an object serializable:
class User implements java.io.Serializable {}`,
      visualizerType: "jvm"
    },
    {
      id: 137,
      title: "Serialization",
      intro: "Writing heap objects into files.",
      explanation: "Using `ObjectOutputStream` wrapped around a file output stream, we call the `writeObject()` method to write the object's instance variable values to disk.",
      gotchas: [
        "If a serializable class holds a reference to a non-serializable object, the serialization process will fail at runtime, throwing a NotSerializableException."
      ],
      interviewQuestions: [
        {
          question: "What happens if a parent class implements Serializable but the child does not?",
          answer: "The child class is automatically serializable. If the parent is NOT serializable but the child is, parent fields won't be serialized unless the parent has a default constructor."
        }
      ],
      code: `User u = new User();
try (java.io.ObjectOutputStream oos = new java.io.ObjectOutputStream(new java.io.FileOutputStream("user.ser"))) {
    oos.writeObject(u); // writes object state
}`,
      visualizerType: "memory"
    },
    {
      id: 138,
      title: "Deserialization",
      intro: "Reconstituting binary files back into heap memory.",
      explanation: "Using `ObjectInputStream`, we invoke `readObject()`. This creates the object dynamically in the heap and populates its fields from the binary file. Note: constructors of serializable classes are NOT invoked during deserialization.",
      gotchas: [
        "A class's `serialVersionUID` is a version number. If the class definition changes (e.g. adding fields) after serialization, deserializing with a mismatched serialVersionUID throws an InvalidClassException."
      ],
      interviewQuestions: [
        {
          question: "What is serialVersionUID and why is it important?",
          answer: "It is a unique identifier version stamp for Serializable classes. JVM checks it during deserialization to verify that the loaded class matches the serialized object state."
        }
      ],
      code: `try (java.io.ObjectInputStream ois = new java.io.ObjectInputStream(new java.io.FileInputStream("user.ser"))) {
    User u = (User) ois.readObject(); // safe type casting
}`,
      visualizerType: "memory"
    },
    {
      id: 139,
      title: "Transient Keyword",
      intro: "Selective serialization: omitting sensitive parameters.",
      explanation: "Marking instance variables with the `transient` keyword instructs the JVM serialization engine to skip writing them. When deserialized, transient variables get their default values (0, null, or false).",
      gotchas: [
        "Static variables are also not serialized, as they belong to the class rather than individual object instances. Do not mark them transient; they are bypassed naturally."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of the transient keyword?",
          answer: "It is used on instance fields to prevent them from being serialized (e.g., omitting passwords, security tokens, or heavyweight DB connection pools)."
        }
      ],
      code: `class UserProfile implements java.io.Serializable {
    String username;
    transient String password; // skipped! Will deserialize as null
}`,
      visualizerType: "memory"
    }
  ]
};
