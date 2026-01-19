import { motion } from "framer-motion";
import ResultCard from "./ResultCard";

interface Results {
  sympy: string;
  numpy: string;
  explanation: string;
}

interface ResultsGridProps {
  results: Results | null;
}

const ResultsGrid = ({ results }: ResultsGridProps) => {
  if (!results) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ResultCard
          title="SymPy (Symbolic)"
          content={results.sympy}
          type="sympy"
          delay={0.1}
        />
        <ResultCard
          title="NumPy (Numerical)"
          content={results.numpy}
          type="numpy"
          delay={0.2}
        />
        <ResultCard
          title="Explanation"
          content={results.explanation}
          type="explanation"
          delay={0.3}
        />
      </div>
    </motion.div>
  );
};

export default ResultsGrid;
