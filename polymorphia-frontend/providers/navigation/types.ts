import { Dispatch, SetStateAction } from "react";

export interface NavigationContextInterface {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
  isSidebarLockedOpened: boolean;
  setIsSidebarLockedOpened: Dispatch<SetStateAction<boolean>>;
  isSidebarLockedClosed: boolean;
  setIsSidebarLockedClosed: Dispatch<SetStateAction<boolean>>;
  isNavbarExpanded: boolean;
  setIsNavbarExpanded: Dispatch<SetStateAction<boolean>>;
}
