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
import RenderCard from "@/app/(logged-in)/course/groups/RenderCard";
import { useRouter } from "next/navigation";

const courseId = 1;

export default function CourseGroupsPage() {
  const { setTitle } = useTitle();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTitle("Grupy zajęciowe");
  }, [setTitle]);

  const { data: courseGroups, isLoading, isError } = useCourseGroups(courseId);

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
    RenderCard(courseGroup, handleClick)
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
