import { usePathname } from "next/navigation";
import { createContext, useState } from "react";
import Title from "@/providers/title/utils/Title";
import { TitleContextType, TitleProviderProps } from "@/providers/title/types";

export const TitleContext = createContext<TitleContextType | undefined>(
  undefined
);

export function TitleProvider({ routes, children }: TitleProviderProps) {
  const [title, setTitle] = useState("");
  const pathname = usePathname();

  function setTitleWithName(title: string) {
    const headerTitle = title;
    const documentTitle =
      title.length > 0 ? `${title} - Polymorphia` : "Polymorphia";

    setTitle(headerTitle);
    document.title = documentTitle;
  }

  const matchEntry = routes.find(({ pattern }) => pattern.test(pathname));

  return (
    <TitleContext.Provider value={{ title }}>
      <Title
        key={pathname}
        setTitleWithName={setTitleWithName}
        useTitleHook={() =>
          matchEntry?.useTitleHook(pathname.match(matchEntry?.pattern))
        }
      />
      {children}
    </TitleContext.Provider>
  );
}
