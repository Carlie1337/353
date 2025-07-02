import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Search, Filter, Plus, Download, Eye, Edit, Trash2, MapPin, Phone, Mail } from "lucide-react"

export default function ResidentsPage() {
  const residents = [
    {
      id: "R001",
      name: "Juan Dela Cruz",
      age: 35,
      address: "123 Main St, Zone 1",
      phone: "+63 912 345 6789",
      email: "juan@email.com",
      status: "Active",
      registered: "2024-01-15",
    },
    {
      id: "R002",
      name: "Maria Santos",
      age: 28,
      address: "456 Oak Ave, Zone 2",
      phone: "+63 923 456 7890",
      email: "maria@email.com",
      status: "Active",
      registered: "2024-01-20",
    },
    {
      id: "R003",
      name: "Pedro Garcia",
      age: 42,
      address: "789 Pine Rd, Zone 3",
      phone: "+63 934 567 8901",
      email: "pedro@email.com",
      status: "Inactive",
      registered: "2024-01-10",
    },
    {
      id: "R004",
      name: "Ana Rodriguez",
      age: 31,
      address: "321 Elm St, Zone 1",
      phone: "+63 945 678 9012",
      email: "ana@email.com",
      status: "Active",
      registered: "2024-01-25",
    },
  ]

  const stats = [
    { title: "Total Residents", value: "2,853", change: "+45", icon: Users, color: "text-blue-600" },
    { title: "Active Residents", value: "2,720", change: "+32", icon: Users, color: "text-green-600" },
    { title: "New This Month", value: "45", change: "+12", icon: Users, color: "text-purple-600" },
    { title: "Households", value: "1,247", change: "+8", icon: Users, color: "text-orange-600" },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 md:ml-64">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Residents Management</h2>
          <p className="text-muted-foreground">Manage community members and their information</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Resident
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search residents by name, ID, or address..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Residents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Residents List</CardTitle>
          <CardDescription>Manage and view all registered residents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resident</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {resident.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{resident.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {resident.id} • Age {resident.age}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3" />
                        {resident.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {resident.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3" />
                      {resident.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={resident.status === "Active" ? "default" : "secondary"}>{resident.status}</Badge>
                  </TableCell>
                  <TableCell>{resident.registered}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
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
