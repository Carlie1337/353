"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Users, Clock, CheckCircle } from "lucide-react"

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const services = [
    { id: 1, name: "Barangay Clearance", category: "Document", fee: "₱50", status: "Active", requests: 45 },
    { id: 2, name: "Certificate of Residency", category: "Document", fee: "₱30", status: "Active", requests: 32 },
    { id: 3, name: "Business Permit", category: "Permit", fee: "₱500", status: "Active", requests: 18 },
    { id: 4, name: "Community Tax Certificate", category: "Tax", fee: "₱100", status: "Active", requests: 28 },
    { id: 5, name: "Indigency Certificate", category: "Document", fee: "Free", status: "Active", requests: 15 },
    { id: 6, name: "Building Permit", category: "Permit", fee: "₱1,000", status: "Under Review", requests: 8 },
  ]

  const stats = [
    { title: "Total Services", value: "12", icon: Users, color: "text-blue-600" },
    { title: "Active Requests", value: "146", icon: Clock, color: "text-yellow-600" },
    { title: "Completed Today", value: "23", icon: CheckCircle, color: "text-green-600" },
  ]

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Services Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage barangay services and document requests</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Service
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Services Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Available Services</CardTitle>
              <CardDescription>Manage and monitor barangay services</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>{service.fee}</TableCell>
                  <TableCell>
                    <Badge variant={service.status === "Active" ? "default" : "secondary"}>{service.status}</Badge>
                  </TableCell>
                  <TableCell>{service.requests}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
