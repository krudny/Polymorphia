"use client";

import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import { MarkdownProvider } from "@/providers/markdown";
import MarkdownWrapper from "@/components/markdown";
import { MarkdownTypes } from "@/interfaces/general";
import { SpeedDialKeys } from "@/components/speed-dial/types";

export default function CourseRules() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Zasady");
  }, [setTitle]);

  return (
    <MarkdownProvider markdownType={MarkdownTypes.COURSE_RULES}>
      <MarkdownWrapper speedDialKey={SpeedDialKeys.RULES_MARKDOWN} />
    </MarkdownProvider>
  );
}
