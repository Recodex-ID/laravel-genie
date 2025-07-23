import { NavLink } from 'react-router-dom'
import { LayoutGrid, Pencil } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-4 px-1 border-b-2 font-medium text-sm ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`
            }
          >
            <div className="flex items-center space-x-2">
              <LayoutGrid className="w-5 h-5" />
              <span>Field-Based Generator</span>
            </div>
          </NavLink>
          
          <NavLink
            to="/custom"
            className={({ isActive }) =>
              `py-4 px-1 border-b-2 font-medium text-sm ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`
            }
          >
            <div className="flex items-center space-x-2">
              <Pencil className="w-5 h-5" />
              <span>Custom Prompt Generator</span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}