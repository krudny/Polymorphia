"use client";

import Slider from "@/components/slider/Slider";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/loading";
import useItems from "@/hooks/course/useItems";
import ErrorComponent from "@/components/error";

export default function Items() {
  const searchParams = useSearchParams();
  const { data: items, isLoading, isError } = useItems();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorComponent message="Nie udało się załadować listy przedmiotów." />
    );
  }

  if (!items || items.length === 0) {
    return (
      <ErrorComponent
        title="Brak danych"
        message="Przedmioty nie zostały zdefiniowane."
      />
    );
  }

  return (
    <Slider
      slides={items}
      initialSlide={parseInt(searchParams.get("slide") ?? "0")}
    />
  );
}
