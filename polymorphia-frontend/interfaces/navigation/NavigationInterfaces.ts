import React, {RefObject} from "react";

export interface MenuOption {
  icon: React.ElementType,
  text: string,
  subItems?: SubMenuOption[]
}

export interface SubMenuOption {
  text: string,
}

export interface MenuSectionProps {
  options: MenuOption[];
}

export interface NavigationContextType {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}