import Stream from "mithril-stream";
import O from "patchinko/constant"


const Model = {
  currentPresentation: { id: null, slides: [], title: '' },
  presentations: [],
  contents: Stream(''),
  user: { name: '' },
  setPresentationId: update => id => update({ currentPresentation: O({ id }) }),
  updateSlides: update => slides => update({ currentPresentation: O({ slides }) }),
  updateTitle: update => title => update({ currentPresentation: O({ title }) }),
  updatePresentations: update => presentations => update({ presentations }),
  setUser: update => field => e => update({ user: O({ [field]: e.target.value }) }),
};
export default Model;