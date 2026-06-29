import React, { useState } from 'react';

export default function DispatchVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. Compile-Time Type Checking",
      desc: "Reference variable 'comp' is declared as type 'Computer'. The compiler checks if 'Computer' class has the 'powerOn()' method. It does, so compilation succeeds.",
      state: "COMPILE_SUCCESS"
    },
    {
      title: "2. Object Allocation (Heap)",
      desc: "At runtime, 'new Mac()' allocates a Mac object on the heap. Even though 'comp' reference is typed as 'Computer', it points to a physical 'Mac' instance.",
      state: "ALLOCATED"
    },
    {
      title: "3. Virtual Method Table (vtable) Lookup",
      desc: "When calling 'comp.powerOn()', the JVM examines the physical object on the heap (Mac). It looks up Mac's class vtable to resolve the method address.",
      state: "VTABLE_RESOLVED"
    },
    {
      title: "4. Execution & Output",
      desc: "The overridden 'powerOn()' inside the subclass 'Mac' executes. 'Chime' is printed, completely bypassing 'Computer's implementation.",
      state: "OUTPUT_PRINTED"
    }
  ];

  return (
    <div className="visualizer-container">
      <h3 style={{ marginBottom: '8px', fontSize: '15px' }}>Dynamic Method Dispatch</h3>
      <div className="visualizer-screen" style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
        
        {/* Code representation */}
        <div style={{ backgroundColor: 'var(--code-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <div><span style={{ color: 'var(--accent-color)' }}>Computer</span> comp = <span style={{ color: 'var(--accent-color)' }}>new</span> Mac();</div>
          <div>comp.powerOn(); <span style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>// Which version runs?</span></div>
        </div>

        {/* Explain Card */}
        <div style={{ minHeight: '50px' }}>
          <h4 style={{ color: 'var(--accent-color)', marginBottom: '4px' }}>{steps[step].title}</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '1.4' }}>{steps[step].desc}</p>
        </div>

        {/* Visual Graphics */}
        <div style={{ flex: 1, border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', backgroundColor: 'var(--bg-desktop)', display: 'flex', flexDirection: 'column', justify: 'center', minHeight: '120px' }}>
          {step === 0 && (
            <div style={{ textAlign: 'center', margin: 'auto' }}>
              <div style={{ border: '2px solid var(--text-primary)', padding: '6px', borderRadius: '4px', display: 'inline-block', fontWeight: 'bold' }}>
                Class: Computer
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                [Compiler verification]: Does Computer declare powerOn()? <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>YES</span>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: 'auto', width: '100%' }}>
              <div>
                <div style={{ fontSize: '9px', fontWeight: 'bold' }}>Stack (Ref Type)</div>
                <div style={{ border: '1.5px solid var(--border-color)', padding: '6px', borderRadius: '4px', backgroundColor: 'var(--bg-page)', fontFamily: 'var(--font-mono)' }}>
                  comp (Computer)
                </div>
              </div>
              <div style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>────────►</div>
              <div>
                <div style={{ fontSize: '9px', fontWeight: 'bold' }}>Heap (Actual Obj)</div>
                <div style={{ border: '2px solid var(--accent-color)', padding: '6px', borderRadius: '4px', backgroundColor: 'var(--accent-bg)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
                  Mac Object
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ margin: 'auto', width: '100%', fontSize: '11px' }}>
              <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '8px' }}>vtable Resolution:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ border: '1px dashed var(--border-color)', padding: '4px', borderRadius: '4px', textAlign: 'center', opacity: 0.6 }}>
                  <strong>Computer Table</strong><br/>
                  powerOn() → Computer.class
                </div>
                <div style={{ border: '1.5px solid var(--accent-color)', padding: '4px', borderRadius: '4px', backgroundColor: 'var(--accent-bg)', textAlign: 'center' }}>
                  <strong>Mac Table (Overridden)</strong><br/>
                  powerOn() → <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Mac.class</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', margin: 'auto' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--success-color)' }}>
                🔊 "Chime!"
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                Mac's overridden method executes successfully.
              </div>
            </div>
          )}
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
          Next Stage
        </button>
      </div>
    </div>
  );
}
