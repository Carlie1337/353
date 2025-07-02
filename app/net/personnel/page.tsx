"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Plus, Search, Edit, Eye, Phone, Mail, Shield, UserCheck } from "lucide-react"

export default function PersonnelPage() {
  const personnel = [
    {
      id: "OFF-001",
      name: "Officer Martinez",
      rank: "Senior Officer",
      badge: "12345",
      department: "Patrol",
      status: "On Duty",
      shift: "Morning",
      contact: "+63 912 345 6789",
      email: "martinez@net.gov.ph",
    },
    {
      id: "OFF-002",
      name: "Officer Santos",
      rank: "Officer",
      badge: "12346",
      department: "Investigation",
      status: "On Duty",
      shift: "Morning",
      contact: "+63 912 345 6790",
      email: "santos@net.gov.ph",
    },
    {
      id: "OFF-003",
      name: "Detective Cruz",
      rank: "Detective",
      badge: "12347",
      department: "Investigation",
      status: "Off Duty",
      shift: "Night",
      contact: "+63 912 345 6791",
      email: "cruz@net.gov.ph",
    },
    {
      id: "OFF-004",
      name: "Officer Reyes",
      rank: "Officer",
      badge: "12348",
      department: "Traffic",
      status: "On Leave",
      shift: "Afternoon",
      contact: "+63 912 345 6792",
      email: "reyes@net.gov.ph",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Duty":
        return "bg-green-100 text-green-800"
      case "Off Duty":
        return "bg-gray-100 text-gray-800"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Personnel Management</h1>
          <p className="text-muted-foreground">Manage NET personnel and assignments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Personnel
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Personnel</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Active officers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Duty</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Temporary absence</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Ready for assignment</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Personnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input placeholder="Search by name, badge number, or department..." />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="patrol">Patrol</SelectItem>
                <SelectItem value="investigation">Investigation</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
                <SelectItem value="emergency">Emergency Response</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="on-duty">On Duty</SelectItem>
                <SelectItem value="off-duty">Off Duty</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personnel Table */}
      <Card>
        <CardHeader>
          <CardTitle>Personnel Directory</CardTitle>
          <CardDescription>Complete list of NET personnel</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Officer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Badge</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {personnel.map((officer) => (
                <TableRow key={officer.id}>
                  <TableCell className="font-medium">{officer.id}</TableCell>
                  <TableCell>{officer.name}</TableCell>
                  <TableCell>{officer.rank}</TableCell>
                  <TableCell>{officer.badge}</TableCell>
                  <TableCell>{officer.department}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(officer.status)}>{officer.status}</Badge>
                  </TableCell>
                  <TableCell>{officer.shift}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {officer.contact}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {officer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Department Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Personnel by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Patrol Division</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">8 officers</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Investigation</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">6 officers</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Traffic Division</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-10 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">5 officers</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Emergency Response</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-8 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">5 officers</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest personnel updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Officer Martinez checked in</div>
                  <div className="text-sm text-muted-foreground">Started morning patrol shift</div>
                </div>
                <div className="text-sm text-muted-foreground">2 hours ago</div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Officer Reyes on leave</div>
                  <div className="text-sm text-muted-foreground">Medical leave approved</div>
                </div>
                <div className="text-sm text-muted-foreground">1 day ago</div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Detective Cruz promoted</div>
                  <div className="text-sm text-muted-foreground">Promoted to Senior Detective</div>
                </div>
                <div className="text-sm text-muted-foreground">3 days ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
