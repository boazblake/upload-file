import { findPresentationsTask } from "../services/requests.js";

import {
  compose,
  path,
  prop,
  props,
  map,
  lensIndex,
  view,
  split,
  last,
} from "ramda";

const headLensIndex = lensIndex(0);
const secondLensIndex = lensIndex(1);

const PresentationId = compose(
  last,
  split("/"),
  view(headLensIndex)
);

const presentationTitleLens = path(["Title", "stringValue"]);

const PresentationTitle = compose(
  presentationTitleLens,
  view(secondLensIndex)
);

const toPresentationModel = dto => ({
  id: PresentationId(dto),
  title: PresentationTitle(dto),
});

const parsePresentations = compose(
  map(toPresentationModel),
  map(props(["name", "fields"])),
  prop("documents")
);

export const getPresentationsTask = () =>
  findPresentationsTask().map(parsePresentations);
