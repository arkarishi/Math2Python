import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  onConvert: () => void;
  isLoading: boolean;
}

const InputSection = ({ value, onChange, onConvert, isLoading }: InputSectionProps) => {
  const placeholderText = `Enter your LaTeX math expression here...

Example:
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}

or

\\sum_{n=1}^{N} \\frac{1}{n^2} \\approx \\frac{\\pi^2}{6}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto mb-16"
    >
      <div className="glass-card p-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholderText}
          className="glass-input min-h-[200px]"
          spellCheck={false}
        />
      </div>
      
      <motion.div
        className="flex justify-center mt-6"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <button
          onClick={onConvert}
          disabled={isLoading || !value.trim()}
          className="glow-button text-primary-foreground flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:transform-none"
        >
          <Sparkles className="w-5 h-5" />
          <span>{isLoading ? "Converting..." : "Convert to Code"}</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default InputSection;
