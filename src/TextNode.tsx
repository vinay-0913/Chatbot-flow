import { Handle, Position } from 'reactflow';
import { MessageCircle } from 'lucide-react';
import './App.css';

interface TextNodeData {
    text: string;
}

interface TextNodeProps {
    data: TextNodeData;
    selected: boolean;
}

export default function TextNode({ data, selected }: TextNodeProps) {
    return (
        <div className={`custom-text-node ${selected ? 'selected' : ''}`}>
            {/* Target Handle - Left Side (Accepts multiple edges by default) */}
            <Handle
                type="target"
                position={Position.Left}
                id="a"
            />

            <div className="node-header">
                <MessageCircle className="node-icon" size={14} />
                <span className="node-header-title">Send Message</span>
                {/* Placeholder decorative WhatsApp style icon */}
                <div className="node-whatsapp-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525L2 22L7.54754 20.9565C8.88842 21.6244 10.4003 22 12 22Z" /></svg>
                </div>
            </div>

            <div className="node-body">
                {data.text || 'text message'}
            </div>

            {/* Source Handle - Right Side */}
            <Handle
                type="source"
                position={Position.Right}
                id="b"
            />
        </div>
    );
}
