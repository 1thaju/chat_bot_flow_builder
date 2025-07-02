import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  Panel,
  useReactFlow,
  Handle,
  Position,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './index.css';

import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';

let id = 0;
const getId = () => `dndnode_${id++}`;

// Custom Text Node component
const TextNode = ({ data, isConnectable }) => {
  return (
    <div className="text-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="node-header">
        <span className="icon">💬</span> Send Message 
      </div>
      <div className="node-content">{data.label}</div>
      <Handle type="source" position={Position.Right} id="a" isConnectable={isConnectable} />
    </div>
  );
};

const nodeTypes = { textNode: TextNode };

function Flow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params) => {
    // Ensure a source handle can only have one outgoing edge
    setEdges((eds) => addEdge({ ...params, type: 'default' }, eds.filter(edge => edge.source !== params.source)));
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');

    if (typeof type === 'string' && type) {
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `text message ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    }
  }, [screenToFlowPosition, setNodes]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setErrorMessage(null); // Clear error message when clicking on pane
  }, []);

  const onNodeTextChange = useCallback((id, newText) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: newText } } : node
      )
    );
    setSelectedNode((prev) => (prev && prev.id === id ? { ...prev, data: { ...prev.data, label: newText } } : prev));
  }, [setNodes]);

  const onSaveFlow = useCallback(() => {
    setErrorMessage(null); // Clear previous errors
    if (nodes.length > 1) {
      const nodesWithNoOutgoingEdges = nodes.filter(node => 
        !edges.some(edge => edge.source === node.id)
      );
      if (nodesWithNoOutgoingEdges.length > 1) {
        setErrorMessage('Cannot save Flow');
        return;
      }
    }
    alert('Flow saved successfully!');
    console.log('Nodes:', nodes);
    console.log('Edges:', edges);
  }, [nodes, edges]);

  return (
    <div className="dnd-flow">
      {errorMessage && <div className="error-banner">{errorMessage}</div>}
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
          <Panel position="top-right">
            <button onClick={onSaveFlow} className="save-button">Save Changes</button>
          </Panel>
        </ReactFlow>
      </div>
      {selectedNode ? (
        <SettingsPanel selectedNode={selectedNode} onNodeTextChange={onNodeTextChange} />
      ) : (
        <NodesPanel />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
