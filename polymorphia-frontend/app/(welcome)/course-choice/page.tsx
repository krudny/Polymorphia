"use client";

import CourseChoiceGrid from "@/components/course-choice";
import "./index.css";
import useAvailableCourses from "@/hooks/course/useAvailableCourses";
import Loading from "@/components/loading";
import { useFadeInAnimate } from "@/animations/FadeIn";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import React, { useEffect } from "react";
import useLogout from "@/hooks/course/useLogout";
import { useTitle } from "@/hooks/general/useTitle";

export default function CourseChoice() {
  const { data: courses, isLoading } = useAvailableCourses();
  const { mutate: logout } = useLogout();
  const { setTitle } = useTitle();
  const wrapperRef = useFadeInAnimate(!isLoading);

  useEffect(() => {
    setTitle("");
  });

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
        <ButtonWithBorder text="Wyloguj" className="mt-12" onClick={logout} />
      </div>
    </div>
  );
}
