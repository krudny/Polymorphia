"use client";

import Slider from "@/components/slider/Slider";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/loading/Loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import useItems from "@/hooks/course/useItems";

export default function Items() {
  const searchParams = useSearchParams();
  const { data: items, isLoading, error } = useItems();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Przedmioty");
  }, [setTitle]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!items || items.length === 0) {
    return <div>No data found.</div>;
  }

  return (
    <Slider
      slides={items}
      initialSlide={parseInt(searchParams.get("slide") ?? "0")}
    />
  );
}
