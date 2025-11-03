"use client";

import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useRef, useState } from "react";
import { useScaleShow } from "@/animations/ScaleShow";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import useNavigationContext from "@/hooks/contexts/useNavigationContext";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import "./index.css";
import useAvailableCourses from "@/hooks/course/useAvailableCourses";
import Loading from "@/components/loading";
import usePreferredCourseUpdate from "@/hooks/course/usePreferredCourseUpdate";
import Selector from "@/components/selector";
import ChangePasswordModal from "@/app/(logged-in)/settings/modals/change-password";

export default function Settings() {
  const {
    isSidebarLockedOpened,
    setIsSidebarLockedOpened,
    isSidebarLockedClosed,
    setIsSidebarLockedClosed,
  } = useNavigationContext();
  const wrapperRef = useScaleShow();
  const { resolvedTheme, setTheme } = useTheme();
  const { courseId } = useUserDetails();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data: courses, isLoading } = useAvailableCourses();
  const currentCourse = courses?.find((course) => course.id === courseId);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const setPreferredCourse = usePreferredCourseUpdate({
    shouldRedirectToMainPage: false,
  });

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

  if (isLoading || !courses || !currentCourse) {
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
          className="!mx-0"
        />
      </div>

      <div className="settings-option-wrapper">
        <h3>Sidebar zawsze zamkniety</h3>
        <ButtonWithBorder
          text={isSidebarLockedClosed ? "Odblokuj" : "Zablokuj"}
          onClick={toggleSidebarLockClosed}
          size="md"
          className="!mx-0"
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
          className="!mx-0"
        />
      </div>
      <div ref={containerRef} className="settings-option-wrapper">
        <h3>Aktywny kurs</h3>
        <div className="settings-selector-wrapper">
          <Selector
            options={courses.map((course) => ({
              value: course.id.toString(),
              label: course.name,
            }))}
            value={currentCourse.id.toString() || ""}
            onChange={(value) => setPreferredCourse(Number(value))}
            placeholder={currentCourse.name || "Wybierz kurs"}
            size="3xl"
            padding="md"
          />
        </div>
      </div>
      <div className="settings-option-wrapper">
        <h3>Hasło</h3>
        <ButtonWithBorder
          text="Zmień hasło"
          onClick={() => setChangePasswordModalVisible(true)}
          size="md"
          className="!mx-0"
        />
      </div>
      {changePasswordModalVisible && (
        <ChangePasswordModal
          onClosedAction={() => setChangePasswordModalVisible(false)}
        />
      )}
    </div>
  );
}
