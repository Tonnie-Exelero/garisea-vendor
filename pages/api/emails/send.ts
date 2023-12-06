import type { NextApiRequest, NextApiResponse } from "next/types";
import { sendEmail } from "@lib/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pl } = JSON.parse(req.body);

  req.method === "POST" &&
    (await sendEmail({
      pl,
    }));

  return res.status(200).json({ message: "Email sent successfully" });
}
