import {
  EventSection,
  EventSectionCore,
  GradableEvent,
  GradableEventCore,
  GradableEventCoreResponse,
} from '@/interfaces/course/event-section/EventSectionInterfaces';

// mocks
const eventSections: EventSection[] = [
  {
    id: 1,
    name: 'Git',
    type: 'coursework',
    gainedXp: '2',
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
    totalXp: '2',
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
            bonusXp: '1',
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
  },
  {
    id: 3,
    name: 'Kartkówki',
    type: 'tests',
    gainedXp: '4',
    bonuses: [
      {
        name: 'Bonusy punktowe',
        bonusXp: '4',
        items: [
          {
            assignedId: 1,
            item: {
              id: 1,
              imageUrl: 'images/items/carrot.jpg',
              name: 'Marchewka',
            },
            receivedDate: '12.11.2026',
            bonusXp: '2',
          },
          {
            assignedId: 3,
            item: {
              id: 2,
              imageUrl: 'images/items/parsley.jpg',
              name: 'Pietruszka',
            },
            receivedDate: '21.12.2026',
            bonusXp: '2',
          },
        ],
      },
      {
        name: 'Bonusy procentowe',
        bonusXp: '0,8',
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
            bonusXp: '0,8',
            bonusPercentage: '10',
          },
        ],
      },
    ],
    totalXp: '8,8',
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
  },
];

// keep in sync with array below
const gradableEventsCoreList: {
  id: number;
  gradableEvents: GradableEventCore[];
}[] = [
  {
    id: 1,
    gradableEvents: [
      {
        id: 1,
        name: 'Lab 0',
        topic: 'Git jest git',
        gainedXp: '2',
        hidden: false,
      },
    ],
  },
  {
    id: 2,
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
        gainedXp: '2,5',
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
    gradableEvents: [],
  },
  {
    id: 5,
    gradableEvents: [],
  },
  {
    id: 6,
    gradableEvents: [],
  },
];

// keep in sync with array above
const gradableEventsList: { id: number; gradableEvents: GradableEvent[] }[] = [
  {
    id: 1,
    gradableEvents: [],
  },
  {
    id: 2,
    gradableEvents: [],
  },
  {
    id: 3,
    gradableEvents: [
      {
        id: 1,
        name: 'Kartkówka 1',
        maxXp: '2',
        grade: {
          gainedXp: '2',
          chests: [
            {
              assignedId: 123,
              chest: {
                id: 456,
                name: 'Zwariowana skrzynka kartkówkowa',
                imageUrl: 'images/chests/s1.png',
                opened: false,
              },
            },
          ],
        },
        hidden: false,
      },
      {
        id: 2,
        name: 'Kartkówka 2',
        maxXp: '2',
        grade: {
          gainedXp: '0',
          chests: [],
        },
        hidden: false,
      },
      {
        id: 3,
        name: 'Kartkówka 3',
        maxXp: '2',
        grade: {
          gainedXp: '0',
          chests: [],
        },
        hidden: false,
      },
      {
        id: 4,
        name: 'Kartkówka 4',
        maxXp: '2',
        grade: {
          gainedXp: '2',
          chests: [],
        },
        hidden: false,
      },
      {
        id: 5,
        name: 'Kartkówka 5',
        maxXp: '2',
        hidden: false,
      },
      {
        id: 6,
        name: 'Kartkówka 6',
        maxXp: '2',
        hidden: false,
      },
      {
        id: 7,
        name: 'Kartkówka 7',
        maxXp: '2',
        hidden: false,
      },
    ],
  },
  {
    id: 4,
    gradableEvents: [],
  },
  {
    id: 5,
    gradableEvents: [],
  },
  {
    id: 6,
    gradableEvents: [],
  },
];

export const EventSectionService = {
  getEventSections: async (): Promise<EventSectionCore[]> => {
    return new Promise<EventSectionCore[]>((resolve) => {
      resolve([
        {
          id: 1,
          name: 'Git',
          type: 'coursework',
        },
        {
          id: 2,
          name: 'Laboratoria',
          type: 'coursework',
        },
        {
          id: 3,
          name: 'Kartkówki',
          type: 'tests',
        },
        {
          id: 4,
          name: 'Quizy',
          type: 'tests',
        },
        {
          id: 5,
          name: 'Specjalne',
          type: 'coursework',
        },
        {
          id: 6,
          name: 'Projekt',
          type: 'project',
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


  // pages start from 0 in Spring
  getEventSectionGradableEvents: async ({
    eventSectionId,
    page,
    pageSize,
  }: {
    eventSectionId: number;
    page: number;
    pageSize: number;
  }): Promise<GradableEventCoreResponse> => {
    return new Promise<GradableEventCoreResponse>((resolve, reject) => {
      const matchedSection = gradableEventsCoreList.find(
        (e) => e.id === eventSectionId
      );

      if (!matchedSection) {
        reject('Invalid id');
        return;
      }

      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedEvents = matchedSection.gradableEvents.slice(
        startIndex,
        endIndex
      );

      resolve({
        data: paginatedEvents,
        page: {
          totalPages: Math.ceil(matchedSection.gradableEvents.length / pageSize)
        }
      });
    });
  },

  getGradableEvent: async <T extends GradableEvent>(data?: {
    eventSectionId: number;
    gradableEventId: number;
  }): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      if (data === undefined) {
        reject('No data');
        return;
      }

      const gradableEvents = gradableEventsList.filter(
        (e) => e.id === data.eventSectionId
      );

      if (gradableEvents.length !== 1) {
        reject('Invalid id');
      }

      const gradableEvent = gradableEvents[0].gradableEvents.filter(
        (e) => e.id === data.gradableEventId
      );

      if (gradableEvent.length === 1) {
        resolve(gradableEvent[0] as T);
      } else {
        reject('Invalid id');
      }
    });
  },
};
