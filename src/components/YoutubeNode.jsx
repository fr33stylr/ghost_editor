import { NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import { Youtube } from 'lucide-react';

export default function YoutubeNode({ node, updateAttributes }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      // This regex magically extracts the exact Video ID from any YouTube URL
      const match = inputValue.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?]*)/);
      const videoId = match ? match[1] : null;
      
      if (videoId) {
        updateAttributes({ url: `https://www.youtube.com/embed/${videoId}` });
      } else {
        alert('Please enter a valid YouTube link');
      }
    }
  };

  return (
    <NodeViewWrapper className="my-8">
      {!node.attrs.url ? (
        <div className="flex items-center gap-3 p-3 border-2 border-green-400 rounded-lg bg-white shadow-sm max-w-xl">
          <Youtube className="text-red-500" size={24} />
          <input
            type="url"
            placeholder="Paste YouTube URL and press Enter..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400 text-sm"
            autoFocus
          />
        </div>
      ) : (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md border border-gray-100">
          <iframe
            src={node.attrs.url}
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
          />
        </div>
      )}
    </NodeViewWrapper>
  );
}