import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import BookmarkNode from '../components/BookmarkNode';

export default Node.create({
  name: 'bookmark',
  group: 'block',
  atom: true, // This tells Tiptap this block is a single unit (can't type standard text inside it)

  addAttributes() {
    return {
      url: { default: null },
      title: { default: null },
      description: { default: null },
      image: { default: null },
      publisher: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="bookmark"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'bookmark' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BookmarkNode);
  },
});