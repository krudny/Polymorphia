"use client"

import Slider from "@/components/slider/Slider";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import KnowledgeBaseService from "@/services/knowledge-base/KnowledgeBaseService";
import Loading from "@/components/general/Loading";

export default function Items() {
  const searchParams = useSearchParams();

  const { data: items, isLoading, error } = useQuery({
    queryKey: ['items', 1],
    queryFn: () => KnowledgeBaseService.getItems(1),
    retry: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Wystąpił błąd podczas ładowania przedmiotów.</div>;
  }

  if (!items || items.length === 0) {
    return <div>Nie znaleziono przedmiotów.</div>;
  }

  return (
      <Slider slides={items} initialSlide={parseInt(searchParams.get('slide') ?? '0') || 0} />
  )
}