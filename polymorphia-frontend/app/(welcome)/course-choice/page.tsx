"use client";

import { useEffect, useRef } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import CourseChoiceGrid from "@/components/course-choice/CourseChoice";

export default function CourseChoice() {
  const { setTitle } = useTitle();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTitle("Wybierz kurs");
  }, [setTitle]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div ref={containerRef} className="flex justify-center items-center h-50">
        <CourseChoiceGrid
          redirectPage={"/profile"}
          containerRef={containerRef}
        />
      </div>
    </div>
  );
}
