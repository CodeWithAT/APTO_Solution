import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";

import Logo from "@/assets/logo.svg?react";

export default function HrmsDashboard() { 
  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      
      {/* Header */}
      <header className="flex h-14 w-full border-b border-gray-200">
        
        <div className="flex items-center px-4 md:hidden border-r border-gray-200">
          <Menu className="h-5 w-5 text-gray-600" />
        </div>

        <div className="hidden md:flex w-[240px] shrink-0 items-center gap-3 border-r border-gray-200 px-6">
          <Logo className="h-6 w-6" />
          <span className="text-sm font-medium text-black">HRMS</span>
        </div>

        <div className="flex flex-1 items-center justify-between px-4 md:px-6">
          <span className="text-sm font-medium text-black">Dashboard</span>
          <div className="h-6 w-6 rounded bg-[#B3B3B3]"></div>
        </div>
        
      </header>

      <div className="flex flex-1">
        
        {/* Sidebar*/}
        <aside className="hidden md:block w-[240px] shrink-0 border-r border-gray-200 p-6">
          <span className="text-xs font-medium text-black">Dashboard</span>
        </aside>

        {/* Main*/}
        <main className="flex flex-1 items-center justify-center p-6 md:p-0">
          
          {/*mobile */}
          <div className="flex w-full max-w-4xl flex-col items-center md:flex-row md:items-start justify-center gap-10 lg:gap-40">
            
            <div className="mt-0.5 h-10 w-10 bg-[#D9D9D9]"></div>

            {/* Form */}
            <div className="flex w-full max-w-[320px] flex-col gap-6">
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dash-email" className="text-[10px] font-medium text-black">
                    Email
                  </Label>
                  <Input 
                    id="dash-email" 
                    type="email" 
                    className="h-9 rounded bg-[#F2F2F2] border-none shadow-none focus-visible:ring-1 focus-visible:ring-gray-300" 
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dash-password" className="text-[10px] font-medium text-black">
                    Password
                  </Label>
                  <Input 
                    id="dash-password" 
                    type="password" 
                    className="h-9 rounded bg-[#F2F2F2] border-none shadow-none focus-visible:ring-1 focus-visible:ring-gray-300" 
                  />
                </div>
              </div>

              <Button className="h-9 w-full rounded bg-[#E6E6E6] text-xs font-medium text-black hover:bg-[#D4D4D4] shadow-none">
                Submit
              </Button>
              
            </div>
          </div>
        </main>
        
      </div>
      
    </div>
  );
}