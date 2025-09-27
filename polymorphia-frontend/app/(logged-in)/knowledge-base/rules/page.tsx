"use client"

import {useTitle} from "@/components/navigation/TitleContext";
import {useEffect} from "react";
import {MarkdownProvider} from "@/providers/markdown/MarkdownContext";
import MarkdownWrapper from "@/components/markdown";
import {MarkdownTypes} from "@/interfaces/general";


export default function CourseRules() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Zasady");
  }, [setTitle]);


  return (
    <MarkdownProvider markdownType={MarkdownTypes.COURSE}>
      <MarkdownWrapper />
    </MarkdownProvider>
  );
}
