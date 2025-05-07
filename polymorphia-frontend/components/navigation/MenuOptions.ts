import {
  BadgeHelpIcon, BellIcon,
  GraduationCapIcon,
  LogOutIcon,
  MedalIcon,
  SettingsIcon,
  TrophyIcon,
  UserIcon
} from "lucide-react";
import {MenuOption} from "@/interfaces/navigation/NavigationInterfaces";

export const MainMenuItems: MenuOption[]  = [
  { icon: UserIcon, text: 'Profil', link: 'profile' },
  {
    icon: BadgeHelpIcon,
    text: 'Baza wiedzy',
    subItems: [
      { text: 'Postacie', link: 'knowledge-base/evolution-stages' },
      { text: 'Przedmioty', link: 'knowledge-base/items' },
      { text: 'Skrzynki', link: 'knowledge-base/chests' },
    ],
  },
  { icon: GraduationCapIcon, text: 'Oceny' },
  {
    icon: TrophyIcon,
    text: 'Ekwipunek',
    link: 'equipment',
  },
  { icon: MedalIcon, text: 'Hall of Fame' },
];

export const BottomDesktopMenuItems: MenuOption[] = [
  { icon: BellIcon, text: "Powiadomienia" },
  { icon: LogOutIcon, text: 'Wyloguj się' },
  { icon: SettingsIcon, text: 'Ustawienia', link: 'settings' },
]

export const BottomMenuItems: MenuOption[] = [
  { icon: LogOutIcon, text: 'Wyloguj się' },
  { icon: SettingsIcon, text: 'Ustawienia', link: 'settings' },
];