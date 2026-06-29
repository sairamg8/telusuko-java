export const q_21_30 = [
  {
    "id": 21,
    "category": "State Management",
    "level": "Intermediate",
    "title": "Zustand Store creation",
    "companies": [
      "Vercel",
      "Airbnb"
    ],
    "question": "How do you set up a global state store using Zustand?",
    "answer": "Zustand uses a simple create function to build a hook. The state and action functions are defined within a single store creator function. Example: const useStore = create(set => ({ count: 0, inc: () => set(state => ({ count: state.count + 1 })) })).",
    "checklist": [
      "create() method from 'zustand'",
      "Directly returns custom hook",
      "Actions and state co-located"
    ]
  },
  {
    "id": 22,
    "category": "State Management",
    "level": "Intermediate",
    "title": "Zustand Selectors",
    "companies": [
      "Netflix",
      "Stripe"
    ],
    "question": "Why should you use selectors when reading from Zustand stores?",
    "answer": "Using selectors (e.g. const count = useStore(state => state.count)) ensures that the component only re-renders when the selected value changes. Destructuring variables directly from the store causes re-renders on any store update.",
    "checklist": [
      "Enforces selective component updates",
      "Prevents unnecessary global re-renders",
      "Supports equality check comparisons"
    ]
  },
  {
    "id": 23,
    "category": "State Management",
    "level": "Intermediate",
    "title": "Redux Toolkit Slices",
    "companies": [
      "Google",
      "Amazon"
    ],
    "question": "What is a Slice in Redux Toolkit (RTK)?",
    "answer": "A Slice is a collection of Redux reducer logic and actions for a single feature, defined using createSlice. It automatically generates action creators and action types matching your reducer names, simplifying boilerplate.",
    "checklist": [
      "createSlice() method",
      "Generates actions & reducers",
      "Simplifies Redux store configuration"
    ]
  },
  {
    "id": 24,
    "category": "State Management",
    "level": "Intermediate",
    "title": "Immer integration in RTK",
    "companies": [
      "Microsoft",
      "Goldman Sachs"
    ],
    "question": "How does Immer optimize Redux Toolkit reducers?",
    "answer": "Redux Toolkit uses Immer under the hood inside createSlice. This allows developers to write mutating code logic directly (e.g., state.items.push(item)) which Immer translates into safe, immutable state updates.",
    "checklist": [
      "Enables mutable-style code",
      "Translates into immutable updates",
      "Reduces deep object copy code weight"
    ]
  },
  {
    "id": 25,
    "category": "React Query",
    "level": "Intermediate",
    "title": "React Query Cache States",
    "companies": [
      "JPMorgan",
      "Visa"
    ],
    "question": "Explain the cache lifecycle states in TanStack (React) Query.",
    "answer": "1. Fresh: read from cache, no network requests. 2. Stale: read from cache, background refetch triggered. 3. Fetching: network request executing. 4. Inactive: unused caches scheduled for garbage collection.",
    "checklist": [
      "Fresh state (staleTime checks)",
      "Stale state background refetches",
      "Inactive garbage collection"
    ]
  },
  {
    "id": 26,
    "category": "React Query",
    "level": "Intermediate",
    "title": "React Query keys matching",
    "companies": [
      "Amazon",
      "Uber"
    ],
    "question": "How are query keys evaluated in React Query?",
    "answer": "Query keys act as dependency arrays for caching. React Query performs deep serialization comparisons on keys (which are arrays of primitives/objects). If any element changes, the query fetches fresh data.",
    "checklist": [
      "Query key dependency checking",
      "Deep serialization comparison",
      "Keys isolate separate cache domains"
    ]
  },
  {
    "id": 27,
    "category": "React Query",
    "level": "Intermediate",
    "title": "Query Invalidation with TanStack Query",
    "companies": [
      "Goldman Sachs",
      "Citadel"
    ],
    "question": "How do you invalidate queries and why is it used?",
    "answer": "Call queryClient.invalidateQueries({ queryKey }) to mark cached data as stale immediately. This triggers background refetches on any active component subscribing to that query key, ensuring UI displays updated data.",
    "checklist": [
      "queryClient.invalidateQueries API",
      "Marks cache as stale",
      "Triggers background refetching"
    ]
  },
  {
    "id": 28,
    "category": "React Query",
    "level": "Intermediate",
    "title": "Optimistic Mutations in React Query",
    "companies": [
      "Stripe",
      "Netflix"
    ],
    "question": "How do optimistic mutations work in React Query?",
    "answer": "During a mutation (write operation), you update the client cache instantly in the onMutate callback (before server confirms). You save the old data snapshot and, if the request fails, revert cache to this snapshot in the onError block.",
    "checklist": [
      "onMutate: instant cache updates",
      "Save old cache snapshot",
      "onError: rollback on failure"
    ]
  },
  {
    "id": 29,
    "category": "React Core",
    "level": "Advanced",
    "title": "Hydration Errors in SSR/Next.js",
    "companies": [
      "Vercel",
      "Airbnb"
    ],
    "question": "What causes a Hydration Mismatch error and how do you solve it?",
    "answer": "Hydration errors occur when the pre-rendered HTML from the server differs from the initial client render (e.g. rendering dynamic dates or read localStorage inside render). Resolve by putting dynamic logic in useEffect or using dynamic imports.",
    "checklist": [
      "HTML structure differences",
      "Dynamic values server vs client",
      "Resolve with useEffect/mounting checks"
    ]
  },
  {
    "id": 30,
    "category": "React 19",
    "level": "Advanced",
    "title": "React 19 useActionState Hook",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "question": "What does the useActionState hook in React 19 do?",
    "answer": "useActionState is a React 19 hook designed for form actions. It takes an async form action function and returns the current form state, a wrapped action function, and a boolean indicating if submission is pending.",
    "checklist": [
      "Manages form actions directly",
      "Replaces useFormState",
      "Returns [state, formAction, isPending]"
    ]
  }
];
export default q_21_30;
