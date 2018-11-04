export const updatePassword = model => password =>
  (model.User.password = password);
export const updateUserName = model => name => (model.User.name = name);
