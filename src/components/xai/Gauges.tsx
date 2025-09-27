import { useEffect, useState } from "react";

type GaugeProps = {
  label: string;
  value: number; // 0..100
  color?: string;
};

export const RadialGauge = ({ label, value, color = "#54e3ff" }: GaugeProps) => {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 50);
    return () => clearTimeout(t);
  }, [value]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - animated / 100);

  return (
    <div className="glass rounded-xl p-4 shadow-metro">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} stroke="#1f2a37" strokeWidth="8" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text x="50" y="54" textAnchor="middle" fill="currentColor" className="text-sm">
          {animated}%
        </text>
      </svg>
      <div className="mt-2 text-sm text-muted-foreground text-center">{label}</div>
    </div>
  );
};

export const BarGauge = ({ label, value, color = "#54e3ff" }: GaugeProps) => {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 50);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="glass rounded-xl p-4 shadow-metro">
      <div className="h-3 w-full bg-[hsl(var(--muted))] rounded">
        <div className="h-3 rounded" style={{ width: `${animated}%`, background: color, transition: "width 0.6s ease" }} />
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
};


