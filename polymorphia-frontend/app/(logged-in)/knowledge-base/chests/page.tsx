"use client";

import { useQuery } from "@tanstack/react-query";
import Slider from "@/components/slider/Slider";
import { useSearchParams } from "next/navigation";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import Loading from "@/components/general/Loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";

export default function Chests() {
  const searchParams = useSearchParams();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Skrzynki");
  }, [setTitle]);

  const {
    data: chests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chests", 1],
    queryFn: () => KnowledgeBaseService.getChests(1),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading chests: {error.message}</div>;
  }

  if (!chests || chests.length === 0) {
    return <div>No chests found.</div>;
  }

  return (
    <Slider
      slides={chests}
      initialSlide={parseInt(searchParams.get("slide") ?? "0") || 0}
    />
  );
}
