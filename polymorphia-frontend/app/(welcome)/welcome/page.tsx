"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import "./index.css";
import useUserRole from "../../../hooks/course/useUserRole";
import { animateWelcome } from "@/animations/Welcome";

export default function Welcome() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data: userRole, isLoading } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    animateWelcome(wrapperRef.current, userRole !== "UNDEFINED", router);
  }, [isLoading, userRole, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div ref={wrapperRef} className="welcome-wrapper">
      Witaj w Polymorphii!
    </div>
  );
}
