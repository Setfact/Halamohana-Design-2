'use client'

import { useState } from 'react'
import {
  Layers,
  Plus,
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from 'lucide-react'
import { useCMSState, initialPages } from '@/lib/cms-store'
import type { PageAdminItem } from '@/lib/cms-types'
import DataTable, { Column } from '@/components/admin/data-table'
import ModalDialog from '@/components/admin/modal-dialog'

export default function PageAdministration() {
  const [pages, setPages] = useCMSState<PageAdminItem[]>('pages', initialPages)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<PageAdminItem | null>(null)
  const [formData, setFormData] = useState<Partial<PageAdminItem>>({
    title: '',
    navigation: '',
    visibility: true,
  })

  const columns: Column<PageAdminItem>[] = [
    {
      key: 'no',
      label: 'No',
      sortable: true,
      render: (_, idx) => <span className="font-mono text-[#6b6b55]">{idx}</span>,
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#2A2E1F]">{item.title}</span>
        </div>
      ),
    },
    {
      key: 'navigation',
      label: 'Navigation',
      sortable: true,
      render: (item) => (
        <a
          href={item.navigation}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-[#7A8C3C] hover:underline"
        >
          <span>{item.navigation}</span>
          <ExternalLink size={11} />
        </a>
      ),
    },
    {
      key: 'createdTime',
      label: 'Created Time',
      sortable: true,
      render: (item) => <span className="text-[#6b6b55]">{item.createdTime}</span>,
    },
    {
      key: 'updated',
      label: 'Updated',
      sortable: true,
      render: (item) => <span className="text-[#6b6b55]">{item.updated}</span>,
    },
  ]

  const handleToggleVisibility = (item: PageAdminItem) => {
    setPages(
      pages.map((p) =>
        p.id === item.id ? { ...p, visibility: !p.visibility, updated: new Date().toISOString().slice(0, 10) } : p
      )
    )
  }

  const handleEdit = (item: PageAdminItem) => {
    setEditingPage(item)
    setFormData({
      title: item.title,
      navigation: item.navigation,
      visibility: item.visibility,
    })
    setModalOpen(true)
  }

  const handleDelete = (item: PageAdminItem) => {
    if (window.confirm(`Delete page menu "${item.title}"?`)) {
      setPages(pages.filter((p) => p.id !== item.id))
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.navigation) return

    const now = new Date().toISOString().slice(0, 10)

    if (editingPage) {
      setPages(
        pages.map((p) =>
          p.id === editingPage.id
            ? {
                ...p,
                title: formData.title!,
                navigation: formData.navigation!,
                updated: now,
              }
            : p
        )
      )
    } else {
      const newPage: PageAdminItem = {
        id: `page-${Date.now()}`,
        no: pages.length + 1,
        title: formData.title,
        navigation: formData.navigation,
        createdTime: now,
        updated: now,
        visibility: true,
        order: pages.length + 1,
      }
      setPages([...pages, newPage])
    }

    setModalOpen(false)
    setEditingPage(null)
  }

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === pages.length - 1) return

    const newPages = [...pages]
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    const temp = newPages[index]
    newPages[index] = newPages[targetIdx]
    newPages[targetIdx] = temp

    setPages(newPages.map((p, i) => ({ ...p, order: i + 1, no: i + 1 })))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">Page Administration</h2>
        <p className="text-xs text-[#6b6b55] mt-1">
          Manage navigation menu for website navbar, footer links, and page routing destinations.
        </p>
      </div>

      <DataTable
        data={pages}
        columns={columns}
        searchPlaceholder="Search page title or navigation URL..."
        searchKey="title"
        onToggleVisibility={handleToggleVisibility}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={() => {
          setEditingPage(null)
          setFormData({ title: '', navigation: '/', visibility: true })
          setModalOpen(true)
        }}
        addNewLabel="Add Page / Menu"
        extraActions={(item) => {
          const index = pages.findIndex((p) => p.id === item.id)
          return (
            <span className="inline-flex items-center gap-0.5 mr-1">
              <button
                onClick={() => moveOrder(index, 'up')}
                disabled={index === 0}
                className="rounded p-1 text-[#6b6b55] hover:bg-[#eef0e6] disabled:opacity-30"
                title="Move Up in Navbar"
              >
                <ArrowUp size={13} />
              </button>
              <button
                onClick={() => moveOrder(index, 'down')}
                disabled={index === pages.length - 1}
                className="rounded p-1 text-[#6b6b55] hover:bg-[#eef0e6] disabled:opacity-30"
                title="Move Down in Navbar"
              >
                <ArrowDown size={13} />
              </button>
            </span>
          )
        }}
      />

      {/* Modal Dialog */}
      <ModalDialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPage ? 'Edit Page / Navigation Menu' : 'Add New Page Menu'}
        subtitle="Configure title and routing destination for the navbar."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Page / Menu Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. CSR & Sustainability"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Navigation Link / URL
            </label>
            <input
              type="text"
              required
              value={formData.navigation}
              onChange={(e) => setFormData({ ...formData, navigation: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none font-mono"
              placeholder="e.g. /sustainability or https://..."
            />
            <p className="mt-1 text-[11px] text-[#8f9479]">
              Use leading slash for internal pages (e.g. /about) or full URL for external links.
            </p>
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
              Save Menu Item
            </button>
          </div>
        </form>
      </ModalDialog>
    </div>
  )
}
