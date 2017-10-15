import * as React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

export default SortableHandle(function Handle() {
  return <span className="drag-handle">:::</span>;
});
