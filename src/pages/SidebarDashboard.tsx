import { useState, useEffect } from "react";
import { 
  LayoutGrid, Rocket, FileText, BarChart2, Activity, 
  Eye, Shield, Globe, Link as LinkIcon, Blocks, Database, 
  Flag, Cpu, Sparkles, Box, PieChart, ChevronRight, ChevronsUpDown, 
  Menu, Search, HelpCircle, Settings
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import DeploymentsTable from "@/components/DeploymentsTable";

import Logo from "@/assets/logo.svg?react";

const sidebarItems = [
  { name: "Projects", icon: LayoutGrid },
  { name: "Deployments", icon: Rocket, isActive: true },
  { name: "Logs", icon: FileText },
  { name: "Analytics", icon: BarChart2 },
  { name: "Speed Insights", icon: Activity },
  { name: "Observability", icon: Eye, hasArrow: true, children: [
    { name: "Metrics" },
    { name: "Traces" },
    { name: "Errors" },
  ]},
  { name: "Firewall", icon: Shield },
  { name: "CDN", icon: Globe },
  { name: "Domains", icon: LinkIcon },
  { name: "Integrations", icon: Blocks },
  { name: "Storage", icon: Database },
  { name: "Flags", icon: Flag },
  { name: "Agent", icon: Cpu, hasArrow: true, children: [
    { name: "Configuration" },
    { name: "Status" },
  ]},
  { name: "AI Gateway", icon: Sparkles, hasArrow: true, children: [
    { name: "API Keys" },
    { name: "Rate Limits" },
  ]},
  { name: "Sandboxes", icon: Box },
  { name: "Usage", icon: PieChart, hasArrow: true, children: [
    { name: "Last 30 days" },
    { name: "Image Optimization", category: true },
    { name: "Transformations", subIndent: true },
    { name: "Cache Writes", subIndent: true },
    { name: "Cache Reads", subIndent: true },
    { name: "Edge Requests" },
    { name: "Fast Data Transfer" },
    { name: "ISR Reads" },
    { name: "ISR Writes" },
    { name: "Edge Request CPU Duration" },
    { name: "Microfrontends Routing" },
  ]},
  { name: "Support", icon: HelpCircle },
  { name: "Settings", icon: Settings },
];

const SidebarContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (name: string) => {
    setOpenItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const filteredItems = sidebarItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'f' || e.key === 'F') && 
          !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) {
        e.preventDefault();
        document.getElementById('sidebar-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-[100dvh] md:h-full flex-col bg-[#F9F9F9] text-sm overflow-hidden border-r border-gray-200">
      
      {/* Header */}
      <div className="h-14 flex items-center px-4 shrink-0">
        <div className="flex items-center gap-2 text-black cursor-pointer">
          <Logo className="h-5 w-5" />
         
          <span className="font-semibold text-[14px]">APTO Solution</span>
        </div>
      </div>

      <div className="px-3 pb-2 pt-1 shrink-0">
        <div className="relative flex items-center bg-white border border-gray-200 rounded-md px-2 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-all h-8">
          <Search size={14} className="text-gray-400 shrink-0" />
          <Input
            id="sidebar-search"
            type="text"
            placeholder="Find..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 ml-2 border-0 bg-transparent outline-none text-[13px] focus-visible:ring-0 shadow-none px-0 h-full"
          />
          <span className="text-[10px] text-gray-500 font-mono bg-gray-100 border border-gray-200 px-1.5 rounded ml-2 hidden lg:block">F</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <nav className="flex flex-col gap-0.5 p-2 pb-6">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = openItems[item.name];

              if (hasChildren) {
                return (
                  <Collapsible 
                    key={item.name} 
                    open={isOpen} 
                    onOpenChange={() => toggleItem(item.name)}
                    className="w-full"
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between px-2 py-1.5 h-auto font-normal text-gray-600 hover:bg-gray-200/50 hover:text-gray-900"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={16} strokeWidth={2} className="text-gray-500" />
                          <span className="text-[13px]">{item.name}</span>
                        </div>
                        <ChevronRight 
                          size={14} 
                          className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} 
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
                      <div className="flex flex-col gap-0.5 pt-1 pb-1">
                        {item.children.map((child, index) => {
                          if (child.category) {
                            return (
                              <div key={index} className="px-4 py-1 pt-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider pl-9">
                                {child.name}
                              </div>
                            );
                          }
                          return (
                            <Button
                              key={index}
                              variant="ghost"
                              className={`w-full justify-start py-1.5 h-auto font-normal text-[13px] text-gray-500 hover:bg-gray-200/50 hover:text-gray-900 ${
                                child.subIndent ? "pl-12" : "pl-9"
                              }`}
                            >
                              {child.name}
                            </Button>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-between px-2 py-1.5 h-auto font-normal transition-colors ${
                    item.isActive 
                      ? "bg-[#EAEAEA] text-black font-medium hover:bg-[#EAEAEA]" 
                      : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} strokeWidth={item.isActive ? 2.5 : 2} className={item.isActive ? "text-black" : "text-gray-500"} />
                    <span className="text-[13px]">{item.name}</span>
                  </div>
                </Button>
              );
            })}
          </nav>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-col shrink-0">
        <Separator />
        <div className="p-2">
          <Button variant="ghost" className="w-full justify-between px-2 py-6 h-auto hover:bg-gray-200/50">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">U</AvatarFallback>
              </Avatar>
              <span className="text-[13px] font-medium text-gray-700">User</span>
            </div>
            <ChevronsUpDown size={14} className="text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function SidebarDashboard() {
  return (
    <div className="flex h-[100dvh] w-full flex-col md:flex-row bg-[#FAFAFA] overflow-hidden">
      
      {/* Mobile Header */}
      <div className="flex md:hidden h-14 items-center justify-between border-b border-gray-200 bg-[#F9F9F9] px-4 shrink-0">
        <div className="flex items-center gap-2 text-black">
          <Logo className="h-5 w-5" />
       
          <span className="font-semibold text-[14px]">Lorem Ipsum</span>
        </div>
        
        <Sheet>
          <SheetTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-200 transition-colors">
            <Menu className="h-5 w-5 text-gray-800" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-0 border-none [&>button]:hidden">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[240px] flex-col bg-[#F9F9F9] border-r border-gray-200 text-sm h-full shrink-0">
        <SidebarContent />
      </aside>

      <main className="flex-1 bg-white h-full overflow-y-auto p-6 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <DeploymentsTable />
        </div>
      </main>
      
    </div>
  );
}