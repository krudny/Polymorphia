export type UseTitleHook = (match: RegExpMatchArray) => string | undefined;

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
  setTitle: (title: string) => void;
}
