import { NodeViewWrapper } from '@tiptap/react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, X, Image as ImageIcon } from 'lucide-react';

export default function ImagePickerNode({ editor, getPos, deleteNode }) {
  // Fetch 12 random images from Picsum using TanStack Query
  const { data: images, isLoading, isError } = useQuery({
    queryKey: ['picsumImages'],
    queryFn: async () => {
      // Picsum API: Gets a list of images. We use page 2 just for fresh results!
      const res = await fetch('https://picsum.photos/v2/list?page=2&limit=12');
      return res.json();
    }
  });

  const handleSelectImage = (id) => {
    // Generate a high-res URL for the actual editor image
    const highResUrl = `https://picsum.photos/id/${id}/1200/800`;
    const pos = getPos();
    
    // 1. Delete this picker UI block
    // 2. Insert the actual image in its exact place!
    editor.chain()
      .focus()
      .deleteRange({ from: pos, to: pos + 1 })
      .setImage({ src: highResUrl })
      .run();
  };

  return (
    <NodeViewWrapper className="my-8 relative bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full max-w-2xl font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
          <ImageIcon size={18} className="text-gray-400" />
          Choose an Image
        </div>
        {/* Allows the user to cancel and close the picker */}
        <button onClick={deleteNode} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin text-gray-400" size={28} />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-sm text-red-500 text-center py-4">Failed to load images.</div>
      )}

      {/* The Image Grid */}
      {images && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map(img => (
            <div 
              key={img.id} 
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group bg-gray-100"
              onClick={() => handleSelectImage(img.id)}
            >
              {/* Fetching a smaller thumbnail for the grid so it loads instantly */}
              <img
                src={`https://picsum.photos/id/${img.id}/300/200`}
                alt={img.author}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      )}
    </NodeViewWrapper>
  );
}