'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Settings,
  Users,
  Layers,
  Image as ImageIcon,
  Sliders,
  Newspaper,
  Building2,
  FolderKanban,
  Mail,
  Camera,
  Briefcase,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: typeof LayoutDashboard
  badge?: string
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'General Config', href: '/admin/general-config', icon: Settings },
  { title: 'User & Roles', href: '/admin/users', icon: Users },
  { title: 'Page Navigation', href: '/admin/pages', icon: Layers },
  { title: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { title: 'Banners', href: '/admin/banners', icon: Sliders },
  { title: 'News', href: '/admin/news', icon: Newspaper, badge: 'Word Edit' },
  { title: 'Corporate Info', href: '/admin/corporate-info', icon: Building2 },
  { title: 'Manage Project', href: '/admin/projects', icon: FolderKanban },
  { title: 'Contact Us', href: '/admin/contact-us', icon: Mail, badge: 'New' },
  { title: 'Manage Gallery', href: '/admin/gallery', icon: Camera },
  { title: 'Manage Career', href: '/admin/career', icon: Briefcase },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`relative flex flex-col border-r border-[#26281e] bg-[#141510] text-[#f0f2e8] transition-all duration-300 ease-in-out shrink-0 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between border-b border-[#26281e] px-4">
        <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#7A8C3C] text-white shadow-md">
            <span className="font-serif text-xl font-bold tracking-wider">H</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-serif text-base font-semibold tracking-wide text-white">
                Halla Mohana
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#B5B847]">
                CMS Portal
              </span>
            </div>
          )}
        </Link>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-[#2b2e22] text-[#9b9f88] hover:border-[#7A8C3C] hover:text-white transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className={`px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7A8C3C] ${collapsed ? 'hidden' : 'block'}`}>
          Navigation Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#7A8C3C] text-white shadow-sm'
                  : 'text-[#c2c5b3] hover:bg-[#202219] hover:text-white'
              }`}
              title={collapsed ? item.title : undefined}
            >
              <Icon
                size={18}
                className={`shrink-0 transition-transform ${
                  isActive ? 'text-white' : 'text-[#8f9479] group-hover:text-[#B5B847]'
                }`}
              />
              {!collapsed && (
                <span className="flex-1 truncate tracking-wide">{item.title}</span>
              )}
              {!collapsed && item.badge && (
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#7A8C3C]/20 text-[#B5B847]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Bottom Footer Actions */}
      <div className="border-t border-[#26281e] p-3 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-sm border border-[#2e3124] bg-[#1a1b14] px-3 py-2 text-xs font-medium text-[#c0c4b2] hover:border-[#7A8C3C] hover:text-white transition-all"
        >
          <ExternalLink size={15} className="text-[#B5B847] shrink-0" />
          {!collapsed && <span>Preview Public Site</span>}
        </Link>

        {!collapsed && (
          <div className="flex items-center gap-2 px-1 pt-1 text-[11px] text-[#717562]">
            <ShieldCheck size={13} className="text-[#7A8C3C]" />
            <span>Secure Enterprise CMS</span>
          </div>
        )}
      </div>
    </aside>
  )
}
