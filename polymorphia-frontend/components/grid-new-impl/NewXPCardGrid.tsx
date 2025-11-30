import { ReactNode, useEffect, useState } from "react";
import { GridParams } from "./NewSectionView";
import NewCard, { NewCardProps } from "./NewCard";
import { PointsSummaryResponseDTO } from "@/interfaces/api/points-summary";
import Pagination from "../pagination/Pagination";
import NewPointsSummary from "./NewPointsSummary";

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
      containerClassName="ml-3"
    />
  );

  const cardsView = (
    <div
      className="grid min-w-0 flex-1 h-full gap-5 align-start justify-start"
      style={{
        gridTemplateColumns: `repeat(${gridParams.cols}, minmax(0, 1fr))`,

        gridTemplateRows: `repeat(${gridParams.rows}, 1fr)`,
      }}
    >
      {cardConfigurationsForPage.map((cardConfig, index) => (
        <div key={index} className="w-full h-full min-w-0 min-h-0">
          <NewCard {...cardConfig} mode={gridParams.mode} />
        </div>
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
          {cardsView}
          {pointsSummaryView}
        </div>
        {pagination}
      </div>
    );
  } else {
    <div className="flex flex-col">
      {cardsView}
      {pagination}
      {pointsSummaryView}
    </div>;
  }
}
