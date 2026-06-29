export default {
  "id": 5,
  "title": "Advanced State & Context API",
  "range": "61-75",
  "concepts": [
    {
      "id": 61,
      "title": "Prop Drilling Dilemma",
      "intro": "The problem of passing props through intermediate layers.",
      "explanation": "Passing props down through multiple components that do not need them complicates code maintenance.",
      "gotchas": [
        "Prop drilling makes components less reusable and tightly couples child trees."
      ],
      "interviewQuestions": [
        {
          "question": "What is prop drilling and how do you prevent it?",
          "answer": "Prop drilling is passing data down nested components that don't need it. Prevent using Context API or component composition."
        }
      ],
      "code": "// Prop Drilling: passing theme through intermediate components\nfunction GrandParent() { return <Parent theme=\"dark\" />; }\nfunction Parent({ theme }) { return <Child theme={theme} />; }\nfunction Child({ theme }) { return <div>Theme: {theme}</div>; }",
      "visualizerType": null
    },
    {
      "id": 62,
      "title": "useContext Hook: Context API",
      "intro": "Access global state without prop drilling.",
      "explanation": "Context API provides a way to share values between components without passing props down explicitly.",
      "gotchas": [
        "All consumers re-render when the context value object reference changes."
      ],
      "interviewQuestions": [
        {
          "question": "What is the Context API and when should it be used?",
          "answer": "It shares data (like Auth, Themes) globally across component trees without prop drilling."
        }
      ],
      "code": "// Context setup and useContext Hook\nimport React, { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext('light');\n\nexport function Card() {\n  const theme = useContext(ThemeContext);\n  return <div className={`box theme-${theme}`}>Context Styled</div>;\n}",
      "visualizerType": null
    },
    {
      "id": 63,
      "title": "Context Providers & Consumers",
      "intro": "Defining and consuming context blocks.",
      "explanation": "Wrap components in a Context Provider to share data; consume it using useContext hook.",
      "gotchas": [
        "Ensure components consuming context are nested inside the provider tree."
      ],
      "interviewQuestions": [
        {
          "question": "What does the Provider component do?",
          "answer": "It exposes context value fields to all descendent components, prompting updates when references change."
        }
      ],
      "code": "// Custom Context Provider wrapper\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState(\"light\");\n  return (\n    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 64,
      "title": "Optimizing Context Providers",
      "intro": "Minimize unnecessary consumer updates.",
      "explanation": "Split context into separate state and dispatch providers to prevent updates on read-only components.",
      "gotchas": [
        "Do not pass inline objects as context values; memoize them with useMemo."
      ],
      "interviewQuestions": [
        {
          "question": "How do you optimize Context Providers against redundant renders?",
          "answer": "Wrap values in useMemo to prevent reference re-creation, or split into separate State and Dispatch context providers."
        }
      ],
      "code": "// Memoizing Context provider values\nconst providerValue = useMemo(() => ({ state, dispatch }), [state]);\nreturn <Context.Provider value={providerValue}>{children}</Context.Provider>;",
      "visualizerType": null
    },
    {
      "id": 65,
      "title": "Context Re-render Bottlenecks",
      "intro": "Expose and solve context bottlenecks.",
      "explanation": "Large state trees in context cause frequent updates. Use smaller, focused context trees or state managers.",
      "gotchas": [
        "React context is not designed for frequent high-frequency state updates."
      ],
      "interviewQuestions": [
        {
          "question": "Why isn't React Context suitable as a high-frequency state engine?",
          "answer": "Any provider value update forces all consumer components to re-render, bypassing memoization boundaries."
        }
      ],
      "code": "// Resolve Context bottleneck using split stores or global state libraries.",
      "visualizerType": null
    },
    {
      "id": 66,
      "title": "useReducer Hook: Redux Patterns",
      "intro": "Manage complex state transitions with reducers.",
      "explanation": "useReducer accepts a reducer function and initial state, returning current state and dispatch.",
      "gotchas": [
        "Reducers must be pure functions; never perform side-effects inside them."
      ],
      "interviewQuestions": [
        {
          "question": "Explain the parameters of useReducer.",
          "answer": "It accepts a reducer callback function and an initial state object, returning the current state and a dispatch function."
        }
      ],
      "code": "// useReducer Hook: Redux style updates\nimport React, { useReducer } from 'react';\n\nconst reducer = (state, action) => {\n  switch (action.type) {\n    case 'increment': return { count: state.count + 1 };\n    default: return state;\n  }\n};\n\nexport function ReducerCounter() {\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n  return <button onClick={() => dispatch({ type: 'increment' })}>{state.count}</button>;\n}",
      "visualizerType": null
    },
    {
      "id": 67,
      "title": "Dispatching Actions",
      "intro": "Triggering state modifications in reducers.",
      "explanation": "Dispatch actions with a type and payload to execute state transitions inside the reducer.",
      "gotchas": [
        "Verify actions match type conditions inside the reducer's switch statement."
      ],
      "interviewQuestions": [
        {
          "question": "What is an action object in reducer patterns?",
          "answer": "An action is a plain object containing a mandatory `type` property and an optional `payload` containing data updates."
        }
      ],
      "code": "// Dispatching action objects\ndispatch({ type: 'add_todo', payload: 'Buy groceries' });",
      "visualizerType": null
    },
    {
      "id": 68,
      "title": "useReducer + useContext",
      "intro": "Global state engine for React apps.",
      "explanation": "Combine reducer state and dispatch in context providers to create a global state wrapper.",
      "gotchas": [
        "This pattern can cause re-renders if the state object reference is not optimized."
      ],
      "interviewQuestions": [
        {
          "question": "How do you create a global store using React built-ins?",
          "answer": "Wrap a parent Context Provider around a useReducer hook, passing state and dispatch down as the provider value."
        }
      ],
      "code": "// Global state architecture using useReducer + useContext\nexport const StoreContext = createContext(null);\nexport function StoreProvider({ children }) {\n  const [state, dispatch] = useReducer(reducer, init);\n  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;\n}",
      "visualizerType": null
    },
    {
      "id": 69,
      "title": "State Colocation",
      "intro": "Keep state close to where it is used.",
      "explanation": "Avoid global state overhead by keeping state colocated with components that consume it.",
      "gotchas": [
        "Lifting state prematurely is a common architectural anti-pattern."
      ],
      "interviewQuestions": [
        {
          "question": "What is State Colocation?",
          "answer": "Keeping state inside the closest component that consumes it, avoiding global state bloat and redundant re-renders."
        }
      ],
      "code": "// Colocation: keeping state local to where it is used",
      "visualizerType": null
    },
    {
      "id": 70,
      "title": "Component Composition",
      "intro": "Avoid context by passing components as props.",
      "explanation": "Pass children or component slots as props to avoid drilling down properties.",
      "gotchas": [
        "Composition requires clean layout designs to keep components readable."
      ],
      "interviewQuestions": [
        {
          "question": "How does Component Composition avoid prop drilling?",
          "answer": "It lets you pass rendered JSX blocks as props (e.g. children or custom slots), decoupling parents from children parameters."
        }
      ],
      "code": "// Component composition instead of prop drilling\nfunction Layout({ header, content }) {\n  return (\n    <div>\n      {header}\n      <hr />\n      {content}\n    </div>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 71,
      "title": "React Portal (createPortal)",
      "intro": "Render elements outside the parent DOM tree.",
      "explanation": "Portals let you render children into a different DOM node while maintaining React event bubbles.",
      "gotchas": [
        "Events in portals still bubble up through the React tree, not the DOM tree."
      ],
      "interviewQuestions": [
        {
          "question": "What is a React Portal?",
          "answer": "A Portal lets you render components into target DOM nodes outside the host's HTML nesting while maintaining React event propagation."
        }
      ],
      "code": "// React Portal: render overlay to document.body\nimport { createPortal } from 'react-dom';\n\nexport function Modal({ children }) {\n  return createPortal(\n    <div className=\"modal-overlay\">{children}</div>,\n    document.body\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 72,
      "title": "forwardRef Component wrappers",
      "intro": "Pass ref references down to children.",
      "explanation": "forwardRef exposes a child's DOM node to parent components.",
      "gotchas": [
        "forwardRef is deprecated in React 19; pass refs directly as standard props instead."
      ],
      "interviewQuestions": [
        {
          "question": "What did forwardRef solve in older React releases?",
          "answer": "It let custom functional components forward DOM references down to nested elements. React 19 supports this natively."
        }
      ],
      "code": "// forwardRef: forwarding DOM references (Deprecated in React 19)\nimport React, { forwardRef } from 'react';\nconst CustomInput = forwardRef((props, ref) => <input ref={ref} {...props} />);",
      "visualizerType": null
    },
    {
      "id": 73,
      "title": "useImperativeHandle Hook",
      "intro": "Expose custom methods from child components.",
      "explanation": "useImperativeHandle customizes the instance value exposed when using refs, shielding inner DOM layouts.",
      "gotchas": [
        "Must be used alongside forwardRef (in React 18) or with ref props."
      ],
      "interviewQuestions": [
        {
          "question": "What is the purpose of useImperativeHandle?",
          "answer": "It customizes the properties/methods exposed to parent components when querying refs, shielding internal DOM nodes."
        }
      ],
      "code": "// useImperativeHandle: exposing select methods\nuseImperativeHandle(ref, () => ({\n  focus() { inputRef.current.focus(); }\n}), []);",
      "visualizerType": null
    },
    {
      "id": 74,
      "title": "Context vs Props Trade-offs",
      "intro": "Compare decoupling paradigms.",
      "explanation": "Props keep components reusable and explicit; context decouples them but adds hidden dependencies.",
      "gotchas": [
        "Overusing context makes testing harder since components require wrapper providers."
      ],
      "interviewQuestions": [
        {
          "question": "How does Context affect component reusability?",
          "answer": "Context binds components to specific provider scopes, making them harder to reuse in isolated environments without setups."
        }
      ],
      "code": "// Context vs Props comparison. Choose props for reusable components.",
      "visualizerType": null
    },
    {
      "id": 75,
      "title": "Modular Global State",
      "intro": "Design scalable state providers.",
      "explanation": "Isolate distinct state domains into focused context providers (e.g. AuthProvider, ThemeProvider).",
      "gotchas": [
        "Nesting too many provider wrappers creates wrapper hell in root files."
      ],
      "interviewQuestions": [
        {
          "question": "Why should you build separate, modular contexts?",
          "answer": "Separating contexts isolates state updates, preventing updates to unrelated layouts when unrelated states change."
        }
      ],
      "code": "// Modular global state: auth provider, layout provider, etc.",
      "visualizerType": null
    }
  ]
};
