"use client"

import {useQuery} from "@tanstack/react-query";
import Slider from "@/components/slider/Slider";
import {useSearchParams} from "next/navigation";
import KnowledgeBaseService from "@/services/knowledge-base/KnowledgeBaseService";
import Loading from "@/components/general/Loading";

export default function Chests() {
  const searchParams = useSearchParams();

  const { data: chests, isLoading, error } = useQuery({
    queryKey: ['chests', 1],
    queryFn: () => KnowledgeBaseService.getChests(1),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Wystąpił błąd podczas ładowania skrzynek.</div>;
  }

  if (!chests || chests.length === 0) {
    return <div>Nie znaleziono skrzynek.</div>;
  }

  return (
      <Slider slides={chests} initialSlide={parseInt(searchParams.get('slide') ?? '0') || 0} />
  )
}