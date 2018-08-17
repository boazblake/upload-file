const User = {
  gists: [],
  Ps: [],
  name: '',
  setName: name => (User.name = name),
  getName: () => User.name,
  setGists: g => (User.gists = g),
  setPs: d => (User.Ps = d)
};
export default User;
