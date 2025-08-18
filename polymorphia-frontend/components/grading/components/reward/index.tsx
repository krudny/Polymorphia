import { RewardProps } from "@/components/grading/components/reward/types";
import "./index.css";
import ProgressBar from "@/components/progressbar/ProgressBar";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useContext, useState } from "react";
import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import AssignRewardModal from "@/components/grading/modals/assign-reward";

export default function Reward({ context }: RewardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { grade } = useContext(context);

  return (
    <>
      <div className="w-full overflow-y-scroll flex flex-col flex-1 gap-y-4 py-3 custom-scrollbar mt-16">
        <div className="w-full max-w-[25rem] mx-auto bg-blue-600">
          <h1 className="text-6xl">Nagroda</h1>
          {grade.criteria.map((criterion, index) => (
            <div key={index} className="flex flex-col">
              <h2 className="text-4xl my-5">{criterion.name}</h2>
              <div className="w-full px-6 pt-6 bg-red-400">
                <ProgressBar
                  minXP={0}
                  currentXP={
                    criterion.criterionGrade?.gainedXp
                      ? Number(criterion.criterionGrade.gainedXp)
                      : 0
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
              </div>
              <div className="w-16 bg-purple-200 mx-auto flex items-center -mt-6 z-[20]">
                <input
                  type="text"
                  placeholder="Punkty"
                  value={criterion.criterionGrade?.gainedXp?.toString() ?? ""}
                  onChange={() => {}}
                  className="text-3xl w-full text-center bg-yellow-400 border-b-3 border-primary-dark dark:border-secondary-light text-primary-dark dark:text-secondary-light placeholder-primary-dark dark:placeholder-secondary-light focus:outline-none"
                />
              </div>
              <h2 className="text-4xl my-5">Nagrody</h2>
              <div className="grid grid-cols-3 gap-4">
                {criterion.criterionGrade?.assignedRewards.map(
                  (reward, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-square rounded-xl border-3 border-primary-dark drop-shadow-xl overflow-hidden"
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <Image
                          src={`${API_STATIC_URL}/images/chests/s1.png`}
                          alt="User profile"
                          fill
                          priority
                          className="object-cover"
                          sizes="(min-width: 1024px) 25vw, 50vw"
                        />
                      </div>
                    </div>
                  )
                )}
                <div
                  className="aspect-square border-3 border-primary-dark rounded-xl flex-col-centered hover:bg-primary-dark hover:text-secondary-gray cursor-pointer"
                  onClick={() => setIsModalVisible(true)}
                >
                  <span className="material-symbols text-4xl">add</span>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full my-4">
            <ButtonWithBorder
              text="Zapisz"
              className="w-full !border-3 !rounded-xl"
            />
          </div>
        </div>
      </div>
      <AssignRewardModal
        isVisible={isModalVisible}
        setIsVisibleAction={setIsModalVisible}
      />
    </>
  );
}
