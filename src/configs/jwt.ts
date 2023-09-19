import jwt from "jsonwebtoken";

export const createToken = async (payload: any) => {
  const tokenResponse = await fetch(`/api/tokens/jwt`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return await tokenResponse.json();
};

export const decodeToken = async (token: string) => {
  const decoded = await jwt.decode(token, { complete: true });

  return decoded?.payload;
};
