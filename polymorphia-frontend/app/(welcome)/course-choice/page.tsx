"use client";

import CourseChoiceGrid from "@/components/course-choice";
import "./index.css";
import useUserCourses from "@/hooks/course/useUserCourses";
import Loading from "@/components/loading/Loading";
import { useFadeInAnimate } from "@/animations/FadeIn";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import React from "react";
import useLogout from "@/hooks/course/useLogout";
import { useRouter } from "next/navigation";

export default function CourseChoice() {
  const router = useRouter();
  const { data: courses, isLoading } = useUserCourses();
  const { mutate: logout } = useLogout();
  const wrapperRef = useFadeInAnimate(!isLoading);
  const handleLogout = () => {
    router.push("/");
    logout();
  };

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
      <div className="mt-12 flex justify-center">
        <ButtonWithBorder
          text="Wyloguj"
          className="mt-12"
          isActive={false}
          onClick={handleLogout}
          forceDark
        />
      </div>
    </div>
  );
}
