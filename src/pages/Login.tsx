export default function Login() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      
       {/* Left Branding Section */}
      <div className="hidden lg:block lg:w-1/2 bg-[#E5E5E5]"></div>

      {/* Right Login Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-8">
        <div className="w-full max-w-sm flex flex-col gap-6">
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                className="h-10 w-full rounded-md bg-[#F3F4F6] px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                className="h-10 w-full rounded-md bg-[#F3F4F6] px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />
            </div>
          </div>

          <button className="h-10 w-full rounded-md bg-[#E5E5E5] text-sm font-bold text-gray-800 hover:bg-[#D4D4D4] transition-colors">
            Submit
          </button>
          
        </div>
      </div>
      
    </div>
  );
}