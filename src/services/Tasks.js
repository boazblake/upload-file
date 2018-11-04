const postTask = url => dto =>
  new Task((rej, res) =>
    m
      .request({
        method: "POST",
        url,
        dto,
        withCredentials: false,
      })
      .then(res, rej)
  );

const putTask = url => dto =>
  new Task((rej, res) =>
    m
      .request({
        method: "PUT",
        url,
        dto,
        withCredentials: false,
      })
      .then(res, rej)
  );

const getTask = url =>
  new Task((rej, res) =>
    m
      .request({
        method: "GET",
        url,
        withCredentials: false,
      })
      .then(res, rej)
  );

export default { postTask, putTask, getTask };
