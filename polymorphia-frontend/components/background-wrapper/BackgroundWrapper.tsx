"use client";

import Image from "next/image";
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
  const theme = forceTheme ?? resolvedTheme;
  const url = `background${theme === "dark" ? "-dark" : ""}.webp`;

  return (
    <div className={clsx("background-wrapper", className)}>
      <Image
        src={`/${url}`}
        alt="Background"
        fill={true}
        className="object-cover inset-0 -z-10"
        priority={true}
      />
      {children}
    </div>
  );
}
