"use client";

import { useLayoutEffect, useState } from "react";
import { useInvitationToken } from "@/hooks/general/useInvitationToken";
import { animateLoginFormVisibility } from "@/animations/Home";
import { HomeContentProps } from "./types";
import RegisterForm from "@/components/home/register-form";
import LoginForm from "@/components/home/login-form";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import { useLoginFormAnimation } from "@/hooks/general/useLoginFormAnimation";

export default function HomeContent({
  titleRef,
  hasMountedRef,
}: HomeContentProps) {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const { loginFormRef } = useLoginFormAnimation({
    isLoginFormVisible,
    titleRef,
    hasMountedRef,
  });
  const invitationToken = useInvitationToken();

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
              <ButtonWithBorder text="Zaloguj się" onClick={openLoginForm} />
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
