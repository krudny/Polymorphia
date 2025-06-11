import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import "../../styles/hall-of-fame.css"
import ImageBadge from "@/components/general/ImageBadge";

export default function RankImage({ position }: { position: number }) {
  return (
    <div className="hall-of-fame-image-wrapper">
      <Image
        src={`${API_STATIC_URL}/images/evolution-stages/4.jpg`}
        alt="User profile"
        fill
        className="hall-of-fame-image"
        priority
      />
      <ImageBadge number={position} className={"rounded-tl-xl rounded-br-xl w-5 lg:min-w-8"}/>
    </div>
  );
}
