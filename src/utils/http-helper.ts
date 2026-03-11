import { HttpResponseModel } from "../models/http-response-model";

export const ok = async (data: any): Promise<HttpResponseModel> => ({
  statusCode: 200,
  body: data,
});

export const noContent = async (): Promise<HttpResponseModel> => ({
  statusCode: 204,
  body: null,
});

export const created = async (data: any): Promise<HttpResponseModel> => ({
  statusCode: 201,
  body: data,
});

export const notFound = async (message: string): Promise<HttpResponseModel> => ({
  statusCode: 404,
  body: { message },
});
