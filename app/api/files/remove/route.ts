import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function DELETE(request: Request | any): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");

  fileUrl && (await del(fileUrl));

  const res = {
    url: fileUrl,
    removed: true,
  };

  return NextResponse.json(res);
}
