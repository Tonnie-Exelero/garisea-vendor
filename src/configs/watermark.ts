const getAspectRatio = (width: number, height: number) => {
  return width / height;
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
  const watermarkImageWidthValue: number = Number(Number(baseImage.width) / 6);

  const vendorLogo: any = await fetch(watermarkImage[0])
    .then((response) => response.blob())
    .then(async (blob) => {
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      const result = await new Promise(
        (resolve) => (img.onload = () => resolve(img))
      );

      return result;
    });

  const gariseaLogo: any = await fetch(watermarkImage[1])
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
    Number(watermarkImageWidthValue) / gariseaAspectRatio
  );

  position.forEach((pos: any) => {
    const [x, y] = getCoordinates(
      pos,
      Number(watermarkImageWidthValue.toFixed()),
      Number(
        pos === "bottom-left"
          ? vendorLogoHeight.toFixed()
          : gariseaLogoHeight.toFixed()
      ),
      baseImage.width,
      baseImage.height
    );
    ctx.drawImage(
      pos === "bottom-left"
        ? watermarkImage[0] !== ""
          ? vendorLogo
          : ""
        : gariseaLogo,
      x,
      y,
      Number(watermarkImageWidthValue.toFixed()),
      Number(
        pos === "bottom-left"
          ? vendorLogoHeight.toFixed()
          : gariseaLogoHeight.toFixed()
      )
    );
  });

  return await canvas;
};
