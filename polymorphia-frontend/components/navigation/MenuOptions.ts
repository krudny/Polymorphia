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
  { icon: UserIcon, text: 'Profil' },
  {
    icon: BadgeHelpIcon,
    text: 'Baza wiedzy',
    subItems: [
      { text: 'Postacie' },
      { text: 'Przedmioty' },
      { text: 'Skrzynki' },
    ],
  },
  { icon: GraduationCapIcon, text: 'Oceny' },
  {
    icon: TrophyIcon,
    text: 'Ekwipunek',
    subItems: [
      { text: 'Bronie' },
      { text: 'Zbroje' },
      { text: 'Akcesoria' },
    ],
  },
  { icon: MedalIcon, text: 'Hall of Fame' },
];

export const BottomDesktopMenuItems: MenuOption[] = [
  { icon: BellIcon, text: "Powiadomienia" },
  { icon: LogOutIcon, text: 'Wyloguj się' },
  { icon: SettingsIcon, text: 'Ustawienia' },
]

export const BottomMenuItems: MenuOption[] = [
  { icon: LogOutIcon, text: 'Wyloguj się' },
  { icon: SettingsIcon, text: 'Ustawienia' },
];