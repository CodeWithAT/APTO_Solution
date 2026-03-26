import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

import Login from "./pages/Login";                     
import HrmsDashboard from "./pages/HrmsDashboard";      
import DashboardLayout from "./components/DashboardLayout"; 
import DeploymentsTable from "./components/DeploymentsTable"; 
// import EmployeesTable from "./components/EmployeesTable";

// Generic placeholder for unbuilt sidebar routes
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
        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Legacy Module */}
        <Route path="/hrms" element={<HrmsDashboard />} />

        {/* Main Application Layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/deployments" replace />} />
          <Route path="deployments" element={<DeploymentsTable />} />
          {/* <Route path="employees" element={<EmployeesTable />} /> */}
          
          {/* Dynamic Route to handle other sidebar items gracefully */}
          <Route path=":pageId" element={<PlaceholderPage />} />
        </Route>

        {/* Wildcard Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}