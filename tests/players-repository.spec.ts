import {
  findAllPlayers,
  findAllClubs,
  findPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "../src/repositories/players-repository";
import { PlayerModel } from "../src/models/player-model";

const newPlayer: PlayerModel = {
  id: 9999,
  name: "Test Player",
  club: "Test FC",
  nationality: "Brazil",
  position: "Midfielder",
  statistics: {
    Overall: 80,
    Pace: 75,
    Shooting: 70,
    Passing: 85,
    Dribbling: 82,
    Defending: 60,
    Physicality: 72,
  },
};

describe("players-repository", () => {
  describe("findAllPlayers", () => {
    it("should return an array of players", async () => {
      const players = await findAllPlayers();

      expect(Array.isArray(players)).toBe(true);
      expect(players.length).toBeGreaterThan(0);
    });
  });

  describe("findAllClubs", () => {
    it("should return a unique list of clubs", async () => {
      const clubs = await findAllClubs();

      expect(Array.isArray(clubs)).toBe(true);
      expect(clubs.length).toBeGreaterThan(0);
      expect(clubs).toContain("Paris Saint-Germain");
      expect(
        clubs.filter((club) => club === "Paris Saint-Germain"),
      ).toHaveLength(1);
    });
  });

  describe("findPlayerById", () => {
    it("should return the player with the given id", async () => {
      const player = await findPlayerById(1);

      expect(player).not.toBeNull();
      expect(player?.id).toBe(1);
    });

    it("should return null when player does not exist", async () => {
      const player = await findPlayerById(99999);

      expect(player).toBeNull();
    });
  });

  describe("createPlayer", () => {
    it("should add the player to the database", async () => {
      await createPlayer(newPlayer);

      const player = await findPlayerById(9999);

      expect(player).not.toBeNull();
      expect(player?.name).toBe("Test Player");
    });
  });

  describe("updatePlayer", () => {
    it("should update and return the modified player", async () => {
      const updated = await updatePlayer(9999, { club: "Updated FC" });

      expect(updated).not.toBeNull();
      expect(updated?.club).toBe("Updated FC");
    });

    it("should return null when player does not exist", async () => {
      const result = await updatePlayer(88888, { club: "Ghost FC" });

      expect(result).toBeNull();
    });
  });

  describe("deletePlayer", () => {
    it("should remove the player and return true", async () => {
      const result = await deletePlayer(9999);

      expect(result).toBe(true);

      const player = await findPlayerById(9999);
      expect(player).toBeNull();
    });

    it("should return false when player does not exist", async () => {
      const result = await deletePlayer(99999);

      expect(result).toBe(false);
    });
  });
});
