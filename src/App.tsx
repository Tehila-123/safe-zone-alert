import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/driver/SplashScreen";
import RegisterScreen from "./pages/driver/RegisterScreen";
import LoginScreen from "./pages/driver/LoginScreen";
import VerifyPhoneScreen from "./pages/driver/VerifyPhoneScreen";
import ForgotPasswordScreen from "./pages/driver/ForgotPasswordScreen";
import HomeScreen from "./pages/driver/HomeScreen";
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
            <Route path="/" element={<SplashScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/verify-phone" element={<VerifyPhoneScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/police" element={<PoliceDashboard />} />
            <Route path="/police/accident/:id" element={<AccidentDetails />} />
            <Route path="/police/accident/:id/dispatch" element={<DispatchUnit />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AccidentProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
