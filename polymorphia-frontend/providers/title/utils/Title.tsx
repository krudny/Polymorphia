import { useEffect } from "react";
import { TitleProps } from "@/providers/title/types";

export default function Title({ setTitleWithName, useTitleHook }: TitleProps) {
  const evaluatedTitle = useTitleHook();

  useEffect(() => {
    if (evaluatedTitle !== undefined) {
      setTitleWithName(evaluatedTitle);
    }
  }, [evaluatedTitle, setTitleWithName]);

  return null;
}
