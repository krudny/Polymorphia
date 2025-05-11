"use client"
import Slider from "@/components/slider/Slider";
import {useQuery} from "@tanstack/react-query";
import KnowledgeBaseService from "@/services/knowledge-base/KnowledgeBaseService";
import Loading from "@/components/general/Loading";

export default function EvolutionStages() {
  const { data: evolutionStages, isLoading, error } = useQuery({
    queryKey: ['evolution_stages', 1],
    queryFn: () => KnowledgeBaseService.getEvolutionStages(1),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Wystąpił błąd podczas ładowania poziomów doświadczenia.</div>;
  }

  if (!evolutionStages || evolutionStages.length === 0) {
    return <div>Nie znaleziono poziomów doświadczenia.</div>;
  }

  return (
      <Slider slides={evolutionStages}/>
  )
}