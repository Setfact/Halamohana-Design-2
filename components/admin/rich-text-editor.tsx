'use client'

import { useRef, useEffect, useState } from 'react'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Undo,
  Redo,
  RemoveFormatting,
  Eye,
  FileCode,
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  minHeight?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write content here...',
  minHeight = '320px',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isCodeView, setIsCodeView] = useState(false)
  const [codeValue, setCodeValue] = useState(value)

  useEffect(() => {
    if (editorRef.current && !isCodeView) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || ''
      }
    }
    setCodeValue(value)
  }, [value, isCodeView])

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      onChange(html)
      setCodeValue(html)
    }
  }

  const exec = (command: string, arg: string | undefined = undefined) => {
    if (isCodeView) return
    document.execCommand(command, false, arg)
    if (editorRef.current) {
      editorRef.current.focus()
      handleInput()
    }
  }

  const promptLink = () => {
    const url = window.prompt('Enter Link URL (e.g. https://hallamohana.co.id):')
    if (url) {
      exec('createLink', url)
    }
  }

  const promptImage = () => {
    const url = window.prompt('Enter Image URL:')
    if (url) {
      exec('insertImage', url)
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="rounded-sm border border-[#dde0cc] bg-white shadow-xs">
      {/* Word-like Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-[#dde0cc] bg-[#F8F9F4] p-2">
        {/* Undo / Redo */}
        <div className="flex items-center border-r border-[#dde0cc] pr-1 mr-1">
          <button
            type="button"
            onClick={() => exec('undo')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo size={14} />
          </button>
          <button
            type="button"
            onClick={() => exec('redo')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo size={14} />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center border-r border-[#dde0cc] pr-1 mr-1">
          <button
            type="button"
            onClick={() => exec('formatBlock', '<h1>')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Heading 1"
          >
            <Heading1 size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<h2>')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Heading 2"
          >
            <Heading2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<h3>')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Heading 3"
          >
            <Heading3 size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<p>')}
            className="rounded px-2 py-1 text-xs font-semibold text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Normal Paragraph"
          >
            Paragraph
          </button>
        </div>

        {/* Basic formatting: Bold, Italic, Underline, Strikethrough */}
        <div className="flex items-center border-r border-[#dde0cc] pr-1 mr-1">
          <button
            type="button"
            onClick={() => exec('bold')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors font-bold"
            title="Bold (Ctrl+B)"
          >
            <Bold size={14} />
          </button>
          <button
            type="button"
            onClick={() => exec('italic')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors italic"
            title="Italic (Ctrl+I)"
          >
            <Italic size={14} />
          </button>
          <button
            type="button"
            onClick={() => exec('underline')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors underline"
            title="Underline (Ctrl+U)"
          >
            <Underline size={14} />
          </button>
          <button
            type="button"
            onClick={() => exec('strikeThrough')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors line-through"
            title="Strikethrough"
          >
            <Strikethrough size={14} />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center border-r border-[#dde0cc] pr-1 mr-1">
          <button
            type="button"
            onClick={() => exec('justifyLeft')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Align Left"
          >
            <AlignLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyCenter')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Align Center"
          >
            <AlignCenter size={14} />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyRight')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Align Right"
          >
            <AlignRight size={14} />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyFull')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Justify"
          >
            <AlignJustify size={14} />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center border-r border-[#dde0cc] pr-1 mr-1">
          <button
            type="button"
            onClick={() => exec('insertUnorderedList')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Bullet List"
          >
            <List size={14} />
          </button>
          <button
            type="button"
            onClick={() => exec('insertOrderedList')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Numbered List"
          >
            <ListOrdered size={14} />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<blockquote>')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Quote Block"
          >
            <Quote size={14} />
          </button>
        </div>

        {/* Media & Link insertion */}
        <div className="flex items-center border-r border-[#dde0cc] pr-1 mr-1">
          <button
            type="button"
            onClick={promptLink}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Insert Link"
          >
            <LinkIcon size={14} />
          </button>
          <button
            type="button"
            onClick={promptImage}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Insert Image"
          >
            <ImageIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => exec('removeFormat')}
            className="rounded p-1.5 text-[#555d3a] hover:bg-[#e8ebdc] hover:text-[#2A2E1F] transition-colors"
            title="Clear Formatting"
          >
            <RemoveFormatting size={14} />
          </button>
        </div>

        {/* HTML / WYSIWYG Toggle */}
        <button
          type="button"
          onClick={() => setIsCodeView(!isCodeView)}
          className={`ml-auto flex items-center gap-1 rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
            isCodeView
              ? 'bg-[#7A8C3C] text-white'
              : 'bg-white border border-[#dde0cc] text-[#555d3a] hover:bg-[#e8ebdc]'
          }`}
          title="Toggle HTML Code View"
        >
          {isCodeView ? <Eye size={13} /> : <FileCode size={13} />}
          <span>{isCodeView ? 'Visual View' : 'HTML Code'}</span>
        </button>
      </div>

      {/* Editor Content Area */}
      {isCodeView ? (
        <textarea
          value={codeValue}
          onChange={handleCodeChange}
          className="w-full p-4 font-mono text-xs text-[#2A2E1F] bg-gray-50 focus:outline-none"
          style={{ minHeight }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          data-placeholder={placeholder}
          className="p-6 text-sm text-[#2A2E1F] leading-relaxed focus:outline-none prose prose-stone max-w-none empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)]"
          style={{ minHeight }}
        />
      )}
    </div>
  )
}
