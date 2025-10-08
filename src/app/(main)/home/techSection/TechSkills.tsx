


interface TechSkillsProps {
  children: React.ReactNode;
  className?: string;
}

function TechSkills({ children, className }: TechSkillsProps) {
  return (
    <div
      className={`tech-skill relative flex items-center space-x-3 ${className}`}
    >
      <span className="tech-dot w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50" />

      <h3 className="text-white text-[clamp(1.5rem,2.2vw,2rem)] tracking-wide font-semibold drop-shadow-sm">
        {children}
      </h3>
    </div>
  );
}

export default TechSkills;
