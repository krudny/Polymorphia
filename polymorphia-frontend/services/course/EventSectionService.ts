import {
  EventSection,
  EventSectionCore,
} from '@/interfaces/course/EventSectionInterfaces';

const eventSections: EventSection[] = [
        {
          id: 1,
          name: 'Git',
          type: 'coursework',
          gainedXp: 4,
          flatBonusXp: 0,
          percentageBonus: 0,
          percentageBonusXp: 0,
          totalXp: 4,
          gradableEvents: [
            {
              id: 1,
              name: 'Lab 0',
              topic: 'Git jest git',
              gainedXp: 4,
              hidden: false,
            },
          ],
        },
        {
          id: 2,
          name: 'Laboratoria',
          type: 'coursework',
          gainedXp: 4,
          flatBonusXp: 0,
          percentageBonus: 0,
          percentageBonusXp: 0,
          totalXp: 4,
          gradableEvents: [],
        },
        {
          id: 3,
          name: 'Kartkówki',
          type: 'tests',
          gainedXp: 4,
          flatBonusXp: 2,
          percentageBonus: 10,
          percentageBonusXp: 0.6,
          totalXp: 6.6,
          gradableEvents: [
            {
              id: 1,
              name: 'Kartkówka 1',
              gainedXp: 2,
              hidden: false,
            },
            {
              id: 2,
              name: 'Kartkówka 2',
              gainedXp: 0,
              hidden: false,
            },
            {
              id: 3,
              name: 'Kartkówka 3',
              gainedXp: 0,
              hidden: false,
            },
            {
              id: 4,
              name: 'Kartkówka 4',
              gainedXp: 2,
              hidden: false,
            },
            {
              id: 5,
              name: 'Kartkówka 5',
              hidden: false,
            },
            {
              id: 6,
              name: 'Kartkówka 6',
              hidden: false,
            },
            {
              id: 7,
              name: 'Kartkówka 7',
              hidden: false,
            },
          ],
        },
        {
          id: 4,
          name: 'Quizy',
          type: 'tests',
          gainedXp: 4,
          flatBonusXp: 0,
          percentageBonus: 0,
          percentageBonusXp: 0,
          totalXp: 4,
          gradableEvents: [],
        },
        {
          id: 5,
          name: 'Specjalne',
          type: 'coursework',
          gainedXp: 4,
          flatBonusXp: 0,
          percentageBonus: 0,
          percentageBonusXp: 0,
          totalXp: 4,
          gradableEvents: [],
        },
        {
          id: 6,
          name: 'Projekt',
          type: 'project',
          gainedXp: 4,
          flatBonusXp: 0,
          percentageBonus: 0,
          percentageBonusXp: 0,
          totalXp: 4,
          gradableEvents: [],
        },
      ];

// mocks
export const EventSectionService = {
  getEventSections: async (): Promise<EventSectionCore[]> => {
    return new Promise<EventSectionCore[]>((resolve) => {
      resolve([
        {
          id: 1,
          name: 'Git',
        },
        {
          id: 2,
          name: 'Laboratoria',
        },
        {
          id: 3,
          name: 'Kartkówki',
        },
        {
          id: 4,
          name: 'Quizy',
        },
        {
          id: 5,
          name: 'Specjalne',
        },
        {
          id: 6,
          name: 'Projekt',
        },
      ]);
    });
  },

  getEventSection: async (eventSectionId: number): Promise<EventSection> => {
    return new Promise<EventSection>((resolve, reject) => {
      const eventSection = eventSections.filter((e) => e.id === eventSectionId);
      
      if (eventSection.length === 1) {
        resolve(eventSection[0]);
      } else {
        reject("Invalid id");
      }
    });
  },
};
