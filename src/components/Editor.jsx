import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import EditorHeader from './EditorHeader';
import { useEditorStore } from '../store/useEditorStore';
import { useEffect, useRef } from 'react';

export default function Editor() {
  const { title, setTitle, setContent, setSaveStatus } = useEditorStore();
  const titleRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Begin writing your post...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      // Mocking a save interaction
      setTimeout(() => setSaveStatus('saved'), 1000);
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
    setTimeout(() => setSaveStatus('saved'), 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <EditorHeader />

      {/* Main Content Column with Generous Spacing */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        
        {/* Placeholder for Cover Image Upload */}
        <div className="w-full h-32 sm:h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl mb-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer">
          <span className="text-sm font-medium">Click to upload post cover</span>
        </div>

        {/* Seamless Title Input */}
        <textarea
          ref={titleRef}
          value={title}
          onChange={handleTitleChange}
          placeholder="Post title"
          rows={1}
          className="w-full resize-none overflow-hidden bg-transparent text-4xl sm:text-5xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 focus:outline-none mb-8 leading-tight"
        />

        {/* Tiptap Editor body (Bubble Menu Removed!) */}
        <div className="relative">
          <EditorContent editor={editor} />
        </div>
      </main>
    </div>
  );
}