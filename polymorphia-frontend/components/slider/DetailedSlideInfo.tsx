"use client"

import {SquareMousePointer} from "lucide-react";
import Image from "next/image";

export default function DetailedSlideInfo({type, ids}: {type: string, ids: number[]}) {
  console.log(type, ids);

  return (
      <div className="w-full flex flex-col items-center mt-4 lg:items-end">
        <div className="flex items-center my-1 gap-x-1 text-neutral-600">
          <SquareMousePointer size={20} />
          <h3 className="text-xl 2xl:text-2xl">{`Kliknij na ${type==='item' ? 'skrzynkę' : 'przedmiot'} aby dowiedzieć się więcej`}</h3>
        </div>
        <div className="flex flex-wrap  gap-4 justify-center lg:justify-end">
          {[1,2,3,4].map(item => (
              <div key={item} className="relative h-20 aspect-square ">
                <Image
                    src="/chest1.png"
                    fill
                    alt="Chest image"
                    className="rounded-xl object-cover shadow-2xl"
                />
              </div>
          ))}
        </div>
      </div>
  )
}