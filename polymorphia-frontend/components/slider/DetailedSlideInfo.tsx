"use client";

import { CircleX, SquareMousePointer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import { DetailedSlideInfoProps } from "@/components/slider/types";

export default function DetailedSlideInfo({
  type,
  relatedRewards,
}: DetailedSlideInfoProps) {
  if (!relatedRewards || relatedRewards.length === 0) {
    return (
      <div className="slide-details">
        <div className="slide-details-info">
          <CircleX size={20} />
          <h3 className="text-xl 2xl:text-2xl">
            {type === "item"
              ? "Ten przedmiot nie występuje w żadnej ze skrzynek"
              : "W tej skrzynce nie znajdują się żadne przedmioty"}
            .
          </h3>
        </div>
      </div>
    );
  }

  const sortedRelatedRewards = relatedRewards.sort(
    (a, b) => a.order_index - b.order_index
  );

  return (
    <div className="slide-details">
      <div className="slide-details-info">
        <SquareMousePointer size={20} />
        <h3 className="text-xl 2xl:text-2xl">{`Kliknij na ${type === "item" ? "skrzynkę" : "przedmiot"} aby dowiedzieć się więcej`}</h3>
      </div>
      <div className="slide-details-content">
        {sortedRelatedRewards.map((relatedReward) => {
          return (
            <Link
              href={`/knowledge-base/${type === "item" ? "chests" : "items"}?slide=${relatedReward.order_index}`}
              key={relatedReward.id}
            >
              <div className="slide-details-image">
                <Image
                  src={`${API_STATIC_URL}/${relatedReward.imageUrl}`}
                  fill
                  alt={relatedReward.name}
                  sizes="10vw"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
