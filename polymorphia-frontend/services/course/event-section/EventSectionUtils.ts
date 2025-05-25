'use client';

import { EventSectionCore } from '@/interfaces/course/event-section/EventSectionInterfaces';
import { MenuOption } from '@/interfaces/navigation/NavigationInterfaces';

export function updateMenuItems(
  menuItems: MenuOption[],
  eventSections: EventSectionCore[]
) {
  const courseItem = menuItems.filter(
    (menuOption) => menuOption.text === 'Kurs'
  )[0];
  courseItem.link = `course/${eventSections[0].id}`;

  courseItem.subItems = eventSections
    .filter((eventSection) => !eventSection.hidden)
    .map((eventSection) => {
      // TODO: use correct courseID
      return {
        text: eventSection.name,
        link: `course/${eventSection.id}`,
      };
    });
}
