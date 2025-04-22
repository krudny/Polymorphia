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
      <BackgroundWrapper className="flex">
        <div className="w-1/2 h-full relative [clip-path:polygon(0_0,_100%_0,_70%_100%,_0%_100%)]">
          <Image
              src="/hero_bg.png"
              alt="Hero background"
              fill
              className="object-cover"
              priority
          />
        </div>
        <div className="w-1/2 h-full absolute overflow-y-clip">
          <div className="w-full h-full relative flex items-center overflow-visible z-20">
            <Image
                src="/owl.png"
                alt="Hero owl"
                width={1000}
                height={1000}
                className="object-contain transform scale-120 origin-top-left -mt-10"
                priority
            />
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center relative overflow-hidden">
          <div className={`flex flex-col justify-center text-[#262626] relative z-10 transition-opacity ease-in-out duration-300
                ${isLoginFormVisible
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100 delay-[300ms] pointer-events-auto'}`}
          >
            <h1 className="text-9xl mb-14">Polymorphia</h1>
            <ButtonWithBorder text="Zaloguj się" onClick={openLoginForm} />
          </div>


          <div
              className={`absolute top-0 right-0 w-full h-full  flex justify-center items-center transition-transform duration-500 ease-in-out z-20 ${
                  isLoginFormVisible ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <LoginForm onBack={closeLoginForm} />
          </div>
        </div>
      </BackgroundWrapper>
  )
}