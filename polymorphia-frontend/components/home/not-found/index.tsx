"use client";

import OwlImage from "@/components/home/owl-image";
import NotFoundContent from "@/components/home/not-found-content";
import { NotFoundContentProps } from "@/components/home/not-found-content/types";
import { useHeroAnimation } from "@/hooks/general/useHeroAnimation";

export type NotFoundProps = Omit<NotFoundContentProps, "titleRef">;

export default function NotFound(props: NotFoundProps = {}) {
  const { owlBackgroundRef, owlRef, titleRef } = useHeroAnimation();

  return (
    <OwlImage owlBackgroundRef={owlBackgroundRef} owlRef={owlRef}>
      <NotFoundContent {...props} titleRef={titleRef} />
    </OwlImage>
  );
}
