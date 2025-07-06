"use client";

import Image from "next/image";
import clsx from "clsx";
import "./index.css";
import { BackgroundWrapperProps } from "@/components/background-wrapper/types";

export default function BackgroundWrapper({
  children,
  className,
}: BackgroundWrapperProps) {
  return (
    <div className={clsx("background-wrapper", className)}>
      <Image
        src="/background.png"
        alt="White background"
        fill={true}
        className="object-cover inset-0 -z-10"
        priority={true}
      />
      {children}
    </div>
  );
}
