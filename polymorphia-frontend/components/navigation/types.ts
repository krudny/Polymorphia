import React from "react";

export interface MenuOption {
  icon: React.ElementType;
  text: string;
  link?: string;
  subItems?: SubMenuOption[];
}

export interface SubMenuOption {
  text: string;
  link?: string;
}

export interface MenuSectionProps {
  options: MenuOption[];
}

export type UseTitleHook = (match: RegExpMatchArray) => string | undefined;

export type TitleRule = {
  pattern: RegExp;
  useTitleHook: UseTitleHook;
};

export interface TitleProps {
  setTitleWithName: (title: string) => void;
  useTitleHook: () => string | undefined;
}
