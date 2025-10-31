import { Accordion } from "@/components/accordion/Accordion";
import "./index.css";
import {
  GradeInfoProps,
  RewardWithImage,
} from "@/components/course/event-section/types";
import { useMediaQuery } from "react-responsive";
import AccordionSection from "@/components/accordion/AccordionSection";
import ProgressBar from "@/components/progressbar/ProgressBar";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";
import Image from "next/image";
import { API_STATIC_URL } from "@/services/api";
import ImageBadge from "@/components/image-badge/ImageBadge";

export default function GradeInfo({ grade, criteria }: GradeInfoProps) {
  const isMd = useMediaQuery({ minWidth: "768px" });

  const accordionSections = [
    ...criteria.map(({ id }) => String(id)),
    ...(grade.isGraded ? ["Komentarz"] : []),
  ];

  const initiallyOpenedAccordionSections = new Set(
    accordionSections.length > 0 && isMd && grade.isGraded
      ? [accordionSections[0]]
      : []
  );

  return (
    <section className="grade-info-section">
      <Accordion
        className="grade-info-accordion-override"
        sectionIds={new Set(accordionSections)}
        initiallyOpenedSectionIds={initiallyOpenedAccordionSections}
        maxOpen={1}
        shouldAnimateInitialOpen={true}
      >
        {criteria.map((criterion) => {
          const criterionGrade = grade.isGraded
            ? grade.criteria.find(
                (gradeCriterion) => gradeCriterion.id === criterion.id
              )
            : undefined;

          const rewards: RewardWithImage[] = criterionGrade
            ? criterionGrade.assignedRewards
            : criterion.assignableRewards.map((reward) => ({
                name: reward.assignableReward.reward.name,
                imageUrl: reward.assignableReward.reward.imageUrl,
                quantity: reward.maxAmount,
              }));

          return (
            <AccordionSection
              key={criterion.id}
              id={String(criterion.id)}
              title={criterion.name}
              headerClassName="grade-info-accordion-header"
            >
              <div className="grade-info-criterion">
                <div className="grade-info-criterion-progress-bar">
                  <ProgressBar
                    minXP={0}
                    currentXP={
                      criterionGrade ? Number(criterionGrade.gainedXp) : 0
                    }
                    maxXP={Number(criterion.maxXp)}
                    numSquares={3}
                    segmentSizes={[0, 50, 0, 50, 0]}
                    lowerElement={
                      <ProgressBarRangeLabels
                        minXP={0}
                        maxXP={Number(criterion.maxXp)}
                      />
                    }
                  />

                  <div className="grade-info-xp">
                    {criterionGrade?.gainedXp ?? "-"} xp
                  </div>
                </div>
                <h2>{criterionGrade ? "Nagrody" : "Nagrody do zdobycia"}</h2>
                <div className="grade-info-reward">
                  {rewards.map((reward, index) => {
                    if (reward.quantity === 0) {
                      return;
                    }

                    return (
                      <div key={index} className="grade-info-reward-wrapper">
                        <div className="grade-info-reward-image-wrapper">
                          <Image
                            src={`${API_STATIC_URL}/${reward.imageUrl}`}
                            alt={reward.name}
                            fill
                            priority
                            className="object-cover"
                            sizes="(min-width: 1024px) 25vw, 50vw"
                          />
                          <ImageBadge
                            text={reward.quantity.toString()}
                            className="grade-info-reward-image-badge"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AccordionSection>
          );
        })}

        {grade.isGraded && (
          <AccordionSection
            key={criteria.length + 1}
            id="Komentarz"
            title="Komentarz"
            headerClassName="grade-info-accordion-header"
          >
            {grade.comment ? (
              <div className="grade-info-comment">{grade.comment}</div>
            ) : (
              <div className="text-xl">Brak komentarza.</div>
            )}
          </AccordionSection>
        )}
      </Accordion>
    </section>
  );
}
