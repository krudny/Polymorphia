"use client";

import Image from "next/image";
import { Suspense, useRef } from "react";
import "./index.css";
import HomeContent from "@/components/home";
import Loading from "@/components/loading";

export default function Home() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="hero-background-image" ref={backgroundRef}>
        <Image
          src="/hero-bg.webp"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="60vw"
        />
      </div>
      <div className="hero-image-wrapper" ref={imageRef}>
        <div>
          <Image
            src="/owl.webp"
            alt="Hero owl"
            width={1000}
            height={1000}
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 400px, (max-width: 1920px) 50vw"
          />
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <HomeContent backgroundRef={backgroundRef} imageRef={imageRef} />
      </Suspense>
    </>
  );
}
