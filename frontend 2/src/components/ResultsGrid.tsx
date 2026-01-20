import { motion } from "framer-motion";
import ResultCard from "./ResultCard";
import { Download } from "lucide-react";

interface Results {
  sympy: string;
  numpy: string;
  explanation: string;
  complexity: string;
}

interface ResultsGridProps {
  results: Results | null;
  framework: "numpy" | "pytorch";
}

const generateNotebookJSON = (results: Results) => {
  return {
    "cells": [
      {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
          "# Math2Python Optimization Solver\n",
          "\n",
          "## Explanation\n",
          results.explanation
        ]
      },
      {
        "cell_type": "code",
        "execution_count": null,
        "metadata": {},
        "outputs": [],
        "source": [
          "# Symbolic Representation (SymPy)\n",
          results.sympy
        ]
      },
      {
        "cell_type": "code",
        "execution_count": null,
        "metadata": {},
        "outputs": [],
        "source": [
          "# Numerical Implementation\n",
          results.numpy
        ]
      }
    ],
    "metadata": {
      "kernelspec": {
        "display_name": "Python 3",
        "language": "python",
        "name": "python3"
      },
      "language_info": {
        "codemirror_mode": {
          "name": "ipython",
          "version": 3
        },
        "file_extension": ".py",
        "mimetype": "text/x-python",
        "name": "python",
        "nbconvert_exporter": "python",
        "pygments_lexer": "ipython3",
        "version": "3.8.5"
      }
    },
    "nbformat": 4,
    "nbformat_minor": 4
  };
};

const ResultsGrid = ({ results, framework }: ResultsGridProps) => {
  if (!results) return null;

  const downloadNotebook = () => {
    const notebook = generateNotebookJSON(results);
    const blob = new Blob([JSON.stringify(notebook, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimization_solver.ipynb";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadNotebook}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-gray-300 hover:text-white"
        >
          <Download className="w-4 h-4" />
          Download .ipynb
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ResultCard
          title="SymPy (Symbolic)"
          content={results.sympy}
          type="sympy"
          delay={0.1}
        />
        <ResultCard
          title={framework === "pytorch" ? "PyTorch (Numerical)" : "NumPy (Numerical)"}
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
        <ResultCard
          title="Complexity Analysis"
          content={results.complexity}
          type="complexity"
          delay={0.4}
          className="lg:col-span-3"
        />
      </div>
    </motion.div>
  );
};

export default ResultsGrid;
