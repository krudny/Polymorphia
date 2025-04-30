"use client"

import Image from "next/image";
import BackgroundWrapper from "@/components/general/BackgroundWrapper";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import LoginForm from "@/components/home/LoginForm";
import {useState} from "react";
import Link from "next/link";

export default function Home() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const openLoginForm = () => setIsLoginFormVisible(true);
  const closeLoginForm = () => setIsLoginFormVisible(false);

  return (
      <BackgroundWrapper className="hero-background-wrapper">
        <div className="hero-background-image">
          <Image
              src="/hero_bg.png"
              alt="Hero background"
              fill
              className="object-cover"
              priority
              sizes="60vw"
          />
        </div>
        <div className="hero-image-wrapper">
          <div>
            <Image
                src="/owl.png"
                alt="Hero owl"
                width={1000}
                height={1000}
                priority
                sizes="(max-width: 1024px) 400px, (max-width: 1920px) 50vw"
            />
          </div>
        </div>
        <div className="hero-right-wrapper">
          <div className={`${isLoginFormVisible ? 'animate-fadeShrink' : 'animate-fadeExpandHero'}`}>
            <h1>Polymorphia</h1>
            <div className="hero-buttons">
              <ButtonWithBorder text="Zaloguj się" onClick={openLoginForm} />
              <Link href="/faq/evolution-stages">
                <ButtonWithBorder text="FAQ" />
              </Link>
            </div>
          </div>

          <div className={`hero-login ${isLoginFormVisible ? 'animate-slideInFromRight' : 'animate-slideOutToRight'}`}>
            <LoginForm onBackAction={closeLoginForm} />
          </div>
        </div>
      </BackgroundWrapper>
  )
}