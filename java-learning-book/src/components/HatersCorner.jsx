import React, { useState } from 'react';

export default function HatersCorner() {
  const [memeIndex, setMemeIndex] = useState(0);

  const translations = [
    {
      title: "1. Making a simple List & filtering even numbers",
      legacy: `// The Legacy Verbose Java Way (Hate level: Max)
List<Integer> evens = new ArrayList<>();
for(int i = 0; i < list.size(); i++) {
    int val = list.get(i);
    if(val % 2 == 0) {
        evens.add(val);
    }
}`,
      modern: `// Modern Java Way (Streams & Lambdas)
List<Integer> evens = list.stream()
                          .filter(n -> n % 2 == 0)
                          .toList();`
    },
    {
      title: "2. Creating a Data Class (POJO)",
      legacy: `// Legacy Java: Getters, Setters, Equals, HashCode (50+ lines)
class User {
    private String id;
    private String name;
    public User(String id, String name) { this.id = id; this.name = name; }
    public String getId() { return id; }
    // ... insert 40 lines of equals, hashCode, toString() boilerplate ...
}`,
      modern: `// Modern Java Way (Records - Java 14+)
public record User(String id, String name) {}
// Compiler automatically generates getters, constructor, 
// equals, hashCode, and toString in 1 line!`
    },
    {
      title: "3. Safe Resource handling",
      legacy: `// Legacy Java: BufferedReader with manual finally blocks
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("file.txt"));
    String line = reader.readLine();
} catch (IOException e) { e.printStackTrace(); }
finally {
    if (reader != null) {
        try { reader.close(); } catch(IOException e) {}
    }
}`,
      modern: `// Modern Java Way (Try-With-Resources - Java 7+)
try (var reader = new BufferedReader(new FileReader("file.txt"))) {
    String line = reader.readLine();
} // Reader is AUTO-CLOSED by JVM even if exceptions occur!`
    }
  ];

  const memes = [
    {
      setup: "Why did the Java developer wear glasses?",
      punchline: "Because they couldn't C#! (Get it? But C# copied Java anyway)."
    },
    {
      setup: "How many Java programmers does it take to change a light bulb?",
      punchline: "None. You need a LightBulbFactory, a LightBulbChangeListener, and a LightBulbLifecycleManager."
    },
    {
      setup: "JavaScript vs Java:",
      punchline: "Java is to JavaScript what Car is to Carpet. They are completely unrelated species!"
    }
  ];

  return (
    <div className="haters-corner-container" style={{ width: '100%' }}>
      <div className="motivation-card" style={{ marginBottom: '20px' }}>
        <div className="motivation-title">💸 The 50+ LPA Reality Check</div>
        <p className="motivation-quote">
          "Python is cute for scripting, and JavaScript is great for web buttons. But when a bank needs to process 100,000 transactions per second without losing a single cent, they write Java. Master Java memory layout, and companies will throw money at you."
        </p>
      </div>

      <h3 style={{ fontSize: '15px', color: 'var(--text-primary)', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '6px', marginBottom: '14px' }}>
        ✂️ Boilerplate Legacy vs. Modern Java
      </h3>
      
      {translations.map((t, idx) => (
        <div key={idx} className="translator-card" style={{ marginBottom: '20px', padding: '12px' }}>
          <div className="translator-header" style={{ fontSize: '13px', fontWeight: '700', marginBottom: '10px' }}>{t.title}</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Legacy Block */}
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: '10px', color: 'var(--danger-color)', fontWeight: 'bold', marginBottom: '4px' }}>Legacy Code</div>
              <pre className="translator-box" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', overflowX: 'auto', whiteSpace: 'pre', padding: '8px', margin: 0 }}>
                {t.legacy}
              </pre>
            </div>
            
            {/* Downward Connector Arrow */}
            <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--accent-color)', fontWeight: 'bold' }}>
              ⬇️ Modern Evolution
            </div>

            {/* Modern Block */}
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: '10px', color: 'var(--success-color)', fontWeight: 'bold', marginBottom: '4px' }}>Modern Code (17+)</div>
              <pre className="translator-box clean" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', overflowX: 'auto', whiteSpace: 'pre', padding: '8px', margin: 0 }}>
                {t.modern}
              </pre>
            </div>
          </div>
        </div>
      ))}

      <h3 style={{ fontSize: '15px', color: 'var(--text-primary)', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '6px', marginTop: '16px', marginBottom: '12px' }}>
        😆 Hater's Humor Therapy
      </h3>

      <div className="meme-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <p style={{ fontWeight: 'bold', color: 'var(--accent-color)', textAlign: 'center' }}>{memes[memeIndex].setup}</p>
        <p style={{ fontStyle: 'italic', fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center' }}>{memes[memeIndex].punchline}</p>
        <button
          className="btn"
          onClick={() => setMemeIndex((memeIndex + 1) % memes.length)}
          style={{ marginTop: '8px', fontSize: '12px', padding: '4px 10px' }}
        >
          Next Joke Please
        </button>
      </div>
    </div>
  );
}
