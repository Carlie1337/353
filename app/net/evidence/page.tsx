"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Archive, Plus, Search, Download, Eye, Lock, Unlock, FileText, ImageIcon, Video } from "lucide-react"

export default function EvidencePage() {
  const evidenceItems = [
    {
      id: "EVD-2024-001",
      caseId: "INC-2024-001",
      type: "Photo",
      description: "Traffic accident scene photos",
      location: "Main Street & 5th Ave",
      collectedBy: "Officer Martinez",
      dateCollected: "2024-01-15",
      status: "Secured",
      chainOfCustody: "Complete",
    },
    {
      id: "EVD-2024-002",
      caseId: "INC-2024-002",
      type: "Document",
      description: "Witness statements",
      location: "Barangay Hall",
      collectedBy: "Officer Santos",
      dateCollected: "2024-01-14",
      status: "Under Review",
      chainOfCustody: "Complete",
    },
    {
      id: "EVD-2024-003",
      caseId: "INC-2024-003",
      type: "Video",
      description: "CCTV footage",
      location: "Market Area",
      collectedBy: "Security Team",
      dateCollected: "2024-01-13",
      status: "Secured",
      chainOfCustody: "Complete",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Secured":
        return "bg-green-100 text-green-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Released":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Photo":
        return <ImageIcon className="h-4 w-4" />
      case "Video":
        return <Video className="h-4 w-4" />
      case "Document":
        return <FileText className="h-4 w-4" />
      default:
        return <Archive className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evidence Management</h1>
          <p className="text-muted-foreground">Secure storage and tracking of case evidence</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Evidence
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Evidence</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Items in storage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Secured Items</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Properly secured</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pending analysis</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chain Integrity</CardTitle>
            <Unlock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Custody maintained</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input placeholder="Search by case ID, description, or officer..." />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Evidence Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="photo">Photos</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="physical">Physical Items</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="secured">Secured</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="released">Released</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Table */}
      <Card>
        <CardHeader>
          <CardTitle>Evidence Inventory</CardTitle>
          <CardDescription>Complete list of collected evidence items</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evidence ID</TableHead>
                <TableHead>Case ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Collected By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Chain of Custody</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evidenceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.caseId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      {item.type}
                    </div>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.collectedBy}</TableCell>
                  <TableCell>{item.dateCollected}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-600">
                      {item.chainOfCustody}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Chain of Custody Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Chain of Custody Activities</CardTitle>
          <CardDescription>Latest evidence handling activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Evidence EVD-2024-001 accessed</div>
                <div className="text-sm text-muted-foreground">Officer Martinez reviewed traffic accident photos</div>
              </div>
              <div className="text-sm text-muted-foreground">2 hours ago</div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Evidence EVD-2024-002 secured</div>
                <div className="text-sm text-muted-foreground">Witness statements filed in secure storage</div>
              </div>
              <div className="text-sm text-muted-foreground">1 day ago</div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Evidence EVD-2024-003 collected</div>
                <div className="text-sm text-muted-foreground">CCTV footage obtained from market area</div>
              </div>
              <div className="text-sm text-muted-foreground">2 days ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
