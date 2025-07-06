import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import "./index.css";
import ImageBadge from "@/components/general/ImageBadge";

export default function HallOfFameImage({
  position,
  imageUrl,
}: {
  position: number;
  imageUrl: string;
}) {
  return (
    <div className="hall-of-fame-image-wrapper">
      <Image
        src={`${API_STATIC_URL}/${imageUrl}`}
        alt="User profile"
        fill
        className="hall-of-fame-image"
        priority
      />
      <ImageBadge
        text={position < 10 ? "0" + position : position.toString()}
        className={"hall-of-fame-image-badge"}
      />
    </div>
  );
}
