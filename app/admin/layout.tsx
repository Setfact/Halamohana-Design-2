import type { Metadata } from 'next'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'

export const metadata: Metadata = {
  title: 'Halla Mohana — CMS Portal',
  description: 'Enterprise Content Management System for PT Halla Mohana',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8F9F4] font-sans text-[#2A2E1F]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-[#F8F9F4] p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
