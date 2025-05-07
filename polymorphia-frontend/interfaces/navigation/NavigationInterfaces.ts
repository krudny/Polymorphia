import React from "react";

export interface MenuOption {
  icon: React.ElementType,
  text: string,
  link?: string,
  subItems?: SubMenuOption[]
}

export interface SubMenuOption {
  text: string,
  link?: string,
}

export interface MenuSectionProps {
  options: MenuOption[];
}

export interface NavigationContextType {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isLocked: boolean;
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
}