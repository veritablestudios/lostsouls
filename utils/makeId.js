import { nanoid } from "nanoid";

export const makeId = (length) => {
  const id = nanoid(length);
  return id;
};
