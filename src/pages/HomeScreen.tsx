import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import carHero from "@/assets/car-hero.png";

type ScreenState = "monitoring" | "accident-detected" | "alert-sent";

const HomeScreen: React.FC = () => {
  const { toast } = useToast();
  const [screenState, setScreenState] = useState<ScreenState>("monitoring");
  const [countdown, setCountdown] = useState(10);
  const [speed] = useState(52);
  const [isLocationOn] = useState(true);

  // Countdown timer for accident detected state
  useEffect(() => {
    if (screenState === "accident-detected" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (screenState === "accident-detected" && countdown === 0) {
      // Alert sent automatically
      setScreenState("alert-sent");
      toast({
        title: "🚨 Emergency Alert Sent!",
        description: "Police and emergency services have been notified.",
      });
    }
  }, [screenState, countdown, toast]);

  const handleStop = () => {
    toast({
      title: "System Stopped",
      description: "Accident detection has been paused.",
    });
  };

  const handleCancelAlert = () => {
    setScreenState("monitoring");
    setCountdown(10);
    toast({
      title: "Alert Cancelled",
      description: "Emergency alert was cancelled.",
    });
  };

  // For demo: simulate accident detection
  const simulateAccident = () => {
    setScreenState("accident-detected");
    setCountdown(10);
  };

  const resetToMonitoring = () => {
    setScreenState("monitoring");
    setCountdown(10);
  };

  // Monitoring Screen (Default Home)
  if (screenState === "monitoring") {
    return (
      <div className="mobile-container safe-area-inset flex flex-col min-h-screen">
        {/* Header with Logo */}
        <header className="flex flex-col items-center pt-8 pb-6 animate-fade-in">
          <img 
            src={carHero} 
            alt="Gerayo Logo" 
            className="w-20 h-20 object-contain mb-3"
          />
          <h1 className="text-3xl font-bold text-foreground">Gerayo</h1>
          <p className="text-sm text-muted-foreground mt-1">Accident Detection System</p>
        </header>

        {/* Status Indicators */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
          {/* System Status */}
          <div className="w-full max-w-sm bg-secondary/50 rounded-2xl p-4 text-center animate-scale-in">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🟢</span>
              <div>
                <p className="text-sm text-muted-foreground">System Status:</p>
                <p className="text-xl font-bold text-success">ACTIVE</p>
              </div>
            </div>
          </div>

          {/* Location Status */}
          <div className="w-full max-w-sm bg-secondary/50 rounded-2xl p-4 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">📍</span>
              <p className="text-lg font-semibold text-foreground">
                Location: <span className={isLocationOn ? "text-success" : "text-destructive"}>{isLocationOn ? "ON" : "OFF"}</span>
              </p>
            </div>
          </div>

          {/* Speed */}
          <div className="w-full max-w-sm bg-secondary/50 rounded-2xl p-4 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">🧭</span>
              <p className="text-lg font-semibold text-foreground">
                Speed: <span className="text-primary">{speed} km/h</span>
              </p>
            </div>
          </div>

          {/* Accident Detection Status */}
          <div className="w-full max-w-sm bg-secondary/50 rounded-2xl p-4 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">🛡️</span>
              <p className="text-lg font-semibold text-foreground">
                Accident Detection: <span className="text-success">ON</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stop Button */}
        <div className="pb-8 px-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={handleStop}
            className="w-full py-5 rounded-2xl bg-destructive hover:bg-destructive/90 transition-all duration-200 active:scale-95"
          >
            <span className="text-2xl font-bold text-destructive-foreground uppercase tracking-wider">
              STOP
            </span>
          </button>
          
          {/* Demo button - remove in production */}
          <button
            onClick={simulateAccident}
            className="w-full mt-3 py-3 rounded-xl bg-warning/20 hover:bg-warning/30 transition-all duration-200 border border-warning/50"
          >
            <span className="text-sm font-medium text-warning">
              🔧 Demo: Simulate Accident
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Accident Detected Screen
  if (screenState === "accident-detected") {
    return (
      <div className="mobile-container safe-area-inset flex flex-col min-h-screen bg-gradient-to-b from-destructive/20 to-background">
        {/* Warning Header */}
        <header className="flex flex-col items-center pt-12 pb-8 animate-fade-in">
          <div className="text-7xl mb-4 animate-pulse">⚠️</div>
          <h1 className="text-3xl font-bold text-destructive uppercase tracking-wide">
            ACCIDENT DETECTED
          </h1>
        </header>

        {/* Countdown */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">
          <div className="text-center animate-scale-in">
            <p className="text-xl text-muted-foreground mb-4">Sending alert in:</p>
            <div className="w-40 h-40 rounded-full bg-destructive/20 border-4 border-destructive flex items-center justify-center mx-auto animate-pulse">
              <span className="text-7xl font-bold text-destructive">{countdown}</span>
            </div>
            <p className="text-lg text-muted-foreground mt-4">seconds</p>
          </div>

          <p className="text-center text-muted-foreground text-lg px-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Emergency services will be alerted with your location if you don't cancel.
          </p>
        </div>

        {/* Cancel Button */}
        <div className="pb-8 px-4 animate-slide-up">
          <button
            onClick={handleCancelAlert}
            className="w-full py-6 rounded-2xl bg-warning hover:bg-warning/90 transition-all duration-200 active:scale-95 shadow-lg"
          >
            <span className="text-2xl font-bold text-warning-foreground uppercase tracking-wider">
              CANCEL ALERT
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Alert Sent Screen
  return (
    <div className="mobile-container safe-area-inset flex flex-col min-h-screen bg-gradient-to-b from-success/20 to-background">
      {/* Success Header */}
      <header className="flex flex-col items-center pt-12 pb-8 animate-fade-in">
        <div className="text-7xl mb-4">🚑</div>
        <h1 className="text-3xl font-bold text-success text-center">
          Help is on the way
        </h1>
      </header>

      {/* Info Cards */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
        {/* Location Sent */}
        <div className="w-full max-w-sm bg-success/10 border border-success/30 rounded-2xl p-6 text-center animate-scale-in">
          <span className="text-4xl block mb-3">📍</span>
          <p className="text-xl font-semibold text-foreground">
            Location sent to police
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Emergency services have your exact coordinates
          </p>
        </div>

        {/* Calm Message */}
        <div className="w-full max-w-sm bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <span className="text-4xl block mb-3">🙏</span>
          <p className="text-2xl font-semibold text-foreground mb-2">
            Please remain calm
          </p>
          <p className="text-muted-foreground">
            Help will arrive shortly. Stay in a safe position if possible.
          </p>
        </div>

        {/* Emergency Info */}
        <div className="w-full max-w-sm bg-secondary/50 rounded-2xl p-5 text-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <p className="text-sm text-muted-foreground">
            If you need immediate assistance, call:
          </p>
          <p className="text-2xl font-bold text-primary mt-2">112</p>
        </div>
      </div>

      {/* Return Button */}
      <div className="pb-8 px-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <button
          onClick={resetToMonitoring}
          className="w-full py-4 rounded-2xl bg-secondary hover:bg-secondary/80 transition-all duration-200 active:scale-95 border border-border"
        >
          <span className="text-lg font-semibold text-foreground">
            Return to Monitoring
          </span>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
