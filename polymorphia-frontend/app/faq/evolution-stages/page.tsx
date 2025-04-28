"use client"
import Slider from "@/components/slider/Slider";
import FaqService from "@/services/faq/FaqService";
import {useQuery} from "@tanstack/react-query";
import Loading from "@/components/general/Loading";

export default function EvolutionStages() {
  const { data: evolutionStages, isLoading, error } = useQuery({
    queryKey: ['evolution_stages'],
    queryFn: FaqService.getEvolutionStages,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading evolution stages: {error.message}</div>;
  }

  if (!evolutionStages || evolutionStages.length === 0) {
    return <div>No evolution stages found.</div>;
  }

  return (
      <Slider slides={evolutionStages}/>
  )
}