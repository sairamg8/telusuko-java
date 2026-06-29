export default {
  "id": 2,
  "title": "Core React Concepts & JSX",
  "range": "16-30",
  "concepts": [
    {
      "id": 16,
      "title": "Virtual DOM vs Real DOM",
      "intro": "React's memory-based DOM representation for fast UI rendering.",
      "explanation": "Updating the Real DOM is slow. React uses a lightweight copy of the DOM in memory called the Virtual DOM. When changes occur, React updates the Virtual DOM first, compares it with a snapshot of the previous state (diffing), and patches only the changed elements in the Real DOM (reconciliation).",
      "gotchas": [
        "The Virtual DOM is not faster than direct DOM writes for small, single elements, but it is much faster for batch updates across large pages."
      ],
      "interviewQuestions": [
        {
          "question": "What is reconciliation in React?",
          "answer": "It is the process where React diffs the new Virtual DOM with the previous snapshot and determines the minimal set of updates to apply to the Real DOM."
        }
      ],
      "code": "// Virtual DOM elements are simple JS objects under the hood:\nconst element = React.createElement('h1', { className: 'title' }, 'Hello World');",
      "visualizerType": null
    },
    {
      "id": 17,
      "title": "JSX Syntax Rules & Compilation",
      "intro": "Understand JavaScript XML compilation mechanics.",
      "explanation": "JSX is a markup syntax that looks like HTML but compiles down to standard React.createElement() method calls. Rules: 1. Must return a single root element. 2. Tag names are case-sensitive (capitalized names denote custom components). 3. Attributes use camelCase (e.g. className, htmlFor).",
      "gotchas": [
        "You cannot write plain JavaScript statements (like if/for loops) directly inside JSX curly braces; you must use expressions (like ternary operations or map)."
      ],
      "interviewQuestions": [
        {
          "question": "Why must JSX tags be closed?",
          "answer": "Because JSX represents XML-like function calls. Unclosed tags represent malformed parameters and raise compilation syntax errors."
        }
      ],
      "code": "// JSX input:\nconst element = <div className=\"card\">Hello</div>;\n\n// Compiled JS output:\nconst elementCompiled = React.createElement('div', { className: 'card' }, 'Hello');",
      "visualizerType": null
    },
    {
      "id": 18,
      "title": "React Components: Functional Components",
      "intro": "Stateless/Stateful Javascript functions returning JSX elements.",
      "explanation": "Functional components are standard JavaScript functions that accept a props object and return JSX. They are the standard block in React.",
      "gotchas": [
        "Keep components pure: do not alter external variables or fetch data inside the main rendering flow."
      ],
      "interviewQuestions": [
        {
          "question": "How do functional components differ from class components?",
          "answer": "Functional components are simpler, lightweight JavaScript functions that accept props and return JSX. They use React Hooks (like useState) to manage state and side-effects. Class components require extending React.Component, implementing a render method, and using this.state/this.setState."
        }
      ],
      "code": "// Functional Component with props and state\nexport default function Greet({ name }) {\n  return (\n    <div className=\"greet-card\">\n      <h1>Hello, {name}!</h1>\n      <p>Welcome to the React 19 learning pathway.</p>\n    </div>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 19,
      "title": "Props: Passing Data Downward",
      "intro": "Read-only configurations passed from parents to children.",
      "explanation": "Props represent configuration options passed down the component tree. Props are read-only (immutable); a child must never modify props it receives.",
      "gotchas": [
        "If you try to modify a prop parameter (e.g., props.name = 'new'), React will throw an error or cause rendering inconsistencies."
      ],
      "interviewQuestions": [
        {
          "question": "Can a component mutate its own props?",
          "answer": "No, props are read-only and immutable. React follows a strict one-way data flow. If a child component needs to modify a value, the parent should pass a callback function to modify state in the parent scope."
        }
      ],
      "code": "// Parent component passing props down\nfunction Parent() {\n  return <Child title=\"React Guide\" score={95} isFeatured={true} />;\n}\n\n// Child receiving props\nfunction Child({ title, score, isFeatured }) {\n  return (\n    <div>\n      <h3>{title}</h3>\n      <p>Score: {score}</p>\n      {isFeatured && <span>Featured!</span>}\n    </div>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 20,
      "title": "Rendering Lists & The Role of key",
      "intro": "Render child lists efficiently using stable key identifiers.",
      "explanation": "When rendering lists via .map(), React requires a unique, stable 'key' prop on the outer element. The key assists React in locating which elements changed, were added, or were removed.",
      "gotchas": [
        "Using array indexes as keys is an anti-pattern. If the list is sorted or elements are added/deleted, it triggers rendering bugs."
      ],
      "interviewQuestions": [
        {
          "question": "Why should you avoid using array indices as keys in React lists?",
          "answer": "Using array indices as keys can cause rendering bugs and state inconsistency if the list is re-sorted, elements are inserted/deleted, or filtered, as React uses keys to match list items to component instances."
        }
      ],
      "code": "// Rendering lists with unique key identifiers\nconst users = [\n  { id: 'u1', name: 'Alice' },\n  { id: 'u2', name: 'Bob' }\n];\n\nexport function UserList() {\n  return (\n    <ul>\n      {users.map(user => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 21,
      "title": "Conditional Rendering",
      "intro": "Render different JSX structures based on application state.",
      "explanation": "Toggle UI layouts using conditional JavaScript operators: ternary (condition ? A : B), logical AND (condition && A), or standard if/else statements before the return block.",
      "gotchas": [
        "Be careful with '&&' evaluation: if the left-hand expression evaluates to 0, React will print the literal '0' on your page."
      ],
      "interviewQuestions": [
        {
          "question": "What is a potential trap when using the logical AND (&&) operator in JSX conditional rendering?",
          "answer": "If the left-hand side evaluates to 0 (a falsy number), React will print the literal number '0' in the UI. To prevent this, convert it to a boolean explicitly (e.g. count > 0 && <Panel /> or !!count && <Panel />)."
        }
      ],
      "code": "// Multiple ways to render conditionally\nfunction StatusPanel({ status, hasError }) {\n  if (hasError) return <div className=\"error\">Something went wrong.</div>;\n\n  return (\n    <div>\n      {status === 'loading' ? <Spinner /> : <Content />}\n      {status === 'success' && <p>All operations succeeded!</p>}\n    </div>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 22,
      "title": "Handling DOM Events in React",
      "intro": "Wire user interactions to component functions.",
      "explanation": "React wraps native browser events in a cross-browser SyntheticEvent wrapper. Events are passed using camelCase attributes (onClick, onChange) with function references.",
      "gotchas": [
        "Do not invoke the handler when registering: write onClick={handleClick}, not onClick={handleClick()}."
      ],
      "interviewQuestions": [
        {
          "question": "What is React's SyntheticEvent?",
          "answer": "SyntheticEvent is a cross-browser wrapper around the browser's native event. It conforms to the W3C spec and ensures events behave identically across different browsers while implementing event delegation for performance."
        }
      ],
      "code": "// Handling click and change events with SyntheticEvents\nexport function InputForm() {\n  const handleChange = (e) => {\n    console.log(\"Input changed to:\", e.target.value);\n  };\n\n  return (\n    <button onClick={(e) => console.log(\"Clicked button category:\", e.type)}>\n      Submit\n    </button>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 23,
      "title": "Component Purity & Immutability",
      "intro": "Ensure components behave predictably as pure functions.",
      "explanation": "A React component must behave as a pure function: given the same props, it must always return the same JSX, without modifying external variables.",
      "gotchas": [
        "Updating external global variables during rendering causes unpredictable UI updates and bugs during concurrent rendering."
      ],
      "interviewQuestions": [
        {
          "question": "Why does React require component rendering to be pure?",
          "answer": "Purity allows React to optimize performance by skipping re-renders (memoization), pre-rendering views safely, and running concurrent rendering features without UI layout bugs."
        }
      ],
      "code": "// Pure component: behaves strictly like a pure math function\n// Given the same props, always renders the same output.\nfunction PureCard({ title, date }) {\n  return (\n    <div>\n      <h3>{title}</h3>\n      <small>{new Date(date).toLocaleDateString()}</small>\n    </div>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 24,
      "title": "React.Fragment (<>)",
      "intro": "Group multiple JSX elements without adding extra wrapper nodes to the DOM.",
      "explanation": "JSX requires returning a single root element. React.Fragment lets you group children without adding unnecessary div tags to the HTML structure.",
      "gotchas": [
        "The shorthand tag syntax (<></>) does not support key attributes; use <React.Fragment key={id}> instead if rendering lists."
      ],
      "interviewQuestions": [
        {
          "question": "What is the difference between standard React fragments (<></>) and <React.Fragment>?",
          "answer": "The short syntax `<></>` does not support attributes or key props. If you need keys when rendering an array of fragments, you must use `<React.Fragment key={item.id}>`."
        }
      ],
      "code": "// Grouping child elements without adding extra wrapper DOM nodes\nexport function TableColumns() {\n  return (\n    <>\n      <td>Title</td>\n      <td>Description</td>\n      <td>Author</td>\n    </>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 25,
      "title": "Inline Styles vs CSS Classes",
      "intro": "Apply CSS rules dynamically or statically.",
      "explanation": "Inline styles in React are specified as object properties using camelCase naming conventions. Static styles are applied using the className attribute.",
      "gotchas": [
        "Avoid writing complex inline style objects dynamically in rendering blocks, as it creates new references on every frame, causing minor recalculations."
      ],
      "interviewQuestions": [
        {
          "question": "What is the 'children' prop in React?",
          "answer": "The children prop is a special prop automatically passed into components, representing any JSX tags nested between the component's opening and closing elements."
        }
      ],
      "code": "// Layout component accepting children\nexport function CardLayout({ children, theme = 'dark' }) {\n  return (\n    <div className={`card-box theme-${theme}`}>\n      <header>Card Title</header>\n      <main className=\"card-content\">\n        {children}\n      </main>\n    </div>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 26,
      "title": "StrictMode Execution checks",
      "intro": "Enable runtime checks to identify structural anti-patterns.",
      "explanation": "StrictMode runs only in development. It double-invokes component constructors, render methods, and side-effects to help expose state mutations and leaks.",
      "gotchas": [
        "React strict mode prints console logs twice in development. This is expected and does not impact production builds."
      ],
      "interviewQuestions": [
        {
          "question": "What are the side-effects of mutating external variables during rendering?",
          "answer": "Mutating external variables makes the component impure. During multiple render passes, strict mode double renders, or concurrent rendering, the variable updates out of sync, leading to inconsistent UIs."
        }
      ],
      "code": "// Pure component: outputs depends only on props\nconst PureProfile = ({ username }) => <div>User: {username}</div>;\n\n// Impure component: modifies external variables\nlet guestCount = 0;\nconst ImpureProfile = () => {\n  guestCount++; // SIDE EFFECT IN RENDERING FLOW!\n  return <div>Guest #{guestCount}</div>;\n};",
      "visualizerType": null
    },
    {
      "id": 27,
      "title": "Dynamic Props and Spread operator",
      "intro": "Pass variable property objects to sub-elements.",
      "explanation": "You can spread prop properties directly into custom tags: `<Child {...props} />`. This passes all properties as individual props.",
      "gotchas": [
        "Spreading unsanitized props can leak obsolete attributes to DOM elements, causing HTML validations warnings."
      ],
      "interviewQuestions": [
        {
          "question": "When should you choose uncontrolled inputs over controlled inputs?",
          "answer": "Use uncontrolled inputs for simple form submittals where you don't need real-time validation, instant feedback, or conditional styling, reducing state update overhead."
        }
      ],
      "code": "// Controlled input: state binds input value\nfunction ControlledInput() {\n  const [val, setVal] = useState(\"\");\n  return <input value={val} onChange={e => setVal(e.target.value)} />;\n}\n\n// Uncontrolled input: DOM stores input value\nfunction UncontrolledInput() {\n  const inputRef = useRef(null);\n  const handleSubmit = () => console.log(inputRef.current.value);\n  return <input ref={inputRef} />;\n}",
      "visualizerType": null
    },
    {
      "id": 28,
      "title": "Component Children Prop",
      "intro": "Inject arbitrary JSX layouts into generic containers.",
      "explanation": "The children prop is implicitly passed to every component. It contains whatever elements are nested inside the component's opening and closing tags.",
      "gotchas": [
        "Do not try to read or modify properties of children directly; treat them as opaque layouts."
      ],
      "interviewQuestions": [
        {
          "question": "Does stopPropagation() work on React SyntheticEvents?",
          "answer": "Yes, calling `e.stopPropagation()` on a SyntheticEvent stops the event propagation through the React component tree (which React simulates using a single root listener)."
        }
      ],
      "code": "// Synthetic event bubbling\nexport function Container() {\n  return (\n    <div onClick={() => console.log(\"Parent container clicked\")}>\n      <button onClick={(e) => {\n        e.stopPropagation(); // Prevents bubbling to parent div\n        console.log(\"Button clicked\");\n      }}>\n        Click Me\n      </button>\n    </div>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 29,
      "title": "Building Reusable UI Elements",
      "intro": "Create consistent component foundations.",
      "explanation": "Encapsulate styling and configurations inside low-level foundation components (like Buttons or TextFields) to enforce UI consistency across applications.",
      "gotchas": [
        "Avoid writing custom component styles directly in page layouts; delegate styling to primitive elements."
      ],
      "interviewQuestions": [
        {
          "question": "How do CSS Modules solve CSS global scope pollution?",
          "answer": "CSS Modules compile class names into unique hash identifiers (e.g., styles.activeCard becomes styles_activeCard__h2k8a), scope-locking the styles to that specific component."
        }
      ],
      "code": "/* styles.module.css */\n.activeCard {\n  border: 1px solid var(--accent-color);\n  padding: 16px;\n}\n\n// Component import\nimport styles from './styles.module.css';\n\nexport function StyledCard() {\n  return <div className={styles.activeCard}>Styled Box</div>;\n}",
      "visualizerType": null
    },
    {
      "id": 30,
      "title": "Debugging with React DevTools",
      "intro": "Inspect component hierarchy, state, and props.",
      "explanation": "React DevTools is a browser extension that allows you to inspect the component tree, track state modifications, update prop values, and monitor re-renders.",
      "gotchas": [
        "Ensure production bundles strip out source-mapping files to prevent exposing internal state trees to clients."
      ],
      "interviewQuestions": [
        {
          "question": "How do you decide between local component state and global state?",
          "answer": "If state is only used for UI toggle states, input variables, or focus settings inside one component, keep it local. If data is shared across distant component trees (e.g. user authentication or theme settings), store it globally."
        }
      ],
      "code": "// Local UI toggle state\nfunction Dropdown() {\n  const [isOpen, setIsOpen] = useState(false);\n  return <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>;\n}\n\n// Global state represents shared data\n// e.g. Current Authenticated User or App Theme",
      "visualizerType": null
    }
  ]
};
