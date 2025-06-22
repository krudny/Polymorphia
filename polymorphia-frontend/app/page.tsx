"use client";

import Image from "next/image";
import BackgroundWrapper from "@/components/general/BackgroundWrapper";
import ButtonWithBorder from "@/components/general/ButtonWithBorder";
import LoginForm from "@/components/home/LoginForm";
import { useEffect, useRef, useState } from "react";
import "../styles/home.css";
import {
  animateInitialMount,
  animateLoginFormVisibility,
} from "@/animations/Home";
import { API_STATIC_URL } from "@/services/api";

export default function Home() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const openLoginForm = () => setIsLoginFormVisible(true);
  const closeLoginForm = () => setIsLoginFormVisible(false);

  const loginFormRef = useRef<HTMLDivElement>(null);
  const titleSectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!backgroundRef.current || !titleSectionRef.current || !imageRef.current)
      return;
    animateInitialMount(
      backgroundRef.current,
      titleSectionRef.current,
      imageRef.current,
      () => {
        hasMountedRef.current = true;
      }
    );
  }, []);

  useEffect(() => {
    if (
      !hasMountedRef.current ||
      !loginFormRef.current ||
      !titleSectionRef.current
    )
      return;
    animateLoginFormVisibility(
      loginFormRef.current,
      titleSectionRef.current,
      isLoginFormVisible
    );
  }, [isLoginFormVisible]);

  return (
    <BackgroundWrapper className="hero-background-wrapper">
      <div className="hero-background-image" ref={backgroundRef}>
        <Image
          src={`${API_STATIC_URL}/images/general/hero_bg.png`}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="60vw"
        />
      </div>
      <div className="hero-image-wrapper" ref={imageRef}>
        <div>
          <Image
            src={`${API_STATIC_URL}/images/general/owl.png`}
            alt="Hero owl"
            width={1000}
            height={1000}
            priority
            sizes="(max-width: 1024px) 400px, (max-width: 1920px) 50vw"
          />
        </div>
      </div>
      <div className="hero-right-wrapper">
        <div ref={titleSectionRef}>
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
    </BackgroundWrapper>
  );
}
