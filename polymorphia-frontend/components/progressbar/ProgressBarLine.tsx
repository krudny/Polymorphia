import {ProgressBarLineProps} from "@/interfaces/progressbar/ProgressBarInterfaces";

export default function ProgressBarLine({width, position, lineFill}: ProgressBarLineProps) {
    return (
        <div
            className={`absolute top-1/2 -translate-y-1/2 ml-4  h-2 bg-neutral-400 overflow-hidden z-50`}
            style={{ left: `${position}%`, width: `${width}` }}
        >
            <div
                className="h-full bg-neutral-800"
                style={{ width: `${lineFill}%` }}
            />
        </div>
    )
}