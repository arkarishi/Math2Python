const AuroraBackground = () => {
  return (
    <div className="aurora-bg" aria-hidden="true">
      {/* Additional floating orbs for depth */}
      <div 
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(271 91% 65%) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'aurora-float 15s ease-in-out infinite reverse',
        }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(187 96% 42%) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'aurora-float 18s ease-in-out infinite',
        }}
      />
    </div>
  );
};

export default AuroraBackground;
