import { useState, useEffect } from 'react';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, Link as LinkIcon, Unlink, Check, X } from 'lucide-react';

export default function EditorBubbleMenu({ editor }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [url, setUrl] = useState('');
  
  // A tiny state just to force React to update the button colors when formatting changes
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const updateMenuPosition = () => {
      // 1. If nothing is highlighted, hide the menu
      if (editor.state.selection.empty) {
        setShow(false);
        setIsLinkMode(false);
        return;
      }

      // 2. Use the browser's native text selection for pixel-perfect accuracy
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) {
        setShow(false);
        return;
      }

      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Fallback: If the highlight has no width, don't show the menu
      if (rect.width === 0 && rect.height === 0) {
        setShow(false);
        return;
      }

      // 3. Set exact coordinates (centered above the highlighted text)
      setPosition({ 
        top: rect.top - 50, // 50px above the text
        left: rect.left + (rect.width / 2) 
      });
      setShow(true);
      setTick(t => t + 1); // Tell React to re-evaluate which buttons are active
    };

    // Listen for both highlighting text AND applying formatting
    editor.on('selectionUpdate', updateMenuPosition);
    editor.on('transaction', updateMenuPosition);

    return () => {
      editor.off('selectionUpdate', updateMenuPosition);
      editor.off('transaction', updateMenuPosition);
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
      className="fixed z-50 flex items-center bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden border border-gray-700 h-10 transition-opacity duration-100"
      // CRITICAL: prevents the editor from losing focus when clicking the menu!
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
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none px-2"
            autoFocus
          />
          <button onClick={setLink} className="p-1.5 text-green-400 hover:bg-gray-700 rounded-md transition-colors"><Check size={16} /></button>
          <button onClick={() => setIsLinkMode(false)} className="p-1.5 text-red-400 hover:bg-gray-700 rounded-md transition-colors ml-1"><X size={16} /></button>
        </div>
      ) : (
        <>
          <MenuButton editor={editor} command="toggleBold" activeName="bold" icon={<Bold size={16} />} />
          <MenuButton editor={editor} command="toggleItalic" activeName="italic" icon={<Italic size={16} />} />
          <MenuButton editor={editor} command="toggleUnderline" activeName="underline" icon={<UnderlineIcon size={16} />} />
          <MenuButton editor={editor} command="toggleStrike" activeName="strike" icon={<Strikethrough size={16} />} />
          <MenuButton editor={editor} command="toggleCode" activeName="code" icon={<Code size={16} />} />
          
          <div className="w-px h-5 bg-gray-700 mx-1"></div>
          
          <button
            onClick={() => {
              if (editor.isActive('link')) {
                editor.chain().focus().unsetLink().run();
              } else {
                setIsLinkMode(true);
                setUrl(editor.getAttributes('link').href || '');
              }
            }}
            className={`p-2.5 transition-colors hover:bg-gray-700 ${editor.isActive('link') ? 'text-blue-400 bg-gray-800' : 'text-gray-300'}`}
          >
            {editor.isActive('link') ? <Unlink size={16} /> : <LinkIcon size={16} />}
          </button>
        </>
      )}
    </div>
  );
}

function MenuButton({ editor, command, activeName, icon }) {
  return (
    <button
      onClick={() => editor.chain().focus()[command]().run()}
      className={`p-2.5 transition-colors hover:bg-gray-700 ${editor.isActive(activeName) ? 'text-blue-400 bg-gray-800' : 'text-gray-300'}`}
    >
      {icon}
    </button>
  );
}