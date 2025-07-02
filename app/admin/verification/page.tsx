"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserCheck, Clock, Search, Eye, CheckCircle, XCircle, Download, AlertTriangle } from "lucide-react"

export default function VerificationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedResident, setSelectedResident] = useState<any>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const pendingVerifications = [
    {
      id: "REG-2024-001",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "09123456789",
      address: "123 Main Street, Zone 2",
      submittedAt: "2024-01-15T10:30:00",
      documents: {
        validId: "valid-id-maria.jpg",
        proofResidence: "utility-bill-maria.pdf",
        birthCertificate: "birth-cert-maria.pdf",
      },
      status: "pending",
      priority: "normal",
    },
    {
      id: "REG-2024-002",
      name: "Juan Dela Cruz",
      email: "juan.delacruz@email.com",
      phone: "09987654321",
      address: "456 Oak Avenue, Zone 1",
      submittedAt: "2024-01-14T14:20:00",
      documents: {
        validId: "valid-id-juan.jpg",
        proofResidence: "lease-agreement-juan.pdf",
        birthCertificate: null,
      },
      status: "under_review",
      priority: "normal",
    },
    {
      id: "REG-2024-003",
      name: "Ana Garcia",
      email: "ana.garcia@email.com",
      phone: "09555123456",
      address: "789 Pine Street, Zone 3",
      submittedAt: "2024-01-13T09:15:00",
      documents: {
        validId: "valid-id-ana.jpg",
        proofResidence: "utility-bill-ana.pdf",
        birthCertificate: "birth-cert-ana.pdf",
      },
      status: "needs_clarification",
      priority: "high",
    },
  ]

  const verifiedResidents = [
    {
      id: "REG-2024-004",
      name: "Pedro Lopez",
      email: "pedro.lopez@email.com",
      verifiedAt: "2024-01-12T16:45:00",
      verifiedBy: "Admin Rodriguez",
      status: "approved",
    },
    {
      id: "REG-2024-005",
      name: "Rosa Fernandez",
      email: "rosa.fernandez@email.com",
      verifiedAt: "2024-01-11T11:30:00",
      verifiedBy: "Admin Martinez",
      status: "approved",
    },
  ]

  const rejectedApplications = [
    {
      id: "REG-2024-006",
      name: "Carlos Mendoza",
      email: "carlos.mendoza@email.com",
      rejectedAt: "2024-01-10T13:20:00",
      rejectedBy: "Admin Silva",
      reason: "Invalid documents provided",
      status: "rejected",
    },
  ]

  const stats = [
    { title: "Pending Verification", value: "23", icon: Clock, color: "text-yellow-600" },
    { title: "Approved Today", value: "8", icon: UserCheck, color: "text-green-600" },
    { title: "Under Review", value: "12", icon: Eye, color: "text-blue-600" },
    { title: "Need Clarification", value: "5", icon: AlertTriangle, color: "text-red-600" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "under_review":
        return "outline"
      case "needs_clarification":
        return "destructive"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "normal":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const handleApprove = (id: string) => {
    console.log("Approving registration:", id)
    // Implementation for approval
  }

  const handleReject = (id: string, reason: string) => {
    console.log("Rejecting registration:", id, "Reason:", reason)
    // Implementation for rejection
  }

  const handleRequestClarification = (id: string, message: string) => {
    console.log("Requesting clarification for:", id, "Message:", message)
    // Implementation for requesting clarification
  }

  const filteredPending = pendingVerifications.filter(
    (resident) =>
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resident Verification</h1>
          <p className="text-gray-600 dark:text-gray-400">Review and verify new resident registrations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
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

      <Tabs defaultValue="pending" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="pending">Pending Verification</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
              <CardDescription>New resident registrations awaiting verification</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Registration ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPending.map((resident) => (
                    <TableRow key={resident.id}>
                      <TableCell className="font-medium">{resident.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{resident.name}</div>
                          <div className="text-sm text-gray-500">{resident.address}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{resident.email}</div>
                          <div className="text-gray-500">{resident.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(resident.submittedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(resident.status)}>{resident.status.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(resident.priority)}>{resident.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedResident(resident)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[700px]">
                              <DialogHeader>
                                <DialogTitle>Verify Registration - {selectedResident?.name}</DialogTitle>
                                <DialogDescription>Review submitted information and documents</DialogDescription>
                              </DialogHeader>
                              {selectedResident && (
                                <div className="grid gap-6 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Personal Information</Label>
                                      <div className="mt-2 space-y-1 text-sm">
                                        <p>
                                          <strong>Name:</strong> {selectedResident.name}
                                        </p>
                                        <p>
                                          <strong>Email:</strong> {selectedResident.email}
                                        </p>
                                        <p>
                                          <strong>Phone:</strong> {selectedResident.phone}
                                        </p>
                                        <p>
                                          <strong>Address:</strong> {selectedResident.address}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Submitted Documents</Label>
                                      <div className="mt-2 space-y-2">
                                        {selectedResident.documents.validId && (
                                          <div className="flex items-center justify-between p-2 border rounded">
                                            <span className="text-sm">Valid ID</span>
                                            <Button variant="outline" size="sm">
                                              <Eye className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        )}
                                        {selectedResident.documents.proofResidence && (
                                          <div className="flex items-center justify-between p-2 border rounded">
                                            <span className="text-sm">Proof of Residence</span>
                                            <Button variant="outline" size="sm">
                                              <Eye className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        )}
                                        {selectedResident.documents.birthCertificate && (
                                          <div className="flex items-center justify-between p-2 border rounded">
                                            <span className="text-sm">Birth Certificate</span>
                                            <Button variant="outline" size="sm">
                                              <Eye className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="verification-notes">Verification Notes</Label>
                                    <Textarea
                                      id="verification-notes"
                                      placeholder="Add notes about the verification process..."
                                      rows={3}
                                    />
                                  </div>
                                </div>
                              )}
                              <DialogFooter className="flex justify-between">
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      if (selectedResident) {
                                        handleRequestClarification(selectedResident.id, "")
                                      }
                                      setIsViewOpen(false)
                                    }}
                                  >
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    Request Clarification
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => {
                                      if (selectedResident) {
                                        handleReject(selectedResident.id, "")
                                      }
                                      setIsViewOpen(false)
                                    }}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                                <Button
                                  onClick={() => {
                                    if (selectedResident) {
                                      handleApprove(selectedResident.id)
                                    }
                                    setIsViewOpen(false)
                                  }}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve Registration
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm" onClick={() => handleApprove(resident.id)}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleReject(resident.id, "")}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Registrations</CardTitle>
              <CardDescription>Successfully verified and approved residents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verifiedResidents.map((resident) => (
                  <div
                    key={resident.id}
                    className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium text-green-900 dark:text-green-100">{resident.name}</h3>
                      <Badge variant="default">Approved</Badge>
                    </div>
                    <p className="text-green-800 dark:text-green-200 mb-2">{resident.email}</p>
                    <div className="text-sm text-green-600 dark:text-green-300">
                      Verified on {new Date(resident.verifiedAt).toLocaleString()} by {resident.verifiedBy}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Applications</CardTitle>
              <CardDescription>Applications that were rejected during verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rejectedApplications.map((resident) => (
                  <div key={resident.id} className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <h3 className="font-medium text-red-900 dark:text-red-100">{resident.name}</h3>
                      <Badge variant="destructive">Rejected</Badge>
                    </div>
                    <p className="text-red-800 dark:text-red-200 mb-2">{resident.email}</p>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                      <strong>Reason:</strong> {resident.reason}
                    </p>
                    <div className="text-sm text-red-600 dark:text-red-300">
                      Rejected on {new Date(resident.rejectedAt).toLocaleString()} by {resident.rejectedBy}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
