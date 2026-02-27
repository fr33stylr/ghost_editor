import { ChevronLeft, PanelRight } from 'lucide-react';
import { usePostStore } from '../store/usePostStore';

export default function EditorHeader() {
  // 1. Grab the navigation and status from the store
  const { setActivePost, saveStatus } = usePostStore();

  return (
    <header className="sticky top-2 z-40 w-full bg-white/80 backdrop-blur-sm flex items-center justify-between px-4 py-3 sm:px-8 border-b border-gray-100">
      
      <div className="flex items-center gap-6">
        {/* 2. Clicking this sets the ID to null, triggering App.jsx to show PostList */}
        <button 
          onClick={() => setActivePost(null)}
          className="flex items-center gap-1.5 text-gray-900 hover:bg-gray-100 transition-colors rounded-lg px-2 py-2 font-semibold text-sm sm:text-base -ml-2"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          Posts
        </button>
        
        {/* 3. Dynamic save status indicator */}
        <span className="text-gray-400 text-xs sm:text-sm font-sans transition-all">
          {saveStatus === 'saving' ? 'Saving...' :'Draft-Saved'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors ml-2" title="Settings">
          <PanelRight size={22} strokeWidth={1.5} />
        </button>

        <button className="px-4 py-1.5 text-sm font-medium text-black bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-200">
          Preview
        </button>
        
        <button className="px-4 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm">
          Publish
        </button>
      </div>
      
    </header>
  );
}