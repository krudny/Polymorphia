"use client";
import { KNOWLEDGE_BASE_ERROR_MESSAGES } from "@/views/knowledge-base/util";
import { KnowledgeBaseSliderViewProps } from "./types";
import Slider from "@/components/slider/Slider";
import Loading from "@/components/loading";
import ErrorComponent from "@/components/error";
import { useSearchParams } from "next/navigation";
import { useKnowledgeBase } from "@/hooks/course/knowledge-base/useKnowledgeBase";

export default function KnowledgeBaseSliderView({
  type,
}: KnowledgeBaseSliderViewProps) {
  const messages = KNOWLEDGE_BASE_ERROR_MESSAGES[type];
  const searchParams = useSearchParams();
  const { data, isLoading, isError } = useKnowledgeBase(type);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent message={messages.error} />;
  }

  if (!data || data.length === 0) {
    return <ErrorComponent title="Brak danych" message={messages.empty} />;
  }

  return (
    <Slider
      slides={data}
      initialSlide={parseInt(searchParams.get("slide") ?? "0")}
    />
  );
}
