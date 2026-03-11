import * as HttpResponse from "../utils/http-helper";
import * as PlayersRepository from "../repositories/players-repository";
import { PlayerModel } from "../models/player-model";

export const getPlayerService = async () => {
  const data = { player: "ronaldo" }; // Simulating a data retrieval that may fail
  let response;

  if (data) {
    try {
      response = await HttpResponse.ok(data);
    } catch (error) {
      response = await HttpResponse.noContent();
    }
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};

export const getAllClubsService = async () => {
  const clubs = await PlayersRepository.findAllClubs();

  if (clubs.length > 0) {
    return HttpResponse.ok(clubs);
  }

  return HttpResponse.noContent();
};

export const getPlayerByIdService = async (id: number) => {
  const player = await PlayersRepository.findPlayerById(id);
  let response;
  response = player
    ? await HttpResponse.ok(player)
    : await HttpResponse.noContent();
  return response;
};

export const createPlayerService = async (
  playerData: Omit<PlayerModel, "id">,
) => {
  const newPlayer: PlayerModel = {
    id: Date.now(),
    ...playerData,
  };
  await PlayersRepository.createPlayer(newPlayer);
  return HttpResponse.created(newPlayer);
};

export const updatePlayerService = async (
  id: number,
  playerData: Partial<Omit<PlayerModel, "id">>,
) => {
  const updated = await PlayersRepository.updatePlayer(id, playerData);
  if (!updated) return HttpResponse.notFound("Player not found");
  return HttpResponse.ok(updated);
};

export const deletePlayerService = async (id: number) => {
  const deleted = await PlayersRepository.deletePlayer(id);
  if (!deleted) return HttpResponse.notFound("Player not found");
  return HttpResponse.ok({ message: "Player deleted successfully" });
};
