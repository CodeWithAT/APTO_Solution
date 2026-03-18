
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";                     
import HrmsDashboard from "./pages/HrmsDashboard";      
import DashboardLayout from "./components/DashboardLayout"; 
import DeploymentsTable from "./components/DeploymentsTable"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
       
        <Route path="/hrms" element={<HrmsDashboard />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/deployments" replace />} />
          <Route path="deployments" element={<DeploymentsTable />} />
         
          <Route path="projects" element={<div className="p-8 text-gray-500">Projects...</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}