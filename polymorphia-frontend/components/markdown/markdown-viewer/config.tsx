import {Components} from "react-markdown";
import "./index.css";
import Image from "next/image";
import {MarkdownImageProps} from "./types";

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
  img: ({ src, alt, ...props }: MarkdownImageProps) => {
    const { width: propWidth, height: propHeight } = props;
    const isInline = 'data-inline' in props;

      const width = parseInt(String(propWidth), 10) || 900;
      const height = parseInt(String(propHeight), 10) || 600;

      if (isInline) {
        return (
          <span className="markdown-inline-image">
            <Image
              src={src!}
              alt={alt || ""}
              width={width}
              height={height}
              className="object-contain"
              quality={100}
              priority
            />
          </span>
        );
      }

      return (
        <div>
          <Image
            src={src!}
            alt={alt || ""}
            width={width}
            height={height}
            className="object-contain rounded-xl my-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            quality={100}
            priority
          />
        </div>
      );
  },

  code({ node, className, children, ...props }) {
    const isBlock = node?.position?.start.line !== node?.position?.end.line;

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

    return (
      <pre className="markdown-config-code-block">
        <code className={`${className}`} {...props}>
          {children}
        </code>
      </pre>
    );
  },
};
