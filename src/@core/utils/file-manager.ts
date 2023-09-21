// ** React Imports
import { ChangeEvent } from "react";

// ** Vercel Imports
import type { PutBlobResult } from "@vercel/blob";

export const uploadFile = async (file: ChangeEvent) => {
  const { files } = file.target as HTMLInputElement;
  if (files && files.length !== 0) {
    const response = await fetch(
      `/api/files/upload?filename=${files[0].name}`,
      {
        method: "POST",
        body: files[0],
      }
    );

    const newBlob = (await response.json()) as PutBlobResult;

    return newBlob;
  }
};

export const uploadFileOfFiles = async (file: File) => {
  const response = await fetch(`/api/files/upload?filename=${file.name}`, {
    method: "POST",
    body: file,
  });

  const newBlob = (await response.json()) as PutBlobResult;

  return newBlob;
};

export const removeFile = async (url: string) => {
  const response = await fetch(`/api/files/remove?url=${url}`, {
    method: "DELETE",
  });

  const removedBlob = await response.json();

  return removedBlob;
};
