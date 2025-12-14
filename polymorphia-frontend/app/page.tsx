"use client";

import "./index.css";
import HomeContent from "@/components/home";
import OwlImage from "@/components/home/owl-image";
import { useHeroAnimation } from "@/hooks/app/animation/useHeroAnimation";
import { useToken } from "@/hooks/course/invitation/useToken";

export default function Home() {
  const { owlBackgroundRef, owlRef, titleRef, hasMountedRef } =
    useHeroAnimation();
  const { type, token } = useToken();

  return (
    <OwlImage owlBackgroundRef={owlBackgroundRef} owlRef={owlRef}>
      <HomeContent
        key={`${type ?? "default"}-${token ?? "empty"}`}
        titleRef={titleRef}
        hasMountedRef={hasMountedRef}
      />
    </OwlImage>
  );
}
