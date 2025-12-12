"use client";
import {
  KNOWLEDGE_BASE_ERROR_MESSAGES,
  KNOWLEDGE_BASE_SLIDE_HOOKS,
} from "@/views/knowledge-base/util";
import { KnowledgeBaseSliderViewProps } from "./types";
import Slider from "@/components/slider/Slider";
import Loading from "@/components/loading";
import ErrorComponent from "@/components/error";
import { useSearchParams } from "next/navigation";

export default function KnowledgeBaseSliderView({
  type,
}: KnowledgeBaseSliderViewProps) {
  const useHook = KNOWLEDGE_BASE_SLIDE_HOOKS[type];
  const messages = KNOWLEDGE_BASE_ERROR_MESSAGES[type];
  const searchParams = useSearchParams();
  const { data, isLoading, isError } = useHook();

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
