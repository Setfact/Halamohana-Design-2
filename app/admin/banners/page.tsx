'use client'

import { useState } from 'react'
import {
  Sliders,
  Plus,
  Play,
  Image as ImageIcon,
  CheckSquare,
  Square,
  Eye,
  EyeOff,
  Trash2,
  Edit2,
  ExternalLink,
} from 'lucide-react'
import { useCMSState, initialBanners } from '@/lib/cms-store'
import type { BannerItem } from '@/lib/cms-types'
import ModalDialog from '@/components/admin/modal-dialog'

export default function BannerManagementPage() {
  const [banners, setBanners] = useCMSState<BannerItem[]>('banners', initialBanners)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null)

  const [formData, setFormData] = useState<Partial<BannerItem>>({
    title: '',
    subtitle: '',
    mediaType: 'video',
    mediaUrl: '',
    targetUrl: '/properties',
    ctaText: 'Explore Properties',
    order: 1,
    visibility: true,
  })

  // Select / Deselect
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedIds.length === banners.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(banners.map((b) => b.id))
    }
  }

  // Combined Actions (visibility_action_combined_action)
  const handleBulkPublish = () => {
    if (selectedIds.length === 0) return
    setBanners(
      banners.map((b) =>
        selectedIds.includes(b.id)
          ? { ...b, visibility: true, updated: new Date().toISOString().slice(0, 10) }
          : b
      )
    )
    setSelectedIds([])
  }

  const handleBulkHide = () => {
    if (selectedIds.length === 0) return
    setBanners(
      banners.map((b) =>
        selectedIds.includes(b.id)
          ? { ...b, visibility: false, updated: new Date().toISOString().slice(0, 10) }
          : b
      )
    )
    setSelectedIds([])
  }

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return
    if (window.confirm(`Delete ${selectedIds.length} selected banners?`)) {
      setBanners(banners.filter((b) => !selectedIds.includes(b.id)))
      setSelectedIds([])
    }
  }

  // Single visibility toggle
  const toggleSingleVisibility = (id: string) => {
    setBanners(
      banners.map((b) =>
        b.id === id
          ? { ...b, visibility: !b.visibility, updated: new Date().toISOString().slice(0, 10) }
          : b
      )
    )
  }

  // Handle Save (Create/Edit)
  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.mediaUrl) return

    const now = new Date().toISOString().slice(0, 10)

    if (editingBanner) {
      setBanners(
        banners.map((b) =>
          b.id === editingBanner.id
            ? {
                ...b,
                ...formData,
                updated: now,
              } as BannerItem
            : b
        )
      )
    } else {
      const newBanner: BannerItem = {
        id: `bnr-${Date.now()}`,
        title: formData.title!,
        subtitle: formData.subtitle || '',
        mediaType: formData.mediaType || 'video',
        mediaUrl: formData.mediaUrl!,
        targetUrl: formData.targetUrl || '/properties',
        ctaText: formData.ctaText || 'Explore Properties',
        order: formData.order || banners.length + 1,
        visibility: true,
        createdTime: now,
        updated: now,
      }
      setBanners([...banners, newBanner])
    }

    setModalOpen(false)
    setEditingBanner(null)
  }

  const handleDeleteSingle = (id: string) => {
    if (window.confirm('Delete this banner slide?')) {
      setBanners(banners.filter((b) => b.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">Banner Management</h2>
          <p className="text-xs text-[#6b6b55] mt-1">
            Configure homepage hero video slides, carousel banners, call-to-actions, and batch visibility.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBanner(null)
            setFormData({
              title: '',
              subtitle: '',
              mediaType: 'video',
              mediaUrl: '',
              targetUrl: '/properties',
              ctaText: 'Explore Properties',
              order: banners.length + 1,
              visibility: true,
            })
            setModalOpen(true)
          }}
          className="flex h-9 items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-4 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-all"
        >
          <Plus size={14} />
          <span>Add Banner Slide</span>
        </button>
      </div>

      {/* Combined Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-[#dde0cc] bg-white p-3 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={selectAll}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#555d3a] hover:text-[#2A2E1F]"
          >
            {selectedIds.length === banners.length && banners.length > 0 ? (
              <CheckSquare size={16} className="text-[#7A8C3C]" />
            ) : (
              <Square size={16} className="text-[#8f9479]" />
            )}
            <span>Select All ({selectedIds.length} selected)</span>
          </button>
        </div>

        {/* Combined action buttons */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[#8f9479] font-bold mr-1">
            Combined Actions:
          </span>
          <button
            onClick={handleBulkPublish}
            disabled={selectedIds.length === 0}
            className="flex h-8 items-center gap-1 rounded-sm border border-emerald-300 bg-emerald-50 px-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Eye size={13} />
            <span>Publish Selected</span>
          </button>

          <button
            onClick={handleBulkHide}
            disabled={selectedIds.length === 0}
            className="flex h-8 items-center gap-1 rounded-sm border border-amber-300 bg-amber-50 px-3 text-xs font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <EyeOff size={13} />
            <span>Hide Selected</span>
          </button>

          <button
            onClick={handleBulkDelete}
            disabled={selectedIds.length === 0}
            className="flex h-8 items-center gap-1 rounded-sm border border-rose-300 bg-rose-50 px-3 text-xs font-semibold text-rose-800 hover:bg-rose-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 size={13} />
            <span>Delete Selected</span>
          </button>
        </div>
      </div>

      {/* Banners Grid / Table List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {banners.map((b) => (
          <div
            key={b.id}
            className={`flex flex-col rounded-sm border bg-white overflow-hidden shadow-xs transition-all ${
              selectedIds.includes(b.id)
                ? 'border-[#7A8C3C] ring-2 ring-[#7A8C3C]/20'
                : 'border-[#dde0cc] hover:border-[#7A8C3C]'
            }`}
          >
            {/* Slide media preview */}
            <div className="relative aspect-video bg-[#141510] overflow-hidden">
              {b.mediaType === 'video' ? (
                <video
                  src={b.mediaUrl}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="h-full w-full object-cover opacity-80"
                />
              ) : (
                <img
                  src={b.mediaUrl}
                  alt={b.title}
                  className="h-full w-full object-cover"
                />
              )}

              {/* Selection Checkbox */}
              <button
                onClick={() => toggleSelect(b.id)}
                className="absolute top-2.5 left-2.5 flex h-6 w-6 items-center justify-center rounded bg-black/60 text-white hover:bg-black/80"
              >
                {selectedIds.includes(b.id) ? (
                  <CheckSquare size={16} className="text-[#B5B847]" />
                ) : (
                  <Square size={16} className="text-white/80" />
                )}
              </button>

              {/* Media Type Badge */}
              <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {b.mediaType === 'video' ? <Play size={10} /> : <ImageIcon size={10} />}
                <span>{b.mediaType}</span>
              </span>

              {/* Order number */}
              <span className="absolute bottom-2.5 left-2.5 rounded bg-[#7A8C3C] px-2 py-0.5 text-[10px] font-bold text-white">
                Order #{b.order}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2A2E1F]">{b.title}</h3>
                <p className="text-xs text-[#5A6040] line-clamp-2 mt-1 leading-relaxed">
                  {b.subtitle}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#7A8C3C]">
                  <span className="font-semibold">CTA:</span>
                  <span className="rounded bg-[#eef0e6] px-2 py-0.5 text-[11px] text-[#2A2E1F]">
                    {b.ctaText} &rarr; {b.targetUrl}
                  </span>
                </div>
              </div>

              {/* Actions & Visibility Combined */}
              <div className="border-t border-[#f0f2e8] pt-3 flex items-center justify-between">
                <button
                  onClick={() => toggleSingleVisibility(b.id)}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                    b.visibility
                      ? 'bg-[#7A8C3C]/15 text-[#596827]'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {b.visibility ? <Eye size={12} /> : <EyeOff size={12} />}
                  <span>{b.visibility ? 'Published' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingBanner(b)
                      setFormData({ ...b })
                      setModalOpen(true)
                    }}
                    className="rounded p-1.5 text-[#555d3a] hover:bg-[#eef0e6]"
                    title="Edit Banner"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteSingle(b.id)}
                    className="rounded p-1.5 text-rose-600 hover:bg-rose-50"
                    title="Delete Banner"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CRUD Banner Modal */}
      <ModalDialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingBanner ? 'Edit Banner Slide' : 'Add Hero Banner Slide'}
        subtitle="Configure video/image source, labels, and target links."
      >
        <form onSubmit={handleSaveBanner} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Banner Headline / Location Label
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. Kuala Lumpur, Jakarta, Bali..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Subtitle / Description
            </label>
            <textarea
              rows={2}
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] p-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. Building premium spaces for business travelers..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Media Type
              </label>
              <select
                value={formData.mediaType}
                onChange={(e) => setFormData({ ...formData, mediaType: e.target.value as 'image' | 'video' })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              >
                <option value="video">MP4 Video</option>
                <option value="image">Still Image</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Display Order Sequence
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Media Stream URL (Video or Image)
            </label>
            <input
              type="url"
              required
              value={formData.mediaUrl}
              onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Target Navigation URL
              </label>
              <input
                type="text"
                value={formData.targetUrl}
                onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none font-mono"
              />
            </div>
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
              Save Banner Slide
            </button>
          </div>
        </form>
      </ModalDialog>
    </div>
  )
}
