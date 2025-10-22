import { useScaleShow } from "@/animations/ScaleShow";
import { useTitle } from "@/components/navigation/TitleContext";
import { ReactNode } from "react";
import "./index.css";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { title } = useTitle();
  const titleRef = useScaleShow();

  return (
    <div id="main-container" className="main-layout">
      <div className="main-layout-title">
        <h3 ref={titleRef}>{title}</h3>
      </div>
      <div className="main-layout-content-wrapper">{children}</div>
    </div>
  );
}
