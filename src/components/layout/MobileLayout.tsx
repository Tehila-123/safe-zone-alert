import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
  onBack?: () => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  showHeader = false, 
  headerTitle,
  onBack 
}) => {
  return (
    <div className="mobile-container safe-area-inset flex flex-col min-h-screen">
      {showHeader && (
        <header className="flex items-center justify-between py-4 animate-fade-in">
          {onBack ? (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 text-foreground hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <div className="w-10" />
          )}
          {headerTitle && (
            <h1 className="text-xl font-semibold text-foreground">{headerTitle}</h1>
          )}
          <div className="w-10" />
        </header>
      )}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default MobileLayout;
