'use client'

import { useState } from 'react'
import {
  FolderKanban,
  Plus,
  MapPin,
  Tag,
  Building,
} from 'lucide-react'
import { useCMSState, initialProjects } from '@/lib/cms-store'
import type { ProjectItem } from '@/lib/cms-types'
import DataTable, { Column } from '@/components/admin/data-table'
import ModalDialog from '@/components/admin/modal-dialog'

export default function ManageProjectsPage() {
  const [projects, setProjects] = useCMSState<ProjectItem[]>('projects', initialProjects)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null)

  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    title: '',
    category: 'Hotel',
    location: 'Pekanbaru, Riau',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: '',
    visibility: true,
  })

  // Columns as requested:
  // - no
  // - title
  // - create_time
  // - updated
  // - action (edit,delete,visibility)
  const columns: Column<ProjectItem>[] = [
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
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt=""
            className="h-10 w-14 rounded-sm object-cover shrink-0 border border-[#dde0cc]"
          />
          <div>
            <span className="font-bold text-[#2A2E1F] block">{item.title}</span>
            <div className="flex items-center gap-2 text-[10px] text-[#6b6b55] mt-0.5">
              <span className="flex items-center gap-0.5 text-[#7A8C3C] font-semibold">
                <Tag size={10} />
                <span>{item.category}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-[#8f9479]">
                <MapPin size={10} />
                <span>{item.location}</span>
              </span>
            </div>
          </div>
        </div>
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

  const handleToggleVisibility = (item: ProjectItem) => {
    setProjects(
      projects.map((p) =>
        p.id === item.id ? { ...p, visibility: !p.visibility, updated: new Date().toISOString().slice(0, 10) } : p
      )
    )
  }

  const handleEdit = (item: ProjectItem) => {
    setEditingProject(item)
    setFormData({
      title: item.title,
      category: item.category,
      location: item.location,
      image: item.image,
      description: item.description || '',
      visibility: item.visibility,
    })
    setModalOpen(true)
  }

  const handleDelete = (item: ProjectItem) => {
    if (window.confirm(`Delete project "${item.title}"?`)) {
      setProjects(projects.filter((p) => p.id !== item.id))
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    const now = new Date().toISOString().slice(0, 10)

    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? {
                ...p,
                ...formData,
                updated: now,
              } as ProjectItem
            : p
        )
      )
    } else {
      const newProj: ProjectItem = {
        id: `proj-${Date.now()}`,
        no: projects.length + 1,
        title: formData.title!,
        category: formData.category || 'Hotel',
        location: formData.location || 'Indonesia',
        image: formData.image || 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: formData.description || '',
        createTime: now,
        updated: now,
        visibility: true,
      }
      setProjects([...projects, newProj])
    }

    setModalOpen(false)
    setEditingProject(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">Manage Project</h2>
        <p className="text-xs text-[#6b6b55] mt-1">
          Manage hospitality portfolio developments including Hotels, Shopping Centers, and Luxury Resorts.
        </p>
      </div>

      <DataTable
        data={projects}
        columns={columns}
        searchPlaceholder="Search project by title, category, or location..."
        searchKey="title"
        onToggleVisibility={handleToggleVisibility}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={() => {
          setEditingProject(null)
          setFormData({
            title: '',
            category: 'Hotel',
            location: 'Pekanbaru, Riau',
            image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: '',
            visibility: true,
          })
          setModalOpen(true)
        }}
        addNewLabel="Add Project"
      />

      {/* Modal Dialog */}
      <ModalDialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? 'Edit Property Project' : 'Add New Property Development'}
        subtitle="Configure property asset details and gallery preview."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Project Title / Property Name
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. FOX Hotel Pekanbaru"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Property Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              >
                <option value="Hotel">Hotel</option>
                <option value="Mall & Retail">Mall & Retail</option>
                <option value="Resort">Resort & Villas</option>
                <option value="Mixed-Use">Mixed-Use Development</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
                placeholder="e.g. Pekanbaru, Riau"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Featured Image URL
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
              Project Description / Specifications
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] p-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="Key facts, room count, gross floor area, facilities..."
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
              Save Project
            </button>
          </div>
        </form>
      </ModalDialog>
    </div>
  )
}
