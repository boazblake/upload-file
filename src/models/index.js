import Stream from "mithril-stream";


const Model = {
  currentPresentationId: null,
  gists: [],
  presentations: [],
  contents: Stream('### is this working?'),
  user: { name: '' },
};
export default Model;