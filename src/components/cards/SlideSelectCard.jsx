const m = require("mithril");

import { contains, without, not, lensProp, over, compose } from "ramda";

import SlideSelectField from "./SlideSelectField.jsx";

const SlideSelectCard = {
  oninit: function({ attrs }) {
    this.state = attrs.state;
    this.actions = {
      editCard: attrs.edit,
      toggleSelection: attrs.toggle
    };
    this.slide = attrs.slide;
    this.slideVM = this.state(this.slide.id);
    console.log("vnode, oninit?", this);
  },
  oncreate: function(vnode) {
    console.log("vnode oncreate?", this);
  },
  view: function(vnode) {
    return m(
      "div",
      { class: "thumb-card card", key: this.slideVM },
      <div class="slide-fields">
        <SlideSelectField fieldValue={`${this.slide.title}`} />
        <SlideSelectField
          action={() => this.actions.toggleSelection(this.slide)(this.slideVM)}
          fieldColor={{
            color: this.slideVM.isSelected() ? "yellow" : "green"
          }}
          fieldValue={<i class="fa fa-star" />}
        />
        <SlideSelectField
          action={() => this.actions.editCard(slide)}
          fieldValue={<i class="fas fa-pen-alt" />}
        />
      </div>
    );
  }
};

export default SlideSelectCard;
