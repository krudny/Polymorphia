"use client";

import clsx from "clsx";
import "./index.css";
import { BackgroundWrapperProps } from "@/components/background-wrapper/types";
import { useTheme } from "next-themes";

export default function BackgroundWrapper({
  children,
  className,
  forceTheme,
}: BackgroundWrapperProps) {
  const { resolvedTheme } = useTheme();
  const activeTheme = forceTheme ?? resolvedTheme;

  return (
    <div
      className={clsx("background-wrapper", className, {
        "force-dark": activeTheme === "dark",
        "force-light": activeTheme === "light",
      })}
    >
      {children}
    </div>
  );
}
