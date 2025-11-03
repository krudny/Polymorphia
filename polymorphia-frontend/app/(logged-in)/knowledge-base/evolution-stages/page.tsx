"use client";
import Slider from "@/components/slider/Slider";
import Loading from "@/components/loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import useEvolutionStages from "@/hooks/course/useEvolutionStages";
import ErrorState from "@/components/error-state";

export default function EvolutionStages() {
  const { data: evolutionStages, isLoading, error } = useEvolutionStages();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Postacie");
  }, [setTitle]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState message="Nie udało się załadować poziomów ewolucji." />;
  }

  if (!evolutionStages || evolutionStages.length === 0) {
    return (
      <ErrorState
        title="Brak danych"
        message="Poziomy ewolucji nie zostały zdefiniowane."
      />
    );
  }

  return <Slider slides={evolutionStages} />;
}
