export default {
  "id": 1,
  "title": "JavaScript & TypeScript Essentials",
  "range": "1-15",
  "concepts": [
    {
      "id": 1,
      "title": "Destructuring Arrays & Objects",
      "intro": "Unpack values from arrays or properties from objects into distinct variables.",
      "explanation": "Destructuring provides an elegant, concise shorthand to extract elements or fields. In object destructuring, variable names must match object keys unless renamed. In array destructuring, elements are unpacked sequentially based on index.",
      "gotchas": [
        "Unpacking properties from undefined or null will throw a TypeError. Always use default values to protect your code."
      ],
      "interviewQuestions": [
        {
          "question": "How do you set default values while destructuring an object?",
          "answer": "By appending `= default_value` next to the variable, e.g. const { name = 'Anonymous' } = user;"
        }
      ],
      "code": "const user = { name: \"Antigravity\", role: \"AI Assistant\" };\n// Destructure with renaming and default value\nconst { name: userName, status = \"active\" } = user;\nconsole.log(userName, status); // Antigravity active",
      "visualizerType": null
    },
    {
      "id": 2,
      "title": "Spread and Rest Operators (...)",
      "intro": "Copy objects/arrays (spread) or gather remaining parameters into an array (rest).",
      "explanation": "The spread operator (`...`) unpacks elements from an array or properties from an object into a new container, creating a shallow copy. The rest operator (`...`) packs remaining elements into a single array, commonly used in function signatures or object extractions.",
      "gotchas": [
        "Spread operators create a shallow copy. Nested objects are not duplicated; their references are copied, meaning changes to children modify the original object."
      ],
      "interviewQuestions": [
        {
          "question": "What is the difference between Spread and Rest in function parameters?",
          "answer": "Rest collects multiple arguments into a single array parameter inside the function header. Spread expands an array into individual arguments when calling the function."
        }
      ],
      "code": "// Spread to clone object\nconst original = { a: 1, b: { c: 2 } };\nconst clone = { ...original };\nclone.b.c = 99; // Alters original.b.c because it's a shallow copy!\n\n// Rest to collect parameters\nconst sum = (...args) => args.reduce((a, b) => a + b, 0);",
      "visualizerType": null
    },
    {
      "id": 3,
      "title": "Arrow Functions & Implicit Returns",
      "intro": "Write concise function expressions with lexical binding of 'this'.",
      "explanation": "Arrow functions provide shorter syntax. Unlike regular functions, arrow functions do not have their own 'this' context; instead, they inherit 'this' lexically from their surrounding scope, which makes them ideal for callback handlers.",
      "gotchas": [
        "Arrow functions cannot be used as constructors (calling them with 'new' throws an error) and do not have an 'arguments' object."
      ],
      "interviewQuestions": [
        {
          "question": "What is an implicit return in an arrow function?",
          "answer": "If the function body has a single expression, you can omit the curly braces and return keyword: const add = (a, b) => a + b;"
        }
      ],
      "code": "// Explicit return\nconst doubleEx = (x) => {\n    return x * 2;\n};\n\n// Implicit return (omitting braces and return statement)\nconst doubleIm = (x) => x * 2;\n\n// Lexical \"this\" behavior\nconst timer = {\n    seconds: 0,\n    start() {\n        setInterval(() => {\n            this.seconds++; // \"this\" correctly references the timer object!\n        }, 1000);\n    }\n};",
      "visualizerType": null
    },
    {
      "id": 4,
      "title": "Array Methods: map(), filter(), reduce()",
      "intro": "Transform, query, and aggregate arrays immutably.",
      "explanation": "In React, immutability is key. These three array methods do not modify the original array; instead, they return a new array or value. '.map()' converts elements, '.filter()' removes elements matching a test, and '.reduce()' boils an array down to a single value.",
      "gotchas": [
        "Never perform mutations (e.g. push/pop) inside map or filter callbacks. Keep these functions pure."
      ],
      "interviewQuestions": [
        {
          "question": "Why is map preferred over forEach in React render lists?",
          "answer": "Because map returns a new array of React elements (JSX) which React can render directly, whereas forEach returns undefined and only performs side-effects."
        }
      ],
      "code": "const numbers = [1, 2, 3, 4];\n// map: double elements\nconst doubled = numbers.map(n => n * 2); // [2, 4, 6, 8]\n\n// filter: keep even numbers\nconst evens = numbers.filter(n => n % 2 === 0); // [2, 4]\n\n// reduce: sum elements\nconst total = numbers.reduce((sum, n) => sum + n, 0); // 10",
      "visualizerType": null
    },
    {
      "id": 5,
      "title": "TypeScript Basics: Typing Props",
      "intro": "Define robust compile-time types for React components.",
      "explanation": "TypeScript enforces type-safety. To type React props, define an Interface or Type Alias outlining the expected fields. React components are typed as React.FC<PropsType> or by typing parameters directly.",
      "gotchas": [
        "Avoid using 'any' for prop definitions. It disables type safety checks, defeating the purpose of TypeScript."
      ],
      "interviewQuestions": [
        {
          "question": "How do you specify an optional prop in TypeScript?",
          "answer": "By appending a question mark (?) after the prop name: interface ButtonProps { label: string; onClick?: () => void; }"
        }
      ],
      "code": "// TypeScript Props definition\ninterface CardProps {\n    title: string;\n    description: string;\n    isFeatured?: boolean; // Optional prop\n}\n\nexport function Card({ title, description, isFeatured = false }: CardProps) {\n    return (\n        <div className={isFeatured ? \"featured\" : \"standard\"}>\n            <h3>{title}</h3>\n            <p>{description}</p>\n        </div>\n    );\n}",
      "visualizerType": null
    },
    {
      "id": 6,
      "title": "Optional Chaining (?.) & Nullish Coalescing (??)",
      "intro": "Safe navigation operator for nested objects and clean defaults.",
      "explanation": "Optional chaining (?.) returns undefined instead of throwing an error if a reference is nullish. Nullish coalescing (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined (unlike ||, which checks for falsy values like empty strings or zero).",
      "gotchas": [
        "Optional chaining cannot be used on the left-hand side of assignments (e.g. object?.name = 'val' is a syntax error)."
      ],
      "interviewQuestions": [
        {
          "question": "What is the difference between || and ??",
          "answer": "|| returns the right-hand value for any falsy left-hand value (0, false, '', null, undefined). ?? returns the right-hand value ONLY if the left-hand value is null or undefined."
        }
      ],
      "code": "const user = { profile: { name: \"Alice\" } };\nconst age = user.profile?.age ?? 18; // safe read with fallback",
      "visualizerType": null
    },
    {
      "id": 7,
      "title": "ES Modules: import vs export",
      "intro": "Share and bundle Javascript modules cleanly.",
      "explanation": "ES Modules allow modularizing scripts. Use named exports (export const A = 1) and default exports (export default MyComponent). Default exports can be imported with any name, while named exports require curly braces.",
      "gotchas": [
        "Do not mix ES6 default exports with CommonJS module.exports in the same project files unless configured."
      ],
      "interviewQuestions": [
        {
          "question": "Can you have multiple default exports in a single file?",
          "answer": "No, a file can have at most one default export, but unlimited named exports."
        }
      ],
      "code": "// math.js\nexport const add = (a, b) => a + b;\nexport default function multiply(a, b) { return a * b; }\n\n// main.js\nimport mult, { add } from './math.js';",
      "visualizerType": null
    },
    {
      "id": 8,
      "title": "Promises & Async/Await",
      "intro": "Handle asynchronous control flows without nested callback hell.",
      "explanation": "Promises represent values that will resolve or reject in the future. Async/Await is syntactical sugar over promises, allowing asynchronous code to be written sequentially with try-catch blocks.",
      "gotchas": [
        "Always handle promise rejections using try-catch or .catch(), otherwise unhandled rejections can crash processes."
      ],
      "interviewQuestions": [
        {
          "question": "How do you run multiple promises concurrently and wait for all to complete?",
          "answer": "Use Promise.all([promise1, promise2]), which resolves when all input promises resolve, or rejects immediately if any fails."
        }
      ],
      "code": "const fetchData = async () => {\n    try {\n        const response = await fetch('/api/data');\n        const data = await response.json();\n        return data;\n    } catch (err) {\n        console.error(\"Fetch failed:\", err);\n    }\n};",
      "visualizerType": null
    },
    {
      "id": 9,
      "title": "TypeScript Basics: Interfaces & Types",
      "intro": "Define structural shapes for objects and data bindings.",
      "explanation": "Interfaces and Type Aliases both define object shapes. Interfaces can be merged recursively and are extendable. Types are more flexible, supporting union types, intersection types, and primitive aliases.",
      "gotchas": [
        "Type aliases cannot be merged using multiple declarations of the same name, unlike interfaces."
      ],
      "interviewQuestions": [
        {
          "question": "When should you use interface vs type alias?",
          "answer": "Use interface for defining public object shapes, API contracts, and extendable components. Use type for complex unions, intersections, or primitives."
        }
      ],
      "code": "type ID = string | number; // Union type alias\n\ninterface User {\n    id: ID;\n    name: string;\n}\n\ninterface Admin extends User {\n    role: string;\n} // Interface extension",
      "visualizerType": null
    },
    {
      "id": 10,
      "title": "Typing React Props & Children",
      "intro": "Type components with properties and children configurations.",
      "explanation": "React components commonly accept other components as children. In TypeScript, children are typed using the `React.ReactNode` type, which represents any renderable React node.",
      "gotchas": [
        "Do not use React.ReactElement for children if you plan to accept raw strings or numbers, as ReactElement only matches tags."
      ],
      "interviewQuestions": [
        {
          "question": "What is the type of the children prop in React TypeScript?",
          "answer": "React.ReactNode is the standard type, as it covers JSX elements, strings, fragments, arrays, and null."
        }
      ],
      "code": "interface ContainerProps {\n    title: string;\n    children: React.ReactNode; // Typing nested tags\n}\n\nexport function Container({ title, children }: ContainerProps) {\n    return (\n        <div>\n            <h2>{title}</h2>\n            {children}\n        </div>\n    );\n}",
      "visualizerType": null
    },
    {
      "id": 11,
      "title": "Typing React Events",
      "intro": "Type UI event handlers (clicks, forms, changes) compile-safe.",
      "explanation": "React uses a Synthetic Event wrapper. To type event handlers, use React event types like `React.MouseEvent<HTMLButtonElement>` or `React.ChangeEvent<HTMLInputElement>`.",
      "gotchas": [
        "Using the generic 'Event' type from standard DOM instead of React's 'SyntheticEvent' types will cause compilation errors on properties like target.value."
      ],
      "interviewQuestions": [
        {
          "question": "How do you type a text input onChange event handler?",
          "answer": "Use React.ChangeEvent<HTMLInputElement> for the event parameter."
        }
      ],
      "code": "import React from 'react';\n\nexport function InputField() {\n    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n        console.log(e.target.value);\n    };\n\n    return <input type=\"text\" onChange={handleChange} />;\n}",
      "visualizerType": null
    },
    {
      "id": 12,
      "title": "TypeScript Generics in React",
      "intro": "Build highly reusable, parameterizable components.",
      "explanation": "Generics allow components to accept dynamic data structures while maintaining type definitions. By defining a type parameter `<T>`, a component can type props and state dynamically.",
      "gotchas": [
        "TypeScript requires a trailing comma in single-parameter arrow function generics, e.g. <T,> to distinguish it from a JSX tag."
      ],
      "interviewQuestions": [
        {
          "question": "Why use generics in a list component?",
          "answer": "So the component can accept arrays of any data structure and correctly type callback arguments (like onItemClick) without casting to any."
        }
      ],
      "code": "interface ListProps<T> {\n    items: T[];\n    renderItem: (item: T) => React.ReactNode;\n}\n\nexport function List<T>({ items, renderItem }: ListProps<T>) {\n    return <ul>{items.map((item, idx) => <li key={idx}>{renderItem(item)}</li>)}</ul>;\n}",
      "visualizerType": null
    },
    {
      "id": 13,
      "title": "Union Types & State Management",
      "intro": "Limit variables to fixed, compile-safe options.",
      "explanation": "Union types restrict values to a specified list. In React state, this is useful for managing status parameters (e.g. 'loading' | 'success' | 'error') instead of using multiple independent booleans.",
      "gotchas": [
        "Discriminated unions require a shared literal property (like type: 'success') to perform clean type narrowing inside switch blocks."
      ],
      "interviewQuestions": [
        {
          "question": "What is a discriminated union in TypeScript?",
          "answer": "A type union of object interfaces that all share a literal tag property, allowing TypeScript to narrow down which interface is active during checks."
        }
      ],
      "code": "type Status = \"idle\" | \"loading\" | \"success\" | \"error\";\nconst [status, setStatus] = React.useState<Status>(\"idle\");",
      "visualizerType": null
    },
    {
      "id": 14,
      "title": "Utility Types: ComponentProps",
      "intro": "Extract props from any existing HTML tag or React component.",
      "explanation": "React's `ComponentProps<T>` utility type extracts all valid props of a tag or component. This is ideal for extending native buttons or inputs.",
      "gotchas": [
        "Ensure you import ComponentProps from 'react' to avoid conflicts with custom configurations."
      ],
      "interviewQuestions": [
        {
          "question": "How do you extend native button props in a custom button component?",
          "answer": "By defining: interface ButtonProps extends React.ComponentProps<'button'> { variant?: string; }"
        }
      ],
      "code": "import React, { ComponentProps } from 'react';\n\ninterface CustomButtonProps extends ComponentProps<\"button\"> {\n    variant: \"primary\" | \"secondary\";\n}\n\nexport function CustomButton({ variant, ...props }: CustomButtonProps) {\n    return <button {...props} className={variant} />;\n}",
      "visualizerType": null
    },
    {
      "id": 15,
      "title": "Strict Mode in TSConfig",
      "intro": "Activate strict checks to eliminate subtle runtime errors.",
      "explanation": "Enabling strict mode in tsconfig.json enforces strict null checks, noImplicitAny, and explicit binding requirements, preventing common bugs at compile-time.",
      "gotchas": [
        "Enabling strict mode in an existing JavaScript repository will trigger compiler errors on every file; it is best introduced at project startup."
      ],
      "interviewQuestions": [
        {
          "question": "What does 'strictNullChecks' do in tsconfig?",
          "answer": "It prevents null or undefined from being assigned to standard variables unless explicitly declared as a union type (e.g. string | null)."
        }
      ],
      "code": "{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"noImplicitAny\": true,\n    \"strictNullChecks\": true\n  }\n}",
      "visualizerType": null
    }
  ]
};
