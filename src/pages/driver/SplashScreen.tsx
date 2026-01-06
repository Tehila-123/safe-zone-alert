import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import carHero from "@/assets/car-hero.png";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container safe-area-inset flex flex-col min-h-screen justify-between">
      {/* Logo and Tagline */}
      <div className="pt-16 animate-fade-in">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">Gerayo</h1>
        <p className="text-muted-foreground mt-1">Gerayo Ambulance</p>
      </div>

      {/* Hero Car Image */}
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="relative animate-float">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl" />
          <img 
            src={carHero} 
            alt="Gerayo Safety Car" 
            className="relative w-full max-w-sm object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pb-12 space-y-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/register")}
        >
          GET STARTED
        </Button>
        <Button 
          variant="heroOutline" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/login")}
        >
          ALREADY HAVE AN ACCOUNT
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;