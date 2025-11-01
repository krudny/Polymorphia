"use client";
import Slider from "@/components/slider/Slider";
import Loading from "@/components/loading";
import useEvolutionStages from "@/hooks/course/useEvolutionStages";

export default function EvolutionStages() {
  const { data: evolutionStages, isLoading, error } = useEvolutionStages();

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
