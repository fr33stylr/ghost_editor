import { NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import { CodeXml } from 'lucide-react';

export default function HtmlBlockNode({ editor, getPos }) {
  const [htmlContent, setHtmlContent] = useState('');

  // Calculate how many lines of code there are so we can draw the line numbers!
  const lineCount = htmlContent.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(1, lineCount) }, (_, i) => i + 1);

  const handleKeyDown = (e) => {
    // If they press Ctrl+Enter or Cmd+Enter, we render the HTML!
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      
      if (htmlContent.trim()) {
        const pos = getPos();
        
        // 1. Delete this green code block
        // 2. Insert the parsed HTML directly into the editor at the exact same spot!
        editor.chain()
          .focus()
          .deleteRange({ from: pos, to: pos + 1 })
          .insertContentAt(pos, htmlContent)
          .run();
      }
    }
  };

  return (
    <NodeViewWrapper className="my-8 flex items-start gap-3 w-full">
      {/* The outside "<>" Icon */}
      <div className="mt-2 text-gray-400">
        <CodeXml size={22} strokeWidth={1.5} />
      </div>

      {/* The Green Code Editor Box */}
      <div className="flex-1 border-2 border-green-500 bg-white flex min-h-[120px] shadow-sm font-mono text-sm group focus-within:ring-4 focus-within:ring-green-500/20 transition-all">
        
        {/* Dynamic Line Numbers */}
        <div className="bg-gray-50 text-gray-400 px-3 py-3 border-r border-gray-100 select-none text-right flex flex-col min-w-[3rem]">
          {lineNumbers.map(num => (
            <span key={num} className="leading-relaxed">{num}</span>
          ))}
        </div>

        {/* The Typing Area */}
        <div className="flex-1 relative flex flex-col">
          <textarea
            className="flex-1 w-full p-3 bg-transparent resize-none focus:outline-none focus:ring-0 border-none text-gray-800 leading-relaxed"
            placeholder="Type your HTML here... (Press Ctrl + Enter to render)"
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
}