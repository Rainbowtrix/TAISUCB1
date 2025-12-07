import { Button } from "@/components/ui/button";
import { Sun, Moon, Users, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";

interface AppHeaderProps {
  currentView: "broker" | "client";
  onViewChange: (view: "broker" | "client") => void;
}

export default function AppHeader({ currentView, onViewChange }: AppHeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleView = () => {
    onViewChange(currentView === "broker" ? "client" : "broker");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/10 border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CB</span>
          </div>
          <h1 className="text-lg font-semibold text-foreground hidden sm:block">
            Customs Broker Portal
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={currentView === "broker" ? "default" : "outline"}
            size="sm"
            onClick={toggleView}
            data-testid="button-toggle-view"
          >
            {currentView === "broker" ? (
              <>
                <Users className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Вид для клиента</span>
              </>
            ) : (
              <>
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Вид брокера</span>
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
