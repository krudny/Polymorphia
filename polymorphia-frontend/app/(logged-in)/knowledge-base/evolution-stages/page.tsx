"use client";
import Slider from "@/components/slider/Slider";
import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import Loading from "@/components/loading/Loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";

export default function EvolutionStages() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Postacie");
  }, [setTitle]);

  const {
    data: evolutionStages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["evolution_stages", 1],
    queryFn: () => KnowledgeBaseService.getEvolutionStages(1),
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

  return <Slider slides={evolutionStages} />;
}
