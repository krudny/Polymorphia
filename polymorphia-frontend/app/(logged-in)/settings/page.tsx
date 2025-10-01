"use client";

import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useEffect, useRef } from "react";
import { useScaleShow } from "@/animations/ScaleShow";
import { useTitle } from "@/components/navigation/TitleContext";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import useNavigationContext from "@/hooks/contexts/useNavigationContext";
import CourseChoiceGrid from "@/components/course-choice";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import "./index.css";
import useUserCourses from "@/hooks/course/useUserCourses";
import Loading from "@/components/loading";

export default function Settings() {
  const {
    isSidebarLockedOpened,
    setIsSidebarLockedOpened,
    isSidebarLockedClosed,
    setIsSidebarLockedClosed,
  } = useNavigationContext();
  const { setTitle } = useTitle();
  const wrapperRef = useScaleShow();
  const { resolvedTheme, setTheme } = useTheme();
  const { courseId } = useUserDetails();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data: courses, isLoading } = useUserCourses();

  const toggleSidebarLockOpened = () => {
    if (isSidebarLockedClosed) {
      toast.error("Nie można!");
      return;
    }
    setIsSidebarLockedOpened(!isSidebarLockedOpened);
  };

  const toggleSidebarLockClosed = () => {
    if (isSidebarLockedOpened) {
      toast.error("Nie można!");
      return;
    }
    setIsSidebarLockedClosed(!isSidebarLockedClosed);
  };

  useEffect(() => {
    setTitle("Ustawienia");
  }, [setTitle]);

  if (isLoading || !courses) {
    return <Loading />;
  }

  return (
    <div ref={wrapperRef} className="settings-outer-wrapper">
      <h1>Tymczasowe ustawienia</h1>
      <div className="settings-option-wrapper">
        <h3>Sidebar zawsze otwarty</h3>
        <ButtonWithBorder
          text={isSidebarLockedOpened ? "Odblokuj" : "Zablokuj"}
          onClick={toggleSidebarLockOpened}
          size="md"
          className="!mx-0 !ml-6"
        />
      </div>

      <div className="settings-option-wrapper">
        <h3>Sidebar zawsze zamkniety</h3>
        <ButtonWithBorder
          text={isSidebarLockedClosed ? "Odblokuj" : "Zablokuj"}
          onClick={toggleSidebarLockClosed}
          size="md"
          className="!mx-0 !ml-6"
        />
      </div>

      <div className="settings-option-wrapper">
        <h3>Darkmode</h3>
        <ButtonWithBorder
          text={resolvedTheme === "dark" ? "Wyłącz" : "Włącz"}
          onClick={
            resolvedTheme === "dark"
              ? () => setTheme("light")
              : () => setTheme("dark")
          }
          size="md"
          className="!mx-0 !ml-6"
        />
      </div>
      <div ref={containerRef} className="settings-grid-wrapper">
        <h3 className="text-4xl mb-6">Aktywny kurs</h3>
        <CourseChoiceGrid
          courses={courses}
          currentCourseId={courseId}
          containerRef={containerRef}
          fastForward={false}
        />
      </div>
    </div>
  );
}
