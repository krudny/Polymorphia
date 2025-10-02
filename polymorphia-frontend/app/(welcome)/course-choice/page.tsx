"use client";

import CourseChoiceGrid from "@/components/course-choice";
import "./index.css";
import useUserCourses from "@/hooks/course/useUserCourses";
import Loading from "@/components/loading";
import { useFadeInAnimate } from "@/animations/FadeIn";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import React from "react";
import useLogout from "@/hooks/course/useLogout";

export default function CourseChoice() {
  const { data: courses, isLoading } = useUserCourses();
  const { mutate: logout } = useLogout();
  const wrapperRef = useFadeInAnimate(!isLoading);

  if (isLoading || !courses) {
    return <Loading />;
  }

  return (
    <div ref={wrapperRef} className="course-choice-wrapper">
      <h1 className="course-choice-text">Wybierz kurs</h1>
      <CourseChoiceGrid
        courses={courses}
        containerRef={wrapperRef}
        fastForward={true}
      />
      <div className="course-choice-logout-wrapper">
        <ButtonWithBorder
          text="Wyloguj"
          className="mt-12"
          isActive={false}
          onClick={logout}
          forceDark
        />
      </div>
    </div>
  );
}
