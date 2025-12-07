import AppHeader from "../AppHeader";
import { useState } from "react";

export default function AppHeaderExample() {
  const [currentView, setCurrentView] = useState<"broker" | "client">("broker");

  const handleViewChange = (view: "broker" | "client") => {
    setCurrentView(view);
    console.log("View changed to:", view);
  };

  return <AppHeader currentView={currentView} onViewChange={handleViewChange} />;
}
