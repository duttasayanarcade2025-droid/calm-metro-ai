import HeroSection from "@/components/HeroSection";
import MetroMap from "@/components/MetroMap";
import { motion } from "framer-motion";
import ServiceStatus from "@/components/home/ServiceStatus";
import NewsHighlights from "@/components/home/NewsHighlights";
import QuickLinks from "@/components/home/QuickLinks";
import PlanYourJourney from "@/components/home/PlanYourJourney";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="min-h-screen"
    >
      <HeroSection />
      <MetroMap />
      <ServiceStatus />
      <QuickLinks />
      <NewsHighlights />
      <PlanYourJourney />
      <Footer />
    </motion.div>
  );
};

export default Index;
