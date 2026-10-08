/**
 * Calculates dimensions and offsets to cover the entire canvas viewport
 * while maintaining the natural aspect ratio of the image.
 *
 * @param {number} containerWidth - Viewport width
 * @param {number} containerHeight - Viewport height
 * @param {number} imageWidth - Natural image width
 * @param {number} imageHeight - Natural image height
 * @returns {{ drawWidth: number, drawHeight: number, offsetX: number, offsetY: number }}
 */
export function calculateCoverFit(containerWidth, containerHeight, imageWidth, imageHeight) {
  const imgRatio = imageWidth / imageHeight
  const screenRatio = containerWidth / containerHeight

  let drawWidth
  let drawHeight
  let offsetX
  let offsetY

  if (screenRatio > imgRatio) {
    drawWidth = containerWidth
    drawHeight = containerWidth / imgRatio
    offsetX = 0
    offsetY = (containerHeight - drawHeight) / 2
  } else {
    drawHeight = containerHeight
    drawWidth = containerHeight * imgRatio
    offsetX = (containerWidth - drawWidth) / 2
    offsetY = 0
  }

  return {
    drawWidth: Math.round(drawWidth),
    drawHeight: Math.round(drawHeight),
    offsetX: Math.round(offsetX),
    offsetY: Math.round(offsetY),
  }
}
