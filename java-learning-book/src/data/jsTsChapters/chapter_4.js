export default {
  "id": 4,
  "title": "Async Programming & Event Loop",
  "range": "31-40",
  "concepts": [
    {
      "id": 31,
      "title": "Asynchronous JS",
      "intro": "Why a single-threaded runtime can execute non-blocking operations.",
      "explanation": "JavaScript is single-threaded: it executes one line of code at a time using one Call Stack. To prevent blocking the main thread during slow operations (like file reads or API calls), the engine delegates these tasks to host environments (like the Web APIs in browser runtimes, or C++ APIs in Node.js).",
      "gotchas": [
        "Running highly intensive calculations (like sorting large arrays) synchronously blocks the call stack, freezing the entire browser UI/tab."
      ],
      "interviewQuestions": [
        {
          "question": "How does JS execute asynchronous tasks if it is single-threaded?",
          "answer": "The JS engine delegates async tasks to external APIs (Web APIs/Node.js). Once complete, tasks are placed in queues and processed by the Call Stack via the Event Loop."
        }
      ],
      "code": "console.log(\"First\");\nsetTimeout(() => console.log(\"Second (async)\"), 0); // Web API handles this timer\nconsole.log(\"Third\");\n// Output: First -> Third -> Second (async)",
      "visualizerType": null
    },
    {
      "id": 32,
      "title": "Callbacks & Callback Hell",
      "intro": "Handling asynchronous results using function arguments, and the nested scope problem.",
      "explanation": "Callbacks pass a function as an argument to be executed when an async operation completes. Nesting multiple callbacks inside one another for sequential operations makes code highly complex and difficult to maintain, leading to Callback Hell (Pyramid of Doom).",
      "gotchas": [
        "Callbacks lack built-in error propagation mechanisms, meaning errors must be handled manually at every step, which is highly error-prone."
      ],
      "interviewQuestions": [
        {
          "question": "What is Callback Hell and how do you resolve it?",
          "answer": "Callback Hell is the visual nesting of deep callback functions. It can be resolved by refactoring to Promises, async/await, or modular helper functions."
        }
      ],
      "code": "// Callback Hell example:\nstep1((res1) => {\n  step2(res1, (res2) => {\n    step3(res2, (res3) => {\n      console.log(res3);\n    });\n  });\n});",
      "visualizerType": null
    },
    {
      "id": 33,
      "title": "Promise States",
      "intro": "An object representing the completion or failure of an asynchronous operation.",
      "explanation": "A Promise is a placeholder for a future value. It starts in the 'pending' state. When the operation completes successfully, it moves to 'fulfilled' (resolved) with a value. If the operation fails, it transitions to 'rejected' with an error. The state change is immutable once transitioned.",
      "gotchas": [
        "A promise cannot change state after resolving or rejecting. Any subsequent resolve/reject call is silently ignored."
      ],
      "interviewQuestions": [
        {
          "question": "What are the three mutually exclusive states of a Promise?",
          "answer": "Pending (waiting), Fulfilled (success), and Rejected (failed). Once a Promise becomes resolved or rejected, it cannot change states."
        }
      ],
      "code": "const p = new Promise((resolve, reject) => {\n  let success = true;\n  if (success) resolve(\"Data received!\");\n  else reject(\"Network error\");\n});",
      "visualizerType": null
    },
    {
      "id": 34,
      "title": "Promise Chaining & Error Handling",
      "intro": "Sequencing async actions cleanly and catching exceptions globally.",
      "explanation": "Calling '.then()' on a Promise returns a new Promise, allowing chains of asynchronous steps. Exceptions propagate down the chain until caught by a '.catch()' handler, simplifying error handling compared to callbacks.",
      "gotchas": [
        "Forgetting to return a value or a new Promise inside a .then() block causes the next link in the chain to resolve immediately with undefined."
      ],
      "interviewQuestions": [
        {
          "question": "What happens if an error is thrown inside a promise chain without a .catch()?",
          "answer": "It results in an unhandled promise rejection error, which can cause the process to crash in Node.js or print warnings in browsers."
        }
      ],
      "code": "fetchUser()\n  .then(user => fetchRoles(user.id)) // must return promise!\n  .then(roles => console.log(roles))\n  .catch(err => console.error(\"Caught:\", err));",
      "visualizerType": null
    },
    {
      "id": 35,
      "title": "Event Loop & Web APIs",
      "intro": "The coordination system managing the execution stack and asynchronous tasks.",
      "explanation": "The Event Loop continuously monitors the Call Stack and task queues. When the Call Stack is completely empty, the Event Loop takes the oldest task from the queue and pushes it onto the stack to be executed.",
      "gotchas": [
        "The Event Loop cannot execute tasks from queues until the Call Stack is empty. High synchronous workload blocks the stack, delaying async operations."
      ],
      "interviewQuestions": [
        {
          "question": "Does the Event Loop run inside the JS engine itself?",
          "answer": "No. The Event Loop is part of the host environment (browser runtime / Node.js runtime) that wraps and orchestrates the JS engine."
        }
      ],
      "code": "// Stack is active, so setTimeout task is deferred despite 0ms delay\nsetTimeout(() => console.log(\"Async\"), 0);\nfor (let i = 0; i < 1e7; i++) {} // Blocks stack for a brief moment\nconsole.log(\"Sync Completed\");\n// Output: Sync Completed -> Async",
      "visualizerType": null
    },
    {
      "id": 36,
      "title": "Macrotasks vs Microtasks",
      "intro": "Understanding execution priority order among different asynchronous task types.",
      "explanation": "JS divides tasks into: 1. Microtasks (Promises, MutationObserver, queueMicrotask): high priority. 2. Macrotasks (setTimeout, setInterval, postMessage, I/O): lower priority. The Event Loop processes the entire Microtask Queue after every single macrotask before proceeding to the next macrotask.",
      "gotchas": [
        "A recursive microtask loop (e.g. infinite Promise resolves) will indefinitely block the Macrotask Queue, freezing renders and UI interactions."
      ],
      "interviewQuestions": [
        {
          "question": "What executes first: a setTimeout callback or a resolved Promise callback?",
          "answer": "A resolved Promise callback (microtask) executes before a setTimeout callback (macrotask), because microtasks have higher execution priority."
        }
      ],
      "code": "setTimeout(() => console.log(\"Timeout (macro)\"), 0);\nPromise.resolve().then(() => console.log(\"Promise (micro)\"));\nconsole.log(\"Stack\");\n// Output: Stack -> Promise (micro) -> Timeout (macro)",
      "visualizerType": null
    },
    {
      "id": 37,
      "title": "async/await Syntactic Sugar",
      "intro": "Writing asynchronous code that reads like synchronous code.",
      "explanation": "async/await is built on top of Promises. Declaring a function as `async` wraps its return value in a Promise. The `await` keyword pauses execution inside the async function scope until the awaited Promise resolves or rejects.",
      "gotchas": [
        "Putting await inside loops makes actions sequential, which can make processing slow. Use Promise.all if actions are independent."
      ],
      "interviewQuestions": [
        {
          "question": "How do you handle errors inside an async/await function?",
          "answer": "Wrap the awaited operations in a standard try-catch block, similar to synchronous error handling patterns."
        }
      ],
      "code": "async function getData() {\n  try {\n    const response = await fetch(\"https://api.github.com\");\n    const data = await response.json();\n    console.log(data);\n  } catch (err) {\n    console.error(\"Failed:\", err);\n  }\n}",
      "visualizerType": null
    },
    {
      "id": 38,
      "title": "Promise.all vs Promise.allSettled",
      "intro": "Managing concurrent execution of multiple Promises.",
      "explanation": "1. Promise.all() runs tasks in parallel. It rejects immediately if any task fails (all-or-nothing). 2. Promise.allSettled() runs tasks in parallel and waits for all of them to resolve or reject, returning status details for each operation.",
      "gotchas": [
        "If you use Promise.all and one promise fails, you lose access to the results of all other promises, even if they resolved successfully."
      ],
      "interviewQuestions": [
        {
          "question": "When should you use Promise.allSettled instead of Promise.all?",
          "answer": "Use Promise.allSettled when tasks are independent and you want to gather results for all actions even if some fail."
        }
      ],
      "code": "const p1 = Promise.resolve(1);\nconst p2 = Promise.reject(\"Failed\");\n\n// Promise.all([p1, p2]).catch(err => console.log(err)); // prints \"Failed\"\n\nPromise.allSettled([p1, p2])\n  .then(res => console.log(res)); \n  // [{status: 'fulfilled', value: 1}, {status: 'rejected', reason: 'Failed'}]",
      "visualizerType": null
    },
    {
      "id": 39,
      "title": "Promise.race vs Promise.any",
      "intro": "Comparing first-settled and first-fulfilled Promise behaviors.",
      "explanation": "1. Promise.race() returns the result of the first Promise that resolves or rejects. 2. Promise.any() returns the result of the first Promise that resolves successfully. It only rejects if all input Promises fail.",
      "gotchas": [
        "Promise.any throws an AggregateError containing all rejection reasons if every input promise rejects."
      ],
      "interviewQuestions": [
        {
          "question": "What is the key difference between Promise.race and Promise.any?",
          "answer": "Promise.race returns the first promise to settle (either success or failure), while Promise.any returns the first promise to fulfill (success only)."
        }
      ],
      "code": "const slowSuccess = new Promise(r => setTimeout(r, 200, \"slow\"));\nconst fastFail = new Promise((_, r) => setTimeout(r, 100, \"fast fail\"));\n\nPromise.race([slowSuccess, fastFail]).catch(e => console.log(e)); // \"fast fail\"\nPromise.any([slowSuccess, fastFail]).then(v => console.log(v)); // \"slow\"",
      "visualizerType": null
    },
    {
      "id": 40,
      "title": "Unhandled Rejections",
      "intro": "Catching asynchronous exceptions that escape try-catch scopes.",
      "explanation": "If a Promise is rejected and no rejection handler is attached, it triggers an 'unhandledrejection' event. Developers can listen to this globally on the window/process level to log errors.",
      "gotchas": [
        "Leaving rejections unhandled in Node.js applications was deprecated and can lead to process termination in modern runtime configs."
      ],
      "interviewQuestions": [
        {
          "question": "How do you capture unhandled promise rejections globally in a browser environment?",
          "answer": "By adding an event listener for 'unhandledrejection' to the window object: `window.addEventListener('unhandledrejection', callback);`"
        }
      ],
      "code": "window.addEventListener('unhandledrejection', (event) => {\n  console.warn(\"Global catch:\", event.reason);\n});\nnew Promise((_, r) => r(\"Forgotten error\"));",
      "visualizerType": null
    }
  ]
}
