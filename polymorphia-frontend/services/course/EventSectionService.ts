import {
  EventSection,
  EventSectionCore,
} from '@/interfaces/course/EventSectionInterfaces';

const eventSections: EventSection[] = [
  {
    id: 1,
    name: 'Git',
    type: 'coursework',
    gainedXp: '4',
    bonuses: [
      {
        name: 'Bonusy punktowe',
        bonusXp: '0',
        items: [],
      },
      {
        name: 'Bonusy procentowe',
        bonusXp: '0',
        bonusPercentage: '0',
        items: [],
      },
    ],
    totalXp: '4',
    gradableEvents: [
      {
        id: 1,
        name: 'Lab 0',
        topic: 'Git jest git',
        gainedXp: '4',
        hidden: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Laboratoria',
    type: 'coursework',
    gainedXp: '11,5',
    bonuses: [
      {
        name: 'Bonusy punktowe',
        bonusXp: '1,5',
        items: [
          {
            assignedId: 1,
            item: {
              id: 1,
              imageUrl: 'images/items/carrot.jpg',
              name: 'Marchewka',
            },
            receivedDate: '12.11.2026',
            bonusXp: '1,0',
          },
          {
            assignedId: 3,
            item: {
              id: 2,
              imageUrl: 'images/items/parsley.jpg',
              name: 'Pietruszka',
            },
            receivedDate: '21.12.2026',
            bonusXp: '0,5',
          },
        ],
      },
      {
        name: 'Bonusy procentowe',
        bonusXp: '1,3',
        bonusPercentage: '10',
        items: [
          {
            assignedId: 2,
            item: {
              id: 2,
              imageUrl: 'images/items/parsley.jpg',
              name: 'Pietruszka',
            },
            receivedDate: '06.12.2026',
            bonusXp: '1,3',
            bonusPercentage: '10',
          },
        ],
      },
    ],
    totalXp: '14,3',
    gradableEvents: [
      {
        id: 1,
        name: 'Laboratorium 1',
        topic: 'Instrukcje sterujące w Javie',
        gainedXp: '3',
        hidden: false,
      },
      {
        id: 2,
        name: 'Laboratorium 2',
        topic: 'Model obiektowy',
        gainedXp: '4',
        hidden: false,
      },
      {
        id: 3,
        name: 'Laboratorium 3',
        topic: 'Interakcje między obiektami',
        gainedXp:'2,5',
        hidden: false,
      },
      {
        id: 4,
        name: 'Laboratorium 4',
        topic: 'Interfejsy i mapy',
        gainedXp: '2',
        hidden: false,
      },
      {
        id: 5,
        name: 'Laboratorium 5',
        topic: 'Dziedziczenie',
        hidden: false,
      },
      {
        id: 6,
        name: 'Laboratorium 6',
        topic: 'Refactoring kodu',
        hidden: false,
      },
      {
        id: 7,
        name: 'Laboratorium 7',
        topic: 'Wielowątkowość',
        hidden: false,
      },
      {
        id: 8,
        name: 'Laboratorium 8',
        topic: 'Interfejs graficzny',
        hidden: false,
      },
      {
        id: 9,
        name: 'Laboratorium 9',
        topic: 'Lambdy, streamy i zarządzanie zasobami',
        hidden: false,
      },
      {
        id: 10,
        name: 'Laboratorium 10',
        topic: 'Kotlin jako alternatywa dla Javy',
        hidden: false,
      },
    ],
  },
  {
    id: 3,
    name: 'Kartkówki',
    type: 'tests',
    gainedXp: '4',
    bonuses: [
      {
        name: 'Bonusy punktowe',
        bonusXp: '0',
        items: [],
      },
      {
        name: 'Bonusy procentowe',
        bonusXp: '0',
        bonusPercentage: '0',
        items: [],
      },
    ],
    totalXp: '4',
    gradableEvents: [
      {
        id: 1,
        name: 'Kartkówka 1',
        gainedXp: '2',
        hidden: false,
      },
      {
        id: 2,
        name: 'Kartkówka 2',
        gainedXp: '0',
        hidden: false,
      },
      {
        id: 3,
        name: 'Kartkówka 3',
        gainedXp: '0',
        hidden: false,
      },
      {
        id: 4,
        name: 'Kartkówka 4',
        gainedXp: '2',
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
    gainedXp: '4',
    bonuses: [
      {
        name: 'Bonusy punktowe',
        bonusXp: '0',
        items: [],
      },
      {
        name: 'Bonusy procentowe',
        bonusXp: '0',
        bonusPercentage: '0',
        items: [],
      },
    ],
    totalXp: '4',
    gradableEvents: [],
  },
  {
    id: 5,
    name: 'Specjalne',
    type: 'coursework',
    gainedXp: '4',
    bonuses: [
      {
        name: 'Bonusy punktowe',
        bonusXp: '0',
        items: [],
      },
      {
        name: 'Bonusy procentowe',
        bonusXp: '0',
        bonusPercentage: '0',
        items: [],
      },
    ],
    totalXp: '4',
    gradableEvents: [],
  },
  {
    id: 6,
    name: 'Projekt',
    type: 'project',
    gainedXp: '4',
    bonuses: [
      {
        name: 'Bonusy punktowe',
        bonusXp: '0',
        items: [],
      },
      {
        name: 'Bonusy procentowe',
        bonusXp: '0',
        bonusPercentage: '0',
        items: [],
      },
    ],
    totalXp: '4',
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
        reject('Invalid id');
      }
    });
  },

  // getGradableEvent: async (eventSectionId: number, gradableEventId: number): Promise<Gradable
};
