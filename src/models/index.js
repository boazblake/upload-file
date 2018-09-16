import Stream from "mithril-stream";


const Model = {
  currentPresentationId: null,
  gists: [],
  presentations: [],
  contents: Stream(''),
  user: { name: '' },
};
export default Model;