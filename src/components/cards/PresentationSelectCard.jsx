const m = require('mithril');

import PresentationSelectField from './PresentationSelectField.jsx';

const PresentationSelectCard = {
  view: vnode => (
    <div class="thumb-card card">
      <div class="slide-fields">
        <PresentationSelectField
          fieldValue={`${vnode.attrs.presentation.title}`}
        />
        <PresentationSelectField
          action={() => selectPresentation(vnode.attrs.presentationId)}
          fieldValue={<i class="fas fa-select" />}
        />
      </div>
    </div>
  )
}

const toggleSelection = slide => {
  slide.isSelected = !slide.isSelected;
  return slide;
};

const setColor = isSelected => {
  return isSelected ? 'yellow' : 'green';
};

export const selectPresentation = id => {
  return m.route.set(`/slides/${id}`);
};

export default PresentationSelectCard;
