import Image from "next/image";
import {ReactNode} from "react";
import Link from "next/link";

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
          <div className="w-full flex justify-center items-center h-16 text-center">
            <Link href="/home"><h3 className="text-4xl">Polymorphia</h3></Link>
          </div>
          {children}
        </div>
      </div>
  )
}