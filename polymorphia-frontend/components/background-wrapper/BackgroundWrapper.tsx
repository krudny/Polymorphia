"use client";

import clsx from "clsx";
import "./index.css";
import { BackgroundWrapperProps } from "@/components/background-wrapper/types";
import { useTheme } from "next-themes";
import usePosition from "@/hooks/general/usePosition";
import { useRef } from "react";

export default function BackgroundWrapper({
  children,
  className,
  forceTheme,
}: BackgroundWrapperProps) {
  const { resolvedTheme } = useTheme();
  const activeTheme = forceTheme ?? resolvedTheme;
  const refe = useRef<HTMLDivElement | null>(null);
  const { left, top } = usePosition(refe);

  return (
    <div
      className={clsx("background-wrapper", className, {
        "force-dark": activeTheme === "dark",
        "force-light": activeTheme === "light",
      })}
      ref={refe}
      style={{
        backgroundSize: "100vw 100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `-${left}px -${top}px`,
      }}
    >
      {children}
    </div>
  );
}
