import { Components } from "react-markdown";
import "./index.css";

export const markdownConfig: Components = {
  h1: ({ ...props }) => <h1 className="text-5xl my-10 first:mt-0" {...props} />,
  h2: ({ ...props }) => (
    <h2 className="text-[2.5rem] my-7 first:mt-0" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="text-[2.2rem] my-4 first:mt-0" {...props} />
  ),
  p: ({ ...props }) => (
    <p className="text-3xl mt-5 first:mt-0 leading-11" {...props} />
  ),
  ol: ({ ...props }) => <ol className="list-decimal pl-16" {...props} />,
  ul: ({ ...props }) => <ul className="list-disc pl-16" {...props} />,
  li: ({ ...props }) => <li className="text-3xl my-2" {...props} />,
  strong: ({ children, ...props }) => (
    <span className="font-normal" {...props}>
      {children}
    </span>
  ),
  // img: (props: ComponentProps<"img">) => {
  //   const { src = "", alt = "" } = props;
  //   return (
  //     <div className="relative w-full max-w-3xl h-[400px] my-8">
  //       <Image
  //         src={src}
  //         alt={alt}
  //         fill
  //         className="object-contain rounded-xl shadow-md"
  //         sizes="(max-width: 768px) 100vw, 700px"
  //       />
  //     </div>
  //   );
  // },

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
