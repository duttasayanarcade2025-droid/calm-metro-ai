import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signUp: (email: string, password: string) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
  signInMagic?: (email: string) => Promise<{ error?: Error }>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    const init = async () => {
      const devFlag = localStorage.getItem("dev_session");
      console.log("Auth init - devFlag:", devFlag);
      
      // If we have a dev session flag, use it immediately
      if (devFlag) {
        console.log("Using dev session");
        setSession({} as Session);
        setUser(null);
        setLoading(false);
        return;
      }
      
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
      
      const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
        setSession(s);
        setUser(s?.user ?? null);
      });
      unsub = () => sub.subscription.unsubscribe();
    };
    init();
    return () => {
      unsub?.();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    session,
    loading,
    signIn: async (email: string, password: string) => {
      // Early dev bypass to avoid hitting Supabase when using known dev creds
      if (email === "29febsayan@gmail.com" && password === "12345678") {
        console.log("Dev credentials detected, setting dev session");
        localStorage.setItem("dev_session", "1");
        setSession({} as Session);
        return {};
      }
      if (!supabase) {
        if (email && password) {
          localStorage.setItem("dev_session", "1");
          setSession({} as Session);
          return {};
        }
        return { error: new Error("Missing credentials") };
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error ?? undefined };
    },
    signInMagic: async (email: string) => {
      if (!supabase) return {};
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/login` } });
      return { error: error ?? undefined };
    },
    signOut: async () => {
      if (!supabase) {
        localStorage.removeItem("dev_session");
        setSession(null);
        setUser(null);
        return;
      }
      await supabase.auth.signOut();
    },
    signUp: async (email: string, password: string) => {
      if (!supabase) {
        // Simulate success
        return {};
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      return { error: error ?? undefined };
    },
  }), [user, session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  console.log("ProtectedRoute - session:", !!session, "loading:", loading);
  if (loading) return <div className="min-h-screen grid place-items-center text-muted-foreground">Checking authentication…</div>;
  if (!session) {
    console.log("No session, redirecting to login");
    window.location.href = "/login";
    return null;
  }
  return children;
};


