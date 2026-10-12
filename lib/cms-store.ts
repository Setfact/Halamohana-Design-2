'use client'

import { useState, useEffect } from 'react'
import type {
  GeneralConfig,
  UserProfile,
  AdminUser,
  AdminRole,
  ActivityLog,
  PageAdminItem,
  MediaImage,
  MediaDocument,
  BannerItem,
  NewsItem,
  CorporateInfoItem,
  ProjectItem,
  ContactUsItem,
  GalleryItem,
  CareerItem,
  CareerApplicant,
} from './cms-types'

const STORAGE_KEY_PREFIX = 'hm_cms_'

// Default initial datasets
export const initialGeneralConfig: GeneralConfig = {
  status: 'active',
  logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo__1_-removebg-preview-AArstaIVTRIMHtMo2H0gojKK9LBla1.png',
  footerLogo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo__1_-removebg-preview-AArstaIVTRIMHtMo2H0gojKK9LBla1.png',
  copyright: '© 2026 PT Halla Mohana. All rights reserved. A subsidiary of TMT Group.',
  checkIpLogin: true,
  allowedIps: ['127.0.0.1', '192.168.1.100', '10.0.4.15'],
  officeInfo: {
    address: 'Gedung TMT 1, 1st Floor, Jl. Cilandak KKO No. 1, Jakarta 12560, Indonesia',
    phone: '+62 21 2997 6700',
    fax: '+62 21 2997 6708',
  },
  sideOfficeInfo: {
    address: 'Jalan Riau No. 147, Pekanbaru, Riau 28292, Indonesia',
    phone: '+62 761 741 5999',
    fax: '+62 761 741 5000',
  },
  autoSendEmail: {
    sendContactUs: 'info@hallamohana.co.id',
    sendCareerApplicationTo: 'career@hallamohana.co.id',
  },
}

export const initialUserProfile: UserProfile = {
  id: 'usr-1',
  fullName: 'Calvin Pratama',
  email: 'calvin@hallamohana.co.id',
  role: 'Super Administrator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  phone: '+62 812 3456 7890',
  bio: 'Lead Platform Architect & Content Administrator at PT Halla Mohana.',
}

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Calvin Pratama',
    email: 'calvin@hallamohana.co.id',
    role: 'Super Administrator',
    status: 'active',
    lastLogin: '2026-10-09 07:15',
    createdAt: '2025-01-10',
  },
  {
    id: 'usr-2',
    name: 'Amanda Rahmawati',
    email: 'amanda@hallamohana.co.id',
    role: 'Editor & Marketing',
    status: 'active',
    lastLogin: '2026-10-08 16:42',
    createdAt: '2025-03-14',
  },
  {
    id: 'usr-3',
    name: 'Budi Santoso',
    email: 'budi.hr@hallamohana.co.id',
    role: 'HR Specialist',
    status: 'active',
    lastLogin: '2026-10-07 11:20',
    createdAt: '2025-05-20',
  },
  {
    id: 'usr-4',
    name: 'Denny Kusuma',
    email: 'denny.guest@hallamohana.co.id',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2026-09-28 09:12',
    createdAt: '2025-08-01',
  },
]

