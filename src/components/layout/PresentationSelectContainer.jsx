const m = require('mithril');
import Task from 'data.task';
import Requests from '../../services/Requests.js';
import { compose, pluck, toLower, filter, prop, traverse } from 'ramda';
import PresentationSelectCard from './../cards/PresentationSelectCard.jsx';
import CardContainer from './CardContainer.jsx';

const log = m => v => {
  console.log(m, v);
  return v;
};

const PresentationSelectContainer = vnode => {
  const load = vnode => {
    console.log('PresentationSelectContainer load', vnode);
  };

  return {
    oninit: load,
    view: vnode => {
      console.log('PresentationSelectContainer view', vnode);
      return vnode.attrs.presentations.map((p, idx) => (
        <CardContainer>
          <PresentationSelectCard presentations={p} presentationId={idx}>
            <p class="p">{p.title}</p>
          </PresentationSelectCard>
        </CardContainer>
      ));
    }
  };
};

export default PresentationSelectContainer;
