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
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarLocked: boolean;
  setIsSidebarLocked: React.Dispatch<React.SetStateAction<boolean>>;
  isNavbarExpanded: boolean;
  setIsNavbarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
