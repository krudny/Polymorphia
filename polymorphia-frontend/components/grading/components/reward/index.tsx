"use client";

import "./index.css";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import ProgressBar from "@/components/progressbar/ProgressBar";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Loading from "@/components/loading/Loading";
import AssignRewardModal from "@/components/grading/modals/assign-reward";
import { CriterionAssignableRewardResponseDTO } from "@/interfaces/api/grade";
import ImageBadge from "@/components/image-badge/ImageBadge";
import { GradingContext, GradingReducerActions } from "@/components/providers/grading/GradingContext";
import { Accordion } from "@/components/accordion/Accordion";
import { AccordionRef } from "@/components/providers/accordion/types";
import AccordionSection from "@/components/accordion/AccordionSection";

export default function Reward() {
  const { state, dispatch, criteria, isGradeLoading, submitGrade } =
    useContext(GradingContext);
  const [assignableRewards, setAssignableRewards] = useState<
    CriterionAssignableRewardResponseDTO[] | null
  >(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputValueRefs = useRef<Record<number, string>>({});
  const accordionRef = useRef<AccordionRef>(null);

  const [xpErrors, setXpErrors] = useState<Record<number, boolean>>({});

  const handleXPChange = (
    event: ChangeEvent<HTMLInputElement>,
    criterionId: number,
    maxXp: number,
  ) => {
    const value = event.target.value;
    inputValueRefs.current[criterionId] = value;

    const numValue = Number(value);
    const isValid =
      value === "" || (!isNaN(numValue) && numValue >= 0 && numValue <= maxXp);

    setXpErrors((prev) => ({
      ...prev,
      [criterionId]: !isValid && value !== "",
    }));

    if (isValid) {
      dispatch({
        type: GradingReducerActions.ADD_XP_TO_CRITERION,
        payload: {
          criterionId,
          xp: value,
        },
      });
      delete inputValueRefs.current[criterionId];
    }
  };

  useEffect(() => {
    console.log("tutaj", isGradeLoading, criteria);
  }, [isGradeLoading, criteria]);

  if (isGradeLoading || !criteria) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full overflow-y-scroll flex flex-col flex-1 gap-y-4 py-3 custom-scrollbar mt-16">
        <div className="w-full max-w-[25rem] mx-auto">
          <h1 className="text-6xl">Nagroda</h1>
          <Accordion
            ref={accordionRef}
            maxOpen={1}
          >
            {Object.entries(state.criteria).map(
              ([criterionId, criterionGrade]) => {
                const criterion = criteria?.find(
                  (criterion) => criterion.id === Number(criterionId),
                );
                if (!criterion) return null;

                const gainedXp = criterionGrade.gainedXp ?? "0";
                return (
                  <AccordionSection key={criterionId} id={criterionId} title={criterion.name}
                                    headerClassName="reward-header">
                    <div key={criterionId} className="flex flex-col">
                      <div className="w-full px-6 pt-6">
                        <ProgressBar
                          minXP={0}
                          currentXP={Number(gainedXp)}
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
                      </div>
                      <div className="w-20 mx-auto flex items-center -mt-6 z-[20]">
                        <input
                          type="text"
                          placeholder="Punkty"
                          value={
                            inputValueRefs.current[Number(criterionId)] ?? gainedXp
                          }
                          onChange={(event) =>
                            handleXPChange(
                              event,
                              Number(criterionId),
                              Number(criterion.maxXp),
                            )
                          }
                          className={`text-3xl w-full text-center border-b-3 focus:outline-none transition-colors duration-300 ease-[cubic-bezier(0.34,1,0.2,1)] ${
                            xpErrors[Number(criterionId)]
                              ? "border-primary-error text-primary-error"
                              : "border-primary-dark dark:border-secondary-light text-primary-dark dark:text-secondary-light placeholder-primary-dark dark:placeholder-secondary-light"
                          }`}
                        />
                      </div>
                      <h2 className="text-4xl my-5">Nagrody</h2>
                      <div className="grid grid-cols-3 gap-4">
                        {criterionGrade.assignedRewards.map(
                          (assignedReward, index) => (
                            <div
                              key={index}
                              className="relative w-full aspect-square rounded-xl shadow-sm  drop-shadow-xl overflow-hidden"
                            >
                              <div className="w-full h-full rounded-xl overflow-hidden">
                                <Image
                                  src={`${API_STATIC_URL}/${assignedReward.imageUrl}`}
                                  alt="User profile"
                                  fill
                                  priority
                                  className="object-cover"
                                  sizes="(min-width: 1024px) 25vw, 50vw"
                                  onClick={() => {
                                  }}
                                />
                                <ImageBadge
                                  text={assignedReward.quantity.toString()}
                                  className="text-xl w-7 rounded-tl-lg rounded-br-lg"
                                />
                              </div>
                            </div>
                          ),
                        )}
                        <div
                          className="aspect-square border-3 border-primary-dark rounded-xl flex-col-centered hover:bg-primary-dark hover:text-secondary-gray cursor-pointer transition-colors duration-400 ease-[cubic-bezier(0.34,1,0.2,1)] hover:cursor-pointer"
                          onClick={() =>
                            setAssignableRewards(criterion?.assignableRewards)
                          }
                        >
                          <span className="material-symbols text-4xl">add</span>
                        </div>
                      </div>
                    </div>
                  </AccordionSection>
                );
              },
            )}
            <AccordionSection
              key={criteria.length + 1}
              id="Komentarz"
              title="Komentarz"
              headerClassName="reward-header">
              <div className="w-full">
            <textarea
              ref={textareaRef}
              className="w-full p-4 text-xl resize-none border-3 border-primary-dark dark:border-secondary-light text-primary-dark dark:text-secondary-light placeholder-primary-dark dark:placeholder-secondary-light focus:outline-none rounded-xl"
              placeholder="Dodaj komentarz..."
              defaultValue={state.comment}
              onBlur={(e) => {
                dispatch({
                  type: GradingReducerActions.ADD_COMMENT,
                  payload: {
                    comment: e.target.value,
                  },
                });
              }}
              style={{
                minHeight: "8rem",
                height: "auto",
                // @ts-expect-error "New CSS feature not supported by TS yet"
                fieldSizing: "content",
              }}
            />
              </div>
            </AccordionSection>
          </Accordion>
          <div className="w-full my-4">
            <ButtonWithBorder
              text="Zapisz"
              className="w-full !border-3 !rounded-xl"
              onClick={submitGrade}
            />
          </div>
        </div>
      </div>
      <AssignRewardModal
        assignableRewards={assignableRewards}
        onClosedAction={() => setAssignableRewards(null)}
      />
    </>
  );
}
