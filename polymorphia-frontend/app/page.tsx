"use client";

import "./index.css";
import HomeContent from "@/components/home";
import OwlImage from "@/components/home/owl-image";
import { useHeroAnimation } from "@/hooks/general/useHeroAnimation";

export default function Home() {
  const { owlBackgroundRef, owlRef, titleRef, hasMountedRef } =
    useHeroAnimation();

  return (
    <OwlImage owlBackgroundRef={owlBackgroundRef} owlRef={owlRef}>
      <HomeContent titleRef={titleRef} hasMountedRef={hasMountedRef} />
    </OwlImage>
  );
}
