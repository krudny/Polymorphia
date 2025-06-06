import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";

export default function RankImage() {
  return (
    <div className="h-full relative aspect-square">
      <Image
        src={`${API_STATIC_URL}/images/evolution-stages/4.jpg`}
        alt="User profile"
        fill
        className="object-cover rounded-tr-xl rounded-tl-xl lg:rounded-bl-xl lg:rounded-tr-none"
        priority
      />
      <div className="absolute bg-neutral-300 opacity-95 flex-col-centered bottom-0 right-0 rounded-tl-xl aspect-square">
        <h1 className="text-3xl lg:text-xl lg:px-2 lg:py-1 px-3 py-2">05</h1>
      </div>
    </div>
  );
}
