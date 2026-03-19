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

  // useEffect(() => {
  //   fetch("http://localhost:3000/deployments")
  //     .then((res) => res.json())
  //     .then((fetchedData) => {
  //       setData(fetchedData)
  //       setLoading(false)
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch deployments:", err)
  //       setLoading(false)
  //     })
  // }, [])
  useEffect(() => {
    fetch("/db.json") 
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData.deployments)
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
    <div className="flex flex-col h-full w-full">

      <div className="shrink-0 bg-white px-6 lg:px-10 h-15 border-b border-gray-200 flex flex-col xl:flex-row xl:items-center justify-between gap-4 w-full z-10">
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
      
    
      <div className="flex-1 flex flex-col min-h-0 px-6 lg:px-10 py-6 overflow-hidden">
        <div className="w-full max-w-[1600px] mx-auto h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full w-full gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              <span className="text-[13px] text-gray-500 font-medium">Loading deployments...</span>
            </div>
          ) : (
            <>
              
              <div className="hidden xl:flex flex-col flex-1 w-full overflow-hidden">
                <div className="flex-1 overflow-auto">
                  
                  
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    
                   
                    <TableHeader className="sticky top-0 z-20 bg-gray-50 shadow-[0_1px_0_0_#e5e7eb]">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-gray-50 hover:bg-gray-50 border-none">
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className="h-10 px-4 align-middle bg-gray-50">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>

                    
                    <TableBody>
                      {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
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
                  </table>
                </div>
              </div>

              {/*  Mobile-Tablet */}
              <div className="xl:hidden flex-1 overflow-auto grid grid-cols-1 gap-4 w-full content-start pr-1 p-4">
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
              </div>
            </>
          )}
        </div>
      </div>

      {/*   Pagination */}
      <div className="shrink-0 h-13 border-t border-gray-200 bg-white px-6 lg:px-10 flex items-center justify-between w-full z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        
        <div className="text-[13px] text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-semibold">
            {table.getFilteredRowModel().rows.length === 0 
              ? 0 
              : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </span> to <span className="text-gray-900 font-semibold">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, 
              table.getFilteredRowModel().rows.length
            )}
          </span> of <span className="text-gray-900 font-semibold">
            {table.getFilteredRowModel().rows.length}
          </span> results
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[12px] bg-white border-gray-200 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[12px] bg-white border-gray-200 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>

      </div>

    </div>
  )
}