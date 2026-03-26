import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"

// 1. Bilkul naya Data Structure (No Deployments here)
export type Employee = {
  id: string
  name: string
  role: string
  department: string
}

// 2. Bilkul naye Columns
export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
    cell: ({ row }) => <div className="font-medium text-gray-900">{row.original.name}</div>
  },
  {
    accessorKey: "role",
    header: "Job Title",
    cell: ({ row }) => <div className="text-gray-600">{row.original.role}</div>
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">
        {row.original.department}
      </span>
    )
  },
]

// 3. Fake Data
const mockEmployees: Employee[] = [
  { id: "1", name: "Rahul Sharma", role: "Senior Frontend Engineer", department: "Engineering" },
  { id: "2", name: "Priya Singh", role: "Product Manager", department: "Product" },
  { id: "3", name: "Amit Kumar", role: "QA Tester", department: "Engineering" },
  { id: "4", name: "Neha Gupta", role: "HR Executive", department: "Human Resources" },
]

export default function EmployeesTable() {
  const [data] = useState<Employee[]>(mockEmployees)

  return (
    // 4. Calling the exact same Generic Engine!
    <DataTable 
      columns={columns} 
      data={data} 
      title="Company Employees"
      searchPlaceholder="Search by name or role..."
      mode="client"
      primaryAction={
        <Button className="bg-blue-600 text-white hover:bg-blue-700 h-8 px-4 rounded-md text-[11px]">
          Add Employee
        </Button>
      }
    />
  )
}