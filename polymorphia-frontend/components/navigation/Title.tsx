import { useEffect } from "react";
import { TitleProps } from "@/components/navigation/types";

export default function Title({ setTitleWithName, useTitleHook }: TitleProps) {
  const evaluatedTitle = useTitleHook();

  useEffect(() => {
    if (evaluatedTitle !== undefined) {
      setTitleWithName(evaluatedTitle);
    }
  }, [evaluatedTitle, setTitleWithName]);

  return null;
}
