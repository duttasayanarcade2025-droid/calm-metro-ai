import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type TelemetryPoint = {
  id: string;
  trainset_id: string;
  x: number;
  y: number;
  z: number;
  updated_at: string;
};

export const useTelemetry = () => {
  const [points, setPoints] = useState<TelemetryPoint[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!supabase) return;
      const { data } = await supabase.from("telemetry").select("id,trainset_id,x,y,z,updated_at").order("updated_at", { ascending: false }).limit(50);
      if (mounted && data) setPoints(data as TelemetryPoint[]);
    };
    load();
    if (!supabase) return;
    const channel = supabase.channel("telemetry-stream").on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "telemetry" },
      (payload) => {
        setPoints((prev) => [payload.new as TelemetryPoint, ...prev].slice(0, 50));
      },
    ).subscribe();
    return () => {
      mounted = false;
      channel.unsubscribe();
    };
  }, []);

  return points;
};


