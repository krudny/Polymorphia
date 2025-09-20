import React from "react";

export interface MenuOption {
  icon: React.ElementType;
  text: string;
  link?: string;
  subItems?: SubMenuOption[];
  onClick?: () => void;
}

export interface SubMenuOption {
  text: string;
  link?: string;
}

export interface MenuSectionProps {
  options: MenuOption[];
}
