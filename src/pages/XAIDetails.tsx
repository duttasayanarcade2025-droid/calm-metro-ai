import { Suspense } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { RadialGauge, BarGauge } from "@/components/xai/Gauges";
import SceneCanvas from "@/components/three/SceneCanvas";
import TrainModel from "@/components/three/TrainModel";

const XAIDetails = () => {
  const { trainId } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="min-h-screen relative"
    >
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-metro-deep via-background to-metro-surface" />

      <div className="container mx-auto px-6 py-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-xl p-6 shadow-deep"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Explainable AI — Train {trainId}</h1>
            <span className="text-sm text-muted-foreground">Interactive 3D model and variables</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="lg:col-span-2 glass rounded-xl p-0 shadow-metro min-h-[420px] overflow-hidden"
          >
            <div className="h-[480px]">
              <Suspense fallback={<div className="h-full grid place-items-center text-muted-foreground">Loading 3D model…</div>}>
                <SceneCanvas camera={{ position: [4, 2, 6], fov: 45 }}>
                  <TrainModel scale={1.2} />
                </SceneCanvas>
              </Suspense>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass rounded-xl p-6 shadow-metro"
          >
            <h2 className="text-lg font-semibold mb-4">Key Variables</h2>
            <div className="grid grid-cols-2 gap-4">
              <RadialGauge label="Headway" value={78} />
              <RadialGauge label="Energy" value={64} />
              <BarGauge label="Turnaround" value={72} />
              <BarGauge label="Dwell" value={55} />
            </div>
            <div className="mt-4">
              <button className="relative overflow-hidden group px-4 py-2 rounded-md bg-secondary/60 border border-border/50">
                <span className="absolute inset-0 bg-gradient-to-r from-metro-cyan to-metro-teal translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 opacity-20" />
                <span className="relative text-sm text-foreground">Run What-If Simulation</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default XAIDetails;


