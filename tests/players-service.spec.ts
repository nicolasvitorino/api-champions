import * as PlayersRepository from "../src/repositories/players-repository";
import {
  getAllClubsService,
  getPlayerByIdService,
  createPlayerService,
  updatePlayerService,
  deletePlayerService,
} from "../src/services/players-service";
import { PlayerModel } from "../src/models/player-model";

jest.mock("../src/repositories/players-repository");

const mockPlayer: PlayerModel = {
  id: 1,
  name: "Cristiano Ronaldo",
  club: "Al-Nassr",
  nationality: "Portugal",
  position: "Forward",
  statistics: {
    Overall: 90,
    Pace: 85,
    Shooting: 93,
    Passing: 82,
    Dribbling: 88,
    Defending: 35,
    Physicality: 78,
  },
};

describe("players-service", () => {
  describe("getAllClubsService", () => {
    it("should return 200 with unique clubs", async () => {
      const clubs = ["Paris Saint-Germain", "FC Barcelona", "Juventus"];
      jest.spyOn(PlayersRepository, "findAllClubs").mockResolvedValue(clubs);

      const response = await getAllClubsService();

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(clubs);
    });

    it("should return 204 when there are no clubs", async () => {
      jest.spyOn(PlayersRepository, "findAllClubs").mockResolvedValue([]);

      const response = await getAllClubsService();

      expect(response.statusCode).toBe(204);
      expect(response.body).toBeNull();
    });
  });

  describe("getPlayerByIdService", () => {
    it("should return 200 with player when found", async () => {
      jest
        .spyOn(PlayersRepository, "findPlayerById")
        .mockResolvedValue(mockPlayer);

      const response = await getPlayerByIdService(1);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockPlayer);
    });

    it("should return 204 when player is not found", async () => {
      jest.spyOn(PlayersRepository, "findPlayerById").mockResolvedValue(null);

      const response = await getPlayerByIdService(999);

      expect(response.statusCode).toBe(204);
      expect(response.body).toBeNull();
    });
  });

  describe("createPlayerService", () => {
    it("should create a player and return 201 with the new player", async () => {
      jest.spyOn(PlayersRepository, "createPlayer").mockResolvedValue();

      const { id, ...playerData } = mockPlayer;
      const response = await createPlayerService(playerData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject(playerData);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("updatePlayerService", () => {
    it("should return 200 with updated player when found", async () => {
      const updated = { ...mockPlayer, club: "Manchester United" };
      jest.spyOn(PlayersRepository, "updatePlayer").mockResolvedValue(updated);

      const response = await updatePlayerService(1, {
        club: "Manchester United",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updated);
    });

    it("should return 404 when player to update is not found", async () => {
      jest.spyOn(PlayersRepository, "updatePlayer").mockResolvedValue(null);

      const response = await updatePlayerService(999, { club: "Real Madrid" });

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: "Player not found" });
    });
  });

  describe("deletePlayerService", () => {
    it("should return 200 when player is deleted", async () => {
      jest.spyOn(PlayersRepository, "deletePlayer").mockResolvedValue(true);

      const response = await deletePlayerService(1);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Player deleted successfully" });
    });

    it("should return 404 when player to delete is not found", async () => {
      jest.spyOn(PlayersRepository, "deletePlayer").mockResolvedValue(false);

      const response = await deletePlayerService(999);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: "Player not found" });
    });
  });
});
