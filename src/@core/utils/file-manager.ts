// ** React Imports
import { ChangeEvent } from "react";
import toast from "react-hot-toast";

// ** Vercel Imports
import type { PutBlobResult } from "@vercel/blob";

export const uploadFile = async (
  file: ChangeEvent,
  requiredWidth?: number,
  requiredHeight?: number
) => {
  const { files } = file.target as HTMLInputElement;

  if (files && files.length !== 0) {
    if (requiredWidth && requiredHeight) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = function (e) {
        //Initiate the JavaScript Image object.
        let image: any = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target?.result;

        //Validate the File Height and Width.
        image.onload = async function () {
          const width = this.width;
          const height = this.height;

          if (width < requiredWidth || height < requiredHeight) {
            toast.error(
              `Required image dimensions are ${requiredWidth} x ${requiredHeight}. Please upload image with required dimensions.`,
              {
                duration: 7000,
              }
            );
            return false;
          } else {
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
      };
    } else {
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
