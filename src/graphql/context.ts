import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import type { NextApiRequest } from "next/types";
import { RedirectType } from "next/dist/client/components/redirect";
import { decodeAuthHeader } from "./utils/auth";
import prisma from "@lib/prisma";

export interface Context {
  prisma: PrismaClient;
  user?: any;
  isValid?: boolean;
  errMessage?: string;
  request?: any;
}

export const createContext = ({
  req,
}: {
  req: NextApiRequest | any;
}): Context => {
  // Paths to exclude
  const pathsToExclude = [
    "/login/",
    "/register/",
    "/verify-email/",
    "/forgot-password/",
    "/reset-password/",
  ];

  // ** Hooks
  const cookieStore: any = cookies();
  const authCookie = cookieStore.get("auth");
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const [, pathname] =
    fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [];

  // Get path to exclude from the pathname
  const subPath: any =
    pathname && pathsToExclude.find((a) => pathname.includes(a));

  // Decode auth token
  const token = authCookie ? decodeAuthHeader(authCookie?.value) : null;

  // If correct pathname, and token invalid, redirect back to login
  if (pathname && !pathsToExclude.includes(subPath)) {
    if (token?.isValid === false) {
      console.log(token?.errMessage);

      // TODO: recheck if this works
      redirect("/login", RedirectType.push);
    }
  }

  return {
    prisma,
    user: token?.user,
    isValid: token?.isValid,
    errMessage: token?.errMessage,
  };
};
