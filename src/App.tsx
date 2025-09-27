import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
=======
>>>>>>> b62f358138f394885c6991f0be804cb520b5b9ee
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
import AIProcessing from "./pages/AIProcessing";
import XAIDetails from "./pages/XAIDetails";
import { AuthProvider, ProtectedRoute } from "@/hooks/useAuth";
=======
>>>>>>> b62f358138f394885c6991f0be804cb520b5b9ee

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
<<<<<<< HEAD
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/ai-processing" element={<ProtectedRoute><AIProcessing /></ProtectedRoute>} />
            <Route path="/xai/:trainId" element={<ProtectedRoute><XAIDetails /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
=======
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
>>>>>>> b62f358138f394885c6991f0be804cb520b5b9ee
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
