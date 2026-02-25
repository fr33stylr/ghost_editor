import { create } from 'zustand';

export const useEditorStore = create((set) => ({
    title:'',
    content:'',
    saveStatus:'saved',
    setTitle: (newTitle) => set({ title: newTitle }),
    setContent: (newContent) => set({ content: newContent }),
    setSaveStatus: (status) => set({ saveStatus: status }),
}));