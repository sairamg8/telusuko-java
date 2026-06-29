export default {
  id: 11,
  title: "Threads & Concurrency",
  range: "102-107",
  concepts: [
    {
      id: 102,
      title: "What Are Threads?",
      intro: "Lightweight execution paths. Breaking single-threaded bottlenecks.",
      explanation: "A thread is a lightweight sub-process, the smallest unit of execution. Every Java application has at least one thread: the main thread. Threads share the process's heap memory but maintain their own private Stack for local variables.",
      gotchas: [
        "Concurrent execution is often simulated on single-core CPUs via rapid context switching (time-slicing). It only runs truly in parallel on multi-core systems."
      ],
      interviewQuestions: [
        {
          question: "How do threads differ from processes?",
          answer: "Processes have isolated memory spaces and are heavy to spawn. Threads run within a process, share memory/heap, and are much faster to create and switch."
        }
      ],
      code: `// Finding the current thread executing this line:
System.out.println("Current thread: " + Thread.currentThread().getName());`,
      visualizerType: "jvm"
    },
    {
      id: 103,
      title: "Multiple Threads",
      intro: "Doing multiple things at once: compiling, serving requests, and fetching logs.",
      explanation: "Java allows you to execute multiple threads concurrently. You can create a thread by extending the `Thread` class. Calling `start()` triggers a request to the OS scheduler to begin execution, which eventually invokes the `run()` method.",
      gotchas: [
        "Never call `run()` directly! Calling `run()` executes the code inside the current thread synchronously like a normal method call. Call `start()` to spawn a new thread."
      ],
      interviewQuestions: [
        {
          question: "What happens if you call start() twice on the same Thread instance?",
          answer: "It throws an IllegalThreadStateException at runtime. A thread cannot be restarted once it has finished or started."
        }
      ],
      code: `class MyThread extends Thread {
    public void run() {
        System.out.println("Child thread running: " + Thread.currentThread().getName());
    }
}
// In Main:
MyThread t1 = new MyThread();
t1.start(); // Spawns new thread`,
      visualizerType: "jvm"
    },
    {
      id: 104,
      title: "Thread Priority and Sleep",
      intro: "Slowing down execution and advising the scheduler.",
      explanation: "Thread priorities (1 to 10) advise the thread scheduler on which thread to prioritize, though it is platform-dependent and not guaranteed. `Thread.sleep(millis)` pauses thread execution for a specified duration, throwing a checked `InterruptedException`.",
      gotchas: [
        "Thread.sleep() does NOT release any object locks the thread is currently holding. Other threads waiting for the resource remain blocked."
      ],
      interviewQuestions: [
        {
          question: "Can we guarantee thread execution order using priorities?",
          answer: "No. Thread scheduling is highly platform-dependent (green threads vs native OS threads). Priorities are merely hints; never rely on them for logical synchronization."
        }
      ],
      code: `class Worker extends Thread {
    public void run() {
        try {
            System.out.println("Sleeping...");
            Thread.sleep(1000); // Sleep for 1 second
            System.out.println("Woke up!");
        } catch (InterruptedException e) {
            System.out.println("Interrupted!");
        }
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 105,
      title: "Runnable vs Thread",
      intro: "Interface-based concurrency vs Class-based concurrency.",
      explanation: "Extending `Thread` limits your class from inheriting any other class (Java lacks multiple inheritance). Implementing `Runnable` keeps your class open to extending other classes, separating task definitions from execution details.",
      gotchas: [
        "Runnable defines the task. To run it, you must wrap it inside a Thread instance: `new Thread(myRunnable).start();`."
      ],
      interviewQuestions: [
        {
          question: "Why is implementing Runnable preferred over extending Thread?",
          answer: "Implementing Runnable supports single-inheritance compliance, separates the executable task from the thread runner, and allows integration with ExecutorServices (Thread Pools)."
        }
      ],
      code: `Runnable task = () -> System.out.println("Running task: " + Thread.currentThread().getName());
Thread t = new Thread(task);
t.start();`,
      visualizerType: "jvm"
    },
    {
      id: 106,
      title: "Race Condition",
      intro: "When multiple threads corrupt shared state. The need for synchronized.",
      explanation: "When two or more threads attempt to read and modify a shared variable simultaneously, updates can override each other. Marking methods or blocks as `synchronized` locks the monitor, allowing only one thread inside at a time.",
      gotchas: [
        "Over-synchronizing blocks slows down execution, rendering multi-core systems idle. Keep synchronized blocks as small as possible."
      ],
      interviewQuestions: [
        {
          question: "What is a deadlock and how does it happen?",
          answer: "A deadlock occurs when Thread A holds Lock 1 and waits for Lock 2, while Thread B holds Lock 2 and waits for Lock 1. Both wait infinitely, freezing the application."
        }
      ],
      code: `class Counter {
    private int count = 0;
    // synchronized prevents concurrent corruption!
    public synchronized void increment() {
        count++;
    }
    public int getCount() { return count; }
}`,
      visualizerType: "memory"
    },
    {
      id: 107,
      title: "Thread States",
      intro: "The lifecycle stages of a Java thread.",
      explanation: "A thread can reside in one of six states: 1. NEW (not started), 2. RUNNABLE (ready to execute), 3. BLOCKED (waiting for monitor lock), 4. WAITING (waiting indefinitely for notify), 5. TIMED_WAITING (waiting with timer, e.g., sleep), 6. TERMINATED (execution completed).",
      gotchas: [
        "A thread in BLOCKED state is waiting to acquire a synchronized monitor lock, whereas WAITING state implies waiting for another thread's explicit notification (wait/notify)."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between wait() and sleep()?",
          answer: "wait() is a method of Object class that releases the monitor lock and waits for notify(). sleep() is a static method of Thread class that keeps the lock while pausing."
        }
      ],
      code: `// Thread states are represented by the Thread.State enum:
Thread.State state = Thread.currentThread().getState();
System.out.println("State: " + state);`,
      visualizerType: "jvm"
    }
  ]
};
