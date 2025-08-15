import { ProgressBarElementProps } from "@/components/progressbar/types";

export default function ProgressBarElement({
  elements,
  isHorizontal,
  alternate,
  isUpper,
}: ProgressBarElementProps) {
  return (
    <div
      className={`progressbar-element-container ${
        isHorizontal ? "w-full min-h-14" : "h-full min-w-14"
      }`}
    >
      {elements.map((element, i) => {
        if (alternate) {
          if (isUpper && i % 2 !== 0) return null;
          if (!isUpper && i % 2 === 0) return null;
        }

        const positionStyle = isHorizontal
          ? {
              left: `${(i / (elements.length - 1)) * 100}%`,
              transform: `translateX(-50%)`,
            }
          : {
              top: `${(i / (elements.length - 1)) * 100}%`,
              transform: `translateY(-50%)`,
            };

        return (
          <div key={i} className="progressbar-element" style={positionStyle}>
            {element}
          </div>
        );
      })}
    </div>
  );
}
