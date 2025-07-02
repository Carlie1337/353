"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileCheck,
  Building,
  Hammer,
  Calendar,
  Car,
  Search,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

const permits = [
  {
    id: 1,
    type: "Business Permit",
    applicant: "Maria Santos",
    business: "Santos Grocery Store",
    dateApplied: "2024-01-15",
    status: "Approved",
    fee: "₱2,500",
    validUntil: "2024-12-31",
  },
  {
    id: 2,
    type: "Construction Permit",
    applicant: "Juan Dela Cruz",
    project: "Two-Story Residential House",
    dateApplied: "2024-01-12",
    status: "Under Review",
    fee: "₱15,000",
    validUntil: "2025-01-12",
  },
  {
    id: 3,
    type: "Event Permit",
    applicant: "Ana Rodriguez",
    event: "Birthday Party",
    dateApplied: "2024-01-10",
    status: "Approved",
    fee: "₱500",
    validUntil: "2024-01-20",
  },
  {
    id: 4,
    type: "Transport Permit",
    applicant: "Carlos Mendoza",
    vehicle: "Tricycle - ABC 123",
    dateApplied: "2024-01-08",
    status: "Pending",
    fee: "₱1,200",
    validUntil: "2024-12-31",
  },
]

const permitTypes = [
  {
    name: "Business Permit",
    icon: Building,
    description: "Permit for operating business establishments",
    fee: "₱2,500",
    processing: "5-7 days",
    requirements: ["DTI Registration", "BIR Certificate", "Sanitary Permit", "Fire Safety Certificate"],
  },
  {
    name: "Construction Permit",
    icon: Hammer,
    description: "Permit for construction and renovation projects",
    fee: "₱15,000",
    processing: "10-15 days",
    requirements: ["Building Plans", "Lot Title", "Tax Declaration", "Engineering Plans"],
  },
  {
    name: "Event Permit",
    icon: Calendar,
    description: "Permit for organizing events and gatherings",
    fee: "₱500",
    processing: "2-3 days",
    requirements: ["Event Details", "Security Plan", "Venue Agreement", "Insurance Certificate"],
  },
  {
    name: "Transport Permit",
    icon: Car,
    description: "Permit for public utility vehicles",
    fee: "₱1,200",
    processing: "3-5 days",
    requirements: ["Vehicle Registration", "Driver's License", "Insurance", "Vehicle Inspection"],
  },
]

const statusColors = {
  Approved: "default",
  "Under Review": "secondary",
  Pending: "outline",
  Rejected: "destructive",
}

const statusIcons = {
  Approved: CheckCircle,
  "Under Review": Clock,
  Pending: AlertCircle,
  Rejected: XCircle,
}

export default function PermitsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredPermits = permits.filter((permit) => {
    const matchesSearch =
      permit.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || permit.type === selectedType
    return matchesSearch && matchesType
  })

  const getStatusCount = (status: string) => permits.filter((p) => p.status === status).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Permits & Licenses</h1>
          <p className="text-muted-foreground">Manage permit applications and licenses</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Status Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permits.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getStatusCount("Approved")}</div>
            <p className="text-xs text-muted-foreground">Ready for release</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{getStatusCount("Under Review")}</div>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{getStatusCount("Pending")}</div>
            <p className="text-xs text-muted-foreground">Awaiting requirements</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="types">Permit Types</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permit Applications</CardTitle>
              <CardDescription>Track and manage all permit applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="space-y-4">
                {filteredPermits.map((permit) => {
                  const StatusIcon = statusIcons[permit.status as keyof typeof statusIcons]
                  return (
                    <div key={permit.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{permit.type}</h3>
                          <p className="text-sm text-muted-foreground">Applicant: {permit.applicant}</p>
                          <p className="text-xs text-muted-foreground">
                            {permit.business || permit.project || permit.event || permit.vehicle}
                          </p>
                          <p className="text-xs text-muted-foreground">Applied: {permit.dateApplied}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge variant={statusColors[permit.status as keyof typeof statusColors] as any}>
                            {permit.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{permit.fee}</p>
                        <p className="text-xs text-muted-foreground">Valid until: {permit.validUntil}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {permitTypes.map((type, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <type.icon className="h-5 w-5" />
                    <span>{type.name}</span>
                  </CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fee:</span>
                      <span className="text-sm font-medium">{type.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Processing Time:</span>
                      <span className="text-sm font-medium">{type.processing}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Requirements:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {type.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Report</CardTitle>
                <CardDescription>Permit statistics for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Applications:</span>
                    <span className="font-semibold">{permits.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Approved:</span>
                    <span className="font-semibold text-green-600">{getStatusCount("Approved")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Under Review:</span>
                    <span className="font-semibold text-yellow-600">{getStatusCount("Under Review")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending:</span>
                    <span className="font-semibold text-orange-600">{getStatusCount("Pending")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Summary</CardTitle>
                <CardDescription>Permit fees collected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Business Permits:</span>
                    <span className="font-semibold">₱7,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Construction Permits:</span>
                    <span className="font-semibold">₱15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Event Permits:</span>
                    <span className="font-semibold">₱1,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport Permits:</span>
                    <span className="font-semibold">₱2,400</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Total Revenue:</span>
                    <span>₱26,400</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
