import { createContext, useEffect, useState } from "react";
import {
  MarkdownContextInterface,
  MarkdownProviderProps,
} from "@/providers/markdown/types";
import toast from "react-hot-toast";
import useMarkdownReset from "@/hooks/course/useMarkdownReset";
import useMarkdownSource from "@/hooks/course/useMarkdownSource";
import { useMarkdown } from "@/hooks/course/useMarkdown";
import useMarkdownUpdate from "@/hooks/course/useMarkdownUpdate";
import { MarkdownTypes } from "@/interfaces/general";
import { useEventParams } from "@/hooks/general/useEventParams";

const COURSE_ID = 1;

export const MarkdownContext = createContext<
  MarkdownContextInterface | undefined
>(undefined);

export const MarkdownProvider = ({
  children,
  markdownType,
}: MarkdownProviderProps) => {
  const { data, isLoading, isError } = useMarkdown(markdownType);
  const { gradableEventId } = useEventParams();
  const resourceId =
    markdownType === MarkdownTypes.GRADABLE_EVENT ? gradableEventId : COURSE_ID;
  const [markdown, setMarkdown] = useState("");
  const [newMarkdown, setNewMarkdown] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: saveMarkdown } = useMarkdownUpdate({
    setIsEditing,
    resourceId,
    type: markdownType,
    markdown: newMarkdown,
  });
  const { mutate: resetMarkdown } = useMarkdownReset({
    resourceId,
    type: markdownType,
  });
  const { data: markdownSource } = useMarkdownSource(markdownType);

  useEffect(() => {
    if (data && data.markdown) {
      setMarkdown(data.markdown);
      setNewMarkdown(data.markdown);
    }
  }, [data]);

  const rejectMarkdown = () => {
    setIsEditing(false);
    setNewMarkdown(markdown);
    toast.success("Nie zapisano zmian!");
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
        resetMarkdown,
        markdownSource,
        markdownType,
        resourceId,
      }}
    >
      {children}
    </MarkdownContext.Provider>
  );
};
