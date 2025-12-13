import { useMediaQuery } from "react-responsive";
import { useQueryClient } from "@tanstack/react-query";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import HallOfFameDesktop from "@/components/hall-of-fame/desktop/main";
import HallOfFameMobile from "@/components/hall-of-fame/mobile/main";
import FiltersModal from "@/components/filters-modals/FiltersModal";
import { HallOfFameFilterId } from "@/providers/hall-of-fame/types";
import "./index.css";

export default function HallOfFameView() {
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
