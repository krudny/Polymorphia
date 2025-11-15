import { useGradingStrategy } from "@/hooks/strategy/useGradingStrategy";
import { GradingFilterId } from "@/providers/grading/types";
import FiltersModal from "@/components/filters-modals/FiltersModal";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { useMediaQuery } from "react-responsive";
import { ViewTypes } from "@/interfaces/general";
import { getSpeedDialKey } from "@/components/speed-dial/util";
import SpeedDial from "@/components/speed-dial/SpeedDial";
import { useEventParams } from "@/hooks/general/useEventParams";
import ColumnSchema from "@/components/column-schema";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import useUserContext from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";
import ErrorComponent from "@/components/error";

export default function Grading() {
  const { eventType } = useEventParams();
  const isXL = useMediaQuery({ minWidth: "1280px" });
  const isMd = useMediaQuery({ minWidth: "768px" });
  const components = useGradingStrategy(eventType);
  const { filters, isFiltersLoading, isFiltersError } = useGradingContext();
  const { areFiltersOpen, setAreFiltersOpen, handleApplyFilters } =
    useTargetContext();
  const { userRole } = useUserContext();

  const speedDialKey = getSpeedDialKey(eventType, ViewTypes.GRADING);

  if (!components || !speedDialKey) {
    return null;
  }

  if (userRole && userRole === Roles.STUDENT) {
    return <ErrorComponent message="Brak uprawnień." />;
  }

  return (
    <div className="pb-20 md:pb-0">
      <SpeedDial speedDialKey={speedDialKey} />
      <ColumnSchema columns={isXL ? 3 : isMd ? 2 : 1} components={components} />
      <FiltersModal<GradingFilterId>
        filters={filters}
        isModalOpen={areFiltersOpen}
        setIsModalOpen={setAreFiltersOpen}
        isFiltersLoading={isFiltersLoading}
        isFiltersError={isFiltersError}
        onFiltersApplied={() => handleApplyFilters()}
      />
    </div>
  );
}
