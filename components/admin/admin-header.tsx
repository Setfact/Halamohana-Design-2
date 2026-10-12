'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bell,
  Search,
  ExternalLink,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react'
import { initialUserProfile } from '@/lib/cms-store'

interface HeaderNotification {
  id: string
  title: string
  time: string
  type: 'info' | 'success' | 'alert'
  read: boolean
}

const mockNotifications: HeaderNotification[] = [
  { id: '1', title: 'New partnership inquiry from Robert Tan (Contact Us)', time: '10m ago', type: 'alert', read: false },
  { id: '2', title: 'New applicant for Front Office Manager: Yusuf Maulana', time: '1h ago', type: 'info', read: false },
  { id: '3', title: 'General configuration synchronized successfully', time: '2h ago', type: 'success', read: true },
]

export default function AdminHeader() {
  const pathname = usePathname()
  const [showNotif, setShowNotif] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  // Map path to title
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard Overview'
    if (pathname.includes('/general-config')) return 'General Configuration'
    if (pathname.includes('/users')) return 'User & Role Administration'
    if (pathname.includes('/pages')) return 'Page Administration'
    if (pathname.includes('/media')) return 'Media Library'
    if (pathname.includes('/banners')) return 'Banner Management'
    if (pathname.includes('/news')) return 'News Management'
    if (pathname.includes('/corporate-info')) return 'Corporate Information'
    if (pathname.includes('/projects')) return 'Project Management'
    if (pathname.includes('/contact-us')) return 'Contact Us Inquiries'
    if (pathname.includes('/gallery')) return 'Gallery Management'
    if (pathname.includes('/career')) return 'Career Management'
    return 'CMS Administration'
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="relative z-30 flex h-20 items-center justify-between border-b border-[#dde0cc] bg-[#F8F9F4] px-8 shadow-xs">
      {/* Left: Breadcrumb & Title */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-xs text-[#7A8C3C] font-medium uppercase tracking-wider">
          <span>Portal</span>
          <span>/</span>
          <span className="text-[#3a3a2e]">{getPageTitle()}</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#2A2E1F] leading-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8C3C]" />
          <input
            type="text"
            placeholder="Quick search in CMS..."
            className="h-9 w-64 rounded-sm border border-[#dde0cc] bg-white pl-9 pr-3 text-xs text-[#3a3a2e] placeholder-[#9b9f88] focus:border-[#7A8C3C] focus:outline-none transition-colors"
          />
        </div>

        {/* Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#d2d7bc] bg-white px-3 py-1 text-xs text-[#555d3a]">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">System Online</span>
        </div>

        {/* Quick Link to Public Site */}
        <Link
          href="/"
          target="_blank"
          className="flex h-9 items-center gap-1.5 rounded-sm border border-[#7A8C3C] bg-white px-3 text-xs font-semibold text-[#7A8C3C] hover:bg-[#7A8C3C] hover:text-white transition-all shadow-xs"
        >
          <ExternalLink size={13} />
          <span className="hidden sm:inline">Website</span>
        </Link>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative flex h-9 w-9 items-center justify-center rounded-sm border border-[#dde0cc] bg-white text-[#3a3a2e] hover:border-[#7A8C3C] hover:text-[#7A8C3C] transition-colors"
            title="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B5B847] text-[10px] font-bold text-[#141510]">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-12 w-80 rounded-sm border border-[#dde0cc] bg-white p-3 shadow-xl z-50">
              <div className="flex items-center justify-between border-b border-[#dde0cc] pb-2 mb-2">
                <span className="font-serif text-sm font-semibold text-[#2A2E1F]">Notifications</span>
                <button
                  onClick={() => setShowNotif(false)}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setNotifications(notifications.map(item => item.id === n.id ? { ...item, read: true } : item))
                    }}
                    className={`cursor-pointer rounded p-2 text-xs transition-colors ${
                      n.read ? 'bg-gray-50 text-gray-600' : 'bg-[#F8F9F4] text-[#2A2E1F] font-medium border-l-2 border-[#7A8C3C]'
                    }`}
                  >
                    <div className="flex items-start gap-1.5">
                      {n.type === 'alert' && <AlertCircle size={13} className="text-amber-600 shrink-0 mt-0.5" />}
                      {n.type === 'success' && <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />}
                      {n.type === 'info' && <Bell size={13} className="text-[#7A8C3C] shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <p>{n.title}</p>
                        <span className="text-[10px] text-gray-400">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 rounded-sm border border-[#dde0cc] bg-white p-1.5 pr-3 text-left hover:border-[#7A8C3C] transition-colors"
          >
            <img
              src={initialUserProfile.avatar}
              alt="Avatar"
              className="h-7 w-7 rounded-full object-cover border border-[#dde0cc]"
            />
            <div className="hidden lg:flex flex-col">
              <span className="text-xs font-semibold text-[#2A2E1F] leading-tight">
                {initialUserProfile.fullName}
              </span>
              <span className="text-[10px] text-[#7A8C3C]">
                {initialUserProfile.role}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-56 rounded-sm border border-[#dde0cc] bg-white p-2 shadow-xl z-50">
              <div className="border-b border-[#dde0cc] pb-2 mb-2 px-2">
                <p className="text-xs font-bold text-[#2A2E1F]">{initialUserProfile.fullName}</p>
                <p className="text-[11px] text-[#6b6b55] truncate">{initialUserProfile.email}</p>
              </div>
              <Link
                href="/admin/users"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-[#3a3a2e] hover:bg-[#F8F9F4] hover:text-[#7A8C3C]"
              >
                <User size={14} />
                <span>My Profile & Settings</span>
              </Link>
              <Link
                href="/admin/users"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-[#3a3a2e] hover:bg-[#F8F9F4] hover:text-[#7A8C3C]"
              >
                <Shield size={14} />
                <span>Role & Permissions</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
