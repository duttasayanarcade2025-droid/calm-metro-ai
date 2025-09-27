import { useState } from "react";
import { motion } from "framer-motion";

type TrainsetCardProps = {
  id: string;
  rank: number;
  title: string;
  subtitle?: string;
  onClick?: () => void;
};

const TrainsetCard = ({ id, rank, title, subtitle, onClick }: TrainsetCardProps) => {
  const [style, setStyle] = useState({ transform: "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)" });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ transform: `perspective(700px) rotateX(${(-py * 6)}deg) rotateY(${px * 8}deg) translateZ(8px)` });
  };
  const onLeave = () => setStyle({ transform: "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)" });

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.02 }}
      style={style}
      onClick={onClick}
      className="glass rounded-xl p-4 shadow-metro cursor-pointer select-none"
    >
      <div className="text-xs text-muted-foreground">Rank #{rank}</div>
      <div className="text-lg font-semibold text-foreground">{title}</div>
      {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
    </motion.div>
  );
};

export default TrainsetCard;


