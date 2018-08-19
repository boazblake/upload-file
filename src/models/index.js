import { tagged } from 'daggy';
import Stream from 'mithril/stream';

const SlideModel = tagged('position', 'uuid', 'title', 'isSelected', 'content');

const viewModelMap = signature => {
  var _map = {};
  return function(key) {
    if (!_map[key]) {
      _map[key] = {};
      for (var prop in signature) _map[key][prop] = Stream(signature[prop]());
    }
    return _map[key];
  };
};
export { SlideModel, viewModelMap };
