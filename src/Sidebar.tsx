import React from 'react';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import type { Node } from 'reactflow';

interface SidebarProps {
    selectedNode: Node | null;
    onUpdateNodeText: (id: string, newText: string) => void;
    onDeselect: () => void;
}

export default function Sidebar({ selectedNode, onUpdateNodeText, onDeselect }: SidebarProps) {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="sidebar">
            {selectedNode ? (
                // Settings Panel
                <>
                    <div className="sidebar-header">
                        <button className="sidebar-back-btn" onClick={onDeselect} title="Back to Nodes">
                            <ArrowLeft size={18} />
                        </button>
                        <h3>Message</h3>
                    </div>
                    <div className="sidebar-content">
                        <div className="settings-group">
                            <label>Text</label>
                            <textarea
                                value={selectedNode.data.text}
                                onChange={(e) => onUpdateNodeText(selectedNode.id, e.target.value)}
                                placeholder="Enter message..."
                                autoFocus
                            />
                        </div>
                    </div>
                </>
            ) : (
                // Nodes Panel
                <>
                    <div className="sidebar-header">
                        <h3>Nodes Panel</h3>
                    </div>
                    <div className="sidebar-content">
                        {/* Extensible node types configuration */}
                        <div
                            className="dnd-node"
                            onDragStart={(event) => onDragStart(event, 'text')}
                            draggable
                        >
                            <MessageSquare size={24} />
                            <span>Message</span>
                        </div>
                    </div>
                </>
            )}
        </aside>
    );
}
