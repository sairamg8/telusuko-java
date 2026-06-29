export default {
  "id": 4,
  "title": "Side Effects & Lifecycle",
  "range": "46-60",
  "concepts": [
    {
      "id": 46,
      "title": "What are Side Effects?",
      "intro": "External operations in component lifecycle.",
      "explanation": "Side effects include data fetching, DOM changes, subscription setups, and logging.",
      "gotchas": [
        "Avoid running side effects in the main render body; always wrap them in hooks."
      ],
      "interviewQuestions": [
        {
          "question": "What is a side effect and where should it reside in React?",
          "answer": "Side effects are operations interacting with external systems (APIs, timers, direct DOMs). They must reside inside useEffect, not in the main rendering block."
        }
      ],
      "code": "// Side effect placement: wrap inside useEffect\nimport React, { useEffect, useState } from 'react';\n\nexport function Logger() {\n  useEffect(() => {\n    console.log(\"Logged side effect after render commit!\");\n  });\n  return <div>Logger Panel</div>;\n}",
      "visualizerType": null
    },
    {
      "id": 47,
      "title": "useEffect Hook: Basic Execution",
      "intro": "Synchronize components with external systems.",
      "explanation": "useEffect runs side-effects after the component renders and updates the DOM.",
      "gotchas": [
        "Effects run after browser layout commits to avoid blocking paint."
      ],
      "interviewQuestions": [
        {
          "question": "When does the useEffect callback run?",
          "answer": "It runs asynchronously after the component renders and browser finishes painting layouts, avoiding render blocking."
        }
      ],
      "code": "// useEffect: runs after layout and paint commits\nuseEffect(() => {\n  document.title = \"Updated Page Title\";\n});",
      "visualizerType": null
    },
    {
      "id": 48,
      "title": "Dependency Array Mechanics",
      "intro": "Control when effects run.",
      "explanation": "Omit dependencies to run on every render; pass empty array to run once on mount; pass variables to run on changes.",
      "gotchas": [
        "Omitting variables used inside the effect from the dependency array causes stale closures."
      ],
      "interviewQuestions": [
        {
          "question": "What are the rules of the dependency array?",
          "answer": "Omitted dependency: runs on every render. Empty array ([]): runs once on mount. Variable list: runs when references change."
        }
      ],
      "code": "// Dependency arrays mapping\nuseEffect(() => {\n  console.log(\"Runs ONLY when user variable changes reference\");\n}, [user]);",
      "visualizerType": null
    },
    {
      "id": 49,
      "title": "Cleanup Functions in useEffect",
      "intro": "Clean up resources to prevent leaks.",
      "explanation": "Return a cleanup function from the effect to clear timers, abort requests, and unsubscribe from event listeners.",
      "gotchas": [
        "Cleanup functions run before the effect runs again and when the component unmounts."
      ],
      "interviewQuestions": [
        {
          "question": "What is the purpose of the cleanup function in useEffect?",
          "answer": "It executes before the component unmounts and before subsequent effect runs to clear timers, listeners, or active sockets."
        }
      ],
      "code": "// useEffect: returning cleanups to prevent leaks\nuseEffect(() => {\n  const handleResize = () => console.log(window.innerWidth);\n  window.addEventListener('resize', handleResize);\n\n  // Return cleanup function\n  return () => {\n    window.removeEventListener('resize', handleResize);\n  };\n}, []);",
      "visualizerType": null
    },
    {
      "id": 50,
      "title": "Infinite Loop Gotchas",
      "intro": "Avoid triggering endless render cycles.",
      "explanation": "If an effect updates a state variable listed in its dependency array, it triggers an infinite loop.",
      "gotchas": [
        "Always verify state updates inside effects do not trigger dependency updates."
      ],
      "interviewQuestions": [
        {
          "question": "How do you resolve infinite rendering loops in useEffect?",
          "answer": "Verify state setters inside the effect do not modify variables listed in the dependency array."
        }
      ],
      "code": "// BAD: infinite loop triggers\nuseEffect(() => {\n  setCount(count + 1); // Triggers re-render, which runs effect again!\n}, [count]);",
      "visualizerType": null
    },
    {
      "id": 51,
      "title": "Customizing Effect Dependencies",
      "intro": "Handling object and array dependencies.",
      "explanation": "Passing objects or arrays directly as dependencies can trigger effects on every render due to reference changes.",
      "gotchas": [
        "Use primitive fields or wrap objects in useMemo to maintain stable references."
      ],
      "interviewQuestions": [
        {
          "question": "Why are object references risky inside dependency arrays?",
          "answer": "Objects get new memory references on every render, prompting effects to trigger repeatedly. Wrap in useMemo or destructure primitives."
        }
      ],
      "code": "// Customizing object dependencies using useMemo\nconst queryOptions = useMemo(() => ({ filter: query }), [query]);\nuseEffect(() => {\n  fetchData(queryOptions);\n}, [queryOptions]);",
      "visualizerType": null
    },
    {
      "id": 52,
      "title": "Fetching Data with useEffect",
      "intro": "Fetch remote API data.",
      "explanation": "Trigger API requests inside effects, managing loading, success, and error states in local state.",
      "gotchas": [
        "Effects cannot be declared as async; write an inner async function and call it."
      ],
      "interviewQuestions": [
        {
          "question": "Why can't you pass an async function directly to useEffect?",
          "answer": "useEffect expects callbacks returning either void or a cleanup function. Async functions return Promises, breaking this model."
        }
      ],
      "code": "// Async data fetching inside effects\nuseEffect(() => {\n  const loadData = async () => {\n    const data = await fetch('/api/tasks').then(r => r.json());\n    setTasks(data);\n  };\n  loadData();\n}, []);",
      "visualizerType": null
    },
    {
      "id": 53,
      "title": "Race Conditions in Data Fetching",
      "intro": "Prevent slow requests from overwriting newer data.",
      "explanation": "If user triggers multiple requests, older requests might resolve after newer ones, overwriting states.",
      "gotchas": [
        "Use cleanup flags or AbortController to ignore stale response resolutions."
      ],
      "interviewQuestions": [
        {
          "question": "What is a race condition in useEffect data fetching?",
          "answer": "Multiple requests run concurrently; slow requests can resolve last, overwriting newer state caches. Resolve using active cancellation flags."
        }
      ],
      "code": "// Resolving data fetch race conditions\nuseEffect(() => {\n  let isCurrent = true;\n  fetch(`/api/user/${id}`).then(r => r.json()).then(data => {\n    if (isCurrent) setUser(data);\n  });\n\n  return () => { isCurrent = false; };\n}, [id]);",
      "visualizerType": null
    },
    {
      "id": 54,
      "title": "useLayoutEffect vs useEffect",
      "intro": "Run effects synchronously before paint.",
      "explanation": "useLayoutEffect runs synchronously after DOM mutations but before the browser paints, avoiding layout flashes.",
      "gotchas": [
        "Prefer useEffect unless measuring layouts or adjusting scroll positions to avoid blockages."
      ],
      "interviewQuestions": [
        {
          "question": "How does useLayoutEffect differ from useEffect?",
          "answer": "useLayoutEffect runs synchronously after DOM mutations but BEFORE the browser repaints, avoiding visual screen flashes."
        }
      ],
      "code": "// Synchronous DOM measurements using useLayoutEffect\nimport React, { useLayoutEffect, useRef } from 'react';\n\nexport function Box() {\n  const boxRef = useRef(null);\n  useLayoutEffect(() => {\n    const rect = boxRef.current.getBoundingClientRect();\n    console.log(rect.height);\n  }, []);\n  return <div ref={boxRef}>Content</div>;\n}",
      "visualizerType": null
    },
    {
      "id": 55,
      "title": "Synchronizing Browser Events",
      "intro": "Bind scroll and resize handlers.",
      "explanation": "Attach window event listeners inside effects and clean them up when unmounting.",
      "gotchas": [
        "Forgetting to remove event listeners causes performance leaks in single-page apps."
      ],
      "interviewQuestions": [
        {
          "question": "What happens if you omit event listener cleanup code?",
          "answer": "Listeners remain attached in browser memory, causing memory leaks and performance drops as the component mounts/unmounts."
        }
      ],
      "code": "// Attaching and removing window event handlers\nuseEffect(() => {\n  const onScroll = () => console.log(window.scrollY);\n  window.addEventListener('scroll', onScroll);\n  return () => window.removeEventListener('scroll', onScroll);\n}, []);",
      "visualizerType": null
    },
    {
      "id": 56,
      "title": "Timers and Intervals",
      "intro": "Manage setInterval and setTimeout.",
      "explanation": "Establish timers inside effects and return clearInterval/clearTimeout in cleanups.",
      "gotchas": [
        "Stale state closures inside setInterval can prevent variables from updating."
      ],
      "interviewQuestions": [
        {
          "question": "How do you avoid stale values inside setInterval callbacks?",
          "answer": "Use state updater callbacks (e.g., setSeconds(s => s + 1)) to retrieve the latest state, bypassing closure dependencies."
        }
      ],
      "code": "// Setting intervals inside effects\nuseEffect(() => {\n  const timer = setInterval(() => {\n    setSeconds(s => s + 1);\n  }, 1000);\n  return () => clearInterval(timer);\n}, []);",
      "visualizerType": null
    },
    {
      "id": 57,
      "title": "Synchronizing State with Props",
      "intro": "Props change sync models.",
      "explanation": "Updating local state when props change is usually an anti-pattern. Compute values inline or reset state with keys.",
      "gotchas": [
        "Updating state inside effects when props change causes extra re-renders."
      ],
      "interviewQuestions": [
        {
          "question": "Is syncing state with useEffect on prop changes recommended?",
          "answer": "No, it causes duplicate renders. Calculate derived values inline, or reset component state using the key attribute."
        }
      ],
      "code": "// Resetting local state when props change\nfunction Profile({ userId }) {\n  const [draft, setDraft] = useState(\"\");\n  // Reset state using key instead of syncing inside useEffect!\n  return <ProfileEditor key={userId} draft={draft} />;\n}",
      "visualizerType": null
    },
    {
      "id": 58,
      "title": "useId Hook",
      "intro": "Generate stable, accessible IDs.",
      "explanation": "useId generates unique, stable IDs for form controls, supporting client-server hydration consistency.",
      "gotchas": [
        "Do not use useId to generate key attributes in lists."
      ],
      "interviewQuestions": [
        {
          "question": "Why should you use useId instead of manual strings for IDs?",
          "answer": "useId guarantees unique, stable strings across client-server renders, avoiding hydration mismatch warnings."
        }
      ],
      "code": "// useId: stable accessibility IDs\nconst labelId = useId();\nreturn (\n  <>\n    <label htmlFor={labelId}>Name</label>\n    <input id={labelId} type=\"text\" />\n  </>\n);",
      "visualizerType": null
    },
    {
      "id": 59,
      "title": "Debugging Side Effects",
      "intro": "Trace effect execution paths.",
      "explanation": "Use console logs inside effects and cleanups to trace how triggers resolve.",
      "gotchas": [
        "Remember that development StrictMode runs effects twice to help catch leaks."
      ],
      "interviewQuestions": [
        {
          "question": "Why do effects run twice on mount in development mode?",
          "answer": "React's StrictMode mounts, unmounts, and remounts components to verify cleanup functions resolve memory leaks."
        }
      ],
      "code": "// Debugging effects: leverage strict mode console traces.",
      "visualizerType": null
    },
    {
      "id": 60,
      "title": "Event Listener Memory Leaks",
      "intro": "Expose and solve listener leaks.",
      "explanation": "Verify all added event listeners are removed during cleanup phases.",
      "gotchas": [
        "Check browser memory profiles for detached DOM elements and growing listeners."
      ],
      "interviewQuestions": [
        {
          "question": "How do you trace active event listener memory leaks?",
          "answer": "Inspect the Elements panel's Event Listeners list in Chrome DevTools to locate detached DOM nodes."
        }
      ],
      "code": "// Verify GC is cleaning up detached event listeners.",
      "visualizerType": null
    }
  ]
};
