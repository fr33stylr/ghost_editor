export const fetchBookmarkMetadata = async (url) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return mock data mimicking your screenshot
  return {
    url,
    title: 'AI Website Builder | CodeDesign.ai',
    description: 'Create Stunning AI-Powered Websites Effortlessly with CodeDesign – Advanced Tools for Beautiful, Functional Web...',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=600',
    publisher: 'CodeDesign.ai'
  };
};