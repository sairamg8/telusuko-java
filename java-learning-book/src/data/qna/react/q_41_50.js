export const q_41_50 = [
  {
    "id": 41,
    "category": "React Hooks",
    "level": "Advanced",
    "title": "useDeferredValue hook",
    "companies": [
      "Meta",
      "Google"
    ],
    "question": "How does useDeferredValue differ from standard debouncing?",
    "answer": "Debouncing introduces a fixed timeout delay before executing updates. useDeferredValue schedules background updates instantly and interrupts them if new inputs arrive, rendering the deferred value only when CPU is idle.",
    "checklist": [
      "Calculates updates during CPU idle",
      "Interruptible background renders",
      "No fixed latency delay constraints"
    ]
  },
  {
    "id": 42,
    "category": "React Core",
    "level": "Advanced",
    "title": "React Portals for Modal layouts",
    "companies": [
      "Airbnb",
      "Uber"
    ],
    "question": "Why use createPortal to render modals and overlays?",
    "answer": "createPortal renders children into a physical DOM node located outside the parent component tree (e.g. document.body) to bypass CSS styling limits (like overflow: hidden or z-index constraints) while maintaining React event bubbles.",
    "checklist": [
      "Renders nodes outside parent DOM trees",
      "Bypasses overflow/z-index restrictions",
      "Maintains React context and event bubble hierarchies"
    ]
  },
  {
    "id": 43,
    "category": "React Core",
    "level": "Advanced",
    "title": "React Suspense for Code Splitting",
    "companies": [
      "Microsoft",
      "LinkedIn"
    ],
    "question": "How do React.lazy and Suspense work together for bundle optimization?",
    "answer": "React.lazy dynamically imports a component as a separate JS chunk (e.g. const Panel = lazy(() => import('./Panel'))). Suspense wraps it and renders a fallback spinner (e.g. <Suspense fallback={<Loader />}>) while the chunk fetches.",
    "checklist": [
      "lazy() splits script bundles",
      "Suspense handles loading boundaries",
      "Reduces initial JS load weight"
    ]
  },
  {
    "id": 44,
    "category": "React Core",
    "level": "Expert",
    "title": "Concurrent Mode Fibers",
    "companies": [
      "Meta",
      "Google"
    ],
    "question": "What is the Fiber architecture and how does it support Concurrent Mode?",
    "answer": "Fiber is React's core reconciliation engine since v16. It replaces the synchronous call stack with a virtual stack of fiber nodes. It allows React to pause rendering, break work into chunks, prioritize updates, and resume rendering asynchronously.",
    "checklist": [
      "Virtual call stack architecture",
      "Chunk-based incremental updates",
      "Supports pause and resume concurrency"
    ]
  },
  {
    "id": 45,
    "category": "React Core",
    "level": "Expert",
    "title": "Custom renderers with ReactReconciler",
    "companies": [
      "Meta",
      "Expo"
    ],
    "question": "How do custom React renderers (like React Native or react-three-fiber) work?",
    "answer": "Custom renderers import 'react-reconciler' and pass configuration blocks defining how to create, append, delete, and update host elements (e.g. IOS views or Three.js objects) while leveraging React's core diffing mechanics.",
    "checklist": [
      "react-reconciler package",
      "Configures host environment mutations",
      "Binds React lifecycle to custom contexts"
    ]
  },
  {
    "id": 46,
    "category": "React Core",
    "level": "Expert",
    "title": "Server-side Hydration mechanics",
    "companies": [
      "Vercel",
      "Meta"
    ],
    "question": "Explain the client-side hydration process in React.",
    "answer": "Hydration is the process where client-side React parses the server-rendered static HTML, boots up in memory, attaches event listeners to physical DOM nodes, and binds active state hooks without re-rendering the actual elements.",
    "checklist": [
      "Binds JS events to server-rendered HTML",
      "Validates DOM structures",
      "Enables client-side interactivity on load"
    ]
  },
  {
    "id": 47,
    "category": "React Hooks",
    "level": "Expert",
    "title": "useImperativeHandle custom refs",
    "companies": [
      "Uber",
      "Stripe"
    ],
    "question": "Explain useImperativeHandle and when it is required.",
    "answer": "useImperativeHandle customizes the ref instance value exposed to parent components when querying custom child components. Instead of exposing raw DOM nodes, it returns focused custom objects containing select API methods.",
    "checklist": [
      "Hides internal component DOM structures",
      "Exposes select handler API objects",
      "Must be used with ref parameters"
    ]
  },
  {
    "id": 48,
    "category": "React Hooks",
    "level": "Expert",
    "title": "useSyncExternalStore Hook",
    "companies": [
      "Meta",
      "JPMorgan"
    ],
    "question": "Why was useSyncExternalStore introduced and when should you use it?",
    "answer": "useSyncExternalStore was introduced in React 18 to subscribe to external data sources (like state libraries or window APIs) in a way that is safe for Concurrent rendering, preventing 'tearing' (displaying inconsistent values during updates).",
    "checklist": [
      "Prevents concurrent UI tearing",
      "Subscribes to off-heap/external stores",
      "Returns snapshot values safely"
    ]
  },
  {
    "id": 49,
    "category": "React 19",
    "level": "Expert",
    "title": "React 19 Document Metadata rendering",
    "companies": [
      "Meta",
      "Vercel"
    ],
    "question": "How does React 19 natively manage head elements (<title>, <meta>)?",
    "answer": "React 19 supports declaring title, meta, and link tags directly within component trees. During render, React automatically hoists these tags to the document head and handles deduplication and overrides dynamically.",
    "checklist": [
      "Native hoisting of head tags",
      "Deduplicates meta/link definitions",
      "Eliminates libraries like react-helmet"
    ]
  },
  {
    "id": 50,
    "category": "React 19",
    "level": "Expert",
    "title": "React 19 Stylesheet Preloading precedence",
    "companies": [
      "Meta",
      "Vercel"
    ],
    "question": "How does React 19 handle stylesheet preloading and loading boundaries?",
    "answer": "React 19 introduces stylesheet precedence rules. By passing dynamic 'precedence' properties to link tags, React ensures stylesheets are loaded in the head before components render, preventing flash of unstyled content (FOUC).",
    "checklist": [
      "Precedence parameter controls load order",
      "Eliminates flash of unstyled content",
      "Hoists link tags dynamically to the head"
    ]
  }
];
export default q_41_50;
