let dpr: any = null;

if (typeof window !== "undefined") {
  dpr = window.devicePixelRatio || 1;
}

export const generateImage = async (text: string) => {
  let canvasEl: any = null;

  if (typeof window !== "undefined") {
    canvasEl = document.createElement("canvas");
  }

  const imageBlob: any = await textToBitmap(text, "Roboto");

  const imageUrl = URL.createObjectURL(imageBlob);

  const image = new Image();
  image.src = imageUrl;
  canvasEl.replaceChildren(image);

  requestAnimationFrame(() => {
    // scale down the rendered image based on the display DPR
    const currentHeight = image.getBoundingClientRect().height;
    image.style.height = `${currentHeight / dpr}px`;
  });

  return canvasEl;
};

/**
 * To properly render the given text across different browser engines,
 * we initially set a large enough canvas and then vertically trim
 * the empty space.
 */
const textToBitmap = async (text: string, font: string) => {
  let canvas: any;
  let convertToBlob;

  const FONT_SIZE = 50;
  const VERTICAL_EXTRA_SPACE = 5;
  const HORIZONTAL_EXTRA_SPACE = 2;

  if (typeof window !== "undefined") {
    if ("OffscreenCanvas" in window) {
      canvas = new window.OffscreenCanvas(200, 200);
      convertToBlob = canvas.convertToBlob.bind(canvas);
    } else {
      canvas = document.createElement("canvas");

      convertToBlob = () =>
        new Promise((resolve) => {
          if (canvas.msToBlob && !canvas.toBlob) {
            // Edge and IE11

            const blob = canvas.msToBlob();

            resolve(blob);
          } else {
            canvas.toBlob(resolve);
          }
        });
    }
  }

  const ctx = canvas.getContext("2d");

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = "white";
  ctx.textShadow =
    "3px 3px 0 #000, -3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000";

  // scale up the font size by the DPR factor. When
  // rendering, we'll scale down the image by the same
  // amount.
  ctx.font = `${FONT_SIZE * dpr}px "${font}"`;

  // IE and Edge only returns width as part of measureText
  const {
    actualBoundingBoxLeft,
    actualBoundingBoxRight,
    fontBoundingBoxAscent,
    fontBoundingBoxDescent,
    actualBoundingBoxAscent,
    actualBoundingBoxDescent,
    width,
  } = ctx.measureText(text);

  // Render a large canvas to handle edge cases with some cases with large
  // ascenders and descender strokes that otherwise could end up cropped out
  // 5 is chosen as a multiplier after trying out rendering multiple fonts on different
  // browser engines while keeping the necessary room before vertically trimming the
  // canvas to ensure proper rendering of text (VERTICAL_EXTRA_SPACE).
  // Horizontal trimming is also applied with a similar logic to handle edge cases there.
  const canvasHeight =
    Math.max(
      Math.abs(actualBoundingBoxAscent) + Math.abs(actualBoundingBoxDescent),
      (Math.abs(fontBoundingBoxAscent) || 0) +
        (Math.abs(fontBoundingBoxDescent) || 0)
    ) * VERTICAL_EXTRA_SPACE;
  canvas.height = canvasHeight;

  const canvasWidth =
    Math.max(width, Math.abs(actualBoundingBoxLeft) + actualBoundingBoxRight) *
    HORIZONTAL_EXTRA_SPACE;
  canvas.width = canvasWidth;
  ctx.textBaseline = "top";
  ctx.font = `${FONT_SIZE * dpr}px "${font}"`;
  // Do not start rendering the text at the very top of the canvas to
  // prevent cutting out ascender strokes on certain fonts.
  // 4 is chosen so that text starts being rendered at the upper half of
  // the canvas
  ctx.fillText(text, canvasWidth / 4, canvasHeight / 4);
  trimCanvas(canvas);

  return convertToBlob({
    type: "image/png",
  });
};

/*
 * Remove empty regions on a canvas
 *
 * Based on https://ourcodeworld.com/articles/read/683/how-to-remove-the-transparent-pixels-that-surrounds-a-canvas-in-javascript
 */
const trimCanvas = (canvas: any) => {
  const ctx = canvas.getContext("2d");
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const length = pixels.data.length;
  let topCoord = null;
  let bottomCoord = null;
  let leftCoord = null;
  let rightCoord = null;
  let x = 0;
  let y = 0;

  // Iterate over every pixel to find the highest
  // and where it ends on the vertical axis
  // Each pixel is represented as RGBA
  for (let i = 0; i < length; i += 4) {
    // We inspect the alpha channel to check
    // if the pixel is fully transparent or not
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % canvas.width;
      y = Math.trunc(i / 4 / canvas.width);

      if (topCoord === null) {
        // Since we inspect from top to bottom,
        // the initial not-transparent pixel must
        // be the topBound one.
        topCoord = y;
      }

      if (leftCoord === null || x < leftCoord) {
        // Since we walk in the left-right top-bottom
        // direction, we need to find the lowest
        // x coordinate as the leftCoord
        leftCoord = x;
      }

      if (rightCoord === null || x > rightCoord) {
        // Since we walk in the left-right top-bottom
        // direction, we need to find the highest
        // x coordinate as the rightCoord
        rightCoord = x;
      }

      if (bottomCoord === null || bottomCoord < y) {
        bottomCoord = y;
      }
    }
  }

  // If some value was left as null we use 0
  topCoord = topCoord || 0;
  bottomCoord = bottomCoord || 0;
  leftCoord = leftCoord || 0;
  rightCoord = rightCoord || 0;

  // Calculate height and width. Add 20 pixels
  // for some negative space (i.e. padding) around
  // the canvas edges
  const trimHeight = bottomCoord - topCoord + 20;
  const trimWidth = rightCoord - leftCoord + 20;
  const trimmed = ctx.getImageData(leftCoord, topCoord, trimWidth, trimHeight);

  canvas.width = trimWidth;
  canvas.height = trimHeight;
  ctx.putImageData(trimmed, 10, 10);
};
