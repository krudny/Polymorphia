"use client";

import clsx from "clsx";
import "./index.css";
import { BackgroundWrapperProps } from "@/components/background-wrapper/types";
import { useTheme } from "next-themes";

export default function BackgroundWrapper({
  children,
  className,
}: BackgroundWrapperProps) {
  return (
    <div className={clsx("background-wrapper", className)}>{children}</div>
  );
}
