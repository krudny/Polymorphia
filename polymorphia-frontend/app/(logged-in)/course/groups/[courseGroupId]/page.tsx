"use client";

import { CourseGroupsProvider } from "@/providers/course-groups";
import CourseGroups from "@/views/course-groups";
import { EquipmentProvider } from "@/providers/equipment";
import EquipmentModals from "@/components/equipment/modals";
import GradeModal from "@/components/speed-dial/modals/grade";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";
import { TargetProvider } from "@/providers/target";

function CourseGroupViewContent() {
  const { gradableEventId, setGradableEventId } = useCourseGroupsContext();

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
    <TargetProvider>
      <EquipmentProvider>
        <CourseGroupsProvider>
          <CourseGroupViewContent />
        </CourseGroupsProvider>
      </EquipmentProvider>
    </TargetProvider>
  );
}
