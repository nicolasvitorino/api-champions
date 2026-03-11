import { PlayerModel } from "../models/player-model";

const dataBase: PlayerModel[] = [
  {
    id: 1,
    name: "Neymar",
    club: "Paris Saint-Germain",
    nationality: "Brazil",
    position: "Forward",
    statistics: {
      Overall: 92,
      Pace: 89,
      Shooting: 92,
      Passing: 88,
      Dribbling: 94,
      Defending: 38,
      Physicality: 67,
    },
  },
  {
    id: 2,
    name: "Messi",
    club: "FC Barcelona",
    nationality: "Argentina",
    position: "Forward",
    statistics: {
      Overall: 90,
      Pace: 88,
      Shooting: 91,
      Passing: 90,
      Dribbling: 95,
      Defending: 35,
      Physicality: 65,
    },
  },
  {
    id: 3,
    name: "Cristiano Ronaldo",
    club: "Juventus",
    nationality: "Portugal",
    position: "Forward",
    statistics: {
      Overall: 89,
      Pace: 87,
      Shooting: 92,
      Passing: 86,
      Dribbling: 91,
      Defending: 40,
      Physicality: 70,
    },
  },
  {
    id: 4,
    name: "Kylian Mbappé",
    club: "Paris Saint-Germain",
    nationality: "France",
    position: "Forward",
    statistics: {
      Overall: 91,
      Pace: 96,
      Shooting: 88,
      Passing: 84,
      Dribbling: 90,
      Defending: 38,
      Physicality: 78,
    },
  },
  {
    id: 5,
    name: "Kevin De Bruyne",
    club: "Manchester City",
    nationality: "Belgium",
    position: "Midfielder",
    statistics: {
      Overall: 89,
      Pace: 85,
      Shooting: 87,
      Passing: 92,
      Dribbling: 88,
      Defending: 70,
      Physicality: 75,
    },
  },
  {
    id: 6,
    name: "Virgil van Dijk",
    club: "Liverpool",
    nationality: "Netherlands",
    position: "Defender",
    statistics: {
      Overall: 88,
      Pace: 75,
      Shooting: 65,
      Passing: 78,
      Dribbling: 70,
      Defending: 90,
      Physicality: 85,
    },
  },
  {
    id: 7,
    name: "Sergio Ramos",
    club: "Real Madrid",
    nationality: "Spain",
    position: "Defender",
    statistics: {
      Overall: 87,
      Pace: 70,
      Shooting: 60,
      Passing: 75,
      Dribbling: 65,
      Defending: 92,
      Physicality: 80,
    },
  },
  {
    id: 8,
    name: "Luka Modrić",
    club: "Real Madrid",
    nationality: "Croatia",
    position: "Midfielder",
    statistics: {
      Overall: 88,
      Pace: 80,
      Shooting: 82,
      Passing: 91,
      Dribbling: 89,
      Defending: 65,
      Physicality: 70,
    },
  },
  {
    id: 9,
    name: "Robert Lewandowski",
    club: "Bayern Munich",
    nationality: "Poland",
    position: "Forward",
    statistics: {
      Overall: 89,
      Pace: 85,
      Shooting: 92,
      Passing: 86,
      Dribbling: 88,
      Defending: 40,
      Physicality: 75,
    },
  },
  {
    id: 10,
    name: "Manuel Neuer",
    club: "Bayern Munich",
    nationality: "Germany",
    position: "Goalkeeper",
    statistics: {
      Overall: 88,
      Pace: 70,
      Shooting: 50,
      Passing: 75,
      Dribbling: 65,
      Defending: 80,
      Physicality: 75,
    },
  },
];

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
  return dataBase;
};

export const findAllClubs = async (): Promise<string[]> => {
  return [...new Set(dataBase.map((player) => player.club))];
};

export const findPlayerById = async (
  id: number,
): Promise<PlayerModel | null> => {
  const player = dataBase.find((player) => player.id === id);
  return player || null;
};

export const createPlayer = async (player: PlayerModel): Promise<void> => {
  dataBase.push(player);
};

export const updatePlayer = async (
  id: number,
  updatedPlayer: Partial<PlayerModel>,
): Promise<PlayerModel | null> => {
  const index = dataBase.findIndex((player) => player.id === id);
  if (index === -1) return null;
  dataBase[index] = { ...dataBase[index], ...updatedPlayer };
  return dataBase[index];
};

export const deletePlayer = async (id: number): Promise<boolean> => {
  const index = dataBase.findIndex((player) => player.id === id);
  if (index === -1) return false;
  dataBase.splice(index, 1);
  return true;
};
