export default {
  "id": 9,
  "title": "Modern Routing (Next.js App Router)",
  "range": "121-135",
  "concepts": [
    {
      "id": 121,
      "title": "File-System Routing",
      "intro": "Map folder structures directly to URL routes.",
      "explanation": "Next.js uses a directory-based router where folders define routes and page.js files define UI layouts.",
      "gotchas": [
        "Only page.js files are accessible public endpoints; other files inside route folders are ignored."
      ],
      "interviewQuestions": [
        {
          "question": "Explain the directory layout routing system in Next.js App Router.",
          "answer": "Directories define route URLs. Files named `page.js` represent the public page components rendered at that path."
        }
      ],
      "code": "// Next.js directory-based file router\n// app/page.js         -> /\n// app/about/page.js   -> /about\n// app/dashboard/page.js -> /dashboard",
      "visualizerType": null
    },
    {
      "id": 122,
      "title": "Pages, Layouts, and Templates",
      "intro": "Nest layouts and page content.",
      "explanation": "Layouts preserve state across navigations; templates re-create their DOM nodes and states on every page view.",
      "gotchas": [
        "Root layouts must declare html and body tags."
      ],
      "interviewQuestions": [
        {
          "question": "How do Layouts differ from Templates in Next.js App Router?",
          "answer": "Layouts persist states and DOM nodes across page navigations. Templates recreate DOM structures on every transition."
        }
      ],
      "code": "// app/layout.js: wraps route pages\nexport default function RootLayout({ children }) {\n  return (\n    <html lang=\"en\">\n      <body>{children}</body>\n    </html>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 123,
      "title": "Link vs useRouter()",
      "intro": "Handle client-side navigations.",
      "explanation": "Use `<Link>` for declarative routing; use useRouter() hook for programmatic redirection.",
      "gotchas": [
        "Next.js pre-fetches Link destinations in the background by default to optimize navigation speed."
      ],
      "interviewQuestions": [
        {
          "question": "How does Next.js optimize Link navigations?",
          "answer": "Next.js pre-fetches route bundles in the background when links enter the scroll viewport, speeding up page switches."
        }
      ],
      "code": "// Declarative links prefetching\nimport Link from 'next/link';\nreturn <Link href=\"/dashboard\">Go to Dashboard</Link>;",
      "visualizerType": null
    },
    {
      "id": 124,
      "title": "Dynamic Routes & Slugs",
      "intro": "Bind dynamic segments from URLs.",
      "explanation": "Folder names in brackets (e.g. [id]) extract URL parameters, making them available as props.",
      "gotchas": [
        "Use catch-all brackets ([...slug]) to match nested route hierarchies."
      ],
      "interviewQuestions": [
        {
          "question": "How do you capture dynamic URL parameters in Next.js?",
          "answer": "Create folders with bracket names (e.g. `[id]`). The page receives params as an awaited promise parameter."
        }
      ],
      "code": "// app/blog/[id]/page.js: reading route variables\nexport default async function BlogPost({ params }) {\n  const { id } = await params;\n  return <div>Post ID: {id}</div>;\n}",
      "visualizerType": null
    },
    {
      "id": 125,
      "title": "Route Groups",
      "intro": "Organize folders without impacting URL structures.",
      "explanation": "Folder names in parentheses (e.g. (marketing)) organize folders without altering the public URL path.",
      "gotchas": [
        "Creating duplicate route names inside different route groups throws build-time route errors."
      ],
      "interviewQuestions": [
        {
          "question": "What is a Route Group in Next.js?",
          "answer": "A directory wrapped in parentheses used to group folders without impacting public URL structures."
        }
      ],
      "code": "// app/(marketing)/about/page.js -> public URL is /about\n// Folder parent is marketing group, ignored in path resolving!",
      "visualizerType": null
    },
    {
      "id": 126,
      "title": "Loading and Error Boundaries",
      "intro": "Built-in Suspense and Error page wrappers.",
      "explanation": "Define loading.js for loading spinners and error.js to handle runtime crashes within route scopes.",
      "gotchas": [
        "error.js must be declared as a Client Component ('use client')."
      ],
      "interviewQuestions": [
        {
          "question": "How does loading.js work in Next.js App Router?",
          "answer": "Next.js wraps page components in Suspense boundaries, rendering `loading.js` while server operations complete."
        }
      ],
      "code": "// app/loading.js: automatic loading layouts\nexport default function Loading() { return <p>Loading data...</p>; }",
      "visualizerType": null
    },
    {
      "id": 127,
      "title": "Parallel Routes",
      "intro": "Render multiple sub-pages in one layout.",
      "explanation": "Use slots (e.g. @analytics) to render multiple views simultaneously inside the same layout.",
      "gotchas": [
        "Define default.js files to handle routes where slots do not have matching paths."
      ],
      "interviewQuestions": [
        {
          "question": "What are Parallel Routes?",
          "answer": "Parallel Routes let you render multiple pages in the same layout simultaneously using `@slot` directories."
        }
      ],
      "code": "// In layout.js: rendering multiple parallel slots\nexport default function Layout({ children, analytics, team }) {\n  return (\n    <div>\n      {children}\n      <aside>{analytics}</aside>\n      <aside>{team}</aside>\n    </div>\n  );\n}",
      "visualizerType": null
    },
    {
      "id": 128,
      "title": "Intercepting Routes",
      "intro": "Load page overlays inside active layouts.",
      "explanation": "Intercept routes to render overlays (like detail modals) inside the active layout context.",
      "gotchas": [
        "Reloading intercepted pages renders the fallback route layout directly."
      ],
      "interviewQuestions": [
        {
          "question": "What do Intercepting Routes achieve?",
          "answer": "They load routes inside active layouts as overlays (like image detail modal feeds) while maintaining URLs."
        }
      ],
      "code": "// Intercepting routes using (..) folder syntax\n// e.g. app/feed/(..)photo/[id]/page.js intercepts feed links!",
      "visualizerType": null
    },
    {
      "id": 129,
      "title": "Server Actions: Form Submissions",
      "intro": "Trigger server functions from client forms.",
      "explanation": "Define server functions using 'use server' to handle form actions directly on the server without API endpoints.",
      "gotchas": [
        "Server Actions are executed via HTTP POST requests under the hood."
      ],
      "interviewQuestions": [
        {
          "question": "How are Server Actions executed over HTTP?",
          "answer": "They compile into secure HTTP POST endpoints, triggered directly from client action handlers."
        }
      ],
      "code": "// Server Action: handles secure form submissions\n'use server';\n\nexport async function createUser(formData) {\n  const email = formData.get(\"email\");\n  await db.insert(email);\n}",
      "visualizerType": null
    },
    {
      "id": 130,
      "title": "Optimistic UI with Actions",
      "intro": "Instant feedback during Server Actions.",
      "explanation": "Display optimistic updates while a Server Action runs, reverting if the action fails.",
      "gotchas": [
        "Optimistic states disappear as soon as the server action validates and revalidates data."
      ],
      "interviewQuestions": [
        {
          "question": "How do you coordinate Server Actions with Optimistic UI hooks?",
          "answer": "Apply optimistic updates immediately on form action triggers, reverting automatically when actions settle."
        }
      ],
      "code": "// React 19 forms with useOptimistic hook integrations\nconst [optimisticState, addOptimistic] = useOptimistic(\n  state,\n  (current, update) => ({ ...current, ...update })\n);",
      "visualizerType": null
    },
    {
      "id": 131,
      "title": "Data Revalidation APIs",
      "intro": "Purge cached data.",
      "explanation": "Use revalidatePath or revalidateTag to clear cached query results and refresh active layouts.",
      "gotchas": [
        "These APIs are server-only and must be called inside Server Actions or Route Handlers."
      ],
      "interviewQuestions": [
        {
          "question": "Compare revalidatePath and revalidateTag.",
          "answer": "revalidatePath purges caches for specific URLs. revalidateTag purges caches matching tag labels."
        }
      ],
      "code": "// Revalidating server caches\n'use server';\nimport { revalidatePath, revalidateTag } from 'next/cache';\n\nexport async function updateData() {\n  await db.save();\n  revalidatePath('/dashboard');\n}",
      "visualizerType": null
    },
    {
      "id": 132,
      "title": "Middleware and Edge Runtime",
      "intro": "Intercept requests before they hit pages.",
      "explanation": "Run lightweight Edge code to redirect requests, modify headers, or handle authentication checks.",
      "gotchas": [
        "Edge runtime does not support standard Node.js APIs (like fs or net)."
      ],
      "interviewQuestions": [
        {
          "question": "Where does Next.js Middleware execute?",
          "answer": "In the lightweight Edge runtime before requests resolve, optimal for redirections or cookie checks."
        }
      ],
      "code": "// middleware.js:Edge authentication headers configs\nimport { NextResponse } from 'next/server';\n\nexport function middleware(request) {\n  return NextResponse.next();\n}",
      "visualizerType": null
    },
    {
      "id": 133,
      "title": "Route Handlers",
      "intro": "Define API endpoints inside App Router.",
      "explanation": "Create route.js files using HTTP verb method exports (GET, POST) to handle API requests.",
      "gotchas": [
        "route.js cannot reside in the same folder level as a page.js file."
      ],
      "interviewQuestions": [
        {
          "question": "What are Route Handlers?",
          "answer": "Custom API endpoints defined in App Router using route.js files mapped to GET/POST methods."
        }
      ],
      "code": "// app/api/tasks/route.js: custom API handlers\nimport { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ tasks: [] });\n}",
      "visualizerType": null
    },
    {
      "id": 134,
      "title": "Dynamic Metadata Generation",
      "intro": "Create dynamic metadata.",
      "explanation": "Export generateMetadata() function to compute page titles and description tags dynamically.",
      "gotchas": [
        "generateMetadata must be executed in Server Component contexts."
      ],
      "interviewQuestions": [
        {
          "question": "How do you generate metadata dynamically in Next.js?",
          "answer": "Export a `generateMetadata` function from pages to compute and inject head tags at request time."
        }
      ],
      "code": "// Dynamic metadata tags generation\nexport async function generateMetadata({ params }) {\n  const { id } = await params;\n  return { title: `Post #${id}` };\n}",
      "visualizerType": null
    },
    {
      "id": 135,
      "title": "Deploying App Router apps",
      "intro": "Deploy Next.js applications.",
      "explanation": "Deploy to platforms like Vercel or configure Node.js server runtimes for build containers.",
      "gotchas": [
        "Ensure caching servers (Redis/CDN) are configured for dynamic server action revalidations."
      ],
      "interviewQuestions": [
        {
          "question": "How does Next.js optimize static builds?",
          "answer": "By pre-rendering static routes and generating static HTML/RSC caches to serve from CDNs."
        }
      ],
      "code": "// Production build: next build compiles App Router paths.",
      "visualizerType": null
    }
  ]
};