export const initialRoles: AdminRole[] = [
  {
    id: 'role-1',
    name: 'Super Administrator',
    description: 'Full unconstrained privileges across all website modules and CMS settings.',
    userCount: 2,
    permissions: [
      { module: 'General Config', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'User Management', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Page Navigation', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Media Library', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Banners', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'News & Media', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Corporate Info', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Manage Project', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Contact Inquiries', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Gallery', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Careers', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
    ],
  },
  {
    id: 'role-2',
    name: 'Editor & Marketing',
    description: 'Can manage and publish news, banners, media, corporate info, and projects.',
    userCount: 3,
    permissions: [
      { module: 'General Config', canView: true, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'User Management', canView: false, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'Page Navigation', canView: true, canCreate: false, canEdit: true, canDelete: false, canToggleVisibility: true },
      { module: 'Media Library', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Banners', canView: true, canCreate: true, canEdit: true, canDelete: false, canToggleVisibility: true },
      { module: 'News & Media', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Corporate Info', canView: true, canCreate: true, canEdit: true, canDelete: false, canToggleVisibility: true },
      { module: 'Manage Project', canView: true, canCreate: true, canEdit: true, canDelete: false, canToggleVisibility: true },
      { module: 'Contact Inquiries', canView: true, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'Gallery', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
      { module: 'Careers', canView: true, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
    ],
  },
  {
    id: 'role-3',
    name: 'HR Specialist',
    description: 'Specialized role for managing vacancies and processing incoming candidate resumes.',
    userCount: 2,
    permissions: [
      { module: 'General Config', canView: false, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'User Management', canView: false, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'Page Navigation', canView: false, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'Media Library', canView: true, canCreate: true, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'Banners', canView: false, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'News & Media', canView: false, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'Corporate Info', canView: false, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'Manage Project', canView: false, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'Contact Inquiries', canView: false, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'Gallery', canView: false, canCreate: false, canEdit: false, canDelete: false, canToggleVisibility: false },
      { module: 'Careers', canView: true, canCreate: true, canEdit: true, canDelete: true, canToggleVisibility: true },
    ],
  },
]

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    userId: 'usr-1',
    userName: 'Calvin Pratama',
    action: 'Updated General Config',
    module: 'General Config',
    ipAddress: '127.0.0.1',
    timestamp: '2026-10-09 07:35:12',
    status: 'success',
    details: 'Changed contact telephone and verified IP login protection.',
  },
  {
    id: 'log-2',
    userId: 'usr-2',
    userName: 'Amanda Rahmawati',
    action: 'Published News Article',
    module: 'News',
    ipAddress: '192.168.1.100',
    timestamp: '2026-10-08 15:40:22',
    status: 'success',
    details: 'Published article "Whistle Blowing System".',
  },
  {
    id: 'log-3',
    userId: 'usr-1',
    userName: 'Calvin Pratama',
    action: 'Toggled Banner Visibility',
    module: 'Banners',
    ipAddress: '127.0.0.1',
    timestamp: '2026-10-08 14:12:05',
    status: 'success',
    details: 'Activated "Kuala Lumpur" hero video slide.',
  },
  {
    id: 'log-4',
    userId: 'usr-3',
    userName: 'Budi Santoso',
    action: 'Created Career Position',
    module: 'Careers',
    ipAddress: '10.0.4.15',
    timestamp: '2026-10-07 10:25:31',
    status: 'success',
    details: 'Added "Front Office Manager" in Jakarta.',
  },
  {
    id: 'log-5',
    userId: 'usr-4',
    userName: 'Denny Kusuma',
    action: 'Failed Login Attempt',
    module: 'Authentication',
    ipAddress: '182.253.11.45',
    timestamp: '2026-10-06 21:04:18',
    status: 'warning',
    details: 'IP not in allowed list for restricted login.',
  },
]

export const initialPages: PageAdminItem[] = [
  { id: 'page-1', no: 1, title: 'Home', navigation: '/', createdTime: '2025-01-01', updated: '2026-10-05', visibility: true, order: 1 },
  { id: 'page-2', no: 2, title: 'About Us', navigation: '/about', createdTime: '2025-01-01', updated: '2026-10-05', visibility: true, order: 2 },
  { id: 'page-3', no: 3, title: 'Properties', navigation: '/properties', createdTime: '2025-01-01', updated: '2026-10-05', visibility: true, order: 3 },
  { id: 'page-4', no: 4, title: 'Gallery', navigation: '/gallery', createdTime: '2025-01-01', updated: '2026-10-05', visibility: true, order: 4 },
  { id: 'page-5', no: 5, title: 'News', navigation: '/news', createdTime: '2025-01-01', updated: '2026-10-05', visibility: true, order: 5 },
  { id: 'page-6', no: 6, title: 'Career', navigation: '/career', createdTime: '2025-01-01', updated: '2026-10-05', visibility: true, order: 6 },
  { id: 'page-7', no: 7, title: 'Contact Us', navigation: '/contact', createdTime: '2025-01-01', updated: '2026-10-05', visibility: true, order: 7 },
]

export const initialMediaImages: MediaImage[] = [
  {
    id: 'img-1',
    name: 'logo-halla-mohana.png',
    directory: '/public/images/brand/',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo__1_-removebg-preview-AArstaIVTRIMHtMo2H0gojKK9LBla1.png',
    size: '84 KB',
    dimensions: '600x240',
    uploadedBy: 'Calvin Pratama',
    uploadedAt: '2026-09-01 10:15',
    connectedToCarousel: false,
  },
  {
    id: 'img-2',
    name: 'fox-hotel-pekanbaru-exterior.jpg',
    directory: '/public/images/properties/',
    url: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: '1.2 MB',
    dimensions: '1920x1080',
    uploadedBy: 'Amanda Rahmawati',
    uploadedAt: '2026-09-12 14:20',
    connectedToCarousel: true,
  },
  {
    id: 'img-3',
    name: 'pekanbaru-xchange-mall.jpg',
    directory: '/public/images/properties/',
    url: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: '1.8 MB',
    dimensions: '1920x1080',
    uploadedBy: 'Amanda Rahmawati',
    uploadedAt: '2026-09-15 11:45',
    connectedToCarousel: true,
  },
  {
    id: 'img-4',
    name: 'corporate-wbs-banner.jpg',
    directory: '/public/images/news/',
    url: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: '860 KB',
    dimensions: '1280x720',
    uploadedBy: 'Calvin Pratama',
    uploadedAt: '2026-09-20 09:30',
    connectedToCarousel: false,
  },
  {
    id: 'img-5',
    name: 'hero-bali-resort.jpg',
    directory: '/public/images/hero/',
    url: 'https://images.pexels.com/videos/3209828/pictures/preview-0.jpg',
    size: '2.1 MB',
    dimensions: '2560x1440',
    uploadedBy: 'Calvin Pratama',
    uploadedAt: '2026-10-01 08:00',
    connectedToCarousel: true,
  },
]

export const initialMediaDocuments: MediaDocument[] = [
  {
    id: 'doc-1',
    name: 'Halla_Mohana_Annual_Report_2025.pdf',
    directory: '/public/docs/annual-reports/',
    url: '/public/docs/annual-reports/Halla_Mohana_Annual_Report_2025.pdf',
    size: '4.8 MB',
    fileType: 'PDF Document',
    uploadedBy: 'Calvin Pratama',
    uploadedAt: '2026-03-30 16:00',
    downloadCount: 142,
  },
  {
    id: 'doc-2',
    name: 'Whistle_Blowing_System_Guideline.pdf',
    directory: '/public/docs/governance/',
    url: '/public/docs/governance/Whistle_Blowing_System_Guideline.pdf',
    size: '1.1 MB',
    fileType: 'PDF Document',
    uploadedBy: 'Calvin Pratama',
    uploadedAt: '2026-04-12 11:20',
    downloadCount: 89,
  },
  {
    id: 'doc-3',
    name: 'CSR_Program_Sustainability_Summary.pdf',
    directory: '/public/docs/csr/',
    url: '/public/docs/csr/CSR_Program_Sustainability_Summary.pdf',
    size: '2.4 MB',
    fileType: 'PDF Document',
    uploadedBy: 'Amanda Rahmawati',
    uploadedAt: '2026-07-15 09:40',
    downloadCount: 67,
  },
]

export const initialBanners: BannerItem[] = [
  {
    id: 'bnr-1',
    title: 'Kuala Lumpur',
    subtitle: 'Building premium spaces for business travelers and urban lifestyle',
    mediaType: 'video',
    mediaUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7820473-hd_1920_1080_25fps-uMJkTDi3VwM3xWq9J5ZxrKWqARxToP.mp4',
    targetUrl: '/properties',
    ctaText: 'Explore Properties',
    order: 1,
    visibility: true,
    createdTime: '2025-01-10',
    updated: '2026-10-01',
  },
  {
    id: 'bnr-2',
    title: 'Jakarta',
    subtitle: 'Strategic metropolitan developments across prime commercial hubs',
    mediaType: 'video',
    mediaUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4185227-hd_1920_1080_25fps-NzswSs3FGe8NDQdJgxEVCzFd2wosgl.mp4',
    targetUrl: '/about',
    ctaText: 'Learn About Us',
    order: 2,
    visibility: true,
    createdTime: '2025-01-10',
    updated: '2026-10-01',
  },
  {
    id: 'bnr-3',
    title: 'Bali',
    subtitle: 'Luxury resort and lifestyle developments designed for timeless hospitality',
    mediaType: 'video',
    mediaUrl: 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
    targetUrl: '/gallery',
    ctaText: 'View Gallery',
    order: 3,
    visibility: true,
    createdTime: '2025-01-10',
    updated: '2026-10-01',
  },
]

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    no: 1,
    title: 'Whistle Blowing System',
    url: 'whistle-blowing-system',
    date: '2022-12-02',
    excerpt: 'Implementasi sistem pengaduan pelanggaran di lingkungan PT Halla Mohana untuk menjaga integritas.',
    description: '<p>PT Halla Mohana dengan bangga mengumumkan implementasi <strong>Whistle Blowing System (WBS)</strong> sebagai bagian dari komitmen perusahaan terhadap tata kelola yang baik dan budaya integritas.</p><p>Sistem ini dirancang untuk memberikan saluran aman dan terpercaya bagi karyawan, mitra bisnis, dan pemangku kepentingan untuk melaporkan dugaan pelanggaran etika.</p>',
    thumbnail: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=800',
    createTime: '2022-12-02',
    updated: '2026-09-15',
    visibility: true,
    author: 'Corporate Secretary',
  },
  {
    id: 'news-2',
    no: 2,
    title: 'Company Anniversary',
    url: 'company-anniversary',
    date: '2022-08-15',
    excerpt: 'Perayaan hari jadi perusahaan yang ke-9 dengan berbagai acara kebersamaan dan refleksi pencapaian.',
    description: '<p>Pada tanggal 15 Agustus 2022, PT Halla Mohana merayakan hari jadinya yang ke-9 dengan penuh kebanggaan dan semangat kebersamaan bersama seluruh staf dan mitra kerja.</p>',
    thumbnail: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=800',
    createTime: '2022-08-15',
    updated: '2026-08-15',
    visibility: true,
    author: 'Corporate Communications',
  },
  {
    id: 'news-3',
    no: 3,
    title: 'New Partnership Announcement',
    url: 'new-partnership-announcement',
    date: '2022-03-16',
    excerpt: 'Kerja sama strategis dengan operator hotel internasional untuk meningkatkan kualitas layanan.',
    description: '<p>PT Halla Mohana dengan bangga mengumumkan kemitraan strategis baru dengan operator hotel internasional guna memperkuat posisi FOX Hotel Pekanbaru di pasar perhotelan regional.</p>',
    thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    createTime: '2022-03-16',
    updated: '2026-03-16',
    visibility: true,
    author: 'Business Development',
  },
  {
    id: 'news-4',
    no: 4,
    title: 'Hotel Renovation Complete',
    url: 'hotel-renovation-complete',
    date: '2021-11-01',
    excerpt: 'FOX Hotel Pekanbaru selesai direnovasi dengan fasilitas baru yang modern dan berkelas.',
    description: '<p>Kami dengan bangga mengumumkan bahwa renovasi <strong>FOX Hotel Pekanbaru</strong> telah selesai dilaksanakan dengan standar hospitality tertinggi.</p>',
    thumbnail: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    createTime: '2021-11-01',
    updated: '2026-01-20',
    visibility: true,
    author: 'Project Management',
  },
]

export const initialCorporateInfo: CorporateInfoItem[] = [
  {
    id: 'corp-1',
    no: 1,
    date: '2026-01-15',
    title: 'Annual General Meeting of Shareholders 2025 Notice',
    url: 'agm-notice-2025',
    createTime: '2026-01-15',
    updated: '2026-01-15',
    visibility: true,
    category: 'Shareholder Announcement',
    description: 'Pemberitahuan Rapat Umum Pemegang Saham Tahunan PT Halla Mohana Tahun Buku 2025.',
  },
  {
    id: 'corp-2',
    no: 2,
    date: '2025-11-10',
    title: 'Good Corporate Governance (GCG) Implementation Report',
    url: 'gcg-report-2025',
    createTime: '2025-11-10',
    updated: '2025-11-10',
    visibility: true,
    category: 'Governance & Compliance',
    description: 'Laporan komprehensif kepatuhan dan implementasi GCG di seluruh unit bisnis.',
  },
  {
    id: 'corp-3',
    no: 3,
    date: '2025-07-01',
    title: 'Board of Directors Resolution on Sustainability Roadmap 2030',
    url: 'sustainability-roadmap-resolution',
    createTime: '2025-07-01',
    updated: '2025-07-01',
    visibility: true,
    category: 'Board Resolution',
    description: 'Keputusan Direksi terkait inisiatif pengurangan emisi karbon dan efisiensi energi di aset properti.',
  },
]

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    no: 1,
    title: 'FOX Hotel Pekanbaru',
    category: 'Hotel',
    location: 'Pekanbaru, Riau',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    createTime: '2024-01-10',
    updated: '2026-08-20',
    visibility: true,
    description: 'Midscale luxury business hotel with 223 rooms, modern meeting rooms, and sky pool.',
  },
  {
    id: 'proj-2',
    no: 2,
    title: 'PekanbaruXchange',
    category: 'Mall & Retail',
    location: 'Pekanbaru, Riau',
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    createTime: '2024-02-14',
    updated: '2026-09-01',
    visibility: true,
    description: 'Modern lifestyle shopping center seamlessly integrated with FOX Hotel Pekanbaru.',
  },
  {
    id: 'proj-3',
    no: 3,
    title: 'Luxury Villa & Wellness Resort',
    category: 'Resort',
    location: 'Badung, Bali',
    image: 'https://images.pexels.com/videos/3209828/pictures/preview-0.jpg',
    createTime: '2025-04-18',
    updated: '2026-10-02',
    visibility: true,
    description: 'Eco-conscious sanctuary blending tropical architecture with holistic wellness retreats.',
  },
]

