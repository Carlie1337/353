"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building, DollarSign, FileText, TrendingUp, Search, Plus, Store } from "lucide-react"

export default function BusinessPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const businesses = [
    {
      id: 1,
      name: "Santos Sari-Sari Store",
      owner: "Maria Santos",
      type: "Retail",
      permit: "BP-2024-001",
      status: "Active",
      revenue: "₱25,000",
      employees: 2,
    },
    {
      id: 2,
      name: "Garcia Auto Repair",
      owner: "Juan Garcia",
      type: "Service",
      permit: "BP-2024-002",
      status: "Active",
      revenue: "₱45,000",
      employees: 5,
    },
    {
      id: 3,
      name: "Reyes Bakery",
      owner: "Ana Reyes",
      type: "Food",
      permit: "BP-2024-003",
      status: "Pending Renewal",
      revenue: "₱35,000",
      employees: 3,
    },
    {
      id: 4,
      name: "Cruz Internet Cafe",
      owner: "Pedro Cruz",
      type: "Technology",
      permit: "BP-2024-004",
      status: "Active",
      revenue: "₱18,000",
      employees: 1,
    },
  ]

  const businessTypes = [
    { type: "Retail", count: 15, revenue: "₱450,000" },
    { type: "Food & Beverage", count: 8, revenue: "₱320,000" },
    { type: "Service", count: 12, revenue: "₱280,000" },
    { type: "Technology", count: 5, revenue: "₱150,000" },
  ]

  const recentApplications = [
    { name: "Lopez Laundry Shop", applicant: "Rosa Lopez", date: "2024-01-15", status: "Under Review" },
    { name: "Mendoza Catering", applicant: "Carlos Mendoza", date: "2024-01-14", status: "Approved" },
    { name: "Torres Hardware", applicant: "Miguel Torres", date: "2024-01-13", status: "Pending Documents" },
  ]

  const stats = [
    { title: "Total Businesses", value: "87", icon: Building, color: "text-blue-600" },
    { title: "Monthly Revenue", value: "₱1.2M", icon: DollarSign, color: "text-green-600" },
    { title: "Active Permits", value: "82", icon: FileText, color: "text-purple-600" },
    { title: "Growth Rate", value: "+12%", icon: TrendingUp, color: "text-red-600" },
  ]

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Pending Renewal":
        return "destructive"
      case "Suspended":
        return "destructive"
      case "Under Review":
        return "secondary"
      case "Approved":
        return "default"
      case "Pending Documents":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Business Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage business permits, registrations, and revenue tracking
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Business Permit
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Businesses Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Registered Businesses</CardTitle>
                  <CardDescription>All businesses in the barangay</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search businesses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Permit #</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBusinesses.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell className="font-medium">{business.name}</TableCell>
                      <TableCell>{business.owner}</TableCell>
                      <TableCell>{business.type}</TableCell>
                      <TableCell className="font-mono text-sm">{business.permit}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(business.status)}>{business.status}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{business.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Business Types */}
          <Card>
            <CardHeader>
              <CardTitle>Business Categories</CardTitle>
              <CardDescription>Revenue by business type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {businessTypes.map((type, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{type.type}</h4>
                    <Badge variant="outline">{type.count} businesses</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Revenue: {type.revenue}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest permit applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium">{app.name}</h4>
                  <p className="text-sm text-gray-500">by {app.applicant}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{new Date(app.date).toLocaleDateString()}</span>
                    <Badge variant={getStatusColor(app.status)} className="text-xs">
                      {app.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
