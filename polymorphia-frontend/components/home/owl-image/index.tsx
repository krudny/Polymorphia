import Image from "next/image";
import "./index.css";
import { useHeroAnimation } from "@/hooks/general/useHeroAnimation";
import { OwlImageProps } from "@/components/home/owl-image/types";

export default function OwlImage({ owlBackgroundRef, owlRef }: OwlImageProps) {
  return (
    <>
      <div className="hero-background-image" ref={owlBackgroundRef}>
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
      <div className="hero-image-wrapper" ref={owlRef}>
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
    </>
  );
}
