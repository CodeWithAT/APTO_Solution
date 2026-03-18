import { useState, useEffect } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { 
  MoreHorizontal, GitBranch, ExternalLink, Search, 
  Github, ArrowUpDown, Copy, Check, Trash2, Terminal, Loader2
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Deployment = {
  id: string
  project: string
  domain: string
  status: "Ready" | "Building" | "Error"
  environment: "Production" | "Preview"
  branch: string
  commitMessage: string
  commitHash: string
  author: string
  age: string
  duration: string
}

const StatusDot = ({ status }: { status: Deployment["status"] }) => {
  if (status === "Ready") return <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.1)]" />
  if (status === "Building") return <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
  return <div className="h-2 w-2 rounded-full bg-red-500" />
}

export const columns: ColumnDef<Deployment>[] = [
  {
    accessorKey: "project",
    header: ({ column }) => (
      <div 
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 select-none text-[11px] font-semibold uppercase tracking-wider text-gray-500"
      >
        Deployment <ArrowUpDown className="h-3 w-3" />
      </div>
    ),
    cell: ({ row }) => {
      const d = row.original
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[14px] text-gray-900 whitespace-nowrap">{d.project}</span>
            <Badge variant="outline" className={`text-[10px] h-4 px-1.5 rounded-full whitespace-nowrap ${d.environment === 'Production' ? 'bg-black text-white border-black shadow-none' : 'bg-gray-100 text-gray-600 border-gray-200 shadow-none'}`}>
              {d.environment}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-gray-500 hover:text-black cursor-pointer transition-colors group">
            {d.domain} <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">State</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as Deployment["status"]
      return (
        <div className="flex items-center gap-2 text-[13px] text-gray-600 whitespace-nowrap">
          <StatusDot status={status} />
          <span>{status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "commitMessage",
    header: () => <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Commit</div>,
    cell: ({ row }) => {
      const d = row.original
      return (
        <div className="flex flex-col gap-1 max-w-[280px]">
          <div className="flex items-center gap-1.5 text-[13px] text-gray-900 italic">
            <Github size={12} className="text-gray-400 shrink-0" />
            <span className="truncate">"{d.commitMessage}"</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-500 whitespace-nowrap">
            <span className="bg-gray-100 px-1 rounded flex items-center gap-0.5"><GitBranch size={10}/>{d.branch}</span>
            <span>{d.commitHash}</span>
            <span className="flex items-center gap-1">{d.author}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <div 
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 select-none text-[11px] font-semibold uppercase tracking-wider text-gray-500"
      >
        Age <ArrowUpDown className="h-3 w-3" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col text-[13px] whitespace-nowrap">
        <span className="text-gray-900">{row.original.age}</span>
        <span className="text-gray-400 text-[11px]">{row.original.duration}</span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const d = row.original
      const [copied, setCopied] = useState(false)

      const copyId = () => {
        navigator.clipboard.writeText(d.id)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border-gray-200 shadow-xl p-1 rounded-xl">
              <DropdownMenuLabel className="text-[11px] text-gray-400 font-normal px-2 py-1">Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[13px] cursor-pointer gap-2" onClick={copyId}>
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy Deployment ID"}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[13px] cursor-pointer gap-2">
                <Terminal size={14} /> View Logs
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[13px] text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer gap-2">
                <Trash2 size={14} /> Delete Deployment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

export default function DeploymentsTable() {
  const [data, setData] = useState<Deployment[]>([])
  const [loading, setLoading] = useState(true)       
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(() => {
    fetch("http://localhost:3000/deployments")
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch deployments:", err)
        setLoading(false)
      })
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div className="flex flex-col w-full min-h-screen">
      

      <div className="sticky top-0 z-40 bg-white px-6 lg:px-10 pt-6 pb-3 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4 w-full">
        <h2 className="text-[28px] font-semibold tracking-tight text-gray-900 shrink-0">Deployments</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto min-w-0">
          <div className="relative w-full sm:flex-1 xl:w-80 shrink">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Filter list..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9 h-9 w-full text-[13px] bg-white border-gray-200 shadow-sm focus-visible:ring-1"
            />
          </div>
          <Button className="bg-black text-white hover:bg-black/90 h-9 px-4 rounded-md w-full sm:w-auto text-[13px] whitespace-nowrap shrink-0">
            New Deployment
          </Button>
        </div>
      </div>
      
      {/*  Table  */}
      <div className="px-6 lg:px-10 py-6 w-full max-w-[1600px] mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 w-full border border-gray-200 rounded-lg bg-white shadow-sm gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            <span className="text-[13px] text-gray-500 font-medium">Loading deployments...</span>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden xl:block w-full rounded-lg border border-gray-200 bg-white shadow-sm overflow-x-auto min-w-0">
              <Table className="min-w-[800px] w-full">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="bg-gray-50/50 hover:bg-transparent border-b border-gray-200">
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="h-10 px-4 align-middle">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/20 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4 px-4 align-top">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  {table.getRowModel().rows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-32 text-center text-[13px] text-gray-500">
                        No deployments found matching "{globalFilter}".
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile-Tablet */}
            <div className="grid grid-cols-1 gap-4 xl:hidden w-full min-w-0">
              {table.getRowModel().rows.map((row) => {
                const d = row.original;
                const actionsCell = row.getVisibleCells().find(c => c.column.id === 'actions');
                
                return (
                  <div key={row.id} className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl shadow-sm gap-3 w-full">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-[15px] text-gray-900 truncate">{d.project}</span>
                          <Badge variant="outline" className={`text-[10px] h-4 px-1.5 rounded-full shrink-0 ${d.environment === 'Production' ? 'bg-black text-white border-black shadow-none' : 'bg-gray-100 text-gray-600 border-gray-200 shadow-none'}`}>
                            {d.environment}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-gray-500 truncate">
                          <span className="truncate">{d.domain}</span> <ExternalLink size={10} className="shrink-0" />
                        </div>
                      </div>
                      <div className="shrink-0">
                        {actionsCell && flexRender(actionsCell.column.columnDef.cell, actionsCell.getContext())}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-1">
                      <div className="flex items-center gap-2 text-[13px] text-gray-700">
                        <StatusDot status={d.status} />
                        <span className="font-medium">{d.status}</span>
                      </div>
                      
                      <div className="bg-gray-50 border border-gray-100 rounded-md p-3 flex flex-col gap-2 mt-1 min-w-0">
                        <div className="flex items-start gap-1.5 text-[13px] text-gray-800 italic overflow-hidden">
                          <Github size={14} className="mt-0.5 text-gray-400 shrink-0" />
                          <span className="break-words line-clamp-2">"{d.commitMessage}"</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1 flex-wrap">
                          <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
                            <GitBranch size={10}/>{d.branch}
                          </span>
                          <span className="font-mono">{d.commitHash}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[12px] text-gray-500 mt-1 pt-3 border-t border-gray-100">
                      <span>Created by {d.author}</span>
                      <span className="font-medium">{d.age} ago</span>
                    </div>
                  </div>
                )
              })}

              {table.getRowModel().rows.length === 0 && (
                <div className="h-32 flex items-center justify-center border border-dashed border-gray-300 rounded-xl text-[13px] text-gray-500 w-full">
                  No deployments found matching "{globalFilter}".
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-1 mt-4 pb-10">
              <div className="text-[13px] text-gray-500 font-medium">
                Showing <span className="text-gray-900 font-semibold">{table.getRowModel().rows.length}</span> of <span className="text-gray-900 font-semibold">{table.getFilteredRowModel().rows.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-[12px] bg-white border-gray-200"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-[12px] bg-white border-gray-200"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}