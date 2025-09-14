"use client";

import CourseChoiceGrid from "@/components/course-choice";
import "./index.css";
import useUserCourses from "@/hooks/course/useUserCourses";
import Loading from "@/components/loading/Loading";
import {useFadeInAnimate} from "@/animations/FadeIn";

export default function CourseChoice() {
  const { data: courses, isLoading } = useUserCourses();
  const wrapperRef = useFadeInAnimate(!isLoading);

  if (isLoading || !courses) {
    return <Loading />;
  }

  return (
      <div ref={wrapperRef} className="course-choice-wrapper">
        <h1 className="course-choice-text">Wybierz kurs</h1>
        <CourseChoiceGrid
          courses={courses}
          redirectPage="/profile"
          containerRef={wrapperRef}
          fastForward={true}
        />
    </div>
  );
}
