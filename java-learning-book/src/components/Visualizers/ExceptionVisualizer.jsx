import React, { useState } from 'react';

export default function ExceptionVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. Normal Execution Call Stack",
      desc: "main() calls level1(), which calls level2(). Stack frames are built up in LIFO order.",
      stack: ["level2()", "level1()", "main()"],
      status: "NORMAL"
    },
    {
      title: "2. Exception Thrown in level2()",
      desc: "An ArithmeticException (/ by zero) is thrown in level2(). JVM starts looking for a try-catch block.",
      stack: ["level2() ⚠️ EXCEPTION!", "level1()", "main()"],
      status: "THROWN"
    },
    {
      title: "3. Bubbling Up: level2() Popped",
      desc: "level2() has no try-catch. Its stack frame is popped. The exception propagates down to level1().",
      stack: ["level1() ⚡ exception passed here", "main()"],
      status: "BUBBLE_1"
    },
    {
      title: "4. Bubbling Up: level1() Popped",
      desc: "level1() has no try-catch either. Its frame is popped. The exception propagates down to main().",
      stack: ["main() ⚡ exception passed here"],
      status: "BUBBLE_2"
    },
    {
      title: "5. Caught in main()",
      desc: "main() has a try-catch block wrapping the level1() call. The exception is caught, and the program recovers!",
      stack: ["main() ✅ caught (ArithmeticException)"],
      status: "CAUGHT"
    }
  ];

  return (
    <div className="visualizer-container">
      <h3 style={{ marginBottom: '8px', fontSize: '15px' }}>Exception Call Stack Propagation</h3>
      <div className="visualizer-screen" style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
        
        {/* Code View */}
        <div style={{ backgroundColor: 'var(--code-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
          <div>void main() &#123; try &#123; level1(); &#125; catch(...) &#123; <span style={{ color: 'var(--success-color)' }}>/* Recover */</span> &#125; &#125;</div>
          <div>void level1() &#123; level2(); &#125;</div>
          <div>void level2() &#123; int x = 10 / 0; <span style={{ color: 'var(--danger-color)' }}>// throws ArithmeticException</span> &#125;</div>
        </div>

        {/* Explain Card */}
        <div style={{ minHeight: '44px' }}>
          <h4 style={{ color: 'var(--accent-color)', marginBottom: '2px' }}>{steps[step].title}</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: '1.4' }}>{steps[step].desc}</p>
        </div>

        {/* Graphic stack */}
        <div className="viz-box" style={{ flex: 1, minHeight: '120px', display: 'flex', flexDirection: 'column-reverse', gap: '6px', padding: '10px', backgroundColor: 'var(--bg-desktop)' }}>
          {steps[step].stack.map((frame, idx) => {
            let color = 'var(--text-primary)';
            let bg = 'var(--bg-page)';
            let border = '1px solid var(--border-color)';

            if (frame.includes('⚠️')) {
              color = 'white';
              bg = 'var(--danger-color)';
              border = '1px solid var(--danger-color)';
            } else if (frame.includes('⚡')) {
              color = 'var(--danger-color)';
              bg = 'rgba(192, 57, 43, 0.1)';
              border = '1.5px dashed var(--danger-color)';
            } else if (frame.includes('✅')) {
              color = 'white';
              bg = 'var(--success-color)';
              border = '1.5px solid var(--success-color)';
            }

            return (
              <div
                key={idx}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  backgroundColor: bg,
                  color: color,
                  border: border,
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textAlign: 'center',
                  transform: 'scale(' + (1 - idx * 0.05) + ')',
                  boxShadow: 'var(--shadow)'
                }}
              >
                {frame}
              </div>
            );
          })}
        </div>

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
