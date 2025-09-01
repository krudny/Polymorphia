"use client";

import { useEffect } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import CourseChoiceComponent from "@/components/course-choice/CourseChoice";

export default function CourseChoice() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Wybierz kurs");
  }, [setTitle]);
  return (
    <div>
      <CourseChoiceComponent redirectPage={"/profile"} />
    </div>
  );
}
