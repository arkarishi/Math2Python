import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-16"
    >
      <div className="flex justify-center mb-6">
        <img
          src="/logo.png"
          alt="Math2Python"
          className="h-32 md:h-40 w-auto drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]"
        />
      </div>
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
        <span className="gradient-text">Math2Python</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
        Convert Research Math into Runnable Python
      </p>
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span className="inline-block w-2 h-2 rounded-full bg-aurora-cyan animate-pulse-glow" />
        <span>Powered by AI</span>
      </div>
    </motion.div>
  );
};

export default HeroSection;
