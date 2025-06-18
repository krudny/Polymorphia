"use client"

import {useState, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import HallOfFameService from "@/services/HallOfFameService";

export function useDebouncedSuggestions(search: string, delay = 300) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => clearTimeout(handler);
  }, [search, delay]);

  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ["hallOfFameNamesSuggestions", debouncedSearch],
    queryFn: () => HallOfFameService.getHallOfFameNamesSuggestions(debouncedSearch),
    enabled: debouncedSearch.length >= 2, // Minimum 2 znaki
  });

  return { suggestions, loading: isLoading };
}