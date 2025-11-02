import { ReactNode } from "react";

export type UseTitleHook = (
  match: RegExpMatchArray | null
) => string | undefined;

export type TitleRule = {
  pattern: RegExp;
  useTitleHook: UseTitleHook;
};

export interface TitleProps {
  setTitleWithName: (title: string) => void;
  useTitleHook: () => string | undefined;
}

export interface TitleContextType {
  title: string;
}

export interface TitleProviderProps {
  routes: TitleRule[];
  children: ReactNode;
}
