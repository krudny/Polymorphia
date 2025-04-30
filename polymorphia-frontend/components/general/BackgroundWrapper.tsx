import Image from "next/image";
import {BackgroundWrapperProps} from "@/interfaces/general/BackgroundWrapperInterface";
import clsx from "clsx";


export default function BackgroundWrapper({ children, className }: BackgroundWrapperProps) {
  return (
      <div className={clsx("background-wrapper", className)}>
        <Image
            src="/background.png"
            alt="White background"
            fill={true}
            className="object-cover -z-10"
            priority
        />
        {children}
      </div>
  )
}