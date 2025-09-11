"use client";

import { useEffect, useRef } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import CourseChoiceGrid from "@/components/course-choice/CourseChoice";
import "./index.css";

export default function CourseChoice() {
  const { setTitle } = useTitle();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTitle("Wybierz kurs");
  }, [setTitle]);

  return (
    <div className="outer-grid-wrapper">
      <div ref={containerRef} className="inner-grid-wrapper">
        <CourseChoiceGrid
          redirectPage={"/profile"}
          containerRef={containerRef}
          fastForward={true}
        />
      </div>
    </div>
  );
}
