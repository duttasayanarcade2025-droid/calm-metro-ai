import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

type StatusItem = { line: string; status: "Normal" | "Delay" | "Notice"; note?: string };

const sample: StatusItem[] = [
  { line: "Blue Line", status: "Normal", note: "All services on time" },
  { line: "Green Line", status: "Delay", note: "5–10 min delay near M.G Road" },
  { line: "Airport Link", status: "Notice", note: "Maintenance after 22:00" },
];

const Badge = ({ status }: { status: StatusItem["status"] }) => {
  if (status === "Normal") return (
    <span className="inline-flex items-center gap-1 text-xs text-green-400">
      <CheckCircle2 className="h-4 w-4" /> Normal
    </span>
  );
  if (status === "Delay") return (
    <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
      <AlertTriangle className="h-4 w-4" /> Delay
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-xs text-cyan-300">
      <Info className="h-4 w-4" /> Notice
    </span>
  );
};

const ServiceStatus = () => {
  return (
    <section className="container mx-auto px-6 py-10">
      <div className="glass rounded-xl p-6 shadow-metro">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Service Status</h2>
          <a href="#" className="text-sm text-metro-cyan hover:underline">View Details</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sample.map((s) => (
            <div key={s.line} className="rounded-lg border border-border/50 bg-card/60 p-4">
              <div className="flex items-center justify-between">
                <div className="text-foreground font-medium">{s.line}</div>
                <Badge status={s.status} />
              </div>
              {s.note && <div className="text-xs text-muted-foreground mt-2">{s.note}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceStatus;


