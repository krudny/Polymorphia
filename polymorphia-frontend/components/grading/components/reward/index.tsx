import { RewardProps } from "@/components/grading/components/reward/types";
import "./index.css";
import ProgressBar from "@/components/progressbar/ProgressBar";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";

//TODO: margin-top
export default function Reward({ criteria }: RewardProps) {
  return (
    <div className="w-full overflow-y-scroll flex flex-col flex-1 gap-y-4">
      <div className="w-full max-w-sm mx-auto py-3 bg-blue-600">
        <h1 className="text-6xl">Nagroda</h1>
        {criteria.map((criterion, index) => (
          <div key={index} className="flex flex-col">
            <h2 className="text-4xl my-5">{criterion.name}</h2>
            <div className="w-full px-6 pt-6 bg-red-400">
              <ProgressBar
                minXP={0}
                currentXP={0}
                maxXP={criterion.maxXP}
                numSquares={2}
                segmentSizes={[0, 100, 0]}
                lowerElement={
                  <ProgressBarRangeLabels
                    minXP={0}
                    currentXP={0}
                    maxXP={criterion.maxXP}
                  />
                }
              />
            </div>
            <h2 className="text-4xl my-5">Skrzynki</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="aspect-square border-3 border-primary-dark rounded-xl flex-col-centered"
                >
                  <span className="material-symbols text-4xl">add</span>
                </div>
              ))}
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
  );
}
