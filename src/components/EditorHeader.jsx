import { ChevronLeft, PanelRight } from 'lucide-react';
import { useEditorStore } from '../store/useEditorStore';

export default function EditorHeader() {
  const { saveStatus } = useEditorStore();

  return (
    <header className="sticky top-2 z-40 w-full bg-white flex items-center justify-between px-4 py-4 sm:px-8">
      
      <div className="flex items-center gap-6 ">
        <button className="flex items-center gap-1.5 text-gray-900 hover:bg-gray-100 transition-colors rounded-lg px-2 py-2 font-semibold text-sm sm:text-base -ml-2">
          <ChevronLeft size={18} strokeWidth={2.5} />
          Posts
        </button>
        
        <span className="text-gray-400 text-sm">
          {saveStatus === 'saving' ? 'Saving...' : 'Draft - Saved'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors ml-2" title="Settings">
          <PanelRight size={22} strokeWidth={1.5} />
        </button>

        <button className="px-4 py-1.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-all duration-200">
          Preview
        </button>
        <button className="px-4 py-1.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
          Publish
        </button>
        
      </div>
      
    </header>
  );
}