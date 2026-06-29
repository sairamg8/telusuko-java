export default {
  id: 31,
  title: "Containerization with Docker",
  range: "497-513",
  concepts: [
    {
      id: 497,
      title: "Docker Introduction",
      intro: "Transitioning from 'works on my machine' to consistent containerized deployments.",
      explanation: "Docker is an open-source platform that automates the deployment of applications inside lightweight, portable containers. A container packages an application with all of its dependencies, including runtime libraries, config files, and binaries. This ensures that the application behaves identically across development, testing, staging, and production environments.",
      gotchas: [
        "Containers are lightweight but they share the Host OS kernel. They do not run a separate Guest Operating System like Virtual Machines do."
      ],
      interviewQuestions: [
        {
          question: "What is the primary problem Docker resolves?",
          answer: "Docker resolves the environment inconsistency issue ('works on my machine' syndrome) by packing the application along with its exact dependencies and configurations into a portable container."
        }
      ],
      code: `# Command to check Docker CLI and Server versions
docker version`,
      visualizerType: "null"
    },
    {
      id: 498,
      title: "Problem Docker Solves",
      intro: "Resolving runtime dependency conflicts and custom server configuration mismatches.",
      explanation: "Historically, deploying an application required manual system configurations. If App A required Java 8 and App B on the same server required Java 17, conflicts arose. Similarly, database drivers, system paths, and OS patches caused applications to break in production despite working in development. This multi-app, multi-environment challenge is called the 'matrix of hell'.",
      gotchas: [
        "Relying on manual execution of setup scripts on target servers leaves room for human error and version drifts."
      ],
      interviewQuestions: [
        {
          question: "What is the 'matrix of hell' in deployment?",
          answer: "It refers to the complexity of ensuring multiple applications (with different version requirements) can run reliably across different operating systems, environments, and cloud setups without stepping on each other's configurations."
        }
      ],
      code: `# Traditional deployment headaches:
# apt-get install oracle-java8-jdk
# export JAVA_HOME=/usr/lib/jvm/java-8-oracle
# (What if another app needs Java 17 on the same system?)`,
      visualizerType: "null"
    },
    {
      id: 499,
      title: "Solution with Virtualization",
      intro: "Using hypervisors and heavy guest operating systems to achieve isolation.",
      explanation: "Virtualization uses a Hypervisor (like VirtualBox or VMware) to split a physical machine's resources into multiple Virtual Machines (VMs). Each VM requires a complete, independent Guest Operating System, virtual hardware allocations, and libraries. This provides strict security isolation but incurs a massive performance overhead and consumes gigabytes of storage.",
      gotchas: [
        "Virtual machines are resource-heavy, slow to boot (taking minutes), and consume massive amounts of CPU, RAM, and disk memory to run duplicate OS instances."
      ],
      interviewQuestions: [
        {
          question: "What is the role of a Hypervisor in Virtualization?",
          answer: "A Hypervisor is software that creates, runs, and manages Virtual Machines. It abstracts the physical hardware (CPU, RAM, Disk) so that multiple guest OS instances can run concurrently on a single physical host."
        }
      ],
      code: `# Virtual Machine Structure:
# [Application] -> [Libs/Deps] -> [Guest OS] -> [Hypervisor] -> [Host OS] -> [Hardware]`,
      visualizerType: "null"
    },
    {
      id: 500,
      title: "Solution with Containerization",
      intro: "Sharing the host kernel to execute super-fast, lightweight micro-environments.",
      explanation: "Containerization is OS-level virtualization. Instead of running a virtual operating system, a container engine (like Docker) leverages features of the host Linux kernel (such as namespaces and control groups) to isolate processes. Containers share the Host OS kernel. They package only the application code and specific binaries/libraries, reducing image sizes to megabytes and booting up in milliseconds.",
      gotchas: [
        "Because they share the host kernel, containers cannot run software requiring a different kernel family natively (e.g. running native Windows kernel containers directly on Linux)."
      ],
      interviewQuestions: [
        {
          question: "How does containerization differ from virtualization?",
          answer: "Virtualization runs a separate guest OS inside each VM, managed by a hypervisor. Containerization shares the host OS kernel and runs applications in isolated user space processes, making them significantly faster and lighter."
        }
      ],
      code: `# Containerization Structure:
# [Application] -> [Libs/Deps] -> [Docker Engine] -> [Host OS Kernel] -> [Hardware]`,
      visualizerType: "null"
    },
    {
      id: 501,
      title: "What Is Docker?",
      intro: "The standard toolchain and ecosystem representing modern containerization.",
      explanation: "Docker is the most popular software framework for containerization. It comprises: the Docker Daemon (dockerd) which runs in the background managing images and containers, the Docker CLI (docker) which acts as the user control interface, and Docker Hub, a public cloud repository to store, share, and pull pre-built container images.",
      gotchas: [
        "Docker is not the only container runtime (there are alternatives like Podman, Containerd, or CRI-O), but it is the industry standard."
      ],
      interviewQuestions: [
        {
          question: "Name the key components of the Docker ecosystem.",
          answer: "Docker Daemon (dockerd), Docker CLI, Docker Images (read-only templates), Docker Containers (active running instances), and Docker Hub (the image registry)."
        }
      ],
      code: `# Display Docker system-wide configuration details
docker info`,
      visualizerType: "null"
    },
    {
      id: 502,
      title: "Docker Setup",
      intro: "Installing Docker Engine and Docker Desktop across platforms.",
      explanation: "Docker runs natively on Linux. On Windows and macOS, you install Docker Desktop. Docker Desktop creates a lightweight virtual Linux machine (using WSL2 on Windows or HyperKit/VirtualizationFramework on macOS) to run the Docker daemon, allowing you to develop Linux-based containers seamlessly on non-Linux hosts.",
      gotchas: [
        "On Windows, ensure virtualization is enabled in BIOS/UEFI, and WSL2 (Windows Subsystem for Linux) is fully updated, otherwise Docker Desktop will fail to boot."
      ],
      interviewQuestions: [
        {
          question: "Why does Docker Desktop require WSL2 on Windows?",
          answer: "Docker containers require a Linux kernel to run (utilizing namespaces and cgroups). WSL2 provides a lightweight virtualized Linux kernel running inside Windows, allowing Docker to execute Linux containers directly."
        }
      ],
      code: `# Linux command to check if Docker service is running
sudo systemctl status docker`,
      visualizerType: "null"
    },
    {
      id: 503,
      title: "Running First Container",
      intro: "Pulling and executing your first simple container from Docker Hub.",
      explanation: "When you execute 'docker run hello-world', the Docker client instructs the daemon to search for the 'hello-world' image locally. If it is not found, the daemon downloads (pulls) it from Docker Hub. Once downloaded, the daemon creates a running container instance from the image, runs its print script, and then terminates.",
      gotchas: [
        "Containers only run as long as their primary process is alive. Once the entrypoint command (like the print script in hello-world) finishes, the container exits."
      ],
      interviewQuestions: [
        {
          question: "What steps does Docker perform when you run 'docker run <image>'?",
          answer: "1. Checks local cache for the image. 2. If not present, pulls it from Docker Hub. 3. Creates a writeable container layer over the read-only image. 4. Starts the container's entrypoint process."
        }
      ],
      code: `# Running the hello-world container
docker run hello-world`,
      visualizerType: "null"
    },
    {
      id: 504,
      title: "Docker Commands",
      intro: "Mastering the basic commands for managing containers and images.",
      explanation: "Key commands include: 'docker ps' (lists running containers), 'docker ps -a' (lists all containers, including stopped ones), 'docker images' (lists downloaded images), 'docker stop <id>' (gracefully halts a container), 'docker rm <id>' (deletes a container), and 'docker rmi <id>' (deletes an image).",
      gotchas: [
        "You cannot remove a Docker image ('docker rmi') if there is an existing container (running or stopped) that was created from that image. Remove the container first."
      ],
      interviewQuestions: [
        {
          question: "How do you check logs of a running container?",
          answer: "By using the command: docker logs <container_id_or_name>. Use the -f flag to stream the logs in real-time."
        }
      ],
      code: `# List active containers:
docker ps

# Stop a container:
docker stop my-container-name

# Delete a container:
docker rm my-container-name`,
      visualizerType: "null"
    },
    {
      id: 505,
      title: "Docker Architecture",
      intro: "Understanding the client-server interaction of the Docker engine.",
      explanation: "Docker operates on a client-server architecture. The Docker Client (command-line utility) acts as the interface. It parses command arguments and sends REST API commands over UNIX domain sockets or network sockets to the Docker Daemon (dockerd). The Docker Daemon manages the local storage, container runtime lifecycles, and network configurations.",
      gotchas: [
        "If you get permission errors running Docker, your user account needs to be added to the 'docker' system group, or you must prefix commands with 'sudo'."
      ],
      interviewQuestions: [
        {
          question: "What is the Docker Daemon and where does it run?",
          answer: "The Docker Daemon (dockerd) is a background service process running on the host OS. It listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes."
        }
      ],
      code: `# Check if daemon socket is listening (Linux location)
ls -la /var/run/docker.sock`,
      visualizerType: "null"
    },
    {
      id: 506,
      title: "Running JDK Docker Container",
      intro: "Using a pre-built Java container to compile and run scripts without local installation.",
      explanation: "You can execute Java programs without installing Java locally by using an official OpenJDK Docker image. By mounting your local project folder to a folder inside the container (using the -v flag) and running an interactive shell, you can use the container's compiler and runtime on host files.",
      gotchas: [
        "When using volume mounts, files edited inside the container are immediately modified on your host computer because they share the same physical filesystem location."
      ],
      interviewQuestions: [
        {
          question: "How do you run a container in interactive mode with a terminal?",
          answer: "Use the flags '-it' (interactive and TTY allocation) in the 'docker run' command, e.g., docker run -it openjdk:17 bash."
        }
      ],
      code: `# Run interactive JDK container and mount current directory to /usr/src/app
docker run -it -v "$(pwd)":/usr/src/app -w /usr/src/app openjdk:17 bash

# Inside the container shell:
# javac Main.java && java Main`,
      visualizerType: "null"
    },
    {
      id: 507,
      title: "Packing The Spring Boot Web App",
      intro: "Preparing your Spring Boot project as a standalone executable JAR.",
      explanation: "To prepare a Spring Boot application for Docker, you must package it into a 'fat JAR' (also called an executable JAR). This JAR file contains all your compiled classes, application configurations, resources, and the embedded server (like Tomcat). You package this using Maven 'mvn clean package' or Gradle './gradlew build'.",
      gotchas: [
        "Do not copy your raw source code folder directly into a basic container and try to run it; it increases container boot dependencies. Compile the JAR first, then package the JAR."
      ],
      interviewQuestions: [
        {
          question: "What does Maven do during the 'package' phase of a Spring Boot app?",
          answer: "It compiles the Java source code, runs unit tests, and packages the compiled classes and dependencies into a single runnable JAR file located in the 'target' directory."
        }
      ],
      code: `# Build Spring Boot App using Maven wrapper
./mvnw clean package -DskipTests`,
      visualizerType: "null"
    },
    {
      id: 508,
      title: "Running Spring Boot Web App On Docker",
      intro: "Launching your packaged JAR in a Java container with mapped ports.",
      explanation: "Once the JAR is built, you run it inside a Java runtime image. By default, Spring Boot listens on port 8080. To expose it to your web browser on the host machine, you must publish the port using the command '-p host_port:container_port'.",
      gotchas: [
        "If you run the container without the '-p 8080:8080' mapping, you will get a connection refused error when trying to access http://localhost:8080 from the host, even if the app started successfully inside the container."
      ],
      interviewQuestions: [
        {
          question: "What is the significance of the -d flag in docker run?",
          answer: "The -d flag runs the container in 'detached' mode, meaning it executes in the background and releases control of the terminal window."
        }
      ],
      code: `# Run Spring Boot JAR in background, mapping port 8080
docker run -d -p 8080:8080 -v "$(pwd)/target/app.jar":/app.jar openjdk:17-slim java -jar /app.jar`,
      visualizerType: "null"
    },
    {
      id: 509,
      title: "Dockerfile For Docker Images",
      intro: "Creating declarative scripts to build custom reusable Docker images.",
      explanation: "A 'Dockerfile' contains the list of step-by-step instructions that Docker uses to assemble a custom image. Key directives include: 'FROM' (specifies base image), 'WORKDIR' (sets path for commands), 'COPY' (moves files from host to container), 'EXPOSE' (documents listening ports), and 'ENTRYPOINT' / 'CMD' (defines default startup execution command). Build it using: 'docker build -t name .'.",
      gotchas: [
        "Each command in a Dockerfile creates a new layer in the image. Order your commands from least-changing to most-changing (like copying code at the very end) to leverage Docker's build cache."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between CMD and ENTRYPOINT in a Dockerfile?",
          answer: "ENTRYPOINT defines the command that will always be executed when the container starts. CMD provides default arguments for the ENTRYPOINT, which can be overridden by passing arguments to the 'docker run' command."
        }
      ],
      code: `# Sample Dockerfile for a Spring Boot Application
FROM openjdk:17-slim
WORKDIR /app
COPY target/jobapp.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
      visualizerType: "null"
    },
    {
      id: 510,
      title: "Web App with PostgreSQL",
      intro: "Connecting a Spring Boot application container with a PostgreSQL database container.",
      explanation: "Running multiple containers requires they communicate with each other. By default, containers are isolated. By creating a custom Docker bridge network, containers can refer to each other using their container names as hostnames, enabling the Spring Boot application container to reach the PostgreSQL container.",
      gotchas: [
        "If your Spring Boot container starts faster than the database, it will crash with a connection error. Ensure database starts first or write retry connection logic in Spring Boot."
      ],
      interviewQuestions: [
        {
          question: "How do two Docker containers communicate with each other on the same host?",
          answer: "They communicate by being placed on the same custom Docker bridge network, which enables container-to-container communication using container names as hostnames via Docker's internal DNS resolver."
        }
      ],
      code: `# Create custom network
docker network create my-bridge-net

# Run PostgreSQL container
docker run -d --name pg-db --network my-bridge-net -e POSTGRES_DB=telusukodb -e POSTGRES_PASSWORD=secpwd postgres:15

# Run Spring Boot app on same network, referencing db name
docker run -d --name spring-app --network my-bridge-net -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:postgresql://pg-db:5432/telusukodb my-spring-image`,
      visualizerType: "null"
    },
    {
      id: 511,
      title: "Docker Compose",
      intro: "Defining and managing multi-container deployments in a single YAML file.",
      explanation: "Docker Compose is a utility tool that lets you manage multi-container applications. Instead of running multiple individual 'docker run' commands with networks, ports, and env variables, you define your entire architecture in a single declarative YAML file called 'docker-compose.yml'.",
      gotchas: [
        "YAML is strictly sensitive to spacing. Using tab characters instead of spaces will break the file parsing during execution."
      ],
      interviewQuestions: [
        {
          question: "What is Docker Compose and what command launches all services defined inside it?",
          answer: "Docker Compose is a tool to define and run multi-container applications using a YAML file. The command 'docker-compose up' (or 'docker compose up') launches all defined services."
        }
      ],
      code: `# docker-compose.yml
version: '3.8'
services:
  database:
    image: postgres:15
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: root
      POSTGRES_PASSWORD: rootpassword
    ports:
      - "5432:5432"
  web-app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - database
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://database:5432/appdb`,
      visualizerType: "null"
    },
    {
      id: 512,
      title: "Running Multiple Containers",
      intro: "Managing lifecycle and build modifications of a docker-compose cluster.",
      explanation: "With Compose configured, you can launch services in background mode using 'docker-compose up -d'. Stop and destroy resources using 'docker-compose down'. If you edit your application code, you must rebuild the image using the '--build' flag during startup.",
      gotchas: [
        "Just running 'docker-compose up' won't compile code changes in your source files if an image already exists. Run with '--build' to force compilation."
      ],
      interviewQuestions: [
        {
          question: "How do you stop and remove containers, networks, and volumes created by Docker Compose?",
          answer: "By executing the command: docker-compose down. Adding the -v flag will also remove mapped named volumes."
        }
      ],
      code: `# Recompile code, rebuild images, and start services in background
docker-compose up -d --build`,
      visualizerType: "null"
    },
    {
      id: 513,
      title: "Docker Volumes",
      intro: "Enforcing persistent data storage across container lifecycles.",
      explanation: "Containers are ephemeral; deleting a container deletes its internal storage. To persist database logs and records, Docker uses Volumes, which map a folder in the container's storage to a directory managed by Docker on the host machine. If the database container is destroyed, the data remains intact in the volume and is re-attached to a new container.",
      gotchas: [
        "If you do not specify a volume for a database container, your database will start empty every time the container is destroyed and recreated."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between a bind mount and a named volume?",
          answer: "A bind mount maps any specific folder on the host machine to the container. A named volume is fully managed by Docker in a dedicated directory on the host (/var/lib/docker/volumes/) and is easier to share and backup."
        }
      ],
      code: `# Mapping a named volume in docker-compose.yml
services:
  db:
    image: postgres:15
    volumes:
      - pg-data:/var/lib/postgresql/data
volumes:
  pg-data:`,
      visualizerType: "null"
    }
  ]
};
