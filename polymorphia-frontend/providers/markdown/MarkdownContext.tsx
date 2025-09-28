import {createContext, useEffect, useState} from "react";
import {MarkdownContextInterface, MarkdownProviderProps,} from "@/providers/markdown/types";
import toast from "react-hot-toast";
import useMarkdownReset from "@/hooks/course/useMarkdownReset";
import useMarkdownSource from "@/hooks/course/useMarkdownSource";
import {useMarkdown} from "@/hooks/course/useMarkdown";

export const MarkdownContext = createContext<
  MarkdownContextInterface | undefined
>(undefined);

export const MarkdownProvider = ({ children, markdownType }: MarkdownProviderProps) => {
  const { data, isLoading, isError } = useMarkdown(markdownType);
  // const { gradableEventId } = useEventParams();

  const [markdown, setMarkdown] = useState("");
  const [newMarkdown, setNewMarkdown] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // const { mutate: updateMarkdown } = useMarkdownUpdate(setIsEditing);
  const { mutate: resetMarkdown } = useMarkdownReset();
  const { data: markdownSource } = useMarkdownSource(markdownType);

  useEffect(() => {
    if (data && data.markdown) {
      setMarkdown(data.markdown);
      setNewMarkdown(data.markdown);
    }
  }, [data]);

  const saveMarkdown = () => {
    // updateMarkdown({ gradableEventId, markdown: newMarkdown });
  };

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
      }}
    >
      {children}
    </MarkdownContext.Provider>
  );
};
