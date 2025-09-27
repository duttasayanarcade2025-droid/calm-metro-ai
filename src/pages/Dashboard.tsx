import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { 
  Clock, 
  Train, 
  Settings, 
  Wrench, 
  Sparkles, 
  MapPin,
  Activity,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setBrandingPriority, overrideJobCard, addManualOverride, setCleaningSlot as supaSetCleaningSlot, getDashboardStats } from "@/lib/kmrl";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [jobCardId, setJobCardId] = useState("");
  const [trainsetNumber, setTrainsetNumber] = useState("");
  const [highPriority, setHighPriority] = useState(false);
  const [selectedTrainset, setSelectedTrainset] = useState("");
  const [operationalNote, setOperationalNote] = useState("");
  const [cleaningSlot, setCleaningSlot] = useState("");

  const handleGeneratePlan = () => {
    navigate("/ai-processing");
  };

  const brandingMutation = useMutation({
    mutationFn: async () => setBrandingPriority(trainsetNumber, highPriority),
    onSuccess: () => toast({ title: "Branding priority updated" }),
    onError: () => toast({ title: "Failed to update branding", variant: "destructive" }),
  });

  const jobCardMutation = useMutation({
    mutationFn: async () => overrideJobCard(jobCardId),
    onSuccess: () => toast({ title: "Job card overridden" }),
    onError: () => toast({ title: "Failed to override job card", variant: "destructive" }),
  });

  const manualOverrideMutation = useMutation({
    mutationFn: async () => addManualOverride(selectedTrainset, operationalNote),
    onSuccess: () => toast({ title: "Manual override added" }),
    onError: () => toast({ title: "Failed to add override", variant: "destructive" }),
  });

  const cleaningBlockMutation = useMutation({
    mutationFn: async () => supaSetCleaningSlot(cleaningSlot, "block"),
    onSuccess: () => toast({ title: "Cleaning slot blocked" }),
    onError: () => toast({ title: "Failed to block slot", variant: "destructive" }),
  });

  const cleaningOpenMutation = useMutation({
    mutationFn: async () => supaSetCleaningSlot(cleaningSlot, "open"),
    onSuccess: () => toast({ title: "Cleaning slot opened" }),
    onError: () => toast({ title: "Failed to open slot", variant: "destructive" }),
  });

  const handleSubmit = async (moduleType: string) => {
    try {
      if (moduleType === "branding") await brandingMutation.mutateAsync();
      if (moduleType === "job-card") await jobCardMutation.mutateAsync();
      if (moduleType === "manual-override") await manualOverrideMutation.mutateAsync();
      if (moduleType === "cleaning-block") await cleaningBlockMutation.mutateAsync();
      if (moduleType === "cleaning-open") await cleaningOpenMutation.mutateAsync();
    } catch (e) {
      console.error(e);
    }
  };

  const { toast } = useToast();

  const SceneCanvas = lazy(() => import("@/components/three/SceneCanvas"));
  const KmrlNetwork = lazy(() => import("@/components/three/KmrlNetwork"));

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    refetchInterval: 15000,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="min-h-screen bg-gradient-to-br from-metro-deep via-background to-metro-surface relative"
    >
      {/* 3D Background */}
      <Suspense fallback={null}>
        <div className="fixed inset-0 -z-10">
          <SceneCanvas>
            <KmrlNetwork />
          </SceneCanvas>
        </div>
      </Suspense>
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Train className="h-8 w-8 text-metro-cyan" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">KMRL Mission Control</h1>
                <p className="text-sm text-muted-foreground">AI-Driven Train Induction Planning System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-sm text-foreground">System Online</span>
              </div>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Train, label: "Active Trains", value: String(stats?.activeTrains ?? 0), color: "text-metro-cyan" },
            { icon: Clock, label: "Pending Jobs", value: String(stats?.pendingJobs ?? 0), color: "text-orange-500" },
            { icon: Settings, label: "Maintenance", value: String(stats?.maintenance ?? 0), color: "text-yellow-500" },
            { icon: Zap, label: "Priority Tasks", value: String(stats?.priorityTasks ?? 0), color: "text-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass hover:shadow-lg transition-all duration-300">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Control Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Job-Card Override */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wrench className="h-5 w-5 text-metro-cyan" />
                  <span>Job-Card Override</span>
                </CardTitle>
                <CardDescription>
                  Manually close or flag work orders from EAM
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="job-card-id">Job Card ID</Label>
                  <Input
                    id="job-card-id"
                    placeholder="Enter job card ID"
                    value={jobCardId}
                    onChange={(e) => setJobCardId(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <Button 
                  onClick={() => handleSubmit("job-card")}
                  disabled={!jobCardId || jobCardMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 bg-gradient-to-r from-metro-cyan to-metro-teal opacity-20 transition-transform duration-300" />
                  <span className="relative">Override Job Card</span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Branding Priority Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-metro-cyan" />
                  <span>Branding Priority</span>
                </CardTitle>
                <CardDescription>
                  Set high priority for specific trainsets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="trainset-number">Trainset Number</Label>
                  <Input
                    id="trainset-number"
                    placeholder="Enter trainset number"
                    value={trainsetNumber}
                    onChange={(e) => setTrainsetNumber(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={highPriority}
                    onCheckedChange={setHighPriority}
                  />
                  <Label>High Priority</Label>
                </div>
                <Button 
                  onClick={() => handleSubmit("branding")}
                  disabled={!trainsetNumber || brandingMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 bg-gradient-to-r from-metro-cyan to-metro-teal opacity-20 transition-transform duration-300" />
                  <span className="relative">Set Priority</span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Manual Override */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-metro-cyan" />
                  <span>Manual Override</span>
                </CardTitle>
                <CardDescription>
                  Add operational notes for specific trainsets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="select-trainset">Select Trainset</Label>
                  <Select value={selectedTrainset} onValueChange={setSelectedTrainset}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Choose trainset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ts-001">TS-001</SelectItem>
                      <SelectItem value="ts-002">TS-002</SelectItem>
                      <SelectItem value="ts-003">TS-003</SelectItem>
                      <SelectItem value="ts-004">TS-004</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="operational-note">Operational Note</Label>
                  <Textarea
                    id="operational-note"
                    placeholder="e.g., Hold for VIP movement"
                    value={operationalNote}
                    onChange={(e) => setOperationalNote(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <Button 
                  onClick={() => handleSubmit("manual-override")}
                  disabled={!selectedTrainset || !operationalNote || manualOverrideMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 bg-gradient-to-r from-metro-cyan to-metro-teal opacity-20 transition-transform duration-300" />
                  <span className="relative">Apply Override</span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cleaning Slot Adjustment */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-metro-cyan" />
                  <span>Cleaning Slot Adjustment</span>
                </CardTitle>
                <CardDescription>
                  Block or open cleaning bay slots
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cleaning-slot">Cleaning Bay Slot</Label>
                  <Select value={cleaningSlot} onValueChange={setCleaningSlot}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select cleaning bay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bay-a">Bay A</SelectItem>
                      <SelectItem value="bay-b">Bay B</SelectItem>
                      <SelectItem value="bay-c">Bay C</SelectItem>
                      <SelectItem value="bay-d">Bay D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleSubmit("cleaning-block")}
                    disabled={!cleaningSlot || cleaningBlockMutation.isPending}
                    className="bg-background/50 group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 bg-gradient-to-r from-metro-cyan to-metro-teal opacity-10 transition-transform duration-300" />
                    <span className="relative">Block Slot</span>
                  </Button>
                  <Button 
                    onClick={() => handleSubmit("cleaning-open")}
                    disabled={!cleaningSlot || cleaningOpenMutation.isPending}
                    className="bg-primary hover:bg-primary/90 group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 bg-gradient-to-r from-metro-cyan to-metro-teal opacity-20 transition-transform duration-300" />
                    <span className="relative">Open Slot</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Generate Plan Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={handleGeneratePlan}
            size="lg"
            className="px-12 py-6 text-lg bg-gradient-to-r from-metro-cyan to-metro-teal hover:from-metro-cyan/90 hover:to-metro-teal/90 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow-pulse"
          >
            <Sparkles className="mr-2 h-6 w-6" />
            Generate AI Induction Plan
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;