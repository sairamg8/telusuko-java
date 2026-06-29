export default {
  "id": 7,
  "title": "React 19 Transitions & Actions",
  "range": "91-105",
  "concepts": [
    {
      "id": 91,
      "title": "React 19 Async Transitions",
      "intro": "Built-in support for asynchronous functions in transitions.",
      "explanation": "React 19 supports passing async functions directly to startTransition, managing loading states automatically.",
      "gotchas": [
        "Ensure you handle promise rejections inside async transitions to avoid runtime issues."
      ],
      "interviewQuestions": [
        {
          "question": "What are React 19 Async Transitions?",
          "answer": "They let developers pass async functions directly to startTransition, managing pending loading states automatically."
        }
      ],
      "code": "// React 19 async transition callbacks\nconst [isPending, startTransition] = useTransition();\n\nconst handleSave = () => {\n  startTransition(async () => {\n    await saveRecord(); // Async operations supported natively!\n  });\n};",
      "visualizerType": null
    },
    {
      "id": 92,
      "title": "Form Action Attributes",
      "intro": "Pass action functions directly to HTML forms.",
      "explanation": "React 19 extends HTML forms, allowing you to pass functions directly to the action attribute.",
      "gotchas": [
        "Forms will still submit correctly even if JavaScript has not finished loading on the client."
      ],
      "interviewQuestions": [
        {
          "question": "How does the action attribute behave in React 19 forms?",
          "answer": "It accepts async functions, capturing form values automatically via FormData, managing loading states."
        }
      ],
      "code": "// React 19 Form actions attributes\nfunction Form() {\n  const save = async (formData) => {\n    const name = formData.get(\"name\");\n    await submitApi(name);\n  };\n  return <form action={save}><input name=\"name\" /><button>Send</button></form>;\n}",
      "visualizerType": null
    },
    {
      "id": 93,
      "title": "useActionState Hook",
      "intro": "Manage form actions, error feedback, and loading states.",
      "explanation": "useActionState (previously useFormState) handles async form operations, returning state and action wrappers.",
      "gotchas": [
        "Requires passing the form action handler as the first parameter."
      ],
      "interviewQuestions": [
        {
          "question": "What does useActionState manage?",
          "answer": "It handles async form submissions, returning states, actions wrappers, and loading indicators."
        }
      ],
      "code": "// React 19 useActionState form hooks\nconst [state, formAction, isPending] = useActionState(\n  async (prevState, formData) => {\n    try {\n      await submit(formData);\n      return { success: true };\n    } catch (e) {\n      return { error: e.message };\n    }\n  },\n  { success: false }\n);",
      "visualizerType": null
    },
    {
      "id": 94,
      "title": "useFormStatus Hook",
      "intro": "Access parent form submission states.",
      "explanation": "useFormStatus lets child inputs read their parent form's submission progress (like pending status).",
      "gotchas": [
        "Must be used inside components nested inside `<form>`, not on the form component itself."
      ],
      "interviewQuestions": [
        {
          "question": "Where must the useFormStatus hook be called?",
          "answer": "It must be called inside components nested inside `<form>` elements, not on the form component itself."
        }
      ],
      "code": "// React 19 useFormStatus: reading submission state in children\nimport { useFormStatus } from 'react-dom';\n\nfunction SubmitButton() {\n  const { pending } = useFormStatus();\n  return <button disabled={pending}>{pending ? 'Submitting...' : 'Save'}</button>;\n}",
      "visualizerType": null
    },
    {
      "id": 95,
      "title": "useOptimistic Hook",
      "intro": "Apply instant UI updates during async tasks.",
      "explanation": "useOptimistic displays a temporary state value during async operations, reverting on completion.",
      "gotchas": [
        "Ensure the optimistic update matches the expected database return structure."
      ],
      "interviewQuestions": [
        {
          "question": "How does the useOptimistic hook work?",
          "answer": "It displays a temporary mock value while async operations run, resolving to backend results automatically when settled."
        }
      ],
      "code": "// React 19 useOptimistic: instant UI feedback\nconst [optimisticList, addOptimistic] = useOptimistic(\n  list,\n  (state, newItem) => [...state, { ...newItem, pending: true }]\n);",
      "visualizerType": null
    },
    {
      "id": 96,
      "title": "use Hook: Promises in Render",
      "intro": "Read promises directly during rendering.",
      "explanation": "The new 'use' hook lets you read values from resolved promises or context directly inside render.",
      "gotchas": [
        "Unlike standard hooks, 'use' can be called inside loops and conditional statements."
      ],
      "interviewQuestions": [
        {
          "question": "What is the new 'use' hook in React 19?",
          "answer": "It reads promises or context values during rendering, allowing hooks calls inside loops and conditional trees."
        }
      ],
      "code": "// React 19: use hook reading Promises during render\nimport { use } from 'react';\n\nfunction UserProfile({ dataPromise }) {\n  const user = use(dataPromise); // Suspends component until resolved!\n  return <div>User: {user.name}</div>;\n}",
      "visualizerType": null
    },
    {
      "id": 97,
      "title": "use Hook: Conditional Context",
      "intro": "Read context inside conditional blocks.",
      "explanation": "Use 'use(Context)' to read context conditionally, avoiding nested provider limitations.",
      "gotchas": [
        "Ensure parent providers exist in all logical execution branches."
      ],
      "interviewQuestions": [
        {
          "question": "Can 'use' read contexts inside conditional statements?",
          "answer": "Yes, unlike standard useContext, 'use' can execute inside if blocks or loops, bypassing standard hook limits."
        }
      ],
      "code": "// React 19: use hook reading Context conditionally\nconst theme = condition ? use(ThemeContext) : 'light';",
      "visualizerType": null
    },
    {
      "id": 98,
      "title": "Ref as a Prop",
      "intro": "Direct ref prop support in custom components.",
      "explanation": "React 19 supports passing refs as standard props, making forwardRef obsolete.",
      "gotchas": [
        "Clean up old forwardRef definitions to avoid console warnings in React 19."
      ],
      "interviewQuestions": [
        {
          "question": "How does React 19 handle refs on custom functional components?",
          "answer": "It supports ref as a standard prop, deprecating the forwardRef higher-order component wrapper."
        }
      ],
      "code": "// React 19 ref as a standard prop\nfunction Input({ ref, label }) {\n  return <label>{label}<input ref={ref} /></label>;\n}",
      "visualizerType": null
    },
    {
      "id": 99,
      "title": "Context as a Provider",
      "intro": "Simpler context provider declaration.",
      "explanation": "Use `<Theme>` directly as a provider in React 19, instead of `<Theme.Provider>`.",
      "gotchas": [
        "Both formats are supported in React 19, but default to the direct tag wrapper for cleaner code."
      ],
      "interviewQuestions": [
        {
          "question": "What is the change to Context Providers in React 19?",
          "answer": "You can write `<Context>` directly instead of `<Context.Provider>`, clean and simplified."
        }
      ],
      "code": "// React 19 context provider tag changes\nreturn <Theme value=\"dark\">{children}</Theme>; // Provider suffix omitted!",
      "visualizerType": null
    },
    {
      "id": 100,
      "title": "Hydration Error Improvements",
      "intro": "Better hydration logs.",
      "explanation": "React 19 provides clearer, more detailed error logs when server and client HTML structures mismatch.",
      "gotchas": [
        "Hydration mismatches still block rendering; resolve them by cleaning up dynamic values."
      ],
      "interviewQuestions": [
        {
          "question": "How did React 19 improve hydration error troubleshooting?",
          "answer": "It outputs clear HTML differences, highlighting the exact elements that mismatched between server and client."
        }
      ],
      "code": "// React 19 prints cleaner, detailed hydration diff logs in console.",
      "visualizerType": null
    },
    {
      "id": 101,
      "title": "Native Document Metadata",
      "intro": "Support for Title, Meta, and Link tags.",
      "explanation": "React 19 natively supports document head tags in component trees, managing updates automatically.",
      "gotchas": [
        "React handles head tag deduplication, so you don't need external head managers."
      ],
      "interviewQuestions": [
        {
          "question": "How does React 19 handle HTML head metadata?",
          "answer": "It natively hoists title, meta, and link tags from page layouts to the document head automatically."
        }
      ],
      "code": "// React 19 document metadata hoisting\nfunction Page() {\n  return (\n    <>\n      <title>React 19 Dashboard</title>\n      <meta name=\"description\" content=\"Next-gen features\" />\n      <article>Content</article>\n    </>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 102,
      "title": "Stylesheet Preloading",
      "intro": "Declare style precedence.",
      "explanation": "Specify stylesheet load priorities using link rel properties; React loads and positions them automatically.",
      "gotchas": [
        "Requires defining clear load orders to prevent style overrides."
      ],
      "interviewQuestions": [
        {
          "question": "How does specifying precedence on link tags optimize stylesheet loads?",
          "answer": "It tells React to load stylesheets in the head, suspending rendering until they load to prevent visual layout shifts."
        }
      ],
      "code": "// Stylesheet preloading configurations in React 19\n<link rel=\"stylesheet\" href=\"style.css\" precedence=\"default\" />",
      "visualizerType": null
    },
    {
      "id": 103,
      "title": "Async Script Loading",
      "intro": "Native support for async scripts.",
      "explanation": "Place async script tags anywhere in your component tree; React loads them in the head.",
      "gotchas": [
        "Ensure scripts handle asynchronous execution bounds and do not block layout rendering."
      ],
      "interviewQuestions": [
        {
          "question": "Does React 19 support inline async scripts?",
          "answer": "Yes, React hoists async scripts to the head and manages deduplication across multiple renders."
        }
      ],
      "code": "// Async script preloading in React 19\n<script async src=\"analytics.js\" />",
      "visualizerType": null
    },
    {
      "id": 104,
      "title": "Resource Preloading APIs",
      "intro": "Preload assets programmatically.",
      "explanation": "Use preloading APIs (like preload, preinit) to fetch assets before they are rendered in the DOM.",
      "gotchas": [
        "Overusing preloads can waste network bandwidth on unused pages."
      ],
      "interviewQuestions": [
        {
          "question": "What do preloading resource APIs achieve?",
          "answer": "They instruct browsers to fetch critical resources ahead of time, speeding up overall page load limits."
        }
      ],
      "code": "// Preload resource APIs: preinit, preload\nimport { preinit } from 'react-dom';\npreinit('analytics.js', { as: 'script' });",
      "visualizerType": null
    },
    {
      "id": 105,
      "title": "Web Components integration",
      "intro": "Full custom elements support.",
      "explanation": "React 19 handles properties and events correctly on Web Components out-of-the-box.",
      "gotchas": [
        "Verify event naming conventions match Web Component custom event standards."
      ],
      "interviewQuestions": [
        {
          "question": "How does React 19 improve Web Components integration?",
          "answer": "It maps custom properties and event listeners natively, bypassing manual ref configurations."
        }
      ],
      "code": "// Web Components events: React 19 support\n// Custom properties and event listeners map out-of-the-box in React 19!",
      "visualizerType": null
    }
  ]
};
