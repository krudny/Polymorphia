import Image from "next/image";
import {ReactNode} from "react";

export default function FaqLayout({children}: {children: ReactNode}) {
  return (
      <div className="w-screen h-screen relative bg-black">
        <Image
            src="/background.png"
            alt="Background"
            fill
            className="absolute object-cover"
            priority
            sizes="100%"
        />
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="w-full flex justify-center items-center h-10 md:h-16 text-center">
            <h3 className="text-2xl md:text-4xl">Polymorphia</h3>
          </div>
          {children}
        </div>
      </div>
  )
}