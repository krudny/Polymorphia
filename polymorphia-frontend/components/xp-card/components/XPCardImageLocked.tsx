import { XPCardImageWithLockProps } from "@/components/xp-card/components/types";
import Image from "next/image";
import { API_STATIC_URL } from "@/services/api";
import "./index.css";

export default function XPCardImageWithLock({
  imageUrl,
  alt,
  isLocked,
}: XPCardImageWithLockProps) {
  return (
    <div className="xp-card-image">
      <Image
        src={`${API_STATIC_URL}/${imageUrl}`}
        alt={alt}
        fill
        priority
        fetchPriority="high"
      />
      {isLocked && (
        <div className="xp-card-locked-item">
          <span>
            <p>lock</p>
          </span>
        </div>
      )}
    </div>
  );
}
