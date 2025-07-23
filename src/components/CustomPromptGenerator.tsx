import { useState } from 'react'
import { generateCustomCode } from '../utils/customCodeGenerator'
import type { GeneratedCode } from '../types'
import CodePreview from './CodePreview'
import { Loader2, Info } from 'lucide-react'

export default function CustomPromptGenerator() {
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const code = await generateCustomCode(prompt)
      setGeneratedCode(code)
    } catch (error) {
      console.error('Error generating code:', error)
      setGeneratedCode([{
        filename: 'error.txt',
        content: `Error generating code: ${error instanceof Error ? error.message : 'Unknown error'}\\n\\nPlease check your API key and try again.`,
        language: 'text'
      }])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleClearAll = () => {
    setPrompt('')
    setGeneratedCode([])
  }

  const examplePrompts = [
    {
      title: "Blog System",
      prompt: "Create a complete blog system with Post model that has title, content, excerpt, published_at, and is_featured fields. Include Category relationship, User relationship for author, and all CRUD operations with admin panel."
    },
    {
      title: "E-commerce Product",
      prompt: "Generate an e-commerce product management system with Product model having name, description, price, stock, sku, images (JSON), and category_id. Include ProductCategory model, inventory tracking, and admin CRUD interface."
    },
    {
      title: "User Management",
      prompt: "Create a user management system with User model extending authentication, Profile model with bio, avatar, phone, address fields, Role and Permission system, and admin dashboard for user management."
    },
    {
      title: "Task Management",
      prompt: "Build a task management system with Task model having title, description, status, priority, due_date, assigned_to. Include Project model, TaskComment model, and team collaboration features."
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Prompt Generator</h2>
            <p className="text-sm text-gray-600 mb-4">
              Describe the Laravel module you want to create. Be specific about models, relationships, fields, and features you need.
            </p>
          </div>

          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Describe Your Laravel Module
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Create a complete blog system with Post and Category models. Post should have title, content, excerpt, published_at fields, and belong to Category and User. Include admin CRUD interface with validation and authentication."
              className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="mt-2 text-xs text-gray-500">
              {prompt.length}/2000 characters
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Example Prompts:</h3>
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example.prompt)}
                  className="text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-sm text-gray-900">{example.title}</div>
                  <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {example.prompt.substring(0, 100)}...
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Generating...
                </div>
              ) : (
                'Generate Complete Module'
              )}
            </button>
            
            <button
              onClick={handleClearAll}
              className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
            >
              Clear All
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <Info className="flex-shrink-0 w-5 h-5 text-blue-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Tips for Better Results</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Be specific about model fields and their types</li>
                    <li>Mention relationships between models</li>
                    <li>Specify if you need validation, authentication, or authorization</li>
                    <li>Include any special features like file uploads, search, or filtering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <CodePreview generatedCode={generatedCode} />
      </div>
    </div>
  )
}