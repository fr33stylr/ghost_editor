import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import EditorHeader from './EditorHeader';
import EditorBubbleMenu from './EditorBubbleMenu';
import { usePostStore } from '../store/usePostStore';
import { useEffect, useRef } from 'react'; // Removed useState, we use the store now
import EditorFloatingMenu from './EditorFloatingMenu';
import Bookmark from './Bookmark';
import { CloudUpload, Trash2 } from 'lucide-react';
import Youtube from './Youtube';
import HtmlBlock from './HtmlBlock';
import ImagePicker from './ImagePicker';

export default function Editor() {
  const titleRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  // 1. Grab everything from the store
  const { activePostId, posts, updateActivePost, saveStatus } = usePostStore();
  const activePost = posts.find((p) => p.id === activePostId);

  // Fallback if no active post is found
  if (!activePost) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // Save directly to store
      updateActivePost({ coverImage: imageUrl });
    }
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
        placeholder: "Begin writing your post...",
        showOnlyWhenEditable: true, 
        includeChildren: true,
      }),
      Bookmark,
      Youtube,
      HtmlBlock,
      ImagePicker,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl shadow-sm border border-gray-100 my-8 max-w-full',
        },
      }),
    ],
    content: activePost.content || '', // Set initial content from store
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      
      // Debounced save logic
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        updateActivePost({ content: html });
      }, 800);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg sm:prose-xl font-serif text-gray-800 focus:outline-none max-w-none min-h-[50vh]',
      },
    },
  });

  // Sync title height whenever the title text changes in the store
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
    }
  }, [activePost.title]);

  const handleTitleChange = (e) => {
    updateActivePost({ title: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <EditorHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleImageUpload} 
        />

        {/* Use activePost.coverImage from store */}
        {!activePost.coverImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-16 bg-[#f8f9fa] border border-dashed border-gray-300 rounded-lg mb-10 flex flex-col items-center justify-center transition-colors hover:bg-gray-100 cursor-pointer"
          >
            <CloudUpload size={28} className="text-gray-500 mb-3" strokeWidth={1.5} />
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-semibold text-gray-700">Click to upload post cover</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
          </div>
        ) : (
          <div className="relative w-full mb-10 group rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img 
              src={activePost.coverImage} 
              alt="Cover" 
              className="w-full h-auto rounded-xl"
            />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
               <button 
                onClick={() => updateActivePost({ coverImage: null })}
                className="p-2 bg-white/90 backdrop-blur text-red-600 rounded-lg shadow hover:bg-white transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Use activePost.title from store */}
        <textarea
          ref={titleRef}
          value={activePost.title}
          onChange={handleTitleChange}
          placeholder="Post title"
          rows={1}
          className="w-full resize-none overflow-hidden bg-transparent text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 placeholder-gray-300 border-none focus:ring-0 focus:outline-none mb-8 leading-tight font-sans"
        />

        <hr className="border-t border-gray-200 mb-8" />

        <div className="relative">
          <EditorBubbleMenu editor={editor} />
          <EditorFloatingMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </main>
    </div>
  );
}