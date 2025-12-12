"use client";

import {
  CourseChoiceClickedDetails,
  CourseChoiceProps,
} from "@/components/course-choice/types";
import usePreferredCourseUpdate from "@/hooks/course/usePreferredCourseUpdate";
import CreateAnimalModal from "@/components/course-choice/modal/createAnimal";
import React, { useState } from "react";
import NewCardGridView from "../new-card/grid";
import getCourseChoiceCardConfiguration from "./get-course-choice-card-configuration";

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

  return (
    <>
      <NewCardGridView
        ref={containerRef}
        cardConfigurations={courses.map((availableCourse) =>
          getCourseChoiceCardConfiguration({
            availableCourse,
            currentCourseId,
            handleCourseSelection,
            setClickedDetails,
          })
        )}
        usesPointsSummary={false}
        mobileRows={2}
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
