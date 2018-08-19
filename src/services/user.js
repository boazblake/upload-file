import { contains, without } from 'ramda';

const User = {
  prezentations: [],
  slides: [],
  slideShow: [],
  name: '',
  setName: name => (User.name = name),
  getName: () => User.name,
  setPrezentations: g => (User.prezentations = g),
  setSlides: p => (User.slides = p),
  toggleSelection: slide => {
    contains(slide, User.slideShow)
      ? (User.slideShow = without([slide], User.slideShow))
      : User.slideShow.push(slide);
  }
};
export default User;
