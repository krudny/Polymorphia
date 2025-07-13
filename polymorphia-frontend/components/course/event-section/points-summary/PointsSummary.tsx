import { PointsSummaryProps } from "@/components/course/event-section/points-summary/types";
import PointsSummaryElement from "./PointsSummaryElement";
import { Fragment, useState } from "react";
import BonusInfoModal from "./BonusInfoModal";
import { BonusInfo } from "@/components/course/event-section/types";
import { getBonusesFromEventSection } from "@/components/course/event-section/EventSectionUtils";
import "./index.css";

export default function PointsSummary({
  eventSectionId,
  ref,
}: PointsSummaryProps) {
  const [currentBonusInfoModal, setCurrentBonusInfoModal] =
    useState<BonusInfo | null>(null);

  const elements = getBonusesFromEventSection(
    eventSection,
    setCurrentBonusInfoModal
  );

  return (
    <>
      <div ref={ref} className="points-summary">
        {elements.map((element, index) => (
          <Fragment key={element.bonus.name}>
            <PointsSummaryElement
              {...element}
              horizontal={index === elements.length - 1}
              onClick={
                element.bonus.items.length > 0
                  ? () => {
                      setCurrentBonusInfoModal(element.bonus);
                    }
                  : undefined
              }
            />
            {index === elements.length - 2 && (
              <div className="points-summary-divider" />
            )}
          </Fragment>
        ))}
      </div>
      <BonusInfoModal
        bonusInfo={currentBonusInfoModal}
        onClosed={() => setCurrentBonusInfoModal(null)}
      />
    </>
  );
}
