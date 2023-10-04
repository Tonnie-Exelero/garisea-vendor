import * as jwt from "jsonwebtoken";
import { decodeToken } from "@src/configs/jwt";
import { decryptData } from "@core/utils/encryption";

export const APP_SECRET = "3xp3rt-@dm1n-1s-aw3s0m3";

export interface AuthTokenPayload {
  user: any;
  isValid: boolean;
  errMessage: string;
}

export function decodeAuthHeader(
  authCookie: string
): Partial<AuthTokenPayload> {
  const decryptedToken = decryptData(authCookie);

  let user: any = {};
  let invalidToken: boolean = false;
  let errMessage: string = "";

  if (!decryptedToken) {
    throw new Error("No token found");
  }

  jwt.verify(decryptedToken, APP_SECRET as string, async (err: any) => {
    // ** If token is expired or invalid, return error message
    if (err) {
      invalidToken = true;
      errMessage = "Session invalid. Please log in to continue.";
    }
    if (!err) {
      const payload: any = await decodeToken(decryptedToken);

      user = payload;
    }
  });

  if (invalidToken)
    return {
      errMessage,
      isValid: false,
    };

  return {
    user,
    isValid: true,
  };
}
