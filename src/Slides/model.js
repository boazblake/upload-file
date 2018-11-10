import { findSlidesTask } from "../services/requests";
import { compose, path, props, map, lensIndex, view, split, last } from "ramda";

const headLensIndex = lensIndex(0);
const secondLensIndex = lensIndex(1);

const PresentationId = compose(
  last,
  split("/"),
  view(headLensIndex)
);

const PresentationTitle = compose(
  path(["Title", "stringValue"]),
  view(secondLensIndex)
);

const SlideModel = dto => ({
  contents: path(["Contents", "stringValue"], dto),
  id: path(["Id", "stringValue"], dto),
  isSelected: path(["IsSelected", "booleanValue"], dto),
  title: path(["Title", "stringValue"], dto),
});

const Slides = compose(
  map(SlideModel),
  map(path(["mapValue", "fields"])),
  path(["Slides", "arrayValue", "values"]),
  view(secondLensIndex)
);

const toSlideModel = dto => ({
  id: PresentationId(dto),
  title: PresentationTitle(dto),
  slides: Slides(dto),
});

const parseSlides = compose(
  map(toSlideModel),
  map(props(["name", "fields"]))
);

export const getSlidesTask = compose(
  parseSlides,
  findSlidesTask
);
