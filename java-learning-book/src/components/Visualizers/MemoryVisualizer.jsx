import React, { useState } from 'react';

export default function MemoryVisualizer() {
  const [line, setLine] = useState(0);

  const codeLines = [
    { text: "Dog d1 = new Dog(\"Rocky\");", comment: "Allocates Dog object Rocky on heap. Pointer stored in d1 on stack." },
    { text: "Dog d2 = d1;", comment: "Copies the reference address of Rocky from d1 to d2. Both point to the same object!" },
    { text: "d2.name = \"Bruno\";", comment: "Modifies the name field of the shared heap object. The change is visible through d1 too!" },
    { text: "d1 = new Dog(\"Max\");", comment: "Creates a new Dog object Max on heap. d1 is updated to point to Max. d2 still points to Bruno." },
    { text: "d2 = null;", comment: "d2 reference is cleared. Dog object Bruno now has 0 references, making it eligible for GC!" }
  ];

  // Derive memory state based on active line index
  const getMemoryState = (currLine) => {
    switch (currLine) {
      case 0:
        return {
          stack: [],
          heap: []
        };
      case 1:
        return {
          stack: [
            { name: "d1", val: "Dog@10A" }
          ],
          heap: [
            { addr: "Dog@10A", type: "Dog", fields: { name: "Rocky" }, eligibleGC: false }
          ]
        };
      case 2:
        return {
          stack: [
            { name: "d1", val: "Dog@10A" },
            { name: "d2", val: "Dog@10A" }
          ],
          heap: [
            { addr: "Dog@10A", type: "Dog", fields: { name: "Rocky" }, eligibleGC: false }
          ]
        };
      case 3:
        return {
          stack: [
            { name: "d1", val: "Dog@10A" },
            { name: "d2", val: "Dog@10A" }
          ],
          heap: [
            { addr: "Dog@10A", type: "Dog", fields: { name: "Bruno" }, eligibleGC: false }
          ]
        };
      case 4:
        return {
          stack: [
            { name: "d1", val: "Dog@20B" },
            { name: "d2", val: "Dog@10A" }
          ],
          heap: [
            { addr: "Dog@10A", type: "Dog", fields: { name: "Bruno" }, eligibleGC: false },
            { addr: "Dog@20B", type: "Dog", fields: { name: "Max" }, eligibleGC: false }
          ]
        };
      case 5:
      default:
        return {
          stack: [
            { name: "d1", val: "Dog@20B" },
            { name: "d2", val: "null" }
          ],
          heap: [
            { addr: "Dog@10A", type: "Dog", fields: { name: "Bruno" }, eligibleGC: true },
            { addr: "Dog@20B", type: "Dog", fields: { name: "Max" }, eligibleGC: false }
          ]
        };
    }
  };

  const { stack, heap } = getMemoryState(line);

  return (
    <div className="visualizer-container">
      <h3 style={{ marginBottom: '8px', fontSize: '15px' }}>Stack vs Heap Memory Simulator</h3>
      <div className="visualizer-screen" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* Code View */}
        <div style={{ backgroundColor: 'var(--code-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px' }}>
          {codeLines.map((c, idx) => (
            <div
              key={idx}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '3px 6px',
                borderRadius: '4px',
                backgroundColor: line === idx + 1 ? 'var(--accent-bg)' : 'transparent',
                color: line === idx + 1 ? 'var(--accent-color)' : 'var(--text-secondary)',
                fontWeight: line === idx + 1 ? 'bold' : 'normal',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ opacity: 0.5 }}>{idx + 1}:</span>
              <span>{c.text}</span>
              {line === idx + 1 && <span style={{ fontSize: '9px', fontStyle: 'italic', opacity: 0.8 }}>← active</span>}
            </div>
          ))}
        </div>

        {/* Comment view */}
        <div style={{ fontSize: '12px', minHeight: '36px', fontStyle: 'italic', color: 'var(--text-secondary)', borderLeft: '3px solid var(--accent-color)', paddingLeft: '8px' }}>
          {line > 0 ? codeLines[line - 1].comment : "Click 'Next Line' to begin compiling code line by line."}
        </div>

        {/* Visual Memory Blocks */}
        <div className="memory-viz" style={{ flex: 1, minHeight: '160px' }}>
          {/* Stack */}
          <div className="viz-box">
            <div className="viz-box-title">Stack Memory</div>
            <div className="viz-list">
              {stack.length === 0 ? (
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '20px' }}>Empty Frame</div>
              ) : (
                stack.map((v, i) => (
                  <div key={i} className="viz-item-stack">
                    <span style={{ fontWeight: 'bold' }}>{v.name}</span>
                    <span style={{ color: v.val === 'null' ? 'var(--danger-color)' : 'var(--accent-color)' }}>{v.val}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Heap */}
          <div className="viz-box">
            <div className="viz-box-title">Heap Memory</div>
            <div className="viz-list">
              {heap.length === 0 ? (
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '20px' }}>No Objects Allocated</div>
              ) : (
                heap.map((h, i) => (
                  <div
                    key={i}
                    className="viz-item-heap"
                    style={{
                      borderColor: h.eligibleGC ? 'var(--danger-color)' : 'var(--accent-color)',
                      backgroundColor: h.eligibleGC ? 'rgba(192, 57, 43, 0.1)' : 'var(--accent-bg)',
                      borderStyle: h.eligibleGC ? 'dashed' : 'solid',
                      opacity: h.eligibleGC ? 0.7 : 1
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', pb: '4px', mb: '4px', fontWeight: 'bold', fontSize: '10px' }}>
                      <span>{h.type} ({h.addr})</span>
                      {h.eligibleGC && <span style={{ color: 'var(--danger-color)' }}>GC Target!</span>}
                    </div>
                    <div>
                      {Object.entries(h.fields).map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                          <span>{k}:</span>
                          <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>"{v}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
      <div className="visualizer-controls">
        <button
          className="btn"
          disabled={line === 0}
          onClick={() => setLine(prev => prev - 1)}
          style={{ opacity: line === 0 ? 0.5 : 1 }}
        >
          Reset/Prev
        </button>
        <button
          className="btn btn-accent"
          disabled={line === codeLines.length}
          onClick={() => setLine(prev => prev + 1)}
          style={{ opacity: line === codeLines.length ? 0.5 : 1, marginLeft: 'auto' }}
        >
          Execute Next Line
        </button>
      </div>
    </div>
  );
}
