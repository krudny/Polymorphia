"use client";

import XPCardGrid from "@/components/xp-card/XPCardGrid";
import {
  CourseChoiceClickedDetails,
  CourseChoiceProps,
} from "@/components/course-choice/types";
import usePreferredCourseUpdate from "@/hooks/course/usePreferredCourseUpdate";
import CourseChoiceCard from "@/components/course-choice/CourseChoiceCard";
import CreateAnimalModal from "@/components/course-choice/modal/createAnimal";
import React, { useState } from "react";

export default function CourseChoiceGrid({
  courses,
  currentCourseId,
  containerRef,
  fastForward,
}: CourseChoiceProps) {
  const [clickedDetails, setClickedDetails] =
    useState<CourseChoiceClickedDetails | null>(null);

  const handleCourseSelection = usePreferredCourseUpdate({
    shouldRedirectToMainPage: fastForward,
  });

  const cards = courses.map((availableCourse) =>
    CourseChoiceCard({
      availableCourse,
      currentCourseId,
      handleCourseSelection,
      setClickedDetails,
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
      {clickedDetails && (
        <CreateAnimalModal
          clickedDetails={clickedDetails}
          onClosedAction={() => setClickedDetails(null)}
        />
      )}
    </>
  );
}
