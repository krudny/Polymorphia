"use client";

import MarkdownWrapper from "@/components/markdown";
import { MarkdownTypes } from "@/interfaces/general";
import { SpeedDialKeys } from "@/components/speed-dial/types";
import { MarkdownProvider } from "@/providers/markdown";

export default function CourseRules() {
  return (
    <MarkdownProvider markdownType={MarkdownTypes.COURSE_RULES}>
      <MarkdownWrapper speedDialKey={SpeedDialKeys.RULES_MARKDOWN} />
    </MarkdownProvider>
  );
}
