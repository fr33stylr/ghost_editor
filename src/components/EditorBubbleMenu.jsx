import { useState, useEffect } from 'react';
import { Bold, Italic, Heading2, Heading3, Quote, Link as LinkIcon, Unlink, Check, X } from 'lucide-react';

export default function EditorBubbleMenu({ editor }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [url, setUrl] = useState('');
  
  // THE FIX: Explicitly store the active states in React so the UI cannot freeze
  const [active, setActive] = useState({
    bold: false,
    italic: false,
    h2: false,
    h3: false,
    blockquote: false,
    link: false,
  });

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      // 1. Instantly update our React state to match Tiptap's internal state
      setActive({
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        h2: editor.isActive('heading', { level: 2 }),
        h3: editor.isActive('heading', { level: 3 }),
        blockquote: editor.isActive('blockquote'),
        link: editor.isActive('link'),
      });

      // 2. Handle position and visibility
      if (editor.state.selection.empty) {
        setShow(false);
        setIsLinkMode(false);
        return;
      }

      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) {
        setShow(false);
        return;
      }

      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      let menuTop = rect.top - 50;
      let menuLeft = rect.left + (rect.width / 2);

      // Fallback for large headings
      if (rect.width === 0 || rect.height === 0) {
        const startCoords = editor.view.coordsAtPos(editor.state.selection.from);
        const endCoords = editor.view.coordsAtPos(editor.state.selection.to);
        menuTop = Math.min(startCoords.top, endCoords.top) - 50;
        menuLeft = (startCoords.left + endCoords.left) / 2;
      }

      setPosition({ top: menuTop, left: menuLeft });
      setShow(true);
    };

    // Listeners update the state on every highlight or format change
    editor.on('selectionUpdate', handleUpdate);
    editor.on('transaction', handleUpdate);

    return () => {
      editor.off('selectionUpdate', handleUpdate);
      editor.off('transaction', handleUpdate);
    };
  }, [editor]);

  const setLink = () => {
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    setIsLinkMode(false);
    setUrl('');
  };

  if (!show) return null;

  return (
    <div 
      style={{ top: position.top, left: position.left, transform: 'translateX(-50%)' }}
      className="fixed z-50 flex items-center bg-white text-gray-800 rounded-lg shadow-md border border-gray-200 h-10 px-1 transition-opacity duration-100"
      onMouseDown={(e) => e.preventDefault()} 
    >
      {isLinkMode ? (
        <div className="flex items-center px-2 w-64">
          <input
            type="url"
            placeholder="Paste or type a link..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setLink()}
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none px-2"
            autoFocus
          />
          <button onClick={setLink} className="p-1.5 text-green-500 hover:bg-gray-100 rounded-md transition-colors"><Check size={16} strokeWidth={2.5} /></button>
          <button onClick={() => setIsLinkMode(false)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md transition-colors ml-1"><X size={16} strokeWidth={2.5} /></button>
        </div>
      ) : (
        <>
          <MenuButton 
            isActive={active.bold} // Using React state!
            action={() => editor.chain().focus().toggleBold().run()} 
            icon={<Bold size={18} strokeWidth={2.5} />} 
          />
          <MenuButton 
            isActive={active.italic} 
            action={() => editor.chain().focus().toggleItalic().run()} 
            icon={<Italic size={18} />} 
          />
          <MenuButton 
            isActive={active.h2} 
            action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
            icon={<Heading2 size={18} />} 
          />
          <MenuButton 
            isActive={active.h3} 
            action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
            icon={<Heading3 size={18} />} 
          />
          
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          
          <MenuButton 
            isActive={active.blockquote} 
            action={() => editor.chain().focus().toggleBlockquote().run()} 
            icon={<Quote size={18} />} 
          />
          <MenuButton
            isActive={active.link}
            action={() => {
              if (active.link) {
                editor.chain().focus().unsetLink().run();
              } else {
                setIsLinkMode(true);
                setUrl(editor.getAttributes('link').href || '');
              }
            }}
            icon={active.link ? <Unlink size={18} /> : <LinkIcon size={18} />}
          />
        </>
      )}
    </div>
  );
}

function MenuButton({ isActive, action, icon }) {
  return (
    <button
      type="button"
      onClick={action}
      className={`p-1.5 transition-colors rounded-md mx-0.5 flex items-center justify-center ${
        isActive 
        ? 'bg-gray-100 text-green-500 font-semibold' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {icon}
    </button>
  );
}