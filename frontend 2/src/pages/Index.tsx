import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import InputSection from "@/components/InputSection";
import ResultsGrid from "@/components/ResultsGrid";
import AuroraBackground from "@/components/AuroraBackground";

interface Results {
  sympy: string;
  numpy: string;
  explanation: string;
}

// Real conversion function - Calls Python Backend
const convertToCode = async (latex: string, imageBase64?: string): Promise<Results> => {
  const response = await fetch("http://127.0.0.1:8000/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      equation: latex || "Image Uploaded", // Fallback text if just image 
      image_data: imageBase64
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to convert equation");
  }

  return response.json();
};

const Index = () => {
  const [latexInput, setLatexInput] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Convert file to Base64
  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string ? (reader.result as string).split(',')[1] : "");
    reader.onerror = error => reject(error);
  });

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setResults(null);
    try {
      const base64 = await toBase64(file);
      const convertedResults = await convertToCode("", base64);
      setResults(convertedResults);
    } catch (error) {
      console.error("Image conversion failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvert = async () => {
    if (!latexInput.trim()) return;

    setIsLoading(true);
    setResults(null);

    try {
      const convertedResults = await convertToCode(latexInput);
      setResults(convertedResults);
    } catch (error) {
      console.error("Conversion failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <AuroraBackground />

      <main className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <HeroSection />

        <InputSection
          value={latexInput}
          onChange={setLatexInput}
          onConvert={handleConvert}
          onImageUpload={handleImageUpload}
          isLoading={isLoading}
        />

        <ResultsGrid results={results} />
      </main>

      {/* Footer accent */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aurora-purple/30 to-transparent" />
    </div>
  );
};

export default Index;
