import { Components } from "react-markdown";
import "./index.css";
import { ComponentProps } from "react";
import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const markdownConfig: Components = {
  h1: ({ ...props }) => (
    <h1 className="text-4xl my-5 lg:text-5xl lg:my-10 first:mt-0" {...props} />
  ),
  h2: ({ ...props }) => (
    <h2
      className="text-[2rem] my-4 lg:text-[2.5rem] lg:my-7 first:mt-0"
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3 className="text-[2.2rem] my-4 first:mt-0" {...props} />
  ),
  p: ({ ...props }) => (
    <p
      className="text-[1.6rem] leading-8 mt-3 lg:text-3xl lg:mt-5 lg:leading-11 first:mt-0"
      {...props}
    />
  ),
  ol: ({ ...props }) => (
    <ol className="pl-8 list-decimal lg:pl-16" {...props} />
  ),
  ul: ({ ...props }) => <ul className="pl-8 list-disc lg:pl-16" {...props} />,
  li: ({ ...props }) => (
    <li className="text-[1.6rem] my-1 lg:text-3xl lg:my-2" {...props} />
  ),
  strong: ({ children, ...props }) => (
    <span className="font-normal" {...props}>
      {children}
    </span>
  ),

  img: (props: ComponentProps<"img">) => {
    const { src = "", alt = "" } = props;
    return (
      <span className="relative flex items-start">
        <Image
          src={`${API_STATIC_URL}/images/general/${src}`}
          alt={alt}
          width={800}
          height={600}
          className="object-contain rounded-xl shadow-md my-4 max-w-xl w-full h-auto"
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </span>
    );
  },
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="
      hover:opacity-70
      hover:cursor-pointer
      transition
    "
      style={{
        transition: "opacity 0.2s",
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),

  code({ node, className, children, ...props }) {
    const isBlock = node?.position?.start.line !== node?.position?.end.line;
    const match = /language-(\w+)/.exec(className || "");

    if (!isBlock) {
      return (
        <code
          className="markdown-config-code-inline"
          style={{ fontFamily: "var(--league)" }}
          {...props}
        >
          {children}
        </code>
      );
    }

    return match ? (
      <SyntaxHighlighter
        PreTag="div"
        language={match[1]}
        style={cb}
        className="markdown-config-code-block"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <pre className="markdown-config-code-block">
        <code className={`${className}`} {...props}>
          {children}
        </code>
      </pre>
    );
  },
};
