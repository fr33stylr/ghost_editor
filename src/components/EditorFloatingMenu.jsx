import { Plus, Image as ImageIcon, Code, Minus, Bookmark, Youtube } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function EditorFloatingMenu({ editor }) {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      if (!editor.isFocused) {
        setTimeout(() => {
          if (!editor.isFocused) {
            setShow(false);
            setIsOpen(false);
          }
        }, 200);
        return;
      }

      const { selection } = editor.state;
      const { $anchor, empty } = selection;

      const isParagraph = $anchor.parent.type.name === 'paragraph';
      const isEmpty = $anchor.parent.textContent.length === 0;

      if (!empty || !isParagraph || !isEmpty) {
        setShow(false);
        setIsOpen(false);
        return;
      }

      const coords = editor.view.coordsAtPos(selection.from);
      
      setPosition({ 
        top: coords.top - 4,
        left: coords.left - 48
      });
      setShow(true);
    };

    editor.on('transaction', handleUpdate);
    editor.on('selectionUpdate', handleUpdate);
    editor.on('focus', handleUpdate);

    return () => {
      editor.off('transaction', handleUpdate);
      editor.off('selectionUpdate', handleUpdate);
      editor.off('focus', handleUpdate);
    };
  }, [editor]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      editor.chain().focus().setImage({ src: url }).run();
      setIsOpen(false);
      setShow(false);
      e.target.value = ''; 
    }
  };


  const actions = [
    { name: 'Photo', icon: <ImageIcon size={18} strokeWidth={1.5} />, action: () => fileInputRef.current?.click() },
    { name: 'HTML', icon: <Code size={18} strokeWidth={1.5} />, action: () => editor.chain().focus().insertContent({ type: 'htmlblock' }).run() },
    { name: 'Divider', icon: <Minus size={18} strokeWidth={1.5} />, action: () => editor.chain().focus().setHorizontalRule().run() },
    { name: 'Bookmark', icon: <Bookmark size={18} strokeWidth={1.5} />, action: () => editor.chain().focus().insertContent({ type: 'bookmark' }).run() },
    { name: 'Youtube', icon: <Youtube size={18} strokeWidth={1.5} />, action: () => editor.chain().focus().insertContent({ type: 'youtube' }).run() },
  ];

  return (
    <>
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleImageUpload} 
      />

      {show && (
        <div 
          style={{ top: position.top, left: position.left }}
          className="fixed z-40"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="relative flex items-center">
            
            {/* Light Mode Plus Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 ${
                isOpen 
                  ? 'rotate-45 border-gray-300 bg-white text-gray-800 shadow-sm' 
                  : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600'
              }`}
            >
              <Plus size={22} strokeWidth={1.5} />
            </button>

            {/* Light Mode Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-10 top-0 bg-white shadow-lg border border-gray-200 rounded-xl py-2 w-48 flex flex-col z-50 overflow-hidden">
                {actions.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                      setShow(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left font-medium transition-colors"
                  >
                    <span className="text-gray-400">{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}