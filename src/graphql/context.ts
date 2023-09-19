import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { decodeAuthHeader } from "./utils/auth";
import prisma from "@lib/prisma";

// TODO: Get userID from request params and use it here, and in graphql/types/[TYPE]
export interface Context {
  prisma: PrismaClient;
  userId?: string;
}

export const createContext = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    userId: token?.userId,
  };
};
