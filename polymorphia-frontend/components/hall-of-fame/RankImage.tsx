import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";

export default function RankImage({ position }: { position: number }) {
  return (
    <div className="h-full relative aspect-square bg-purple-400">
      <Image
        src={`${API_STATIC_URL}/images/evolution-stages/4.jpg`}
        alt="User profile"
        fill
        className="object-cover rounded-xl lg:rounded-bl-xl lg:rounded-tr-none"
        priority
      />
      <div className="absolute bg-neutral-300/85 backdrop-blur-sm flex-col-centered bottom-0 right-0 rounded-tl-xl rounded-br-xl w-5 lg:min-w-8 aspect-square">
        <h1 className="text-md lg:text-2xl lg:px-2 px-1">
          {position < 10 ? "0" + position : position}
        </h1>
      </div>
    </div>
  );
}
