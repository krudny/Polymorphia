import {createContext, useEffect, useState} from "react";
import {MarkdownContextInterface, MarkdownProviderProps,} from "@/providers/markdown/types";
import {useEventParams} from "@/hooks/general/useEventParams";
import useMarkdown from "@/hooks/general/useMarkdown";
import useMarkdownUpdate from "@/hooks/course/useMarkdownUpdate";
import toast from "react-hot-toast";

export const MarkdownContext = createContext<
  MarkdownContextInterface | undefined
>(undefined);

export const MarkdownProvider = ({ children }: MarkdownProviderProps) => {
  const { data, isLoading, isError } = useMarkdown();
  const { gradableEventId } = useEventParams();

  const [markdown, setMarkdown] = useState("");
  const [newMarkdown, setNewMarkdown] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { mutate } = useMarkdownUpdate(setIsEditing);

  useEffect(() => {
    if (data?.markdown !== undefined) {
      setMarkdown(data.markdown);
      setNewMarkdown(data.markdown);
    }
  }, [data?.markdown]);

  const saveMarkdown = () => {
    mutate({ gradableEventId, markdown: newMarkdown });
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
      }}
    >
      {children}
    </MarkdownContext.Provider>
  );
};
