"use client";

import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useContext, useEffect } from "react";
import { NavigationContext } from "@/components/providers/navigation/NavigationContext";
import { useScaleShow } from "@/animations/ScaleShow";
import { useTitle } from "@/components/navigation/TitleContext";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import CourseChoiceComponent from "@/components/course-choice/CourseChoice";
import { UserContext } from "@/components/providers/user/UserContext";

export default function Settings() {
  const {
    isSidebarLockedOpened,
    setIsSidebarLockedOpened,
    isSidebarLockedClosed,
    setIsSidebarLockedClosed,
  } = useContext(NavigationContext);
  const { setTitle } = useTitle();
  const wrapperRef = useScaleShow();
  const { resolvedTheme, setTheme } = useTheme();
  const userContext = useContext(UserContext);

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
    <div ref={wrapperRef} className="py-6 px-32">
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
      <CourseChoiceComponent currentCourseId={userContext?.courseId} />
    </div>
  );
}
