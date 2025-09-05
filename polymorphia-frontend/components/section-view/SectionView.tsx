"use client";

import "./index.css";
import { SectionViewProps } from "@/components/section-view/types";

export default function SectionView({ children, ref }: SectionViewProps) {
  return (
    <div className="section-view" ref={ref}>
      {children}
    </div>
  );
}
