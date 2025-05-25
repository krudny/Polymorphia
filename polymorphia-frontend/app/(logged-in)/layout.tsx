"use client"

import {ReactNode} from "react";
import Navigation from "@/components/navigation/Navigation";
import {NavigationProvider} from "@/components/navigation/NavigationContext";
import Image from "next/image";
import { useTitle } from "@/components/navigation/TitleContext";
import { useScaleShow } from "@/animations/General";

export default function Layout({ children }: { children: ReactNode }) {
  const { title } = useTitle();
  const titleRef = useScaleShow();

  return (
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
          <div id="main-container" className="w-full h-full flex flex-col min-h-[calc(100dvh-5rem)] lg:h-screen relative overflow-hidden lg:overflow-y-auto custom-scrollbar max-lg:mt-20">
            <div className="w-full flex-centered h-15 flex shrink-0">
              <h3 className="text-4xl" ref={titleRef}>{title}</h3>
            </div>
            {children}
          </div>
        </div>
      </NavigationProvider>
  );
}