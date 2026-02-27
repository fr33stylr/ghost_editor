
# ✍️ Ghost-Style Rich Text Editor

A high-performance, minimalist content editor designed for a seamless writing experience. This platform leverages a local-first architecture with professional-grade typography and media handling, inspired by the Ghost CMS dashboard.

## 🛠️ Tech Stack

**Frontend:**

* **React (Vite):** Fast, modern UI library for reactive state management.
* **Tailwind CSS:** For professional, utility-first styling and Ghost-inspired aesthetics.
* **Tiptap Editor:** A headless wrapper for ProseMirror, providing complete control over rich-text behavior.
* **TanStack Query (React Query):** For efficient fetching and caching of external media assets.
* **Lucide React:** For clean, consistent iconography throughout the interface.

**State & Persistence:**

* **Zustand:** Lightweight state management with custom middleware.
* **LocalStorage:** Local-first persistence ensuring data remains available across browser sessions.

---

## ✨ Features by Module

### 📝 The Editor (Writing Mode)

* **Seamless Interface:** A distraction-free canvas with auto-resizing titles and serif typography.
* **Bubble Menu:** Contextual formatting bar that appears on text selection for Bold, Italic, and Link actions.
* **Floating Menu:** A dynamic `+` button on empty lines to insert images, YouTube embeds, or HTML blocks.
* **Cover Images:** Ability to upload, preview, and remove high-resolution post headers.
* **Autosave:** Real-time, debounced synchronization with the local store to prevent data loss.

### 📊 Post Dashboard (Management)

* **Search & Filter:** Real-time search functionality to navigate through large archives of content.
* **Post List:** Overview of all drafts with "Last Updated" timestamps and content status indicators.
* **CRUD Operations:** Create new stories instantly and delete unwanted drafts with a secure confirmation workflow.
* **Empty State:** A beautiful, centered "Get Started" screen for new users with no existing content.

### 🛠️ Media & Advanced Blocks

* **Unsplash/Picsum Picker:** Integrated image browser for quick content enrichment.
* **YouTube Embeds:** Native support for video embeds via URL.
* **HTML Blocks:** Raw code injection for custom layouts or embedded third-party widgets.

---

## 🗄️ Architecture Notes

The project follows a modular React architecture:

* **`App.jsx`**: Acts as the router, switching between `PostList` and `Editor` based on the `activePostId`.
* **`usePostStore.js`**: Centralized Zustand store managing the post array, active selection, and save status.
* **Custom Nodes**: Individual components for complex Tiptap extensions like `ImagePicker` and `HtmlBlock`.

---

## ⚖️ Tradeoffs & Known Issues

* **Storage Quota:** Browser `localStorage` is capped at approximately **5MB**.
* **Blob Persistence:** Uploaded cover images use `URL.createObjectURL`, which are session-based and will reset upon a hard browser refresh.
* **Local-First:** Data is stored locally in the user's browser; clearing browser data will remove all posts.

---

## 📸 Project Overview

### 1. Dashboard & Empty State

*Includes the "Start creating content" layout with centered navigation.*

<img width="1861" height="922" alt="image" src="https://github.com/user-attachments/assets/6973a78c-618d-41ff-9c20-dec85b1644b7" />

### 2. Rich Text Editor

*The distraction-free writing environment with custom floating menus and headers.*

<img width="1836" height="925" alt="image" src="https://github.com/user-attachments/assets/ad64e17b-4e9e-4c21-9d04-dcd83b647347" />

<img width="1835" height="911" alt="image" src="https://github.com/user-attachments/assets/6d68e2fd-7861-4847-93af-f9d79bc26b32" />


### 3. Post Management

*The searchable archive list with delete confirmation.*

<img width="1853" height="919" alt="image" src="https://github.com/user-attachments/assets/4f6204ba-5dfd-42e3-a089-aa3e2af8ca0a" />

<img width="1861" height="921" alt="image" src="https://github.com/user-attachments/assets/84665d8e-497f-4b98-af39-198d0b2e6ce4" />

---
