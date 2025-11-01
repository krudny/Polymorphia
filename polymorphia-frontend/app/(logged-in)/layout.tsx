"use client";

import { ReactNode } from "react";
import { NavigationProvider } from "@/providers/navigation";
import { UserProvider } from "@/providers/user";
import MainLayout from "@/components/main-layout";
import Navigation from "@/components/navigation/Navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <NavigationProvider>
        <div className="w-full h-[100dvh] relative flex flex-col lg:flex-row">
          <Navigation />
          <MainLayout>{children}</MainLayout>
        </div>
      </NavigationProvider>
    </UserProvider>
  );
}
