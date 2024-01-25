import { ChangeEvent } from "react";

export const fileInputToBlob = (file: ChangeEvent) => {
  const { files } = file.target as HTMLInputElement;

  if (files && files.length > 0) {
    return files[0];
  }

  return null;
};
