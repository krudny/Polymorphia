"use client";

import { useEffect, useRef } from "react";
import useCourseGroups from "@/hooks/course/useCourseGroups";
import Loading from "@/components/loading";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import SectionView from "@/components/section-view/SectionView";
import "./index.css";
import { useScaleShow } from "@/animations/ScaleShow";
import CourseGroupCard from "@/app/(logged-in)/course/groups/CourseGroupCard";
import { useRouter } from "next/navigation";
import useUserContext, {
  useUserDetails,
} from "@/hooks/contexts/useUserContext";
import { CourseGroupTypes } from "@/services/course-groups/types";
import ErrorComponent from "@/components/error";
import { Roles } from "@/interfaces/api/user";

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

  useEffect(() => {
    if (userRole && userRole === Roles.STUDENT) {
      router.push("/profile");
    }
  }, [userRole, router]);

  const containerRef = useScaleShow(!isLoading);

  if (isLoading || !userRole || userRole === Roles.STUDENT) {
    return <Loading />;
  }

  if (isError || !courseGroups) {
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
