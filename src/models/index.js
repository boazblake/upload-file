import { tagged } from 'daggy';

const SlideModel = tagged(
  'position',
  'uuid',
  'title',
  'isSelected',
  'isEditing',
  'content'
);