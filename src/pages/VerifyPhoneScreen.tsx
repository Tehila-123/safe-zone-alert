import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MobileLayout from "@/components/layout/MobileLayout";
import { useToast } from "@/hooks/use-toast";

const VerifyPhoneScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 6) {
      toast({
        title: "Phone verified!",
        description: "Your phone number has been verified successfully.",
      });
      navigate("/home");
    }
  };

  return (
    <MobileLayout showHeader headerTitle="Gerayo" onBack={() => navigate("/register")}>
      <div className="flex-1 flex flex-col pt-12">
        <h2 className="text-2xl font-bold text-foreground text-center mb-2 animate-fade-in">
          Enter Verification Code
        </h2>
        <p className="text-muted-foreground text-center mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          We sent a 6-digit code to your phone
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold rounded-xl border border-border bg-input text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
              />
            ))}
          </div>

          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full animate-slide-up"
            style={{ animationDelay: "0.3s" }}
            disabled={otp.join("").length !== 6}
          >
            Continue
          </Button>
        </form>

        {/* Numpad */}
        <div className="mt-10 grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "delete"].map((key, index) => (
            <button
              key={index}
              type="button"
              className={`h-16 rounded-2xl text-xl font-semibold transition-all duration-200 ${
                key === null 
                  ? "invisible" 
                  : "bg-secondary hover:bg-secondary/80 active:scale-95 text-foreground"
              }`}
              onClick={() => {
              if (key === "delete") {
                  let lastFilledIndex = -1;
                  for (let i = otp.length - 1; i >= 0; i--) {
                    if (otp[i] !== "") {
                      lastFilledIndex = i;
                      break;
                    }
                  }
                  if (lastFilledIndex >= 0) {
                    const newOtp = [...otp];
                    newOtp[lastFilledIndex] = "";
                    setOtp(newOtp);
                    inputRefs.current[lastFilledIndex]?.focus();
                  }
                } else if (typeof key === "number") {
                  const firstEmptyIndex = otp.findIndex((d) => d === "");
                  if (firstEmptyIndex >= 0) {
                    handleChange(firstEmptyIndex, key.toString());
                  }
                }
              }}
            >
              {key === "delete" ? (
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                </svg>
              ) : (
                key
              )}
            </button>
          ))}
        </div>

        {/* Resend */}
        <p className="text-center text-muted-foreground text-sm mt-8 pb-8">
          Didn't receive code?{" "}
          <button className="text-primary hover:underline font-medium">
            Resend
          </button>
        </p>
      </div>
    </MobileLayout>
  );
};

export default VerifyPhoneScreen;
