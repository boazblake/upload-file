import m from "mithril";
import Task from "data.task";

import { backendlessKey, backendless } from "../../secrets.js";

const baseUrl = `https://api.backendless.com/${backendless}/${backendlessKey}`;

const postTask = url => ({ userToken, dto }) =>
  new Task((rej, res) =>
    m
      .request({
        method: "POST",
        url: `${baseUrl}/${url}`,
        data: dto,
        withCredentials: false,
        headers: {
          "Content-Type": "application/json",
          "user-token": userToken,
        },
      })
      .then(res, rej)
  );

const putTask = url => ({ userToken, dto }) =>
  new Task((rej, res) =>
    m
      .request({
        method: "PUT",
        url: `${baseUrl}/${url}`,
        data: dto,
        withCredentials: false,
        headers: {
          "Content-Type": "application/json",
          "user-token": userToken,
        },
      })
      .then(res, rej)
  );

const getTask = url => userToken =>
  new Task((rej, res) =>
    m
      .request({
        method: "GET",
        url: `${baseUrl}/${url}`,
        withCredentials: false,
        headers: {
          "Content-Type": "application/json",
          "user-token": userToken,
        },
      })
      .then(res, rej)
  );

export default { postTask, putTask, getTask };
