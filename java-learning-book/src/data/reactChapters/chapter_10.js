export default {
  "id": 10,
  "title": "State Management (Zustand & RTK)",
  "range": "136-150",
  "concepts": [
    {
      "id": 136,
      "title": "When do you need a State Management Library?",
      "intro": "Decide when to use global state libraries.",
      "explanation": "Use global state libraries when state is shared across distant component trees and prop drilling becomes unmanageable.",
      "gotchas": [
        "Do not put all state in global stores; keep local state local to prevent bloating."
      ],
      "interviewQuestions": [
        {
          "question": "When should you adopt global state managers?",
          "answer": "When multiple distant components share state, or local prop configurations become unmanageable."
        }
      ],
      "code": "// Select global state libraries when prop drilling limits scaling.",
      "visualizerType": null
    },
    {
      "id": 137,
      "title": "Zustand: Store Setup",
      "intro": "Create focused global state stores.",
      "explanation": "Zustand uses a lightweight hook-based state store. Create stores by defining state and action methods in a single file.",
      "gotchas": [
        "Zustand does not require context provider wrappers at the root of your application."
      ],
      "interviewQuestions": [
        {
          "question": "What is Zustand and why is it popular?",
          "answer": "A lightweight, hook-based global state library requiring zero context provider boilerplate wrappers."
        }
      ],
      "code": "// Zustand: hook store setup\nimport { create } from 'zustand';\n\nexport const useCounter = create((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 }))\n}));",
      "visualizerType": null
    },
    {
      "id": 138,
      "title": "Zustand Selectors",
      "intro": "Optimize store reads and prevent unnecessary updates.",
      "explanation": "Use selectors when reading from Zustand stores (e.g. useStore(state => state.value)) to limit component re-renders.",
      "gotchas": [
        "Destructuring from stores without selectors causes components to re-render on any store change."
      ],
      "interviewQuestions": [
        {
          "question": "Why are Zustand selectors recommended?",
          "answer": "They ensure components only re-render when selected properties change, preventing global update cascades."
        }
      ],
      "code": "// Zustand selectors prevent redundant updates\nconst count = useCounter((state) => state.count);",
      "visualizerType": null
    },
    {
      "id": 139,
      "title": "Zustand Slices & Persistence",
      "intro": "Organize stores and persist state to localStorage.",
      "explanation": "Split large stores into smaller slices and use persistence middleware to save state in localStorage automatically.",
      "gotchas": [
        "Hydration issues can occur when loading persisted state on the server."
      ],
      "interviewQuestions": [
        {
          "question": "How do you persist Zustand states to localStorage?",
          "answer": "Wrap the store creator block in `persist` middleware from the Zustand package, configuring keys."
        }
      ],
      "code": "// Zustand: persistence middleware\nimport { persist } from 'zustand/middleware';\nconst useStore = create(persist((set) => ({ data: [] }), { name: 'store-key' }));",
      "visualizerType": null
    },
    {
      "id": 140,
      "title": "Redux Toolkit: Configurations",
      "intro": "Define RTK slices, actions, and reducers.",
      "explanation": "RTK organizes state into slices with built-in Immer support, allowing you to write mutating state logic safely.",
      "gotchas": [
        "Never mutate draft objects outside the Immer reducer functions."
      ],
      "interviewQuestions": [
        {
          "question": "How does Redux Toolkit simplify Redux workflows?",
          "answer": "By combining actions and reducers in slices, automating store settings, and including Immer/Thunks."
        }
      ],
      "code": "// Redux Toolkit: feature slice setups\nimport { createSlice } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => { state.value += 1; } // safe mutations with Immer!\n  }\n});",
      "visualizerType": null
    },
    {
      "id": 141,
      "title": "Redux Toolkit: Hooks",
      "intro": "Integrate RTK with React components.",
      "explanation": "Register the Redux store with the Provider wrapper and consume state using typed useDispatch and useSelector hooks.",
      "gotchas": [
        "Forgetting to use typed hooks in TypeScript projects can result in implicit any errors."
      ],
      "interviewQuestions": [
        {
          "question": "How do you dispatch actions in Redux Toolkit?",
          "answer": "Get the dispatch function using `useDispatch()`, and call it passing action creators (e.g. `dispatch(increment())`)."
        }
      ],
      "code": "// Consuming Redux states inside components\nimport { useSelector, useDispatch } from 'react-redux';\nconst count = useSelector(state => state.counter.value);\nconst dispatch = useDispatch();",
      "visualizerType": null
    },
    {
      "id": 142,
      "title": "Jotai & Recoil: Atomic state",
      "intro": "Compare atomic state models.",
      "explanation": "Atomic state managers build state using small, independent units (atoms) that components combine dynamically.",
      "gotchas": [
        "Atomic state patterns differ from Redux/Zustand; choose the model that fits your architecture."
      ],
      "interviewQuestions": [
        {
          "question": "What is atomic state management?",
          "answer": "It manages state using small, independent units (atoms) that components subscribe to directly, bypassing centralized stores."
        }
      ],
      "code": "// Atomic state: Jotai atom definitions\nimport { atom, useAtom } from 'jotai';\nconst countAtom = atom(0);\nconst [count, setCount] = useAtom(countAtom);",
      "visualizerType": null
    },
    {
      "id": 143,
      "title": "Server State vs Client State",
      "intro": "Differentiate local client variables from database data.",
      "explanation": "Client state handles local UI variables (e.g. theme); Server state manages remote database data that requires caching.",
      "gotchas": [
        "Using Redux to store large collections of server data is an anti-pattern; use React Query instead."
      ],
      "interviewQuestions": [
        {
          "question": "What is the difference between client state and server state?",
          "answer": "Client state is local UI data. Server state is remote database data requiring cache management and synchronization."
        }
      ],
      "code": "// Separate UI client variables from cached server data.",
      "visualizerType": null
    },
    {
      "id": 144,
      "title": "React Query: Query caching",
      "intro": "Introduction to TanStack Query caches.",
      "explanation": "React Query manages server state fetching, caching, and updating out-of-the-box.",
      "gotchas": [
        "Cached query data is marked stale immediately by default; configure staleTime parameters as needed."
      ],
      "interviewQuestions": [
        {
          "question": "What is TanStack Query?",
          "answer": "A remote state caching library managing data fetching, background updates, and cache lifecycles."
        }
      ],
      "code": "// React Query: cache setups\nimport { QueryClient, QueryClientProvider } from '@tanstack/react-query';\nconst queryClient = new QueryClient();",
      "visualizerType": null
    },
    {
      "id": 145,
      "title": "useQuery: Data fetching",
      "intro": "Fetch and cache remote API data.",
      "explanation": "Use the useQuery hook to execute HTTP requests, track loading/error states, and cache responses.",
      "gotchas": [
        "Verify query keys are unique, otherwise you will read incorrect cached data."
      ],
      "interviewQuestions": [
        {
          "question": "How do query keys handle data refresh triggers in useQuery?",
          "answer": "Query keys act as dependencies. Changing keys (e.g. `['tasks', category]`) triggers refetches automatically."
        }
      ],
      "code": "// useQuery: fetching remote data\nconst { data, isLoading } = useQuery({\n  queryKey: ['tasks'],\n  queryFn: () => fetch('/api/tasks').then(r => r.json())\n});",
      "visualizerType": null
    },
    {
      "id": 146,
      "title": "useMutation: Data writes",
      "intro": "Run API updates and optimistic changes.",
      "explanation": "Use useMutation for writes/updates and trigger optimistic changes to update the UI before the API resolves.",
      "gotchas": [
        "Always return a rollback function in onMutate callbacks to handle failed API write updates."
      ],
      "interviewQuestions": [
        {
          "question": "What does useMutation handle?",
          "answer": "It executes server write operations, managing success/error states, triggering cache updates."
        }
      ],
      "code": "// useMutation: executing API writes\nconst mutation = useMutation({\n  mutationFn: (newTask) => fetch('/api/tasks', { method: 'POST', body: JSON.stringify(newTask) }),\n  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })\n});",
      "visualizerType": null
    },
    {
      "id": 147,
      "title": "Pagination & Prefetching",
      "intro": "Prefetch next pages in the background.",
      "explanation": "Prefetch query destinations (like the next page) when users hover over links to eliminate loading states.",
      "gotchas": [
        "Ensure paginated query keys include the active page variable."
      ],
      "interviewQuestions": [
        {
          "question": "Why should you prefetch queries in React applications?",
          "answer": "It fetches and caches next-page records before navigation transitions, eliminating loading states."
        }
      ],
      "code": "// Prefetching pages on links hovers\nconst prefetch = () => queryClient.prefetchQuery({ queryKey: ['tasks'], queryFn: fetchFn });",
      "visualizerType": null
    },
    {
      "id": 148,
      "title": "RTK Query",
      "intro": "Redux Toolkit's built-in query system.",
      "explanation": "RTK Query is an optional module in Redux Toolkit that handles data fetching and caching.",
      "gotchas": [
        "RTK Query generates custom hooks automatically based on defined endpoints."
      ],
      "interviewQuestions": [
        {
          "question": "What is RTK Query?",
          "answer": "An optional module in Redux Toolkit providing data fetching and caching APIs, generating hooks automatically."
        }
      ],
      "code": "// RTK Query: api service configs\nimport { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';\n\nexport const tasksApi = createApi({\n  reducerPath: 'tasksApi',\n  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),\n  endpoints: (builder) => ({\n    getTasks: builder.query({ query: () => 'tasks' })\n  })\n});",
      "visualizerType": null
    },
    {
      "id": 149,
      "title": "Cache Invalidation in React Query",
      "intro": "Invalidate queries to trigger refetches.",
      "explanation": "Call queryClient.invalidateQueries(queryKey) to mark cached data as stale and trigger background updates.",
      "gotchas": [
        "Invalidation triggers updates on all active components observing the query key."
      ],
      "interviewQuestions": [
        {
          "question": "What happens when you invalidate a query key?",
          "answer": "TanStack Query marks caches as stale, forcing background refetches on components rendering that key."
        }
      ],
      "code": "// Invalidating query caches to trigger refetches\nqueryClient.invalidateQueries({ queryKey: ['tasks'] });",
      "visualizerType": null
    },
    {
      "id": 150,
      "title": "Offline Sync",
      "intro": "Cache writes while offline and sync on reconnect.",
      "explanation": "Cache user mutations in indexDB during network drops and synchronize them automatically when the connection returns.",
      "gotchas": [
        "Handle mutation conflicts if database records changed while the client was offline."
      ],
      "interviewQuestions": [
        {
          "question": "How do you support offline operations in query libraries?",
          "answer": "Persist mutations in IndexedDB during network drops, and sync requests when the browser regains internet connections."
        }
      ],
      "code": "// IndexDB storage configurations for offline mutation synchronization.",
      "visualizerType": null
    }
  ]
};
