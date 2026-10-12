'use client'

import { useState } from 'react'
import {
  Newspaper,
  Plus,
  ArrowLeft,
  Save,
  CheckCircle2,
  ExternalLink,
  Eye,
  FileText,
  Calendar,
  Globe,
} from 'lucide-react'
import { useCMSState, initialNews, initialUserProfile } from '@/lib/cms-store'
import type { NewsItem } from '@/lib/cms-types'
import DataTable, { Column } from '@/components/admin/data-table'
import RichTextEditor from '@/components/admin/rich-text-editor'

export default function NewsManagementPage() {
  const [newsList, setNewsList] = useCMSState<NewsItem[]>('news', initialNews)

  // View mode: 'list' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    date: new Date().toISOString().slice(0, 10),
    excerpt: '',
    description: '',
    thumbnail: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=800',
    visibility: true,
  })

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    setFormData((prev) => ({
      ...prev,
      title: val,
      url: prev.url === '' || prev.url === editingItem?.url ? slug : prev.url,
    }))
  }

  // Manage News columns as strictly requested:
  // - no
  // - date
  // - title
  // - url
  // - create_time
  // - updated
  // - action (edit,delete,visibility)
  const columns: Column<NewsItem>[] = [
    {
      key: 'no',
      label: 'No',
      sortable: true,
      render: (_, idx) => <span className="font-mono text-[#6b6b55]">{idx}</span>,
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (item) => (
        <span className="font-medium text-[#7A8C3C] whitespace-nowrap">{item.date}</span>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.thumbnail}
            alt=""
            className="h-10 w-14 rounded-sm object-cover shrink-0 border border-[#dde0cc]"
          />
          <div>
            <p className="font-bold text-[#2A2E1F] line-clamp-1">{item.title}</p>
            <p className="text-[11px] text-[#8f9479] line-clamp-1">{item.excerpt}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'url',
      label: 'URL',
      sortable: true,
      render: (item) => (
        <span className="font-mono text-xs text-[#555d3a]">
          /news/{item.url}
        </span>
      ),
    },
    {
      key: 'createTime',
      label: 'Create Time',
      sortable: true,
      render: (item) => <span className="text-[#6b6b55]">{item.createTime}</span>,
    },
    {
      key: 'updated',
      label: 'Updated',
      sortable: true,
      render: (item) => <span className="text-[#6b6b55]">{item.updated}</span>,
    },
  ]

  // Action handlers
  const handleToggleVisibility = (item: NewsItem) => {
    setNewsList(
      newsList.map((n) =>
        n.id === item.id ? { ...n, visibility: !n.visibility, updated: new Date().toISOString().slice(0, 10) } : n
      )
    )
  }

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      url: item.url,
      date: item.date,
      excerpt: item.excerpt,
      description: item.description,
      thumbnail: item.thumbnail,
      visibility: item.visibility,
    })
    setViewMode('edit')
  }

  const handleDelete = (item: NewsItem) => {
    if (window.confirm(`Delete news article "${item.title}"?`)) {
      setNewsList(newsList.filter((n) => n.id !== item.id))
    }
  }

  const handleAddNew = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      url: '',
      date: new Date().toISOString().slice(0, 10),
      excerpt: '',
      description: '<p>Enter news article content here...</p>',
      thumbnail: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=800',
      visibility: true,
    })
    setViewMode('create')
  }

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.url) return

    const now = new Date().toISOString().slice(0, 10)

    if (viewMode === 'edit' && editingItem) {
      setNewsList(
        newsList.map((n) =>
          n.id === editingItem.id
            ? {
                ...n,
                ...formData,
                updated: now,
              }
            : n
        )
      )
    } else {
      const newItem: NewsItem = {
        id: `news-${Date.now()}`,
        no: newsList.length + 1,
        title: formData.title,
        url: formData.url,
        date: formData.date,
        excerpt: formData.excerpt || formData.title,
        description: formData.description,
        thumbnail: formData.thumbnail,
        createTime: now,
        updated: now,
        visibility: formData.visibility,
        author: initialUserProfile.fullName,
      }
      setNewsList([newItem, ...newsList])
    }

    setViewMode('list')
    setEditingItem(null)
  }

  return (
    <div className="space-y-6">
      {/* ── LIST VIEW: MANAGE NEWS ── */}
      {viewMode === 'list' && (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">Manage News</h2>
              <p className="text-xs text-[#6b6b55] mt-1">
                Manage press releases, corporate announcements, and articles with Word-like rich text editor.
              </p>
            </div>

            <button
              onClick={handleAddNew}
              className="flex h-9 items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-4 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-all"
            >
              <Plus size={14} />
              <span>Create News</span>
            </button>
          </div>

          <DataTable
            data={newsList}
            columns={columns}
            searchPlaceholder="Search news by title or URL..."
            searchKey="title"
            onToggleVisibility={handleToggleVisibility}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddNew={handleAddNew}
            addNewLabel="Create News"
          />
        </>
      )}

      {/* ── FORM VIEW: CREATE & EDIT NEWS ── */}
      {viewMode !== 'list' && (
        <form onSubmit={handleSaveForm} className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#dde0cc] pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#dde0cc] bg-white text-[#555d3a] hover:bg-[#eef0e6]"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">
                  {viewMode === 'edit' ? 'Edit News Article' : 'Create New Article'}
                </h2>
                <p className="text-xs text-[#6b6b55]">
                  Full-featured Word-like editor for title, URL, date, and article description.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="rounded-sm border border-[#dde0cc] bg-white px-4 py-2 text-xs font-semibold text-[#6b6b55] hover:bg-[#eef0e6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-5 py-2 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-all"
              >
                <Save size={14} />
                <span>{viewMode === 'edit' ? 'Update Article' : 'Publish Article'}</span>
              </button>
            </div>
          </div>

          {/* Form Fields as required:
              - title
              - url
              - date
              - description (full features like word edit)
          */}
          <div className="rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1.5">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="h-10 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-sm font-semibold text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                  placeholder="e.g. Whistle Blowing System Implementation..."
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1.5 flex items-center gap-1">
                  <Calendar size={13} className="text-[#7A8C3C]" />
                  <span>Publication Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="h-10 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                />
              </div>

              {/* URL */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1.5 flex items-center gap-1">
                  <Globe size={13} className="text-[#7A8C3C]" />
                  <span>URL Slug</span>
                </label>
                <div className="flex items-center rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 focus-within:border-[#7A8C3C] focus-within:bg-white">
                  <span className="text-xs text-[#8f9479] font-mono mr-1">/news/</span>
                  <input
                    type="text"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="h-10 flex-1 bg-transparent text-xs text-[#2A2E1F] focus:outline-none font-mono"
                    placeholder="whistle-blowing-system"
                  />
                </div>
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1.5">
                  Featured Thumbnail URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="h-10 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1.5">
                Article Excerpt / Summary
              </label>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] p-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                placeholder="Short 1-2 sentence overview for news card listings..."
              />
            </div>

            {/* Description (full features like word edit) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e]">
                  Article Description (Word-like Rich Text Editor)
                </label>
                <span className="text-[11px] text-[#7A8C3C] font-semibold">
                  Full formatting, headings, quotes, lists, links & image embed
                </span>
              </div>
              <RichTextEditor
                value={formData.description}
                onChange={(val) => setFormData({ ...formData, description: val })}
                placeholder="Compose full news article body..."
                minHeight="380px"
              />
            </div>

            {/* Visibility checkbox */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#f0f2e8]">
              <input
                type="checkbox"
                id="newsVisCheck"
                checked={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.checked })}
                className="accent-[#7A8C3C]"
              />
              <label htmlFor="newsVisCheck" className="text-xs font-semibold text-[#2A2E1F] cursor-pointer">
                Publish immediately and make visible on live website
              </label>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
