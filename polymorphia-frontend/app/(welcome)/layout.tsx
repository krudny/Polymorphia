"use client";

import { ReactNode } from "react";
import MainLayout from "@/components/main-layout";
import "./index.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="welcome-layout-wrapper">
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
