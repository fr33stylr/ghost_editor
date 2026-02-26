import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import YoutubeNode from './YoutubeNode';

export default Node.create({
  name: 'youtube',
  group: 'block',
  atom: true,
  addAttributes() {
    return { url: { default: '' } };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="youtube"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'youtube' })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(YoutubeNode);
  },
});