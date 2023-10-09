import type { NextApiRequest, NextApiResponse } from "next/types";
import jwt from "jsonwebtoken";
import { decryptData } from "@core/utils/encryption";

export default async function createToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, secret, expirationTime } = JSON.parse(req.body);

  const decryptedSecret = decryptData(secret);

  const signedToken =
    req.method === "POST" &&
    jwt.sign({ ...data }, decryptedSecret as string, {
      expiresIn: expirationTime,
    });

  return res.json({ token: signedToken });
}
