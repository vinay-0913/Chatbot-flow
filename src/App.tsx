import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  type Connection,
  type Node,
  type ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TextNode from './TextNode';
import Sidebar from './Sidebar';
import './App.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'text',
    data: { text: 'test message 1' },
    position: { x: 250, y: 150 },
  },
];

let id = 0;
const getId = () => `node_${id++}`;

const AppContent = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const [toast, setToast] = useState<{ message: string, type: 'error' | 'success' } | null>(null);

  const nodeTypes = useMemo(() => ({ text: TextNode }), []);

  // Show an error toast
  const showToast = (message: string, type: 'error' | 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Restrict source to ONE outgoing edge
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => {
        // If an edge already originates from this source, we could replace it or prevent adding.
        // The rule says "Each node can connect to only ONE next node."
        const filteredEdges = eds.filter(
          (edge) => edge.source !== params.source
        );
        return addEdge(params, filteredEdges);
      });
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { text: `test message ${nodes.length + 1}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes.length, setNodes]
  );

  const onUpdateNodeText = useCallback(
    (id: string, newText: string) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: { ...node.data, text: newText }
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Derive selected node state from React Flow's nodes
  const selectedNode = useMemo(() => nodes.find((n) => n.selected) || null, [nodes]);

  const onDeselect = () => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        selected: false,
      }))
    );
  };

  // Validation logic
  const handleSave = () => {
    if (nodes.length > 1) {
      // Find nodes that have an empty target handle.
      // A node has an empty target handle if there is NO edge where it is the target.
      const targetIds = edges.map(e => e.target);
      const nodesWithoutIncoming = nodes.filter(n => !targetIds.includes(n.id));

      if (nodesWithoutIncoming.length > 1) {
        showToast("Cannot save Flow", "error");
        return;
      }
    }

    console.log("Flow Saved JSON:", JSON.stringify({ nodes, edges }));
    showToast("Successfully saved flow!", "success");
  };

  return (
    <div className="app-container">
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        </div>
      )}

      <header className="header">
        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </header>

      <div className="main-content">
        <div className="canvas-area" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>

        <Sidebar
          selectedNode={selectedNode}
          onUpdateNodeText={onUpdateNodeText}
          onDeselect={onDeselect}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}
