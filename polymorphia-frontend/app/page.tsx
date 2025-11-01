"use client";

import "./index.css";
import HomeContent from "@/components/home";
import OwlImage from "@/components/home/owl-image";
import { useTitle } from "@/components/navigation/TitleContext";
import { useHeroAnimation } from "@/hooks/general/useHeroAnimation";
import { useEffect } from "react";

export default function Home() {
  const { owlBackgroundRef, owlRef, titleRef, hasMountedRef } =
    useHeroAnimation();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("");
  }, [setTitle]);

  return (
    <OwlImage owlBackgroundRef={owlBackgroundRef} owlRef={owlRef}>
      <HomeContent titleRef={titleRef} hasMountedRef={hasMountedRef} />
    </OwlImage>
  );
}
