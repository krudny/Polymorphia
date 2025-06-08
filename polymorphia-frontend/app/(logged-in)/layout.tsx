"use client";

import { ReactNode } from "react";
import Navigation from "@/components/navigation/Navigation";
import { NavigationProvider } from "@/components/providers/NavigationContext";
import Image from "next/image";
import MainLayout from "@/components/general/MainLayout";
import { UserProvider } from "@/components/providers/UserContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <NavigationProvider>
        <div className="w-full min-h-[100dvh] relative flex flex-col lg:flex-row bg-black overflow-hidden">
          <Navigation />
          <Image
            src={`/background.png`}
            alt="Background"
            fill
            className="absolute object-cover"
            priority
            sizes="100%"
          />
          <MainLayout>{children}</MainLayout>
        </div>
      </NavigationProvider>
    </UserProvider>
  );
}
