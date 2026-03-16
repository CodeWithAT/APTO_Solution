import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      
      {/*  Header  */}
      <header className="flex h-14 w-full border-b border-gray-200">
        
        <div className="flex w-[240px] shrink-0 items-center gap-3 border-r border-gray-200 px-6">
          <div className="h-6 w-6 rounded bg-[#B3B3B3]"></div>
          <span className="text-sm font-medium text-black">HRMS</span>
        </div>

        <div className="flex flex-1 items-center justify-between px-6">
          <span className="text-sm font-medium text-black">Dashboard</span>
          <div className="h-6 w-6 rounded bg-[#B3B3B3]"></div>
        </div>
        
      </header>


      <div className="flex flex-1">
        
        {/*  Sidebar */}
        <aside className="w-[240px] shrink-0 border-r border-gray-200 p-6">
          <span className="text-xs font-medium text-black">Dashboard</span>
        </aside>


        <main className="flex flex-1 items-center justify-center">
          
          <div className="flex w-full max-w-4xl items-start justify-center gap-80">
            

            <div className="mt-0.5 h-10 w-10 bg-[#D9D9D9]"></div>

            {/* Form Area */}
            <div className="flex w-[320px] flex-col gap-6">
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-medium text-black">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="h-9 rounded bg-[#F2F2F2] border-none shadow-none focus-visible:ring-1 focus-visible:ring-gray-300" 
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-[10px] font-medium text-black">
                    Password
                  </label>
                  <Input 
                    id="password" 
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