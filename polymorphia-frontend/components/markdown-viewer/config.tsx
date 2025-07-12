import { Components } from "react-markdown";
import "./index.css";

export const markdownConfig: Components = {
  h1: ({ ...props }) => <h1 className="text-5xl my-10 first:mt-0" {...props} />,
  h2: ({ ...props }) => (
    <h2 className="text-[2.5rem] my-7 first:mt-0" {...props} />
  ),
  p: ({ ...props }) => (
    <p className="text-3xl mt-5 first:mt-0 leading-11" {...props} />
  ),
  ol: ({ ...props }) => <ol className="list-decimal pl-16" {...props} />,
  ul: ({ ...props }) => <ul className="list-disc pl-16" {...props} />,
  li: ({ ...props }) => <li className="text-3xl my-1" {...props} />,

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
