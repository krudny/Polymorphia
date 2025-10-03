"use client";

import { useLayoutEffect, useState } from "react";
import { useInvitationToken } from "@/hooks/general/useInvitationToken";
import {
  animateInitialMount,
  animateLoginFormVisibility,
} from "@/animations/Home";
import { HomeContentProps } from "./types";
import RegisterForm from "@/components/home/register-form";
import LoginForm from "@/components/home/login-form";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";

export default function HomeContent({
  titleRef,
  loginFormRef,
  hasMountedRef,
  backgroundRef,
  imageRef,
}: HomeContentProps) {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const invitationToken = useInvitationToken();

  const openLoginForm = () => setIsLoginFormVisible(true);
  const closeLoginForm = () => setIsLoginFormVisible(false);

  useLayoutEffect(() => {
    if (!backgroundRef?.current || !titleRef.current || !imageRef?.current) {
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
  }, [backgroundRef, titleRef, imageRef, hasMountedRef]);

  useLayoutEffect(() => {
    if (!hasMountedRef.current || !loginFormRef.current || !titleRef.current) {
      return;
    }

    animateLoginFormVisibility(
      loginFormRef.current,
      titleRef.current,
      isLoginFormVisible
    );
  }, [isLoginFormVisible, titleRef, loginFormRef, hasMountedRef]);

  return (
    <div className="hero-right-wrapper">
      {invitationToken ? (
        <div className="hero-register" ref={titleRef}>
          <RegisterForm invitationToken={invitationToken} />
        </div>
      ) : (
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

          <div className="hero-login" ref={loginFormRef}>
            <LoginForm onBackAction={closeLoginForm} />
          </div>
        </>
      )}
    </div>
  );
}
