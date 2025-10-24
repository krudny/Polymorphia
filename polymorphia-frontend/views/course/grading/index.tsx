import { GradingProps } from "@/views/course/grading/types";
import { useGradingFactory } from "@/hooks/factory/useGradingFactory";
import { Fragment, useEffect, useRef } from "react";
import "./index.css";
import { GradingFilterId } from "@/providers/grading/types";
import FiltersModal from "@/components/filters-modals/FiltersModal";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { useQueryClient } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { ViewTypes } from "@/interfaces/general";
import { getSpeedDialKey } from "@/components/speed-dial/util";
import TargetList from "@/components/grading-components/target-list";
import SpeedDial from "@/components/speed-dial/SpeedDial";
import { useEventParams } from "@/hooks/general/useEventParams";
import ColumnSchema from "@/components/column-schema";

export default function Grading() {
  const queryClient = useQueryClient();
  const { eventType } = useEventParams();
  const isXL = useMediaQuery({ minWidth: "1280px" });
  const isMd = useMediaQuery({ minWidth: "768px" });
  const components = useGradingFactory(eventType);
  const {
    filters,
    areFiltersOpen,
    setAreFiltersOpen,
    isFiltersLoading,
    isFiltersError,
  } = useGradingContext();

  const handleApplyFilters = () => {
    queryClient.invalidateQueries({
      queryKey: ["students"],
    });
  };

  const speedDialKey = getSpeedDialKey(eventType, ViewTypes.GRADING);

  if (!components || !speedDialKey) {
    return null;
  }

  return (
    <>
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
    </>
  );
}
