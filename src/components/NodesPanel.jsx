import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the left.</div>
      <div className="nodes-panel">
        <div className="dndnode message" onDragStart={(event) => onDragStart(event, 'textNode')} draggable>
          Send Message
        </div>
      </div>
    </aside>
  );
}; 