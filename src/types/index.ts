export interface Field {
  id: string
  name: string
  type: string
  options: string[]
}

export interface GeneratedCode {
  filename: string
  content: string
  language: string
}