import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import FieldBasedGenerator from './components/FieldBasedGenerator'
import CustomPromptGenerator from './components/CustomPromptGenerator'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm border-b flex-shrink-0">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LaravelGenie</h1>
                <p className="text-gray-600">AI-powered Laravel boilerplate code generator</p>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Powered by Claude AI</span>
              </div>
            </div>
          </div>
        </header>
        
        <Navigation />
        
        <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
          <Routes>
            <Route path="/" element={<FieldBasedGenerator />} />
            <Route path="/custom" element={<CustomPromptGenerator />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App