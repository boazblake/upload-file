import httpTasks from "./Tasks.js";
import Task from "data.task";
import { log } from "../services/index.js";
import { compose } from "ramda";

const toLoginDtoTask = ({ email, password }) =>
  Task.of({
    email,
    password,
    returnSecureToken: true,
  });

const tologinTask = dto => httpTasks.postTask("verifyPassword.json")({ dto });

export const loginTask = data => toLoginDtoTask(data).chain(tologinTask);

export const saveSlideTask = ({
  dto: { title },
  presentationId,
  userToken,
}) => {
  console.log("tosave", title, userToken, presentationId);
  return httpTasks
    .postTask(`data/slides`)({ dto: { title }, userToken })
    .map(log("slide"));
};

export const findSlidesTask = id => httpTasks.getTask(`presentations/${id}`);

export const findPresentationsTask = () => httpTasks.getTask("presentations");

export const savePresentationTask = dto =>
  httpTasks.postTask(`${presentationUrl}`)(dto);
