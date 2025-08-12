import {GradingProps} from "@/components/grading/types";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";

export default function Grading({ components, columns }: GradingProps) {
    return (
        <div className={`w-full bg-purple-300 h-[calc(100dvh-5rem)] grid grid-cols-${columns} items-start content-start gap-4`}>
            {components.map((component, index) => (
                <div key={index} className="flex flex-col overflow-hidden max-h-full">
                    {component}
                </div>
            ))}
        </div>
    )
}