"use client";

import XPCardGrid from "@/components/xp-card/XPCardGrid";
import { CourseChoiceProps } from "@/components/course-choice/types";
import usePreferredCourseUpdate from "@/hooks/course/usePreferredCourseUpdate";
import renderCard from "@/components/course-choice/RenderCard";
import CreateAnimalModal from "./modal/createAnimal";
import React, { useState } from "react";

export default function CourseChoiceGrid({
  courses,
  currentCourseId,
  containerRef,
  fastForward,
}: CourseChoiceProps) {
  const [clickedCourseId, setClickedCourseId] = useState<number | null>(null);

  const handleCourseSelection = usePreferredCourseUpdate({
    shouldRedirectToMainPage: fastForward,
  });

  const cards = courses.map((availableCourse) =>
    renderCard({
      availableCourse,
      currentCourseId,
      handleCourseSelection,
      setClickedCourseId,
    })
  );

  const colNumber = Math.min(cards.length - (cards.length % 2), 4);

  return (
    <>
      <XPCardGrid
        containerRef={containerRef}
        cards={cards}
        maxColumns={colNumber}
      />
      {clickedCourseId && (
        <CreateAnimalModal
          courseId={clickedCourseId}
          onClosedAction={() => setClickedCourseId(null)}
        />
      )}
    </>
  );
}
