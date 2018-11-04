import m from "mithril";
import Task from "data.task";

import { backendlessKey, backendless } from "../../secrets.js";

const baseUrl = `https://api.backendless.com/${backendless}/${backendlessKey}`;

const postTask = url => data => {
  console.log("url and data", url, data);

  return new Task((rej, res) =>
    m
      .request({
        method: "POST",
        url: `${baseUrl}/${url}`,
        data,
        withCredentials: false,
        headers: {
          "Content-Type": "application/json",
          "user-token": data.userToken,
        },
      })
      .then(res, rej)
  );
};

const putTask = url => data =>
  new Task((rej, res) =>
    m
      .request({
        method: "PUT",
        url: `{baseUrl}/${url}`,
        data,
        withCredentials: false,
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then(res, rej)
  );

const getTask = url =>
  new Task((rej, res) =>
    m
      .request({
        method: "GET",
        url: `{baseUrl}/${url}`,
        withCredentials: false,
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then(res, rej)
  );

export default { postTask, putTask, getTask };
