import { ElementType } from "react";

export interface MenuOption {
  icon: ElementType;
  text: string;
  link?: string;
  subItems?: SubMenuOption[];
  onClick?: () => void;
  notificationCount?: number;
}

export interface SubMenuOption {
  text: string;
  link?: string;
}

export interface MenuSectionProps {
  options: MenuOption[];
}
