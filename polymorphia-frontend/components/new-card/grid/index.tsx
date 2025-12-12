"use client";

import useNewCardGridParams from "@/hooks/new-card/useNewCardGridParams";
import { getCardStepCount } from "@/components/new-card/card/metrics";
import NewCardGridLayout from "@/components/new-card/grid/layout";
import { NewCardGridViewProps } from "@/components/new-card/grid/types";

export default function NewCardGridView({
  cardConfigurations,
  usesPointsSummary,
  pointsSummaryConfiguration,
  ref,
  mobileRows,
}: NewCardGridViewProps) {
  const cardStepCount = Math.max(
    ...cardConfigurations.map((cardConfig) => getCardStepCount(cardConfig))
  );

  const gridParams = useNewCardGridParams(
    ref,
    cardStepCount,
    usesPointsSummary,
    mobileRows
  );
  return (
    <div className="w-full p-3 flex flex-col flex-1 mx-auto overflow-y-scroll custom-scrollbar lg:h-full lg:justify-center lg:overflow-hidden 3xl:extra-large-center">
      <div
        ref={ref}
        className="lg:flex lg:flex-1 lg:items-center lg:justify-center lg:min-h-0 lg:h-full lg:flex-col w-full"
      >
        <NewCardGridLayout
          gridParams={gridParams}
          cardConfigurations={cardConfigurations}
          usesPointsSummary={usesPointsSummary}
          pointsSummaryConfiguration={pointsSummaryConfiguration}
        />
      </div>
    </div>
  );
}
