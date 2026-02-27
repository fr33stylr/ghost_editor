import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Editor from './components/Editor';
import PostList from './components/PostList';
import { usePostStore } from './store/usePostStore';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  const activePostId = usePostStore((state) => state.activePostId);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-200">
        {activePostId ? <Editor /> : <PostList />}
      </div>
    </QueryClientProvider>
  );
} 