import { findSlidesTask } from "../services/requests.js";
import { assoc, filter, propEq, head } from "ramda";

const toViewModel = id => model => data => {
  let hasId = propEq("id", parseInt(id));
  let presentation = head(filter(hasId, model.Model.Presentations));
  console.log(presentation);
  let dto = assoc("slides", data, presentation);
  return dto;
};

export const loadSlides = pId => model =>
  findSlidesTask(pId).map(toViewModel(pId)(model));
