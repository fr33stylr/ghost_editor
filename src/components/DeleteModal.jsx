import React from 'react';
import { AlertCircle } from 'lucide-react';

// Ensure 'export default' is right here
export default function DeleteModal({ isOpen, onConfirm, onCancel, postTitle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]" 
        onClick={onCancel} 
      />
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Delete this post?</h3>
              <p className="text-sm text-gray-500">This action cannot be undone.</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 italic mb-6">
            "{postTitle || 'Untitled Post'}"
          </p>

          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              Delete Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}