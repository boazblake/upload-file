import tasks from "./Tasks.js";
import Task from "data.task";

const toLoginDtoTask = ({ name, password }) =>
  Task.of({
    login: name,
    password,
  });

const tologinTask = dto => tasks.postTask("users/login")(dto);

export const loginTask = data => toLoginDtoTask(data).chain(tologinTask);

export const findPresentationsTask = model =>
  tasks.getTask("data/presentations");
