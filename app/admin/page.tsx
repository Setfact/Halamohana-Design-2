'use client'

import Link from 'next/link'
import {
  Newspaper,
  FolderKanban,
  Mail,
  Briefcase,
  Image as ImageIcon,
  Users,
  Settings,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import {
  useCMSState,
  initialNews,
  initialProjects,
  initialContactUs,
  initialCareers,
  initialMediaImages,
  initialActivityLogs,
  initialGeneralConfig,
} from '@/lib/cms-store'

export default function AdminDashboardPage() {
  const [news] = useCMSState('news', initialNews)
  const [projects] = useCMSState('projects', initialProjects)
  const [contactUs] = useCMSState('contact_us', initialContactUs)
  const [careers] = useCMSState('careers', initialCareers)
  const [images] = useCMSState('media_images', initialMediaImages)
  const [logs] = useCMSState('activity_logs', initialActivityLogs)
  const [config] = useCMSState('general_config', initialGeneralConfig)

  const unreadMessages = contactUs.filter((c) => !c.visibility).length
  const totalApplicants = careers.reduce((acc, curr) => acc + (curr.applicantCount || 0), 0)

  const stats = [
    {
      title: 'Published News',
      value: news.length,
      subtitle: `${news.filter((n) => n.visibility).length} active articles`,
      icon: Newspaper,
      href: '/admin/news',
      color: 'text-[#7A8C3C]',
      bg: 'bg-[#7A8C3C]/10',
    },
    {
      title: 'Active Projects',
      value: projects.length,
      subtitle: 'Hotels, Malls & Resorts',
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'text-[#B5B847]',
      bg: 'bg-[#B5B847]/15',
    },
    {
      title: 'Contact Inquiries',
      value: contactUs.length,
      subtitle: unreadMessages > 0 ? `${unreadMessages} unread messages` : 'All caught up',
      icon: Mail,
      href: '/admin/contact-us',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      badge: unreadMessages > 0 ? `${unreadMessages} New` : undefined,
    },
    {
      title: 'Career Positions',
      value: careers.length,
      subtitle: `${totalApplicants} candidate applications`,
      icon: Briefcase,
      href: '/admin/career',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Media Files',
      value: images.length,
      subtitle: 'Assets in media library',
      icon: ImageIcon,
      href: '/admin/media',
      color: 'text-sky-700',
      bg: 'bg-sky-50',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-sm border border-[#dde0cc] bg-gradient-to-r from-[#181914] to-[#25281b] p-8 text-white shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B5B847] mb-2 font-medium">
            <span>Hospitality Development</span>
            <span>•</span>
            <span>Enterprise CMS</span>
          </div>
          <h2 className="font-serif text-3xl font-bold leading-tight text-white">
            Welcome to PT Halla Mohana CMS
          </h2>
          <p className="mt-2 text-sm text-[#c8cdb7] leading-relaxed">
            Manage your website content, multimedia catalogs, general site configuration, career postings, and customer inquiries with luxury brand coherence.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/admin/news"
              className="flex items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-all shadow-xs"
            >
              <span>Create News Article</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/admin/general-config"
              className="flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 transition-all"
            >
              <Settings size={14} />
              <span>General Settings</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-sm border border-[#B5B847]/40 bg-[#B5B847]/10 px-4 py-2 text-xs font-semibold text-[#B5B847] hover:bg-[#B5B847]/20 transition-all"
            >
              <span>View Live Website</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Decorative corner emblem */}
        <div className="absolute right-6 -bottom-6 opacity-10 pointer-events-none">
          <span className="font-serif text-9xl font-bold text-white">HM</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col justify-between rounded-sm border border-[#dde0cc] bg-white p-5 shadow-xs hover:border-[#7A8C3C] hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-sm ${item.bg} ${item.color}`}>
                  <Icon size={20} />
                </div>
                {item.badge && (
                  <span className="rounded bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-[#2A2E1F] group-hover:text-[#7A8C3C] transition-colors">
                  {item.value}
                </span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6b6b55] mt-0.5">
                  {item.title}
                </h3>
                <p className="mt-1 text-[11px] text-[#8f9479] truncate">{item.subtitle}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Two Column Section: Live Config Overview & Recent Activity */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Live Config Card */}
        <div className="rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#dde0cc] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Settings size={16} className="text-[#7A8C3C]" />
              <h3 className="font-serif text-base font-bold text-[#2A2E1F]">General Config Status</h3>
            </div>
            <Link href="/admin/general-config" className="text-xs font-semibold text-[#7A8C3C] hover:underline">
              Edit
            </Link>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-[#f0f2e8]">
              <span className="text-[#6b6b55]">Site Status</span>
              <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700 capitalize">
                <CheckCircle2 size={12} />
                {config.status}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-[#f0f2e8]">
              <span className="text-[#6b6b55]">IP Login Protection</span>
              <span className={`font-semibold ${config.checkIpLogin ? 'text-[#7A8C3C]' : 'text-gray-400'}`}>
                {config.checkIpLogin ? 'Enforced' : 'Disabled'}
              </span>
            </div>

            <div className="py-1 border-b border-[#f0f2e8]">
              <span className="text-[#6b6b55] block mb-1">Head Office</span>
              <p className="text-[#2A2E1F] font-medium leading-relaxed truncate">{config.officeInfo.address}</p>
              <p className="text-[#8f9479] mt-0.5">Tel: {config.officeInfo.phone}</p>
            </div>

            <div className="py-1 border-b border-[#f0f2e8]">
              <span className="text-[#6b6b55] block mb-1">Site Office (Riau)</span>
              <p className="text-[#2A2E1F] font-medium leading-relaxed truncate">{config.sideOfficeInfo.address}</p>
              <p className="text-[#8f9479] mt-0.5">Tel: {config.sideOfficeInfo.phone}</p>
            </div>

            <div className="py-1">
              <span className="text-[#6b6b55] block mb-1">Routing Auto Email</span>
              <p className="text-[#2A2E1F]">Contact: <strong className="text-[#7A8C3C]">{config.autoSendEmail.sendContactUs}</strong></p>
              <p className="text-[#2A2E1F] mt-0.5">Career: <strong className="text-[#7A8C3C]">{config.autoSendEmail.sendCareerApplicationTo}</strong></p>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Activity Logs */}
        <div className="lg:col-span-2 rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#dde0cc] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#7A8C3C]" />
              <h3 className="font-serif text-base font-bold text-[#2A2E1F]">Recent Audit & Activity Logs</h3>
            </div>
            <Link href="/admin/users" className="text-xs font-semibold text-[#7A8C3C] hover:underline">
              View All History
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9F4] text-[#555d3a]">
                <tr>
                  <th className="px-3 py-2.5 font-semibold">Time</th>
                  <th className="px-3 py-2.5 font-semibold">User</th>
                  <th className="px-3 py-2.5 font-semibold">Action</th>
                  <th className="px-3 py-2.5 font-semibold">Module</th>
                  <th className="px-3 py-2.5 font-semibold">IP Address</th>
                  <th className="px-3 py-2.5 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f2e8] text-[#2A2E1F]">
                {logs.slice(0, 5).map((log) => (
                  <tr key={log.id} className="hover:bg-[#fbfcf8]">
                    <td className="px-3 py-3 text-[#6b6b55] whitespace-nowrap">{log.timestamp}</td>
                    <td className="px-3 py-3 font-semibold">{log.userName}</td>
                    <td className="px-3 py-3 text-[#3a3a2e]">{log.action}</td>
                    <td className="px-3 py-3">
                      <span className="rounded bg-[#eef0e6] px-2 py-0.5 text-[11px] font-medium text-[#555d3a]">
                        {log.module}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] text-[#8f9479]">{log.ipAddress}</td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          log.status === 'success'
                            ? 'bg-emerald-50 text-emerald-700'
                            : log.status === 'warning'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
