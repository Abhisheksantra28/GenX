import LandingContent from "@/components/LandingFooter";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-[#111827]">
      <main className="h-full overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
      </main>
      <footer className="mb-4">
        <LandingContent />
      </footer>
    </div>
  );
};

export default layout;
