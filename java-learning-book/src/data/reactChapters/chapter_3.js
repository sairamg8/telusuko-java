export default {
  "id": 3,
  "title": "State & Hook Fundamentals",
  "range": "31-45",
  "concepts": [
    {
      "id": 31,
      "title": "What is Component State?",
      "intro": "Component-specific mutable data storage.",
      "explanation": "State is an object that holds information that may change over the lifetime of the component. It is local and fully encapsulated within the component.",
      "gotchas": [
        "Do not mutate state directly; always use the setter function."
      ],
      "interviewQuestions": [
        {
          "question": "What is component state and how does it trigger updates?",
          "answer": "Component state is a local memory space holding dynamic data. Updating state via its setter function tells React to schedule a re-render for that component and its child sub-tree."
        }
      ],
      "code": "// Storing state in functional components\nimport React, { useState } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}",
      "visualizerType": null
    },
    {
      "id": 32,
      "title": "useState Hook: Syntax",
      "intro": "Declaring state variables in functional components.",
      "explanation": "useState returns a pair: the current state value and a function to update it.",
      "gotchas": [
        "Only call hooks at the top level of your functional components."
      ],
      "interviewQuestions": [
        {
          "question": "Why can't Hooks be declared inside conditional blocks?",
          "answer": "React relies on the call order of hooks on every render pass to map state arrays. Writing hooks inside conditionals breaks this sequence, causing incorrect state assignments."
        }
      ],
      "code": "// Hook syntax rules: always at top level\nfunction TaskApp() {\n  const [tasks, setTasks] = useState([]);\n  const [input, setInput] = useState(\"\");\n  // ... hooks cannot be inside if/for blocks!\n}",
      "visualizerType": null
    },
    {
      "id": 33,
      "title": "Batching State Updates",
      "intro": "How React groups updates to improve performance.",
      "explanation": "React batches multiple state updates inside event handlers into a single re-render.",
      "gotchas": [
        "State updates are asynchronous; reading state immediately after setting it returns the old value."
      ],
      "interviewQuestions": [
        {
          "question": "How does batching state updates improve performance?",
          "answer": "React groups multiple state updates inside event handlers or async callbacks and runs them in a single render pass, avoiding intermediate DOM repaints."
        }
      ],
      "code": "// State batching in React\nfunction BatchDemo() {\n  const [count, setCount] = useState(0);\n  const [flag, setFlag] = useState(false);\n\n  const handleClick = () => {\n    setCount(c => c + 1);\n    setFlag(f => !f);\n    // React batches these updates and triggers exactly ONE re-render!\n  };\n  return <button onClick={handleClick}>Batch Update</button>;\n}",
      "visualizerType": null
    },
    {
      "id": 34,
      "title": "Functional State Updates",
      "intro": "Updating state based on the previous value.",
      "explanation": "Pass a callback function to the state setter to ensure you update based on the latest state value.",
      "gotchas": [
        "Avoid reading stale state in closures; use functional updates instead."
      ],
      "interviewQuestions": [
        {
          "question": "What is the difference between setCount(count + 1) and setCount(c => c + 1)?",
          "answer": "setCount(count + 1) uses the state value from the current render's closure. Sequential calls will override each other. setCount(c => c + 1) runs a callback passing the latest queue state value, ensuring updates are cumulative."
        }
      ],
      "code": "// Safe sequential state updates using callbacks\nfunction CounterCallback() {\n  const [count, setCount] = useState(0);\n\n  const incrementTriple = () => {\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n    setCount(prev => prev + 1);\n  };\n  return <button onClick={incrementTriple}>Increment Triple: {count}</button>;\n}",
      "visualizerType": null
    },
    {
      "id": 35,
      "title": "Storing Complex States",
      "intro": "Managing object and array states safely.",
      "explanation": "To update object/array states, you must copy the existing data, modify the clone, and pass it to the setter.",
      "gotchas": [
        "Mutating objects directly will prevent React from detecting changes and triggering re-renders."
      ],
      "interviewQuestions": [
        {
          "question": "Why must you copy objects/arrays before updating state?",
          "answer": "React performs shallow comparisons (`Object.is`) to check for changes. Mutating properties on the same object reference keeps the reference identical, preventing React from triggering a re-render."
        }
      ],
      "code": "// Immutable object state updates\nfunction ProfileEditor() {\n  const [user, setUser] = useState({ name: \"Bob\", age: 25 });\n\n  const birthday = () => {\n    // Spread old object, update age field\n    setUser(prev => ({ ...prev, age: prev.age + 1 }));\n  };\n  return <button onClick={birthday}>Age: {user.age}</button>;\n}",
      "visualizerType": null
    },
    {
      "id": 36,
      "title": "Lifting State Up",
      "intro": "Share state between sibling components.",
      "explanation": "Move state to the nearest common ancestor to share data between sibling elements.",
      "gotchas": [
        "Lifting state too high can cause excessive re-renders across parent trees."
      ],
      "interviewQuestions": [
        {
          "question": "What is 'Lifting State Up' in React?",
          "answer": "Lifting state up is moving state to the closest common ancestor of siblings that need to share that data, allowing the parent to coordinate the data flow using props."
        }
      ],
      "code": "// Sibling components communicating via parent state\nfunction Parent() {\n  const [message, setMessage] = useState(\"\");\n  return (\n    <>\n      <Sender onSend={setMessage} />\n      <Receiver value={message} />\n    </>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 37,
      "title": "Controlled vs Uncontrolled Components",
      "intro": "Form input binding models.",
      "explanation": "Controlled components bind input values to React state; uncontrolled components read inputs directly from the DOM using refs.",
      "gotchas": [
        "Mixing controlled and uncontrolled attributes on the same input raises console warnings."
      ],
      "interviewQuestions": [
        {
          "question": "Differentiate between controlled and uncontrolled form elements.",
          "answer": "Controlled elements synchronize input values directly with React component state. Uncontrolled elements leave state management to the native browser DOM, queried using refs."
        }
      ],
      "code": "// Controlled input: state binds input value\nfunction ControlledInput() {\n  const [val, setVal] = useState(\"\");\n  return <input value={val} onChange={e => setVal(e.target.value)} />;\n}\n\n// Uncontrolled input: DOM stores input value\nfunction UncontrolledInput() {\n  const inputRef = useRef(null);\n  const handleSubmit = () => console.log(inputRef.current.value);\n  return <input ref={inputRef} />;\n}",
      "visualizerType": null
    },
    {
      "id": 38,
      "title": "Derived State",
      "intro": "Compute values on-the-fly during render.",
      "explanation": "Avoid storing computed values in state; calculate them dynamically from existing state/props.",
      "gotchas": [
        "Storing derived values in state causes sync issues and duplicate updates."
      ],
      "interviewQuestions": [
        {
          "question": "Why is storing derived values in state considered an anti-pattern?",
          "answer": "Storing derived values forces redundant sync steps and extra re-renders. Computing values inline during render ensures values remain synchronized automatically."
        }
      ],
      "code": "// Calculate values dynamically during rendering instead of storing in state\nfunction InvoiceList({ items }) {\n  // Calculated inline on every render pass!\n  const total = items.reduce((sum, item) => sum + item.price, 0);\n\n  return <div>Total Invoice Cost: ${total}</div>;\n}",
      "visualizerType": null
    },
    {
      "id": 39,
      "title": "useRef Hook: Persisting Values",
      "intro": "Store mutable values without triggering re-renders.",
      "explanation": "useRef returns a mutable object whose .current property persists across renders without triggering a re-render.",
      "gotchas": [
        "Updating .current does not trigger a re-render."
      ],
      "interviewQuestions": [
        {
          "question": "How does updating a ref's `.current` differ from updating state?",
          "answer": "Updating a ref's `.current` property is a direct, synchronous mutation that does not trigger a component re-render. State updates schedule asynchronous re-renders."
        }
      ],
      "code": "// Storing mutable variables using useRef\nfunction StopWatch() {\n  const [time, setTime] = useState(0);\n  const timerId = useRef(null); // Persists interval ID without re-renders\n\n  const start = () => {\n    timerId.current = setInterval(() => setTime(t => t + 1), 1000);\n  };\n  const stop = () => clearInterval(timerId.current);\n  return <button onClick={stop}>Stop Watch: {time}</button>;\n}",
      "visualizerType": null
    },
    {
      "id": 40,
      "title": "useRef Hook: Accessing DOM Nodes",
      "intro": "Retrieve reference to physical DOM elements.",
      "explanation": "Pass a ref object to a JSX element to gain direct access to its DOM node.",
      "gotchas": [
        "Do not mutate the DOM directly unless managing focus, scroll positioning, or canvas elements."
      ],
      "interviewQuestions": [
        {
          "question": "What is the recommended use case for useRef with DOM nodes?",
          "answer": "Use DOM refs for managing input focuses, programmatic text selections, scroll positioning, canvas drawings, or coordinating with non-React third-party DOM libraries."
        }
      ],
      "code": "// Querying direct DOM nodes using useRef\nfunction SearchInput() {\n  const inputRef = useRef(null);\n\n  const focusInput = () => {\n    inputRef.current.focus(); // Access physical DOM input node\n  };\n\n  return (\n    <>\n      <input ref={inputRef} type=\"text\" />\n      <button onClick={focusInput}>Focus Field</button>\n    </>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 41,
      "title": "Handling Forms: Simple Inputs",
      "intro": "Basic text input state bindings.",
      "explanation": "Bind text input values to state variables and update them using onChange handlers.",
      "gotchas": [
        "Initialize input states with empty strings, never undefined, to avoid input errors."
      ],
      "interviewQuestions": [
        {
          "question": "Why should you never initialize form states to undefined?",
          "answer": "Initializing states to undefined causes React to treat the element as uncontrolled initially. Setting value later switches it to controlled, throwing console errors."
        }
      ],
      "code": "// Simple text input state mapping\nfunction Form() {\n  const [name, setName] = useState(\"\");\n  return (\n    <form onSubmit={e => { e.preventDefault(); console.log(name); }}>\n      <input value={name} onChange={e => setName(e.target.value)} />\n    </form>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 42,
      "title": "Handling Forms: Complex Fields",
      "intro": "Manage selectors, checkboxes, and radio buttons.",
      "explanation": "Collect values from checkboxes (checked attribute), select lists, and radio button groups into state.",
      "gotchas": [
        "Checkboxes use event.target.checked instead of event.target.value."
      ],
      "interviewQuestions": [
        {
          "question": "How do checkboxes differ from text fields in controlled inputs?",
          "answer": "Checkboxes bind state to the `checked` attribute instead of `value`, and read changes from `event.target.checked`."
        }
      ],
      "code": "// Complex form handling checkbox, select lists\nfunction Survey() {\n  const [agree, setAgree] = useState(false);\n  const [role, setRole] = useState(\"developer\");\n\n  return (\n    <form>\n      <input type=\"checkbox\" checked={agree} onChange={e => setAgree(e.target.checked)} />\n      <select value={role} onChange={e => setRole(e.target.value)}>\n        <option value=\"developer\">Developer</option>\n        <option value=\"designer\">Designer</option>\n      </select>\n    </form>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 43,
      "title": "Resetting State using key",
      "intro": "Force component re-initialization.",
      "explanation": "Change a component's key attribute to force React to unmount and re-initialize its state.",
      "gotchas": [
        "Resetting keys discards the entire sub-tree state; use carefully."
      ],
      "interviewQuestions": [
        {
          "question": "How does the 'key' attribute reset component state?",
          "answer": "React identifies components by position and key. Changing a component's key signals to React that the component is a new node, unmounting the old node and initializing fresh state."
        }
      ],
      "code": "// Resetting component state with key attribute\nfunction ProfileContainer({ userId }) {\n  // Changing key forces complete component rebuild and state resets!\n  return <ProfilePanel key={userId} userId={userId} />;\n}",
      "visualizerType": null
    },
    {
      "id": 44,
      "title": "State vs Props",
      "intro": "Core differences in data management.",
      "explanation": "Props configure components from parent views; state manages internal component modifications.",
      "gotchas": [
        "Never modify props directly; manage changes in parent states instead."
      ],
      "interviewQuestions": [
        {
          "question": "Are props read-only or mutable?",
          "answer": "Props are strictly read-only configurations from the parent. Components use local state to handle changes."
        }
      ],
      "code": "// Props vs State comparison\nfunction Card({ header }) {\n  const [likes, setLikes] = useState(0);\n  return (\n    <div>\n      <h3>{header} (prop)</h3>\n      <button onClick={() => setLikes(l => l + 1)}>Likes: {likes} (state)</button>\n    </div>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 45,
      "title": "Profiling State Re-renders",
      "intro": "Track component performance.",
      "explanation": "Use React DevTools Profiler to identify state updates causing bottleneck re-renders.",
      "gotchas": [
        "Only profile in production-like builds for accurate latency data."
      ],
      "interviewQuestions": [
        {
          "question": "How do you identify state bottlenecks causing laggy renders?",
          "answer": "Record user flows using the React Developer Tools Profiler and inspect render charts to locate slow components."
        }
      ],
      "code": "// Profiling state update paths\n// Use React DevTools Profiler tab to measure state latency bottlenecks.",
      "visualizerType": null
    }
  ]
};
