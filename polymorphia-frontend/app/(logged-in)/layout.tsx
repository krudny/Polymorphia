"use client"

import {ReactNode} from "react";
import Navigation from "@/components/navigation/Navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
      <div className="w-full flex flex-col lg:flex-row">
        <Navigation />
        <div className="w-full">
          {children}
        </div>
      </div>
  );
}