"use client";

import { ReactNode } from "react";
import "./index.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="welcome-layout-wrapper">
      <div className="main-layout-content-wrapper">{children}</div>
    </div>
  );
}