export const initialContactUs: ContactUsItem[] = [
  {
    id: 'msg-1',
    no: 1,
    fullName: 'Robert Tan',
    phone: '+62 811 9876 543',
    email: 'robert.tan@investments.sg',
    subject: 'Partnership Inquiry for New Hotel Project',
    message: 'We represent a Singaporean private equity firm looking to co-develop hospitality assets in Sumatra.',
    createTime: '2026-10-08 14:32',
    visibility: false, // unread
  },
  {
    id: 'msg-2',
    no: 2,
    fullName: 'Siti Sarah',
    phone: '+62 812 4455 6677',
    email: 'siti.sarah@eventorganizer.id',
    subject: 'Ballroom Booking Inquiry Pekanbaru',
    message: 'Requesting quotation and floor layout for an annual corporate summit for 400 attendees.',
    createTime: '2026-10-07 10:15',
    visibility: true, // read
  },
  {
    id: 'msg-3',
    no: 3,
    fullName: 'David Wijaya',
    phone: '+62 813 7788 9900',
    email: 'david@retailbrands.com',
    subject: 'Retail Leasing Space at PekanbaruXchange',
    message: 'Inquiring availability of ground floor F&B retail lot for our specialty coffee brand.',
    createTime: '2026-10-05 16:50',
    visibility: true,
  },
]

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    no: 1,
    fullName: 'Michael Chandra',
    phone: '+62 811 1234 567',
    email: 'michael.c@photoagency.com',
    title: 'FOX Hotel Pekanbaru Facade & Lobby',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Architecture',
    createTime: '2026-09-10 11:20',
    visibility: true,
  },
  {
    id: 'gal-2',
    no: 2,
    fullName: 'Clara Setiawan',
    phone: '+62 812 9988 7766',
    email: 'clara@lifestylevisuals.id',
    title: 'PekanbaruXchange Atrium & Events',
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Retail & Events',
    createTime: '2026-09-15 15:40',
    visibility: true,
  },
  {
    id: 'gal-3',
    no: 3,
    fullName: 'Hendra Gunawan',
    phone: '+62 813 3344 5566',
    email: 'hendra.g@dronestudio.com',
    title: 'Aerial View SCBD & Cilandak Headquarters',
    image: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Aerial',
    createTime: '2026-09-22 09:10',
    visibility: true,
  },
]

