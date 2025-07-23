import { useState } from 'react'
import CodeForm from './CodeForm'
import CodePreview from './CodePreview'
import { generateCodeWithAI } from '../utils/aiCodeGenerator'
import type { Field, GeneratedCode } from '../types'

export default function FieldBasedGenerator() {
  const [resourceName, setResourceName] = useState('')
  const [fields, setFields] = useState<Field[]>([])
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const code = await generateCodeWithAI({
        resourceName,
        fields,
        selectedFiles
      })
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <CodeForm
          resourceName={resourceName}
          setResourceName={setResourceName}
          fields={fields}
          setFields={setFields}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <CodePreview
          generatedCode={generatedCode}
        />
      </div>
    </div>
  )
}