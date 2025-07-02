"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Eye, Printer, CheckCircle, XCircle, Clock, Search } from "lucide-react"

export default function BMSDocumentsPage() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const documents = [
    {
      id: "DOC-2024-001",
      type: "Barangay Certificate",
      resident: "Maria Santos",
      purpose: "Employment requirement",
      status: "pending",
      date: "2024-01-15",
      priority: "normal",
      fee: 50,
    },
    {
      id: "DOC-2024-002",
      type: "Certificate of Residency",
      resident: "Juan Dela Cruz",
      purpose: "Bank account opening",
      status: "approved",
      date: "2024-01-15",
      priority: "urgent",
      fee: 30,
    },
    {
      id: "DOC-2024-003",
      type: "Business Permit",
      resident: "Ana Rodriguez",
      purpose: "Sari-sari store operation",
      status: "processing",
      date: "2024-01-14",
      priority: "normal",
      fee: 200,
    },
    {
      id: "DOC-2024-004",
      type: "Barangay Clearance",
      resident: "Pedro Garcia",
      purpose: "Police clearance requirement",
      status: "rejected",
      date: "2024-01-13",
      priority: "normal",
      fee: 25,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-orange-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  const handleApprove = (docId: string) => {
    console.log("Approving document:", docId)
    // Handle approval logic
  }

  const handleReject = (docId: string) => {
    console.log("Rejecting document:", docId)
    // Handle rejection logic
  }

  const handlePrint = (docId: string) => {
    console.log("Printing document:", docId)
    // Handle print logic
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Requests</h1>
        <p className="text-gray-600">Process and manage certificate requests</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by resident name or document ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="status">Status Filter</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Document Requests</CardTitle>
          <CardDescription>{documents.length} total requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {doc.type}
                    </div>
                  </TableCell>
                  <TableCell>{doc.resident}</TableCell>
                  <TableCell className="max-w-xs truncate">{doc.purpose}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.status)}
                      {getStatusBadge(doc.status)}
                    </div>
                  </TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>₱{doc.fee}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Document Details - {doc.id}</DialogTitle>
                            <DialogDescription>Review and process document request</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Document Type</Label>
                                <p className="text-sm font-medium">{doc.type}</p>
                              </div>
                              <div>
                                <Label>Resident Name</Label>
                                <p className="text-sm font-medium">{doc.resident}</p>
                              </div>
                              <div>
                                <Label>Purpose</Label>
                                <p className="text-sm">{doc.purpose}</p>
                              </div>
                              <div>
                                <Label>Fee Amount</Label>
                                <p className="text-sm font-medium">₱{doc.fee}</p>
                              </div>
                            </div>

                            {doc.status === "pending" && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="notes">Processing Notes</Label>
                                  <Textarea id="notes" placeholder="Add any notes or comments..." />
                                </div>
                                <div className="flex gap-2">
                                  <Button onClick={() => handleApprove(doc.id)} className="flex-1">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button variant="destructive" onClick={() => handleReject(doc.id)} className="flex-1">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            )}

                            {doc.status === "approved" && (
                              <Button onClick={() => handlePrint(doc.id)} className="w-full">
                                <Printer className="h-4 w-4 mr-2" />
                                Print Document
                              </Button>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {doc.status === "approved" && (
                        <Button variant="outline" size="sm" onClick={() => handlePrint(doc.id)}>
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
  )
}
