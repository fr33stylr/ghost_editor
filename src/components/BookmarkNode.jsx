import { NodeViewWrapper } from '@tiptap/react';
import { useMutation } from '@tanstack/react-query';
import { fetchBookmarkMetadata } from '../api/mock';
import { useState } from 'react';
import { Globe, Loader2 } from 'lucide-react';

export default function BookmarkNode(props) {
  const [inputValue, setInputValue] = useState('');
  
  // React Query mutation to fetch the mock data
  const mutation = useMutation({
    mutationFn: fetchBookmarkMetadata,
    onSuccess: (data) => {
      // Save the fetched data into the Tiptap node attributes
      props.updateAttributes({
        url: data.url,
        title: data.title,
        description: data.description,
        image: data.image,
        publisher: data.publisher,
      });
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue) {
        mutation.mutate(inputValue);
      }
    }
  };

  const { url, title, description, image, publisher } = props.node.attrs;
  const isSelected = props.selected; // Tiptap tells us if the block is currently clicked

  return (
    <NodeViewWrapper className={`my-8 rounded-lg overflow-hidden border-2 transition-colors ${isSelected ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'}`}>
      
      {/* STATE 1: No URL yet, show the input field */}
      {!url && (
        <div className="p-4 bg-white relative">
          <input
            type="url"
            placeholder="https://..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={mutation.isPending}
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:opacity-50"
            autoFocus
          />
          {mutation.isPending && (
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400">
              <Loader2 className="animate-spin" size={20} />
            </div>
          )}
          
          {/* Mock dropdown hint from your screenshot */}
          {inputValue && !mutation.isPending && (
            <div className="absolute top-full left-4 mt-2 bg-white border border-gray-100 shadow-xl rounded-md p-3 w-64 z-10 flex items-center gap-2 text-sm text-gray-700">
              <Globe size={16} className="text-gray-400" />
              <span className="truncate">Link to: {inputValue}</span>
            </div>
          )}
        </div>
      )}

      {/* STATE 2: URL exists, show the rich card */}
      {url && (
        <div className="flex flex-col sm:flex-row bg-white cursor-pointer group">
          <div className="flex-1 p-5 flex flex-col justify-center">
            <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">{description}</p>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-800">
              <Globe size={14} />
              <span>{publisher}</span>
            </div>
          </div>
          <div className="w-full sm:w-1/3 min-h-[150px] bg-gray-100 border-l border-gray-100">
            {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
          </div>
        </div>
      )}

      {/* Optional Caption Input from your screenshot */}
      {url && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
          <input 
            type="text" 
            placeholder="Type caption for bookmark (optional)" 
            className="w-full bg-transparent text-center text-xs text-gray-400 focus:outline-none focus:text-gray-600"
          />
        </div>
      )}
    </NodeViewWrapper>
  );
}