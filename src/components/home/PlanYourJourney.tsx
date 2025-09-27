import { ArrowRight, MapPin, Clock } from "lucide-react";

const PlanYourJourney = () => {
  return (
    <section className="bg-gradient-to-r from-metro-cyan/10 to-metro-teal/10 border-y border-border/50">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Plan Your Journey</h2>
          <p className="text-sm text-muted-foreground">Check timings, stations and fares to plan an optimal trip.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <a className="glass rounded-lg p-3 flex items-center gap-2 hover:shadow-lg transition" href="#">
            <MapPin className="h-5 w-5 text-metro-cyan" />
            <span className="text-sm text-foreground">Stations Map</span>
          </a>
          <a className="glass rounded-lg p-3 flex items-center gap-2 hover:shadow-lg transition" href="#">
            <Clock className="h-5 w-5 text-metro-cyan" />
            <span className="text-sm text-foreground">Timings</span>
          </a>
        </div>
        <div className="text-right">
          <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition">
            Get Started <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PlanYourJourney;


