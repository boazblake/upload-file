import { log } from "../services/index.js";
import { create } from "microstates";

export const addPresentation = ({ Presentation, presentations }) => value => {
  console.log(Presentation, presentations);
  let presentation = create(Presentation, { name: value });
  return presentations.push(presentation);
};
