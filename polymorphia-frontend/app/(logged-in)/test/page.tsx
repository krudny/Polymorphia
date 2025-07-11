"use client";

import { useEffect } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import Markdown from "react-markdown";
import { sampleText } from "@/app/(logged-in)/test/sampleText";
import GroupModal from "@/app/(logged-in)/test/modals/GroupModal";
import ProjectVariant from "@/app/(logged-in)/test/modals/ProjectVariant";
import Rewards from "@/app/(logged-in)/test/modals/Rewards";
import PullRequest from "@/app/(logged-in)/test/modals/PullRequest";
import SpeedDial from "@/components/speed-dial";

export default function Test() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Laboratoria");
  }, [setTitle]);

  const sampleItems = [
    {
      label: "Pull Request",
      icon: "add",
      modal: (onClose: () => void) => (
        <PullRequest isActive={true} onClosed={onClose} />
      ),
    },
    {
      label: "Zespół",
      icon: "person",
      modal: (onClose: () => void) => (
        <GroupModal isActive={true} onClosed={onClose} />
      ),
    },
    {
      label: "Nagrody",
      icon: "trophy",
      modal: (onClose: () => void) => (
        <Rewards isActive={true} onClosed={onClose} />
      ),
    },
    {
      label: "Warianty",
      icon: "arrow_split",
      modal: (onClose: () => void) => (
        <ProjectVariant isActive={true} onClosed={onClose} />
      ),
    },
  ];

  return (
    <div className="w-full h-[calc(100dvh-5rem)] flex flex-col max-w-[1200px] mx-auto px-10 mt-10">
      <div className="absolute right-10 bottom-15">
        <SpeedDial items={sampleItems} />
      </div>
      <div className="w-full px-10 h-full overflow-y-auto custom-scrollbar">
        <Markdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-5xl my-10 first:mt-0" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-[2.5rem] my-7 first:mt-0" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-3xl mt-5 first:mt-0 leading-11" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-16" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-16" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-3xl my-1" {...props} />
            ),
            code({ node, className, children, ...props }) {
              const isBlock =
                node?.position?.start.line !== node?.position?.end.line;

              if (!isBlock) {
                return (
                  <code
                    className="bg-[#c3c3c3] text-primary-dark px-2 rounded text-3xl"
                    style={{ fontFamily: "var(--league)" }}
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              return (
                <pre className="bg-primary-dark text-secondary-light text-sm p-4 rounded overflow-x-auto my-4">
                  <code className={`${className}`} {...props}>
                    {children}
                  </code>
                </pre>
              );
            },
          }}
        >
          {sampleText}
        </Markdown>
        <textarea
          value={sampleText}
          readOnly
          className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm font-mono"
        />
      </div>
    </div>
  );
}
