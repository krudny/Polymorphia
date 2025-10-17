"use client";

import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect, useRef } from "react";
import useCourseGroups from "@/hooks/course/useCourseGroups";
import Loading from "@/components/loading";
import toast from "react-hot-toast";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import SectionView from "@/components/section-view/SectionView";
import "./index.css";
import { useScaleShow } from "@/animations/ScaleShow";
import CourseGroupCard from "@/app/(logged-in)/course/groups/CourseGroupCard";
import { useRouter } from "next/navigation";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { CourseGroupTypes } from "@/services/course-groups/types";

export default function CourseGroupsPage() {
  const { setTitle } = useTitle();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { courseId } = useUserDetails();

  useEffect(() => {
    setTitle("Grupy zajęciowe");
  }, [setTitle]);

  const {
    data: courseGroups,
    isLoading,
    isError,
  } = useCourseGroups({
    courseId,
    isIndividual: true,
    type: CourseGroupTypes.FULL,
  });

  const containerRef = useScaleShow(!isLoading);

  if (isLoading || !courseGroups) {
    return <Loading />;
  }

  if (isError) {
    toast.error("Nie udało się załadować grup zajęciowych.");
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
