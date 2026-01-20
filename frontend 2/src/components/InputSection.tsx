import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  onConvert: () => void;
  onImageUpload: (file: File) => void;
  isLoading: boolean;
  framework: "numpy" | "pytorch";
  setFramework: (val: "numpy" | "pytorch") => void;
}

import { Upload } from "lucide-react";

const InputSection = ({ value, onChange, onConvert, onImageUpload, isLoading, framework, setFramework }: InputSectionProps) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        onImageUpload(file);
      }
    }
  };
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
      <div
        className={`glass-card p-2 transition-all duration-300 ${isDragging ? "border-primary shadow-[0_0_30px_rgba(139,92,246,0.3)] bg-white/5" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
        <div className="flex gap-4 items-center flex-wrap justify-center">
          {/* Framework Toggle */}
          <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
            <button
              onClick={() => setFramework("numpy")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${framework === "numpy"
                ? "bg-aurora-blue text-white shadow-lg"
                : "text-gray-400 hover:text-white"
                }`}
            >
              NumPy
            </button>
            <button
              onClick={() => setFramework("pytorch")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${framework === "pytorch"
                ? "bg-orange-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
                }`}
            >
              PyTorch
            </button>
          </div>

          <label className="glow-button text-primary-foreground flex items-center gap-3 cursor-pointer hover:bg-white/10">
            <Upload className="w-5 h-5" />
            <span className="hidden sm:inline">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading}
            />
          </label>

          <button
            onClick={onConvert}
            disabled={isLoading || !value.trim()}
            className="glow-button text-primary-foreground flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:transform-none"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isLoading ? "Converting..." : framework === "pytorch" ? "Convert to PyTorch" : "Convert to Code"}</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InputSection;
