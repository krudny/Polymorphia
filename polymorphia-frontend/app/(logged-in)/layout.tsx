"use client";

import { ReactNode } from "react";
import Navigation from "@/components/navigation/Navigation";
import { NavigationProvider } from "@/components/providers/NavigationContext";
import Image from "next/image";
import MainLayout from "@/components/main-layout/MainLayout";
import { UserProvider } from "@/components/providers/user/UserContext";
import { useTheme } from "next-themes";

export default function Layout({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const url =
    resolvedTheme === "dark" ? "background-dark.png" : "background.png";

  return (
    <UserProvider>
      <NavigationProvider>
        <div className="w-full min-h-[100dvh] relative flex flex-col lg:flex-row bg-black">
          <Navigation />
          <Image
            src={`/${url}`}
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
