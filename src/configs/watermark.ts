import { generateRandomString } from "@core/utils/random-string";
import { generateImage } from "./textToImage";

const getAspectRatio = (width: number, height: number) => {
  return width / height;
};

const textWatermark = async (name: string) => {
  //   let canvas: any = null;

  //   if (typeof window !== "undefined") {
  //     canvas = document.createElement("canvas");
  //   }

  //   const context = canvas.getContext("2d");

  //   var img = new Image();
  //   const result = await new Promise(
  //     (resolve) =>
  //       (img.onload = async () => {
  //         context.drawImage(img, 10, 10);
  //         context.fillStyle = "blue";
  //         context.font = "bold 16px Arial";
  //         context.textAlign = "center";
  //         context.textBaseline = "middle";
  //         context.textShadow =
  //           "3px 3px 0 #000, -3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000;";
  //         context.fillText(name, canvas.width / 2, canvas.height / 2);

  //         resolve(context);
  //       })
  //   );

  //   return result;
  const imageCanvas = await generateImage(name);
  const randomString = generateRandomString(20);

  const blob: File = await new Promise((resolve) =>
    imageCanvas.toBlob((blob: any) =>
      resolve(new File([blob], `${randomString}.webp`, { type: "image/webp" }))
    )
  );

  const img = new Image();
  img.src = URL.createObjectURL(blob);
  const result = await new Promise(
    (resolve) => (img.onload = () => resolve(img))
  );

  return result;
};

export const getCoordinates = (
  position: any,
  imageWidth: number,
  imageHeight: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  const xCenter = canvasWidth / 2 - imageWidth / 2;
  const yCenter = canvasHeight / 2 - imageHeight / 2;
  switch (position) {
    case "top-left":
      return [0, 0];
    case "top-center":
      return [xCenter, 0];
    case "top-right":
      return [canvasWidth - imageWidth, 0];
    case "bottom-left":
      return [0, canvasHeight - imageHeight];
    case "bottom-center":
      return [xCenter, canvasHeight - imageHeight];
    case "bottom-right":
      return [canvasWidth - imageWidth, canvasHeight - imageHeight];
    case "center":
      return [xCenter, yCenter];
    default:
      return [0, 0];
  }
};

export const addWatermark = async (
  canvas: any,
  baseImage: any,
  type: string,
  watermarkItems: any[],
  position: any[],
  alpha: any
) => {
  const ctx = canvas.getContext("2d");
  canvas.width = baseImage.width;
  canvas.height = baseImage.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height);
  ctx.globalAlpha = alpha;
  const watermarkImageWidthValue: number = Number(Number(baseImage.width) / 6);
  const gariseawatermarkImageWidthValue: number = Number(
    Number(baseImage.width) / 3.5
  );

  const vendorLogo: any =
    type === "image"
      ? await fetch(watermarkItems[0])
          .then((response) => response.blob())
          .then(async (blob) => {
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            const result = await new Promise(
              (resolve) => (img.onload = () => resolve(img))
            );

            return result;
          })
      : await textWatermark(watermarkItems[0]);

  const gariseaLogo: any = await fetch(watermarkItems[1])
    .then((response) => response.blob())
    .then(async (blob) => {
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      const result = await new Promise(
        (resolve) => (img.onload = () => resolve(img))
      );

      return result;
    });

  const vendorAspectRatio: any = getAspectRatio(
    Number(vendorLogo.width),
    Number(vendorLogo.height)
  );
  const gariseaAspectRatio: any = getAspectRatio(
    Number(gariseaLogo.width),
    Number(gariseaLogo.height)
  );
  const vendorLogoHeight: number = Number(
    Number(watermarkImageWidthValue) / vendorAspectRatio
  );
  const gariseaLogoHeight: number = Number(
    Number(gariseawatermarkImageWidthValue) / gariseaAspectRatio
  );

  position.forEach((pos: any) => {
    const [x, y] = getCoordinates(
      pos,
      Number(
        pos === "bottom-left"
          ? watermarkImageWidthValue.toFixed()
          : gariseawatermarkImageWidthValue.toFixed()
      ),
      Number(
        pos === "bottom-left"
          ? vendorLogoHeight.toFixed()
          : gariseaLogoHeight.toFixed()
      ),
      baseImage.width,
      baseImage.height
    );
    ctx.drawImage(
      pos === "bottom-left" ? vendorLogo : gariseaLogo,
      x,
      y,
      Number(
        pos === "bottom-left"
          ? watermarkImageWidthValue.toFixed()
          : gariseawatermarkImageWidthValue.toFixed()
      ),
      Number(
        pos === "bottom-left"
          ? vendorLogoHeight.toFixed()
          : gariseaLogoHeight.toFixed()
      )
    );
  });

  return await canvas;
};
