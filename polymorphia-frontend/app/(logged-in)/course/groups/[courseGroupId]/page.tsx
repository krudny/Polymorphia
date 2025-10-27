"use client";

import { useTitle } from "@/components/navigation/TitleContext";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useCourseGroups from "@/hooks/course/useCourseGroups";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { CourseGroupTypes } from "@/services/course-groups/types";
import { CourseGroupsProvider } from "@/providers/course-groups";
import CourseGroups from "@/views/course-groups";
import { EquipmentProvider } from "@/providers/equipment";
import EquipmentModals from "@/components/equipment/modals";
import GradeModal from "@/components/speed-dial/modals/grade";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";

function CourseGroupViewContent() {
  const { setTitle } = useTitle();
  const { courseId } = useUserDetails();
  const { courseGroupId } = useParams();
  const { data: courseGroups, isError } = useCourseGroups({
    courseId,
    type: CourseGroupTypes.INDIVIDUAL_FULL,
  });
  const { gradableEventId, setGradableEventId } = useCourseGroupsContext();

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
    <>
      <CourseGroups />
      <EquipmentModals />
      {gradableEventId && (
        <GradeModal
          gradableEventIdProp={gradableEventId}
          onClosedAction={() => setGradableEventId(null)}
        />
      )}
    </>
  );
}

export default function CourseGroupView() {
  return (
    <EquipmentProvider>
      <CourseGroupsProvider>
        <CourseGroupViewContent />
      </CourseGroupsProvider>
    </EquipmentProvider>
  );
}
