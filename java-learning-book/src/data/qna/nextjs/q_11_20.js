export const q_11_20 = [
  {
    "id": 11,
    "category": "Next.js Core",
    "level": "Intermediate",
    "title": "Cache invalidation APIs",
    "companies": [
      "Goldman Sachs",
      "Citadel"
    ],
    "question": "How do you clear cached data in Next.js App Router?",
    "answer": "Use revalidatePath(path) to clear cached pages at specific paths, or revalidateTag(tag) to purge specific fetch cache tags. These APIs must be executed on the server inside Server Actions or Route Handlers.",
    "checklist": [
      "revalidatePath clears layout caches",
      "revalidateTag purges custom tags",
      "Executed inside server contexts"
    ]
  },
  {
    "id": 12,
    "category": "Next.js Routing",
    "level": "Intermediate",
    "title": "Route Handlers (API)",
    "companies": [
      "eBay",
      "PayPal"
    ],
    "question": "What are Route Handlers in Next.js?",
    "answer": "Route Handlers let you create custom request handlers for HTTP verbs (GET, POST, PUT, DELETE) inside route.js files. They run on the server and are the App Router equivalent of Pages Router API routes.",
    "checklist": [
      "Defined in route.js files",
      "Export HTTP verb functions",
      "Cannot share folder with page.js"
    ]
  },
  {
    "id": 13,
    "category": "Next.js Routing",
    "level": "Intermediate",
    "title": "Loading UI with loading.js",
    "companies": [
      "Walmart",
      "Target"
    ],
    "question": "How does loading.js work in App Router routing?",
    "answer": "Defining loading.js inside a route folder automatically wraps the nested page in a React Suspense boundary. While the page is resolving async server-side queries, Next.js streams the loading UI placeholder instantly.",
    "checklist": [
      "Provides instant loading states",
      "Wraps page in Suspense boundary",
      "Streams UI components dynamically"
    ]
  },
  {
    "id": 14,
    "category": "Next.js Routing",
    "level": "Intermediate",
    "title": "Error boundaries using error.js",
    "companies": [
      "Cisco",
      "Visa"
    ],
    "question": "How do you catch runtime errors in Next.js routes?",
    "answer": "Create an error.js component in the route folder. It must be a Client Component ('use client') and automatically wraps the route page in a React Error Boundary, receiving error objects and reset callbacks.",
    "checklist": [
      "Must be a Client Component",
      "Provides route error boundaries",
      "Provides reset() function to retry"
    ]
  },
  {
    "id": 15,
    "category": "Next.js Architecture",
    "level": "Intermediate",
    "title": "Next.js Middleware Edge",
    "companies": [
      "Netflix",
      "Stripe"
    ],
    "question": "What is Next.js Middleware and when does it execute?",
    "answer": "Middleware runs in the Edge runtime before requests are completed. It allows intercepting requests to redirect users, rewrite paths, parse authentication tokens, or modify response headers.",
    "checklist": [
      "Runs in Edge runtime",
      "Executes prior to routing routing resolutions",
      "Optimal for tokens/headers checks"
    ]
  },
  {
    "id": 16,
    "category": "Next.js Architecture",
    "level": "Advanced",
    "title": "Partial Prerendering (PPR)",
    "companies": [
      "Vercel",
      "Meta"
    ],
    "question": "What is Partial Prerendering (PPR) in Next.js?",
    "answer": "PPR is a hybrid rendering model where a page's static shell is pre-rendered and served instantly, while dynamic segments wrapped in Suspense boundaries are streamed in over the network once they resolve.",
    "checklist": [
      "Combines static and dynamic rendering",
      "Static shell serves instantly",
      "Streams dynamic blocks via Suspense"
    ]
  },
  {
    "id": 17,
    "category": "Next.js Core",
    "level": "Advanced",
    "title": "Serialization across Client Boundaries",
    "companies": [
      "Vercel",
      "Google"
    ],
    "question": "What are the rules for passing props from Server to Client Components?",
    "answer": "All props passed across server-to-client component boundaries must be serializable (primitives, plain objects, arrays). You cannot pass functions, classes, custom instances, or symbols across boundaries.",
    "checklist": [
      "Props must be fully serializable",
      "No function/class parameters allowed",
      "Exposing database connections throws errors"
    ]
  },
  {
    "id": 18,
    "category": "Next.js Core",
    "level": "Advanced",
    "title": "server-only package import protection",
    "companies": [
      "Vercel",
      "Stripe"
    ],
    "question": "Why and how do you use the 'server-only' package?",
    "answer": "Install the 'server-only' package and import it in backend files (e.g. db.js). If a developer tries to import that module into a Client Component, Next.js throws a build-time compilation error, preventing security leaks.",
    "checklist": [
      "npm i server-only",
      "Throws build-time compile errors",
      "Prevents database/API credentials leak"
    ]
  },
  {
    "id": 19,
    "category": "Next.js Routing",
    "level": "Advanced",
    "title": "Parallel Routes slots",
    "companies": [
      "Vercel",
      "Airbnb"
    ],
    "question": "What are Parallel Routes in Next.js?",
    "answer": "Parallel Routes let you render multiple pages in the same layout simultaneously using slots defined with an '@' symbol (e.g. app/@analytics/page.js). The parent layout receives these slots as props alongside children.",
    "checklist": [
      "Uses @slot folders in App Router",
      "Injects slots as props in layouts",
      "Supports independent loading/error panels"
    ]
  },
  {
    "id": 20,
    "category": "Next.js Routing",
    "level": "Advanced",
    "title": "Intercepting Routes overlay",
    "companies": [
      "Vercel",
      "Uber"
    ],
    "question": "What are Intercepting Routes and when are they useful?",
    "answer": "Intercepting Routes load pages inside the active layout context using patterns like (..)path. Useful for displaying overlays (like image detail modals) when navigating, but serving the full page on direct browser reloads.",
    "checklist": [
      "Loads routes in current layout",
      "Supports modal overlay patterns",
      "Preserves normal route paths on reloads"
    ]
  }
];
export default q_11_20;
