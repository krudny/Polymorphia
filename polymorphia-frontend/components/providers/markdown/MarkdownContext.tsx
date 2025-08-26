import { createContext, useEffect, useState } from "react";
import { MarkdownContextInterface, MarkdownProviderProps } from "@/components/providers/markdown/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import toast from "react-hot-toast";
import { useEventParams } from "@/hooks/useEventParams";

export const MarkdownContext = createContext<MarkdownContextInterface>({
  markdown: "",
  setMarkdown: () => {
  },
  newMarkdown: "",
  setNewMarkdown: () => {
  },
  isEditing: false,
  setIsEditing: () => {
  },
  isLoading: true,
  isError: false,
  saveMarkdown: () => {
  },
  rejectMarkdown: () => {
  },
});

export const MarkdownProvider = ({ children }: MarkdownProviderProps) => {
  const queryClient = useQueryClient();
  const { gradableEventId } = useEventParams();

  const [markdown, setMarkdown] = useState("");
  const [newMarkdown, setNewMarkdown] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["markdown", gradableEventId],
    queryFn: () => EventSectionService.getMarkdown(Number(gradableEventId)),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (data?.markdown !== undefined) {
      setMarkdown(data.markdown);
      setNewMarkdown(data.markdown);
    }
  }, [data?.markdown]);

  const mutation = useMutation({
    mutationFn: () =>
      EventSectionService.saveMarkdown(Number(gradableEventId), newMarkdown),
    onSuccess: () => {
      setMarkdown(newMarkdown);
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["markdown", gradableEventId],
      });
      toast.success("Markdown został zaktualizowany!");
    },
    onError: (error) => {
      console.error("Błąd zapisu markdown:", error);
      alert("Nie udało się zapisać zmian.");
    },
  });

  const saveMarkdown = () => {
    mutation.mutate();
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
