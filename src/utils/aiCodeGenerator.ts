import type { Field, GeneratedCode } from '../types'

interface AICodeGenerationRequest {
  resourceName: string
  fields: Field[]
  selectedFiles: string[]
}

export const generateCodeWithAI = async ({ resourceName, fields, selectedFiles }: AICodeGenerationRequest): Promise<GeneratedCode[]> => {
  // Get API URL from environment variables
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const fileDescriptions = {
    model: 'Eloquent model class',
    migration: 'Database migration file', 
    controller: 'Resource controller',
    api_controller: 'API resource controller',
    seeder: 'Database seeder',
    factory: 'Model factory',
    request: 'Form request validation class',
    resource: 'API resource transformer'
  }

  const prompt = `Generate Laravel boilerplate code for a resource named "${resourceName}" with the following fields:

${fields.map(field => `- ${field.name}: ${field.type} ${field.options.length > 0 ? `(${field.options.join(', ')})` : ''}`).join('\n')}

Please generate the following Laravel files: ${selectedFiles.map(file => `${file} (${fileDescriptions[file as keyof typeof fileDescriptions] || file})`).join(', ')}

CRITICAL: Follow these Laravel Best Practices strictly:

**Naming Conventions:**
- Controller: singular (${resourceName}Controller, not ${resourceName}sController)
- Model: singular (${resourceName})
- Table: plural, snake_case (${resourceName.toLowerCase()}s)
- Methods: camelCase
- Variables: camelCase
- Database columns: snake_case

**Architecture Principles:**
- Single Responsibility Principle: Each class/method should have one responsibility
- Fat Models, Skinny Controllers: Move DB logic to models
- Use Form Request classes for validation (never validate in controllers)
- Use proper type hints and return types
- Use descriptive method names instead of comments

**Code Quality:**
- Use Eloquent over Query Builder and raw SQL
- Use mass assignment with fillable properties
- Use Eloquent relationships and scopes
- Use collections over arrays
- Use dependency injection instead of 'new Class'
- Use config() helper instead of env() directly
- Use shorter Laravel syntax where possible (session('key') not Session::get('key'))

**Migration Best Practices:**
- Use appropriate column types
- Add proper indexes and constraints
- Follow Laravel migration naming conventions

**Model Best Practices:**
- Define fillable properties
- Use appropriate casts for dates/json
- Create scopes for reusable queries
- Define relationships properly

**Controller Best Practices:**
- Use dependency injection
- Use Form Request for validation
- Keep methods thin - delegate to services/models
- Use resource controller methods (index, create, store, show, edit, update, destroy)

**Request Class Best Practices:**
- Use proper validation rules
- Use Laravel validation syntax
- Include authorization logic if needed

**Examples of GOOD practices to follow:**

Controllers should be thin:
\`\`\`php
public function store(${resourceName}Request $request)
{
    $${resourceName.toLowerCase()} = $this->${resourceName.toLowerCase()}->create($request->validated());
    return redirect()->route('${resourceName.toLowerCase()}s.index');
}
\`\`\`

Models should have business logic:
\`\`\`php
class ${resourceName} extends Model
{
    protected $fillable = ['field1', 'field2'];
    
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
\`\`\`

Use mass assignment:
\`\`\`php
${resourceName}::create($request->validated());
// NOT: $model = new ${resourceName}; $model->field = $value; $model->save();
\`\`\`

Use shorter syntax:
\`\`\`php
return back(); // NOT: return Redirect::back();
session('key'); // NOT: Session::get('key');
\`\`\`

IMPORTANT RESPONSE FORMAT:
Please provide each file in the following format:

\`\`\`php
// app/Models/${resourceName}.php
<?php

namespace App\\Models;

class ${resourceName} extends Model
{
    // code here
}
\`\`\`

\`\`\`php
// database/migrations/create_${resourceName.toLowerCase()}s_table.php
<?php

use Illuminate\\Database\\Migrations\\Migration;

return new class extends Migration
{
    // code here
};
\`\`\`

Make sure each file is wrapped in \`\`\`php code blocks with a comment showing the file path.
Make the code production-ready and follow all Laravel conventions exactly.`

  try {
    const response = await fetch(`${apiUrl}/api/generate-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt
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
    
    // First, try to identify file markers in the response
    const fileMarkers = [
      /```php\s*(?:\/\/\s*(.+?\.php))?\s*([\s\S]*?)```/g,
      /(?:^|\n)(?:\/\/|#)\s*(.+?\.php)\s*\n([\s\S]*?)(?=(?:\n(?:\/\/|#)\s*.+?\.php)|$)/g,
      /(?:Model|Controller|Migration|Seeder|Factory|Request|Resource):\s*(.+?\.php)\s*([\s\S]*?)(?=(?:Model|Controller|Migration|Seeder|Factory|Request|Resource):|$)/g
    ]
    
    let foundFiles = false
    
    // Try each parsing method
    for (const marker of fileMarkers) {
      let match
      while ((match = marker.exec(content)) !== null) {
        const filename = match[1]?.trim() || 'generated_file.php'
        const fileContent = match[2]?.trim() || ''
        
        if (fileContent && (fileContent.includes('<?php') || fileContent.includes('class ') || fileContent.includes('function '))) {
          // Clean filename - extract just the filename without path
          const cleanFilename = filename.replace(/.*[/\\]/, '').replace(/^.*?([A-Za-z0-9_-]+\.php)$/, '$1')
          
          // Clean content - ensure it starts with <?php if it's PHP code
          let cleanContent = fileContent.trim()
          if (!cleanContent.startsWith('<?php') && (cleanContent.includes('class ') || cleanContent.includes('namespace ') || cleanContent.includes('use '))) {
            cleanContent = '<?php\n\n' + cleanContent
          }
          
          generatedFiles.push({
            filename: cleanFilename,
            content: cleanContent,
            language: 'php'
          })
          foundFiles = true
        }
      }
      
      if (foundFiles) break
    }
    
    // If no structured files found, try simpler approach
    if (!foundFiles) {
      // Look for code blocks or PHP content
      const codeBlockPattern = /```(?:php)?\s*([\s\S]*?)```/g
      let match
      let fileIndex = 1
      
      while ((match = codeBlockPattern.exec(content)) !== null) {
        const fileContent = match[1]?.trim()
        if (fileContent && (fileContent.includes('<?php') || fileContent.includes('class ') || fileContent.includes('namespace '))) {
          // Try to determine file type from content
          let filename = 'generated_file.php'
          if (fileContent.includes('extends Model')) {
            filename = `${resourceName}.php`
          } else if (fileContent.includes('extends Controller')) {
            filename = `${resourceName}Controller.php`
          } else if (fileContent.includes('extends Migration')) {
            filename = `create_${resourceName.toLowerCase()}s_table.php`
          } else if (fileContent.includes('extends Seeder')) {
            filename = `${resourceName}Seeder.php`
          } else if (fileContent.includes('extends Factory')) {
            filename = `${resourceName}Factory.php`
          } else if (fileContent.includes('extends FormRequest')) {
            filename = `Store${resourceName}Request.php`
          } else if (fileContent.includes('extends JsonResource')) {
            filename = `${resourceName}Resource.php`
          } else {
            filename = `generated_file_${fileIndex}.php`
            fileIndex++
          }
          
          let cleanContent = fileContent.trim()
          if (!cleanContent.startsWith('<?php') && (cleanContent.includes('class ') || cleanContent.includes('namespace ') || cleanContent.includes('use '))) {
            cleanContent = '<?php\n\n' + cleanContent
          }
          
          generatedFiles.push({
            filename,
            content: cleanContent,
            language: 'php'
          })
          foundFiles = true
        }
      }
    }

    // If no files were parsed successfully, return the entire content
    if (generatedFiles.length === 0) {
      generatedFiles.push({
        filename: 'generated_code.php',
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