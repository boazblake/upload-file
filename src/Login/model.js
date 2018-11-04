import Task from "data.task";

export const updatePassword = model => password =>
  (model.User.password = password);
export const updateUserName = model => name => (model.User.name = name);
export const loginTask = x => {
  Task.of(x);
  console.log(x);
};
// export default { updatePassword, updateUserName };
