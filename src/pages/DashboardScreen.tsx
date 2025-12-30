import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MobileLayout from "@/components/layout/MobileLayout";
import { AlertTriangle, MapPin, Phone, Shield, Menu, Bell, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          toast({
            title: "Location access required",
            description: "Please enable location to use emergency features.",
            variant: "destructive",
          });
        }
      );
    }
  }, [toast]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isEmergency) {
      // Alert sent
      toast({
        title: "🚨 Emergency Alert Sent!",
        description: "Police and emergency services have been notified with your location.",
      });
      setIsEmergency(false);
    }
  }, [countdown, isEmergency, toast]);

  const handleEmergencyPress = () => {
    if (!isEmergency) {
      setIsEmergency(true);
      setCountdown(3);
      toast({
        title: "Hold for 3 seconds",
        description: "Release to cancel emergency alert.",
      });
    }
  };

  const handleEmergencyRelease = () => {
    if (countdown > 0) {
      setIsEmergency(false);
      setCountdown(0);
      toast({
        title: "Cancelled",
        description: "Emergency alert was cancelled.",
      });
    }
  };

  const quickActions = [
    { icon: Phone, label: "Call Police", color: "text-primary" },
    { icon: AlertTriangle, label: "Report Accident", color: "text-warning" },
    { icon: Shield, label: "Safety Tips", color: "text-success" },
  ];

  return (
    <div className="mobile-container safe-area-inset flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between py-4 animate-fade-in">
        <button className="p-2 -ml-2 text-foreground hover:text-primary transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Gerayo</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 text-foreground hover:text-primary transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <button 
            className="p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => navigate("/profile")}
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Location Card */}
      <div className="bg-gradient-card rounded-2xl p-4 mb-6 border border-border animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/20 rounded-xl">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Your Location</p>
            {location ? (
              <p className="text-foreground font-medium">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            ) : (
              <p className="text-foreground font-medium">Locating...</p>
            )}
          </div>
          <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
            Active
          </span>
        </div>
      </div>

      {/* Emergency Button */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground text-sm mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Press & hold for emergency
        </p>
        <button
          className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 ${
            isEmergency
              ? "bg-destructive scale-110"
              : "bg-gradient-to-br from-destructive to-destructive/80 hover:scale-105"
          } shadow-lg animate-scale-in`}
          style={{ animationDelay: "0.3s" }}
          onMouseDown={handleEmergencyPress}
          onMouseUp={handleEmergencyRelease}
          onMouseLeave={handleEmergencyRelease}
          onTouchStart={handleEmergencyPress}
          onTouchEnd={handleEmergencyRelease}
        >
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full bg-destructive/30 animate-ping" style={{ animationDuration: "2s" }} />
          <div className="absolute inset-2 rounded-full bg-destructive/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
          
          {/* Button content */}
          <div className="relative z-10 text-center">
            {countdown > 0 ? (
              <span className="text-5xl font-bold text-destructive-foreground">{countdown}</span>
            ) : (
              <>
                <AlertTriangle className="w-12 h-12 mx-auto text-destructive-foreground mb-2" />
                <span className="text-sm font-semibold text-destructive-foreground uppercase tracking-wider">
                  SOS
                </span>
              </>
            )}
          </div>
        </button>
        <p className="text-muted-foreground text-xs mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Alerts police with your exact location
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 pb-8 animate-slide-up" style={{ animationDelay: "0.5s" }}>
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary hover:bg-secondary/80 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <action.icon className={`w-6 h-6 ${action.color}`} />
            <span className="text-xs text-foreground font-medium text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="flex items-center justify-around py-4 border-t border-border">
        <button className="flex flex-col items-center gap-1 text-primary">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <MapPin className="w-6 h-6" />
          <span className="text-xs">Map</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <Bell className="w-6 h-6" />
          <span className="text-xs">Alerts</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default DashboardScreen;
