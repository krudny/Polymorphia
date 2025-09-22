"use client";

import Image from "next/image";
import BackgroundWrapper from "@/components/background-wrapper/BackgroundWrapper";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import LoginForm from "@/components/home/login-form";
import {useLayoutEffect, useRef, useState} from "react";
import {animateInitialMount, animateLoginFormVisibility,} from "@/animations/Home";
import "./index.css";
import {useSearchParams} from "next/navigation";
import RegisterForm from "@/components/home/register-form";

export default function Home() {
  const searchParams = useSearchParams();
  const invitationToken = searchParams.get('invitationToken');

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const openLoginForm = () => setIsLoginFormVisible(true);
  const closeLoginForm = () => setIsLoginFormVisible(false);

  const loginFormRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useLayoutEffect(() => {
    if (!backgroundRef.current || !titleRef.current || !imageRef.current) {
      return;
    }

    animateInitialMount(
      backgroundRef.current,
      titleRef.current,
      imageRef.current,
      () => {
        hasMountedRef.current = true;
      }
    );
  }, []);

  useLayoutEffect(() => {
    if (!hasMountedRef.current || !loginFormRef.current || !titleRef.current) {
      return;
    }

    animateLoginFormVisibility(
      loginFormRef.current,
      titleRef.current,
      isLoginFormVisible
    );
  }, [isLoginFormVisible]);

  return (
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
        {invitationToken ?
          <div className="flex-col-centered" ref={titleRef}>
            <div className="hero-register">
              <RegisterForm invitationToken={invitationToken}/>
            </div>
          </div> :
          <>
          <div ref={titleRef}>
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
          </>
        }
      </div>
    </BackgroundWrapper>
  );
}
