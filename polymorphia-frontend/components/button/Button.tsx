import {ButtonProps} from "@/interfaces/button/ButtonInterfaces";

export default function Button({text, className, onClick}: ButtonProps) {
  return (
        <button
            className={`${className} bg-[#212121] rounded-lg px-6 py-1 md:px-8 md:py-2 md:text-2xl text-xl text-neutral-100 transition-all duration-200 ease-linear hover:cursor-pointer hover:bg-[#121212] `}
            onClick={onClick}
        >
          {text}
        </button>
  )
}