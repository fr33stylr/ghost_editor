import { ChevronLeft, Loader2, CloudOff, CheckCircle } from 'lucide-react';
import { useEditorStore } from '../store/useEditorStore';

export default function EditorHeader() {
  const saveStatus = useEditorStore((state) => state.saveStatus);

  return (
    <header className="sticky top-8 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Back Button & Status */}
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-md px-2 py-1"
          >
            <ChevronLeft size={16} />
            <span>Posts</span>
          </button> 
          
          <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>

          {/* Dynamic Save Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-400">
            {saveStatus === 'saving' && (
              <><Loader2 size={14} className="animate-spin text-blue-500" /> Saving...</>
            )}
            {saveStatus === 'saved' && (
              <><CheckCircle  size={14} className="text-green-500" /> Saved</>
            )}
            {saveStatus === 'error' && (
              <><CloudOff size={14} className="text-red-500" /> Save failed</>
            )}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-white bg-black border border-gray-200 hover:bg-gray-50 hover:text-gray-900 px-4 py-1.5 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 shadow-sm disabled:opacity-50">
            Preview
          </button>
          <button className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 shadow-sm shadow-green-600/20 active:scale-95">
            Publish
          </button>
        </div>
      </div>
    </header>
  );
}