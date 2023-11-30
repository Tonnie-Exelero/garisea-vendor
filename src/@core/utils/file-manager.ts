// ** React Imports
import { ChangeEvent } from "react";
import toast from "react-hot-toast";

// ** Vercel Imports
import type { PutBlobResult } from "@vercel/blob";

// ** Watermark
import { getCoordinates } from "@src/configs/watermark";
import { generateRandomString } from "./random-string";

const addWatermark = async (
  canvas: any,
  baseImage: any,
  watermarkImage: any,
  position: any,
  alpha: any
) => {
  const ctx = canvas.getContext("2d");
  canvas.width = baseImage.width;
  canvas.height = baseImage.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height);
  ctx.globalAlpha = alpha;
  const watermarkImageSizeValue: number = Number(Number(baseImage.width) / 6);

  position.forEach((pos: any) => {
    const [x, y] = getCoordinates(
      pos,
      Number(watermarkImageSizeValue.toFixed()),
      Number(watermarkImageSizeValue.toFixed()),
      baseImage.width,
      baseImage.height
    );
    ctx.drawImage(
      watermarkImage,
      x,
      y,
      Number(watermarkImageSizeValue.toFixed()),
      Number(watermarkImageSizeValue.toFixed())
    );
  });

  const randomString = generateRandomString(12);
  const time = Date.now();
  const fileName = `${randomString}${time}`;

  await canvas.toBlob(async (blob: any) => {
    let file = new File([blob], `${fileName}.png`, { type: "image/png" });

    const response = await fetch(`/api/files/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    return newBlob;
  }, "image/png");
};

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
  let canvas: any = null;

  if (typeof window !== "undefined") {
    canvas = document.createElement("canvas");
  }

  const imageWatermark = async (img: any) =>
    await addWatermark(canvas, img, img, ["bottom-left", "bottom-right"], 0.6);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      return await imageWatermark(img);
    };
  };
};

export const removeFile = async (url: string) => {
  const response = await fetch(`/api/files/remove?url=${url}`, {
    method: "DELETE",
  });

  const removedBlob = await response.json();

  return removedBlob;
};
