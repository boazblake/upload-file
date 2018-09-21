import Stream from "mithril-stream";
import O from "patchinko/constant"


const Model = {
  currentPresentationId: null,
  presentations: [],
  contents: Stream(''),
  user: { name: '' },
  setUser: update => field => e => update({ user: O({ [field]: e.target.value }) }),
  updatePresentations: update => xs => update({ presentations: xs }),
  setId: update => id => update({ currentPresentationId: id })
};
export default Model;