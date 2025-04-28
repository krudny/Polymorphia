"use client"

import Slider from "@/components/slider/Slider";
import FaqService from "@/services/faq/FaqService";
import {useQuery} from "@tanstack/react-query";
import Loading from "@/components/general/Loading";

export default function Items() {
  const { data: items, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: FaqService.getItems,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading rewards: {error.message}</div>;
  }

  if (!items || items.length === 0) {
    return <div>No evolution stages found.</div>;
  }

  return (
      <Slider slides={items}/>
  )
}