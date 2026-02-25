import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Editor from './components/Editor';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-200">
        <Editor />
      </div>
    </QueryClientProvider>
  );
}