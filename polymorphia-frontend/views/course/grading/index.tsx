import { GradingProps } from "@/views/course/grading/types";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import { useGradingFactory } from "@/hooks/factory/useGradingFactory";
import { Fragment, useLayoutEffect, useRef } from "react";
import "./index.css";
import { GradingFilterId } from "@/providers/grading/types";
import FiltersModal from "@/components/filters/modals/FiltersModal";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { useQueryClient } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";

export default function Grading({ gradingType, columns }: GradingProps) {
  const queryClient = useQueryClient();
  const isMd = useMediaQuery({ minWidth: "768px" });
  const gradingRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const gradingComponents = useGradingFactory(gradingType);
  const {
    filters,
    areFiltersOpen,
    setAreFiltersOpen,
    isFiltersLoading,
    isFiltersError,
  } = useGradingContext();

  useLayoutEffect(() => {
    if (!gradingRef.current || !columnsRef.current) {
      return;
    }

    const updateHeight = () => {
      if (isMd) {
        const columnsHeight = columnsRef.current!.offsetHeight;
        gradingRef.current!.style.height = `${columnsHeight}px`;
        listRef.current!.style.removeProperty("max-height");
      } else {
        gradingRef.current!.style.height = `100%`;
        listRef.current!.style.maxHeight = `500px`;
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(columnsRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [columns, isMd]);

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
      <div ref={gradingRef} className="grading">
        <div className="grading-speed-dial">
          <SpeedDialDesktop type={gradingType} />
        </div>

        <div className="grading-list" ref={listRef}>
          {gradingComponents.list}
        </div>

        {columns === 1 ? (
          <div ref={columnsRef} className="grading-columns">
            {gradingComponents.components.flat().map((component, index) => (
              <Fragment key={index}>{component}</Fragment>
            ))}
          </div>
        ) : (
          [
            ...Array(Math.max(columns, gradingComponents.components.length)),
          ].map((_, i) => {
            const components = gradingComponents.components[i];

            return (
              <div key={i} className="grading-columns">
                {components?.map((component, index) => (
                  <Fragment key={index}>{component}</Fragment>
                ))}
              </div>
            );
          })
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
