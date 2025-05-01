"use client"

import Image from "next/image";
import BackgroundWrapper from "@/components/general/BackgroundWrapper";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import LoginForm from "@/components/home/LoginForm";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import "../styles/home.css"
import gsap from "gsap";

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
    if (!hasMountedRef.current || !loginFormRef.current || !titleSectionRef.current) return;
    const isVisible = isLoginFormVisible;

    gsap.timeline()
        .to(titleSectionRef.current, { opacity: isVisible ? 0 : 1, scale: isVisible ? 0.8 : 1, duration: 0.5, ease: "power3.inOut" })
        .fromTo(
            loginFormRef.current,
            isVisible ? { x: "0%", opacity: 0 } : { x: "-100%" },
            isVisible ? { x: "-100%", opacity: 1, duration: 0.4, ease: "power2.inOut" } : { x: "0%", opacity: 0, duration: 0.6, ease: "power2.inOut", yoyo: true },
            "<"
        );
  }, [isLoginFormVisible]);

  useEffect(() => {
    gsap.timeline()
        .fromTo(backgroundRef.current, { x: "-100%", autoAlpha: 0 }, { x: "0%", autoAlpha: 1, duration: 0.4, ease: "power2.inOut" })
        .fromTo(titleSectionRef.current, { x: "100%", autoAlpha: 0 }, { x: "0%", autoAlpha: 1, duration: 0.7, ease: "power2.inOut" }, ">")
        .fromTo(imageRef.current, { x: "-100%", autoAlpha: 0 }, { x: "0%", autoAlpha: 1, duration: 0.7, ease: "power2.inOut" }, "<")
        .then(() => {
          hasMountedRef.current = true;
        });
  }, []);

  return (
      <BackgroundWrapper className="hero-background-wrapper">
        <div className="hero-background-image" ref={backgroundRef}>
          <Image
              src="/hero_bg.png"
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
          <div ref={titleSectionRef}>
            <h1>Polymorphia</h1>
            <div className="hero-buttons">
              <ButtonWithBorder text="Zaloguj się" onClick={openLoginForm} />
              <Link href="/knowledge-base/evolution-stages">
                <ButtonWithBorder text="Baza wiedzy" />
              </Link>
            </div>
          </div>

          <div className={`hero-login`} ref={loginFormRef}>
            <LoginForm onBackAction={closeLoginForm} />
          </div>
        </div>
      </BackgroundWrapper>
  )
}