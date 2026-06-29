export const q_1_10 = [
  {
    "id": 1,
    "category": "Next.js Architecture",
    "level": "Basic",
    "title": "Pages Router vs App Router",
    "companies": [
      "Vercel",
      "TCS"
    ],
    "question": "What is the primary difference between Pages Router and App Router?",
    "answer": "Pages Router maps routes to the 'pages' directory where every page component is fully client-side by default. App Router resides in the 'app' directory, supports nested layouts, and defaults to React Server Components (RSC) to reduce client JS bundle weight.",
    "checklist": [
      "Pages Router is client-centric",
      "App Router is server-centric",
      "App Router supports nested layouts"
    ]
  },
  {
    "id": 2,
    "category": "Next.js Core",
    "level": "Basic",
    "title": "React Server Components (RSC)",
    "companies": [
      "Vercel",
      "Meta"
    ],
    "question": "What are React Server Components and how do they benefit applications?",
    "answer": "Server Components execute exclusively on the server, generating static JSX markup. They do not ship any JavaScript execution code to client bundles, keeping client scripts lightweight while allowing direct database or API fetching.",
    "checklist": [
      "Zero client bundle impact",
      "Database queries execute on server",
      "Default rendering mode in App Router"
    ]
  },
  {
    "id": 3,
    "category": "Next.js Routing",
    "level": "Basic",
    "title": "File-System Routing in Next.js",
    "companies": [
      "Infosys",
      "Wipro"
    ],
    "question": "How does Next.js implement file-system routing?",
    "answer": "Next.js routes are defined by directories in the 'app' folder. A public endpoint is established when a folder contains a 'page.js' file. Dynamic segments are defined using brackets, e.g., app/blog/[id]/page.js matches /blog/123.",
    "checklist": [
      "Folders define URL paths",
      "page.js represents route component",
      "Brackets define dynamic parameters"
    ]
  },
  {
    "id": 4,
    "category": "Next.js Routing",
    "level": "Basic",
    "title": "Layouts vs Templates",
    "companies": [
      "Cognizant",
      "Capgemini"
    ],
    "question": "What is the difference between layouts and templates in Next.js?",
    "answer": "Layouts (layout.js) persist state, preserve DOM structures, and do not re-render on sibling page transitions. Templates (template.js) re-create their DOM nodes and re-initialize state hooks on every page navigation.",
    "checklist": [
      "Layouts preserve state & DOM",
      "Templates recreate DOM on navigation",
      "Use templates for entry animations or page trackings"
    ]
  },
  {
    "id": 5,
    "category": "Next.js Core",
    "level": "Basic",
    "title": "Server vs Client Components",
    "companies": [
      "Accenture",
      "IBM"
    ],
    "question": "When should you mark a component as a Client Component?",
    "answer": "Mark a component as a Client Component using the 'use client' directive at the top of the file when you require state hooks (useState, useReducer), lifecycle effects (useEffect), or browser-specific events (onClick, onChange).",
    "checklist": [
      "'use client' marks boundary",
      "Required for state and effects",
      "Pre-rendered on server during SSR"
    ]
  },
  {
    "id": 6,
    "category": "Next.js Routing",
    "level": "Intermediate",
    "title": "Route Groups",
    "companies": [
      "Vercel",
      "TCS"
    ],
    "question": "What are Route Groups in Next.js?",
    "answer": "Route Groups organize folders without affecting public URL structures. They are defined by wrapping folder names in parentheses, e.g. app/(marketing)/about/page.js is accessible via /about. Useful for grouping layouts.",
    "checklist": [
      "Folders in parentheses (name)",
      "Does not alter public URL path",
      "Enables separate nested layout layouts"
    ]
  },
  {
    "id": 7,
    "category": "Next.js Routing",
    "level": "Intermediate",
    "title": "Dynamic Route parameters selection",
    "companies": [
      "Infosys",
      "Mindtree"
    ],
    "question": "How do you read parameters from dynamic routes in Page components?",
    "answer": "Page components receive 'params' and 'searchParams' props. Under React 19/Next 15, these are promises and must be awaited before reading. E.g. const { id } = await params;.",
    "checklist": [
      "params represents route slugs",
      "searchParams represents query variables",
      "Must be awaited in Next.js 15+"
    ]
  },
  {
    "id": 8,
    "category": "Next.js Data Fetching",
    "level": "Intermediate",
    "title": "Static vs Dynamic Rendering",
    "companies": [
      "Google",
      "Vercel"
    ],
    "question": "How does Next.js decide between Static and Dynamic page rendering?",
    "answer": "By default, Next.js statically renders pages, caching them at build time. It automatically switches to Dynamic rendering if a page uses dynamic parameters (like cookies(), headers()) or if searchParams are accessed.",
    "checklist": [
      "Static is cached at build time",
      "Dynamic compiles on every request",
      "Accessing headers/cookies forces Dynamic"
    ]
  },
  {
    "id": 9,
    "category": "Next.js Data Fetching",
    "level": "Intermediate",
    "title": "Incremental Static Regeneration (ISR)",
    "companies": [
      "Amazon",
      "Uber"
    ],
    "question": "What is Incremental Static Regeneration (ISR)?",
    "answer": "ISR allows you to update static pages in the background without rebuilds. By specifying revalidate properties (e.g. fetch(url, { next: { revalidate: 3600 } })), Next.js regenerates pages when requests arrive after interval expires.",
    "checklist": [
      "Updates static pages in background",
      "Specified using revalidate options",
      "Avoids full project rebuild penalties"
    ]
  },
  {
    "id": 10,
    "category": "Next.js Core",
    "level": "Intermediate",
    "title": "Server Actions CRUD",
    "companies": [
      "Stripe",
      "Netflix"
    ],
    "question": "What are Server Actions and how are they used?",
    "answer": "Server Actions are async functions declared with 'use server' at the file or function top level. They run securely on the server and are triggered directly from client components (like form action attributes), bypassing REST endpoints.",
    "checklist": [
      "Async server-side functions",
      "'use server' directive",
      "Triggered directly from form actions"
    ]
  }
];
export default q_1_10;
