import Editor from './components/Editor'

export default function App() {
  return (
    // The Editor component now contains the full page layout (Header + Body)
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-200">
      <Editor />
    </div>
  )
}