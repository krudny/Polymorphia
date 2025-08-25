/* eslint-disable */
// @ts-nocheck

import ProgressBar from "@/components/progressbar/ProgressBar";
import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import "./index.css";
import { Fragment } from "react";
import { GradeResponseDTO } from "@/interfaces/api/grade";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";

export default function GradeInfo({ grade }: { grade: GradeResponseDTO }) {
  return (
    <section className="gradable-event-section">
      {/* TODO: handle scroll/folding, gaps between criteria, show criteria even if there is no grade */}
      {grade.details !== undefined ? (
        <>
          {grade.criteria.map((criterion) => (
            <Fragment key={criterion.id}>
              <h1>{criterion.name}</h1>
              <div className="gradable-event-section-xp">
                <h2>Punkty doświadczenia</h2>
                <div className="gradable-event-section-progress-bar">
                  <ProgressBar
                    minXP={0}
                    currentXP={Number(criterion.criterionGrade?.gainedXp)}
                    maxXP={Number(criterion.maxXp)}
                    numSquares={2}
                    segmentSizes={[0, 100, 0]}
                    lowerElement={
                      <ProgressBarRangeLabels
                        minXP={0}
                        currentXP={Number(criterion.criterionGrade?.gainedXp)}
                        maxXP={Number(criterion.maxXp)}
                      />
                    }
                  />
                </div>
              </div>
              <div className="gradable-event-section-reward">
                <h2>Nagrody</h2>
                {criterion.criterionGrade?.assignedRewards?.length ? (
                  <div className="gradable-event-section-reward-inner ">
                    {criterion.criterionGrade?.assignedRewards.map(
                      (assignedReward) => {
                        const {
                          assignedReward: {
                            base: { name, imageUrl },
                            details: { id },
                          },
                        } = assignedReward;

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
                      }
                    )}
                  </div>
                ) : (
                  <div className="text-xl 2xl:text-2xl">
                    Nie przydzielono żadnej nagrody.
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </>
      ) : (
        <div className="text-xl 2xl:text-2xl">
          To wydarzenie nie zostało jeszcze ocenione.
        </div>
      )}
    </section>
  );
}
