"use client";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import { HallOfFameProvider } from "@/providers/hall-of-fame/HallOfFameContext";
import HallOfFameMobile from "@/components/hall-of-fame/mobile/HallOfFameMobile";
import FiltersModal from "@/components/filters/modals/FiltersModal";
import HallOfFameDesktop from "@/components/hall-of-fame/desktop/HallOfFameDesktop";
import { useQueryClient } from "@tanstack/react-query";
import { HallOfFameFilterId } from "@/providers/hall-of-fame/types";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";

function HallOfFameContent() {
  const queryClient = useQueryClient();
  const {
    filters,
    isModalOpen,
    setIsModalOpen,
    setPage,
    isFiltersLoading,
    isFiltersError,
  } = useHallOfFameContext();

  const handleApplyFilters = () => {
    queryClient.invalidateQueries({
      queryKey: ["hallOfFame"],
    });
    setPage(0);
  };

  return (
    <>
      <div className="w-full lg:hidden">
        <HallOfFameMobile />
      </div>
      <div className="w-full hidden lg:flex flex-col-centered flex-1">
        <HallOfFameDesktop />
      </div>
      <FiltersModal<HallOfFameFilterId>
        filters={filters}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isFiltersLoading={isFiltersLoading}
        isFiltersError={isFiltersError}
        onFiltersApplied={() => handleApplyFilters()}
      />
    </>
  );
}

export default function HallOfFame() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Hall of Fame");
  }, [setTitle]);

  return (
    <HallOfFameProvider>
      <HallOfFameContent />
    </HallOfFameProvider>
  );
}
