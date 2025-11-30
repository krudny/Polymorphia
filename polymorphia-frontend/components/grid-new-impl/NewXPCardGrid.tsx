import { ReactNode, useEffect, useState } from "react";
import { GridParams } from "./NewSectionView";
import NewCard, { NewCardProps } from "./NewCard";
import { PointsSummaryResponseDTO } from "@/interfaces/api/points-summary";
import Pagination from "../pagination/Pagination";
import NewPointsSummary from "./NewPointsSummary";
import clsx from "clsx";

export interface NewXPCardGridProps {
  gridParams: GridParams;
  cardConfigurations: Omit<NewCardProps, "mode">[];
  usesPointsSummary: boolean;
  pointsSummaryConfiguration?: PointsSummaryResponseDTO;
}

export default function NewXPCardGrid({
  gridParams,
  cardConfigurations,
  pointsSummaryConfiguration,
}: NewXPCardGridProps) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [gridParams]);

  const pageSize = gridParams.rows * gridParams.cols;
  const pageCount = Math.ceil(cardConfigurations.length / pageSize);
  const cardConfigurationsForPage = cardConfigurations.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const pagination = (
    <Pagination
      pageCount={pageCount}
      onPageChange={(selected: { selected: number }) =>
        setCurrentPage(selected.selected)
      }
      forcePage={pageCount > 0 ? currentPage : undefined}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      containerClassName={gridParams.isDesktop ? "ml-3" : ""}
    />
  );

  const cardsView = (
    <div
      className={clsx(
        "grid min-w-0 gap-5 transition-opacity custom-ease-with-duration",
        gridParams.isReady ? "opacity-100" : "opacity-0",
        gridParams.isDesktop
          ? "h-full content-center justify-start"
          : "h-auto content-start w-full justify-center"
      )}
      style={{
        gridTemplateColumns: `repeat(${gridParams.cols}, minmax(0, ${gridParams.cardWidth.max}px))`,

        gridTemplateRows: `repeat(${gridParams.rows}, 1fr)`,
      }}
    >
      {cardConfigurationsForPage.map((cardConfig, index) => (
        <NewCard key={index} {...cardConfig} mode={gridParams.mode} />
      ))}
    </div>
  );
  const pointsSummaryView = (
    <NewPointsSummary
      pointsSummary={pointsSummaryConfiguration}
      mode={gridParams.mode}
    />
  );
  // todo handle no cards

  if (gridParams.isDesktop) {
    return (
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between gap-5">
          <div className="flex-1">{cardsView}</div>
          <div className="shrink-0">{pointsSummaryView}</div>
        </div>
        <div>{pagination}</div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full gap-4 pb-10 items-center">
        <div className="w-full flex justify-center">{cardsView}</div>
        <div className="flex justify-center w-full">{pagination}</div>
        <div className="flex justify-center w-full h-[600px]">
          {pointsSummaryView}
        </div>
      </div>
    );
  }
}
