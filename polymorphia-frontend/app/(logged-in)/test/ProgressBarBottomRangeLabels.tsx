export default function ProgressBarBottomRangeLabels({minXP, currentXP, maxXP}) {
    return (
        <div className="h-14 relative">
            <div className="absolute left-0 -translate-x-1/2  w-14 text-center">
                <span className="text-2xl text-neutral-800">{minXP} xp</span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 w-16 text-center -top-2">
                <span className="text-4xl text-neutral-800">{currentXP} xp</span>
            </div>

            <div className="absolute right-0 translate-x-1/2  w-14 text-center">
                <span className="text-2xl text-neutral-800">{maxXP} xp</span>
            </div>
        </div>
    )

}