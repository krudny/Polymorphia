"use client"

import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import {useContext} from "react";
import {NavigationContext} from "@/components/navigation/NavigationContext";
import {useScaleShow} from "@/animations/General";

export default function Settings() {
  const { isSidebarLocked, setIsSidebarLocked } = useContext(NavigationContext);
  const wrapperRef = useScaleShow();

  const toggleSidebarLock = () => {
    setIsSidebarLocked(!isSidebarLocked);
  };

  return (
      <div ref={wrapperRef} className="py-6 px-32">
        <h1 className="text-7xl mb-10">Tymczasowe ustawienia</h1>
        <div className="flex justify-start items-center">
          <h3 className="text-4xl">Zablokuj rozwijanie sidebaru</h3>
          <ButtonWithBorder
              text={isSidebarLocked ? 'Odblokuj' : 'Zablokuj'}
              onClick={toggleSidebarLock}
              size="md"
              className="!mx-0 !ml-6"
          />
        </div>

      </div>
  );
}