Ghost-Style Rich Text Editor
A high-performance, minimalist content editor built with React, Tiptap, and Zustand. This project features a robust local-first data persistence model and a Ghost-inspired user interface.

🚀 Setup Steps
Clone and Install:

Bash

git clone <your-repo-url>
cd ghost-editor
npm install
Required Dependencies:
Ensure these specific packages are installed:

Bash

npm install @tiptap/react @tiptap/starter-kit lucide-react zustand @tanstack/react-query date-fns uuid
Run Development Server:

Bash

npm run dev
✨ Feature List
Ghost-Inspired Editor: Minimalist writing interface with a floating + menu and bubble formatting menu.

Local Persistence: All posts are autosaved to localStorage using Zustand middleware.

Media Support:

Local Uploads: Native file picker for cover images and inline photos.

Unsplash Integration: Inline image picker powered by TanStack Query and the Picsum API.

Embeds: Support for YouTube and custom HTML blocks.

Post Management: Full Dashboard UI to create, search, and delete posts with custom modal confirmations.

Autosave: Debounced saving mechanism to ensure performance during fast typing.

🏗️ Architecture Notes
Store Shape (Zustand)
The state is managed in a central usePostStore. Data is persisted as an array of objects to allow for multiple documents.

JavaScript

{
  posts: [
    {
      id: "uuid-v4",
      title: "Post Title",
      content: "<p>HTML Content</p>",
      coverImage: "blob-url-or-base64",
      updatedAt: 1700000000000
    }
  ],
  activePostId: "uuid-v4" || null,
  saveStatus: "saved" || "saving"
}
Editor Nodes & Extensions
Custom Nodes: ImagePicker, Youtube, Bookmark, and HtmlBlock.

Floating Menu: Positioned dynamically based on the editor's cursor position; closes automatically on scroll.

Query Usage
@tanstack/react-query is used specifically for the ImagePicker to handle fetching, caching, and loading states for external image APIs without cluttering the global store.

⚖️ Tradeoffs & Known Issues
Tradeoffs
Local-First: We chose localStorage for speed and zero-cost hosting. However, this means data is "siloed" to a single browser.

Blob URLs: Current cover images use URL.createObjectURL. These URLs are temporary and will break if the browser is restarted.

Known Issues
Storage Limits: localStorage has a limit (approx. 5MB). Large numbers of posts or high-res Base64 images may eventually cause a QuotaExceededError.

Vite Import Analysis: If uuid or date-fns are missing from node_modules, Vite will fail to resolve the build until npm install is re-run.