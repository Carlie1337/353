"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Camera,
  Plus,
  Settings,
  ZoomIn,
  ZoomOut,
  Move,
  Eye,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Monitor,
  RepeatIcon as Record,
  Volume2,
  MapPin,
} from "lucide-react"

interface CCTVCamera {
  id: string
  name: string
  location: string
  ipAddress: string
  port: number
  username: string
  password: string
  brand: string
  model: string
  rtspUrl: string
  httpUrl: string
  status: "online" | "offline" | "error"
  isRecording: boolean
  hasAudio: boolean
  hasPTZ: boolean
  resolution: string
  fps: number
  lastSeen: Date
  features: string[]
}

export default function CCTVPage() {
  const [cameras, setCameras] = useState<CCTVCamera[]>([])
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
  const [isAddingCamera, setIsAddingCamera] = useState(false)
  const [editingCamera, setEditingCamera] = useState<CCTVCamera | null>(null)
  const [newCamera, setNewCamera] = useState<Partial<CCTVCamera>>({
    name: "",
    location: "",
    ipAddress: "",
    port: 554,
    username: "",
    password: "",
    brand: "",
    model: "",
    rtspUrl: "",
    httpUrl: "",
    hasAudio: false,
    hasPTZ: false,
    resolution: "1920x1080",
    fps: 30,
    features: [],
  })

  // Real-time camera status updates
  useEffect(() => {
    // Initialize mock cameras
    const mockCameras: CCTVCamera[] = [
      {
        id: "CAM001",
        name: "Main Gate Camera",
        location: "Barangay Hall Entrance",
        ipAddress: "192.168.1.101",
        port: 554,
        username: "admin",
        password: "admin123",
        brand: "Hikvision",
        model: "DS-2CD2143G0-I",
        rtspUrl: "rtsp://192.168.1.101:554/stream1",
        httpUrl: "http://192.168.1.101/cgi-bin/snapshot.cgi",
        status: "online",
        isRecording: true,
        hasAudio: true,
        hasPTZ: false,
        resolution: "1920x1080",
        fps: 30,
        lastSeen: new Date(),
        features: ["Night Vision", "Motion Detection", "Audio Recording"],
      },
      {
        id: "CAM002",
        name: "Market Area Camera",
        location: "Public Market",
        ipAddress: "192.168.1.102",
        port: 554,
        username: "admin",
        password: "admin123",
        brand: "Dahua",
        model: "IPC-HDW2431T-AS-S2",
        rtspUrl: "rtsp://192.168.1.102:554/cam/realmonitor?channel=1&subtype=0",
        httpUrl: "http://192.168.1.102/cgi-bin/snapshot.cgi",
        status: "online",
        isRecording: true,
        hasAudio: false,
        hasPTZ: true,
        resolution: "1920x1080",
        fps: 25,
        lastSeen: new Date(),
        features: ["PTZ Control", "Motion Detection", "Night Vision"],
      },
      {
        id: "CAM003",
        name: "School Zone Camera",
        location: "Elementary School",
        ipAddress: "192.168.1.103",
        port: 554,
        username: "admin",
        password: "admin123",
        brand: "Axis",
        model: "M3046-V",
        rtspUrl: "rtsp://192.168.1.103:554/axis-media/media.amp",
        httpUrl: "http://192.168.1.103/jpg/image.jpg",
        status: "offline",
        isRecording: false,
        hasAudio: true,
        hasPTZ: false,
        resolution: "1280x720",
        fps: 30,
        lastSeen: new Date(Date.now() - 5 * 60 * 1000),
        features: ["Audio Recording", "Motion Detection"],
      },
      {
        id: "CAM004",
        name: "Basketball Court Camera",
        location: "Community Basketball Court",
        ipAddress: "192.168.1.104",
        port: 554,
        username: "admin",
        password: "admin123",
        brand: "Uniview",
        model: "IPC2122SR3-PF40",
        rtspUrl: "rtsp://192.168.1.104:554/unicast/c1/s0/live",
        httpUrl: "http://192.168.1.104/cgi-bin/snapshot.cgi",
        status: "error",
        isRecording: false,
        hasAudio: false,
        hasPTZ: false,
        resolution: "1920x1080",
        fps: 30,
        lastSeen: new Date(Date.now() - 15 * 60 * 1000),
        features: ["Night Vision", "Motion Detection"],
      },
    ]

    setCameras(mockCameras)

    // Real-time status updates
    const interval = setInterval(() => {
      setCameras((prev) =>
        prev.map((camera) => {
          // Simulate random status changes
          const random = Math.random()
          let newStatus = camera.status

          if (random > 0.95) {
            newStatus = camera.status === "online" ? "offline" : "online"
          } else if (random > 0.98) {
            newStatus = "error"
          }

          return {
            ...camera,
            status: newStatus as "online" | "offline" | "error",
            lastSeen: newStatus === "online" ? new Date() : camera.lastSeen,
            isRecording: newStatus === "online" ? camera.isRecording : false,
          }
        }),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleAddCamera = () => {
    if (newCamera.name && newCamera.ipAddress) {
      const camera: CCTVCamera = {
        id: `CAM${String(cameras.length + 1).padStart(3, "0")}`,
        name: newCamera.name!,
        location: newCamera.location || "",
        ipAddress: newCamera.ipAddress!,
        port: newCamera.port || 554,
        username: newCamera.username || "",
        password: newCamera.password || "",
        brand: newCamera.brand || "",
        model: newCamera.model || "",
        rtspUrl: newCamera.rtspUrl || `rtsp://${newCamera.ipAddress}:${newCamera.port || 554}/stream1`,
        httpUrl: newCamera.httpUrl || `http://${newCamera.ipAddress}/cgi-bin/snapshot.cgi`,
        status: "offline",
        isRecording: false,
        hasAudio: newCamera.hasAudio || false,
        hasPTZ: newCamera.hasPTZ || false,
        resolution: newCamera.resolution || "1920x1080",
        fps: newCamera.fps || 30,
        lastSeen: new Date(),
        features: newCamera.features || [],
      }

      setCameras([...cameras, camera])
      setNewCamera({
        name: "",
        location: "",
        ipAddress: "",
        port: 554,
        username: "",
        password: "",
        brand: "",
        model: "",
        rtspUrl: "",
        httpUrl: "",
        hasAudio: false,
        hasPTZ: false,
        resolution: "1920x1080",
        fps: 30,
        features: [],
      })
      setIsAddingCamera(false)
    }
  }

  const handleEditCamera = (camera: CCTVCamera) => {
    setEditingCamera(camera)
  }

  const handleUpdateCamera = () => {
    if (editingCamera) {
      setCameras(cameras.map((cam) => (cam.id === editingCamera.id ? editingCamera : cam)))
      setEditingCamera(null)
    }
  }

  const handleDeleteCamera = (cameraId: string) => {
    setCameras(cameras.filter((cam) => cam.id !== cameraId))
  }

  const handleTestConnection = async (camera: CCTVCamera) => {
    // Simulate connection test
    console.log(`Testing connection to ${camera.name}...`)
    // In real implementation, this would test the RTSP/HTTP connection
    alert(`Testing connection to ${camera.name}...\nResult: Connection successful!`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200"
      case "offline":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Wifi className="h-4 w-4 text-green-600" />
      case "offline":
        return <WifiOff className="h-4 w-4 text-gray-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <WifiOff className="h-4 w-4 text-gray-600" />
    }
  }

  const cameraBrands = ["Hikvision", "Dahua", "Axis", "Uniview", "Bosch", "Hanwha", "Vivotek", "Foscam", "Other"]
  const resolutions = ["640x480", "1280x720", "1920x1080", "2560x1440", "3840x2160"]
  const frameRates = [15, 20, 25, 30, 60]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 pt-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">CCTV Monitoring System</h1>
          <p className="text-gray-600 mt-1">Real-time surveillance camera management and monitoring</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 justify-center">
            <Monitor className="h-3 w-3 mr-1" />
            {cameras.filter((c) => c.status === "online").length} Online
          </Badge>
          <Dialog open={isAddingCamera} onOpenChange={setIsAddingCamera}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Camera
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New CCTV Camera</DialogTitle>
                <DialogDescription>Configure a new surveillance camera for monitoring</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="basic" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="network">Network</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="camera-name">Camera Name *</Label>
                      <Input
                        id="camera-name"
                        placeholder="e.g., Main Gate Camera"
                        value={newCamera.name || ""}
                        onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="camera-location">Location</Label>
                      <Input
                        id="camera-location"
                        placeholder="e.g., Barangay Hall Entrance"
                        value={newCamera.location || ""}
                        onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="camera-brand">Brand</Label>
                      <Select
                        value={newCamera.brand || ""}
                        onValueChange={(value) => setNewCamera({ ...newCamera, brand: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select camera brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {cameraBrands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="camera-model">Model</Label>
                      <Input
                        id="camera-model"
                        placeholder="e.g., DS-2CD2143G0-I"
                        value={newCamera.model || ""}
                        onChange={(e) => setNewCamera({ ...newCamera, model: e.target.value })}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="network" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ip-address">IP Address *</Label>
                      <Input
                        id="ip-address"
                        placeholder="192.168.1.100"
                        value={newCamera.ipAddress || ""}
                        onChange={(e) => setNewCamera({ ...newCamera, ipAddress: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">Port</Label>
                      <Input
                        id="port"
                        type="number"
                        placeholder="554"
                        value={newCamera.port || ""}
                        onChange={(e) => setNewCamera({ ...newCamera, port: Number.parseInt(e.target.value) || 554 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="admin"
                        value={newCamera.username || ""}
                        onChange={(e) => setNewCamera({ ...newCamera, username: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={newCamera.password || ""}
                        onChange={(e) => setNewCamera({ ...newCamera, password: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rtsp-url">RTSP URL</Label>
                    <Input
                      id="rtsp-url"
                      placeholder="rtsp://192.168.1.100:554/stream1"
                      value={newCamera.rtspUrl || ""}
                      onChange={(e) => setNewCamera({ ...newCamera, rtspUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="http-url">HTTP Snapshot URL</Label>
                    <Input
                      id="http-url"
                      placeholder="http://192.168.1.100/cgi-bin/snapshot.cgi"
                      value={newCamera.httpUrl || ""}
                      onChange={(e) => setNewCamera({ ...newCamera, httpUrl: e.target.value })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resolution">Resolution</Label>
                      <Select
                        value={newCamera.resolution || ""}
                        onValueChange={(value) => setNewCamera({ ...newCamera, resolution: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select resolution" />
                        </SelectTrigger>
                        <SelectContent>
                          {resolutions.map((res) => (
                            <SelectItem key={res} value={res}>
                              {res}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fps">Frame Rate (FPS)</Label>
                      <Select
                        value={String(newCamera.fps || "")}
                        onValueChange={(value) => setNewCamera({ ...newCamera, fps: Number.parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select FPS" />
                        </SelectTrigger>
                        <SelectContent>
                          {frameRates.map((fps) => (
                            <SelectItem key={fps} value={String(fps)}>
                              {fps} FPS
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="has-audio"
                        checked={newCamera.hasAudio || false}
                        onCheckedChange={(checked) => setNewCamera({ ...newCamera, hasAudio: checked })}
                      />
                      <Label htmlFor="has-audio">Audio Recording</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="has-ptz"
                        checked={newCamera.hasPTZ || false}
                        onCheckedChange={(checked) => setNewCamera({ ...newCamera, hasPTZ: checked })}
                      />
                      <Label htmlFor="has-ptz">PTZ Control (Pan/Tilt/Zoom)</Label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingCamera(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCamera} disabled={!newCamera.name || !newCamera.ipAddress}>
                  Add Camera
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Camera Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cameras</p>
                <p className="text-2xl font-bold">{cameras.length}</p>
              </div>
              <Camera className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Online</p>
                <p className="text-2xl font-bold text-green-600">
                  {cameras.filter((c) => c.status === "online").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recording</p>
                <p className="text-2xl font-bold text-red-600">{cameras.filter((c) => c.isRecording).length}</p>
              </div>
              <Record className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Offline</p>
                <p className="text-2xl font-bold text-gray-600">
                  {cameras.filter((c) => c.status === "offline" || c.status === "error").length}
                </p>
              </div>
              <WifiOff className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cameras.map((camera) => (
          <Card key={camera.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{camera.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {camera.location}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getStatusColor(camera.status)}`}>
                    {getStatusIcon(camera.status)}
                    <span className="ml-1">{camera.status}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Camera Preview */}
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                {camera.status === "online" ? (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-75">Live Feed</p>
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        {camera.isRecording && (
                          <div className="flex items-center gap-1 bg-red-600 px-2 py-1 rounded text-xs">
                            <Record className="h-3 w-3" />
                            REC
                          </div>
                        )}
                        {camera.hasAudio && (
                          <div className="bg-blue-600 p-1 rounded">
                            <Volume2 className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <WifiOff className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">Camera Offline</p>
                  </div>
                )}
              </div>

              {/* Camera Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">IP Address:</span>
                  <span className="font-medium">{camera.ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resolution:</span>
                  <span className="font-medium">{camera.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium">{camera.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Seen:</span>
                  <span className="font-medium">{camera.lastSeen.toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Features */}
              {camera.features.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {camera.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Controls */}
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEditCamera(camera)}>
                  <Settings className="h-3 w-3 mr-1" />
                  Config
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleTestConnection(camera)}>
                  <Wifi className="h-3 w-3 mr-1" />
                  Test
                </Button>
              </div>

              {/* PTZ Controls */}
              {camera.hasPTZ && camera.status === "online" && (
                <div className="border-t pt-3">
                  <p className="text-xs font-medium text-gray-600 mb-2">PTZ Controls</p>
                  <div className="grid grid-cols-3 gap-1">
                    <Button size="sm" variant="outline" className="aspect-square p-0 bg-transparent">
                      <Move className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="aspect-square p-0 bg-transparent">
                      <ZoomIn className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="aspect-square p-0 bg-transparent">
                      <ZoomOut className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Camera Dialog */}
      <Dialog open={!!editingCamera} onOpenChange={() => setEditingCamera(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Camera Configuration</DialogTitle>
            <DialogDescription>Update camera settings and configuration</DialogDescription>
          </DialogHeader>
          {editingCamera && (
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Camera Name</Label>
                    <Input
                      id="edit-name"
                      value={editingCamera.name}
                      onChange={(e) => setEditingCamera({ ...editingCamera, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-location">Location</Label>
                    <Input
                      id="edit-location"
                      value={editingCamera.location}
                      onChange={(e) => setEditingCamera({ ...editingCamera, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-brand">Brand</Label>
                    <Select
                      value={editingCamera.brand}
                      onValueChange={(value) => setEditingCamera({ ...editingCamera, brand: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cameraBrands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-model">Model</Label>
                    <Input
                      id="edit-model"
                      value={editingCamera.model}
                      onChange={(e) => setEditingCamera({ ...editingCamera, model: e.target.value })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="network" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-ip">IP Address</Label>
                    <Input
                      id="edit-ip"
                      value={editingCamera.ipAddress}
                      onChange={(e) => setEditingCamera({ ...editingCamera, ipAddress: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-port">Port</Label>
                    <Input
                      id="edit-port"
                      type="number"
                      value={editingCamera.port}
                      onChange={(e) => setEditingCamera({ ...editingCamera, port: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-username">Username</Label>
                    <Input
                      id="edit-username"
                      value={editingCamera.username}
                      onChange={(e) => setEditingCamera({ ...editingCamera, username: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-password">Password</Label>
                    <Input
                      id="edit-password"
                      type="password"
                      value={editingCamera.password}
                      onChange={(e) => setEditingCamera({ ...editingCamera, password: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-rtsp">RTSP URL</Label>
                  <Input
                    id="edit-rtsp"
                    value={editingCamera.rtspUrl}
                    onChange={(e) => setEditingCamera({ ...editingCamera, rtspUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-http">HTTP URL</Label>
                  <Input
                    id="edit-http"
                    value={editingCamera.httpUrl}
                    onChange={(e) => setEditingCamera({ ...editingCamera, httpUrl: e.target.value })}
                  />
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-resolution">Resolution</Label>
                    <Select
                      value={editingCamera.resolution}
                      onValueChange={(value) => setEditingCamera({ ...editingCamera, resolution: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {resolutions.map((res) => (
                          <SelectItem key={res} value={res}>
                            {res}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-fps">Frame Rate</Label>
                    <Select
                      value={String(editingCamera.fps)}
                      onValueChange={(value) => setEditingCamera({ ...editingCamera, fps: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {frameRates.map((fps) => (
                          <SelectItem key={fps} value={String(fps)}>
                            {fps} FPS
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-audio"
                      checked={editingCamera.hasAudio}
                      onCheckedChange={(checked) => setEditingCamera({ ...editingCamera, hasAudio: checked })}
                    />
                    <Label htmlFor="edit-audio">Audio Recording</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-ptz"
                      checked={editingCamera.hasPTZ}
                      onCheckedChange={(checked) => setEditingCamera({ ...editingCamera, hasPTZ: checked })}
                    />
                    <Label htmlFor="edit-ptz">PTZ Control</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-recording"
                      checked={editingCamera.isRecording}
                      onCheckedChange={(checked) => setEditingCamera({ ...editingCamera, isRecording: checked })}
                    />
                    <Label htmlFor="edit-recording">Auto Recording</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Advanced settings may affect camera performance. Change only if you know what you're doing.
                  </AlertDescription>
                </Alert>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-features">Camera Features (comma-separated)</Label>
                    <Textarea
                      id="edit-features"
                      placeholder="Night Vision, Motion Detection, Audio Recording"
                      value={editingCamera.features.join(", ")}
                      onChange={(e) =>
                        setEditingCamera({
                          ...editingCamera,
                          features: e.target.value
                            .split(",")
                            .map((f) => f.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleTestConnection(editingCamera)}>
                      <Wifi className="h-4 w-4 mr-2" />
                      Test Connection
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteCamera(editingCamera.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Camera
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setEditingCamera(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCamera}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
