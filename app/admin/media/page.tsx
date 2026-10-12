'use client'

import { useState } from 'react'
import {
  Image as ImageIcon,
  FileText,
  Upload,
  Copy,
  Check,
  Sliders,
  Trash2,
  Download,
  Folder,
  User,
  Clock,
  Sparkles,
} from 'lucide-react'
import {
  useCMSState,
  initialMediaImages,
  initialMediaDocuments,
  initialUserProfile,
} from '@/lib/cms-store'
import type { MediaImage, MediaDocument } from '@/lib/cms-types'
import ModalDialog from '@/components/admin/modal-dialog'

export default function MediaLibraryPage() {
  const [activeTab, setActiveTab] = useState<'images' | 'documents'>('images')

  // CMS State
  const [images, setImages] = useCMSState<MediaImage[]>('media_images', initialMediaImages)
  const [documents, setDocuments] = useCMSState<MediaDocument[]>('media_documents', initialMediaDocuments)

  // Modals
  const [uploadImageModal, setUploadImageModal] = useState(false)
  const [uploadDocModal, setUploadDocModal] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Upload Image Form State
  const [imageForm, setImageForm] = useState({
    name: '',
    url: '',
    directory: '/public/images/properties/',
    connectToCarousel: false,
  })

  // Upload Doc Form State
  const [docForm, setDocForm] = useState({
    name: '',
    url: '',
    directory: '/public/docs/annual-reports/',
    fileType: 'PDF Document',
  })

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Handle Image Upload
  const handleSaveImage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageForm.name || !imageForm.url) return

    const newImg: MediaImage = {
      id: `img-${Date.now()}`,
      name: imageForm.name,
      directory: imageForm.directory,
      url: imageForm.url,
      size: '1.4 MB',
      dimensions: '1920x1080',
      uploadedBy: initialUserProfile.fullName,
      uploadedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      connectedToCarousel: imageForm.connectToCarousel,
    }

    setImages([newImg, ...images])
    setUploadImageModal(false)
    setImageForm({
      name: '',
      url: '',
      directory: '/public/images/properties/',
      connectToCarousel: false,
    })
  }

  // Handle Doc Upload
  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault()
    if (!docForm.name || !docForm.url) return

    const newDoc: MediaDocument = {
      id: `doc-${Date.now()}`,
      name: docForm.name,
      directory: docForm.directory,
      url: docForm.url,
      size: '2.5 MB',
      fileType: docForm.fileType,
      uploadedBy: initialUserProfile.fullName,
      uploadedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      downloadCount: 0,
    }

    setDocuments([newDoc, ...documents])
    setUploadDocModal(false)
    setDocForm({
      name: '',
      url: '',
      directory: '/public/docs/annual-reports/',
      fileType: 'PDF Document',
    })
  }

  const handleDeleteImage = (id: string) => {
    if (window.confirm('Delete image asset?')) {
      setImages(images.filter((img) => img.id !== id))
    }
  }

  const handleDeleteDoc = (id: string) => {
    if (window.confirm('Delete document asset?')) {
      setDocuments(documents.filter((doc) => doc.id !== id))
    }
  }

  const toggleCarouselConnection = (id: string) => {
    setImages(
      images.map((img) =>
        img.id === id ? { ...img, connectedToCarousel: !img.connectedToCarousel } : img
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">Media Library</h2>
          <p className="text-xs text-[#6b6b55] mt-1">
            Browse stored images, inspect server directories, connect assets to carousels, and manage uploaded corporate documents.
          </p>
        </div>

        {activeTab === 'images' ? (
          <button
            onClick={() => setUploadImageModal(true)}
            className="flex h-9 items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-4 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-all"
          >
            <Upload size={14} />
            <span>Upload Image</span>
          </button>
        ) : (
          <button
            onClick={() => setUploadDocModal(true)}
            className="flex h-9 items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-4 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-all"
          >
            <Upload size={14} />
            <span>Upload Document</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#dde0cc] bg-white px-4 rounded-sm shadow-xs">
        <button
          onClick={() => setActiveTab('images')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'images'
              ? 'border-[#7A8C3C] text-[#7A8C3C]'
              : 'border-transparent text-[#6b6b55] hover:text-[#2A2E1F]'
          }`}
        >
          <ImageIcon size={15} />
          <span>Image Library ({images.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'documents'
              ? 'border-[#7A8C3C] text-[#7A8C3C]'
              : 'border-transparent text-[#6b6b55] hover:text-[#2A2E1F]'
          }`}
        >
          <FileText size={15} />
          <span>Document Library ({documents.length})</span>
        </button>
      </div>

      {/* ── TAB 1: IMAGE LIBRARY ── */}
      {activeTab === 'images' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="flex flex-col rounded-sm border border-[#dde0cc] bg-white overflow-hidden shadow-xs hover:border-[#7A8C3C] transition-all"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video bg-[#181914] overflow-hidden group">
                <img
                  src={img.url}
                  alt={img.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Carousel badge / switch */}
                <button
                  onClick={() => toggleCarouselConnection(img.id)}
                  className={`absolute top-2 left-2 flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase transition-all shadow-md ${
                    img.connectedToCarousel
                      ? 'bg-[#7A8C3C] text-white'
                      : 'bg-black/60 text-white/70 hover:bg-black/80 hover:text-white'
                  }`}
                  title="Click to toggle connect to all carousels"
                >
                  <Sliders size={11} />
                  <span>{img.connectedToCarousel ? 'Connected to Carousel' : 'Connect to Carousel'}</span>
                </button>

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded bg-black/60 text-white/80 hover:bg-rose-600 hover:text-white transition-all shadow-md"
                  title="Delete image"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Meta details */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#2A2E1F] truncate" title={img.name}>
                    {img.name}
                  </h4>

                  {/* Directory Path (see_dir_of_each_uploaded_image) */}
                  <div className="mt-2 flex items-center justify-between rounded bg-[#F8F9F4] border border-[#dde0cc] px-2.5 py-1.5 text-[11px] text-[#555d3a]">
                    <span className="flex items-center gap-1 font-mono truncate max-w-[210px]">
                      <Folder size={12} className="text-[#7A8C3C] shrink-0" />
                      <span>{img.directory}{img.name}</span>
                    </span>
                    <button
                      onClick={() => copyToClipboard(img.directory + img.name, img.id)}
                      className="ml-1 text-[#7A8C3C] hover:text-[#2A2E1F] transition-colors shrink-0"
                      title="Copy path"
                    >
                      {copiedId === img.id ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                {/* Uploader & Spec Info (see_what_user_has_upload) */}
                <div className="border-t border-[#f0f2e8] pt-2 text-[11px] text-[#6b6b55] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <User size={11} className="text-[#8f9479]" />
                      <span>{img.uploadedBy}</span>
                    </span>
                    <span>{img.size} ({img.dimensions})</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#8f9479]">
                    <Clock size={10} />
                    <span>Uploaded on {img.uploadedAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 2: DOCUMENT LIBRARY ── */}
      {activeTab === 'documents' && (
        <div className="rounded-sm border border-[#dde0cc] bg-white shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9F4] text-[#555d3a] border-b border-[#dde0cc]">
              <tr>
                <th className="px-4 py-3 font-semibold uppercase">No</th>
                <th className="px-4 py-3 font-semibold uppercase">Document Name</th>
                <th className="px-4 py-3 font-semibold uppercase">Server Directory</th>
                <th className="px-4 py-3 font-semibold uppercase">Size & Type</th>
                <th className="px-4 py-3 font-semibold uppercase">Uploaded By</th>
                <th className="px-4 py-3 font-semibold uppercase">Uploaded Date</th>
                <th className="px-4 py-3 font-semibold uppercase text-center">Downloads</th>
                <th className="px-4 py-3 font-semibold uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef0e6] text-[#2A2E1F]">
              {documents.map((doc, idx) => (
                <tr key={doc.id} className="hover:bg-[#fbfcf8]">
                  <td className="px-4 py-3.5 text-[#6b6b55] font-mono">{idx + 1}</td>
                  <td className="px-4 py-3.5 font-bold flex items-center gap-2">
                    <FileText size={16} className="text-[#7A8C3C] shrink-0" />
                    <span>{doc.name}</span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-[#555d3a]">
                    <div className="flex items-center gap-1.5">
                      <span>{doc.directory}</span>
                      <button
                        onClick={() => copyToClipboard(doc.directory + doc.name, doc.id)}
                        className="text-[#7A8C3C] hover:text-[#2A2E1F]"
                        title="Copy file path"
                      >
                        {copiedId === doc.id ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded bg-[#eef0e6] px-2 py-0.5 text-[10px] font-semibold text-[#555d3a]">
                      {doc.size} • {doc.fileType}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[#6b6b55]">{doc.uploadedBy}</td>
                  <td className="px-4 py-3.5 text-[#6b6b55]">{doc.uploadedAt}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-[#7A8C3C]">{doc.downloadCount}</td>
                  <td className="px-4 py-3.5 text-right space-x-1 whitespace-nowrap">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block rounded p-1.5 text-[#555d3a] hover:bg-[#eef0e6]"
                      title="Download / View document"
                    >
                      <Download size={14} />
                    </a>
                    <button
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="rounded p-1.5 text-rose-600 hover:bg-rose-50"
                      title="Delete document"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Image Modal */}
      <ModalDialog
        isOpen={uploadImageModal}
        onClose={() => setUploadImageModal(false)}
        title="Upload Image Asset"
        subtitle="Add photography, banners, or project photos to the image library."
      >
        <form onSubmit={handleSaveImage} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Image File Name
            </label>
            <input
              type="text"
              required
              value={imageForm.name}
              onChange={(e) => setImageForm({ ...imageForm, name: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. bali-luxury-resort-pool.jpg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Image Source URL
            </label>
            <input
              type="url"
              required
              value={imageForm.url}
              onChange={(e) => setImageForm({ ...imageForm, url: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Storage Directory
            </label>
            <select
              value={imageForm.directory}
              onChange={(e) => setImageForm({ ...imageForm, directory: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none font-mono"
            >
              <option value="/public/images/properties/">/public/images/properties/</option>
              <option value="/public/images/hero/">/public/images/hero/</option>
              <option value="/public/images/news/">/public/images/news/</option>
              <option value="/public/images/brand/">/public/images/brand/</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="carouselCheck"
              checked={imageForm.connectToCarousel}
              onChange={(e) => setImageForm({ ...imageForm, connectToCarousel: e.target.checked })}
              className="accent-[#7A8C3C]"
            />
            <label htmlFor="carouselCheck" className="text-xs font-medium text-[#2A2E1F] cursor-pointer">
              Connect this image to website carousel slides
            </label>
          </div>

          <div className="border-t border-[#dde0cc] pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setUploadImageModal(false)}
              className="rounded-sm border border-[#dde0cc] px-4 py-2 text-xs font-semibold text-[#6b6b55] hover:bg-[#eef0e6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-sm bg-[#7A8C3C] px-5 py-2 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914]"
            >
              Upload Asset
            </button>
          </div>
        </form>
      </ModalDialog>

      {/* Upload Doc Modal */}
      <ModalDialog
        isOpen={uploadDocModal}
        onClose={() => setUploadDocModal(false)}
        title="Upload Corporate Document"
        subtitle="Add governance policies, financial disclosures, or brochures."
      >
        <form onSubmit={handleSaveDoc} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Document Name
            </label>
            <input
              type="text"
              required
              value={docForm.name}
              onChange={(e) => setDocForm({ ...docForm, name: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. Halla_Mohana_Financial_Report_Q3.pdf"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Document URL / Path
            </label>
            <input
              type="text"
              required
              value={docForm.url}
              onChange={(e) => setDocForm({ ...docForm, url: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. /public/docs/annual-reports/Halla_Report.pdf"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Directory Folder
              </label>
              <select
                value={docForm.directory}
                onChange={(e) => setDocForm({ ...docForm, directory: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none font-mono"
              >
                <option value="/public/docs/annual-reports/">/public/docs/annual-reports/</option>
                <option value="/public/docs/governance/">/public/docs/governance/</option>
                <option value="/public/docs/csr/">/public/docs/csr/</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                File Type
              </label>
              <select
                value={docForm.fileType}
                onChange={(e) => setDocForm({ ...docForm, fileType: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              >
                <option value="PDF Document">PDF Document</option>
                <option value="Word DOCX">Word DOCX</option>
                <option value="Spreadsheet XLSX">Spreadsheet XLSX</option>
              </select>
            </div>
          </div>

          <div className="border-t border-[#dde0cc] pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setUploadDocModal(false)}
              className="rounded-sm border border-[#dde0cc] px-4 py-2 text-xs font-semibold text-[#6b6b55] hover:bg-[#eef0e6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-sm bg-[#7A8C3C] px-5 py-2 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914]"
            >
              Upload Document
            </button>
          </div>
        </form>
      </ModalDialog>
    </div>
  )
}
