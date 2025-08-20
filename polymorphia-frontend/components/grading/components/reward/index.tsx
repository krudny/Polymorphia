"use client";

import { RewardProps } from "@/components/grading/components/reward/types";
import "./index.css";
import { useContext, useEffect, useState } from "react";
import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import ProgressBar from "@/components/progressbar/ProgressBar";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Loading from "@/components/loading/Loading";
import AssignRewardModal from "@/components/grading/modals/assign-reward";
import { CriterionAssignableRewardResponseDTO } from "@/interfaces/api/grade";
import ImageBadge from "@/components/image-badge/ImageBadge";
import { GradingReducerActions } from "@/components/providers/grading/GradingContext";
import { useDebounce } from "use-debounce";

export default function Reward({ context }: RewardProps) {
  const { state, dispatch, criteria, isGradeLoading } = useContext(context);
  const [assignableRewards, setAssignableRewards] = useState<
    CriterionAssignableRewardResponseDTO[] | null
  >(null);
  const [localComment, setLocalComment] = useState(state.comment ?? "");
  const [debouncedComment] = useDebounce(localComment, 400);

  useEffect(() => {
    setLocalComment(state.comment ?? "");
  }, [state.comment]);

  useEffect(() => {
    if (debouncedComment !== state.comment) {
      dispatch({
        type: GradingReducerActions.ADD_COMMENT,
        payload: {
          comment: debouncedComment,
        },
      });
    }
  }, [debouncedComment, state.comment, dispatch]);

  if (isGradeLoading || !criteria) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full overflow-y-scroll flex flex-col flex-1 gap-y-4 py-3 custom-scrollbar mt-16">
        <div className="w-full max-w-[25rem] mx-auto bg-blue-600">
          <h1 className="text-6xl">Nagroda</h1>
          {Object.entries(state.criteria).map(
            ([criterionId, criterionGrade]) => {
              const criterion = criteria?.find(
                (criterion) => criterion.id === Number(criterionId)
              );
              if (!criterion) return null;

              const gainedXp = criterionGrade.gainedXp ?? "0";

              return (
                <div key={criterionId} className="flex flex-col">
                  <h2 className="text-4xl my-5">{criterion.name}</h2>
                  <div className="w-full px-6 pt-6 bg-red-400">
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
                  <div className="w-16 bg-purple-200 mx-auto flex items-center -mt-6 z-[20]">
                    <input
                      type="text"
                      placeholder="Punkty"
                      value={gainedXp}
                      onChange={(event) => {
                        dispatch({
                          type: GradingReducerActions.ADD_XP_TO_CRITERION,
                          payload: {
                            criterionId: Number(criterionId),
                            xp: event.target.value,
                          },
                        });
                      }}
                      className="text-3xl w-full text-center bg-yellow-400 border-b-3 border-primary-dark dark:border-secondary-light text-primary-dark dark:text-secondary-light placeholder-primary-dark dark:placeholder-secondary-light focus:outline-none"
                    />
                  </div>
                  <h2 className="text-4xl my-5">Nagrody</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {criterionGrade.assignedRewards.map(
                      (assignedReward, index) => (
                        <div
                          key={index}
                          className="relative w-full aspect-square rounded-xl border-3 shadow-sm border-primary-dark drop-shadow-xl overflow-hidden"
                        >
                          <div className="w-full h-full rounded-xl overflow-hidden">
                            <Image
                              src={`${API_STATIC_URL}/${assignedReward.imageUrl}`}
                              alt="User profile"
                              fill
                              priority
                              className="object-cover"
                              sizes="(min-width: 1024px) 25vw, 50vw"
                              onClick={() => {}}
                            />
                            <ImageBadge
                              text={assignedReward.quantity.toString()}
                              className="text-xl w-7 rounded-tl-lg rounded-br-lg"
                            />
                          </div>
                        </div>
                      )
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
              );
            }
          )}
          <h2 className="text-4xl my-5">Komentarz</h2>
          <div className="w-full">
            <textarea
              className="w-full p-4 text-xl bg-yellow-400 resize-none border-3 border-primary-dark dark:border-secondary-light text-primary-dark dark:text-secondary-light placeholder-primary-dark dark:placeholder-secondary-light focus:outline-none rounded-xl"
              placeholder="Dodaj komentarz..."
              value={localComment}
              onChange={(e) => setLocalComment(e.target.value)}
              style={{
                minHeight: "8rem",
                height: "auto",
                // @ts-expect-error "New CSS feature not supported by TS yet"
                fieldSizing: "content",
              }}
            />
          </div>
          <div className="w-full my-4">
            <ButtonWithBorder
              text="Zapisz"
              className="w-full !border-3 !rounded-xl"
            />
          </div>
        </div>
      </div>
      <AssignRewardModal
        assignableRewards={assignableRewards}
        context={context}
        onClosedAction={() => setAssignableRewards(null)}
      />
    </>
  );
}
