export default {
  id: 11,
  title: "Production Custom Hooks & React 19/2026 Patterns",
  range: "151-160",
  concepts: [
    {
      id: 151,
      title: "useLocalStorage Hook",
      intro: "Persist state seamlessly to localStorage with safe server-side rendering support.",
      explanation: "A custom hook to store, read, and synchronize state with localStorage. It includes error handlers and SSR check boundaries so it won't crash during server pre-rendering.",
      gotchas: ["Reading localStorage directly during initial rendering in Next.js triggers hydration mismatches. Always run read checks inside useEffect or lazy initializers."],
      interviewQuestions: [
        {
          question: "How do you handle SSR hydration mismatches in localStorage hooks?",
          answer: "By using a lazy initializer function inside useState that checks if window is defined, or deferring state loading to a useEffect execution pass."
        }
      ],
      code: `import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`,
      visualizerType: null
    },
    {
      id: 152,
      title: "useDebounce Hook",
      intro: "Postpone state updates during high-frequency user actions like typing.",
      explanation: "useDebounce delays state modifications until a specified idle duration has passed. Perfect for reducing API request bounds in search fields.",
      gotchas: ["Forgetting to clean up active timeout timers inside custom hook return functions causes memory leaks and stale state updates."],
      interviewQuestions: [
        {
          question: "Why is debouncing important in input search fields?",
          answer: "It prevents firing an API network request for every single keystroke, saving backend server bandwidth and database execution load."
        }
      ],
      code: `import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Clear timeout on value/delay changes
    };
  }, [value, delay]);

  return debouncedValue;
}`,
      visualizerType: null
    },
    {
      id: 153,
      title: "useThrottle Hook",
      intro: "Limit execution frequency of intensive triggers like scrolling and resizing.",
      explanation: "useThrottle guarantees execution happens at a constant, regulated frequency (e.g. at most once every 300ms) regardless of how often events trigger.",
      gotchas: ["Throttling can cause you to miss the absolute final event values (e.g., final scroll positions). Ensure you execute a trailing call to sync values."],
      interviewQuestions: [
        {
          question: "How does throttle differ from debounce?",
          answer: "Throttle limits execution rate to a constant periodic interval (once every X ms). Debounce delays execution until a period of silence has elapsed."
        }
      ],
      code: `import { useState, useEffect, useRef } from 'react';

export function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}`,
      visualizerType: null
    },
    {
      id: 154,
      title: "useIntersectionObserver Hook",
      intro: "Observe viewport intersections for lazy loading images or infinite scrolls.",
      explanation: "This hook uses the browser IntersectionObserver API to detect when elements enter the visible screen viewport.",
      gotchas: ["Ensure you disconnect the observer when the target element unmounts or changes references to prevent memory leaks."],
      interviewQuestions: [
        {
          question: "How does IntersectionObserver optimize scrolling performance?",
          answer: "Unlike scroll listeners, it runs asynchronously off the browser main thread, avoiding main-thread blocking and frame drops."
        }
      ],
      code: `import { useState, useEffect, useRef } from 'react';

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
}`,
      visualizerType: null
    },
    {
      id: 155,
      title: "useOnClickOutside Hook",
      intro: "Detect click interactions outside specific modal or dropdown wrapper elements.",
      explanation: "A hook that listens to click/touch actions and checks if their target resides outside a reference DOM node, automatically closing dialog boxes.",
      gotchas: ["Ensure event listeners are attached to document object levels and cleaned up when unmounting custom layouts."],
      interviewQuestions: [
        {
          question: "How do you check if click target resides outside ref nodes?",
          answer: "By using `ref.current.contains(event.target)` and verifying it returns false."
        }
      ],
      code: `import { useEffect } from 'react';

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}`,
      visualizerType: null
    },
    {
      id: 156,
      title: "useEventListener Hook",
      intro: "Attach and remove global window event listeners cleanly with auto cleanup.",
      explanation: "A robust event binding wrapper that updates listener functions using dynamic ref bindings, preventing stale callback states.",
      gotchas: ["Always maintain target references safely (e.g. window vs dynamic elements) to prevent event registration failures."],
      interviewQuestions: [
        {
          question: "Why use ref callbacks inside useEventListener?",
          answer: "To save the latest listener callback without having to re-add event listeners to the DOM when states change."
        }
      ],
      code: `import { useEffect, useRef } from 'react';

export function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}`,
      visualizerType: null
    },
    {
      id: 157,
      title: "useAsync Hook",
      intro: "Manage loading, data, and error states of async promises cleanly.",
      explanation: "A hook that encapsulates generic Promise control flows, exposing statuses like idle, pending, resolved, and rejected.",
      gotchas: ["Beware of state updates after components unmount. Ensure you track mount states before triggering updates."],
      interviewQuestions: [
        {
          question: "What statuses should useAsync track?",
          answer: "Idle, pending, success (resolved data), and error (rejected reason)."
        }
      ],
      code: `import { useState, useCallback } from 'react';

export function useAsync(asyncFunction) {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setStatus('pending');
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction(...args);
      setValue(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err);
      setStatus('error');
      throw err;
    }
  }, [asyncFunction]);

  return { execute, status, value, error };
}`,
      visualizerType: null
    },
    {
      id: 158,
      title: "useMediaQuery Hook",
      intro: "Implement responsive CSS media query bindings directly in JavaScript components.",
      explanation: "A hook that binds to window.matchMedia updates, tracking screen breakpoint transitions on the fly.",
      gotchas: ["matchMedia might not exist in server contexts (Node). Ensure SSR check guards are active."],
      interviewQuestions: [
        {
          question: "Why use JS media queries instead of CSS media queries?",
          answer: "Use JS media queries when you need to render different components (e.g. slider vs grid) rather than just styling them."
        }
      ],
      code: `import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}`,
      visualizerType: null
    },
    {
      id: 159,
      title: "React 19/2026: Activity API (<Activity>)",
      intro: "Pause and resume component state trees without DOM unmounting.",
      explanation: "Formerly known as Offscreen, the Activity API (<Activity mode={visible ? 'visible' : 'hidden'}>) preserves component state and DOM nodes in the background, allowing instant page re-activation.",
      gotchas: ["Hidden Activity components do not trigger useEffect cleanups, only special lifecycle indicators. Use for tabs and routes caching only."],
      interviewQuestions: [
        {
          question: "How does the Activity API improve Single Page Application navigation?",
          answer: "It caches the entire DOM structure and state of previous pages in a paused state, restoring them instantly without query calls."
        }
      ],
      code: `// React 19/2026 Activity API (Experimental)
import { Activity } from 'react';

function Tabs({ activeTab }) {
  return (
    <div>
      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <HomeTab />
      </Activity>
      <Activity mode={activeTab === 'profile' ? 'visible' : 'hidden'}>
        <ProfileTab />
      </Activity>
    </div>
  );
}`,
      visualizerType: null
    },
    {
      id: 160,
      title: "React Server Functions (RSF)",
      intro: "Execute backend functions dynamically from the client with secure parameter serialization.",
      explanation: "RSFs are the underlying primitive for Server Actions. When compiled, React maps client calls to secure RPC endpoints, returning serializable updates over network buffers.",
      gotchas: ["Never expose private server states or connections in RSF parameters; parameters are fully serialized and visible in HTTP requests."],
      interviewQuestions: [
        {
          question: "How do React Server Functions optimize API networks?",
          answer: "They eliminate REST controller boilerplates, letting developers execute DB/backend updates directly from UI events."
        }
      ],
      code: `// Server-side file: actions.js
'use server';

export async function fetchUserLogs(userId) {
  const logs = await db.query('SELECT * FROM logs WHERE user_id = ?', [userId]);
  return logs; // Returned data is serialized back to client!
}`,
      visualizerType: null
    }
  ]
};
