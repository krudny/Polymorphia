"use client";
import Slider from "@/components/slider/Slider";
import Loading from "@/components/loading/Loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import useChests from "@/hooks/useChests";

export default function Chests() {
  const { data: chests, isLoading, error } = useChests();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Skrzynie");
  }, [setTitle]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading chests: {error.message}</div>;
  }

  if (!chests || chests.length === 0) {
    return <div>No chests found.</div>;
  }

  return <Slider slides={chests} />;
}
