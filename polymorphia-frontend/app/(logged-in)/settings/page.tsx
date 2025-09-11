"use client";

import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useEffect, useRef } from "react";
import { useScaleShow } from "@/animations/ScaleShow";
import { useTitle } from "@/components/navigation/TitleContext";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import useNavigationContext from "@/hooks/contexts/useNavigationContext";
import CourseChoiceGrid from "@/components/course-choice/CourseChoice";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

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

  return (
    <div ref={wrapperRef} className="py-6 px-10 lg:px-32">
      <h1 className="text-7xl mb-10">Tymczasowe ustawienia</h1>
      <div className="flex justify-start items-center">
        <h3 className="text-4xl">Sidebar zawsze otwarty</h3>
        <ButtonWithBorder
          text={isSidebarLockedOpened ? "Odblokuj" : "Zablokuj"}
          onClick={toggleSidebarLockOpened}
          size="md"
          className="!mx-0 !ml-6"
        />
      </div>

      <div className="flex justify-start items-center mt-10">
        <h3 className="text-4xl">Sidebar zawsze zamkniety</h3>
        <ButtonWithBorder
          text={isSidebarLockedClosed ? "Odblokuj" : "Zablokuj"}
          onClick={toggleSidebarLockClosed}
          size="md"
          className="!mx-0 !ml-6"
        />
      </div>

      <div className="flex justify-start items-center mt-10">
        <h3 className="text-4xl">Darkmode</h3>
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
      <div
        ref={containerRef}
        className="flex flex-col flex-start justify-start h-50 mt-10"
      >
        <h3 className="text-4xl">Aktywny kurs</h3>
        <CourseChoiceGrid
          currentCourseId={courseId}
          containerRef={containerRef}
          fastForward={false}
        />
      </div>
    </div>
  );
}
