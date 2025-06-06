import { useScaleShow } from "@/animations/General";
import { useTitle } from "../navigation/TitleContext";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { title } = useTitle();
  const titleRef = useScaleShow();

  return (
    <div
      id="main-container"
      className="w-full h-full flex flex-col min-h-[calc(100dvh-5rem)] lg:h-screen relative overflow-hidden lg:overflow-y-auto custom-scrollbar max-lg:mt-20"
    >
      <div className="w-full flex-centered h-15 shrink-0 hidden lg:flex">
        <h3 className="text-4xl" ref={titleRef}>
          {title}
        </h3>
      </div>
      <div className="w-full flex flex-1">
        {children}
      </div>

    </div>
  );
}
