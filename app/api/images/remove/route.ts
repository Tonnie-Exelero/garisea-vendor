import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function DELETE(request: Request | any): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  imageUrl && (await del(imageUrl));

  const res = {
    url: imageUrl,
    removed: true,
  };

  return NextResponse.json(res);
}
