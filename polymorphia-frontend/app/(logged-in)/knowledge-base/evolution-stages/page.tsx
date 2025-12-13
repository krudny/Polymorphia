"use client";
import KnowledgeBaseSliderView from "@/views/knowledge-base";
import { KnowledgeBaseSlideTypes } from "@/components/slider/types";

export default function EvolutionStages() {
  return (
    <KnowledgeBaseSliderView type={KnowledgeBaseSlideTypes.EVOLUTION_STAGE} />
  );
}
