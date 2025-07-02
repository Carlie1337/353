"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Building,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Check,
  X,
  Calendar,
  MapPin,
  DollarSign,
} from "lucide-react"

export default function BusinessPermits() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreatePermitOpen, setIsCreatePermitOpen] = useState(false)

  // Demo data
  const permits = [
    {
      id: "BP-001",
      businessName: "Juan's Sari-Sari Store",
      owner: "Juan Dela Cruz",
      type: "Retail",
      status: "Active",
      issueDate: "2024-01-15",
      expiryDate: "2024-12-31",
      fee: "₱2,500",
      location: "123 Main St, Zone 1",
      avatar: "JD",
    },
    {
      id: "BP-002",
      businessName: "Maria's Beauty Salon",
      owner: "Maria Santos",
      type: "Service",
      status: "Pending",
      issueDate: "-",
      expiryDate: "-",
      fee: "₱3,000",
      location: "456 Oak Ave, Zone 2",
      avatar: "MS",
    },
    {
      id: "BP-003",
      businessName: "Pedro's Auto Repair",
      owner: "Pedro Garcia",
      type: "Automotive",
      status: "Expired",
      issueDate: "2023-01-10",
      expiryDate: "2023-12-31",
      fee: "₱5,000",
      location: "789 Pine Rd, Zone 3",
      avatar: "PG",
    },
    {
      id: "BP-004",
      businessName: "Ana's Bakery",
      owner: "Ana Reyes",
      type: "Food Service",
      status: "Under Review",
      issueDate: "-",
      expiryDate: "-",
      fee: "₱4,000",
      location: "321 Bread St, Zone 1",
      avatar: "AR",
    },
  ]

  const stats = {
    total: 156,
    active: 89,
    pending: 23,
    expired: 12,
    revenue: 450000,
  }

  const filteredPermits = permits.filter((permit) => {
    const matchesSearch =
      permit.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || permit.status.toLowerCase().replace(" ", "") === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Pending":
        return "secondary"
      case "Expired":
        return "destructive"
      case "Under Review":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Business Permits</h2>
            <p className="text-slate-400">Manage business registrations and permits</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-200">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={isCreatePermitOpen} onOpenChange={setIsCreatePermitOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="mr-2 h-4 w-4" />
                  New Permit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Issue Business Permit</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Create a new business permit application
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="businessName" className="text-right text-slate-300">
                      Business Name
                    </Label>
                    <Input id="businessName" className="col-span-3 bg-slate-800 border-slate-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="owner" className="text-right text-slate-300">
                      Owner
                    </Label>
                    <Input id="owner" className="col-span-3 bg-slate-800 border-slate-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right text-slate-300">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-slate-800 border-slate-700">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="food">Food Service</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right text-slate-300">
                      Location
                    </Label>
                    <Textarea id="location" className="col-span-3 bg-slate-800 border-slate-700" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreatePermitOpen(false)}
                    className="bg-slate-800 border-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setIsCreatePermitOpen(false)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Issue Permit
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Permits</CardTitle>
              <Building className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-slate-400">All time</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Active</CardTitle>
              <Check className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.active}</div>
              <p className="text-xs text-slate-400">Currently valid</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Pending</CardTitle>
              <Eye className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pending}</div>
              <p className="text-xs text-slate-400">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Expired</CardTitle>
              <X className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.expired}</div>
              <p className="text-xs text-slate-400">Need renewal</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₱{(stats.revenue / 1000).toFixed(0)}K</div>
              <p className="text-xs text-slate-400">This year</p>
            </CardContent>
          </Card>
        </div>

        {/* Business Permits Table */}
        <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Business Permits Directory</CardTitle>
            <CardDescription className="text-slate-400">Manage all business permits and applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="underreview">Under Review</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-200">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>

            <div className="rounded-lg border border-slate-800">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">Business</TableHead>
                    <TableHead className="text-slate-300">Owner</TableHead>
                    <TableHead className="text-slate-300">Type</TableHead>
                    <TableHead className="text-slate-300">Location</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Validity</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPermits.map((permit) => (
                    <TableRow key={permit.id} className="border-slate-800 hover:bg-slate-800/30">
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{permit.businessName}</div>
                          <div className="text-sm text-slate-400">{permit.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-slate-700 text-slate-200">{permit.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium text-white">{permit.owner}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {permit.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-slate-300">
                          <MapPin className="h-3 w-3" />
                          {permit.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(permit.status)} className="text-xs">
                          {permit.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-slate-300">
                          {permit.expiryDate !== "-" ? (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {permit.expiryDate}
                            </div>
                          ) : (
                            <span className="text-slate-500">Not issued</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {permit.status === "Pending" && (
                            <>
                              <Button variant="outline" size="sm" className="text-green-400 border-green-400/50">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-400 border-red-400/50">
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
