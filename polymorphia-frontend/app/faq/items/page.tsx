"use client"

import Slider from "@/components/slider/Slider";
import FaqService from "@/services/faq/FaqService";
import {useQuery} from "@tanstack/react-query";
import Loading from "@/components/general/Loading";
import {useSearchParams} from "next/navigation";

export default function Items() {
  const searchParams = useSearchParams();

  const { data: items, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: FaqService.getItems,
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
      <Slider slides={items} initialSlide={parseInt(searchParams.get('slide') ?? '0') || 0} />
  )
}