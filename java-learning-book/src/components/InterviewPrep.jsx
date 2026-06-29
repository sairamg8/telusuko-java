import React, { useState } from 'react';

export default function InterviewPrep() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      q: "1. String s1 = \"Hi\"; String s2 = \"Hi\"; String s3 = new String(\"Hi\"); What is s1 == s2 and s1 == s3?",
      options: [
        { key: "A", text: "true, true" },
        { key: "B", text: "true, false" },
        { key: "C", text: "false, true" },
        { key: "D", text: "false, false" }
      ],
      ans: "B",
      explain: "s1 and s2 both point to the same String Constant Pool object, so s1 == s2 is true. s3 creates a new object in the general heap, so s1 == s3 is false (different references)."
    },
    {
      id: 2,
      q: "2. If you override the equals() method in a Java class, what other method must you override to prevent HashMap bugs?",
      options: [
        { key: "A", text: "toString()" },
        { key: "B", text: "clone()" },
        { key: "C", text: "hashCode()" },
        { key: "D", text: "getClass()" }
      ],
      ans: "C",
      explain: "The equals/hashCode contract states that equal objects must have identical hash codes. If you override equals but not hashCode, HashMaps will fail to retrieve values mapped to your keys."
    },
    {
      id: 3,
      q: "3. What triggers a StackOverflowError in the JVM?",
      options: [
        { key: "A", text: "Creating too many objects in the heap" },
        { key: "B", text: "Exceeding the call stack frame allocation limit (e.g., infinite recursion)" },
        { key: "C", text: "Declaring static variables inside methods" },
        { key: "D", text: "Failing to close database connections" }
      ],
      ans: "B",
      explain: "Stack memory holds method frames. If methods keep calling methods recursively without returning, the call stack overflows. Objects running out of memory triggers OutOfMemoryError."
    },
    {
      id: 4,
      q: "4. Which of these is a Checked Exception (verified at compile-time)?",
      options: [
        { key: "A", text: "NullPointerException" },
        { key: "B", text: "ArithmeticException" },
        { key: "C", text: "IOException" },
        { key: "D", text: "ClassCastException" }
      ],
      ans: "C",
      explain: "IOException (and subclasses like FileNotFoundException) are checked exceptions. NullPointer, Arithmetic, and ClassCast are RuntimeExceptions (unchecked)."
    },
    {
      id: 5,
      q: "5. How does JVM resolve a polymorphic method call at runtime (comp.powerOn() where comp is Computer reference pointing to Mac)?",
      options: [
        { key: "A", text: "Runs the Computer's method (Static binding)" },
        { key: "B", text: "Determines the actual class on the heap (Mac) and calls its overridden method via vtable" },
        { key: "C", text: "Throws a RuntimeException because of variable typing conflict" },
        { key: "D", text: "Checks compile-time flags and executes whichever is alphabetical" }
      ],
      ans: "B",
      explain: "This is Dynamic Method Dispatch. The reference type decides which methods are compilation-accessible, but the runtime object's vtable determines which override executes."
    }
  ];

  const handleSelect = (qId, optionKey) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionKey
    }));
  };

  const checkQuiz = () => {
    let calculated = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.ans) {
        calculated++;
      }
    });
    setScore(calculated);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div>
      <h3 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '6px' }}>
        🏆 50+ LPA Competency Test
      </h3>

      {questions.map((q) => (
        <div key={q.id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '14px', backgroundColor: 'var(--bg-page)', marginBottom: '16px' }}>
          <p style={{ fontWeight: '600', fontSize: '13.5px', marginBottom: '10px', color: 'var(--text-primary)' }}>{q.q}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {q.options.map(opt => {
              const isSelected = selectedAnswers[q.id] === opt.key;
              const isCorrect = opt.key === q.ans;
              let btnStyle = {
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: submitted ? 'default' : 'pointer',
                fontSize: '12.5px',
                color: 'var(--text-secondary)'
              };

              if (isSelected && !submitted) {
                btnStyle.border = '2px solid var(--accent-color)';
                btnStyle.backgroundColor = 'var(--accent-bg)';
                btnStyle.color = 'var(--accent-color)';
              } else if (submitted) {
                if (isCorrect) {
                  btnStyle.border = '2px solid var(--success-color)';
                  btnStyle.backgroundColor = 'rgba(39, 174, 96, 0.15)';
                  btnStyle.color = 'var(--success-color)';
                } else if (isSelected) {
                  btnStyle.border = '2px solid var(--danger-color)';
                  btnStyle.backgroundColor = 'rgba(192, 57, 43, 0.15)';
                  btnStyle.color = 'var(--danger-color)';
                }
              }

              return (
                <button
                  key={opt.key}
                  style={btnStyle}
                  onClick={() => handleSelect(q.id, opt.key)}
                >
                  <span style={{ fontWeight: 'bold', marginRight: '6px' }}>{opt.key}.</span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          {submitted && (
            <div style={{ marginTop: '10px', fontSize: '12px', padding: '10px', backgroundColor: 'var(--bg-desktop)', borderRadius: '6px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              <strong>Explanation:</strong> {q.explain}
            </div>
          )}
        </div>
      ))}

      {submitted ? (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p style={{ fontWeight: '700', fontSize: '16px', color: score >= 4 ? 'var(--success-color)' : 'var(--accent-color)', marginBottom: '8px' }}>
            Your Score: {score} / {questions.length} ({score >= 4 ? "50 LPA Ready!" : "Keep Reading!"})
          </p>
          <button className="btn" onClick={resetQuiz}>Retake Exam</button>
        </div>
      ) : (
        <button
          className="btn btn-accent"
          style={{ width: '100%', padding: '12px' }}
          onClick={checkQuiz}
          disabled={Object.keys(selectedAnswers).length < questions.length}
        >
          Submit Answers
        </button>
      )}
    </div>
  );
}
