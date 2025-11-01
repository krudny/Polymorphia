"use client";

import { ReactNode } from "react";
import { NavigationProvider } from "@/providers/navigation/NavigationContext";
import { UserProvider } from "@/providers/user/UserContext";
import MainLayout from "@/components/main-layout";
import Navigation from "@/components/navigation/Navigation";
import { TitleProvider } from "@/components/navigation/TitleContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <TitleProvider>
        <NavigationProvider>
          <div className="w-full h-[100dvh] relative flex flex-col lg:flex-row">
            <Navigation />
            <MainLayout>{children}</MainLayout>
          </div>
        </NavigationProvider>
      </TitleProvider>
    </UserProvider>
  );
}
