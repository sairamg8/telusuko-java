export const q_31_40 = [
  {
    "id": 31,
    "category": "React 19",
    "level": "Advanced",
    "title": "React 19 useFormStatus Hook",
    "companies": [
      "Meta",
      "Google"
    ],
    "question": "How does the useFormStatus hook work in React 19?",
    "answer": "useFormStatus allows child input components to read the submission status of their parent form (e.g., checking if pending is true) without passing down props or setting up custom context providers.",
    "checklist": [
      "Reads parent form state",
      "Must be used inside form children",
      "Returns { pending, data, method, action }"
    ]
  },
  {
    "id": 32,
    "category": "React 19",
    "level": "Advanced",
    "title": "React 19 useOptimistic Hook",
    "companies": [
      "Meta",
      "Uber"
    ],
    "question": "What is the useOptimistic hook in React 19?",
    "answer": "useOptimistic is a hook that manages optimistic UI updates during asynchronous operations, providing an immediate temporary state display which reverts back to standard state once the promise settles.",
    "checklist": [
      "Applies instant mock state updates",
      "Reverts automatically on settle",
      "Simplifies manual cache rollbacks"
    ]
  },
  {
    "id": 33,
    "category": "React 19",
    "level": "Advanced",
    "title": "React 19 'use' hook for Promises",
    "companies": [
      "Meta",
      "Netflix"
    ],
    "question": "How does the new 'use' hook read Promises in React 19?",
    "answer": "The 'use' hook reads values directly from resolved promises or context during the render phase. Unlike standard hooks, 'use' can be called conditionally or inside loops, prompting Suspense fallbacks while promises are pending.",
    "checklist": [
      "Reads values from Promises/Context",
      "Can be called conditionally/in loops",
      "Integrates with Suspense boundaries"
    ]
  },
  {
    "id": 34,
    "category": "React 19",
    "level": "Advanced",
    "title": "React 19 ref as a standard prop",
    "companies": [
      "Meta",
      "Vercel"
    ],
    "question": "What are the changes to refs in React 19?",
    "answer": "In React 19, forwardRef is no longer needed. You can pass a 'ref' as a standard prop directly to custom functional components, simplifying component signatures and typing rules.",
    "checklist": [
      "Deprecates forwardRef",
      "Pass ref as standard prop",
      "Simplifies custom component references"
    ]
  },
  {
    "id": 35,
    "category": "React Core",
    "level": "Advanced",
    "title": "React compiler (Forget)",
    "companies": [
      "Meta",
      "Vercel"
    ],
    "question": "What is the React Compiler (React Forget) and how does it optimize apps?",
    "answer": "React Compiler is an automated compiler that analyzes components and hooks at build-time, injecting cache instructions automatically to memoize components, props, and calculations, eliminating manual useMemo and useCallback statements.",
    "checklist": [
      "Build-time compiler optimizations",
      "Eliminates manual useMemo/useCallback",
      "Requires strict purity compliance"
    ]
  },
  {
    "id": 36,
    "category": "React Core",
    "level": "Advanced",
    "title": "React Profiler API",
    "companies": [
      "Google",
      "Facebook"
    ],
    "question": "How do you measure rendering performance using the Profiler API?",
    "answer": "Wrap a component tree in a `<Profiler>` boundary and specify an onRender callback function. The callback receives profiling metrics like commit time, actual duration, and base duration for analysis.",
    "checklist": [
      "<Profiler id='app' onRender={cb}>",
      "Measures commit and render duration",
      "Identifies slow component bottlenecks"
    ]
  },
  {
    "id": 37,
    "category": "React Core",
    "level": "Advanced",
    "title": "List Virtualization Mechanics",
    "companies": [
      "Netflix",
      "Amazon"
    ],
    "question": "Explain the mechanics of Row/List Virtualization.",
    "answer": "Row virtualization keeps only visible list items inside the DOM viewport plus a small buffer. As the user scrolls, off-screen nodes are unmounted and on-screen nodes are positioned dynamically inside a container with a simulated height.",
    "checklist": [
      "Renders only visible items",
      "Reduces total active DOM nodes",
      "Essential for list scaling (10k+ rows)"
    ]
  },
  {
    "id": 38,
    "category": "TanStack Table",
    "level": "Advanced",
    "title": "TanStack Table Headless Engine",
    "companies": [
      "Vercel",
      "Airbnb"
    ],
    "question": "What does it mean that TanStack Table is 'headless'?",
    "answer": "TanStack Table is a headless library, meaning it manages sorting, pagination, filtering, column visibility, and row selection states under the hood but does not render any HTML markup or CSS styling, leaving design to the developer.",
    "checklist": [
      "Headless table state engine",
      "Developer designs HTML markup & styles",
      "Flexible state integrations"
    ]
  },
  {
    "id": 39,
    "category": "TanStack Table",
    "level": "Advanced",
    "title": "Row ID Preservation in virtual table",
    "companies": [
      "Goldman Sachs",
      "Citadel"
    ],
    "question": "How do you preserve row selections during data updates in TanStack Table?",
    "answer": "Provide a custom 'getRowId' selector callback (e.g. getRowId: row => row.uuid) to map selections to stable database primary keys. By default, it maps to array indexes, causing selected indexes to shift when sorting or filtering.",
    "checklist": [
      "getRowId: custom selector mapping",
      "Avoids index shifting bugs",
      "Preserves table selection states across data loads"
    ]
  },
  {
    "id": 40,
    "category": "React Hooks",
    "level": "Advanced",
    "title": "useTransition for non-blocking state",
    "companies": [
      "Meta",
      "Netflix"
    ],
    "question": "What is the purpose of useTransition and how does it prevent UI freezing?",
    "answer": "useTransition allows developers to mark state updates as low-priority transitions. The browser keeps the active UI responsive (like text inputs) while the slow background rendering calculates asynchronously, showing a pending indicator.",
    "checklist": [
      "Mark updates as non-blocking",
      "Keeps user inputs highly responsive",
      "Provides isPending boolean indicator"
    ]
  }
];
export default q_31_40;
