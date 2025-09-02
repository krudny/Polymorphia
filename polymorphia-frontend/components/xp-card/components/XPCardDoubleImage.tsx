import { XPCardDoubleImageProps } from "@/components/xp-card/components/types";
import Image from "next/image";
import { API_STATIC_URL } from "@/services/api";
import "./index.css";

export default function XPCardDoubleImage({ images }: XPCardDoubleImageProps) {
  return (
    <div className="xp-card-double-image">
      {images.map((image, index) => (
        <div
          key={index}
          className="xp-card-double-image-item"
          style={{ width: `${100 / images.length}%` }}
        >
          <Image
            src={`${API_STATIC_URL}/${image.imageUrl}`}
            alt={image.alt}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}
