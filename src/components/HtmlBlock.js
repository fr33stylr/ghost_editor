import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import HtmlBlockNode from './HtmlBlockNode';

export default Node.create({
  name: 'htmlblock',
  group: 'block',
  atom: true, // This tells Tiptap to treat the whole block as one erasable unit
  parseHTML() {
    return [{ tag: 'div[data-type="htmlblock"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'htmlblock' })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(HtmlBlockNode);
  },
});