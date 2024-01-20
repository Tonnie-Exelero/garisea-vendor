// ** React Imports
import { ChangeEvent } from "react";

// ** Vercel Imports
import type { PutBlobResult } from "@vercel/blob";

// ** Watermark
import { addWatermark } from "@src/configs/watermark";
import { generateRandomString } from "./random-string";
import { baseUrl } from "@src/configs/baseUrl";

// ** Image Compression
import imageCompression from "browser-image-compression";

const compressionOptions = {
  maxSizeMB: 2,
  useWebWorker: true,
};

const randomString = generateRandomString(12);
const time = Date.now();
const fileName = `${randomString}${time}`;

const compressFile = async (imageFile: File) =>
  await imageCompression(imageFile, compressionOptions);

export const uploadDocumentFile = async (file: ChangeEvent) => {
  const { files } = file.target as HTMLInputElement;

  if (files && files.length > 0) {
    try {
      const response = await fetch(
        `/api/files/upload?filename=${files[0].name}`,
        {
          method: "POST",
          body: files[0],
        }
      );

      const newBlob = (await response.json()) as PutBlobResult;

      return newBlob;
    } catch (error) {
      console.log(error);
    }
  }
};

export const uploadFile = async (file: ChangeEvent) => {
  const { files } = file.target as HTMLInputElement;

  if (files && files.length > 0) {
    try {
      const compressedFile = new File(
        [await compressFile(files[0])],
        `${fileName}.webp`,
        { type: "image/webp" }
      );

      const response =
        compressedFile &&
        (await fetch(`/api/files/upload?filename=${compressedFile.name}`, {
          method: "POST",
          body: compressedFile,
        }));

      const newBlob = (await response.json()) as PutBlobResult;

      return newBlob;
    } catch (error) {
      console.log(error);
    }
  }
};

export const uploadFileOfFiles = async (
  file: File,
  type: string,
  vendorInfo: string
) => {
  let canvas: any = null;

  if (typeof window !== "undefined") {
    canvas = document.createElement("canvas");
  }

  const gariseaLogoUrl = `${baseUrl}/images/watermark/watermark7.webp`;

  const imageWatermark = async (img: any) =>
    await addWatermark(
      canvas,
      img,
      type,
      [vendorInfo, gariseaLogoUrl],
      ["bottom-left", "center"],
      0.4
    );

  const reader = new FileReader();
  reader.readAsDataURL(file);
  const newImage: File = await new Promise(
    (resolve) =>
      (reader.onload = async () => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        const result: File = await new Promise(
          (resolve) =>
            (img.onload = async () => {
              const newCanvas = await imageWatermark(img);

              const blob: File = await new Promise((resolve) =>
                newCanvas.toBlob((blob: any) =>
                  resolve(
                    new File([blob], `${fileName}.webp`, { type: "image/webp" })
                  )
                )
              );

              resolve(blob);
            })
        );

        resolve(result);
      })
  );

  try {
    const compressedImage = new File(
      [await compressFile(newImage)],
      `${fileName}.webp`,
      { type: "image/webp" }
    );

    const response =
      compressedImage &&
      (await fetch(`/api/files/upload?filename=${compressedImage.name}`, {
        method: "POST",
        body: compressedImage,
      }));

    const newBlob = (await response.json()) as PutBlobResult;

    return newBlob;
  } catch (error) {
    console.log(error);
  }
};

export const removeFile = async (url: string) => {
  const response = await fetch(`/api/files/remove?url=${url}`, {
    method: "DELETE",
  });

  const removedBlob = await response.json();

  return removedBlob;
};
