import {
  EventSection,
  EventSectionResponseDto,
  EventSectionShortResponseDto,
  EventSectionType,
  GradableEvent,
  GradableEventCoreResponse,
  GradableEventShortResponseDtoPage,
  Test,
  TestResponseDto,
} from '@/interfaces/course/event-section/EventSectionInterfaces';
import { API_HOST } from '@/services/api';

export const EventSectionService = {
  getEventSections: async (
    courseId: number
  ): Promise<EventSectionShortResponseDto[]> => {
    const response = await fetch(
      `${API_HOST}/courses/${courseId}/event-sections`,
      { credentials: 'include' }
    );

    if (!response.ok) throw new Error('Failed to fetch event sections!');

    return response.json();
  },

  getEventSection: async ({
    eventSectionId,
    eventSectionType,
  }: {
    eventSectionId: number;
    eventSectionType: EventSectionType;
  }): Promise<EventSection> => {
    const response = await fetch(
      `${API_HOST}/${eventSectionType.toLowerCase()}-sections/${eventSectionId}`,
      { credentials: 'include' }
    );

    if (!response.ok) throw new Error('Failed to fetch event section!');

    const data: EventSectionResponseDto = await response.json();

    return {
      id: eventSectionId,
      type: eventSectionType,
      name: data.name,
      gainedXp: data.gainedXp.toFixed(1),
      totalXp: data.totalXp.toFixed(1),
      bonuses: [
        {
          name: 'Bonusy punktowe',
          bonusXp: data.flatBonus.xp.toFixed(1),
          items: data.flatBonus.items.map((item) => {
            return {
              assignedId: item.id,
              item: {
                id: item.assignedItemId,
                name: item.name,
                imageUrl: item.imageUrl,
              },
              receivedDate: item.receivedDate,
              bonusXp: item.xp.toFixed(1),
            };
          }),
        },
        {
          name: 'Bonusy procentowe',
          bonusXp: data.percentageBonus.xp.toFixed(1),
          bonusPercentage: data.percentageBonus.percentage?.toString(),
          items: data.percentageBonus.items.map((item) => {
            return {
              assignedId: item.id,
              item: {
                id: item.assignedItemId,
                name: item.name,
                imageUrl: item.imageUrl,
              },
              receivedDate: item.receivedDate,
              bonusXp: item.xp.toFixed(1),
              bonusPercentage: item.percentage?.toString(),
            };
          }),
        },
      ],
    };
  },

  getEventSectionGradableEvents: async ({
    eventSectionId,
    eventSectionType,
    page,
    pageSize,
  }: {
    eventSectionId: number;
    eventSectionType: EventSectionType;
    page: number;
    pageSize: number;
  }): Promise<GradableEventCoreResponse> => {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize),
    }).toString();

    const response = await fetch(
      `${API_HOST}/${eventSectionType.toLowerCase()}-sections/${eventSectionId}/gradable-events?` +
        params,
      { credentials: 'include' }
    );

    if (!response.ok) throw new Error('Failed to fetch gradable events!');

    const data: GradableEventShortResponseDtoPage = await response.json();

    return {
      data: data.content.map((event) => {
        return {
          id: event.id,
          name: event.name,
          topic: event.topic,
          gainedXp: event.gainedXp?.toFixed(1),
          hidden: event.hidden,
        };
      }),
      page: {
        totalPages: data.page.totalPages,
      },
    };
  },

  getGradableEvent: async <T extends GradableEvent>({
    eventSectionType,
    gradableEventId,
  }: {
    eventSectionType: EventSectionType;
    gradableEventId: number | null;
  }): Promise<T> => {
    if (gradableEventId === null) {
      return new Promise<T>((_, reject) => {
        reject('No data');
      });
    }

    /// TODO: URL might break for projects
    const response = await fetch(
      `${API_HOST}/${eventSectionType.toLowerCase()}s/${gradableEventId}`,
      { credentials: 'include' }
    );

    if (!response.ok) throw new Error('Failed to fetch event section!');

    const data: unknown = await response.json();

    if (eventSectionType === 'test') {
      const testData: TestResponseDto = data as TestResponseDto;
      const mapped: Test = {
        id: testData.id,
        name: testData.name,
        maxXp: testData.maxXp.toFixed(1),
        hidden: testData.hidden,
        grade: testData.grade
          ? {
              gainedXp: testData.grade.gainedXp.toFixed(1),
              chests: testData.grade.chests.map((chest) => {
                return {
                  assignedId: chest.assignedChestId,
                  chest: {
                    id: chest.id,
                    name: chest.name,
                    imageUrl: chest.imageUrl,
                    opened: chest.opened,
                  },
                };
              }),
            }
          : undefined,
      };
      return mapped as T;
    } else {
      return new Promise<T>((resolve, reject) => {
        reject('Not implemented yet.');
      });
    }
  },
};
