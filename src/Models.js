import Stream from "mithril-stream";
import O from "patchinko/constant";
import { create } from "microstates";

const User = {
  name: "",
  password: "",
  Token: "",
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
  title: "",
  slides: [],
};

const Model = {
  Presentations: [],
  Presentation,
};

const Models = {
  Model,
  toggleModal: false,
};

export default Models;
