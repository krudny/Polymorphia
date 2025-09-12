import Loading from "@/components/loading/Loading";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import { CourseChoiceProps } from "@/components/course-choice/types";
import { useEffect } from "react";
import usePreferredCourseUpdate from "@/hooks/course/usePreferredCourseUpdate";
import useUserCourses from "@/hooks/course/useUserCourses";
import renderCard from "@/components/course-choice/RenderCard";

export default function CourseChoiceGrid({
  redirectPage,
  currentCourseId,
  containerRef,
  fastForward,
}: CourseChoiceProps) {
  const { data: courses, isLoading } = useUserCourses();

  const handleCourseSelection = usePreferredCourseUpdate({ redirectPage });

  useEffect(() => {
    if (fastForward && courses?.length === 1) {
      handleCourseSelection(courses[0].id);
    }
  }, [courses, fastForward, handleCourseSelection]);

  if (isLoading || !courses) {
    return <Loading />;
  }

  if (fastForward && courses.length === 1) {
    return null;
  }

  const cards = courses.map((availableCourse) =>
    renderCard({ availableCourse, currentCourseId, handleCourseSelection })
  );

  return (
    <XPCardGrid containerRef={containerRef} cards={cards} maxColumns={2} />
  );
}
