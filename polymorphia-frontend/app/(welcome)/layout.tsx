"use client";

import { ReactNode } from "react";
import MainLayout from "@/components/main-layout/MainLayout";
import BackgroundWrapper from "@/components/background-wrapper/BackgroundWrapper";
import "./index.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="welcome-layout-wrapper">
      <BackgroundWrapper />
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
