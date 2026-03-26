import { useState } from "react";
import { MoreHorizontal, GitBranch, ExternalLink, Github, Copy, Check, Trash2, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 1. PROJECT CELL
export function ProjectCell({ project, environment, domain }: { project: string, environment: string, domain: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="font-medium text-[14px] text-gray-900 whitespace-nowrap">{project}</span>
        <Badge variant="outline" className={`text-[10px] h-4 px-1.5 rounded-full whitespace-nowrap ${environment === 'Production' ? 'bg-black text-white border-black shadow-none' : 'bg-gray-100 text-gray-600 border-gray-200 shadow-none'}`}>
          {environment}
        </Badge>
      </div>
      <div className="flex items-center gap-1 text-[12px] text-gray-500 hover:text-black cursor-pointer transition-colors group">
        {domain} <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

// 2. STATUS CELL
export function StatusCell({ status }: { status: "Ready" | "Building" | "Error" }) {
  const Dot = () => {
    if (status === "Ready") return <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.1)]" />;
    if (status === "Building") return <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />;
    return <div className="h-2 w-2 rounded-full bg-red-500" />;
  };

  return (
    <div className="flex items-center gap-2 text-[13px] text-gray-600 whitespace-nowrap">
      <Dot />
      <span>{status}</span>
    </div>
  );
}

// 3. COMMIT CELL
export function CommitCell({ message, branch, hash, author }: { message: string, branch: string, hash: string, author: string }) {
  return (
    <div className="flex flex-col gap-1 max-w-[280px]">
      <div className="flex items-center gap-1.5 text-[13px] text-gray-900 italic">
        <Github size={12} className="text-gray-400 shrink-0" />
        <span className="truncate">"{message}"</span>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-gray-500 whitespace-nowrap">
        <span className="bg-gray-100 px-1 rounded flex items-center gap-0.5"><GitBranch size={10}/>{branch}</span>
        <span>{hash}</span>
        <span className="flex items-center gap-1">{author}</span>
      </div>
    </div>
  );
}

// 4. ACTION CELL (Dropdown)
export function ActionCell({ id, onDelete, onViewLogs }: { id: string, onDelete?: () => void, onViewLogs?: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            {copied ? "Copied!" : "Copy ID"}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-[13px] cursor-pointer gap-2" onClick={onViewLogs}>
            <Terminal size={14} /> View Logs
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-[13px] text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer gap-2" onClick={onDelete}>
            <Trash2 size={14} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}