import XPCard from "@/components/xp-card/XPCard";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import Loading from "@/components/loading/Loading";
import { AvailableCoursesDTO, RoleTextMap } from "@/interfaces/api/user";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import CourseChoiceProps from "@/components/course-choice/types";
import { useEffect } from "react";
import usePreferredCourseUpdate from "@/hooks/course/usePreferredCourseUpdate";

export default function CourseChoiceGrid({
  redirectPage,
  currentCourseId,
  containerRef,
  fastForward,
}: CourseChoiceProps) {
  const { data: courses, isLoading } = useQuery<AvailableCoursesDTO[]>({
    queryKey: ["userCourses"],
    queryFn: () => UserService.getUserCourses(),
  });

  const handleCourseSelection = usePreferredCourseUpdate(redirectPage);

  useEffect(() => {
    if (fastForward && courses?.length === 1) {
      handleCourseSelection(courses[0].id);
    }
  }, [courses, fastForward, handleCourseSelection]);

  if (isLoading || courses == undefined) {
    return <Loading />;
  }

  if (fastForward && courses.length === 1) {
    return null;
  }

  const cards = courses?.map(
    ({ id, name, coordinator, imageUrl, userRole }) => (
      <XPCard
        title={name}
        subtitle={`Koordynator: ${coordinator}, Twoja rola: ${RoleTextMap[userRole]}`}
        key={id}
        color={
          currentCourseId != null && currentCourseId === id ? "green" : "silver"
        }
        size={"sm"}
        leftComponent={<XPCardImage imageUrl={imageUrl} alt={name} />}
        onClick={() => handleCourseSelection(id)}
      />
    )
  );

  return (
    <XPCardGrid containerRef={containerRef} cards={cards} maxColumns={2} />
  );
}
