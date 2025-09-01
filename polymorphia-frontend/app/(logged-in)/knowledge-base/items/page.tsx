"use client";

import Slider from "@/components/slider/Slider";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import Loading from "@/components/loading/Loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useContext, useEffect } from "react";
import { UserContext } from "@/components/providers/user/UserContext";

export default function Items() {
  const searchParams = useSearchParams();
  const { setTitle } = useTitle();
  const { courseId } = useContext(UserContext);

  useEffect(() => {
    setTitle("Przedmioty");
  }, [setTitle]);

  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items", 1],
    queryFn: () => KnowledgeBaseService.getItems(courseId),
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
      initialSlide={parseInt(searchParams.get("slide") ?? "0")}
    />
  );
}
