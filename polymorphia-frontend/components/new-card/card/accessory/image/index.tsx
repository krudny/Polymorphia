import Image from "next/image";
import "./index.css";
import { API_STATIC_URL } from "@/services/api";
import { NewCardImageAccessoryProps } from "@/components/new-card/card/accessory/image/types";

export default function NewCardImageAccessory({
  imageUrl,
  alt,
}: NewCardImageAccessoryProps) {
  return (
    <div className="new-card-image-accessory">
      <Image
        src={`${API_STATIC_URL}/${imageUrl}`}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        className="object-cover"
      />
    </div>
  );
}
