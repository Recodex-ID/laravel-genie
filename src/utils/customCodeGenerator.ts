import type { GeneratedCode } from '../types'

export const generateCustomCode = async (prompt: string): Promise<GeneratedCode[]> => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const enhancedPrompt = `Generate a complete Laravel module based on this requirement:

"${prompt}"

Please follow these Laravel Best Practices strictly:

**Architecture Requirements:**
- Single Responsibility Principle: Each class/method should have one responsibility
- Fat Models, Skinny Controllers: Move DB logic to models
- Use Form Request classes for validation (never validate in controllers)
- Use proper type hints and return types
- Use descriptive method names instead of comments

**Code Quality Standards:**
- Use Eloquent over Query Builder and raw SQL
- Use mass assignment with fillable properties
- Use Eloquent relationships and scopes
- Use collections over arrays
- Use dependency injection instead of 'new Class'
- Use shorter Laravel syntax where possible (session('key') not Session::get('key'))

**Naming Conventions (CRITICAL):**
- Controller: singular (PostController, not PostsController)
- Model: singular (Post)
- Table: plural, snake_case (posts)
- Methods: camelCase
- Variables: camelCase
- Database columns: snake_case
- Migration files: descriptive with timestamp format

**Files to Generate (as needed):**
- Models with relationships, scopes, and business logic
- Migrations with proper column types and constraints
- Controllers with CRUD operations (thin controllers)
- Form Request classes for validation
- Seeders with realistic sample data
- Factories for testing
- API Resources if API endpoints needed
- Routes (web.php and api.php)
- Views (Blade templates) if web interface needed

**Special Features to Include:**
- Authentication and authorization where appropriate
- File upload handling if mentioned
- Search and filtering functionality
- Proper error handling
- Input validation and sanitization
- Database indexing for performance
- Soft deletes where appropriate

IMPORTANT RESPONSE FORMAT:
Please provide each file in the following format:

\`\`\`php
// app/Models/Post.php
<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Post extends Model
{
    // code here
}
\`\`\`

\`\`\`php
// database/migrations/2024_01_01_000000_create_posts_table.php
<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    // code here
};
\`\`\`

Make sure each file is wrapped in \`\`\`php code blocks with a comment showing the file path.
Create a complete, production-ready Laravel module that follows all best practices.`

  try {
    const response = await fetch(`${apiUrl}/api/generate-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: enhancedPrompt
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
      throw new Error('Invalid response format from Claude API')
    }
    
    const content = data.content[0]?.text
    
    if (!content || typeof content !== 'string') {
      throw new Error('No content received from Claude API')
    }

    // Parse the AI response and extract individual files
    const generatedFiles: GeneratedCode[] = []
    
    // Parse code blocks with file path comments
    const codeBlockPattern = /\`\`\`(?:php)?\s*(?:\/\/\s*(.+?\.(?:php|blade\.php)))?\s*([\s\S]*?)\`\`\`/g
    let match
    let fileIndex = 1
    
    while ((match = codeBlockPattern.exec(content)) !== null) {
      const filename = match[1]?.trim()
      const fileContent = match[2]?.trim()
      
      if (fileContent && (fileContent.includes('<?php') || fileContent.includes('class ') || fileContent.includes('namespace ') || fileContent.includes('Route::'))) {
        // Clean filename - extract just the filename without path
        let cleanFilename = filename || `generated_file_${fileIndex}.php`
        cleanFilename = cleanFilename.replace(/.*[/\\]/, '')
        
        // Determine file type and set appropriate filename if not provided
        if (!filename) {
          if (fileContent.includes('extends Model')) {
            cleanFilename = `Model_${fileIndex}.php`
          } else if (fileContent.includes('extends Controller')) {
            cleanFilename = `Controller_${fileIndex}.php`
          } else if (fileContent.includes('extends Migration')) {
            cleanFilename = `Migration_${fileIndex}.php`
          } else if (fileContent.includes('extends Seeder')) {
            cleanFilename = `Seeder_${fileIndex}.php`
          } else if (fileContent.includes('extends Factory')) {
            cleanFilename = `Factory_${fileIndex}.php`
          } else if (fileContent.includes('extends FormRequest')) {
            cleanFilename = `Request_${fileIndex}.php`
          } else if (fileContent.includes('extends JsonResource')) {
            cleanFilename = `Resource_${fileIndex}.php`
          } else if (fileContent.includes('Route::')) {
            cleanFilename = filename?.includes('api') ? 'api.php' : 'web.php'
          } else if (fileContent.includes('@extends') || fileContent.includes('@section')) {
            cleanFilename = `view_${fileIndex}.blade.php`
          }
        }
        
        // Clean content - ensure proper PHP opening tag
        let cleanContent = fileContent.trim()
        if (!cleanContent.startsWith('<?php') && 
            !cleanContent.startsWith('@extends') && 
            !cleanContent.startsWith('@section') &&
            (cleanContent.includes('class ') || cleanContent.includes('namespace ') || cleanContent.includes('use ') || cleanContent.includes('Route::'))) {
          cleanContent = '<?php\n\n' + cleanContent
        }
        
        // Determine language based on file extension
        const language = cleanFilename.includes('.blade.php') ? 'html' : 
                        cleanFilename.includes('.php') ? 'php' : 'text'
        
        generatedFiles.push({
          filename: cleanFilename,
          content: cleanContent,
          language
        })
        
        fileIndex++
      }
    }

    // If no files were parsed successfully, return the entire content
    if (generatedFiles.length === 0) {
      generatedFiles.push({
        filename: 'generated_module.php',
        content: content,
        language: 'php'
      })
    }

    return generatedFiles
  } catch (error) {
    console.error('Error calling Claude API:', error)
    
    if (error instanceof Error) {
      throw new Error(`Claude AI Generation Failed: ${error.message}`)
    }
    
    throw new Error('Unknown error occurred while generating code with Claude AI')
  }
}