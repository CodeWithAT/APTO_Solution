import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      
      <div className="hidden lg:block lg:w-1/2 bg-[#E5E5E5]"></div>

      <div className="flex w-full lg:w-1/2 items-center justify-center px-8">
        <div className="w-full max-sm:max-w-xs max-w-sm flex flex-col gap-6">
          
          <div className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-semibold text-gray-700 cursor-pointer"
              >
                Email
              </Label>
              <Input 
                id="email"
                type="email" 
                placeholder="m@example.com"
                className="h-10 bg-[#F3F4F6] border-none focus-visible:ring-1 focus-visible:ring-gray-400 shadow-none placeholder:text-gray-400" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <Label 
                htmlFor="password" 
                className="text-sm font-semibold text-gray-700 cursor-pointer"
              >
                Password
              </Label>
              <Input 
                id="password"
                type="password" 
                className="h-10 bg-[#F3F4F6] border-none focus-visible:ring-1 focus-visible:ring-gray-400 shadow-none" 
              />
            </div>
          </div>

          <Button className="h-10 w-full bg-[#E5E5E5] text-gray-800 hover:bg-[#D4D4D4] font-bold shadow-none">
            Submit
          </Button>
          
        </div>
      </div>
      
    </div>
  );
}