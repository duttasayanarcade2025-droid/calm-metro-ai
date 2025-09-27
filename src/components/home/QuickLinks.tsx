import { Ticket, MapPin, Clock, Info } from "lucide-react";

const items = [
  { icon: Ticket, label: "Fares & Passes", href: "#" },
  { icon: MapPin, label: "Stations & Map", href: "#" },
  { icon: Clock, label: "Timings", href: "#" },
  { icon: Info, label: "Customer Support", href: "#" },
];

const QuickLinks = () => {
  return (
    <section className="container mx-auto px-6 py-6">
      <div className="glass rounded-xl p-6 shadow-metro">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((i) => (
            <a key={i.label} href={i.href} className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/60 p-3 hover:shadow-lg transition">
              <i.icon className="h-5 w-5 text-metro-cyan" />
              <span className="text-sm text-foreground">{i.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;


