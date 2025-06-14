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
};

export default UserService;
