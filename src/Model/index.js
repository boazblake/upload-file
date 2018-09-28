import Stream from "mithril-stream";
import O from "patchinko/constant";
import { parsePromise } from "../services/parse.js";

const Model = {
  data: [],
  upload: e => parsePromise(Model)(e),
};

export default Model;
