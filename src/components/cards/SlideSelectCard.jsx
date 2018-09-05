const m = require("mithril");

import { contains, without, not, lensProp, over, compose } from "ramda";

import SlideSelectField from "./SlideSelectField.jsx";

const SlideSelectCard = vnode => {
  console.log(vnode)
  const state = vnode.attrs.state
  const actions = {
    editCard: vnode.attrs.edit,
    toggleSelection: vnode.attrs.toggle
  };
  const slide = vnode.attrs.slide;
  const slideVM = state(slide.id);


  return {
    view: function (vnode) {
      return (
        <div class="thumb-card card" key={slideVM.position(slide.id)}>
          <div class="slide-fields">
            <SlideSelectField fieldValue={`${slide.title}`} />
            <SlideSelectField
              action={() =>
                actions.toggleSelection(slide)(slideVM)
              }
              fieldColor={{
                color: slideVM.isSelected() ? "yellow" : "green"
              }}
              fieldValue={<i class="fa fa-star" />}
            />
            <SlideSelectField
              action={() => actions.editCard(slide)}
              fieldValue={<i class="fas fa-pen-alt" />}
            />
          </div>
        </div>
      );
    }
  }
};

export default SlideSelectCard;
