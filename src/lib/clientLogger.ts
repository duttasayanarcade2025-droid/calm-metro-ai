export type ClientLogLevel = "info" | "warn" | "error";

export async function clientLog(level: ClientLogLevel, message: string, data?: unknown) {
  try {
    await fetch("/_client-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, message, data }),
    });
  } catch {
    // swallow
  }
}


