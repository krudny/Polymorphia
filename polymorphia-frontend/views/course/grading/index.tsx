import { GradingProps } from "@/views/course/grading/types";
import { useGradingFactory } from "@/hooks/factory/useGradingFactory";
import { Fragment, useEffect, useRef } from "react";
import "./index.css";
import { GradingFilterId } from "@/providers/grading/types";
import FiltersModal from "@/components/filters/modals/FiltersModal";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { useQueryClient } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { useTitle } from "@/components/navigation/TitleContext";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import { Roles, ViewTypes } from "@/interfaces/general";

export default function Grading({ eventType, columns }: GradingProps) {
  const queryClient = useQueryClient();
  const isMd = useMediaQuery({ minWidth: "768px" });
  const isXL = useMediaQuery({ minWidth: "1200px" });
  const width = window.innerWidth;
  const { setTitle } = useTitle();
  const gradingRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const gradingComponents = useGradingFactory(eventType);
  const {
    filters,
    areFiltersOpen,
    setAreFiltersOpen,
    isFiltersLoading,
    isFiltersError,
  } = useGradingContext();

  useEffect(() => {
    setTitle("Ocenianie");
  }, [setTitle]);

  useEffect(() => {
    if (!gradingRef.current || !columnsRef.current || !listRef.current) {
      return;
    }

    const updateHeight = () => {
      const columnsHeight = columnsRef.current!.offsetHeight;

      if (isXL) {
        gradingRef.current!.style.height = `max(${columnsHeight}px, calc(100dvh - 5rem))`;
        listRef.current!.style.maxHeight = `max(${columnsHeight}px, calc(100dvh - 5rem))`;
      } else if (isMd) {
        gradingRef.current!.style.height = `${columnsHeight}px`;
        listRef.current!.style.maxHeight = `${columnsHeight}px`;
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
  }, [columns, isMd, isXL]);

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
          <SpeedDialDesktop
            eventType={eventType}
            viewType={ViewTypes.GRADING}
            role={Roles.INSTRUCTOR}
          />
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
          <div ref={columnsRef} className="grading-columns-wrapper">
            {[
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
            })}
          </div>
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
