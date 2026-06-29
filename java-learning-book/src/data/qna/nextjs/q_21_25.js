export const q_21_25 = [
  {
    "id": 21,
    "category": "Next.js Data Fetching",
    "level": "Advanced",
    "title": "Next.js Data Cache vs Full Route Cache",
    "companies": [
      "Vercel",
      "Goldman Sachs"
    ],
    "question": "Differentiate between Data Cache and Full Route Cache in Next.js.",
    "answer": "Data Cache persists query data across requests and deployments (using fetch cache configurations). Full Route Cache caches the compiled HTML and RSC payloads of static routes at build time, saving execution steps.",
    "checklist": [
      "Data Cache: stores fetch results",
      "Full Route Cache: stores page HTML/RSC",
      "Data Cache is persisted"
    ]
  },
  {
    "id": 22,
    "category": "Next.js Optimization",
    "level": "Advanced",
    "title": "Next.js Image component optimization",
    "companies": [
      "Vercel",
      "Netflix"
    ],
    "question": "How does the `<Image>` component optimize web images?",
    "answer": "Next.js Image optimizes layout shifts (CLS) by enforcing width/height parameters. It automatically resizes files, generates responsive source tags, converts images to modern formats (WebP), and lazy-loads images by default.",
    "checklist": [
      "Enforces aspect ratio sizes",
      "Modern format conversions (WebP)",
      "Automatic lazy loading & preloads"
    ]
  },
  {
    "id": 23,
    "category": "Next.js Optimization",
    "level": "Advanced",
    "title": "Next.js Script loading strategy",
    "companies": [
      "Google",
      "Vercel"
    ],
    "question": "Compare the script loading strategies available in Next.js.",
    "answer": "The `<Script>` component supports: 1. beforeInteractive: loads script before page hydrates. 2. afterInteractive (default): loads after hydration. 3. lazyOnload: loads during browser idle. 4. worker: runs script inside Web Workers.",
    "checklist": [
      "beforeInteractive vs afterInteractive",
      "lazyOnload for analytics script blocks",
      "worker running inside Web Worker context"
    ]
  },
  {
    "id": 24,
    "category": "Next.js Core",
    "level": "Expert",
    "title": "Streaming Server rendering mechanics",
    "companies": [
      "Vercel",
      "Meta"
    ],
    "question": "How does server-side streaming render HTML dynamically?",
    "answer": "Next.js compiles server components into RSC payloads. It streams the static HTML shell instantly. As dynamic Server Components finish querying data, React streams their HTML nodes over the open HTTP connection, hydrating them.",
    "checklist": [
      "Streams HTML chunks over HTTP",
      "Suspense acts as stream boundary",
      "Decreases Time to First Byte (TTFB)"
    ]
  },
  {
    "id": 25,
    "category": "Next.js Architecture",
    "level": "Expert",
    "title": "Dynamic routing generation at build",
    "companies": [
      "Vercel",
      "Netflix"
    ],
    "question": "How does generateStaticParams optimize dynamic routes?",
    "answer": "generateStaticParams compiles dynamic route segments at build time instead of on-demand requests. Next.js fetches parameters and generates static pages, allowing rapid CDN loading.",
    "checklist": [
      "Build-time dynamic path compiles",
      "Replaces getStaticPaths API",
      "Optimizes CDN page hit performance"
    ]
  }
];
export default q_21_25;
