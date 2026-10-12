'use client'

import { useState } from 'react'
import {
  Save,
  RotateCcw,
  Upload,
  CheckCircle2,
  Building,
  Mail,
  Shield,
  Layers,
  Image as ImageIcon,
} from 'lucide-react'
import { useCMSState, initialGeneralConfig } from '@/lib/cms-store'
import type { GeneralConfig } from '@/lib/cms-types'

export default function GeneralConfigPage() {
  const [config, setConfig] = useCMSState<GeneralConfig>('general_config', initialGeneralConfig)
  const [formState, setFormState] = useState<GeneralConfig>(config)
  const [savedAlert, setSavedAlert] = useState(false)
  const [newIpInput, setNewIpInput] = useState('')

  // Sync if config changes
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setConfig(formState)
    setSavedAlert(true)
    setTimeout(() => setSavedAlert(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset all general configurations to default?')) {
      setFormState(initialGeneralConfig)
      setConfig(initialGeneralConfig)
    }
  }

  const handleAddIp = () => {
    if (newIpInput.trim() && !formState.allowedIps.includes(newIpInput.trim())) {
      setFormState({
        ...formState,
        allowedIps: [...formState.allowedIps, newIpInput.trim()],
      })
      setNewIpInput('')
    }
  }

  const handleRemoveIp = (ip: string) => {
    setFormState({
      ...formState,
      allowedIps: formState.allowedIps.filter((item) => item !== ip),
    })
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">General Configuration</h2>
          <p className="text-xs text-[#6b6b55] mt-1">
            Manage global site parameters, brand logos, security options, office addresses, and automated email routing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex h-9 items-center gap-1.5 rounded-sm border border-[#dde0cc] bg-white px-3 text-xs font-semibold text-[#6b6b55] hover:bg-[#eef0e6] transition-colors"
          >
            <RotateCcw size={14} />
            <span>Reset Default</span>
          </button>
          <button
            type="submit"
            className="flex h-9 items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-4 text-xs font-semibold text-white shadow-xs hover:bg-[#B5B847] hover:text-[#181914] transition-all"
          >
            <Save size={14} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Success Alert */}
      {savedAlert && (
        <div className="flex items-center gap-2 rounded-sm border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800 animate-in fade-in">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>General configuration has been saved successfully and synchronized across the website!</span>
        </div>
      )}

      {/* Section 1: Input Fields (Status, Logo, Footer Logo, Copyright) */}
      <div className="rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-[#dde0cc] pb-3">
          <Layers size={18} className="text-[#7A8C3C]" />
          <h3 className="font-serif text-base font-bold text-[#2A2E1F]">
            1. Core Identity & Status
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Status field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1.5">
              Website Status
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs font-medium text-[#2A2E1F] cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formState.status === 'active'}
                  onChange={() => setFormState({ ...formState, status: 'active' })}
                  className="accent-[#7A8C3C]"
                />
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Active (Live to Public)
                </span>
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-[#2A2E1F] cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="maintenance"
                  checked={formState.status === 'maintenance'}
                  onChange={() => setFormState({ ...formState, status: 'maintenance' })}
                  className="accent-[#7A8C3C]"
                />
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Maintenance Mode
                </span>
              </label>
            </div>
            <p className="mt-1 text-[11px] text-[#8f9479]">
              Set whether public visitors can access the full site or a maintenance landing page.
            </p>
          </div>

          {/* Copyright field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1.5">
              Copyright Text
            </label>
            <input
              type="text"
              value={formState.copyright}
              onChange={(e) => setFormState({ ...formState, copyright: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. © 2026 PT Halla Mohana..."
            />
          </div>

          {/* Logo Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1.5">
              Header Logo
            </label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-32 items-center justify-center rounded border border-[#dde0cc] bg-[#F8F9F4] p-2">
                <img
                  src={formState.logo}
                  alt="Header Logo Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={formState.logo}
                  onChange={(e) => setFormState({ ...formState, logo: e.target.value })}
                  className="h-8 w-full rounded-sm border border-[#dde0cc] bg-white px-2.5 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
                  placeholder="URL logo header"
                />
                <p className="text-[10px] text-[#8f9479]">Recommended transparent PNG (approx 300x120px)</p>
              </div>
            </div>
          </div>

          {/* Footer Logo Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1.5">
              Footer Logo
            </label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-32 items-center justify-center rounded border border-[#dde0cc] bg-[#1a1a1a] p-2">
                <img
                  src={formState.footerLogo}
                  alt="Footer Logo Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={formState.footerLogo}
                  onChange={(e) => setFormState({ ...formState, footerLogo: e.target.value })}
                  className="h-8 w-full rounded-sm border border-[#dde0cc] bg-white px-2.5 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
                  placeholder="URL logo footer"
                />
                <p className="text-[10px] text-[#8f9479]">Displayed against dark footer background</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Option Field (Check IP Login) */}
      <div className="rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-[#dde0cc] pb-3">
          <Shield size={18} className="text-[#7A8C3C]" />
          <h3 className="font-serif text-base font-bold text-[#2A2E1F]">
            2. Security Options (Check IP Login)
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#2A2E1F]">Enforce IP Login Verification</p>
              <p className="text-[11px] text-[#6b6b55]">
                Only allow administrator logins from specified whitelisted IP addresses.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormState({ ...formState, checkIpLogin: !formState.checkIpLogin })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formState.checkIpLogin ? 'bg-[#7A8C3C]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formState.checkIpLogin ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {formState.checkIpLogin && (
            <div className="rounded border border-[#dde0cc] bg-[#F8F9F4] p-4 space-y-3">
              <label className="block text-xs font-semibold text-[#3a3a2e]">
                Whitelisted IP Addresses
              </label>
              <div className="flex flex-wrap gap-2">
                {formState.allowedIps.map((ip) => (
                  <span
                    key={ip}
                    className="inline-flex items-center gap-1.5 rounded-sm bg-white border border-[#dde0cc] px-2.5 py-1 text-xs font-mono text-[#2A2E1F]"
                  >
                    <span>{ip}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIp(ip)}
                      className="text-gray-400 hover:text-rose-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 max-w-sm pt-1">
                <input
                  type="text"
                  value={newIpInput}
                  onChange={(e) => setNewIpInput(e.target.value)}
                  placeholder="e.g. 192.168.1.10"
                  className="h-8 flex-1 rounded-sm border border-[#dde0cc] bg-white px-2.5 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddIp}
                  className="rounded-sm bg-[#7A8C3C] px-3 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-colors"
                >
                  Add IP
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 3 & 4: Office Info & Side Office Info */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Office Info (Head Office) */}
        <div className="rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#dde0cc] pb-3">
            <Building size={18} className="text-[#7A8C3C]" />
            <h3 className="font-serif text-base font-bold text-[#2A2E1F]">
              3. Office Info (Head Office)
            </h3>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Address
            </label>
            <textarea
              rows={3}
              value={formState.officeInfo.address}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  officeInfo: { ...formState.officeInfo, address: e.target.value },
                })
              }
              className="w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] p-2.5 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Phone
              </label>
              <input
                type="text"
                value={formState.officeInfo.phone}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    officeInfo: { ...formState.officeInfo, phone: e.target.value },
                  })
                }
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-2.5 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Fax
              </label>
              <input
                type="text"
                value={formState.officeInfo.fax}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    officeInfo: { ...formState.officeInfo, fax: e.target.value },
                  })
                }
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-2.5 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Side Office Info */}
        <div className="rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#dde0cc] pb-3">
            <Building size={18} className="text-[#7A8C3C]" />
            <h3 className="font-serif text-base font-bold text-[#2A2E1F]">
              4. Side Office Info (Site Office)
            </h3>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Address
            </label>
            <textarea
              rows={3}
              value={formState.sideOfficeInfo.address}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  sideOfficeInfo: { ...formState.sideOfficeInfo, address: e.target.value },
                })
              }
              className="w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] p-2.5 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Phone
              </label>
              <input
                type="text"
                value={formState.sideOfficeInfo.phone}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    sideOfficeInfo: { ...formState.sideOfficeInfo, phone: e.target.value },
                  })
                }
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-2.5 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Fax
              </label>
              <input
                type="text"
                value={formState.sideOfficeInfo.fax}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    sideOfficeInfo: { ...formState.sideOfficeInfo, fax: e.target.value },
                  })
                }
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-2.5 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Auto Send Email */}
      <div className="rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#dde0cc] pb-3">
          <Mail size={18} className="text-[#7A8C3C]" />
          <h3 className="font-serif text-base font-bold text-[#2A2E1F]">
            5. Automated Email Routing
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Send Contact Us Emails To
            </label>
            <input
              type="email"
              value={formState.autoSendEmail.sendContactUs}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  autoSendEmail: { ...formState.autoSendEmail, sendContactUs: e.target.value },
                })
              }
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. info@hallamohana.co.id"
            />
            <p className="mt-1 text-[11px] text-[#8f9479]">
              Destination inbox for incoming customer inquiries submitted from Contact page.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Send Career Applications To
            </label>
            <input
              type="email"
              value={formState.autoSendEmail.sendCareerApplicationTo}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  autoSendEmail: { ...formState.autoSendEmail, sendCareerApplicationTo: e.target.value },
                })
              }
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. recruitment@hallamohana.co.id"
            />
            <p className="mt-1 text-[11px] text-[#8f9479]">
              Destination HR inbox for applicant CVs and job application alerts.
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
