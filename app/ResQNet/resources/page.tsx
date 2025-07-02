"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  Package,
  Truck,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
} from "lucide-react"

export default function ResourceManagement() {
  const resourceCategories = [
    {
      id: "medical",
      name: "Medical Supplies",
      icon: Package,
      total: 1250,
      available: 890,
      deployed: 360,
      reserved: 100,
      color: "text-red-600",
    },
    {
      id: "rescue",
      name: "Rescue Equipment",
      icon: Truck,
      total: 450,
      available: 320,
      deployed: 130,
      reserved: 50,
      color: "text-blue-600",
    },
    {
      id: "shelter",
      name: "Shelter Materials",
      icon: Database,
      total: 800,
      available: 600,
      deployed: 200,
      reserved: 150,
      color: "text-green-600",
    },
    {
      id: "food",
      name: "Food & Water",
      icon: Package,
      total: 2000,
      available: 1500,
      deployed: 500,
      reserved: 200,
      color: "text-orange-600",
    },
  ]

  const resourceRequests = [
    {
      id: "REQ-001",
      type: "Medical Supplies",
      requestor: "Evacuation Center A",
      priority: "Critical",
      quantity: "50 units",
      status: "Pending",
      requestedAt: "2 hours ago",
      location: "Barangay San Miguel",
    },
    {
      id: "REQ-002",
      type: "Rescue Boats",
      requestor: "Alpha Response Unit",
      priority: "High",
      quantity: "3 boats",
      status: "Approved",
      requestedAt: "1 hour ago",
      location: "Flood Zone 3",
    },
    {
      id: "REQ-003",
      type: "Food Supplies",
      requestor: "DSWD Field Office",
      priority: "Medium",
      quantity: "200 packs",
      status: "In Transit",
      requestedAt: "3 hours ago",
      location: "Multiple Centers",
    },
  ]

  const inventory = [
    {
      id: "MED-001",
      name: "First Aid Kits",
      category: "Medical",
      available: 150,
      total: 200,
      location: "Warehouse A",
      condition: "Good",
      lastChecked: "2 days ago",
    },
    {
      id: "RES-001",
      name: "Rescue Boats",
      category: "Rescue",
      available: 8,
      total: 12,
      location: "Marine Station",
      condition: "Good",
      lastChecked: "1 day ago",
    },
    {
      id: "SHE-001",
      name: "Emergency Tents",
      category: "Shelter",
      available: 45,
      total: 60,
      location: "Warehouse B",
      condition: "Good",
      lastChecked: "3 days ago",
    },
    {
      id: "FOO-001",
      name: "Emergency Food Packs",
      category: "Food",
      available: 800,
      total: 1000,
      location: "Central Storage",
      condition: "Good",
      lastChecked: "1 day ago",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Management</h1>
          <p className="text-muted-foreground">Emergency resource allocation and inventory tracking</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>

      {/* Resource Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {resourceCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                <category.icon className={`h-4 w-4 ${category.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{category.available}</div>
                <div className="text-xs text-muted-foreground">Available of {category.total} total</div>
                <Progress value={(category.available / category.total) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Deployed: {category.deployed}</span>
                  <span>Reserved: {category.reserved}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="requests">Resource Requests</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Resource Requests
                  </CardTitle>
                  <CardDescription>Pending and active resource allocation requests</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search requests..." className="pl-8 w-64" />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resourceRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{request.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          Requested by {request.requestor} • {request.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            request.priority === "Critical"
                              ? "destructive"
                              : request.priority === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {request.priority}
                        </Badge>
                        <Badge
                          variant={
                            request.status === "Pending"
                              ? "secondary"
                              : request.status === "Approved"
                                ? "default"
                                : "outline"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {request.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {request.requestedAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {request.quantity}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {request.status === "Pending" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            Modify
                          </Button>
                        </>
                      )}
                      {request.status === "Approved" && (
                        <Button size="sm" variant="outline">
                          <Truck className="mr-1 h-3 w-3" />
                          Track Delivery
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                Resource Inventory
              </CardTitle>
              <CardDescription>Current stock levels and resource availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.category} • {item.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">
                          {item.available}/{item.total}
                        </div>
                        <div className="text-sm text-muted-foreground">Available</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{item.condition}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">Checked {item.lastChecked}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Inspect
                        </Button>
                        <Button size="sm" variant="outline">
                          <Upload className="mr-1 h-3 w-3" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation Matrix</CardTitle>
              <CardDescription>Strategic resource distribution across agencies and locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-3">Allocation by Agency</h4>
                    <div className="space-y-3">
                      {[
                        { agency: "NDRRMC", percentage: 35, resources: "Command & Coordination" },
                        { agency: "BFP", percentage: 25, resources: "Fire & Rescue Equipment" },
                        { agency: "DOH", percentage: 20, resources: "Medical Supplies" },
                        { agency: "DSWD", percentage: 20, resources: "Relief & Shelter" },
                      ].map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.agency}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <Progress value={item.percentage} className="h-2" />
                          <div className="text-xs text-muted-foreground">{item.resources}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Allocation by Priority</h4>
                    <div className="space-y-3">
                      {[
                        { priority: "Critical Operations", percentage: 40, color: "bg-red-600" },
                        { priority: "Active Response", percentage: 30, color: "bg-orange-600" },
                        { priority: "Standby Reserve", percentage: 20, color: "bg-blue-600" },
                        { priority: "Maintenance", percentage: 10, color: "bg-gray-600" },
                      ].map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.priority}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logistics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                Logistics & Distribution
              </CardTitle>
              <CardDescription>Resource transportation and delivery tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "LOG-001",
                    vehicle: "Truck Alpha-1",
                    cargo: "Medical Supplies",
                    from: "Central Warehouse",
                    to: "Evacuation Center A",
                    status: "En Route",
                    eta: "15 minutes",
                    progress: 75,
                  },
                  {
                    id: "LOG-002",
                    vehicle: "Boat Beta-2",
                    cargo: "Rescue Equipment",
                    from: "Marine Station",
                    to: "Flood Zone 3",
                    status: "Loading",
                    eta: "30 minutes",
                    progress: 25,
                  },
                  {
                    id: "LOG-003",
                    vehicle: "Van Charlie-3",
                    cargo: "Food Supplies",
                    from: "DSWD Warehouse",
                    to: "Multiple Centers",
                    status: "Delivered",
                    eta: "Completed",
                    progress: 100,
                  },
                ].map((delivery) => (
                  <div key={delivery.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{delivery.vehicle}</h4>
                        <p className="text-sm text-muted-foreground">
                          {delivery.cargo} • {delivery.from} → {delivery.to}
                        </p>
                      </div>
                      <Badge
                        variant={
                          delivery.status === "Delivered"
                            ? "default"
                            : delivery.status === "En Route"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {delivery.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Delivery Progress</span>
                        <span>ETA: {delivery.eta}</span>
                      </div>
                      <Progress value={delivery.progress} className="h-2" />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <MapPin className="mr-1 h-3 w-3" />
                        Track Vehicle
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact Driver
                      </Button>
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
