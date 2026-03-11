import { Request, Response } from "express";
import * as PlayerService from "../services/players-service";

export const getPlayer = async (req: Request, res: Response) => {
  const httpResponse = await PlayerService.getPlayerService();
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getAllClubs = async (_req: Request, res: Response) => {
  const httpResponse = await PlayerService.getAllClubsService();
  return res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getPlayerById = async (req: Request, res: Response) => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = Number.parseInt(rawId, 10);

  const httpResponse = await PlayerService.getPlayerByIdService(id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid player ID" });
  }

  return res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const createPlayer = async (req: Request, res: Response) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json({ error: "Player name is required" });
  }
  const httpResponse = await PlayerService.createPlayerService(req.body);
  return res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const updatePlayer = async (req: Request, res: Response) => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = Number.parseInt(rawId, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid player ID" });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is required" });
  }

  const httpResponse = await PlayerService.updatePlayerService(id, req.body);
  return res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const deletePlayer = async (req: Request, res: Response) => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = Number.parseInt(rawId, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid player ID" });
  }

  const httpResponse = await PlayerService.deletePlayerService(id);
  return res.status(httpResponse.statusCode).json(httpResponse.body);
};
