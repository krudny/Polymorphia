/* eslint-disable -- unused variables because of mocks, TODO: remove this line */

import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";
// import { API_HOST } from "@/services/api";

const KnowledgeBaseService = {
  getEvolutionStages: async (
    courseId: number
  ): Promise<KnowledgeBaseResponseDTO[]> => {
    // const response = await fetch(
    //   `${API_HOST}/courses/${courseId}/evolution-stages`,
    //   { credentials: "include" }
    // );
    // if (!response.ok) throw new Error("Failed to fetch evolution stages!");

    // mocked
    return [
      {
        type: "EVOLUTION_STAGE",
        id: 1,
        orderIndex: 0,
        name: "Jajo",
        subtitle: "0.0 xp odblokowuje ocenę 2.0",
        description:
          "Jajo to symbol narodzin i początek niezwykłej podróży. Choć nieporadne, tętni ciekawością świata i gotowe jest na pierwsze doświadczenia. To faza, w której wszystko jest nowe, a każdy bodziec rozwija wyobraźnię. Mimo braku umiejętności, Jajo ma w sobie pasję i wewnętrzną energię, które popychają je do działania i poznawania Polymorphii. Otulone delikatną skorupką skrywa potencjał, który czeka na właściwy moment, by rozkwitnąć. Wewnątrz niego drzemie przyszłość, która z każdym dniem nabiera kształtów, przygotowując się na moment wielkiej przemiany. Jajo uosabia nadzieję i wiarę w to, co nieodkryte.",
        imageUrl: "images/evolution-stages/egg.jpg",
      },
      {
        type: "EVOLUTION_STAGE",
        id: 2,
        orderIndex: 1,
        name: "Jajo2",
        subtitle: "0.0 xp odblokowuje ocenę 2.0",
        description:
          "Jajo to symbol narodzin i początek niezwykłej podróży. Choć nieporadne, tętni ciekawością świata i gotowe jest na pierwsze doświadczenia. To faza, w której wszystko jest nowe, a każdy bodziec rozwija wyobraźnię. Mimo braku umiejętności, Jajo ma w sobie pasję i wewnętrzną energię, które popychają je do działania i poznawania Polymorphii. Otulone delikatną skorupką skrywa potencjał, który czeka na właściwy moment, by rozkwitnąć. Wewnątrz niego drzemie przyszłość, która z każdym dniem nabiera kształtów, przygotowując się na moment wielkiej przemiany. Jajo uosabia nadzieję i wiarę w to, co nieodkryte.",
        imageUrl: "images/evolution-stages/egg.jpg",
      },
      {
        type: "EVOLUTION_STAGE",
        id: 3,
        orderIndex: 2,
        name: "Jajo3",
        subtitle: "0.0 xp odblokowuje ocenę 2.0",
        description:
          "Jajo to symbol narodzin i początek niezwykłej podróży. Choć nieporadne, tętni ciekawością świata i gotowe jest na pierwsze doświadczenia. To faza, w której wszystko jest nowe, a każdy bodziec rozwija wyobraźnię. Mimo braku umiejętności, Jajo ma w sobie pasję i wewnętrzną energię, które popychają je do działania i poznawania Polymorphii. Otulone delikatną skorupką skrywa potencjał, który czeka na właściwy moment, by rozkwitnąć. Wewnątrz niego drzemie przyszłość, która z każdym dniem nabiera kształtów, przygotowując się na moment wielkiej przemiany. Jajo uosabia nadzieję i wiarę w to, co nieodkryte.",
        imageUrl: "images/evolution-stages/egg.jpg",
      },
    ];
  },

  getItems: async (courseId: number): Promise<KnowledgeBaseResponseDTO[]> => {
    // const response = await fetch(`${API_HOST}/courses/${courseId}/items`, {
    //   credentials: "include",
    // });
    // if (!response.ok) throw new Error("Failed to fetch items!");

    // mocked
    return [
      {
        type: "ITEM",
        id: 1,
        orderIndex: 0,
        name: "Apteczka",
        subtitle: "+10.0 xp do eventów z kategorii projekt",
        description:
          "Apteczka to symbol gotowości i szybkiej regeneracji. Choć często wygląda niepozornie, kryje w sobie narzędzia niezbędne do leczenia ran i przywracania sił witalnych. W Polymorphii reprezentuje zdolność do powrotu do formy i kontynuowania walki – pozwala przetrwać kryzysowe momenty. Użycie jej w potrzebie pozwala błyskawicznie odzyskać zdrowie i gotowość do działania. To dar dla tych, którzy cenią przezorność i potrafią zadbać o siebie lub swoich towarzyszy, nie pozwalając, by odnieśli trwałe rany.",
        imageUrl: "images/items/aid.jpg",
      },
      {
        type: "ITEM",
        id: 2,
        orderIndex: 1,
        name: "Apteczka2",
        subtitle: "+10.0 xp do eventów z kategorii projekt",
        description:
          "Apteczka to symbol gotowości i szybkiej regeneracji. Choć często wygląda niepozornie, kryje w sobie narzędzia niezbędne do leczenia ran i przywracania sił witalnych. W Polymorphii reprezentuje zdolność do powrotu do formy i kontynuowania walki – pozwala przetrwać kryzysowe momenty. Użycie jej w potrzebie pozwala błyskawicznie odzyskać zdrowie i gotowość do działania. To dar dla tych, którzy cenią przezorność i potrafią zadbać o siebie lub swoich towarzyszy, nie pozwalając, by odnieśli trwałe rany.",
        imageUrl: "images/items/aid.jpg",
      },
      {
        type: "ITEM",
        id: 3,
        orderIndex: 2,
        name: "Apteczka3",
        subtitle: "+10.0 xp do eventów z kategorii projekt",
        description:
          "Apteczka to symbol gotowości i szybkiej regeneracji. Choć często wygląda niepozornie, kryje w sobie narzędzia niezbędne do leczenia ran i przywracania sił witalnych. W Polymorphii reprezentuje zdolność do powrotu do formy i kontynuowania walki – pozwala przetrwać kryzysowe momenty. Użycie jej w potrzebie pozwala błyskawicznie odzyskać zdrowie i gotowość do działania. To dar dla tych, którzy cenią przezorność i potrafią zadbać o siebie lub swoich towarzyszy, nie pozwalając, by odnieśli trwałe rany.",
        imageUrl: "images/items/aid.jpg",
        relatedRewards: [
          {
            id: 2,
            orderIndex: 1,
            name: "Srebrna Skrzynka 2",
            imageUrl: "images/chests/s1.png",
          },
        ],
      },
    ];
  },

  getChests: async (courseId: number): Promise<KnowledgeBaseResponseDTO[]> => {
    // const response = await fetch(`${API_HOST}/courses/${courseId}/chests`, {
    //   credentials: "include",
    // });
    // if (!response.ok) throw new Error("Failed to fetch chests");

    // mocked
    return [
      {
        type: "CHEST",
        id: 1,
        orderIndex: 0,
        name: "Srebrna skrzynia",
        subtitle: "Otrzymujesz pełną zawartość skrzynki",
        description:
          "Srebrna Skrzynia skrywa w sobie obietnicę wartości i elegancji. Jej chłodny blask sugeruje sekrety czekające na odkrycie. Nie emanuje taką potęgą jak jej złota siostra, lecz jej zawartość niesie ze sobą subtelne bogactwo i wyrafinowanie. Otwarcie Srebrnej Skrzyni to krok ku poznaniu piękna w jego bardziej stonowanej formie, nagroda za ciekawość i wytrwałość w poszukiwaniach.",
        imageUrl: "images/chests/s1.png",
      },
      {
        type: "CHEST",
        id: 2,
        orderIndex: 1,
        name: "Srebrna skrzynia 2",
        subtitle: "Otrzymujesz pełną zawartość skrzynki",
        description:
          "Srebrna Skrzynia skrywa w sobie obietnicę wartości i elegancji. Jej chłodny blask sugeruje sekrety czekające na odkrycie. Nie emanuje taką potęgą jak jej złota siostra, lecz jej zawartość niesie ze sobą subtelne bogactwo i wyrafinowanie. Otwarcie Srebrnej Skrzyni to krok ku poznaniu piękna w jego bardziej stonowanej formie, nagroda za ciekawość i wytrwałość w poszukiwaniach.",
        imageUrl: "images/chests/s1.png",
        relatedRewards: [
          {
            id: 3,
            orderIndex: 2,
            name: "Apteczka3",
            imageUrl: "images/items/aid.jpg",
          },
        ],
      },
      {
        type: "CHEST",
        id: 3,
        orderIndex: 2,
        name: "Srebrna skrzynia 3",
        subtitle: "Otrzymujesz pełną zawartość skrzynki",
        description:
          "Srebrna Skrzynia skrywa w sobie obietnicę wartości i elegancji. Jej chłodny blask sugeruje sekrety czekające na odkrycie. Nie emanuje taką potęgą jak jej złota siostra, lecz jej zawartość niesie ze sobą subtelne bogactwo i wyrafinowanie. Otwarcie Srebrnej Skrzyni to krok ku poznaniu piękna w jego bardziej stonowanej formie, nagroda za ciekawość i wytrwałość w poszukiwaniach.",
        imageUrl: "images/chests/s1.png",
      },
    ];
  },
};

export default KnowledgeBaseService;
