"use client";

import { KnowledgeBaseSlideTypes } from "@/components/slider/types";
import KnowledgeBaseSliderView from "@/views/knowledge-base";

export default function Items() {
  return <KnowledgeBaseSliderView type={KnowledgeBaseSlideTypes.ITEM} />;
}
