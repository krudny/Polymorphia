import XPCardGrid from "@/components/xp-card/XPCardGrid";
import {CourseChoiceProps} from "@/components/course-choice/types";
import {useEffect} from "react";
import usePreferredCourseUpdate from "@/hooks/course/usePreferredCourseUpdate";
import renderCard from "@/components/course-choice/RenderCard";

export default function CourseChoiceGrid({
  courses,
  redirectPage,
  currentCourseId,
  containerRef,
  fastForward,
}: CourseChoiceProps) {
  const handleCourseSelection = usePreferredCourseUpdate({ redirectPage });

  useEffect(() => {
    if (fastForward && courses?.length === 1) {
      handleCourseSelection(courses[0].id);
    }
  }, [courses, fastForward, handleCourseSelection]);

  if (fastForward && courses.length === 1) {
    return null;
  }

  const cards = courses.map((availableCourse) =>
    renderCard({ availableCourse, currentCourseId, handleCourseSelection })
  );

  const colNumber = Math.min(cards.length - (cards.length % 2), 4);

  return (
    <XPCardGrid
      containerRef={containerRef}
      cards={cards}
      maxColumns={colNumber}
    />
  );
}
