"use client"

import {ReactNode} from "react";
import Navigation from "@/components/navigation/Navigation";
import {NavigationProvider} from "@/components/navigation/NavigationContext";
import Image from "next/image";
import Link from "next/link";
import { useTitle } from "@/components/navigation/TitleContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { title } = useTitle();

  return (
      <NavigationProvider>
        <div className="w-full min-h-[100dvh] relative flex flex-col lg:flex-row bg-black">
          <Navigation />
          <Image
              src={`/background.png`}
              alt="Background"
              fill
              className="absolute object-cover"
              priority
              sizes="100%"
          />
          <div className="w-full h-full flex flex-col min-h-[calc(100dvh-5rem)] lg:min-h-screen relative">
            <div className="w-full flex-centered h-15 hidden lg:flex">
              <h3 className="text-4xl">{title}</h3>
            </div>
            {children}
          </div>
        </div>
      </NavigationProvider>
  );
}