import { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import type { GeneratedCode } from '../types'
import { FileCode, ChevronRight, Copy } from 'lucide-react'

interface CodePreviewProps {
  generatedCode: GeneratedCode[]
}

export default function CodePreview({ generatedCode }: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkScrollable = () => {
      if (tabsRef.current) {
        const { scrollWidth, clientWidth } = tabsRef.current
        setShowScrollIndicator(scrollWidth > clientWidth)
      }
    }

    checkScrollable()
    window.addEventListener('resize', checkScrollable)
    return () => window.removeEventListener('resize', checkScrollable)
  }, [generatedCode])

  useEffect(() => {
    setActiveTab(0)
  }, [generatedCode])

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  if (generatedCode.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <FileCode className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No code generated yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure your resource and click "Generate Code" to see the Laravel files here.
          </p>
        </div>
      </div>
    )
  }

  const currentCode = generatedCode[activeTab]

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 relative">
        <div 
          ref={tabsRef}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          <nav className="flex space-x-2 px-4 min-w-max" aria-label="Tabs">
            {generatedCode.map((code, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`${
                  activeTab === index
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                } whitespace-nowrap py-3 px-3 border-b-2 font-medium text-xs rounded-t-md transition-colors flex-shrink-0 max-w-[160px]`}
                title={code.filename}
              >
                <span className="truncate block">
                  {code.filename}
                </span>
              </button>
            ))}
          </nav>
        </div>
        
        {showScrollIndicator && generatedCode.length > 3 && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md px-2 py-1">
            <div className="flex items-center space-x-1 text-gray-400">
              <ChevronRight className="w-3 h-3" />
              <span className="text-xs">{generatedCode.length - 3}+</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
          <span className="text-sm font-medium text-gray-700">
            {currentCode.filename}
          </span>
          <button
            onClick={() => copyToClipboard(currentCode.content)}
            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </button>
        </div>

        <div className="flex-1">
          <Editor
            height="100%"
            language={currentCode.language}
            value={currentCode.content}
            theme="vs-light"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              lineNumbers: 'on',
              wordWrap: 'on',
              folding: true,
              selectOnLineNumbers: true,
              automaticLayout: true
            }}
          />
        </div>
      </div>
    </div>
  )
}