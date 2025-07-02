"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Radio,
  MessageSquare,
  Satellite,
  Users,
  Send,
  Mic,
  MicOff,
  Volume2,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  TowerControlIcon as Tower,
  Wifi,
  Smartphone,
  Monitor,
  HeadphonesIcon,
} from "lucide-react"

export default function CommunicationPage() {
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState("primary")
  const [messageText, setMessageText] = useState("")

  const communicationChannels = [
    {
      id: "primary",
      name: "Primary Emergency",
      frequency: "462.675 MHz",
      status: "Active",
      users: 12,
      signal: "High",
      encryption: true,
    },
    {
      id: "secondary",
      name: "Secondary Backup",
      frequency: "467.675 MHz",
      status: "Standby",
      users: 5,
      signal: "Medium",
      encryption: true,
    },
    {
      id: "interagency",
      name: "Inter-Agency",
      frequency: "155.175 MHz",
      status: "Active",
      users: 8,
      signal: "High",
      encryption: false,
    },
    {
      id: "tactical",
      name: "Tactical Operations",
      frequency: "453.200 MHz",
      status: "Active",
      users: 15,
      signal: "Medium",
      encryption: true,
    },
    {
      id: "medical",
      name: "Medical Emergency",
      frequency: "463.000 MHz",
      status: "Active",
      users: 6,
      signal: "High",
      encryption: true,
    },
  ]

  const activeUsers = [
    {
      id: 1,
      callSign: "COMMANDER-01",
      name: "Emergency Coordinator",
      unit: "Command Center",
      status: "Online",
      lastActivity: "30 sec ago",
    },
    {
      id: 2,
      callSign: "RESCUE-01",
      name: "Search & Rescue Team Leader",
      unit: "SAR Team Alpha",
      status: "Transmitting",
      lastActivity: "Now",
    },
    {
      id: 3,
      callSign: "MEDICAL-01",
      name: "Medical Team Chief",
      unit: "Medical Response",
      status: "Online",
      lastActivity: "2 min ago",
    },
    {
      id: 4,
      callSign: "FIRE-01",
      name: "Fire Chief",
      unit: "Fire Department",
      status: "Online",
      lastActivity: "1 min ago",
    },
    {
      id: 5,
      callSign: "POLICE-01",
      name: "Police Commander",
      unit: "Police Force",
      status: "Away",
      lastActivity: "5 min ago",
    },
  ]

  const recentMessages = [
    {
      id: 1,
      from: "RESCUE-01",
      to: "COMMANDER-01",
      message: "Three survivors located at Grid Reference 123-456. Requesting medical support.",
      timestamp: "14:35:22",
      channel: "Primary Emergency",
      priority: "High",
    },
    {
      id: 2,
      from: "MEDICAL-01",
      to: "ALL",
      message: "Medical team en route to Grid 123-456. ETA 5 minutes.",
      timestamp: "14:36:10",
      channel: "Primary Emergency",
      priority: "High",
    },
    {
      id: 3,
      from: "COMMANDER-01",
      to: "ALL",
      message: "All units maintain radio discipline. Priority traffic only on primary channel.",
      timestamp: "14:30:15",
      channel: "Primary Emergency",
      priority: "Normal",
    },
    {
      id: 4,
      from: "FIRE-01",
      to: "COMMANDER-01",
      message: "Fire suppression complete at Sector 7. Returning to base.",
      timestamp: "14:28:45",
      channel: "Primary Emergency",
      priority: "Normal",
    },
  ]

  const equipment = [
    {
      name: "Base Station Radio",
      model: "Motorola XTL5000",
      status: "Operational",
      location: "Command Center",
      range: "25 miles",
      channels: 16,
    },
    {
      name: "Portable Radio 1",
      model: "Motorola APX7000",
      status: "In Use",
      location: "Field Team A",
      range: "5 miles",
      channels: 8,
    },
    {
      name: "Portable Radio 2",
      model: "Motorola APX7000",
      status: "Available",
      location: "Equipment Room",
      range: "5 miles",
      channels: 8,
    },
    {
      name: "Mobile Radio 1",
      model: "Motorola XTL2500",
      status: "In Use",
      location: "Emergency Vehicle 1",
      range: "15 miles",
      channels: 12,
    },
    {
      name: "Satellite Phone",
      model: "Iridium 9575",
      status: "Standby",
      location: "Command Center",
      range: "Global",
      channels: 1,
    },
  ]

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case "High":
        return <SignalHigh className="h-4 w-4 text-green-500" />
      case "Medium":
        return <SignalMedium className="h-4 w-4 text-yellow-500" />
      case "Low":
        return <SignalLow className="h-4 w-4 text-red-500" />
      default:
        return <Signal className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Online":
        return <Badge className="bg-green-500">Online</Badge>
      case "Transmitting":
        return <Badge className="bg-blue-500 animate-pulse">Transmitting</Badge>
      case "Away":
        return <Badge variant="secondary">Away</Badge>
      case "Offline":
        return <Badge variant="outline">Offline</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add message to recent messages (simulation)
      setMessageText("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Communication Hub</h1>
          <p className="text-muted-foreground">Emergency communication coordination and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Signal className="h-4 w-4 mr-2" />
            Signal Test
          </Button>
          <Button variant="outline">
            <Tower className="h-4 w-4 mr-2" />
            Network Status
          </Button>
        </div>
      </div>

      <Tabs defaultValue="radio" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="radio">Radio Communications</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
          <TabsTrigger value="personnel">Personnel</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="radio" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Radio Channels</CardTitle>
                <CardDescription>Available communication channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {communicationChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedChannel === channel.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedChannel(channel.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{channel.name}</h4>
                        <p className="text-sm text-muted-foreground">{channel.frequency}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSignalIcon(channel.signal)}
                        <Badge variant={channel.status === "Active" ? "default" : "secondary"}>{channel.status}</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {channel.users} users
                        </span>
                        {channel.encryption && <span className="text-green-600">🔒 Encrypted</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transmission Control</CardTitle>
                <CardDescription>
                  Channel: {communicationChannels.find((c) => c.id === selectedChannel)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant={isTransmitting ? "destructive" : "default"}
                    className="w-32 h-32 rounded-full"
                    onMouseDown={() => setIsTransmitting(true)}
                    onMouseUp={() => setIsTransmitting(false)}
                    onMouseLeave={() => setIsTransmitting(false)}
                  >
                    {isTransmitting ? (
                      <div className="flex flex-col items-center">
                        <Mic className="h-8 w-8 mb-2" />
                        <span className="text-sm">TRANSMIT</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <MicOff className="h-8 w-8 mb-2" />
                        <span className="text-sm">PUSH TO TALK</span>
                      </div>
                    )}
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Volume</span>
                    <Volume2 className="h-4 w-4" />
                  </div>
                  <input type="range" className="w-full" defaultValue="75" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Squelch</span>
                    <HeadphonesIcon className="h-4 w-4" />
                  </div>
                  <input type="range" className="w-full" defaultValue="50" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Wifi className="h-4 w-4 mr-2" />
                    Emergency
                  </Button>
                  <Button variant="outline" size="sm">
                    <Satellite className="h-4 w-4 mr-2" />
                    Satellite
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transmissions</CardTitle>
              <CardDescription>Live communication log</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{msg.from}</Badge>
                        <span className="text-sm text-muted-foreground">to</span>
                        <Badge variant="outline">{msg.to}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{msg.timestamp}</span>
                        <Badge variant={msg.priority === "High" ? "destructive" : "secondary"}>{msg.priority}</Badge>
                      </div>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">Channel: {msg.channel}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messaging" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
                <CardDescription>Broadcast message to selected units</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Recipient</label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option>All Units</option>
                    <option>Command Staff</option>
                    <option>Field Teams</option>
                    <option>Medical Teams</option>
                    <option>Fire Department</option>
                    <option>Police Force</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Enter your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <Button onClick={handleSendMessage} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Messages</CardTitle>
                <CardDescription>Pre-configured emergency messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  🚨 Emergency Alert - All units respond
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📍 Request location update from all teams
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🏥 Medical assistance required
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🔥 Fire department support needed
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  👮 Police backup requested
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  ✅ All clear - stand down
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📞 Switch to tactical channel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🔄 Radio check - respond if copy
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="personnel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Personnel</CardTitle>
              <CardDescription>Currently connected emergency personnel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Radio className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{user.callSign}</p>
                          <p className="text-sm text-muted-foreground">{user.name}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.unit}</p>
                        <p className="text-xs text-muted-foreground">{user.lastActivity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(user.status)}
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication Equipment</CardTitle>
              <CardDescription>Radio and communication device inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipment.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {item.name.includes("Base") && <Monitor className="h-5 w-5" />}
                        {item.name.includes("Portable") && <Smartphone className="h-5 w-5" />}
                        {item.name.includes("Mobile") && <Radio className="h-5 w-5" />}
                        {item.name.includes("Satellite") && <Satellite className="h-5 w-5" />}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.model}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm">Range: {item.range}</p>
                        <p className="text-sm text-muted-foreground">{item.channels} channels</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.status === "Operational" ? "default" : item.status === "In Use" ? "secondary" : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Details
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
