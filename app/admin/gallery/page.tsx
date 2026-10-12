'use client'

import { useState } from 'react'
import {
  Camera,
  Plus,
  Image as ImageIcon,
  Phone,
  Mail,
  User,
} from 'lucide-react'
import { useCMSState, initialGallery } from '@/lib/cms-store'
import type { GalleryItem } from '@/lib/cms-types'
import DataTable, { Column } from '@/components/admin/data-table'
import ModalDialog from '@/components/admin/modal-dialog'

export default function ManageGalleryPage() {
  const [gallery, setGallery] = useCMSState<GalleryItem[]>('gallery', initialGallery)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)

  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    fullName: '',
    phone: '',
    email: '',
    title: '',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Architecture',
    visibility: true,
  })

  // Columns as requested:
  // - no
  // - full_name
  // - Phone
  // - Email
  // - create_time
  // - action (delete, visibility)
  const columns: Column<GalleryItem>[] = [
    {
      key: 'no',
      label: 'No',
      sortable: true,
      render: (_, idx) => <span className="font-mono text-[#6b6b55]">{idx}</span>,
    },
    {
      key: 'fullName',
      label: 'Full Name',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt=""
            className="h-10 w-14 rounded-sm object-cover shrink-0 border border-[#dde0cc]"
          />
          <div>
            <span className="font-bold text-[#2A2E1F] block">{item.fullName}</span>
            <span className="text-[11px] text-[#7A8C3C]">{item.title}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true,
      render: (item) => (
        <a
          href={`tel:${item.phone}`}
          className="font-mono text-xs text-[#555d3a] hover:underline"
        >
          {item.phone}
        </a>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (item) => (
        <a
          href={`mailto:${item.email}`}
          className="text-xs text-[#7A8C3C] hover:underline"
        >
          {item.email}
        </a>
      ),
    },
    {
      key: 'createTime',
      label: 'Create Time',
      sortable: true,
      render: (item) => <span className="text-[#6b6b55] whitespace-nowrap">{item.createTime}</span>,
    },
  ]

  const handleToggleVisibility = (item: GalleryItem) => {
    setGallery(
      gallery.map((g) => (g.id === item.id ? { ...g, visibility: !g.visibility } : g))
    )
  }

  const handleDelete = (item: GalleryItem) => {
    if (window.confirm(`Delete photo entry from "${item.fullName}"?`)) {
      setGallery(gallery.filter((g) => g.id !== item.id))
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.image) return

    const now = new Date().toISOString().slice(0, 10)

    if (editingItem) {
      setGallery(
        gallery.map((g) =>
          g.id === editingItem.id
            ? {
                ...g,
                ...formData,
              } as GalleryItem
            : g
        )
      )
    } else {
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        no: gallery.length + 1,
        fullName: formData.fullName!,
        phone: formData.phone || '-',
        email: formData.email || '-',
        title: formData.title || 'Untitled Photo',
        image: formData.image!,
        category: formData.category || 'Architecture',
        createTime: now,
        visibility: true,
      }
      setGallery([...gallery, newItem])
    }

    setModalOpen(false)
    setEditingItem(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">Manage Gallery</h2>
        <p className="text-xs text-[#6b6b55] mt-1">
          Review photographer credits, user-submitted media assets, and property lifestyle galleries.
        </p>
      </div>

      <DataTable
        data={gallery}
        columns={columns}
        searchPlaceholder="Search photographer name, email, or title..."
        searchKey="fullName"
        onToggleVisibility={handleToggleVisibility}
        onDelete={handleDelete}
        onAddNew={() => {
          setEditingItem(null)
          setFormData({
            fullName: '',
            phone: '',
            email: '',
            title: '',
            image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Architecture',
            visibility: true,
          })
          setModalOpen(true)
        }}
        addNewLabel="Add Gallery Entry"
      />

      {/* Modal Dialog */}
      <ModalDialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Gallery Entry' : 'Add Gallery Photo Submission'}
        subtitle="Manage photo metadata, author contact, and image file source."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Full Name / Credit
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                placeholder="e.g. Michael Chandra"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Photo Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                placeholder="e.g. FOX Hotel Facade"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                placeholder="+62 811..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                placeholder="email@domain.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Image URL
            </label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="https://..."
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
              <option value="Architecture">Architecture</option>
              <option value="Retail & Events">Retail & Events</option>
              <option value="Aerial">Aerial</option>
              <option value="Hospitality & Rooms">Hospitality & Rooms</option>
            </select>
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
              Save Entry
            </button>
          </div>
        </form>
      </ModalDialog>
    </div>
  )
}
