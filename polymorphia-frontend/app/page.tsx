"use client";

import Image from "next/image";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import LoginForm from "@/components/home/LoginForm";
import {useLayoutEffect, useRef, useState} from "react";
import {animateLoginFormVisibility} from "@/animations/Home";
import "./index.css";
import {useHeroAnimation} from "@/hooks/general/useHeroAnimation";

export default function Home() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const loginFormRef = useRef<HTMLDivElement>(null);
  const { backgroundRef, imageRef, titleRef, hasMountedRef } =
    useHeroAnimation();

  const openLoginForm = () => setIsLoginFormVisible(true);
  const closeLoginForm = () => setIsLoginFormVisible(false);

  useLayoutEffect(() => {
    if (!hasMountedRef.current || !loginFormRef.current || !titleRef.current) {
      return;
    }

    animateLoginFormVisibility(
      loginFormRef.current,
      titleRef.current,
      isLoginFormVisible
    );
  }, [isLoginFormVisible, titleRef, hasMountedRef]);

  return (
    <>
      <div className="hero-background-image" ref={backgroundRef}>
        <Image src="/hero-bg.webp" alt="Hero background" fill className="object-cover"


               
               priority
          fetchPriority="high"  sizes="60vw"
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
        <div ref={titleRef} className="hero-login-wrapper">
          <h1>Polymorphia</h1>
          <div className="hero-buttons">
            <ButtonWithBorder
              text="Zaloguj się"
              onClick={openLoginForm}
              forceDark
            />
          </div>
        </div>

        <div className={`hero-login`} ref={loginFormRef}>
          <LoginForm onBackAction={closeLoginForm} />
        </div>
      </div>
    </>
  );
}
