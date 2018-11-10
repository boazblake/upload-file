import m from "mithril";
import Task from "data.task";
import { baseUrl, _headers } from "./apiConfig.js";
import { webApiKey } from "../../secrets.js";

const postTask = url => ({ dto }) =>
  new Task((rej, res) =>
    m
      .request({
        method: "POST",
        url: `${baseUrl}${url}?key=${webApiKey}`,
        data: dto,
        withCredentials: false,
        headers: _headers,
      })
      .then(res, rej)
  );

const putTask = url => ({ dto }) =>
  new Task((rej, res) =>
    m
      .request({
        method: "PUT",
        url: `${baseUrl}/${url}.json`,
        data: dto,
        withCredentials: false,
        headers: _headers,
      })
      .then(res, rej)
  );

const getTask = url =>
  new Task((rej, res) =>
    m
      .request({
        method: "GET",
        url: `${baseUrl}/${url}`,
        withCredentials: false,
        headers: _headers,
      })
      .then(res, rej)
  );

export default { postTask, putTask, getTask };
