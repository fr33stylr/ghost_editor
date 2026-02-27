import React,{ useState } from 'react';
import { usePostStore } from '../store/usePostStore';
import { Plus, Search, Edit2, Trash2, FileText } from 'lucide-react';
import { formatDistanceToNow, set } from 'date-fns';
import DeleteModal from './DeleteModal';

export default function PostList() {
  const { posts, createPost, setActivePost, deletePost } = usePostStore();
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  
  const filteredPosts = posts
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const handleConfirmDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete.id);
      setIsModalOpen(false);
      setPostToDelete(null);
    }
  };
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 font-sans">Posts</h1>
        <button 
          onClick={createPost}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} /> New post
        </button>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text"
          placeholder="Search Posts"
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-1 border-t border-gray-100">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="group flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 px-2 transition-colors rounded-lg">
              <div className="flex-1 cursor-pointer" onClick={() => setActivePost(post.id)}>
                <h3 className="font-semibold text-gray-900 truncate">
                  {post.title || "Untitled Post"}
                </h3>
                <p className="text-sm text-gray-500">
                  {post.content ? "Content exists" : "Empty post"} • {formatDistanceToNow(post.updatedAt)} ago
                </p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setActivePost(post.id)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md">
                  <Edit2 size={16} />
                </button>
                <button 
                onClick={(e) => {
                    e.stopPropagation(); 
                    setPostToDelete(post);
                    setIsModalOpen(true);
                }} 
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200 mt-4">
             <FileText className="mx-auto text-gray-300 mb-4" size={48} />
             <p className="text-gray-500">No posts found. Create your first story!</p>
          </div>
        )}
      </div>
      <DeleteModal 
        isOpen={isModalOpen}
        postTitle={postToDelete?.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}