'use client'

import { useState } from 'react'
import {
  User as UserIcon,
  Shield,
  History,
  UserCheck,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  Key,
  Clock,
  ShieldCheck,
  Filter,
} from 'lucide-react'
import {
  useCMSState,
  initialUserProfile,
  initialAdminUsers,
  initialRoles,
  initialActivityLogs,
} from '@/lib/cms-store'
import type { AdminUser, AdminRole, UserProfile, ActivityLog } from '@/lib/cms-types'
import ModalDialog from '@/components/admin/modal-dialog'

export default function UsersAdministrationPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'users' | 'roles' | 'history'>('profile')

  // CMS State
  const [profile, setProfile] = useCMSState<UserProfile>('user_profile', initialUserProfile)
  const [users, setUsers] = useCMSState<AdminUser[]>('admin_users', initialAdminUsers)
  const [roles, setRoles] = useCMSState<AdminRole[]>('admin_roles', initialRoles)
  const [logs] = useCMSState<ActivityLog[]>('activity_logs', initialActivityLogs)

  // Profile Edit State
  const [profileForm, setProfileForm] = useState<UserProfile>(profile)
  const [profileSaved, setProfileSaved] = useState(false)

  // User CRUD Modal State
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [userFormData, setUserFormData] = useState<Partial<AdminUser>>({
    name: '',
    email: '',
    role: 'Editor & Marketing',
    status: 'active',
  })

  // Role CRUD Modal State
  const [roleModalOpen, setRoleModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<AdminRole | null>(null)
  const [roleFormData, setRoleFormData] = useState<Partial<AdminRole>>({
    name: '',
    description: '',
  })

  // History search/filter
  const [historySearch, setHistorySearch] = useState('')

  // Handle Profile Save
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProfile(profileForm)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  // Handle User Modal Save
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userFormData.name || !userFormData.email) return

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, ...userFormData, lastLogin: u.lastLogin }
            : u
        )
      )
    } else {
      const newUser: AdminUser = {
        id: `usr-${Date.now()}`,
        name: userFormData.name || '',
        email: userFormData.email || '',
        role: userFormData.role || 'Editor & Marketing',
        status: (userFormData.status as 'active' | 'inactive') || 'active',
        lastLogin: 'Never',
        createdAt: new Date().toISOString().slice(0, 10),
      }
      setUsers([...users, newUser])
    }
    setUserModalOpen(false)
    setEditingUser(null)
  }

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id))
    }
  }

  // Handle Role Save
  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault()
    if (!roleFormData.name) return

    if (editingRole) {
      setRoles(
        roles.map((r) =>
          r.id === editingRole.id
            ? { ...r, name: roleFormData.name!, description: roleFormData.description || '' }
            : r
        )
      )
    } else {
      const newRole: AdminRole = {
        id: `role-${Date.now()}`,
        name: roleFormData.name || '',
        description: roleFormData.description || '',
        userCount: 0,
        permissions: initialRoles[0].permissions.map((p) => ({
          ...p,
          canDelete: false,
        })),
      }
      setRoles([...roles, newRole])
    }
    setRoleModalOpen(false)
    setEditingRole(null)
  }

  const handleDeleteRole = (id: string) => {
    if (window.confirm('Delete this user role?')) {
      setRoles(roles.filter((r) => r.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#2A2E1F]">
          User, Role & Access Administration
        </h2>
        <p className="text-xs text-[#6b6b55] mt-1">
          Manage administrator profiles, user accounts, role permission matrices, and audit security histories.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#dde0cc] bg-white px-4 rounded-sm shadow-xs">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'profile'
              ? 'border-[#7A8C3C] text-[#7A8C3C]'
              : 'border-transparent text-[#6b6b55] hover:text-[#2A2E1F]'
          }`}
        >
          <UserIcon size={15} />
          <span>Profile (See / Edit)</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'users'
              ? 'border-[#7A8C3C] text-[#7A8C3C]'
              : 'border-transparent text-[#6b6b55] hover:text-[#2A2E1F]'
          }`}
        >
          <UserCheck size={15} />
          <span>User Administration (CRUD)</span>
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'roles'
              ? 'border-[#7A8C3C] text-[#7A8C3C]'
              : 'border-transparent text-[#6b6b55] hover:text-[#2A2E1F]'
          }`}
        >
          <Shield size={15} />
          <span>Role Administration (Permissions)</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold tracking-wide transition-all ${
            activeTab === 'history'
              ? 'border-[#7A8C3C] text-[#7A8C3C]'
              : 'border-transparent text-[#6b6b55] hover:text-[#2A2E1F]'
          }`}
        >
          <History size={15} />
          <span>History (Activity Logs)</span>
        </button>
      </div>

      {/* ── TAB 1: PROFILE (SEE & EDIT) ── */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* See Profile Card */}
          <div className="rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.fullName}
                className="h-28 w-28 rounded-full object-cover border-2 border-[#7A8C3C] shadow-md"
              />
              <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <h3 className="mt-4 font-serif text-lg font-bold text-[#2A2E1F]">
              {profile.fullName}
            </h3>
            <p className="rounded-full bg-[#7A8C3C]/10 px-3 py-0.5 text-xs font-medium text-[#7A8C3C] mt-1">
              {profile.role}
            </p>
            <p className="mt-2 text-xs text-[#6b6b55]">{profile.email}</p>
            <p className="text-xs text-[#6b6b55]">{profile.phone}</p>

            <div className="mt-6 w-full border-t border-[#eef0e6] pt-4 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8C3C]">
                Bio / Role Description
              </span>
              <p className="mt-1 text-xs text-[#3a3a2e] leading-relaxed">
                {profile.bio}
              </p>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="lg:col-span-2 rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#dde0cc] pb-3 mb-6">
              <h3 className="font-serif text-base font-bold text-[#2A2E1F]">Edit Profile Information</h3>
              {profileSaved && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <CheckCircle2 size={14} />
                  Changes saved successfully!
                </span>
              )}
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                    Avatar Image URL
                  </label>
                  <input
                    type="text"
                    value={profileForm.avatar}
                    onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                    className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                  Bio / Responsibilities
                </label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] p-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="border-t border-[#dde0cc] pt-4 flex justify-end">
                <button
                  type="submit"
                  className="flex h-9 items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-5 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-all shadow-xs"
                >
                  <Save size={14} />
                  <span>Update Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── TAB 2: USER ADMINISTRATION (CRUD USER) ── */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-sm border border-[#dde0cc]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#2A2E1F]">Administrator Users List</h3>
              <p className="text-xs text-[#6b6b55]">Create, modify, and manage team members with CMS access.</p>
            </div>
            <button
              onClick={() => {
                setEditingUser(null)
                setUserFormData({ name: '', email: '', role: 'Editor & Marketing', status: 'active' })
                setUserModalOpen(true)
              }}
              className="flex h-9 items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-4 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-all"
            >
              <Plus size={14} />
              <span>Add User</span>
            </button>
          </div>

          <div className="rounded-sm border border-[#dde0cc] bg-white shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9F4] text-[#555d3a] border-b border-[#dde0cc]">
                <tr>
                  <th className="px-4 py-3 font-semibold uppercase">No</th>
                  <th className="px-4 py-3 font-semibold uppercase">Name</th>
                  <th className="px-4 py-3 font-semibold uppercase">Email</th>
                  <th className="px-4 py-3 font-semibold uppercase">Role</th>
                  <th className="px-4 py-3 font-semibold uppercase">Status</th>
                  <th className="px-4 py-3 font-semibold uppercase">Last Login</th>
                  <th className="px-4 py-3 font-semibold uppercase">Created</th>
                  <th className="px-4 py-3 font-semibold uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef0e6] text-[#2A2E1F]">
                {users.map((u, i) => (
                  <tr key={u.id} className="hover:bg-[#fbfcf8]">
                    <td className="px-4 py-3 text-[#6b6b55] font-mono">{i + 1}</td>
                    <td className="px-4 py-3 font-bold">{u.name}</td>
                    <td className="px-4 py-3 text-[#6b6b55]">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-[#7A8C3C]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#7A8C3C]">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          u.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#6b6b55]">{u.lastLogin}</td>
                    <td className="px-4 py-3 text-[#6b6b55]">{u.createdAt}</td>
                    <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setEditingUser(u)
                          setUserFormData({
                            name: u.name,
                            email: u.email,
                            role: u.role,
                            status: u.status,
                          })
                          setUserModalOpen(true)
                        }}
                        className="rounded p-1.5 text-[#555d3a] hover:bg-[#eef0e6]"
                        title="Edit User"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="rounded p-1.5 text-rose-600 hover:bg-rose-50"
                        title="Delete User"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 3: ROLE ADMINISTRATION (PERMISSIONS MATRIX) ── */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-sm border border-[#dde0cc]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#2A2E1F]">Roles & Permissions Matrix</h3>
              <p className="text-xs text-[#6b6b55]">
                Configure granular rights (View, Create, Edit, Delete, Visibility Toggle) per role.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingRole(null)
                setRoleFormData({ name: '', description: '' })
                setRoleModalOpen(true)
              }}
              className="flex h-9 items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-4 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914] transition-all"
            >
              <Plus size={14} />
              <span>Create Role</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {roles.map((r) => (
              <div key={r.id} className="rounded-sm border border-[#dde0cc] bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#dde0cc] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-[#7A8C3C]" />
                      <h4 className="font-serif text-base font-bold text-[#2A2E1F]">{r.name}</h4>
                      <span className="rounded bg-[#eef0e6] px-2 py-0.5 text-[11px] font-medium text-[#555d3a]">
                        {r.userCount} Assigned Users
                      </span>
                    </div>
                    <p className="text-xs text-[#6b6b55] mt-1">{r.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingRole(r)
                        setRoleFormData({ name: r.name, description: r.description })
                        setRoleModalOpen(true)
                      }}
                      className="rounded p-1.5 text-[#555d3a] hover:bg-[#eef0e6]"
                      title="Edit Role Info"
                    >
                      <Edit2 size={14} />
                    </button>
                    {r.name !== 'Super Administrator' && (
                      <button
                        onClick={() => handleDeleteRole(r.id)}
                        className="rounded p-1.5 text-rose-600 hover:bg-rose-50"
                        title="Delete Role"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Matrix Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8F9F4] text-[#555d3a] border-b border-[#dde0cc]">
                      <tr>
                        <th className="px-3 py-2 font-semibold">CMS Module</th>
                        <th className="px-3 py-2 font-semibold text-center">View</th>
                        <th className="px-3 py-2 font-semibold text-center">Create</th>
                        <th className="px-3 py-2 font-semibold text-center">Edit</th>
                        <th className="px-3 py-2 font-semibold text-center">Delete</th>
                        <th className="px-3 py-2 font-semibold text-center">Visibility Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f2e8] text-[#2A2E1F]">
                      {r.permissions.map((p, idx) => (
                        <tr key={p.module} className="hover:bg-[#fbfcf8]">
                          <td className="px-3 py-2.5 font-medium">{p.module}</td>
                          <td className="px-3 py-2.5 text-center">
                            <input
                              type="checkbox"
                              checked={p.canView}
                              onChange={(e) => {
                                const newRoles = [...roles]
                                r.permissions[idx].canView = e.target.checked
                                setRoles(newRoles)
                              }}
                              className="accent-[#7A8C3C]"
                            />
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <input
                              type="checkbox"
                              checked={p.canCreate}
                              onChange={(e) => {
                                const newRoles = [...roles]
                                r.permissions[idx].canCreate = e.target.checked
                                setRoles(newRoles)
                              }}
                              className="accent-[#7A8C3C]"
                            />
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <input
                              type="checkbox"
                              checked={p.canEdit}
                              onChange={(e) => {
                                const newRoles = [...roles]
                                r.permissions[idx].canEdit = e.target.checked
                                setRoles(newRoles)
                              }}
                              className="accent-[#7A8C3C]"
                            />
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <input
                              type="checkbox"
                              checked={p.canDelete}
                              onChange={(e) => {
                                const newRoles = [...roles]
                                r.permissions[idx].canDelete = e.target.checked
                                setRoles(newRoles)
                              }}
                              className="accent-[#7A8C3C]"
                            />
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <input
                              type="checkbox"
                              checked={p.canToggleVisibility}
                              onChange={(e) => {
                                const newRoles = [...roles]
                                r.permissions[idx].canToggleVisibility = e.target.checked
                                setRoles(newRoles)
                              }}
                              className="accent-[#7A8C3C]"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 4: HISTORY (LOG ACTIVITY USER) ── */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-sm border border-[#dde0cc]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#2A2E1F]">User Activity & Audit Trail</h3>
              <p className="text-xs text-[#6b6b55]">
                Complete audit recording user actions, IP address, and timestamp.
              </p>
            </div>
            <input
              type="text"
              placeholder="Filter by user or action..."
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              className="h-9 w-64 rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="rounded-sm border border-[#dde0cc] bg-white shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9F4] text-[#555d3a] border-b border-[#dde0cc]">
                <tr>
                  <th className="px-4 py-3 font-semibold uppercase">No</th>
                  <th className="px-4 py-3 font-semibold uppercase">Timestamp</th>
                  <th className="px-4 py-3 font-semibold uppercase">User</th>
                  <th className="px-4 py-3 font-semibold uppercase">Action</th>
                  <th className="px-4 py-3 font-semibold uppercase">Module</th>
                  <th className="px-4 py-3 font-semibold uppercase">IP Address</th>
                  <th className="px-4 py-3 font-semibold uppercase">Details</th>
                  <th className="px-4 py-3 font-semibold uppercase text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef0e6] text-[#2A2E1F]">
                {logs
                  .filter(
                    (l) =>
                      l.userName.toLowerCase().includes(historySearch.toLowerCase()) ||
                      l.action.toLowerCase().includes(historySearch.toLowerCase()) ||
                      l.module.toLowerCase().includes(historySearch.toLowerCase())
                  )
                  .map((log, i) => (
                    <tr key={log.id} className="hover:bg-[#fbfcf8]">
                      <td className="px-4 py-3 text-[#6b6b55] font-mono">{i + 1}</td>
                      <td className="px-4 py-3 text-[#6b6b55] whitespace-nowrap">{log.timestamp}</td>
                      <td className="px-4 py-3 font-semibold">{log.userName}</td>
                      <td className="px-4 py-3 font-medium text-[#2A2E1F]">{log.action}</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-[#eef0e6] px-2 py-0.5 text-[11px] font-semibold text-[#555d3a]">
                          {log.module}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[#8f9479]">{log.ipAddress}</td>
                      <td className="px-4 py-3 text-[#6b6b55] max-w-xs truncate">{log.details}</td>
                      <td className="px-4 py-3 text-center">
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
      )}

      {/* User CRUD Modal */}
      <ModalDialog
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        title={editingUser ? 'Edit Administrator User' : 'Create New Administrator User'}
        subtitle="Manage credentials and system access tier."
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={userFormData.name}
              onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={userFormData.email}
              onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Role Tier
              </label>
              <select
                value={userFormData.role}
                onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
                Account Status
              </label>
              <select
                value={userFormData.status}
                onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value as 'active' | 'inactive' })}
                className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="border-t border-[#dde0cc] pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setUserModalOpen(false)}
              className="rounded-sm border border-[#dde0cc] px-4 py-2 text-xs font-semibold text-[#6b6b55] hover:bg-[#eef0e6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-sm bg-[#7A8C3C] px-5 py-2 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914]"
            >
              Save User
            </button>
          </div>
        </form>
      </ModalDialog>

      {/* Role CRUD Modal */}
      <ModalDialog
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        title={editingRole ? 'Edit Role Description' : 'Create Custom Role'}
        subtitle="Define a new role and its access rights."
      >
        <form onSubmit={handleSaveRole} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Role Name
            </label>
            <input
              type="text"
              required
              value={roleFormData.name}
              onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] px-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="e.g. Media Publisher"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3a3a2e] mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={roleFormData.description}
              onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
              className="w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] p-3 text-xs text-[#2A2E1F] focus:border-[#7A8C3C] focus:bg-white focus:outline-none"
              placeholder="What can members of this role do?"
            />
          </div>

          <div className="border-t border-[#dde0cc] pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setRoleModalOpen(false)}
              className="rounded-sm border border-[#dde0cc] px-4 py-2 text-xs font-semibold text-[#6b6b55] hover:bg-[#eef0e6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-sm bg-[#7A8C3C] px-5 py-2 text-xs font-semibold text-white hover:bg-[#B5B847] hover:text-[#181914]"
            >
              Save Role
            </button>
          </div>
        </form>
      </ModalDialog>
    </div>
  )
}
