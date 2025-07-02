"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Radio,
  Mic,
  Send,
  AlertTriangle,
  Users,
  MapPin,
  Clock,
  Play,
  Square,
  Settings,
  Smartphone,
  Tv,
  Megaphone,
  Satellite,
  TowerControlIcon as Tower,
  Activity,
} from "lucide-react"

export default function EmergencyBroadcasting() {
  const [isLive, setIsLive] = useState(false)
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])

  const broadcastChannels = [
    { id: "radio", name: "Emergency Radio", icon: Radio, status: "online", reach: "50km radius" },
    { id: "sms", name: "SMS Alert System", icon: Smartphone, status: "online", reach: "All registered users" },
    { id: "tv", name: "Emergency TV", icon: Tv, status: "online", reach: "Metro Manila" },
    { id: "loudspeaker", name: "Public Address", icon: Megaphone, status: "online", reach: "Local barangays" },
    { id: "satellite", name: "Satellite Comm", icon: Satellite, status: "limited", reach: "National" },
    { id: "cellular", name: "Cell Broadcast", icon: Tower, status: "online", reach: "All networks" },
  ]

  const activeAlerts = [
    {
      id: "ALERT-001",
      type: "Flood Warning",
      severity: "High",
      location: "Metro Manila",
      channels: ["radio", "sms", "tv"],
      sent: "2 minutes ago",
      recipients: 125000,
    },
    {
      id: "ALERT-002",
      type: "Evacuation Order",
      severity: "Critical",
      location: "Barangay San Miguel",
      channels: ["loudspeaker", "sms"],
      sent: "15 minutes ago",
      recipients: 8500,
    },
    {
      id: "ALERT-003",
      type: "Weather Update",
      severity: "Medium",
      location: "Region IV-A",
      channels: ["radio", "tv"],
      sent: "1 hour ago",
      recipients: 250000,
    },
  ]

  const presetMessages = [
    {
      id: "flood",
      title: "Flood Warning",
      message:
        "FLOOD WARNING: Heavy rainfall has caused flooding in low-lying areas. Residents are advised to move to higher ground immediately. Evacuation centers are open at [LOCATION]. For assistance, call 911.",
    },
    {
      id: "earthquake",
      title: "Earthquake Alert",
      message:
        "EARTHQUAKE ALERT: A magnitude [X] earthquake has been detected. Drop, Cover, and Hold On. Stay away from windows and heavy objects. Check for injuries and damage after shaking stops.",
    },
    {
      id: "evacuation",
      title: "Evacuation Order",
      message:
        "MANDATORY EVACUATION: All residents in [AREA] must evacuate immediately due to [HAZARD]. Proceed to designated evacuation centers. Bring essential items only. Transportation assistance available.",
    },
    {
      id: "allclear",
      title: "All Clear",
      message:
        "ALL CLEAR: The emergency situation in [AREA] has been resolved. Residents may return to their homes. Continue to monitor official channels for updates. Thank you for your cooperation.",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Broadcasting</h1>
          <p className="text-muted-foreground">Multi-channel emergency alert and communication system</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isLive ? "destructive" : "secondary"} className="animate-pulse">
            <Activity className="mr-1 h-3 w-3" />
            {isLive ? "LIVE BROADCAST" : "STANDBY"}
          </Badge>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="broadcast" className="space-y-6">
        <TabsList>
          <TabsTrigger value="broadcast">Live Broadcast</TabsTrigger>
          <TabsTrigger value="alerts">Alert Management</TabsTrigger>
          <TabsTrigger value="channels">Channel Status</TabsTrigger>
          <TabsTrigger value="history">Broadcast History</TabsTrigger>
        </TabsList>

        <TabsContent value="broadcast" className="space-y-6">
          {/* Live Broadcasting Controls */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-red-600" />
                  Live Broadcasting
                </CardTitle>
                <CardDescription>Create and broadcast emergency messages in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="alert-type">Alert Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flood">Flood Warning</SelectItem>
                      <SelectItem value="earthquake">Earthquake Alert</SelectItem>
                      <SelectItem value="fire">Fire Emergency</SelectItem>
                      <SelectItem value="evacuation">Evacuation Order</SelectItem>
                      <SelectItem value="weather">Weather Alert</SelectItem>
                      <SelectItem value="health">Health Emergency</SelectItem>
                      <SelectItem value="security">Security Alert</SelectItem>
                      <SelectItem value="general">General Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Severity Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="info">Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Affected Area</Label>
                  <Input placeholder="Enter location or area" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Emergency Message</Label>
                  <Textarea placeholder="Enter your emergency message here..." className="min-h-[120px]" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-repeat" />
                  <Label htmlFor="auto-repeat">Auto-repeat every 5 minutes</Label>
                </div>

                <div className="flex gap-2">
                  <Button
                    className={`flex-1 ${isLive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                    onClick={() => setIsLive(!isLive)}
                  >
                    {isLive ? (
                      <>
                        <Square className="mr-2 h-4 w-4" />
                        Stop Broadcast
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Broadcast
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Send className="mr-2 h-4 w-4" />
                    Send Alert
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preset Messages</CardTitle>
                <CardDescription>Quick access to pre-configured emergency messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {presetMessages.map((preset) => (
                    <div key={preset.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{preset.title}</h4>
                        <Button size="sm" variant="outline">
                          Use
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{preset.message}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Create New Preset
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Channel Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Broadcasting Channels</CardTitle>
              <CardDescription>Select channels for your emergency broadcast</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {broadcastChannels.map((channel) => (
                  <div key={channel.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={channel.id}
                        className="rounded"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedChannels([...selectedChannels, channel.id])
                          } else {
                            setSelectedChannels(selectedChannels.filter((id) => id !== channel.id))
                          }
                        }}
                      />
                      <channel.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{channel.name}</h4>
                        <Badge variant={channel.status === "online" ? "default" : "secondary"}>{channel.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{channel.reach}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Active Emergency Alerts
              </CardTitle>
              <CardDescription>Currently active emergency broadcasts and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{alert.type}</h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              alert.severity === "Critical"
                                ? "destructive"
                                : alert.severity === "High"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {alert.severity}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            Stop
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.sent}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {alert.recipients.toLocaleString()} recipients
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Channels:</span>
                        {alert.channels.map((channelId) => {
                          const channel = broadcastChannels.find((c) => c.id === channelId)
                          return channel ? (
                            <Badge key={channelId} variant="outline" className="text-xs">
                              {channel.name}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          {/* Channel Status */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {broadcastChannels.map((channel) => (
              <Card key={channel.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <channel.icon className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{channel.name}</CardTitle>
                    </div>
                    <Badge
                      variant={
                        channel.status === "online"
                          ? "default"
                          : channel.status === "limited"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {channel.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Coverage:</span>
                      <span>{channel.reach}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Test:</span>
                      <span>2 hours ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Reliability:</span>
                      <span className="text-green-600">99.8%</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        Test
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Broadcast History */}
          <Card>
            <CardHeader>
              <CardTitle>Broadcast History</CardTitle>
              <CardDescription>Recent emergency broadcasts and their performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  ...activeAlerts,
                  {
                    id: "ALERT-004",
                    type: "All Clear",
                    severity: "Info",
                    location: "Barangay Centro",
                    channels: ["radio", "sms"],
                    sent: "3 hours ago",
                    recipients: 15000,
                  },
                  {
                    id: "ALERT-005",
                    type: "Typhoon Warning",
                    severity: "High",
                    location: "Luzon",
                    channels: ["tv", "radio", "sms"],
                    sent: "6 hours ago",
                    recipients: 500000,
                  },
                ].map((alert) => (
                  <div key={alert.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Radio className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{alert.type}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{alert.severity}</Badge>
                          <span className="text-sm text-muted-foreground">{alert.sent}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{alert.location}</span>
                        <span>{alert.recipients.toLocaleString()} recipients</span>
                        <span>Delivery: 98.5%</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
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
