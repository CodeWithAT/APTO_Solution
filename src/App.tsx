import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

import Login from "./pages/Login";                     
import HrmsDashboard from "./pages/HrmsDashboard";      
import DashboardLayout from "./components/DashboardLayout"; 
import DeploymentsTable from "./components/DeploymentsTable"; 


const PlaceholderPage = () => {
  const { pageId } = useParams();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#FAFAFA] p-8 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-900 capitalize mb-2">
          {pageId?.replace('-', ' ')}
        </h2>
        <p className="text-sm text-gray-500">
          This module is currently under construction. Please check back later!
        </p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/login" element={<Login />} />

     
        <Route path="/hrms" element={<HrmsDashboard />} />

        
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/deployments" replace />} />
          <Route path="deployments" element={<DeploymentsTable />} />
          
         
          <Route path=":pageId" element={<PlaceholderPage />} />
        </Route>

       
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}