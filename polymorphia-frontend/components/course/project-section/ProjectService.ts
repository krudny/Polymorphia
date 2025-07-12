import { sampleText } from "@/components/course/project-section/sampleText";

let projectUrl = "https://github.com/krudny/Polymorphia/pull/42";
const example = "https://github.com/krudny/Polymorphia/pull/42";

export const ProjectService = {
  getProjectSectionContent: async () => {
    return { content: sampleText };
  },
  getProjectSectionDetails: async (projectSectionId: number) => {
    // try {
    //   const res = await fetch(
    //     `${API_HOST}/project-sections/${projectSectionId}`,
    //     { credentials: "include" }
    //   );
    //
    //   if (!res.ok) {
    //     throw new Error(`HTTP error! status: ${res.status}`);
    //   }
    //
    //   const data = await res.json();
    //   console.log("Project section response:", data);
    //   return data;
    // } catch (error) {
    //   console.error("Error fetching project section:", error);
    //   throw error;
    // }
    return {
      name: "Projekt",
      gainedXp: 12,
      totalXp: 12,
      flatBonus: {
        xp: 0,
        items: [],
      },
      percentageBonus: {
        percentage: 0,
        xp: 0,
        items: [],
      },
      projectAnimals: [
        {
          studentName: "Kamil Rudny",
          animalName: "Dzwiedziosow",
          evolutionStage: "Majestatyczna bestia",
          group: "BM-20-00",
          imageUrl: "/images/evolution-stages/4.jpg",
          position: 1,
        },
        {
          studentName: "Kamil Śmieszny",
          animalName: "Tygrysosław",
          evolutionStage: "Zwinna bestia",
          group: "BM-20-00",
          imageUrl: "/images/evolution-stages/5.jpg",
          position: 2,
        },
      ],
      projectCriteria: [
        {
          id: 13,
          name: "Funkcjonalność",
          maxXp: 16,
          grade: {
            value: 5,
            description: "Bardzo dobrze",
          },
        },
        {
          id: 14,
          name: "Kod programu",
          maxXp: 16,
          grade: {
            value: 4,
            description: "Dobrze",
          },
        },
      ],
      projectVariants: [
        {
          id: 1,
          category: "Mapa i roślinność",
          name: "Lekka korekta",
          description:
            "mutacja zmienia gen o 1 w górę lub w dół (np. gen 3 może zostać zamieniony na 2 lub 4, a gen 0 na 1 lub 7)",
        },
      ],
      submission: {
        createdDate: "07.06.2025",
        modifiedDate: "07.06.2025",
        projectUrl: projectUrl,
      },
    };
  },
  deletePrUrl: async () => {
    projectUrl = "";
  },
  addPrUrl: async (prUrl: string) => {
    projectUrl = prUrl;
  },
};
