const m = require('mithril');
import Task from 'data.task';
import Requests from '../../services/Requests.js';
import { compose, pluck, toLower, filter, prop, traverse } from 'ramda';
import PresentationSelectCard from './../cards/PresentationSelectCard.jsx';
import CardContainer from './CardContainer.jsx';

const PresentationSelectContainer = vnode => ({
  view: vnode => {
    return vnode.attrs.presentations.map((p, idx) => (
      <CardContainer>
        <PresentationSelectCard presentations={p} presentationId={idx}>
          <p class="p">{p.title}</p>
        </PresentationSelectCard>
      </CardContainer>
    ))
  }
});

export default PresentationSelectContainer;
