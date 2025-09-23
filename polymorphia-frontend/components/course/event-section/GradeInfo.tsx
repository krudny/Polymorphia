import ProgressBar from "@/components/progressbar/ProgressBar";
import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import "./index.css";
import { Fragment } from "react";
import {
  CriterionResponseDTO,
  ShortGradeResponseDTO,
} from "@/interfaces/api/grade";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";

// TODO: refactor
export default function GradeInfo({
  grade,
  criteria,
}: {
  grade?: ShortGradeResponseDTO;
  criteria: CriterionResponseDTO[];
}) {
  return (
    <section className="gradable-event-section">
      {/* TODO: handle scroll/folding, gaps between criteria, show criteria even if there is no grade */}
      {grade !== undefined ? (
        <>
          {grade.criteria.map((gradeCriterion) => {
            const criterion = criteria.find(
              (criterion) => criterion.id === gradeCriterion.id
            );

            return (
              <Fragment key={gradeCriterion.id}>
                <h1>{criterion?.name}</h1>
                <div className="gradable-event-section-xp">
                  <h2>Punkty doświadczenia</h2>
                  <div className="gradable-event-section-progress-bar">
                    <ProgressBar
                      minXP={0}
                      currentXP={Number(gradeCriterion.gainedXp)}
                      maxXP={Number(criterion?.maxXp)}
                      numSquares={2}
                      segmentSizes={[0, 100, 0]}
                      lowerElement={
                        <ProgressBarRangeLabels
                          minXP={0}
                          currentXP={Number(gradeCriterion.gainedXp)}
                          maxXP={Number(criterion?.maxXp)}
                        />
                      }
                    />
                  </div>
                </div>
                <div className="gradable-event-section-reward">
                  <h2>Nagrody</h2>
                  {gradeCriterion.assignedRewards.length ? (
                    <div className="gradable-event-section-reward-inner ">
                      {gradeCriterion.assignedRewards.map((assignedReward) => {
                        const { id, name, imageUrl } = assignedReward;
                        // TODO: add quantity indicator
                        return (
                          <div
                            className="gradable-event-section-reward-image-wrapper"
                            key={id}
                          >
                            <Image
                              src={`${API_STATIC_URL}/${imageUrl}`}
                              alt={name}
                              fill
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xl 2xl:text-2xl">
                      Nie przydzielono żadnej nagrody.
                    </div>
                  )}
                </div>
              </Fragment>
            );
          })}
        </>
      ) : (
        <div className="text-xl 2xl:text-2xl">
          To wydarzenie nie zostało jeszcze ocenione.
        </div>
      )}
    </section>
  );
}
