import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import "../../styles/hall-of-fame.css";
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
      <ImageBadge
        text={position < 10 ? "0" + position : position.toString()}
        className={
          "rounded-tl-xl rounded-br-xl w-5 text-base lg:text-2xl lg:min-w-8 lg:rounded-br-none"
        }
      />
    </div>
  );
}
