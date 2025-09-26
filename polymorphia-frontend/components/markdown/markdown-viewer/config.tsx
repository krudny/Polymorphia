import {Components} from "react-markdown";
import "./index.css";
import Image from "next/image";

interface ImageProps {
  node?: any;
  src?: string;
  alt?: string;
  'data-inline'?: boolean;
  'data-width'?: string;
  'data-height'?: string;
}

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
  img: ({ node, src, alt, ...props }: ImageProps) => {
    // Sprawdzamy, czy obrazek ma być inline
    const isInline = 'data-inline' in props;

    // Pobieramy wymiary z data-attributes
    const dataWidth = props['data-width'];
    const dataHeight = props['data-height'];

    // Warunek, czy możemy użyć Next/Image (musimy mieć src i wymiary)
    const canUseNextImage = src && dataWidth && dataHeight;

    // Usuwamy niestandardowe atrybuty, aby nie trafiły do finalnego tagu
    const { 'data-inline': di, 'data-width': dw, 'data-height': dh, ...restProps } = props;

    if (canUseNextImage) {
      console.log("can")
      const width = parseInt(dataWidth, 10);
      const height = parseInt(dataHeight, 10);


      if (isInline) {
        return (
          <span style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            marginLeft: '0.5rem',
            marginBottom: '0.2rem',
          }}>
            <Image
              src={src}
              alt={alt || ""}
              width={width}
              height={height}
              className="object-contain rounded-xl my-4"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </span>
        );
      }

      return (
        <div>
          <Image
            src={src}
            alt={alt || ""}
            width={width}
            height={height}
            className="object-contain rounded-xl my-4"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      );
    }

    if (src) {
      if (isInline) {
        return (
          <img
            src={src}
            alt={alt}
            style={{ display: 'inline-block', verticalAlign: 'middle', height: '1.2em', marginLeft: '0.5rem' }}
            {...restProps}
          />
        );
      }
      return (
        <img
          src={src}
          alt={alt}
          style={{ display: 'block', margin: '1rem 0', maxWidth: '100%' }}
          {...restProps}
        />
      );
    }

    return null; // Nic nie renderuj, jeśli nie ma src
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
