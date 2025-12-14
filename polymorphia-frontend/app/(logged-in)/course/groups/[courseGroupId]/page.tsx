"use client";

import { CourseGroupsProvider } from "@/providers/course-groups";
import CourseGroupsView from "@/views/course-groups";
import { EquipmentProvider } from "@/providers/equipment";
import { TargetProvider } from "@/providers/target";
import useCourseGroupTargets from "@/hooks/course/course-group/useCourseGroupTargets";

export default function CourseGroups() {
  return (
    <TargetProvider
      useTargets={useCourseGroupTargets}
      handleApplyFilters={(queryClient) => {
        queryClient.invalidateQueries({
          queryKey: ["courseGroupTargets"],
        });
      }}
    >
      <EquipmentProvider>
        <CourseGroupsProvider>
          <CourseGroupsView />
        </CourseGroupsProvider>
      </EquipmentProvider>
    </TargetProvider>
  );
}
