export default {
  id: 12,
  title: "React Design Patterns & Custom SSR Architecture",
  range: "161-170",
  concepts: [
    {
      id: 161,
      title: "Compound Components Pattern",
      intro: "Build highly flexible, declarative component APIs like HTML select and option tags.",
      explanation: "Compound Components allow a parent component (e.g. Select) to share state implicitly with its children (e.g. Option) using Context, letting the consumer declare the UI layout without manual prop passing.",
      gotchas: ["Nesting options inside intermediate wrapper divs can break child identification. Use standard context access instead of React.Children.map if supporting flexible nesting."],
      interviewQuestions: [
        {
          question: "How do compound components communicate state implicitly?",
          answer: "By creating a shared Context inside the parent component and wrapping the children prop in the Context Provider. Child components read state/dispatch via useContext."
        }
      ],
      code: `import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

// Parent Component
export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
}

// Child Trigger
export function TabTrigger({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  return (
    <button
      className={\`tab-btn \${isActive ? 'active' : ''}\`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

// Child Content
export function TabContent({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div className="tab-pane">{children}</div>;
}`,
      visualizerType: null
    },
    {
      id: 162,
      title: "Higher-Order Components (HOC) Pattern",
      intro: "Enhance component properties and share cross-cutting concerns using function wrappers.",
      explanation: "An HOC is a pure function that takes a component and returns a new enhanced component (e.g., const SecurePanel = withAuth(Panel)). Useful for logging, loading states, and auth checks.",
      gotchas: ["Never define HOCs inside the render method of another component. React will recreate the component type on every render, losing its state entirely."],
      interviewQuestions: [
        {
          question: "What is an alternative to HOCs in modern React?",
          answer: "React Custom Hooks are generally preferred over HOCs today as they avoid deeply nested component trees ('wrapper hell') and keep stateful logic cleaner."
        }
      ],
      code: `import React, { useEffect, useState } from 'react';

// HOC definition
export function withLogger(WrappedComponent) {
  return function EnhancedComponent(props) {
    useEffect(() => {
      console.log(\`Component mounted with props:\`, props);
      return () => console.log(\`Component unmounted\`);
    }, [props]);

    return <WrappedComponent {...props} />;
  };
}

// Usage
function UserCard({ name }) {
  return <div>User: {name}</div>;
}
export const LoggedUserCard = withLogger(UserCard);`,
      visualizerType: null
    },
    {
      id: 163,
      title: "Render Props Pattern",
      intro: "Share dynamic layout states using callback function properties.",
      explanation: "Instead of hardcoding a nested layout, a component accepts a function prop (usually called render) and calls it inside its rendering flow, passing local state variables as parameters.",
      gotchas: ["Writing inline render functions inside JSX blocks triggers re-creations of the function reference on every render, which can cause redundant child updates."],
      interviewQuestions: [
        {
          question: "What is the primary benefit of the Render Props pattern?",
          answer: "It decouples stateful calculations (like mouse tracking) from visual rendering layouts, giving the consumer complete control over how state is drawn."
        }
      ],
      code: `import React, { useState } from 'react';

// State Provider
export function MouseTracker({ render }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setCoords({ x: e.clientX, y: e.clientY });
  };
  return (
    <div style={{ height: '200px', border: '1px solid' }} onMouseMove={handleMouseMove}>
      {render(coords)}
    </div>
  );
}

// Usage in UI
export function App() {
  return (
    <MouseTracker render={({ x, y }) => (
      <p>Mouse coordinates: X: {x}, Y: {y}</p>
    )} />
  );
}`,
      visualizerType: null
    },
    {
      id: 164,
      title: "Custom SSR: Node/Express Server Config",
      intro: "Serve React components server-side without Next.js or Vercel architecture constraints.",
      explanation: "A custom Server-Side Rendering engine uses an Express node server to intercept requests, render the React app to a string using ReactDOMServer, inject it into an index.html template, and stream it to the client.",
      gotchas: ["You must compile the server code and the client code separately. Use build targets (like Vite's SSR config) to build target JS bundles for Node execution."],
      interviewQuestions: [
        {
          question: "How do you render a React app to HTML string in an Express controller?",
          answer: "By importing `ReactDOMServer` from `react-dom/server` and calling `ReactDOMServer.renderToString(<App />)` or `renderToPipeableStream(<App />)`."
        }
      ],
      code: `// server.js (Express Node.js Server for Custom SSR)
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App.jsx'; // Client root component

const app = express();

app.use('/assets', express.static(path.resolve('./dist/client/assets')));

app.get('*', async (req, res) => {
  try {
    const template = fs.readFileSync(path.resolve('./dist/client/index.html'), 'utf-8');
    
    // Render the React component tree into a static HTML string
    const appHtml = ReactDOMServer.renderToString(<App url={req.url} />);
    
    // Inject the HTML into the template shell placeholder
    const html = template.replace('<!--ssr-outlet-->', appHtml);
    
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    res.status(500).end(error.message);
  }
});

app.listen(3000, () => console.log('SSR Server running on http://localhost:3000'));`,
      visualizerType: null
    },
    {
      id: 165,
      title: "Custom SSR: Client Hydration Setup",
      intro: "Hydrate static server-rendered HTML into an interactive client-side React app.",
      explanation: "Once the static HTML is parsed by the browser, the client script loads. Instead of ReactDOM.createRoot, it uses ReactDOM.hydrateRoot, binding event listeners to the pre-rendered elements.",
      gotchas: ["The HTML structure generated on the client MUST match the server HTML exactly, otherwise React throws a hydration mismatch error and drops performance."],
      interviewQuestions: [
        {
          question: "What does hydration do in React SSR?",
          answer: "Hydration is where React compiles the component tree in the browser, matches it against the existing DOM, and attaches event listeners, making pages interactive."
        }
      ],
      code: `// entry-client.js (Browser Hydration Entry Point)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Hydrate pre-existing markup rendered by Express server
ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`,
      visualizerType: null
    },
    {
      id: 166,
      title: "Custom SSR: Vite Configuration build",
      intro: "Configure Vite to output separate bundles for browser client and Express server.",
      explanation: "Vite can be instructed to run a server build targeting SSR environments (generating a server bundle) and a standard client build (generating static client assets).",
      gotchas: ["Ensure CSS and assets files are loaded correctly on both server and client configurations."],
      interviewQuestions: [
        {
          question: "What are the build commands for a custom React SSR project?",
          answer: "1. Client build: vite build --outDir dist/client. 2. Server build: vite build --ssr src/entry-server.js --outDir dist/server."
        }
      ],
      code: `// vite.config.js (Custom SSR Build Config)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
  }
});`,
      visualizerType: null
    }
  ]
};
