"use client"

import {useQuery} from "@tanstack/react-query";
import FaqService from "@/services/faq/FaqService";
import Loading from "@/components/general/Loading";
import Slider from "@/components/slider/Slider";
import {useSearchParams} from "next/navigation";

export default function Chests() {
  const searchParams = useSearchParams();

  const { data: chests, isLoading, error } = useQuery({
    queryKey: ['chests'],
    queryFn: FaqService.getChests,
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
      <Slider slides={chests} initialSlide={parseInt(searchParams.get('slide') ?? '0') || 0} />
  )
}