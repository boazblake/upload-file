import { log } from "../utils/index.js";
import { assoc, compose, unnest } from "ramda";

const createDict = model =>
  model.data.map((row, rowId) =>
    row.map((node, nodeId) => assoc(`${rowId}.${nodeId}`, node, {}))
  );

export const toStruct = model => {
  const table = compose(log("table post unnest"))(model);

  return (model.table = table);
};
