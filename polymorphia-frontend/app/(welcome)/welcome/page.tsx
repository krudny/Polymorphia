"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import "./index.css";
import useUserRole from "@/hooks/course/useUserRole";
import { animateWelcome } from "@/animations/Welcome";
import { redirectToNextStep } from "@/app/(welcome)/redirectHandler";
import { useTitle } from "@/components/navigation/TitleContext";

export default function Welcome() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data: userRole, isLoading } = useUserRole();
  const router = useRouter();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("");
  }, [setTitle]);

  useEffect(() => {
    if (!wrapperRef.current || isLoading || !userRole) {
      return;
    }

    const onAnimateComplete = () =>
      redirectToNextStep({
        userRole: userRole,
        defaultRedirect: "/course-choice",
        router: router,
      });

    animateWelcome(wrapperRef.current, onAnimateComplete);
  }, [isLoading, userRole, router]);

  if (isLoading || !userRole) {
    return <Loading />;
  }

  return (
    <div ref={wrapperRef} className="welcome-wrapper">
      <h1>Witaj w Polymorphii!</h1>
    </div>
  );
}
