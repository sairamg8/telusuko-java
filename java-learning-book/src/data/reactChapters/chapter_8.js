export default {
  "id": 8,
  "title": "React Server Components (RSC)",
  "range": "106-120",
  "concepts": [
    {
      "id": 106,
      "title": "Evolution of Rendering: CSR vs SSR",
      "intro": "Understand web page delivery models.",
      "explanation": "CSR loads empty HTML and builds layout via JS. SSR compiles HTML on the server on every request. RSC combines both, streaming UI segments without hydrating static code.",
      "gotchas": [
        "RSC is not the same as SSR; they work together in modern meta-frameworks."
      ],
      "interviewQuestions": [
        {
          "question": "Contrast Server-Side Rendering (SSR) and React Server Components (RSC).",
          "answer": "SSR compiles HTML on requests, shipping full JS for hydration. RSC compiles components to JSX static payloads on the server, avoiding client JS shipping."
        }
      ],
      "code": "// CSR vs SSR vs RSC rendering models\n// CSR: Client downloads JS, builds layout\n// SSR: Server sends compiled HTML, hydrated by client\n// RSC: Server streams React structures, zero bundle weights!",
      "visualizerType": null
    },
    {
      "id": 107,
      "title": "What are React Server Components?",
      "intro": "Server-side components that compile without client-side bundle weight.",
      "explanation": "RSC execute only on the server, generating static JSX. They do not ship JS code to the client, reducing bundle sizes.",
      "gotchas": [
        "Server Components cannot use hooks (useState, useEffect) or handle client-side browser events."
      ],
      "interviewQuestions": [
        {
          "question": "What are the limitations of React Server Components?",
          "answer": "They cannot use client-side hooks (useState, useEffect), browse window/document objects, or listen to client events (onClick)."
        }
      ],
      "code": "// React Server Component: fetches data directly\nexport default async function UserPanel() {\n  const users = await db.query(\"SELECT * FROM users\");\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}",
      "visualizerType": null
    },
    {
      "id": 108,
      "title": "Server vs Client Components",
      "intro": "Differentiate execution scopes.",
      "explanation": "Server Components fetch data and access backend resources; Client Components manage interactive state and browser APIs.",
      "gotchas": [
        "Client Components are still pre-rendered on the server during SSR phases."
      ],
      "interviewQuestions": [
        {
          "question": "Can you import Client Components inside Server Components?",
          "answer": "Yes, Server Components import and render Client Components, defining serialization boundaries."
        }
      ],
      "code": "// Server Component nesting Client Component\nimport ClientButton from './ClientButton'; // 'use client' boundary\n\nexport default function ServerPage() {\n  return (\n    <div>\n      <h1>Server Compiled View</h1>\n      <ClientButton />\n    </div>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 109,
      "title": "'use server' vs 'use client'",
      "intro": "Understand boundary directives.",
      "explanation": "'use client' defines the boundary where client-side interactivity begins; 'use server' marks endpoints for Server Actions.",
      "gotchas": [
        "Writing 'use client' does not mean the file runs *only* on the client; it is still SSR pre-rendered."
      ],
      "interviewQuestions": [
        {
          "question": "What does the 'use client' directive establish?",
          "answer": "It marks the boundary where the client-side JavaScript execution, interactive states, and browser APIs start."
        }
      ],
      "code": "// 'use client' boundary directive\n'use client';\n\nimport { useState } from 'react';\nexport function Toggle() {\n  const [active, setActive] = useState(false);\n  return <button onClick={() => setActive(!active)}>Toggle</button>;\n}",
      "visualizerType": null
    },
    {
      "id": 110,
      "title": "Serialization Boundaries",
      "intro": "Rules for passing props from server to client.",
      "explanation": "Props passed across server-client boundaries must be serializable (no functions, classes, or symbols).",
      "gotchas": [
        "Passing direct database connections or class methods across serialization boundaries throws errors."
      ],
      "interviewQuestions": [
        {
          "question": "Why must props passed from Server to Client Components be serializable?",
          "answer": "Because props are converted to string payloads over network bounds to hydrate the client component instances."
        }
      ],
      "code": "// Serializable props: database IDs and plain variables\n// Functions, classes, and symbols cannot pass across boundaries!",
      "visualizerType": null
    },
    {
      "id": 111,
      "title": "Server-Side Data Fetching",
      "intro": "Fetch data inside async Server Components.",
      "explanation": "Execute fetch requests directly inside async Server Components using standard async/await.",
      "gotchas": [
        "Ensure endpoints are secure since database queries execute directly in component scopes."
      ],
      "interviewQuestions": [
        {
          "question": "How do you fetch data inside React Server Components?",
          "answer": "Declare components as async functions and await standard fetch requests directly inside the rendering block."
        }
      ],
      "code": "// Direct fetch calls inside async Server Components\nexport default async function News() {\n  const posts = await fetch('https://api.test/posts').then(r => r.json());\n  return <div>Posts count: {posts.length}</div>;\n}",
      "visualizerType": null
    },
    {
      "id": 112,
      "title": "Database Access in RSC",
      "intro": "Direct database queries.",
      "explanation": "Run SQL queries or connect to databases directly inside Server Components without intermediate API layers.",
      "gotchas": [
        "Use secure connection pools and ensure secrets are not exposed to client bundles."
      ],
      "interviewQuestions": [
        {
          "question": "Is it safe to run database queries inside Server Components?",
          "answer": "Yes, since RSC execute only on secure servers and their code is never sent to the client browser."
        }
      ],
      "code": "// Direct SQL queries inside RSC\nimport { db } from './db';\nexport default async function TasksList() {\n  const tasks = await db.query(\"SELECT * FROM tasks\");\n  return <div>Tasks count: {tasks.length}</div>;\n}",
      "visualizerType": null
    },
    {
      "id": 113,
      "title": "Streaming HTML with Suspense",
      "intro": "Stream page content incrementally.",
      "explanation": "Stream slow content blocks dynamically using Suspense boundaries. React renders placeholders and streams data as it resolves.",
      "gotchas": [
        "Requires server and network configurations that support HTTP chunked transfer encoding."
      ],
      "interviewQuestions": [
        {
          "question": "How does HTTP streaming work with Suspense?",
          "answer": "React streams static layouts first, and pushes dynamic content blocks as they resolve over the open HTTP connection."
        }
      ],
      "code": "// Streaming slow components using Suspense\nimport { Suspense, lazy } from 'react';\nconst SlowPanel = lazy(() => import('./SlowPanel'));\n\nreturn (\n  <Suspense fallback={<Skeleton />}>\n    <SlowPanel />\n  </Suspense>\n);",
      "visualizerType": null
    },
    {
      "id": 114,
      "title": "Shared Component Patterns",
      "intro": "Write components that run on both client and server.",
      "explanation": "Shared components compile without boundary directives, adapting dynamically depending on where they are imported.",
      "gotchas": [
        "Avoid importing browser APIs in shared components to prevent server-side compilation crashes."
      ],
      "interviewQuestions": [
        {
          "question": "What is a Shared Component in RSC environments?",
          "answer": "Components without boundary directives that run on the server when imported by server files, or on the client when imported by client files."
        }
      ],
      "code": "// Shared component adaptable to execution contexts\n// No 'use client' or 'use server' directives specified!\nexport function FormatDate({ date }) {\n  return <span>{new Date(date).toLocaleDateString()}</span>;\n}",
      "visualizerType": null
    },
    {
      "id": 115,
      "title": "Security: server-only package",
      "intro": "Prevent server code leaks.",
      "explanation": "Import 'server-only' to throw build-time errors if server-specific modules are imported into Client Components.",
      "gotchas": [
        "Always protect modules holding private database configurations or API keys."
      ],
      "interviewQuestions": [
        {
          "question": "What is the purpose of the 'server-only' package?",
          "answer": "It triggers build-time errors if modules containing sensitive backend code are imported into Client Components."
        }
      ],
      "code": "// server-only package import checks\nimport 'server-only';\nexport const dbConnection = new DbConnection();",
      "visualizerType": null
    },
    {
      "id": 116,
      "title": "Client Component Leaves",
      "intro": "Keep client components leaf-level.",
      "explanation": "Push interactivity to leaf nodes to maximize the proportion of Server Components in your application.",
      "gotchas": [
        "Wrapping your root layout in 'use client' converts the entire application into a CSR app."
      ],
      "interviewQuestions": [
        {
          "question": "Why should you push client interactivity to leaf components?",
          "answer": "To maximize server-rendered static segments and minimize overall JavaScript bundle sizes."
        }
      ],
      "code": "// Keeping client components at leaf level to maximize RSC coverage.",
      "visualizerType": null
    },
    {
      "id": 117,
      "title": "Interleaving Server/Client Components",
      "intro": "Nest Server Components inside Client Components.",
      "explanation": "Nest Server Components inside Client Components by passing them down as the children prop.",
      "gotchas": [
        "You cannot import a Server Component directly into a Client Component file."
      ],
      "interviewQuestions": [
        {
          "question": "How do you render a Server Component inside a Client Component?",
          "answer": "Pass the Server Component down as children or render slots from a parent Server Component."
        }
      ],
      "code": "// Nesting Server Component inside Client Component children\n// ClientLayout ('use client'):\nexport default function ClientLayout({ children }) {\n  return <div className=\"layout\">{children}</div>;\n}\n\n// ServerPage (Server Component):\n// Injects ServerComponent inside ClientLayout children prop!",
      "visualizerType": null
    },
    {
      "id": 118,
      "title": "RSC Code Splitting Benefits",
      "intro": "Zero client-side bundle impact.",
      "explanation": "Server Components do not bundle their dependencies on the client, reducing the amount of JavaScript shipped.",
      "gotchas": [
        "If you import a utility library inside a Client Component, it is still bundled."
      ],
      "interviewQuestions": [
        {
          "question": "How does RSC optimize npm package bundle weights?",
          "answer": "Libraries used inside Server Components compile entirely on the server and are excluded from client script files."
        }
      ],
      "code": "// RSC dependencies do not increase client bundles sizes.",
      "visualizerType": null
    },
    {
      "id": 119,
      "title": "Hydration Mismatch triggers",
      "intro": "Expose and resolve hydration mismatches.",
      "explanation": "Hydration errors occur when the initial client render differs from the server-rendered HTML (e.g. using new Date()).",
      "gotchas": [
        "Ensure dynamic values are loaded inside useEffect or marked to skip hydration checks."
      ],
      "interviewQuestions": [
        {
          "question": "Name common causes of hydration mismatch errors.",
          "answer": "Accessing date stamps, random generators, window APIs, or conditional structures that vary between server and client."
        }
      ],
      "code": "// Hydration errors occur if server HTML doesn't match client runs.",
      "visualizerType": null
    },
    {
      "id": 120,
      "title": "Static vs Dynamic Rendering",
      "intro": "Optimize caching models.",
      "explanation": "Static pages cache compiled HTML; Dynamic pages render on every request based on dynamic routes or cookies.",
      "gotchas": [
        "Accessing request parameters (cookies, headers) automatically forces pages into Dynamic rendering."
      ],
      "interviewQuestions": [
        {
          "question": "What triggers dynamic rendering in Next.js pages?",
          "answer": "Calling dynamic APIs (cookies, headers) or accessing dynamic route search params."
        }
      ],
      "code": "// Static routing vs dynamic request caches.",
      "visualizerType": null
    }
  ]
};