export const initialCareers: CareerItem[] = [
  {
    id: 'car-1',
    no: 1,
    title: 'Front Office Manager',
    department: 'Operations',
    location: 'Jakarta',
    type: 'Full-time',
    createTime: '2026-08-01',
    updated: '2026-10-05',
    visibility: true,
    applicantCount: 14,
    description: 'Oversee front desk operations and ensure exceptional luxury guest experiences.',
  },
  {
    id: 'car-2',
    no: 2,
    title: 'Marketing Executive',
    department: 'Marketing',
    location: 'Pekanbaru',
    type: 'Full-time',
    createTime: '2026-08-10',
    updated: '2026-09-28',
    visibility: true,
    applicantCount: 22,
    description: 'Develop and implement marketing strategies to promote our properties and mall tenant relations.',
  },
  {
    id: 'car-3',
    no: 3,
    title: 'Finance Analyst',
    department: 'Finance',
    location: 'Jakarta',
    type: 'Full-time',
    createTime: '2026-08-15',
    updated: '2026-09-30',
    visibility: true,
    applicantCount: 9,
    description: 'Analyze financial data and prepare feasibility models for prospective property acquisitions.',
  },
  {
    id: 'car-4',
    no: 4,
    title: 'Chef de Cuisine',
    department: 'F&B',
    location: 'Pekanbaru',
    type: 'Full-time',
    createTime: '2026-09-01',
    updated: '2026-10-02',
    visibility: true,
    applicantCount: 7,
    description: 'Lead culinary operations and curate premium dining experiences for hotel banquet and restaurant.',
  },
  {
    id: 'car-5',
    no: 5,
    title: 'Housekeeping Supervisor',
    department: 'Operations',
    location: 'Jakarta',
    type: 'Full-time',
    createTime: '2026-09-10',
    updated: '2026-10-04',
    visibility: true,
    applicantCount: 11,
    description: 'Supervise housekeeping team and maintain stringent 5-star cleanliness and hygiene standards.',
  },
]

