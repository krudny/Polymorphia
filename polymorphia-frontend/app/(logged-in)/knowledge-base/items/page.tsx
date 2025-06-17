"use client";

import Slider from "@/components/slider/Slider";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import KnowledgeBaseService from "@/services/KnowledgeBaseService";
import Loading from "@/components/general/Loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";

export default function Items() {
  const searchParams = useSearchParams();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Przedmioty");
  }, [setTitle]);

  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items", 1],
    queryFn: () => KnowledgeBaseService.getItems(1),
    retry: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading items: {error.message}</div>;
  }

  if (!items || items.length === 0) {
    return <div>No items found.</div>;
  }

  return (
    <Slider
      slides={items}
      initialSlide={parseInt(searchParams.get("slide") ?? "0") || 0}
    />
  );
}
