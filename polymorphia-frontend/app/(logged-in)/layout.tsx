"use client";

import {ReactNode} from "react";
import {NavigationProvider} from "@/providers/navigation/NavigationContext";
import {UserProvider} from "@/providers/user/UserContext";
import MainLayout from "@/components/main-layout/MainLayout";
import BackgroundWrapper from "@/components/background-wrapper/BackgroundWrapper";
import Navigation from "@/components/navigation/Navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <NavigationProvider>
        <div className="w-full h-[100dvh] relative flex flex-col lg:flex-row bg-black">
          <Navigation />
          <BackgroundWrapper />
          <MainLayout>{children}</MainLayout>
        </div>
      </NavigationProvider>
    </UserProvider>
  );
}
