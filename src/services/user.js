const User = {
  prezentations: [],
  slides: [],
  name: '',
  setName: name => (User.name = name),
  getName: () => User.name,
  setPrezentations: g => (User.prezentations = g),
  setSlides: p => (User.slides = p)
};
export default User;
