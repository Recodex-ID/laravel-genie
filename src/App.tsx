import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
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
                <Sparkles className="w-5 h-5 text-blue-600" />
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