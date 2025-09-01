import { GradingProps } from "@/views/course/grading/types";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import { useGradingFactory } from "@/hooks/factory/useGradingFactory";
import { Fragment } from "react";
import "./index.css";
import { GradingFilterId } from "@/providers/grading/types";
import FiltersModal from "@/components/filters/modals/FiltersModal";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { useQueryClient } from "@tanstack/react-query";

export default function Grading({ gradingType, columns }: GradingProps) {
  const queryClient = useQueryClient();
  const gradingComponents = useGradingFactory(gradingType);
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

  if (!gradingComponents) {
    return null;
  }

  return (
    <>
      <div className="grading">
        <div className="grading-speed-dial">
          <SpeedDialDesktop type={gradingType} />
        </div>

        <div className="grading-list">{gradingComponents.list}</div>

        {[...Array(Math.max(columns, gradingComponents.components.length))].map(
          (_, i) => {
            const components = gradingComponents.components[i];

            return (
              <div key={i} className="grading-columns">
                {components.map((component, index) => (
                  <Fragment key={index}>{component}</Fragment>
                ))}
              </div>
            );
          }
        )}
      </div>
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
