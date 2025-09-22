import {InviteStudentRequestDTO, UserDetailsDTO} from "@/interfaces/api/user";

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
  register: async (invitationToken: string, animalName: string, password: string): Promise<void> => {
    const params = {
      invitationToken,
      animalName,
      password,
    }
    console.log(params);
    const response = await fetch(`${API_HOST}/user/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Nie udało się utworzyć konta!");
    }

    // return await response.json();
  },
  inviteStudent: async (request: InviteStudentRequestDTO): Promise<void> => {
    const response = await fetch(`${API_HOST}/user/invite`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...request})
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Nie udało się utworzyć konta!");
    }

    // return await response.json();
  }
};

export default UserService;
