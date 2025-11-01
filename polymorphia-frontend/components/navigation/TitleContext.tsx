import { usePathname } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";
import { APPLICATION_ROUTES } from "@/components/navigation/routes";
import Title from "@/components/navigation/Title";

interface TitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

const TitleContext = createContext<TitleContextType | undefined>(undefined);

export function TitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const pathname = usePathname();

  function setTitleWithName(title: string) {
    const headerTitle = title;
    const documentTitle =
      title.length > 0 ? `${title} - Polymorphia` : "Polymorphia";

    setTitle(headerTitle);
    document.title = documentTitle;
  }

  const matchEntry = APPLICATION_ROUTES.find(({ pattern }) =>
    pattern.test(pathname)
  );

  return (
    <TitleContext.Provider value={{ title, setTitle: () => {} }}>
      <Title
        key={pathname}
        setTitleWithName={setTitleWithName}
        useTitleHook={() =>
          matchEntry?.useTitleHook(pathname.match(matchEntry?.pattern)!)
        }
      />
      {children}
    </TitleContext.Provider>
  );
}

export function ManualTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");

  function setTitleWithName(title: string) {
    const headerTitle = title;
    const documentTitle =
      title.length > 0 ? `${title} - Polymorphia` : "Polymorphia";

    setTitle(headerTitle);
    document.title = documentTitle;
  }

  return (
    <TitleContext.Provider value={{ title, setTitle: setTitleWithName }}>
      {children}
    </TitleContext.Provider>
  );
}

export function useTitle() {
  const context = useContext(TitleContext);

  if (context === undefined) {
    throw new Error("useTitle must be used within a TitleProvider");
  }

  return context;
}
