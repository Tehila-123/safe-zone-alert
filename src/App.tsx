import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PoliceDashboard from "./pages/police/PoliceDashboard";
import AccidentDetails from "./pages/police/AccidentDetails";
import DispatchUnit from "./pages/police/DispatchUnit";
import NotFound from "./pages/NotFound";
import { AccidentProvider } from "./context/AccidentContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AccidentProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/police" replace />} />
            <Route path="/police" element={<PoliceDashboard />} />
            <Route path="/police/accident/:id" element={<AccidentDetails />} />
            <Route path="/police/accident/:id/dispatch" element={<DispatchUnit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AccidentProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
