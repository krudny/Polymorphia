"use client";
import { KnowledgeBaseSlideTypes } from "@/components/slider/types";
import KnowledgeBaseSliderView from "@/views/knowledge-base";

export default function Chests() {
  return <KnowledgeBaseSliderView type={KnowledgeBaseSlideTypes.CHEST} />;
}
