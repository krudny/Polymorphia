/* eslint-disable */

// TODO: temporary file

const roundToTwo = (num: number): number => {
  return parseFloat((Math.round(num * 100) / 100).toFixed(2));
};

const studentNames = [
  "Gerard Małoduszny",
  "Gerard Małosolny",
  "Gerard Kiszony",
  "Gerard Solny",
  "Kamil Rudny",
  "Anna Nowak",
  "Jan Kowalski",
  "Maria Wiśniewska",
  "Tomasz Zieliński",
  "Paulina Kaczmarek",
];

const groups = [
  "MI-15-00",
  "BM-16-00",
  "BM-17-00",
  "BM-18-00",
  "BM-19-00",
  "BM-20-00",
  "BM-21-00",
  "BM-22-00",
  "BM-23-00",
  "BM-01-00",
  "BM-02-00",
  "BM-03-00",
];

const generateAllData = () => {
  const allData = [];

  for (let i = 0; i < 250; i++) {
    const studentName = studentNames[i % studentNames.length];
    const stage = Math.max(1, 6 - Math.floor(i / 50));

    const item = {
      userDetails: {
        studentName: studentName,
        animalName: studentName,
        evolutionStage: "Majestatyczna Bestia",
        imageUrl: `/images/evolution-stages/${stage}.jpg`,
        position: i,
        group: groups[i % groups.length],
      },
      xpDetails: {} as Record<string, number>,
    };
    item.xpDetails["Git"] = roundToTwo(2.0 + Math.random());
    item.xpDetails["Laboratorium"] = roundToTwo(40.0 + Math.random() * 20);
    item.xpDetails["Kartkówka"] = roundToTwo(30.0 + Math.random() * 15);
    item.xpDetails["Specjalne"] = roundToTwo(10.0 + Math.random() * 15);
    item.xpDetails["Projekt"] = roundToTwo(20.0 + Math.random() * 10);
    item.xpDetails["Bonusy"] = roundToTwo(15.2 + Math.random() * 5);

    const totalSum =
      item.xpDetails["Laboratorium"] +
      item.xpDetails["Kartkówka"] +
      item.xpDetails["Git"] +
      item.xpDetails["Specjalne"] +
      item.xpDetails["Projekt"] +
      item.xpDetails["Bonusy"];

    item.xpDetails["total"] = roundToTwo(totalSum);

    allData.push(item);
  }

  allData.sort((a, b) => b.xpDetails["total"] - a.xpDetails["total"]);

  allData.forEach((item, index) => {
    item.userDetails.position = index + 1;
  });

  return allData;
};

const ALL_DATA = generateAllData();

const HallOfFameService = {
  getHallOfFame: async (
    page: number,
    size: number,
    searchTerm: string,
    sortBy?: string,
    sortOrder?: "asc" | "desc",
    groups?: string[]
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    let filteredData = [...ALL_DATA];

    if (groups && !groups?.includes("all")) {
      filteredData = filteredData.filter((item) =>
        groups.includes(item.userDetails.group.toLowerCase())
      );
    }

    if (searchTerm && searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.userDetails.studentName.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortBy && sortOrder) {
      filteredData.sort((a, b) => {
        let valueA: any;
        let valueB: any;

        if (sortBy === "name") {
          valueA = a.userDetails.studentName;
          valueB = b.userDetails.studentName;
          const comparison = valueA.localeCompare(valueB);
          return sortOrder === "asc" ? comparison : -comparison;
        } else {
          valueA = a.xpDetails[sortBy] || 0;
          valueB = b.xpDetails[sortBy] || 0;

          const comparison = valueA - valueB;
          return sortOrder === "asc" ? comparison : -comparison;
        }
      });
    }

    const start = page * size;
    const end = Math.min(start + size, filteredData.length);
    const pageContent = filteredData.slice(start, end);

    const totalPages = Math.ceil(filteredData.length / size);

    return {
      content: pageContent,
      page: {
        pageNumber: page,
        pageSize: size,
        offset: start,
        totalPages: totalPages,
      },
      totalElements: filteredData.length,
      first: page === 0,
      last: page >= totalPages - 1,
      size: size,
      number: page,
      numberOfElements: pageContent.length,
      empty: pageContent.length === 0,
    };
  },
  getPodium: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...ALL_DATA.slice(0, 3)];
  },
};

export default HallOfFameService;
