"use client";

import { useEffect, useRef } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import CourseChoiceGrid from "@/components/course-choice";
import "./index.css";

export default function CourseChoice() {
  const { setTitle } = useTitle();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTitle("Wybierz kurs");
  }, [setTitle]);

  return (
    <div className="course-choice-outer-grid-wrapper">
      <div ref={containerRef} className="course-choice-inner-grid-wrapper">
        <CourseChoiceGrid
          redirectPage="/profile"
          containerRef={containerRef}
          fastForward={true}
        />
      </div>
    </div>
  );
}
