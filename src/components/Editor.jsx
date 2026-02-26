import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import EditorHeader from './EditorHeader';
import EditorBubbleMenu from './EditorBubbleMenu';
import { useEditorStore } from '../store/useEditorStore';
import { useEffect, useRef, useState } from 'react';
import EditorSlashMenu from './EditorSlashMenu';
import Bookmark from './Bookmark';
import { CloudUpload, Trash2 } from 'lucide-react';

export default function Editor() {
  const { title, setTitle, setContent, setSaveStatus } = useEditorStore();
  const titleRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  const [coverImage, setCoverImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Creates an instant, temporary URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      triggerSave(); // Triggers the "Saving..." state in the header!
    }
  };

  const triggerSave = () => {
    setSaveStatus('saving');
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      setSaveStatus('saved');
    }, 1000);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline decoration-blue-300 underline-offset-2 cursor-pointer',
        },
      }),
      Placeholder.configure({
        placeholder: "Type '/' for commands",
      }),
      Bookmark,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      // Mocking a save interaction
      triggerSave();
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg sm:prose-xl focus:outline-none max-w-none min-h-[50vh]',
      },
    },
  });

  // Auto-resize the title textarea as the user types
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
    }
  }, [title]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    // Mocking a save interaction
    triggerSave();
  };

  return (
    <div className="min-h-screen bg-white">
      <EditorHeader />

      {/* Main Content Column with Generous Spacing */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        
        {/* Hidden File Input */}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleImageUpload} 
        />

        {/* Cover Image Area */}
        {!coverImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-16 bg-[#f8f9fa] border border-dashed border-gray-300 rounded-lg mb-10 flex flex-col items-center justify-center transition-colors hover:bg-gray-100 cursor-pointer"
          >
            <CloudUpload size={28} className="text-gray-500 mb-3" strokeWidth={1.5} />
            
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-semibold text-gray-700">Click to upload post cover</span> or drag and drop
            </p>
            
            <p className="text-xs text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        ) : (
          <div className="relative w-full mb-10 group rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img 
              src={coverImage} 
              alt="Cover" 
              className="w-full h-[30vh] sm:h-[45vh] object-cover"
            />
            
            {/* Hover Actions (Ghost Style) */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
               <button 
                onClick={() => {
                  setCoverImage(null);
                  triggerSave();
                }}
                className="p-2 bg-white/90 backdrop-blur text-red-600 rounded-lg shadow hover:bg-white transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Seamless Title Input */}
        <textarea
          ref={titleRef}
          value={title}
          onChange={handleTitleChange}
          placeholder="Post title"
          rows={1}
          className="w-full resize-none overflow-hidden bg-transparent text-4xl sm:text-5xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 focus:outline-none mb-8 leading-tight"
        />

        {/* Tiptap Editor body */}
        <div className="relative">
          {/* Our Custom Bubble Menu inserted here! */}
          <EditorBubbleMenu editor={editor} />
          <EditorSlashMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </main>
    </div>
  );
}