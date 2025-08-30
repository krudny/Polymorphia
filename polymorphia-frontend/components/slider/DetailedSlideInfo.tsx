"use client";

import { CircleX, SquareMousePointer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import {
  DetailedSlideInfoProps,
  KnowledgeBaseTypes,
} from "@/components/slider/types";
import { ReactNode } from "react";

const SlideDetailsErrorMessage = ({
  message,
}: {
  message: string;
}): ReactNode => (
  <div className="slide-details">
    <div className="slide-details-info">
      <CircleX size={20} />
      <h3>{message}</h3>
    </div>
  </div>
);

export default function DetailedSlideInfo({
  type,
  relatedRewards,
}: DetailedSlideInfoProps) {
  if (!relatedRewards) {
    return (
      <SlideDetailsErrorMessage
        message={`Błąd ładowania ${type === KnowledgeBaseTypes.ITEM ? "skrzynek" : "przedmiotów"}`}
      />
    );
  }

  if (relatedRewards.length === 0) {
    return (
      <SlideDetailsErrorMessage
        message={
          type === KnowledgeBaseTypes.ITEM
            ? "Ten przedmiot nie występuje w żadnej ze skrzynek"
            : "W tej skrzynce nie znajdują się żadne przedmioty"
        }
      />
    );
  }

  return (
    <div className="slide-details">
      <div className="slide-details-info">
        <SquareMousePointer size={20} />
        <h3 className="text-xl 2xl:text-2xl">{`Kliknij na ${type === "ITEM" ? "skrzynkę" : "przedmiot"} aby dowiedzieć się więcej`}</h3>
      </div>
      <div className="slide-details-content">
        {relatedRewards.map((relatedReward) => {
          return (
            <Link
              href={`/knowledge-base/${type === "ITEM" ? "chests" : "items"}?slide=${relatedReward.orderIndex}`}
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
