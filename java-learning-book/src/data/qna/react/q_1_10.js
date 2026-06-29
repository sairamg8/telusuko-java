export const q_1_10 = [
  {
    "id": 1,
    "category": "React Core",
    "level": "Basic",
    "title": "React Virtual DOM vs Real DOM",
    "companies": [
      "Meta",
      "TCS",
      "Cognizant"
    ],
    "question": "How does the Virtual DOM work and why is it used?",
    "answer": "The Virtual DOM is an in-memory representation of the real HTML DOM. When a component's state changes, React updates the Virtual DOM tree, runs a diffing algorithm (Reconciliation) to compare it with the previous snapshot, and updates only the altered elements in the real DOM to optimize rendering performance.",
    "checklist": [
      "In-memory lightweight copy",
      "Diffing algorithm comparisons",
      "Batch updates to Real DOM"
    ]
  },
  {
    "id": 2,
    "category": "React Core",
    "level": "Basic",
    "title": "React Component Lifecycle Phases",
    "companies": [
      "Infosys",
      "Wipro"
    ],
    "question": "What are the core lifecycle phases of a React component?",
    "answer": "1. Mounting: Creating the component and inserting it into the DOM (constructor, render, componentDidMount).\n2. Updating: Re-rendering due to changes in props or state (shouldComponentUpdate, render, componentDidUpdate).\n3. Unmounting: Removing the component from the DOM (componentWillUnmount). Functional components use useEffect dependencies and cleanups to handle these.",
    "checklist": [
      "Mounting (componentDidMount)",
      "Updating (componentDidUpdate)",
      "Unmounting (componentWillUnmount)"
    ]
  },
  {
    "id": 3,
    "category": "React Core",
    "level": "Basic",
    "title": "Props vs State in React",
    "companies": [
      "Accenture",
      "Tech Mahindra"
    ],
    "question": "What is the difference between props and state?",
    "answer": "Props are configuration variables passed down from parent components, which are immutable (read-only) for the child. State is local, mutable data managed internally by the component itself, triggering a re-render when updated.",
    "checklist": [
      "Props are immutable & passed down",
      "State is mutable & local",
      "State updates trigger re-renders"
    ]
  },
  {
    "id": 4,
    "category": "React Core",
    "level": "Basic",
    "title": "React Keys in Lists",
    "companies": [
      "TCS",
      "Capgemini"
    ],
    "question": "Why does React require keys when rendering lists?",
    "answer": "Keys help React identify which items have changed, been added, or been removed. Using stable and unique keys (like IDs) ensures React maintains component state correctly during list reordering, rather than re-rendering the entire list or shifting state incorrectly.",
    "checklist": [
      "Assists diffing algorithm",
      "Must be stable and unique",
      "Avoid using array indices as keys"
    ]
  },
  {
    "id": 5,
    "category": "React Core",
    "level": "Basic",
    "title": "Handling Events in React",
    "companies": [
      "HCL",
      "IBM"
    ],
    "question": "How does React handle DOM events under the hood?",
    "answer": "React uses a SyntheticEvent system, wrapping native browser events in a cross-browser wrapper to ensure consistent behavior across browsers. Events are delegated to the root document level rather than attached to individual elements, optimizing memory.",
    "checklist": [
      "SyntheticEvent wrapper",
      "Event delegation at root",
      "CamelCase naming (onClick)"
    ]
  },
  {
    "id": 6,
    "category": "React Hooks",
    "level": "Basic",
    "title": "useState Hook syntax",
    "companies": [
      "Cognizant",
      "Mindtree"
    ],
    "question": "How do you declare and update state using the useState hook?",
    "answer": "useState takes the initial state as an argument and returns an array with two elements: the current state value, and an updater function. Example: const [count, setCount] = useState(0). Calling the updater function schedules a re-render.",
    "checklist": [
      "Returns [value, setter] array",
      "Initial state as argument",
      "Triggers re-render on setter call"
    ]
  },
  {
    "id": 7,
    "category": "React Hooks",
    "level": "Basic",
    "title": "useEffect Hook execution",
    "companies": [
      "Wipro",
      "Infosys"
    ],
    "question": "When does the useEffect callback execute?",
    "answer": "useEffect executes after the component renders and commits to the DOM. If the dependency array is omitted, it runs on every render. If empty ([]), it runs once after mount. If it contains dependencies, it runs whenever those dependency references change.",
    "checklist": [
      "Runs after render & DOM paint",
      "Omitted dependency runs always",
      "Empty array runs on mount"
    ]
  },
  {
    "id": 8,
    "category": "React Core",
    "level": "Basic",
    "title": "React.Fragment use case",
    "companies": [
      "Accenture",
      "LTI"
    ],
    "question": "What is the purpose of React.Fragment (<>)?",
    "answer": "React.Fragment allows grouping multiple JSX elements without adding an extra wrapper node (like a <div>) to the real DOM, keeping the HTML semantic structure clean and avoiding unnecessary DOM nesting.",
    "checklist": [
      "Groups multiple JSX sibling nodes",
      "Shorthand syntax <></>",
      "Does not add elements to physical DOM"
    ]
  },
  {
    "id": 9,
    "category": "React Core",
    "level": "Basic",
    "title": "Controlled vs Uncontrolled Inputs",
    "companies": [
      "TCS",
      "Cognizant"
    ],
    "question": "Differentiate between controlled and uncontrolled components.",
    "answer": "Controlled components bind their value attribute directly to React state and modify it via onChange handlers. Uncontrolled components store their value in the DOM itself and are accessed via refs when needed.",
    "checklist": [
      "Controlled: value bound to React state",
      "Uncontrolled: value managed by DOM",
      "Refs used in uncontrolled inputs"
    ]
  },
  {
    "id": 10,
    "category": "React Hooks",
    "level": "Basic",
    "title": "useRef Hook basics",
    "companies": [
      "Infosys",
      "IBM"
    ],
    "question": "What is the useRef hook and when should it be used?",
    "answer": "useRef returns a mutable ref object with a '.current' property. It is used to persist mutable values across renders without triggering a re-render when updated, or to hold reference to direct HTML DOM elements.",
    "checklist": [
      "Persists values across renders",
      "Updating .current does NOT re-render",
      "Provides direct reference to DOM nodes"
    ]
  }
];
export default q_1_10;
