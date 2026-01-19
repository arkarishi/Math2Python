"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [equation, setEquation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    if (!equation.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

    try {
      const res = await fetch(`${backendUrl}/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equation }),
      });

      if (!res.ok) {
        throw new Error("Failed to convert equation");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Math2Python</h1>
      <p className={styles.subtitle}>Convert Research Math into Runnable Code</p>

      <div className={styles.converterCard}>
        <textarea
          className={styles.textarea}
          placeholder="Enter LaTeX equation here... e.g. \min_{x} \|Ax - b\|_2^2"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={handleConvert}
          disabled={loading || !equation.trim()}
        >
          {loading ? "Converting..." : "Convert to Code"}
        </button>
      </div>

      {error && (
        <div style={{ color: "#ef4444", marginTop: "1rem" }}>
          Error: {error}
        </div>
      )}

      {result && (
        <div className={styles.outputGrid}>
          <div className={styles.resultCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span className={styles.cardTitle}>SymPy (Symbolic)</span>
              <CopyButton text={result.sympy} />
            </div>
            <pre className={styles.code}>{result.sympy}</pre>
          </div>
          <div className={styles.resultCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span className={styles.cardTitle}>NumPy (Numerical)</span>
              <CopyButton text={result.numpy} />
            </div>
            <pre className={styles.code}>{result.numpy}</pre>
          </div>
          <div className={`${styles.resultCard} ${styles.fullWidth}`}>
            <span className={styles.cardTitle}>Explanation</span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {result.explanation.split('\n').filter(line => line.trim()).map((line, i) => {
                // Formatting: Replace **text** with <strong>text</strong>
                const content = line.replace(/^\s*\*\s*/, ''); // Remove leading '* '
                const parts = content.split(/(\*\*.*?\*\*)/g);

                return (
                  <li key={i} style={{ marginBottom: "0.5rem", lineHeight: 1.6, display: "flex", alignItems: "start" }}>
                    <span style={{ color: "var(--secondary)", marginRight: "0.5rem", marginTop: "0.2rem" }}>•</span>
                    <span>
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j} style={{ color: "var(--accent)" }}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: "transparent",
        border: "1px solid var(--glass-border)",
        color: copied ? "#4ade80" : "#94a3b8",
        padding: "0.25rem 0.75rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontSize: "0.8rem",
        transition: "all 0.2s"
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
