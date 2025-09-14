import { MenuOption } from "@/components/navigation/types";
import useLogout from "@/hooks/course/useLogout";
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
} from "lucide-react";
import { Roles } from "@/interfaces/api/user";
import useUserContext from "@/hooks/contexts/useUserContext";

export function useBottomMenuItems(): MenuOption[] {
  const logoutMutation = useLogout();

  return [
    {
      icon: LogOutIcon,
      text: "Wyloguj się",
      onClick: () => logoutMutation.mutate(),
    },
    { icon: SettingsIcon, text: "Ustawienia", link: "settings" },
  ];
}

export function useBottomDesktopMenuItems(): MenuOption[] {
  const { mutate: logout } = useLogout();

  return [
    { icon: BellIcon, text: "Powiadomienia" },
    {
      icon: LogOutIcon,
      text: "Wyloguj się",
      onClick: () => logout(),
    },
    {
      icon: SettingsIcon,
      text: "Ustawienia",
      link: "settings",
    },
  ];
}

export function useMainMenuItems(): MenuOption[] {
  const { userType } = useUserContext();
  const items: MenuOption[] = [
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
    { icon: GraduationCapIcon, text: "Kurs" },
    { icon: MedalIcon, text: "Hall of Fame", link: "hall-of-fame" },
    { icon: MilestoneIcon, text: "Roadmapa", link: "roadmap" },
  ];

  if (userType === Roles.STUDENT) {
    items.splice(0, 0, {
      icon: UserIcon,
      text: "Profil",
      link: "profile",
    });

    items.splice(3, 0, {
      icon: TrophyIcon,
      text: "Ekwipunek",
      link: "equipment",
    });
  }

  return items;
}
