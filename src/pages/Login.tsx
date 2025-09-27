import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { clientLog } from "@/lib/clientLogger";

const Login = () => {
  const [supervisorId, setSupervisorId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const email = supervisorId.includes("@") ? supervisorId : `${supervisorId}@example.com`;
    clientLog("info", "auth.signin.attempt", { email, password: password ? "********" : "<empty>" });
    const { error } = await signIn(email, password);
    setIsLoading(false);
    if (!error) {
      clientLog("info", "auth.signin.success", { email });
      window.location.replace("/dashboard");
      return;
    }
    // Soft dev bypass path: if using the known dev email/password, set a flag and route
    if (email === "29febsayan@gmail.com" && password === "12345678") {
      clientLog("warn", "auth.signin.dev_bypass", { email });
      localStorage.setItem("dev_session", "1");
      window.location.replace("/dashboard");
      return;
    }
    clientLog("error", "auth.signin.failed", { email, error: String(error) });
  };

  const handleCreate = async () => {
    if (!supervisorId || !password) return;
    setIsLoading(true);
    const email = `${supervisorId}@example.com`;
    clientLog("info", "auth.signup.attempt", { email, password: password ? "********" : "<empty>" });
    const { error } = await signUp(email, password);
    setIsLoading(false);
    if (!error) {
      toast({ title: "Signup successful", description: "Check your inbox to confirm (if required)" });
      // After signup, attempt sign-in
      clientLog("info", "auth.signup.success", { email });
      const r = await signIn(email, password);
      if (!r.error) {
        clientLog("info", "auth.post_signup_signin.success", { email });
        window.location.href = "/dashboard";
      } else {
        clientLog("error", "auth.post_signup_signin.failed", { email, error: String(r.error) });
      }
    } else {
      clientLog("error", "auth.signup.failed", { email, error: String(error) });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-metro-deep via-background to-metro-surface p-4"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-metro-cyan/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-metro-teal/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md backdrop-blur-md bg-card/80 border-border/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              KMRL Mission Control
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              AI-Driven Train Induction Planning System
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supervisor-id" className="text-foreground">
                  Supervisor ID
                </Label>
                <Input
                  id="supervisor-id"
                  type="text"
                  placeholder="Enter your supervisor ID"
                  value={supervisorId}
                  onChange={(e) => setSupervisorId(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-metro-cyan transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-metro-cyan transition-all duration-300"
                  required
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-all duration-300 relative overflow-hidden group"
                  disabled={isLoading}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-metro-cyan to-metro-teal opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <span className="relative">
                    {isLoading ? "Authenticating..." : "Access Mission Control"}
                  </span>
                </Button>
              </motion.div>
              <div className="flex justify-between text-xs">
                <button type="button" onClick={handleCreate} className="text-metro-cyan hover:underline">Create account</button>
                <span className="text-muted-foreground">Use your supervisor ID</span>
              </div>
            </form>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Authorized personnel only. All activities are monitored.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Login;