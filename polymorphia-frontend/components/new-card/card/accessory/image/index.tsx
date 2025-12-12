import Image from "next/image";
import "./index.css";
import { API_STATIC_URL } from "@/services/api";
import { NewCardImageAccessoryProps } from "./types";

export default function NewCardImageAccessory({
  imageUrl,
  alt,
}: NewCardImageAccessoryProps) {
  return (
    <div className="w-full h-full relative flex-shrink-0 select-none aspect-square">
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
