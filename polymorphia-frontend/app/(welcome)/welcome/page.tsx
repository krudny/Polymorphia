"use client";

import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import "./index.css";
import useIsPreferredCourseSet from "@/hooks/course/useIsPreferredCourseSet";
import { animateWelcome } from "@/animations/Welcome";

export default function Welcome() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { setTitle } = useTitle();
  const router = useRouter();

  const { data: isCourseIdSet, isLoading } = useIsPreferredCourseSet();

  useEffect(() => {
    setTitle("Witaj!");
  }, [setTitle]);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    animateWelcome(wrapperRef.current, isCourseIdSet, router);
  }, [isLoading, isCourseIdSet, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div ref={wrapperRef} className="welcome-wrapper">
      Witaj w Polymorphii!
    </div>
  );
}
