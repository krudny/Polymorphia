"use client";

import { ReactNode } from "react";
import Navigation from "@/components/navigation/Navigation";
import { NavigationProvider } from "@/components/providers/navigation/NavigationContext";
import { UserProvider } from "@/components/providers/user/UserContext";
import BackgroundWrapper from "@/components/background-wrapper/BackgroundWrapper";
import MainLayout from "@/components/main-layout/MainLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <NavigationProvider>
        <div className="w-full min-h-[100dvh] relative flex flex-col lg:flex-row bg-black">
          <Navigation />
          <BackgroundWrapper />
          <MainLayout>{children}</MainLayout>
        </div>
      </NavigationProvider>
    </UserProvider>
  );
}
