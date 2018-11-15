import m from "mithril";
import Stream from "mithril-stream";
import O from "patchinko/constant";

const User = {
  name: "",
  password: "",
  Token: "",
};

const SlideModel = {
  title: "",
  contents: "",
  id: "",
  isSelected: false,
  presentationId: "",
};

const PresentationModel = {
  id: "",
  title: "",
};

const Presentations = [];
const CurrentPresentation = { title: "", id: "", slides: [] };

const Model = {
  Presentations,
  CurrentPresentation,
  PresentationModel,
  SlideModel,
};

const Models = {
  Model,
  toggleModal: false,
};

export default Models;
