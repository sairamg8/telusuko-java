export default {
  "id": 6,
  "title": "Performance Optimization",
  "range": "76-90",
  "concepts": [
    {
      "id": 76,
      "title": "What triggers a Re-render?",
      "intro": "Explain state and props rendering flows.",
      "explanation": "React re-renders a component when its state, props, or parent components change.",
      "gotchas": [
        "Parent re-renders cause all children to re-render by default, regardless of prop changes."
      ],
      "interviewQuestions": [
        {
          "question": "What events trigger a React component re-render?",
          "answer": "A component re-renders when its state updates, parent components re-render, or consumed context values change."
        }
      ],
      "code": "// Re-render triggers: State, Props, Parent Updates.",
      "visualizerType": null
    },
    {
      "id": 77,
      "title": "React.memo",
      "intro": "Skip re-rendering components when props are unchanged.",
      "explanation": "React.memo is a higher-order component that shallowly compares props and skips renders if they match.",
      "gotchas": [
        "Do not use memo on components with children unless wrapping them in stable containers."
      ],
      "interviewQuestions": [
        {
          "question": "What does React.memo do?",
          "answer": "It shallowly compares props and skips renders if they match, optimizing leaf-level components."
        }
      ],
      "code": "// React.memo: skip renders when props are identical\nimport React from 'react';\n\nconst Profile = React.memo(function Profile({ name }) {\n  return <div>User: {name}</div>;\n});",
      "visualizerType": null
    },
    {
      "id": 78,
      "title": "useCallback Hook",
      "intro": "Memoize event handler callback references.",
      "explanation": "useCallback caches function instances across renders to prevent recreating handlers.",
      "gotchas": [
        "Creating inline handlers inside rendering blocks nullifies useCallback benefits."
      ],
      "interviewQuestions": [
        {
          "question": "Explain the difference between useCallback and useMemo.",
          "answer": "useCallback caches function instances. useMemo caches computed values from calculations."
        }
      ],
      "code": "// useCallback: caches handler reference\nconst onClick = useCallback(() => {\n  console.log(\"Clicked:\", id);\n}, [id]);",
      "visualizerType": null
    },
    {
      "id": 79,
      "title": "useMemo Hook",
      "intro": "Memoize expensive data calculations.",
      "explanation": "useMemo caches computed results, recalculating only when dependencies change.",
      "gotchas": [
        "Do not use useMemo for simple calculations; the memory overhead may outweigh the benefits."
      ],
      "interviewQuestions": [
        {
          "question": "When should you use useMemo?",
          "answer": "Use it to cache expensive array filters/sorts, or to stabilize object references passed down as props."
        }
      ],
      "code": "// useMemo: caches result of calculation\nconst processedList = useMemo(() => {\n  return list.filter(item => item.active);\n}, [list]);",
      "visualizerType": null
    },
    {
      "id": 80,
      "title": "Custom Comparisons in memo",
      "intro": "Define custom prop comparison rules.",
      "explanation": "Pass a comparison function as a second argument to React.memo to override default shallow checks.",
      "gotchas": [
        "Returning false from custom checks triggers re-renders; returning true skips them."
      ],
      "interviewQuestions": [
        {
          "question": "How do you override default shallow prop checks in React.memo?",
          "answer": "Pass a comparison callback as the second parameter returning true to skip render, or false to re-render."
        }
      ],
      "code": "// Custom comparisons inside React.memo\nconst Profile = React.memo(MyComponent, (prev, next) => {\n  return prev.id === next.id; // Skip render if IDs match\n});",
      "visualizerType": null
    },
    {
      "id": 81,
      "title": "React Compiler (React Forget)",
      "intro": "Automated compiler optimizations.",
      "explanation": "React Compiler automatically memoizes components, hooks, and calculations at build time, eliminating the need for manual useMemo/useCallback.",
      "gotchas": [
        "Requires following strict rules of React (no mutations, pure renders)."
      ],
      "interviewQuestions": [
        {
          "question": "What is the React Compiler?",
          "answer": "An automated build-time compiler that injects cache statements, removing manual useMemo/useCallback setups."
        }
      ],
      "code": "// React Compiler ( Forget ): automatically memoizes calculations.",
      "visualizerType": null
    },
    {
      "id": 82,
      "title": "How Compiler Optimizes Code",
      "intro": "Inner mechanics of compiler memoization.",
      "explanation": "The compiler detects dependency changes and injects caching operations into compiled JS files.",
      "gotchas": [
        "If a component violates purity rules, the compiler will safely bypass optimizing it."
      ],
      "interviewQuestions": [
        {
          "question": "What are the rules required for React Compiler optimization?",
          "answer": "Components must be pure, avoid mutating props/state directly, and use stable helper structures."
        }
      ],
      "code": "// Compiler analyzes rules of React (purity, no mutations).",
      "visualizerType": null
    },
    {
      "id": 83,
      "title": "useTransition Hook",
      "intro": "Mark state updates as non-blocking transitions.",
      "explanation": "useTransition lets you update state without blocking the UI, keeping inputs responsive.",
      "gotchas": [
        "State updates inside transitions must be synchronous."
      ],
      "interviewQuestions": [
        {
          "question": "What is useTransition and when is it useful?",
          "answer": "It marks updates as non-blocking transitions, keeping user inputs responsive during heavy updates."
        }
      ],
      "code": "// useTransition: non-blocking state updates\nconst [isPending, startTransition] = useTransition();\nconst updateList = () => {\n  startTransition(() => {\n    setQuery(newValue); // Marked as low-priority update\n  });\n};",
      "visualizerType": null
    },
    {
      "id": 84,
      "title": "useDeferredValue Hook",
      "intro": "Defer rendering slower screen sections.",
      "explanation": "useDeferredValue returns a deferred version of a value, allowing other UI parts to update first.",
      "gotchas": [
        "Can trigger extra re-renders as the deferred value resolves asynchronously."
      ],
      "interviewQuestions": [
        {
          "question": "How does useDeferredValue work?",
          "answer": "It returns a deferred version of a value, allowing React to postpone slow rendering passes until active updates finish."
        }
      ],
      "code": "// useDeferredValue: defer rendering slow components\nconst deferredValue = useDeferredValue(slowInput);\nreturn <SlowList value={deferredValue} />;",
      "visualizerType": null
    },
    {
      "id": 85,
      "title": "Code Splitting: lazy and Suspense",
      "intro": "Load components dynamically to split bundles.",
      "explanation": "React.lazy dynamically imports components; Suspense renders fallback spinners during loading.",
      "gotchas": [
        "Lazy components must be default exports."
      ],
      "interviewQuestions": [
        {
          "question": "What do React.lazy and Suspense achieve?",
          "answer": "They split component bundles into separate chunks and fetch them dynamically, rendering loading wrappers in the interim."
        }
      ],
      "code": "// React.lazy and Suspense: code splitting\nimport React, { lazy, Suspense } from 'react';\nconst DetailView = lazy(() => import('./DetailView'));\n\nexport function App() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      <DetailView />\n    </Suspense>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 86,
      "title": "Dynamic Imports configuration",
      "intro": "Configure bundlers for chunks.",
      "explanation": "Use import() syntax to tell bundlers to split files into separate dynamic chunks.",
      "gotchas": [
        "Ensure your server configurations support serving dynamically split chunk modules."
      ],
      "interviewQuestions": [
        {
          "question": "What is a dynamic import?",
          "answer": "A syntax (import()) telling bundlers to split code modules into separate dynamic files loaded on-demand."
        }
      ],
      "code": "// Dynamic import configs for bundlers (Vite/Webpack).",
      "visualizerType": null
    },
    {
      "id": 87,
      "title": "React Profiler",
      "intro": "Measure component render latencies.",
      "explanation": "Use the Profiler API to measure how often components render and the cost of those renders.",
      "gotchas": [
        "Profiler adds minor performance overhead; disable it in production builds."
      ],
      "interviewQuestions": [
        {
          "question": "How do you trace render speeds programmatically in React?",
          "answer": "Wrap sections in `<Profiler>` boundaries and record commit timings in the onRender callback."
        }
      ],
      "code": "// React Profiler: measure rendering latency\n<Profiler id=\"panel\" onRender={(id, phase, duration) => console.log(duration)}>\n  <Panel />\n</Profiler>",
      "visualizerType": null
    },
    {
      "id": 88,
      "title": "Virtualizing Large Lists",
      "intro": "Render only visible row items.",
      "explanation": "List virtualization (windowing) renders only the rows visible inside the viewport, saving DOM nodes.",
      "gotchas": [
        "Requires fixed row heights or complex dynamic height calculations."
      ],
      "interviewQuestions": [
        {
          "question": "What is list virtualization?",
          "answer": "Rendering only list nodes currently visible inside the scroll viewport, preventing browser lag on large sets."
        }
      ],
      "code": "// Virtualized lists: render only visible rows\n// e.g. using @tanstack/react-virtual to mount select DOM elements.",
      "visualizerType": null
    },
    {
      "id": 89,
      "title": "Optimizing Asset Loading",
      "intro": "Preload fonts and responsive images.",
      "explanation": "Use preload links, modern formats (WebP, AVIF), and responsive tags to accelerate page loads.",
      "gotchas": [
        "Large unoptimized assets cause layout shifts and block page paint cycles."
      ],
      "interviewQuestions": [
        {
          "question": "How do preloading APIs prevent visual layout shifts (CLS)?",
          "answer": "They fetch fonts, layouts, or stylesheets ahead of time, ensuring structures paint correctly on screen load."
        }
      ],
      "code": "// Asset preloading: webp, preload links.",
      "visualizerType": null
    },
    {
      "id": 90,
      "title": "Reducing Bundle Size",
      "intro": "Tree shaking and node dependency checks.",
      "explanation": "Remove unused packages, audit imports, and leverage tree shaking to keep script bundles lightweight.",
      "gotchas": [
        "Importing whole libraries instead of specific methods (e.g. lodash) adds unused weight."
      ],
      "interviewQuestions": [
        {
          "question": "What is tree shaking?",
          "answer": "The process where bundlers remove unused JavaScript exports during build compilation, reducing overall scripts size."
        }
      ],
      "code": "// Reducing bundle sizes: tree shaking lodash, auditing packages.",
      "visualizerType": null
    }
  ]
};
