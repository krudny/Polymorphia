"use client";

import { ReactNode } from "react";
import { NavigationProvider } from "@/providers/navigation";
import { UserProvider } from "@/providers/user";
import MainLayout from "@/components/main-layout";
import Navigation from "@/components/navigation/Navigation";
import { TitleProvider } from "@/providers/title/TitleContext";
import { LOGGED_IN_APPLICATION_ROUTES } from "@/providers/title/routes";
import { NotificationProvider } from "@/providers/notification";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <NotificationProvider>
      <UserProvider>
        <TitleProvider routes={LOGGED_IN_APPLICATION_ROUTES}>
          <NavigationProvider>
            <div className="w-full h-[100dvh] relative flex flex-col lg:flex-row">
              <Navigation />
              <MainLayout>{children}</MainLayout>
            </div>
          </NavigationProvider>
        </TitleProvider>
      </UserProvider>
    </NotificationProvider>
  );
}
