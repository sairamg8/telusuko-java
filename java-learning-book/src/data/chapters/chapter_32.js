export default {
  id: 32,
  title: "Cloud Deployment with AWS",
  range: "514-528",
  concepts: [
    {
      id: 514,
      title: "What Is Cloud Computing?",
      intro: "Replacing physical data centers with flexible, on-demand virtual compute services.",
      explanation: "Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ('the cloud') on a pay-as-you-go pricing model. It eliminates the capital expense (CapEx) of purchasing and maintaining hardware, replacing it with operating expenses (OpEx) that scale dynamically with user demand.",
      gotchas: [
        "Cloud resources are billed continuously while running. Forgetting to stop virtual machines or databases when not in use can result in large bills."
      ],
      interviewQuestions: [
        {
          question: "Explain the three main service models of Cloud Computing.",
          answer: "1. Infrastructure as a Service (IaaS): provides fundamental compute, network, and storage (e.g., AWS EC2). 2. Platform as a Service (PaaS): provides runtimes and tools to deploy applications without OS management (e.g., AWS Elastic Beanstalk). 3. Software as a Service (SaaS): provides fully functioning software end-user applications over the web (e.g., Office 365)."
        }
      ],
      code: `// Cloud pricing model:
// Cost = Resources Used (CPU/Memory/Storage) * Duration of Execution`,
      visualizerType: "null"
    },
    {
      id: 515,
      title: "Choosing a Cloud Provider",
      intro: "Comparing major cloud ecosystems: AWS, Microsoft Azure, and Google Cloud.",
      explanation: "Amazon Web Services (AWS) is the oldest and largest cloud provider, offering the widest array of services and global data center locations. Microsoft Azure is the enterprise standard, integrating seamlessly with existing Microsoft services and directory frameworks. Google Cloud Platform (GCP) is renowned for container orchestration (Kubernetes origins), big data analytics, and machine learning architectures.",
      gotchas: [
        "Adopting proprietary cloud APIs creates 'vendor lock-in', making it complex and expensive to move applications to another cloud later."
      ],
      interviewQuestions: [
        {
          question: "What is vendor lock-in and how do containerized deployments mitigate it?",
          answer: "Vendor lock-in is a state where a customer is dependent on a single cloud provider's proprietary services. Packaging applications in Docker containers allows developers to easily migrate and run the same code on AWS, Azure, GCP, or bare-metal servers without modifying the application code."
        }
      ],
      code: `# Use open standard configurations like Kubernetes/Terraform to ensure cloud portability.
# provider "aws" { region = "us-east-1" }`,
      visualizerType: "null"
    },
    {
      id: 516,
      title: "AWS Account Signup Process",
      intro: "Creating an AWS account and accessing the 12-month Free Tier.",
      explanation: "Creating an AWS account requires a credit card to verify identity (AWS makes a temporary $1 hold). New accounts automatically receive 12 months of AWS Free Tier, which provides limited usage of key services for free, such as 750 hours per month of a t2.micro or t3.micro EC2 compute instance and 5 GB of S3 standard storage.",
      gotchas: [
        "The Free Tier has strict limits. If you spin up a database or VM that exceeds the size or hours threshold, your registered credit card will be billed automatically."
      ],
      interviewQuestions: [
        {
          question: "What are the rules of the AWS 12-month Free Tier for EC2 instances?",
          answer: "You get 750 hours per month of micro instances (t2.micro or t3.micro depending on region) for 12 months. This is enough to run exactly one instance continuously for a full month."
        }
      ],
      code: `# Always verify your active resources in the AWS Billing Dashboard to prevent unexpected charges.`,
      visualizerType: "null"
    },
    {
      id: 517,
      title: "AWS Services and IAM",
      intro: "Securing resource access using Identity and Access Management (IAM).",
      explanation: "AWS IAM manages authentication and authorization. Upon signup, you get a 'Root User' account with absolute permissions. Best practice is to block root access immediately by setting up Multi-Factor Authentication (MFA) and creating specific IAM users with access keys (Access Key ID and Secret Access Key) under the Principle of Least Privilege for programmatic tools.",
      gotchas: [
        "Never check AWS Access Keys into source control (like GitHub repositories). Bots scan public code repositories and can steal keys to deploy massive, expensive mining operations under your account."
      ],
      interviewQuestions: [
        {
          question: "What is AWS IAM and what are IAM policies?",
          answer: "IAM (Identity and Access Management) controls access to AWS resources. IAM policies are JSON documents that define permissions, explicitly stating what actions (e.g., s3:GetObject) are allowed or denied on which resources."
        }
      ],
      code: `// Sample JSON IAM Policy to allow reading files from a specific S3 bucket
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::my-telusuko-bucket/*"]
    }
  ]
}`,
      visualizerType: "null"
    },
    {
      id: 518,
      title: "Simple Web App Project",
      intro: "Configuring a lightweight Spring Boot app to run on cloud systems.",
      explanation: "To prepare a Spring Boot application for cloud hosting platforms, compile the application into an executable JAR. The application needs to listen on a port that can be exposed. While standard Spring Boot runs on 8080, cloud platforms like Elastic Beanstalk can run a reverse proxy (like Nginx) that routes external traffic to the app.",
      gotchas: [
        "Ensure your Maven build is configured to compile a bootable JAR containing all dependencies, rather than a thin JAR that lacks the startup manifest classes."
      ],
      interviewQuestions: [
        {
          question: "How do you package a Spring Boot application into a single executable JAR?",
          answer: "Use the spring-boot-maven-plugin in your pom.xml, then run the command 'mvn clean package'. The resulting JAR file in the target directory contains all resources and an embedded Tomcat server."
        }
      ],
      code: `package com.telusuko;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class CloudHelloApp {
    public static void main(String[] args) {
        SpringApplication.run(CloudHelloApp.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Hello from Spring Boot running in the Cloud!";
    }
}`,
      visualizerType: "null"
    },
    {
      id: 519,
      title: "Deploying On Elastic Beanstalk",
      intro: "Deploying web applications instantly using AWS's managed platform runtime.",
      explanation: "AWS Elastic Beanstalk is a Platform as a Service (PaaS). You choose your runtime environment (e.g., Java SE or Tomcat) and upload your packaged Spring Boot JAR. Beanstalk automatically provisions EC2 servers, sets up load balancers, handles security groups, configures auto-scaling, and manages application monitoring.",
      gotchas: [
        "When deploying a Spring Boot app, choose the 'Java' platform. Selecting the 'Tomcat' platform will make Beanstalk fail because it expects a WAR package, not an executable JAR."
      ],
      interviewQuestions: [
        {
          question: "What is AWS Elastic Beanstalk and how does it help developers?",
          answer: "Elastic Beanstalk is a PaaS product. It simplifies deployment of applications in the cloud by automating provisioning of servers, networks, load balancers, and scaling, letting developers focus purely on code upload."
        }
      ],
      code: `# Use the Elastic Beanstalk Console:
# 1. Create Application -> 2. Select Platform: Java -> 3. Upload 'app.jar' -> 4. Click Create`,
      visualizerType: "null"
    },
    {
      id: 520,
      title: "Spring Project with Database",
      intro: "Configuring database properties dynamically using application.properties variables.",
      explanation: "Enterprise cloud applications require databases. Hardcoding database host endpoints and passwords inside application code is insecure. Instead, use property placeholders in application.properties. At startup, the Java application reads these values from the host's system environment variables.",
      gotchas: [
        "Never push database passwords to public repositories. Always reference environment variable configuration keys in properties files."
      ],
      interviewQuestions: [
        {
          question: "How do you bind environment variables to Spring Boot configurations?",
          answer: "In application.properties, write properties using system variables in placeholders, such as: spring.datasource.url=\${DB_URL}."
        }
      ],
      code: `# application.properties with environment variable hooks
spring.datasource.url=\${SPRING_DATASOURCE_URL}
spring.datasource.username=\${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=\${SPRING_DATASOURCE_PASSWORD}
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect`,
      visualizerType: "null"
    },
    {
      id: 521,
      title: "Creating Database in AWS RDS",
      intro: "Creating managed database environments using Amazon Relational Database Service.",
      explanation: "AWS RDS is a managed SQL database service. It provisions SQL engines like PostgreSQL or MySQL. RDS automates database administrative tasks such as patching, automated backups, replication, and scaling, saving developers from managing the OS files of the DB server.",
      gotchas: [
        "RDS databases are isolated inside a Virtual Private Cloud (VPC) by default. If your security group does not allow incoming traffic on port 5432 (Postgres) or 3306 (MySQL), applications will fail to connect."
      ],
      interviewQuestions: [
        {
          question: "What are the benefits of using RDS instead of hosting a database on a self-managed EC2 VM?",
          answer: "RDS provides automated backups, automatic software patching, easy replication (Multi-AZ for high availability), and vertical/horizontal scaling at the click of a button, reducing database administrator overhead."
        }
      ],
      code: `# AWS RDS endpoint looks like:
# my-postgres-db.c123456789.us-east-1.rds.amazonaws.com:5432`,
      visualizerType: "null"
    },
    {
      id: 522,
      title: "Deploying App on Elastic Beanstalk",
      intro: "Injecting RDS database parameters into a Beanstalk web deployment.",
      explanation: "After deploying your Spring Boot JAR to Beanstalk and provisioning RDS, navigate to Elastic Beanstalk -> Configuration -> Updates, monitoring, and logging -> Environment properties. Add the variable keys corresponding to your Spring Boot placeholders, pointing to the RDS endpoint, username, and password.",
      gotchas: [
        "Ensure the Beanstalk EC2 instances and the RDS instance are in VPC subnets that can communicate, and that the RDS security group lists the Beanstalk security group as an allowed inbound origin."
      ],
      interviewQuestions: [
        {
          question: "How do you connect an Elastic Beanstalk application to an RDS database?",
          answer: "By setting Beanstalk 'Environment properties' for DB connection strings (URL, username, password). These variables are injected into the OS environment where the JVM runs and reads them."
        }
      ],
      code: `# Example Environment Properties set in Beanstalk:
# SPRING_DATASOURCE_URL = jdbc:postgresql://my-rds.xxxx.rds.amazonaws.com:5432/mydb
# SPRING_DATASOURCE_USERNAME = dbuser
# SPRING_DATASOURCE_PASSWORD = dbpassword`,
      visualizerType: "null"
    },
    {
      id: 523,
      title: "Introduction to ECS",
      intro: "Orchestrating container fleets using Amazon Elastic Container Service.",
      explanation: "Amazon ECS is a managed container orchestration service used to run, stop, and manage Docker containers on a cluster. ECS supports two launch types: EC2 (you manage the host VMs running Docker) and Fargate (serverless container hosting, where AWS manages the underlying VM hosts and you pay per container resource).",
      gotchas: [
        "ECS cannot run raw source files or JAR packages directly; your applications must first be built into Docker images and stored in an image registry."
      ],
      interviewQuestions: [
        {
          question: "What is Amazon ECS Fargate?",
          answer: "ECS Fargate is a serverless compute engine for containers. It allows you to run containers directly on ECS without needing to provision, monitor, or manage EC2 virtual machines yourself."
        }
      ],
      code: `# ECS uses task definitions to schedule containers:
# Task definition -> Service -> Cluster`,
      visualizerType: "null"
    },
    {
      id: 524,
      title: "Configuring AWS CLI",
      intro: "Controlling AWS services locally using the AWS command line interface.",
      explanation: "The AWS CLI is a command-line tool for managing AWS resources. Installing the tool and running 'aws configure' sets up authentication by requesting your IAM User's access keys, default deployment region, and output formatting option.",
      gotchas: [
        "Do not configure AWS CLI with your Root account credentials. If your computer is compromised, access to the entire AWS billing account is lost."
      ],
      interviewQuestions: [
        {
          question: "How do you authenticate your local computer to command your AWS resources via CLI?",
          answer: "Install AWS CLI, generate an Access Key ID and Secret Access Key for an IAM User, and configure them on your machine by running the 'aws configure' command."
        }
      ],
      code: `# Configuring the CLI
aws configure
# AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
# AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
# Default region name [None]: us-east-1
# Default output format [None]: json`,
      visualizerType: "null"
    },
    {
      id: 525,
      title: "Creating Cluster And Task",
      intro: "Structuring ECS compute groups and declaring task properties.",
      explanation: "To host containers, you create an ECS Cluster (a logical group of container tasks). Then, write a Task Definition—a JSON blueprint defining the container details: which Docker image to download, memory and CPU limits, port configurations, and logging formats.",
      gotchas: [
        "If you do not specify a task definition memory allocation, the Docker container might run out of memory and crash silently under processing workloads."
      ],
      interviewQuestions: [
        {
          question: "What is an ECS Task Definition?",
          answer: "It is a blueprint in JSON format that details one or more containers (up to 10) for your application, specifying Docker images, CPU/RAM allocations, network settings, and volume mounts."
        }
      ],
      code: `// Task Definition sample JSON
{
  "family": "telusuko-app",
  "containerDefinitions": [
    {
      "name": "java-web-app",
      "image": "openjdk:17-slim",
      "cpu": 256,
      "memory": 512,
      "portMappings": [{ "containerPort": 8080, "hostPort": 8080 }]
    }
  ]
}`,
      visualizerType: "null"
    },
    {
      id: 526,
      title: "Running The Task For Postgres",
      intro: "Launching a database container task on ECS Fargate serverless infrastructure.",
      explanation: "You can run database engines as container tasks on ECS. Create a Task Definition for PostgreSQL, injecting environment variables like POSTGRES_PASSWORD. Run the task using Fargate, assign a public IP, and configure security groups to allow traffic on port 5432.",
      gotchas: [
        "Containers are transient. If you run PostgreSQL on ECS Fargate without mounting an external volume (like AWS EFS), your database records will disappear if the task restarts."
      ],
      interviewQuestions: [
        {
          question: "Why should you avoid running databases on serverless container platforms without persistent storage?",
          answer: "Because container instances are ephemeral. If the container crashes or scales down, all data stored in the container's local file layer is destroyed forever."
        }
      ],
      code: `# Command to start a container task under Fargate launch type:
# aws ecs run-task --cluster telusuko-cluster --task-definition postgres-task --launch-type FARGATE --network-configuration "awsvpcConfiguration={subnets=[subnet-xx],securityGroups=[sg-xx],assignPublicIp=ENABLED}"`,
      visualizerType: "null"
    },
    {
      id: 527,
      title: "Pushing The Docker Image To ECR",
      intro: "Storing custom Docker images in Amazon Elastic Container Registry.",
      explanation: "Amazon ECR is a private Docker image registry. To deploy custom applications to ECS, build the image locally, retrieve an authorization token to authenticate your local Docker client to your ECR registry, tag your local image with your ECR repository URI, and execute 'docker push'.",
      gotchas: [
        "The login token retrieved via 'aws ecr get-login-password' is valid for only 12 hours. You must log in again after expiration."
      ],
      interviewQuestions: [
        {
          question: "What is Amazon ECR?",
          answer: "Amazon Elastic Container Registry (ECR) is a managed AWS container image registry service that secure, manages, and deploys Docker container images."
        }
      ],
      code: `# Authenticate local Docker with AWS ECR:
# aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

# Tag image:
# docker tag my-app:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/telusuko-repo:latest

# Push image:
# docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/telusuko-repo:latest`,
      visualizerType: "null"
    },
    {
      id: 528,
      title: "Running Java App Task",
      intro: "Running the Spring Boot container task in ECS connected to Postgres.",
      explanation: "With the Spring Boot Docker image uploaded to ECR, create a new ECS Task Definition pointing to the ECR image URI. Pass database connection parameters (referencing the Postgres host or RDS instance) as environment parameters in the Task configuration. Launch the task under Fargate.",
      gotchas: [
        "Verify your ECS tasks reside in the same VPC subnet or have network security group rules configured to allow mutual connection, otherwise the app will crash due to database connection timeout."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between an ECS Task and an ECS Service?",
          answer: "An ECS Task is a single running instance of a task definition. An ECS Service is a configuration that runs and maintains a specified number of simultaneous task instances in a cluster, coordinating auto-healing and load balancer registration."
        }
      ],
      code: `# Running the Java Web application task on ECS Fargate
# aws ecs run-task --cluster telusuko-cluster --task-definition java-app-task --launch-type FARGATE --network-configuration "awsvpcConfiguration={subnets=[subnet-xx],securityGroups=[sg-xx],assignPublicIp=ENABLED}"`,
      visualizerType: "null"
    }
  ]
};
