export default {
  id: 35,
  title: "Data Structures & Algorithms (DSA)",
  range: "620-649",
  concepts: [
    {
      id: 620,
      title: "What are Data Structures",
      intro: "Organizing and storing data in computer memory for efficient retrieval and modification.",
      explanation: "A data structure is a logical method of organizing, storing, and managing data in a computer's memory so that operations (such as search, insert, and delete) can be performed efficiently. Different structures are optimized for different scenarios (e.g., Arrays for constant-time index reads, Stacks for Last-In-First-Out execution, and Trees for hierarchical representations).",
      gotchas: [
        "There is no single 'best' data structure. Selecting the wrong data structure can make an application run significantly slower and consume unnecessary memory."
      ],
      interviewQuestions: [
        {
          question: "Why do we need different types of data structures?",
          answer: "Because different operations require different performance profiles. For example, arrays are fast for accessing items by index, but slow for insertion. Linked lists are fast for insertion but slow for search. We choose data structures based on the target runtime demands."
        }
      ],
      code: `// Matching structures to scenarios:
// - Access by position: Array
// - History backtracking: Stack
// - Printer task queue: Queue
// - Relational hierarchy: Tree`,
      visualizerType: "null"
    },
    {
      id: 621,
      title: "Abstract Data Types",
      intro: "Defining data containers by their behavior interfaces rather than memory structures.",
      explanation: "An Abstract Data Type (ADT) is a conceptual definition of a data structure specifying the data values and the operations supported, without describing *how* they are implemented. In Java, ADTs are represented by Interfaces (like 'List' or 'Queue'), while the concrete implementation classes (like 'ArrayList' or 'LinkedList') represent the actual Data Structures.",
      gotchas: [
        "You cannot instantiate an ADT interface directly using 'new' (e.g., new List()). You must instantiate a concrete implementation class."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between an ADT and a Data Structure?",
          answer: "An ADT defines the interface and behaviors of a data container (what it does, e.g., List interface). A Data Structure is the concrete implementation of that behavior in code (how it does it, e.g., ArrayList class)."
        }
      ],
      code: `// ADT definition (Java Interface)
public interface StackADT {
    void push(int element);
    int pop();
    int peek();
    boolean isEmpty();
}`,
      visualizerType: "jvm"
    },
    {
      id: 622,
      title: "Arrays",
      intro: "Storing homogeneous elements in a contiguous block of memory.",
      explanation: "An array is a linear data structure containing elements of the same type stored in contiguous memory cells. Because memory addresses are contiguous, computing the position of any element requires a simple math formula, resulting in O(1) constant-time access by index.",
      gotchas: [
        "Arrays have a fixed size. Once allocated, they cannot grow or shrink. To resize, you must create a new larger array and copy all values."
      ],
      interviewQuestions: [
        {
          question: "Explain why accessing an element in an array takes O(1) time.",
          answer: "Because elements are stored in contiguous memory. The computer calculates the memory address of the i-th element instantly using: Address = Base_Address + (Index * Element_Size), bypassing traversal."
        }
      ],
      code: `// Declaring and accessing a Java array
int[] marks = new int[5]; // Fixed size
marks[0] = 90; // O(1) assignment
int score = marks[0]; // O(1) retrieval`,
      visualizerType: "memory"
    },
    {
      id: 623,
      title: "Big O Notation, Time Complexity",
      intro: "Using mathematical limits to measure algorithm efficiency as inputs grow.",
      explanation: "Big O notation measures the execution runtime or memory requirements of an algorithm relative to the size of its input (n) in the worst-case scenario. It classifies growth rates: O(1) (Constant), O(log n) (Logarithmic), O(n) (Linear), O(n log n) (Log-linear), and O(n^2) (Quadratic).",
      gotchas: [
        "Big O measures scale efficiency, not actual clock seconds. An O(n) algorithm with massive setup routines might take longer than an O(n^2) algorithm for small datasets."
      ],
      interviewQuestions: [
        {
          question: "Rank the following complexities from most efficient to least efficient: O(n log n), O(n^2), O(1), O(log n), O(n).",
          answer: "O(1) (most efficient) < O(log n) < O(n) < O(n log n) < O(n^2) (least efficient)."
        }
      ],
      code: `// O(1) - Constant Time:
int val = arr[0];

// O(n) - Linear Time:
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}`,
      visualizerType: "jvm"
    },
    {
      id: 624,
      title: "Linear & Binary Search Code | Big O Notation",
      intro: "Comparing sequential iteration with logarithmic divide-and-conquer searches.",
      explanation: "Linear search checks every index sequentially, taking O(n) time. Binary search divides the search space in half repeatedly, taking O(log n) time. However, Binary Search requires that the input array be sorted beforehand.",
      gotchas: [
        "Executing binary search on an unsorted array results in unpredictable errors or loops."
      ],
      interviewQuestions: [
        {
          question: "Why is Binary Search faster than Linear Search, and what is its prerequisite?",
          answer: "Binary Search operates in O(log n) time compared to O(n) for Linear Search because it eliminates half of the remaining elements at each step. Its prerequisite is that the input array must be sorted."
        }
      ],
      code: `// Binary Search in Java
public static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid; // Found index
        if (arr[mid] < target) low = mid + 1; // Search right half
        else high = mid - 1; // Search left half
    }
    return -1; // Not found
}`,
      visualizerType: "jvm"
    },
    {
      id: 625,
      title: "Bubble Sort Theory",
      intro: "Sorting elements by repeatedly comparing and swapping adjacent pairs.",
      explanation: "Bubble Sort is a simple sorting algorithm. It steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. This process repeats, 'bubbling' the largest unsorted element to its correct end position with each pass.",
      gotchas: [
        "Bubble Sort has a quadratic time complexity of O(n^2) in the average and worst cases, making it highly inefficient for large arrays."
      ],
      interviewQuestions: [
        {
          question: "How can you optimize Bubble Sort to run in O(n) time for sorted arrays?",
          answer: "By introducing a boolean swap flag. If a complete pass through the array is completed without performing any swaps, the array is already sorted, and we can break the loop early."
        }
      ],
      code: `# Bubble Sort Comparison process:
# Pass 1: Compare [j] and [j+1]. Swap if [j] > [j+1].
# Repeat until the remaining unsorted portion is sorted.`,
      visualizerType: "null"
    },
    {
      id: 626,
      title: "Bubble Sort Code",
      intro: "Implementing the optimized Bubble Sort algorithm in Java.",
      explanation: "We write a double nested loop structure. The outer loop decrements the unsorted search space, and the inner loop compares and swaps. We include the early termination flag optimization.",
      gotchas: [
        "The inner loop boundary must decrease with each pass ('j < n - 1 - i') to avoid re-comparing elements that are already sorted at the end."
      ],
      interviewQuestions: [
        {
          question: "Write the code for an optimized Bubble Sort in Java.",
          answer: "(Refer to the code block below)."
        }
      ],
      code: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    boolean swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break; // Optimization: early stop
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 627,
      title: "Selection Sort Theory",
      intro: "Sorting by repeatedly selecting the minimum element and placing it at the front.",
      explanation: "Selection Sort divides the array into a sorted and unsorted boundary. It scans the unsorted region to find the absolute minimum value, swaps it with the first unsorted element, and advances the sorted boundary by one cell.",
      gotchas: [
        "Selection Sort always runs in O(n^2) time regardless of input order because it must scan the unsorted subarray to find the minimum, offering no best-case shortcut."
      ],
      interviewQuestions: [
        {
          question: "What is the primary advantage of Selection Sort over Bubble Sort?",
          answer: "It performs a maximum of O(n) write swaps, whereas Bubble Sort can perform up to O(n^2) swaps. This makes Selection Sort efficient when write operations to memory are expensive."
        }
      ],
      code: `# Selection Sort tracing:
# [64, 25, 12, 22] -> Min is 12. Swap with 64 -> [12, 25, 64, 22]
# [12, 25, 64, 22] -> Min in unsorted is 22. Swap with 25 -> [12, 22, 64, 25]`,
      visualizerType: "null"
    },
    {
      id: 628,
      title: "Selection Sort Code",
      intro: "Implementing the Selection Sort algorithm in Java.",
      explanation: "The outer loop tracks the current boundary index 'i'. The inner loop scans from 'i+1' to the end to locate the index containing the minimum value. A swap is then executed.",
      gotchas: [
        "Only execute the swap if the minimum index found is different from 'i' to avoid unnecessary memory writes."
      ],
      interviewQuestions: [
        {
          question: "Provide the Java code for Selection Sort.",
          answer: "(Refer to the code block below)."
        }
      ],
      code: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j; // Track index of smallest element
            }
        }
        // Swap the found minimum element with the first element
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 629,
      title: "Insertion Sort Theory",
      intro: "Sorting by building a sorted array slice one item at a time.",
      explanation: "Insertion Sort operates like sorting playing cards. It iterates through the array, picks a 'key' element, and inserts it into its correct position within the sorted sublist preceding it by shifting larger elements one position to the right.",
      gotchas: [
        "Its worst-case complexity is O(n^2) (for reverse-sorted arrays), but it runs in O(n) for already sorted lists."
      ],
      interviewQuestions: [
        {
          question: "When is Insertion Sort preferred in practical software?",
          answer: "It is preferred for small datasets and for datasets that are already nearly sorted, due to its low overhead and O(n) best-case performance."
        }
      ],
      code: `# Insertion Sort key shifts:
# Sorted: [3, 8] | Unsorted: [5, 2] -> Key = 5
# Shift 8 -> [3, _, 8] -> Insert 5 -> [3, 5, 8]`,
      visualizerType: "null"
    },
    {
      id: 630,
      title: "Insertion Sort Code",
      intro: "Implementing the Insertion Sort algorithm in Java.",
      explanation: "We start from index 1. The outer loop moves forward, and the inner loop runs backward, shifting elements to the right until the correct insertion location for the 'key' is found.",
      gotchas: [
        "Ensure the shifting loop condition has 'j >= 0' placed first to prevent negative index bounds errors."
      ],
      interviewQuestions: [
        {
          question: "Write Java code for Insertion Sort.",
          answer: "(Refer to the code block below)."
        }
      ],
      code: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Shift elements of arr[0..i-1] that are greater than key
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      visualizerType: "jvm"
    },
    {
      id: 631,
      title: "Divide and Conquer",
      intro: "Solving complex problems by breaking them into smaller solvable subproblems.",
      explanation: "Divide and Conquer is an algorithmic paradigm that works by recursively: 1. Dividing the problem into subproblems of the same type. 2. Conquering the subproblems by solving them. 3. Combining the subproblem solutions to solve the original problem.",
      gotchas: [
        "Recursion can consume high memory overhead due to stack frame allocations. Highly recursive algorithms may fail on small stack environments."
      ],
      interviewQuestions: [
        {
          question: "Name three algorithms that utilize the Divide and Conquer design pattern.",
          answer: "Binary Search, Merge Sort, and Quick Sort."
        }
      ],
      code: `# Divide and Conquer flow:
#           [Input Array]
#           /           \\      (Divide)
#    [Left Half]     [Right Half]
#         |               |     (Conquer/Sort)
#    [Sorted Left]   [Sorted Right]
#           \\           /      (Combine/Merge)
#         [Sorted Output Array]`,
      visualizerType: "null"
    },
    {
      id: 632,
      title: "Tree Introduction",
      intro: "Structuring data hierarchically using nodes and child edge links.",
      explanation: "A Tree is a non-linear hierarchical data structure. It consists of nodes containing values, connected by directed edges. The topmost node is the Root. Nodes beneath are Child nodes, and nodes without children are Leaf nodes.",
      gotchas: [
        "Unlike graphs, trees must have exactly one root, and there can be no cycles or loops in the links."
      ],
      interviewQuestions: [
        {
          question: "What defines a tree data structure compared to a graph?",
          answer: "A tree is a connected graph with no cycles. There is exactly one path between any two nodes in a tree, and it starts with a single root node."
        }
      ],
      code: `// Simple Tree Node definition:
class TreeNode {
    int val;
    List<TreeNode> children;
    TreeNode(int x) { val = x; }
}`,
      visualizerType: "memory"
    },
    {
      id: 633,
      title: "Recursion",
      intro: "Writing methods that call themselves to resolve simplified sub-operations.",
      explanation: "Recursion is a programming technique where a method invokes itself. Every recursive function must contain: 1. Base Case (terminates recursion). 2. Recursive Case (calls the method with simplified parameters).",
      gotchas: [
        "Forgetting or incorrectly implementing the base case leads to infinite loops, throwing a StackOverflowError in Java."
      ],
      interviewQuestions: [
        {
          question: "What is a StackOverflowError and how does recursion cause it?",
          answer: "Each recursive call allocates a method stack frame in memory. If recursion goes too deep without hitting a base case, it consumes the entire stack space, resulting in a StackOverflowError."
        }
      ],
      code: `// Calculating Factorial recursively
public static int factorial(int n) {
    if (n <= 1) return 1; // Base Case
    return n * factorial(n - 1); // Recursive Case
}`,
      visualizerType: "exception"
    },
    {
      id: 634,
      title: "Quick sort Theory",
      intro: "Fast sorting using pivot partitioning to organize elements.",
      explanation: "Quick Sort is a divide-and-conquer algorithm. It selects a 'pivot' element, partitions the array so that elements smaller than the pivot go to the left and larger elements go to the right, and then recursively sorts the left and right sub-arrays.",
      gotchas: [
        "If pivot selection is poor (e.g. choosing the last element of an already sorted array), performance degrades to quadratic O(n^2)."
      ],
      interviewQuestions: [
        {
          question: "What is the average and worst-case time complexity of Quick Sort?",
          answer: "Average time complexity is O(n log n). Worst-case is O(n^2), which occurs when the pivot partition is highly unbalanced."
        }
      ],
      code: `# Quick Sort partitioning concept:
# Array: [4, 1, 9, 3, 5] -> Pivot = 5
# Left (<5): [4, 1, 3] | Pivot: [5] | Right (>5): [9]`,
      visualizerType: "null"
    },
    {
      id: 635,
      title: "Quick Sort Code",
      intro: "Implementing Quick Sort using the Lomuto partition scheme in Java.",
      explanation: "1. Quick Sort works by picking a 'pivot' element and partitioning the array so all elements less than the pivot go left, all greater go right. Then recursively sort both halves. Average time complexity: O(n log n).\n2. The partition step: choose pivot (usually last element), use two pointers (i starts before the array, j scans forward). When arr[j] <= pivot, swap arr[++i] with arr[j]. After scanning, place pivot at arr[i+1]. Return i+1 as the partition index.\n3. Java code structure: `quickSort(arr, low, high)` → if (low < high): pi = partition(arr, low, high); quickSort(arr, low, pi-1); quickSort(arr, pi+1, high). Base case: low >= high (single element or empty subarray).\n4. Worst case O(n²) occurs when pivot is always the smallest or largest element (sorted/reverse-sorted arrays). Fix: use random pivot selection or median-of-three pivot to avoid worst case in practice.\n5. Quick Sort is in-place (no extra array needed, O(log n) stack space for recursion) but NOT stable (equal elements may change relative order). Preferred over Merge Sort for in-memory sorting due to better cache performance.",
      gotchas: [
        "Be careful with partition boundaries to avoid infinite recursive loops."
      ],
      interviewQuestions: [
        {
          question: "Write Java code for Quick Sort.",
          answer: "(Refer to the code block below)."
        }
      ],
      code: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);  // Recursively sort left
        quickSort(arr, pi + 1, high); // Recursively sort right
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high]; // Choosing last element as pivot
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
      visualizerType: "jvm"
    },
    {
      id: 636,
      title: "Merge Sort Theory",
      intro: "Guaranteed stable sorting using array splitting and sorted merging.",
      explanation: "Merge Sort is a divide-and-conquer algorithm. It recursively splits the array in half until individual elements remain, then merges these sorted sublists back together. It guarantees O(n log n) performance.",
      gotchas: [
        "Merge Sort is not an 'in-place' sort. It requires O(n) auxiliary temporary memory space to copy and merge elements."
      ],
      interviewQuestions: [
        {
          question: "What is a 'stable' sorting algorithm and is Merge Sort stable?",
          answer: "A sorting algorithm is stable if it preserves the relative order of duplicate elements. Merge Sort is stable because it preserves order during the merge phase."
        }
      ],
      code: `# Merge Sort Divide & Merge trace:
# [8, 4, 5, 2] -> Split -> [8, 4] and [5, 2] -> Split -> [8], [4], [5], [2]
# Merge -> [4, 8] and [2, 5] -> Merge -> [2, 4, 5, 8]`,
      visualizerType: "null"
    },
    {
      id: 637,
      title: "Merge Sort Code",
      intro: "Implementing the recursive Merge Sort algorithm in Java.",
      explanation: "1. Merge Sort uses divide-and-conquer: split the array in half recursively until single elements, then merge sorted halves back together. Time complexity: O(n log n) guaranteed — no worst case like Quick Sort's O(n²).\n2. Two functions needed: `mergeSort(arr, left, right)` — recursively divides; `merge(arr, left, mid, right)` — merges two sorted subarrays by comparing elements and placing the smaller one first.\n3. Merge step uses a temporary array: copy left and right halves into temp arrays L[] and R[]. Use three pointers (i for L, j for R, k for the merged position in arr) — pick the smaller of L[i] and R[j], copy to arr[k], advance pointer.\n4. Merge Sort is stable: equal elements maintain their original relative order (important for sorting objects by multiple fields). Quick Sort is not stable.\n5. Space complexity: O(n) extra space for the temp arrays during merging. This makes Merge Sort less cache-friendly than Quick Sort but essential for external sorting (when data doesn't fit in RAM — merge sorted chunks from disk).",
      gotchas: [
        "Ensure index pointers are correctly offset when copying elements back to the main array."
      ],
      interviewQuestions: [
        {
          question: "Write Java code for Merge Sort.",
          answer: "(Refer to the code block below)."
        }
      ],
      code: `public static void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

private static void merge(int[] arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int[] L = new int[n1];
    int[] R = new int[n2];
    System.arraycopy(arr, l, L, 0, n1);
    System.arraycopy(arr, m + 1, R, 0, n2);
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) { arr[k] = L[i]; i++; }
        else { arr[k] = R[j]; j++; }
        k++;
    }
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}`,
      visualizerType: "jvm"
    },
    {
      id: 638,
      title: "Linked List Theory",
      intro: "Linear elements linked dynamically using node references.",
      explanation: "A Linked List is a linear data structure composed of self-referencing Node objects. Each node contains a data field and a reference ('next') pointing to the next node. Unlike arrays, linked lists are not stored contiguously, allowing constant-time insertion/deletion but requiring linear traversal to access elements.",
      gotchas: [
        "Linked Lists do not support constant-time random access by index. Searching for the i-th element requires O(n) traversal."
      ],
      interviewQuestions: [
        {
          question: "Compare array and linked list insertion performance.",
          answer: "Inserting in an array takes O(n) because elements must be shifted. Inserting in a linked list takes O(1) if the insertion node pointer is already known, as only reference pointers need updating."
        }
      ],
      code: `// Node class structure for Singly Linked List
class Node {
    int data;
    Node next;
    Node(int val) {
        data = val;
        next = null;
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 639,
      title: "Linked List Code for Adding Values",
      intro: "Implementing Singly Linked List append operations.",
      explanation: "Create a SinglyLinkedList class maintaining a 'head' node pointer. Write an 'add()' method that traverses to the end of the list and appends a new node.",
      gotchas: [
        "If the list is empty (head is null), assign the new node directly to the head to avoid NullPointerExceptions."
      ],
      interviewQuestions: [
        {
          question: "Write Java code to append a value to a singly linked list.",
          answer: "(Refer to the code block below)."
        }
      ],
      code: `public class SinglyLinkedList {
    private Node head;

    public void add(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next; // Traverse to the last node
        }
        temp.next = newNode;
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 640,
      title: "Linked List AddFirst and Delete Code (Part 2)",
      intro: "Implementing prepend and value-based deletion operations.",
      explanation: "Write methods to insert at the beginning of a list ('addFirst') and to delete a node matching a target key by updating the pointer of the preceding node.",
      gotchas: [
        "When deleting the head node, update the head pointer to point to 'head.next'."
      ],
      interviewQuestions: [
        {
          question: "How do you delete a node in a Singly Linked List?",
          answer: "Locate the node prior to the target. Update its 'next' pointer to skip the target and point directly to the target node's 'next' reference."
        }
      ],
      code: `public void addFirst(int data) {
    Node newNode = new Node(data);
    newNode.next = head;
    head = newNode;
}

public void delete(int key) {
    if (head == null) return;
    if (head.data == key) {
        head = head.next; // Remove head
        return;
    }
    Node curr = head;
    while (curr.next != null && curr.next.data != key) {
        curr = curr.next;
    }
    if (curr.next != null) {
        curr.next = curr.next.next; // Skip target
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 641,
      title: "Stack Theory",
      intro: "A linear data structure operating on Last-In-First-Out behavior.",
      explanation: "A Stack is an abstract data type serving as a collection of elements with two primary operations: 'push' (adds an element to the top) and 'pop' (removes the top element). It operates on a Last-In-First-Out (LIFO) access pattern.",
      gotchas: [
        "Attempting to pop an element from an empty stack causes a Stack Underflow error."
      ],
      interviewQuestions: [
        {
          question: "What are some common use cases for a Stack data structure?",
          answer: "Backtracking algorithms, syntax parsing, undo-redo operations, and the JVM call stack tracking."
        }
      ],
      code: `# Stack LIFO order:
# Push 5  -> [5]
# Push 10 -> [5, 10] (Top = 10)
# Pop     -> Returns 10, Stack remains: [5]`,
      visualizerType: "null"
    },
    {
      id: 642,
      title: "Stack Code (Push)",
      intro: "Implementing array-based stack insertion operations.",
      explanation: "1. A Stack follows LIFO (Last In, First Out) order — the last element pushed is the first to be popped. Think of a stack of plates: you add and remove from the top.\n2. Array-based stack implementation: maintain an int `top` initialized to -1 (empty stack indicator). Push: increment top, then store element at arr[top]. If top reaches capacity-1, the stack is full (stack overflow).\n3. Push code: `void push(int val) { if (top == capacity-1) throw new RuntimeException('Stack Overflow'); arr[++top] = val; }` — the pre-increment ensures top points to the next available slot.\n4. Java's built-in Stack class (extends Vector) works but is synchronized (slow for single-threaded use). Prefer Deque as a stack: `Deque<Integer> stack = new ArrayDeque<>()`. Use push(), pop(), peek() methods.\n5. Push is O(1) — constant time regardless of stack size. The only exception is a dynamic stack backed by ArrayList which occasionally resizes (amortized O(1) still, but periodic O(n) resize copies).",
      gotchas: [
        "Always verify that the stack is not full (top == size - 1) before pushing to prevent array index out of bounds exceptions."
      ],
      interviewQuestions: [
        {
          question: "Write an array-based push method in Java.",
          answer: "(Refer to the code block below)."
        }
      ],
      code: `public class ArrayStack {
    private int[] arr;
    private int top;
    private int capacity;

    public ArrayStack(int size) {
        capacity = size;
        arr = new int[size];
        top = -1;
    }

    public void push(int val) {
        if (top == capacity - 1) {
            throw new RuntimeException("Stack Overflow");
        }
        arr[++top] = val; // Increment top and insert
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 643,
      title: "Stack Code (Pop & Peek)",
      intro: "Adding pop and peek operations to retrieve elements.",
      explanation: "1. Pop removes and returns the top element. Peek (also called top/peek) returns the top element WITHOUT removing it — useful to inspect the next item before deciding whether to pop.\n2. Pop code: `int pop() { if (top == -1) throw new RuntimeException('Stack Underflow'); return arr[top--]; }` — post-decrement: return the element at top first, then decrement top. Stack underflow = popping from empty stack.\n3. Peek code: `int peek() { if (top == -1) throw new RuntimeException('Stack Empty'); return arr[top]; }` — same underflow check but no modification to top.\n4. Real-world pop/peek uses: (1) Expression evaluation — peek to check operator precedence before deciding to pop; (2) Undo operations — pop the last action; (3) DFS traversal — pop the next node to visit.\n5. Common interview question: given a stack, implement getMin() in O(1). Solution: maintain a second 'minStack' that tracks the minimum at each level — push to minStack when new element <= current min; pop minStack when main stack pops that element.",
      gotchas: [
        "A stack is empty when 'top == -1'. Checking this prevents Stack Underflow errors."
      ],
      interviewQuestions: [
        {
          question: "Explain the difference between pop() and peek() in a stack.",
          answer: "pop() removes the top element and returns it, modifying the stack's size. peek() returns the value of the top element without removing it."
        }
      ],
      code: `public int pop() {
    if (top == -1) {
        throw new RuntimeException("Stack Underflow");
    }
    return arr[top--]; // Return value, then decrement top
}

public int peek() {
    if (top == -1) {
        throw new RuntimeException("Stack Empty");
    }
    return arr[top]; // Return value only
}`,
      visualizerType: "memory"
    },
    {
      id: 644,
      title: "Queue Theory",
      intro: "A linear data structure operating on First-In-First-Out behavior.",
      explanation: "A Queue is a linear data structure where elements are inserted at the back ('rear') and removed from the front ('front'). It follows a First-In-First-Out (FIFO) ordering.",
      gotchas: [
        "In a simple array-based queue, dequeueing elements creates empty space at the front of the array that cannot be reused without shifting all elements, wasting memory."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between a Stack and a Queue?",
          answer: "A Stack is LIFO (Last-In-First-Out) where insertions and removals occur at the same end. A Queue is FIFO (First-In-First-Out) where insertions occur at the rear and removals occur at the front."
        }
      ],
      code: `# Queue FIFO order:
# Enqueue 1 -> [1] (Front & Rear)
# Enqueue 2 -> [1, 2] (Front=1, Rear=2)
# Dequeue   -> Returns 1, Queue remains: [2]`,
      visualizerType: "null"
    },
    {
      id: 645,
      title: "Queue Code Enqueue And Dequeue",
      intro: "Implementing a linear queue in Java.",
      explanation: "1. A Queue follows FIFO (First In, First Out) order — the first element enqueued is the first to be dequeued. Think of a line at a bank: first person in line gets served first.\n2. Array-based queue uses two pointers: `front` (next to dequeue) and `rear` (next empty position to enqueue). Enqueue: store at arr[rear], increment rear. Dequeue: return arr[front], increment front.\n3. Circular queue fixes the wasted-space problem of linear queues: use modular arithmetic — `rear = (rear + 1) % capacity`. This reuses slots freed by dequeue without shifting all elements.\n4. Enqueue code: `void enqueue(int val) { if ((rear+1)%capacity == front) throw new RuntimeException('Queue Full'); arr[rear] = val; rear = (rear+1) % capacity; }` Dequeue: `int dequeue() { if (front == rear) throw new RuntimeException('Queue Empty'); int val = arr[front]; front = (front+1)%capacity; return val; }`\n5. Java built-in: use `Queue<Integer> q = new LinkedList<>()` or `ArrayDeque<Integer>`. Methods: offer() (enqueue), poll() (dequeue — returns null if empty), peek() (view front without removing). Never use add()/remove() unless you want exceptions on empty queue.",
      gotchas: [
        "Without circular wrap-around, 'rear' can reach the end of the array even if there are empty slots at the front."
      ],
      interviewQuestions: [
        {
          question: "Write Java code for a linear queue enqueue and dequeue.",
          answer: "(Refer to the code block below)."
        }
      ],
      code: `public class LinearQueue {
    private int[] arr;
    private int front, rear, capacity, size;

    public LinearQueue(int limit) {
        capacity = limit;
        arr = new int[limit];
        front = 0; rear = -1; size = 0;
    }

    public void enqueue(int val) {
        if (size == capacity) throw new RuntimeException("Queue Full");
        arr[++rear] = val;
        size++;
    }

    public int dequeue() {
        if (size == 0) throw new RuntimeException("Queue Empty");
        int val = arr[front++];
        size--;
        return val;
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 646,
      title: "Circular Queue Code",
      intro: "Optimizing array space reuse using circular wrap-around indexing.",
      explanation: "A Circular Queue solves memory wastage by wrapping the rear and front pointers back to index 0 when they reach capacity, using modulo math: '(index + 1) % capacity'.",
      gotchas: [
        "Keep track of the 'size' count separately to easily distinguish between full and empty queue states."
      ],
      interviewQuestions: [
        {
          question: "How does a circular queue handle pointer wrap-around?",
          answer: "By using the modulo operator during pointer increments, e.g., rear = (rear + 1) % capacity."
        }
      ],
      code: `public class CircularQueue {
    private int[] arr;
    private int front, rear, capacity, size;

    public CircularQueue(int limit) {
        capacity = limit;
        arr = new int[limit];
        front = 0; rear = -1; size = 0;
    }

    public void enqueue(int val) {
        if (size == capacity) throw new RuntimeException("Queue Full");
        rear = (rear + 1) % capacity; // Wrap around
        arr[rear] = val;
        size++;
    }

    public int dequeue() {
        if (size == 0) throw new RuntimeException("Queue Empty");
        int val = arr[front];
        front = (front + 1) % capacity; // Wrap around
        size--;
        return val;
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 647,
      title: "Tree Data Structure",
      intro: "Introduction to Binary Trees where each node has at most two children.",
      explanation: "A Binary Tree is a specific tree structure where each node has a maximum of two child nodes: left child and right child. It forms the base for sorting, search trees, and heap indices.",
      gotchas: [
        "Unbalanced binary trees can degrade traversal performance, becoming equivalent to a linear linked list."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between a full binary tree and a complete binary tree?",
          answer: "A Full Binary Tree is a tree where every node has either 0 or 2 children. A Complete Binary Tree is a tree where all levels are completely filled except possibly the last level, which is filled from left to right."
        }
      ],
      code: `// Binary Tree Node representation
public class BinaryTreeNode {
    int data;
    BinaryTreeNode left;
    BinaryTreeNode right;
    
    public BinaryTreeNode(int val) {
        data = val;
        left = null;
        right = null;
    }
}`,
      visualizerType: "memory"
    },
    {
      id: 648,
      title: "Binary Search Tree Theory",
      intro: "Structuring trees for logarithmic searches, insertions, and deletions.",
      explanation: "A Binary Search Tree (BST) is a binary tree where: 1. The left subtree contains only nodes with values less than the parent node. 2. The right subtree contains only nodes with values greater than the parent node. This structure allows searching, inserting, and deleting elements in O(log n) time.",
      gotchas: [
        "If elements are inserted in sorted order (e.g., 1, 2, 3, 4), the tree becomes skewed, and search complexity degrades to linear O(n)."
      ],
      interviewQuestions: [
        {
          question: "What is the search time complexity of a balanced BST compared to an unbalanced skewed BST?",
          answer: "A balanced BST takes O(log n) time. An unbalanced skewed BST degrades to O(n) time, as it resembles a singly linked list."
        }
      ],
      code: `# Binary Search Tree structure example:
#          50
#        /    \\
#       30     70
#      /  \\   /  \\
#     20  40 60  80`,
      visualizerType: "null"
    },
    {
      id: 649,
      title: "Tree Implementation",
      intro: "Coding recursive insertions and searches in a Binary Search Tree.",
      explanation: "We write a BinarySearchTree class containing a root node. We implement recursive helper methods 'insertRec' and 'searchRec' to traverse left or right subtrees based on value comparisons.",
      gotchas: [
        "Ensure the insertion helper returns the updated node pointer and reassigns it to the parent child pointers during recursion."
      ],
      interviewQuestions: [
        {
          question: "Write BST insertion and search methods in Java.",
          answer: "(Refer to the code block below)."
        }
      ],
      code: `public class BinarySearchTree {
    private Node root;

    private class Node {
        int data;
        Node left, right;
        Node(int val) { data = val; }
    }

    public void insert(int val) {
        root = insertRec(root, val);
    }

    private Node insertRec(Node root, int val) {
        if (root == null) {
            return new Node(val);
        }
        if (val < root.data) {
            root.left = insertRec(root.left, val);
        } else if (val > root.data) {
            root.right = insertRec(root.right, val);
        }
        return root;
    }

    public boolean search(int val) {
        return searchRec(root, val);
    }

    private boolean searchRec(Node root, int val) {
        if (root == null) return false;
        if (root.data == val) return true;
        return val < root.data ? searchRec(root.left, val) : searchRec(root.right, val);
    }
}`,
      visualizerType: "memory"
    }
  ]
};
