import Stream from "mithril-stream";
import O from "patchinko/constant";
import { create } from "microstates";

const User = {
  name: "",
  password: "",
};

const Slide = {
  title: "",
  contents: "",
  id: "",
  isSelected: false,
};

const Presentation = {
  name: "",
  id: "",
  slides: "",
};

const Model = {
  presentations: [],
  currentPresentationId: "",
  currentSlideId: "",
};

const Models = {
  Model,
  Presentation,
  Slide,
  User,
};

export default Models;
