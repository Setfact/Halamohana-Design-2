'use client'

import { useState } from 'react'
import {
  Mail,
  Phone,
  Clock,
  Eye,
  Trash2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react'
import { useCMSState, initialContactUs } from '@/lib/cms-store'
import type { ContactUsItem } from '@/lib/cms-types'
import DataTable, { Column } from '@/components/admin/data-table'
import ModalDialog from '@/components/admin/modal-dialog'

export default function ContactUsInquiriesPage() {
  const [messages, setMessages] = useCMSState<ContactUsItem[]>('contact_us', initialContactUs)
  const [selectedMessage, setSelectedMessage] = useState<ContactUsItem | null>(null)

  // Columns as requested:
  // - no
  // - full_name
  // - Phone
  // - Email
  // - create_time
  // - action (delete, visibility)
  const columns: Column<ContactUsItem>[] = [
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
        <div>
          <button
            onClick={() => {
              setSelectedMessage(item)
              if (!item.visibility) {
                // mark as read
                setMessages(messages.map((m) => (m.id === item.id ? { ...m, visibility: true } : m)))
              }
            }}
            className="font-bold text-[#2A2E1F] hover:text-[#7A8C3C] text-left transition-colors"
          >
            {item.fullName}
          </button>
          {item.subject && (
            <p className="text-[11px] text-[#6b6b55] truncate max-w-xs">{item.subject}</p>
          )}
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

  const handleToggleVisibility = (item: ContactUsItem) => {
    // Toggles read/unread status
    setMessages(
      messages.map((m) => (m.id === item.id ? { ...m, visibility: !m.visibility } : m))
    )
  }

  const handleDelete = (item: ContactUsItem) => {
    if (window.confirm(`Delete inquiry from "${item.fullName}"?`)) {
      setMessages(messages.filter((m) => m.id !== item.id))
      if (selectedMessage?.id === item.id) setSelectedMessage(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">Contact Us Inquiries</h2>
        <p className="text-xs text-[#6b6b55] mt-1">
          Review incoming messages, partnership inquiries, and customer feedback submitted via public contact form.
        </p>
      </div>

      <DataTable
        data={messages}
        columns={columns}
        searchPlaceholder="Search by name, email, or phone..."
        searchKey="fullName"
        onToggleVisibility={handleToggleVisibility}
        onDelete={handleDelete}
        extraActions={(item) => (
          <button
            onClick={() => {
              setSelectedMessage(item)
              if (!item.visibility) {
                setMessages(messages.map((m) => (m.id === item.id ? { ...m, visibility: true } : m)))
              }
            }}
            className="rounded p-1.5 text-[#7A8C3C] hover:bg-[#eef0e6]"
            title="Read full message"
          >
            <MessageSquare size={14} />
          </button>
        )}
      />

      {/* View Message Modal */}
      <ModalDialog
        isOpen={Boolean(selectedMessage)}
        onClose={() => setSelectedMessage(null)}
        title={selectedMessage?.fullName || 'Contact Inquiry'}
        subtitle={`Submitted on ${selectedMessage?.createTime}`}
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 rounded bg-[#F8F9F4] p-4 border border-[#dde0cc] text-xs">
              <div>
                <span className="text-[#6b6b55] block">Sender Email</span>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="font-bold text-[#7A8C3C] hover:underline"
                >
                  {selectedMessage.email}
                </a>
              </div>
              <div>
                <span className="text-[#6b6b55] block">Telephone</span>
                <a
                  href={`tel:${selectedMessage.phone}`}
                  className="font-mono text-[#2A2E1F]"
                >
                  {selectedMessage.phone}
                </a>
              </div>
            </div>

            {selectedMessage.subject && (
              <div>
                <span className="text-xs font-bold text-[#3a3a2e] uppercase tracking-wider block mb-1">
                  Subject
                </span>
                <p className="text-sm font-semibold text-[#2A2E1F]">
                  {selectedMessage.subject}
                </p>
              </div>
            )}

            <div>
              <span className="text-xs font-bold text-[#3a3a2e] uppercase tracking-wider block mb-1">
                Inquiry Message
              </span>
              <div className="rounded border border-[#dde0cc] bg-white p-4 text-xs text-[#2A2E1F] leading-relaxed whitespace-pre-line">
                {selectedMessage.message}
              </div>
            </div>

            <div className="border-t border-[#dde0cc] pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  handleToggleVisibility(selectedMessage)
                  setSelectedMessage({ ...selectedMessage, visibility: !selectedMessage.visibility })
                }}
                className="text-xs font-semibold text-[#555d3a] hover:underline"
              >
                Mark as {selectedMessage.visibility ? 'Unread' : 'Read'}
              </button>

              <div className="flex gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=RE: ${encodeURIComponent(selectedMessage.subject || 'Inquiry Halla Mohana')}`}
                  className="flex items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914]"
                >
                  <Mail size={13} />
                  <span>Reply via Email</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="rounded-sm border border-[#dde0cc] px-4 py-2 text-xs font-semibold text-[#6b6b55] hover:bg-[#eef0e6]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </ModalDialog>
    </div>
  )
}
