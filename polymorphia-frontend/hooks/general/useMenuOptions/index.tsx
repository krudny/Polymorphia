import { MenuOption } from "@/components/navigation/types";
import {
  BadgeHelpIcon,
  BellIcon,
  GraduationCapIcon,
  LogOutIcon,
  MedalIcon,
  MilestoneIcon,
  SettingsIcon,
  TrophyIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { Roles } from "@/interfaces/api/user";
import useUserContext from "@/hooks/contexts/useUserContext";

export function useBottomMenuItems(): MenuOption[] {
  return [
    {
      icon: LogOutIcon,
      text: "Wyloguj się",
      link: "logout/",
    },
    { icon: SettingsIcon, text: "Ustawienia", link: "settings" },
  ];
}

export function useBottomDesktopMenuItems(): MenuOption[] {
  return [
    { icon: BellIcon, text: "Powiadomienia" },
    {
      icon: LogOutIcon,
      text: "Wyloguj się",
      link: "logout/",
    },
    {
      icon: SettingsIcon,
      text: "Ustawienia",
      link: "settings",
    },
  ];
}

export function useMainMenuItems(): MenuOption[] {
  const { userRole } = useUserContext();
  console.log(userRole);
  const isInstructorOrCoordinator =
    userRole === Roles.COORDINATOR || userRole === Roles.INSTRUCTOR;

  const items: MenuOption[] = [];

  if (isInstructorOrCoordinator) {
    items.push({ icon: UsersIcon, text: "Grupy", link: "course/groups" });
  }

  if (userRole === Roles.STUDENT) {
    items.push({ icon: UserIcon, text: "Profil", link: "profile" });
  }

  items.push(
    {
      icon: BadgeHelpIcon,
      text: "Baza wiedzy",
      link: "knowledge-base/",
      subItems: [
        { text: "Postacie", link: "knowledge-base/evolution-stages" },
        { text: "Przedmioty", link: "knowledge-base/items" },
        { text: "Skrzynki", link: "knowledge-base/chests" },
      ],
    },
    { icon: GraduationCapIcon, text: getCourseMenuOptionText() }
  );

  if (userRole === Roles.STUDENT) {
    items.push({ icon: TrophyIcon, text: "Ekwipunek", link: "equipment" });
  }

  items.push(
    { icon: MedalIcon, text: "Hall of Fame", link: "hall-of-fame" },
    { icon: MilestoneIcon, text: "Roadmapa", link: "roadmap" }
  );

  return items;
}

export function getCourseMenuOptionText() {
  const { userRole } = useUserContext();
  const isInstructorOrCoordinator =
    userRole === Roles.COORDINATOR || userRole === Roles.INSTRUCTOR;
  return isInstructorOrCoordinator ? "Ocenianie" : "Kurs";
}
