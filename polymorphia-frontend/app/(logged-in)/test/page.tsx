"use client"

import {useState} from "react";
import ProgressBarSquare from "@/app/(logged-in)/test/ProgressBarSquare";
import ProgressBarLine from "@/app/(logged-in)/test/ProgressBarLine";
import toast from "react-hot-toast";
import {widthToRem} from "@/app/(logged-in)/test/ProgressBarUtil";
import ProgressBarBottomRangeLabels from "@/app/(logged-in)/test/ProgressBarBottomRangeLabels";
import Loading from "@/components/general/Loading";
import dynamic from "next/dynamic";
import ProgressBarTextLabels from "@/app/(logged-in)/test/ProgressBarTextLabels";

export const ClientProgressBar = dynamic(() => Promise.resolve(ProgressBar), {
    ssr: false,
    loading: () => <Loading />,
});

function ProgressBar({ minXP = 0, currentXP = 5.5, maxXP = 100, numSquares = 2, upperTextLabels, bottomTextLabels }) {
    if (numSquares < 2 || minXP >= maxXP || currentXP > maxXP || currentXP < minXP) {
        toast.error("Invalid progress bar config!");
        return;
    }

    const totalXP = maxXP - minXP;
    const currentRelativeXP = currentXP - minXP;
    const percentage = Math.min(Math.max(0, (currentRelativeXP / totalXP) * 100), 100);

    const numSegments = numSquares * 2 - 1;

    const equalShare = 100 / numSegments;

    const evenCount = Math.ceil(numSegments / 2);
    const oddCount = numSegments - evenCount;

    const evenSize = equalShare < 10 ? equalShare : 10;

    const remaining = 100 - evenCount * evenSize;
    const oddSize = remaining / oddCount;

    const segmentSizes = Array.from({ length: numSegments }, (_, i) =>
        i % 2 === 0 ? evenSize : oddSize
    );

    const fills: number[] = [];
    let accStart = 0;
    for (const size of segmentSizes) {
        const start = accStart;
        const end = start + size;
        let fill;
        if (percentage >= end) fill = 100;
        else if (percentage <= start) fill = 0;
        else fill = ((percentage - start) / size) * 100;

        fills.push(Math.min(Math.max(0, fill), 100));
        accStart = end;
    }

    console.log(fills, segmentSizes)

    return (
        <div className="w-full h-full flex flex-col relative">
            {upperTextLabels && upperTextLabels.length > 0 && (
                <div className="w-full whitespace-nowrap min-h-8">
                    <ProgressBarTextLabels textLabels={upperTextLabels} />
                </div>
            )}

            <div className="flex-grow relative">
                <div className="absolute top-1/2 -translate-y-1/2 w-full">
                    {Array.from({ length: numSquares - 1 }, (_, index) => (
                        <ProgressBarLine
                            key={index}
                            width={(parseInt(widthToRem()) + 2 - numSquares * 2) / (numSquares - 1)}
                            position={(index / (numSquares - 1)) * 100}
                            lineFill={fills[2 * index + 1]}
                        />
                    ))}

                    {Array.from({ length: numSquares }).map((_, index) => (
                        <ProgressBarSquare
                            key={index}
                            squareFill={fills[2 * index]}
                            position={(index / (numSquares - 1)) * 100}
                        />
                    ))}
                </div>
            </div>

            {bottomTextLabels && bottomTextLabels.length > 0 ? (
                <div className="w-full whitespace-nowrap h-14">
                    <ProgressBarTextLabels textLabels={bottomTextLabels} />
                </div>
            ) : (
                <div className="w-full whitespace-nowraps">
                    <ProgressBarBottomRangeLabels minXP={minXP} currentXP={currentXP} maxXP={maxXP} />
                </div>
            )}
        </div>
    )
}


export default function Test() {
    const [currentXP, setCurrentXP] = useState(0);

    return (
        <div className="w-[1000px] h-[600px] m-auto flex flex-col items-center justify-center gap-4">
            <div className="w-md h-48 relative" id="progress-bar-container">
                <ClientProgressBar
                    currentXP={currentXP}
                    numSquares={2}
                    minXP={0}
                    maxXP={4}
                    // upperTextLabels={["2.0 (<25xp)", "2.0 (<50xp)", "3.0 (<60xp)", "3.5 (<70xp)", "4.0 (<80xp)", "4.5 (<90xp)", "5.0 (<100xp)"]}
                    // bottomTextLabels={["Jajo", "Pisklak", "Podlot", "Żółtodziób", "Nieopierzony Odkrywca", "Samodzielny Zwierzak", "Majestatyczna Bestia"]}
                />
            </div>
            <input
                type="range"
                min="0"
                max="4"
                step="0.1"
                value={currentXP}
                onChange={(e) => setCurrentXP(Number(e.target.value))}
                className="w-full max-w-[500px] mt-20"
            />
        </div>
    );
}