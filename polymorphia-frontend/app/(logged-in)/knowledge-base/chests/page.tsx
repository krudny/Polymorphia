"use client";
import Slider from "@/components/slider/Slider";
import Loading from "@/components/loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import useChests from "@/hooks/course/useChests";
import { useSearchParams } from "next/navigation";
import ErrorState from "@/components/error-state";

export default function Chests() {
  const searchParams = useSearchParams();
  const { data: chests, isLoading, isError } = useChests();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Skrzynki");
  }, [setTitle]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState message="Nie udało się załadować skrzynek." />;
  }

  if (!chests || chests.length === 0) {
    return (
      <ErrorState
        title="Brak danych"
        message="Skrzynki nie zostały zdefiniowane."
      />
    );
  }

  return (
    <Slider
      slides={chests}
      initialSlide={parseInt(searchParams.get("slide") ?? "0")}
    />
  );
}
