"use client"

import Image from "next/image";
import BackgroundWrapper from "@/components/general/BackgroundWrapper";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import LoginForm from "@/components/home/LoginForm";
import {useState} from "react";

export default function Home() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const openLoginForm = () => setIsLoginFormVisible(true);
  const closeLoginForm = () => setIsLoginFormVisible(false);

  return (
      <BackgroundWrapper className="flex flex-col-reverse md:flex-row overflow-hidden">
        <div className="w-full h-1/2 relative animate-slideInFromLeft [clip-path:polygon(0_0,_100%_30%,_100%_100%,_0%_100%)] md:w-1/2 md:h-full md:[clip-path:polygon(0_0,_100%_0,_70%_100%,_0%_100%)] ">
          <Image
              src="/hero_bg.png"
              alt="Hero background"
              fill
              className="object-cover"
              priority
              sizes="60vw"
          />
        </div>
        <div className="w-full h-1/4 md:w-1/2 md:h-full absolute overflow-y-visible opacity-0 animate-slideInFromLeftOwl">
          <div className="w-full h-full relative flex items-center justify-center  z-20 ">
            <Image
                src="/owl.png"
                alt="Hero owl"
                width={1000}
                height={1000}
                className="object-contain transform scale-90 origin-bottom md:scale-120 md:origin-top-left md:-mt-10"
                priority
                sizes="(max-width: 1024px) 400px, (max-width: 1920px) 50vw"
            />
          </div>
        </div>

        <div className="w-full h-full md:w-1/2 flex justify-center pt-20 md:pt-0 items-center relative overflow-hidden animate-slideInFromRight">
          <div className={`flex flex-col justify text-[#262626] relative z-10 transition-opacity ease-in-out duration-300
                ${isLoginFormVisible
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100 delay-[200ms] pointer-events-auto'}`}
          >
            <h1 className="text-7xl mb-8 md:text-9xl md:mb-14">Polymorphia</h1>
            <ButtonWithBorder text="Zaloguj się" onClick={openLoginForm} />
          </div>


          <div
              className={`absolute top-0 right-0 w-full h-full  flex justify-center items-center z-20 ${
                  isLoginFormVisible ? 'animate-slideInFromRight' : 'animate-slideOutToRight'
              }`}
          >
            <LoginForm onBackAction={closeLoginForm} />
          </div>
        </div>
      </BackgroundWrapper>
  )
}