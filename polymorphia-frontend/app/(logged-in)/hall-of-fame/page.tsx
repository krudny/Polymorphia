"use client";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import { HallOfFameProvider } from "@/providers/hall-of-fame/HallOfFameContext";
import HallOfFameMobile from "@/views/hall-of-fame/mobile/HallOfFameMobile";
import FiltersModal from "@/components/filters-modals/FiltersModal";
import { useQueryClient } from "@tanstack/react-query";
import { HallOfFameFilterId } from "@/providers/hall-of-fame/types";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import HallOfFameDesktop from "@/views/hall-of-fame/desktop/HallOfFameDesktop";
import "./index.css";
import { useMediaQuery } from "react-responsive";

function HallOfFameContent() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const queryClient = useQueryClient();
  const {
    filters,
    areFiltersOpen,
    setAreFiltersOpen,
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
      {isDesktop ? (
        <div className="desktop-hall-of-fame">
          <HallOfFameDesktop />
        </div>
      ) : (
        <div className="mobile-hall-of-fame">
          <HallOfFameMobile />
        </div>
      )}
      <FiltersModal<HallOfFameFilterId>
        filters={filters}
        isModalOpen={areFiltersOpen}
        setIsModalOpen={setAreFiltersOpen}
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
