import { find, propEq, without } from 'ramda';

const searchListById = x => xs => find(propEq('id', x), xs);

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
    searchListById(slide.id)(User.slideShow) != undefined
      ? (User.slideShow = without(
          [searchListById(slide.id)(User.slideShow)],
          User.slideShow
        ))
      : User.slideShow.push(slide);
  }
};
export default User;
