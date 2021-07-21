
export function rectIn(xPos, yPos, left, right, top, bottom) {
  return xPos > left && xPos < right && yPos > top && yPos < bottom;
}