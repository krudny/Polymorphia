import {SquareFillCalc} from "@/components/progressbar/ProgressBarUtil";

export default function ProgressBarSquare({ squareFill, position }: { squareFill: number, position: number }) {
    return (
        <>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${position}%` }}>
                <div
                    className="w-8 h-8 bg-neutral-400 "
                    style={{
                        transform: 'rotate(45deg)',
                        transformOrigin: 'center center',
                    }}
                />
            </div>


            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-50" style={{ left: `${position}%` }}>
                <div
                    className="w-8 h-8 bg-neutral-800"
                    style={{
                        transform: 'rotate(45deg)',
                        transformOrigin: 'center center',
                        clipPath: SquareFillCalc(squareFill),
                    }}
                />
            </div>
        </>
    )
}