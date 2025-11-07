"use client";
import Slider from "@/components/slider/Slider";
import Loading from "@/components/loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import useChests from "@/hooks/course/useChests";
import { useSearchParams } from "next/navigation";
import ErrorComponent from "@/components/error";

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
    return <ErrorComponent message="Nie udało się załadować skrzynek." />;
  }

  if (!chests || chests.length === 0) {
    return (
      <ErrorComponent
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
