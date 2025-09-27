import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TrainsetCard from "@/components/Results/TrainsetCard";

type Trainset = { id: string; title: string; subtitle?: string };

const MOCK_RESULTS: Trainset[] = [
  { id: "TS-001", title: "Trainset TS-001", subtitle: "Priority Window 06:00 - 08:00" },
  { id: "TS-014", title: "Trainset TS-014", subtitle: "Energy Optimal Slot" },
  { id: "TS-008", title: "Trainset TS-008", subtitle: "Branding Required" },
  { id: "TS-003", title: "Trainset TS-003", subtitle: "Maintenance Hold" },
];

const AIProcessing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="min-h-screen grid place-items-center bg-gradient-to-br from-metro-deep via-background to-metro-surface p-6"
      >
        <div className="glass rounded-xl p-10 text-center shadow-metro" style={{ filter: "url(#goo)" }}>
          <motion.div
            className="mx-auto mb-6 h-16 w-16 rounded-full border-2 border-metro-cyan"
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <div className="text-xl font-semibold text-foreground">Generating AI Induction Plan…</div>
          <div className="mt-2 text-sm text-muted-foreground">Optimizing schedule, resources, and routing</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="min-h-screen bg-gradient-to-br from-metro-deep via-background to-metro-surface"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">AI Results: Ranked Trainsets</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Sort:</span>
            <button className="underline-offset-4 hover:underline">Rank</button>
            <button className="underline-offset-4 hover:underline">Energy</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_RESULTS.map((t, i) => (
            <TrainsetCard
              key={t.id}
              id={t.id}
              rank={i + 1}
              title={t.title}
              subtitle={t.subtitle}
              onClick={() => navigate(`/xai/${encodeURIComponent(t.id)}`)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AIProcessing;