export const initialApplicants: CareerApplicant[] = [
  {
    id: 'app-1',
    jobId: 'car-1',
    jobTitle: 'Front Office Manager',
    fullName: 'Yusuf Maulana',
    email: 'yusuf.m@gmail.com',
    phone: '+62 812 1111 2222',
    resumeUrl: '/uploads/resumes/yusuf_resume.pdf',
    submittedAt: '2026-10-06 11:30',
    status: 'Interview',
  },
  {
    id: 'app-2',
    jobId: 'car-2',
    jobTitle: 'Marketing Executive',
    fullName: 'Nadia Putri',
    email: 'nadia.putri@yahoo.co.id',
    phone: '+62 813 3333 4444',
    resumeUrl: '/uploads/resumes/nadia_resume.pdf',
    submittedAt: '2026-10-07 14:15',
    status: 'Pending',
  },
]

// Custom Hook to read and write persistent CMS data
export function useCMSState<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [data, setData] = useState<T>(initialValue)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + key)
      if (stored) {
        setData(JSON.parse(stored))
      }
    } catch {
      // fallback to initial
    }
    setHydrated(true)
  }, [key])

  const updateData = (val: T | ((prev: T) => T)) => {
    setData((prev) => {
      const nextVal = typeof val === 'function' ? (val as (prev: T) => T)(prev) : val
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(nextVal))
        } catch {
          // ignore quota
        }
      }
      return nextVal
    })
  }

  return [hydrated ? data : initialValue, updateData]
}
