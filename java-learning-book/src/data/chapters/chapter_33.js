export default {
  id: 33,
  title: "Spring AI & Vector Databases",
  range: "529-588",
  concepts: [
    {
      id: 529,
      title: "Spring AI Introduction",
      intro: "An abstract framework to integrate Artificial Intelligence features into Spring applications.",
      explanation: "Spring AI is an application framework designed to simplify the integration of artificial intelligence features into Java enterprise applications. It provides a standardized API to interact with diverse AI models (like OpenAI, Anthropic, Ollama, Hugging Face) without coupling your business logic to a specific provider's proprietary SDK.",
      gotchas: ["Spring AI requires modern Spring Boot versions (usually 3.2.x or 3.3.x+) and Java 17+."],
      interviewQuestions: [{
        question: "What is Spring AI?",
        answer: "Spring AI is a Spring framework module that provides an abstract, unified API interface for connecting Java applications to artificial intelligence models, vector databases, and cognitive services."
      }],
      code: `// Key Interfaces in Spring AI:
// - ChatModel (Generative Text)
// - EmbeddingModel (Vector Embeddings)
// - ImageModel (Image Generation)`,
      visualizerType: "null"
    },
    {
      id: 530,
      title: "Why Spring AI",
      intro: "Avoiding vendor lock-in and leveraging Spring's dependency injection for AI clients.",
      explanation: "Without Spring AI, developers would have to write custom HTTP clients or import vendor-specific SDKs (like OpenAI's python/node clients) for each model. If you decided to switch from OpenAI to Anthropic Claude, you would need to rewrite substantial parts of your code. Spring AI uses Spring's standard Dependency Injection, Interfaces, and Auto-configurations to let you swap models with simple properties changes.",
      gotchas: ["Some models support features (like function calling) differently. Moving between models might require prompt adjustments."],
      interviewQuestions: [{
        question: "Why should we use Spring AI instead of direct REST API calls to OpenAI?",
        answer: "Spring AI abstracts the HTTP communication, JSON parsing, and authentication, providing a clean Java interface. It also lets you swap the underlying AI provider (e.g., from OpenAI to local Ollama) by changing configurations, rather than rewrite code."
      }],
      code: `// Injecting ChatModel interface via Spring Dependency Injection
@Autowired
private ChatModel chatModel;`,
      visualizerType: "null"
    },
    {
      id: 531,
      title: "Spring AI Docs",
      intro: "Accessing reference documentation and dependency repositories.",
      explanation: "Spring AI is currently hosted in the Spring Milestone Repository since it is evolving rapidly. The official documentation (docs.spring.io/spring-ai/reference/) details configurations, supported models, vector stores, output parsers, and prompt engineering utilities.",
      gotchas: ["Because Spring AI is in active development, APIs can change between minor releases. Always check your version's specific docs."],
      interviewQuestions: [{
        question: "Where are Spring AI dependencies hosted?",
        answer: "During its milestone/snapshot phases, Spring AI dependencies are hosted on the Spring Milestone Repository (https://repo.spring.io/milestone) rather than Maven Central, requiring specific repository configuration in pom.xml."
      }],
      code: `<!-- Spring Milestone Repository config in pom.xml -->
<repositories>
    <repository>
        <id>spring-milestones</id>
        <url>https://repo.spring.io/milestone</url>
    </repository>
</repositories>`,
      visualizerType: "null"
    },
    {
      id: 532,
      title: "Stable Version Update",
      intro: "Upgrading Spring AI dependencies to stable releases.",
      explanation: "To keep up with bug fixes and stable performance, you must manage your Spring Boot and Spring AI versions. Using the Spring AI Bill of Materials (BOM) helps align versions of various AI integrations (OpenAI, PGVector, etc.) to a compatible baseline.",
      gotchas: ["Mismatched Spring Boot and Spring AI versions will result in ClassNotFoundException or BeanCreationException during startup."],
      interviewQuestions: [{
        question: "What is the purpose of Spring AI BOM (Bill of Materials)?",
        answer: "The BOM manages dependency versions for all Spring AI modules. You import the BOM once in the dependencyManagement section, and then add individual starters without specifying versions, avoiding version mismatch conflicts."
      }],
      code: `<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-bom</artifactId>
            <version>1.0.0-M1</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>`,
      visualizerType: "null"
    },
    {
      id: 533,
      title: "Creating A Spring AI Project",
      intro: "Configuring Maven build with Spring Initializr and starters.",
      explanation: "Create a Spring Boot project via Spring Initializr (start.spring.io), choosing Java 17+, Spring Boot 3.x, and selecting 'Spring AI' starters (like OpenAI or Ollama). The generator configures the BOM, repositories, and dependency declarations in pom.xml.",
      gotchas: ["Double check that your JDK version in your IDE matches Java 17 or 21, as Spring Boot 3.x does not support Java 8 or 11."],
      interviewQuestions: [{
        question: "Which starter is used for OpenAI integration in Spring AI?",
        answer: "The starter dependency is 'spring-ai-openai-starter'."
      }],
      code: `<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-starter</artifactId>
</dependency>`,
      visualizerType: "null"
    },
    {
      id: 534,
      title: "Create OpenAI API Key",
      intro: "Obtaining access keys from the OpenAI developer dashboard.",
      explanation: "To use OpenAI models, register at platform.openai.com, navigate to API Keys, and generate a new secret key. This key is used to authenticate your application's requests. Export it as an environment variable named 'SPRING_AI_OPENAI_API_KEY' which Spring AI reads automatically.",
      gotchas: ["Do not paste the API key directly into application.properties or commit it to Git. If leaked, OpenAI will revoke the key."],
      interviewQuestions: [{
        question: "How does Spring AI auto-detect your OpenAI credentials?",
        answer: "By looking for the environment variable 'SPRING_AI_OPENAI_API_KEY' or the application property 'spring.ai.openai.api-key' at application startup."
      }],
      code: `# Set environment variable in Linux/macOS:
export SPRING_AI_OPENAI_API_KEY='sk-proj-xxxxxxxx'

# Set environment variable in Windows CLI:
set SPRING_AI_OPENAI_API_KEY=sk-proj-xxxxxxxx`,
      visualizerType: "null"
    },
    {
      id: 535,
      title: "Asking Questions to OpenAI Models",
      intro: "Simple call to generate text response using ChatModel.",
      explanation: "The simplest way to interact with an AI model is injecting the 'ChatModel' bean (previously called ChatClient in early pre-releases) and invoking its 'call()' method with a user prompt string. The framework sends the request to OpenAI and returns the plain text response.",
      gotchas: ["The call() method blocks the current execution thread waiting for the HTTP response from OpenAI."],
      interviewQuestions: [{
        question: "What is the primary method to send a prompt and get a text response using ChatModel?",
        answer: "The 'call(String message)' method in the ChatModel interface."
      }],
      code: `@RestController
public class SimpleAiController {
    private final ChatModel chatModel;

    public SimpleAiController(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/ask")
    public String ask(@RequestParam String question) {
        return chatModel.call(question);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 536,
      title: "Working with ChatClient",
      intro: "Using ChatClient as the primary developer-facing fluent interface.",
      explanation: "While ChatModel represents the direct API client integration, Spring AI provides the 'ChatClient' class as a high-level fluent API builder interface. It allows developers to construct prompts, bind system instructions, pass parameters, and parse structured output using builder patterns.",
      gotchas: ["Do not confuse the interface 'ChatModel' (which acts as the engine wrapper) with 'ChatClient' (which is the fluent developer interface)."],
      interviewQuestions: [{
        question: "What is ChatClient in Spring AI?",
        answer: "ChatClient is a fluent client wrapper class that simplifies building complex prompts, defining system messages, adding context advisors, and configuring output formats."
      }],
      code: `// Simple ChatClient usage:
String response = chatClient.prompt()
    .user("Explain gravity in one sentence")
    .call()
    .content();`,
      visualizerType: "jvm"
    },
    {
      id: 537,
      title: "ChatResponse and Metadata",
      intro: "Extracting metadata, token usage, and system statistics from AI responses.",
      explanation: "When you call an AI model, you get back more than just a string response. By invoking '.chatResponse()' on the ChatClient call, you retrieve a 'ChatResponse' object containing a list of Generation choices and metadata (like prompt tokens, generation tokens, and model type used).",
      gotchas: ["Token usage details are model-specific; some local models run on Ollama do not report usage tokens in the same metadata format."],
      interviewQuestions: [{
        question: "How do you track token usage in Spring AI?",
        answer: "By calling the chatModel's prompt execution to return a ChatResponse, then invoking response.getMetadata().getUsage() to retrieve prompt and generation token counts."
      }],
      code: `ChatResponse response = chatModel.call(new Prompt("Hello"));
long promptTokens = response.getMetadata().getUsage().getPromptTokens();
long generationTokens = response.getMetadata().getUsage().getGenerationTokens();
String text = response.getResult().getOutput().getContent();`,
      visualizerType: "jvm"
    },
    {
      id: 538,
      title: "ChatClient Builder",
      intro: "Instantiating and configuring ChatClient instances using ChatClient.Builder.",
      explanation: "In modern Spring AI, you instantiate a ChatClient by injecting a pre-configured 'ChatClient.Builder' bean. This allows you to configure default system prompts, default advisors, and fallback parameters per instance of your service, rather than configuring them for every request.",
      gotchas: ["Do not instantiate ChatClient manually via 'new ChatClient()'; always inject the builder to preserve auto-configured credentials and HTTP clients."],
      interviewQuestions: [{
        question: "How do you create a ChatClient instance in Spring AI?",
        answer: "Inject the auto-configured ChatClient.Builder bean and use its builder methods (e.g., builder.defaultSystem(\"System prompt\").build())."
      }],
      code: `@Service
public class ChatService {
    private final ChatClient chatClient;

    public ChatService(ChatClient.Builder builder) {
        this.chatClient = builder
            .defaultSystem("You are a helpful programming tutor.")
            .build();
    }

    public String getAnswer(String userMsg) {
        return chatClient.prompt().user(userMsg).call().content();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 539,
      title: "Spring AI Memory Advisor",
      intro: "Injecting conversation history and chat memory into LLM requests automatically.",
      explanation: "LLMs are stateless; they do not remember previous messages in a conversation. Spring AI solves this using Chat Memory Advisors (e.g., 'MessageChatMemoryAdvisor'). It stores messages in a 'ChatMemory' bank and automatically appends relevant historical turns to the prompt on subsequent requests.",
      gotchas: ["Memory consumes prompt tokens. If the conversation is long, it can exceed context length limits. Clear or truncate memory periodically."],
      interviewQuestions: [{
        question: "How does Spring AI support conversation memory in stateless LLMs?",
        answer: "By utilizing ChatMemory implementations (like InMemoryChatMemory) along with a MessageChatMemoryAdvisor registered in the ChatClient, which automatically retrieves and appends previous chat history to the prompt."
      }],
      code: `@Configuration
public class MyChatConfig {
    @Bean
    public ChatMemory chatMemory() {
        return new InMemoryChatMemory();
    }
}
// Inside Controller:
this.chatClient = builder
    .defaultAdvisors(new MessageChatMemoryAdvisor(chatMemory))
    .build();`,
      visualizerType: "memory"
    },
    {
      id: 540,
      title: "Running Model Locally With Ollama",
      intro: "Installing Ollama and running open-source LLMs locally.",
      explanation: "Ollama is a lightweight application that runs large language models (LLMs) locally on your hardware. After downloading Ollama, run commands in your terminal to download and start open-source models like Llama3, Mistral, or Gemma, removing dependency on paid APIs.",
      gotchas: ["Running LLMs locally requires substantial RAM and VRAM (GPU). 8B parameter models require at least 8GB to 16GB of RAM to run smoothly."],
      interviewQuestions: [{
        question: "What is Ollama?",
        answer: "Ollama is an open-source tool that allows developers to run, manage, and interact with Large Language Models locally on macOS, Linux, and Windows."
      }],
      code: `# Command to install and run llama3 model locally:
# ollama run llama3

# Check active local models:
# ollama list`,
      visualizerType: "null"
    },
    {
      id: 541,
      title: "Spring AI With Ollama",
      intro: "Configuring Spring AI to communicate with your local Ollama runtime.",
      explanation: "To direct Spring AI to use local models instead of OpenAI, add the 'spring-ai-ollama-starter' dependency and set properties in application.properties pointing to the local host (usually port 11434) and specifying the local model name.",
      gotchas: ["Ollama must be running in the background on the specified port, or your Spring Boot app will fail to start due to HTTP connection errors."],
      interviewQuestions: [{
        question: "How do you switch a Spring AI application from OpenAI to local Ollama?",
        answer: "Replace the 'spring-ai-openai-starter' with 'spring-ai-ollama-starter' and configure the 'spring.ai.ollama.base-url' and 'spring.ai.ollama.chat.options.model' properties."
      }],
      code: `# application.properties for Ollama connection
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.options.model=llama3`,
      visualizerType: "null"
    },
    {
      id: 542,
      title: "Prompt Template",
      intro: "Creating parameterized reusable prompt templates.",
      explanation: "Prompt Templates represent parameterized prompts, acting like formatted strings in Java. By writing templates with placeholders (e.g. {topic} or {language}), you separate the prompt structure from the dynamic input variables passed by users.",
      gotchas: ["Ensure placeholder names in your prompt string match the keys provided in the parameter map, otherwise they remain unrendered."],
      interviewQuestions: [{
        question: "What is a PromptTemplate?",
        answer: "It is a class in Spring AI that allows developers to write structured, reusable prompt text containing variable placeholders, which are dynamically replaced with runtime arguments before sending to the model."
      }],
      code: `// Define prompt template with placeholder
String templateStr = "Write a short poem about {topic} in {style} style.";
PromptTemplate template = new PromptTemplate(templateStr);`,
      visualizerType: "jvm"
    },
    {
      id: 543,
      title: "Implementing Prompt Template",
      intro: "Rendering variables and sending prompts via ChatModel.",
      explanation: "To implement the PromptTemplate, instantiate it, call '.create(Map.of(\"key\", value))' to bind the variables, and pass the generated 'Prompt' object to the ChatModel. This converts the placeholders into the actual text sent to the LLM.",
      gotchas: ["Always sanitise user input that goes into prompt templates to prevent prompt injection attacks."],
      interviewQuestions: [{
        question: "How do you render variables in PromptTemplate and execute it?",
        answer: "By calling template.create(Map.of(\"variableName\", variableValue)) to get a Prompt object, then executing chatModel.call(prompt)."
      }],
      code: `PromptTemplate promptTemplate = new PromptTemplate("Explain {concept} to a {audience}.");
Prompt prompt = promptTemplate.create(Map.of(
    "concept", "Recursion",
    "audience", "5 year old"
));
String result = chatModel.call(prompt).getResult().getOutput().getContent();`,
      visualizerType: "jvm"
    },
    {
      id: 544,
      title: "What Are Embeddings?",
      intro: "Converting text chunks into numerical coordinate arrays in vector space.",
      explanation: "Vector Embeddings are numerical representations of concepts, words, or documents. An embedding model converts text into a high-dimensional array of numbers (floats). The semantic meaning is preserved because words with similar contexts are mapped closer together in this vector coordinate space.",
      gotchas: ["Different embedding models generate vectors of different dimensions. You cannot compare vectors generated by two different models."],
      interviewQuestions: [{
        question: "What is an embedding vector?",
        answer: "An embedding vector is a list of floating-point numbers representing the semantic meaning of a text chunk, generated by an embedding model. Similar texts produce vectors that are geometrically close in vector space."
      }],
      code: `// Concept representation:
// "King" -> [0.23, -0.45, 0.98, ..., 0.01] (e.g. 1536 dimensions)
// "Queen" -> [0.21, -0.42, 0.95, ..., 0.02]`,
      visualizerType: "null"
    },
    {
      id: 545,
      title: "Embedding Using API Client",
      intro: "Directly calling OpenAI API to generate text vectors.",
      explanation: "You can request vector coordinates directly by making calls to OpenAI's embeddings endpoint. In Spring AI, this is automated via the 'EmbeddingModel' interface which handles HTTP calls and serializes the floats arrays.",
      gotchas: ["Generating embeddings for huge text structures can consume millions of tokens. Implement batching for large document loads."],
      interviewQuestions: [{
        question: "Which model does OpenAI recommend for general purpose text embeddings?",
        answer: "'text-embedding-3-small' or the older 'text-embedding-ada-002'."
      }],
      code: `# application.properties configuration
spring.ai.openai.embedding.options.model=text-embedding-3-small`,
      visualizerType: "null"
    },
    {
      id: 546,
      title: "Embedding Using Spring AI",
      intro: "Generating embeddings in Java using the EmbeddingModel interface.",
      explanation: "Inject the 'EmbeddingModel' bean into your Java class. Call 'embeddingModel.embed(text)' to get a List of Float numbers. You can also send multiple texts in a batch to get a matrix response containing multiple vectors.",
      gotchas: ["Ensure your API key has credits, as embedding models (while cheap) still charge per token processed."],
      interviewQuestions: [{
        question: "How do you generate an embedding for a string using Spring AI?",
        answer: "Inject the EmbeddingModel bean and call its 'embed(String text)' method, which returns a List<Double> or float[] representing the vector coordinates."
      }],
      code: `@RestController
public class EmbeddingController {
    private final EmbeddingModel embeddingModel;

    public EmbeddingController(EmbeddingModel embeddingModel) {
        this.embeddingModel = embeddingModel;
    }

    @GetMapping("/embed")
    public List<Double> embedText(@RequestParam String text) {
        return embeddingModel.embed(text);
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 547,
      title: "What Is Cosine Similarity",
      intro: "Measuring the semantic angle between two text vectors.",
      explanation: "Cosine Similarity calculates the cosine of the angle between two high-dimensional vectors. It measures directional orientation rather than magnitude. A cosine similarity close to 1.0 indicates the texts are highly related in meaning, whereas a score near 0 or -1 indicates complete dissimilarity.",
      gotchas: ["Cosine similarity depends on normalized vectors. If the dimensions do not match, you cannot compute the similarity score."],
      interviewQuestions: [{
        question: "How is Cosine Similarity used in search engines?",
        answer: "By converting both the user's search query and database documents into embedding vectors. Computing the cosine similarity between the query vector and document vectors identifies the most semantically relevant documents."
      }],
      code: `// Cosine Similarity Formula:
// CosineSimilarity(A, B) = (A . B) / (||A|| * ||B||)`,
      visualizerType: "null"
    },
    {
      id: 548,
      title: "Cosine Similarity Implementation",
      intro: "Calculating similarity in Java using dot products.",
      explanation: "You can write a simple Java method to calculate cosine similarity by multiplying matching index values (dot product) and dividing by the product of their Euclidean lengths (norms). Spring AI provides helper utilities like 'CosineSimilarity' to calculate this directly.",
      gotchas: ["Computing cosine similarity in memory using raw Java loops becomes too slow when handling millions of document vectors. Use a vector database instead."],
      interviewQuestions: [{
        question: "How do you programmatically compute vector similarity in Spring AI?",
        answer: "Spring AI offers helper classes, such as 'CosineSimilarity.sim(double[] v1, double[] v2)', to calculate the similarity index directly."
      }],
      code: `double[] v1 = {0.1, 0.2, 0.3};
double[] v2 = {0.1, 0.2, 0.4};
// Direct similarity utility call
double score = org.springframework.ai.util.CosineSimilarity.sim(v1, v2);`,
      visualizerType: "jvm"
    },
    {
      id: 549,
      title: "Vector Database Introduction",
      intro: "Understanding storage engines optimized for index-searching vector coordinate arrays.",
      explanation: "Standard relational databases search using keys and indexes on strings or numbers. A Vector Database is specialized to index, store, and query high-dimensional vector embeddings. It uses advanced mathematical index structures (like HNSW) to search through millions of vectors in milliseconds based on distance metrics.",
      gotchas: ["Vector databases are not meant for standard transactional (ACID) record writing; they act as search engines for AI contextual data."],
      interviewQuestions: [{
        question: "Why do we need specialized Vector Databases?",
        answer: "Because standard SQL database indexes (like B-Trees) cannot index multi-dimensional coordinates. Vector databases use specialized indexes like HNSW to perform fast Approximate Nearest Neighbor (ANN) searches."
      }],
      code: `// Common Vector Databases:
// - Pinecone, Milvus, Chroma
// - PGVector (Postgres extension)
// - Redis Vector Search`,
      visualizerType: "null"
    },
    {
      id: 550,
      title: "Simple Vector Store",
      intro: "Using Spring AI's in-memory SimpleVectorStore for lightweight prototyping.",
      explanation: "For local testing, Spring AI includes 'SimpleVectorStore', an in-memory database. It stores vectors in a simple Java Map. You can write your vector store contents to a JSON file on disk and reload it at startup.",
      gotchas: ["SimpleVectorStore is volatile and single-threaded. It is not suitable for production deployment with concurrent users or huge datasets."],
      interviewQuestions: [{
        question: "What is SimpleVectorStore in Spring AI?",
        answer: "An in-memory VectorStore implementation provided by Spring AI for local testing, development, and small-scale prototypes. It can serialize and deserialize its data to a local file."
      }],
      code: `@Bean
public VectorStore vectorStore(EmbeddingModel embeddingModel) {
    SimpleVectorStore store = new SimpleVectorStore(embeddingModel);
    // Optionally load from a pre-saved file:
    // store.load(new File("my_vectors.json"));
    return store;
}`,
      visualizerType: "jvm"
    },
    {
      id: 551,
      title: "Token Text Splitter",
      intro: "Splitting long documents into manageable chunks for vector generation.",
      explanation: "Large documents exceed LLM input limits. To index them, you must split them into smaller parts ('chunks'). Spring AI provides the 'TokenTextSplitter' which splits text based on token limits (rather than character counts), ensuring each chunk fits inside the embedding model limits.",
      gotchas: ["Ensure you configure a chunk overlap (e.g. 20 tokens) so that concepts split across borders are not lost in context boundaries."],
      interviewQuestions: [{
        question: "Why should you use TokenTextSplitter instead of simple string splitting?",
        answer: "Tokens represent how LLMs read text. TokenTextSplitter ensures that document chunks do not exceed token capacity limits of the embedding and chat models, while maintaining context overlap."
      }],
      code: `TokenTextSplitter splitter = new TokenTextSplitter(
    100, // chunk size (max tokens per chunk)
    20,  // overlap size (tokens copied between adjacent chunks)
    10,  // max chunks
    10000, // min chunk characters
    true // keep delimiters
);
List<Document> chunks = splitter.apply(List.of(new Document("Huge document text...")));`,
      visualizerType: "jvm"
    },
    {
      id: 552,
      title: "PGvector Store Introduction",
      intro: "Enabling vector search natively inside PostgreSQL databases.",
      explanation: "PGvector is an open-source extension for PostgreSQL that allows you to store, index, and query vector embeddings alongside your relational database tables. It introduces the 'vector' data type and custom operators (like '<=>' for cosine distance) to perform vector searches directly inside SQL queries.",
      gotchas: ["You must install the pgvector extension on the Postgres server itself; simply adding the driver dependency is not enough."],
      interviewQuestions: [{
        question: "What is pgvector?",
        answer: "pgvector is a PostgreSQL extension that adds native support for vector storage, similarity indexing, and distance metric querying within standard SQL schemas."
      }],
      code: `-- SQL command to enable pgvector extension in PostgreSQL:
CREATE EXTENSION IF NOT EXISTS vector;`,
      visualizerType: "null"
    },
    {
      id: 553,
      title: "PGvector Setup",
      intro: "Configuring PGVector dependencies and Docker containers.",
      explanation: "To use PGVector in Spring AI, pull a PostgreSQL Docker image that comes pre-packaged with the pgvector extension. Then, include the 'spring-ai-pgvector-store-starter' dependency in your project pom.xml file.",
      gotchas: ["Standard official postgres docker images do not contain pgvector. Use 'ankane/pgvector' or similar images."],
      interviewQuestions: [{
        question: "Which database port does PgVector run on?",
        answer: "It runs on the standard PostgreSQL port 5432."
      }],
      code: `<!-- Maven dependency for PgVector Store -->
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-pgvector-store-starter</artifactId>
</dependency>`,
      visualizerType: "null"
    },
    {
      id: 554,
      title: "PGvector Implementation",
      intro: "Storing and querying document vectors inside PgVector using Spring AI.",
      explanation: "Configure connection details in application.properties. Spring AI will auto-wire the 'PgVectorStore' bean. You add documents using 'vectorStore.add(documents)' and query using 'vectorStore.similaritySearch(query)'.",
      gotchas: ["Make sure the vector column dimensions in your Postgres schema match the output dimension of the selected EmbeddingModel."],
      interviewQuestions: [{
        question: "How do you query documents from PGVector store using Spring AI?",
        answer: "By calling vectorStore.similaritySearch(SearchRequest.query(question).withTopK(3)) which returns the top 3 semantically closest documents."
      }],
      code: `# application.properties setup for PGVector
spring.ai.vectorstore.pgvector.initialize-schema=true
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=password`,
      visualizerType: "jvm"
    },
    {
      id: 555,
      title: "Redis Vector Store Config",
      intro: "Configuring Redis Search as a fast, in-memory vector database.",
      explanation: "Redis supports vector database functionality through the Redis Search module. To connect Spring AI to Redis, add the 'spring-ai-redis-store-starter' dependency and set properties referencing the Redis host, port, index name, and embedding settings.",
      gotchas: ["Redis vector search requires Redis Stack or Redis Enterprise with the RediSearch module. Normal standard Redis won't work."],
      interviewQuestions: [{
        question: "What module must be enabled in Redis to perform vector searches?",
        answer: "The RediSearch module (which is included in Redis Stack)."
      }],
      code: `# Redis Vector Store properties
spring.ai.vectorstore.redis.uri=redis://localhost:6379
spring.ai.vectorstore.redis.index=telusuko-index`,
      visualizerType: "null"
    },
    {
      id: 556,
      title: "Redis Vector Store Implementation",
      intro: "Adding and retrieving documents in Redis Search index.",
      explanation: "Once configured, Spring AI auto-configures the 'RedisVectorStore' bean. Using this bean, your application can index text documents, calculate embeddings, save them to Redis, and query them based on similarity thresholds.",
      gotchas: ["Ensure that you define the index schema correctly; if dimensions do not match your embedding model, Redis returns indexing errors."],
      interviewQuestions: [{
        question: "How does Redis Vector Store determine vector distance?",
        answer: "By default, Redis Search allows calculating Cosine similarity, L2 distance, or Inner Product (IP) depending on index configuration."
      }],
      code: `@Autowired
private VectorStore vectorStore;

public void saveProductDoc(Product product) {
    Document doc = new Document("ID: " + product.getId() + " Description: " + product.getDescription());
    vectorStore.add(List.of(doc));
}`,
      visualizerType: "jvm"
    },
    {
      id: 557,
      title: "What Is RAG?",
      intro: "Retrieval-Augmented Generation: Supplying external facts to context window.",
      explanation: "RAG is a technique to optimize LLM outputs by querying external databases (like vector stores) for relevant context before calling the LLM. Rather than relying on the model's static training data, the application searches for facts, appends them to the prompt as context, and asks the model to formulate a response based on those facts.",
      gotchas: ["If your search query retrieves irrelevant documents, the model might produce incorrect answers based on that bad context (hallucination)."],
      interviewQuestions: [{
        question: "Explain the workflow of RAG (Retrieval-Augmented Generation).",
        answer: "1. The user asks a question. 2. The application converts the query to an embedding vector. 3. Query vector is compared against a vector store to retrieve relevant text chunks. 4. Retrieved chunks are inserted into a prompt template as context. 5. The combined prompt is sent to the LLM to generate the final accurate answer."
      }],
      code: `// RAG Flow:
// User Query -> Vector Store Search -> Context Retrieval -> LLM Generation`,
      visualizerType: "null"
    },
    {
      id: 558,
      title: "RAG Implementation",
      intro: "Combining vector search and ChatClient to implement a RAG pipeline.",
      explanation: "In Java, write a service that accepts a user question, calls 'vectorStore.similaritySearch(question)', maps the retrieved document contents into a context string, binds this string into a prompt template, and sends the rendered prompt to the ChatModel.",
      gotchas: ["Make sure to limit the number of retrieved documents (top-K) so you do not exceed the model's prompt token limit."],
      interviewQuestions: [{
        question: "How do you restrict retrieved context length in a RAG implementation?",
        answer: "By setting the topK limit in the SearchRequest (e.g., SearchRequest.query(question).withTopK(3)) to only retrieve the top 3 matches."
      }],
      code: `public String getAnswerWithRag(String query) {
    List<Document> docs = vectorStore.similaritySearch(SearchRequest.query(query).withTopK(2));
    String context = docs.stream().map(Document::getContent).collect(Collectors.joining("\\n"));
    
    PromptTemplate template = new PromptTemplate(
        "Answer the question based only on this context: \\n{context}\\n\\nQuestion: {query}"
    );
    Prompt prompt = template.create(Map.of("context", context, "query", query));
    return chatModel.call(prompt).getResult().getOutput().getContent();
}`,
      visualizerType: "jvm"
    },
    {
      id: 559,
      title: "OpenAI Image Model",
      intro: "Integrating DALL-E image generation models using ImageModel.",
      explanation: "Spring AI provides the 'ImageModel' interface for generating images. By default, it auto-configures the 'OpenAiImageModel' which connects to OpenAI's DALL-E models. You pass an 'ImagePrompt' to generate graphics based on text descriptions.",
      gotchas: ["Image generation is expensive. Each call to DALL-E 3 can cost several cents. Add access limits to prevent abuse."],
      interviewQuestions: [{
        question: "Which interface in Spring AI represents image generation capabilities?",
        answer: "The 'ImageModel' interface."
      }],
      code: `@Autowired
private ImageModel imageModel;`,
      visualizerType: "null"
    },
    {
      id: 560,
      title: "Image Prompt and Response",
      intro: "Constructing image generation requests and fetching output URLs.",
      explanation: "To generate an image, create an 'ImagePrompt' using the text description. Calling 'imageModel.call(prompt)' returns an 'ImageResponse' containing 'ImageGeneration' objects. You can extract the URL pointing to the temporary generated PNG hosted on OpenAI's servers.",
      gotchas: ["The generated image URLs returned by OpenAI expire after one hour. Copy the image to your own cloud storage if you need persistence."],
      interviewQuestions: [{
        question: "How do you extract the generated image URL from an ImageResponse?",
        answer: "By calling response.getResult().getOutput().getUrl() or response.getResults().get(0).getOutput().getUrl()."
      }],
      code: `ImageResponse response = imageModel.call(
    new ImagePrompt("A cute robotic cat programming java")
);
String imageUrl = response.getResult().getOutput().getUrl();`,
      visualizerType: "jvm"
    },
    {
      id: 561,
      title: "Image Options",
      intro: "Configuring image resolution, quality, and count settings.",
      explanation: "You can customize your image requests by passing 'OpenAiImageOptions'. You configure the image resolution (e.g. 1024x1024), quality (standard or hd), count of images, and model selection (dall-e-2 vs dall-e-3).",
      gotchas: ["DALL-E 3 only supports generating exactly 1 image per request, whereas DALL-E 2 supports multiple."],
      interviewQuestions: [{
        question: "How do you request high-definition images using OpenAiImageOptions?",
        answer: "Instantiate OpenAiImageOptions and call withQuality(\"hd\") or withModel(\"dall-e-3\") before passing to the ImagePrompt."
      }],
      code: `ImageResponse response = imageModel.call(
    new ImagePrompt("Futuristic city", 
        OpenAiImageOptions.builder()
            .withModel("dall-e-3")
            .withN(1)
            .withHeight(1024)
            .withWidth(1024)
            .withQuality("hd")
            .build())
);`,
      visualizerType: "jvm"
    },
    {
      id: 562,
      title: "Describe Image",
      intro: "Analyzing visual content using multimodal LLM inputs.",
      explanation: "Multimodal models (like GPT-4o) can accept images along with text prompts. In Spring AI, you can read local or remote images as 'Media' objects and attach them to a user message inside the prompt to ask the model questions about the image contents.",
      gotchas: ["Ensure you specify the correct mime type (e.g., image/png or image/jpeg), otherwise the API returns formatting errors."],
      interviewQuestions: [{
        question: "What class is used to attach images or files to messages in Spring AI?",
        answer: "The 'Media' class (which wraps resource objects along with their MIME type, such as image/png)."
      }],
      code: `// Media object links to an image:
// Media media = new Media(MimeTypeUtils.IMAGE_JPEG, new ClassPathResource("cat.jpg"));`,
      visualizerType: "null"
    },
    {
      id: 563,
      title: "Implementing Describe Image",
      intro: "Executing a multimodal prompt using Media resources.",
      explanation: "Create a UserMessage containing both your text query and a Media object pointing to the image. Wrap this UserMessage inside a 'Prompt' and pass it to the ChatModel. The model processes the pixels and returns the text description.",
      gotchas: ["Multimodal calls consume a high amount of input tokens based on the resolution of the image supplied."],
      interviewQuestions: [{
        question: "How do you pass an image to ChatModel in Spring AI?",
        answer: "Create a UserMessage, passing the text query and a List of Media objects containing the image resources, and execute chatModel.call(new Prompt(userMessage))."
      }],
      code: `var imageResource = new ClassPathResource("receipt.png");
var media = new Media(MimeTypeUtils.IMAGE_PNG, imageResource);
var userMessage = new UserMessage(
    "List the total price and store name from this receipt.", 
    List.of(media)
);
ChatResponse response = chatModel.call(new Prompt(userMessage));
String data = response.getResult().getOutput().getContent();`,
      visualizerType: "jvm"
    },
    {
      id: 564,
      title: "Audio Models Introduction",
      intro: "Processing voice inputs and outputs using speech models.",
      explanation: "Spring AI supports audio translation services. These are categorized into: 1. Speech-to-Text (STT) models like Whisper, which convert audio recordings into text transcriptions. 2. Text-to-Speech (TTS) models, which convert text inputs into synthesized audio binary streams.",
      gotchas: ["Audio files must conform to maximum file size limits (usually 25MB for OpenAI) and supported extensions (like mp3, wav, flac)."],
      interviewQuestions: [{
        question: "Name the two primary audio processing capabilities in Spring AI.",
        answer: "Speech-to-Text (STT) for transcription and Text-to-Speech (TTS) for audio synthesis."
      }],
      code: `// Key classes:
// - OpenAiAudioTranscriptionModel (STT)
// - OpenAiAudioSpeechModel (TTS)`,
      visualizerType: "null"
    },
    {
      id: 565,
      title: "Audio Transcription Model Speech To Text Part 1",
      intro: "Instantiating audio transcription clients in Spring Boot.",
      explanation: "To use speech-to-text, you inject the 'OpenAiAudioTranscriptionModel' bean. It connects to OpenAI's Whisper model. Ensure you have the 'spring-ai-openai-starter' active and correct API access keys.",
      gotchas: ["Ensure target audios are recorded clearly; background noise heavily degrades transcription accuracy."],
      interviewQuestions: [{
        question: "What default model does OpenAiAudioTranscriptionModel use?",
        answer: "It uses the 'whisper-1' model by default."
      }],
      code: `@Autowired
private OpenAiAudioTranscriptionModel transcriptionModel;`,
      visualizerType: "null"
    },
    {
      id: 566,
      title: "Audio STT Part 2 (Speech-to-Text)",
      intro: "Transcribing audio files to text strings using Spring AI.",
      explanation: "To transcribe, load your audio file as a Resource (e.g. ClassPathResource) and pass it to the transcriptionModel using its 'call()' method. It sends the audio bytes to the API and returns the transcribed text string.",
      gotchas: ["Reading large files from resources can block memory; load dynamically using FileSystemResource when possible."],
      interviewQuestions: [{
        question: "How do you programmatically transcribe an MP3 file in Spring AI?",
        answer: "Pass the audio file Resource to transcriptionModel.call(audioResource) to receive the text transcription."
      }],
      code: `Resource audioFile = new ClassPathResource("speech.mp3");
String transcription = transcriptionModel.call(audioFile);
System.out.println("Transcribed text: " + transcription);`,
      visualizerType: "jvm"
    },
    {
      id: 567,
      title: "Audio Transcription Options",
      intro: "Configuring languages and output formatting details in Whisper requests.",
      explanation: "Customize your transcription requests using 'OpenAiAudioTranscriptionOptions'. You can specify the output format (text, json, srt), language code (e.g., 'en' or 'es'), temperature, and custom prompt guidelines to improve transcription of jargon.",
      gotchas: ["Specifying the language explicitly speed up execution, as the model does not have to spend tokens detecting the language first."],
      interviewQuestions: [{
        question: "How do you specify the target language for transcription to prevent auto-detection delays?",
        answer: "By configuring 'OpenAiAudioTranscriptionOptions.builder().withLanguage(\"en\").build()' and passing it in the transcription request."
      }],
      code: `Resource audio = new ClassPathResource("french_lecture.wav");
var options = OpenAiAudioTranscriptionOptions.builder()
    .withLanguage("fr")
    .withResponseFormat(OpenAiAudioApi.TranscriptResponseFormat.SRT)
    .build();
// Execute with options:
// AudioTranscriptionResponse response = transcriptionModel.call(new AudioTranscriptionPrompt(audio, options));`,
      visualizerType: "jvm"
    },
    {
      id: 568,
      title: "Audio Speech Model (TTS)",
      intro: "Synthesizing spoken voice outputs from text data.",
      explanation: "Text-to-Speech (TTS) models take a string and generate natural-sounding voice files. Inject the 'OpenAiAudioSpeechModel' bean. Calling 'call(speechPrompt)' sends the text to the API and returns a byte array containing the synthesized audio stream.",
      gotchas: ["Ensure you handle the byte array response correctly. For web clients, stream the bytes directly with 'audio/mpeg' content headers."],
      interviewQuestions: [{
        question: "Which model does OpenAI use for Text-to-Speech synthesis?",
        answer: "The 'tts-1' or 'tts-1-hd' models."
      }],
      code: `@Autowired
private OpenAiAudioSpeechModel speechModel;`,
      visualizerType: "null"
    },
    {
      id: 569,
      title: "Audio Speech Options",
      intro: "Choosing voice characters and output formats (mp3, wav).",
      explanation: "Configure speech output parameters using 'OpenAiAudioSpeechOptions'. You specify the target audio format (mp3, opus, aac, flac), the speech generation model (tts-1), and the voice actor persona (alloy, echo, fable, onyx, nova, shimmer).",
      gotchas: ["Each voice character has a distinct tone. Select the character that matches your application context (e.g., Onyx is a deep male voice, Nova is energetic)."],
      interviewQuestions: [{
        question: "How do you choose a specific voice tone in Spring AI TTS?",
        answer: "By setting the voice using 'OpenAiAudioSpeechOptions.builder().withVoice(OpenAiAudioApi.SpeechRequest.Voice.ONYX).build()'."
      }],
      code: `var speechOptions = OpenAiAudioSpeechOptions.builder()
    .withVoice(OpenAiAudioApi.SpeechRequest.Voice.NOVA)
    .withResponseFormat(OpenAiAudioApi.SpeechRequest.AudioFormat.MP3)
    .build();
SpeechPrompt prompt = new SpeechPrompt("Welcome to Telusuko Java Course!", speechOptions);
byte[] audioBytes = speechModel.call(prompt).getResult().getOutput();`,
      visualizerType: "jvm"
    },
    {
      id: 570,
      title: "Structured Output Converter",
      intro: "Parsing unstructured LLM answers into standard Java types.",
      explanation: "AI models return raw string paragraphs by default. In standard programming, you need structured variables (like Lists, Maps, or Java Beans). Spring AI introduces the 'StructuredOutputConverter' interface to automatically parse raw text strings into structured Java objects.",
      gotchas: ["If the LLM fails to output the exact requested format, the converter throws a parsing exception. Write fallback handler rules."],
      interviewQuestions: [{
        question: "What is StructuredOutputConverter in Spring AI?",
        answer: "An interface designed to convert unstructured AI text responses into structured Java objects like lists, maps, or user-defined POJOs."
      }],
      code: `// Key implementations:
// - ListOutputConverter (returns Java List)
// - BeanOutputConverter (returns Java Bean POJO)`,
      visualizerType: "null"
    },
    {
      id: 571,
      title: "List Output Converter",
      intro: "Getting comma-separated results from LLM converted to Java List.",
      explanation: "The 'ListOutputConverter' takes a string collection parameter. It automatically appends formatting instructions (specifying comma-separated outputs) to the prompt and parses the LLM's response into a standard 'List<String>'.",
      gotchas: ["Ensure you append the converter formatting instructions to the prompt using 'converter.getFormatInstruction()', or the LLM won't format it properly."],
      interviewQuestions: [{
        question: "How do you retrieve a list of strings directly from a ChatClient prompt?",
        answer: "By using a ListOutputConverter, appending its format instructions to the prompt, and passing the response content to the converter's convert() method."
      }],
      code: `ListOutputConverter converter = new ListOutputConverter(new DefaultConversionService());
String format = converter.getFormatInstruction();
String response = chatModel.call("List 3 popular Java frameworks. " + format);
List<String> frameworks = converter.convert(response);`,
      visualizerType: "jvm"
    },
    {
      id: 572,
      title: "Bean Output Converter",
      intro: "Mapping LLM JSON outputs into custom Java POJOs.",
      explanation: "To map response data into a Java object, use the 'BeanOutputConverter'. Pass the target class to the converter constructor. It instructs the model to reply with a JSON schema conforming to that class structure, then uses Jackson to map the JSON into the Java instance.",
      gotchas: ["The target class must have a default constructor and public getter/setter methods for Jackson deserialization to succeed."],
      interviewQuestions: [{
        question: "How does BeanOutputConverter work behind the scenes?",
        answer: "It generates a JSON schema representing the Java class, instructs the LLM to output a JSON object adhering to that schema, and deserializes the JSON string response into the Java object using ObjectMapper."
      }],
      code: `public record ActorDetails(String name, String activeYears, String majorMovies) {}

// Inside your Service:
var converter = new BeanOutputConverter<>(ActorDetails.class);
String format = converter.getFormatInstruction();
String response = chatModel.call("Provide details for Tom Hanks. " + format);
ActorDetails actor = converter.convert(response);`,
      visualizerType: "jvm"
    },
    {
      id: 573,
      title: "Bean Output Converter With List",
      intro: "Generating lists of custom Java Beans from prompts.",
      explanation: "You can also retrieve lists of custom objects by configuring the BeanOutputConverter with a ParameterizedTypeReference representing a List of your custom type, allowing the AI to generate structured object arrays.",
      gotchas: ["Generating large arrays can result in incomplete JSON if the output token limit is hit mid-generation, breaking the parser."],
      interviewQuestions: [{
        question: "How do you configure a BeanOutputConverter to return a List of a custom class?",
        answer: "By passing a ParameterizedTypeReference representation of List<MyClass> to the BeanOutputConverter's constructor."
      }],
      code: `public record Book(String title, String author) {}

var converter = new BeanOutputConverter<>(
    new ParameterizedTypeReference<List<Book>>() {}
);
String response = chatModel.call("List top 2 programming books. " + converter.getFormatInstruction());
List<Book> books = converter.convert(response);`,
      visualizerType: "jvm"
    },
    {
      id: 574,
      title: "E-commerce Project Introduction",
      intro: "Developing an AI-driven online shop with intelligent search.",
      explanation: "To see Spring AI in action, we build a simple E-commerce web application. The application will store product records (name, price, description) in a database, use vector embeddings for semantic product search, and host an AI chatbot to answer customer queries.",
      gotchas: ["E-commerce product descriptions must be clean and structured to generate high-quality embedding vectors for search queries."],
      interviewQuestions: [{
        question: "What role does AI play in modern e-commerce search?",
        answer: "Traditional search looks for exact keyword matches. AI search converts user intents into vector embeddings, finding products based on meaning (e.g., searching for 'winter clothing' yields heavy jackets even if the word 'winter' is not in the product title)."
      }],
      code: `// Database Schema structure:
// PRODUCT (id: SERIAL, name: VARCHAR, description: TEXT, price: DECIMAL)`,
      visualizerType: "null"
    },
    {
      id: 575,
      title: "New UI with AI",
      intro: "Designing client views that integrate image generation and chatbots.",
      explanation: "We add interactive components to our E-commerce UI: a Chatbot window that allows users to ask questions ('Will this item fit my laptop?'), and an AI designer tool that lets users describe a product concept and generates a mockup image dynamically.",
      gotchas: ["AI UI elements must handle loading states gracefully, as model API calls can take several seconds to respond."],
      interviewQuestions: [{
        question: "Why is handling asynchronous states critical in AI UI design?",
        answer: "AI models are slow compared to database queries. Showing loading animations or progress spinners prevents users from thinking the application has frozen."
      }],
      code: `<!-- Conceptual HTML button to trigger AI assistant -->
<button onclick="askAI()">Ask Product Assistant</button>
<div id="chat-box"></div>`,
      visualizerType: "null"
    },
    {
      id: 576,
      title: "Getting The Project Ready For AI",
      intro: "Adding database connection configurations and dependencies.",
      explanation: "Prepare your Spring Boot backend by adding dependencies: spring-boot-starter-data-jpa, pgvector, and spring-ai-openai-starter. Configure connection properties to point to your PostgreSQL instance.",
      gotchas: ["Ensure that you are using pgvector-compatible PostgreSQL instance before booting the application."],
      interviewQuestions: [{
        question: "Which starters are required to build a database-backed AI application in Spring Boot?",
        answer: "spring-boot-starter-data-jpa (for RDBMS), spring-ai-pgvector-store-starter (for vector index), and spring-ai-openai-starter (for LLM)."
      }],
      code: `<!-- Ensure both database and AI dependencies are in pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>`,
      visualizerType: "null"
    },
    {
      id: 577,
      title: "Mapping The Product Controller",
      intro: "Creating standard REST endpoints to search and manage products.",
      explanation: "Write a standard Spring MVC controller mapping endpoint methods to search, retrieve, add, and delete product resources. This controller maps web client requests to the underlying ProductService database handlers.",
      gotchas: ["Keep controllers thin; pass processing logic to the service classes."],
      interviewQuestions: [{
        question: "What annotation marks a controller class as a REST endpoint handler in Spring Boot?",
        answer: "@RestController."
      }],
      code: `@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAll() {
        return productService.findAll();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 578,
      title: "Building Service with ChatClient",
      intro: "Connecting controllers to custom ChatClient assistant instances.",
      explanation: "Implement the service layer. The service will inject 'ChatClient.Builder' to build a specialized product advisor. The service receives queries, calls the ChatClient, and processes text replies.",
      gotchas: ["Configure proper exception handling blocks in case the external API times out or throws quota limits errors."],
      interviewQuestions: [{
        question: "Where should ChatClient instances be built and stored?",
        answer: "Inside the constructor of service classes, using the injected ChatClient.Builder bean."
      }],
      code: `@Service
public class ProductService {
    private final ChatClient chatClient;

    public ProductService(ChatClient.Builder builder) {
        this.chatClient = builder
            .defaultSystem("You are an expert shop assistant.")
            .build();
    }

    public String analyzeReview(String review) {
        return chatClient.prompt().user("Analyze this review: " + review).call().content();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 579,
      title: "AI Image Generator (Part 1)",
      intro: "Building endpoint configurations to receive text prompts for images.",
      explanation: "Create a controller endpoint '/api/ai/image' that accepts a prompt string parameter. It calls the service layer to trigger the ImageModel API, which requests DALL-E image generation.",
      gotchas: ["Sanitise user input to prevent rendering inappropriate content via image APIs."],
      interviewQuestions: [{
        question: "How do you pass image requests from a controller to service layers?",
        answer: "By receiving the prompt text as a @RequestParam and passing it down to a service that executes the ImageModel."
      }],
      code: `@GetMapping("/api/ai/image")
public String generate(@RequestParam String description) {
    return aiImageService.createImage(description);
}`,
      visualizerType: "jvm"
    },
    {
      id: 580,
      title: "AI Image Generator (Part 2)",
      intro: "Synthesizing and returning the generated image URLs.",
      explanation: "In your AI service, invoke 'imageModel.call(new ImagePrompt(prompt))'. Parse the image response to retrieve the image generation output URL and return it to the controller, which passes it to the UI for display.",
      gotchas: ["The returned URL belongs to OpenAI's CDN and will stop working after 1 hour."],
      interviewQuestions: [{
        question: "How do you configure size dimensions for generated images in Spring AI?",
        answer: "By configuring options on the ImagePrompt constructor using OpenAiImageOptions.builder().withWidth(512).withHeight(512).build()."
      }],
      code: `@Service
public class AiImageService {
    @Autowired
    private ImageModel imageModel;

    public String createImage(String prompt) {
        ImageResponse response = imageModel.call(new ImagePrompt(prompt));
        return response.getResult().getOutput().getUrl();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 581,
      title: "Introduction to Ask AI Feature",
      intro: "Adding intelligent natural language questions over your datasets.",
      explanation: "The 'Ask AI' feature allows shoppers to ask questions about items using plain English. Instead of exact matches, the backend uses RAG (Retrieval-Augmented Generation) to search for details in product descriptions, supplying them to the LLM to write a contextual response.",
      gotchas: ["If the database contains outdated descriptions, the AI will confidently answer with outdated facts."],
      interviewQuestions: [{
        question: "What is the primary benefit of the Ask AI feature over standard keyword searches?",
        answer: "It allows natural language reasoning over product documents, understanding context, specs, and intent to answer user questions directly, rather than just returning a list of links."
      }],
      code: `// Dynamic question endpoint:
// POST /api/ai/ask { "question": "Does the red backpack have water resistance?" }`,
      visualizerType: "null"
    },
    {
      id: 582,
      title: "Adding The Order Feature Files",
      intro: "Setting up entity records to track customer purchase transactions.",
      explanation: "Create Java entities representing Orders and OrderItems to track purchases in the PostgreSQL database. This allows users to place orders and the AI to check order history details during chat interactions.",
      gotchas: ["Add proper relational constraints like @ManyToOne to connect Order items to Product entities."],
      interviewQuestions: [{
        question: "How do you map parent-child records in Spring Data JPA?",
        answer: "Use @OneToMany in the parent entity (Order) and @ManyToOne in the child entity (OrderItem) with @JoinColumn mapping."
      }],
      code: `@Entity
@Table(name = "customer_orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerEmail;
    private Double totalAmount;
    // Getters and Setters
}`,
      visualizerType: "jvm"
    },
    {
      id: 583,
      title: "Setting Up PGVector",
      intro: "Creating PostgreSQL schemas to store document embeddings.",
      explanation: "To persist embeddings, you must create a database table containing a column of type 'vector'. When using Spring AI's PGVectorStore starter, configuring 'initialize-schema=true' enables Spring Boot to automatically create the 'vector_store' table at application startup.",
      gotchas: ["The vector column length must exactly match the output dimensions of your embedding model (e.g. 1536 for OpenAI)."],
      interviewQuestions: [{
        question: "What schema table does Spring AI auto-generate for PGVectorStore by default?",
        answer: "It creates a table named 'vector_store' containing columns 'id' (UUID), 'content' (text), 'metadata' (jsonb), and 'embedding' (vector)."
      }],
      code: `# application.properties config to auto-create pgvector table
spring.ai.vectorstore.pgvector.initialize-schema=true
spring.ai.vectorstore.pgvector.table-name=vector_store`,
      visualizerType: "null"
    },
    {
      id: 584,
      title: "Creating ChatBotController",
      intro: "Setting up a WebSocket or HTTP endpoint to manage chatbot messaging.",
      explanation: "Create a controller with a '@PostMapping(\"/chat\")' mapping to receive user queries. It delegates the input to the chatbot service which coordinates database context retrieval and AI response generation.",
      gotchas: ["Ensure CORS is configured correctly, otherwise the frontend UI will be blocked when trying to call this endpoint."],
      interviewQuestions: [{
        question: "How do you receive JSON bodies in Spring Boot Controller methods?",
        answer: "By parameterizing the method with @RequestBody mapping to a DTO class."
      }],
      code: `@RestController
@RequestMapping("/api/bot")
@CrossOrigin(origins = "*")
public class ChatBotController {
    @Autowired
    private ChatBotService chatBotService;

    @PostMapping("/chat")
    public String chat(@RequestBody Map<String, String> payload) {
        return chatBotService.getChatbotResponse(payload.get("message"));
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 585,
      title: "Chatbot Service with AI Call",
      intro: "Processing user messages and calling LLMs with injected context.",
      explanation: "The ChatBotService retrieves relevant context from your vector store using semantic search, embeds the query, creates a Prompt with system instructions, and requests responses from the ChatModel.",
      gotchas: ["Provide clear system guidelines instructing the chatbot to say 'I don't know' if the context does not contain the answer, preventing hallucinations."],
      interviewQuestions: [{
        question: "How do you prevent the AI chatbot from hallucinating answers to product questions?",
        answer: "By instructing the model in the system prompt to only use the provided context document text, and explicitly telling it to state that it does not know if the answer is not present."
      }],
      code: `@Service
public class ChatBotService {
    @Autowired
    private ChatModel chatModel;
    @Autowired
    private VectorStore vectorStore;

    public String getChatbotResponse(String message) {
        List<Document> documents = vectorStore.similaritySearch(SearchRequest.query(message).withTopK(2));
        String context = documents.stream().map(Document::getContent).collect(Collectors.joining("\\n"));
        
        String systemMsg = "You are a store assistant. Use only this context to answer: \\n" + context;
        Prompt prompt = new Prompt(List.of(new SystemMessage(systemMsg), new UserMessage(message)));
        return chatModel.call(prompt).getResult().getOutput().getContent();
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 586,
      title: "Embedding The Product Data",
      intro: "Populating the vector store with product catalog descriptions.",
      explanation: "To search products, you must generate vectors for them. Write a database loader method that reads products from your relational repository, maps each to a 'Document' object (e.g. 'Name: Jacket. Desc: Warm.'), and stores them in the VectorStore.",
      gotchas: ["Whenever you add a product to your MySQL/Postgre database, you must also add its corresponding representation to your VectorStore."],
      interviewQuestions: [{
        question: "How do you store document chunks into a VectorStore in Spring AI?",
        answer: "Instantiate a Document object passing the text content and a metadata map, and execute vectorStore.add(List.of(document))."
      }],
      code: `public void loadCatalogToVectorStore() {
    List<Product> products = productRepository.findAll();
    List<Document> docs = products.stream()
        .map(p -> new Document("Product ID: " + p.getId() + " - " + p.getName() + ": " + p.getDescription(), 
            Map.of("productId", p.getId())))
        .collect(Collectors.toList());
    vectorStore.add(docs);
}`,
      visualizerType: "jvm"
    },
    {
      id: 587,
      title: "Update Product in Vector Storez",
      intro: "Syncing product catalog modifications to the vector store index.",
      explanation: "When a product description or title is updated, its old vector coordinate becomes invalid. You must delete the old document representation from the VectorStore (using its document ID or key) and upload a freshly generated vector.",
      gotchas: ["Forgetting to update the vector store leads to search results returning outdated details."],
      interviewQuestions: [{
        question: "How do you update a document inside a VectorStore in Spring AI?",
        answer: "Call vectorStore.delete(List.of(oldDocId)) to remove the old vector, and then add the updated Document using vectorStore.add(List.of(newDoc))."
      }],
      code: `public void updateProductVector(Product product) {
    // Delete old document using unique ID representation
    String docId = "prod-" + product.getId();
    vectorStore.delete(List.of(docId));
    
    // Add updated version
    Document newDoc = new Document(docId, "Name: " + product.getName() + " - Description: " + product.getDescription(), Map.of("productId", product.getId()));
    vectorStore.add(List.of(newDoc));
}`,
      visualizerType: "jvm"
    },
    {
      id: 588,
      title: "Add Order In The Vector Store",
      intro: "Indexing purchase order records to enable AI order tracking lookup.",
      explanation: "To allow the chatbot to verify order states ('Where is my order?'), index order logs in the VectorStore with matching user metadata. When a customer asks about their order, the chatbot queries the VectorStore filtering by the customer's email.",
      gotchas: ["Ensure PII (Personally Identifiable Information) like full credit card numbers are never indexed in vector databases due to security compliance rules."],
      interviewQuestions: [{
        question: "How do you filter vector search queries by metadata in Spring AI?",
        answer: "By applying a Filter.Expression using metadata keys during vector search queries (e.g., using SearchRequest.query(msg).withFilterExpression(\"email == 'customer@test.com'\"))."
      }],
      code: `public void indexOrder(Order order) {
    String docContent = "Order ID: " + order.getId() + " Total: " + order.getTotalAmount() + " Status: Processing";
    Document doc = new Document(
        "order-" + order.getId(),
        docContent,
        Map.of("customerEmail", order.getCustomerEmail())
    );
    vectorStore.add(List.of(doc));
}`,
      visualizerType: "jvm"
    }
  ]
};
