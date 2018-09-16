const m = require('mithril');
import log from './../../utils/index.js'
import Requests from '../../services/Requests.js';
import { compose, pluck, toLower, filter, prop, traverse } from 'ramda';
import PresentationSelectCard from './../cards/PresentationSelectCard.jsx';
import CardContainer from './CardContainer.jsx';

const PresentationSelectContainer = vnode => {
  let _ps = []
  vnode.attrs.model.presentations.map(PS => PS.map(ps => _ps.push(ps)))

  const model = vnode.attrs.model

  return {
    view: () => {
      return _ps.map(p =>
        <CardContainer>
          <PresentationSelectCard presentation={p} model={model} presentationId={p.id}>
            <p class="p">{p.title}</p>
          </PresentationSelectCard>
        </CardContainer>
      )
    }
  }
}

export default PresentationSelectContainer;
