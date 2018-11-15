import httpTasks from "./Tasks.js";
import Task from "data.task";

const toLoginDtoTask = ({ email, password }) =>
  Task.of({
    email,
    password,
    returnSecureToken: true,
  });

const tologinTask = dto => httpTasks.postTask("verifyPassword.json")({ dto });

export const loginTask = data => toLoginDtoTask(data).chain(tologinTask);

export const saveSlideTask = dto => httpTasks.postTask(`slides`)({ dto });

export const findSlidesTask = id =>
  httpTasks.getTask(`presentations/${id}/slides`);

export const findPresentationsTask = () => httpTasks.getTask("presentations");

export const savePresentationTask = dto =>
  httpTasks.postTask(`presentations`)({
    dto,
  });
