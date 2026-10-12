export interface GeneralConfig {
  status: 'active' | 'maintenance'
  logo: string
  footerLogo: string
  copyright: string
  checkIpLogin: boolean
  allowedIps: string[]
  officeInfo: {
    address: string
    phone: string
    fax: string
  }
  sideOfficeInfo: {
    address: string
    phone: string
    fax: string
  }
  autoSendEmail: {
    sendContactUs: string
    sendCareerApplicationTo: string
  }
}

export interface UserProfile {
  id: string
  fullName: string
  email: string
  role: string
  avatar: string
  phone: string
  bio: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  createdAt: string
}

export interface RolePermission {
  module: string
  canView: boolean
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canToggleVisibility: boolean
}

export interface AdminRole {
  id: string
  name: string
  description: string
  userCount: number
  permissions: RolePermission[]
}

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: string
  module: string
  ipAddress: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
  details?: string
}

export interface PageAdminItem {
  id: string
  no: number
  title: string
  navigation: string // e.g. /about, /properties
  createdTime: string
  updated: string
  visibility: boolean
  order: number
}

export interface MediaImage {
  id: string
  name: string
  directory: string // e.g. /uploads/images/hero/
  url: string
  size: string
  dimensions: string
  uploadedBy: string
  uploadedAt: string
  connectedToCarousel: boolean
}

export interface MediaDocument {
  id: string
  name: string
  directory: string // e.g. /uploads/docs/reports/
  url: string
  size: string
  fileType: string
  uploadedBy: string
  uploadedAt: string
  downloadCount: number
}

export interface BannerItem {
  id: string
  title: string
  subtitle: string
  mediaType: 'image' | 'video'
  mediaUrl: string
  targetUrl: string
  ctaText: string
  order: number
  visibility: boolean
  createdTime: string
  updated: string
}

export interface NewsItem {
  id: string
  no: number
  title: string
  url: string // slug
  date: string
  excerpt: string
  description: string // rich text HTML
  thumbnail: string
  createTime: string
  updated: string
  visibility: boolean
  author: string
}

export interface CorporateInfoItem {
  id: string
  no: number
  date: string
  title: string
  url: string
  createTime: string
  updated: string
  visibility: boolean
  category: string
  description?: string
}

export interface ProjectItem {
  id: string
  no: number
  title: string
  category: string // Hotel, Mall, Resort, Mixed-Use
  location: string
  image: string
  createTime: string
  updated: string
  visibility: boolean
  description?: string
}

export interface ContactUsItem {
  id: string
  no: number
  fullName: string
  phone: string
  email: string
  subject?: string
  message: string
  createTime: string
  visibility: boolean // used for read / unread status
}

export interface GalleryItem {
  id: string
  no: number
  fullName: string
  phone: string
  email: string
  title: string
  image: string
  category: string
  createTime: string
  visibility: boolean
}

export interface CareerItem {
  id: string
  no: number
  title: string
  department: string
  location: string
  type: string
  createTime: string
  updated: string
  visibility: boolean
  description?: string
  applicantCount: number
}

export interface CareerApplicant {
  id: string
  jobId: string
  jobTitle: string
  fullName: string
  email: string
  phone: string
  resumeUrl: string
  submittedAt: string
  status: 'Pending' | 'Interview' | 'Accepted' | 'Rejected'
}
