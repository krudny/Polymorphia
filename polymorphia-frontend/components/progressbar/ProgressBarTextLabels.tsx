import {ProgressBarTextLabelsProps} from "@/interfaces/progressbar/ProgressBarInterfaces";

export default function ProgressBarTextLabels({ textLabels }: ProgressBarTextLabelsProps) {
    return (
        <div className="w-full min-h-14 relative px-20">
            {textLabels.map((label, i) => (
                <div
                    key={i}
                    className="absolute w-20 text-center flex-col-centered"
                    style={{
                        left: `${(i / (textLabels.length - 1)) * 100}%`,
                        transform: 'translateX(-50%)',
                    }}
                >
                  <span className="text-xl text-neutral-800 block whitespace-normal break-normal">
                    {label}
                  </span>
                </div>
            ))}
        </div>
    )
}