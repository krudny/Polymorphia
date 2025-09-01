"use client";

import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import gsap from "gsap";

export default function Welcome() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { setTitle } = useTitle();
  const router = useRouter();

  const { data: isCourseIdSet, isLoading } = useQuery({
    queryKey: ["isCourseSet"],
    queryFn: () => UserService.isCourseIdSet(),
  });

  useEffect(() => {
    setTitle("Welcome!");
  }, [setTitle]);

  useEffect(() => {
    if (isLoading) return; // wait for query

    if (!wrapperRef.current) return;

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

  if (isLoading) return <Loading />;

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col items-center justify-center min-h-screen text-4xl font-bold"
    >
      Witaj w Polymorphii!
    </div>
  );
}
