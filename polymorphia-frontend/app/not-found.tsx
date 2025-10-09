"use client";

import { useHeroAnimation } from "@/hooks/general/useHeroAnimation";
import OwlImage from "@/components/home/owl-image";
import NotFoundContent from "@/components/home/not-found-content";

export default function NotFound() {
  const { owlBackgroundRef, owlRef, titleRef } = useHeroAnimation();

  return (
    <>
      <OwlImage owlBackgroundRef={owlBackgroundRef} owlRef={owlRef} />
      <NotFoundContent titleRef={titleRef} />
    </>
  );
}
