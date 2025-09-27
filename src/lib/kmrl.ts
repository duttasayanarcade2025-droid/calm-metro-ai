import { supabase } from "@/lib/supabase";
import { clientLog } from "@/lib/clientLogger";

export async function setBrandingPriority(trainsetNumber: string, highPriority: boolean) {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase
    .from("trainsets")
    .upsert({ id: trainsetNumber, branding_priority: highPriority, updated_at: new Date().toISOString() }, { onConflict: "id" });
  if (error) {
    clientLog("error", "db.trainsets.upsert.failed", { trainsetNumber, highPriority, error: String(error.message || error) });
    throw error;
  }
  clientLog("info", "db.trainsets.upsert.ok", { trainsetNumber, highPriority });
}

export async function overrideJobCard(jobCardId: string) {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase
    .from("jobs")
    .update({ status: "overridden", overridden_at: new Date().toISOString() })
    .eq("id", jobCardId);
  if (error) {
    clientLog("error", "db.jobs.update.failed", { jobCardId, error: String(error.message || error) });
    throw error;
  }
  clientLog("info", "db.jobs.update.ok", { jobCardId });
}

export async function addManualOverride(trainsetId: string, note: string) {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase
    .from("overrides")
    .insert({ trainset_id: trainsetId, note, created_at: new Date().toISOString() });
  if (error) {
    clientLog("error", "db.overrides.insert.failed", { trainsetId, error: String(error.message || error) });
    throw error;
  }
  clientLog("info", "db.overrides.insert.ok", { trainsetId });
}

export async function setCleaningSlot(slotId: string, action: "block" | "open") {
  if (!supabase) throw new Error("Supabase not configured");
  const blocked = action === "block";
  const { error } = await supabase
    .from("cleaning_slots")
    .upsert({ id: slotId, blocked, updated_at: new Date().toISOString() }, { onConflict: "id" });
  if (error) {
    clientLog("error", "db.cleaning_slots.upsert.failed", { slotId, blocked, error: String(error.message || error) });
    throw error;
  }
  clientLog("info", "db.cleaning_slots.upsert.ok", { slotId, blocked });
}

export async function getDashboardStats() {
  if (!supabase) throw new Error("Supabase not configured");
  const [{ count: activeTrains }, { count: pendingJobs }, { count: maintenance } ] = await Promise.all([
    supabase.from("trainsets").select("id", { count: "exact", head: true }),
    supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "open"),
    supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "maintenance"),
  ]);
  return {
    activeTrains: activeTrains ?? 0,
    pendingJobs: pendingJobs ?? 0,
    maintenance: maintenance ?? 0,
    priorityTasks: 0,
  };
}


