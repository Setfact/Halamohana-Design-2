'use client'

import { useState } from 'react'
import {
  Building2,
  Plus,
  Calendar,
  Globe,
  FileText,
} from 'lucide-react'
import { useCMSState, initialCorporateInfo } from '@/lib/cms-store'
import type { CorporateInfoItem } from '@/lib/cms-types'
import DataTable, { Column } from '@/components/admin/data-table'
import ModalDialog from '@/components/admin/modal-dialog'

export default function CorporateInfoPage() {
  const [items, setItems] = useCMSState<CorporateInfoItem[]>('corporate_info', initialCorporateInfo)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<CorporateInfoItem | null>(null)

  const [formData, setFormData] = useState<Partial<CorporateInfoItem>>({
    title: '',
    date: new Date().toISOString().slice(0, 10),
    url: '',
    category: 'Corporate Announcement',
    description: '',
    visibility: true,
  })

  // Columns as requested:
  // - no
  // - date
  // - title
  // - url
  // - create_time
  // - updated
  // - action (edit,delete,visibility)
  const columns: Column<CorporateInfoItem>[] = [
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
        <div>
          <span className="font-bold text-[#2A2E1F] block">{item.title}</span>
          <span className="rounded bg-[#eef0e6] px-2 py-0.5 text-[10px] font-semibold text-[#555d3a]">
            {item.category}
          </span>
        </div>
      ),
    },
    {
      key: 'url',
      label: 'URL',
      sortable: true,
      render: (item) => (
        <span className="font-mono text-xs text-[#555d3a]">
          /corporate/{item.url}
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

  const handleToggleVisibility = (item: CorporateInfoItem) => {
    setItems(
      items.map((i) =>
        i.id === item.id ? { ...i, visibility: !i.visibility, updated: new Date().toISOString().slice(0, 10) } : i
      )
    )
  }

  const handleEdit = (item: CorporateInfoItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      date: item.date,
      url: item.url,
      category: item.category,
      description: item.description || '',
      visibility: item.visibility,
    })
    setModalOpen(true)
  }

  const handleDelete = (item: CorporateInfoItem) => {
    if (window.confirm(`Delete corporate announcement "${item.title}"?`)) {
      setItems(items.filter((i) => i.id !== item.id))
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.url) return

    const now = new Date().toISOString().slice(0, 10)

    if (editingItem) {
      setItems(
        items.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                ...formData,
                updated: now,
              } as CorporateInfoItem
            : i
        )
      )
    } else {
      const newItem: CorporateInfoItem = {
        id: `corp-${Date.now()}`,
        no: items.length + 1,
        title: formData.title!,
        date: formData.date || now,
        url: formData.url!,
        category: formData.category || 'Corporate Announcement',
        description: formData.description || '',
        createTime: now,
        updated: now,
        visibility: true,
      }
      setItems([newItem, ...items])
    }

    setModalOpen(false)
    setEditingItem(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">Corporate Information</h2>
        <p className="text-xs text-[#6b6b55] mt-1">
          Publish investor relations notices, shareholder meeting circulars, and official compliance reports.
        </p>
      </div>

      <DataTable
        data={items}
        columns={columns}
        searchPlaceholder="Search corporate announcements or URL..."
        searchKey="title"
        onToggleVisibility={handleToggleVisibility}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={() => {
          setEditingItem(null)
          setFormData({
            title: '',
            date: new Date().toISOString().slice(0, 10),
            url: '',
            category: 'Corporate Announcement',
            description: '',
            visibility: true,
          })
          setModalOpen(true)
        }}
        addNewLabel="Add Announcement"
      />

      {/* Modal Dialog */}
      <ModalDialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Corporate Info' : 'New Corporate Announcement'}
        subtitle="Publish institutional notices and investor updates."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                const titleVal = e.target.value
                const slug = titleVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                setFormData({
                  ...formData,
                  title: titleVal,
                  url: formData.url === '' || formData.url === editingItem?.url ? slug : formData.url,
                })
              }}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. Annual General Meeting of Shareholders Notice..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Notice Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              >
                <option value="Shareholder Announcement">Shareholder Announcement</option>
                <option value="Governance & Compliance">Governance & Compliance</option>
                <option value="Board Resolution">Board Resolution</option>
                <option value="Financial Disclosure">Financial Disclosure</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              URL Slug
            </label>
            <div className="flex items-center rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 focus-within:border-[#7A8C3C] focus-within:bg-white">
              <span className="text-xs text-[#8f9479] font-mono mr-1">/corporate/</span>
              <input
                type="text"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="h-9 flex-1 bg-transparent text-xs text-[#2A2E1F] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Summary / Disclosure Details
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] p-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="Summary notes regarding this corporate action..."
            />
          </div>

          <div className="border-t border-[#dde0cc] pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-sm border border-[#dde0cc] px-4 py-2 text-xs font-semibold text-[#6b6b55] hover:bg-[#eef0e6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-sm bg-[#7A8C3C] px-5 py-2 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914]"
            >
              Save Information
            </button>
          </div>
        </form>
      </ModalDialog>
    </div>
  )
}
