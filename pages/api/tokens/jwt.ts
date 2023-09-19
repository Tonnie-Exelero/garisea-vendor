import type { NextApiRequest, NextApiResponse } from "next/types";
import jwt from "jsonwebtoken";

export default async function createToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, secret, expirationTime } = JSON.parse(req.body);

  const signedToken =
    req.method === "POST" &&
    jwt.sign({ ...data }, secret as string, {
      expiresIn: expirationTime,
    });

  return res.json({ token: signedToken });
}
