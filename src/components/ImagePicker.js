import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImagePickerNode from './ImagePickerNode';

export default Node.create({
  name: 'imagepicker',
  group: 'block',
  atom: true, // Treats the UI as a single block that can be easily deleted
  parseHTML() {
    return [{ tag: 'div[data-type="imagepicker"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'imagepicker' })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImagePickerNode);
  },
});