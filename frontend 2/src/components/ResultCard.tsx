import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface ResultCardProps {
  title: string;
  content: string;
  type: "sympy" | "numpy" | "explanation" | "complexity";
  delay?: number;
  className?: string; // Add className prop
}

const ResultCard = ({ title, content, type, delay = 0, className = "" }: ResultCardProps) => {
  const [copied, setCopied] = useState(false);

  const labelClass = {
    sympy: "card-label",
    numpy: "card-label-cyan",
    explanation: "card-label-blue",
    complexity: "card-label-orange",
  }[type];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card p-6 h-full flex flex-col ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={labelClass}>{title}</span>
        {(type !== "explanation" && type !== "complexity") && (
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg transition-all hover:bg-muted/50 text-muted-foreground hover:text-foreground"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-aurora-cyan" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {(type === "explanation" || type === "complexity") ? (
        <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
          {type === "complexity" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
              {content
                // Split by regex looking for keywords or common delimiters
                .replace(/([.!?])\s*(?=(Time|Space|Warning))/gi, "$1\n") // Force split on sentence end before keyword
                .replace(/(Time:|Space:|Warning:)/gi, "\n$1") // Force split before keyword if not separated
                .split('\n')
                .filter(line => line.trim().length > 3) // Filter empty or tiny lines
                .map((line, i) => {
                  const isWarning = line.toLowerCase().includes("warning");
                  const isTime = line.toLowerCase().includes("time") && !isWarning;
                  const isSpace = line.toLowerCase().includes("space") && !isWarning;

                  let styleClass = "bg-white/5 border-white/10 text-gray-300";
                  if (isWarning) styleClass = "bg-red-500/10 border-red-500/20 text-red-200 col-span-1 md:col-span-3"; // Warning takes full width if on new line
                  if (isTime) styleClass = "bg-blue-500/10 border-blue-500/20 text-blue-200";
                  if (isSpace) styleClass = "bg-purple-500/10 border-purple-500/20 text-purple-200";

                  // Clean the text
                  const cleanText = line.replace(/^(Time:|Space:|Warning:)/i, "").trim().replace(/[.,]$/, "");

                  return (
                    <div key={i} className={`p-4 rounded-xl border flex items-center gap-3 transition-hover hover:scale-[1.02] duration-300 ${styleClass}`}>
                      <span className="text-2xl opacity-80 shrink-0">
                        {isWarning && "⚠️"}
                        {isTime && "⏱️"}
                        {isSpace && "💾"}
                        {!isWarning && !isTime && !isSpace && "ℹ️"}
                      </span>
                      <span className="font-medium">{cleanText || line}</span>
                    </div>
                  );
                })}
            </div>
          ) : (
            <ul className="space-y-3 m-0 p-0 list-none">
              {content.split('\n').filter(line => line.trim()).map((line, i) => {
                const cleanLine = line.replace(/^\s*\*\s*/, '');
                const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

                return (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <span>
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <span key={j} className="font-semibold text-slate-100">{part.slice(2, -2)}</span>;
                        }
                        return part;
                      })}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <pre className="code-block flex-1 overflow-auto">
          <code className="text-foreground">{content}</code>
        </pre>
      )}
    </motion.div>
  );
};

export default ResultCard;
