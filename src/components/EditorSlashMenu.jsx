import { useState, useEffect } from 'react';
import { Type, Heading1, Heading2, List, ListOrdered, Quote, Minus } from 'lucide-react';

export default function EditorSlashMenu({ editor }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!editor) return;

    const updateSlashMenu = () => {
      const { state, view } = editor;
      const { selection } = state;
      const { $from } = selection;

      // Get the text of the paragraph the cursor is currently in
      const currentText = $from.parent.textContent;
      
      // Only show the menu if the line is exactly "/"
      if (currentText === '/' && selection.empty) {
        const coords = view.coordsAtPos(selection.from);
        setPosition({ 
          top: coords.top + 30, // Drop down 30px below the text
          left: coords.left 
        });
        setShow(true);
      } else {
        setShow(false);
      }
    };

    editor.on('update', updateSlashMenu);
    editor.on('selectionUpdate', updateSlashMenu);

    return () => {
      editor.off('update', updateSlashMenu);
      editor.off('selectionUpdate', updateSlashMenu);
    };
  }, [editor]);

  if (!show) return null;

  // This function deletes the "/" you typed and inserts the chosen block
  const executeCommand = (action) => {
    const { from } = editor.state.selection;
    
    editor
      .chain()
      .focus()
      // Delete the "/" character
      .deleteRange({ from: from - 1, to: from })
      .run();

    // Run the specific block command (passed in from the buttons below)
    action();
    setShow(false);
  };

  const blocks = [
    { name: 'Text', icon: <Type size={18} />, action: () => editor.chain().focus().setParagraph().run() },
    { name: 'Heading 1', icon: <Heading1 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { name: 'Heading 2', icon: <Heading2 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { name: 'Bullet List', icon: <List size={18} />, action: () => editor.chain().focus().toggleBulletList().run() },
    { name: 'Numbered List', icon: <ListOrdered size={18} />, action: () => editor.chain().focus().toggleOrderedList().run() },
    { name: 'Quote', icon: <Quote size={18} />, action: () => editor.chain().focus().toggleBlockquote().run() },
    { name: 'Divider', icon: <Minus size={18} />, action: () => editor.chain().focus().setHorizontalRule().run() },
  ];

  return (
    <div 
      style={{ top: position.top, left: position.left }}
      className="fixed z-50 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden py-2"
      onMouseDown={(e) => e.preventDefault()} // Keeps editor focused
    >
      <div className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Basic Blocks
      </div>
      <div className="flex flex-col max-h-[300px] overflow-y-auto">
        {blocks.map((block) => (
          <button
            key={block.name}
            onClick={() => executeCommand(block.action)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gray-50 border border-gray-200 rounded-md text-gray-500">
              {block.icon}
            </div>
            <span className="font-medium">{block.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}