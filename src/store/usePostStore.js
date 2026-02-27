import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export const usePostStore = create(
  persist(
    (set, get) => ({
      posts: [],
      activePostId: null,
      saveStatus: 'saved', // 'saving' | 'saved' | 'failed'

      // Create a brand new post and make it active
      createPost: () => {
        const newPost = {
          id: uuidv4(),
          title: '',
          content: '',
          coverImage: null,
          updatedAt: Date.now(),
        };
        set((state) => ({
          posts: [newPost, ...state.posts],
          activePostId: newPost.id,
        }));
        return newPost.id;
      },

      // Update the content of the current active post
      updateActivePost: (updates) => {
        const { activePostId, posts } = get();
        if (!activePostId) return;

        set((state) => ({
          saveStatus: 'saving',
          posts: state.posts.map((post) =>
            post.id === activePostId
              ? { ...post, ...updates, updatedAt: Date.now() }
              : post
          ),
        }));

        // Simulate a small delay for the "Saving..." UI feel
        setTimeout(() => {
          set({ saveStatus: 'saved' });
        }, 600);
      },

      setActivePost: (id) => set({ activePostId: id }),

      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
          activePostId: state.activePostId === id ? null : state.activePostId,
        }));
      },
    }),
    {
      name: 'ghost-posts-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);