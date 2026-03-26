import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type Row, 
} from "@tanstack/react-table";
import { Search, Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  searchPlaceholder?: string;
  primaryAction?: React.ReactNode;
  
  // Mobile rendering strategy
  renderMobileCard?: (row: Row<TData>) => React.ReactNode;
  
  // State
  isLoading?: boolean;

  // Architecture Mode
  mode?: "client" | "server";
  
  // Server-side specific props
  pageCount?: number;
  totalRows?: number;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSearchChange?: (query: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title = "Data Table",
  searchPlaceholder = "Search...",
  primaryAction,
  renderMobileCard,
  isLoading = false,
  mode = "client",
  pageCount = -1,
  totalRows = 0,
  onPaginationChange,
  onSearchChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const isServer = mode === "server";

  useEffect(() => {
    if (isServer && onPaginationChange) {
      onPaginationChange(pagination);
    }
  }, [pagination, isServer, onPaginationChange]);

  useEffect(() => {
    if (isServer && onSearchChange) {
      const timeoutId = setTimeout(() => {
        onSearchChange(globalFilter);
      }, 500); 
      return () => clearTimeout(timeoutId);
    }
  }, [globalFilter, isServer, onSearchChange]);

  const table = useReactTable({
    data,
    columns,
    pageCount: isServer ? pageCount : undefined,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: isServer ? undefined : getFilteredRowModel(),
    getPaginationRowModel: isServer ? undefined : getPaginationRowModel(),
    getSortedRowModel: isServer ? undefined : getSortedRowModel(),
    manualPagination: isServer,
    manualSorting: isServer,
    manualFiltering: isServer,
  });

  const currentTotal = isServer ? totalRows : table.getFilteredRowModel().rows.length;
  const startItem = currentTotal === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const endItem = Math.min((pagination.pageIndex + 1) * pagination.pageSize, currentTotal);

  return (
    <div className="flex flex-col h-full w-full bg-white absolute inset-0">
      <div className="shrink-0 bg-white px-4 lg:px-10 pt-4 pb-2 border-b border-gray-100 flex flex-row items-center justify-between gap-3 w-full z-20 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <h2 className="text-[20px] font-semibold tracking-tight text-gray-900 shrink-0">{title}</h2>
        <div className="flex flex-row items-center gap-2 flex-1 justify-end min-w-0">
          <div className="relative flex-1 max-w-[160px]">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-7 h-8 w-full text-[11px] bg-white border-gray-200 shadow-sm focus-visible:ring-1"
            />
          </div>
          {primaryAction}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden px-4 lg:px-10 py-6 bg-gray-50/30">
        <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col min-h-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full w-full border border-gray-200 rounded-lg bg-white shadow-sm gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              <span className="text-[13px] text-gray-500 font-medium">Loading data...</span>
            </div>
          ) : (
            <>
              <div className={`flex flex-col flex-1 w-full rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden relative ${renderMobileCard ? 'hidden xl:flex' : 'flex'}`}>
                <div className="flex-1 overflow-auto">
                  <table className="min-w-[800px] w-full relative">
                    <TableHeader className="sticky top-0 z-20 bg-gray-50 ring-1 ring-gray-200 shadow-sm backdrop-blur-sm">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-gray-50 hover:bg-gray-50 border-none">
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className="h-10 px-4 align-middle font-semibold bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500">
                              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow key={row.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="py-4 px-4 align-top text-[13px]">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="h-32 text-center text-[13px] text-gray-500">
                            No results found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </table>
                </div>
              </div>

              {renderMobileCard && (
                <div className="xl:hidden flex-1 overflow-auto grid grid-cols-1 gap-4 w-full content-start pr-1 p-4">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => renderMobileCard(row))
                  ) : (
                    <div className="h-32 flex items-center justify-center border border-dashed border-gray-300 rounded-xl text-[13px] text-gray-500 w-full">
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="shrink-0 h-16 border-t border-gray-200 bg-white px-6 lg:px-10 flex items-center justify-between w-full z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="text-[13px] text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-semibold">{startItem}</span> to <span className="text-gray-900 font-semibold">{endItem}</span> of <span className="text-gray-900 font-semibold">{currentTotal}</span> results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[12px] bg-white border-gray-200 shadow-sm hover:bg-gray-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[12px] bg-white border-gray-200 shadow-sm hover:bg-gray-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}