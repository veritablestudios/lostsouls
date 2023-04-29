import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

export const getAvatar = (seed) => {
  const avatar = createAvatar(pixelArt, { seed });
  const svgString = avatar.toString();
  return `data:image/svg+xml;base64,${Buffer.from(svgString).toString(
    "base64"
  )}`;
};
