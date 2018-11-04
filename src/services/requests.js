import m from "mithril";
import Task from "data.task";
import { log } from "./index.js";
import { postTask, putTask, getTask } from "./Tasks.js";

const baseUrl = "https://pastebin.com/api/";

const toPostTask = url => dto => {
  log("url")(url);
  log("dto")(dto);
  return postTask(url)(dto);
};

const loginTask = url => data => toPostTask(url)(dto);

export default { loginTask };
