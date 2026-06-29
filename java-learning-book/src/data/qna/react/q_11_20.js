export const q_11_20 = [
  {
    "id": 11,
    "category": "React Hooks",
    "level": "Intermediate",
    "title": "Stale Closures in useEffect",
    "companies": [
      "Goldman Sachs",
      "Amazon"
    ],
    "question": "How do stale closures occur in useEffect and how do you resolve them?",
    "answer": "Stale closures occur when an effect captures values (like state or props) from its enclosing render scope, but those values are not listed in the dependency array. When the effect runs later, it references outdated variables. Resolve this by listing all read variables in the dependency array.",
    "checklist": [
      "Captured variables inside effect closure",
      "Outdated state references",
      "Add dependencies or use functional state setters"
    ]
  },
  {
    "id": 12,
    "category": "React Hooks",
    "level": "Intermediate",
    "title": "Functional state updates",
    "companies": [
      "JPMorgan",
      "Visa"
    ],
    "question": "Why should you pass a callback function to a state setter?",
    "answer": "State updates in React are batched and asynchronous. If you need to update state based on the previous state, passing a callback (e.g. setCount(prev => prev + 1)) ensures you receive the most up-to-date state value rather than a cached, stale value.",
    "checklist": [
      "Avoids stale state updates",
      "Receives latest previous value",
      "Essential for sequential synchronous state updates"
    ]
  },
  {
    "id": 13,
    "category": "React Hooks",
    "level": "Intermediate",
    "title": "useEffect Cleanup Function",
    "companies": [
      "Morgan Stanley",
      "Citi"
    ],
    "question": "What is the purpose of the cleanup function returned from useEffect?",
    "answer": "The cleanup function runs before the component unmounts and before the effect runs again on subsequent renders. It is used to clean up resources like event listeners, intervals, timers, or abort active network requests to prevent memory leaks.",
    "checklist": [
      "Runs on unmount and before next effect",
      "Clears timers & event listeners",
      "Aborts network requests"
    ]
  },
  {
    "id": 14,
    "category": "React Hooks",
    "level": "Intermediate",
    "title": "useMemo vs useCallback",
    "companies": [
      "Google",
      "Amazon"
    ],
    "question": "Contrast the useMemo and useCallback hooks.",
    "answer": "useMemo caches the *result* of an expensive calculation (e.g., const value = useMemo(() => calc(x), [x])). useCallback caches the *function instance* itself (e.g., const fn = useCallback(() => handler(x), [x])), preventing children from re-rendering if the handler reference is passed as a prop.",
    "checklist": [
      "useMemo: memoizes values",
      "useCallback: memoizes function references",
      "Requires dependency arrays to trigger updates"
    ]
  },
  {
    "id": 15,
    "category": "React Core",
    "level": "Intermediate",
    "title": "React.memo higher-order component",
    "companies": [
      "Microsoft",
      "Uber"
    ],
    "question": "What does React.memo do and when is it useful?",
    "answer": "React.memo is a higher-order component that wraps a functional component. It performs a shallow comparison of props; if they haven't changed, React skips rendering this component and reuses the previous rendered output, saving CPU cycles.",
    "checklist": [
      "Shallow compares component props",
      "Skips re-renders if props match",
      "Useful for heavy render leaves with stable props"
    ]
  },
  {
    "id": 16,
    "category": "React Hooks",
    "level": "Intermediate",
    "title": "useReducer vs useState",
    "companies": [
      "Netflix",
      "Facebook"
    ],
    "question": "When should you choose useReducer over useState?",
    "answer": "Choose useReducer when you have complex state logic containing multiple sub-values, state transitions dependent on previous states, or when state modifications are dispatched as distinct action types, mimicking Redux workflows.",
    "checklist": [
      "Manages complex state structures",
      "Decouples state actions from UI",
      "Returns [state, dispatch] pair"
    ]
  },
  {
    "id": 17,
    "category": "React Context",
    "level": "Intermediate",
    "title": "Context API Prop Drilling Solution",
    "companies": [
      "Amazon",
      "Cisco"
    ],
    "question": "How does the Context API solve the prop drilling problem?",
    "answer": "Context API provides a way to pass data down the component tree without having to pass props manually through every intermediate component level. A Context Provider exposes the data, and any child component can read it via the useContext hook.",
    "checklist": [
      "Avoids intermediate prop configurations",
      "Exposed via Provider components",
      "Consumed via useContext(Context)"
    ]
  },
  {
    "id": 18,
    "category": "React Context",
    "level": "Intermediate",
    "title": "Context Re-render issue",
    "companies": [
      "eBay",
      "PayPal"
    ],
    "question": "Why do Context consumers re-render, and how do you optimize them?",
    "answer": "Whenever the Context value object changes reference, all components consuming the context are forced to re-render. To optimize, split context into state and dispatch providers, or wrap the context value object in useMemo.",
    "checklist": [
      "Triggered by context value reference changes",
      "useMemo to stabilize value object",
      "Separate state and dispatch contexts"
    ]
  },
  {
    "id": 19,
    "category": "React Hooks",
    "level": "Intermediate",
    "title": "Custom Hooks reuse",
    "companies": [
      "Walmart",
      "Target"
    ],
    "question": "What is a Custom Hook and why should you write one?",
    "answer": "A Custom Hook is a JavaScript function whose name starts with 'use' and can call other React hooks. It allows you to extract component stateful logic into reusable, testable functions shared across multiple components.",
    "checklist": [
      "Name must start with 'use'",
      "Allows calling internal React hooks",
      "Extracts and shares stateful UI behaviors"
    ]
  },
  {
    "id": 20,
    "category": "React Hooks",
    "level": "Intermediate",
    "title": "Rules of Hooks",
    "companies": [
      "Oracle",
      "Visa"
    ],
    "question": "What are the two primary Rules of Hooks in React?",
    "answer": "1. Only call Hooks at the top level of your functional component (not inside loops, conditions, or nested functions) to preserve hook execution order. 2. Only call Hooks from React Functional Components or Custom Hooks.",
    "checklist": [
      "Call only at top level of component",
      "Do not write inside loops or conditions",
      "Call only from React functions/custom hooks"
    ]
  }
];
export default q_11_20;
