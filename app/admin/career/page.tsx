'use client'

import { useState } from 'react'
import {
  Briefcase,
  Plus,
  Users,
  MapPin,
  Clock,
  Download,
  CheckCircle2,
} from 'lucide-react'
import {
  useCMSState,
  initialCareers,
  initialApplicants,
} from '@/lib/cms-store'
import type { CareerItem, CareerApplicant } from '@/lib/cms-types'
import DataTable, { Column } from '@/components/admin/data-table'
import ModalDialog from '@/components/admin/modal-dialog'

export default function ManageCareerPage() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applicants'>('jobs')
  const [careers, setCareers] = useCMSState<CareerItem[]>('careers', initialCareers)
  const [applicants, setApplicants] = useCMSState<CareerApplicant[]>('applicants', initialApplicants)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingCareer, setEditingCareer] = useState<CareerItem | null>(null)

  const [formData, setFormData] = useState<Partial<CareerItem>>({
    title: '',
    department: 'Operations',
    location: 'Jakarta',
    type: 'Full-time',
    description: '',
    visibility: true,
  })

  // Columns as requested:
  // - no
  // - title
  // - create_time
  // - updated
  // - action (edit,delete,visibility)
  const columns: Column<CareerItem>[] = [
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
        <div>
          <span className="font-bold text-[#2A2E1F] block">{item.title}</span>
          <div className="flex items-center gap-2 text-[10px] text-[#6b6b55] mt-0.5">
            <span className="rounded bg-[#7A8C3C]/10 px-2 py-0.5 font-semibold text-[#7A8C3C]">
              {item.department}
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5 text-[#8f9479]">
              <MapPin size={10} />
              <span>{item.location} ({item.type})</span>
            </span>
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

  const handleToggleVisibility = (item: CareerItem) => {
    setCareers(
      careers.map((c) =>
        c.id === item.id ? { ...c, visibility: !c.visibility, updated: new Date().toISOString().slice(0, 10) } : c
      )
    )
  }

  const handleEdit = (item: CareerItem) => {
    setEditingCareer(item)
    setFormData({
      title: item.title,
      department: item.department,
      location: item.location,
      type: item.type,
      description: item.description || '',
      visibility: item.visibility,
    })
    setModalOpen(true)
  }

  const handleDelete = (item: CareerItem) => {
    if (window.confirm(`Delete vacancy position "${item.title}"?`)) {
      setCareers(careers.filter((c) => c.id !== item.id))
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    const now = new Date().toISOString().slice(0, 10)

    if (editingCareer) {
      setCareers(
        careers.map((c) =>
          c.id === editingCareer.id
            ? {
                ...c,
                ...formData,
                updated: now,
              } as CareerItem
            : c
        )
      )
    } else {
      const newJob: CareerItem = {
        id: `car-${Date.now()}`,
        no: careers.length + 1,
        title: formData.title!,
        department: formData.department || 'Operations',
        location: formData.location || 'Jakarta',
        type: formData.type || 'Full-time',
        description: formData.description || '',
        createTime: now,
        updated: now,
        visibility: true,
        applicantCount: 0,
      }
      setCareers([...careers, newJob])
    }

    setModalOpen(false)
    setEditingCareer(null)
  }

  const updateApplicantStatus = (id: string, status: CareerApplicant['status']) => {
    setApplicants(
      applicants.map((a) => (a.id === id ? { ...a, status } : a))
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">Career Management</h2>
          <p className="text-xs text-[#6b6b55] mt-1">
            Manage corporate and hotel vacancies, requirements, department categories, and review candidate resumes.
          </p>
        </div>

        {activeTab === 'jobs' && (
          <button
            onClick={() => {
              setEditingCareer(null)
              setFormData({
                title: '',
                department: 'Operations',
                location: 'Jakarta',
                type: 'Full-time',
                description: '',
                visibility: true,
              })
              setModalOpen(true)
            }}
            className="flex h-9 items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-4 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-all"
          >
            <Plus size={14} />
            <span>Post New Vacancy</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#dde0cc] bg-white px-4 rounded-sm shadow-xs">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'jobs'
              ? 'border-[#7A8C3C] text-[#7A8C3C]'
              : 'border-transparent text-[#6b6b55] hover:text-[#2A2E1F]'
          }`}
        >
          <Briefcase size={15} />
          <span>Job Vacancies ({careers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applicants')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'applicants'
              ? 'border-[#7A8C3C] text-[#7A8C3C]'
              : 'border-transparent text-[#6b6b55] hover:text-[#2A2E1F]'
          }`}
        >
          <Users size={15} />
          <span>Applicants Received ({applicants.length})</span>
        </button>
      </div>

      {/* ── TAB 1: JOB VACANCIES LIST ── */}
      {activeTab === 'jobs' && (
        <DataTable
          data={careers}
          columns={columns}
          searchPlaceholder="Search vacancy by title or location..."
          searchKey="title"
          onToggleVisibility={handleToggleVisibility}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddNew={() => {
            setEditingCareer(null)
            setFormData({
              title: '',
              department: 'Operations',
              location: 'Jakarta',
              type: 'Full-time',
              description: '',
              visibility: true,
            })
            setModalOpen(true)
          }}
          addNewLabel="Post Vacancy"
        />
      )}

      {/* ── TAB 2: APPLICANTS RECEIVED ── */}
      {activeTab === 'applicants' && (
        <div className="rounded-sm border border-[#dde0cc] bg-white shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9F4] text-[#555d3a] border-b border-[#dde0cc]">
              <tr>
                <th className="px-4 py-3 font-semibold uppercase">No</th>
                <th className="px-4 py-3 font-semibold uppercase">Applicant Name</th>
                <th className="px-4 py-3 font-semibold uppercase">Target Job</th>
                <th className="px-4 py-3 font-semibold uppercase">Contact</th>
                <th className="px-4 py-3 font-semibold uppercase">Submitted Date</th>
                <th className="px-4 py-3 font-semibold uppercase">Status</th>
                <th className="px-4 py-3 font-semibold uppercase text-right">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef0e6] text-[#2A2E1F]">
              {applicants.map((a, i) => (
                <tr key={a.id} className="hover:bg-[#fbfcf8]">
                  <td className="px-4 py-3.5 text-[#6b6b55] font-mono">{i + 1}</td>
                  <td className="px-4 py-3.5 font-bold">{a.fullName}</td>
                  <td className="px-4 py-3.5 text-[#7A8C3C] font-semibold">{a.jobTitle}</td>
                  <td className="px-4 py-3.5 text-[#6b6b55]">
                    <p>{a.email}</p>
                    <p className="font-mono text-[11px] text-[#8f9479]">{a.phone}</p>
                  </td>
                  <td className="px-4 py-3.5 text-[#6b6b55] whitespace-nowrap">{a.submittedAt}</td>
                  <td className="px-4 py-3.5">
                    <select
                      value={a.status}
                      onChange={(e) => updateApplicantStatus(a.id, e.target.value as CareerApplicant['status'])}
                      className="rounded border border-[#dde0cc] bg-[#F8F9F4] px-2 py-1 text-xs font-semibold text-[#2A2E1F] focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Interview">Interview</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <a
                      href={a.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded bg-[#eef0e6] px-2.5 py-1 text-xs font-semibold text-[#555d3a] hover:bg-[#7A8C3C] hover:text-white transition-colors"
                    >
                      <Download size={12} />
                      <span>CV.pdf</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CRUD Job Modal */}
      <ModalDialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCareer ? 'Edit Job Opening' : 'Post New Career Vacancy'}
        subtitle="Manage recruitment qualifications and department assignment."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Position Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. Front Office Manager"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              >
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="F&B">F&B</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              >
                <option value="Jakarta">Jakarta</option>
                <option value="Pekanbaru">Pekanbaru</option>
                <option value="Bali">Bali</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Employment Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Job Description & Responsibilities
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] p-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="Detailed candidate criteria and day-to-day duties..."
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
              Save Vacancy
            </button>
          </div>
        </form>
      </ModalDialog>
    </div>
  )
}
