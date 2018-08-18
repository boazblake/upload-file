const User = {
  prezentations: [],
  slides: [],
  name: '',
  setName: name => (User.name = name),
  getName: () => User.name,
  setPrezentations: g => (User.prezentations = g),
  setSlides: p => (User.slides = p),
  setPs: d => (User.Ps = d)
};
export default User;
