"use client";
import Slider from "@/components/slider/Slider";
import Loading from "@/components/loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import useEvolutionStages from "@/hooks/course/useEvolutionStages";
import ErrorComponent from "@/components/error";

export default function EvolutionStages() {
  const { data: evolutionStages, isLoading, isError } = useEvolutionStages();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Postacie");
  }, [setTitle]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorComponent message="Nie udało się załadować poziomów ewolucji." />
    );
  }

  if (!evolutionStages || evolutionStages.length === 0) {
    return (
      <ErrorComponent
        title="Brak danych"
        message="Poziomy ewolucji nie zostały zdefiniowane."
      />
    );
  }

  return <Slider slides={evolutionStages} />;
}
