import React from 'react';

export default ({ selectedNode, onNodeTextChange }) => {
  if (!selectedNode) {
    return null;
  }

  return (
    <aside>
      <div className="settings-panel">
        <h3>Settings Panel</h3>
        <label htmlFor="node-text">Text:</label>
        <textarea
          id="node-text"
          name="node-text"
          rows="4"
          cols="30"
          value={selectedNode.data.label}
          onChange={(evt) => onNodeTextChange(selectedNode.id, evt.target.value)}
        />
      </div>
    </aside>
  );
}; 