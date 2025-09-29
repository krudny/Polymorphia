"use client"
import Image from "next/image";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import BackgroundWrapper from "@/components/background-wrapper/BackgroundWrapper";
import "./index.css"
import {League_Gothic} from "next/font/google";
import {useRouter} from "next/navigation";
import {useHeroAnimation} from "@/hooks/general/useHeroAnimation";

const leagueGothic = League_Gothic({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-league",
});

export default function GlobalNotFound() {
  const router = useRouter();
  const { backgroundRef, imageRef, titleRef } = useHeroAnimation();

  return (
    <html lang="pl">
    <body className={`${leagueGothic.className} ${leagueGothic.variable}`}>
    <BackgroundWrapper className="hero-background-wrapper" forceTheme="light">
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
      <div className="hero-right-wrapper">
        <div ref={titleRef} className="hero-error">
          <h1>Ooops!</h1>
          <h2>Nie znaleźliśmy strony, której szukasz.</h2>
            <ButtonWithBorder
              text="Powrót"
              onClick={() => router.back()}
              forceDark
            />
        </div>
      </div>
    </BackgroundWrapper>
    </body>
    </html>
  )
}