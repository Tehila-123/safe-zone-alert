import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileLayout from "@/components/layout/MobileLayout";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Reset link sent!",
      description: "Check your email for password reset instructions.",
    });
  };

  return (
    <MobileLayout showHeader headerTitle="Gerayo" onBack={() => navigate("/login")}>
      <div className="flex-1 flex flex-col pt-12">
        <h2 className="text-2xl font-bold text-foreground text-center mb-2 animate-fade-in">
          Reset Password
        </h2>
        <p className="text-muted-foreground text-center mb-10 px-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Enter your email address associated with your account and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Input
            placeholder="Email"
            type="email"
            icon={<Mail className="w-5 h-5" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" variant="hero" size="lg" className="w-full">
            Continue
          </Button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-muted-foreground text-sm mt-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Remember your password?{" "}
          <button 
            className="text-primary hover:underline font-medium"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </p>
      </div>
    </MobileLayout>
  );
};

export default ForgotPasswordScreen;