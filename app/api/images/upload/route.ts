import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request | any): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  const blob =
    filename &&
    (await put(filename, request.body, {
      access: "public",
    }));

  return NextResponse.json(blob);
}
