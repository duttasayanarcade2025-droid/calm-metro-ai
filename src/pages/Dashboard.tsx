import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
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

  const handleSubmit = (moduleType: string) => {
    // Submit logic here - will connect to backend later
    console.log(`Submitting ${moduleType} module`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-metro-deep via-background to-metro-surface">
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
            { icon: Train, label: "Active Trains", value: "12", color: "text-metro-cyan" },
            { icon: Clock, label: "Pending Jobs", value: "8", color: "text-orange-500" },
            { icon: Settings, label: "Maintenance", value: "3", color: "text-yellow-500" },
            { icon: Zap, label: "Priority Tasks", value: "2", color: "text-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
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
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
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
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Override Job Card
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
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
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
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Set Priority
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
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
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
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Apply Override
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
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
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
                    className="bg-background/50"
                  >
                    Block Slot
                  </Button>
                  <Button 
                    onClick={() => handleSubmit("cleaning-open")}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Open Slot
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
    </div>
  );
};

export default Dashboard;