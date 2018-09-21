import Stream from "mithril-stream";
import O from "patchinko/constant"


const Model = {
  currentPresentation: { id: null, slides: [], title: '' },
  setPresentationId: update => id => update({ currentPresentation: O({ id }) }),
  presentations: [],
  updatePresentations: update => presentations => update({ presentations }),
  updateSlides: update => slides => update({ currentPresentation: O({ slides }) }),
  updateTitle: update => title => update({ currentPresentation: O({ title }) }),
  contents: Stream(''),
  user: { name: '' },
  setUser: update => field => e => update({ user: O({ [field]: e.target.value }) }),
};
export default Model;