import React, { useState } from 'react';

export default function JVMVisualizer({ code }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. Source Code",
      desc: "You write high-level readable source code (.java file).",
      output: code || "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello World\");\n  }\n}"
    },
    {
      title: "2. Compilation (javac)",
      desc: "The javac compiler verifies syntax and types. It compiles it into intermediate bytecode.",
      output: "// Compiled from Main.java\npublic class Main {\n  public Main();\n    Code:\n       0: aload_0\n       1: invokespecial #1                  // Method java/lang/Object.\"<init>\":()V\n       4: return\n\n  public static void main(java.lang.String[]);\n    Code:\n       0: getstatic     #7                  // Field java/lang/System.out:Ljava/io/PrintStream;\n       3: ldc           #13                 // String Hello World\n       5: invokevirtual #15                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V\n       8: return\n}"
    },
    {
      title: "3. ClassLoader & JVM Memory",
      desc: "JVM loads the .class file into the Method Area, links it, and allocates stack frames for execution.",
      output: "Loading class: Main\nMemory Allocated in Method Area.\nInitializing Class definitions.\nCreated Stack Frame for: main()"
    },
    {
      title: "4. JIT Compiler Execution",
      desc: "The Execution Engine reads bytecode. The JIT (Just-In-Time) compiler translates 'hot' loops directly to native assembly instructions for speed.",
      output: "Scanning for Hotspots... main() detected.\nJIT compiling bytecode to native code...\nASM: 0x8B 0x05 0x12 0x34 0x56 0x78 (Native Intel x64 CPU instruction)"
    },
    {
      title: "5. Operating System Run",
      desc: "The native code calls OS system functions (Write to stdout) and runs directly on host CPU.",
      output: "[STDOUT]: Hello World\nProcess finished with exit code 0"
    }
  ];

  return (
    <div className="visualizer-container">
      <h3 style={{ marginBottom: '12px', fontSize: '15px' }}>Java Compiler Pipeline</h3>
      <div className="visualizer-screen" style={{ fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setStep(idx)}
              style={{
                flex: 1,
                padding: '6px',
                borderRadius: '4px',
                border: '1.5px solid ' + (step === idx ? 'var(--accent-color)' : 'var(--border-color)'),
                backgroundColor: step === idx ? 'var(--accent-bg)' : 'transparent',
                color: step === idx ? 'var(--accent-color)' : 'var(--text-secondary)',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>

        <div>
          <h4 style={{ color: 'var(--accent-color)', marginBottom: '4px' }}>{steps[step].title}</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '1.4', marginBottom: '8px' }}>{steps[step].desc}</p>
        </div>

        <pre style={{
          flex: 1,
          backgroundColor: 'var(--code-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          padding: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          color: 'var(--text-primary)'
        }}>
          {steps[step].output}
        </pre>
      </div>
      <div className="visualizer-controls">
        <button
          className="btn"
          disabled={step === 0}
          onClick={() => setStep(prev => prev - 1)}
          style={{ opacity: step === 0 ? 0.5 : 1 }}
        >
          Previous
        </button>
        <button
          className="btn btn-accent"
          disabled={step === steps.length - 1}
          onClick={() => setStep(prev => prev + 1)}
          style={{ opacity: step === steps.length - 1 ? 0.5 : 1, marginLeft: 'auto' }}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
