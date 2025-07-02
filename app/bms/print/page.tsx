"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer, FileText, Download, Search, Eye, Calendar } from "lucide-react"

export default function BMSPrintPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [documentType, setDocumentType] = useState("all")

  const printQueue = [
    {
      id: "PRT-001",
      documentId: "DOC-2024-001",
      type: "Barangay Certificate",
      resident: "Maria Santos",
      status: "ready",
      requestDate: "2024-01-15",
      copies: 1,
    },
    {
      id: "PRT-002",
      documentId: "DOC-2024-002",
      type: "Certificate of Residency",
      resident: "Juan Dela Cruz",
      status: "printed",
      requestDate: "2024-01-15",
      copies: 2,
    },
    {
      id: "PRT-003",
      documentId: "DOC-2024-003",
      type: "Business Permit",
      resident: "Ana Rodriguez",
      status: "pending",
      requestDate: "2024-01-14",
      copies: 1,
    },
  ]

  const templates = [
    {
      name: "Barangay Certificate",
      description: "Standard barangay certificate template",
      lastUsed: "2024-01-15",
    },
    {
      name: "Certificate of Residency",
      description: "Proof of residence certificate",
      lastUsed: "2024-01-14",
    },
    {
      name: "Business Permit",
      description: "Business operation permit",
      lastUsed: "2024-01-13",
    },
    {
      name: "Barangay Clearance",
      description: "General clearance certificate",
      lastUsed: "2024-01-12",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800">Ready to Print</Badge>
      case "printed":
        return <Badge className="bg-blue-100 text-blue-800">Printed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handlePrint = (id: string) => {
    console.log("Printing document:", id)
    // Handle print logic
  }

  const handlePreview = (id: string) => {
    console.log("Previewing document:", id)
    // Handle preview logic
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Print Center</h1>
        <p className="text-gray-600">Manage document printing and templates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ready to Print</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <Printer className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Printed Today</p>
                <p className="text-2xl font-bold text-blue-600">28</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Templates</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Print Queue */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Print Queue</CardTitle>
              <CardDescription>Documents ready for printing</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="certificate">Certificates</SelectItem>
                    <SelectItem value="permit">Permits</SelectItem>
                    <SelectItem value="clearance">Clearances</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Resident</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Copies</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {printQueue.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.type}</p>
                          <p className="text-sm text-gray-600 font-mono">{item.documentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.resident}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.copies}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handlePreview(item.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {item.status === "ready" && (
                            <Button size="sm" onClick={() => handlePrint(item.id)}>
                              <Printer className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Document Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Document Templates</CardTitle>
            <CardDescription>Available certificate templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Last used: {template.lastUsed}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common printing tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Printer className="h-6 w-6 mb-2" />
              Print All Ready
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Batch Print
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              Export Queue
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Eye className="h-6 w-6 mb-2" />
              Preview All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
