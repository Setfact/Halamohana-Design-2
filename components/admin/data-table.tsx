'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Plus,
  ArrowUpDown,
} from 'lucide-react'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (item: T, index: number) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchPlaceholder?: string
  searchKey?: keyof T | ((item: T) => string)
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onToggleVisibility?: (item: T) => void
  onAddNew?: () => void
  addNewLabel?: string
  extraActions?: (item: T) => React.ReactNode
  pageSize?: number
  headerAction?: React.ReactNode
}

export default function DataTable<T extends { id?: string | number; visibility?: boolean }>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchKey,
  onEdit,
  onDelete,
  onToggleVisibility,
  onAddNew,
  addNewLabel = 'Add New',
  extraActions,
  pageSize = 8,
  headerAction,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Filter
  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    const term = searchTerm.toLowerCase()
    return data.filter((item) => {
      if (typeof searchKey === 'function') {
        return searchKey(item).toLowerCase().includes(term)
      }
      if (searchKey) {
        const val = item[searchKey]
        return val ? String(val).toLowerCase().includes(term) : false
      }
      return Object.values(item as Record<string, unknown>).some(
        (val) => val && String(val).toLowerCase().includes(term)
      )
    })
  }, [data, searchTerm, searchKey])

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData
    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey]
      const bVal = (b as Record<string, unknown>)[sortKey]
      if (aVal === bVal) return 0
      if (aVal === undefined || aVal === null) return 1
      if (bVal === undefined || bVal === null) return -1
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      }
      return aVal < bVal ? 1 : -1
    })
  }, [filteredData, sortKey, sortOrder])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize))
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const hasActions = Boolean(onEdit || onDelete || extraActions)

  return (
    <div className="rounded-sm border border-[#dde0cc] bg-white shadow-xs overflow-hidden">
      {/* Controls Header */}
      <div className="flex flex-col gap-3 border-b border-[#dde0cc] p-4 sm:flex-row sm:items-center sm:justify-between bg-white">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8C3C]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              placeholder={searchPlaceholder}
              className="h-9 w-full rounded-sm border border-[#dde0cc] bg-[#F8F9F4] pl-9 pr-3 text-xs text-[#2A2E1F] placeholder-[#8f9479] focus:border-[#7A8C3C] focus:bg-white focus:outline-none transition-all"
            />
          </div>
          <span className="text-xs text-[#6b6b55] hidden lg:inline">
            Showing <strong className="text-[#2A2E1F]">{sortedData.length}</strong> entries
          </span>
        </div>

        <div className="flex items-center gap-2">
          {headerAction}
          {onAddNew && (
            <button
              onClick={onAddNew}
              className="flex h-9 items-center gap-1.5 rounded-sm bg-[#7A8C3C] px-3.5 text-xs font-semibold text-white shadow-xs hover:bg-[#B5B847] hover:text-[#141510] transition-all"
            >
              <Plus size={15} />
              <span>{addNewLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Table Canvas */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#dde0cc] bg-[#F8F9F4] text-[#555d3a]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]"
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-1.5 hover:text-[#2A2E1F] transition-colors"
                    >
                      <span>{col.label}</span>
                      <ArrowUpDown size={12} className="text-[#8f9479]" />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}

              {onToggleVisibility && (
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px] text-center">
                  Visibility
                </th>
              )}

              {hasActions && (
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px] text-right">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eef0e6] text-[#2A2E1F]">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => {
                const globalIndex = (currentPage - 1) * pageSize + idx + 1
                return (
                  <tr
                    key={item.id ? String(item.id) : idx}
                    className="hover:bg-[#fbfcf8] transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3.5 align-middle">
                        {col.render
                          ? col.render(item, globalIndex)
                          : String((item as Record<string, unknown>)[col.key] ?? '-')}
                      </td>
                    ))}

                    {/* Visibility Switch */}
                    {onToggleVisibility && (
                      <td className="px-4 py-3.5 align-middle text-center">
                        <button
                          onClick={() => onToggleVisibility(item)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                            item.visibility !== false
                              ? 'bg-[#7A8C3C]/15 text-[#596827] hover:bg-[#7A8C3C]/25'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                          title={item.visibility !== false ? 'Published (Click to hide)' : 'Hidden (Click to publish)'}
                        >
                          {item.visibility !== false ? (
                            <>
                              <Eye size={12} />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <EyeOff size={12} />
                              <span>Hidden</span>
                            </>
                          )}
                        </button>
                      </td>
                    )}

                    {/* Actions */}
                    {hasActions && (
                      <td className="px-4 py-3.5 align-middle text-right space-x-1 whitespace-nowrap">
                        {extraActions && extraActions(item)}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="rounded p-1.5 text-[#555d3a] hover:bg-[#eef0e6] hover:text-[#2A2E1F] transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="rounded p-1.5 text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (onToggleVisibility ? 1 : 0) + (hasActions ? 1 : 0)}
                  className="py-12 text-center text-xs text-[#6b6b55]"
                >
                  No records found matching your query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[#dde0cc] bg-[#F8F9F4] px-4 py-3">
          <span className="text-xs text-[#6b6b55]">
            Page <strong className="text-[#2A2E1F]">{currentPage}</strong> of{' '}
            <strong className="text-[#2A2E1F]">{totalPages}</strong>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 items-center gap-1 rounded border border-[#dde0cc] bg-white px-2.5 text-xs font-medium text-[#2A2E1F] hover:bg-[#f0f2e8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
              <span>Prev</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`h-8 w-8 rounded text-xs font-semibold transition-colors ${
                  currentPage === num
                    ? 'bg-[#7A8C3C] text-white'
                    : 'border border-[#dde0cc] bg-white text-[#2A2E1F] hover:bg-[#f0f2e8]'
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-8 items-center gap-1 rounded border border-[#dde0cc] bg-white px-2.5 text-xs font-medium text-[#2A2E1F] hover:bg-[#f0f2e8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
