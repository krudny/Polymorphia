import { createContext, ReactNode, useContext, useState } from 'react';

interface TitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

const TitleContext = createContext<TitleContextType | undefined>(undefined);

export function TitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('Polymorphia');

  function setTitleWithName(title: string) {
    const headerTitle = title.length > 0 ? title : 'Polymorphia';
    const documentTitle = title.length > 0 ? `Polymorphia: ${title}` : 'Polymorphia';

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
    throw new Error('useTitle must be used within a TitleProvider');
  }

  return context;
}
