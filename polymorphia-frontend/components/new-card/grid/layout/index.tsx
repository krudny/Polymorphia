import Pagination from "@/components/pagination/Pagination";
import NewPointsSummary from "@/components/new-card/grid/points-summary";
import clsx from "clsx";
import SlideAnimationWrapper from "@/animations/SlideAnimationWrapper";
import { usePageable } from "@/hooks/general/usePageable";
import { useMemo } from "react";
import NewCard from "@/components/new-card/card";
import { NewCardGridLayoutProps } from "@/components/new-card/grid/layout/types";

export default function NewCardGridLayout({
  gridParams,
  cardConfigurations,
  pointsSummaryConfiguration,
  usesPointsSummary,
}: NewCardGridLayoutProps) {
  const { currentPage, direction, handlePageChange } = usePageable({
    resetDependency: gridParams, // reset page when gridParams change
  });

  const pageSize = gridParams.rows * gridParams.cols;
  const pageCount = Math.ceil(cardConfigurations.length / pageSize);

  const cardConfigurationsForPage = useMemo(() => {
    return cardConfigurations.slice(
      currentPage * pageSize,
      currentPage * pageSize + pageSize
    );
  }, [cardConfigurations, currentPage, pageSize]);

  const pagination = useMemo(
    () => (
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageChange}
        forcePage={pageCount > 0 ? currentPage : undefined}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        containerClassName={gridParams.isDesktop ? "ml-3" : ""}
      />
    ),
    [pageCount, handlePageChange, currentPage, gridParams.isDesktop]
  );

  const cardsView = (
    <SlideAnimationWrapper
      triggerKey={currentPage}
      direction={direction}
      className={clsx(gridParams.isDesktop ? "h-full w-fit" : "h-auto w-full")}
    >
      <div
        className={clsx(
          "grid min-w-0 gap-5 transition-opacity custom-ease-with-duration px-3",
          gridParams.isReady ? "opacity-100" : "opacity-0",
          gridParams.isDesktop
            ? "h-full content-center justify-start"
            : "h-auto content-start w-full justify-center"
        )}
        style={{
          gridTemplateColumns: `repeat(${gridParams.cols}, minmax(0, ${gridParams.cardMaxWidth}px))`,
          gridTemplateRows: `repeat(${gridParams.rows}, 1fr)`,
        }}
      >
        {cardConfigurationsForPage.map((cardConfig, index) => (
          <NewCard
            key={`${currentPage}-${index}`}
            {...cardConfig}
            mode={gridParams.mode}
          />
        ))}
      </div>
    </SlideAnimationWrapper>
  );

  const pointsSummaryView = (
    <NewPointsSummary
      pointsSummary={pointsSummaryConfiguration}
      mode={gridParams.mode}
      isDesktop={gridParams.isDesktop}
    />
  );

  if (gridParams.isDesktop) {
    return (
      <div
        className={clsx("flex flex-col gap-5", usesPointsSummary && "w-full")}
      >
        <div className="flex w-full justify-between gap-5">
          <div className="flex-1">{cardsView}</div>
          {usesPointsSummary && (
            <div className="shrink-0">{pointsSummaryView}</div>
          )}
        </div>
        <div>{pagination}</div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full gap-4 pb-10 items-center">
        <div className="w-full flex justify-center">{cardsView}</div>
        <div className="flex justify-center w-full">{pagination}</div>
        {usesPointsSummary && (
          <div className="flex justify-center w-full h-[600px]">
            {pointsSummaryView}
          </div>
        )}
      </div>
    );
  }
}
