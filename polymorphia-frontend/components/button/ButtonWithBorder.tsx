import React from 'react';
import {ButtonWithBorderProps} from "@/interfaces/button/ButtonInterfaces";

export default function ButtonWithBorder({ text, className, onClick }: ButtonWithBorderProps) {
  return (
      <button
          className={`block mx-auto text-3xl py-2 px-8 border-2 border-solid border-[#262626] 
          self-center w-auto transition-all duration-300 ease-in-out hover:bg-[#262626] 
          hover:cursor-pointer hover:text-neutral-300 ${className}`}
          onClick={onClick}
      >
        {text}
      </button>
  );
}