import { 
  LayoutGrid, Rocket, FileText, BarChart2, Activity, 
  Eye, Shield, Globe, Link as LinkIcon, Blocks, Database, 
  Flag, Cpu, Sparkles, Box, PieChart, ChevronRight, ChevronsUpDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

//  Sidebar 
const sidebarItems = [
  { name: "Projects", icon: LayoutGrid, isActive: true },
  { name: "Deployments", icon: Rocket },
  { name: "Logs", icon: FileText },
  { name: "Analytics", icon: BarChart2 },
  { name: "Speed Insights", icon: Activity },
  { name: "Observability", icon: Eye, hasArrow: true },
  { name: "Firewall", icon: Shield },
  { name: "CDN", icon: Globe },
  { name: "Domains", icon: LinkIcon },
  { name: "Integrations", icon: Blocks },
  { name: "Storage", icon: Database },
  { name: "Flags", icon: Flag },
  { name: "Agent", icon: Cpu, hasArrow: true },
  { name: "AI Gateway", icon: Sparkles, hasArrow: true },
  { name: "Sandboxes", icon: Box },
  { name: "Usage", icon: PieChart },
];

export default function SidebarDashboard() {
  return (
    <div className="flex h-screen w-full bg-[#FAFAFA]">
       
      <aside className="w-[240px] flex flex-col bg-[#F9F9F9] border-r border-gray-200 text-sm">
        
        {/* Header*/}
        <div className="h-14 flex items-center px-4 shrink-0">
          <div className="flex items-center gap-2 text-black cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" fill="#EAB308" />
            </svg>
            <span className="font-semibold text-[14px]">APTO Solutions</span>
          </div>
        </div>

        <ScrollArea className="flex-1 w-full">
          <nav className="flex flex-col gap-0.5 p-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-between px-2 py-1.5 h-auto font-normal hover:bg-gray-200/50 ${
                    item.isActive 
                      ? "bg-[#EAEAEA] text-black font-medium hover:bg-[#EAEAEA]" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} strokeWidth={item.isActive ? 2.5 : 2} className={item.isActive ? "text-black" : "text-gray-500"} />
                    <span className="text-[13px]">{item.name}</span>
                  </div>
                  {item.hasArrow && <ChevronRight size={14} className="text-gray-400" />}
                </Button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="mt-auto flex flex-col">
          <Separator />
          <div className="p-2">
            <Button 
              variant="ghost" 
              className="w-full justify-between px-2 py-6 h-auto hover:bg-gray-200/50"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                    U
                  </AvatarFallback>
                </Avatar>
                <span className="text-[13px] font-medium text-gray-700">user</span>
              </div>
              <ChevronsUpDown size={14} className="text-gray-400" />
            </Button>
          </div>
        </div>

      </aside>

      {/*Content Area */}
      <main className="flex-1 bg-white"></main>
    </div>
  );
}