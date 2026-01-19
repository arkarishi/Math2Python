import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface ResultCardProps {
  title: string;
  content: string;
  type: "sympy" | "numpy" | "explanation";
  delay?: number;
}

const ResultCard = ({ title, content, type, delay = 0 }: ResultCardProps) => {
  const [copied, setCopied] = useState(false);

  const labelClass = {
    sympy: "card-label",
    numpy: "card-label-cyan",
    explanation: "card-label-blue",
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
      className="glass-card p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <span className={labelClass}>{title}</span>
        {type !== "explanation" && (
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

      {type === "explanation" ? (
        <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
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
