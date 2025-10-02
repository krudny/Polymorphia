"use client";

import { ReactNode } from "react";
import { NavigationProvider } from "@/providers/navigation/NavigationContext";
import { UserProvider } from "@/providers/user/UserContext";
import MainLayout from "@/components/main-layout";
import Navigation from "@/components/navigation/Navigation";
import BackgroundWrapper from "@/components/background-wrapper/BackgroundWrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <NavigationProvider>
        <div className="w-full min-h-[100dvh] relative flex flex-col lg:flex-row bg-black">
          <BackgroundWrapper />
          <Navigation />
          <MainLayout>{children}</MainLayout>
        </div>
      </NavigationProvider>
    </UserProvider>
  );
}
