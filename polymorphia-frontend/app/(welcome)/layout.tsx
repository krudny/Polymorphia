"use client";

import { ReactNode } from "react";
import MainLayout from "@/components/main-layout/MainLayout";
import BackgroundWrapper from "@/components/background-wrapper/BackgroundWrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-[100dvh] relative flex flex-col lg:flex-row bg-black">
      <BackgroundWrapper />
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
