import { useState } from 'react'
import type { Field } from '../types'

interface CodeFormProps {
  resourceName: string
  setResourceName: (name: string) => void
  fields: Field[]
  setFields: (fields: Field[]) => void
  selectedFiles: string[]
  setSelectedFiles: (files: string[]) => void
  onGenerate: () => void
  isGenerating: boolean
}

const fieldTypes = [
  'string',
  'integer',
  'boolean',
  'text',
  'date',
  'datetime',
  'timestamp',
  'decimal',
  'float',
  'json',
  'enum'
]

const fieldOptions = [
  'nullable',
  'unique',
  'index',
  'primary',
  'unsigned',
  'autoIncrement'
]

const laravelFiles = [
  { id: 'model', label: 'Model', description: 'Eloquent model class' },
  { id: 'migration', label: 'Migration', description: 'Database migration file' },
  { id: 'controller', label: 'Controller', description: 'Resource controller' },
  { id: 'api_controller', label: 'API Controller', description: 'API resource controller' },
  { id: 'seeder', label: 'Seeder', description: 'Database seeder' },
  { id: 'factory', label: 'Factory', description: 'Model factory' },
  { id: 'request', label: 'Form Request', description: 'Validation request class' },
  { id: 'resource', label: 'API Resource', description: 'API resource transformer' }
]

export default function CodeForm({
  resourceName,
  setResourceName,
  fields,
  setFields,
  selectedFiles,
  setSelectedFiles,
  onGenerate,
  isGenerating
}: CodeFormProps) {
  const [newField, setNewField] = useState<Omit<Field, 'id'>>({
    name: '',
    type: 'string',
    options: []
  })

  const addField = () => {
    if (newField.name) {
      setFields([...fields, { ...newField, id: Date.now().toString() }])
      setNewField({ name: '', type: 'string', options: [] })
    }
  }

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(
      selectedFiles.includes(fileId)
        ? selectedFiles.filter(id => id !== fileId)
        : [...selectedFiles, fileId]
    )
  }

  const toggleFieldOption = (option: string) => {
    setNewField({
      ...newField,
      options: newField.options.includes(option)
        ? newField.options.filter(opt => opt !== option)
        : [...newField.options, option]
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resource Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="resourceName" className="block text-sm font-medium text-gray-700 mb-1">
              Resource Name
            </label>
            <input
              type="text"
              id="resourceName"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              placeholder="e.g., Post, UserProfile, Category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-3">Fields</h3>
        
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              value={newField.name}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              placeholder="Field name"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={newField.type}
              onChange={(e) => setNewField({ ...newField, type: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {fieldTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button
              onClick={addField}
              disabled={!newField.name}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {fieldOptions.map(option => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={newField.options.includes(option)}
                  onChange={() => toggleFieldOption(option)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-1 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {fields.map(field => (
            <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <span className="font-medium text-gray-900">{field.name}</span>
                <span className="text-gray-500 ml-2">({field.type})</span>
                {field.options.length > 0 && (
                  <span className="text-blue-600 ml-2 text-sm">
                    [{field.options.join(', ')}]
                  </span>
                )}
              </div>
              <button
                onClick={() => removeField(field.id)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-3">Generate Files</h3>
        <div className="grid grid-cols-1 gap-2">
          {laravelFiles.map(file => (
            <label key={file.id} className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedFiles.includes(file.id)}
                onChange={() => toggleFileSelection(file.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">{file.label}</div>
                <div className="text-sm text-gray-500">{file.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={!resourceName || selectedFiles.length === 0 || isGenerating}
        className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Generate Code'}
      </button>
    </div>
  )
}