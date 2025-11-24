"use client";

import { useLayoutEffect, useState } from "react";
import { animateLoginFormVisibility } from "@/animations/Home";
import { HomeContentProps } from "@/components/home/types";
import RegisterForm from "@/components/home/register-form";
import LoginForm from "@/components/home/login-form";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import { useLoginFormAnimation } from "@/hooks/general/useLoginFormAnimation";
import { useToken } from "@/hooks/general/useToken";
import { TokenTypes } from "@/interfaces/api/token";
import ResetPasswordForm from "@/components/home/reset-password-form";

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
  const { type, token } = useToken();

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

  const renderContent = () => {
    switch (type) {
      case TokenTypes.INVITATION:
        return token ? (
          <div className="hero-register" ref={titleRef}>
            <RegisterForm token={token} />
          </div>
        ) : null;

      case TokenTypes.FORGOT_PASSWORD:
        return token ? (
          <div className="hero-register" ref={titleRef}>
            <ResetPasswordForm token={token} />
          </div>
        ) : null;

      default:
        return (
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
        );
    }
  };

  return <div className="hero-right-wrapper">{renderContent()}</div>;
}
