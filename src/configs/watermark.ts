import { generateRandomString } from "@core/utils/random-string";

export const getAspectRatio = (width: number, height: number) => {
  return width / height;
};

export const getWidthFromRatio = (height: number, aspectRatio: number) => {
  return height * aspectRatio;
};

export const getHeightFromRatio = (width: number, aspectRatio: number) => {
  return width / aspectRatio;
};

export const getImage = (e: any, callback: any) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    const image = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      const img = new Image();
      // @ts-ignore
      img.src = e.target.result;
      img.onload = () => {
        callback(img);
      };
    };
  }
};

export const changeImageWidth = (
  image: any,
  width: number,
  aspectRatio: number,
  maintainAspectRatio: boolean
) => {
  if (maintainAspectRatio) {
    const newHeight = getHeightFromRatio(width, aspectRatio);
    image.width = width;
    image.height = newHeight;
  } else {
    image.width = width;
  }
};

export const changeImageHeight = (
  image: any,
  height: number,
  aspectRatio: number,
  maintainAspectRatio: boolean
) => {
  if (maintainAspectRatio) {
    const newWidth = getWidthFromRatio(height, aspectRatio);
    image.width = newWidth;
    image.height = height;
  } else {
    image.height = height;
  }
};

export const isChecked = (checkbox: any) => {
  return checkbox.checked === true;
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

export const updateImageSizeValueDOM = (
  image: any,
  widthInput: any,
  heightInput: any
) => {
  widthInput.value = image.width;
  heightInput.value = image.height;
};

export const watermark = async (
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

  //   await canvas.toBlob(resolve, "image/png", 1);
  await canvas.toBlob((blob: any) => {
    let file = new File([blob], `${fileName}.png`, { type: "image/png" });

    console.log(file);

    return file;
  }, "image/png");
};

export const saveImage = (canvas: any) => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "download.png";
  link.href = image;
  link.click();
};

// const canvas = document.querySelector("canvas");
// const baseImageInput = document.getElementById("baseImageInput");
// const watermarkImageInput = document.getElementById("watermarkImageInput");
// const baseImageWidthInput = document.getElementById("baseImageWidth");
// const baseImageHeightInput = document.getElementById("baseImageHeight");
// const baseImageAspectChecked = document.getElementById("baseImageRatioChecked");
// const watermarkImageWidthInput = document.getElementById("watermarkImageWidth");
// const watermarkImageHeightInput = document.getElementById(
//   "watermarkImageHeight"
// );
// const watermarkImageAspectChecked = document.getElementById(
//   "watermarkImageRatioChecked"
// );
// const positionInput = document.getElementById("watermarkImagePositionInput");
// const alphaInput = document.getElementById("watermarkImageAlpha");
// const watermarkButton = document.getElementById("watermarkButton");
// const inputForm = document.getElementById("inputForm");
// const saveButton = document.getElementById("saveButton");
// let baseImage: any;
// let watermarkImage: any;
// let baseImageAspectRatio: any;
// let watermarkImageAspectRatio: any;

// inputForm.addEventListener("input", () => {
//   if (!baseImage || !watermarkImage) {
//     watermarkButton.disabled = true;
//   } else {
//     watermarkButton.disabled = false;
//   }
// });
// baseImageInput.addEventListener("input", (e) => {
//   getImage(e, (img) => {
//     baseImage = img;
//     baseImageAspectRatio = getAspectRatio(img.width, img.height);
//     updateImageSizeValueDOM(img, baseImageWidthInput, baseImageHeightInput);
//   });
// });
// watermarkImageInput.addEventListener("input", (e) => {
//   getImage(e, (img) => {
//     watermarkImage = img;
//     watermarkImageAspectRatio = getAspectRatio(img.width, img.height);
//     updateImageSizeValueDOM(
//       img,
//       watermarkImageWidthInput,
//       watermarkImageHeightInput
//     );
//   });
// });
// baseImageWidthInput.addEventListener("input", (e) => {
//   const value = parseInt(e.target.value);
//   changeImageWidth(
//     baseImage,
//     value,
//     baseImageAspectRatio,
//     isChecked(baseImageAspectChecked)
//   );
//   updateImageSizeValueDOM(baseImage, baseImageWidthInput, baseImageHeightInput);
// });
// baseImageHeightInput.addEventListener("input", (e) => {
//   const value = parseInt(e.target.value);
//   changeImageHeight(
//     baseImage,
//     value,
//     baseImageAspectRatio,
//     isChecked(baseImageAspectChecked)
//   );
//   updateImageSizeValueDOM(baseImage, baseImageWidthInput, baseImageHeightInput);
// });

// watermarkImageWidthInput.addEventListener("input", (e) => {
//   const value = parseInt(e.target.value);
//   changeImageWidth(
//     watermarkImage,
//     value,
//     watermarkImageAspectRatio,
//     isChecked(watermarkImageAspectChecked)
//   );
//   updateImageSizeValueDOM(
//     watermarkImage,
//     watermarkImageWidthInput,
//     watermarkImageHeightInput
//   );
// });
// watermarkImageHeightInput.addEventListener("input", (e) => {
//   const value = parseInt(e.target.value);
//   changeImageHeight(
//     watermarkImage,
//     value,
//     watermarkImageAspectRatio,
//     isChecked(watermarkImageAspectChecked)
//   );
//   updateImageSizeValueDOM(
//     watermarkImage,
//     watermarkImageWidthInput,
//     watermarkImageHeightInput
//   );
// });
// watermarkButton.addEventListener("click", () => {
//   const alpha = parseInt("70") / 100;
//   watermark(canvas, baseImage, watermarkImage, "bottom-left", alpha);
//   saveButton.disabled = false;
// });
// saveButton.addEventListener("click", () => {
//   saveImage(canvas);
// });
