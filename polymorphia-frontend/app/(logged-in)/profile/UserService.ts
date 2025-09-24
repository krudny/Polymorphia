import {InviteStudentRequestDTO, RegisterRequestDTO, UserDetailsDTO} from "@/interfaces/api/user";

import {Role, Roles} from "@/interfaces/general";
import {API_HOST} from "@/services/api";

const UserService = {
  getCurrentUser: async (): Promise<UserDetailsDTO> => {
    return {
      id: 1,
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
        id: 1,
        studentName: "Kamil Rudny",
        animalName: "Gerard Pocieszny",
        evolutionStage: "Majestatyczna bestia",
        group: "BM-20-00",
        imageUrl: "images/evolution-stages/4.jpg",
        position: 1,
      },
      {
        id: 2,
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

  register: async (request: RegisterRequestDTO): Promise<void> => {
    const response = await fetch(`${API_HOST}/user/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się utworzyć konta!");
    }
  },

  inviteStudent: async (request: InviteStudentRequestDTO): Promise<void> => {
    const response = await fetch(`${API_HOST}/user/invite`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się zaprosić studenta!");
    }
  }
};

export default UserService;
