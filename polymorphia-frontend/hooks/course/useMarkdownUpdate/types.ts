export interface UseMarkdownUpdate {
  mutate: (variables: { gradableEventId: number; newMarkdown: string }) => void;
}
