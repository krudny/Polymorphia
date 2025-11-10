"use client";

import { useRef } from "react";
import useCourseGroups from "@/hooks/course/useCourseGroups";
import Loading from "@/components/loading";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import SectionView from "@/components/section-view/SectionView";
import "./index.css";
import { useScaleShow } from "@/animations/ScaleShow";
import CourseGroupCard from "@/app/(logged-in)/course/groups/CourseGroupCard";
import { useRouter } from "next/navigation";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { CourseGroupTypes } from "@/services/course-groups/types";
import ErrorComponent from "@/components/error";

export default function CourseGroupsPage() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { courseId } = useUserDetails();

  const {
    data: courseGroups,
    isLoading,
    isError,
  } = useCourseGroups({ courseId, type: CourseGroupTypes.INDIVIDUAL_FULL });

  const containerRef = useScaleShow(!isLoading);

  if (isLoading || !courseGroups) {
    return <Loading />;
  }

  if (isError) {
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
      <div className="course-groups-view">
        <div className="course-groups-cards" ref={wrapperRef}>
          <XPCardGrid containerRef={wrapperRef} cards={cards} />
        </div>
      </div>
    </SectionView>
  );
}
