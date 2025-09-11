"use client";

import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import gsap from "gsap";
import useIsPreferredCourseSet from "@/hooks/course/useIsPreferredCourseSet";

export default function Welcome() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { setTitle } = useTitle();
  const router = useRouter();

  const { data: isCourseIdSet, isLoading } = useIsPreferredCourseSet();

  useEffect(() => {
    setTitle("Welcome!");
  }, [setTitle]);

  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          if (isCourseIdSet) {
            router.push("/profile");
          } else {
            router.push("/course-choice");
          }
        },
      }
    );
  }, [isLoading, isCourseIdSet, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col items-center justify-center min-h-screen text-4xl font-bold"
    >
      Witaj w Polymorphii!
    </div>
  );
}
