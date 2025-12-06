"use client";

import { useRef } from "react";
import useCourseGroups from "@/hooks/course/useCourseGroups";
import Loading from "@/components/loading";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import SectionView from "@/components/section-view/SectionView";
import "./index.css";
import { useScaleShow } from "@/animations/ScaleShow";
import CourseGroupCard from "@/components/course-groups/course-group-card";
import { useRouter } from "next/navigation";
import useUserContext, {
  useUserDetails,
} from "@/hooks/contexts/useUserContext";
import { CourseGroupTypes } from "@/services/course-groups/types";
import ErrorComponent from "@/components/error";
import { Roles } from "@/interfaces/api/user";
import { SpeedDialKeys } from "@/components/speed-dial/types";
import { SpeedDial } from "@/components/speed-dial";

export default function CourseGroupsPage() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { courseId } = useUserDetails();
  const { userRole } = useUserContext();
  const {
    data: courseGroups,
    isLoading,
    isError,
  } = useCourseGroups({ courseId, type: CourseGroupTypes.INDIVIDUAL_FULL });

  const containerRef = useScaleShow(!isLoading);

  if (isLoading || !userRole) {
    return <Loading />;
  }

  if (isError || !courseGroups || userRole === Roles.STUDENT) {
    return (
      <ErrorComponent message="Nie udało się załadować grup zajęciowych." />
    );
  }

  const handleClick = (id: number) => {
    router.push(`/course/groups/${id}`);
  };

  const cards = courseGroups.map((courseGroup) =>
    CourseGroupCard(courseGroup, handleClick)
  );

  return (
    <SectionView ref={containerRef}>
      {userRole === Roles.COORDINATOR && (
        <SpeedDial speedDialKey={SpeedDialKeys.COURSE_GROUP_GRID} />
      )}
      <div className="course-groups-view">
        <div className="course-groups-cards" ref={wrapperRef}>
          <XPCardGrid containerRef={wrapperRef} cards={cards} />
        </div>
      </div>
    </SectionView>
  );
}
