import ProgressBarTextLabels from "@/components/progressbar/ProgressBarTextLabels";
import ProgressBarLine from "@/components/progressbar/ProgressBarLine";
import ProgressBarSquare from "@/components/progressbar/ProgressBarSquare";
import {FillsCalc, isProgressBarInputValid} from "@/components/progressbar/ProgressBarUtil";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";
import {ProgressBarProps} from "@/interfaces/progressbar/ProgressBarInterfaces";
import toast from "react-hot-toast";

export default function ProgressBar(props: ProgressBarProps) {
    if (!isProgressBarInputValid(props)) {
        toast.error("Invalid progress bar config");
        return null;
    }

    const {minXP = 0, currentXP = 5.5, maxXP = 100, numSquares = 2, segmentSizes, upperTextLabels, bottomTextLabels} = props;
    const fills = FillsCalc(minXP, maxXP, currentXP, segmentSizes)

    return (
        <div className="w-full h-full px-10 m-auto flex flex-col justify-center">
            {upperTextLabels && upperTextLabels.length > 0 && (
                <div className="w-full whitespace-nowrap min-h-8">
                    <ProgressBarTextLabels textLabels={upperTextLabels} />
                </div>
            )}

            <div className="w-full relative mt-3 my-8">
                {Array.from({ length: numSquares - 1 }, (_, index) => {
                    const width = `calc((100% - ${(numSquares - 1) * 2 }rem) / ${numSquares - 1})`;
                    return (
                        <ProgressBarLine
                            key={index}
                            position={(index / (numSquares - 1)) * 100}
                            width={width}
                            lineFill={fills[2 * index + 1]}
                        />
                    )

                })}

                {Array.from({ length: numSquares }).map((_, index) => (
                    <ProgressBarSquare
                        key={index}
                        squareFill={fills[2 * index]}
                        position={(index / (numSquares - 1)) * 100}
                    />
                ))}
            </div>

            {bottomTextLabels && bottomTextLabels.length > 0 ? (
                <div className="w-full whitespace-nowrap h-14">
                    <ProgressBarTextLabels textLabels={bottomTextLabels} />
                </div>
            ) : (
                <div className="w-full whitespace-nowraps">
                    <ProgressBarRangeLabels minXP={minXP} currentXP={currentXP} maxXP={maxXP} />
                </div>
            )}
        </div>
    )
}