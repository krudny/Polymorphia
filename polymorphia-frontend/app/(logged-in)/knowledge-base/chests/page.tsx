"use client";
import Slider from "@/components/slider/Slider";
import Loading from "@/components/loading";
import useChests from "@/hooks/course/useChests";
import { useSearchParams } from "next/navigation";

export default function Chests() {
  const searchParams = useSearchParams();
  const { data: chests, isLoading, error } = useChests();

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
      initialSlide={parseInt(searchParams.get("slide") ?? "0")}
    />
  );
}
