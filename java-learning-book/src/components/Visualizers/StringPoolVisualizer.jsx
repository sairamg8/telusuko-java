import React, { useState } from 'react';

export default function StringPoolVisualizer() {
  const [step, setStep] = useState(0);

  const codeSteps = [
    { text: "String s1 = \"Java\";", comment: "JVM checks the String Constant Pool (SCP). 'Java' is missing, so it creates it in SCP. s1 points to it." },
    { text: "String s2 = \"Java\";", comment: "JVM checks SCP. 'Java' already exists! It returns the existing reference. s2 points to the SAME object. s1 == s2 is TRUE." },
    { text: "String s3 = new String(\"Java\");", comment: "Using 'new' bypasses direct SCP binding. It creates a brand new String object on the general heap. s1 == s3 is FALSE!" },
    { text: "String s4 = s3.intern();", comment: "intern() manually returns the SCP reference of the value 'Java'. s4 now points to the SCP instance. s1 == s4 is TRUE!" }
  ];

  const getRelations = (currStep) => {
    switch (currStep) {
      case 1:
        return {
          stack: [{ name: "s1", ref: "SCP@Java" }],
          pool: ["Java"],
          heap: [],
          comparisons: []
        };
      case 2:
        return {
          stack: [
            { name: "s1", ref: "SCP@Java" },
            { name: "s2", ref: "SCP@Java" }
          ],
          pool: ["Java"],
          heap: [],
          comparisons: ["s1 == s2 (TRUE) - same reference"]
        };
      case 3:
        return {
          stack: [
            { name: "s1", ref: "SCP@Java" },
            { name: "s2", ref: "SCP@Java" },
            { name: "s3", ref: "Heap@1" }
          ],
          pool: ["Java"],
          heap: [{ addr: "Heap@1", val: "Java", pointsTo: "SCP@Java" }],
          comparisons: [
            "s1 == s2 (TRUE)",
            "s1 == s3 (FALSE) - Heap vs Pool reference",
            "s1.equals(s3) (TRUE) - content is same ('Java')"
          ]
        };
      case 4:
      default:
        return {
          stack: [
            { name: "s1", ref: "SCP@Java" },
            { name: "s2", ref: "SCP@Java" },
            { name: "s3", ref: "Heap@1" },
            { name: "s4", ref: "SCP@Java" }
          ],
          pool: ["Java"],
          heap: [{ addr: "Heap@1", val: "Java", pointsTo: "SCP@Java" }],
          comparisons: [
            "s1 == s2 (TRUE)",
            "s1 == s3 (FALSE)",
            "s1 == s4 (TRUE) - intern() returned pool instance!",
            "s1.equals(s3) (TRUE)"
          ]
        };
    }
  };

  const { stack, pool, heap, comparisons } = getRelations(step === 0 ? 1 : step);

  return (
    <div className="visualizer-container">
      <h3 style={{ marginBottom: '8px', fontSize: '15px' }}>String Constant Pool Visualizer</h3>
      <div className="visualizer-screen" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
        {/* Code Block */}
        <div style={{ backgroundColor: 'var(--code-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px' }}>
          {codeSteps.map((c, idx) => (
            <div
              key={idx}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: step === idx + 1 ? 'var(--accent-bg)' : 'transparent',
                color: step === idx + 1 ? 'var(--accent-color)' : 'var(--text-secondary)',
                fontWeight: step === idx + 1 ? 'bold' : 'normal'
              }}
            >
              <span>{idx + 1}: {c.text}</span>
            </div>
          ))}
        </div>

        {/* Explain comment */}
        <div style={{ fontSize: '12px', minHeight: '34px', fontStyle: 'italic', color: 'var(--text-secondary)', borderLeft: '3px solid var(--accent-color)', paddingLeft: '8px' }}>
          {step > 0 ? codeSteps[step - 1].comment : "Click 'Execute Next' to trace string memory allocations."}
        </div>

        {/* Memory Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', flex: 1, minHeight: '140px' }}>
          {/* Stack references */}
          <div className="viz-box">
            <div className="viz-box-title" style={{ fontSize: '11px' }}>Stack</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {stack.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 6px', backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                  <span>{s.name}</span>
                  <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{s.ref}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Heap Area */}
          <div className="viz-box" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="viz-box-title" style={{ fontSize: '11px' }}>Heap Memory</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', flex: 1 }}>
              {/* General Heap */}
              <div style={{ border: '1px solid var(--border-color)', padding: '6px', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>General Heap</div>
                {heap.length === 0 ? (
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', margin: 'auto' }}>Empty</div>
                ) : (
                  heap.map((h, i) => (
                    <div key={i} style={{ border: '1.5px solid var(--accent-color)', padding: '4px', borderRadius: '4px', backgroundColor: 'var(--bg-page)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
                      <div>{h.addr}</div>
                      <div style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>val: "{h.val}"</div>
                    </div>
                  ))
                )}
              </div>

              {/* String Pool */}
              <div style={{ border: '1.5px solid var(--accent-color)', padding: '6px', borderRadius: '4px', backgroundColor: 'var(--accent-bg)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--accent-color)' }}>String Constant Pool (SCP)</div>
                {pool.map((pVal, idx) => (
                  <div key={idx} style={{ padding: '4px', backgroundColor: 'var(--bg-page)', border: '1px solid var(--accent-color)', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                    "SCP@{pVal}"
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comparisons Box */}
        {comparisons.length > 0 && (
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px', backgroundColor: 'var(--bg-desktop)' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '2px', textTransform: 'uppercase', fontSize: '9px', color: 'var(--text-secondary)' }}>Reference Relations:</div>
            {comparisons.map((c, i) => <div key={i} style={{ paddingLeft: '4px' }}>• {c}</div>)}
          </div>
        )}

      </div>
      <div className="visualizer-controls">
        <button
          className="btn"
          disabled={step === 0}
          onClick={() => setStep(0)}
          style={{ opacity: step === 0 ? 0.5 : 1 }}
        >
          Reset
        </button>
        <button
          className="btn btn-accent"
          disabled={step === codeSteps.length}
          onClick={() => setStep(prev => prev + 1)}
          style={{ opacity: step === codeSteps.length ? 0.5 : 1, marginLeft: 'auto' }}
        >
          Execute Next
        </button>
      </div>
    </div>
  );
}
