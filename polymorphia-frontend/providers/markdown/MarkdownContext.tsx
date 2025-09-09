import { createContext, useEffect, useState } from "react";
import {
  MarkdownContextInterface,
  MarkdownProviderProps,
} from "@/providers/markdown/types";
import { useEventParams } from "@/hooks/general/useEventParams";
import useMarkdown from "@/hooks/general/useMarkdown";
import useMarkdownUpdate from "@/hooks/course/useMarkdownUpdate";

export const MarkdownContext = createContext<
  MarkdownContextInterface | undefined
>(undefined);

export const MarkdownProvider = ({ children }: MarkdownProviderProps) => {
  const { data, isLoading, isError } = useMarkdown();
  const { mutate } = useMarkdownUpdate();
  const { gradableEventId } = useEventParams();

  const [markdown, setMarkdown] = useState("");
  const [newMarkdown, setNewMarkdown] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data?.markdown !== undefined) {
      setMarkdown(data.markdown);
      setNewMarkdown(data.markdown);
    }
  }, [data?.markdown]);

  const saveMarkdown = () => {
    mutate({ gradableEventId, newMarkdown });
  };

  const rejectMarkdown = () => {
    setIsEditing(false);
    setNewMarkdown(markdown);
  };

  return (
    <MarkdownContext.Provider
      value={{
        markdown,
        setMarkdown,
        newMarkdown,
        setNewMarkdown,
        isEditing,
        setIsEditing,
        isLoading,
        isError,
        saveMarkdown,
        rejectMarkdown,
      }}
    >
      {children}
    </MarkdownContext.Provider>
  );
};
