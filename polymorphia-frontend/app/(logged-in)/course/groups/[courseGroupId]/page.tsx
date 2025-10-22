"use client";

import { useTitle } from "@/components/navigation/TitleContext";
import SpeedDial from "@/components/speed-dial/SpeedDial";
import { SpeedDialKeys } from "@/components/speed-dial/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useCourseGroups from "@/hooks/course/useCourseGroups";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { CourseGroupTypes } from "@/services/course-groups/types";

export default function CourseGroupView() {
  const { setTitle } = useTitle();
  const { courseId } = useUserDetails();
  const { courseGroupId } = useParams();
  const { data: courseGroups, isError } = useCourseGroups({
    courseId,
    type: CourseGroupTypes.INDIVIDUAL_FULL,
  });

  useEffect(() => {
    if (courseGroups) {
      const title =
        courseGroups
          .find((courseGroup) => courseGroup.id === Number(courseGroupId))
          ?.name.toUpperCase() ?? "";

      setTitle(title);
    } else if (isError) {
      setTitle("");
    }
  }, [courseGroupId, courseGroups, isError, setTitle]);

  return (
    <div>
      <SpeedDial speedDialKey={SpeedDialKeys.COURSE_GROUP} />
      <div className="m-auto w-[600px] flex-col-centered text-xl">
        Widok grupy
      </div>
    </div>
  );
}
