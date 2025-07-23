import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 flex-shrink-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">LaravelGenie</span>
            <span className="text-gray-500">v2.0</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <a 
                href="https://laravel.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                Laravel Docs
              </a>
              <a 
                href="https://claude.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                Claude AI
              </a>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">
                Made with ❤️ for Laravel developers
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Generate Laravel boilerplate code with AI assistance. Always review generated code before using in production.
          </p>
        </div>
      </div>
    </footer>
  )
}