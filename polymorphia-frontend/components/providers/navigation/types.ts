import React from "react";

export interface NavigationContextInterface {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarLockedOpened: boolean;
  setIsSidebarLockedOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarLockedClosed: boolean;
  setIsSidebarLockedClosed: React.Dispatch<React.SetStateAction<boolean>>;
  isNavbarExpanded: boolean;
  setIsNavbarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
