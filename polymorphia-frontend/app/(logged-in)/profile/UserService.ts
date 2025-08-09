import { Role, Roles, UserDetailsDTO } from "@/interfaces/api/DTO";

const UserService = {
  getCurrentUser: async (): Promise<UserDetailsDTO> => {
    return {
      studentName: "Kamil Rudny",
      animalName: "Gerard Pocieszny",
      evolutionStage: "Majestatyczna bestia",
      imageUrl: "images/evolution-stages/4.jpg",
      group: "BM-10-00",
      position: 25,
    };
  },
  getRandomUsers: async (): Promise<UserDetailsDTO[]> => {
    return [
      {
        studentName: "Kamil Rudny",
        animalName: "Gerard Pocieszny",
        evolutionStage: "Majestatyczna bestia",
        group: "BM-20-00",
        imageUrl: "images/evolution-stages/4.jpg",
        position: 1,
      },
      {
        studentName: "Kamil Śmieszny",
        animalName: "Gerard Wesoły",
        evolutionStage: "Majestatyczna bestia",
        group: "BM-20-00",
        imageUrl: "images/evolution-stages/5.jpg",
        position: 2,
      },
    ];
  },
  getRole: async (): Promise<{ role: Role }> => {
    return { role: Roles.INSTRUCTOR };
    // return { role: Roles.STUDENT };
  },
};

export default UserService;
