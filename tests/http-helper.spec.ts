import { ok, noContent, created, notFound } from "../src/utils/http-helper";

describe("http-helper", () => {
  describe("ok", () => {
    it("should return statusCode 200 with the provided data", async () => {
      const data = { name: "Messi" };
      const response = await ok(data);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(data);
    });
  });

  describe("noContent", () => {
    it("should return statusCode 204 with null body", async () => {
      const response = await noContent();

      expect(response.statusCode).toBe(204);
      expect(response.body).toBeNull();
    });
  });

  describe("created", () => {
    it("should return statusCode 201 with the provided data", async () => {
      const data = { id: 1, name: "Haaland" };
      const response = await created(data);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(data);
    });
  });

  describe("notFound", () => {
    it("should return statusCode 404 with a message", async () => {
      const response = await notFound("Player not found");

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: "Player not found" });
    });
  });
});
