import ProgressBar from "@/components/progressbar/ProgressBar";
import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import "./index.css";
import { Fragment } from "react";
import { GradeResponseDTO } from "@/interfaces/api/DTO";

export default function GradeInfo({ grade }: { grade: GradeResponseDTO }) {
  return (
    <section className="gradable-event-section">
      {/* TODO: handle scroll, gaps between criteria, show criteria even if there is no grade */}
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
                    currentXP={Number(criterion.criterionGrade?.xp)}
                    maxXP={Number(criterion.maxXp)}
                    numSquares={2}
                    segmentSizes={[0, 100, 0]}
                  />
                </div>
              </div>
              {/*
              TODO: How to handle chests for multiple criteria?
              1. For every criterion, show both XP and chests, even if not assigned
              2. Add another prop to indicate whether you can get a chest for a critetion,
                 if so, show chests section (display error if no chest assigned)
              3. Show chests section only if there are chests assigned
              4. Aggregate all chests from all criteria into one section at the bottom

              The first option is currently implemented.
              */}
              <div className="gradable-event-section-chest">
                <h2>Skrzynki</h2>
                {criterion.criterionGrade?.assignedChests?.length ? (
                  <div className="gradable-event-section-chests-inner ">
                    {criterion.criterionGrade?.assignedChests.map(
                      (assignedChest) => (
                        <div
                          className="gradable-event-section-chests-image-wrapper"
                          key={assignedChest.details.id}
                        >
                          <Image
                            src={`${API_STATIC_URL}/${assignedChest.base.imageUrl}`}
                            alt={assignedChest.base.name}
                            fill
                          />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-xl 2xl:text-2xl">
                    Nie przydzielono żadnej skrzynki.
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
