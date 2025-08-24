"use client";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import {
  HallOfFameContext,
  HallOfFameProvider,
} from "@/components/providers/hall-of-fame/HallOfFameContext";
import HallOfFameMobile from "@/components/hall-of-fame/mobile/HallOfFameMobile";
import FiltersModal from "@/components/filters/modals/FiltersModal";
import HallOfFameDesktop from "@/components/hall-of-fame/desktop/HallOfFameDesktop";
import { useQueryClient } from "@tanstack/react-query";
import {
  HallOfFameContextInterface,
  HallOfFameFilterId,
} from "@/components/providers/hall-of-fame/types";

export default function HallOfFame() {
  const queryClient = useQueryClient();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Hall of Fame");
  }, [setTitle]);

  return (
    <HallOfFameProvider>
      <div className="w-full lg:hidden">
        <HallOfFameMobile />
      </div>
      <div className="w-full hidden lg:flex flex-col-centered flex-1">
        <HallOfFameDesktop />
      </div>
      <FiltersModal<HallOfFameFilterId, HallOfFameContextInterface>
        context={HallOfFameContext}
        onFiltersApplied={() => {
          queryClient.invalidateQueries({
            queryKey: ["hallOfFame"],
          });
        }}
      />
    </HallOfFameProvider>
  );
}
