const UserService = {
  getCurrentUser: async () => {
    return {
      userId: 1,
      userName: "Kamil Rudny",
      animalName: "Gerard Pocieszny",
      evolutionStage: "Majestatyczna bestia",
      currentXP: 67,
      profileImage: "/images/evolution-stages/4.jpg",
      role: "Student",
    };
  },
  getRandomUsers: async () => {
    return [
      {
        userId: 1,
        userName: "Kamil Rudny",
        animalName: "Gerard Pocieszny",
        evolutionStage: "Majestatyczna bestia",
        currentXP: 67,
        group: "BM-20-00",
        profileImage: "images/evolution-stages/4.jpg",
        role: "Student",
      },
      {
        userId: 2,
        userName: "Kamil Śmieszny",
        animalName: "Gerard Wesoły",
        evolutionStage: "Majestatyczna bestia",
        group: "BM-20-00",
        currentXP: 67,
        profileImage: "images/evolution-stages/5.jpg",
        role: "Student",
      },
    ];
  },
};

export default UserService;
