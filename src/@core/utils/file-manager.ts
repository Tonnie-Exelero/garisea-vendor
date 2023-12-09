// ** React Imports
import { ChangeEvent } from "react";
import toast from "react-hot-toast";

// ** Vercel Imports
import type { PutBlobResult } from "@vercel/blob";

// ** Watermark
import { addWatermark } from "@src/configs/watermark";
import { generateRandomString } from "./random-string";
import { baseUrl } from "@src/configs/baseUrl";

// ** Image Compression
import imageCompression from "browser-image-compression";

const compressionOptions = {
  maxSizeMB: 4,
  useWebWorker: true,
};

const randomString = generateRandomString(12);
const time = Date.now();
const fileName = `${randomString}${time}`;

const compressImage = async (imageFile: File) =>
  await imageCompression(imageFile, compressionOptions);

export const uploadFile = async (
  file: ChangeEvent,
  requiredWidth?: number,
  requiredHeight?: number
) => {
  const { files } = file.target as HTMLInputElement;

  if (files && files.length > 0) {
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
            try {
              const compressedImage = new File(
                [await compressImage(files[0])],
                `${fileName}.png`,
                { type: "image/png" }
              );

              const response =
                compressedImage &&
                (await fetch(
                  `/api/files/upload?filename=${compressedImage.name}`,
                  {
                    method: "POST",
                    body: compressedImage,
                  }
                ));

              const newBlob = (await response.json()) as PutBlobResult;

              return newBlob;
            } catch (error) {
              console.log(error);
            }
          }
        };
      };
    } else {
      try {
        const compressedImage = new File(
          [await compressImage(files[0])],
          `${fileName}.png`,
          { type: "image/png" }
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

  const gariseaLogoUrl = `${baseUrl}/images/watermark/watermark7.png`;

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
                    new File([blob], `${fileName}.png`, { type: "image/png" })
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
      [await compressImage(newImage)],
      `${fileName}.png`,
      { type: "image/png" }
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
